import React from 'react';

import { useState, useRef, useEffect } from 'react';

import Logo from '../images/Logo.svg';

import { Home, User, Code } from 'react-feather';

import { Link } from 'gatsby';


function Navbar() {
    const [navState, setNavState] = useState('');
    const mediaQTab = useRef();
    const mediaQDesktop = useRef();
    

    useEffect(() => {
        mediaQTab.current = window.matchMedia('(min-width: 35em) and (min-height: 28em)');
        mediaQDesktop.current = window.matchMedia('(min-width: 56em) and (min-height: 36em) ');

        const handleTabQuery = () => {
            if (mediaQTab.current.matches && navState !== 'tab' && !mediaQDesktop.current.matches) setNavState('tab');
            else if (navState !== '')setNavState('');
        }
        
        const handleDesktopQuery = () => {
            if (mediaQDesktop.current.matches && navState !== 'desktop') setNavState('desktop');
            else if (navState !== 'tab') setNavState('tab');
        }

        if (mediaQTab.current.matches && navState !== 'tab' && !mediaQDesktop.current.matches) setNavState('tab');
        if (mediaQDesktop.current.matches && navState !== 'desktop') setNavState('desktop');

        mediaQTab.current.addEventListener('change', handleTabQuery);
        mediaQDesktop.current.addEventListener('change', handleDesktopQuery);

        const tabMedia = mediaQTab.current;
        const desktopMedia = mediaQDesktop.current;

        return () => {
            tabMedia.removeEventListener('change', handleTabQuery);
            desktopMedia.removeEventListener('change', handleDesktopQuery);
        }
    
    }, [navState]);

    return (
        <header className="main-header">
            {   (navState === 'desktop' || navState === 'tab') &&

                <Link to="/" title="Home" className="header-logo" onClick={() => {}}>
                    <img src={Logo} alt="Dominic Marra logo" />
                </Link>
            }
            

            <nav className={`main-nav ${navState}`}>
                <ul>
                    <li>
                        <Link to="/" title="Home" activeClassName="active-nav-link" >
                            { navState === 'desktop' ? 'Home' : <Home />}
                        </Link>
                    </li>
                    <li>
                        <Link to="/about/" title="About" activeClassName="active-nav-link" >
                            { navState === 'desktop' ? 'About Me' : <User />}
                        </Link>
                    </li>
                    <li>
                        <Link to="/projects/" title="Projects" activeClassName="active-nav-link" >
                            { navState === 'desktop' ? 'Projects' : <Code />}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;