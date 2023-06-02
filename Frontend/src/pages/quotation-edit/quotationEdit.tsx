import { useState } from "react";
import { Header } from "../../layout/header.layout";
import { Sidebar } from "../../layout/sidebar.layout";
import { QuotationEditContent } from "./quotationEditContent";

export const QuotationEdit = () => {

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    const handleBurgerClick = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <>
            <div className='pj-container'>
                <div className={`bar-div ${sidebarOpen ? '' : 'close'} `}><Sidebar /></div>
                <div className='content'>
                    <div> <Header clickHandler={handleBurgerClick} text='Quotation Edit' /> </div>
                    <div className='board-div'><QuotationEditContent /></div>
                </div>
            </div>
        </>
    )
}