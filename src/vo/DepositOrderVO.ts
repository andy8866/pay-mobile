export type DepositOrderVO = {
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
    bank_sn?: string;
    user_pay_time?: string;
    audit_time?: string;
    putting_time?: string;
};

export function getStatus(status: number | undefined) {
    if(status==0){
        return "等待充值";
    }

    if(status==1){
        return "已充值，等待审核";
    }

    if(status==2){
        return "已审核，等待放币";
    }

    if(status==3){
        return "已放币";
    }

    return "";
}