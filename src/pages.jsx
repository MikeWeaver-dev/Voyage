import {Entry, Profile, InputSection, Experience, Feed, Footer, DeleteTripButton , DeleteExperienceButton, ImageUpload } from "./components.jsx";
import {Trips} from "./props.jsx";
import { useState, useEffect } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

import {
  loginWithGoogle, loginWithEmail, registerWithEmail, resetPassword, logout,} from "../firebase/auth";

// every page a user can navigate to has it's fornt end code here. Some of the code looks complex but it's really not, it's just passing props back and forth and doing a few hooks and calling of functions defined in main.jsx

export function MyFeed({
  ActiveUser,
  setSelectedPosterID,
  setEditTripID,
  setViewTripID,
  setExperienceID,
  trips,
  experiences,
  onDeleteExperience,
  isTripLiked,
  getLikeCount,
  handleToggleLike
}) {

  if (!ActiveUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  const followingList = ActiveUser.Bio.Following;
  const feedTrips = trips.filter(trip =>
  followingList.includes(trip.PosterID)
  );

  return (
    <div>
        <Feed
        trips={feedTrips}
        ActiveUser={ActiveUser}
        setSelectedPosterID={setSelectedPosterID}
        setEditTripID={setEditTripID}
        setViewTripID={setViewTripID}
        setExperienceID={setExperienceID}
        experiences={experiences} 
        onDeleteExperience={onDeleteExperience}
        isTripLiked={isTripLiked}
        getLikeCount={getLikeCount}
        handleToggleLike={handleToggleLike}
        />
        <Footer/>
    </div>
  );
}

export function MyTrips({
  ActiveUser,
  setSelectedPosterID,
  setEditTripID,
  setViewTripID,
  setExperienceID,
  trips,
  experiences,
  onDeleteExperience,
  isTripLiked,
  getLikeCount,
  handleToggleLike
}) {

  if (!ActiveUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  const userID = ActiveUser.Bio.UserID;
  const myTrips = trips.filter(trip => trip.PosterID === userID);

  return (
    <div>
      <NavLink to="/add-trip" className="SpecialRed">
        +
      </NavLink>

      <div style={{ height: "20px" }}></div>

      {myTrips.length > 0 ? (
        <Feed style ={{paddingRight: "35px", minWidth: "1000px"}}
          trips={myTrips}
          ActiveUser={ActiveUser}
          setSelectedPosterID={setSelectedPosterID}
          setEditTripID={setEditTripID}
          setViewTripID={setViewTripID}
          setExperienceID={setExperienceID}
          experiences={experiences} 
          onDeleteExperience={onDeleteExperience}
          isTripLiked={isTripLiked}
          getLikeCount={getLikeCount}
          handleToggleLike={handleToggleLike}
        />
      ) : (
        <div style ={{paddingRight: "35px", minWidth: "450px"}}>
            <div style={{ height: '100px' }}></div>
            <h2 style={{color: "gray", textAlign: "center" }}>
            You haven't posted any trips yet! Click the red + in the top left corner to post your first trip
            </h2>
            <div style={{ height: '150px' }}></div>
        </div>
      )}
      <Footer/>
    </div>
  );
}

  export function BioPage({ActiveUser, setCurrentUserID}) {

      function LogoutButton() {
      const navigate = useNavigate();

      const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
      };

      return (
        <button onClick={handleLogout} className="ClassicRed" style={{height: "42px", lineHeight: "0px",}}>
          Logout
        </button>
      );
    }

    return(
      <div style={{ textAlign: "center", paddingRight: "35px", minWidth: "450px"}}>
          <img
            src={ActiveUser.Bio.PhotoSource}
            alt={ActiveUser.Bio.Name}
            className="user-avatar"
          />
          <h2 style={{ color: "#d4363c" }}>{ActiveUser.Bio.Name}</h2>
          <p>{ActiveUser.Bio.AboutMe}</p>
          <p>
            <strong>Pinned Trip:</strong> {ActiveUser.Bio.PinnedTrip}
          </p>
          <p>
            <strong>Upcoming Trip:</strong> {ActiveUser.Bio.UpcomingTrip}
          </p>
          <div style={{ height: '20px' }}></div>
          <div style={{display: "flex", textAlign: "center", justifyContent: "center"}}>
            <NavLink className="ClassicRed" to="/edit-profile" style={{marginBottom: "40px", marginRight: "20px"}} >
                Edit Profile
            </NavLink>
            <LogoutButton/>
          </div>  
          <Footer/>
        </div>
    )
  }

// Users you're NOT following
export function FindFriends({ ActiveUser, setSelectedPosterID, accounts, onToggleFollow, trips }) {
  const notFollowing = Object.values(accounts).filter(
    account =>
      account.Bio.UserID !== ActiveUser.Bio.UserID &&
      !ActiveUser.Bio.Following.includes(account.Bio.UserID)
  );

  // Sort by number of trips (so random people who pass by arent on top)
  const sortedByActivity = notFollowing.sort((a, b) => {
    const aTrips = trips.filter(trip => trip.PosterID === a.Bio.UserID).length;
    const bTrips = trips.filter(trip => trip.PosterID === b.Bio.UserID).length;
    return bTrips - aTrips; // Descending order (most trips first)
  });

  return (
    <div>
      {sortedByActivity.length > 0 ? (
        sortedByActivity.map(account => (
          <div key={account.Bio.UserID} style={{paddingRight: "35px", minWidth: "1000px"}}>
            <Profile 
              setSelectedPosterID={setSelectedPosterID}
              Name={account.Bio.Name}
              AboutMe={account.Bio.AboutMe}
              PinnedTrip={account.Bio.PinnedTrip}
              UpcomingTrip={account.Bio.UpcomingTrip}
              ActiveUser={ActiveUser}
              PhotoSource={account.Bio.PhotoSource}
              UserID={account.Bio.UserID}
              onToggleFollow={onToggleFollow}
            />
          </div>
        ))
      ) : (
        <div style={{paddingRight: "35px", minWidth: "450px"}}>
          <div style={{ height: '100px'}}></div>
          <h2 style={{ color: "gray", textAlign: "center" }}>
            You are following everyone!
          </h2>
          <div style={{ height: '150px' }}></div>
        </div>
      )}
      <Footer/>
    </div>
  );
}

// Users you ARE following
export function MyFriends({ ActiveUser, setSelectedPosterID, accounts, onToggleFollow }) {
const following = Object.values(accounts).filter(
    account =>
      account.Bio.UserID !== ActiveUser.Bio.UserID &&
      ActiveUser.Bio.Following.includes(account.Bio.UserID)
  );

  
  return (
    <div>
      {following.length > 0 ? (
        following.map(account => (
          <div style={{paddingRight: "35px", minWidth: "1000px"}}>
            <Profile
              setSelectedPosterID = {setSelectedPosterID}
              key={account.Bio.UserID}
              Name={account.Bio.Name}
              AboutMe={account.Bio.AboutMe}
              PinnedTrip={account.Bio.PinnedTrip}
              UpcomingTrip={account.Bio.UpcomingTrip}
              ActiveUser={ActiveUser}
              PhotoSource={account.Bio.PhotoSource}
              UserID={account.Bio.UserID}
              onToggleFollow={onToggleFollow}
            />
          </div>
        ))
      ) : (
        <div style={{paddingRight: "35px", minWidth: "450px"}}>
            <div style={{ height: '100px' }}></div>
            <h2 style={{ color: "gray", textAlign: "center" }}>
            You aren't following anyone yet!
            </h2>
            <div style={{ height: '150px' }}></div>
        </div>
      )}
      <Footer/>
    </div>
  );
}

export function TripEdit({TripID, setEditTripID, onDeleteTrip}){
    return(
        <div style={{paddingRight: "35px", minWidth: "600px"}}>  
          <div style={{ height: "140px"}}></div>
          <div style={{display: "flex", justifyContent: "center"}}>
            <NavLink
                onClick={() => {setEditTripID(TripID)}}
                to="/edit-trip"
                className="ClassicRed">Edit Trip! ✍️
            </NavLink>

            <NavLink 
                onClick={() => {setEditTripID(TripID)}}
                to="/add-experience"
                className = "ClassicMint" style={{ marginLeft: "30px", marginRight: "30px"}}>Add New Experience! 🌄
            </NavLink>
            <DeleteTripButton TripID={TripID} onDeleteTrip={onDeleteTrip} />
          </div>
        </div>
    )
}

export function ViewUser({
  PosterID,
  setSelectedPosterID,
  ActiveUser,
  setEditTripID,
  setViewTripID,
  setExperienceID,
  accounts,
  trips,
  experiences,
  onDeleteExperience,
  onToggleFollow,
  isTripLiked,
  getLikeCount,
  handleToggleLike
}) {

const selectedUser = accounts[PosterID];  


  if (!selectedUser) {
    return <h2>User not found.</h2>;
  }

  const userTrips = trips.filter(trip => trip.PosterID === PosterID);

  return (
    <div style={{paddingRight: "35px", minWidth: "1000px"}}>
      <Profile
        Name={selectedUser.Bio.Name}
        AboutMe={selectedUser.Bio.AboutMe}
        PinnedTrip={selectedUser.Bio.PinnedTrip}
        UpcomingTrip={selectedUser.Bio.UpcomingTrip}
        PhotoSource={selectedUser.Bio.PhotoSource}
        ActiveUser={ActiveUser}
        setSelectedPosterID={setSelectedPosterID}
        UserID={selectedUser.Bio.UserID}
        onToggleFollow={onToggleFollow}
      />


      {userTrips.length > 0 ? (
        <div style={{paddingRight: "35px", minWidth: "1000px"}}>
            <h3 style ={{color: "#474747ff"}}>{PosterID}'s Trips:</h3>
            <hr></hr>
            <div style={{ height: '10px' }}></div>

            <Feed
            trips={userTrips}
            ActiveUser={ActiveUser}
            setSelectedPosterID={setSelectedPosterID}
            setEditTripID={setEditTripID}  
            setViewTripID={setViewTripID}    
            setExperienceID={setExperienceID} 
            experiences={experiences}          
            onDeleteExperience={onDeleteExperience}
            isTripLiked={isTripLiked}
            getLikeCount={getLikeCount}
            handleToggleLike={handleToggleLike}
            />
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "gray" }}>
          This user hasn’t posted any trips yet.
        </p>
      )}
      <Footer/>
    </div>
  );
}

