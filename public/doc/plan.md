### Creational Patterns
1. **Singleton**: Assurer une unique instance des services centraux de gestion de la base de données et des configurations système. `(Mario)`
   
```js
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
```

2. **Builder**: Faciliter la création complexe de configurations de produits ou de plans de production. `(Mario)`

```js
const productData = new ProductBuilder(data.name)
                           .setDescription(data.description)
                           .build();
const product = await prisma.product.create({ data: productData });
```

3. **Prototype**: Utiliser pour cloner rapidement des configurations d'équipement ou des paramètres de processus. `(Mionja)`
   
```js
   // Clone and update the equipment with new data
    const clonedEquipment = new Equipment(
      existingEquipment.name,
      existingEquipment.type,
      existingEquipment.status
    ).clone();

    // Update cloned equipment with new data
    Object.assign(clonedEquipment, newData);

    const createdEquipment = await prisma.equipment.create({
      data: {
        name: clonedEquipment.name,
        type: clonedEquipment.type,
        status: clonedEquipment.status,
      },
    });
```

4. **Factory Method**: Créer des instances de différents types de commandes de production ou de notifications sans exposer la logique de création au client. `(Mionja)`

```js
 async createOrder(status: string, details: any): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        orderNumber: details.orderNumber,
        productId: details.productId,
        quantity: details.quantity,
        status: status,
      },
    });
    return order;
  }
```

5. **Abstract Factory**: Produire des familles d'objets relatifs, comme différents types de machines ou d'outils de production, sans spécifier leurs classes concrètes. `(Mionja)`

```js
export class EquipmentFactory implements IEquipmentFactory {
  async createEquipment(
    name: string,
    type: string = "Sport",
    status: string = "Active"
  ): Promise<Equipment> {
    const equipment = await prisma.equipment.create({
      data: {
        name,
        type,
        status,
      },
    });
    return equipment;
  }
}
```

### Structural Patterns
1. **Adapter**: Intégrer des machines de différents fabricants ou des systèmes ERP tiers qui n'utilisent pas une interface commune. `(Mario)`
```js
export interface IMachine {
  isOn: boolean;
  isOff: boolean;
  start(): void;
  stop(): void;
  getStatus(): string;
}

export class SimpleMachine {
  powerOn() {
    console.log('Simple Machine powered on');
  }

  powerOff() {
    console.log('Simple Machine powered off');
  }
}

export class ComplexMachine {
  turnOn() {
    console.log('Complex Machine turned on');
  }

  turnOff() {
    console.log('Complex Machine turned off');
  }
}

export class SimpleMachineAdapter implements IMachine {
  private simpleMachine: SimpleMachine;
  private running: boolean;

  constructor(simpleMachine: SimpleMachine) {
    this.simpleMachine = simpleMachine;
    this.running = false;
  }

  start(): void {
    this.simpleMachine.powerOn();
    this.running = true;
  }

  stop(): void {
    this.simpleMachine.powerOff();
    this.running = false;
  }

  getStatus(): string {
    return this.running ? "Simple Machine is running" : "Simple Machine is stopped";
  }

  get isOff() {
    return !this.running;
  }

  get isOn() {
    return this.running;
  }
}

export class ComplexMachineAdapter implements IMachine {
  private complexMachine: ComplexMachine;
  private running: boolean;

  constructor(complexMachine: ComplexMachine) {
    this.complexMachine = complexMachine;
    this.running = false;
  }

  start(): void {
    this.complexMachine.turnOn();
    this.running = true;
  }

  stop(): void {
    this.complexMachine.turnOff();
    this.running = false;
  }

  getStatus(): string {
    return this.running ? "Complex Machine is running" : "Complex Machine is stopped";
  }

  get isOff() {
    return !this.running;
  }

  get isOn() {
    return this.running;
  }
}
```

2. **Bridge**: Séparer les abstractions de processus de production des implémentations qui peuvent varier selon le type de produit ou de matériau. `(Landry)`
   
   ```typescript
   interface IProductionProcess {
       startProcess(): void;
       endProcess(): void;
   }
   ```

   ```typescript
   class FoodProductionProcess implements IProductionProcess {
       startProcess() {
           console.log("Démarrage du processus de production alimentaire.");
       }
       endProcess() {
           console.log("Fin du processus de production alimentaire.");
       }
   }

   class CarProductionProcess implements IProductionProcess {
       startProcess() {
           console.log("Démarrage du processus de production automobile.");
       }
       endProcess() {
           console.log("Fin du processus de production automobile.");
       }
   }
   ```

3. **Composite**: Organiser les composants de production ou les tâches en structures hiérarchiques. `(Mario)`
   - Implement composite pattern for task management.

