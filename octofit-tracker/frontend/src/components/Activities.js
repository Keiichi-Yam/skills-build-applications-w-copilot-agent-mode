import { useEffect, useState } from 'react';
import { fetchResource } from '../apiClient';

// Codespace endpoint: https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/activities/
const resourceName = 'activities';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResource(resourceName)
      .then((data) => {
        const items = Array.isArray(data) ? data : [data];
        console.log('[Activities] normalized items:', items);
        setActivities(items);
      })
      .catch((err) => {
        console.error('[Activities] fetch error:', err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="container mt-4">
        <h2 className="h2 text-primary mb-4">Activities</h2>
        <div className="alert alert-info">Loading activities from the REST API...</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="h2 text-primary mb-4">Activities</h2>
      {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
      {!error && activities.length === 0 && (
        <div className="alert alert-warning" role="alert">
          No activities found in the REST API.
        </div>
      )}
      {activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
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
                  <td>{activity.id ?? index}</td>
                  <td>{activity.name || activity.title || 'N/A'}</td>
                  <td>{activity.description || 'N/A'}</td>
                  <td><small className="text-muted">{JSON.stringify(activity).substring(0, 80)}...</small></td>
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
