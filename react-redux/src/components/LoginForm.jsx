import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import userService from '../services/user'
import { loginUser } from '../reducers/user'
import { useField } from '../hooks'


import { set } from '../reducers/notification'

import { Button, Input } from './Styled'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()

  const notify = (message, type = 'info') => {
    dispatch(set({ message, type }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    loginService
      .login({
        username: username.fields.value,
        password: password.fields.value,
      })
      .then((user) => {
        userService.setUser(user)

        dispatch(loginUser(user))
        notify(`${user.name} logged in!`)
      })
      .catch(() => {
        notify('wrong username/password', 'alert')
      })
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form id='login' onSubmit={handleSubmit} autoComplete='on' name='login'>
        <div>
          username
          <Input id="username" type="text" {...username.fields} />
        </div>
        <div>
          password
          <Input id="password" type="password" {...password.fields} />
        </div>
        <Button id="login-button" type="submit">
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm