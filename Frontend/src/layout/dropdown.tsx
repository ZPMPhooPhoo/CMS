import { useEffect } from "react";
import { Link } from "react-router-dom"



export const Dropdown = () => {
    const handleLougout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role_id");
        window.location.reload();
        window.location.href = '/';

    }
    return (
        <>

            <label className="dropdown">

                <div className="dd-button">
                    Ye Yint Kyaw &nbsp;
                </div>

                <input type="checkbox" className="dd-input" id="test" />

                <ul className="dd-menu">
                    <li>My account</li>
                    <li onClick={handleLougout} >Logout</li>
                </ul>

            </label>

        </>
    )
}

