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
        forNav ? "hidden lg:flex" : ""
      }`}
      onClick={authFunction}
    >
      <span>Connect</span>
      <span className="mt-[1px] block">
        <FontAwesomeIcon icon={faTwitter} />
      </span>
    </button>
  );
}

