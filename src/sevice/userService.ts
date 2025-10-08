import { ref, push, set, get } from "firebase/database";
import { db } from "@/lib/firebase";
import { UserProfile } from "firebase/auth";
import { FarmDetails } from "@/types";

export const createUserProfile = async (
  userId: string,
  profileData: UserProfile
) => {
  const userRef = ref(db, `users/${userId}`);
  await set(userRef, profileData);
};

export const createFarmDetails = async (
  userId: string,
  farmData: FarmDetails
) => {
  const farmRef = ref(db, `farms/${userId}`);
  await set(farmRef, farmData);
};

export const getUserFarmDetails = async (
  userId: string
): Promise<FarmDetails | null> => {
  const farmRef = ref(db, `farms/${userId}`);
  const snapshot = await get(farmRef);
  if (snapshot.exists()) {
    return snapshot.val() as FarmDetails;
  } else {
    return null;
  }
};
