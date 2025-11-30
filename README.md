# Tariff Impact Estimator

A React application that visualizes trade value and duty percentages of US import tariffs on a world map.

## Features

- Interactive choropleth world map showing trade value or duty percentages
- Toggle between displaying duty percentages and trade values
- Input controls for country, trade value, entry date, and mode of transport
- Detailed results display with calculated duties
- Responsive design using Material UI components

## Technology Stack

- React with TypeScript
- Material UI for UI components
- react-simple-maps for choropleth map visualization
- d3-scale for color scaling

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm (v7+)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tariff-impact-estimator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

1. **View the map**: The main screen shows a world map with countries colored according to duty percentage or trade value.

2. **Toggle data display**: Use the toggle button above the map to switch between viewing duty percentages and trade values.

3. **Input trade details**:
   - Select a country from the dropdown menu
   - Enter the trade value in USD
   - Select the entry date
   - Choose the mode of transport (Ocean, Air, or Ground)
   - Enable advanced options if needed

4. **View results**: The results section shows the calculated duty amount based on the input parameters.

5. **Interact with the map**: Click on any country to select it for calculation.

## Data Sources

This application uses sample data for demonstration purposes. In a real-world scenario, you would integrate with:

- US Customs and Border Protection (CBP) for tariff rates
- Harmonized Tariff Schedule (HTS) codes
- Trade agreement databases
- Section 301 tariffs and other special duties

## Customization

### Adding More Countries

To add more countries, update the `countryMapping.ts` file in the `src/data` directory.

### Modifying Duty Calculation

The duty calculation logic is in `dutyCalculator.ts` in the `src/utils` directory. Customize this to implement more complex duty calculations based on HS codes, trade agreements, etc.

## Building for Production

To build the application for production deployment:

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
