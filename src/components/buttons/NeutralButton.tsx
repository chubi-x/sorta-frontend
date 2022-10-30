import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export function NeutralButton({
  authFunction,
  forNav,
}: {
  authFunction: any;
  forNav: boolean;
}) {
  return (
    <button
      className={`neutral-btn neutral-btn--medium ${
        forNav ? "hidden lg:block" : ""
      }`}
      onClick={authFunction}
    >
      Connect Twitter
      {"   "} <FontAwesomeIcon icon={faTwitter} />
    </button>
  );
}

