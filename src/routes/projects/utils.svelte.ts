import { asset } from "$app/paths"
import data from "$lib/data.json"
import { toStringArray } from "@/utils"

export function projectImageUrl(cat: number, cont: number, imgIdx: number, hd: boolean = false) {
    const contentData = data[cat]?.content[cont] ?? null

    if (!contentData) {
        return ""
    }

    if (contentData.image === "#") {
        return asset("/favicon.svg")
    }

    let imgs = contentData.image

    if (hd && "imageHD" in contentData && contentData.imageHD) {
        imgs = contentData.imageHD
    }
    
    imgs = toStringArray(imgs)

    const maxIdx = imgs.length

    let path = imgs[imgIdx % maxIdx]

    if ("id" in contentData) {
        path = `${contentData.id}/${path}`
    }

    const catId = data[cat].id

    return asset(`/projects/${catId}/${path}`)
}