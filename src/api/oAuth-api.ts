export async function fetchOauth(abortController: AbortController) {
  try {
    const request = await fetch(`${import.meta.env.VITE_API_URL!}/authorize`, {
      signal: abortController.signal,
      headers: { "ngrok-skip-browser-warning": "true" },
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
    const request = await fetch(
      `${import.meta.env.VITE_API_URL!}/oauth/complete`,
      {
        signal: abortController.signal,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ callbackParams, oauthData }),
      }
    );
    const response: ServerResponse = await request.json();
    return response;
  } catch (err) {
    console.log("error completing oauth. \n", err);
  }
}

