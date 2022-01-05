const next = require("next");
const request = require("supertest");

const SegfaultHandler = require("segfault-handler");
SegfaultHandler.registerHandler("crash.log");

describe("Test custom next server", () => {
  it("should prepare a custom nextjs server", async () => {
    const app = next({
      dev: false, // Production build needs to exist to run unit test
    });

    console.log(
      `before failure -> error Command failed with signal "SIGSEGV".`
    );
    await app.prepare();
    console.log("after failure");

    const response = await request(app.getRequestHandler())
      .get("/")
      .expect(200);

    // Verify the page is well formed
    expect(response.text).toContain("__NEXT_DATA__");
    expect(response.text).toContain("<div>Welcome to Next.js!</div>");
  });
});
