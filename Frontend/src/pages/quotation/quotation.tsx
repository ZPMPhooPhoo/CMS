// import { useState } from 'react'
// import { Footer, Header } from "./layout"
// import { Task } from './interface'
// import { Btn, Txt } from './components'

// import ClientList from "./components/pages/client-list"
import QuotationFormContent from './quotationFormContent'
import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useState } from 'react'

// type BurgerPropsType = {
//   onClick :() => void;
// }
const Quotation = () => {

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    const handleBurgerClick = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <>
            {/* <ClientList /> */}
            <div className='pj-container'>
                <div className={`bar-div ${sidebarOpen ? '' : 'close'} `}><Sidebar /></div>
                <div className='content'>
                    <div> <Header clickHandler={handleBurgerClick} text="Projects" /> </div>
                    <div className='board-div'><QuotationFormContent /></div>
                </div>

            </div>
        </>
    )
}

export default Quotation;