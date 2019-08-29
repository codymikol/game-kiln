import LoopManager from "./Loop/LoopManager";
import {KScreen} from "../../../index";
import KGameInstance from "./KGameInstance";

var kGameStore = {};

export default function KGame(kilnName, bindElement, initialScreen) {

    if (arguments.length === 1) {
        if (!kGameStore[kilnName]) throw new Error('No Kiln found for "' + kilnName + '"');
        return kGameStore[kilnName]
    }

    var errorPrefix = '\nKGame accepts [name, canvas, screen] args, \nBUT The below errors occurred';
    var errors = [];

    function check(predicate, errorMessage) {
        if (predicate) errors.push(errorMessage)
    }

    check(!(bindElement instanceof Element), '["canvas" was not a valid DOM element]');
    check(bindElement && bindElement.nodeName !== 'CANVAS', '["canvas" was not a canvas element]');
    check(typeof kilnName !== "string", '["name" was not a string]');
    check(!initialScreen || !(initialScreen instanceof KScreen), '["screen" was not an instance of KScreen]');

    if (errors.length > 0) throw new Error(errors.reduce((col, e) => col + '\n' + e, errorPrefix));

    let gameLoop = new LoopManager(kilnName, bindElement, initialScreen);

    if (gameLoop.initialized) {
        throw new Error('A game with the name ' + kilnName + ' has already been initialized!')
    } else {
        kGameStore[kilnName] = new KGameInstance(kilnName, bindElement, initialScreen, gameLoop);
    }

}