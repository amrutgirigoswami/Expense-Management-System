import React, { useState, useEffect } from 'react'
import moment from 'moment';
import axios from 'axios';
import { Modal, Form, Input, Select, message, Table, DatePicker } from 'antd'
import { UnorderedListOutlined, AreaChartOutlined } from '@ant-design/icons'
import Layouts from '../components/Layout/layouts'
import Spinner from '../components/Spinner';
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;
const HomePage = () => {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransections, setAllTransections] = useState([]);
  const [frequency, setFrequiency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Anount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Refrence',
      dataIndex: 'refrence'
    },
    {
      title: 'Actions',
    },
  ]




  // useEffect Hook
  useEffect(() => {
    const getAllTansections = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));

        setLoading(true);
        const res = await axios.post("/transections/get-transections", {
          user_id: user._id,
          frequency,
          selectedDate,
          type
        })
        setLoading(false);
        setAllTransections(res.data);
        console.log(res.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
        message.error('Failed Issue with Transection Data');
      }
    }
    getAllTansections();
  }, [frequency, selectedDate, type])


  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      await axios.post('/transections/add-transections', { ...values, user_id: user._id });
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
      {loading && <Spinner />}
      <div className='filters'>
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequiency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>
        <div className='switch-icon'>
          <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
          <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />
        </div>
        <div>
          <button className='btn btn-primary add_transaction' onClick={() => setShowModal(true)}>Add New</button>
        </div>
      </div>
      <div className='content'>
        {viewData === 'table' ? <Table columns={columns} dataSource={allTransections} /> : <Analytics allTransections={allTransections} />}

      </div>

      <Modal title="Add Transection" open={showModal} onCancel={() => setShowModal(false)} footer={false}>
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type='text' />
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
            <Input type='date' />
          </Form.Item>
          <Form.Item label="Refrence" name="refrence">
            <Input type='text' />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type='text' />
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