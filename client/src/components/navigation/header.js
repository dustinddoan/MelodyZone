import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Header = ({ users, signOutUser }) => {
    const [cart, setCart] = useState(0)
    
    useEffect(() => {
        setCart(users.cart.length)
    }, [cart])


    return (
        <header className='bck_b_light'>
            <div className='container'>
                <div className='left'>
                    <div className='logo'>
                        WAVES
                    </div>

                </div>
                <div className='right'>
                    <div className='top'>
                        {users.auth ?
                            <>
                                <div className='cart_link'>
                                    <span>{users.cart &&  users.cart.length}</span>
                                    <Link to='/dashboard/user/user_cart'>
                                        My cart
                                    </Link>
                                </div>
                                <Link to='/dashboard'>
                                    My account
                                </Link>
                                <span onClick={() => signOutUser()}>
                                    Log out
                                </span>
                            </>
                            :
                            <Link to='/sign_in'>
                                Log in
                            </Link>
                        }
                    </div>
                    <div className='bottom'>
                        <Link to='/'>
                            Home
                        </Link>
                        <Link to='/shop'>
                            Shop
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;