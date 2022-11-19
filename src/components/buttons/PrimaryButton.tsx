import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
type PrimaryButtonProps = {
  authLink: () => string;
  loginReady: boolean;
};
export function PrimaryButton({ authLink, loginReady }: PrimaryButtonProps) {
  return (
    <button
      className={`primary-btn primary-btn--medium ${
        !loginReady ? "primary-btn--disabled" : ""
      }`}
      disabled={!loginReady}
    >
      <a href={loginReady ? authLink() : undefined}>
        <span>Connect</span>{" "}
        <span className="mt-[1px]">
          <FontAwesomeIcon icon={faTwitter} />
        </span>
      </a>
    </button>
  );
}

