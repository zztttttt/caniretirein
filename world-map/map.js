// World Map Visualization - Grey to Green Transition
const width = 1200;
const height = 600;

const svg = d3.select("#world-map")
    .attr("width", width)
    .attr("height", height);

// Create a group for countries
const countriesGroup = svg.append("g").attr("id", "countries-group");

const projection = d3.geoMercator()
    .scale(150)
    .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

// Tooltip element
const tooltip = d3.select("#countryTooltip");

// Countries to highlight (from the bubble chart)
const highlightCountries = [
    'Mexico', 'Belize', 'Panama', 'Costa Rica', 'Ecuador',
    'Spain', 'Portugal', 'Thailand', 'Vietnam', 'Malaysia', 'Cambodia'
];

let currentColorMode = 'grey'; // 'grey' or 'green'
let mapLoaded = false;

// Load world map data
d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
    .then(function(world) {
        const countries = topojson.feature(world, world.objects.countries);
        
        // Draw countries
        const countryPaths = countriesGroup.selectAll(".country")
            .data(countries.features)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("fill", function(d) {
                // Start all countries with light grey - clean slate
                return '#d3d3d3';
            })
            .attr("data-name", function(d) {
                return d.properties.NAME || d.properties.name;
            })
            .on("mouseover", function(event, d) {
                const countryName = d.properties.NAME || d.properties.name;
                // Use the name mapping function if available, otherwise try direct match
                let countryData = null;
                if (typeof findCountryByName === 'function') {
                    countryData = findCountryByName(countryName);
                } else if (window.countryData) {
                    countryData = window.countryData.find(c => c.name === countryName);
                    if (!countryData) {
                        countryData = window.countryData.find(c => c.name.toLowerCase() === countryName.toLowerCase());
                    }
                }
                
                // Get mouse position relative to map container
                const mapContainer = d3.select("#map-container").node();
                const rect = mapContainer.getBoundingClientRect();
                const [x, y] = d3.pointer(event, mapContainer);
                
                // Show tooltip with country info
                let tooltipContent = `<div class="tooltip-country-name">${countryName}</div>`;
                
                if (countryData && countryData.monthlyCost) {
                    // Show national average
                    tooltipContent += `
                        <div style="font-size: 11px; color: #666; margin-bottom: 6px; font-style: italic;">National Average:</div>
                        <div class="tooltip-cost-item">
                            <span class="tooltip-cost-label">Modest:</span>
                            <span class="tooltip-cost-value">$${countryData.monthlyCost.modest.toLocaleString()}/month</span>
                        </div>
                        <div class="tooltip-cost-item">
                            <span class="tooltip-cost-label">Comfortable:</span>
                            <span class="tooltip-cost-value">$${countryData.monthlyCost.comfortable.toLocaleString()}/month</span>
                        </div>
                        <div class="tooltip-cost-item">
                            <span class="tooltip-cost-label">Luxurious:</span>
                            <span class="tooltip-cost-value">$${countryData.monthlyCost.luxurious.toLocaleString()}/month</span>
                        </div>
                    `;
                    
                    // Show regional breakdown if available
                    if (countryData.regions && countryData.regions.length > 0) {
                        tooltipContent += `<div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee; font-size: 11px; color: #666; font-weight: bold;">Regional Variations:</div>`;
                        countryData.regions.forEach(region => {
                            tooltipContent += `
                                <div style="margin-top: 6px; font-size: 11px;">
                                    <div style="color: #2a6599; font-weight: 600; margin-bottom: 2px;">${region.name}</div>
                                    <div style="padding-left: 8px; color: #555;">
                                        Modest: $${region.monthlyCost.modest.toLocaleString()} | 
                                        Comfortable: $${region.monthlyCost.comfortable.toLocaleString()} | 
                                        Luxurious: $${region.monthlyCost.luxurious.toLocaleString()}
                                    </div>
                                </div>
                            `;
                        });
                    }
                } else {
                    tooltipContent += `<div style="color: #999; font-size: 12px; margin-top: 4px;">Cost data not available</div>`;
                }
                
                // Position tooltip, keeping it within bounds
                const tooltipWidth = countryData && countryData.regions ? 350 : 280;
                const tooltipHeight = countryData && countryData.regions ? 400 : 150;
                let tooltipX = x + 15;
                let tooltipY = y - 10;
                
                // Adjust if tooltip would go off right edge
                if (tooltipX + tooltipWidth > width) {
                    tooltipX = x - tooltipWidth - 15;
                }
                // Adjust if tooltip would go off bottom edge
                if (tooltipY + tooltipHeight > height) {
                    tooltipY = y - tooltipHeight - 10;
                }
                // Adjust if tooltip would go off top edge
                if (tooltipY < 0) {
                    tooltipY = 10;
                }
                
                tooltip
                    .html(tooltipContent)
                    .style("display", "block")
                    .style("left", tooltipX + "px")
                    .style("top", tooltipY + "px");
            })
            .on("mouseout", function(event, d) {
                // Hide tooltip
                tooltip.style("display", "none");
            })
            .on("mousemove", function(event, d) {
                // Update tooltip position as mouse moves
                const mapContainer = d3.select("#map-container").node();
                const [x, y] = d3.pointer(event, mapContainer);
                
                const tooltipWidth = 350;
                const tooltipHeight = 400;
                let tooltipX = x + 15;
                let tooltipY = y - 10;
                
                // Adjust if tooltip would go off right edge
                if (tooltipX + tooltipWidth > width) {
                    tooltipX = x - tooltipWidth - 15;
                }
                // Adjust if tooltip would go off bottom edge
                if (tooltipY + tooltipHeight > height) {
                    tooltipY = y - tooltipHeight - 10;
                }
                // Adjust if tooltip would go off top edge
                if (tooltipY < 0) {
                    tooltipY = 10;
                }
                
                tooltip
                    .style("left", tooltipX + "px")
                    .style("top", tooltipY + "px");
            });
        
        mapLoaded = true;
        // Reset map to clean state on load
        resetMapToCleanState();
    })
    .catch(function(error) {
        console.error("Error loading map data:", error);
        // Fallback: create a simple message
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("text-anchor", "middle")
            .text("Error loading map. Please check your internet connection.");
    });

function setGrey() {
    currentColorMode = 'grey';
    countriesGroup.selectAll(".country")
        .transition()
        .duration(1000)
        .attr("fill", '#d3d3d3');
}

function setGreen() {
    currentColorMode = 'green';
    countriesGroup.selectAll(".country")
        .transition()
        .duration(1000)
        .attr("fill", '#d3d3d3');
}

// Reset map to clean slate on page load
function resetMapToCleanState() {
    countriesGroup.selectAll(".country")
        .attr("fill", '#d3d3d3')
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5);
}

function animateTransition() {
    // Start with grey
    setGrey();
    // Then transition to green after a delay
    setTimeout(() => {
        setGreen();
    }, 1200);
}
