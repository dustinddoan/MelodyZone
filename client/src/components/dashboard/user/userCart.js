import React, { useState } from "react";
import DashboardLayout from "components/hoc/dashboardLayout";
import CartDetail from "./cartDetail";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, userPurchaseSuccess } from "store/actions/user.action";
import Loader from "utils.js/loader";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const UserCart = (props) => {
    const [loading, setLoading] = useState(false)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()

    const handleRemove = (index) => {
        dispatch(removeFromCart(index))
    }

    const calculateTotal = (cart) => {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price
        }
        return total
    }

    const generateItemList = (cart) => {
        let itemsList = [];
        

        for (let i = 0; i < cart.length; i ++) {
            let item = {
                name: "",
                description: "",
                sku: "WAVES123",
                unit_amount: {
                    currency_code: "USD",
                    value: ""
                },
                quantity: "1"
            }
            item.name = cart[i].model
            item.unit_amount.value = cart[i].price
            console.log('item: ', item)
            itemsList.push(item)
        }

        console.log(itemsList)

        return itemsList
    }

    const initialOptions = {
        "client-id": "Ab35B-mMFZC-Arlk7VWsx-yTUlH6XKT7cWrXP9N4g1qAoFbz9irm4SxB97vqYCPAVvRT2-RQUcDeDXVD",
        currency: "USD",
        intent: "capture",
    };


    return (
        <DashboardLayout title="Your cart">
            {props.users.cart && props.users.cart.length > 0 ?
                <>
                    <CartDetail
                        products={props.users.cart}
                        removeItem={(index) => handleRemove(index)}
                    />
                    <div className="user_cart_sum">
                        <div>Total amout: ${calculateTotal(props.users.cart)}</div>
                    </div>
                    {loading ?
                        <Loader />
                        :
                        <div className="pp_button">
                            <PayPalScriptProvider options={initialOptions}>
                                <PayPalButtons
                                    style={{ layout: "horizontal" }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        currency_code: "USD",
                                                        value: calculateTotal(props.users.cart),
                                                        breakdown: {
                                                            item_total: {
                                                                currency_code: "USD",
                                                                value: calculateTotal(props.users.cart)
                                                            }
                                                        }
                                                    },
                                                    items: generateItemList(props.users.cart)
                                                }

                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            const name = details.payer.name.given_name;
                                            dispatch(userPurchaseSuccess(details.id))
                                            setLoading(true)
                                        });
                                    }}
                                />
                            </PayPalScriptProvider>
                        </div>
                    }
                </>
                :
                <div>
                    Cart is empty
                </div>
            }
        </DashboardLayout>
    )

}

export default UserCart