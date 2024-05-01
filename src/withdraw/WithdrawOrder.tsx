import React, {useEffect, useState} from 'react';
import {Button, Dialog, Form, Input, NavBar} from "antd-mobile";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {COIN_B, COIN_B_STR, COIN_CNY, coin_precision, rate_precision} from "../coin";
import {is_null} from "../comm";
import {getStatus, WithdrawOrderVO} from "../vo/WithdrawOrderVO";

function WithdrawOrder() {
    const [form] = Form.useForm()

    const navigate = useNavigate();
    const location = useLocation();

    const [id, setId] = useState(0);
    const [order, setOrder] = useState({} as WithdrawOrderVO);

    useEffect(() => {
        let id:number=location.state.id
        setId(id)

        getOrder(id)
    }, []);

    function getOrder(id:number) {
        let data={
            id:id
        };

        axios.post('/api/order/withdraw/get',data )
            .then(function (response) {
                console.log(response);
                let data=response.data
                if(data.status!=0){
                    Dialog.alert({
                        content: <pre>{data.msg}</pre>,
                    })
                    return ;
                }

                setOrder(data.data as WithdrawOrderVO)

            })
            .catch(function (error) {
                Dialog.alert({
                    content: <pre>{error.toString()}</pre>,
                })
            });
    }

    function onBack() {
        if (location.state.fromWithdraw) {
            navigate("/")
        }else{
            navigate(-1)
        }
    }

    return (
    <div>
        <NavBar back='返回' onBack={onBack}>
            提款订单
        </NavBar>
        <Form form={form} layout='horizontal' mode={"card"}>
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
            <Form.Item name='real_name' label='收款 姓名：'>
                <div>{order.real_name}</div>
            </Form.Item>
            <Form.Item name='card_no' label='收款 卡号：'>
                <div>{order.card_no}</div>
            </Form.Item>
            <Form.Item name='depositary_bank' label='收款 开户行：'>
                <div>{order.depositary_bank}</div>
            </Form.Item>
            <Form.Item name='sub_branch' label='收款 支行：'>
                <div>{order.sub_branch}</div>
            </Form.Item>
            <Form.Item name='audit_time' label='审核时间：'>
                <div>{order.audit_time}</div>
            </Form.Item>
            <Form.Item name='putting_time' label='付款时间：'>
                <div>{order.pay_time}</div>
            </Form.Item>
            <Form.Item name='bank_sn' label='银行流水号：'>
                <div>{order.bank_sn}</div>
            </Form.Item>

        </Form>
    </div>
  );
}

export default WithdrawOrder;
