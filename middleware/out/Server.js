"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_FILE_BASE_NAME = void 0;
var child_process_1 = __importDefault(require("child_process"));
exports.LOG_FILE_BASE_NAME = 'server_';
var Server = /** @class */ (function () {
    function Server(port) {
        this._name = "" + exports.LOG_FILE_BASE_NAME + port;
        this._port = port;
        this._isAvailable = false;
    }
    Object.defineProperty(Server.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Server.prototype, "port", {
        get: function () {
            return this._port;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Server.prototype, "isAvailable", {
        get: function () {
            return this._isAvailable;
        },
        enumerable: false,
        configurable: true
    });
    Server.serverFromServerName = function (name) {
        var serverPort = parseInt(name.replace('server_', ''));
        return new Server(serverPort);
    };
    Server.prototype.startServer = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        console.log("\u26A0\uFE0F \uD83D\uDDC4\uFE0F Loading script to create server at port: " + this._port + "...");
        child_process_1.default.exec("bash ./scripts/createServer.sh " + this._port, function (error, stdout, stderr) {
            if (stderr || error) {
                console.log(stderr || error);
                return new Error('❌ 🗄️ The server couldnz\'t be started!');
            }
            else {
                callback();
                console.log("\u2611\uFE0F \uD83D\uDDC4\uFE0F New server: " + _this._name + ", at port " + _this._port);
            }
        });
    };
    Server.prototype.setAvailable = function () {
        this._isAvailable = true;
    };
    Server.prototype.setUnavailable = function () {
        this._isAvailable = false;
    };
    Server.prototype.compareName = function (server) {
        return !(this._name.localeCompare(server._name.toString()));
    };
    return Server;
}());
exports.default = Server;
