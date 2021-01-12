// 解题思路：
// 1. 先执行完所有同步任务，再微任务，再宏任务
// 2. 同种任务分优先级执行，宏任务执行完再执行微任务

setImmediate(() => {
  console.log('immediate')
})

async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})

process.nextTick(() => {
  console.log('nextTick')
})

console.log('script end')
