const next = require("next");
const request = require("supertest");

describe("Test custom next server", () => {
  it("should prepare a custom nextjs server", async () => {
    const app = next({
      dev: false, // Production build needs to exist to run unit test

      // This fixes the seg fault...
      conf: require("./next.config"),
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
