import type { PropsWithChildren } from "react";

type TContainerProps = PropsWithChildren;

export function Container({ children }: TContainerProps) {
  return <div className="border mx-auto bg-background rounded-xl shadow-sm flex flex-col gap-4">{children}</div>;
}