export function ViewTrip({ 
  TripID, 
  setEditExperienceID, 
  setSelectedPosterID,
  setEditTripID, 
  ActiveUser, 
  experiences, 
  onDeleteExperience, 
  trips, 
  isTripLiked, 
  getLikeCount, 
  handleToggleLike}) 
{
  const trip = trips.find(t => t.TripID === TripID);

  if (!trip) return <h2>Trip not found.</h2>;

  const tripExperiences = experiences.filter(exp => exp.TripID === TripID);

  return (
    <div style={{paddingRight: "35px", minWidth: "1000px"}}>
      <Entry
        key={trip.TripID}
        {...trip}
        ActiveUser={ActiveUser}
        setSelectedPosterID={setSelectedPosterID}
        setEditTripID={setEditTripID}
        setViewTripID={() => {}}
        GoogleMapsLink={`https://www.google.com/maps/place/${trip.Location}`}
        isTripLiked={isTripLiked}
        getLikeCount={getLikeCount}
        handleToggleLike={handleToggleLike}
      />

      {tripExperiences.length > 0 ? (

        <div style={{paddingRight: "35px", minWidth: "1000px"}}>
            <h3 style ={{color: "#474747ff"}}>Trip Highlights:</h3>
            <hr></hr>
            {tripExperiences.map(exp => (
            <Experience
                key={exp.ExperienceID}
                ActiveUser={ActiveUser}
                PosterID={exp.PosterID}
                ExperienceID={exp.ExperienceID}
                PhotoAlt={exp.PhotoAlt}
                PhotoSource={exp.PhotoSource}
                Date={exp.Date}
                Place={exp.Place}
                Title={exp.Title}
                Description={exp.Description}
                setEditExperienceID={setEditExperienceID}
            />
            ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          No experiences added yet for this trip.
        </p>
      )}
      <Footer/>
    </div>
  );
}

export function TripEdit2({ TripID, Trips, onDeleteTrip, onSaveTrip }) {
  const trip = Trips.find(t => t.TripID === TripID);
  const navigate = useNavigate();

  const [location, setLocation] = useState(trip?.Location || "");
  const [dates, setDates] = useState(trip?.Dates || "");
  const [fact, setFact] = useState(trip?.Fact || "");
  const [photoSource, setPhotoSource] = useState(trip?.PhotoSource || "");

  useEffect(() => {
    if (trip) {
      setLocation(trip.Location || "");
      setDates(trip.Dates || "");
      setFact(trip.Fact || "");
      setPhotoSource(trip.PhotoSource || "");
    }
  }, [trip]);

  const handleSave = () => {
    const updated = {
      TripID: TripID,
      Location: location,
      Dates: dates,
      Fact: fact,
      PhotoSource: photoSource,
    };
    onSaveTrip(updated);
    navigate("/trips"); 
  };

  if (!trip) {
    return <h2>Trip not found.</h2>;
  }

  return (
    <div style={{paddingRight: "35px", minWidth: "750px"}}>
      <div style={{ height: '30px' }}></div>
      <h2 style={{textAlign: "center"}}>Edit Trip ✍️</h2>
      <div style={{ height: '30px' }}></div>
      <form
        onSubmit={(e) => {
            e.preventDefault();
            if (e.target.checkValidity()) {
            handleSave();
            } else {
            alert("Please fill in all required fields");
            }
        }}>
        <div style={{ display: "flex", justifyContent: "center"}}>
            <div style={{ marginRight: "25px" }}>
            <div style={{ height: '65px' }}/>
            <ImageUpload
                initialImage={photoSource}
                onImageSelect={setPhotoSource}
            />
            </div>
            <div>
            <div style={{ height: '30px' }}></div>
            <InputSection
                label="Location"
                Class="InputSectionMint"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
            />
            <InputSection
                label="Dates"
                Class="InputSectionMint"
                value={dates}
                onChange={e => setDates(e.target.value)}
                required
            />
            <InputSection
                label="Fact"
                Class="InputSectionMint"
                value={fact}
                onChange={e => setFact(e.target.value)}
                multiline
                required
            />
            <div style={{ height: '25px' }}></div>
            </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "25px" }}>
            <button type="submit" className="ClassicMint">Save Changes</button>
            <DeleteTripButton TripID={TripID} onDeleteTrip={onDeleteTrip} />
        </div>
      </form>
    </div>
  );
}

export function AddExperience({
  TripID,
  PosterID,
  onSaveExperience,  
}) {
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoSource, setPhotoSource] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    const newExp = {
      TripID: TripID,
      PosterID: PosterID,
      Place: place,
      Date: date,
      Title: title,
      Description: description,
      PhotoSource: photoSource || "/assets/Generic Trip.jpeg",
    };
    onSaveExperience(newExp);
    navigate("/trips"); 
  };

  return (
    <div style={{paddingRight: "35px", minWidth: "750px"}}>
      <div style={{ height: "30px" }}></div>
      <h2 style={{textAlign: "center"}}>Add Experience 🌄</h2>
      <div style={{ height: "30px" }}></div>
      <form
        onSubmit={(e) => {
            e.preventDefault();
            if (e.target.checkValidity()) {
            handleSave();
            } else {
            alert("Please fill in all required fields");
            }
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ marginRight: "25px" }}>
            <ImageUpload
                initialImage="/assets/Generic Trip.jpeg"
                defaultImage="/assets/Generic Trip.jpeg"
                onImageSelect={setPhotoSource}
            />
            </div>

            <div>
            <InputSection
                label="Place"
                Class="InputSectionMint"
                value={place}
                onChange={e => setPlace(e.target.value)}
                required
            />
            <InputSection
                label="Date"
                Class="InputSectionMint"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
            />
            <InputSection
                label="Title"
                Class="InputSectionMint"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <InputSection
                label="Description"
                Class="InputSectionMint"
                value={description}
                onChange={e => setDescription(e.target.value)}
                multiline
                required
            />
            </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "25px", marginTop: "20px" }}>
            <button type="submit" className="ClassicMint">
            Save Experience
            </button>
        </div>
      </form>
    </div>
  );
}

