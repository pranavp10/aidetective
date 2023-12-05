import { setSluggerSlugOnBoot } from "./set-default-slug-sluger";

export function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        setSluggerSlugOnBoot()
    }

}
