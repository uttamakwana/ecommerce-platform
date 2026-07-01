import { Suspense } from "react";
import { PageLoader } from "./page-loader";

export const withSuspense = (component: React.ReactNode) => (
  <Suspense fallback={<PageLoader />}>{component}</Suspense>
);
