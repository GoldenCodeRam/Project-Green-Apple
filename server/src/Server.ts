import express from "express";
import { URLS } from "./ConnectionConstants";
import DatabaseServer from "./DatabaseServer";
import ImageDatabaseServer from "./ImageDatabaseServer";
import UserInformation, { checkUserInformation } from "./interfaces/UserInformation";

export default class Server {
  private readonly _databaseServer: DatabaseServer = new DatabaseServer();
  private readonly _imageDatabaseServer: ImageDatabaseServer = new ImageDatabaseServer();

  private readonly _server: express.Express;

  constructor() {
    this._server = express();
    this._server.use(express.raw({ limit: "10mb" }));
    this._server.use(express.json());

    this.setGetMethods();
    this.setPostMethods();
    this.startServer();
  }

  private setGetMethods() {
    this._server.get("/getUserInformation", (request, response) => {
      const userId = request.query.id;
      if (userId) {
        this._databaseServer.getUserInformationById(userId.toString());
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
    })

    this._server.get("/", (request, response) => {
      console.log("testinbg");
      response.send("Testing");
    });
  }

  private setPostMethods() {
    this._server.post("/sendUserInformation", (request, response) => {
      const userInformationJson = request.body;
      const userInformation: UserInformation = {
        id: userInformationJson.id,
        firstName: userInformationJson.firstName,
        lastName: userInformationJson.lastName,
        city: userInformationJson.city
      }
      if (checkUserInformation(userInformation)) {
        this._databaseServer.sendUserInformation(userInformation);
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
    });

    this._server.post("/sendUserIdImage", (request, response) => {
      try{
        const userIdImageBytes = request.body as Buffer;
        this._imageDatabaseServer.sendUserIdImage(userIdImageBytes);
        response.sendStatus(200);
      } catch(error) {
        console.log(error);
        response.sendStatus(400);
      }
    });
  }

  private startServer() {
    this._server.listen(URLS.SERVER.PORT, URLS.SERVER.HOST, () => {
      console.log(`Main server running at: ${URLS.SERVER.HOST}:${URLS.SERVER.PORT}`);
    })
  }
}