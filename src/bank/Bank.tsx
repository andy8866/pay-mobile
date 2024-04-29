import React, {useEffect, useState} from 'react';
import {Button, Dialog, Grid, List, NavBar} from "antd-mobile";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Bank(props:any) {
    const navigate = useNavigate();
    let location = useLocation();

    const [bank_list, set_bank_list] = useState([]);

    useEffect(() => {
        console.log("useEffect")

        get_bank_list();
    }, []);

    function get_bank_list() {
        let data = {
            tenant_id: 1,
            token: localStorage.getItem("token"),
        };

        axios.post('/api/bank/get_list_by_user', data)
            .then(function (response) {
                console.log(response);
                let data = response.data
                if (data.status != 0) {
                    Dialog.alert({
                        content: <pre>{data.msg}</pre>,
                    })
                    return;
                }

                let list = data.data;
                set_bank_list(list);

            })
            .catch(function (error) {
                Dialog.alert({
                    content: <pre>{error.toString()}</pre>,
                })
            });
    }

    function onBack() {
        navigate(-1);
    }

    function onAddBank() {
        navigate("/addBank");
    }

    function onChoose(id:any) {
        localStorage.setItem("chooseBank",id);
        navigate(-1);
    }



    function get_bank_list_ui() {
        let list = [];

        for (let i = 0; i < bank_list.length; i++) {
            let bank = bank_list[i];
            let id = bank['id'];
            let real_name = bank['real_name'];
            let card_no = bank['card_no'];
            let depositary_bank = bank['depositary_bank'];
            let sub_branch = bank['sub_branch'];

            list.push(
                <List.Item key={id} onClick={()=>onChoose(id)}>
                    <div>ID:{id}</div>
                    <div>姓名:{real_name}</div>
                    <div>卡号:{card_no}</div>
                    <div>开户行:{depositary_bank}</div>
                    <div>支行:{sub_branch}</div>
                </List.Item>
            );

        }

        return <List header='银行卡列表'>{list}</List>;
    }

    return (
        <div>
            <div className="App">
                <NavBar back='返回' onBack={onBack}>
                    银行
                </NavBar>
                <Grid columns={3} gap={4}>
                    <Grid.Item>
                        <Button color='primary' fill='outline' onClick={onAddBank}>添加银行卡</Button>
                    </Grid.Item>
                </Grid>
                {get_bank_list_ui()}
            </div>
        </div>
    );
}

export default Bank;
