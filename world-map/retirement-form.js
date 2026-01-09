// Retirement Form Logic - Integrated with World Map
// Monthly costs in USD for modest, comfortable, and luxurious lifestyles
window.countryData = [
    // Southeast Asia
    { name: 'Thailand', monthlyCost: { modest: 900,  comfortable: 1700, luxurious: 3500 }},
    { name: 'Vietnam',  monthlyCost: { modest: 800,  comfortable: 1500, luxurious: 3000 }},
    { name: 'Malaysia',   monthlyCost:{ modest:1000, comfortable:1720, luxurious:3300 }},
    { name: 'Cambodia',   monthlyCost:{ modest:930,  comfortable:1530, luxurious:3050 }},
    { name: 'Philippines', monthlyCost: { modest: 700, comfortable: 1400, luxurious: 2800 }},
    { 
        name: 'Indonesia', 
        monthlyCost: { modest: 750, comfortable: 1450, luxurious: 2900 },
        regions: [
            { name: 'Jakarta', monthlyCost: { modest: 1200, comfortable: 2200, luxurious: 4400 }},
            { name: 'Bali', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }},
            { name: 'Surabaya & Java', monthlyCost: { modest: 800, comfortable: 1500, luxurious: 3000 }},
            { name: 'Medan & Sumatra', monthlyCost: { modest: 700, comfortable: 1300, luxurious: 2600 }},
            { name: 'Makassar & Sulawesi', monthlyCost: { modest: 650, comfortable: 1200, luxurious: 2400 }},
            { name: 'Other Islands', monthlyCost: { modest: 600, comfortable: 1100, luxurious: 2200 }},
            { name: 'Rural Areas', monthlyCost: { modest: 500, comfortable: 950, luxurious: 1900 }}
        ]
    },
    { name: 'Laos', monthlyCost: { modest: 650, comfortable: 1200, luxurious: 2400 }},
    { name: 'Myanmar', monthlyCost: { modest: 600, comfortable: 1100, luxurious: 2200 }},
    { name: 'Singapore', monthlyCost: { modest: 2500, comfortable: 4000, luxurious: 8000 }},
    
    // Europe
    { name: 'Portugal', monthlyCost: { modest: 1200, comfortable: 2000, luxurious: 4000 }},
    { 
        name: 'Spain', 
        monthlyCost: { modest: 1300, comfortable: 2200, luxurious: 4500 },
        regions: [
            { name: 'Madrid & Barcelona', monthlyCost: { modest: 1800, comfortable: 3000, luxurious: 6000 }},
            { name: 'Coastal Areas (Costa del Sol, Costa Brava)', monthlyCost: { modest: 1500, comfortable: 2600, luxurious: 5200 }},
            { name: 'Andalusia (Seville, Granada)', monthlyCost: { modest: 1200, comfortable: 2100, luxurious: 4200 }},
            { name: 'Northern Spain (Bilbao, San Sebastian)', monthlyCost: { modest: 1400, comfortable: 2400, luxurious: 4800 }},
            { name: 'Central Spain (Toledo, Salamanca)', monthlyCost: { modest: 1100, comfortable: 1900, luxurious: 3800 }},
            { name: 'Canary Islands', monthlyCost: { modest: 1300, comfortable: 2200, luxurious: 4400 }},
            { name: 'Rural Areas', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }}
        ]
    },
    { name: 'Greece', monthlyCost: { modest: 1100, comfortable: 1900, luxurious: 3800 }},
    { 
        name: 'Italy', 
        monthlyCost: { modest: 1400, comfortable: 2400, luxurious: 4800 },
        regions: [
            { name: 'Northern Italy (Milan, Turin, Venice)', monthlyCost: { modest: 1800, comfortable: 3000, luxurious: 6000 }},
            { name: 'Central Italy (Rome, Florence)', monthlyCost: { modest: 1600, comfortable: 2700, luxurious: 5400 }},
            { name: 'Southern Italy (Naples, Bari)', monthlyCost: { modest: 1200, comfortable: 2100, luxurious: 4200 }},
            { name: 'Sicily & Sardinia', monthlyCost: { modest: 1300, comfortable: 2200, luxurious: 4400 }},
            { name: 'Tuscany (excluding Florence)', monthlyCost: { modest: 1500, comfortable: 2500, luxurious: 5000 }},
            { name: 'Rural Areas', monthlyCost: { modest: 1100, comfortable: 1900, luxurious: 3800 }}
        ]
    },
    { 
        name: 'France', 
        monthlyCost: { modest: 1800, comfortable: 3000, luxurious: 6000 },
        regions: [
            { name: 'Paris & Île-de-France', monthlyCost: { modest: 2800, comfortable: 4800, luxurious: 9600 }},
            { name: 'French Riviera (Nice, Cannes)', monthlyCost: { modest: 2200, comfortable: 3800, luxurious: 7600 }},
            { name: 'Provence (Marseille, Aix)', monthlyCost: { modest: 1900, comfortable: 3300, luxurious: 6600 }},
            { name: 'Brittany & Normandy', monthlyCost: { modest: 1600, comfortable: 2800, luxurious: 5600 }},
            { name: 'Southwest (Bordeaux, Toulouse)', monthlyCost: { modest: 1700, comfortable: 2900, luxurious: 5800 }},
            { name: 'Alsace & Lorraine', monthlyCost: { modest: 1600, comfortable: 2700, luxurious: 5400 }},
            { name: 'Rural Areas', monthlyCost: { modest: 1400, comfortable: 2400, luxurious: 4800 }}
        ]
    },
    { name: 'Croatia', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }},
    { name: 'Montenegro', monthlyCost: { modest: 950, comfortable: 1700, luxurious: 3400 }},
    { name: 'Bulgaria', monthlyCost: { modest: 800, comfortable: 1400, luxurious: 2800 }},
    { name: 'Romania', monthlyCost: { modest: 850, comfortable: 1500, luxurious: 3000 }},
    { name: 'Poland', monthlyCost: { modest: 900, comfortable: 1600, luxurious: 3200 }},
    { name: 'Czech Republic', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }},
    { name: 'Hungary', monthlyCost: { modest: 850, comfortable: 1500, luxurious: 3000 }},
    { name: 'Albania', monthlyCost: { modest: 700, comfortable: 1300, luxurious: 2600 }},
    { name: 'North Macedonia', monthlyCost: { modest: 750, comfortable: 1350, luxurious: 2700 }},
    { name: 'Serbia', monthlyCost: { modest: 800, comfortable: 1400, luxurious: 2800 }},
    { name: 'Bosnia and Herzegovina', monthlyCost: { modest: 700, comfortable: 1250, luxurious: 2500 }},
    { name: 'Slovenia', monthlyCost: { modest: 1200, comfortable: 2100, luxurious: 4200 }},
    { name: 'Slovakia', monthlyCost: { modest: 950, comfortable: 1700, luxurious: 3400 }},
    { name: 'Estonia', monthlyCost: { modest: 1100, comfortable: 1900, luxurious: 3800 }},
    { name: 'Latvia', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }},
    { name: 'Lithuania', monthlyCost: { modest: 950, comfortable: 1700, luxurious: 3400 }},
    { name: 'Ireland', monthlyCost: { modest: 2000, comfortable: 3500, luxurious: 7000 }},
    { 
        name: 'United Kingdom', 
        monthlyCost: { modest: 2200, comfortable: 3800, luxurious: 7500 },
        regions: [
            { name: 'London', monthlyCost: { modest: 3200, comfortable: 5500, luxurious: 11000 }},
            { name: 'South East England', monthlyCost: { modest: 2500, comfortable: 4300, luxurious: 8600 }},
            { name: 'Scotland (Edinburgh, Glasgow)', monthlyCost: { modest: 2000, comfortable: 3500, luxurious: 7000 }},
            { name: 'Northern England (Manchester, Leeds)', monthlyCost: { modest: 1900, comfortable: 3300, luxurious: 6600 }},
            { name: 'Wales', monthlyCost: { modest: 1800, comfortable: 3100, luxurious: 6200 }},
            { name: 'Northern Ireland', monthlyCost: { modest: 1800, comfortable: 3200, luxurious: 6400 }},
            { name: 'Rural Areas', monthlyCost: { modest: 1700, comfortable: 3000, luxurious: 6000 }}
        ]
    },
    { 
        name: 'Germany', 
        monthlyCost: { modest: 1800, comfortable: 3200, luxurious: 6400 },
        regions: [
            { name: 'Munich & Bavaria', monthlyCost: { modest: 2200, comfortable: 3800, luxurious: 7600 }},
            { name: 'Berlin', monthlyCost: { modest: 2000, comfortable: 3500, luxurious: 7000 }},
            { name: 'Hamburg & Northern Germany', monthlyCost: { modest: 1900, comfortable: 3300, luxurious: 6600 }},
            { name: 'Frankfurt & Hesse', monthlyCost: { modest: 1900, comfortable: 3400, luxurious: 6800 }},
            { name: 'Cologne & North Rhine-Westphalia', monthlyCost: { modest: 1800, comfortable: 3200, luxurious: 6400 }},
            { name: 'Stuttgart & Baden-Württemberg', monthlyCost: { modest: 1900, comfortable: 3300, luxurious: 6600 }},
            { name: 'Eastern Germany (Dresden, Leipzig)', monthlyCost: { modest: 1500, comfortable: 2700, luxurious: 5400 }},
            { name: 'Rural Areas', monthlyCost: { modest: 1400, comfortable: 2500, luxurious: 5000 }}
        ]
    },
    { name: 'Netherlands', monthlyCost: { modest: 2000, comfortable: 3500, luxurious: 7000 }},
    { name: 'Belgium', monthlyCost: { modest: 1900, comfortable: 3300, luxurious: 6600 }},
    { name: 'Switzerland', monthlyCost: { modest: 3000, comfortable: 5000, luxurious: 10000 }},
    { name: 'Austria', monthlyCost: { modest: 1800, comfortable: 3100, luxurious: 6200 }},
    { name: 'Norway', monthlyCost: { modest: 2500, comfortable: 4200, luxurious: 8400 }},
    { name: 'Sweden', monthlyCost: { modest: 2200, comfortable: 3800, luxurious: 7600 }},
    { name: 'Denmark', monthlyCost: { modest: 2400, comfortable: 4100, luxurious: 8200 }},
    { name: 'Finland', monthlyCost: { modest: 2100, comfortable: 3600, luxurious: 7200 }},
    { name: 'Iceland', monthlyCost: { modest: 2800, comfortable: 4800, luxurious: 9600 }},
    
    // Central & South America
    { 
        name: 'Mexico', 
        monthlyCost: { modest: 1000, comfortable: 1700, luxurious: 3300 },
        regions: [
            { name: 'Mexico City', monthlyCost: { modest: 1400, comfortable: 2400, luxurious: 4800 }},
            { name: 'Riviera Maya & Cancun', monthlyCost: { modest: 1300, comfortable: 2200, luxurious: 4400 }},
            { name: 'Puerto Vallarta & Pacific Coast', monthlyCost: { modest: 1200, comfortable: 2100, luxurious: 4200 }},
            { name: 'Lake Chapala & Guadalajara', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }},
            { name: 'San Miguel de Allende & Central Highlands', monthlyCost: { modest: 1100, comfortable: 1900, luxurious: 3800 }},
            { name: 'Baja California (Tijuana, Ensenada)', monthlyCost: { modest: 1200, comfortable: 2000, luxurious: 4000 }},
            { name: 'Northern Mexico', monthlyCost: { modest: 950, comfortable: 1700, luxurious: 3400 }},
            { name: 'Southern Mexico & Yucatan', monthlyCost: { modest: 850, comfortable: 1500, luxurious: 3000 }}
        ]
    },
    { name: 'Costa Rica',monthlyCost:{ modest: 1200, comfortable: 2100, luxurious: 4100 }},
    { name: 'Belize',     monthlyCost:{ modest:1200, comfortable:2100, luxurious:4200 }},
    { name: 'Ecuador',    monthlyCost:{ modest:950,  comfortable:1700, luxurious:3500 }},
    { name: 'Panama',     monthlyCost:{ modest:1100, comfortable:1800, luxurious:3400 }},
    { name: 'Colombia', monthlyCost: { modest: 800, comfortable: 1500, luxurious: 3000 }},
    { name: 'Peru', monthlyCost: { modest: 750, comfortable: 1400, luxurious: 2800 }},
    { name: 'Chile', monthlyCost: { modest: 1100, comfortable: 1900, luxurious: 3800 }},
    { 
        name: 'Argentina', 
        monthlyCost: { modest: 700, comfortable: 1300, luxurious: 2600 },
        regions: [
            { name: 'Buenos Aires', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }},
            { name: 'Córdoba', monthlyCost: { modest: 800, comfortable: 1500, luxurious: 3000 }},
            { name: 'Mendoza & Wine Region', monthlyCost: { modest: 850, comfortable: 1600, luxurious: 3200 }},
            { name: 'Bariloche & Patagonia', monthlyCost: { modest: 900, comfortable: 1700, luxurious: 3400 }},
            { name: 'Rosario & Central', monthlyCost: { modest: 750, comfortable: 1400, luxurious: 2800 }},
            { name: 'Salta & Northwest', monthlyCost: { modest: 700, comfortable: 1300, luxurious: 2600 }},
            { name: 'Rural Areas', monthlyCost: { modest: 600, comfortable: 1100, luxurious: 2200 }}
        ]
    },
    { 
        name: 'Brazil', 
        monthlyCost: { modest: 900, comfortable: 1600, luxurious: 3200 },
        regions: [
            { name: 'São Paulo', monthlyCost: { modest: 1400, comfortable: 2400, luxurious: 4800 }},
            { name: 'Rio de Janeiro', monthlyCost: { modest: 1300, comfortable: 2200, luxurious: 4400 }},
            { name: 'Brasília', monthlyCost: { modest: 1200, comfortable: 2100, luxurious: 4200 }},
            { name: 'Florianópolis & South', monthlyCost: { modest: 1100, comfortable: 1900, luxurious: 3800 }},
            { name: 'Northeast (Salvador, Recife, Fortaleza)', monthlyCost: { modest: 850, comfortable: 1500, luxurious: 3000 }},
            { name: 'Belo Horizonte & Minas Gerais', monthlyCost: { modest: 950, comfortable: 1700, luxurious: 3400 }},
            { name: 'Amazon Region', monthlyCost: { modest: 800, comfortable: 1400, luxurious: 2800 }},
            { name: 'Rural Areas', monthlyCost: { modest: 650, comfortable: 1200, luxurious: 2400 }}
        ]
    },
    { name: 'Uruguay', monthlyCost: { modest: 1100, comfortable: 2000, luxurious: 4000 }},
    { name: 'Paraguay', monthlyCost: { modest: 650, comfortable: 1200, luxurious: 2400 }},
    { name: 'Bolivia', monthlyCost: { modest: 600, comfortable: 1100, luxurious: 2200 }},
    { name: 'Guatemala', monthlyCost: { modest: 750, comfortable: 1400, luxurious: 2800 }},
    { name: 'Nicaragua', monthlyCost: { modest: 700, comfortable: 1300, luxurious: 2600 }},
    { name: 'Honduras', monthlyCost: { modest: 700, comfortable: 1300, luxurious: 2600 }},
    { name: 'El Salvador', monthlyCost: { modest: 650, comfortable: 1200, luxurious: 2400 }},
    { name: 'Dominican Republic', monthlyCost: { modest: 900, comfortable: 1600, luxurious: 3200 }},
    
    // Asia
    { 
        name: 'India', 
        monthlyCost: { modest: 500, comfortable: 1000, luxurious: 2000 },
        regions: [
            { name: 'Metro Cities (Mumbai, Delhi, Bangalore)', monthlyCost: { modest: 800, comfortable: 1500, luxurious: 3000 }},
            { name: 'Tier 2 Cities (Pune, Hyderabad, Chennai)', monthlyCost: { modest: 600, comfortable: 1200, luxurious: 2400 }},
            { name: 'Tier 3 Cities & Smaller', monthlyCost: { modest: 450, comfortable: 900, luxurious: 1800 }},
            { name: 'Rural Areas', monthlyCost: { modest: 350, comfortable: 700, luxurious: 1400 }}
        ]
    },
    { name: 'Nepal', monthlyCost: { modest: 550, comfortable: 1050, luxurious: 2100 }},
    { name: 'Sri Lanka', monthlyCost: { modest: 600, comfortable: 1150, luxurious: 2300 }},
    { name: 'Bangladesh', monthlyCost: { modest: 450, comfortable: 900, luxurious: 1800 }},
    { name: 'Pakistan', monthlyCost: { modest: 500, comfortable: 1000, luxurious: 2000 }},
    { 
        name: 'China', 
        monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 },
        regions: [
            { name: 'Tier 1 Cities (Beijing, Shanghai, Shenzhen)', monthlyCost: { modest: 1800, comfortable: 3200, luxurious: 6400 }},
            { name: 'Tier 2 Cities (Chengdu, Hangzhou, Wuhan)', monthlyCost: { modest: 1200, comfortable: 2200, luxurious: 4400 }},
            { name: 'Tier 3 Cities & Smaller', monthlyCost: { modest: 800, comfortable: 1500, luxurious: 3000 }},
            { name: 'Rural Areas', monthlyCost: { modest: 600, comfortable: 1100, luxurious: 2200 }}
        ]
    },
    { 
        name: 'Japan', 
        monthlyCost: { modest: 2000, comfortable: 3500, luxurious: 7000 },
        regions: [
            { name: 'Tokyo & Greater Tokyo', monthlyCost: { modest: 2800, comfortable: 4800, luxurious: 9600 }},
            { name: 'Osaka & Kansai Region', monthlyCost: { modest: 2200, comfortable: 3800, luxurious: 7600 }},
            { name: 'Kyoto', monthlyCost: { modest: 2100, comfortable: 3600, luxurious: 7200 }},
            { name: 'Yokohama & Kanagawa', monthlyCost: { modest: 2300, comfortable: 4000, luxurious: 8000 }},
            { name: 'Fukuoka & Kyushu', monthlyCost: { modest: 1800, comfortable: 3100, luxurious: 6200 }},
            { name: 'Hokkaido (Sapporo)', monthlyCost: { modest: 1900, comfortable: 3300, luxurious: 6600 }},
            { name: 'Rural Areas & Smaller Cities', monthlyCost: { modest: 1500, comfortable: 2700, luxurious: 5400 }}
        ]
    },
    { name: 'South Korea', monthlyCost: { modest: 1800, comfortable: 3200, luxurious: 6400 }},
    { name: 'Taiwan', monthlyCost: { modest: 1200, comfortable: 2100, luxurious: 4200 }},
    { name: 'Hong Kong', monthlyCost: { modest: 2500, comfortable: 4500, luxurious: 9000 }},
    
    // Middle East & North Africa
    { 
        name: 'Turkey', 
        monthlyCost: { modest: 800, comfortable: 1500, luxurious: 3000 },
        regions: [
            { name: 'Istanbul', monthlyCost: { modest: 1200, comfortable: 2100, luxurious: 4200 }},
            { name: 'Antalya & Mediterranean Coast', monthlyCost: { modest: 900, comfortable: 1600, luxurious: 3200 }},
            { name: 'Bodrum & Aegean Coast', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }},
            { name: 'Ankara', monthlyCost: { modest: 850, comfortable: 1500, luxurious: 3000 }},
            { name: 'Izmir', monthlyCost: { modest: 800, comfortable: 1400, luxurious: 2800 }},
            { name: 'Cappadocia & Central Anatolia', monthlyCost: { modest: 700, comfortable: 1300, luxurious: 2600 }},
            { name: 'Black Sea Coast', monthlyCost: { modest: 750, comfortable: 1350, luxurious: 2700 }},
            { name: 'Eastern Turkey', monthlyCost: { modest: 650, comfortable: 1200, luxurious: 2400 }}
        ]
    },
    { name: 'Morocco', monthlyCost: { modest: 700, comfortable: 1300, luxurious: 2600 }},
    { name: 'Tunisia', monthlyCost: { modest: 650, comfortable: 1200, luxurious: 2400 }},
    { name: 'Egypt', monthlyCost: { modest: 600, comfortable: 1100, luxurious: 2200 }},
    { name: 'Jordan', monthlyCost: { modest: 900, comfortable: 1600, luxurious: 3200 }},
    { name: 'Lebanon', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }},
    { name: 'United Arab Emirates', monthlyCost: { modest: 2500, comfortable: 4500, luxurious: 9000 }},
    { name: 'Oman', monthlyCost: { modest: 1500, comfortable: 2600, luxurious: 5200 }},
    { name: 'Qatar', monthlyCost: { modest: 2800, comfortable: 5000, luxurious: 10000 }},
    { name: 'Bahrain', monthlyCost: { modest: 1800, comfortable: 3200, luxurious: 6400 }},
    { name: 'Kuwait', monthlyCost: { modest: 2000, comfortable: 3600, luxurious: 7200 }},
    { name: 'Saudi Arabia', monthlyCost: { modest: 1800, comfortable: 3200, luxurious: 6400 }},
    { name: 'Israel', monthlyCost: { modest: 2000, comfortable: 3500, luxurious: 7000 }},
    
    // Africa
    { 
        name: 'South Africa', 
        monthlyCost: { modest: 800, comfortable: 1500, luxurious: 3000 },
        regions: [
            { name: 'Cape Town', monthlyCost: { modest: 1200, comfortable: 2100, luxurious: 4200 }},
            { name: 'Johannesburg & Pretoria', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }},
            { name: 'Durban & KwaZulu-Natal', monthlyCost: { modest: 900, comfortable: 1600, luxurious: 3200 }},
            { name: 'Garden Route', monthlyCost: { modest: 950, comfortable: 1700, luxurious: 3400 }},
            { name: 'Eastern Cape', monthlyCost: { modest: 750, comfortable: 1400, luxurious: 2800 }},
            { name: 'Western Cape (excluding Cape Town)', monthlyCost: { modest: 850, comfortable: 1500, luxurious: 3000 }},
            { name: 'Rural Areas', monthlyCost: { modest: 600, comfortable: 1100, luxurious: 2200 }}
        ]
    },
    { name: 'Ghana', monthlyCost: { modest: 700, comfortable: 1300, luxurious: 2600 }},
    { name: 'Kenya', monthlyCost: { modest: 750, comfortable: 1400, luxurious: 2800 }},
    { name: 'Tanzania', monthlyCost: { modest: 650, comfortable: 1200, luxurious: 2400 }},
    { name: 'Zambia', monthlyCost: { modest: 600, comfortable: 1100, luxurious: 2200 }},
    { name: 'Zimbabwe', monthlyCost: { modest: 550, comfortable: 1000, luxurious: 2000 }},
    { name: 'Namibia', monthlyCost: { modest: 900, comfortable: 1600, luxurious: 3200 }},
    { name: 'Botswana', monthlyCost: { modest: 850, comfortable: 1500, luxurious: 3000 }},
    { name: 'Mauritius', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }},
    { name: 'Seychelles', monthlyCost: { modest: 1500, comfortable: 2600, luxurious: 5200 }},
    { name: 'Senegal', monthlyCost: { modest: 700, comfortable: 1300, luxurious: 2600 }},
    { name: 'Mozambique', monthlyCost: { modest: 600, comfortable: 1100, luxurious: 2200 }},
    { name: 'Madagascar', monthlyCost: { modest: 550, comfortable: 1000, luxurious: 2000 }},
    
    // Oceania
    { 
        name: 'Australia', 
        monthlyCost: { modest: 2200, comfortable: 3800, luxurious: 7600 },
        regions: [
            { name: 'Sydney', monthlyCost: { modest: 3000, comfortable: 5200, luxurious: 10400 }},
            { name: 'Melbourne', monthlyCost: { modest: 2800, comfortable: 4800, luxurious: 9600 }},
            { name: 'Brisbane & Gold Coast', monthlyCost: { modest: 2400, comfortable: 4200, luxurious: 8400 }},
            { name: 'Perth', monthlyCost: { modest: 2500, comfortable: 4300, luxurious: 8600 }},
            { name: 'Adelaide', monthlyCost: { modest: 2200, comfortable: 3800, luxurious: 7600 }},
            { name: 'Darwin & Northern Territory', monthlyCost: { modest: 2300, comfortable: 4000, luxurious: 8000 }},
            { name: 'Tasmania', monthlyCost: { modest: 2000, comfortable: 3500, luxurious: 7000 }},
            { name: 'Regional Areas', monthlyCost: { modest: 1800, comfortable: 3200, luxurious: 6400 }}
        ]
    },
    { name: 'New Zealand', monthlyCost: { modest: 2000, comfortable: 3500, luxurious: 7000 }},
    { name: 'Fiji', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }},
    { name: 'Papua New Guinea', monthlyCost: { modest: 1200, comfortable: 2100, luxurious: 4200 }},
    { name: 'Vanuatu', monthlyCost: { modest: 1100, comfortable: 1900, luxurious: 3800 }},
    { name: 'Samoa', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }},
    { name: 'Tonga', monthlyCost: { modest: 950, comfortable: 1700, luxurious: 3400 }},
    
    // North America & Caribbean
    { 
        name: 'United States', 
        monthlyCost: { modest: 2500, comfortable: 4500, luxurious: 9000 },
        regions: [
            { name: 'Low Cost States (AL, AR, MS, OK, WV)', monthlyCost: { modest: 1800, comfortable: 3200, luxurious: 6400 }},
            { name: 'Midwest (OH, MI, IN, IL, WI)', monthlyCost: { modest: 2200, comfortable: 3900, luxurious: 7800 }},
            { name: 'Southeast (FL, GA, NC, SC, TN)', monthlyCost: { modest: 2100, comfortable: 3700, luxurious: 7400 }},
            { name: 'Southwest (TX, AZ, NM, NV)', monthlyCost: { modest: 2400, comfortable: 4200, luxurious: 8400 }},
            { name: 'West Coast (CA, OR, WA)', monthlyCost: { modest: 3200, comfortable: 5500, luxurious: 11000 }},
            { name: 'Northeast (NY, MA, CT, NJ)', monthlyCost: { modest: 3000, comfortable: 5200, luxurious: 10400 }},
            { name: 'Mountain States (CO, UT, ID, MT)', monthlyCost: { modest: 2300, comfortable: 4000, luxurious: 8000 }}
        ]
    },
    // USA alias in case map uses different name
    { 
        name: 'United States of America', 
        monthlyCost: { modest: 2500, comfortable: 4500, luxurious: 9000 },
        regions: [
            { name: 'Low Cost States (AL, AR, MS, OK, WV)', monthlyCost: { modest: 1800, comfortable: 3200, luxurious: 6400 }},
            { name: 'Midwest (OH, MI, IN, IL, WI)', monthlyCost: { modest: 2200, comfortable: 3900, luxurious: 7800 }},
            { name: 'Southeast (FL, GA, NC, SC, TN)', monthlyCost: { modest: 2100, comfortable: 3700, luxurious: 7400 }},
            { name: 'Southwest (TX, AZ, NM, NV)', monthlyCost: { modest: 2400, comfortable: 4200, luxurious: 8400 }},
            { name: 'West Coast (CA, OR, WA)', monthlyCost: { modest: 3200, comfortable: 5500, luxurious: 11000 }},
            { name: 'Northeast (NY, MA, CT, NJ)', monthlyCost: { modest: 3000, comfortable: 5200, luxurious: 10400 }},
            { name: 'Mountain States (CO, UT, ID, MT)', monthlyCost: { modest: 2300, comfortable: 4000, luxurious: 8000 }}
        ]
    },
    { 
        name: 'Greenland', 
        monthlyCost: { modest: 2800, comfortable: 4800, luxurious: 9600 },
        regions: [
            { name: 'Nuuk (Capital)', monthlyCost: { modest: 3000, comfortable: 5200, luxurious: 10400 }},
            { name: 'Sisimiut & West Coast', monthlyCost: { modest: 2800, comfortable: 4800, luxurious: 9600 }},
            { name: 'Ilulissat & Disko Bay', monthlyCost: { modest: 2900, comfortable: 5000, luxurious: 10000 }},
            { name: 'East Coast & Remote Areas', monthlyCost: { modest: 3200, comfortable: 5500, luxurious: 11000 }},
            { name: 'South Greenland', monthlyCost: { modest: 2700, comfortable: 4700, luxurious: 9400 }}
        ]
    },
    { 
        name: 'Canada', 
        monthlyCost: { modest: 2200, comfortable: 3800, luxurious: 7600 },
        regions: [
            { name: 'Prairies (AB, SK, MB)', monthlyCost: { modest: 2000, comfortable: 3500, luxurious: 7000 }},
            { name: 'Atlantic Provinces (NS, NB, PE, NL)', monthlyCost: { modest: 1900, comfortable: 3300, luxurious: 6600 }},
            { name: 'Quebec', monthlyCost: { modest: 2100, comfortable: 3700, luxurious: 7400 }},
            { name: 'Ontario (excluding Toronto)', monthlyCost: { modest: 2200, comfortable: 3900, luxurious: 7800 }},
            { name: 'Toronto, ON', monthlyCost: { modest: 2800, comfortable: 4800, luxurious: 9600 }},
            { name: 'Vancouver, BC', monthlyCost: { modest: 3000, comfortable: 5200, luxurious: 10400 }},
            { name: 'Other BC', monthlyCost: { modest: 2400, comfortable: 4200, luxurious: 8400 }}
        ]
    },
    { name: 'Cuba', monthlyCost: { modest: 800, comfortable: 1500, luxurious: 3000 }},
    { name: 'Jamaica', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }},
    { name: 'Barbados', monthlyCost: { modest: 1500, comfortable: 2600, luxurious: 5200 }},
    { name: 'Trinidad and Tobago', monthlyCost: { modest: 1200, comfortable: 2100, luxurious: 4200 }},
    { name: 'Bahamas', monthlyCost: { modest: 2000, comfortable: 3500, luxurious: 7000 }},
    { name: 'Cayman Islands', monthlyCost: { modest: 3000, comfortable: 5500, luxurious: 11000 }},
    
    // Eastern Europe & Central Asia
    { name: 'Georgia', monthlyCost: { modest: 700, comfortable: 1300, luxurious: 2600 }},
    { name: 'Armenia', monthlyCost: { modest: 650, comfortable: 1200, luxurious: 2400 }},
    { name: 'Azerbaijan', monthlyCost: { modest: 700, comfortable: 1300, luxurious: 2600 }},
    { name: 'Kazakhstan', monthlyCost: { modest: 900, comfortable: 1600, luxurious: 3200 }},
    { name: 'Uzbekistan', monthlyCost: { modest: 600, comfortable: 1100, luxurious: 2200 }},
    { name: 'Kyrgyzstan', monthlyCost: { modest: 550, comfortable: 1000, luxurious: 2000 }},
    { name: 'Tajikistan', monthlyCost: { modest: 500, comfortable: 950, luxurious: 1900 }},
    { name: 'Mongolia', monthlyCost: { modest: 800, comfortable: 1500, luxurious: 3000 }},
    { name: 'Ukraine', monthlyCost: { modest: 700, comfortable: 1300, luxurious: 2600 }},
    { name: 'Belarus', monthlyCost: { modest: 750, comfortable: 1400, luxurious: 2800 }},
    { name: 'Moldova', monthlyCost: { modest: 600, comfortable: 1100, luxurious: 2200 }},
    { 
        name: 'Russia', 
        monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 },
        regions: [
            { name: 'Moscow', monthlyCost: { modest: 1800, comfortable: 3200, luxurious: 6400 }},
            { name: 'St. Petersburg', monthlyCost: { modest: 1500, comfortable: 2700, luxurious: 5400 }},
            { name: 'Krasnodar & Southern Russia', monthlyCost: { modest: 1100, comfortable: 2000, luxurious: 4000 }},
            { name: 'Sochi & Black Sea Coast', monthlyCost: { modest: 1200, comfortable: 2100, luxurious: 4200 }},
            { name: 'Novosibirsk & Siberia', monthlyCost: { modest: 1000, comfortable: 1800, luxurious: 3600 }},
            { name: 'Yekaterinburg & Urals', monthlyCost: { modest: 950, comfortable: 1700, luxurious: 3400 }},
            { name: 'Kazan & Volga Region', monthlyCost: { modest: 900, comfortable: 1600, luxurious: 3200 }},
            { name: 'Far East (Vladivostok)', monthlyCost: { modest: 1100, comfortable: 2000, luxurious: 4000 }},
            { name: 'Rural Areas', monthlyCost: { modest: 700, comfortable: 1300, luxurious: 2600 }}
        ]
    },
];

