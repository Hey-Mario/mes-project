import { PrismaClient, FlyweightObject as PrismaFlyweightObject } from '@prisma/client';

const prisma = new PrismaClient();

export class FlyweightObject {
    private sharedState: string;

    constructor(sharedState: string) {
        this.sharedState = sharedState;
    }

    // Méthode pour créer un objet Flyweight dans la base de données
    static async create(sharedState: string): Promise<FlyweightObject> {
        const flyweight = await prisma.flyweightObject.create({
            data: {
                sharedState,
            },
        });
        return new FlyweightObject(flyweight.sharedState);
    }

    // Méthode pour récupérer un objet Flyweight de la base de données
    static async find(sharedState: string): Promise<FlyweightObject | null> {
        const flyweight = await prisma.flyweightObject.findUnique({
            where: {
                sharedState,
            },
        });
        if (flyweight) {
            return new FlyweightObject(flyweight.sharedState);
        } else {
            return null;
        }
    }

    // Méthode pour afficher l'état partagé de l'objet
    display(): void {
        console.log(`Flyweight Object with shared state: ${this.sharedState}`);
    }
}