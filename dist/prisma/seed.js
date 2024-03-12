"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.review.deleteMany({});
    await prisma.message.deleteMany({});
    await prisma.reservation.deleteMany({});
    await prisma.annonce.deleteMany({});
    await prisma.object.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.category.deleteMany({});
    const electronique = await prisma.category.create({
        data: { name: 'Électronique', description: 'Appareils électroniques' },
    });
    const vetements = await prisma.category.create({
        data: { name: 'Vêtements', description: 'Habillement et accessoires' },
    });
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
    const smartphone = await prisma.object.create({
        data: {
            title: 'Smartphone ancien',
            description: 'Un smartphone légèrement utilisé.',
            categoryId: electronique.id,
            ownerId: user1.id,
            available: true,
            location: 'Paris, France',
        },
    });
    const veste = await prisma.object.create({
        data: {
            title: 'Veste en cuir',
            description: 'Veste en cuir noir, taille M.',
            categoryId: vetements.id,
            ownerId: user2.id,
            available: true,
            location: 'Lyon, France',
        },
    });
    const annonce1 = await prisma.annonce.create({
        data: {
            objectId: smartphone.id,
            latitude: 37.7749,
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
//# sourceMappingURL=seed.js.map