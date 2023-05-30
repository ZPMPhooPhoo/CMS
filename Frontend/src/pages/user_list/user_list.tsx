import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Role {
  id: number;
  name: string;
}
// const navigate =useNavigate();

const UserListCompon = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const [filter, setFilter] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  // const [options, setOptions] = useState<Role[]>([]);
  const [options, setOptions] = useState<{ [key: number]: string }>({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, rolesResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://127.0.0.1:8000/api/roles", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setData(usersResponse.data);
        setIsLoading(false);

        const rolesData = rolesResponse.data.data;
        const mappedOptions: { [key: number]: string } = {};
        rolesData.forEach((item: Role) => {
          mappedOptions[item.id] = item.name;
        });

        setOptions(mappedOptions);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleFilterChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value;
    setFilter(filterValue);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/userAdminWithName?searchuser=${filterValue}`,
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
        const response = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error: any) {
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
    return <div>We are having trouble when fetching data. Please try again later.</div>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <div>Data is not available</div>;
  }


  let totalItems = data.data.length;
  if (searchResults.length > 0) {
    totalItems = searchResults.length
  }
  const totalPages = Math.ceil(totalItems / perPage);
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = data.data.slice(indexOfFirstItem, indexOfLastItem);
  const currentSearchItems = searchResults?.slice(indexOfFirstItem, indexOfLastItem);



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
                  <Link to="/user_create">
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
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {

                (filter && currentSearchItems.length > 0
                  ? currentSearchItems
                  : currentItems
                ).map((item: any, index: number) => {
                  const rowNumber = (currentPage - 1) * perPage + index + 1;
                  return (
                    <tr key={index}>
                      <td>{rowNumber}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td className="td-category">
                        {options[item.role_id] || ""}
                      </td>
                      <td>
                        <Link to={`/user_edit/${item.id}`}>
                          <i className="fa-solid fa-pen-to-square update"></i>
                        </Link>
                        <Link to={`/user_delete/${item.id}`}>
                          <i className="fa-solid fa-trash delete"></i>
                        </Link>
                        <Link to="/client-project-lists">
                          <i className="fa-solid fa-angles-right more"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              }


            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              &lt;&lt;
            </button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              &gt;&gt;
            </button>

          </div>


        </div>
      </div>
    </>
  );
}

export default UserListCompon;