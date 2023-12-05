// Import necessary modules
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

// Configure Chai
chai.use(chaiHttp);
const { expect } = chai;

// Test suite for the GET request at '/api/users/:username'
describe("GET /api/users/:username", () => {
  // This test checks if the server responds with the correct user data in JSON format
  it("responds with JSON containing user data", async () => {
    // Making a GET request to the specified route
    const response = await chai.request(app).get("/api/users/benignmalice");
    // Expect the response to have a 200 status code
    expect(response).to.have.status(200);
    // Expect the response body to be an object containing the 'login' property with a specific value
    expect(response.body)
      .to.be.an("object")
      .that.has.property("login")
      .equal("BenignMalice");
  });
});

// Test suite for the GET request at '/api/users/:username/repos'
describe("GET /api/users/:username/repos", () => {
  // This test checks if the server responds with the user's repositories in JSON format
  it("responds with JSON containing user repositories", async () => {
    // Making a GET request to the specified route
    const response = await chai
      .request(app)
      .get("/api/users/benignmalice/repos");
    expect(response).to.have.status(200);
    expect(response.body).to.be.an("array");
  });
});

// Test suite for the GET request at '/api/users/:username/repos/:repoName'
describe("GET /api/users/:username/repos/:repoName", () => {
  // This test checks if the server responds with details of a specific repository in JSON format
  it("responds with JSON containing repository details", async () => {
    // Making a GET request to the specified route
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
