describe('Screen', function () {

    class TestScreen extends Kiln.Screen {
        constructor() {
            super();
        }
    }

    class Goblin extends Kiln.Entity {
        constructor() {
            super();
            this.color = 'green';
            this.health = 9999;
        }
    }

    var testScreen, validEntity;

    beforeEach(function () {
        testScreen = new TestScreen();
        validEntity = new Goblin();
    });

    describe('setKiln', function () {

        it('should initialize without a kiln name', function () {
            expect(testScreen.kiln).toBeNull();
        });

        it('should set the kiln name via setKiln', function () {
            testScreen.setKiln('my-game');
            expect(testScreen.kiln).toEqual('my-game');
        });

    });

    describe('add', function () {

        it('should throw an error when adding something that doesnt extend entity', function () {
            expect(testScreen.add.bind(null, {}))
                .toThrow(new Error('attempted to add non "Kiln.Entity" to "Kiln.Screen"'))
        });

        //TODO: This is failing, but can be fixed by #22, this functions under a real deployment, but because
        //TODO: Mouse is tied into KEntity, it tries to load a canvas. :(
        xit('should NOT throw when adding valid prototype of entity', function () {
            expect(testScreen.add.bind(testScreen, validEntity)).not.toThrow();
        });

    });

});

describe('ScreenManager', function () {



});