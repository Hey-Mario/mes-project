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

    productionManager.endProduction();

    return NextResponse.json(
      { message: "Equipment cloned successfully", createdEquipment },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
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
  getName(): string;
}

export abstract class MachineBase implements IMachine {
  protected running: boolean;

  constructor() {
    this.running = false;
  }

  abstract start(): void;
  abstract stop(): void;
  abstract getName(): string;

  getStatus(): string {
    return this.getName() + (this.running ? " is running" : " is stopped");
  }

  get isOff() {
    return !this.running;
  }

  get isOn() {
    return this.running;
  }
}

export class SimpleMachine {
  private label: string;
  constructor(label: string) {
    this.label = label;
  }

  powerOn() {
    console.log('Simple Machine powered on');
  }

  powerOff() {
    console.log('Simple Machine powered off');
  }

  getLabel() {
    return this.label;
  }
}

export class SimpleMachineAdapter extends MachineBase {
  private simpleMachine: SimpleMachine;

  constructor(simpleMachine: SimpleMachine) {
    super();
    this.simpleMachine = simpleMachine;
  }

  start(): void {
    this.simpleMachine.powerOn();
    this.running = true;
  }

  stop(): void {
    this.simpleMachine.powerOff();
    this.running = false;
  }

  getName(): string {
    return this.simpleMachine.getLabel();
  }
}

export class ComplexMachine {
  private mark: string;
  constructor(mark: string) {
    this.mark = mark;
  }

  turnOn() {
    console.log('Complex Machine turned on');
  }

  turnOff() {
    console.log('Complex Machine turned off');
  }

  getMark() {
    return this.mark;
  }
}

export class ComplexMachineAdapter extends MachineBase {
  private complexMachine: ComplexMachine;

  constructor(complexMachine: ComplexMachine) {
    super();
    this.complexMachine = complexMachine;
  }

  start(): void {
    this.complexMachine.turnOn();
    this.running = true;
  }

  stop(): void {
    this.complexMachine.turnOff();
    this.running = false;
  }

  getName(): string {
    return this.complexMachine.getMark()
  }
}
```

2. **Bridge**: Séparer les abstractions de processus de production des implémentations qui peuvent varier selon le type de produit ou de matériau. `(Landry)`

```typescript
interface IProductionProcess {
   start(): void;
   end(): void;
}

class FoodProductionProcess implements IProductionProcess {
   start() {
       console.log("Démarrage du processus de production alimentaire.");
   }
   end() {
       console.log("Fin du processus de production alimentaire.");
   }
}

class CarProductionProcess implements IProductionProcess {
   start() {
       console.log("Démarrage du processus de production automobile.");
   }
   end() {
       console.log("Fin du processus de production automobile.");
   }
}
```

3. **Composite**: Organiser les composants de production ou les tâches en structures hiérarchiques. `(Mario)`
   - Implement composite pattern for task management.

4. **Decorator**: Ajouter dynamiquement des fonctionnalités supplémentaires aux processus, comme des notifications de statut ou des mesures de sécurité renforcées. `(Mionja)`
```js
export class StatusNotificationDecorator implements IProcess {
  constructor(private process: IProcess) {}

  execute() {
    this.process.execute();
    message.success("Notification sent");
    console.log("Adding status notifications to the process");
  }
}
```

5. **Facade**: Simplifier les interactions complexes entre les différents modules du système de production. `(Mionja)`
```js
export class ProductionFacade {
  private mediator: ProductionMediator;

  constructor() {
    const inventory = new InventoryManagement();
    const orders = new OrderProcessing();
    this.mediator = new ProductionMediator(inventory, orders);
  }

  processOrderAndStock() {
    this.mediator.processOrderAndStock();
  }
}
```

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
```js
import { IApprovalHandler } from "../../interfaces/IApprovalHandler";

export abstract class ApprovalHandler implements IApprovalHandler {
  private nextHandler: IApprovalHandler | null = null;

  public setNext(handler: IApprovalHandler): IApprovalHandler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: any): any {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}
```

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

```js
const mainScript = `
  START PrinterMachine
  STOP PrinterMachine
  START ProductionMachine
  SET_SPEED 1000
  STOP ProductionMachine
  START PrinterMachine
`
...

