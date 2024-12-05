import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

export async function main() {
  await prisma.toy.deleteMany();
  await prisma.child.deleteMany();

  console.log('Seeding database...');
  for (let i = 0; i < 10; i++) {
    const child = await prisma.child.create({
      data: {
        name: faker.name.firstName(),
        address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.country()}`,
        isNaughty: faker.datatype.boolean(),
        toys: {
          create: Array.from({
            length: faker.number.int({ min: 1, max: 5 }),
          }).map(() => ({
            name: faker.commerce.productName(),
            weight: faker.number.float({ min: 0, max: 10, fractionDigits: 2 }),
            material: faker.helpers.arrayElement([
              'wood',
              'metal',
              'plastic',
              'other',
            ]),
          })),
        },
      },
    });
    console.log(child);
    console.log('seeding complete');
  }
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
