"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = __importDefault(require("child_process"));
// import {ServerStatus, OK, SERVICE_UNAVAILABLE} from './ServerStatus';
var ServerMonitor = /** @class */ (function () {
    function ServerMonitor(server) {
        this._server = server;
        // this._logger = new DatabaseLogger(this._server.name);
    }
    Object.defineProperty(ServerMonitor.prototype, "serverName", {
        // private _logger: DatabaseLogger;
        get: function () {
            return this._server.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerMonitor.prototype, "serverPort", {
        get: function () {
            return this._server.port;
        },
        enumerable: false,
        configurable: true
    });
    ServerMonitor.prototype.startMonitoringServer = function () {
        console.log("\u2611\uFE0F \uD83D\uDDC4\uFE0F Monitor for server: " + this._server.name + " started!");
        // this.getServerStatus();
    };
    ServerMonitor.prototype.restartServer = function () {
        this._server.startServer();
    };
    ServerMonitor.prototype.sendImage = function (callback) {
        child_process_1.default.exec("bash ./scripts/sendImage.sh " + this.serverPort, function (error, stdout, stderr) {
            if (stderr || error) {
                console.log("exec error: " + error);
            }
            else {
                console.log(stdout);
                callback();
            }
        });
    };
    ServerMonitor.TIMEOUT_TIME = 5000;
    return ServerMonitor;
}());
exports.default = ServerMonitor;
