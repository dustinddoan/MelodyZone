import React, { useState, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsByPaginate } from "store/actions/product.action";
import { getAllBrands } from "store/actions/brands.action";
import { GridOn, GridOff } from "@mui/icons-material";
import CardBlock from "utils.js/product/card.block";
import PaginationNav from "utils.js/paginateNav";
import SearchBar from "./searchBar";
import CollapseCheckbox from "./collapseCheckbox";
import PriceRange from "./priceRange";

const defaultValues = {
    page: 1,
    keywords: '',
    brand: [],
    min: 0,
    max: 50000,
    frets: []
};


const Shop = (props) => {
    const [grid, setGrid] = useState(false)
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues
    )
    const frets = [
        {_id: 20, name: 20},
        {_id: 21, name: 21},
        {_id: 22, name: 22},
        {_id: 24, name: 24}
    ]

    const brands = useSelector(state => state.brandsReducer.brands)
    const dispatch = useDispatch();

    const {byPaginate} = useSelector(state => state.products)
    const handleGrid = () => setGrid(!grid)

    const goToPage = (page) => {
        setSearchValues({page: page})
    }

    const handleResetSearch = () => {
        setSearchValues(defaultValues)
    }

    const handleSearch = (values) => {
        setSearchValues({keywords: values.keywords, page: 1})
    }

    const handleFilters = (filters, category) => {
        if (category === 'brands') {
            setSearchValues({brand: filters, page: 1})
        } else if (category === 'frets') {
            setSearchValues({frets: filters, page: 1})
        }
    }

    const handlePriceRange = (values) => {
        console.log('values parent: ', values)
        setSearchValues({min: values[0], max: values[1]})
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
                        <CollapseCheckbox 
                            initState={true}
                            title="Brands"
                            list={brands}
                            handleFilters={(filters) => handleFilters(filters, 'brands')}
                        />
                        <CollapseCheckbox 
                            initState={false}
                            title="Frets"
                            list={frets}
                            handleFilters={(filters) => handleFilters(filters, 'frets')}
                        />
                        <PriceRange handleRange={(values) => handlePriceRange(values)}/>
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