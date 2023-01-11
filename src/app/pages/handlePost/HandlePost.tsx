import React, { FormEvent, useContext, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Editor from './partials/Editor';
import PopupPublish from './partials/PopupPublish';
import {
  clearUrlImageRequest,
  fetchSpecificPostRequest,
  loadingUploadImageRequest,
  saveInfoPost,
  saveUrlImageRequest,
  uploadImage,
  uploadImage2,
} from 'app/stores/post/actions';
import { LoadingContext } from 'app/shared/components/loading/LoadingProvider';
import Footer from 'app/shared/components/Footer';

const HandlePost = () => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    // title: yup
    //   .string()
    //   .trim()
    //   .min(20, 'Title must be at least 20 characters')
    //   .required(),
    // description: yup
    //   .string()
    //   .min(50, 'Description must be at least 50 characters')
    //   .required(),
    // content: yup
    //   .string()
    //   .min(200, 'Content must be at least 200 characters')
    //   .required(),
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
    if (id) {
      handleShowLoading(true);
      dispatch(fetchSpecificPostRequest(id)).then((res: any) => {
        setPost(res);
        reset(res);
        handleShowLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(clearUrlImageRequest());
    };
  }, []);

  const handleFileInputImageChange = async (e: FormEvent<HTMLInputElement>) => {
    dispatch(loadingUploadImageRequest(true));
    const target = e.target as HTMLInputElement;
    const imageFile: any = (target.files as FileList)[0];
    // dispatch(uploadImage(imageFile, 'content-post')).then((res: any) => {
    //   dispatch(saveUrlImageRequest(res));
    //   dispatch(loadingUploadImageRequest(false));
    // });

    let formData = new FormData();
    formData.append("image", imageFile);

    const imageResult = await dispatch(uploadImage2(formData));
    dispatch(saveUrlImageRequest(imageResult.url));
    dispatch(loadingUploadImageRequest(false));
  };

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
        <div className="row d-flex justify-content-center">
          <aside className="editor-action">
            <label htmlFor="select-image" className="select-image-btn">
              <i className="fal fa-image"></i>
            </label>
            <input
              type="file"
              id="select-image"
              className="input-select-image"
              onChange={handleFileInputImageChange}
            ></input>
          </aside>
          <div className="col-8 col-md-12">
            <h2 className="editor-title">Boogle Editor</h2>
            <form
              className="form-handle-post"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="donut"></div>
              <input
                type="text"
                placeholder="Title"
                className="input-post-title"
                {...register('title')}
              />
              {errors.title ? (
                <p className="error">{errors.title.message}</p>
              ) : (
                ''
              )}
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
              <button className="btn btn-primary">Next</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default HandlePost;
