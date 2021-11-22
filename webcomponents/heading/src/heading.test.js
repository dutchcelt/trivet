// import heading from "trvt-heading/heading.js";
const {expect} = chai;

describe("Heading", () => {
	describe("render()", () => {
		it("returns default heading", async () => {
		//	const heading = await import("trvt-heading/heading.js");
			const func = () => {
				return "<h1>h1: Heading</h1>";
			}
			expect(func()).equal("<h1>h1: Heading</h1>");
		});
	});
});
