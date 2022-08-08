import { db } from './services/prisma';

async function main() {
  const profiles = await db.profile.findMany();
  console.log(profiles);
}

main();
