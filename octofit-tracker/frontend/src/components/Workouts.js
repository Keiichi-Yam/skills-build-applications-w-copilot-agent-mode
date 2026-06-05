import { useEffect, useState } from 'react';
import { fetchResource } from '../apiClient';

// Codespace endpoint: https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/workouts/
const resourceName = 'workouts';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResource(resourceName)
      .then((data) => {
        const items = Array.isArray(data) ? data : [data];
        console.log('[Workouts] normalized items:', items);
        setWorkouts(items);
      })
      .catch((err) => {
        console.error('[Workouts] fetch error:', err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="container mt-4">
        <h2 className="h2 text-primary mb-4">Workouts</h2>
        <div className="alert alert-info">Loading workouts from the REST API...</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="h2 text-primary mb-4">Workouts</h2>
      {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
      {!error && workouts.length === 0 && (
        <div className="alert alert-warning" role="alert">
          No workouts found in the REST API.
        </div>
      )}
      {workouts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
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
                  <td>{workout.id ?? index}</td>
                  <td>{workout.type || workout.name || 'N/A'}</td>
                  <td>{workout.duration || workout.length || 'N/A'}</td>
                  <td><small className="text-muted">{JSON.stringify(workout).substring(0, 80)}...</small></td>
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
