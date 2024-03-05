import React, {useState, useEffect} from 'react'
import {Modal,Form, Input, Select, message, Table} from 'antd'
import Layouts from '../components/Layout/layouts'
import Spinner from '../components/Spinner';
import axios from 'axios';
const HomePage = () => {

  const [showModal,setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransections, setAllTransections] = useState([]);

  const columns =[
    {
      title:'Date',
      dataIndex:'date'
    },
    {
      title:'Anount',
      dataIndex:'amount'
    },
    {
      title:'Type',
      dataIndex:'type'
    },
    {
      title:'Category',
      dataIndex:'category'
    },
    {
      title:'Refrence',
      dataIndex:'refrence'
    },
    {
      title:'Actions',
    },
  ]


  const getAllTansections = async()=>{
    try {
      const user = JSON.parse(localStorage.getItem('user')); 
      setLoading(true);
      const user_data = await axios.post("/transections/get-transections",{user_id:user._id})
      setLoading(false);
      setAllTransections(user_data.data);
      console.log(user_data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error('Failed Issue with Transection Data');
    }
  }

  // useEffect Hook
  useEffect(()=>{
    getAllTansections();
  },[])


  const handleSubmit = async(values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      await axios.post('/transections/add-transection',{...values,user_id:user._id});
      setLoading(false);
      message.success("Transection Added Successfully");
      setShowModal(false);
    } catch (error) {
      message.error("Failed to add Transections");
      setLoading(false);
      setShowModal(false);
    }
  }

  return (
    <Layouts>
      {loading && <Spinner/>}
        <div className='filters'>
            <div>Range Filter</div>
            <div>
              <button className='btn btn-primary add_transaction' onClick={()=> setShowModal(true)}>Add New</button>
            </div>
        </div>
        <div className='content'>
           <Table columns={columns} dataSource={allTransections}/>
        </div>

        <Modal title="Add Transection" open={showModal} onCancel={()=>setShowModal(false)} footer={false}>
            <Form layout='vertical' onFinish={handleSubmit}>
              <Form.Item label="Amount" name="amount">
                <Input  type='text' />
              </Form.Item>
              <Form.Item label="Type" name="type">
                  <Select>
                    <Select.Option value="income">Income</Select.Option>
                    <Select.Option value="expense">Expense</Select.Option>
                  </Select>
              </Form.Item>
              <Form.Item label="Category" name="category">
                  <Select>
                    <Select.Option value="salary">Salary</Select.Option>
                    <Select.Option value="tip">Tip</Select.Option>
                    <Select.Option value="onlinework">Online Work</Select.Option>
                    <Select.Option value="project">Project</Select.Option>
                    <Select.Option value="entertainment">Entertainment</Select.Option>
                    <Select.Option value="travel">Traveling</Select.Option>
                    <Select.Option value="food">Food</Select.Option>
                    <Select.Option value="bills">Bills</Select.Option>
                    <Select.Option value="rent">Rent</Select.Option>
                    <Select.Option value="fees">Fees</Select.Option>
                    <Select.Option value="tax">TAX</Select.Option>
                  </Select>
              </Form.Item>
              <Form.Item label="Date" name="date">
                <Input  type='date' />
              </Form.Item>
              <Form.Item label="Refrence" name="refrence">
                <Input  type='text' />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input  type='text' />
              </Form.Item>
              <div className='d-flex justify-content-end'>
                <button type="submit" className='btn btn-primary add_transaction'>Save</button>
              </div>
            </Form>
        </Modal>
    </Layouts>
  )
}

export default HomePage