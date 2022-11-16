export async function logoutUser(controller: AbortController) {
  try {
    const url = `${import.meta.env.VITE_API_URL!}/logout`;
    const request = await fetch(url, {
      signal: controller.signal,
      method: "POST",
      credentials: "include",
      headers: { "ngrok-skip-browser-warning": "true" },
    });
  } catch (err) {
    console.log("Error logging out", err);
  }
}

