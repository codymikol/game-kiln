import {KEntity} from "../../src";

describe('Entity', function () {

    var testEntity;

    class TestEntity extends KEntity {

        constructor() {
            super();
            this.intervalBoops = 0;
            this.hasCalledCreate = false;
            this.onCreate = () => {
                this.hasCalledCreate = true;
            }
        }

    }

    class TestChildEntity extends KEntity {
        constructor() {
            super();
            this.name = 'Cody';
        }
    }

    beforeEach(function () {
        testEntity = new TestEntity();
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

    });

    describe('add', function () {

        var child;

        beforeEach(function () {
            child = new TestChildEntity();
            spyOn(testEntity, '_addToScreenManager').and.stub();
            testEntity.kiln = 'cody';
            testEntity.add(child);
        });

        it('should set the kiln of the child to that of the parent', function () {
            expect(child.kiln).toEqual('cody')
        });

        it('should set the _parent to that of the parent', function () {
            expect(child._parent).toEqual(testEntity);
        });

    });

});