import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
export function PrimaryButton({ authFunction }: { authFunction: any }) {
  return (
    <button className="primary-btn primary-btn--medium" onClick={authFunction}>
      Connect Twitter <FontAwesomeIcon icon={faTwitter} />
    </button>
  );
}

