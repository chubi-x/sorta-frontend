import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
export function PrimaryButton({ authFunction }: { authFunction: any }) {
  return (
    <button
      className="primary__btn primary__btn__medium"
      onClick={authFunction}
    >
      {/* <a href=""> */}
      Connect Twitter <FontAwesomeIcon icon={faTwitter} />
      {/* </a> */}
    </button>
  );
}

