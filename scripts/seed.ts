import { db } from "../src/lib/firebase";

async function seed() {
  console.log("[] Seeding Firebase Realtime Database...");
}

seed().catch(console.error);
