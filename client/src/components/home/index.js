import React, { useEffect } from 'react';
import { SlimPromotion } from 'utils.js/promotions/slim.block';
import Featured from './featured';

import { useDispatch, useSelector } from 'react-redux';
import {productsBySort} from 'store/actions/product.action'

const slimPromotion = {
    img: '/images/featured/featured_home_3.jpg',
    lineOne: 'Up to 40% off',
    lineTwo: 'In second hand guitar',
    linkTitle: 'Do not miss it',
    linkTo: '/shop'
}



const Home = () => {

    const {bySold, byDate} = useSelector(state => state.products)
    
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Home dispatch:')
        dispatch(productsBySort({
            limit: 4,
            sortBy: 'itemSold',
            order: 'desc',
            where: 'bySold'
        }));

        dispatch(productsBySort({
            limit: 4,
            sortBy: 'date',
            order: 'desc',
            where: 'byDate'
        }));
    }, [dispatch])

    console.log('bySold: ', bySold);
    console.log('byDate: ', byDate);

    return(
       <div>
            <Featured/>
            <SlimPromotion items={slimPromotion}/>
       </div>
    )
}

export default Home;