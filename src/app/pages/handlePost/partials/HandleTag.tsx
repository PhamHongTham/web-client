import React from 'react';
import Creatable from 'react-select/creatable';

interface MyOptionType {
  label: string;
  value: string;
}

interface HandleTagOptions {
  value: string[];
  onChange: (value: string[]) => void;
}

const HandleTag = ({ value, onChange }: HandleTagOptions) => {
  const [tags, setTags] = React.useState<MyOptionType[]>([]);

  const handleChangeTags = (option: any, meta: any) => {
    let newListTags = [...option];
    if (newListTags.length <= 5) {
      newListTags = newListTags.map((item: any) => {
        delete item['__isNew__'];
        return { ...item };
      });
      setTags(newListTags);
      let tagsData = newListTags.map((item: MyOptionType) => item.value);
      onChange(tagsData);
    }
  };
  return (
    <div className="select-tags">
      <Creatable
        isMulti
        placeholder="Create tags"
        options={tags}
        value={tags}
        onChange={handleChangeTags}
        createOptionPosition={'last'}
      />
    </div>
  );
};

export default HandleTag;
