import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    await prisma.$executeRaw`SELECT 1`;

    // Supprimer les données existantes
    await prisma.review.deleteMany({});
    await prisma.message.deleteMany({});
    await prisma.reservation.deleteMany({});
    await prisma.annonce.deleteMany({});
    await prisma.object.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.category.deleteMany({});

    // Créer des catégories spécifiques au bricolage
    const categoriesData = [
        { name: 'Électroportatif', description: 'Outils électriques portatifs' },
        { name: 'Manuels', description: 'Outils manuels' },
        { name: 'Mesure', description: 'Outils de mesure' },
        { name: 'Peinture', description: 'Matériel de peinture' },
        { name: 'Jardinage', description: 'Outils de jardinage' },
        { name: 'Sécurité', description: 'Équipements de sécurité' }
    ];

    const categories = await Promise.all(categoriesData.map(category => prisma.category.create({ data: category })));

    // Hasher les mots de passe
    const password = await bcrypt.hash('motdepasse123', 10);

    // Créer des utilisateurs avec des noms réalistes
    const usersData = [
        { email: 'jean.dupont@example.com', password, first_name: 'Jean', last_name: 'Dupont', location: 'Lille, France' },
        { email: 'marie.durand@example.com', password, first_name: 'Marie', last_name: 'Durand', location: 'Lille, France' },
        { email: 'paul.martin@example.com', password, first_name: 'Paul', last_name: 'Martin', location: 'Lille, France' },
        { email: 'anne.lefevre@example.com', password, first_name: 'Anne', last_name: 'Lefevre', location: 'Lille, France' },
        { email: 'lucie.moreau@example.com', password, first_name: 'Lucie', last_name: 'Moreau', location: 'Lille, France' },
        { email: 'julien.rousseau@example.com', password, first_name: 'Julien', last_name: 'Rousseau', location: 'Lille, France' },
        { email: 'emma.fernandez@example.com', password, first_name: 'Emma', last_name: 'Fernandez', location: 'Lille, France' },
        { email: 'nicolas.michel@example.com', password, first_name: 'Nicolas', last_name: 'Michel', location: 'Lille, France' },
        { email: 'claire.robin@example.com', password, first_name: 'Claire', last_name: 'Robin', location: 'Lille, France' },
        { email: 'pierre.robert@example.com', password, first_name: 'Pierre', last_name: 'Robert', location: 'Lille, France' }
    ];

    const users = await Promise.all(usersData.map(user => prisma.user.create({ data: user })));

    // Créer des objets avec des descriptions réalistes
    const objectsData = [
        { title: 'Perceuse électrique', description: 'Perceuse électrique performante pour tous types de travaux.', categoryId: categories[0].id, ownerId: users[0].id, available: true, imageUrl: '' },
        { title: 'Scie circulaire', description: 'Scie circulaire de haute qualité, idéale pour couper du bois et des matériaux de construction.', categoryId: categories[0].id, ownerId: users[1].id, available: true, imageUrl: '' },
        { title: 'Marteau', description: 'Marteau robuste, indispensable pour tous vos projets de bricolage.', categoryId: categories[1].id, ownerId: users[2].id, available: true, imageUrl: '' },
        { title: 'Tournevis électrique', description: 'Tournevis électrique pratique pour un vissage facile et rapide.', categoryId: categories[0].id, ownerId: users[3].id, available: true, imageUrl: '' },
        { title: 'Établi', description: 'Établi solide et pratique pour un espace de travail optimal.', categoryId: categories[1].id, ownerId: users[4].id, available: true, imageUrl: '' },
        { title: 'Multimètre', description: 'Multimètre précis pour toutes vos mesures électriques.', categoryId: categories[2].id, ownerId: users[5].id, available: true, imageUrl: '' },
        { title: 'Pinceau large', description: 'Pinceau large de haute qualité pour vos travaux de peinture.', categoryId: categories[3].id, ownerId: users[6].id, available: true, imageUrl: '' },
        { title: 'Sécateur', description: 'Sécateur robuste et précis pour vos travaux de jardinage.', categoryId: categories[4].id, ownerId: users[7].id, available: true, imageUrl: '' },
        { title: 'Casque de sécurité', description: 'Casque de sécurité confortable pour protéger votre tête pendant les travaux.', categoryId: categories[5].id, ownerId: users[8].id, available: true, imageUrl: '' },
        { title: 'Gants de protection', description: 'Gants de protection résistants pour tous types de travaux.', categoryId: categories[5].id, ownerId: users[9].id, available: true, imageUrl: '' }
    ];

    const objects = await Promise.all(objectsData.map(object => prisma.object.create({ data: object })));

    // Ajouter des annonces avec des coordonnées spécifiques autour de Lille
    const annoncesData = objects.map((object, i) => ({
        objectId: object.id,
        latitude: 50.6292 + (Math.random() - 0.5) * 0.1,  // Coordonnées autour de Lille
        longitude: 3.0573 + (Math.random() - 0.5) * 0.1, // Coordonnées autour de Lille
    }));

    await prisma.annonce.createMany({
        data: annoncesData,
    });

    // Ajouter des messages entre les utilisateurs
    const messagesData = Array.from({ length: 50 }, (_, i) => ({
        content: `Message ${i + 1}: Bonjour, je suis intéressé par votre ${objects[i % objects.length].title}. Est-il toujours disponible ?`,
        sentById: users[i % users.length].id,
        receivedById: users[(i + 1) % users.length].id,
    }));

    await prisma.message.createMany({
        data: messagesData,
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
