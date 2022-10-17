import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
export function PrimaryButton() {
  return (
    <button className="primary__btn primary__btn__medium">
      <a href="http://localhost:3000">
        Connect Twitter <FontAwesomeIcon icon={faTwitter} />
      </a>
    </button>
  );
}

