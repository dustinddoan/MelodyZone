import React, { useState } from "react";
import { WavesButton } from "utils.js/tools";
import { ShoppingCart, DoneOutline, LocalShipping, Block } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { userAddToCart } from "store/actions/user.action";
import AddToCart from "utils.js/addToCart";
import { addToCart } from "store/actions";
const ProdInfo = (props) => {
    const product = props.detail
    const user = useSelector(state => state.users)
    const [modal, setModal] = useState(false)
    const [errorType, setErrorType] = useState(null)
    const dispatch = useDispatch()

    const handleAddToCart = (item) => {

        if (!user.auth) {
            setModal(true)
            setErrorType('auth')
            return false;
        }

        if (!user.data.verified) {
            setModal(true)
            setErrorType('verify')
            return false
        }

        dispatch(userAddToCart(item))
    }

    const handleClose = () => setModal(false)

    const showProductTag = (product) => (
        <div className="product_tags">
            <div className="tag">
                <div><LocalShipping /></div>
                <div className="tag_text">
                    {product.shipping ?
                        <div>Free shipping for US location</div>
                        :
                        <div>Shiping fee: $9.99</div>
                    }
                </div>
            </div>
            {product.available > 0 ?
                <div className="tag">
                    <div><DoneOutline /></div>
                    <div className="tag_text">
                        <div><strong>{product.available} in stock</strong></div>
                    </div>
                </div>
                :
                <div className="tag">
                    <div><Block /></div>
                    <div className="tag_text">
                        <div><strong>Out of stock</strong></div>
                    </div>
                </div>
            }
        </div>
    )

    const showProdActions = (product) => (
        <div className="product_actions">
            <div className="price">$ {product.price}</div>
            <div className="cart">
                <WavesButton
                    type="add_to_cart_link"
                    runAction={() => handleAddToCart(product)}
                />
            </div>
        </div>
    )

    const showProdSpecs = (product) => (
        <div className="product_specifications">
            <h2>Specs</h2>
            <div>
                <div className="item">
                    <strong>Frets</strong>: {product.frets}
                </div>
                <div className="item">
                    <strong>Wood</strong>: {product.woodtype}
                </div>
            </div>
            <AddToCart 
                modal={modal}
                errorType={errorType}
                handleClose={handleClose}
            />
        </div>
    )

    return (
        <div>
            <h1>{product.model}</h1>
            <p>{product.description}</p>
            {showProductTag(product)}
            {showProdActions(product)}
            {showProdSpecs(product)}
        </div>
    )
}

export default ProdInfo