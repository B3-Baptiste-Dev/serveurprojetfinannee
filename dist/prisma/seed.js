"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.$executeRaw `SELECT 1`;
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
    const passwords = await Promise.all([
        bcrypt.hash('motdepasse123', 10),
        bcrypt.hash('motdepasse456', 10),
        bcrypt.hash('motdepasse789', 10),
        bcrypt.hash('motdepasse101112', 10)
    ]);
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
    await prisma.object.createMany({
        data: [
            { title: 'Perceuse électrique', description: 'Idéale pour tous travaux de bricolage.', categoryId: bricolage.id, ownerId: user1.id, available: true, imageUrl: '' },
            { title: 'Scie circulaire', description: 'Parfaite pour couper du bois et des matériaux de construction.', categoryId: bricolage.id, ownerId: user2.id, available: true, imageUrl: '' },
            { title: 'Marteau', description: 'Indispensable pour tout projet de bricolage.', categoryId: bricolage.id, ownerId: user3.id, available: true, imageUrl: '' },
            { title: 'Tournevis électrique', description: 'Pour un vissage facile et rapide.', categoryId: bricolage.id, ownerId: user1.id, available: true, imageUrl: '' },
            { title: 'Établi', description: 'Un espace de travail solide et pratique.', categoryId: bricolage.id, ownerId: user4.id, available: true, imageUrl: '' }
        ]
    });
    await prisma.annonce.createMany({
        data: [
            { objectId: 1, latitude: 37.7749, longitude: -122.4194 },
            { objectId: 2, latitude: 37.7790, longitude: -122.3893 },
            { objectId: 3, latitude: 37.7751, longitude: -122.4192 },
            { objectId: 4, latitude: 37.7789, longitude: -122.3892 },
            { objectId: 5, latitude: 37.7749, longitude: -122.4194 }
        ]
    });
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
//# sourceMappingURL=seed.js.map