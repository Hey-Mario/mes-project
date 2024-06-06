import { FlyweightObject } from '../models/FlyweightObject';

export class FlyweightFactory {
    private flyweights = new Map<string, FlyweightObject>();

    async getFlyweight(key: string): Promise<FlyweightObject> {
        if (!this.flyweights.has(key)) {
            const flyweight = await FlyweightObject.create(key);
            this.flyweights.set(key, flyweight);
        }
        return this.flyweights.get(key)!; // Utilisation de l'opérateur non-null assertion car nous savons que la clé existe
    }
}