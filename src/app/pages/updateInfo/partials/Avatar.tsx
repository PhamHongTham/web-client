import React, { FormEvent, useState } from 'react';

const Avatar = ({ value, onChange }: any) => {
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    ''
  );

  const handleFileInputImageChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const imageFile: any = (target.files as FileList)[0];
    onChange(imageFile)

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  return (
    <div className="avatar">
      <div className="avatar-image">
        {previewImage ? (
          <img src={previewImage as string} alt=""></img>
        ) : (
          <img
            src={
              value
                ? value
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTht9-qZYmqErdGMhJVbRf7BfhLRGspNWaFnR8nddu3x7Da7nqh23vsG6VWtG_VE9G9kLU&usqp=CAU'
            }
            alt=""
          ></img>
        )}
        <input
          type="file"
          id="input-image"
          className="input-image"
          onChange={handleFileInputImageChange}
        ></input>
        <label htmlFor="input-image" className="select-image">
          <i className="fal fa-camera"></i>
        </label>
      </div>
    </div>
  );
};

export default Avatar;
