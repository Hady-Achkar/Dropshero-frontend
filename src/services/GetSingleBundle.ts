import {BundlesAxios} from "../lib";
import {ApiConstants} from "../constants";
import {AxiosResponse} from "axios";

export const getSingleBundle = (priceId: string): Promise<AxiosResponse<GetSingleBundle.RootObject>> => {
    return BundlesAxios({
        method: 'GET',
        url: `${ApiConstants.BUNDLES.GET_SINGLE_BUNDLE}?priceId=${priceId}`
    })
}
export declare namespace GetSingleBundle {

    export interface Metadata {
    }

    export interface Metadata2 {
    }

    export interface Product {
        id: string;
        object: string;
        active: boolean;
        attributes: any[];
        created: number;
        description: string;
        images: any[];
        livemode: boolean;
        metadata: Metadata2;
        name: string;
        package_dimensions?: any;
        shippable?: any;
        statement_descriptor?: any;
        tax_code: string;
        type: string;
        unit_label: string;
        updated: number;
        url?: any;
    }

    export interface Recurring {
        aggregate_usage?: any;
        interval: string;
        interval_count: number;
        trial_period_days: number;
        usage_type: string;
    }

    export interface Prices {
        id: string;
        object: string;
        active: boolean;
        billing_scheme: string;
        created: number;
        currency: string;
        livemode: boolean;
        lookup_key?: any;
        metadata: Metadata;
        nickname?: any;
        product: Product;
        recurring: Recurring;
        tax_behavior: string;
        tiers_mode?: any;
        transform_quantity?: any;
        type: string;
        unit_amount: number;
        unit_amount_decimal: string;
    }

    export interface RootObject {
        status: 'Success' | 'Failure';
        message: string;
        prices: Prices;
        requestTime: Date;
    }

}

