"use client";

import ServerErrorPage from "../components/ServerErrorPage/ServerErrorPage";

export default function Error({ reset }) {
  return <ServerErrorPage onReset={reset} />;
}
