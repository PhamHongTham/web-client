import React, { useContext, useEffect, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Editor from './partials/Editor';
import PopupPublish from './partials/PopupPublish';
import { fetchSpecificArticleRequest, saveInfoPost } from 'app/stores/post/actions';
import { LoadingContext } from 'app/shared/components/loading/LoadingProvider';

const HandlePost = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({});
  const { id }: { id: string } = useParams();
  const [post, setPost] = useState<any>(null);

  const [showPopupPublish, setShowPopupPublish] = useState<boolean>(false);
  const { handleShowLoading } = useContext(LoadingContext)

  useEffect(() => {
    handleShowLoading(true)
    dispatch(fetchSpecificArticleRequest(id)).then((res: any) => {
      setPost(res)
      reset({
        content: res?.content
      })
      handleShowLoading(false)
    })
  }, [])

  const onSubmit = (data: {
    title: string;
    description: string;
    content: string;
  }) => {
    setShowPopupPublish(true);
    dispatch(saveInfoPost(data));
  };

  return (
    <section className="section-editor">
      {showPopupPublish ? (
        <PopupPublish
          post={post}
          showPopupPublish={showPopupPublish}
          setShowPopupPublish={setShowPopupPublish}
        />
      ) : ''}
      <div className="container">
        <h2 className="editor-title">Boogle Editor</h2>
        <form className="form-handle-post" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Title"
            className="input-post-title"
              defaultValue={post?.title}
            {...register('title')}
            required
          />
            <input
            type="text"
            placeholder="Description"
              className="input-post-description"
              defaultValue={post?.description}
              {...register('description')}
              required
            />
            <Controller
              control={control}
              name="content"
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                formState,
              }) => <Editor value={post ? post.content : ''} onChange={onChange} />}
            />
          <button className="btn btn-primary">Publish</button>
        </form>
      </div>
    </section>
  );
};

export default HandlePost;
