import React, { useContext, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Editor from './partials/Editor';
import PopupPublish from './partials/PopupPublish';
import {
  fetchSpecificPostRequest,
  saveInfoPost,
} from 'app/stores/post/actions';
import { LoadingContext } from 'app/shared/components/loading/LoadingProvider';

const HandlePost = () => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    title: yup
      .string()
      .trim()
      .min(20, 'Title must be at least 20 characters')
      .required(),
    description: yup
      .string()
      .min(50, 'Description must be at least 50 characters')
      .required(),
    content: yup
      .string()
      .min(200, 'Content must be at least 200 characters')
      .required(),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const { id }: { id: string } = useParams();
  const [post, setPost] = useState<any>(null);

  const [showPopupPublish, setShowPopupPublish] = useState<boolean>(false);
  const { handleShowLoading } = useContext(LoadingContext);

  useEffect(() => {
    handleShowLoading(true);
    dispatch(fetchSpecificPostRequest(id)).then((res: any) => {
      setPost(res);
      reset(res);
      handleShowLoading(false);
    });
  }, [id]);

  const onSubmit = (data: {
    title: string;
    description: string;
    content: string;
  }) => {
    setShowPopupPublish(true);
    dispatch(saveInfoPost({ ...post, ...data }));
  };

  return (
    <section className="section-editor">
      {showPopupPublish ? (
        <PopupPublish
          showPopupPublish={showPopupPublish}
          setShowPopupPublish={setShowPopupPublish}
        />
      ) : (
        ''
      )}
      <div className="container">
        <h2 className="editor-title">Boogle Editor</h2>
        <form className="form-handle-post" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Title"
            className="input-post-title"
            {...register('title')}
          />
          {errors.title ? <p className="error">{errors.title.message}</p> : ''}
          <input
            type="text"
            placeholder="Description"
            className="input-post-description"
            {...register('description')}
          />
          {errors.description ? (
            <p className="error">{errors.description.message}</p>
          ) : (
            ''
          )}
          <Controller
            control={control}
            name="content"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Editor value={value} onChange={onChange} />
            )}
          />
          {errors.content ? (
            <p className="error">{errors.content.message}</p>
          ) : (
            ''
          )}
          <button className="btn btn-primary">Publish</button>
        </form>
      </div>
    </section>
  );
};

export default HandlePost;
