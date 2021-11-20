import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import HandleTag from './HandleTag';
import HandleStatus from './HandleStatus';
import HandleImage from './HandleImage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/stores/app-reducer';
import { createNewPostRequest, getUrlImageRequest } from 'app/stores/article/actions';

interface PopupPublish {
  showPopupPublish: boolean;
  setShowPopupPublish: React.Dispatch<React.SetStateAction<boolean>>
}

const PopupPublish = ({ showPopupPublish, setShowPopupPublish }: PopupPublish) => {
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm({});
  const [urlImage, setUrlImage] = useState<any>('')
  console.log(urlImage)
  const { infoPost } = useSelector((state: RootState) => state.article)

  const onSubmit = (data: any) => {
    const postData = {
      ...infoPost,
      ...data
    }
    console.log(postData)
    dispatch(getUrlImageRequest(postData.cover)).then((res: any) => setUrlImage(res))
    // let { signedRequest, url }: any = await getUrlImage(postData.cover);
    // dispatch(createNewPostRequest(postData));
  }

  return (
    <div className="publish-post">
      <div className="container">
        <button className="close-publish"><i className="fal fa-times"></i></button>
        <form className="publish-content" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-6">
            <h3 className="cover-image-title">Cover image</h3>
            <Controller
              control={control}
              name="cover"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <HandleImage value={value ? value : ''} onChange={onChange} />
              )}
            />
          </div>
          <div className="col-6">
            <h3 className="publish-description">Publishing to: <span className="publish-author">Hieu Cao</span></h3>
            <Controller
              control={control}
              name="status"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <HandleStatus value={value ? value : ''} onChange={onChange} />
              )}
            />
            <p className="select-tags-description">Note: You can only add 5 tags</p>
            <Controller
              control={control}
              name="tags"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <HandleTag value={value ? value : []} onChange={onChange} />
              )}
            />
            <button className="btn btn-primary">Publish Now</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PopupPublish
