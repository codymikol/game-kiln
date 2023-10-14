export const noop = (): void => {}

export const each = (object: {}, fn: (item: any) => void): void => {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            fn(object[key])
        }
    }
}