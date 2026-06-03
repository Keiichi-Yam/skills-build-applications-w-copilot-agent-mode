import { useEffect, useState } from 'react';
import { fetchResource } from '../apiClient';

// Codespace endpoint: https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/leaderboard/
const resourceName = 'leaderboard';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResource(resourceName)
      .then((data) => {
        const items = Array.isArray(data) ? data : [data];
        console.log('[Leaderboard] normalized items:', items);
        setLeaderboard(items);
      })
      .catch((err) => {
        console.error('[Leaderboard] fetch error:', err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="container mt-4">
        <h2 className="h2 text-primary mb-4">Leaderboard</h2>
        <div className="alert alert-info">Loading leaderboard from the REST API...</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="h2 text-primary mb-4">Leaderboard</h2>
      {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
      {!error && leaderboard.length === 0 && (
        <div className="alert alert-warning" role="alert">
          No leaderboard entries found in the REST API.
        </div>
      )}
      {leaderboard.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((item, index) => (
                <tr key={item.id ?? index}>
                  <td><strong>#{index + 1}</strong></td>
                  <td>{item.user || item.name || item.username || 'N/A'}</td>
                  <td><span className="badge bg-success">{item.score ?? item.points ?? '0'}</span></td>
                  <td><small className="text-muted">{JSON.stringify(item).substring(0, 80)}...</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
