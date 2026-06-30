import type { PropsWithChildren } from "react";

type TContainerProps = PropsWithChildren;

export function Container({ children }: TContainerProps) {
  return <div className="mx-auto bg-white rounded-xl shadow-sm flex flex-col gap-4">{children}</div>;
}
