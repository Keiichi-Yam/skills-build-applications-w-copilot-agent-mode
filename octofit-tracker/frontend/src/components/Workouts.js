import { useEffect, useState } from 'react';

const resourceName = 'workouts';
// Codespace REST API endpoint: https://{codespace}-8000.app.github.dev/api/workouts

function buildApiUrl(resource) {
  // API URL patterns: https://{codespace}-8000.app.github.dev/api/workouts
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const host = codespace ? `${codespace}-8000.app.github.dev` : 'localhost:8000';
  const url = `https://${host}/api/${resource}/`;
  // Codespace URL for GitHub Actions: https://{codespace}-8000.app.github.dev/api/workouts
  console.log(`[Workouts] REST API endpoint: ${url}`);
  return url;
}

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
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
        console.log('[Workouts] fetched data:', data);
        const payload = data?.results ?? data;
        const items = Array.isArray(payload) ? payload : [payload];
        setWorkouts(items);
      })
      .catch((err) => {
        console.error('[Workouts] fetch error:', err);
        setError(err.message);
      });
  }, []);

  if (workouts.length === 0 && !error) {
    return (
      <div className="container mt-4">
        <h2 className="h2 text-primary mb-4">Workouts</h2>
        <p className="text-muted">Loading workouts from the REST API...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="h2 text-primary mb-4">Workouts</h2>
      {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
      {workouts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Workout Type</th>
                <th>Duration</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr key={workout.id ?? index}>
                  <td>{workout.id}</td>
                  <td>{workout.type || 'N/A'}</td>
                  <td>{workout.duration || 'N/A'}</td>
                  <td><small className="text-muted">{JSON.stringify(workout).substring(0, 50)}...</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Workouts;
