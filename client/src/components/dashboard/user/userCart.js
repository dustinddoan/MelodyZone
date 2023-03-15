import React, { useState, useEff } from "react";
import DashboardLayout from "components/hoc/dashboardLayout";
import CartDetail from "./cartDetail";
import { useDispatch, useSe, useSelector } from "react-redux";
import { removeFromCart } from "store/actions/user.action";
const UserCart = (props) => {
    const [loading, setLoading] = useState(false)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()

    const handleRemove = (index) => {
        dispatch(removeFromCart(index))
    }

    const calculateTotal = (cart) => {
        let total = 0;
        for (let i = 0; i < cart.length; i ++) {
            total += cart[i].price
        }
        return total
    }
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