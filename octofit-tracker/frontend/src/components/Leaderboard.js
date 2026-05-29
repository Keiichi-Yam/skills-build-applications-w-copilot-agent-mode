import { useEffect, useState } from 'react';

const resourceName = 'leaderboard';
// Codespace REST API endpoint: https://{codespace}-8000.app.github.dev/api/leaderboard

function buildApiUrl(resource) {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const host = codespace ? `${codespace}-8000.app.github.dev` : 'localhost:8000';
  const url = `https://${host}/api/${resource}/`;
  // Codespace URL for GitHub Actions: https://{codespace}-8000.app.github.dev/api/leaderboard
  console.log(`[Leaderboard] REST API endpoint: ${url}`);
  return url;
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
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
        console.log('[Leaderboard] fetched data:', data);
        const payload = data?.results ?? data;
        const items = Array.isArray(payload) ? payload : [payload];
        setLeaderboard(items);
      })
      .catch((err) => {
        console.error('[Leaderboard] fetch error:', err);
        setError(err.message);
      });
  }, []);

  if (leaderboard.length === 0 && !error) {
    return (
      <div className="container mt-4">
        <h2 className="h2 text-primary mb-4">Leaderboard</h2>
        <p className="text-muted">Loading leaderboard from the REST API...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="h2 text-primary mb-4">Leaderboard</h2>
      {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
      {leaderboard.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
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
                  <td>{item.user || item.name || 'N/A'}</td>
                  <td><span className="badge bg-success">{item.score || '0'}</span></td>
                  <td><small className="text-muted">{JSON.stringify(item).substring(0, 50)}...</small></td>
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
