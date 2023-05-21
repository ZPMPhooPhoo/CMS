import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ClientlistContent = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/customers", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
          setIsLoading(false);
        } catch (error:any) {
          setError(error);
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [token]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!data || !data.data || data.data.length === 0) {
      return <div>Data is not available</div>;
    }

    return (
        <>
            <div style={{ width: '100%' }}>
                <div className="table-wrap">
                    <div className="client-title">
                        <div>
                            <input type="text" placeholder="Search by name..."/>
                        </div>
                        <abbr title="ADD NEW CUSTOMER">
                            <div className="addnewcustomer">
                                    <button className="addcusbtn">
                                        <Link to="/client-create">
                                            <span className="material-symbols-outlined">add</span>
                                        </Link>
                                    </button>
                            </div>     
                        </abbr> 
                    </div>

                    <table className='pj-table'>
                
                <thead>
                    <tr className="table-header">
                        <th>No</th>
                        <th className="client-name">Name</th> 
                        <th>Contact Mail</th>
                        <th>Contact Phone</th>
                        <th>Contact Person</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.data?.map((item: any) => {
                        return (
                        <tr key={item.id}>
                            <td>1</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.contact_person}</td>
                            <td className="td-category">{item.position}</td>
                            <td>
                            <i className="fa-solid fa-pen-to-square update"></i>
                            <i className="fa-solid fa-trash delete"></i>
                            <Link to='/client-project-lists'><i className="fa-solid fa-angles-right more"></i></Link>
                            </td>
                        </tr>
                        );
                    })
}

                </tbody>
            </table>

                    {/* <table className="custtable">
                                    
                                    <thead className="tr1  custdele">
                                        <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Contact Person</th>
                                        <th>Position</th>
                                        <th>Is Aative</th>
                                        <th>Detail</th>
                                        </tr>
                                    </thead>
                                    <tr className="hovertr">
                                        <td className="clilichali">1</td>
                                        <td className="cliphomain"><p>KOKo</p></td>
                                        <td>Hla Shwe</td>
                                        <td className="clientposition">Manager</td>
                                        <td>
                                            <label className="switch">
                                                <input type="checkbox"/>
                                                <span className="slider"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <span id="custlistico1" className="material-symbols-outlined">
                                            edit
                                            </span>

                                            <Link to='/client-project-lists'>
                                                <span id="custlistico2" className="material-symbols-outlined">
                                                more_up
                                                </span>
                                            </Link>
                                            
                                        </td>
                                    </tr>
                                    <tr className="hovertr">
                                    <td className="clilichali">1</td>
                                        <td className="cliphomain"><p>KOKo</p></td>
                                        <td>Hla Shwe</td>
                                        <td className="clientposition">Manager</td>
                                        <td>
                                            <label className="switch">
                                                <input type="checkbox"/>
                                                <span className="slider"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <span id="custlistico1" className="material-symbols-outlined">
                                            edit
                                            </span>
                                            <span id="custlistico2" className="material-symbols-outlined">
                                            more_up
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hovertr">
                                    <td className="clilichali">1</td>                                        
                                    <td className="cliphomain"><p>KOKo</p></td>
                                        <td>Hla Shwe</td>
                                        <td className="clientposition">Manager</td>
                                        <td>
                                            <label className="switch">
                                                <input type="checkbox"/>
                                                <span className="slider"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <span id="custlistico1" className="material-symbols-outlined">
                                            edit
                                            </span>
                                            <span id="custlistico2" className="material-symbols-outlined">
                                            more_up
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hovertr">
                                    <td className="clilichali">1</td>                                        
                                    <td className="cliphomain"><p>KOKo</p></td>
                                        <td>Hla Shwe</td>
                                        <td className="clientposition">Manager</td>
                                        <td>
                                            <label className="switch">
                                                <input type="checkbox"/>
                                                <span className="slider"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <span id="custlistico1" className="material-symbols-outlined">
                                            edit
                                            </span>
                                            <span id="custlistico2" className="material-symbols-outlined">
                                            more_up
                                            </span>
                                        </td>
                                    </tr>
                    </table> */}
                 
                </div>
            </div> 
        </>
    );
}

export default ClientlistContent;