export function EditUser({ user, onSave }) {
  const [name, setName] = useState(user?.Bio?.Name || "");
  const [aboutMe, setAboutMe] = useState(user?.Bio?.AboutMe || "");
  const [pinnedTrip, setPinnedTrip] = useState(user?.Bio?.PinnedTrip || "");
  const [nextTrip, setNextTrip] = useState(user?.Bio?.UpcomingTrip || "");
  const [photoSource, setPhotoSource] = useState(user?.Bio?.PhotoSource || "");
  const navigate = useNavigate();

  useEffect(() => {
    setName(user?.Bio?.Name || "");
    setAboutMe(user?.Bio?.AboutMe || "");
    setPinnedTrip(user?.Bio?.PinnedTrip || "");
    setNextTrip(user?.Bio?.UpcomingTrip || "");
    setPhotoSource(user?.Bio?.PhotoSource || "");
  }, [user]);

  const handleSave = () => {
    const updatedBio = {
      Name: name,
      AboutMe: aboutMe,
      PinnedTrip: pinnedTrip,
      UpcomingTrip: nextTrip,
      PhotoSource: photoSource, 
      UserID: user.Bio.UserID,
      Following: user.Bio.Following || [],
    };

    onSave(updatedBio);
    navigate("/profile");
  };

  return (
    <div style={{paddingRight: "35px", minWidth: "750px"}}>
      <div style={{ height: "30px" }}></div>
      <h2 style={{textAlign: "center"}}>Update Profile</h2>
      <div style={{ height: "30px" }}></div>
      <form
        onSubmit={(e) => {
            e.preventDefault();
            if (e.target.checkValidity()) {
            handleSave();
            } else {
            alert("Please fill in all required fields");
            }
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ marginRight: "25px" }}>
            <ImageUpload
                initialImage={photoSource}
                onImageSelect={setPhotoSource}
                
            />
            </div>
            <div>
            <InputSection
                label="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                Class="InputSectionMint"
                required
            />
            <InputSection
                label="Favorite Trip"
                value={pinnedTrip}
                onChange={e => setPinnedTrip(e.target.value)}
                Class="InputSectionMint"
            />
            <InputSection
                label="Next Trip"
                value={nextTrip}
                onChange={e => setNextTrip(e.target.value)}
                Class="InputSectionMint"
            />
            <InputSection
                label="Bio"
                value={aboutMe}
                onChange={e => setAboutMe(e.target.value)}
                multiline
                Class="InputSectionMint"
                required
            />
            </div>
        </div>
        <div style={{display: "flex", justifyContent: "center", gap: "10px", marginTop: "25px" }}>
            <button className="ClassicMint" type="submit" >Save Changes</button>
            <NavLink className="ClassicMint" style={{ marginLeft: "10px" }} to="/profile">
              Cancel
            </NavLink>
        </div>
      </form>
    </div>
  );
}


