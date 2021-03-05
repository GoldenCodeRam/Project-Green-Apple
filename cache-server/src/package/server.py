import json

from http.server import BaseHTTPRequestHandler
from package.cacheDatabase import CacheDatabase

cache_database = CacheDatabase()

class Server(BaseHTTPRequestHandler):
  CITY_KEY = "city"

  def do_GET(self):
    cityRecords = cache_database.get_records_from_cache()
    cityRecordsJson = json.dumps(cityRecords)
    
    self.send_response(200)
    self.send_header("content-type", "application/json")
    self.end_headers()
    self.wfile.write(bytes(cityRecordsJson, "utf-8"))


  def do_POST(self):
    city_post = self._get_json_content_from_http()
    if city_post.get(self.CITY_KEY) != None:
      cache_database.write_city_record_to_cache(city_post)

    self.send_response(200)
    self.end_headers()

  
  def do_DELETE(self):
    print("Deleting all records on cache...")
    cache_database.remove_all_records_from_cache()
    self.send_response(200)
    self.end_headers()

  
  def _get_json_content_from_http(self):
    content_type = self.headers.get("content-type")
    if content_type != "application/json":
      self.send_response(400, "Bad formatted content!")
      self.end_headers()

    content_length = int(self.headers.get("content-length"))
    return json.loads(self.rfile.read(content_length))

  def _send_error_response(self, message):
    self.send_response(400, message)
    self.end_headers()
