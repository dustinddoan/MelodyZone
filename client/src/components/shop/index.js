import React, { useState, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsByPaginate } from "store/actions/product.action";
import { getAllBrands } from "store/actions/brands.action";
import { GridOn, GridOff } from "@mui/icons-material";
import CardBlock from "utils.js/product/card.block";
import PaginationNav from "utils.js/paginateNav";
import SearchBar from "./searchBar";

const defaultValues = {
    page: 1,
    keywords: '',
    brand: [],
    min: 0,
    max: 50000,
    frets: []
};


const Shop = () => {
    const [grid, setGrid] = useState(false)
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues
    )

    const brands = useSelector(state => state.brands)
    const dispatch = useDispatch();

    const {byPaginate} = useSelector(state => state.products)
    const handleGrid = () => setGrid(!grid)

    const goToPage = (page) => {
        setSearchValues({page: page})
    }

    const handleResetSearch = () => {
        setSearchValues({keywords: ''})
    }

    const handleSearch = (values) => {
        setSearchValues({keywords: values.keywords, page: 1})
    }



    //useEffect: when application start or listen to the change
    useEffect(() => {
        dispatch(getAllBrands())
    }, [dispatch])

    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
    }, [dispatch, searchValues])

    return (
        <div className="page_container">
            <div className="page_top">
                <div className="container">
                    <SearchBar handleSeach={values => handleSearch(values)}/>
                </div>
            </div>
            <div className="container">
                <div className="shop_wrapper">
                    <div className="left">
                        collapse brands
                        collapse fretsr
                        range select
                    </div>
                    <div className="right">
                        <div className="shop_option">
                            <div className="shop_grids clear">
                                <div className={`grid_btn ${grid ? '' : 'active'}`}
                                    onClick={() => handleGrid()}
                                >
                                    <GridOn />
                                </div>
                                <div className={`grid_btn ${!grid ? '' : 'active'}`}
                                    onClick={() => handleGrid()}
                                >
                                    <GridOff />
                                </div>
                            </div>
                            { byPaginate && byPaginate.docs ?
                                <>
                                    <CardBlock 
                                        grid={grid}
                                        items={byPaginate.docs}
                                        shop={true}
                                    />
                                    <PaginationNav 
                                        prods={byPaginate}
                                        prev={page => goToPage(page)}
                                        next={page => goToPage(page)}
                                        resetSearch={() => handleResetSearch()}
                                    />
                                </>
                                : 
                                <>
                                nothing
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;