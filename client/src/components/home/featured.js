import React from "react";
import Carousel from "utils.js/carrousel";


const Featured = () => {
    const carrouselItems = [
        {
            img: '/images/featured/featured_home.jpg',
            lineOne: 'Fender',
            lineTwo: 'Custom shop',
            linkTitle: 'Shop Now',
            linkTo: '/shop'
        },
        {
            img: '/images/featured/featured_home_2.jpg',
            lineOne: 'B-stock',
            lineTwo: 'Awesome discount',
            linkTitle: 'View Offers',
            linkTo: '/shop'
        }
    ]

    return (
        <div className="featured_container">
            <Carousel items = {carrouselItems}/>
        </div>
    )
}

export default Featured;