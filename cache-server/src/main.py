import redis

from http.server import HTTPServer
from package.server import Server
from package.constants import HOST_NAME, SERVER_PORT

if __name__ == "__main__":
  httpServer = HTTPServer((HOST_NAME, SERVER_PORT), Server)
  print(f"Sqlite server started at: {HOST_NAME}:{SERVER_PORT}")

  try:
    httpServer.serve_forever()
  except KeyboardInterrupt:
    httpServer.server_close()
    print("Server stopped.")