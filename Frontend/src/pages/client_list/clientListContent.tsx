import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ClientListContent = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const [filter,setFilter]=useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
     
    const handleFilterChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const filterValue = event.target.value;
      setFilter(filterValue);
    
      try {
        const response = await axios.get(
         `http://127.0.0.1:8000/api/customersWithName?searchuser=${filterValue}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },

          }
        );
        setSearchResults(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    
  
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
                           
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={filter}
                                onChange={handleFilterChange}
                            />

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
                    {(filter && searchResults.length > 0 ? searchResults: data.data).map((item: any, index: number) => {
                      return (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{item.contact_person}</td>
                          <td className="td-category">{item.position}</td>
                          <td>
                            <Link to={`/client_edit/ ${item.id}`}>
                                <i className="fa-solid fa-pen-to-square update"></i>
                            </Link>
                            <Link to={`/client_delete/${item.id}`}>
                              <i className="fa-solid fa-trash delete"></i>
                            </Link>
                            <Link to="/client-project-lists">
                              <i className="fa-solid fa-angles-right more"></i>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
            </table> 

                 
                </div>
            </div> 
        </>
    );
}

export default ClientListContent;