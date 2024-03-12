import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {

    // Supprimer les données existantes
    await prisma.review.deleteMany({});
    await prisma.message.deleteMany({});
    await prisma.reservation.deleteMany({});
    await prisma.annonce.deleteMany({});
    await prisma.object.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.category.deleteMany({});


    // Créer des catégories
    const electronique = await prisma.category.create({
        data: { name: 'Électronique', description: 'Appareils électroniques' },
    });

    const vetements = await prisma.category.create({
        data: { name: 'Vêtements', description: 'Habillement et accessoires' },
    });

    // Créer des utilisateurs
    const password1 = await bcrypt.hash('motdepasse123', 10);
    const password2 = await bcrypt.hash('motdepasse456', 10);
    const user1 = await prisma.user.create({
        data: {
            email: 'jean.dupont@example.com',
            password: password1,
            first_name: 'Jean',
            last_name: 'Dupont',
            location: 'Paris, France',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: 'marie.durand@example.com',
            password: password2,
            first_name: 'Marie',
            last_name: 'Durand',
            location: 'Lyon, France',
        },
    });

    // Créer des objets
    const smartphone = await prisma.object.create({
        data: {
            title: 'Smartphone ancien',
            description: 'Un smartphone légèrement utilisé.',
            categoryId: electronique.id,
            ownerId: user1.id,
            available: true,
            imageUrl: 'https://via.placeholder.com/150',
        },
    });

    const veste = await prisma.object.create({
        data: {
            title: 'Veste en cuir',
            description: 'Veste en cuir noir, taille M.',
            categoryId: vetements.id,
            ownerId: user2.id,
            available: true,
            imageUrl: 'https://via.placeholder.com/150',
        },
    });

    const annonce1 = await prisma.annonce.create({
        data: {
            objectId: smartphone.id,
            latitude: 37.7749, // Coordonnées de San Francisco
            longitude: -122.4194,
        },
    });

    const annonce2 = await prisma.annonce.create({
        data: {
            objectId: veste.id,
            latitude: 37.7790,
            longitude: -122.3893,
        },
    });


    // Créer des réservations
    await prisma.reservation.create({
        data: {
            objectId: smartphone.id,
            userId: user2.id,
            startDate: new Date(),
            endDate: new Date(),
            status: 'pending',
        },
    });

    await prisma.reservation.create({
        data: {
            objectId: veste.id,
            userId: user1.id,
            startDate: new Date(),
            endDate: new Date(),
            status: 'accepted',
        },
    });

    // Créer des messages
    await prisma.message.create({
        data: {
            content: 'Est-ce toujours disponible ?',
            sentById: user1.id,
            receivedById: user2.id,
        },
    });

    await prisma.message.create({
        data: {
            content: 'Peut-on se rencontrer demain pour l’échange ?',
            sentById: user2.id,
            receivedById: user1.id,
        },
    });

    // Créer des évaluations
    await prisma.review.create({
        data: {
            rating: 4,
            comment: 'Très bon état, comme décrit.',
            objectId: smartphone.id,
            userId: user2.id,
        },
    });

    await prisma.review.create({
        data: {
            rating: 5,
            comment: 'Article parfait, vendeur sympathique.',
            objectId: veste.id,
            userId: user1.id,
        },
    });

    console.log('Données de seed ajoutées');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
