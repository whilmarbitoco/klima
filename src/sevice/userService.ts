import { ref, push, set, get } from "firebase/database";
import { db } from "@/lib/firebase";
import { FarmDetails, UserProfile } from "@/types";

export const createUserProfile = async (
  userId: string,
  profileData: UserProfile
) => {
  const userRef = ref(db, `users/${userId}`);
  await set(userRef, profileData);
};

export const getUserProfile = async (
  userId: string
): Promise<UserProfile | null> => {
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return snapshot.val() as UserProfile;
  } else {
    return null;
  }
};

export const updateUserProfile = async (
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
