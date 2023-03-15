import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import Loader from "utils.js/loader";
import { getProductById } from "store/actions/product.action";
import { useParams } from "react-router-dom";
import { clearEditProdcut } from "store/actions";
import ProdInfo from "./prodInfo";
import { renderCardImage } from "utils.js/tools";


const ProductDetail = () => {
    const products = useSelector(state => state.products)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const params = useParams();
    const productId = params.id


    useEffect(() => {
        dispatch(getProductById(productId))
    }, [dispatch], productId)

    useEffect(() => {
        return () => {
            dispatch(clearEditProdcut())
        }
    }, [dispatch])

    return (
        <>
            {products && products.productById ?
                <div className="page_container">
                    <div className="page_top">
                        <div className="container">
                            Product detail

                        </div>
                    </div>
                    <div className="container">
                        <div className="product_detail_wrapper">
                            <div className="left">
                                <div>
                                    <img
                                        alt="some alt"
                                        src={renderCardImage(products.productById.images)}
                                    >
                                    </img>
                                </div>

                            </div>
                            <div className="right">
                                <ProdInfo
                                    detail={products.productById}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                :
                <Loader />
            }
        </>
    )
}

export default ProductDetail