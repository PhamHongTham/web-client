import React, { FormEvent, useEffect, useState } from 'react';

interface HandleImageOptions {
  value: File | string;
  onChange: (value: File) => void
}

const HandleImage = ({ value, onChange }: HandleImageOptions) => {
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>('')

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
          <label htmlFor="input-image" >
            <div className="select-image" >
            </div>
          </label>
      )}
    </>
  );
};

export default HandleImage;
