import { useIdle } from "@vueuse/core"

export const { idle } = useIdle(100, { events: ["mousemove", "keydown"] })
