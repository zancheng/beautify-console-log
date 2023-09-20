const path = require('path');

import { BeautifyConsole } from '../beautify-console';

// test('comp', () => {
//   const id = simulate.load(path.join(__dirname, './comp/index')) // 加载自定义组件，返回组件 id
//   const comp = simulate.render(id) // 使用 id 渲染自定义组件，返回组件封装实例

//   const parent = document.createElement('parent-wrapper') // 创建容器节点
//   comp.attach(parent) // 将组件插入到容器节点中，会触发 attached 生命周期

//   expect(comp.dom.innerHTML).toBe('<wx-view>example</wx-view>') // 判断组件渲染结果
//   // 执行其他的一些测试逻辑

//   comp.detach() // 将组件从容器节点中移除，会触发 detached 生命周期
// })
test('SDK getHostInfo', () => {
  const log = BeautifyConsole.getInstance()

  log.info(1234, '4', [3, 5])
  expect(log.info(1234, '4', [3, 5])).toBe(undefined);

  log.log(1234)
  expect(log.log(1234)).toBe(undefined);

  log.close().warn(1234)
  expect(log.close().warn(1234)).toBe(undefined);

  log.open().log(1234)
  expect(log.open().log(1234)).toBe(undefined);

  log.error(1234)
  expect(log.error(1234)).toBe(undefined);

  log.warn(1234)
  expect(log.warn(1234)).toBe(undefined);

  log.setPadStartText('log', 'hello world').log(1234)
  expect(log.setPadStartText('log', 'hello world').log(1234)).toBe(undefined);
});

// todo 加入加解密测试

// todo 加入工具测试
// const automator = require('miniprogram-automator')
// automator.launch({
//   // cliPath: 'path/to/cli', // 工具 cli 位置，如果你没有更改过默认安装位置，可以忽略此项
//   projectPath: '/Users/chengzan/uiot-aiot-wechat-sdk/example', // 项目文件地址
// }).then(async miniProgram => {
//   const page = await miniProgram.reLaunch('/pages/index')
//   await page.waitFor(500)

//   await miniProgram.close()
// })

// todo 加入mqtt测试

// 
