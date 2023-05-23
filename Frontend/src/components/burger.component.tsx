import { useEffect, useContext } from "react"
import { AppContext } from "../appContext"
export const Burger = () => {

    // const {sidebarOpen, setSidebarOpen} = useContext(AppContext);
    return(
        <>
            <div className="burger-container">
                <div className="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </>
    )
}