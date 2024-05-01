export type WithdrawOrderVO = {
    id?: number;
    create_at?: string;
    order_no?: string;
    status?: number;
    coin_type?: number;
    coin_amount?: string;
    legal_amount?: string;
    coin_to_legal_rate?: string;
    real_name?: string;
    card_no?: string;
    depositary_bank?: string;
    sub_branch?: string;
    audit_time?: string;
    pay_time?: string;
    bank_sn?: string;
};

export function getStatus(status: number | undefined) {
    if(status==0){
        return "发起订单，等待审核";
    }

    if(status==1){
        return "审核通过，等待付款";
    }

    if(status==2){
        return "审核未通过";
    }

    if(status==3){
        return "已付款";
    }

    if(status==4){
        return "已收到付款 已扣除冻结金额";
    }

    return "";
}