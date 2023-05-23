import { Dropdown } from "./dropdown"
import { Burger } from "../components/burger.component"
import { Link } from "react-router-dom"
type props = {
    clickHandler : () => void;
    text: string
}


export const Header = ({clickHandler, text}:props)=>{
    // const sidebarOpen = useContext(AppContext);

    return(
        <>
            <div className="header-container">
                <div className="title">
                    <div onClick={ clickHandler}>
                        <Burger />
                    </div>
                    
                   
                    
                    <Link to='/'> <i className="fa-sharp fa-solid fa-house"></i> </Link>
                    <h3>/ {text} </h3>
                </div>

                {/* <div className="mode-btn">
                    <span>Dark Mode</span> &nbsp;
                    <label className='switch'>
                        <input type="checkbox"/>
                        <span className='slider'></span>
                    </label>
                </div> */}

                <div className="user-name">
                    <Dropdown />
                </div>

            </div>
        </>
    )
}