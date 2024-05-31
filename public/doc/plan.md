### Creational Patterns
1. **Singleton**: Assurer une unique instance des services centraux de gestion de la base de données et des configurations système.
   
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

2. **Builder**: Faciliter la création complexe de configurations de produits ou de plans de production.

```js
const productData = new ProductBuilder(data.name)
                           .setDescription(data.description)
                           .build();
const product = await prisma.product.create({ data: productData });
```

3. **Prototype**: Utiliser pour cloner rapidement des configurations d'équipement ou des paramètres de processus.
   - Implement a `clone` method in your equipment or process parameter classes.

4. **Factory Method**: Créer des instances de différents types de commandes de production ou de notifications sans exposer la logique de création au client.
   - Define a factory interface and concrete factories for different order types.

5. **Abstract Factory**: Produire des familles d'objets relatifs, comme différents types de machines ou d'outils de production, sans spécifier leurs classes concrètes.
   - Create an abstract factory for machine and tool creation.

### Structural Patterns
1. **Adapter**: Intégrer des machines de différents fabricants ou des systèmes ERP tiers qui n'utilisent pas une interface commune.
   - Implement adapter classes to unify interfaces.

2. **Bridge**: Séparer les abstractions de processus de production des implémentations qui peuvent varier selon le type de produit ou de matériau.
   - Use bridge pattern to decouple process logic from specific implementations.

3. **Composite**: Organiser les composants de production ou les tâches en structures hiérarchiques.
   - Implement composite pattern for task management.

4. **Decorator**: Ajouter dynamiquement des fonctionnalités supplémentaires aux processus, comme des notifications de statut ou des mesures de sécurité renforcées.
   - Use decorators to extend process functionalities dynamically.

5. **Facade**: Simplifier les interactions complexes entre les différents modules du système de production.
   - Create a facade class to provide a simplified interface to complex subsystems.

6. **Flyweight**: Optimiser l'utilisation de la mémoire pour les détails partagés des produits ou des matériaux.
   - Implement flyweight pattern for shared data.

7. **Proxy**: Contrôler l'accès aux informations critiques de la production ou aux commandes d'opération des machines.
   - Use proxy pattern to manage access control.

### Behavioral Patterns
1. **Chain of Responsibility**: Gérer les approbations de modifications de processus en les passant à travers une chaîne de responsables.
   - Implement a chain of responsibility for approval workflows.

2. **Command**: Encapsuler les actions comme des objets, permettant des opérations complexes et planifiables sur la production.
   
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

3. **Interpreter**: Analyser et exécuter des scripts ou des commandes complexes pour les configurations d'automatisation.
   - Implement an interpreter for automation scripts.

4. **Iterator**: Fournir un moyen de parcourir séquentiellement les collections de commandes de production ou les lots de matériaux.
   - Use iterator pattern for collections.

5. **Mediator**: Coordonner les interactions complexes entre les modules de planification, de production, de qualité, et de stockage.
   - Implement a mediator to manage module interactions.

6. **Memento**: Sauvegarder et restaurer les états précédents des configurations de processus ou des paramètres de machine.
   - Use memento pattern for state management.

7. **Observer**: Notifier les opérateurs ou les gestionnaires des changements dans le processus de production ou des alertes de maintenance.
   - Implement observer pattern for event notifications.

8. **State**: Modifier le comportement des machines ou des processus en fonction de leur état, comme actif, en maintenance, ou en arrêt.
   - Use state pattern to manage machine states.

9. **Strategy**: Permettre la modification des algorithmes de contrôle de qualité ou des logiques de planification.
   - Implement strategy pattern for algorithm selection.

10. **Template Method**: Définir le squelette d'un processus de production, permettant aux sous-classes de redéfinir certaines étapes sans changer la structure du processus.
    - Use template method for process definitions.

11. **Visitor**: Appliquer des opérations de maintenance, d'inspection ou d'audit sur les équipements ou les processus sans les modifier.
    - Implement visitor pattern for operations on equipment.

### Example Implementations
- **Singleton**: `src/lib/prisma.ts`
- **Builder**: `src/app/api/product/route.ts`
- **Command**: `src/app/api/product/[id]/route.ts`