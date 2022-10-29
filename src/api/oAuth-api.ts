export async function fetchOauth(abortController: AbortController) {
  try {
    const request = await fetch("https://localhost:3000/authorize", {
      signal: abortController.signal,
    });
    const response: OauthResponse = await request.json();
    return response;
  } catch (err) {
    console.log(`Error fetching oauth. \n ${err}`);
  }
}
export async function completeOauth(
  callbackParams: CallbackQueryParams | undefined,
  oauthData: Oauth | undefined,
  abortController: AbortController
) {
  try {
    const request = await fetch("https://localhost:3000/oauth/complete", {
      signal: abortController.signal,
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ callbackParams, oauthData }),
    });
    const response: ServerResponse = await request.json();
    return response;
  } catch (err) {
    console.log("error completing oauth. \n", err);
  }
}

