
export const COIN_CNY=0;
export const COIN_CNY_STR="CNY";
export const COIN_CNY_PRE=2;


export const COIN_B=1;
export const COIN_B_STR="B";
export const COIN_B_PRE=8;

export function get_coin_precision(coin_type:number){
    if (coin_type==COIN_B){
        return COIN_B_PRE;
    }
    return 2;
}

export function coin_precision(coin_type:number,amount:number){
    return Number(amount).toFixed(get_coin_precision(coin_type));
}

export function rate_precision(amount:number){
    return Number(amount).toFixed(8);
}

export function get_coin_str(coin_type:number){
    if (coin_type==COIN_B){
        return COIN_B_STR;
    }
    return "未知币种";
}