4. **Decorator**: Ajouter dynamiquement des fonctionnalités supplémentaires aux processus, comme des notifications de statut ou des mesures de sécurité renforcées. `(Mionja)`
   - Use decorators to extend process functionalities dynamically.

5. **Facade**: Simplifier les interactions complexes entre les différents modules du système de production. `(Mionja)`
   - Create a facade class to provide a simplified interface to complex subsystems.

6. **Flyweight**: Optimiser l'utilisation de la mémoire pour les détails partagés des produits ou des matériaux. `(Landry)`
   ```typescript
   class ProductFlyweightFactory {
       private flyweights: Map<string, ProductFlyweight> = new Map();

       getFlyweight(sharedState: any): ProductFlyweight {
           const key = JSON.stringify(sharedState);
           if (!this.flyweights.has(key)) {
               this.flyweights.set(key, new ProductFlyweight(sharedState));
           }
           return this.flyweights.get(key);
       }
   }

   class ProductFlyweight {
       constructor(private sharedState: any) {}

       operation(uniqueState: any): void {
           console.log(`Flyweight: Affichage de l'état partagé (${JSON.stringify(this.sharedState)}) et de l'état unique (${JSON.stringify(uniqueState)})`);
       }
   }
   ```

7. **Proxy**: Contrôler l'accès aux informations critiques de la production ou aux commandes d'opération des machines. `(Landry)`
   - Use proxy pattern to manage access control.
   ```typescript
   class SecureDataProxy {
       constructor(private realData: SensitiveData) {}

       accessData(user: User): void {
           if (this.checkAccess(user)) {
               this.realData.display();
           } else {
               console.log("Accès refusé.");
           }
       }

       private checkAccess(user: User): boolean {
           // Implémenter la logique de vérification des droits d'accès
           return user.hasPermission("ACCESS_SENSITIVE_DATA");
       }
   }

   class SensitiveData {
       display(): void {
           console.log("Affichage des données sensibles.");
       }
   }
   ```

### Behavioral Patterns
1. **Chain of Responsibility**: Gérer les approbations de modifications de processus en les passant à travers une chaîne de responsables. `(Landry)`
   - Implement a chain of responsibility for approval workflows.

2. **Command**: Encapsuler les actions comme des objets, permettant des opérations complexes et planifiables sur la production. `(Mario)`
   
```js
import { UpdateProductCommand } from "@/common/commands/product/UpdateProductCommand";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await req.json();

    const updateProductCommand = new UpdateProductCommand(id, data);
    const product = await updateProductCommand.execute();
   ...
}
```

3. **Interpreter**: Analyser et exécuter des scripts ou des commandes complexes pour les configurations d'automatisation. `(Mario)`
   - Implement an interpreter for automation scripts.

4. **Iterator**: Fournir un moyen de parcourir séquentiellement les collections de commandes de production ou les lots de matériaux. `(Landry)`
   - Use iterator pattern for collections.

5. **Mediator**: Coordonner les interactions complexes entre les modules de planification, de production, de qualité, et de stockage. `(Mionja)`
   - Implement a mediator to manage module interactions.

6. **Memento**: Sauvegarder et restaurer les états précédents des configurations de processus ou des paramètres de machine. `(Mionja)`
   - Use memento pattern for state management.

7. **Observer**: Notifier les opérateurs ou les gestionnaires des changements dans le processus de production ou des alertes de maintenance. `(Mario)`
   - Implement observer pattern for event notifications.

8. **State**: Modifier le comportement des machines ou des processus en fonction de leur état, comme actif, en maintenance, ou en arrêt. `(Landry)`
   - Use state pattern to manage machine states.

9. **Strategy**: Permettre la modification des algorithmes de contrôle de qualité ou des logiques de planification. `(Mionja)`
   - Implement strategy pattern for algorithm selection.

10. **Template Method**: Définir le squelette d'un processus de production, permettant aux sous-classes de redéfinir certaines étapes sans changer la structure du processus. `(Mario)`
    - Use template method for process definitions.

11. **Visitor**: Appliquer des opérations de maintenance, d'inspection ou d'audit sur les équipements ou les processus sans les modifier. `(Landry)`
    - Implement visitor pattern for operations on equipment.

### Example Implementations
- **Singleton**: `src/lib/prisma.ts`
- **Builder**: `src/app/api/product/route.ts`
- **Command**: `src/app/api/product/[id]/route.ts`
- **Prototype**: `src/app/api/equipment/[id]/clone/route.ts`
- **Factory Method**: `src/app/common/factories/OrderFactory.ts`
- **Abstract Factory**: `src/app/common/factories/EquipmentFactory.ts`
- **Adapter**: `src/common/interfaces/IMachine.ts`, `src/common/adpters/ComplexMachineAdapter.ts`, `src/common/adpters/SimpleMachineAdapter.ts`