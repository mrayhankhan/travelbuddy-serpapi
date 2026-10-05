// Additional European destinations (HotelAPI-verified)
module.exports = [
    {
        destinationId: "berlin",
        name: "Berlin",
        country: "Germany",
        image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80",
        description: "Raw creativity, Cold War history, and Europe's best nightlife in Germany's edgy capital",
        tags: [
            "Nightlife",
            "History",
            "Art",
            "Urban",
            "Alternative",
            "Street Food"
        ],
        duration: "4 Days, 3 Nights",
        costLevel: 1,
        totalCost: 75000,
        vibeVector: {
            Urban: 0.9,
            Alternative: 0.9,
            Nightlife: 0.9,
            History: 0.8,
            Art: 0.8,
            Vibrant: 0.8,
            Trendy: 0.9
        },
        activityVector: {
            Nightlife: 0.95,
            History: 0.8,
            Art: 0.8,
            Food: 0.7,
            Culture: 0.7,
            Photography: 0.7,
            Museums: 0.7
        },
        stayVector: {
            Budget: 0.7,
            Urban: 0.9,
            Trendy: 0.8,
            Boutique: 0.6
        },
        breakdown: {
            flights: 30000,
            stay: 18000,
            activities: 19000,
            transfers: 8000
        },
        flights: [
            {
                type: "departure",
                airline: "Lufthansa",
                flightNo: "LH761",
                from: "DEL",
                to: "BER",
                departure: "03:00",
                arrival: "08:00",
                duration: "8h",
                cost: 15000
            },
            {
                type: "return",
                airline: "Lufthansa",
                flightNo: "LH762",
                from: "BER",
                to: "DEL",
                departure: "10:00",
                arrival: "00:30 +1",
                duration: "8h 30m",
                cost: 15000
            }
        ],
        hotel: {
            name: "Hotel Zoo Berlin",
            rating: 4,
            location: "Kurfürstendamm, Berlin",
            distanceToCenter: "1 km",
            totalCost: 18000,
            image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
            nights: 3
        },
        transfers: [
            {
                from: "BER Airport",
                to: "Hotel",
                type: "S-Bahn",
                cost: 500
            },
            {
                from: "Hotel",
                to: "Potsdam",
                type: "S-Bahn",
                cost: 1000
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "S-Bahn",
                cost: 500
            }
        ],
        days: [
            {
                day: 1,
                title: "Wall & History",
                items: [
                    {
                        time: "10:00",
                        activity: "Brandenburg Gate",
                        description: "Symbol of reunification",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Holocaust Memorial",
                        description: "Haunting concrete stelae",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Currywurst lunch",
                        description: "Berlin's iconic street food",
                        cost: 800,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "East Side Gallery",
                        description: "Berlin Wall art mile",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "22:00",
                        activity: "Techno club night",
                        description: "Tresor or Watergate",
                        cost: 2500,
                        type: "relax"
                    }
                ]
            },
            {
                day: 2,
                title: "Museum Island",
                items: [
                    {
                        time: "10:00",
                        activity: "Pergamon Museum",
                        description: "Ancient Babylonian gate",
                        cost: 1900,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Hackescher Markt lunch",
                        description: "Trendy courtyard dining",
                        cost: 2000,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Checkpoint Charlie",
                        description: "Cold War border crossing",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Kreuzberg dinner",
                        description: "Multicultural street food",
                        cost: 2000,
                        type: "food"
                    }
                ]
            },
            {
                day: 3,
                title: "Alternative Berlin & Farewell",
                items: [
                    {
                        time: "10:00",
                        activity: "Street art tour",
                        description: "Kreuzberg murals",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Markthalle Neun",
                        description: "Street food market",
                        cost: 1500,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Tempelhofer Feld",
                        description: "Abandoned airport park",
                        cost: 0,
                        type: "relax"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Rooftop bar with views",
                        cost: 3500,
                        type: "food"
                    }
                ]
            },
            {
                day: 4,
                title: "Departure",
                items: [
                    {
                        time: "07:00",
                        activity: "Checkout",
                        description: "S-Bahn to BER",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "10:00",
                        activity: "Departure Flight",
                        description: "BER → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "riga",
        name: "Riga",
        country: "Latvia",
        image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&q=80",
        description: "Art Nouveau gem of the Baltics - medieval old town meets vibrant Central Market",
        tags: [
            "Art Nouveau",
            "Baltic",
            "Medieval",
            "Budget",
            "Culture",
            "Architecture"
        ],
        duration: "3 Days, 2 Nights",
        costLevel: 1,
        totalCost: 55000,
        vibeVector: {
            Culture: 0.8,
            Heritage: 0.8,
            Architecture: 0.9,
            Budget: 0.8,
            History: 0.7,
            Urban: 0.6,
            Quiet: 0.5
        },
        activityVector: {
            Architecture: 0.9,
            Heritage: 0.8,
            Culture: 0.7,
            Food: 0.6,
            History: 0.7,
            Photography: 0.7,
            Walking: 0.7
        },
        stayVector: {
            Budget: 0.9,
            Historic: 0.6,
            City: 0.7,
            Boutique: 0.5
        },
        breakdown: {
            flights: 26000,
            stay: 12000,
            activities: 11000,
            transfers: 6000
        },
        flights: [
            {
                type: "departure",
                airline: "airBaltic",
                flightNo: "BT504",
                from: "DEL",
                to: "RIX",
                departure: "02:00",
                arrival: "09:00",
                duration: "10h",
                cost: 13000
            },
            {
                type: "return",
                airline: "airBaltic",
                flightNo: "BT505",
                from: "RIX",
                to: "DEL",
                departure: "10:00",
                arrival: "23:00",
                duration: "10h",
                cost: 13000
            }
        ],
        hotel: {
            name: "Grand Hotel Kempinski Riga",
            rating: 5,
            location: "Old Town, Riga",
            distanceToCenter: "0.1 km",
            totalCost: 12000,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            nights: 2
        },
        transfers: [
            {
                from: "Riga Airport",
                to: "Hotel",
                type: "Bus",
                cost: 400
            },
            {
                from: "Hotel",
                to: "Jurmala",
                type: "Train",
                cost: 500
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Bus",
                cost: 400
            }
        ],
        days: [
            {
                day: 1,
                title: "Old Town & Art Nouveau",
                items: [
                    {
                        time: "10:00",
                        activity: "Riga Old Town walk",
                        description: "UNESCO medieval centre",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Central Market lunch",
                        description: "Zeppelin hangars food market",
                        cost: 1000,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Art Nouveau District",
                        description: "Alberta Street facades",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Black Balsam bar",
                        description: "Traditional Latvian liqueur",
                        cost: 1500,
                        type: "relax"
                    }
                ]
            },
            {
                day: 2,
                title: "Culture & Farewell",
                items: [
                    {
                        time: "09:00",
                        activity: "Latvian National Museum of Art",
                        description: "Baltic art collection",
                        cost: 800,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Freedom Monument",
                        description: "Latvian independence symbol",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Jurmala Beach excursion",
                        description: "Baltic seaside resort town",
                        cost: 1500,
                        type: "relax"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Latvian farm-to-table",
                        cost: 2500,
                        type: "food"
                    }
                ]
            },
            {
                day: 3,
                title: "Departure",
                items: [
                    {
                        time: "07:00",
                        activity: "Checkout",
                        description: "Bus to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "10:00",
                        activity: "Departure Flight",
                        description: "RIX → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "split",
        name: "Split",
        country: "Croatia",
        image: "https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&q=80",
        description: "Diocletian's Palace meets crystal-clear Adriatic - Croatia's Mediterranean gateway",
        tags: [
            "Beach",
            "Ancient",
            "Mediterranean",
            "Coastal",
            "Sailing",
            "Sun"
        ],
        duration: "4 Days, 3 Nights",
        costLevel: 1,
        totalCost: 72000,
        vibeVector: {
            Beach: 0.85,
            Mediterranean: 0.9,
            Ancient: 0.7,
            Coastal: 0.9,
            Sun: 0.85,
            Relaxed: 0.7,
            Scenic: 0.8
        },
        activityVector: {
            Beach: 0.8,
            Swimming: 0.8,
            History: 0.7,
            Sailing: 0.7,
            Food: 0.7,
            Photography: 0.7,
            Kayaking: 0.6
        },
        stayVector: {
            Sea_view: 0.8,
            Boutique: 0.7,
            Budget: 0.7,
            Central: 0.7
        },
        breakdown: {
            flights: 30000,
            stay: 18000,
            activities: 16000,
            transfers: 8000
        },
        flights: [
            {
                type: "departure",
                airline: "Croatia Airlines",
                flightNo: "OU481",
                from: "DEL",
                to: "SPU",
                departure: "23:00",
                arrival: "08:00 +1",
                duration: "12h",
                cost: 15000
            },
            {
                type: "return",
                airline: "Croatia Airlines",
                flightNo: "OU482",
                from: "SPU",
                to: "DEL",
                departure: "10:00",
                arrival: "01:00 +1",
                duration: "12h",
                cost: 15000
            }
        ],
        hotel: {
            name: "Hotel Luxe Split",
            rating: 4,
            location: "Old Town, Split",
            distanceToCenter: "0.2 km",
            totalCost: 18000,
            image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80",
            nights: 3
        },
        transfers: [
            {
                from: "Split Airport",
                to: "Hotel",
                type: "Bus",
                cost: 800
            },
            {
                from: "Hotel",
                to: "Hvar",
                type: "Catamaran",
                cost: 3000
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Bus",
                cost: 800
            }
        ],
        days: [
            {
                day: 1,
                title: "Diocletian's Palace",
                items: [
                    {
                        time: "10:00",
                        activity: "Diocletian's Palace",
                        description: "Roman emperor's retirement villa",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Lunch at Uje Oil Bar",
                        description: "Dalmatian olive oil tasting",
                        cost: 2000,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "Riva Promenade",
                        description: "Waterfront café stroll",
                        cost: 0,
                        type: "relax"
                    },
                    {
                        time: "20:00",
                        activity: "Seafood dinner",
                        description: "Grilled Adriatic fish",
                        cost: 3000,
                        type: "food"
                    }
                ]
            },
            {
                day: 2,
                title: "Islands & Sea",
                items: [
                    {
                        time: "08:00",
                        activity: "Blue Lagoon boat trip",
                        description: "Crystal-clear swimming",
                        cost: 4000,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Hvar Town visit",
                        description: "Lavender island",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Harbour dinner",
                        description: "Fresh catch dining",
                        cost: 3000,
                        type: "food"
                    }
                ]
            },
            {
                day: 3,
                title: "Beaches & Farewell",
                items: [
                    {
                        time: "10:00",
                        activity: "Bacvice Beach",
                        description: "Sandy city beach",
                        cost: 0,
                        type: "relax"
                    },
                    {
                        time: "14:00",
                        activity: "Marjan Hill hike",
                        description: "Forest hill overlooking the sea",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Peka lamb under a bell",
                        cost: 3500,
                        type: "food"
                    }
                ]
            },
            {
                day: 4,
                title: "Departure",
                items: [
                    {
                        time: "07:00",
                        activity: "Checkout",
                        description: "Bus to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "10:00",
                        activity: "Departure Flight",
                        description: "SPU → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "venice",
        name: "Venice",
        country: "Italy",
        image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80",
        description: "A floating city of gondolas, Byzantine mosaics, and timeless romance on the lagoon",
        tags: [
            "Romance",
            "Gondolas",
            "Architecture",
            "Art",
            "Unique",
            "Historic"
        ],
        duration: "4 Days, 3 Nights",
        costLevel: 3,
        totalCost: 125000,
        vibeVector: {
            Romance: 0.95,
            Scenic: 0.9,
            Unique: 0.95,
            Art: 0.8,
            Heritage: 0.9,
            Elegant: 0.8,
            Peaceful: 0.6
        },
        activityVector: {
            Photography: 0.9,
            Art: 0.8,
            Culture: 0.8,
            Architecture: 0.9,
            Food: 0.7,
            Heritage: 0.8,
            Walking: 0.7
        },
        stayVector: {
            Luxury: 0.8,
            Boutique: 0.8,
            Romantic: 0.9,
            Historic: 0.8
        },
        breakdown: {
            flights: 42000,
            stay: 45000,
            activities: 28000,
            transfers: 10000
        },
        flights: [
            {
                type: "departure",
                airline: "Alitalia",
                flightNo: "AZ590",
                from: "DEL",
                to: "VCE",
                departure: "02:00",
                arrival: "08:00",
                duration: "9h",
                cost: 21000
            },
            {
                type: "return",
                airline: "Alitalia",
                flightNo: "AZ591",
                from: "VCE",
                to: "DEL",
                departure: "10:00",
                arrival: "23:00",
                duration: "9h",
                cost: 21000
            }
        ],
        hotel: {
            name: "Hotel Danieli",
            rating: 5,
            location: "Riva degli Schiavoni, Venice",
            distanceToCenter: "0.2 km",
            totalCost: 45000,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
            nights: 3
        },
        transfers: [
            {
                from: "Marco Polo Airport",
                to: "Hotel",
                type: "Water Taxi",
                cost: 4000
            },
            {
                from: "Hotel",
                to: "Murano/Burano",
                type: "Vaporetto",
                cost: 2000
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Water Taxi",
                cost: 4000
            }
        ],
        days: [
            {
                day: 1,
                title: "San Marco & Gondola",
                items: [
                    {
                        time: "10:00",
                        activity: "St. Mark's Basilica",
                        description: "Byzantine golden mosaics",
                        cost: 500,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Doge's Palace",
                        description: "Gothic masterpiece",
                        cost: 2500,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Cicchetti lunch",
                        description: "Venetian tapas bars",
                        cost: 2000,
                        type: "food"
                    },
                    {
                        time: "17:00",
                        activity: "Gondola ride",
                        description: "Classic Venice experience",
                        cost: 8000,
                        type: "activity"
                    }
                ]
            },
            {
                day: 2,
                title: "Islands of the Lagoon",
                items: [
                    {
                        time: "09:00",
                        activity: "Murano glass-blowing",
                        description: "Centuries-old craft",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Burano lace island",
                        description: "Rainbow-coloured houses",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "15:00",
                        activity: "Torcello",
                        description: "Ancient Byzantine church",
                        cost: 500,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Rialto Bridge dinner",
                        description: "Grand Canal views",
                        cost: 5000,
                        type: "food"
                    }
                ]
            },
            {
                day: 3,
                title: "Hidden Venice & Farewell",
                items: [
                    {
                        time: "10:00",
                        activity: "Dorsoduro art walk",
                        description: "Peggy Guggenheim Collection",
                        cost: 1800,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Campo Santa Margherita",
                        description: "Local student piazza",
                        cost: 1500,
                        type: "food"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Lagoon-fresh seafood risotto",
                        cost: 5000,
                        type: "food"
                    }
                ]
            },
            {
                day: 4,
                title: "Departure",
                items: [
                    {
                        time: "07:00",
                        activity: "Checkout",
                        description: "Water taxi to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "10:00",
                        activity: "Departure Flight",
                        description: "VCE → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "madrid",
        name: "Madrid",
        country: "Spain",
        image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
        description: "Spain's vibrant capital - world-class art, late-night tapas, and royal grandeur",
        tags: [
            "Art",
            "Nightlife",
            "Food",
            "Royal",
            "Culture",
            "Urban"
        ],
        duration: "4 Days, 3 Nights",
        costLevel: 2,
        totalCost: 88000,
        vibeVector: {
            Urban: 0.8,
            Vibrant: 0.9,
            Culture: 0.8,
            Art: 0.9,
            Nightlife: 0.8,
            Royal: 0.7,
            Social: 0.8
        },
        activityVector: {
            Art: 0.95,
            Museums: 0.9,
            Food: 0.9,
            Nightlife: 0.8,
            Culture: 0.8,
            Shopping: 0.6,
            History: 0.7
        },
        stayVector: {
            City: 0.8,
            Boutique: 0.7,
            Stylish: 0.7,
            Central: 0.8
        },
        breakdown: {
            flights: 34000,
            stay: 25000,
            activities: 21000,
            transfers: 8000
        },
        flights: [
            {
                type: "departure",
                airline: "Iberia",
                flightNo: "IB6904",
                from: "DEL",
                to: "MAD",
                departure: "22:00",
                arrival: "05:30 +1",
                duration: "10h 30m",
                cost: 17000
            },
            {
                type: "return",
                airline: "Iberia",
                flightNo: "IB6905",
                from: "MAD",
                to: "DEL",
                departure: "12:00",
                arrival: "02:00 +1",
                duration: "10h",
                cost: 17000
            }
        ],
        hotel: {
            name: "The Westin Palace Madrid",
            rating: 5,
            location: "Art Triangle, Madrid",
            distanceToCenter: "0.2 km",
            totalCost: 25000,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            nights: 3
        },
        transfers: [
            {
                from: "Madrid Barajas Airport",
                to: "Hotel",
                type: "Metro",
                cost: 600
            },
            {
                from: "Hotel",
                to: "Toledo",
                type: "AVE Train",
                cost: 3000
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Metro",
                cost: 600
            }
        ],
        days: [
            {
                day: 1,
                title: "Art Triangle",
                items: [
                    {
                        time: "10:00",
                        activity: "Museo del Prado",
                        description: "Velázquez, Goya, El Greco",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Mercado de San Miguel",
                        description: "Gourmet tapas market",
                        cost: 3000,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "Reina Sofía",
                        description: "Picasso's Guernica",
                        cost: 1200,
                        type: "activity"
                    },
                    {
                        time: "22:00",
                        activity: "Late-night tapas crawl",
                        description: "La Latina neighbourhood",
                        cost: 3000,
                        type: "food"
                    }
                ]
            },
            {
                day: 2,
                title: "Royal Madrid",
                items: [
                    {
                        time: "10:00",
                        activity: "Royal Palace",
                        description: "Europe's largest royal palace",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Retiro Park",
                        description: "Crystal Palace and lake",
                        cost: 0,
                        type: "relax"
                    },
                    {
                        time: "16:00",
                        activity: "Gran Vía shopping",
                        description: "Madrid's Broadway",
                        cost: 2000,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Flamenco & dinner",
                        description: "Corral de la Morería",
                        cost: 5000,
                        type: "activity"
                    }
                ]
            },
            {
                day: 3,
                title: "Day Trip & Farewell",
                items: [
                    {
                        time: "09:00",
                        activity: "Toledo Day Trip",
                        description: "City of Three Cultures",
                        cost: 3000,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Toledo lunch",
                        description: "Carcamusas stew",
                        cost: 2000,
                        type: "food"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Churros and chocolate",
                        cost: 2500,
                        type: "food"
                    }
                ]
            },
            {
                day: 4,
                title: "Departure",
                items: [
                    {
                        time: "09:00",
                        activity: "Checkout",
                        description: "Metro to Barajas",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "12:00",
                        activity: "Departure Flight",
                        description: "MAD → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "warsaw",
        name: "Warsaw",
        country: "Poland",
        image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=800&q=80",
        description: "Phoenix city risen from the ashes - cutting-edge culture meets reconstructed Old Town",
        tags: [
            "History",
            "Modern",
            "Budget",
            "Culture",
            "Resilient",
            "Urban"
        ],
        duration: "3 Days, 2 Nights",
        costLevel: 1,
        totalCost: 52000,
        vibeVector: {
            Urban: 0.8,
            History: 0.8,
            Modern: 0.7,
            Culture: 0.7,
            Budget: 0.8,
            Resilient: 0.7,
            Trendy: 0.6
        },
        activityVector: {
            History: 0.9,
            Culture: 0.7,
            Food: 0.7,
            Museums: 0.7,
            Photography: 0.6,
            Nightlife: 0.6,
            Walking: 0.6
        },
        stayVector: {
            Budget: 0.9,
            City: 0.8,
            Modern: 0.6,
            Boutique: 0.5
        },
        breakdown: {
            flights: 24000,
            stay: 10000,
            activities: 12000,
            transfers: 6000
        },
        flights: [
            {
                type: "departure",
                airline: "LOT Polish",
                flightNo: "LO66",
                from: "DEL",
                to: "WAW",
                departure: "02:00",
                arrival: "08:00",
                duration: "9h",
                cost: 12000
            },
            {
                type: "return",
                airline: "LOT Polish",
                flightNo: "LO67",
                from: "WAW",
                to: "DEL",
                departure: "10:00",
                arrival: "23:00",
                duration: "9h",
                cost: 12000
            }
        ],
        hotel: {
            name: "Hotel Bristol Warsaw",
            rating: 5,
            location: "Krakowskie Przedmieście",
            distanceToCenter: "0.1 km",
            totalCost: 10000,
            image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
            nights: 2
        },
        transfers: [
            {
                from: "Chopin Airport",
                to: "Hotel",
                type: "Bus",
                cost: 400
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Bus",
                cost: 400
            }
        ],
        days: [
            {
                day: 1,
                title: "Old Town & History",
                items: [
                    {
                        time: "10:00",
                        activity: "Old Town Market Square",
                        description: "Meticulously rebuilt UNESCO site",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Pierogi lunch",
                        description: "Polish dumpling house",
                        cost: 800,
                        type: "food"
                    },
                    {
                        time: "14:00",
                        activity: "Warsaw Uprising Museum",
                        description: "1944 resistance history",
                        cost: 1000,
                        type: "activity"
                    },
                    {
                        time: "19:00",
                        activity: "Chopin concert",
                        description: "Piano recital in Old Town",
                        cost: 2000,
                        type: "activity"
                    }
                ]
            },
            {
                day: 2,
                title: "Modern Warsaw & Farewell",
                items: [
                    {
                        time: "10:00",
                        activity: "Palace of Culture viewpoint",
                        description: "Soviet-era tower panorama",
                        cost: 1000,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Hala Koszyki food hall",
                        description: "Modern food court",
                        cost: 1500,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Łazienki Park",
                        description: "Royal palace in the park",
                        cost: 500,
                        type: "relax"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Modern Polish cuisine",
                        cost: 2500,
                        type: "food"
                    }
                ]
            },
            {
                day: 3,
                title: "Departure",
                items: [
                    {
                        time: "07:00",
                        activity: "Checkout",
                        description: "Bus to Chopin Airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "10:00",
                        activity: "Departure Flight",
                        description: "WAW → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    }
];
