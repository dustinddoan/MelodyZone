import React from 'react';
import { SlimPromotion } from 'utils.js/promotions/slim.block';
import Featured from './featured';

const slimPromotion = {
    img: '/images/featured/featured_home_3.jpg',
    lineOne: 'Up to 40% off',
    lineTwo: 'In second hand guitar',
    linkTitle: 'Do not miss it',
    linkTo: '/shop'
}



const Home = () => {

    return(
       <div>
            <Featured/>
            <SlimPromotion items={slimPromotion}/>
       </div>
    )
}

export default Home;