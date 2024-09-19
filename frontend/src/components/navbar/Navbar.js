import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import './Navbar.css'
import {MdLeaderboard, MdLogout, MdLogin} from 'react-icons/md'
import {FaUserPlus, FaUser, FaBars, FaTimes} from 'react-icons/fa'
import {TbFileCode} from 'react-icons/tb'
import axios from "axios";
import { SERVER_BASE_URL } from "../../config";


const Navbar = ({isAuthenticated, setIsAuthenticated}) => {
    
    const [username, setUsername] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false)

    const navIconStyle = {
        marginRight: '5px',
        fontSize: "20px"
    }

    useEffect(() => {

        const fetchUsername = async () => {
            try {
              const token = localStorage.getItem('token')
              const config = {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                };
              const response = await axios.get(`${SERVER_BASE_URL}/`, config);
              setUsername(response.data.username); 
            } catch (error) {
              console.error('Error fetching user data:', error); 
            }
          };
          fetchUsername();

    }, [isAuthenticated])

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }

    return (
        <nav className="nav-element">
            <Link to ='/' className="title">Coders Inc.</Link>
            <div className="menu" onClick={() => {setMenuOpen(!menuOpen)}}>
                {menuOpen  
                 ? <FaTimes style={{fontSize : '32px'}}/>
                 : <FaBars style={{fontSize : '32px'}}/>
                }
            </div>
            <ul className={menuOpen ? "open" : ""}>
                {isAuthenticated ? 
                <> 
                <li onClick={() => {setMenuOpen(false)}}>
                    <NavLink to={'/problems'}>
                        <TbFileCode style={navIconStyle}/>
                        Problems
                    </NavLink>
                </li>
                <li onClick={() => {setMenuOpen(false)}}>
                    
                    <NavLink to={'/leaderboard'}>
                        <MdLeaderboard style={navIconStyle}/>
                        Leaderboard
                    </NavLink>
                </li>
                <li onClick={() => {setMenuOpen(false)}}>
                     
                    <NavLink to={`/users/${username}`}>
                        <FaUser style={navIconStyle}/> 
                        Profile
                    </NavLink>
                </li>
                <li onClick={() => {setMenuOpen(false)}}>
                
                <NavLink to={'/login'} onClick={handleLogout}>
                    <MdLogout style={navIconStyle}/>
                    Logout
                </NavLink>
                </li>
                    </> :
                    <>
                        <li onClick={() => {setMenuOpen(false)}}>
                            <NavLink to={'/login'}>
                                <MdLogin style={navIconStyle}/>
                                Login
                            </NavLink>
                        </li>
                        <li onClick={() => {setMenuOpen(false)}}>
                            <NavLink to={'/register'}>
                                <FaUserPlus style={navIconStyle}/>
                                Register
                            </NavLink>
                        </li>
                    </>
                    
                    }
            </ul>
        </nav>
    )
}

export default Navbar
