"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KEntity_1 = require("../KEntity/KEntity");
var KScreen = /** @class */ (function () {
    function KScreen() {
        this.nonce = 0;
        this.kiln = null;
        this.entities = {};
    }
    KScreen.prototype.setKiln = function (kiln) {
        this.kiln = kiln;
    };
    KScreen.prototype.add = function (entity) {
        if (!(entity instanceof KEntity_1.default))
            throw new Error('attempted to add non "KEntity" to "KScreen"');
        this.entities[entity.id] = entity;
        entity.setKiln(this.kiln);
        entity.setParent(this);
        entity.onCreate();
        this.nonce++;
    };
    KScreen.prototype.delete = function (id) {
        if (!Number.isInteger(id))
            throw new Error('Attempted to delete "KEntity" from screen, but an invalid id was passed!');
        if (!this.entities[id])
            throw new Error('Tried to delete entity id {' + id + '} but it does not exist!');
        delete this.entities[id];
    };
    KScreen.prototype.onCreate = function () {
        console.error("\nNo onCreate called for: ".concat(Object.getPrototypeOf(this).constructor.name, "!\nYou should override this classes onCreate method to define your entities! "));
    };
    KScreen.prototype.onDestroy = function () {
        //Overrideable
    };
    return KScreen;
}());
exports.default = KScreen;
