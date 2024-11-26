import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function NFTHeader() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className='text-dark-blue p-3 mt-12 mx-2 w-auto flex items-center justify-between'>
            <h1 className='text-2xl font-bold p-2 mt-2 text-dark-blue'>Notifications</h1>
            <div className='relative'>

                <button onClick={toggleMenu} className='flex items-center space-x-2 text-lg'>
                    <span><i className="ri-menu-5-line"></i></span>
                </button>
                {isMenuOpen && (
                    <div className='absolute left-0 mt-2 w-48 bg-white text-dark-blue rounded-lg shadow-lg z-10'>
                        <ul className='py-2'>
                            <li>
                                <Link to="/settings" className='block px-4 py-2 hover:bg-blue-200'>Settings</Link>
                            </li>
                            <li>
                                <Link to="/archive" className='block px-4 py-2 hover:bg-blue-200'>Archived Chats</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    )
}
