/* eslint-disable no-undef */

// Import necessary dependencies and functions
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import Provider to provide the Redux store to components
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for simulating routing
import Home from '../pages/Home'; // Import the component you want to test
import store from '../redux/store'; // Import the Redux store you want to use for testing

test('renders Home component', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>,
  );

  // Uses Jest's `expect` function to compare the rendered component with a snapshot
  // The `asFragment()` function returns a representation of the rendered component
  // and the snapshot will be compared against this representation
  expect(asFragment()).toMatchSnapshot();
});
