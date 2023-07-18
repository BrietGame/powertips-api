// Tester si Guide.findById() fonctionne
const { Guide, assert } = require("./guide.test.js");

describe("Guide.findById()", () => {
    it("should return a guide", () => {
        Guide.findById(1, (err, res) => {
            if (err) {
                console.log("error: ", err);
                return;
            }
            assert.equal(res[0].id, 1);
        })
    })
})

describe("Guide.create()", () => {
    it("should create a guide", () => {
        const newGuide = {
            title: "Test",
            slug: "test",
            content: "Test",
            category_id: 1,
            user_id: 1
        }
        Guide.create(newGuide, (err, res) => {
            if (err) {
                console.log("error: ", err);
                return;
            }
            assert.equal(res.affectedRows, 1);
        })
    })
})