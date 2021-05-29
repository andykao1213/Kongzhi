import { getValueByPath, setValueByPath } from "./libs";

describe("getValueByPath", () => {
  it("should get all data correctly", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const array = [1, 2, 3, 4];
    expect(getValueByPath(obj)).toEqual({ a: 1, b: 2, c: 3 });
    expect(getValueByPath(array)).toEqual([1, 2, 3, 4]);
  });

  it("should get correct data from first level", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const array = [1, 2, 3, 4];
    expect(getValueByPath(obj, "a")).toBe(1);
    expect(getValueByPath(array, "[3]")).toBe(4);
  });

  it("should get correct data from nested level", () => {
    const obj = { a: { a1: 1, a2: 2 }, c: [3, 4, 5] };
    const array = [null, obj];
    expect(getValueByPath(obj, "a.a1")).toBe(1);
    expect(getValueByPath(obj, "c[1]")).toBe(4);
    expect(getValueByPath(array, "[1].a.a2")).toBe(2);
    expect(getValueByPath(array, "[1].c[0]")).toBe(3);
  });
});

describe("setValueByPath", () => {
  it("set all value should work correctly", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const array = [1, 2, 3, 4];
    const resultObj = setValueByPath(obj, undefined, { a: 11, b: 22 });
    expect(resultObj).toEqual({ a: 11, b: 22 });
    const resultArr = setValueByPath(array, undefined, [7, 8, 9]);
    expect(resultArr).toEqual([7, 8, 9]);
  });

  it("should set correct value to first level", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const array = [1, 2, 3, 4];
    const resultObj = setValueByPath(obj, "a", 10);
    expect(resultObj.a).toBe(10);
    const resultArr = setValueByPath(array, "2", 10);
    expect(resultArr[2]).toBe(10);
  });

  it("should set correct value to nested level", () => {
    const obj = { a: { a1: 1, a2: 2 }, c: [3, 4, 5] };
    const array = [null, { a: { a1: 1, a2: 2 }, c: [3, 4, 5] }];
    const resultObj1 = setValueByPath(obj, "a.a2", 10);
    expect(resultObj1.a.a2).toBe(10);
    const resultObj2 = setValueByPath(obj, "c[1]", 10);
    expect(resultObj2.c[1]).toBe(10);
    const resultArr1 = setValueByPath(array, "[1].a.a2", -1);
    expect(resultArr1[1]?.a.a2).toBe(-1);
    const resultArr2 = setValueByPath(array, "[1].c[2]", -2);
    expect(resultArr2[1]?.c[2]).toBe(-2);
  });
});
