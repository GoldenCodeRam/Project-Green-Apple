"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ConnectionConstants_1 = require("./ConnectionConstants");
var DatabaseServer_1 = __importDefault(require("./DatabaseServer"));
var ImageDatabaseServer_1 = __importDefault(require("./ImageDatabaseServer"));
var UserInformation_1 = require("./interfaces/UserInformation");
var Server = /** @class */ (function () {
    function Server() {
        this._databaseServer = new DatabaseServer_1.default();
        this._imageDatabaseServer = new ImageDatabaseServer_1.default();
        this._server = express_1.default();
        this._server.use(express_1.default.raw({ limit: "10mb" }));
        this._server.use(express_1.default.json());
        this.setGetMethods();
        this.setPostMethods();
        this.startServer();
    }
    Server.prototype.setGetMethods = function () {
        var _this = this;
        this._server.get("/getUserInformation", function (request, response) {
            var userId = request.query.id;
            if (userId) {
                _this._databaseServer.getUserInformationById(userId.toString());
                response.sendStatus(200);
            }
            else {
                response.sendStatus(400);
            }
        });
        this._server.get("/", function (request, response) {
            response.json({
                cities: [
                    { "city": "Bogotá", "entries": 122 },
                    { "city": "Tunja", "entries": 56 },
                    { "city": "Zipaquirá", "entries": 16 },
                    { "city": "Medellín", "entries": 30 }
                ]
            });
            console.log("Response sent to client");
        });
        this._server.get("/databaseInformation", function (request, response) {
            response.json({
                database: [
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" },
                    { "id": 123, "firstName": "Luis Alejandro", "lastName": "Quiroga Gómez", "city": "Tunja" }
                ]
            });
        });
    };
    Server.prototype.setPostMethods = function () {
        var _this = this;
        this._server.post("/sendUserInformation", function (request, response) {
            var userInformationJson = request.body;
            var userInformation = {
                id: userInformationJson.id,
                firstName: userInformationJson.firstName,
                lastName: userInformationJson.lastName,
                city: userInformationJson.city
            };
            if (UserInformation_1.checkUserInformation(userInformation)) {
                _this._databaseServer.sendUserInformation(userInformation);
                response.sendStatus(200);
            }
            else {
                response.sendStatus(400);
            }
        });
        this._server.post("/sendUserIdImage", function (request, response) {
            try {
                console.log(request.headers);
                var userIdImageBytes = request.body;
                _this._imageDatabaseServer.sendUserIdImage(userIdImageBytes);
                response.sendStatus(200);
            }
            catch (error) {
                console.log(error);
                response.sendStatus(400);
            }
        });
    };
    Server.prototype.startServer = function () {
        this._server.listen(ConnectionConstants_1.URLS.SERVER.PORT, ConnectionConstants_1.URLS.SERVER.HOST, function () {
            console.log("Main server running at: " + ConnectionConstants_1.URLS.SERVER.HOST + ":" + ConnectionConstants_1.URLS.SERVER.PORT);
        });
    };
    return Server;
}());
exports.default = Server;
