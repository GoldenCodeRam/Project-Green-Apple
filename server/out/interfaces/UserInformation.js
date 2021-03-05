"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserInformation = void 0;
function checkUserInformation(userInformation) {
    var userInformationCorrect = true;
    Object.values(userInformation).forEach(function (value) {
        if (typeof value === "undefined") {
            userInformationCorrect = false;
        }
    });
    return userInformationCorrect;
}
exports.checkUserInformation = checkUserInformation;
