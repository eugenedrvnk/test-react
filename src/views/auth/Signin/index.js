import {RTextField} from '../../../components/RTextField';
import {Button, Paper, Typography} from '@material-ui/core';

import {useHistory} from "react-router-dom";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup'

import '../_shared/index.scss'
import {useAuth} from '../../../contexts/AuthContext';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6)
});

const Signin = () => {
  const history = useHistory()
  const {signin} = useAuth()

  const {control, handleSubmit} = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    shouldFocusError: false,
  })

  const onSubmit = ({email, password}) => {
    signin({email, password})
      .then(() => history.push('/'))
      .catch(err => alert(err?.message))
  }

  return (
    <Paper
      className="auth-form"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        variant="h3"
        gutterBottom
      >
        Sign in
      </Typography>
      <RTextField
        className="auth-form__textfield"
        label="Email"
        name="email"
        control={control}
      />
      <RTextField
        className="auth-form__textfield"
        label="Password"
        name="password"
        control={control}
        type="password"
      />
      <Button
        variant="contained"
        type="submit"
      >
        Sign in
      </Button>
      <hr/>
      <Button
        size="small"
        variant="contained"
        onClick={() => history.push('/signup')}
      >
        Change to signup
      </Button>
    </Paper>
  )
}

export {
  Signin
}
