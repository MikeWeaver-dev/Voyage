
import {UserID, Accounts, Trips, Experiences} from "./props.jsx";
import React, { useState } from "react";

//components are the thing that makes React so powerful and the thing I wanted to get familiar with when learning react. I made a good number here and loop through them routinely in my frontend using the map functions

export function TravelImg(){
  return(
    <img src = "/src/assets/Travel-Logo.png" 
    width = "83"
    alt = "Travel Logo"/>
  )
}

export function Marker(){
return(
  <img src = "/src/assets/Marker.png" 
  width = "25"
  alt = "Marker"
  style={{position: "fixed"}}/>
)
}


export function Header() {
  return (
    <header className="Header">
      <div className="Headerul">
        <TravelImg />
        <h1>Voyage Travel Blog</h1>
      </div>
    </header>
  );
}

function EntryHeader({ UserID }) {
  const [isFollowing, setIsFollowing] = React.useState(false);

  return (
    <div className="CardHeader">
      <h2 className="UserIDStatic">{UserID}</h2>

      <label className="follow-toggle">
        <span className="follow-text">{isFollowing ? "Following" : "Not Following"}</span>
        <input 
          type="checkbox" 
          checked={isFollowing} 
          onChange={() => setIsFollowing(!isFollowing)} 
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}


export function Entry({
  PhotoSource, PhotoAlt, Location, Dates, Fact, GoogleMapsLink,
  PosterID, TripID, ActiveUser, setPage, setSelectedPosterID,
  setEditTripID, setViewTripID,
  isTripLiked,
  getLikeCount,
  handleToggleLike
}) {
  const isOwner = ActiveUser?.Bio?.UserID === PosterID;

  return (
    <article className="Journal-Entry">
      <div className="Card">
        <div className="CardBody">
          <div className="Main-Image-Container">
            <img className="Main-Image" src={PhotoSource} alt={PhotoAlt} />
          </div>
          <div>
            <button
              onClick={() => { setSelectedPosterID(PosterID); setPage("userSelected"); }}
              style={{ color: "#d4363c", marginLeft: "-16px" }}
              className="UserID"
            >
              {PosterID}
            </button>

            {isOwner && (
              <button
                onClick={() => { setEditTripID(TripID); setPage("tripEdit"); }}
                className="EditButton"
              >
                Edit Trip
              </button>
            )}

            <div className="ContainerTop">
              <img src="/src/assets/Marker.png" width="25" alt="Marker" />
              <button
                className="TripName"
                onClick={() => { setViewTripID(TripID); setPage("viewTrip"); }}
              >
                {Location}
              </button>
              <a href={GoogleMapsLink} target="_blank" rel="noopener noreferrer" className="ellipsis-link">
                View on Google Maps
              </a>
              <LikeButton
              tripId={TripID}
              isLiked={isTripLiked(TripID)}
              onToggle={() => handleToggleLike(TripID)}
              likeCount={getLikeCount(TripID)}
            />
            </div>
            <div style={{ height: "0.02px" }}></div>
            <p style={{ fontWeight: "bold" }}>{Dates}</p>
            <p className="Fact">{Fact}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Navbar({ setPage, ActiveUser }) {
  
  return (
    <nav className="Navbar">
      <div className="Navbar-scroll-wrapper">
        <div className="Navbar-left">
          <button onClick={() => setPage("myTrips")}>My Trips</button>
          <button onClick={() => setPage("myFeed")}>My Feed</button>
          <button onClick={() => setPage("following")}>Following</button>
          <button onClick={() => setPage("findFriends")}>Find Friends</button>
          <span className="Navbar-spacer" />
        </div>
      </div>

      <div className="Navbar-right">
        <img
          src={ActiveUser.Bio.PhotoSource}
          alt={ActiveUser.Bio.Name}
          className="Navbar-avatar"
        />
        <button onClick={() => setPage("myProfile")}>My Profile</button>
      </div>
    </nav>
  );
}

function FollowToggle({ ActiveUser, targetUserID, onToggleFollow }) {
  const isFollowing = ActiveUser.Bio.Following.includes(targetUserID);

  const handleChange = () => {
    onToggleFollow(targetUserID, !isFollowing);
  };

  return (
    <label className="follow-toggle">
      <span>{isFollowing ? "Following" : "Not Following"}</span>
      <input
        type="checkbox"
        checked={isFollowing}
        onChange={handleChange}
      />
      <span className="slider"></span>
    </label>
  );
}

export function Profile({
  Name,
  AboutMe,
  PinnedTrip,
  UpcomingTrip,
  ActiveUser,
  PhotoSource,
  setPage,
  setSelectedPosterID,
  UserID,
  onToggleFollow,   
}) {
  return (
    <article className="Journal-Entry">
      <div className="Card">
        <div className="CardHeader">
          <h2 className="UserIDStatic">{UserID}</h2>
          <FollowToggle
            ActiveUser={ActiveUser}
            targetUserID={UserID}
            onToggleFollow={onToggleFollow}
          />
        </div>

        <div style={{ height: "10px" }}></div>
        <div className="CardBody">
          <div className="Main-Image-Container">
            <img
              className="user-avatar"
              src={PhotoSource}
              alt="Profile Pic"
            />
          </div>
          <div>
            <button
              onClick={() => {
                setSelectedPosterID(UserID);
                setPage("userSelected");
              }}
              className="TripName"
            >
              {Name}
            </button>
            <p style={{ marginTop: "0px", fontSize: "17px" }}>{AboutMe}</p>
            <p style={{ fontWeight: "bold", fontSize: "14px" }}>
              Next Trip: {UpcomingTrip}
            </p>
            <p style={{ fontWeight: "bold", fontSize: "14px" }}>
              Favorite Trip: {PinnedTrip}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}


export function InputSection({ label, value, onChange, multiline, Class, required }) {
  return (
    <>
      <div className={Class}>
        <label>{label}</label>
        {multiline ? (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={`Enter ${label}`}
            required={required}
          />
        ) : (
          <input
            value={value}
            onChange={onChange}
            placeholder={`Enter ${label}`}
            required={required}
          />
        )}
      </div>
    </>
  );
}

export function Experience({
  ActiveUser,
  PosterID,
  ExperienceID,
  PhotoAlt,
  PhotoSource,
  Date,
  Place,
  Title,
  Description,
  setEditExperienceID,
  setPage
}) {
  const isOwner = ActiveUser?.Bio?.UserID === PosterID;

  return (
    <article className="Journal-Entry">
      <div className="Card">
        <div className="CardBody">
          <div className="Main-Image-Container">
            <img
              className="Main-Image"
              src={PhotoSource}
              alt={PhotoAlt}
            />
          </div>

          <div>
            <span style ={{display: "flex"}}>
              <h3 style ={{color: "#219c97", marginLeft: "0px", fontSize: "0.95rem", maxWidth: "450px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
              {PosterID}'s Experience in {Place}
              </h3>

              {isOwner && (
                <button onClick={() => {setEditExperienceID(ExperienceID); setPage("editExperience")}} className="EditButton" style = {{color: "#219c97", width: "30%"}}>
                  ✏️ Edit Experience
                </button>
              )}
            </span>

            <div style={{ height: '10px' }}></div>

            <div className="ContainerTop">
              <h2>🧩</h2> <h2 style = {{color: "#262626dc"}}>{Title}</h2>
            </div>

            <div style={{ height: '8px' }}></div>

            <p style={{ fontWeight: "bold" }}>{Date}</p>
            <p className="Fact">{Description}</p>
          </div>
        </div>
      </div>
    </article>
  );
}


export function Feed({
  trips,
  ActiveUser,
  setPage,
  setSelectedPosterID,
  setEditTripID = () => {},
  setViewTripID = () => {},
  setExperienceID = () => {},
  experiences,
  onDeleteExperience,
  isTripLiked,
  getLikeCount,
  handleToggleLike,
}) {
  const feedBlocks = trips.map((trip, tripIndex) => {
    const tripExperiences = experiences.filter(
      exp => exp.TripID === trip.TripID
    );
    const limitedExperiences = tripExperiences.slice(0, 2);
    const hasExperiences = tripExperiences.length > 0;
    const hasMore = tripExperiences.length > 2;

    return (
      <div key={`block-${trip.TripID}`} className="feed-trip-block">
        <Entry
          TripID={trip.TripID}
          {...trip}
          ActiveUser={ActiveUser}
          setPage={setPage}
          setSelectedPosterID={setSelectedPosterID}
          setEditTripID={setEditTripID}
          setViewTripID={setViewTripID}
          experiences={experiences.filter(e => e.TripID === trip.TripID)}
          onDeleteExperience={onDeleteExperience}
          GoogleMapsLink={`https://www.google.com/maps/place/${trip.Location}`}
          isTripLiked={isTripLiked}
          getLikeCount={getLikeCount}
          handleToggleLike={handleToggleLike}
        />
        {hasExperiences && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0" }}>
              <h3 style={{ margin: 0, marginLeft: "1%", maxWidth: "700px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                Highlights from {trip.PosterID}'s trip to {trip.Location}
              </h3>
              {hasMore && (
                <button
                  onClick={() => {
                    setViewTripID(trip.TripID);
                    setPage("viewTrip");
                  }}
                  className = "ClassicMint"
                >
                  View All Highlights
                </button>
              )}
            </div>
            <hr />
            {limitedExperiences.map(exp => (
              <Experience
                key={`exp-${exp.ExperienceID}`}
                ActiveUser={ActiveUser}
                PosterID={exp.PosterID}
                ExperienceID={exp.ExperienceID}
                PhotoAlt={exp.PhotoAlt}
                PhotoSource={exp.PhotoSource}
                Date={exp.Date}
                Place={exp.Place}
                Title={exp.Title}
                Description={exp.Description}
                setEditExperienceID={setExperienceID}
                setPage={setPage}
              />
            ))}

            <hr style={{ margin: "20px 0" }} />
          </>
        )}
      </div>
    );
  });

  if (trips.length === 0) {
    return (
        <>
            <div style={{ height: '100px' }}></div>
            <h2 style={{color: "gray"}}>
            You have no feed because you are not following anyone who has posted a trip! Navigate to 'Find Friends' and follow some accounts to populate your feed!
            </h2>
            <div style={{ height: '150px' }}></div>
        </>
    );
  }

  return <>{feedBlocks}</>;
}

export function Footer(){
  return(
    <>
      <footer>
        <div style = {{display: "flex"}}>
          <p style={{ textAlign: "left", marginLeft: "1%", marginTop: "3.5%", color: "#666", fontSize: "14px" }}>
            Web App Developed by Mike Weaver
          </p>
        </div>
      </footer>
    </>
  )
 }

 export function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="Card delete-modal-content">
        <h3 className="delete-modal-title">Delete Trip?</h3>
        <p className="delete-modal-text">
          This action <strong>cannot be undone</strong>.<br />
          Your trip will be gone forever.
        </p>
        <div className="delete-modal-buttons">
          <button onClick={onClose} className="ClassicRed delete-modal-cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="ClassicRed delete-modal-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function DeleteTripButton({ TripID, onDeleteTrip }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    onDeleteTrip(TripID);
    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="ClassicRed"
        style={{ fontSize: "14px", padding: "6px 12px" }}
      >
        Delete Trip
      </button>

      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export function DeleteExperienceButton({ ExperienceID, onDeleteExperience }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    onDeleteExperience(ExperienceID);
    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="ClassicMint"
      >
        Delete Experience
      </button>

      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export function ImageUpload({ onImageSelect, initialImage, defaultImage }) {
  const [preview, setPreview] = useState(
    initialImage && initialImage.length > 0 ? initialImage : defaultImage
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPreview(base64);
      onImageSelect(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div className="Main-Image-Container">
        <img src={preview} alt="Preview" className="Main-Image" />
      </div>
      <div style={{ height: "20px" }} />
      <label htmlFor="file-upload" className="custom-upload-btn">
        Upload Picture
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

// from tailwind
const HollowHeart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    stroke="currentColor"
    width="24"
    height="24"
    style={{ color: "#d4363c" }}        
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    />
  </svg>
);

const FilledHeart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    style={{ color: "#d4363c" }}          // red when liked
  >
    <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

export function LikeButton({ isLiked, onToggle, likeCount }) {
  return (
    <button className="like-button" onClick={onToggle}>
      {isLiked ? <FilledHeart /> : <HollowHeart />}
      {likeCount > 0 && <span className="like-count">{likeCount}</span>}
    </button>
  );
}