// Map country names from map data to our country data names
window.findCountryByName = function(mapCountryName) {
    if (!mapCountryName) return null;
    
    // Direct match
    let country = window.countryData.find(c => c.name === mapCountryName);
    if (country) return country;
    
    // Case-insensitive match
    country = window.countryData.find(c => c.name.toLowerCase() === mapCountryName.toLowerCase());
    if (country) return country;
    
    // Common name variations
    const nameVariations = {
        'United States': ['United States of America', 'USA', 'U.S.A.', 'U.S.', 'United States'],
        'United Kingdom': ['UK', 'Great Britain', 'Britain', 'U.K.'],
        'Czech Republic': ['Czechia'],
        'South Korea': ['Korea, South', 'Republic of Korea'],
        'North Macedonia': ['Macedonia'],
        'Bosnia and Herzegovina': ['Bosnia', 'Bosnia & Herzegovina'],
        'Trinidad and Tobago': ['Trinidad & Tobago'],
        'United Arab Emirates': ['UAE'],
        'Myanmar': ['Burma'],
        'Russia': ['Russian Federation'],
        'Congo': ['Republic of the Congo', 'Congo, Republic of'],
        'DR Congo': ['Democratic Republic of the Congo', 'Congo, Democratic Republic of', 'DRC'],
        'Ivory Coast': ['Côte d\'Ivoire', 'Cote d\'Ivoire'],
        'East Timor': ['Timor-Leste'],
        'Cape Verde': ['Cabo Verde']
    };
    
    // Check variations
    for (const [standardName, variations] of Object.entries(nameVariations)) {
        if (variations.includes(mapCountryName) || mapCountryName === standardName) {
            country = window.countryData.find(c => c.name === standardName);
            if (country) return country;
        }
    }
    
    return null;
};

