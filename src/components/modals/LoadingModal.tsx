import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lotties/loading.json";

export function LoadingModal() {
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

