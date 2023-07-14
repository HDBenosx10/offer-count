import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.users.upsert({
    where: { username: 'aragao' },
    update: {},
    create: {
      id: '9a76d0d4-2c8d-448b-af55-1ffd9e51b9ba',
      username: 'aragao',
      wallets: {
        createMany: {
          data: [
            {
              id: '38ce96e4-c641-4643-affe-8de5af3132b0',
              code: 1,
              alias: 'my-wallet'
            },
            {
              id: 'c95649d2-c9ba-4701-9158-b06c9d7b1d59',
              code: 2,
              alias: 'my-other-wallet'
            }
          ]
        }
      }
    },
  });
  await prisma.users.upsert({
    where: { username: 'lucas' },
    update: {},
    create: {
      id: '2f006170-cee6-4ffb-a62e-51efc18d6432',
      username: 'lucas',
      wallets: {
        createMany: {
          data: [
            {
              id: 'aa2b7950-6e7d-4bc7-802b-87134901bd0e',
              code: 1,
              alias: 'my-wallet'
            },
            {
              id: 'cbe70eb9-2229-4cf1-9ca6-48ed15b75ab7',
              code: 2,
              alias: 'my-other-wallet'
            }
          ]
        }
      }
    },
  });

  await prisma.tokens.createMany({
    skipDuplicates: true,
    data: [
      { id: '1250baaf-f1df-4fd4-b009-0e78b044eba4', symbol: 'BTC', name: 'Bitcoin', precision: '18' },
      { id: '95452cb1-39d0-4885-ab5c-462887437e9b', symbol: 'ETH', name: 'Ethereum', precision: '18' },
      { id: 'b65501c3-6505-44b8-9d04-c1d4c5485cb5', symbol: 'KAN', name: 'Kannacoin', precision: '18' },
      { id: 'd1ca8e7b-09f2-4661-a8d9-a07431467636', symbol: 'POLY', name: 'Polygon', precision: '18' },
      { id: '95063fae-951a-44fe-befd-1f5f22dd6fc7', symbol: 'ARAG', name: 'Aragcoin', precision: '18' },
    ],
  });

  await prisma.balances.createMany({
    skipDuplicates: true,
    data: [
      // Aragao Wallets
      { id: 'f6589af5-901f-4983-bf7e-abfe3f8cdfa2', walletId: '38ce96e4-c641-4643-affe-8de5af3132b0', tokenId: '1250baaf-f1df-4fd4-b009-0e78b044eba4', balance: '1' },
      { id: '4cbf5465-aa53-48cc-9fc7-4f942d5d971c', walletId: '38ce96e4-c641-4643-affe-8de5af3132b0', tokenId: 'd1ca8e7b-09f2-4661-a8d9-a07431467636', balance: '1' },
      { id: '2c1d1f52-1b22-4a7a-a11b-1ad05a4bf8b3', walletId: 'c95649d2-c9ba-4701-9158-b06c9d7b1d59', tokenId: '1250baaf-f1df-4fd4-b009-0e78b044eba4', balance: '0.5' },
      // Lucas Wallets
      { id: '17dafc53-0c8c-41e9-a101-0d1796f1347d', walletId: 'aa2b7950-6e7d-4bc7-802b-87134901bd0e', tokenId: '1250baaf-f1df-4fd4-b009-0e78b044eba4', balance: '0.001' },
      { id: 'ff365092-564b-4aff-9624-ba4e5b3c40bf', walletId: 'aa2b7950-6e7d-4bc7-802b-87134901bd0e', tokenId: 'd1ca8e7b-09f2-4661-a8d9-a07431467636', balance: '0.001' },
      { id: '24ffd207-050f-4a6a-8820-1d14e75f68cf', walletId: 'cbe70eb9-2229-4cf1-9ca6-48ed15b75ab7', tokenId: '1250baaf-f1df-4fd4-b009-0e78b044eba4', balance: '0' },
    ]
  });

}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