export function AddTrip({ ActiveUser, onSaveTrip}) {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [fact, setFact] = useState("");
  const [photoSource, setPhotoSource] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    const newTrip = {
      Location: location,
      Dates: dates,
      Fact: fact,
      PhotoSource: photoSource || "/assets/Generic Trip.jpeg",
      PosterID: ActiveUser.Bio.UserID,
    };
    onSaveTrip(newTrip);
    navigate("/trips"); 
  };

  return (
    <div style={{paddingRight: "35px", minWidth: "750px"}}>
      <div style={{ height: "30px" }}></div>
      <h2 style={{textAlign: "center" }}>Add Trip ✈️</h2>
      <div style={{ height: "30px" }}></div>


      <form
        onSubmit={(e) => {
            e.preventDefault();
            if (e.target.checkValidity()) {
            handleSave();
            } else {
            alert("Please fill in all required fields");
            }
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ marginRight: "25px" }}>
            <ImageUpload
                initialImage="/assets/Generic Trip.jpeg"
                defaultImage="/assets/Generic Trip.jpeg"
                onImageSelect={setPhotoSource}
            />
            </div>

            <div>
            <div style={{ height: "30px" }}></div>
            <InputSection
                label="Location"
                Class="InputSectionMint"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
            />
            <InputSection
                label="Dates"
                Class="InputSectionMint"
                value={dates}
                onChange={e => setDates(e.target.value)}
                required
            />
            <InputSection
                label="Fact"
                Class="InputSectionMint"
                value={fact}
                onChange={e => setFact(e.target.value)}
                multiline
                required
            />
            <div style={{ height: "25px" }}></div>
            </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "25px" }}>
            <button className="ClassicMint" type = "submit">
            Save Trip
            </button>
            <NavLink className="ClassicMint" to="/trips">
            Cancel
            </NavLink>
        </div>
      </form>
    </div>
  );
}

