import { Link } from "react-router-dom"

export const Dropdown = () => {
    return(
        <>

            <label className="dropdown">

            <div className="dd-button">
                Ye Yint Kyaw &nbsp;
            </div>

            <input type="checkbox" className="dd-input" id="test" />

            <ul className="dd-menu">
                <li>My account</li>
                <Link to="/logout"><li>Logout</li></Link>
            </ul>

            </label>        
        
        </>
    )
}