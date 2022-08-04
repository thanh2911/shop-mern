import React , {useState, useContext}  from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {MdOutlineEmail} from 'react-icons/md';
import {RiLockPasswordLine} from 'react-icons/ri';
import {AiOutlineUser} from 'react-icons/ai';

import Button from '../../components/button/Button';

import './auth.scss'

const Register = () => {

  const [user , setUser] = useState({
    name: '' ,email : '' , password: ''
  })

  const [rePassword,setRePassword] = useState('');

  const onChangeInput = e => {
    const {name, value} = e.target;
    setUser({...user, [name]:value});
  }

  const loginSubmit = async e => {
    e.preventDefault();

    try {
      if(user.password !== rePassword) {
        console.log('mk chua dung');
      }
      else {
        await axios.post('/users/register', {...user});
        localStorage.setItem('firstLogin' , true);
  
        window.location.href = "/";
      }

    } catch (error) {
      console.log(error.response.data.msg);
    }
  }


  return (
    <div className="register auth">
        <form action="" onSubmit={loginSubmit}>
            <h1>Register</h1>

            <div className="form-item">
              <div className="form-name">
                <div className="span">Name</div>
              </div>
              <div className="form-input">
                <div className="form-icon">
                    <AiOutlineUser />
                </div>
                <input type="text" name="name" required
                 placeholder="Type your name" value={user.name} onChange={onChangeInput} />
              </div>
            </div>
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
            <div className="form-item">
              <div className="form-name">
                <div className="span">Repeat Password</div>
              </div>
              <div className="form-input">
                <div className="form-icon">
                    <RiLockPasswordLine />
                </div>
                <input type="password" name="re-password" required
                placeholder='Type your repeat password' value={rePassword} onChange={(e) => setRePassword(e.target.value)}
                />
              </div>
            </div>

          
         


            <div className="submit">
            <Button 
                type="submit"
                size={'sm'}
              >Register</Button>
              <span>Do have an account ? <Link to="/login"><u>Login</u></Link></span>
            </div>
        </form>
    </div>
  )
}

export default Register