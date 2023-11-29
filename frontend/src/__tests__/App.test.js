import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

// Test to ensure that the app renders without errors
test("renders the app", () => {
  // Render the App component
  const { getByText } = render(<App />);
  // Check if the text "Github User Search" is present in the rendered content
  const linkElement = getByText(/Github User Search/i);
  // Assert that the text is in the document (indicating that the component rendered successfully)
  expect(linkElement).toBeInTheDocument();
});
