import React from 'react';

import Logo from '../images/Logo.svg';

import { Home, User, Code } from 'react-feather';

import { Link } from 'gatsby';


function Navbar() {

    return (
        <header className="main-header">
            <Link to="/" title="Home" className="header-logo" onClick={() => {}}>
                <img src={Logo} alt="Dominic Marra logo" />
            </Link>
            

            <nav className='main-nav'>
                <ul>
                    <li>
                        <Link to="/" title="Home" activeClassName="active-nav-link" >
                            <span>Home</span>
                            <Home />
                        </Link>
                    </li>
                    <li>
                        <Link to="/about/" title="About" activeClassName="active-nav-link" >
                            <span>About Me</span>
                            <User />
                        </Link>
                    </li>
                    <li>
                        <Link to="/projects/" title="Projects" activeClassName="active-nav-link" >
                            <span>Projects</span>
                            <Code />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;