import React from 'react';
import { Button, Modal, Form, Input, DatePicker, Select  } from 'antd';

function AddIncome({
    isIncomeModalVisible,
    handleIncomeCancel,
    onFinish,
})  {
    const [form] = Form.useForm();
    return (
        <Modal 
                style={{ fontWeight:600 }}
                title="Add Income"
                open={isIncomeModalVisible}
                onCancel={handleIncomeCancel}
                footer={null}
         >
            <Form
                form={form}
                layout='vertical'
                onFinish={(values) =>{
                    onFinish(values, "Income");
                    form.resetFields();
                }}
             >
                <Form.Item
                    style={{fontWeight:600}}
                    label="Name"
                    name="name"
                    rules={[
                      {  required: true,
                        message: "Please input name of the transaction!",
                      },
                    ]}

                >
                    < Input type='text' className='custom-input'/>
                </Form.Item>
                <Form.Item
                    style={{fontWeight:600}}
                    label="Amount"
                    name="amount"
                    rules={[
                        {required:true, message:"Please input the Income amount!"},
                    ]}
                >
                    <Input type='number' className='custom-input' />
                </Form.Item>
                <Form.Item
                    style={{fontWeight:600}}
                    label="Date"
                    name="date"
                    rules={[
                        {required:true, message:"Please select the transaction date of Income!"},
                    ]}
                >
                    <DatePicker className='custom-input' format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item
                    style={{fontWeight:600}}
                    label="Tag"
                    name="tag"
                    rules={[
                        {required:true, message:"please select a tag!"},
                    ]}
                 >
                <Select className='select-input-2'>
                    <Select.Option value="job">Job</Select.Option>
                    <Select.Option value="freelancing">Freelancing</Select.Option>
                    <Select.Option value="investment">Investment</Select.Option>
                    {/*add more tags here */}
                </Select>
                 </Form.Item>
                 <Form.Item>
                    <Button className='btn btn-blue' type='primary' htmlType='submit'>Add Income</Button>
                 </Form.Item>
            </Form>   

         </Modal>       
    )

}

export default AddIncome;
