import { describe, expect, it } from "vitest";
import { createFileSet, findFile, hasAnyFile, hasFile } from "../src/files.js";

describe("file lookup helpers", () => {
  it("normalizes indexed paths for constant-time lookups", () => {
    const files = ["src\\index.ts", "README.md"];
    const fileSet = createFileSet(files);

    expect(hasFile(fileSet, "src/index.ts")).toBe(true);
    expect(hasFile({ files, fileSet }, "src/index.ts")).toBe(true);
    expect(hasFile({ files, fileSet }, "src/missing.ts")).toBe(false);
  });

  it("keeps array fallback and candidate searches stable", () => {
    const files = ["readme.md", "package.json"];

    expect(hasFile(files, "readme.md")).toBe(true);
    expect(hasAnyFile(files, ["README.md", "readme.md"])).toBe(true);
    expect(findFile(files, ["README.md", "readme.md"])).toBe("readme.md");
  });
});
