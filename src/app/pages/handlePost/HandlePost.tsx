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
  updatePostRequest,
} from 'app/stores/article/actions';
import axios from 'axios';
import axiosClient from 'app/shared/core/services/axios-client';
import HandleTag from './partials/HandleTag';
import HandleImage from './partials/HandleImage';
import Editor from './partials/Editor';

const HandlePost = (props: any) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm({});
  const { id }: { id: string } = useParams();

  // const { isLoading, message, error } = useSelector(
  //   (state: RootState) => state.article
  // );
  const { currentArticle } = useSelector((state: RootState) => state.article);

  // const [listTags, setListTags] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('public');
  // const [contentPost, setContentPost] = useState<string>('');
  // const [imageFile, setImageFile] = useState<File | null>(null);
  // const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
  //   null
  // );
  // const [clearContentPost, setClearContentPost] = useState<boolean>(false);

  // const { handleAddNotification } = useContext(NotificationContext);
  // const { handleShowLoading } = useContext(LoadingContext);

  // useEffect(() => {
  //   if (id) {
  //     dispatch(fetchSpecificArticleRequest(id));
  //   }
  // }, [id]);

  // useEffect(() => {
  //   if (id && currentArticle) {
  //     setContentPost(currentArticle.content);
  //     setStatus(currentArticle.status);
  //     setListTags(currentArticle.tags);
  //     setPreviewImage(currentArticle.cover);
  //   }
  // }, [currentArticle, dispatch]);

  // useEffect(() => {
  //   handleShowLoading(isLoading ? true : false);
  //   if (error) {
  //     handleAddNotification({ type: 'ERROR', message: error });
  //   }
  //   if (message) {
  //     handleAddNotification({
  //       type: 'SUCCESS',
  //       message: 'create post success',
  //     });
  //   }
  // }, [isLoading, error, message]);

  // useEffect(() => {
  //   reset({
  //     tags: []
  //   })
  // }, [])

  // const getUrlImage = async () => {
  //   const signUrlOption = {
  //     typeUpload: 'cover-post',
  //     fileName: imageFile?.name,
  //     fileType: imageFile?.type,
  //   };
  //   const urlImage = await axiosClient.get(
  //     `/signatures?type_upload=${signUrlOption.typeUpload}&file_name=${signUrlOption.fileName}&file_type=${signUrlOption.fileType}`
  //   );
  //   return urlImage;
  // };

  const handleChangeTag = (value: string[]) => {
    console.log(value)
  };

  const handleChangeImage = (value: File) => {
    console.log(value)
  }

  const handleChangeEditor = (value: string) => {
    console.log(value)
  }

  const onSubmit = async (data: { title: string; description: string }) => {
    console.log(data)
    let newPost;
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
      <div className="container">
        <h2 className="editor-title">Boogle Editor</h2>
        <form className="form-handle-post" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Title"
            className="input-post-title"
            // defaultValue={currentArticle?.title}
            {...register('title')}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="input-post-description"
            // defaultValue={currentArticle?.description}
            {...register('description')}
            required
          />
          <select
            {...register('status')}
            className="status"
            value={status}
            onChange={(e: any) => setStatus(e.target.value)}
            required
          >
            <option value="private" className="status-item">
              Private
            </option>
            <option value="public" className="status-item">
              Public
            </option>
          </select>
          <Controller
            control={control}
            name="tags"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <HandleTag value={value} onChange={onChange} />
            )}
          />
          <HandleImage value={''} onChange={handleChangeImage} />
          <Editor value={''} onChange={handleChangeEditor} />
          <button className="btn btn-primary">
            {id ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default HandlePost;
