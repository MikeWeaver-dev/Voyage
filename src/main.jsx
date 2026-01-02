import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { useAppData } from "./hooks and handles.jsx";
import { Header, Navbar} from "./components.jsx";
import {MyTrips, MyFeed, BioPage, FindFriends, MyFriends, TripEdit, TripEdit2, AddExperience, ViewUser, ViewTrip, EditUser, AddTrip, EditExperience, Login} from "./pages.jsx"

function Main() {

// just importing some functions from hooks here. kinda like a backend
  const {
    page, setPage, ActiveUser,
    accounts, trips, experiences,
    selectedPosterID, setSelectedPosterID,
    editTripID, setEditTripID,
    viewTripID, setViewTripID,
    ExperienceID, setExperienceID,
    handleDeleteTrip, handleDeleteExperience,
    handleSaveBio, handleSaveTrip, handleSaveExperience,
    handleAddTrip, handleAddExperience, handleToggleFollow, 
    handleToggleLike, isTripLiked, getLikeCount,
  } = useAppData(); 

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [page]);

// here is the front end. it basically just calls on a few components I have created and then navigates to one of several pages depending what buttons the user clicks. the pages are in pages.jsx
  return (
    <>
      <Header />
      {page != "Login" && <Navbar setPage={setPage} ActiveUser = {ActiveUser}/>}
      <div style={{ height: "140px"}}></div>
      {page === "myTrips" && <MyTrips ActiveUser={ActiveUser} setPage = {setPage} setSelectedPosterID={setSelectedPosterID} setEditTripID = {setEditTripID} setViewTripID = {setViewTripID} setExperienceID={setExperienceID} trips={trips} experiences={experiences} onDeleteExperience={handleDeleteExperience} isTripLiked={isTripLiked} getLikeCount={getLikeCount} handleToggleLike={handleToggleLike}/>}
      {page === "myFeed" && <MyFeed ActiveUser={ActiveUser} setPage = {setPage} setSelectedPosterID={setSelectedPosterID} setEditTripID = {setEditTripID} setViewTripID = {setViewTripID} setExperienceID={setExperienceID} trips={trips} experiences={experiences} onDeleteExperience={handleDeleteExperience} isTripLiked={isTripLiked} getLikeCount={getLikeCount} handleToggleLike={handleToggleLike}/>}
      {page === "findFriends" && <FindFriends ActiveUser={ActiveUser} setPage={setPage} setSelectedPosterID={setSelectedPosterID} accounts={accounts} onToggleFollow={handleToggleFollow}/>}
      {page === "following" && <MyFriends ActiveUser={ActiveUser} setPage={setPage} setSelectedPosterID={setSelectedPosterID} accounts={accounts} onToggleFollow={handleToggleFollow} />}
      {page === "userSelected" && <ViewUser PosterID={selectedPosterID} setPage={setPage} setSelectedPosterID={setSelectedPosterID} ActiveUser={ActiveUser} setEditTripID={setEditTripID} setViewTripID={setViewTripID} setExperienceID={setExperienceID} accounts={accounts} trips={trips} experiences={experiences} onToggleFollow={handleToggleFollow} isTripLiked={isTripLiked} getLikeCount={getLikeCount} handleToggleLike={handleToggleLike}/>}
      {page === "myProfile" && <BioPage ActiveUser = {ActiveUser} setPage = {setPage}/>}
      {page === "tripEdit" && <TripEdit TripID = {editTripID} setPage = {setPage} setEditTripID = {setEditTripID} onDeleteTrip={handleDeleteTrip}/>}
      {page === "viewTrip" && <ViewTrip TripID={viewTripID} setPage={setPage} setEditTripID = {setEditTripID} setEditExperienceID={setExperienceID} setSelectedPosterID={setSelectedPosterID} ActiveUser={ActiveUser} experiences={experiences} trips={trips} onDeleteExperience={handleDeleteExperience} isTripLiked={isTripLiked} getLikeCount={getLikeCount} handleToggleLike={handleToggleLike}/>}
      {page === "tripEdit2" && <TripEdit2 TripID = {editTripID} Trips={trips} onDeleteTrip={handleDeleteTrip} onSaveTrip={handleSaveTrip} />}
      {page === "addExperience" && <AddExperience TripID={editTripID} PosterID={ActiveUser.Bio.UserID} onSaveExperience={handleAddExperience}/>}
      {page === "editUser" && <EditUser user={ActiveUser} onSave={handleSaveBio} setPage={setPage}/>}
      {page === "addTrip" && <AddTrip ActiveUser = {ActiveUser} setPage = {setPage} onSaveTrip={handleAddTrip}/>}
      {page === "editExperience" && <EditExperience ExperienceID = {ExperienceID} setPage = {setPage} experiences={experiences} onDeleteExperience={handleDeleteExperience} onSaveExperience={handleSaveExperience}/>}
      {page === "Login" && <Login setPage = {setPage}/>}   
    </>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
