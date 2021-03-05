import UserInformation from "./interfaces/UserInformation";
import axios from "axios";
import { URLS } from "./ConnectionConstants";

export default class DatabaseServer {
  private readonly DATABASE_URL = `http://${URLS.DATABASE_SERVER.HOST}:${URLS.DATABASE_SERVER.PORT}`;

  public sendUserInformation(userInformation: UserInformation): void {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      url: this.DATABASE_URL,
      responseType: "json",
      data: userInformation
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  }

  public getUserInformationById(userId: string): void {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
      url: this.DATABASE_URL,
      responseType: "json",
      data: {
        id: userId
      }
    }).then((response) => {
      console.log(response.data);
    }, (error) => {
      console.log(error);
    })
  }
}