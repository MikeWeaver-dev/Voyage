import { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useAuth } from "../contexts/authContext";

export function useAppData() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState({});
  const [trips, setTrips] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [ActiveUser, setActiveUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedPosterID, setSelectedPosterID] = useState(null);
  const [editTripID, setEditTripID] = useState(null);
  const [viewTripID, setViewTripID] = useState(null);
  const [ExperienceID, setExperienceID] = useState(null);

// Then update the useEffect:
useEffect(() => {
  if (!user) {
    setLoading(false);
    return;
  }

  const userDocRef = doc(db, "users", user.uid);
  const unsubscribe = onSnapshot(userDocRef, async (docSnap) => {
    if (docSnap.exists()) {
      setActiveUser({ Bio: docSnap.data() });
      setLoading(false);
    } else {

      const googlePhoto =
      user.photoURL ||
      user.providerData?.find(p => p.providerId === "google.com")?.photoURL;

      // Create a new user profile if it doesn't exist
      const newUserData = {
        UserID: user.email?.split("@")[0] || user.uid.slice(0, 8),
        Name: user.displayName || "New User",
        AboutMe: "Tell us about yourself!",
        PinnedTrip: "None yet",
        UpcomingTrip: "Planning something?",
        PhotoSource: googlePhoto || "/assets/Generic Avatar.png",
        Following: [],
        createdAt: serverTimestamp(),
      };
      
      try {
        // Use setDoc instead of updateDoc to CREATE the document
        await setDoc(userDocRef, newUserData);
        setActiveUser({ Bio: newUserData });
      } catch (error) {
        console.error("Error creating user profile:", error);
      } finally {
        setLoading(false);
      }
    }
  });

  return () => unsubscribe();
}, [user]);

  // grabs all users (for my find friends page)
  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const accountsData = {};
      snapshot.forEach((doc) => {
        accountsData[doc.data().UserID] = { Bio: doc.data() };
      });
      setAccounts(accountsData);
    });

    return () => unsubscribe();
  }, [user]);

  // just grabs the trips
  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(collection(db, "trips"), (snapshot) => {
      const tripsData = snapshot.docs.map((doc) => ({
        TripID: doc.id,
        ...doc.data(),
      }));
      setTrips(tripsData);
    });

    return () => unsubscribe();
  }, [user]);

  // checks all experiences
  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(collection(db, "experiences"), (snapshot) => {
      const experiencesData = snapshot.docs.map((doc) => ({
        ExperienceID: doc.id,
        ...doc.data(),
      }));
      setExperiences(experiencesData);
    });

    return () => unsubscribe();
  }, [user]);

  // Like handlers
  const handleToggleLike = async (tripId) => {
    if (!ActiveUser) return;
    const userId = ActiveUser.Bio.UserID;
    const tripRef = doc(db, "trips", tripId);
    const tripSnap = await getDoc(tripRef);

    if (tripSnap.exists()) {
      const likes = tripSnap.data().Likes || [];
      const isLiked = likes.includes(userId);

      await updateDoc(tripRef, {
        Likes: isLiked ? arrayRemove(userId) : arrayUnion(userId),
      });
    }
  };

  const isTripLiked = (tripId) => {
    if (!ActiveUser) return false;
    const trip = trips.find((t) => t.TripID === tripId);
    return trip?.Likes?.includes(ActiveUser.Bio.UserID) || false;
  };

  const getLikeCount = (tripId) => {
    const trip = trips.find((t) => t.TripID === tripId);
    return trip?.Likes?.length || 0;
  };

  // Delete handlers
  const handleDeleteTrip = async (tripId) => {
    await deleteDoc(doc(db, "trips", tripId));
    // Also delete associated experiences
    const expQuery = query(
      collection(db, "experiences"),
      where("TripID", "==", tripId)
    );
    const expSnapshot = await getDocs(expQuery);
    expSnapshot.forEach(async (docSnap) => {
      await deleteDoc(doc(db, "experiences", docSnap.id));
    });
  };

  const handleDeleteExperience = async (experienceId) => {
    await deleteDoc(doc(db, "experiences", experienceId));
  };

  // Save/Update handlers
  const handleSaveBio = async (updatedBio) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, updatedBio);
  };

  const handleSaveTrip = async (updatedTrip) => {
    const tripRef = doc(db, "trips", updatedTrip.TripID);
    await updateDoc(tripRef, {
      Location: updatedTrip.Location,
      Dates: updatedTrip.Dates,
      Fact: updatedTrip.Fact,
      PhotoSource: updatedTrip.PhotoSource,
    });
  };

  const handleSaveExperience = async (updatedExp) => {
    const expRef = doc(db, "experiences", updatedExp.ExperienceID);
    await updateDoc(expRef, {
      Place: updatedExp.Place,
      Date: updatedExp.Date,
      Title: updatedExp.Title,
      Description: updatedExp.Description,
      PhotoSource: updatedExp.PhotoSource,
    });
  };

  // Add handlers
  const handleAddTrip = async (newTrip) => {
    await addDoc(collection(db, "trips"), {
      ...newTrip,
      Likes: [],
      createdAt: serverTimestamp(),
    });
  };

  const handleAddExperience = async (newExp) => {
    await addDoc(collection(db, "experiences"), {
      ...newExp,
      createdAt: serverTimestamp(),
    });
  };

  // Follow handler
  const handleToggleFollow = async (targetUserID, shouldFollow) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, {
      Following: shouldFollow
        ? arrayUnion(targetUserID)
        : arrayRemove(targetUserID),
    });
  };

  if (loading) {
    return {
      ActiveUser: null,
      accounts: {},
      trips: [],
      experiences: [],
      loading: true,
    };
  }

  return {
    ActiveUser,
    accounts,
    trips,
    experiences,
    selectedPosterID,
    setSelectedPosterID,
    editTripID,
    setEditTripID,
    viewTripID,
    setViewTripID,
    ExperienceID,
    setExperienceID,
    handleDeleteTrip,
    handleDeleteExperience,
    handleSaveBio,
    handleSaveTrip,
    handleSaveExperience,
    handleAddTrip,
    handleAddExperience,
    handleToggleFollow,
    handleToggleLike,
    isTripLiked,
    getLikeCount,
    loading,
  };
}