import { useEffect, useState } from 'react';

const resourceName = 'users';
// Codespace REST API endpoint: https://{codespace}-8000.app.github.dev/api/users

function buildApiUrl(resource) {
  // API URL patterns: https://{codespace}-8000.app.github.dev/api/users
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const host = codespace ? `${codespace}-8000.app.github.dev` : 'localhost:8000';
  const url = `https://${host}/api/${resource}/`;
  // Codespace URL for GitHub Actions: https://{codespace}-8000.app.github.dev/api/users
  console.log(`[Users] REST API endpoint: ${url}`);
  return url;
}

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = buildApiUrl(resourceName);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('[Users] fetched data:', data);
        const payload = data?.results ?? data;
        const items = Array.isArray(payload) ? payload : [payload];
        setUsers(items);
      })
      .catch((err) => {
        console.error('[Users] fetch error:', err);
        setError(err.message);
      });
  }, []);

  if (users.length === 0 && !error) {
    return (
      <div className="container mt-4">
        <h2 className="h2 text-primary mb-4">Users</h2>
        <p className="text-muted">Loading users from the REST API...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="h2 text-primary mb-4">Users</h2>
      {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
      {users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
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
                  <td>{user.id}</td>
                  <td>{user.username || 'N/A'}</td>
                  <td>{user.email || 'N/A'}</td>
                  <td><small className="text-muted">{JSON.stringify(user).substring(0, 50)}...</small></td>
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
