"use client";

import ServerErrorPage from "../components/ServerErrorPage/ServerErrorPage";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return <ServerErrorPage onReset={reset} />;
}