export function EditExperience({
  ExperienceID,
  experiences,
  onSaveExperience,
  onDeleteExperience
}) {
  const experience = experiences.find(e => e.ExperienceID === ExperienceID);
  const navigate = useNavigate();

  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoSource, setPhotoSource] = useState(""); 

  useEffect(() => {
    if (experience) {
      setPlace(experience.Place || "");
      setDate(experience.Date || "");
      setTitle(experience.Title || "");
      setDescription(experience.Description || "");
      setPhotoSource(experience.PhotoSource || ""); 
    }
  }, [experience]);

  const handleSave = () => {
    const updated = {
      ExperienceID: ExperienceID,
      Place: place,
      Date: date,
      Title: title,
      Description: description,
      PhotoSource: photoSource, 
      PosterID: experience.PosterID,
      TripID: experience.TripID,
    };
    onSaveExperience(updated);
    navigate("/trips"); 
  };

  if (!experience) {
    return <h2>Experience not found.</h2>;
  }

  return (
    <div style={{paddingRight: "35px", minWidth: "750px"}}>
      <div style={{ height: "30px" }}></div>
      <h2 style={{textAlign: "center"}}>Edit Experience ✍️</h2>
      <div style={{ height: "30px" }}></div>
      <form
        onSubmit={(e) => {
            e.preventDefault();
            if (e.target.checkValidity()) {
            handleSave();
            } else {
            alert("Please fill in all required fields");
            }
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ marginRight: "25px" }}>
            <ImageUpload
                initialImage={experience.PhotoSource}
                onImageSelect={setPhotoSource}
            />
            </div>

            <div>
            <InputSection
                label="Place"
                Class="InputSectionMint"
                value={place}
                onChange={e => setPlace(e.target.value)}
                required
            />
            <InputSection
                label="Date"
                Class="InputSectionMint"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
            />
            <InputSection
                label="Title"
                Class="InputSectionMint"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <InputSection
                label="Description"
                Class="InputSectionMint"
                value={description}
                onChange={e => setDescription(e.target.value)}
                multiline
                required
            />
            </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "25px", marginTop: "20px" }}>
            <button className="ClassicMint" type="submit">
            Save Changes
            </button>
            <DeleteExperienceButton
            ExperienceID={ExperienceID}
            onDeleteExperience={onDeleteExperience}
            className ="ClassicMint"
            />
        </div>
      </form>
    </div>
  );
}

