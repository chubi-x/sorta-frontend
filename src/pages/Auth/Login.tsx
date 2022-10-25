import { Navbar } from "../../layouts/Navbar";
import { PrimaryButton } from "../../components/buttons";
import Lottie from "lottie-react";
import login from "../../assets/lotties/login.json";

export function Login({ authFunction }: { authFunction: any }) {
  return (
    <>
      <Navbar authFunction={authFunction} />
      <div className="login">
        <div className="login__card">
          <div className="login__card__title">
            <h1>Connect Account</h1>
            <p>Hey! Click the button below to connect your twitter account</p>
          </div>
          <Lottie animationData={login} loop={true} autoplay={true} />

          <PrimaryButton authFunction={authFunction} />
        </div>
      </div>
    </>
  );
}