let eligibleCountries = [];

// Currency conversion rates (to USD) - approximate rates, should be updated regularly
const currencyRates = {
    'USD': 1.0,
    'EUR': 1.08,
    'GBP': 1.27,
    'CAD': 0.73,
    'AUD': 0.66,
    'JPY': 0.0067,
    'SGD': 0.74,
    'CHF': 1.12,
    'CNY': 0.14,
    'INR': 0.012,
    'MXN': 0.059,
    'BRL': 0.20,
    'ZAR': 0.055
};

// Currency symbols for display
const currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'CAD': 'C$',
    'AUD': 'A$',
    'JPY': '¥',
    'SGD': 'S$',
    'CHF': 'CHF ',
    'CNY': '¥',
    'INR': '₹',
    'MXN': '$',
    'BRL': 'R$',
    'ZAR': 'R'
};

function convertToUSD(amount, fromCurrency) {
    const rate = currencyRates[fromCurrency] || 1.0;
    return amount * rate;
}

function convertFromUSD(amount, toCurrency) {
    const rate = currencyRates[toCurrency] || 1.0;
    return amount / rate;
}

function formatCurrency(amount, currency) {
    const symbol = currencySymbols[currency] || currency + ' ';
    if (currency === 'JPY' || currency === 'INR') {
        return symbol + Math.round(amount).toLocaleString();
    }
    return symbol + amount.toFixed(0).toLocaleString();
}

function handleRetireFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const savingsInput = parseFloat(form.querySelector("#savings").value) || 0;
    const incomeInput = parseFloat(form.querySelector("#income").value) || 0;
    const lifestyle = form.querySelector("#lifestyle").value;
    const currency = form.querySelector("#currency").value || 'USD';
    const years = parseFloat(form.querySelector("#years").value) || 20;
    const resultsDiv = document.getElementById("results");
    
    if (!lifestyle) {
        resultsDiv.textContent = 'Please select a lifestyle.';
        eligibleCountries = [];
        updateMapColors();
        return;
    }
    
    // Convert inputs to USD for calculations
    const savingsUSD = convertToUSD(savingsInput, currency);
    const incomeUSD = convertToUSD(incomeInput, currency);
    
    const months = years * 12;
    const monthlyBudgetUSD = ((savingsUSD / months) || 0) + (incomeUSD || 0);
    eligibleCountries = window.countryData.filter(country =>
        country.monthlyCost && monthlyBudgetUSD >= country.monthlyCost[lifestyle]
    );
    
    // Convert monthly budget back to selected currency for display
    const monthlyBudgetDisplay = convertFromUSD(monthlyBudgetUSD, currency);
    
    if (eligibleCountries.length > 0) {
        // Filter and sort countries
        const filteredCountries = eligibleCountries
            .filter(c => c.monthlyCost && c.monthlyCost[lifestyle])
            .map(c => ({
                ...c,
                costUSD: c.monthlyCost[lifestyle],
                costDisplay: convertFromUSD(c.monthlyCost[lifestyle], currency)
            }));
        
        // Group countries by region
        const regionGroups = groupCountriesByRegion(filteredCountries);
        
        // Build results HTML
        let resultsHTML = `
            <strong>Your estimated monthly budget is ${formatCurrency(monthlyBudgetDisplay, currency)} (${formatCurrency(monthlyBudgetUSD, 'USD')}).</strong><br />
            <span style="font-size:0.9em;color:#555;">(Assuming savings are drawn down over ${months} months ~ ${years} years.)</span>
            <br /><br />
            <div class="results-summary">
                <strong>${filteredCountries.length} countries available</strong>
            </div>
            <div class="results-controls">
                <label>Sort by:</label>
                <select id="sortBy">
                    <option value="cost-low">Cost (Low to High)</option>
                    <option value="cost-high">Cost (High to Low)</option>
                    <option value="name">Name (A-Z)</option>
                </select>
                <label>Show:</label>
                <select id="showLimit">
                    <option value="20">Top 20</option>
                    <option value="50">Top 50</option>
                    <option value="100">Top 100</option>
                    <option value="all" selected>All</option>
                </select>
                <label class="inline-field">Max monthly cost:
                    <input type="number" id="maxCost" placeholder="e.g. 3000" min="0" step="100" />
                </label>
                <label class="inline-field">Min countries per region:
                    <input type="number" id="minRegionCount" value="0" min="0" step="1" />
                </label>
                <label>Regions:</label>
                <select id="regionFilter" multiple size="5"></select>
                <input type="text" id="countrySearch" class="country-search" placeholder="Search countries..." />
            </div>
            <div id="countriesList">
                ${renderCountriesByRegion(regionGroups, currency)}
            </div>
            <div style="font-size:0.9em;color:#555;margin-top:8px;">
                *This is a general guide. Actual costs vary by location, lifestyle, residency, and health needs.
            </div>
        `;
        
        resultsDiv.innerHTML = resultsHTML;
        
        // Add event listeners for sorting and filtering
        setupResultsControls(filteredCountries, currency);
    } else {
        resultsDiv.innerHTML = `
            <strong>Your estimated monthly budget is ${formatCurrency(monthlyBudgetDisplay, currency)} (${formatCurrency(monthlyBudgetUSD, 'USD')}).</strong><br />
            <span style="font-size:0.9em;color:#555;">(Assuming savings are drawn down over ${months} months ~ ${years} years.)</span>
            <br /><br />
            <strong>Sorry, based on your current figures and lifestyle, we couldn't find a country fit. Try increasing savings, income, or choosing a more modest lifestyle.</strong>
        `;
    }
    
    // Update map to highlight eligible countries
    updateMapColors();
}

