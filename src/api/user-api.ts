export async function fetchUser(abortController: AbortController) {
  const request = await fetch("https://localhost:3000/user", {
    credentials: "include",
    signal: abortController.signal,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await request.json();
  // return response;
}