const handleRunScript = () => {
  handleRunScript_(mainScript);
};

...

const handleRunScript_ = (script: string) => {
  const interpreter = new MachineInterpreter();
  const context: Record<string, string | number> = {};
  interpreter.parse(script);
  interpreter.interpret(context);
  checkAndHandleContext(context);
};
```

4. **Iterator**: Fournir un moyen de parcourir séquentiellement les collections de commandes de production ou les lots de matériaux. `(Landry)`
   - Use iterator pattern for collections.

5. **Mediator**: Coordonner les interactions complexes entre les modules de planification, de production, de qualité, et de stockage. `(Mionja)`
```js
class ProductionMediator {
  private inventory: InventoryManagement;
  private orders: OrderProcessing;

  constructor(inventory: InventoryManagement, orders: OrderProcessing) {
    this.inventory = inventory;
    this.orders = orders;
  }

  processOrderAndStock() {
    this.inventory.checkStock();
    this.orders.processOrder();
    this.inventory.updateStock();
    this.orders.generateInvoice();
  }
}
```

6. **Memento**: Sauvegarder et restaurer les états précédents des configurations de processus ou des paramètres de machine. `(Mionja)`
```js
async saveState(equipment: EquipmentMemento): Promise<void> {
  const equipments = this.getEquipmentStates();
  const newEquipment = { ...equipments, [equipment.id]: equipment };
  Cookies.set("equipmentStates", JSON.stringify(newEquipment), {
    expires: 1,
  });
}

...

await equipmentService.saveState(equipment);
await instance.patch("/api/equipment/" + equipment.id, data);

...

const handleRestoreState = async () => {
  const equipmentStates = equipmentService.getEquipmentStates();
  if (equipmentId && equipmentStates[equipmentId]) {
    const equipment = equipmentStates[equipmentId];
    await instance.patch("/api/equipment/" + equipmentId, equipment);
    equipmentService.removeEquipmentState(equipmentId);
    onRestoreSuccess?.(equipmentId);
  }
};

```

7. **Observer**: Notifier les opérateurs ou les gestionnaires des changements dans le processus de production ou des alertes de maintenance. `(Mario)`

```js
export interface Observer {
  update(event: string, type: NotificationTypeEnum): void;
}

export interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(event: string, type: NotificationTypeEnum): void;
}

export class Operator implements Observer {
  constructor(private name: string) {}

  async update(event: string, type: NotificationTypeEnum = NotificationTypeEnum.INFO) {
    const message = `${this.name} notified of event: ${event}`;
    switch(type) {
      case NotificationTypeEnum.SUCCESS:
        notification.success({ message });
        break;
      case NotificationTypeEnum.WARNING:
        notification.warning({ message });
        break;
      case NotificationTypeEnum.ERROR:
        notification.error({ message });
        break;
      case NotificationTypeEnum.INFO:
      default:
        notification.info({ message });
        break;
    }
    console.log(message)
    const body = { name: this.name, event }
    await instance.post('/api/notify', body)
  }
}

...

export class ProductionProcess implements Subject {
  private observers: Observer[] = [];

  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(event: string, type: NotificationTypeEnum): void {
    for (const observer of this.observers) {
      observer.update(event, type);
    }
  }

  changeProcess(event: string, type: NotificationTypeEnum): void {
    this.notifyObservers(event, type);
  }
}

...

const productionProcess = new ProductionProcess();
  
// Simulation of multiple users
const operator1 = new Operator('Alice');
const operator2 = new Operator('Bob');

useEffect(() => {
  productionProcess.registerObserver(operator1);
  productionProcess.registerObserver(operator2);

  return () => {
    productionProcess.removeObserver(operator1);
    productionProcess.removeObserver(operator2);
  };
}, []);

...

const handleProcessOrderAndStock = () => {
  productionProcess.changeProcess('Production Process Starting', NotificationTypeEnum.WARNING);
  productionFacade.processOrderAndStock();
  productionProcess.changeProcess('Production Process Ending', NotificationTypeEnum.SUCCESS);
};

