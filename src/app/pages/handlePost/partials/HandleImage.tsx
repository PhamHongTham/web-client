import React, { FormEvent, useEffect, useState } from 'react';

interface HandleImageOptions {
  value: any;
  onChange: (value: any) => void;
}

const HandleImage = ({ value, onChange }: HandleImageOptions) => {
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    ''
  );

  useEffect(() => {
    if (value && typeof value === 'string') {
      setPreviewImage(String(value));
      onChange(value);
    }
  }, [value]);

  const handleFileInputImageChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const imageFile: any = (target.files as FileList)[0];
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
        <label htmlFor="input-image">
          <div className="previewImage">
            <img src={previewImage as string} alt=""></img>
          </div>
        </label>
      ) : (
          <label htmlFor="input-image">
            <div className="select-image">
              <i className="fal fa-camera"></i>
            </div>
          </label>
      )}
    </>
  );
};

export default HandleImage;
