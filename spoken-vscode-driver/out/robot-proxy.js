"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipc = require("node-ipc");
const fs = require("fs");
const logger_1 = require("./logger");
class RobotVSCodeProxy {
    constructor() {
        this.vscodeRobotInstance = null;
    }
    proxy(request, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default('[vscode-driver.robot-vscode.proxy]: Received request to process:\n\t' + JSON.stringify(request));
                let response = null;
                let robot = this.vscodeRobotInstance;
                if (robot == null) {
                    // const { createInstance } = await import('./robot-vscode')
                    const str = fs.readFileSync(__dirname + '/robot-vscode.js', 'utf-8');
                    const createInstance = eval(str);
                    robot = createInstance();
                }
                // @ts-ignore
                response = yield robot[request.type](...request.extra.args);
                logger_1.default('[vscode-driver.robot-vscode.proxy]: Emiting response for ' + request.id);
                ipc.server.emit(socket, 'runCommand/response', {
                    id: request.id,
                    err: false,
                    response
                });
            }
            catch (err) {
                logger_1.default('[vscode-driver.robot-vscode.proxy]: Error executing ' + request.type + '\n' + err);
                ipc.server.emit(socket, 'runCommand/response', {
                    id: request.id,
                    err: err || true,
                    response: null
                });
            }
        });
    }
}
// hello
exports.default = new RobotVSCodeProxy();
//# sourceMappingURL=robot-proxy.js.map