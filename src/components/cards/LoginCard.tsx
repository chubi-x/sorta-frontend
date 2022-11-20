type LoginCardProps = {
  children: React.ReactNode;
};

export function LoginCard(props: LoginCardProps) {
  return <div className="login__card">{props.children}</div>;
}
