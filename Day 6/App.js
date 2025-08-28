import React from "react";
import ProfileCard from "./ProfileCard";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f4f4",
      }}
    >
      <ProfileCard
        name="Dip Banerjee"
        role="Full Stack Developer"
        bio="Passionate about building scalable web applications and exploring new technologies."
        image="https://via.placeholder.com/150"
        linkedin="https://linkedin.com/in/yourprofile"
        github="https://github.com/yourusername"
      />
    </div>
  );
}

export default App;
