import {Entry, Profile, InputSection, Experience, Feed, Footer, DeleteTripButton , DeleteExperienceButton, ImageUpload } from "./components.jsx";
import {Trips} from "./props.jsx";
import { useState, useEffect } from "react";

// every page a user can navigate to has it's fornt end code here. Some of the code looks complex but it's really not, it's just passing props back and forth and doing a few hooks and calling of functions defined in main.jsx

export function MyFeed({
  ActiveUser,
  setPage,
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
  const followingList = ActiveUser.Bio.Following;
  const feedTrips = trips.filter(trip =>
  followingList.includes(trip.PosterID)
  );

  return (
    <>
        <Feed
        trips={feedTrips}
        ActiveUser={ActiveUser}
        setPage={setPage}
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
    </>
  );
}

export function MyTrips({
  ActiveUser,
  setPage,
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
  const userID = ActiveUser.Bio.UserID;
  const myTrips = trips.filter(trip => trip.PosterID === userID);

  return (
    <>
      <button onClick={() => setPage("addTrip")} className="SpecialRed">
        +
      </button>

      <div style={{ height: "20px" }}></div>

      {myTrips.length > 0 ? (
        <Feed
          trips={myTrips}
          ActiveUser={ActiveUser}
          setPage={setPage}
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
        <>
            <div style={{ height: '100px' }}></div>
            <h2 style={{color: "gray"}}>
            You haven't posted any trips yet! Click the red + in the top left corner to post your first trip
            </h2>
            <div style={{ height: '150px' }}></div>
        </>
      )}
      <Footer/>
    </>
  );
}

  export function BioPage({ActiveUser, setPage, setCurrentUserID}) {
    return(
      <div style={{ textAlign: "center" }}>
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
            <button className="ClassicRed" onClick={() => setPage("editUser")} style={{marginBottom: "40px", marginRight: "20px"}} >
                Edit Profile
            </button>
            <button className="ClassicRed" onClick={() => setPage("Login")} style={{marginBottom: "40px"}} >
                Logout
            </button>
          </div>  
          <Footer/>
        </div>
    )
  }

// Users you're NOT following
export function FindFriends({ ActiveUser, setPage, setSelectedPosterID, accounts, onToggleFollow }) {
const notFollowing = Object.values(accounts).filter(
    account =>
      account.Bio.UserID !== ActiveUser.Bio.UserID &&
      !ActiveUser.Bio.Following.includes(account.Bio.UserID)
  );

  return (
    <>
      {notFollowing.length > 0 ? (
        notFollowing.map(account => (
          <Profile
            setSelectedPosterID = {setSelectedPosterID}
            setPage={setPage}
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
        ))
      ) : (
        <>
            <div style={{ height: '100px' }}></div>
            <h2 style={{ color: "gray" }}>
              You are following everyone!
            </h2>
            <div style={{ height: '150px' }}></div>
        </>
      )}
      <Footer/>
    </>
  );
}

// Users you ARE following
export function MyFriends({ ActiveUser, setPage, setSelectedPosterID, accounts, onToggleFollow }) {
const following = Object.values(accounts).filter(
    account =>
      account.Bio.UserID !== ActiveUser.Bio.UserID &&
      ActiveUser.Bio.Following.includes(account.Bio.UserID)
  );

  return (
    <>
      {following.length > 0 ? (
        following.map(account => (
          <Profile
            setSelectedPosterID = {setSelectedPosterID}
            setPage={setPage}
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
        ))
      ) : (
        <>
            <div style={{ height: '100px' }}></div>
            <h2 style={{ color: "gray" }}>
            You aren't following anyone yet!
            </h2>
            <div style={{ height: '150px' }}></div>
        </>
      )}
      <Footer/>
    </>
  );
}

export function TripEdit({TripID, setPage, setEditTripID, onDeleteTrip}){
    return(
        <>  
          <div style={{ height: "140px"}}></div>
          <div style={{display: "flex", justifyContent: "center"}}>
            <button 
                onClick={() => {setEditTripID(TripID); setPage("tripEdit2")}}
                className="ClassicRed">Edit Trip! ✍️
            </button>

            <button 
                onClick={() => {setEditTripID(TripID); setPage("addExperience")}}
                className = "ClassicMint" style={{ marginLeft: "30px", marginRight: "30px"}}>Add New Experience! 🌄
            </button>
            <DeleteTripButton TripID={TripID} onDeleteTrip={onDeleteTrip} />
          </div>
        </>
    )
}

export function ViewUser({
  PosterID,
  setPage,
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
    <>
      <Profile
        Name={selectedUser.Bio.Name}
        AboutMe={selectedUser.Bio.AboutMe}
        PinnedTrip={selectedUser.Bio.PinnedTrip}
        UpcomingTrip={selectedUser.Bio.UpcomingTrip}
        PhotoSource={selectedUser.Bio.PhotoSource}
        ActiveUser={ActiveUser}
        setPage={setPage}
        setSelectedPosterID={setSelectedPosterID}
        UserID={selectedUser.Bio.UserID}
        onToggleFollow={onToggleFollow}
      />


      {userTrips.length > 0 ? (
        <>
            <h3 style ={{color: "#474747ff"}}>{PosterID}'s Trips:</h3>
            <hr></hr>
            <div style={{ height: '10px' }}></div>

            <Feed
            trips={userTrips}
            ActiveUser={ActiveUser}
            setPage={setPage}
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
        </>
      ) : (
        <p style={{ textAlign: "center", color: "gray" }}>
          This user hasn’t posted any trips yet.
        </p>
      )}
      <Footer/>
    </>
  );
}

export function ViewTrip({ 
  TripID, 
  setPage, 
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
    <>
      <Entry
        key={trip.TripID}
        {...trip}
        ActiveUser={ActiveUser}
        setPage={setPage}
        setSelectedPosterID={setSelectedPosterID}
        setEditTripID={setEditTripID}
        setViewTripID={() => {}}
        GoogleMapsLink={`https://www.google.com/maps/place/${trip.Location}`}
        isTripLiked={isTripLiked}
        getLikeCount={getLikeCount}
        handleToggleLike={handleToggleLike}
      />

      {tripExperiences.length > 0 ? (

        <>
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
                setPage={setPage}
            />
            ))}
        </>
      ) : (
        <p style={{ textAlign: "center" }}>
          No experiences added yet for this trip.
        </p>
      )}
      <Footer/>
    </>
  );
}

