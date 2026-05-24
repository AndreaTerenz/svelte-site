export function useDarkMode() : boolean {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
}