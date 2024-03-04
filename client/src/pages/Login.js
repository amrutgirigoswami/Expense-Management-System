import React, {useState, useEffect} from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner';
const Login = () => {
  const navigate = useNavigate();
  const [loading,setLoading]= useState(false);
    // Login form Submit
    const submitHandler = async(values) => {
       try {
          setLoading(true);
          const {data}=await axios.post('/users/login',values)
          message.success("Login Successfully");
          setLoading(false);
          localStorage.setItem('user',JSON.stringify({...data.user, password:''}))
          navigate('/')
       } catch (error) {
        setLoading(false);
        message.error("Invalid Login Credentials");
       }
    }
  // Prevent Display
  useEffect(()=>{
    if(localStorage.getItem('user'))
    {
       navigate('/')
    } 
  },[navigate])
  return (
    <>
        <div className='register_page'>
        {loading && <Spinner/>}
          <Form layout="vertical" onFinish={submitHandler}>
            <h1>Login</h1>
                <Form.Item label='Email' name='email'>
                    <Input />
                </Form.Item>
                <Form.Item label='Passowrd' name='password'>
                    <Input type='password'/>
                </Form.Item>
                <div className='d-flex justify-content-between'>
                    <Link to='/register'>Not Register ? Login Here</Link>
                    <button className='btn btn-primary login_btn'>Login</button>
                </div>
          </Form>
        </div>
    </>
  )
}

export default Login