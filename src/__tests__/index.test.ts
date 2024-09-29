import { LogType } from "../beautify-console/model";
import BeautifyConsole from "../index";

test("SDK getHostInfo", () => {
  const log = BeautifyConsole.getInstance();
  expect(log.info(1234, "4", [3, 5])).toBe(undefined);
  expect(log.log({ name: "chengzan" })).toBe(undefined);
  expect(log.close().warn(1234)).toBe(undefined);
  expect(log.open().log(1234)).toBe(undefined);
  expect(log.error(1234)).toBe(undefined);
  expect(log.warn(1234)).toBe(undefined);
  expect(
    log
      .setPadStartText({
        title: "hello world ->",
        logType: 'info',
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
