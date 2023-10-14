"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var instance;
var EntityManager = /** @class */ (function () {
    function EntityManager() {
        if (instance)
            return instance;
        instance = this;
        this.currentId = 1;
    }
    EntityManager.prototype.getNextEntityId = function () {
        return this.currentId++;
    };
    return EntityManager;
}());
exports.default = EntityManager;
