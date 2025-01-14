import { formatConsoleStr } from "../utils";
import { ColorType, LogType } from "../beautify-console/model";
import BeautifyConsole from "../index";

test("BeautifyConsole test", () => {
  const log = BeautifyConsole.getInstance();
  const log2 = new BeautifyConsole();
  log2.info('log2', 111111);
  expect(log.info(1234, "4", [3, 5])).toBe(undefined);
  expect(formatConsoleStr("string=%s number=%d", "string", 1)).toStrictEqual([
    "string=",
    "string",
    " number=",
    1,
    "",
  ]);
  log.config({
    title: '222',
    type: ['error', 'info', 'log'],
  })
  log.setPadStartText({
    style: {
      color: "green",
      bgColor: ColorType.blue,
    },
    title: "",
    logType: "info"
  })
  log.setPadStartText({
    style: {
      color: "green",
      bgColor: ColorType.blue,
    },
    title: "",
    logType: "info"
  })
  expect(
    log.info(formatConsoleStr("string=%s number=%d", "string", 1).join("")),
  ).toBe(undefined);
  expect(
    log.info(formatConsoleStr("object=%o", { name: "chengzan" }).join("")),
  ).toBe(undefined);
  expect(log.log({ name: "chengzan" })).toBe(undefined);
  expect(log.close().warn('warn')).toBe(undefined);
  expect(log.open().log('log')).toBe(undefined);
  expect(log.error('error')).toBe(undefined);
  expect(log.warn('warn')).toBe(undefined);
  expect(
    log
      .setPadStartText({
        title: "hello world ->",
        logType: "info",
      })
      .log(1234),
  ).toBe(undefined);
  expect(
    log
      .setPadStartText({
        title: "hello world ->",
        logType: LogType.info,
      })
      .info("info"),
  ).toBe(undefined);
});
