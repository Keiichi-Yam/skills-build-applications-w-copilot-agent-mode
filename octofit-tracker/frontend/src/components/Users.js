import { useEffect, useState } from 'react';
import { fetchResource } from '../apiClient';

// Codespace endpoint: https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/users/
const resourceName = 'users';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResource(resourceName)
      .then((data) => {
        const items = Array.isArray(data) ? data : [data];
        console.log('[Users] normalized items:', items);
        setUsers(items);
      })
      .catch((err) => {
        console.error('[Users] fetch error:', err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="container mt-4">
        <h2 className="h2 text-primary mb-4">Users</h2>
        <div className="alert alert-info">Loading users from the REST API...</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="h2 text-primary mb-4">Users</h2>
      {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
      {!error && users.length === 0 && (
        <div className="alert alert-warning" role="alert">
          No users found in the REST API.
        </div>
      )}
      {users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id ?? index}>
                  <td>{user.id ?? index}</td>
                  <td>{user.username || user.name || 'N/A'}</td>
                  <td>{user.email || user.email_address || 'N/A'}</td>
                  <td><small className="text-muted">{JSON.stringify(user).substring(0, 80)}...</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
