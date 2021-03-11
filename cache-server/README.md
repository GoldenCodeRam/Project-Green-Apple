<h1 align="center">Cache Server</h1>
<p align="center">
  <kbd>
    <img src="https://www.vectorlogo.zone/logos/redis/redis-icon.svg" width="30">
  </kbd>
  <kbd>
  <img src="https://www.vectorlogo.zone/logos/python/python-icon.svg" width="30">
  </kbd>
  <kbd>
  <img src="https://www.vectorlogo.zone/logos/docker/docker-tile.svg" width="30">
  </kbd>
</p>

## 1. Store information 
### Tasks
* [x] Generate the Docker image, storing the Redis server and the Python language.
* [x] Receive the city information, through a HTTP POST request.
* [x] Save the information into the Redis server.
* [x] Send the city information from Redis, through a HTTP GET request.

This is the way the server will receive and send information:

```JSON
// POST
{
  "city": "Bogotá"
}
// GET
{
  "Bogotá": 32,
  "Tunja": 12,
  "Cali": 34
}
```

## 2. Create the Docker image and put it to work
### Tasks
* [x] Generate the Dockerfile file.
* [x] Test the Dockerfile to see if it works when it is launched.
* [x] Generate the Dockerfile with a custom port for the launch.
* [ ] Test if the storing of information still works.
