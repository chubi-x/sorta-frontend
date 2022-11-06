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
      <span>Connect</span>
      <span className="mt-[1px]">
        <FontAwesomeIcon icon={faTwitter} />
      </span>
    </button>
  );
}

