import React, { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner';
import "../assets/Login.css";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // Login form Submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/users/login', values)

      //console.log("login log :",data);
      message.success("Login Successfully");
      setLoading(false);
      localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }))
      navigate('/')
    } catch (error) {
      setLoading(false);
      message.error("Invalid Login Credentials");
    }
  }
  // Prevent Display
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/')
    }
  }, [navigate])
  return (
    <>
      {loading && <Spinner />}
      <section className="h-100 gradient-form section_data">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className='text-center'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          className='logo' alt="logo" />
                        <h4 class="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                      </div>
                      <Form layout="vertical" onFinish={submitHandler}>
                        <h6 className='text-center'>Please Login to Your Account</h6>
                        <Form.Item label='Email' name='email'>
                          <Input />
                        </Form.Item>
                        <Form.Item label='Passowrd' name='password'>
                          <Input type='password' />
                        </Form.Item>
                        <div className='text-center pt-1 mb-2 pb-1'>
                          <button className='btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 login_btn'>Login</button>
                        </div>
                        <div className='text-center pt-1 mb-5 pb-1'>
                          <Link to='/register' className='text-muted'>Not Register ? Login Here</Link>
                        </div>
                      </Form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login