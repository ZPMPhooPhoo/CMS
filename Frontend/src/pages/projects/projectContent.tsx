import { useState, useEffect } from 'react';
import { Checkbox } from '../../components/checkbox';
import axios from 'axios';

export const ProjectContact = () => {
  const [activeChecked, setActiveChecked] = useState<boolean>(false);
  const [unactiveChecked, setUnactiveChecked] = useState<boolean>(false);
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
        setProjects(response.data);
        // console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch projects.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can show a loading state here
  }

  if (error) {
    return <div>Error: {error}</div>; // Display an error message
  }

  return (
    <>
      <div className="table-wrap" style={{ width: '97%' }}>
        <div className="table-bar">
          <div className="pro_listincliinfo">
            <span className="material-symbols-outlined">person</span>
            <p>All Projects</p>
            <div className="check_projectmatain">
              <span>
                <Checkbox
                  label="Under Matain"
                  className=""
                  name="1"
                  checked={activeChecked}
                  onChange={handleActiveChange}
                />
              </span>
              <span>
                <Checkbox
                  label="No Service"
                  className=""
                  name="0"
                  checked={unactiveChecked}
                  onChange={handleUnactiveChange}
                />
              </span>
            </div>
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
                     projects.map((project, index) => (
              <tr key={project.id}>
                <td>{index + 1}</td>
                <td>{project.name}</td>
                <td className="td-category">
                  {project.categories && Array.isArray(project.categories)
                    ? project.categories.map((category: string) => (
                        <span key={category}>{category}</span>
                      ))
                    : null}
                </td>
                <td>{project.status}</td>
                <td>
                  {project.maintenanceActive
                    ? 'Under Maintenance'
                    : 'No More Active'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
