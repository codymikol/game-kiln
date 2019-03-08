describe('Entity', function () {

    var testEntity;

    class TestEntity extends Kiln.Entity {

        constructor() {
            super();
            this.hasCalledCreate = false;
        }

        onCreate = () => {
            this.hasCalledCreate = true;
        };

    }

    beforeEach(function () {
        testEntity = new TestEntity();
    });

    describe('onCreate', function () {

        it('should call onCreate when the create method is called (usually by the screen)'
            , function () {
                testEntity.create();
                expect(testEntity.hasCalledCreate).toEqual(true);
            });

    });

    describe('onDestroy', function () {

        it('should call onDestroy when being destroyed', function () {
            spyOn(testEntity, 'onDestroy').and.stub();
            testEntity.destroy();
            expect(testEntity.onDestroy).toHaveBeenCalled();
        });

    });

});