import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import { uploadImage } from "../../../helpers/request.helper";
import { BACKEND_URL_API, BACKEND_URL_IMAGES } from "../../../constants";

export default function ProfilePanel({ userID  }) {
  const [image, setImage] = useState(null);
  const inputFile = useRef(null);
  const [ message, setMessage ] = useState('Click here to Change the pick!')

  const [newImage, setNewImage] = useState(null)

  const uploadImageUrl = `${BACKEND_URL_API}/image_uploader`;

  const handleOnUploadImage = (event) => {
    setMessage('Uploading...')
    event.preventDefault();

    const data = new FormData();
    data.append("image", image);
    data.append("userID", userID);

    uploadImage(uploadImageUrl, data).then(({imagePath})=>{
      setNewImage(`${BACKEND_URL_IMAGES}${imagePath}`)
      setMessage('Updated image!!')
    }).catch(console.log);
  };

  const handleOnSetImage = ({ target: { files } }) => {
    setMessage('Image selected.')
    setImage(files[0])
  }

  const handleOpenFileSelector = () => { inputFile.current.click() }

  return (
    <div className='uploader' >
      <h2>Change Profile Photo</h2>

      <div className="uploader__preview" >
        {newImage && (<img src={newImage} alt=""/>)}
      </div>

      <input
      ref={inputFile}
        type="file"
        name="image"
        accept="image/x-png,image/gif,image/jpeg"
        className="uploader__input"
        onChange={handleOnSetImage}
        />
        <label onClick={handleOpenFileSelector} htmlFor="image">{message}</label>
      <button type="button" onClick={handleOnUploadImage}>
        upload
      </button>
    </div>
  );
}

ProfilePanel.propTypes = {
  userID: PropTypes.string,
};
