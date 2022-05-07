import {AxiosResponse} from "axios";
import {UsersAxios} from "../lib";
import {ApiConstants} from "../constants";

export const getMyProfile = (): Promise<AxiosResponse<GetMyProfile.RootObject>> => {
    return UsersAxios({
        method: 'GET',
        url: ApiConstants.USERS.GET_ME
    })
}
export declare module GetMyProfile {

    export interface Cost {
        _id: string;
        min: number;
        max: number;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface Selling {
        _id: string;
        min: number;
        max: number;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface Profit {
        _id: string;
        min: number;
        max: number;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface Price {
        _id: string;
        cost: Cost;
        selling: Selling;
        createdAt: Date;
        updatedAt: Date;
        profit: Profit;
    }

    export interface FavoriteProduct {
        images: string[];
        whereToSell: string[];
        supplierLinks: string[];
        competitorLinks: string[];
        amazonLinks: string[];
        whyDidWePick: string[];
        _id: string;
        description: string;
        marketingImage: string;
        marketingAngel: string;
        marketingVideo: string;
        price: Price;
        thumbnail: string;
        title: string;
        category: string;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface Address {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
    }

    export interface BillingDetails {
        address: Address;
        email: string;
        name: string;
        phone?: any;
    }

    export interface FraudDetails {
    }

    export interface Metadata {
        id: string;
        object: string;
        active: string;
        created: string;
        description: string;
        livemode: string;
        name: string;
        tax_code: string;
        type: string;
        unit_label: string;
        updated: string;
    }

    export interface Outcome {
        network_status: string;
        reason?: any;
        risk_level: string;
        risk_score: number;
        seller_message: string;
        type: string;
    }

    export interface Checks {
        address_line1_check: string;
        address_postal_code_check: string;
        cvc_check: string;
    }

    export interface Card {
        brand: string;
        checks: Checks;
        country: string;
        exp_month: number;
        exp_year: number;
        fingerprint: string;
        funding: string;
        installments?: any;
        last4: string;
        network: string;
        three_d_secure?: any;
        wallet?: any;
    }

    export interface PaymentMethodDetails {
        card: Card;
        type: string;
    }

    export interface Refunds {
        object: string;
        data: any[];
        has_more: boolean;
        total_count: number;
        url: string;
    }

    export interface Datum2 {
        id: string;
        object: string;
        amount: number;
        amount_captured: number;
        amount_refunded: number;
        application?: any;
        application_fee?: any;
        application_fee_amount?: any;
        balance_transaction: string;
        billing_details: BillingDetails;
        calculated_statement_descriptor: string;
        captured: boolean;
        created: number;
        currency: string;
        customer: string;
        description?: any;
        destination?: any;
        dispute?: any;
        disputed: boolean;
        failure_code?: any;
        failure_message?: any;
        fraud_details: FraudDetails;
        invoice?: any;
        livemode: boolean;
        metadata: Metadata;
        on_behalf_of?: any;
        order?: any;
        outcome: Outcome;
        paid: boolean;
        payment_intent: string;
        payment_method: string;
        payment_method_details: PaymentMethodDetails;
        receipt_email: string;
        receipt_number?: any;
        receipt_url: string;
        refunded: boolean;
        refunds: Refunds;
        review?: any;
        shipping?: any;
        source?: any;
        source_transfer?: any;
        statement_descriptor?: any;
        statement_descriptor_suffix?: any;
        status: string;
        transfer_data?: any;
        transfer_group?: any;
    }

    export interface Charges {
        object: string;
        data: Datum2[];
        has_more: boolean;
        total_count: number;
        url: string;
    }

    export interface Metadata2 {
        id: string;
        object: string;
        active: string;
        created: string;
        description: string;
        livemode: string;
        name: string;
        tax_code: string;
        type: string;
        unit_label: string;
        updated: string;
        package_dimensions: string;
        shippable: string;
        statement_descriptor: string;
        url: string;
    }

    export interface Card2 {
        installments?: any;
        network?: any;
        request_three_d_secure: string;
    }

    export interface PaymentMethodOptions {
        card: Card2;
    }

    export interface Datum {
        id: string;
        object: string;
        amount: number;
        amount_capturable: number;
        amount_received: number;
        application?: any;
        application_fee_amount?: any;
        automatic_payment_methods?: any;
        canceled_at?: any;
        cancellation_reason?: any;
        capture_method: string;
        charges: Charges;
        client_secret: string;
        confirmation_method: string;
        created: number;
        currency: string;
        customer: string;
        description?: any;
        invoice?: any;
        last_payment_error?: any;
        livemode: boolean;
        metadata: Metadata2;
        next_action?: any;
        on_behalf_of?: any;
        payment_method: string;
        payment_method_options: PaymentMethodOptions;
        payment_method_types: string[];
        processing?: any;
        receipt_email: string;
        review?: any;
        setup_future_usage?: any;
        shipping?: any;
        source?: any;
        statement_descriptor?: any;
        statement_descriptor_suffix?: any;
        status: string;
        transfer_data?: any;
        transfer_group?: any;
    }

    export interface Payments {
        object: string;
        data: Datum[];
        has_more: boolean;
        url: string;
    }

    export interface AutomaticTax {
        enabled: boolean;
        status?: any;
    }

    export interface Metadata3 {
        id: string;
        object: string;
        active: string;
        created: string;
        description: string;
        livemode: string;
        name: string;
        tax_code: string;
        type: string;
        unit_label: string;
        updated: string;
    }

    export interface Period {
        end: number;
        start: number;
    }

    export interface Metadata4 {
    }

    export interface Plan {
        id: string;
        object: string;
        active: boolean;
        aggregate_usage?: any;
        amount: number;
        amount_decimal: string;
        billing_scheme: string;
        created: number;
        currency: string;
        interval: string;
        interval_count: number;
        livemode: boolean;
        metadata: Metadata4;
        nickname?: any;
        product: string;
        tiers_mode?: any;
        transform_usage?: any;
        trial_period_days?: any;
        usage_type: string;
    }

    export interface Metadata5 {
    }

    export interface Recurring {
        aggregate_usage?: any;
        interval: string;
        interval_count: number;
        trial_period_days?: any;
        usage_type: string;
    }

    export interface Price2 {
        id: string;
        object: string;
        active: boolean;
        billing_scheme: string;
        created: number;
        currency: string;
        livemode: boolean;
        lookup_key?: any;
        metadata: Metadata5;
        nickname?: any;
        product: string;
        recurring: Recurring;
        tax_behavior: string;
        tiers_mode?: any;
        transform_quantity?: any;
        type: string;
        unit_amount: number;
        unit_amount_decimal: string;
    }

    export interface Datum4 {
        id: string;
        object: string;
        amount: number;
        currency: string;
        description: string;
        discount_amounts: any[];
        discountable: boolean;
        discounts: any[];
        livemode: boolean;
        metadata: Metadata3;
        period: Period;
        plan: Plan;
        price: Price2;
        proration: boolean;
        quantity: number;
        subscription: string;
        subscription_item: string;
        tax_amounts: any[];
        tax_rates: any[];
        type: string;
    }

    export interface Lines {
        object: string;
        data: Datum4[];
        has_more: boolean;
        total_count: number;
        url: string;
    }

    export interface Metadata6 {
    }

    export interface PaymentSettings {
        payment_method_options?: any;
        payment_method_types?: any;
    }

    export interface StatusTransitions {
        finalized_at: number;
        marked_uncollectible_at?: any;
        paid_at: number;
        voided_at?: any;
    }

    export interface Datum3 {
        id: string;
        object: string;
        account_country: string;
        account_name: string;
        account_tax_ids?: any;
        amount_due: number;
        amount_paid: number;
        amount_remaining: number;
        application_fee_amount?: any;
        attempt_count: number;
        attempted: boolean;
        auto_advance: boolean;
        automatic_tax: AutomaticTax;
        billing_reason: string;
        charge?: any;
        collection_method: string;
        created: number;
        currency: string;
        custom_fields?: any;
        customer: string;
        customer_address?: any;
        customer_email: string;
        customer_name: string;
        customer_phone?: any;
        customer_shipping?: any;
        customer_tax_exempt: string;
        customer_tax_ids: any[];
        default_payment_method?: any;
        default_source?: any;
        default_tax_rates: any[];
        description?: any;
        discount?: any;
        discounts: any[];
        due_date?: any;
        ending_balance: number;
        footer?: any;
        hosted_invoice_url: string;
        invoice_pdf: string;
        last_finalization_error?: any;
        lines: Lines;
        livemode: boolean;
        metadata: Metadata6;
        next_payment_attempt?: any;
        number: string;
        on_behalf_of?: any;
        paid: boolean;
        paid_out_of_band: boolean;
        payment_intent?: any;
        payment_settings: PaymentSettings;
        period_end: number;
        period_start: number;
        post_payment_credit_notes_amount: number;
        pre_payment_credit_notes_amount: number;
        quote?: any;
        receipt_number?: any;
        starting_balance: number;
        statement_descriptor?: any;
        status: string;
        status_transitions: StatusTransitions;
        subscription: string;
        subtotal: number;
        tax?: any;
        total: number;
        total_discount_amounts: any[];
        total_tax_amounts: any[];
        transfer_data?: any;
        webhooks_delivered_at: number;
    }

    export interface Invoices {
        object: string;
        data: Datum3[];
        has_more: boolean;
        url: string;
    }

    export interface AutomaticTax2 {
        enabled: boolean;
    }

    export interface Metadata7 {
    }

    export interface Metadata8 {
    }

    export interface Plan2 {
        id: string;
        object: string;
        active: boolean;
        aggregate_usage?: any;
        amount: number;
        amount_decimal: string;
        billing_scheme: string;
        created: number;
        currency: string;
        interval: string;
        interval_count: number;
        livemode: boolean;
        metadata: Metadata8;
        nickname?: any;
        product: string;
        tiers_mode?: any;
        transform_usage?: any;
        trial_period_days?: any;
        usage_type: string;
    }

    export interface Metadata9 {
    }

    export interface Recurring2 {
        aggregate_usage?: any;
        interval: string;
        interval_count: number;
        trial_period_days?: any;
        usage_type: string;
    }

    export interface Price3 {
        id: string;
        object: string;
        active: boolean;
        billing_scheme: string;
        created: number;
        currency: string;
        livemode: boolean;
        lookup_key?: any;
        metadata: Metadata9;
        nickname?: any;
        product: string;
        recurring: Recurring2;
        tax_behavior: string;
        tiers_mode?: any;
        transform_quantity?: any;
        type: string;
        unit_amount: number;
        unit_amount_decimal: string;
    }

    export interface Datum6 {
        id: string;
        object: string;
        billing_thresholds?: any;
        created: number;
        metadata: Metadata7;
        plan: Plan2;
        price: Price3;
        quantity: number;
        subscription: string;
        tax_rates: any[];
    }

    export interface Items {
        object: string;
        data: Datum6[];
        has_more: boolean;
        total_count: number;
        url: string;
    }

    export interface Metadata10 {
        id: string;
        object: string;
        active: string;
        created: string;
        description: string;
        livemode: string;
        name: string;
        tax_code: string;
        type: string;
        unit_label: string;
        updated: string;
    }

    export interface PaymentSettings2 {
        payment_method_options?: any;
        payment_method_types?: any;
    }

    export interface Metadata11 {
    }

    export interface Plan3 {
        id: string;
        object: string;
        active: boolean;
        aggregate_usage?: any;
        amount: number;
        amount_decimal: string;
        billing_scheme: string;
        created: number;
        currency: string;
        interval: string;
        interval_count: number;
        livemode: boolean;
        metadata: Metadata11;
        nickname?: any;
        product: string;
        tiers_mode?: any;
        transform_usage?: any;
        trial_period_days?: any;
        usage_type: string;
    }

    export interface Datum5 {
        id: string;
        object: string;
        application_fee_percent?: any;
        automatic_tax: AutomaticTax2;
        billing_cycle_anchor: number;
        billing_thresholds?: any;
        cancel_at?: any;
        cancel_at_period_end: boolean;
        canceled_at?: any;
        collection_method: string;
        created: number;
        current_period_end: number;
        current_period_start: number;
        customer: string;
        days_until_due?: any;
        default_payment_method?: any;
        default_source?: any;
        default_tax_rates: any[];
        discount?: any;
        ended_at?: any;
        items: Items;
        latest_invoice: string;
        livemode: boolean;
        metadata: Metadata10;
        next_pending_invoice_item_invoice?: any;
        pause_collection?: any;
        payment_settings: PaymentSettings2;
        pending_invoice_item_interval?: any;
        pending_setup_intent: string;
        pending_update?: any;
        plan: Plan3;
        quantity: number;
        schedule?: any;
        start_date: number;
        status: string;
        transfer_data?: any;
        trial_end: number;
        trial_start: number;
    }

    export interface Subscriptions {
        object: string;
        data: Datum5[];
        has_more: boolean;
        url: string;
    }

    export interface Address2 {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
    }

    export interface BillingDetails2 {
        address: Address2;
        email: string;
        name: string;
        phone?: any;
    }

    export interface Checks2 {
        address_line1_check: string;
        address_postal_code_check: string;
        cvc_check: string;
    }

    export interface Networks {
        available: string[];
        preferred?: any;
    }

    export interface ThreeDSecureUsage {
        supported: boolean;
    }

    export interface Card3 {
        brand: string;
        checks: Checks2;
        country: string;
        exp_month: number;
        exp_year: number;
        fingerprint: string;
        funding: string;
        generated_from?: any;
        last4: string;
        networks: Networks;
        three_d_secure_usage: ThreeDSecureUsage;
        wallet?: any;
    }

    export interface Metadata12 {
        _id: string;
    }

    export interface Datum7 {
        id: string;
        object: string;
        billing_details: BillingDetails2;
        card: Card3;
        created: number;
        customer: string;
        livemode: boolean;
        metadata: Metadata12;
        type: string;
    }

    export interface PaymentMethods {
        object: string;
        data: Datum7[];
        has_more: boolean;
        url: string;
    }

    export interface Unpaid {
        cents: number;
        currency_iso: string;
    }

    export interface Due {
        cents: number;
        currency_iso: string;
    }

    export interface Paid {
        cents: number;
        currency_iso: string;
    }

    export interface Total {
        cents: number;
        currency_iso: string;
    }

    export interface GrossRevenue {
        cents: number;
        currency_iso: string;
    }

    export interface NetRevenue {
        cents: number;
        currency_iso: string;
    }

    export interface Commissions {
        unpaid: Unpaid;
        due: Due;
        paid: Paid;
        total: Total;
        gross_revenue: GrossRevenue;
        net_revenue: NetRevenue;
    }

    export interface User {
        favoriteProducts: FavoriteProduct[];
        status: string;
        _id: string;
        email: string;
        fname: string;
        lname: string;
        type: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        inTrial: boolean;
        isTrialLegit: boolean;
        password?: string
        stripeId: string;
        activeSubscription: string;
        bundleType: string;
        activePrice: string;
        payments: Payments;
        invoices: Invoices;
        subscriptions: Subscriptions;
        paymentMethods: PaymentMethods;
        defaultPaymentMethod: string
    }

    export interface RootObject {
        status: string;
        message: string;
        user: User;
        requestTime: Date;
    }
}





