import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

type NeutralButtonProps = {
  authLink: () => string;
  forNav: boolean;
  loginReady: boolean;
};
export function NeutralButton({
  authLink,
  forNav,
  loginReady,
}: NeutralButtonProps) {
  return (
    <button
      className={`neutral-btn neutral-btn--medium ${
        forNav ? "hidden lg:flex" : ""
      }
      ${!loginReady ? "neutral-btn--disabled" : ""}`}
      disabled={!loginReady}
    >
      <a href={loginReady ? authLink() : undefined}>
        <span>Connect</span>
        <span className="mt-[1px] block">
          <FontAwesomeIcon icon={faTwitter} />
        </span>
      </a>
    </button>
  );
}

