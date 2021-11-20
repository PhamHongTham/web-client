import React, { useContext, useEffect, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from 'app/stores/app-reducer';
import { LoadingContext } from 'app/shared/components/loading/LoadingProvider';
import { NotificationContext } from 'app/shared/components/notifications/NotificationProvider';
import {
  createNewPostRequest,
  fetchSpecificArticleRequest,
  saveInfoPost,
  updatePostRequest,
} from 'app/stores/article/actions';
import axios from 'axios';
import axiosClient from 'app/shared/core/services/axios-client';
import Editor from './partials/Editor';
import PopupPublish from './partials/PopupPublish';

const HandlePost = (props: any) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, control, formState: { errors }, reset } = useForm({});
  const { id }: { id: string } = useParams();
  const [post, setPost] = useState<any>('')

  const [showPopupPublish, setShowPopupPublish] = useState<boolean>(false);

  // useEffect(() => {
  //   return () => {
  //     setShowPopupPublish(false)
  //   }
  // }, [])

  // useEffect(() => {
  //   dispatch(fetchSpecificArticleRequest(id)).then((res: any) => {
  //     setPost(res)
  //     reset({
  //       content: res?.content
  //     })
  //   })
  // }, [])

  const onSubmit = (data: { title: string, description: string, content: string }) => {
    setShowPopupPublish(true)
    dispatch(saveInfoPost(data))
    // CHECK CREATE OR UPDATE
    // if (currentArticle?.cover) {
    //   // CHECK IMAGE CHANGE
    //   if (imageFile) {
    //     let { signedRequest, url }: any = await getUrlImage();
    //     newPost = {
    //       ...data,
    //       tags: listTags,
    //       cover: url as string,
    //       content: contentPost,
    //     };
    //     dispatch(updatePostRequest(newPost, id));
    //     axios.put(signedRequest, imageFile);
    //   } else {
    //     newPost = {
    //       ...data,
    //       tags: listTags,
    //       cover: currentArticle?.cover,
    //       content: contentPost,
    //     };
    //     dispatch(updatePostRequest(newPost, id));
    //   }
    // } else {
    //   if (imageFile) {
    //     let { signedRequest, url }: any = await getUrlImage();
    //     newPost = {
    //       ...data,
    //       tags: listTags,
    //       cover: url as string,
    //       content: contentPost,
    //     };
    //     await dispatch(createNewPostRequest(newPost));
    //     clearFormHandlePost();
    //     axios.put(signedRequest, imageFile);
    //   }
    // }
  };

  return (
    <section className="section-editor">
      {
        showPopupPublish ? (<PopupPublish showPopupPublish={showPopupPublish} setShowPopupPublish={setShowPopupPublish} />) : <div className="container">
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
              }) => (
                <Editor value={''} onChange={onChange} />
              )}
            />
            <button className="btn btn-primary">
              Publish
            </button>
        </form>
      </div>
      }
    </section>
  );
};

export default HandlePost;
