import "dotenv/config";
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, set } from "firebase/database";
import { generateRandomId } from "@/lib/utils";
import {
  devices,
  farmDetails,
  weatherData,
  weatherPrediction,
} from "@/constant";
import { Weather } from "@/types";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
  databaseURL: process.env.FIREBASE_DB_URL!,
  projectId: process.env.FIREBASE_PROJECT_ID!,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.FIREBASE_MSG_ID!,
  appId: process.env.FIREBASE_APP_ID!,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const ID = "xkIjhFDqA9SaZmhMZoUBDcqawrv1";
const deviceID = "FS-A1001-WB-2025";

async function seed() {
  console.log("[!] Seeding Firebase Realtime Database...");

  // await createFarmDetails();
  // await createWeatherData();
  // await createDevice();
  await seedPrediction();

  console.log("[+] Seeding completed.");
}

async function createFarmDetails() {
  const randomID = generateRandomId(Date.now().toString());
  const farmRef = ref(db, `farms/${ID}/${randomID}`);
  await set(farmRef, farmDetails);
}

async function createWeatherData() {
  const weather = weatherData.map((it, index) => ({
    ...it,
    time: `Oct ${index}, 1983 01:15:00`,
    timestamp: Date.now(),
  }));

  for (const data of weather) {
    const newWeatherRef = ref(
      db,
      `weather/${deviceID}/${generateRandomId(Date.now().toString())}`
    );
    await set(newWeatherRef, data);
  }
}

async function createDevice() {
  const deviceRef = ref(db, `devices/${ID}/${deviceID}`);
  await set(deviceRef, devices[0]);
}

async function seedPrediction() {
  const prediction: Weather[] = weatherPrediction;

  const predictRef = ref(db, `predictions/${deviceID}`);

  const newPredictRef = push(predictRef);
  await set(newPredictRef, prediction);
}

seed().catch(console.error);
