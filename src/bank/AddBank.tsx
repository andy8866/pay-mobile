import React from 'react';
import {Button, Dialog, Form, Input, NavBar, Space} from "antd-mobile";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AddBank() {
    const [form] = Form.useForm()

    const navigate = useNavigate();

    function onSubmit() {
        let real_name = form.getFieldValue("real_name")
        let card_no = form.getFieldValue("card_no")
        let depositary_bank = form.getFieldValue("depositary_bank")
        let sub_branch = form.getFieldValue("sub_branch")

        let data={
            token:localStorage.getItem("token"),
            tenant_id: 0,
            user_id: 0,
            real_name,
            card_no,
            depositary_bank,
            sub_branch
        };

        axios.post('/api/bank/add',data )
            .then(function (response) {
                console.log(response);
                let data=response.data
                if(data.status!=0){
                    Dialog.alert({
                        content: <pre>{data.msg}</pre>,
                    })
                    return ;
                }

                onBack();

            })
            .catch(function (error) {
                Dialog.alert({
                    content: <pre>{error.toString()}</pre>,
                })
            });
    }

    function onBack() {
        navigate(-1)
    }

    return (
    <div>
        <NavBar back='返回' onBack={onBack}>
            添加银行
        </NavBar>
        <Form form={form} layout='horizontal' mode={"card"}
              footer={
                  <Button block type='submit' color='primary' size='large' onClick={onSubmit}>提交</Button>
              }>
            <Form.Item name='real_name' label='姓名：' initialValue={"金乾康"}>
                <Input />
            </Form.Item>
            <Form.Item name='card_no' label='卡号：' initialValue={"622202200435204832"}>
                <Input/>
            </Form.Item>
            <Form.Item name='depositary_bank' label='开户行：' initialValue={"中国工商银行"}>
                <Input/>
            </Form.Item>
            <Form.Item name='sub_branch' label='支行：' initialValue={""}>
                <Input/>
            </Form.Item>
        </Form>
    </div>
  );
}

export default AddBank;
