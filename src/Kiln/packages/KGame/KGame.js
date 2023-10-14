"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKGame = exports.getKGame = void 0;
var KGameInstance_1 = require("./KGameInstance");
var kGameStore = new Map();
function getKGame(kinName) {
    return kGameStore.get(kinName);
}
exports.getKGame = getKGame;
function createKGame(kilnName, bindElement, initialScreen) {
    if (bindElement instanceof HTMLDivElement) {
        throw new Error("[\"container\" was not a div element]");
    }
    if (undefined == getKGame(kilnName)) {
        throw new Error('A game with the name ' + kilnName + ' has already been initialized!');
    }
    var instance = new KGameInstance_1.default(kilnName, bindElement, initialScreen, kGameStore);
    kGameStore.set(kilnName, instance);
    return instance;
}
exports.createKGame = createKGame;