function updateMapColors() {
    // Wait for map to be loaded
    if (typeof d3 === 'undefined') {
        setTimeout(updateMapColors, 100);
        return;
    }
    
    const countryPaths = d3.select("#countries-group").selectAll(".country");
    if (!countryPaths.size()) {
        setTimeout(updateMapColors, 100);
        return;
    }
    
    const lifestyle = document.querySelector("#lifestyle").value;
    const savingsInput = parseFloat(document.querySelector("#savings").value) || 0;
    const incomeInput = parseFloat(document.querySelector("#income").value) || 0;
    const currency = document.querySelector("#currency") ? document.querySelector("#currency").value || 'USD' : 'USD';
    const years = document.querySelector("#years") ? parseFloat(document.querySelector("#years").value) || 20 : 20;
    
    // If no lifestyle selected or no inputs, reset to clean slate
    if (!lifestyle || (savingsInput === 0 && incomeInput === 0)) {
        // Reset all countries to light grey
        countryPaths.transition()
            .duration(500)
            .attr("fill", "#d3d3d3")
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5);
        return;
    }
    
    // Convert inputs to USD for calculations
    const savingsUSD = convertToUSD(savingsInput, currency);
    const incomeUSD = convertToUSD(incomeInput, currency);
    
    const months = years * 12;
    const monthlyBudget = ((savingsUSD / months) || 0) + (incomeUSD || 0);
    
    countryPaths.each(function(d) {
        const countryName = d.properties.NAME || d.properties.name;
        const countryElement = d3.select(this);
        
        // Use the name mapping function to find country data
        const countryInfo = findCountryByName(countryName);
        
        if (!countryInfo || !countryInfo.monthlyCost || !(lifestyle in countryInfo.monthlyCost)) {
            // Reset to light grey if no data
            countryElement.transition()
                .duration(500)
                .attr("fill", "#d3d3d3")
                .attr("stroke", "#fff")
                .attr("stroke-width", 0.5);
            return;
        }
        
        const required = countryInfo.monthlyCost[lifestyle];
        
        if (monthlyBudget >= required) {
            // Eligible - highlight in green
            countryElement.transition()
                .duration(500)
                .attr("fill", "#4CAF50")
                .attr("stroke", "#2E7D32")
                .attr("stroke-width", 2);
        } else if (monthlyBudget > 0.8 * required) {
            // Close - highlight in yellow
            countryElement.transition()
                .duration(500)
                .attr("fill", "#FFD700")
                .attr("stroke", "#FFA500")
                .attr("stroke-width", 1.5);
        } else {
            // Not eligible - keep grey
            countryElement.transition()
                .duration(500)
                .attr("fill", "#d3d3d3")
                .attr("stroke", "#fff")
                .attr("stroke-width", 0.5);
        }
    });
}

