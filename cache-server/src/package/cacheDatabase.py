import redis

from package.constants import *

class CacheDatabase:
  def __init__(self):
    super().__init__()
    self.redisServer = redis.Redis(host=CACHE_HOST_NAME, port=CACHE_SERVER_PORT, db=0)


  def get_records_from_cache(self):
    keys = self.redisServer.keys()
    values = self.redisServer.mget(keys)

    records = {}
    for key, value in zip(keys, values):
      records[key.decode("utf-8")] = value.decode("utf-8")

    return records


  def write_city_record_to_cache(self, record):
    try:
      record = {
        "city": record["city"].upper()
      }
    except KeyError:
      print("Incorrect information, not writing to cache.")
      return

    self.redisServer.incr(record["city"])


  def remove_all_records_from_cache(self):
    self.redisServer.flushall()
    
