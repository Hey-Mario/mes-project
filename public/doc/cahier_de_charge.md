### File to delete after everything is done
### Cahier des Charges pour le Système de Gestion de Processus de Production

Développer un système intégré de gestion de la production (MES) pour une entreprise manufacturière qui couvre la gestion des commandes, le suivi des équipements, la planification des ressources, le contrôle de la qualité, et la gestion de l'inventaire.

#### Fonctionnalités à Implémenter

1. **Gestion des Commandes (CRUD)**

   - **Créer** des commandes avec des numéros uniques, produits associés, quantités et statuts.
   - **Lire** les informations des commandes existantes.
   - **Mettre à jour** les détails des commandes, y compris le statut (par exemple, en cours, complété, annulé).
   
2. **Gestion des Produits (CRUD)**

   - **Créer** des produits avec des noms, descriptions, et liens vers les commandes, l'inventaire, et les contrôles de qualité.
   - **Lire** les détails des produits.
   - **Mettre à jour** les informations des produits.
   - **Supprimer** des produits.

3. **Gestion de l'Inventaire (CRUD)**

   - **Créer** des entrées d'inventaire pour chaque produit avec quantité et emplacement.
   - **Lire** l'état actuel de l'inventaire.
   - **Mettre à jour** les quantités ou emplacements dans l'inventaire.
   - **Supprimer** des entrées d'inventaire.
   
4. **Gestion des Équipements (CRUD)**

   - **Créer** des équipements avec des noms, types, et statuts.
   - **Lire** les informations sur les équipements existants.
   - **Mettre à jour** le statut ou d'autres détails des équipements.
   - **Supprimer** des équipements.

5. **Planification des Ressources (CRUD)**

   - **Créer** des plans pour les ressources nécessaires à la production.
   - **Lire** les plans existants.
   - **Mettre à jour** les détails des plans de ressources.
   - **Supprimer** des plans obsolètes.
   
6. **Gestion de la Maintenance (CRUD)**

   - **Créer** des enregistrements de maintenance pour les équipements.
   - **Lire** les historiques de maintenance.
   - **Mettre à jour** les enregistrements de maintenance, y compris les descriptions et les dates.
   - **Supprimer** des enregistrements de maintenance.
   
7. **Contrôle de Qualité (CRUD)**

   - **Créer** des contrôles de qualité pour les produits.
   - **Lire** les résultats des contrôles de qualité.
   - **Mettre à jour** les statuts ou notes des contrôles de qualité.
   - **Supprimer** des contrôles de qualité.

8. **Notifications (CRUD)**

   - **Créer** des notifications pour divers événements dans le système.
   - **Lire** les notifications existantes.
   - **Mettre à jour** le statut des notifications.
   - **Supprimer** des notifications.





#### Relations entre les Modèles
- **Produits** liés aux **Commandes**, **Inventaires**, et **Contrôles de Qualité**.
- **Équipements** liés à la **Maintenance**.
- **Maintenance** liée aux **Journaux de Maintenance**.





#### Pages et Fonctionnalités Principales

1. **Page de Gestion des Commandes**
Liste des Commandes: Afficher toutes les commandes avec options pour filtrer par statut (en cours, complété, annulé).
Création de Commande: Formulaire pour entrer les détails d'une nouvelle commande (produit, quantité).
Détails de Commande: Vue détaillée d'une commande spécifique avec option pour modifier ou annuler la commande.
Navigation: Accès direct aux détails du produit depuis la commande.

2. **Page de Gestion des Produits**
Liste des Produits: Afficher tous les produits avec options pour filtrer par catégorie ou disponibilité.
Création de Produit: Formulaire pour ajouter un nouveau produit (nom, description).
Détails du Produit: Vue détaillée d'un produit avec liens vers les commandes associées, inventaire, et contrôles de qualité.
Navigation: Accès aux pages de gestion de l'inventaire et de contrôle de qualité depuis les détails du produit.
Copy

3. **Page de Gestion de l'Inventaire**
Vue d'Inventaire: Tableau montrant les produits, leurs quantités et emplacements.
Ajout d'Inventaire: Formulaire pour ajouter ou mettre à jour les stocks.
Navigation: Retour aux détails du produit associé.

4. **Page de Gestion des Équipements**
Liste des Équipements: Afficher tous les équipements avec statut (actif, en maintenance).
Ajout d'Équipement: Formulaire pour enregistrer un nouvel équipement.
Détails de l'Équipement: Informations détaillées avec accès à l'historique de maintenance.
Navigation: Lien vers la création ou la consultation des logs de maintenance.

5. **Page de Maintenance**
Historique de Maintenance: Liste des interventions avec détails.
Programmer une Maintenance: Formulaire pour planifier ou mettre à jour une maintenance.
Navigation: Accès depuis les détails de l'équipement.

6. **Page de Contrôle de Qualité**
Liste des Contrôles: Affichage des contrôles par produit avec résultats.
Nouveau Contrôle de Qualité: Formulaire pour enregistrer un contrôle pour un produit spécifique.
Navigation: Retour aux détails du produit concerné.

7. **Page de Notifications**
Liste des Notifications: Voir toutes les notifications avec filtres par type (alerte, info).
Créer Notification: Formulaire pour créer une nouvelle notification.
Navigation: Notifications accessibles depuis le tableau de bord principal.