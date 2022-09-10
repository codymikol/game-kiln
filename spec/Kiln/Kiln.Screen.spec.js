import {KEntity, KScreen} from "../../src";

describe('Screen', function () {

    class TestScreen extends KScreen {
        constructor() {
            super();
        }
    }

    class Goblin extends KEntity {
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
                .toThrow(new Error('attempted to add non "KEntity" to "KScreen"'))
        });

        it('should NOT throw when adding valid prototype of entity', function () {
            expect(testScreen.add.bind(testScreen, validEntity)).not.toThrow();
        });

    });

});