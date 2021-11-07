import React, { useState } from "react";

export const DevelopersContext = React.createContext();

function DevelopersProvider(props) {
  const [profile, setProfile] = useState({});
  const [allprofiles, setAllprofiles] = useState({});

  const profileHandler = (value) => {
    setProfile(value);
  };

  const profilesHandler = (value) => {
    setAllprofiles(value);
  };

  const defValue = {
    isProfile: profile,
    setIsProfile: profileHandler,
    allProfiles: allprofiles,
    setAllProfiles: profilesHandler,
  };
  return (
    <DevelopersContext.Provider value={defValue}>
      {props.children}
    </DevelopersContext.Provider>
  );
}

export default DevelopersProvider;
