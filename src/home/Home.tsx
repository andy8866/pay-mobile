import React, {useEffect, useState} from 'react';
import {Button, Card, Dialog, Grid, List} from "antd-mobile";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home(props:any) {
    const navigate = useNavigate();

    const [asset_list, set_asset_list] = useState([]);


    useEffect(() => {
        console.log("useEffect")

        if(localStorage.getItem("token")==null){
            // window.location.href="/login";
            return navigate("/login");
        }

        get_asset_list();
    }, []);


    function get_asset_list(){
        let data={
            tenant_id: 1,
            token:localStorage.getItem("token"),
        };

        axios.post('/api/asset/get_list_by_user',data )
            .then(function (response) {
                console.log(response);
                let data=response.data
                if(data.status!=0){
                    Dialog.alert({
                        content: <pre>{data.msg}</pre>,
                    })
                    return ;
                }

                let list=data.data;
                set_asset_list(list);

            })
            .catch(function (error) {
                Dialog.alert({
                    content: <pre>{error.toString()}</pre>,
                })
            });
    }

    function  get_coin_str(coin_type:number){
        if (coin_type==1){
            return "B";
        }
        return "未知币种";
    }

    function  get_coin_precision(coin_type:number){
        if (coin_type==1){
            return 8;
        }
        return 2;
    }

    function get_asset_list_ui(){
        let list=[];

        for (let i = 0; i < asset_list.length; i++) {
            let asset=asset_list[i];
            let id=asset['id'];
            let coin_type=asset['coin_type'];
            let amount=Number(asset['amount']).toFixed(get_coin_precision(coin_type));
            let freeze=Number(asset['freeze']).toFixed(get_coin_precision(coin_type));


            list.push(
                <List.Item key={id} extra={amount} description={"冻结:"+freeze} clickable>
                    币种:{get_coin_str(asset['coin_type'])}
                </List.Item>
            );

        }

        return <List header='资产列表' >{list}</List>;
    }

    function onGotoBank() {
        navigate("/bank");
    }

    return (<div className="App">
        <Grid columns={4} gap={8}>
            <Grid.Item>
                <Button color='primary' fill='outline' onClick={onGotoBank}>银行卡</Button>
            </Grid.Item>
        </Grid>
            {get_asset_list_ui()}
        </div>
    );
}

export default Home;