...

<Button onClick={handleProcessOrderAndStock}>
  Start Order Processing
</Button>
```

8. **State**: Modifier le comportement des machines ou des processus en fonction de leur état, comme actif, en maintenance, ou en arrêt. `(Landry)`
   - Use state pattern to manage machine states.

9. **Strategy**: Permettre la modification des algorithmes de contrôle de qualité ou des logiques de planification. `(Mionja)`
```js
import { IQualityControlStrategy } from "../interfaces/IQualityControlStrategy";

export class QualityControlContext {
  private strategy: IQualityControlStrategy;

  constructor(strategy: IQualityControlStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: IQualityControlStrategy) {
    this.strategy = strategy;
  }

  executeStrategy(data: any): boolean {
    return this.strategy.execute(data);
  }
}

...

import { ISchedulingStrategy } from "../interfaces/ISchedulingStrategy";

export class SchedulingContext {
  private strategy: ISchedulingStrategy;

  constructor(strategy: ISchedulingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ISchedulingStrategy) {
    this.strategy = strategy;
  }

  executeStrategy(tasks: any[]): any[] {
    return this.strategy.schedule(tasks);
  }
}

```

10. **Template Method**: Définir le squelette d'un processus de production, permettant aux sous-classes de redéfinir certaines étapes sans changer la structure du processus. `(Mario)`
```js
export abstract class MachineBase implements IMachine {
  protected running: boolean;

  constructor() {
    this.running = false;
  }

  abstract start(): void;
  abstract stop(): void;
  abstract getName(): string;

  getStatus(): string {
    return this.getName() + (this.running ? " is running" : " is stopped");
  }

  get isOff() {
    return !this.running;
  }

  get isOn() {
    return this.running;
  }
}

...

export class SimpleMachineAdapter extends MachineBase {
  private simpleMachine: SimpleMachine;

  constructor(simpleMachine: SimpleMachine) {
    super();
    this.simpleMachine = simpleMachine;
  }

  start(): void {
    this.simpleMachine.powerOn();
    this.running = true;
  }

  stop(): void {
    this.simpleMachine.powerOff();
    this.running = false;
  }

  getName(): string {
    return this.simpleMachine.getLabel();
  }
}

...

export class ComplexMachineAdapter extends MachineBase {
  private complexMachine: ComplexMachine;

  constructor(complexMachine: ComplexMachine) {
    super();
    this.complexMachine = complexMachine;
  }

  start(): void {
    this.complexMachine.turnOn();
    this.running = true;
  }

  stop(): void {
    this.complexMachine.turnOff();
    this.running = false;
  }

  getName(): string {
    return this.complexMachine.getMark()
  }
}
```

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
- **Template Method**: `src/common/bases/MachineBase.ts`, `src/common/adpters/ComplexMachineAdapter.ts`, `src/common/adpters/SimpleMachineAdapter.ts`
- **Memento**: `src/common/services/EquipmentService.ts`, `scr/app/equipment/_components/RestoreButton`, `scr/app/equipment/_components/EquipmentForm`
- **Bridge**: `src/app/api/equipment/[id]/clone/route.ts`, `src/common/Production/ProductionManager.ts`, `src/common/Production/FoodProductionProcess.ts`, `src/common/Production/CarProductionProcess.ts`
- **Facade**: `src/common/facades/ProductionFacade.ts`
- **Decorator**: `src/common/decorators/StatusNotificationDecorator.ts`
- **Interpreter**: `src/lib/interpreter/machine-interpreter.ts`, `src/app/machine/page.tsx`
- **Observer**: `src/common/interfaces/notification/NotificationTypeEnum.ts`, `src/common/interfaces/notification/Subject.ts`, `src/common/interfaces/notification/Observer.ts`,`src/common/classes/production/Operator.ts`, `src/common/classes/production/ProductionProcess.ts`
- **Strategy**: `src/common/contexts/QualityControlContext.ts`, `src/common/contexts/SchedulingContext.ts`
- **Chain of Responsibility**: `src/common/classes/approval/ApprovalHandler.ts`, `src/common/classes/approval/DirectorApprovalHandler.ts`