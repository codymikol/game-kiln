describe('Entity', function () {

    var testEntity;

    class TestEntity extends Kiln.Entity {

        constructor() {
            super();
            this.intervalBoops = 0;
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

    describe('interval', function () {

        beforeEach(function () {
            jasmine.clock().install();
            testEntity.interval(function () {
                this.intervalBoops += 1;
            }, 100);
        });

        afterEach(function () {
            jasmine.clock().uninstall();
        });

        it('not increment before the first specified interval', function () {
            expect(testEntity.intervalBoops).toEqual(0)
        });

        it('not increment before the first specified interval', function () {
            jasmine.clock().tick(99);
            expect(testEntity.intervalBoops).toEqual(0)
        });

        it('should increment after the time', function () {
            jasmine.clock().tick(101);
            expect(testEntity.intervalBoops).toEqual(1)
        });

        it('should continue to increment', function () {
            jasmine.clock().tick(301);
            expect(testEntity.intervalBoops).toEqual(3)
        });

    });

    describe('timeout', function() {

        beforeEach(function () {
            jasmine.clock().install();
            testEntity.timeout(function () {
                this.intervalBoops += 1;
            }, 100);
        });

        afterEach(function () {
            jasmine.clock().uninstall();
        });

        it('not increment before the timeout', function () {
            expect(testEntity.intervalBoops).toEqual(0)
        });

        it('increment after the timeout', function () {
            jasmine.clock().tick(101);
            expect(testEntity.intervalBoops).toEqual(1)
        });

        it('should not increment more than once', function () {
            jasmine.clock().tick(301);
            expect(testEntity.intervalBoops).toEqual(1)
        });

    })

});