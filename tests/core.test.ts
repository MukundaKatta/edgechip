import { describe, it, expect } from "vitest";
import { Edgechip } from "../src/core.js";
describe("Edgechip", () => {
  it("init", () => { expect(new Edgechip().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Edgechip(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Edgechip(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
