import { sineOut } from "svelte/easing";

export function useDarkMode() : boolean {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function cssHexWithAlpha(hexStr: string, alpha: number) {
    return `rgb(from ${hexStr} r g b / ${alpha})`
}

export function fadeIn(node: HTMLElement, params: { delay?: number, duration?: number, easing?: (t: number) => number }) {
    return {
        delay: params.delay || 0,
        duration: params.duration || 400,
        easing: params.easing || sineOut,
        css: (t: number, u: number) => `opacity: ${t*100}%; transform: translate(0, ${u*20}px)`
    };
}