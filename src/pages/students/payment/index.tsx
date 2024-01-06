import Header from "@/components/common/header";
import PaymentForm from "@/components/payments/paymentForm";
import React from "react";
import { Suspense, useState } from "react";
const MemoizedPaymentForm = React.memo(PaymentForm);

export default function index(){

    const configs ={
        options: false,
        link:undefined
    }
    const title = "Fees Form";
    
    return(
        <div className='px-8 py-4'>
            <Header title={title} config={configs}/>
            <Suspense fallback={<div>Loading...</div>}>
                    <MemoizedPaymentForm />
            </Suspense>
        </div>
    )
}