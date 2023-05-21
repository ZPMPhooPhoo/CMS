import { Link } from "react-router-dom"

export const ClientprojectlistContent = () => {
    return(
        <>

            <div className="table-wrap" style={{ width: '97%' }}>

                <div className="table-bar">
                   
                    <div className="pro_listincliinfo">
                        <Link to='/client-lists'><i className="fa-solid fa-chevron-left"></i></Link>
                        <span className="material-symbols-outlined">
                            person
                        </span>
                        <p>Customer Name / &nbsp; </p>
                        <p>Project Name</p>
                    </div>
                    <div className="add-btn-wrap">
                        <a href="/addclient">
                            <button className="add-btn">
                                <i className="fa-solid fa-plus"></i>ADD NEW PROJECT
                            </button>
                        </a>
                    </div>
                </div>

                <table className='pj-table'>
                
                    <thead className="table-header">
                        <th>No</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quotation</th>
                        <th>Actions</th>
                    </thead>
                    <tr>
                        <td>1</td>
                        <td>Customer Support System</td>
                        <td className="td-category"><span>Web</span><span>Mobile</span></td>
                        <td><Link to='#' className="link">Add Quotation</Link> </td>
                        <td><Link to='/project-detail'><i className="fa-solid fa-pen-to-square update"></i><i className="fa-solid fa-trash delete"></i><i className="fa-solid fa-angles-right more"></i></Link></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Customer Support System</td>
                        <td className="td-category"><span>Web</span><span>Mobile</span></td>
                        <td><Link to='#' className="link">Add Quotation</Link> </td>
                        <td><Link to='/project-detail'><i className="fa-solid fa-pen-to-square update"></i><i className="fa-solid fa-trash delete"></i><i className="fa-solid fa-angles-right more"></i></Link></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Customer Support System</td>
                        <td className="td-category"><span>Web</span><span>Mobile</span></td>
                        <td><Link to='#' className="link">Add Quotation</Link> </td>
                        <td><Link to='/project-detail'><i className="fa-solid fa-pen-to-square update"></i><i className="fa-solid fa-trash delete"></i><i className="fa-solid fa-angles-right more"></i></Link></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Customer Support System</td>
                        <td className="td-category"><span>Web</span><span>Mobile</span></td>
                        <td><Link to='#' className="link">Add Quotation</Link> </td>
                        <td><Link to='/project-detail'><i className="fa-solid fa-pen-to-square update"></i><i className="fa-solid fa-trash delete"></i><i className="fa-solid fa-angles-right more"></i></Link></td>
                    </tr>
                </table>


            </div>        
        
        </>
    )
}