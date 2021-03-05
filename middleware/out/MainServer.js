"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var UserInformation_1 = require("./interfaces/UserInformation");
var Constants_1 = require("./Constants");
var MainServer = /** @class */ (function () {
    function MainServer() {
        this._application = express_1.default();
        this._application.use(express_1.default.raw({ limit: "10mb" }));
        this._application.use(express_1.default.json());
        this.setGetMethods();
        this.setPostMethods();
        this.startServer();
    }
    MainServer.prototype.setGetMethods = function () {
        this._application.get("/", function (_, response) {
            response.send('Henlo world');
        });
    };
    MainServer.prototype.setPostMethods = function () {
        this._application.post("/sendUserInformation", function (request, response) {
            var userInformationJson = request.body;
            var userInformation = {
                id: userInformationJson.id,
                firstName: userInformationJson.firstName,
                lastName: userInformationJson.lastName,
                city: userInformationJson.city
            };
            if (UserInformation_1.checkUserInformation(userInformation)) {
                response.sendStatus(200);
            }
            else {
                response.sendStatus(400);
            }
        });
        this._application.post("/sendUserImageId", function (request, response) {
            var userImageIdBytes = request.body;
        });
    };
    MainServer.prototype.startServer = function () {
        this._application.listen(Constants_1.URLS.MIDDLEWARE_SERVER.PORT, Constants_1.URLS.MIDDLEWARE_SERVER.HOST, function () {
            console.log("Main server running at: " + Constants_1.URLS.MIDDLEWARE_SERVER.HOST + ":" + Constants_1.URLS.MIDDLEWARE_SERVER.PORT);
        });
    };
    return MainServer;
}());
exports.default = MainServer;
