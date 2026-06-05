export function getCodespaceHost() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME?.trim();
  if (codespaceName) {
    return `${codespaceName}-8000.app.github.dev`;
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.endsWith('.app.github.dev')) {
      return hostname.replace(/-3000(\.app\.github\.dev)$/, '-8000$1');
    }
  }

  return 'localhost:8000';
}

export function buildApiUrl(resource) {
  if (typeof window !== 'undefined') {
    const host = window.location.host;
    const isDevServer = host.includes(':3000') || host.endsWith('-3000.app.github.dev');
    if (isDevServer) {
      const url = `/api/${resource}/`;
      console.log(`[${resource}] REST API endpoint (proxy): ${url}`);
      return url;
    }
  }

  const host = getCodespaceHost();
  const protocol = host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https';
  const url = `${protocol}://${host}/api/${resource}/`;
  console.log(`[${resource}] REST API endpoint: ${url}`);
  return url;
}

export async function fetchResource(resource) {
  const endpoint = buildApiUrl(resource);
  const response = await fetch(endpoint, {
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }
  const data = await response.json();
  console.log(`[${resource}] fetched data:`, data);
  return data?.results ?? data;
}
