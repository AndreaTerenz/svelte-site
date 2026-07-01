export function useDarkMode() : boolean {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function cssHexWithAlpha(hexStr: string, alpha: number) {
    return `rgb(from ${hexStr} r g b / ${alpha})`
}