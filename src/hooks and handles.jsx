import { useState } from "react";
import { Accounts, Trips as InitialTrips, Experiences as InitialExperiences, UserID } from "./props.jsx";

// these hooks are the closest I really get to a backend! A lot of the heavy lifting on the backend side is done by my server Firebase. even the login screen
export function useAppData() {
  const [accounts, setAccounts] = useState(Accounts);
  const [experiences, setExperiences] = useState(InitialExperiences);
  const [page, setPage] = useState("myTrips");
  const [selectedPosterID, setSelectedPosterID] = useState(null);
  const [editTripID, setEditTripID] = useState(null);
  const [viewTripID, setViewTripID] = useState(null);
  const [ExperienceID, setExperienceID] = useState(null);

  const ActiveUser = accounts[UserID];

  const [trips, setTrips] = useState(
    InitialTrips.map(trip => ({
      ...trip,
      Likes: trip.Likes || [] 
    }))
  );


  const handleToggleLike = (tripId) => {
    const userId = ActiveUser.Bio.UserID;

    setTrips(prevTrips =>
      prevTrips.map(trip => {
        if (trip.TripID !== tripId) return trip;

        const userAlreadyLiked = trip.Likes.includes(userId);

        return {
          ...trip,
          Likes: userAlreadyLiked
            ? trip.Likes.filter(id => id !== userId)   
            : [...trip.Likes, userId]                  
        };
      })
    );
  };

 
  const isTripLiked = (tripId) => {
    const trip = trips.find(t => t.TripID === tripId);
    return trip?.Likes.includes(ActiveUser.Bio.UserID) || false;
  };



  const getLikeCount = (tripId) => {
    const trip = trips.find(t => t.TripID === tripId);
    return trip?.Likes.length || 0;
  };

  const handleDeleteTrip = (tripId) => {
    setTrips(prev => prev.filter(t => t.TripID !== tripId));
    setPage("myTrips");
  };

  const handleDeleteExperience = (experienceId) => {
    setExperiences(prev => prev.filter(exp => exp.ExperienceID !== experienceId));
    setPage("myTrips");
  };

  const handleSaveBio = (updatedBio) => {
    setAccounts(prev => ({
      ...prev,
      [UserID]: {
        ...prev[UserID],
        Bio: { ...prev[UserID].Bio, ...updatedBio }
      }
    }));
  };

  const handleSaveTrip = (updatedTrip) => {
    setTrips(prev => prev.map(t =>
      t.TripID === updatedTrip.TripID ? { ...t, ...updatedTrip } : t
    ));
    setPage("myTrips");
  };

  const handleSaveExperience = (updatedExp) => {
    setExperiences(prev => prev.map(exp =>
      exp.ExperienceID === updatedExp.ExperienceID ? { ...exp, ...updatedExp } : exp
    ));
    setPage("myTrips");
  };

  const handleAddTrip = (newTrip) => {
    const newId = crypto.randomUUID();
    setTrips(prev => [{ ...newTrip, TripID: newId, Likes: [] }, ...prev]);
    setPage("myTrips");
  };

  const handleAddExperience = (newExp) => {
    const newId = crypto.randomUUID();
    setExperiences(prev => [{ ...newExp, ExperienceID: newId }, ...prev]);
    setPage("myTrips");
  };

  const handleToggleFollow = (targetUserID, shouldFollow) => {
    setAccounts(prev => {
      const following = prev[UserID].Bio.Following || [];
      return {
        ...prev,
        [UserID]: {
          ...prev[UserID],
          Bio: {
            ...prev[UserID].Bio,
            Following: shouldFollow
              ? [...following.filter(id => id !== targetUserID), targetUserID]
              : following.filter(id => id !== targetUserID)
          }
        }
      };
    });
  };

  return {
    page, setPage,
    ActiveUser,
    accounts,
    trips, 
    experiences,
    selectedPosterID, setSelectedPosterID,
    editTripID, setEditTripID,
    viewTripID, setViewTripID,
    ExperienceID, setExperienceID,
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
  };
}