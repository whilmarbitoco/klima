import { ref, push, set, get } from "firebase/database";
import { db } from "@/lib/firebase";
import { UserProfile } from "firebase/auth";

export const createUserProfile = async (
  userId: string,
  profileData: UserProfile
) => {
  const userRef = ref(db, `users/${userId}`);
  await set(userRef, profileData);
};
