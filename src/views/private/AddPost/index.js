import {useState, useRef} from 'react'
import {Button, Paper, Typography} from '@material-ui/core';
import {RTextField} from '../../../components/RTextField';

import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom'
import {yupResolver} from '@hookform/resolvers/yup';
import firebase from 'firebase';
import * as yup from 'yup'
import {v4 as uuidv4} from 'uuid';
import {api} from '../../../api';

import './index.scss'

const schema = yup.object().shape({
  title: yup.string().required(),
  desc: yup.string().required(),
  image: yup.mixed().required()
});

const defaultValues = {
  title: '',
  desc: ''
}

const AddPost = () => {
  const history = useHistory()

  const [imageIsLoading, setImageIsLoading] = useState(false)

  const storageRef = firebase.storage().ref()
  const fileInputRef = useRef()

  const {control, handleSubmit, setValue, watch, formState: {errors}} = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    shouldFocusError: false,
    defaultValues
  })

  const image = watch('image')

  const handleFileUpload = () => {
    setImageIsLoading(true)

    const file = fileInputRef.current.files[0]
    const fileRef = storageRef.child(`images/${uuidv4()}${file.name}`)
    fileRef.put(file).then((snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        setValue('image', url, {shouldValidate: true})
      })

      setImageIsLoading(false)
    }))
  }

  const onSubmit = ({title, desc, image}) => {
    api.posts.create({title, desc, image})
      .then(() => {
        alert('post created')
        history.push('/posts')
      })
      .catch(() => alert('error'))
  }

  return (
    <Paper
      className="add-post"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RTextField
        className="add-post__row"
        name="title"
        label="title"
        control={control}
      />
      <RTextField
        className="add-post__row"
        name="desc"
        label="desc"
        control={control}
      />
      {
        imageIsLoading && <h2>Image is uploading...</h2>
      }
      <Button
        className="add-post__row"
        variant="contained"
        component="label"
      >
        Upload File
        <input
          ref={fileInputRef}
          onChange={handleFileUpload}
          type="file"
          hidden
        />
      </Button>
      {image && (
        <img
          className="add-post__row"
          src={image} alt=""
        />
      )}
      {errors.image && <Typography gutterBottom>Image is required</Typography>}
      <Button
        type="submit"
        variant="contained"
      >
        Create post
      </Button>
    </Paper>
  )
}

export {
  AddPost
}
