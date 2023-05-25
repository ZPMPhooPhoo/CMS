import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Rolelist = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/roles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div style={{ width: "100%" }}>
      <div className="table-wrap">
        <div className="client-title">
          <div>
            <h1>Role List</h1>
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

        <table className="pj-table">
          <thead>
            <tr className="table-header">
              <th>No</th>
              <th className="client-name">Role</th>
              <th>Permission</th>
              <th>Setting</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item:any, index:number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="client-name">{item.name}</td>
                <td></td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rolelist;