interface ConditionalProps {
  children: React.ReactNode;
  render: boolean;
}
export default function Conditional({
  children,
  render,
  ...props
}: ConditionalProps) {
  if (!render) return;
  return <>{children}</>;
}
