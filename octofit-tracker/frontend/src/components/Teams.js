import { useEffect, useState } from 'react';

const resourceName = 'teams';

function buildApiUrl(resource) {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const host = codespace ? `${codespace}-8000.app.github.dev` : 'localhost:8000';
  const url = `https://${host}/api/${resource}/`;
  // Codespace URL for GitHub Actions: https://{codespace}-8000.app.github.dev/api/teams
  console.log(`[Teams] REST API endpoint: ${url}`);
  return url;
}

function Teams() {
  const [teams, setTeams] = useState([]);
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
        console.log('[Teams] fetched data:', data);
        const payload = data?.results ?? data;
        const items = Array.isArray(payload) ? payload : [payload];
        setTeams(items);
      })
      .catch((err) => {
        console.error('[Teams] fetch error:', err);
        setError(err.message);
      });
  }, []);

  if (teams.length === 0 && !error) {
    return (
      <div className="container mt-4">
        <h2 className="h2 text-primary mb-4">Teams</h2>
        <p className="text-muted">Loading teams from the REST API...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="h2 text-primary mb-4">Teams</h2>
      {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
      {teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Team Name</th>
                <th>Members</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={team.id ?? index}>
                  <td>{team.id}</td>
                  <td><strong>{team.name || 'N/A'}</strong></td>
                  <td>{team.members_count || '0'}</td>
                  <td><small className="text-muted">{JSON.stringify(team).substring(0, 50)}...</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Teams;
