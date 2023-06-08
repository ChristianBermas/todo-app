import { useState } from 'react';
import styles from './Login.module.css';
import { Users } from '../../services/fakeUser';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getUsername = (usernameValue: string) => {
    return Users.find(
      (x) => x.username.toLowerCase() === usernameValue.toLowerCase()
    );
  };

  const onSubmit = () => {
    if (!username || !password)
      return alert('Please input Username or Password!');
    if (!getUsername(username)) return alert('User not found!');

    const users = getUsername(username);
    if (users?.username != username || users?.password != password)
      return alert('Username or Password Incorrect!');
    if (users?.username === username && users?.password === password)
      return alert('Login successful');
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <input
        id='username'
        className={styles.input}
        type='text'
        placeholder='Username'
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <input
        id='password'
        className={styles.input}
        type='text'
        placeholder='Password'
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button className={styles.btn} onClick={onSubmit}>
        Login
      </button>
    </div>
  );
}

export default Login;
