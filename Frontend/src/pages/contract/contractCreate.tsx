import { Sidebar } from '../../layout/sidebar.layout'
import { Header } from '../../layout/header.layout'
import { useState } from 'react'
import ContractCreateContent from './contractCreateContent'
const ContractCreate = () => {

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const handleBurgerClick = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <>
      <div className='pj-container'>
        <div className={`bar-div ${sidebarOpen ? '' : 'close'} `}><Sidebar /></div>
        <div className='content'>
          <div> <Header clickHandler={handleBurgerClick} text='Dashboard' /> </div>
          <div className='board-div'><ContractCreateContent /></div>
        </div>
      </div>
    </>
  )
}

export default ContractCreate;