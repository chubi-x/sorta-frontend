import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
type PrimaryButtonProps = {
  authLink: () => string;
};
export function PrimaryButton({ authLink }: PrimaryButtonProps) {
  return (
    <button className="primary-btn primary-btn--medium">
      <a href={authLink()}>
        <span>Connect</span>{" "}
        <span className="mt-[1px]">
          <FontAwesomeIcon icon={faTwitter} />
        </span>
      </a>
    </button>
  );
}

