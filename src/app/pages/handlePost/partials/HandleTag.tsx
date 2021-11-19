import React, { FormEvent, useEffect, useState } from 'react';

interface HandleTagOptions {
  value: string[];
  onChange: (value: string[]) => void
}

const HandleTag = ({ value, onChange }: HandleTagOptions) => {
  const [listTags, setListTags] = useState<string[]>(value)
  const [newTag, setNewTag] = useState<string>('');
  const [errorTag, setErrorTag] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setErrorTag('');
    }, 3000);
  }, [errorTag]);

  useEffect(() => {
    onChange(listTags)
  }, [listTags])

  const handleAddTag = () => {
    if (newTag === '') {
      return;
    } else if (value && value.length <= 4) {
      const existsTag = value.find((item: string) => item === newTag);
      if (existsTag) {
        setErrorTag('Tag is exists');
      } else {
        setListTags((prevState: string[]) => [...prevState, newTag])
      }
    } else {
      setErrorTag('You can only add 5 new tags');
    }
    setNewTag('');
  };

  const handleDeleteTag = (tag: string) => {
    setListTags((listTags: string[]) =>
      listTags.filter((item: string) => item !== tag)
    );
  };

  return (
    <>
      <div className="handle-tag">
        <input
          type="text"
          placeholder="New tag"
          className="input-tag"
          value={newTag}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setNewTag(e.currentTarget.value)
          }
        />
        <button className="btn add-tag" type="button" onClick={handleAddTag}>
          Add new tag
        </button>
      </div>
      {listTags?.length > 0 ? (
        <ul className="list-tags">
          {listTags.map((tag: string, index: number) => (
            <li className="tag-item" key={index}>
              <span className="tag-content">{tag}</span>
              <i
                className="fal fa-times"
                onClick={() => handleDeleteTag(tag)}
              ></i>
            </li>
          ))}
          {errorTag ? <span className="error-tag">{errorTag}</span> : ''}
        </ul>
      ) : (
        ''
      )}
    </>
  );
};

export default HandleTag;
