export const authClientPost = async (path: string, email?: string, password?: string) => {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const result = await response.json();

  return result;
};

export const authClientVerify = async () => {
  const path = "http://localhost:8080/auth/verify";

  const response = await fetch(path, {
    method: "GET",
    credentials: "include"
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const result = await response.json();

  return result;
};