import LoopManager from "./Loop/LoopManager";
import {KScreen} from "../../../index";
import KGameInstance from "./KGameInstance";

var kGameStore = {};

export default function KGame(kilnName, bindElement, initialScreen) {

    if (arguments.length === 1) return kGameStore[kilnName] || null;

    var errorPrefix = '\nKGame accepts [name, container, screen] args, \nBUT The below errors occurred';
    var errors = [];

    function check(predicate, errorMessage) {
        if (predicate) errors.push(errorMessage)
    }

    check(!(bindElement instanceof Element), '["container" was not a valid DOM element]');
    check(bindElement && bindElement.nodeName !== 'DIV', '["container" was not a div element]');
    check(typeof kilnName !== "string", '["name" was not a string]');
    check(!initialScreen || !(initialScreen instanceof KScreen), '["screen" was not an instance of KScreen]');

    if (errors.length > 0) throw new Error(errors.reduce((col, e) => col + '\n' + e, errorPrefix));

    if (KGame(kilnName)) {
        throw new Error('A game with the name ' + kilnName + ' has already been initialized!')
    } else {
        kGameStore[kilnName] = new KGameInstance(kilnName, bindElement, initialScreen, kGameStore);
        return kGameStore[kilnName]
    }

}