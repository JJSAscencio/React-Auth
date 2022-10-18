import { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const history = useHistory()
  const newPasswordInputRef = useRef()
  const authCtx = useContext(AuthContext)

  const submitHandler = (event) => {
    event.preventDefault()

    const enteredNewPassword = newPasswordInputRef.current.value

    //add validation

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDK5JmwdtvOJmJC3q3EwPT6w6LIlQjvjeE', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json',

      }
    }).then(res => {
      //asumption: Always succeds
      history.replace('/')
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
