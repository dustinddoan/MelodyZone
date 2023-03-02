import React from 'react';
import ContactsIcon from '@mui/icons-material/Contacts'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'

const Footer = () => {
    return(
        <footer className='bck_b_dark'>
            <div className='container'>
                <div className='logo'>
                    WAVES
                </div>
                <div className='wrapper'>
                    <div className='left'>
                        <h2>Contact Information</h2>
                        <div className='business_nfo'>
                            <div className='tag'>
                                <ContactsIcon/>
                                <div className='nfo'>
                                    <div>Address</div>
                                    <div>123 Fake St, CA 90260</div>
                                </div>
                            </div>
                            <div className='tag'>
                                <TimelapseIcon/>
                                <div className='nfo'>
                                    <div>Phone</div>
                                    <div>1-888-888-9999</div>
                                </div>
                            </div>
                            <div className='tag'>
                                <PhoneIcon/>
                                <div className='nfo'>
                                    <div>Working hours</div>
                                    <div>10AM-6PM</div>
                                </div>
                            </div>
                            <div className='tag'>
                                <EmailIcon/>
                                <div className='nfo'>
                                    <div>Email</div>
                                    <div>mike@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='left'>
                        <h2>Be the first to know</h2>
                        <div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt dui ut ornare lectus sit amet est placerat in
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;