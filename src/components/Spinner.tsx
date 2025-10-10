import { Loader2Icon } from "lucide-react";

function Spinner({ message = "Please Wait..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center flex-1 gap-1.5 text-gray-100">
      <Loader2Icon
        role="status"
        aria-label="Loading"
        className="size-4 animate-spin"
      />
      <p>{message}</p>
    </div>
  );
}

export { Spinner };
