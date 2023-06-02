import { useState, useEffect } from 'react';
import { Checkbox } from '../../components/checkbox';
import axios from 'axios';

export const ProjectContent = () => {
  const [activeChecked, setActiveChecked] = useState<boolean>(false);
  const [unactiveChecked, setUnactiveChecked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleActiveChange = (checked: boolean) => {
    setActiveChecked(checked);
  };

  const handleUnactiveChange = (checked: boolean) => {
    setUnactiveChecked(checked);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch projects.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="l-width"><p className="loading"></p></div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  let totalItems = projects.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <div className="table-wrap" style={{ width: '97%' }}>
        <div className="table-bar">
          <div className="pro_listincliinfo">
            <span className="material-symbols-outlined">person</span>
            <p>All Projects</p>
          </div>
        </div>

        <table className="pj-table">
          <thead className="table-header">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Maintenance Active</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(projects) &&
              currentItems.map((project, index) => (
                <tr key={project.id}>
                  <td>{index + 1}</td>
                  <td>{project.title}</td>
                  <td className="td-category">
                    {project.category.category}
                  </td>

                  <td>{project.status}</td>
                  <td>
                    {project.maintenance_active
                      ? 'Under Maintenance'
                      : 'No More Active'}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            &lt;&lt;
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </>
  );
};
