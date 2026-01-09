# World Map Visualization - Grey to Green

A world map visualization that displays countries in grey and can transition to green, similar to a political world map but with a customizable color scheme.

## Features

- Interactive world map showing all countries
- Highlighted countries from the bubble chart (Mexico, Belize, Panama, Costa Rica, Ecuador, Spain, Portugal, Thailand, Vietnam, Malaysia, Cambodia)
- Smooth color transitions between grey and green
- Hover effects for better interactivity

## How to Use

1. Open `index.html` in a web browser
2. Use the buttons to:
   - **Grey**: Set all countries to grey (highlighted countries in darker grey)
   - **Green**: Set all countries to green (highlighted countries in darker green)
   - **Animate Transition**: Automatically transitions from grey to green

## Technical Details

- Uses D3.js for map rendering
- Uses TopoJSON for efficient map data
- Responsive design with smooth transitions
- Map data loaded from CDN (requires internet connection)

## Customization

To modify which countries are highlighted, edit the `highlightCountries` array in `map.js`.
