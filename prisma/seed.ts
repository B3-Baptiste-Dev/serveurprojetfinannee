import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    await prisma.$executeRaw`SELECT 1`;

    // Supprimer les données existantes
    await prisma.review.deleteMany({});
    await prisma.message.deleteMany({});
    await prisma.reservation.deleteMany({});
    await prisma.conversation.deleteMany({});
    await prisma.annonce.deleteMany({});
    await prisma.object.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.category.deleteMany({});

    // Créer des catégories
    await prisma.category.createMany({
        data: [
            { name: 'Outils électriques', description: 'Outils électriques pour divers travaux' },
            { name: 'Jardinage', description: 'Outils pour entretenir le jardin' },
            { name: 'Élévation', description: 'Outils pour travailler en hauteur' },
            { name: 'Équipement de construction', description: 'Équipements pour la construction et la rénovation' }
        ]
    });

    // Récupérer les IDs des catégories
    const categories = await prisma.category.findMany();
    const categoriesMap = categories.reduce((acc, category) => {
        acc[category.name] = category.id;
        return acc;
    }, {} as { [key: string]: number });

    // Hasher les mots de passe
    const passwords = await Promise.all([
        bcrypt.hash('motdepasse123', 10),
        bcrypt.hash('motdepasse456', 10),
        bcrypt.hash('motdepasse789', 10),
        bcrypt.hash('motdepasse101112', 10)
    ]);

    // Créer des utilisateurs
    await prisma.user.createMany({
        data: [
            { email: 'jean.dupont@example.com', password: passwords[0], first_name: 'Jean', last_name: 'Dupont', location: 'Lille, France' },
            { email: 'marie.durand@example.com', password: passwords[1], first_name: 'Marie', last_name: 'Durand', location: 'Lille, France' },
            { email: 'luc.martin@example.com', password: passwords[2], first_name: 'Luc', last_name: 'Martin', location: 'Lille, France' },
            { email: 'sophie.legrand@example.com', password: passwords[3], first_name: 'Sophie', last_name: 'Legrand', location: 'Lille, France' }
        ]
    });

    const createdUsers = await prisma.user.findMany();
    const userIds = createdUsers.map(user => user.id);

    // Créer des objets
    await prisma.object.createMany({
        data: [
            { title: 'Perceuse électrique', description: 'Idéale pour tous travaux de bricolage.', categoryId: categoriesMap['Outils électriques'], ownerId: userIds[0], available: true, imageUrl: '' },
            { title: 'Scie circulaire', description: 'Parfaite pour couper du bois et des matériaux de construction.', categoryId: categoriesMap['Outils électriques'], ownerId: userIds[1], available: true, imageUrl: '' },
            { title: 'Marteau', description: 'Indispensable pour tout projet de bricolage.', categoryId: categoriesMap['Outils électriques'], ownerId: userIds[2], available: true, imageUrl: '' },
            { title: 'Tournevis électrique', description: 'Pour un vissage facile et rapide.', categoryId: categoriesMap['Outils électriques'], ownerId: userIds[0], available: true, imageUrl: '' },
            { title: 'Visseuse', description: 'Pour visser et dévisser facilement.', categoryId: categoriesMap['Outils électriques'], ownerId: userIds[1], available: true, imageUrl: '' },
            { title: 'Ponceuse', description: 'Parfaite pour poncer toutes les surfaces.', categoryId: categoriesMap['Outils électriques'], ownerId: userIds[2], available: true, imageUrl: '' },
            { title: 'Rabot électrique', description: 'Pour un rabotage précis et efficace.', categoryId: categoriesMap['Outils électriques'], ownerId: userIds[3], available: true, imageUrl: '' },
            { title: 'Tondeuse', description: 'Pour une pelouse impeccable.', categoryId: categoriesMap['Jardinage'], ownerId: userIds[0], available: true, imageUrl: '' },
            { title: 'Scarificateur', description: 'Pour entretenir votre pelouse en profondeur.', categoryId: categoriesMap['Jardinage'], ownerId: userIds[1], available: true, imageUrl: '' },
            { title: 'Compresseur', description: 'Pour gonfler et nettoyer avec puissance.', categoryId: categoriesMap['Outils électriques'], ownerId: userIds[2], available: true, imageUrl: '' },
            { title: 'Débroussailleuse', description: 'Idéale pour couper les hautes herbes.', categoryId: categoriesMap['Jardinage'], ownerId: userIds[3], available: true, imageUrl: '' },
            { title: 'Échelle', description: 'Pour atteindre les hauteurs en toute sécurité.', categoryId: categoriesMap['Élévation'], ownerId: userIds[0], available: true, imageUrl: '' },
            { title: 'Escabeau', description: 'Pratique pour les petits travaux en hauteur.', categoryId: categoriesMap['Élévation'], ownerId: userIds[1], available: true, imageUrl: '' },
            { title: 'Échafaudage', description: 'Idéal pour les travaux de façade.', categoryId: categoriesMap['Élévation'], ownerId: userIds[2], available: true, imageUrl: '' }
        ]
    });

    const createdObjects = await prisma.object.findMany();
    const objectIds = createdObjects.map(object => object.id);

    // Ajouter des annonces avec des coordonnées spécifiques pour les nouveaux objets autour de Lille
    await prisma.annonce.createMany({
        data: [
            { objectId: objectIds[0], latitude: 50.62925, longitude: 3.057256 },
            { objectId: objectIds[1], latitude: 50.634, longitude: 3.051 },
            { objectId: objectIds[2], latitude: 50.628, longitude: 3.057 },
            { objectId: objectIds[3], latitude: 50.623, longitude: 3.062 },
            { objectId: objectIds[4], latitude: 50.627, longitude: 3.059 },
            { objectId: objectIds[5], latitude: 50.631, longitude: 3.055 },
            { objectId: objectIds[6], latitude: 50.632, longitude: 3.058 },
            { objectId: objectIds[7], latitude: 50.63, longitude: 3.06 },
            { objectId: objectIds[8], latitude: 50.624, longitude: 3.056 },
            { objectId: objectIds[9], latitude: 50.625, longitude: 3.061 },
            { objectId: objectIds[10], latitude: 50.629, longitude: 3.057 },
            { objectId: objectIds[11], latitude: 50.626, longitude: 3.052 },
            { objectId: objectIds[12], latitude: 50.628, longitude: 3.054 },
            { objectId: objectIds[13], latitude: 50.63, longitude: 3.053 }
        ]
    });

    const createdAnnonces = await prisma.annonce.findMany({});
    const annonceIds = createdAnnonces.map(annonce => annonce.id);

    // Ajouter des conversations et des messages
    await prisma.conversation.create({
        data: {
            annonceId: annonceIds[0],
            messages: {
                createMany: {
                    data: [
                        { content: 'Bonjour, cette annonce est-elle toujours disponible ?', sentById: userIds[1], receivedById: userIds[0] },
                        { content: 'Oui, elle est toujours disponible.', sentById: userIds[0], receivedById: userIds[1] }
                    ]
                }
            }
        }
    });

    await prisma.conversation.create({
        data: {
            annonceId: annonceIds[1],
            messages: {
                createMany: {
                    data: [
                        { content: 'Pouvons-nous nous rencontrer ce weekend pour voir la scie circulaire ?', sentById: userIds[2], receivedById: userIds[1] },
                        { content: 'Oui, ce weekend me convient parfaitement.', sentById: userIds[1], receivedById: userIds[2] }
                    ]
                }
            }
        }
    });

    await prisma.conversation.create({
        data: {
            annonceId: annonceIds[2],
            messages: {
                createMany: {
                    data: [
                        { content: 'Est-ce que la débroussailleuse est toujours en bon état ?', sentById: userIds[3], receivedById: userIds[0] },
                        { content: 'Elle est comme neuve. Très peu utilisée.', sentById: userIds[0], receivedById: userIds[3] }
                    ]
                }
            }
        }
    });

    await prisma.conversation.create({
        data: {
            annonceId: annonceIds[3],
            messages: {
                createMany: {
                    data: [
                        { content: 'Je suis intéressé par votre tondeuse. Est-elle encore sous garantie ?', sentById: userIds[0], receivedById: userIds[3] },
                        { content: 'Non, elle n\'est plus sous garantie, mais elle fonctionne parfaitement.', sentById: userIds[3], receivedById: userIds[0] }
                    ]
                }
            }
        }
    });

    console.log('Données de seed supplémentaires ajoutées');
}

main()
  .catch((e) => {
      console.error(e);
      process.exit(1);
  })
  .finally(async () => {
      await prisma.$disconnect();
  });
