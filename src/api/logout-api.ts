export async function logoutUser(controller: AbortController) {
  try {
    await fetch("https://localhost:3000/logout", {
      signal: controller.signal,
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.log("Error logging out", err);
  }
}
