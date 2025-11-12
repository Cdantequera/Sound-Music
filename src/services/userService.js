import { doc, getDoc, setDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { db } from "../config/firebase";

export const getOrCreateUserDocument = async (userAuth, additionalData = {}) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    // Si no existe, lo crea
    const { email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        uid: userAuth.uid,
        email,

        displayName: additionalData.userName || userAuth.displayName || email.split("@")[0],
        profileImageUrl: photoURL || null,
        role: "user",
        likedSongs: [],
        followedArtists: [],
        createdAt,
      });
      console.log("Nuevo usuario (email/pass) creado en Firestore");
    } catch (error) {
      console.error("Error creando el documento del usuario:", error);
    }
  }

  // Devolvemos la información del usuario que está en Firestore
  const finalSnapshot = await getDoc(userRef);
  return finalSnapshot.data();
};

export const logSongPlay = async (userId, songId, artistId) => {
  if (!userId || !songId || !artistId) return;

  const userRef = doc(db, "users", userId);
  const artistCountKey = `artistPlayCounts.${artistId}`;

  try {
    await updateDoc(userRef, {
      recentlyPlayed: arrayUnion({
        songId: songId,
        artistId: artistId,
        playedAt: new Date(),
      }),

      [artistCountKey]: increment(1),
    });
    console.log("Reproducción registrada:", songId);
  } catch (error) {
    console.error("Error al registrar la reproducción:", error);
  }
};

export const getRecentlyPlayed = async (userId) => {
  if (!userId) return [];
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists() || !docSnap.data().recentlyPlayed) {
    return [];
  }

  const allPlayed = docSnap.data().recentlyPlayed;

  const sorted = allPlayed.sort((a, b) => b.playedAt.toMillis() - a.playedAt.toMillis());

  return sorted.slice(0, 10);
};

export const getTopArtists = async (userId) => {
  if (!userId) return [];
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists() || !docSnap.data().artistPlayCounts) {
    return [];
  }

  const countsMap = docSnap.data().artistPlayCounts;

  const countsArray = Object.entries(countsMap);

  const sorted = countsArray.sort(([, countA], [, countB]) => countB - countA);

  return sorted.slice(0, 5).map(([artistId, count]) => ({
    artistId,
    count,
  }));
};