export function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Don't redirect here - let successful auth handle it
  // if (user) {
  //   return <Navigate to="/feed" replace />;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isSignup) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      // Only navigate after successful auth
      navigate("/feed", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await loginWithGoogle();
      navigate("/feed", { replace: true });
    } catch (err) {
      setError(err.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Enter your email to reset your password.");
      return;
    }

    try {
      await resetPassword(email);
      setMessage("Password reset email sent!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Only redirect if already logged in AND we have a user
  if (user) {
    return <Navigate to="/feed" replace />;
  }

  return (
    <div className="AuthPage" style={{paddingRight: "35px", minWidth: "250px"}}>
      <div className="AuthCard">
        <h2 className="AuthTitle">
          {isSignup ? "Create your Voyage account 🌍" : "Welcome back to Voyage 🌍"}
        </h2>

        <p className="AuthSubtitle">
          {isSignup
            ? "Start sharing your travels with friends"
            : "Log in to continue your journey"}
        </p>

        {error && <p className="AuthError">{error}</p>}
        {message && <p className="AuthMessage">{message}</p>}

        <form onSubmit={handleSubmit} className="AuthForm">
          <input
            type="email"
            placeholder="Email"
            className="AuthInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="AuthInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="ClassicRed--white"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isSignup
              ? "Create Account"
              : "Sign In"}
          </button>
        </form>

        {!isSignup && (
          <button
            onClick={handleResetPassword}
            className="AuthLink"
          >
            Forgot password?
          </button>
        )}

        <div className="AuthDivider">
          <span>OR</span>
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          className="GoogleButton"
          disabled={loading}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
          />
          Continue with Google
        </button>

        <p className="AuthToggle" style={{ marginLeft: "15px", marginRight: "15px", marginTop: "15px", marginBottom: "15px" }}>
          {isSignup ? "Already have an account?" : "New to Voyage?"}
          <button onClick={() => setIsSignup(!isSignup)} className="ClassicRed--white" style={{ marginLeft: "15px", marginRight: "15px", marginTop: "15px", marginBottom: "15px"}}>
            {isSignup ? "Sign in" : "Create account"}
          </button>
        </p>
      </div>
    </div>
  );
}

