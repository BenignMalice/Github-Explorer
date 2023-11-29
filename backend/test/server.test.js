// Import necessary modules
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

// Configure Chai
chai.use(chaiHttp);
const { expect } = chai;

describe("GET /api/users/:username", () => {
  it("responds with JSON containing user data", async () => {
    const response = await chai.request(app).get("/api/users/benignmalice");
    expect(response).to.have.status(200);
    expect(response.body)
      .to.be.an("object")
      .that.has.property("login")
      .equal("BenignMalice");
  });
});

describe("GET /api/users/:username/repos", () => {
  it("responds with JSON containing user repositories", async () => {
    const response = await chai
      .request(app)
      .get("/api/users/benignmalice/repos");
    expect(response).to.have.status(200);
    expect(response.body).to.be.an("array");
  });
});

describe("GET /api/users/:username/repos/:repoName", () => {
  it("responds with JSON containing repository details", async () => {
    const response = await chai
      .request(app)
      .get("/api/users/benignmalice/repos/github-explorer");
    expect(response).to.have.status(200);
    expect(response.body)
      .to.be.an("object")
      .that.has.property("name")
      .equal("Github-Explorer");
  });
});
