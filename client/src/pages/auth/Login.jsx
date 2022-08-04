import React , {useState, useContext}  from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {MdOutlineEmail} from 'react-icons/md';
import {RiLockPasswordLine} from 'react-icons/ri';
import Button from '../../components/button/Button';

import './auth.scss';

const Login = () => {

  const [user , setUser] = useState({
    email : '' , password: ''
  })

  const onChangeInput = e => {
    const {name, value} = e.target;
    setUser({...user, [name]:value});
  }

  const loginSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post('/users/login', {...user});
      localStorage.setItem('firstLogin' , true);

      window.location.href = "/";
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  return (
    <div className="login auth">
        <form action="" onSubmit={loginSubmit}>
            <h1>Login</h1>

            <div className="form-item">
              <div className="form-name">
                <div className="span">Email</div>
              </div>
              <div className="form-input">
                <div className="form-icon">
                    <MdOutlineEmail />
                </div>
                <input type="email" name="email" required
                placeholder='Type your email' value={user.email} onChange={onChangeInput}
                />
              </div>
            </div>

            <div className="form-item">
              <div className="form-name">
                <div className="span">Password</div>
              </div>
              <div className="form-input">
                <div className="form-icon">
                    <RiLockPasswordLine />
                </div>
                <input type="password" name="password" required
                placeholder='Type your password' value={user.password} onChange={onChangeInput}
                />  
              </div>
            </div>

            <div className="submit">
              <Button 
                type="submit"
                size={'sm'}
                >Login</Button>
              <span>Don't have an account ? <Link to="/register"><u>Register</u></Link></span>
            </div>
        </form>
    </div>
  )
}

export default Login