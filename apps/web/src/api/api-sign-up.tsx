export const signup = async (email: string, password: string) => {
  try {
    const response = await fetch(`http://localhost:8080/auth/sign-up`, {
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
  } catch (error) {
    throw error;
  }
}; 