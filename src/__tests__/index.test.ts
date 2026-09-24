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

describe("formatConsoleStr", () => {
  test("falsy arguments are kept instead of swallowed", () => {
    expect(formatConsoleStr("val=%s", 0)).toStrictEqual(["val=", "0", ""]);
    expect(formatConsoleStr("val=%d", 0)).toStrictEqual(["val=", 0, ""]);
    expect(formatConsoleStr("v=%s", false)).toStrictEqual([
      "v=",
      "false",
      "",
    ]);
  });

  test("%f placeholder is formatted", () => {
    expect(formatConsoleStr("f=%f", 3.14)).toStrictEqual(["f=", 3.14, ""]);
  });

  test("arguments not consumed by placeholders are appended", () => {
    expect(formatConsoleStr("a=%s b=%s", "x", "y", "z")).toStrictEqual([
      "a=",
      "x",
      " b=",
      "y",
      "",
      "z",
    ]);
  });

  test("repeated placeholders consume arguments in order", () => {
    // 首尾都是占位符时，split 会在两端各留下一个空片段
    expect(formatConsoleStr("%s-%s", "a", "b")).toStrictEqual([
      "",
      "a",
      "-",
      "b",
      "",
    ]);
  });

  test("returns remaining args when there is no format string", () => {
    expect(formatConsoleStr("plain", 1)).toStrictEqual(["plain", 1]);
    expect(formatConsoleStr(1)).toStrictEqual([]);
  });

  test("%o keeps the original behavior across value kinds", () => {
    expect(formatConsoleStr("o=%o", { a: 1 })).toStrictEqual([
      "o=",
      '{"a":1}',
      "",
    ]);

    const circular: Record<string, unknown> = {};
    circular.self = circular;
    expect(formatConsoleStr("o=%o", circular)).toStrictEqual([
      "o=",
      "[Circular]",
      "",
    ]);

    // Error 的属性不可枚举，需要白名单才能序列化出来
    const formatted = formatConsoleStr("e=%o", new Error("boom"));
    expect(formatted[0]).toBe("e=");
    expect(String(formatted[1])).toContain('"message":"boom"');
  });
});

describe("setPadStartText", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const emitInfoAfter = (act: (log: BeautifyConsole) => void) => {
    const spy = jest
      .spyOn(console, "info")
      .mockImplementation(() => undefined);
    const log = new BeautifyConsole();
    log.setPadStartText({ title: "MY-TITLE", logType: "info" });
    spy.mockClear();
    act(log);
    const calls = spy.mock.calls;
    return calls.length > 0 ? String(calls[0][0]) : "";
  };

  test("custom title survives open()", () => {
    // open/close/reset/config 都会重建绑定，之前会退回成默认的标题
    expect(emitInfoAfter((log) => log.open().info("x"))).toContain("MY-TITLE");
  });

  test("custom title survives reset()", () => {
    expect(emitInfoAfter((log) => log.reset().info("x"))).toContain("MY-TITLE");
  });

  test("custom title survives close().open()", () => {
    expect(
      emitInfoAfter((log) => log.close().open().info("x")),
    ).toContain("MY-TITLE");
  });

  test("custom title survives config()", () => {
    expect(
      emitInfoAfter((log) => {
        log.config({ type: ["info"] });
        log.info("x");
      }),
    ).toContain("MY-TITLE");
  });

  test("unsupported logType reports an error instead of throwing", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    const log = new BeautifyConsole();
    expect(() =>
      log.setPadStartText({ title: "t", logType: "nope" as LogType }),
    ).not.toThrow();
    expect(spy).toHaveBeenCalled();
  });
});

describe("console method binding", () => {
  // 日志方法必须保持 bind 形式：bind 不产生额外的 JS 调用帧，
  // 浏览器 DevTools 才能把行号定位到调用方的代码行。
  // 一旦改成包装函数/箭头函数，README 主打的行号能力就会失效。
  test("log methods stay bound to console", () => {
    const log = new BeautifyConsole();
    expect(log.info.name.startsWith("bound ")).toBe(true);
    expect(log.log.name.startsWith("bound ")).toBe(true);
    expect(log.warn.name.startsWith("bound ")).toBe(true);
    expect(log.error.name.startsWith("bound ")).toBe(true);
  });

  test("setPadStartText rebuilds with bind too", () => {
    const log = new BeautifyConsole();
    log.setPadStartText({ title: "T", logType: "info" });
    expect(log.info.name.startsWith("bound ")).toBe(true);
  });
});
