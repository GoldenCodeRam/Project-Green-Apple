import json

from urllib.parse import parse_qs, urlparse
from http.server import BaseHTTPRequestHandler
from package.sqliteDatabase import SqliteDatabase

database = SqliteDatabase()

class Server(BaseHTTPRequestHandler):
  SEARCH_KEY = "id"

  def do_GET(self):
    user_id_query = self._get_query_from_http()
    if user_id_query != None:
      userInformation = database.read_user_file_from_database(user_id_query)
      if userInformation != None:
        with open(userInformation["imageFilePath"], "rb") as imageFile:
          self.send_response(200)
          self.send_header("content-type", "application/octet-stream")
          self.end_headers()
          self.wfile.write(imageFile.read())
      else:
        self._send_error_response("The user with the supplied id does not exist in the database.")
    else:
      self._send_error_response("The request does not have the correct name search key!")


  def do_POST(self):
    user_id_query = self._get_query_from_http()
    user_id_image_bytes = self._get_post_bytes_from_http()
    if user_id_query != None and user_id_image_bytes != None:
      try:
        database.write_user_file_to_database(user_id_query, user_id_image_bytes)
      except Exception as exception:
        self._send_error_response("Something went wrong writing to the database")
        return
    else:
      self._send_error_response("The post body is not correct!")
      return

    self.send_response(200)
    self.end_headers()
    database.commit_all()


  def _get_query_from_http(self):
    query_components = parse_qs(urlparse(self.path).query)
    try:
      userId = query_components["id"].pop()
      return userId
    except IndexError:
      return None


  def _get_post_bytes_from_http(self):
    bytes_length = int(self.headers.get("Content-Length"))
    if bytes_length > 0:
      return self.rfile.read(bytes_length)
    else:
      return None


  def _send_error_response(self, message):
    self.send_response(400, message)
    self.end_headers()
