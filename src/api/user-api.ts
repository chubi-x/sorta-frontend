export async function fetchUser(abortController: AbortController) {
  try {
    const request = await fetch(`${import.meta.env.VITE_API_URL!}/user`, {
      credentials: "include",
      signal: abortController.signal,
      headers: { "ngrok-skip-browser-warning": "true" },
    });
    const response = await request.json();
    return response;
  } catch (err) {
    console.log("Error fetching user. \n", err);
  }
}

