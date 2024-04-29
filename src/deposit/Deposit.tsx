import React, {useEffect, useState} from 'react';
import {Button, Dialog, Form, Input, NavBar, Space} from "antd-mobile";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Deposit() {
    const [form] = Form.useForm()

    const navigate = useNavigate();

    const [bankId, setBankId] = useState("");

    useEffect(() => {
        console.log("useEffect")
        let bankId=localStorage.getItem("chooseBank");
        console.log("bankId:"+bankId);
        // @ts-ignore
        setBankId(bankId);
    }, []);

    function onSubmit() {
        let coin_type = 1
        let coin_amount = form.getFieldValue("coin_amount")
        let bank_id = localStorage.getItem("chooseBank")

        let data={
            token:localStorage.getItem("token"),
            tenant_id: 0,
            user_id: 0,
            coin_type,
            coin_amount,
            bank_id:Number(bank_id),
            remark:""
        };

        axios.post('/api/order/deposit',data )
            .then(function (response) {
                console.log(response);
                let data=response.data
                if(data.status!=0){
                    Dialog.alert({
                        content: <pre>{data.msg}</pre>,
                    })
                    return ;
                }

                let id=data.data;
                navigate("/depositOrder",{state:{id:id,fromDeposit:true}})

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

    function onChooseBank() {
        navigate("/bank");
    }

    return (
    <div>
        <NavBar back='返回' onBack={onBack}>
            充值
        </NavBar>
        <Form form={form} layout='horizontal' mode={"card"}
              footer={
                  <Button block type='submit' color='primary' size='large' onClick={onSubmit}>提交</Button>
              }>
            <Form.Item name='coin_type' label='币种：' initialValue={"B"}>
                <Input />
            </Form.Item>
            <Form.Item name='coin_amount' label='充值金额：' initialValue={1.1}>
                <Input/>
            </Form.Item>
            <Form.Item name='bank' label='充值银行卡：'>
                ID: {bankId}
                <Button color='primary' fill='outline' onClick={onChooseBank}>选择银行卡</Button>
            </Form.Item>
            <Form.Item name='remark' label='备注：' initialValue={""}>
                <Input/>
            </Form.Item>
        </Form>
    </div>
  );
}

export default Deposit;
