import React from 'react';
import Select from 'react-select';

interface HandleStatusOptions {
  value: string;
  onChange: (value: string) => void;
}

const options = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
];

const HandleStatus = ({ value, onChange }: HandleStatusOptions) => {
  return (
    <div className="select-status">
      <Select
        options={options}
        value={options.filter((item: any) => item.value === value)}
        placeholder="Select status"
        onChange={(item: any) => {
          onChange(item.value);
        }}
      />
    </div>
  );
};

export default HandleStatus;
