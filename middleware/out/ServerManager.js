"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = __importStar(require("./Server"));
var util_1 = __importDefault(require("util"));
var child_process_1 = __importDefault(require("child_process"));
var ServerMonitor_1 = __importDefault(require("./ServerMonitor"));
var ServerManager = /** @class */ (function () {
    function ServerManager() {
        var _this = this;
        this._serverMonitors = [];
        this.getCurrentRunningServers().then(function (runningServers) {
            _this.getServersFromLogFiles().then(function (serversFromLogFiles) {
                var allServers = _this.getAllServers(runningServers, serversFromLogFiles);
                _this._serverMonitors = _this.createServerMonitors(allServers);
                _this._serverMonitors.forEach(function (serverMonitor) {
                    serverMonitor.startMonitoringServer();
                });
            });
        });
        console.log('⚠️ 🗄️ Server manager started');
    }
    // public getServersStatus(): ServerStatus[] {
    //   const statuses: ServerStatus[] = [];
    //   this._serverMonitors.forEach((monitor) => {
    //     statuses.push(monitor.getCurrentServerStatus());
    //   });
    //   return statuses;
    // }
    ServerManager.prototype.restartServer = function (serverName) {
        this._serverMonitors.forEach(function (monitor) {
            if (monitor.serverName === serverName) {
                console.log("\u26A0\uFE0F \uD83D\uDDC4\uFE0F Restarting server: " + monitor.serverName);
                monitor.restartServer();
            }
        });
    };
    // public createNewServer(): Error | void {
    //   const serverCount = this._serverMonitors.length;
    //   const availablePort = this.getAvailablePort();
    //   if (availablePort > 0) {
    //     console.log(`☑️ 🗄️ Total servers up: ${serverCount}`);
    //     const server = new Server(availablePort);
    //     const result: Error | void = server.startServer(() => {
    //       const serverMonitor = new ServerMonitor(server);
    //       serverMonitor.startMonitoringServer();
    //       this._serverMonitors.push(serverMonitor);
    //     });
    //     if (result) {
    //       return result;
    //     }
    //   }
    // }
    ServerManager.prototype.sendImageToServer = function (callback) {
        var serverIndex = 0;
        console.log('⚠️ Load balancing the image response!');
        if (this._activeServer) {
            console.log("\u26A0\uFE0F \uD83D\uDDC4\uFE0F " + this._activeServer.serverName + " getting the request.");
            var serverIndex_1 = (this._serverMonitors.indexOf(this._activeServer) + 1) % this._serverMonitors.length;
            this._activeServer = this._serverMonitors[serverIndex_1];
            console.log("\u26A0\uFE0F \uD83D\uDDC4\uFE0F " + this._activeServer.serverName + " next server getting the request.");
        }
        else {
            this._activeServer = this._serverMonitors[serverIndex];
            console.log("\u26A0\uFE0F \uD83D\uDDC4\uFE0F " + this._activeServer.serverName + " getting the request.");
        }
        this._activeServer.sendImage(callback);
    };
    ServerManager.prototype.clearTemp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var process, stderr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('⚠️ 🗑️ Clearing temporary files...');
                        process = util_1.default.promisify(child_process_1.default.exec);
                        return [4 /*yield*/, process('bash ./scripts/clearTemp.sh')];
                    case 1:
                        stderr = (_a.sent()).stderr;
                        if (stderr) {
                            console.log("Something went wrong clearing the temporary files: " + stderr);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // =========================================== PRIVATE METHODS ===================================
    ServerManager.prototype.getCurrentRunningServers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var servers, process, _a, stdout, stderr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('⚠️ 🐋 Loading script to check running servers in Docker...');
                        servers = [];
                        process = util_1.default.promisify(child_process_1.default.exec);
                        return [4 /*yield*/, process('bash ./scripts/getRunningServersPorts.sh')];
                    case 1:
                        _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                        if (stderr) {
                            console.log("Something went wrong with the checking of the servers: " + stderr);
                            return [2 /*return*/, []];
                        }
                        stdout.split('\n').forEach(function (port) {
                            if (port.length > 0 && !isNaN(parseInt(port))) {
                                var server = new Server_1.default(parseInt(port));
                                servers.push(server);
                            }
                        });
                        console.log('⚠️ 🐋 Servers running in Docker found:');
                        console.log(servers);
                        return [2 /*return*/, servers];
                }
            });
        });
    };
    ;
    ServerManager.prototype.getServersFromLogFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var servers, process, _a, stdout, stderr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        servers = [];
                        process = util_1.default.promisify(child_process_1.default.exec);
                        return [4 /*yield*/, process('bash ./scripts/getServersLogFiles.sh')];
                    case 1:
                        _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                        if (stderr) {
                            console.log("Something went wrong with getting the servers log files: " + stderr);
                            return [2 /*return*/, []];
                        }
                        stdout.split('\n').forEach(function (logFile) {
                            if (logFile.length > 0) {
                                var ports = logFile.split(Server_1.LOG_FILE_BASE_NAME);
                                var server = new Server_1.default(parseInt(ports[1]));
                                servers.push(server);
                            }
                        });
                        console.log('⚠️ 📋 Servers found from the log files:');
                        console.log(servers);
                        return [2 /*return*/, servers];
                }
            });
        });
    };
    ServerManager.prototype.getAllServers = function (serversRunning, serversFromLogFiles) {
        console.log('⚠️ 🗄️ Merging running servers and log files...');
        var servers = Array.from(serversRunning);
        var duplicated = false;
        var _loop_1 = function (i) {
            duplicated = false;
            serversRunning.forEach(function (server) {
                if (serversFromLogFiles[i].compareName(server)) {
                    duplicated = true;
                    return;
                }
            });
            if (!duplicated) {
                servers.push(serversFromLogFiles[i]);
            }
        };
        for (var i = 0; i < serversFromLogFiles.length; i++) {
            _loop_1(i);
        }
        console.log('⚠️ 🗄️ Running servers and log files found:');
        console.log(servers);
        return servers;
    };
    ServerManager.prototype.createServerMonitors = function (servers) {
        var monitors = [];
        servers.forEach(function (server) {
            monitors.push(new ServerMonitor_1.default(server));
        });
        return monitors;
    };
    return ServerManager;
}());
exports.default = ServerManager;
