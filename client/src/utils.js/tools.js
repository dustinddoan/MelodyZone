import { AddShoppingCart } from "@mui/icons-material";
import React from "react";
import { Link} from "react-router-dom";

export const WavesButton = (props) => {
    let template = '';

    switch(props.type) {
        case "default":
            template = <Link
                className={!props.altClass ? 'link_default' : props.altClass}
                to={props.linkTo}
                style={{
                    ...props.style
                }}
            >
                {props.title}
            </Link>
            break;
        case "bag_link":
            template = 
                <div
                    className="bag_link"
                    onClick={() => {
                        props.runAction()
                    }}
                    style={{...props.style}}
                >
                    <AddShoppingCart style={{fontSize: props.iconSize}}/>
                </div>
            break;
        default:
            template=''
    }

    return template
}

export const renderCardImage = (images) => {
    if (images.length > 0) return images[0]
    else return '/images/image_not_availble.png'
}
