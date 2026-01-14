# Can I Retire In? - Mobile App

A React Native mobile app built with Expo for tracking finances and discovering retirement destinations.

## Features

- **Retirement Calculator**: Find countries where you can retire based on your savings, income, and lifestyle preferences
- **Net Worth Tracker**: Track your assets, liabilities, and net worth over time with historical snapshots
- **Financial Tracker**: Monitor income, expenses, budgets, and savings goals

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your iOS or Android device (for testing)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## Project Structure

```
caniretirein/
├── App.js                 # Main app component with navigation
├── screens/               # Screen components
│   ├── RetirementCalculatorScreen.js
│   ├── NetWorthScreen.js
│   └── FinancialTrackerScreen.js
├── utils/                 # Utility functions
│   ├── storage.js        # AsyncStorage wrapper
│   └── currency.js       # Currency conversion utilities
├── data/                  # Data files
│   └── countryData.js    # Country cost data
└── package.json
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser

## Features by Screen

### Retirement Calculator
- Input savings, monthly income, lifestyle preference, and retirement duration
- View eligible countries sorted by cost
- Currency conversion support

### Net Worth Tracker
- Track assets (cash, investments, property, other)
- Track liabilities (credit cards, loans, other)
- Save historical snapshots
- View net worth trends over time with charts

### Financial Tracker
- Add income and expense transactions
- Set budgets by category with progress tracking
- Create savings goals with progress visualization
- View expense breakdown by category (pie chart)
- Financial summary dashboard

## Data Storage

All data is stored locally on the device using AsyncStorage. No data is sent to external servers.

## Notes

- This app is for educational purposes only
- Cost estimates are approximate and may vary
- Not financial, tax, or immigration advice
- Currency conversion rates are approximate and should be updated regularly

## Converting from Web App

This mobile app is converted from the original HTML/CSS/JavaScript web application. Key changes:

- HTML → React Native components (View, Text, etc.)
- CSS → StyleSheet
- localStorage → AsyncStorage
- D3.js maps → Simplified list view (map visualization can be added later)
- Chart.js → react-native-chart-kit

## Future Enhancements

- Interactive world map visualization
- Stock portfolio tracking with real-time prices
- Recurring transaction automation
- Export data to CSV/PDF
- Cloud sync across devices
- Dark mode support

## Support

Need help? Get support through:

- **Email**: support@caniretirein.app
- **GitHub Issues**: [Report bugs or request features](https://github.com/zztttttt/caniretirein/issues)
- **Support Page**: [View our support page](https://zztttttt.github.io/caniretirein/support.html) (if hosted on GitHub Pages)

## License

MIT
