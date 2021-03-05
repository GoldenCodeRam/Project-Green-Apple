# Project Green Apple

<p align="center">
  <img src="logo.svg" width="120">
</p>
<p align="center">
  A Vaccine User Database!
</p>

--------------------

A Vaccine User Database!

The project will register people that will get vaccinated, so the Client takes the name of the user, the ubication of the user, and a photo of a legal document (for example, the ID of the user). The data given by the user will be stored on a database, handled by the Middleware, which is separated from the Client.

If the Client needs information about the information registered by city, the system is capable of sending a XLSX report to the Client.

The system also is capable of showing a graph of the total of registered users by city, which uses the Middleware and a [Redis](https://redis.io/) Cache Database.
