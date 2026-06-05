import { useEffect, useState } from 'react';
import { fetchResource } from '../apiClient';

// Codespace endpoint: https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/teams/
const resourceName = 'teams';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResource(resourceName)
      .then((data) => {
        const items = Array.isArray(data) ? data : [data];
        console.log('[Teams] normalized items:', items);
        setTeams(items);
      })
      .catch((err) => {
        console.error('[Teams] fetch error:', err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="container mt-4">
        <h2 className="h2 text-primary mb-4">Teams</h2>
        <div className="alert alert-info">Loading teams from the REST API...</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="h2 text-primary mb-4">Teams</h2>
      {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
      {!error && teams.length === 0 && (
        <div className="alert alert-warning" role="alert">
          No teams found in the REST API.
        </div>
      )}
      {teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
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
                  <td>{team.id ?? index}</td>
                  <td><strong>{team.name || team.title || 'N/A'}</strong></td>
                  <td>{team.members_count ?? team.member_count ?? '0'}</td>
                  <td><small className="text-muted">{JSON.stringify(team).substring(0, 80)}...</small></td>
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
