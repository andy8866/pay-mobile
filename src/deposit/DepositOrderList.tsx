import React, {useEffect, useState} from 'react';
import {Dialog, Form, List, NavBar} from "antd-mobile";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {DepositOrderVO, getStatus} from "../vo/DepositOrderVO";

function DepositOrderList() {
    const [form] = Form.useForm()

    const navigate = useNavigate();
    const location = useLocation();

    const [list, setList] = useState([] as DepositOrderVO[]);

    useEffect(() => {
        getOrderList()
    }, []);

    function getOrderList() {
        let data = {
            token: localStorage.getItem("userToken"),
            tenant_id:0,
            user_id:0
        };

        axios.post('/api/order/deposit/list', data)
            .then(function (response) {
                console.log(response);
                let data = response.data
                if (data.status != 0) {
                    Dialog.alert({
                        content: <pre>{data.msg}</pre>,
                    })
                    return;
                }

                setList(data.data as DepositOrderVO[])

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

    function onChoose(id: number | undefined) {
        navigate("/depositOrder",{state:{id:id}})
    }

    function get_list_ui() {
        let uiList = [];

        for (let i = 0; i < list.length; i++) {
            let order = list[i];

            uiList.push(
                <List.Item key={order.id} onClick={() => onChoose(order.id)}>
                    <div>ID:{order.id}</div>
                    <div>创建时间:{order.create_at}</div>
                    <div>订单号:{order.order_no}</div>
                    <div>状态:{getStatus(order.status)}</div>
                </List.Item>
            );
        }

        return <List>{uiList}</List>;
    }

    return (
        <div>
            <NavBar back='返回' onBack={onBack}>
                充值订单列表
            </NavBar>
            {get_list_ui()}
        </div>
    );
}

export default DepositOrderList;
