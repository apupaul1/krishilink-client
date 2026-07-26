import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import type { UserCredential } from "firebase/auth";
import { auth } from "../../../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

export const registerUser = (
  email: string,
  password: string,
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (
  email: string,
  password: string,
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = (): Promise<UserCredential> => {
  return signInWithPopup(auth, googleProvider);
};

export const logoutUser = (): Promise<void> => {
  return signOut(auth);
};

export const updateUserProfile = (profile: {
  displayName?: string;
  photoURL?: string;
}) => {
  if (!auth.currentUser) {
    throw new Error("No authenticated user found.");
  }

  return updateProfile(auth.currentUser, profile);
};
