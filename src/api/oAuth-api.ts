import React, { SetStateAction } from "react";

export async function fetchOauth(
  abortController: AbortController,
  setOauthData: React.Dispatch<SetStateAction<Oauth | undefined>>
) {
  const response = await fetch("https://localhost:3000", {
    signal: abortController.signal,
    credentials: "include",
    mode: "cors",
  });
  const responseData = await response.json();
  setOauthData(() => {
    return { ...responseData.data.oauth };
  });
}
export async function completeOauth(
  callbackParams: CallbackQueryParams | undefined,
  oauthData: Oauth | undefined,
  abortController: AbortController
) {
  const request = await fetch("https://localhost:3000/oauth/complete", {
    signal: abortController.signal,
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ callbackParams, oauthData }),
  });
  const response = await request.json();
  return response;
}

