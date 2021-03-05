"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var ConnectionConstants_1 = require("./ConnectionConstants");
var DatabaseServer = /** @class */ (function () {
    function DatabaseServer() {
        this.DATABASE_URL = "http://" + ConnectionConstants_1.URLS.DATABASE_SERVER.HOST + ":" + ConnectionConstants_1.URLS.DATABASE_SERVER.PORT;
    }
    DatabaseServer.prototype.sendUserInformation = function (userInformation) {
        axios_1.default({
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            url: this.DATABASE_URL,
            responseType: "json",
            data: userInformation
        }).then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
    };
    DatabaseServer.prototype.getUserInformationById = function (userId) {
        axios_1.default({
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
            url: this.DATABASE_URL,
            responseType: "json",
            data: {
                id: userId
            }
        }).then(function (response) {
            console.log(response.data);
        }, function (error) {
            console.log(error);
        });
    };
    return DatabaseServer;
}());
exports.default = DatabaseServer;
