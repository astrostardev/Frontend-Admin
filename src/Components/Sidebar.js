import "../Stylesheets/Sidebar.scss"
import Logo from "../Assests/Logo.png"
import { LuLayoutDashboard } from "react-icons/lu"
import { TbZodiacLibra } from "react-icons/tb"
import { FiUsers } from "react-icons/fi"
import { MdOutlineAdminPanelSettings } from "react-icons/md"
import { Link } from "react-router-dom"
import { RiArrowDropDownLine } from "react-icons/ri"
import astrologer from "../Assests/astrologer.jpg"
import { useRef, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Actions/adminActions';
import { IoLanguageOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
function Sidebar() {
    const dispatch = useDispatch()

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
                        <LuLayoutDashboard style={{ fontSize: "20px" }} />
                        <span>Dashboard</span>
                    </Link>
                    <Link className="side-link" to="/astrologers">
                        <TbZodiacLibra style={{ fontSize: "20px" }} />
                        <span>Astrologers</span>
                    </Link>
                    <Link className="side-link" to="/users">
                        <FiUsers style={{ fontSize: "20px" }} />
                        <span>Users</span>
                    </Link>
                    <Link className="side-link" to="/packages">
                    <IoWalletOutline style={{fontSize:"20px"}}/>
                        <span>Packages</span>
                    </Link>
                    <Link className="side-link" to="/methods">
                    <CiBoxList style={{fontSize:"20px"}} />
                        <span>Methodology</span>
                    </Link>
                    <Link className="side-link" to="/languages">
                    <IoLanguageOutline  style={{fontSize:'20px'}}/>
                        <span>Languages</span>
                    </Link>
                </section>
                <div className="divider"></div>
            </aside>
            <main>
                <header id="head">
                    <article>
                        <h2>Hello <span style={{ color: "#0042ae" }}>Admin</span></h2>
                        {/* <img src={welcome} alt="welcome" className="welcome" /> */}
                        <MdOutlineAdminPanelSettings style={{ fontSize: "20px" }} />
                    </article>
                    <div>
                        {/* Profile */}
                        <div className="profileDrop">
                            <button className="dropbtn" onClick={toggledropdown}>
                                <img src={astrologer} alt="astrologer" className="astrologer" />
                                <div style={{ marginTop: "5px" }}><RiArrowDropDownLine style={{ fontSize: "25px" }} /></div>
                            </button>
                            <div className="drop-content" ref={dropTwo}>
                                <Link to="/adminProfile" className="drop-link" onClick={closedropdown}>Your Profile</Link>
                                <hr />
                                <Link to="#" className="drop-link" onClick={handleLogout}>Logout</Link>
                            </div>
                        </div>
                    </div>
                </header>
            </main>
        </>
    )
}

export default Sidebar