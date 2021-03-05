import sqlite3

import os

class SqliteDatabase:
  SERVER_FILE_NAME = "vaccinated_people.sqlite"

  def __init__(self):
    super().__init__()
    if not os.path.exists(f"database/{self.SERVER_FILE_NAME}"):
      with open(f"database/{self.SERVER_FILE_NAME}", "w"): pass

    self._initialize_database()
    

  def read_id_to_user_from_database(self, id):
    cursor = self._connection.cursor()

    userCursor = cursor.execute("select * from people where id = ?", (id,))
    userInformation = userCursor.fetchone()
    if userInformation != None:
      return {
        "id": userInformation[0],
        "firstName": userInformation[1],
        "lastName": userInformation[2],
        "city": userInformation[3]
      }
    else:
      return None


  def write_user_to_database(self, user):
    try:
      information = {
        "id": user["id"],
        "firstName": user["firstName"],
        "lastName": user["lastName"],
        "city": user["city"]
      }
    except KeyError:
      print("Incorrect information, not writing to database.")
      raise KeyError
      return

    cursor = self._connection.cursor()
    try:
      cursor.executemany(
        "insert into people values (?, ?, ?, ?)",
        [(
          information["id"],
          information["firstName"],
          information["lastName"],
          information["city"]
        )]
      )
      print("Information written into database.")
    except Exception as exception:
      print("Information couldn't be written into database.")
      raise exception
    finally:
      cursor.close()


  def commit_all(self):
    self._connection.commit()


  def _initialize_database(self):
    self._connection = sqlite3.connect('database/vaccinated_people.sqlite')
    self._connection.execute('''
      create table if not exists people (
        id          integer   primary key,
        firstName   text      not null,
        lastName    text      not null,
        city        text      not null)
    ''')
  
    print("Connection reached with Sqlite file database.")

    