import type { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";
import { useRef } from "react";

type TUseObserverOptions<T> = {
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<T, unknown>, Error>>;
}
export function useObserver<T>(options: TUseObserverOptions<T>) {
    const observer = useRef<IntersectionObserver | null>(null);

    const lastItemRef = <T extends HTMLElement>(node: T | null) => {
        if (options.isFetchingNextPage) return;

        observer.current?.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && options.hasNextPage) {
                options.fetchNextPage();
            }
        });

        if (node) {
            observer.current.observe(node);
        }
    };

    return { lastItemRef };
}