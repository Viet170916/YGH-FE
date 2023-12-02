import React, { useState } from "react"
import TextareaInput from "../../../../../Components/Common/Inputs/TextareaInput"
import FormDataProvider, { useFormStore } from "../FormDataProvider"


export interface IPolicies {
    id: number
    label: JSX.Element
    value: string
}



export const CancelationPoliciesOptions: IPolicies[] = [
    {
        id: 1,
        label:
            (<span>
                <strong>Flexible Policy</strong>
                <br />
                <small>Full refund for cancellations made at least 7 days before check-in.</small>
                <br />
                <small>50% refund for cancellations made within 7 days of check-in.</small>
            </span>),
        value: "Flexible:\nFull refund for cancellations made at least 7 days before check-in.\n50% refund for cancellations made within 7 days of check-in."
    },
    {
        id: 2,
        label:
            (<span>
                <strong>Moderate Policy</strong>
                <br />
                <small>Full refund for cancellations made at least 14 days before check-in.</small>
                <br />
                <small>50% refund for cancellations made within 7 days of check-in.</small>
            </span>),
        value: "Moderate:\nFull refund for cancellations made at least 14 days before check-in.\n50% refund for cancellations made within 7 days of check-in."
    },
    {
        id: 3,
        label:
            (<span>
                <strong>Strict Policy</strong>
                <br />
                <small>Full refund for cancellations made at least 30 days before check-in.</small>
                <br />
                <small>No refund for cancellations made within 30 days of check-in.</small>
            </span>),
        value: "Strict:\nFull refund for cancellations made at least 30 days before check-in.\nNo refund for cancellations made within 30 days of check-in."
    },
    {
        id: 4,
        label:
            (<span>
                <strong>No Refund Policy(not recommended)</strong>
                <br />
                <small>No refunds for cancellations; guests are responsible for the full booking cost regardless of when they cancel.</small>
            </span>),
        value: "No Refund:\nNo refunds for cancellations; guests are responsible for the full booking cost regardless of when they cancel."
    },
    // {
    //     id: 5,
    //     label:
    //         <span>
    //             <strong>Custom Policy</strong>
    //             <br />
    //             <TextareaInput rows={2} maxLength={300} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    //                 event.currentTarget.dispatchEvent(new Event('change', { bubbles: true }))
    //                 CancelationPoliciesOptions[4].value = "Custom:\n" + event.target.value
    //             }} />
    //         </span>,
    //     value: "Custom"
    // },
]

export const PaymentPoliciesOptions: IPolicies[] = [
    {
        id: 1,
        label:
            (<span>
                <strong>Payment in Advance</strong>
                <br />
                <small>Tenant pay in advance with the deposit of <input className="advance-payment"
                    type="number"
                    onClick={(event) => event.stopPropagation()}
                    defaultValue="5"
                    style={{ padding: '3px' }}
                    max="100"
                    min="0"
                    onChange={(event) => {
                        PaymentPoliciesOptions[0].value = "Advance: " + event.target.value
                    }}
                    readOnly
                /> % the amount of total payment</small>
            </span>),
        value: "Payment in Advance",
    },
    {
        id: 2,
        label:
            (<span>
                <strong>Payment after Service</strong>
                <br />
                <small>Tenant pay after the stay with the apartment payment plus any additional fee</small>
            </span>),
        value: "Payment after Service",
    },
]


// export const OtherPoliciesOptions: IPolicies[] = [
//     {
//         id: 1,
//         label:
//             (<span>
//                 <strong>Not allow smoking</strong>
//             </span>),
//         value: "Smoking",
//     },
//     {
//         id: 2,
//         label:
//             (<span>
//                 <strong>Not allow pets</strong>
//             </span>),
//         value: "Pets",
//     }
// ]