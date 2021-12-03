import React, { FormEvent, useEffect, useState } from 'react';

import InputMask from 'react-input-mask';

const HandleBirthdate = ({ value, onChange }: any) => {
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let date = new Date(value);
    let currentDate = new Date();
    if (date.getTime() > currentDate.getTime()) {
      setError('Wrong date of birth');
    } else {
      setError(null);
    }
  }, [value]);
  return (
    <>
      <InputMask
        mask="99/99/9999"
        placeholder="Enter birthdate"
        value={value}
        onChange={(e: FormEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
        required
      />
      {error ? <p className="error">{error}</p> : ''}
    </>
  );
};

export default HandleBirthdate;
