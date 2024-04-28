import React from 'react';
import {Button, Dialog, Form, Input, Space} from "antd-mobile";
import axios from "axios";


function Register() {
    const [form] = Form.useForm()
    function onSubmit() {
        let phone = form.getFieldValue("phone")
        let password = form.getFieldValue("password")

        let data={
            tenant_id: 1,
            phone,
            password
        };

        axios.post('/api/user/register',data )
            .then(function (response) {
                console.log(response);
                let data=response.data
                if(data.status!=0){
                    Dialog.alert({
                        content: <pre>{data.msg}</pre>,
                    })
                    return ;
                }

                window.location.href="/login";

            })
            .catch(function (error) {
                Dialog.alert({
                    content: <pre>{error.toString()}</pre>,
                })
            });
    }

    function onBack() {
        window.location.href="/login";
    }

    return (
    <div>
        <Form form={form} layout='horizontal' mode={"card"}
        >
            <Form.Header>注册</Form.Header>

            <Form.Item name='phone' label='电话：' initialValue={"181949558935"}>
                <Input />
            </Form.Item>
            <Form.Item name='password' label='密码：' initialValue={"123456"}>
                <Input type='password'/>
            </Form.Item>
            <Form.Item childElementPosition={"right"}>
                <Space wrap>
                    <Button  size='large' onClick={onBack}>
                        返回
                    </Button>
                    <Button color='primary' size='large' onClick={onSubmit}>
                        提交
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    </div>
  );
}

export default Register;
