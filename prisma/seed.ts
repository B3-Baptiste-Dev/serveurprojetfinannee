import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Appliquer les migrations pour s'assurer que toutes les tables existent
    await prisma.$executeRaw`SELECT 1`; // Assurez-vous que la base de données est connectée et à jour

    // Supprimer les données existantes
    if (await prisma.review.count()) {
        await prisma.review.deleteMany({});
    }
    if (await prisma.message.count()) {
        await prisma.message.deleteMany({});
    }
    if (await prisma.reservation.count()) {
        await prisma.reservation.deleteMany({});
    }
    if (await prisma.annonce.count()) {
        await prisma.annonce.deleteMany({});
    }
    if (await prisma.object.count()) {
        await prisma.object.deleteMany({});
    }
    if (await prisma.user.count()) {
        await prisma.user.deleteMany({});
    }
    if (await prisma.category.count()) {
        await prisma.category.deleteMany({});
    }

    // Créer des catégories
    const electronique = await prisma.category.create({
        data: { name: 'Électronique', description: 'Appareils électroniques' },
    });
    const vetements = await prisma.category.create({
        data: { name: 'Vêtements', description: 'Habillement et accessoires' },
    });
    const sport = await prisma.category.create({
        data: { name: 'Sport', description: 'Équipement et accessoires sportifs' },
    });
    const bricolage = await prisma.category.create({
        data: { name: 'Bricolage', description: 'Outils et équipement de bricolage' },
    });

    // Hasher les mots de passe
    const passwords = await Promise.all([
        bcrypt.hash('motdepasse123', 10),
        bcrypt.hash('motdepasse456', 10),
        bcrypt.hash('motdepasse789', 10),
        bcrypt.hash('motdepasse101112', 10)
    ]);

    // Créer des utilisateurs
    const user1 = await prisma.user.create({
        data: { email: 'jean.dupont@example.com', password: passwords[0], first_name: 'Jean', last_name: 'Dupont', location: 'Paris, France' }
    });
    const user2 = await prisma.user.create({
        data: { email: 'marie.durand@example.com', password: passwords[1], first_name: 'Marie', last_name: 'Durand', location: 'Lyon, France' }
    });
    const user3 = await prisma.user.create({
        data: { email: 'luc.martin@example.com', password: passwords[2], first_name: 'Luc', last_name: 'Martin', location: 'Paris, France' }
    });
    const user4 = await prisma.user.create({
        data: { email: 'sophie.legrand@example.com', password: passwords[3], first_name: 'Sophie', last_name: 'Legrand', location: 'Paris, France' }
    });

    // Créer des objets
    await prisma.object.createMany({
        data: [
            { title: 'Smartphone ancien', description: 'Un smartphone légèrement utilisé.', categoryId: electronique.id, ownerId: user1.id, available: true, imageUrl: 'https://via.placeholder.com/150' },
            { title: 'Veste en cuir', description: 'Veste en cuir noir, taille M.', categoryId: vetements.id, ownerId: user2.id, available: true, imageUrl: 'https://via.placeholder.com/150' },
            { title: 'Vélo de montagne', description: 'Parfait pour les terrains difficiles.', categoryId: sport.id, ownerId: user3.id, available: true, imageUrl: 'https://via.placeholder.com/150' },
            { title: 'Perceuse électrique', description: 'Idéale pour tous travaux de bricolage.', categoryId: bricolage.id, ownerId: user1.id, available: true, imageUrl: 'https://via.placeholder.com/150' },
            { title: 'Camera DSLR', description: 'Idéale pour les amateurs de photographie.', categoryId: electronique.id, ownerId: user4.id, available: true, imageUrl: 'https://via.placeholder.com/150' }
        ]
    });

    // Ajouter des annonces avec des coordonnées spécifiques pour les nouveaux objets
    await prisma.annonce.createMany({
        data: [
            { objectId: 1, latitude: 37.7749, longitude: -122.4194 },
            { objectId: 2, latitude: 37.7790, longitude: -122.3893 },
            { objectId: 3, latitude: 37.7751, longitude: -122.4192 },
            { objectId: 4, latitude: 37.7789, longitude: -122.3892 },
            { objectId: 5, latitude: 37.7749, longitude: -122.4194 }
        ]
    });

    // Ajouter des messages entre les utilisateurs
    await prisma.message.createMany({
        data: [
            { content: 'Bonjour, le smartphone est-il toujours disponible ?', sentById: user2.id, receivedById: user1.id },
            { content: 'Oui, il est toujours disponible. Souhaitez-vous le voir ?', sentById: user1.id, receivedById: user2.id },
            { content: 'Pouvons-nous nous rencontrer ce weekend pour voir la veste ?', sentById: user3.id, receivedById: user2.id },
            { content: 'Oui, ce weekend me convient parfaitement.', sentById: user2.id, receivedById: user3.id },
            { content: 'Est-ce que la perceuse est toujours en bon état ?', sentById: user4.id, receivedById: user1.id },
            { content: 'Elle est comme neuve. Très peu utilisée.', sentById: user1.id, receivedById: user4.id },
            { content: 'Je suis intéressé par votre caméra. Est-elle encore sous garantie ?', sentById: user1.id, receivedById: user4.id },
            { content: 'Non, elle n\'est plus sous garantie, mais elle fonctionne parfaitement.', sentById: user4.id, receivedById: user1.id }
        ]
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
