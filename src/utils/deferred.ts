export function createDeferred<P>() {
  let resolve: (value: P | PromiseLike<P>) => void
  let reject: (reason?: any) => void
  const promise = new Promise<P>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve: resolve!, reject: reject! }
}
