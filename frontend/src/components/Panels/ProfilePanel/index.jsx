import React, { useState } from "react";
import PropTypes from "prop-types";

import { uploadImage } from "../../../helpers/request.helper";
import { BACKEND_URL_API } from "../../../constants";

export default function ProfilePanel({ userID,  }) {
  const [image, setImage] = useState(null);

  const uploadImageUrl = `${BACKEND_URL_API}/image_uploader`;

  const handleOnUploadImage = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("image", image);
    data.append("userID", userID);

    uploadImage(uploadImageUrl, data).then(console.log).catch(console.log);
  };

  const handleOnSetImage = ({ target: { files } }) => setImage(files[0]);

  return (
    <div>
      <h2>Change Profile Photo</h2>

      <input
        type="file"
        accept="image/x-png,image/gif,image/jpeg"
        onChange={handleOnSetImage}
      />
      <button type="button" onClick={handleOnUploadImage}>
        upload
      </button>
    </div>
  );
}

ProfilePanel.propTypes = {
  userID: PropTypes.string,
};
