import "../Stylesheets/Sidebar.scss"
import Logo from "../Assests/logo blue.png"
import { LuLayoutDashboard } from "react-icons/lu"
import { TbZodiacLibra } from "react-icons/tb"
import { FiUsers } from "react-icons/fi"
import { MdOutlineAdminPanelSettings } from "react-icons/md"
import { Link } from "react-router-dom"
import { RiArrowDropDownLine } from "react-icons/ri"
import astrologer from "../Assests/astrologer.jpg"
import { useRef, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { logout } from '../Actions/adminActions';
import { IoLanguageOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import { LiaProductHunt } from "react-icons/lia";
import { SiCoursera } from "react-icons/si";
import { useNavigate } from "react-router-dom"
function Sidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function toggledropdown() {
        let content = document.querySelector(".drop-content")
        content.classList.toggle("toggle-content")
    }

    function closedropdown() {
        let content = document.querySelector(".drop-content")
        content?.classList?.remove("toggle-content")
    }

    const dropTwo = useRef(null)
    const handleDroptwo = (e) => {
        if (!dropTwo?.current?.contains(e.target)) {
            closedropdown()
        }
    }
    useEffect(() => {
        document.addEventListener("click", handleDroptwo, true)
    }, [])


    function handleLogout() {
        let content = document.querySelector(".drop-content")
        content.classList.remove("toggle-content")
        dispatch(logout)
        navigate("/")
    }
    return (
        <>
            <aside id="side">
                <div className="logoContainer">
                    <img src={Logo} alt="logo" />
                </div>
                <div className="divider"></div>
                <section className="side-menu">
                    <Link className="side-link" to="/dashboard">
                        <LuLayoutDashboard  className="side_icons"/>
                        <span>Dashboard</span>
                    </Link>
                    <Link className="side-link" to="/astrologers">
                        <TbZodiacLibra className="side_icons" />
                        <span>Astrologers</span>
                    </Link>
                    <Link className="side-link" to="/users">
                        <FiUsers className="side_icons" />
                        <span>Users</span>
                    </Link>
                    <Link className="side-link" to="/packages">
                    <IoWalletOutline className="side_icons"/>
                        <span>Packages</span>
                    </Link>
                    <Link className="side-link" to="/methods">
                    <CiBoxList className="side_icons" />
                        <span>Methodology</span>
                    </Link>
                    <Link className="side-link" to="/languages">
                    <IoLanguageOutline  style={{fontSize:'20px'}}/>
                        <span>Languages</span>
                    </Link>
                    <Link className="side-link" to="/products">
                    <LiaProductHunt  className="side_icons"/>
                        <span>Products</span>
                    </Link>
                    <Link className="side-link" to="/courses">
                    <SiCoursera className="side_icons" />
                        <span>Course</span>
                    </Link>
                </section>
                <div className="divider"></div>
            </aside>
            <main>
                <header id="head">
                    <article>
                        <h2>Hello <span style={{ color: "#0042ae" }}>Admin</span></h2>
                        {/* <img src={welcome} alt="welcome" className="welcome" /> */}
                        <MdOutlineAdminPanelSettings className="side_icons" />
                    </article>
                    <div>
                        {/* Profile */}
                        <div className="profileDrop">
                            <button className="dropbtn" onClick={toggledropdown}>
                                <img src={astrologer} alt="astrologer" className="astrologer" />
                                <div className="drop_arrow"><RiArrowDropDownLine className="arrow_icons" /></div>
                            </button>
                            <div className="drop-content" ref={dropTwo}>
                                <Link to="/adminProfile" className="drop-link" onClick={closedropdown}>Your Profile</Link>
                                <hr />
                                <p className="drop-link" onClick={handleLogout}> Logout</p>
                                {/* <Link to="/" className="drop-link" onClick={handleLogout}>Logout</Link> */}
                            </div>
                        </div>
                    </div>
                </header>
            </main>
        </>
    )
}

export default Sidebar