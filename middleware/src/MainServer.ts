import express from "express";
import UserInformation, { checkUserInformation } from "./interfaces/UserInformation";
import { URLS } from "./Constants";
import ServerManager from "./ServerManager";

export default class MainServer {
  // private readonly _serverManager: ServerManager = new ServerManager();

  private readonly _application: express.Express;

  constructor() {
    this._application = express();
    this._application.use(express.raw({ limit: "10mb" }));
    this._application.use(express.json());

    this.setGetMethods();
    this.setPostMethods();
    this.startServer();
  }

  private setGetMethods() {
    this._application.get("/", (_, response) => {
      response.send('Henlo world');
    });
  }

  private setPostMethods() {
    this._application.post("/sendUserInformation", (request, response) => {
      const userInformationJson = request.body;
      const userInformation: UserInformation = {
        id: userInformationJson.id,
        firstName: userInformationJson.firstName,
        lastName: userInformationJson.lastName,
        city: userInformationJson.city
      }
      if (checkUserInformation(userInformation)) {
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
    });

    this._application.post("/sendUserImageId", (request, response) => {
      const userImageIdBytes = request.body;
      
    });
  }

  private startServer() {
    this._application.listen(URLS.MIDDLEWARE_SERVER.PORT, URLS.MIDDLEWARE_SERVER.HOST, () => {
      console.log(`Main server running at: ${URLS.MIDDLEWARE_SERVER.HOST}:${URLS.MIDDLEWARE_SERVER.PORT}`);
    })
  }
}