export function TripEdit2({ TripID, Trips, onDeleteTrip, onSaveTrip }) {
  const trip = Trips.find(t => t.TripID === TripID);

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
  };

  if (!trip) {
    return <h2>Trip not found.</h2>;
  }

  return (
    <>
      <div style={{ height: '30px' }}></div>
      <h2>Edit Trip ✍️</h2>
      <div style={{ height: '10px' }}></div>
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
    </>
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

  const handleSave = () => {
    const newExp = {
      TripID: TripID,
      PosterID: PosterID,
      Place: place,
      Date: date,
      Title: title,
      Description: description,
      PhotoSource: photoSource || "src/assets/Generic Trip.jpeg",
    };
    onSaveExperience(newExp);
  };

  return (
    <>
      <div style={{ height: "30px" }}></div>
      <h2>Add Experience 🌄</h2>
      <div style={{ height: "10px" }}></div>
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
                initialImage="src/assets/Generic Trip.jpeg"
                defaultImage="src/assets/Generic Trip.jpeg"
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
    </>
  );
}

export function EditUser({ user, onSave, setPage }) {
  const [name, setName] = useState(user?.Bio?.Name || "");
  const [aboutMe, setAboutMe] = useState(user?.Bio?.AboutMe || "");
  const [pinnedTrip, setPinnedTrip] = useState(user?.Bio?.PinnedTrip || "");
  const [nextTrip, setNextTrip] = useState(user?.Bio?.UpcomingTrip || "");
  const [photoSource, setPhotoSource] = useState(user?.Bio?.PhotoSource || "");


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
    setPage("myProfile");
  };

  return (
    <>
      <div style={{ height: "30px" }}></div>
      <h2>Update Profile</h2>
      <div style={{ height: "10px" }}></div>
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
        <div style={{ marginTop: "25px" }}>
            <button className="ClassicMint" type="submit" >Save Changes</button>
            <button className="ClassicMint" style={{ marginLeft: "10px" }} onClick={() => setPage("myProfile")}>Cancel</button>
        </div>
      </form>
    </>
  );
}


export function AddTrip({ ActiveUser, onSaveTrip, setPage }) {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [fact, setFact] = useState("");
  const [photoSource, setPhotoSource] = useState("");

  const handleSave = () => {
    const newTrip = {
      Location: location,
      Dates: dates,
      Fact: fact,
      PhotoSource: photoSource || "src/assets/Generic Trip.jpeg",
      PosterID: ActiveUser.Bio.UserID,
    };
    onSaveTrip(newTrip);
  };

  return (
    <>
      <div style={{ height: "30px" }}></div>
      <h2>Add Trip ✈️</h2>
      <div style={{ height: "10px" }}></div>


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
                initialImage="src/assets/Generic Trip.jpeg"
                defaultImage="src/assets/Generic Trip.jpeg"
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
            <button className="ClassicMint" onClick={() => setPage("myTrips")}>
            Cancel
            </button>
        </div>
      </form>
    </>
  );
}

export function EditExperience({
  ExperienceID,
  experiences,
  onSaveExperience,
  onDeleteExperience
}) {
  const experience = experiences.find(e => e.ExperienceID === ExperienceID);

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
  };

  if (!experience) {
    return <h2>Experience not found.</h2>;
  }

  return (
    <>
      <div style={{ height: "30px" }}></div>
      <h2>Edit Experience ✍️</h2>
      <div style={{ height: "10px" }}></div>
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
            classname ="ClassicMint"
            />
        </div>
      </form>
    </>
  );
}

export function Login({setPage}){
    return(
      <>
        <div style={{ height: "80px" }}></div>
        <h3>You have successfully logged out!</h3>
      </>
    )
}



