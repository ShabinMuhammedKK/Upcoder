import React from 'react';

interface ProfilePictureProps {
  url: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ url }) => {
  return (
    <div className="profile-picture">
      <img src={url} alt="Profile"/>
    </div>
  );
};

export default ProfilePicture;