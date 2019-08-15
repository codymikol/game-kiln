import {KScreen,KGame} from "../../src";

describe('Game', function () {
    describe('Creating a new Kiln', function () {

        class TestScreen extends KScreen {
            constructor() {
                super();
                this.onCreate = () => {
                    this.mustBeDefinedToNotThrowGlobalError = true;
                }
            }
        }

        var errorPrefix = '\nKGame accepts [name, canvas, screen] args, \nBUT The below errors occurred';
        var canvasElem = document.createElement('CANVAS');
        var buttonElem = document.createElement('BUTTON');
        var testScreen = new TestScreen();


        it('should throw a useful error when an HTML element is not passed', function () {
            expect(KGame.bind(null, 'my-game', null, testScreen))
                .toThrow(new Error(errorPrefix + '\n["canvas" was not a valid DOM element]'))
        });

        it('should throw a useful error when a non canvas element is passed', function () {
            expect(KGame.bind(null, 'my-game', buttonElem, testScreen))
                .toThrow(new Error(errorPrefix + '\n["canvas" was not a canvas element]'))
        });

        it('should throw a useful error when a name is not passed', function () {
            expect(KGame.bind(null, null, canvasElem, testScreen))
                .toThrow(new Error(errorPrefix + '\n["name" was not a string]'))
        });

        it('should throw an error if a starting screen is not defined', function () {
            expect(KGame.bind(null, 'cool-game', canvasElem, null))
                .toThrow(new Error(errorPrefix + '\n["screen" was not an instance of KScreen]'))
        });

        it('should be able to concat all errors together :D', function () {
            expect(KGame.bind(null, null, null, null))
                .toThrow(new Error(errorPrefix + '\n' +
                    '["canvas" was not a valid DOM element]\n' +
                    '["name" was not a string]\n' +
                    '["screen" was not an instance of KScreen]'))
        });

        it('should not trow an error if a valid name and canvas element are provided', function () {
            expect(KGame.bind(null, 'new-game', canvasElem, testScreen)).not.toThrow()
        });

    });
});