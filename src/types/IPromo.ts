export interface IPromo {
    id: string;
    object: string;
    amount_off?: any;
    created: number;
    currency?: any;
    duration: string;
    duration_in_months: number;
    livemode: boolean;
    max_redemptions: number;
    metadata: {};
    name: string;
    percent_off: number;
    redeem_by?: any;
    times_redeemed: number;
    valid: boolean;
}
