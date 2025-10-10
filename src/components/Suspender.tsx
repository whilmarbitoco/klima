import { Spinner } from "./Spinner";

interface SuspenderProps {
  condition: boolean;
  className?: string;
  header?: string;
  children: React.ReactNode;
}

export default function Suspender({
  condition,
  header,
  children,
  className = "w-full h-full flex items-center justify-center",
}: SuspenderProps) {
  if (condition) {
    return <>{children}</>;
  }

  return (
    <div className={className}>
      <Spinner message={header} />
    </div>
  );
}
