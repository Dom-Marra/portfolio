import { useState, useRef, useEffect } from 'react';

import Logo from '../images/Logo.svg';

import { NavLink } from 'react-router-dom';
import { Menu, X, Home, User, Code, Mail } from 'react-feather';


function Navbar() {
    const [navState, setNavState] = useState('');
    const mediaQTab = useRef(window.matchMedia('(min-width: 35em)'));
    const mediaQDesktop = useRef(window.matchMedia('(min-width: 56em)'));
    

    useEffect(() => {
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
    
    }, [navState])

    

    function setMobileNavSate(state) {
        if (!mediaQTab.current.matches && !mediaQDesktop.current.matches) setNavState(state);
    }

    return (
        <header className="main-header">
            <NavLink to="/" className="header-logo" exact onClick={() => {}}>
                <img src={Logo} alt="Dominic Marra logo" />
            </NavLink>
            
            <button 
                aria-label="Toggle menu" 
                aria-expanded={navState === 'opened' ? 'true' : 'false'} 
                className="menu-toggle" 
                onClick={() => setMobileNavSate(navState === 'opened' ? 'closed' : 'opened')}
            >
                { navState === 'opened' ? <X /> : <Menu /> }
            </button>

            <nav className={`main-nav ${navState}`}>
                
                <ul>
                    <li>
                        <NavLink to="/" activeClassName="active-nav-link" exact onClick={() => setMobileNavSate('closed')}>
                            { navState !== 'tab' ? 'Home' : <Home />}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/aboutme" activeClassName="active-nav-link" exact onClick={() => setMobileNavSate('closed')}>
                            { navState !== 'tab' ? 'About Me' : <User />}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects" activeClassName="active-nav-link" exact onClick={() => setMobileNavSate('closed')}>
                            { navState !== 'tab' ? 'Projects' : <Code />}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contactme" activeClassName="active-nav-link" exact onClick={() => setMobileNavSate('closed')}>
                            { navState !== 'tab' ? 'Contact Me' : <Mail />}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;