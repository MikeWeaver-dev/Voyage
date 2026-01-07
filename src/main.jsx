import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { useAppData } from "./hooks and handles.jsx";
import { Header, Navbar} from "./components.jsx";
import {MyTrips, MyFeed, BioPage, FindFriends, MyFriends, TripEdit, TripEdit2, AddExperience, ViewUser, ViewTrip, EditUser, AddTrip, EditExperience, Login} from "./pages.jsx"
import { Routes, Route, Navigate, useLocation, BrowserRouter } from "react-router-dom";


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  // just importing some functions from hooks here. kinda like a backend
  const {
    ActiveUser,
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

  return (
    <>
      <Header/>
      {!isLoginPage && <Navbar ActiveUser={ActiveUser}/>}
      <div style={{ height: "140px"}}></div>
      <Routes>  
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path ="/trips" element ={<MyTrips ActiveUser={ActiveUser} setSelectedPosterID={setSelectedPosterID} setEditTripID = {setEditTripID} setViewTripID = {setViewTripID} setExperienceID={setExperienceID} trips={trips} experiences={experiences} onDeleteExperience={handleDeleteExperience} isTripLiked={isTripLiked} getLikeCount={getLikeCount} handleToggleLike={handleToggleLike}/>} />
        <Route path ="/feed" element ={<MyFeed ActiveUser={ActiveUser} setSelectedPosterID={setSelectedPosterID} setEditTripID = {setEditTripID} setViewTripID = {setViewTripID} setExperienceID={setExperienceID} trips={trips} experiences={experiences} onDeleteExperience={handleDeleteExperience} isTripLiked={isTripLiked} getLikeCount={getLikeCount} handleToggleLike={handleToggleLike}/>} />
        <Route path ="/find-friends" element ={<FindFriends ActiveUser={ActiveUser} setSelectedPosterID={setSelectedPosterID} accounts={accounts} onToggleFollow={handleToggleFollow}/>} />
        <Route path ="/following" element ={<MyFriends ActiveUser={ActiveUser} setSelectedPosterID={setSelectedPosterID} accounts={accounts} onToggleFollow={handleToggleFollow} />} />
        <Route path ="/user" element ={<ViewUser PosterID={selectedPosterID} setSelectedPosterID={setSelectedPosterID} ActiveUser={ActiveUser} setEditTripID={setEditTripID} setViewTripID={setViewTripID} setExperienceID={setExperienceID} accounts={accounts} trips={trips} experiences={experiences} onToggleFollow={handleToggleFollow} isTripLiked={isTripLiked} getLikeCount={getLikeCount} handleToggleLike={handleToggleLike}/>} />
        <Route path ="/profile" element ={<BioPage ActiveUser = {ActiveUser}/>} />
        <Route path ="/trip-edit-selection" element ={<TripEdit TripID = {editTripID} setEditTripID = {setEditTripID} onDeleteTrip={handleDeleteTrip}/>} />
        <Route path ="/trip" element ={<ViewTrip TripID={viewTripID} setEditTripID = {setEditTripID} setEditExperienceID={setExperienceID} setSelectedPosterID={setSelectedPosterID} ActiveUser={ActiveUser} experiences={experiences} trips={trips} onDeleteExperience={handleDeleteExperience} isTripLiked={isTripLiked} getLikeCount={getLikeCount} handleToggleLike={handleToggleLike}/>} />
        <Route path ="/edit-trip" element ={<TripEdit2 TripID = {editTripID} Trips={trips} onDeleteTrip={handleDeleteTrip} onSaveTrip={handleSaveTrip} />} />
        <Route path ="/add-experience" element ={<AddExperience TripID={editTripID} PosterID={ActiveUser.Bio.UserID} onSaveExperience={handleAddExperience}/>} />
        <Route path ="/edit-profile" element ={<EditUser user={ActiveUser} onSave={handleSaveBio}/>} />
        <Route path ="/add-trip" element ={<AddTrip ActiveUser = {ActiveUser} onSaveTrip={handleAddTrip}/>} />
        <Route path ="/edit-experience" element ={<EditExperience ExperienceID = {ExperienceID} experiences={experiences} onDeleteExperience={handleDeleteExperience} onSaveExperience={handleSaveExperience}/>} />
        <Route path ="/login" element ={<Login/>} />
      </Routes>
    </>
  );
}

function Main() {
  return (
    <div style={{ backgroundColor: "faf8f5"}}>
      <div className="ml-4 mr-4">
        <BrowserRouter>
          {/* <AuthProvider> */}
            {/* <FirestoreProvider>  */}
              <ScrollToTop />
              <AppContent />
            {/* </FirestoreProvider> */}
          {/* </AuthProvider> */}
        </BrowserRouter>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
