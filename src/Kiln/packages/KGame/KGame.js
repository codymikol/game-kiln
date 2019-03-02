import LoopManager from "./Loop/LoopManager";

export default function KGame(kilnName, bindElement, initialScreen) {

    var errorPrefix = '\nKiln.Game accepts [name, canvas, screen] args, \nBUT The below errors occurred';
    var errors =[];

    function check(predicate, errorMessage) {
        if(predicate) errors.push(errorMessage)
    }

    check(!(bindElement instanceof Element), '["canvas" was not a valid DOM element]');
    check(bindElement && bindElement.nodeName !== 'CANVAS', '["canvas" was not a canvas element]');
    check(typeof kilnName !== "string", '["name" was not a string]');
    check(!initialScreen || !(initialScreen instanceof Kiln.Screen), '["screen" was not an instance of Kiln.Screen]');

    if(errors.length > 0) throw new Error(errors.reduce((col, e) => col + '\n' + e, errorPrefix));

    let gameLoop = new LoopManager(kilnName, bindElement, initialScreen);

    if(gameLoop.initialized) {
        throw new Error('A game with the name ' + kilnName + ' has already been initialized!')
    } else {
        gameLoop.init();
    }


}