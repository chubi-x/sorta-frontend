import { useEffect, useState } from "react";

export default function PrimaryButton() {
  const [authorizeUrl, setAuthorizeUrl] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const fetchAuthorizeUrl = async () => {
      try {
        const response = await fetch("http://localhost:3000/authorize", {
          signal: abortController.signal,
          credentials: "include",
        });
        if (response.status === 200) {
          const { data } = await response.json();
          console.log(data);

          setAuthorizeUrl(data.url);
        } else {
          // TODO: show proper error message for failed response
          alert(await response.json());
        }
      } catch (err) {
        // TODO: log to logging service
        console.log(` Error fetching auth url. see here: \n ${err}`);
      }
    };
    // fetch auth url
    fetchAuthorizeUrl();
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <button className="primary__btn primary__btn__medium">
      <a href={authorizeUrl}>Connect Twitter</a>
    </button>
  );
}
