import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type Dispatch,
    type SetStateAction,
} from "react";

type TUseStorageReturn<T> = readonly [T, Dispatch<SetStateAction<T>>];

export function useStorage<T>(
    key: string,
    defaultValue: T | (() => T),
    type: "local" | "session",
): TUseStorageReturn<T> {
    const readDefault = useCallback(
        (): T =>
            typeof defaultValue === "function"
                ? (defaultValue as () => T)()
                : defaultValue,
        [defaultValue],
    );

    const [value, setValue] = useState<T>(() => {
        const storage = type === "local" ? window.localStorage : window.sessionStorage;
        if (storage) {
            try {
                const stored = storage.getItem(key);
                if (stored !== null) return JSON.parse(stored) as T;
            } catch (error) {
                console.error(`useStorage: failed to read key "${key}"`, error);
            }
        }
        return readDefault();
    });

    // Track the latest value so the cross-tab listener can avoid redundant writes.
    const valueRef = useRef<T>(value);
    
    // Persist to storage whenever the value or key changes.
    useEffect(() => {
        valueRef.current = value;
        const storage = type === "local" ? window.localStorage : window.sessionStorage;
        if (!storage) return;

        try {
            if (value === undefined) {
                storage.removeItem(key);
            } else {
                storage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error(`useStorage: failed to write key "${key}"`, error);
        }
    }, [key, value, type]);

    // Keep state in sync when the same key changes in another tab/window.
    useEffect(() => {
        if (type !== "local") return;

        const handleStorage = (event: StorageEvent) => {
            if (event.storageArea !== window.localStorage || event.key !== key) {
                return;
            }
            try {
                const next =
                    event.newValue === null
                        ? readDefault()
                        : (JSON.parse(event.newValue) as T);
                setValue(next);
            } catch (error) {
                console.error(`useStorage: failed to sync key "${key}"`, error);
            }
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [key, type, readDefault]);

    return [value, setValue] as const;
}

export function useLocalStorage<T>(
    key: string,
    defaultValue: T | (() => T),
): TUseStorageReturn<T> {
    return useStorage(key, defaultValue, "local");
}
