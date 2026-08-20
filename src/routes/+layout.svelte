<script lang="ts">
    import "@/app.css";
    import '@/i18n';
    import { P5Canvas, disableFES } from "svelte-p5";
    import type p5 from 'p5';
    import { useDarkMode } from "@/utils";
    import { isLoading } from 'svelte-i18n'
    import { asset } from "$app/paths";

    disableFES()
    let cols = 0.0
    let rows = 0.0
    let drawnFirst = false
    const spacing = 40.0
    const radius = 9.0
    const minRadius = 2.0
    const minRadDistance = 170.0

    const sketch = (p: p5) => {
        const getGridSizes = () => {
            cols = p.ceil(p.width / spacing)
            rows = p.ceil(p.height / spacing)
        }

		p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight)
            p.noLoop()
            p.noStroke()

            getGridSizes()
        }

        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight)
            getGridSizes()

            p.redraw()
        }

        p.mouseMoved = () => {
            drawnFirst = true
            p.redraw()
        }
		
        p.draw = () => {
			p.clear()
            const dark = useDarkMode()

            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    if ((c+r)%2 !== 0) {
                        continue
                    }

                    const center = [spacing*c, spacing*r]
                    let fact = 1.0

                    if (drawnFirst) {
                        const dist = p.dist(p.mouseX, p.mouseY, center[0], center[1])
                        fact = p.constrain(dist/minRadDistance, 0.0, 1.0)
                    }

                    let rad = p.lerp(radius, minRadius, fact)

                    p.fill(dark ? p.color(255, 0.4 * 255) : p.color(0, 0.4 * 255))
                    p.circle(center[0], center[1], rad);
                }
            }
		}
	};

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={asset('/favicon.svg')} />
    <title>AndreaTerenz</title>
</svelte:head>

{#if !$isLoading}
<P5Canvas {sketch} class="absolute z-[-1] top-0 left-0"/>
<div class="absolute max-w-[950px] size-full overflow-y-hidden">
    <div class="size-full p-5 relative overflow-y-auto lg:overflow-y-hidden">
        {@render children()}
    </div>
</div>
{/if}

<style>
</style>
