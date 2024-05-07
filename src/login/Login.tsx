import React, {useState} from 'react';

import {Button, Dialog, Form, Input} from "antd-mobile";
import axios from "axios";


function Login() {
    const [form] = Form.useForm()

    function onSubmit() {
        let phone = form.getFieldValue("phone")
        let password = form.getFieldValue("password")

        let data={
            tenant_id: 1,
            phone,
            password
        };

        axios.post('/api/user/login',data )
            .then(function (response) {
                console.log(response);
                let data=response.data
                if(data.status!=0){
                    Dialog.alert({
                        content: <pre>{data.msg}</pre>,
                    })
                    return ;
                }

                let token=data.data;
                localStorage.setItem("userToken",token);
                window.location.href="/";

            })
            .catch(function (error) {
                Dialog.alert({
                    content: <pre>{error.toString()}</pre>,
                })
            });
    }

    function onRegister() {
        window.location.href="/reg";
    }

    return (
    <div>
        <Form form={form} layout='horizontal' mode={"card"}
            footer={
                <Button block type='submit' color='primary' size='large' onClick={onSubmit}>
                    登录
                </Button>
            }
        >
            <Form.Header>登录</Form.Header>

            <Form.Item name='phone' label='电话：' initialValue={"181949558935"}>
                <Input />
            </Form.Item>
            <Form.Item name='password' label='密码：' initialValue={"123456"}>
                <Input type='password'/>
            </Form.Item>
            <Form.Item childElementPosition={"right"}>
                <Button color='primary' fill='none' onClick={onRegister}>
                    注册
                </Button>
            </Form.Item>
        </Form>
    </div>
  );
}

export default Login;
