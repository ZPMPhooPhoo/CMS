export const ProjectContact = () => {
    return(
        <>

            <div className="table-wrap" style={{ width: '97%' }}>

                <div className="table-bar">
                   
                    <div className="pro_listincliinfo">
                        <span className="material-symbols-outlined">
                            person
                        </span>
                        <p> All Projects</p>
                    </div>
                </div>

                <table className='pj-table'>
                
                    <thead className="table-header">
                        <th>No</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Maintainance Active</th>
                    </thead>
                    <tr>
                        <td>1</td>
                        <td>Customer Support System</td>
                        <td className="td-category"><span>Web</span><span>Mobile</span></td>
                        <td>Completed</td>
                        <td>Under Maintainance</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Customer Support System</td>
                        <td className="td-category"><span>Web</span><span>Mobile</span></td>
                        <td>Cancelled</td>
                        <td>No More Active</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Customer Support System</td>
                        <td className="td-category"><span>Web</span><span>Mobile</span></td>
                        <td>Completed</td>
                        <td>No More Active</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Customer Support System</td>
                        <td className="td-category"><span>Web</span><span>Mobile</span></td>
                        <td>Progress</td>
                        <td>Under Maintainance</td>
                    </tr>
                </table>


            </div>        
        
        </>
    )
}