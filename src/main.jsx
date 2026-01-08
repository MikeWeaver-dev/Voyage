import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { useAppData } from "./hooks and handles.jsx";
import { Header, Navbar } from "./components.jsx";
import {
  MyTrips,
  MyFeed,
  BioPage,
  FindFriends,
  MyFriends,
  TripEdit,
  TripEdit2,
  AddExperience,
  ViewUser,
  ViewTrip,
  EditUser,
  AddTrip,
  EditExperience,
  Login,
} from "./pages.jsx";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import { AuthProvider, useAuth } from "../contexts/authContext/index.jsx";

//this way when you switch pages it goes to the top
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

//takes a sec for firestore to load and stuff 
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "200px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

//i had this directly in main but it didnt work once I added the authentication so it works better here 
function AppContent() {
  const location = useLocation();
  const { user } = useAuth();
  const isLoginPage = location.pathname === "/login";

  const appData = useAppData();
  const {
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
  } = appData;

  if (loading && user) {
    return (
      <div style={{ textAlign: "center", marginTop: "200px" }}>
        <h2>Loading your data...</h2>
      </div>
    );
  }

  return (
    <>
      <Header />
      {!isLoginPage && ActiveUser && <Navbar ActiveUser={ActiveUser} />}
      <div style={{ height: "140px" }}></div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/" element={
            <ProtectedRoute>
              <Navigate to="/feed" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <MyTrips
                ActiveUser={ActiveUser}
                setSelectedPosterID={setSelectedPosterID}
                setEditTripID={setEditTripID}
                setViewTripID={setViewTripID}
                setExperienceID={setExperienceID}
                trips={trips}
                experiences={experiences}
                onDeleteExperience={handleDeleteExperience}
                isTripLiked={isTripLiked}
                getLikeCount={getLikeCount}
                handleToggleLike={handleToggleLike}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <MyFeed
                ActiveUser={ActiveUser}
                setSelectedPosterID={setSelectedPosterID}
                setEditTripID={setEditTripID}
                setViewTripID={setViewTripID}
                setExperienceID={setExperienceID}
                trips={trips}
                experiences={experiences}
                onDeleteExperience={handleDeleteExperience}
                isTripLiked={isTripLiked}
                getLikeCount={getLikeCount}
                handleToggleLike={handleToggleLike}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/find-friends"
          element={
            <ProtectedRoute>
              <FindFriends
                ActiveUser={ActiveUser}
                setSelectedPosterID={setSelectedPosterID}
                accounts={accounts}
                onToggleFollow={handleToggleFollow}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/following"
          element={
            <ProtectedRoute>
              <MyFriends
                ActiveUser={ActiveUser}
                setSelectedPosterID={setSelectedPosterID}
                accounts={accounts}
                onToggleFollow={handleToggleFollow}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <ViewUser
                PosterID={selectedPosterID}
                setSelectedPosterID={setSelectedPosterID}
                ActiveUser={ActiveUser}
                setEditTripID={setEditTripID}
                setViewTripID={setViewTripID}
                setExperienceID={setExperienceID}
                accounts={accounts}
                trips={trips}
                experiences={experiences}
                onToggleFollow={handleToggleFollow}
                isTripLiked={isTripLiked}
                getLikeCount={getLikeCount}
                handleToggleLike={handleToggleLike}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <BioPage ActiveUser={ActiveUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trip-edit-selection"
          element={
            <ProtectedRoute>
              <TripEdit
                TripID={editTripID}
                setEditTripID={setEditTripID}
                onDeleteTrip={handleDeleteTrip}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trip"
          element={
            <ProtectedRoute>
              <ViewTrip
                TripID={viewTripID}
                setEditTripID={setEditTripID}
                setEditExperienceID={setExperienceID}
                setSelectedPosterID={setSelectedPosterID}
                ActiveUser={ActiveUser}
                experiences={experiences}
                trips={trips}
                onDeleteExperience={handleDeleteExperience}
                isTripLiked={isTripLiked}
                getLikeCount={getLikeCount}
                handleToggleLike={handleToggleLike}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-trip"
          element={
            <ProtectedRoute>
              <TripEdit2
                TripID={editTripID}
                Trips={trips}
                onDeleteTrip={handleDeleteTrip}
                onSaveTrip={handleSaveTrip}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-experience"
          element={
            <ProtectedRoute>
              <AddExperience
                TripID={editTripID}
                PosterID={ActiveUser?.Bio?.UserID}
                onSaveExperience={handleAddExperience}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditUser user={ActiveUser} onSave={handleSaveBio} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-trip"
          element={
            <ProtectedRoute>
              <AddTrip ActiveUser={ActiveUser} onSaveTrip={handleAddTrip} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-experience"
          element={
            <ProtectedRoute>
              <EditExperience
                ExperienceID={ExperienceID}
                experiences={experiences}
                onDeleteExperience={handleDeleteExperience}
                onSaveExperience={handleSaveExperience}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/feed" replace />} />
      </Routes>
    </>
  );
}

function Main() {
  return (
    <div style={{ backgroundColor: "#faf8f5"}}>
      <div style={{ marginLeft: "35px", marginTop: "30px", marginBottom:"95px"}}>
        <BrowserRouter>
          <AuthProvider>
            <ScrollToTop />
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Main />);