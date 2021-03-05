import json

from http.server import BaseHTTPRequestHandler
from package.sqliteDatabase import SqliteDatabase

database = SqliteDatabase()

class Server(BaseHTTPRequestHandler):
  SEARCH_KEY = "id"

  def do_GET(self):
    user_get = self._get_json_content_from_http()
    if user_get.get(self.SEARCH_KEY) != None:
      user = database.read_id_to_user_from_database(user_get[self.SEARCH_KEY])
      if user != None:
        userJson = json.dumps(user)

        self.send_response(200)
        self.send_header("content-type", "application/json")
        self.end_headers()
        self.wfile.write(bytes(userJson, "utf-8"))
      else:
        self._send_error_response("The user with the supplied id does not exist in the database.")
    else:
      self._send_error_response("The request does not have the correct name search key!")


  def do_POST(self):
    user_post = self._get_json_content_from_http()
    if user_post.get(self.SEARCH_KEY) != None:
      try:
        database.write_user_to_database(user_post)
      except Exception:
        self._send_error_response("Something went wrong with the writing to the database, maybe a duplicated id")
        return
    else:
      self._send_error_response("The post body is not correct!")
      return

    self.send_response(200)
    self.end_headers()
    database.commit_all()


  def _get_json_content_from_http(self):
    content_type = self.headers.get("content-type")
    if content_type != "application/json":
      self._send_error_response("Can't receive content-type different from application/json")

    content_length = int(self.headers.get("content-length"))
    return json.loads(self.rfile.read(content_length))


  def _send_error_response(self, message):
    self.send_response(400, message)
    self.end_headers()
