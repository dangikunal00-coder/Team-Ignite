import React from "react";
import "./ProfileCard.css"; // Import CSS file

const ProfileCard = ({ name, role, bio, image, linkedin, github }) => {
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={image} alt={name} />
      </div>
      <h2 className="profile-name">{name}</h2>
      <p className="profile-role">{role}</p>
      <p className="profile-bio">{bio}</p>
      <div className="profile-links">
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
