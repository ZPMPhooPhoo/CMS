import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface Project {
  id: number;
  title: string;
  category: {
    category: string;
  };
}


export const ClientProjectListContent = () => {
  const [clientproject, setClientproject] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [name, setName] = useState<string>("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/userproject/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newResponse = await axios.get(
          `http://127.0.0.1:8000/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const clientProjects = response.data.data || [];
        const clientName = newResponse?.data?.data?.name;
        if (clientName === undefined) {
          return navigate("/client-lists")
        }
        setName(clientName);
        setClientproject(clientProjects);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  if (isLoading) {
    return <div className="l-width"><p className="loading"></p></div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <div className="table-wrap" style={{ width: "97%" }}>
        <div className="table-bar">
          <div className="pro_listincliinfo">
            <Link to="/client-lists">
              <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <span className="material-symbols-outlined">person</span>
            <p> {name} </p>
          </div>
          <div className="add-btn-wrap">
            <Link to={`/add-client-project?id=${id}`}>
              <button className="add-btn">
                <i className="fa-solid fa-plus"></i>ADD NEW PROJECT
              </button>
            </Link>
          </div>
        </div>

        <table className="pj-table">
          <thead>
            <tr className="table-header">
              <th>No</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quotation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clientproject.length === 0 ? (
              <tr>
                <td colSpan={5}>No projects found.</td>
              </tr>
            ) : (
              clientproject.map((project: Project, index: number) => (
                <tr key={project.id}>
                  <td>{index + 1}</td>
                  <td>{project.title}</td>
                  <td className="td-category">
                    {project.category && project.category.category ? (
                      <span>{project.category.category}</span>
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/quotation-create?id=${id}&projectID=${project.id}`} className="link">
                      Add Quotation
                    </Link>
                  </td>
                  <td>
                    <Link to={`/project-edit?id=${id}&projectID=${project.id}`}>
                      <i className="fa-solid fa-pen-to-square update"></i>
                    </Link>
                    
                    {/* <i className="fa-solid fa-trash delete"></i> */}
                    <Link to={`/project-detail?id=${id}&projectID=${project.id}`}>
                      <i className="fa-solid fa-angles-right more"></i>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
