describe('Game', function () {
    describe('Creating a new Kiln', function () {

        class TestScreen extends Kiln.Screen {
            constructor() {
                super();
            }

            onCreate = () => {
                this.mustBeDefinedToNotThrowGlobalError = true;
            }

        }

        var errorPrefix = '\nKiln.Game accepts [name, canvas, screen] args, \nBUT The below errors occurred';
        var canvasElem = document.createElement('CANVAS');
        var buttonElem = document.createElement('BUTTON');
        var testScreen = new TestScreen();


        it('should throw a useful error when an HTML element is not passed', function () {
            expect(Kiln.Game.bind(null, 'my-game', null, testScreen))
                .toThrow(new Error(errorPrefix + '\n["canvas" was not a valid DOM element]'))
        });

        it('should throw a useful error when a non canvas element is passed', function () {
            expect(Kiln.Game.bind(null, 'my-game', buttonElem, testScreen))
                .toThrow(new Error(errorPrefix + '\n["canvas" was not a canvas element]'))
        });

        it('should throw a useful error when a name is not passed', function () {
            expect(Kiln.Game.bind(null, null, canvasElem, testScreen))
                .toThrow(new Error(errorPrefix + '\n["name" was not a string]'))
        });
        
        it('should throw an error if a starting screen is not defined', function () {
            expect(Kiln.Game.bind(null, 'cool-game', canvasElem, null))
                .toThrow(new Error(errorPrefix + '\n["screen" was not an instance of Kiln.Screen]'))
        });

        it('should be able to concat all errors together :D', function () {
            expect(Kiln.Game.bind(null, null, null, null))
                .toThrow(new Error(errorPrefix + '\n' +
                    '["canvas" was not a valid DOM element]\n' +
                    '["name" was not a string]\n' +
                    '["screen" was not an instance of Kiln.Screen]'))
        });

        it('should not trow an error if a valid name and canvas element are provided', function () {
            expect(Kiln.Game.bind(null, 'new-game', canvasElem, testScreen)).not.toThrow()
        });

    });
});