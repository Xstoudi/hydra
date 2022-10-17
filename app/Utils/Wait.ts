export default function wait(timeMS: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeMS)
  })
}
