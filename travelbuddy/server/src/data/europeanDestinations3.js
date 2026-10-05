// Additional European destinations (HotelAPI-verified)
module.exports = [
    {
        destinationId: "oslo",
        name: "Oslo",
        country: "Norway",
        image: "https://images.unsplash.com/photo-1513519245288-fdf0b3ce7491?w=800&q=80",
        description: "Norway's coastal capital - Viking ships, fjord views, and the world's greatest sculpture park",
        tags: [
            "Nordic",
            "Nature",
            "Museums",
            "Fjords",
            "Sustainable",
            "Modern"
        ],
        duration: "4 Days, 3 Nights",
        costLevel: 3,
        totalCost: 125000,
        vibeVector: {
            Nordic: 0.9,
            Nature: 0.8,
            Sustainable: 0.9,
            Modern: 0.7,
            Scenic: 0.8,
            Peaceful: 0.7,
            Urban: 0.6
        },
        activityVector: {
            Museums: 0.9,
            Nature: 0.8,
            Culture: 0.7,
            Hiking: 0.6,
            Photography: 0.7,
            Food: 0.6,
            Architecture: 0.7
        },
        stayVector: {
            Design: 0.8,
            Eco: 0.8,
            City: 0.7,
            Boutique: 0.6
        },
        breakdown: {
            flights: 48000,
            stay: 40000,
            activities: 27000,
            transfers: 10000
        },
        flights: [
            {
                type: "departure",
                airline: "Norwegian Air",
                flightNo: "DY1105",
                from: "DEL",
                to: "OSL",
                departure: "01:00",
                arrival: "07:30",
                duration: "9h 30m",
                cost: 24000
            },
            {
                type: "return",
                airline: "Norwegian Air",
                flightNo: "DY1106",
                from: "OSL",
                to: "DEL",
                departure: "10:00",
                arrival: "00:30 +1",
                duration: "9h 30m",
                cost: 24000
            }
        ],
        hotel: {
            name: "The Thief Hotel",
            rating: 5,
            location: "Tjuvholmen, Oslo",
            distanceToCenter: "1 km",
            totalCost: 40000,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            nights: 3
        },
        transfers: [
            {
                from: "Oslo Airport",
                to: "Hotel",
                type: "Flytoget Express",
                cost: 3000
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Flytoget Express",
                cost: 3000
            }
        ],
        days: [
            {
                day: 1,
                title: "Viking & Munch",
                items: [
                    {
                        time: "10:00",
                        activity: "Viking Ship Museum",
                        description: "1,000-year-old Viking vessels",
                        cost: 1800,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Norwegian lunch",
                        description: "Smoked salmon open-face",
                        cost: 3000,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "MUNCH Museum",
                        description: "Edvard Munchs The Scream",
                        cost: 1800,
                        type: "activity"
                    },
                    {
                        time: "19:00",
                        activity: "Aker Brygge dinner",
                        description: "Harbourfront dining",
                        cost: 5000,
                        type: "food"
                    }
                ]
            },
            {
                day: 2,
                title: "Sculpture & Nature",
                items: [
                    {
                        time: "09:00",
                        activity: "Vigeland Sculpture Park",
                        description: "212 granite and bronze works",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Mathallen food hall",
                        description: "Oslos premier food market",
                        cost: 3000,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Oslo Opera House",
                        description: "Walk on the marble roof",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "19:00",
                        activity: "Grünerløkka bars",
                        description: "Trendy neighbourhood",
                        cost: 3000,
                        type: "relax"
                    }
                ]
            },
            {
                day: 3,
                title: "Fjord & Farewell",
                items: [
                    {
                        time: "09:00",
                        activity: "Oslofjord boat cruise",
                        description: "Island-hopping cruise",
                        cost: 4000,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Holmenkollen Ski Jump",
                        description: "Panoramic city views",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "New Nordic cuisine",
                        cost: 6000,
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
                        description: "Flytoget to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "10:00",
                        activity: "Departure Flight",
                        description: "OSL → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "milan",
        name: "Milan",
        country: "Italy",
        image: "https://images.unsplash.com/photo-1520440229-6469cfa21b70?w=800&q=80",
        description: "Fashion capital of the world - from Da Vinci's Last Supper to Armani boutiques",
        tags: [
            "Fashion",
            "Design",
            "Art",
            "Shopping",
            "Culture",
            "Modern"
        ],
        duration: "4 Days, 3 Nights",
        costLevel: 2,
        totalCost: 105000,
        vibeVector: {
            Fashion: 0.95,
            Design: 0.9,
            Urban: 0.8,
            Modern: 0.8,
            Art: 0.7,
            Culture: 0.7,
            Elegant: 0.9
        },
        activityVector: {
            Shopping: 0.95,
            Art: 0.8,
            Architecture: 0.8,
            Food: 0.8,
            Culture: 0.7,
            Design: 0.9,
            Photography: 0.6
        },
        stayVector: {
            Luxury: 0.8,
            Design: 0.9,
            City: 0.8,
            Stylish: 0.9
        },
        breakdown: {
            flights: 38000,
            stay: 35000,
            activities: 24000,
            transfers: 8000
        },
        flights: [
            {
                type: "departure",
                airline: "Alitalia",
                flightNo: "AZ769",
                from: "DEL",
                to: "MXP",
                departure: "02:00",
                arrival: "07:30",
                duration: "9h 30m",
                cost: 19000
            },
            {
                type: "return",
                airline: "Alitalia",
                flightNo: "AZ770",
                from: "MXP",
                to: "DEL",
                departure: "10:00",
                arrival: "00:30 +1",
                duration: "9h 30m",
                cost: 19000
            }
        ],
        hotel: {
            name: "Armani Hotel Milano",
            rating: 5,
            location: "Quadrilatero della Moda",
            distanceToCenter: "0.2 km",
            totalCost: 35000,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
            nights: 3
        },
        transfers: [
            {
                from: "Malpensa Airport",
                to: "Hotel",
                type: "Malpensa Express",
                cost: 2000
            },
            {
                from: "Hotel",
                to: "Lake Como",
                type: "Train",
                cost: 2000
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Malpensa Express",
                cost: 2000
            }
        ],
        days: [
            {
                day: 1,
                title: "Duomo & Fashion",
                items: [
                    {
                        time: "09:00",
                        activity: "Milan Cathedral",
                        description: "Gothic marble masterpiece",
                        cost: 1600,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Galleria Vittorio Emanuele II",
                        description: "Luxurious shopping arcade",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Risotto alla Milanese lunch",
                        description: "Saffron risotto",
                        cost: 3000,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "Quadrilatero della Moda",
                        description: "Fashion district shopping",
                        cost: 3000,
                        type: "activity"
                    }
                ]
            },
            {
                day: 2,
                title: "Art & Culture",
                items: [
                    {
                        time: "09:00",
                        activity: "The Last Supper",
                        description: "Da Vinci's masterpiece",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Navigli lunch",
                        description: "Canal district dining",
                        cost: 2500,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "La Scala Opera House tour",
                        description: "World-famous opera theatre",
                        cost: 1200,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Aperitivo in Brera",
                        description: "Italian aperitif culture",
                        cost: 2500,
                        type: "food"
                    }
                ]
            },
            {
                day: 3,
                title: "Lake Como & Farewell",
                items: [
                    {
                        time: "08:00",
                        activity: "Lake Como day trip",
                        description: "Villa Bellagio cruise",
                        cost: 5000,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Lakeside lunch",
                        description: "Fresh lake fish",
                        cost: 3000,
                        type: "food"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Milanese osso buco",
                        cost: 4500,
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
                        description: "Malpensa Express to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "10:00",
                        activity: "Departure Flight",
                        description: "MXP → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "geneva",
        name: "Geneva",
        country: "Switzerland",
        image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&q=80",
        description: "Jet d'Eau fountain, Mont Blanc views, and the world capital of diplomacy and watches",
        tags: [
            "Lake",
            "Mountains",
            "Luxury",
            "Watches",
            "International",
            "Scenic"
        ],
        duration: "3 Days, 2 Nights",
        costLevel: 3,
        totalCost: 130000,
        vibeVector: {
            Luxury: 0.9,
            Scenic: 0.9,
            Mountains: 0.7,
            Peaceful: 0.8,
            Elegant: 0.9,
            Nature: 0.7,
            International: 0.7
        },
        activityVector: {
            Shopping: 0.7,
            Nature: 0.7,
            Photography: 0.8,
            Culture: 0.6,
            Food: 0.7,
            Relaxation: 0.7,
            Skiing: 0.5
        },
        stayVector: {
            Luxury: 0.95,
            Scenic: 0.9,
            Premium: 0.9,
            Lake_view: 0.8
        },
        breakdown: {
            flights: 50000,
            stay: 45000,
            activities: 25000,
            transfers: 10000
        },
        flights: [
            {
                type: "departure",
                airline: "Swiss",
                flightNo: "LX149",
                from: "DEL",
                to: "GVA",
                departure: "23:30",
                arrival: "05:00 +1",
                duration: "8h 30m",
                cost: 25000
            },
            {
                type: "return",
                airline: "Swiss",
                flightNo: "LX150",
                from: "GVA",
                to: "DEL",
                departure: "13:00",
                arrival: "01:30 +1",
                duration: "8h 30m",
                cost: 25000
            }
        ],
        hotel: {
            name: "Hotel Beau-Rivage Geneva",
            rating: 5,
            location: "Lake Geneva waterfront",
            distanceToCenter: "0.3 km",
            totalCost: 45000,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
            nights: 2
        },
        transfers: [
            {
                from: "Geneva Airport",
                to: "Hotel",
                type: "Train",
                cost: 500
            },
            {
                from: "Hotel",
                to: "Chamonix",
                type: "Bus",
                cost: 4000
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Train",
                cost: 500
            }
        ],
        days: [
            {
                day: 1,
                title: "Lake & Old Town",
                items: [
                    {
                        time: "10:00",
                        activity: "Jet d'Eau fountain",
                        description: "Iconic 140m water jet",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Old Town walk",
                        description: "St. Pierre Cathedral",
                        cost: 500,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Swiss fondue lunch",
                        description: "Cheese fondue by the lake",
                        cost: 4000,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "CERN Science Centre",
                        description: "Particle physics exhibition",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Lakeside dinner",
                        description: "Fine French-Swiss cuisine",
                        cost: 6000,
                        type: "food"
                    }
                ]
            },
            {
                day: 2,
                title: "Chamonix & Mont Blanc",
                items: [
                    {
                        time: "08:00",
                        activity: "Chamonix day trip",
                        description: "Cable car to Mont Blanc views",
                        cost: 6000,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Alpine lunch",
                        description: "Mountain chalet dining",
                        cost: 4000,
                        type: "food"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Gourmet Swiss dining",
                        cost: 6000,
                        type: "food"
                    }
                ]
            },
            {
                day: 3,
                title: "Departure",
                items: [
                    {
                        time: "09:00",
                        activity: "Checkout",
                        description: "Train to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "13:00",
                        activity: "Departure Flight",
                        description: "GVA → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "brussels",
        name: "Brussels",
        country: "Belgium",
        image: "https://images.unsplash.com/photo-1559113202-c916b8e44373?w=800&q=80",
        description: "EU capital with stunning Grand Place, Belgian chocolate, waffles, and world-class beer",
        tags: [
            "Chocolate",
            "Beer",
            "Art Nouveau",
            "EU",
            "Culture",
            "Food"
        ],
        duration: "3 Days, 2 Nights",
        costLevel: 2,
        totalCost: 75000,
        vibeVector: {
            Culture: 0.7,
            Urban: 0.7,
            Food: 0.8,
            Heritage: 0.7,
            Cosmopolitan: 0.8,
            Art: 0.6,
            Social: 0.6
        },
        activityVector: {
            Food: 0.9,
            Culture: 0.7,
            Architecture: 0.7,
            History: 0.6,
            Art: 0.6,
            Shopping: 0.5,
            Museums: 0.6
        },
        stayVector: {
            City: 0.8,
            Boutique: 0.6,
            Central: 0.8,
            Budget: 0.6
        },
        breakdown: {
            flights: 32000,
            stay: 20000,
            activities: 15000,
            transfers: 8000
        },
        flights: [
            {
                type: "departure",
                airline: "Brussels Airlines",
                flightNo: "SN560",
                from: "DEL",
                to: "BRU",
                departure: "22:00",
                arrival: "05:00 +1",
                duration: "10h",
                cost: 16000
            },
            {
                type: "return",
                airline: "Brussels Airlines",
                flightNo: "SN561",
                from: "BRU",
                to: "DEL",
                departure: "10:30",
                arrival: "00:30 +1",
                duration: "10h",
                cost: 16000
            }
        ],
        hotel: {
            name: "Hotel Amigo Brussels",
            rating: 5,
            location: "Grand Place, Brussels",
            distanceToCenter: "0.1 km",
            totalCost: 20000,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            nights: 2
        },
        transfers: [
            {
                from: "Brussels Airport",
                to: "Hotel",
                type: "Train",
                cost: 1500
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Train",
                cost: 1500
            }
        ],
        days: [
            {
                day: 1,
                title: "Grand Place & Chocolate",
                items: [
                    {
                        time: "10:00",
                        activity: "Grand Place",
                        description: "UNESCO gilded square",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Moules-frites lunch",
                        description: "Belgian mussel classic",
                        cost: 2500,
                        type: "food"
                    },
                    {
                        time: "14:00",
                        activity: "Belgian Chocolate tour",
                        description: "Pierre Marcolini tasting",
                        cost: 2000,
                        type: "activity"
                    },
                    {
                        time: "17:00",
                        activity: "Manneken Pis",
                        description: "Iconic peeing boy statue",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Belgian beer tasting",
                        description: "Delirium Café",
                        cost: 2500,
                        type: "relax"
                    }
                ]
            },
            {
                day: 2,
                title: "Art & Waffles",
                items: [
                    {
                        time: "10:00",
                        activity: "Magritte Museum",
                        description: "Surrealist masterpieces",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Liège waffle",
                        description: "Authentic street waffle",
                        cost: 500,
                        type: "food"
                    },
                    {
                        time: "14:00",
                        activity: "Atomium",
                        description: "Iconic 1958 Expo monument",
                        cost: 1600,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Traditional waterzooi stew",
                        cost: 3500,
                        type: "food"
                    }
                ]
            },
            {
                day: 3,
                title: "Departure",
                items: [
                    {
                        time: "08:00",
                        activity: "Checkout",
                        description: "Train to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "10:30",
                        activity: "Departure Flight",
                        description: "BRU → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "vilnius",
        name: "Vilnius",
        country: "Lithuania",
        image: "https://images.unsplash.com/photo-1573158770290-e4e9ed6d7f49?w=800&q=80",
        description: "Baroque jewel of the Baltics - cobblestone lanes, hilltop castles, and a bohemian spirit",
        tags: [
            "Baroque",
            "Baltic",
            "Budget",
            "Art",
            "Bohemian",
            "Heritage"
        ],
        duration: "3 Days, 2 Nights",
        costLevel: 1,
        totalCost: 48000,
        vibeVector: {
            Heritage: 0.8,
            Culture: 0.7,
            Budget: 0.9,
            Art: 0.7,
            Quiet: 0.7,
            Bohemian: 0.8,
            Historic: 0.8
        },
        activityVector: {
            Heritage: 0.8,
            Culture: 0.7,
            Food: 0.6,
            Photography: 0.7,
            History: 0.7,
            Art: 0.7,
            Walking: 0.7
        },
        stayVector: {
            Budget: 0.95,
            Boutique: 0.5,
            Historic: 0.6,
            Cozy: 0.6
        },
        breakdown: {
            flights: 24000,
            stay: 8000,
            activities: 10000,
            transfers: 6000
        },
        flights: [
            {
                type: "departure",
                airline: "Turkish Airlines",
                flightNo: "TK780",
                from: "DEL",
                to: "VNO",
                departure: "02:00",
                arrival: "10:00",
                duration: "11h",
                cost: 12000
            },
            {
                type: "return",
                airline: "Turkish Airlines",
                flightNo: "TK781",
                from: "VNO",
                to: "DEL",
                departure: "11:00",
                arrival: "02:00 +1",
                duration: "11h",
                cost: 12000
            }
        ],
        hotel: {
            name: "Hotel Pacai",
            rating: 5,
            location: "Old Town, Vilnius",
            distanceToCenter: "0.1 km",
            totalCost: 8000,
            image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
            nights: 2
        },
        transfers: [
            {
                from: "Vilnius Airport",
                to: "Hotel",
                type: "Bus",
                cost: 300
            },
            {
                from: "Hotel",
                to: "Trakai",
                type: "Bus",
                cost: 800
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Bus",
                cost: 300
            }
        ],
        days: [
            {
                day: 1,
                title: "Old Town & Castles",
                items: [
                    {
                        time: "10:00",
                        activity: "Gediminas Tower",
                        description: "Hilltop castle panorama",
                        cost: 600,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Vilnius Cathedral",
                        description: "Neoclassical landmark",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Lithuanian cepelinai lunch",
                        description: "Potato dumplings",
                        cost: 600,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "Užupis Republic",
                        description: "Bohemian artist quarter",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Craft beer bars",
                        description: "Lithuanian craft scene",
                        cost: 1500,
                        type: "relax"
                    }
                ]
            },
            {
                day: 2,
                title: "Trakai & Farewell",
                items: [
                    {
                        time: "09:00",
                        activity: "Trakai Island Castle",
                        description: "Medieval lake castle day trip",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Kibinai lunch",
                        description: "Karaite pastries at Trakai",
                        cost: 800,
                        type: "food"
                    },
                    {
                        time: "17:00",
                        activity: "Gates of Dawn",
                        description: "Sacred religious icon",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Modern Lithuanian cuisine",
                        cost: 2000,
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
                        time: "11:00",
                        activity: "Departure Flight",
                        description: "VNO → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "lyon",
        name: "Lyon",
        country: "France",
        image: "https://images.unsplash.com/photo-1524397057410-1e775ed476f3?w=800&q=80",
        description: "Gastronomic capital of France - silk traditions, traboules, and Michelin-star density",
        tags: [
            "Gastronomy",
            "Culture",
            "History",
            "Wine",
            "Food",
            "UNESCO"
        ],
        duration: "3 Days, 2 Nights",
        costLevel: 2,
        totalCost: 85000,
        vibeVector: {
            Gastronomy: 0.95,
            Culture: 0.8,
            Authentic: 0.8,
            Historic: 0.7,
            Elegant: 0.7,
            River: 0.6,
            Romantic: 0.6
        },
        activityVector: {
            Food: 0.95,
            Wine: 0.8,
            Culture: 0.7,
            History: 0.7,
            Architecture: 0.7,
            Photography: 0.6,
            Walking: 0.6
        },
        stayVector: {
            Boutique: 0.7,
            City: 0.7,
            Stylish: 0.6,
            Central: 0.7
        },
        breakdown: {
            flights: 36000,
            stay: 22000,
            activities: 19000,
            transfers: 8000
        },
        flights: [
            {
                type: "departure",
                airline: "Air France",
                flightNo: "AF342",
                from: "DEL",
                to: "LYS",
                departure: "23:00",
                arrival: "06:00 +1",
                duration: "10h",
                cost: 18000
            },
            {
                type: "return",
                airline: "Air France",
                flightNo: "AF343",
                from: "LYS",
                to: "DEL",
                departure: "09:00",
                arrival: "22:00",
                duration: "10h",
                cost: 18000
            }
        ],
        hotel: {
            name: "Cour des Loges",
            rating: 5,
            location: "Vieux Lyon",
            distanceToCenter: "0.2 km",
            totalCost: 22000,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
            nights: 2
        },
        transfers: [
            {
                from: "Lyon Airport",
                to: "Hotel",
                type: "Rhonexpress",
                cost: 2000
            },
            {
                from: "Hotel",
                to: "Beaujolais",
                type: "Tour Bus",
                cost: 4000
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Rhonexpress",
                cost: 2000
            }
        ],
        days: [
            {
                day: 1,
                title: "Bouchon Crawl",
                items: [
                    {
                        time: "09:00",
                        activity: "Vieux Lyon traboules",
                        description: "Hidden Renaissance passageways",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Bouchon Lyonnais lunch",
                        description: "Quenelles and andouillette",
                        cost: 3000,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Basilica of Notre-Dame de Fourvière",
                        description: "Hilltop basilica views",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Les Halles de Lyon Paul Bocuse",
                        description: "Gourmet food market dinner",
                        cost: 4000,
                        type: "food"
                    }
                ]
            },
            {
                day: 2,
                title: "Wine & Farewell",
                items: [
                    {
                        time: "09:00",
                        activity: "Beaujolais wine tour",
                        description: "Vineyard tasting half-day",
                        cost: 5000,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Presqu'ile shopping",
                        description: "Lyon's peninsula",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Michelin dining experience",
                        cost: 6000,
                        type: "food"
                    }
                ]
            },
            {
                day: 3,
                title: "Departure",
                items: [
                    {
                        time: "06:00",
                        activity: "Checkout",
                        description: "Rhonexpress to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "09:00",
                        activity: "Departure Flight",
                        description: "LYS → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "bucharest",
        name: "Bucharest",
        country: "Romania",
        image: "https://images.unsplash.com/photo-1587974928442-77dc3e0748b1?w=800&q=80",
        description: "Little Paris of the East - grand boulevards, Ottoman churches, and Dracula legends",
        tags: [
            "History",
            "Budget",
            "Architecture",
            "Nightlife",
            "Eclectic",
            "Cultural"
        ],
        duration: "3 Days, 2 Nights",
        costLevel: 1,
        totalCost: 50000,
        vibeVector: {
            Urban: 0.7,
            Budget: 0.9,
            History: 0.7,
            Nightlife: 0.7,
            Eclectic: 0.8,
            Culture: 0.6,
            Heritage: 0.6
        },
        activityVector: {
            History: 0.7,
            Nightlife: 0.8,
            Food: 0.7,
            Culture: 0.6,
            Architecture: 0.7,
            Photography: 0.5,
            Walking: 0.6
        },
        stayVector: {
            Budget: 0.95,
            City: 0.7,
            Boutique: 0.5,
            Central: 0.7
        },
        breakdown: {
            flights: 22000,
            stay: 10000,
            activities: 12000,
            transfers: 6000
        },
        flights: [
            {
                type: "departure",
                airline: "Turkish Airlines",
                flightNo: "TK790",
                from: "DEL",
                to: "OTP",
                departure: "03:00",
                arrival: "10:00",
                duration: "10h",
                cost: 11000
            },
            {
                type: "return",
                airline: "Turkish Airlines",
                flightNo: "TK791",
                from: "OTP",
                to: "DEL",
                departure: "11:00",
                arrival: "01:00 +1",
                duration: "10h",
                cost: 11000
            }
        ],
        hotel: {
            name: "Hotel Epoque Bucharest",
            rating: 5,
            location: "Old Town, Bucharest",
            distanceToCenter: "0.5 km",
            totalCost: 10000,
            image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
            nights: 2
        },
        transfers: [
            {
                from: "Otopeni Airport",
                to: "Hotel",
                type: "Express Bus",
                cost: 500
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Express Bus",
                cost: 500
            }
        ],
        days: [
            {
                day: 1,
                title: "Palaces & Old Town",
                items: [
                    {
                        time: "10:00",
                        activity: "Palace of the Parliament",
                        description: "World's heaviest building",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Romanian lunch",
                        description: "Sarmale and mămăligă",
                        cost: 800,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Old Town walk",
                        description: "Lipscani historical centre",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "21:00",
                        activity: "Old Town nightlife",
                        description: "Craft bars and clubs",
                        cost: 2000,
                        type: "relax"
                    }
                ]
            },
            {
                day: 2,
                title: "Villages & Farewell",
                items: [
                    {
                        time: "10:00",
                        activity: "Village Museum",
                        description: "Open-air traditional houses",
                        cost: 500,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Mici street food",
                        description: "Romanian grilled rolls",
                        cost: 500,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Romanian Athenaeum",
                        description: "Neoclassical concert hall",
                        cost: 800,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Modern Romanian cuisine",
                        cost: 2000,
                        type: "food"
                    }
                ]
            },
            {
                day: 3,
                title: "Departure",
                items: [
                    {
                        time: "08:00",
                        activity: "Checkout",
                        description: "Bus to Otopeni",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "11:00",
                        activity: "Departure Flight",
                        description: "OTP → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "valletta",
        name: "Valletta",
        country: "Malta",
        image: "https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&q=80",
        description: "A fortified Mediterranean gem - Knights of Malta, azure grottoes, and ancient temples",
        tags: [
            "Mediterranean",
            "History",
            "Knights",
            "Beach",
            "Heritage",
            "Sun"
        ],
        duration: "4 Days, 3 Nights",
        costLevel: 1,
        totalCost: 65000,
        vibeVector: {
            Mediterranean: 0.9,
            Historic: 0.85,
            Beach: 0.7,
            Sun: 0.9,
            Heritage: 0.8,
            Warm: 0.85,
            Scenic: 0.8
        },
        activityVector: {
            History: 0.9,
            Beach: 0.7,
            Culture: 0.7,
            Photography: 0.8,
            Swimming: 0.6,
            Heritage: 0.8,
            Walking: 0.7
        },
        stayVector: {
            Boutique: 0.7,
            Historic: 0.8,
            Budget: 0.7,
            Sea_view: 0.6
        },
        breakdown: {
            flights: 28000,
            stay: 16000,
            activities: 14000,
            transfers: 7000
        },
        flights: [
            {
                type: "departure",
                airline: "Air Malta",
                flightNo: "KM101",
                from: "DEL",
                to: "MLA",
                departure: "02:00",
                arrival: "09:00",
                duration: "10h",
                cost: 14000
            },
            {
                type: "return",
                airline: "Air Malta",
                flightNo: "KM102",
                from: "MLA",
                to: "DEL",
                departure: "10:00",
                arrival: "23:00",
                duration: "10h",
                cost: 14000
            }
        ],
        hotel: {
            name: "The Phoenicia Malta",
            rating: 5,
            location: "City Gate, Valletta",
            distanceToCenter: "0.1 km",
            totalCost: 16000,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            nights: 3
        },
        transfers: [
            {
                from: "Malta Airport",
                to: "Hotel",
                type: "Bus",
                cost: 500
            },
            {
                from: "Hotel",
                to: "Gozo",
                type: "Ferry",
                cost: 2500
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Bus",
                cost: 500
            }
        ],
        days: [
            {
                day: 1,
                title: "Knights & Cathedrals",
                items: [
                    {
                        time: "10:00",
                        activity: "St. John's Co-Cathedral",
                        description: "Caravaggio's masterpiece",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Upper Barrakka Gardens",
                        description: "Grand Harbour panorama",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Pastizzi lunch",
                        description: "Maltese ricotta pastry",
                        cost: 500,
                        type: "food"
                    },
                    {
                        time: "17:00",
                        activity: "Mdina Old Capital",
                        description: "Silent city walls",
                        cost: 0,
                        type: "activity"
                    }
                ]
            },
            {
                day: 2,
                title: "Blue Grotto & Temples",
                items: [
                    {
                        time: "09:00",
                        activity: "Blue Grotto boat trip",
                        description: "Azure sea caves",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Hagar Qim Temples",
                        description: "5,000-year-old megalithic temples",
                        cost: 1000,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Marsaxlokk fish market",
                        description: "Colourful fishing village",
                        cost: 1500,
                        type: "food"
                    },
                    {
                        time: "20:00",
                        activity: "Harbour dinner",
                        description: "Fresh swordfish",
                        cost: 3000,
                        type: "food"
                    }
                ]
            },
            {
                day: 3,
                title: "Gozo Island & Farewell",
                items: [
                    {
                        time: "08:00",
                        activity: "Gozo Island trip",
                        description: "Citadella fortress and beaches",
                        cost: 2500,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Gozo ftira sandwich",
                        description: "Traditional flatbread",
                        cost: 500,
                        type: "food"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Rabbit stew and local wine",
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
                        time: "07:00",
                        activity: "Checkout",
                        description: "Bus to Malta Airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "10:00",
                        activity: "Departure Flight",
                        description: "MLA → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    }
];
