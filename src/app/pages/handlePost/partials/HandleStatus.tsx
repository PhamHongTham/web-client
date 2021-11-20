import React from 'react'
import Select from 'react-select';

interface HandleStatusOptions {
  value: string[]
  onChange: (value: string[]) => void
}

const options = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
]

const HandleStatus = ({ value, onChange }: HandleStatusOptions) => {
  return (
    <div className="select-status">
      <Select options={options} placeholder="Select status" onChange={(value: any) => onChange(value.value)} />
    </div>
  )
}

export default HandleStatus
