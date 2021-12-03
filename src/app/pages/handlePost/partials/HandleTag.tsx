import React, { useEffect } from 'react';
import Creatable from 'react-select/creatable';

interface MyOptionType {
  label: any;
  value: any;
}

interface HandleTagOptions {
  value: string[];
  onChange: (value: string[]) => void;
}

const options = [
  { value: 'business', label: 'Business' },
  { value: 'technology', label: 'Technology' },
  { value: 'health', label: 'Health' },
  { value: 'relationships', label: 'Relationships' },
  { value: 'information technology', label: 'Information Technology' },
  { value: 'self', label: 'Self' },
];
const HandleTag = ({ value, onChange }: HandleTagOptions) => {
  const [tags, setTags] = React.useState<MyOptionType[]>([]);

  const handleChangeTags = (option: any, meta: any) => {
    let newListTags = [...option];
    if (newListTags.length <= 5) {
      newListTags = newListTags.map((item: any) => {
        delete item['__isNew__'];
        return item;
      });
      setTags(newListTags);
      let tagsData = newListTags.map((item: MyOptionType) => item.value);
      onChange(tagsData);
    }
  };

  useEffect(() => {
    if (value) {
      let defaultValue = value.map((item: any) => {
        let newItem = {
          label: item,
          value: item,
        };
        return newItem;
      });
      setTags(defaultValue);
    }
  }, [value]);

  return (
    <div className="select-tags">
      <Creatable
        isMulti
        placeholder="Create tags"
        options={options}
        value={tags}
        onChange={handleChangeTags}
        createOptionPosition={'last'}
      />
    </div>
  );
};

export default HandleTag;
