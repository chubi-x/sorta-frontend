export async function fetchUser(abortController: AbortController) {
  try { 
    const request = await fetch("https://localhost:3000/user", {
      credentials: "include",
      signal: abortController.signal,
    });
    return await request.json();
  } catch (err) {
    console.log("Error fetching user. \n",err)
  }
}


