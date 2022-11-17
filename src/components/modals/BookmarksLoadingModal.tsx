import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lotties/loading.json";

export default function BookmarksLoadingModal() {
  return (
    <div className="bookmarks__loading__modal">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
        style={{ width: "150px" }}
      />
    </div>
  );
}
