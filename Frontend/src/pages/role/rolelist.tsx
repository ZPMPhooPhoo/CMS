import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { Checkbox } from "../../components/checkbox";

const Rolelist = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [permissionData, setPermissionData] = useState([]);
  const [permission ,setPermission] =useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roleResponse, permissionResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/roles", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://127.0.0.1:8000/api/permissions", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        setData(roleResponse.data.data);
        setPermissionData(roleResponse.data.rolePermissions);
        // console.log(setPermissionData);
        setPermission(permissionResponse.data.data);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token]);
  // console.log(permission['name']);
  // console.log(permissionData);
  // const index=0;
  // console.log(permissionData[index] == permission['id'] ? permission['name'] : '');

  return (
    <div style={{ width: "100%" }}>
      <div className="table-wrap">
        <div className="client-title">
          <div>
            <h1>Role List</h1>
          </div>
          {/* Rest of your code */}
        </div>

        <table className="pj-table">
          <thead>
            <tr className="table-header">
              <th>No</th>
              <th className="client-name">Role</th>
              {/* <th>Permission</th> */}
              <th>Setting</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item:any, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="client-name">{item.name}</td>
                  <td>
                  {/* {(filter && searchResults.length > 0 ? searchResults: data.data).map((item: any, index: number)  */}
                    {permissionData}  
                  </td>
                  <td>
                    <Link to={`/client_edit`}>
                      <i className="fa-solid fa-pen-to-square update"></i>
                    </Link>
                    <Link to={`/client_delete/`}>
                      <i className="fa-solid fa-trash delete"></i>
                    </Link>
                    <Link to="/client-project-lists">
                      <i className="fa-solid fa-angles-right more"></i>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No roles found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rolelist;
