/// <reference types="vite/client" />

declare global {
    interface Window {
        twttr?: {
            widgets: {
                load: (element?: HTMLElement | null) => Promise<void>;
            };
        };
    }
}

export {};
