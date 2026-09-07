export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
      <div className="h-8 w-8 rounded-full border-2 border-brand-primary-light border-t-brand-primary animate-spin mb-3" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function ErrorState({
  message = "Something went wrong.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-sm text-gray-600 mb-3">{message}</p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="text-sm font-medium text-brand-primary underline"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-16 text-center text-sm text-gray-500">
      {message}
    </div>
  );
}
