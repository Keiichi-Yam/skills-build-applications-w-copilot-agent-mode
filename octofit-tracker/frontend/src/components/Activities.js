import { useEffect, useState } from 'react';

const resourceName = 'activities';

function buildApiUrl(resource) {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const host = codespace ? `${codespace}-8000.app.github.dev` : 'localhost:8000';
  const url = `https://${host}/api/${resource}/`;
  // Codespace URL for GitHub Actions: https://{codespace}-8000.app.github.dev/api/activities
  console.log(`[Activities] REST API endpoint: ${url}`);
  return url;
}

function Activities() {
  const [activities, setActivities] = useState([]);
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
        console.log('[Activities] fetched data:', data);
        const payload = data?.results ?? data;
        const items = Array.isArray(payload) ? payload : [payload];
        setActivities(items);
      })
      .catch((err) => {
        console.error('[Activities] fetch error:', err);
        setError(err.message);
      });
  }, []);

  if (activities.length === 0 && !error) {
    return (
      <div className="container mt-4">
        <h2 className="h2 text-primary mb-4">Activities</h2>
        <p className="text-muted">Loading activities from the REST API...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="h2 text-primary mb-4">Activities</h2>
      {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
      {activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity.id ?? index}>
                  <td>{activity.id}</td>
                  <td>{activity.name || 'N/A'}</td>
                  <td>{activity.description || 'N/A'}</td>
                  <td><small className="text-muted">{JSON.stringify(activity).substring(0, 50)}...</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
