import React, { FormEvent } from 'react';

const SelectGender = ({ value, onChange }: any) => {
  return (
    <div className="select-gender">
      <label className="container-radio">
        Male
        <input
          type="radio"
          name="radio"
          checked={value === 'male' ? true : false}
          onChange={(e: FormEvent<HTMLInputElement>) => onChange('male')}
          required
        ></input>
        <span className="checkmark"></span>
      </label>
      <label className="container-radio">
        Female
        <input
          type="radio"
          name="radio"
          checked={value === 'female' ? true : false}
          onChange={(e: FormEvent<HTMLInputElement>) => onChange('female')}
          required
        ></input>
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default SelectGender;
