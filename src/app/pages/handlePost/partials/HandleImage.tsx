import React, { FormEvent, useEffect, useState } from 'react';

interface HandleImageOptions {
  value: File | string;
  onChange: (value: File) => void
}

const HandleImage = ({ value, onChange }: HandleImageOptions) => {
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>('')
  // useEffect(() => {
  //   if (imageFile) {
  //     setImageFile(imageFile);
  //   } else {
  //     setPreviewImage(null);
  //   }
  // }, [imageFile]);

  useEffect(() => {
    if (value) {
      setPreviewImage(String(value))
    }
  }, [value])

  const handleFileInputImageChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const imageFile: File = (target.files as FileList)[0];
    onChange(imageFile);

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  return (
    <>
      <label htmlFor="input-image" className="cover-image">
        <span className="cover-image-content">Cover Image</span>
        <i className="fal fa-image"></i>
      </label>
      <input
        type="file"
        id="input-image"
        className="input-image"
        onChange={handleFileInputImageChange}
      ></input>
      {previewImage ? (
        <div className="previewImage">
          <img src={previewImage as string} alt=""></img>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default HandleImage;
