import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export function NeutralButton(props: { forNav: boolean }) {
  return (
    <div
      className={`neutral__btn neutral__btn__medium ${
        props.forNav ? "hidden lg:block" : ""
      }`}
    >
      <a href="http://localhost:3000">
        Connect Twitter
        {"   "} <FontAwesomeIcon icon={faTwitter} />
      </a>
    </div>
  );
}

