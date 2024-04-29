import React, {useEffect, useState} from 'react';
import {Button, Dialog, Form, Input, NavBar} from "antd-mobile";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {COIN_B, COIN_B_STR, COIN_CNY, coin_precision, rate_precision} from "../coin";
import {is_null} from "../comm";
import {DepositOrderVO, getStatus} from "../vo/DepositOrderVO";

function DepositOrder() {
    const [form] = Form.useForm()

    const navigate = useNavigate();
    const location = useLocation();

    const [id, setId] = useState(0);
    const [order, setOrder] = useState({} as DepositOrderVO);

    useEffect(() => {
        let id:number=location.state.id
        setId(id)

        getOrder(id)
    }, []);

    function getOrder(id:number) {
        let data={
            id:id
        };

        axios.post('/api/order/deposit/get',data )
            .then(function (response) {
                console.log(response);
                let data=response.data
                if(data.status!=0){
                    Dialog.alert({
                        content: <pre>{data.msg}</pre>,
                    })
                    return ;
                }

                setOrder(data.data as DepositOrderVO)

            })
            .catch(function (error) {
                Dialog.alert({
                    content: <pre>{error.toString()}</pre>,
                })
            });
    }

    function onSubmit() {
        let bank_sn = form.getFieldValue("bank_sn")
        console.log("bank_sn:"+bank_sn)

        let data={
            token:localStorage.getItem("token"),
            tenant_id: 0,
            user_id: 0,
            order_id:id,
            remark:"",
            bank_sn
        };

        axios.post('/api/order/deposit/user_already_pay',data )
            .then(function (response) {
                console.log(response);
                let data=response.data
                if(data.status!=0){
                    Dialog.alert({
                        content: <pre>{data.msg}</pre>,
                    })
                    return ;
                }

               getOrder(id)
                

            })
            .catch(function (error) {
                Dialog.alert({
                    content: <pre>{error.toString()}</pre>,
                })
            });
    }

    function onBack() {
        if (location.state.fromDeposit) {
            navigate("/")
        }else{
            navigate(-1)
        }
    }

    function bankSnUi(){
        if(is_null(order.bank_sn)){
            return <Input id="bank_sn" placeholder='请输入内容'/>
        }else{
            return <div>{order.bank_sn}</div>
        }
    }

    return (
    <div>
        <NavBar back='返回' onBack={onBack}>
            充值订单
        </NavBar>
        <Form form={form} layout='horizontal' mode={"card"}
              footer={
                  order.status==0 &&
                  <Button block type='submit' color='primary' size='large' onClick={onSubmit}>已充值，提交</Button>
              }>
            <Form.Item name='id' label='ID：' >
                <div>{order.id}</div>
            </Form.Item>
            <Form.Item name='create_at' label='创建时间：'>
                <div>{order.create_at}</div>
            </Form.Item>
            <Form.Item name='order_no' label='订单号：'>
                <div>{order.order_no}</div>
            </Form.Item>
        <Form.Item name='status' label='状态：'>
            <div>{getStatus(order.status)}</div>
            </Form.Item>
            <Form.Item name='coin_type' label='币种：'>
                <div>{COIN_B_STR}</div>
            </Form.Item>
            <Form.Item name='coin_amount' label='充值币种数量：'>
                <div>{coin_precision(COIN_B,Number(order.coin_amount))}</div>
            </Form.Item>
            <Form.Item name='legal_amount' label='法币数量：'>
                <div>{coin_precision(COIN_CNY,Number(order.legal_amount))}</div>
            </Form.Item>
            <Form.Item name='coin_to_legal_rate' label='币种对法币汇率：'>
                <div>{rate_precision(Number(order.coin_to_legal_rate))}</div>
            </Form.Item>
            <Form.Item name='real_name' label='充值 姓名：'>
                <div>{order.real_name}</div>
            </Form.Item>
            <Form.Item name='card_no' label='充值 卡号：'>
                <div>{order.card_no}</div>
            </Form.Item>
            <Form.Item name='depositary_bank' label='充值 开户行：'>
                <div>{order.depositary_bank}</div>
            </Form.Item>
            <Form.Item name='sub_branch' label='充值 支行：'>
                <div>{order.sub_branch}</div>
            </Form.Item>
            <Form.Item name='user_pay_time' label='充值时间：'>
                <div>{order.user_pay_time}</div>
            </Form.Item>
            <Form.Item name='audit_time' label='审核时间：'>
                <div>{order.audit_time}</div>
            </Form.Item>
            <Form.Item name='putting_time' label='已放币时间：'>
                <div>{order.putting_time}</div>
            </Form.Item>
            <Form.Item name='bank_sn' label='银行流水号：'>
                {bankSnUi()}
            </Form.Item>

        </Form>
    </div>
  );
}

export default DepositOrder;
