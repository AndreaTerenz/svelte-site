import { asset } from "$app/paths"
import data from "$lib/data.json"
import { toStringArray } from "@/utils"

export function projectImageUrl(cat: number, cont: number, imgIdx: number) {
    const contentData = data[cat]?.content[cont] ?? null

    if (!contentData) {
        return ""
    }

    if (contentData.image === "#") {
        return asset("/favicon.svg")
    }

    const imgs = toStringArray(contentData.image)
    const maxIdx = imgs.length

    let path = imgs[imgIdx % maxIdx]

    if ("id" in contentData) {
        path = `${contentData.id}/${path}`
    }

    const catId = data[cat].id

    return asset(`/projects/${catId}/${path}`)
}