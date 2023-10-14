
let instance: EntityManager;

export default class EntityManager {

    private currentId: number;

    constructor() {
        if (instance) return instance;
        instance = this;
        this.currentId = 1;
    }

    getNextEntityId() {
        return this.currentId++;
    }

}