import React, { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner';
import '../assets/Register.css'
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // Form Submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post('/users/register', values);
      message.success('Register Successfull')
      setLoading(false);
      navigate('/login')
    } catch (error) {
      setLoading(false);
      message.error("Something went to worng")
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
      <section className="vh-100 bg-image register_section">

        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card card_radius">
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                    <Form layout="vertical" onFinish={submitHandler}>

                      <Form.Item label='Name' name='name'>
                        <Input />
                      </Form.Item>
                      <Form.Item label='Email' name='email'>
                        <Input />
                      </Form.Item>
                      <Form.Item label='Passowrd' name='password'>
                        <Input type='password' />
                      </Form.Item>
                      <div className='d-flex justify-content-center'>
                        <button className='btn btn-success btn-block btn-lg gradient-custom-4 text-body register_button'>Register</button>

                      </div>
                      <p class="text-center text-muted mt-5 mb-0">
                        <Link to='/login'>Already Register ? Click here to Login </Link>
                      </p>
                      {loading && <Spinner />}
                    </Form>
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

export default Register