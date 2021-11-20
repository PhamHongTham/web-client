import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import HandleTag from './HandleTag';
import HandleStatus from './HandleStatus';
import HandleImage from './HandleImage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/stores/app-reducer';
import {
  createNewPostRequest,
  getUrlImageRequest,
  updatePostRequest,
} from 'app/stores/post/actions';
import axios from 'axios';
import { useHistory } from 'react-router';
import { LoadingContext } from 'app/shared/components/loading/LoadingProvider';
import { NotificationContext } from 'app/shared/components/notifications/NotificationProvider'

interface PopupPublish {
  post: any;
  showPopupPublish: boolean;
  setShowPopupPublish: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupPublish = ({
  post,
  showPopupPublish,
  setShowPopupPublish,
}: PopupPublish) => {
  console.log(post)
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({});
  const { infoPost }: any = useSelector((state: RootState) => state.post);

  const { handleShowLoading } = useContext(LoadingContext)
  const { handleAddNotification } = useContext(NotificationContext)

  const onSubmit = async (data: any) => {
    handleShowLoading(true)
    const postData = {
      ...infoPost,
      ...data,
    };
    // CHECK UPDATE OR CREATE
    if (post) {
      // CHECK IMAGE COVER CHANGE
      if (typeof postData.cover === 'string') {
        await dispatch(updatePostRequest(postData, String(post.id)));
      } else {
        await dispatch(getUrlImageRequest(postData.cover)).then((res: any) => {
          let { signedRequest, url }: any = res;
          let postData = {
            ...infoPost,
            ...data,
            cover: url,
          };
          dispatch(updatePostRequest(postData, String(post.id)));
          axios.put(signedRequest, data?.cover);
        });
      }
      handleAddNotification({ type: 'SUCCESS', message: 'Updated new post' })
    } else {
      await dispatch(getUrlImageRequest(postData.cover)).then((res: any) => {
        let { signedRequest, url }: any = res;
        let postData = {
          ...infoPost,
          ...data,
          cover: url,
        };
        console.log(postData);
        dispatch(createNewPostRequest(postData)).then((res: any) =>
          console.log(res)
        );
        axios.put(signedRequest, data?.cover);
      });
      handleAddNotification({ type: 'SUCCESS', message: 'Created new post' })
    }
    handleShowLoading(false)
  };

  return (
    <div className="publish-post">
      <div className="container">
        <button
          className="close-publish"
          onClick={() => setShowPopupPublish(false)}
        >
          <i className="fal fa-times"></i>
        </button>
        <form className="publish-content" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6 col-md-12">
              <h3 className="cover-image-title">Cover image</h3>
              <Controller
                control={control}
                name="cover"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <HandleImage
                    value={post ? post.cover : value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <div className="col-6 col-md-12">
              <h3 className="publish-description">
                Publishing to: <span className="publish-author">Hieu Cao</span>
              </h3>
              <Controller
                control={control}
                name="status"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <HandleStatus
                    value={post ? post.status : value}
                    onChange={onChange}
                  />
                )}
              />
              <p className="select-tags-description">
                Note: You can only add 5 tags
              </p>
              <Controller
                control={control}
                name="tags"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <HandleTag
                    value={post ? post.tags : []}
                    onChange={onChange}
                  />
                )}
              />
              <button className="btn btn-primary">Publish Now</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupPublish;
