// App.test.js
import React from "react";
import renderer from "react-test-renderer";
import App from "../App";

// Snapshot test for the App component
test("App snapshot", () => {
  // Create a renderer for the App component
  const component = renderer.create(<App />);
  // Generate a JSON snapshot of the rendered component
  const tree = component.toJSON();
  // Compare the generated snapshot with the stored snapshot
  expect(tree).toMatchSnapshot();
});
