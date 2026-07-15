export const authClient = async (path: string, email?: string, password?: string) => {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const result = await response.json();

  return result;
}; 