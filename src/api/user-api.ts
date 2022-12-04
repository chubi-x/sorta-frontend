export async function fetchUser() {
  try {
    const request = await fetch(`${import.meta.env.VITE_API_URL!}/user`, {
      credentials: "include",
      headers: { "ngrok-skip-browser-warning": "true" },
    });
    const response = await request.json();
    return response as UserResponse;
  } catch (err) {
    console.log("Error fetching user. \n", err);
  }
}
