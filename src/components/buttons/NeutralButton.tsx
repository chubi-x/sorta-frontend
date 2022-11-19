import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

type NeutralButtonProps = {
  authLink: () => string;
  forNav: boolean;
};
export function NeutralButton({ authLink, forNav }: NeutralButtonProps) {
  return (
    <button
      className={`neutral-btn neutral-btn--medium ${
        forNav ? "hidden lg:flex" : ""
      }`}
    >
      <a href={authLink()}>
        <span>Connect</span>
        <span className="mt-[1px] block">
          <FontAwesomeIcon icon={faTwitter} />
        </span>
      </a>
    </button>
  );
}

