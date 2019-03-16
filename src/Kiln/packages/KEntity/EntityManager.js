
let instance;

export default class EntityManager {

    constructor() {
        if (instance) return instance;
        instance = this;
        this.currentId = 1;
    }

    getNextEntityId() {
        return this.currentId++;
    }

}