function highlightEligibleCountries() {
    updateMapColors();
}

// Group countries by region
function groupCountriesByRegion(countries) {
    const regions = {
        'Southeast Asia': ['Thailand', 'Vietnam', 'Malaysia', 'Cambodia', 'Philippines', 'Indonesia', 'Laos', 'Myanmar', 'Singapore'],
        'Europe': ['Portugal', 'Spain', 'Greece', 'Italy', 'France', 'Croatia', 'Montenegro', 'Bulgaria', 'Romania', 'Poland', 'Czech Republic', 'Hungary', 'Albania', 'North Macedonia', 'Serbia', 'Bosnia and Herzegovina', 'Slovenia', 'Slovakia', 'Estonia', 'Latvia', 'Lithuania', 'Ireland', 'United Kingdom', 'Germany', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Norway', 'Sweden', 'Denmark', 'Finland', 'Iceland'],
        'Central & South America': ['Mexico', 'Costa Rica', 'Belize', 'Ecuador', 'Panama', 'Colombia', 'Peru', 'Chile', 'Argentina', 'Brazil', 'Uruguay', 'Paraguay', 'Bolivia', 'Guatemala', 'Nicaragua', 'Honduras', 'El Salvador', 'Dominican Republic', 'Cuba', 'Jamaica', 'Barbados', 'Trinidad and Tobago', 'Bahamas', 'Cayman Islands'],
        'Asia': ['India', 'Nepal', 'Sri Lanka', 'Bangladesh', 'Pakistan', 'China', 'Japan', 'South Korea', 'Taiwan', 'Hong Kong'],
        'Middle East & North Africa': ['Turkey', 'Morocco', 'Tunisia', 'Egypt', 'Jordan', 'Lebanon', 'United Arab Emirates', 'Oman', 'Qatar', 'Bahrain', 'Kuwait', 'Saudi Arabia', 'Israel'],
        'Africa': ['South Africa', 'Ghana', 'Kenya', 'Tanzania', 'Zambia', 'Zimbabwe', 'Namibia', 'Botswana', 'Mauritius', 'Seychelles', 'Senegal', 'Mozambique', 'Madagascar'],
        'Oceania': ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea', 'Vanuatu', 'Samoa', 'Tonga'],
        'North America': ['United States', 'United States of America', 'Canada', 'Greenland'],
        'Eastern Europe & Central Asia': ['Georgia', 'Armenia', 'Azerbaijan', 'Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Mongolia', 'Ukraine', 'Belarus', 'Moldova', 'Russia']
    };
    
    const grouped = {};
    
    countries.forEach(country => {
        let found = false;
        for (const [region, countryList] of Object.entries(regions)) {
            if (countryList.includes(country.name)) {
                if (!grouped[region]) grouped[region] = [];
                grouped[region].push(country);
                found = true;
                break;
            }
        }
        if (!found) {
            if (!grouped['Other']) grouped['Other'] = [];
            grouped['Other'].push(country);
        }
    });
    
    return grouped;
}

// Render countries grouped by region
function renderCountriesByRegion(regionGroups, currency, options = {}) {
    const {
        sortBy = 'cost-low',
        limit = 'all',
        searchTerm = '',
        maxCostUSD = Infinity,
        regions = [],
        minRegionCount = 0
    } = options;

    let html = '';
    
    // Sort and filter regions
    const sortedRegions = Object.keys(regionGroups).sort();
    
    sortedRegions.forEach(region => {
        let countries = regionGroups[region];
        
        // Filter by region selection
        if (regions.length > 0 && !regions.includes(region)) {
            return;
        }
        
        // Apply search filter
        if (searchTerm) {
            countries = countries.filter(c => 
                c.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Apply max cost filter (in USD)
        countries = countries.filter(c => c.costUSD <= maxCostUSD);
        
        // Skip region if after filtering it doesn't meet the threshold
        if (countries.length < minRegionCount) return;
        
        if (countries.length === 0) return;
        
        // Sort countries
        countries = [...countries].sort((a, b) => {
            if (sortBy === 'cost-low') return a.costUSD - b.costUSD;
            if (sortBy === 'cost-high') return b.costUSD - a.costUSD;
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            return 0;
        });
        
        // Apply limit
        const limitNum = limit === 'all' ? countries.length : parseInt(limit);
        const displayCountries = countries.slice(0, limitNum);
        const hasMore = countries.length > limitNum;
        
        html += `
            <div class="region-group">
                <div class="region-header" onclick="toggleRegion(this)">
                    ${region} (${countries.length})
                </div>
                <div class="region-countries">
                    <ul>
                        ${displayCountries.map(c => 
                            `<li>${c.name} (Est. required: ${formatCurrency(c.costDisplay, currency)} per month)</li>`
                        ).join('')}
                        ${hasMore ? `<li style="color: #666; font-style: italic;">... and ${countries.length - limitNum} more (change "Show" to see all)</li>` : ''}
                    </ul>
                </div>
            </div>
        `;
    });
    
    return html || '<p>No countries found matching your search.</p>';
}

// Setup controls for sorting and filtering
function setupResultsControls(allCountries, currency) {
    const sortSelect = document.getElementById('sortBy');
    const limitSelect = document.getElementById('showLimit');
    const searchInput = document.getElementById('countrySearch');
    const maxCostInput = document.getElementById('maxCost');
    const regionFilter = document.getElementById('regionFilter');
    const minRegionCountInput = document.getElementById('minRegionCount');
    
    if (!sortSelect || !limitSelect || !searchInput || !regionFilter || !minRegionCountInput) return;
    
    // Populate regions in the multi-select
    const regionGroups = groupCountriesByRegion(allCountries);
    const regions = Object.keys(regionGroups).sort();
    if (regionFilter.options.length === 0) {
        const placeholder = document.createElement('option');
        placeholder.value = 'all';
        placeholder.textContent = 'All regions (default)';
        placeholder.selected = true;
        regionFilter.appendChild(placeholder);
        regions.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r;
            opt.textContent = r;
            regionFilter.appendChild(opt);
        });
    }
    
    const updateResults = () => {
        const sortBy = sortSelect.value;
        const limit = limitSelect.value;
        const searchTerm = searchInput.value;
        const maxCostVal = parseFloat(maxCostInput.value);
        const maxCostUSD = isNaN(maxCostVal) ? Infinity : convertToUSD(maxCostVal, currency);
        const minRegionCount = parseInt(minRegionCountInput.value) || 0;
        const selectedRegions = Array.from(regionFilter.selectedOptions)
            .map(o => o.value)
            .filter(v => v !== 'all');
        const regionGroups = groupCountriesByRegion(allCountries);
        const countriesList = document.getElementById('countriesList');
        if (countriesList) {
            countriesList.innerHTML = renderCountriesByRegion(regionGroups, currency, {
                sortBy,
                limit,
                searchTerm,
                maxCostUSD,
                regions: selectedRegions,
                minRegionCount
            });
        }
    };
    
    sortSelect.addEventListener('change', updateResults);
    limitSelect.addEventListener('change', updateResults);
    searchInput.addEventListener('input', updateResults);
    if (maxCostInput) maxCostInput.addEventListener('input', updateResults);
    if (regionFilter) regionFilter.addEventListener('change', updateResults);
    if (minRegionCountInput) minRegionCountInput.addEventListener('input', updateResults);
}

// Toggle region collapse/expand
window.toggleRegion = function(header) {
    const countriesDiv = header.nextElementSibling;
    if (countriesDiv) {
        countriesDiv.classList.toggle('collapsed');
    }
};

// Attach form handler
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("retireForm");
    if (form) {
        form.addEventListener("submit", handleRetireFormSubmit);
        
        // Listen for input changes to update map in real-time
        form.querySelector("#savings").addEventListener('input', highlightEligibleCountries);
        form.querySelector("#income").addEventListener('input', highlightEligibleCountries);
        form.querySelector("#lifestyle").addEventListener('change', highlightEligibleCountries);
        form.querySelector("#currency").addEventListener('change', highlightEligibleCountries);
        form.querySelector("#years").addEventListener('input', highlightEligibleCountries);
        
        // Reset map to clean state on page load (after map loads)
        setTimeout(function() {
            highlightEligibleCountries();
        }, 500);
    }
});
