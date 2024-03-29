"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KInput = exports.KDraw = exports.KEntity = exports.KScreen = exports.KGame = void 0;
var KGame_1 = require("./Kiln/packages/KGame/KGame");
exports.KGame = { createKGame: KGame_1.createKGame, getKGame: KGame_1.getKGame };
var KScreen_1 = require("./Kiln/packages/KScreen/KScreen");
Object.defineProperty(exports, "KScreen", { enumerable: true, get: function () { return KScreen_1.default; } });
var KEntity_1 = require("./Kiln/packages/KEntity/KEntity");
Object.defineProperty(exports, "KEntity", { enumerable: true, get: function () { return KEntity_1.default; } });
var KDraw_1 = require("./Kiln/packages/KDraw/KDraw");
Object.defineProperty(exports, "KDraw", { enumerable: true, get: function () { return KDraw_1.default; } });
var KInput_1 = require("./Kiln/packages/Kinput/KInput");
Object.defineProperty(exports, "KInput", { enumerable: true, get: function () { return KInput_1.default; } });
