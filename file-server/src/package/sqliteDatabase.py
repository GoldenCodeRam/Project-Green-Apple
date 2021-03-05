import sqlite3

import os

import time

class SqliteDatabase:
  SERVER_FILE_NAME = "people_id.sqlite"

  def __init__(self):
    super().__init__()
    if not os.path.exists(f"database/{self.SERVER_FILE_NAME}"):
      with open(f"database/{self.SERVER_FILE_NAME}", "w"): pass

    self._initialize_database()
    

  def read_user_file_from_database(self, id):
    cursor = self._connection.cursor()

    userCursor = cursor.execute("select imageFilePath from people where id = ?", (id,))
    userInformation = userCursor.fetchone()
    if userInformation != None:
      return {
        "imageFilePath": userInformation[0]
      }
    else:
      return None


  def write_user_file_to_database(self, id, fileBytes):
    milliseconds = int(round(time.time() * 1000))
    file_path = f"images/{id}_{milliseconds}.jpg"

    cursor = self._connection.cursor()
    try:
      cursor.executemany(
        "insert into people values (?, ?)",
        [(id, file_path)]
      )
      self._writeFileBytesToFile(id, fileBytes, file_path)
      print("Information written into database.")
    except Exception as exception:
      print("Information couldn't be written into database.")
      raise exception
    finally:
      cursor.close()


  def commit_all(self):
    self._connection.commit()


  def _initialize_database(self):
    self._connection = sqlite3.connect(f"database/{self.SERVER_FILE_NAME}")
    self._connection.execute('''
      create table if not exists people (
        id            integer   primary key,
        imageFilePath text      not null
      )
    ''')
  
    print("Connection reached with Sqlite file database.")

  
  def _writeFileBytesToFile(self, id, file_bytes, file_path):
    with open(file_path, "wb") as image_file:
      image_file.write(file_bytes)