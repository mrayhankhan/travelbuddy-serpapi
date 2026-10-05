// Additional European destinations (HotelAPI-verified)
module.exports = [
    {
        destinationId: "barcelona",
        name: "Barcelona",
        country: "Spain",
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
        description: "Gaudí's masterpieces, golden beaches, and legendary tapas - Barcelona is Spain's Mediterranean jewel",
        tags: [
            "Beach",
            "Art",
            "Nightlife",
            "Gastronomy",
            "Architecture",
            "Mediterranean"
        ],
        duration: "5 Days, 4 Nights",
        costLevel: 2,
        totalCost: 98000,
        vibeVector: {
            Beach: 0.8,
            Art: 0.9,
            Nightlife: 0.8,
            Gastronomy: 0.9,
            Culture: 0.7,
            Warm: 0.8,
            Vibrant: 0.9,
            Mediterranean: 0.9
        },
        activityVector: {
            Food: 0.9,
            Architecture: 0.9,
            Beach: 0.7,
            Nightlife: 0.8,
            Photography: 0.7,
            Shopping: 0.6,
            Art: 0.8
        },
        stayVector: {
            Boutique: 0.8,
            City: 0.7,
            Beach: 0.6,
            Stylish: 0.7
        },
        breakdown: {
            flights: 38000,
            stay: 30000,
            activities: 22000,
            transfers: 8000
        },
        flights: [
            {
                type: "departure",
                airline: "Vueling",
                flightNo: "VY8701",
                from: "DEL",
                to: "BCN",
                departure: "22:00",
                arrival: "06:30 +1",
                duration: "11h 30m",
                cost: 19000
            },
            {
                type: "return",
                airline: "Vueling",
                flightNo: "VY8702",
                from: "BCN",
                to: "DEL",
                departure: "10:00",
                arrival: "00:30 +1",
                duration: "11h 30m",
                cost: 19000
            }
        ],
        hotel: {
            name: "Hotel Arts Barcelona",
            rating: 5,
            location: "Barceloneta, Barcelona",
            distanceToCenter: "1.5 km",
            totalCost: 30000,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            nights: 4
        },
        transfers: [
            {
                from: "Barcelona Airport",
                to: "Hotel",
                type: "Aerobus",
                cost: 2000
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Aerobus",
                cost: 2000
            },
            {
                from: "Hotel",
                to: "Montserrat",
                type: "Tour Bus",
                cost: 4000
            }
        ],
        days: [
            {
                day: 1,
                title: "Gothic Quarter & Tapas",
                items: [
                    {
                        time: "10:00",
                        activity: "Gothic Quarter Walk",
                        description: "Medieval lanes and plazas",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "La Boqueria Market",
                        description: "Fresh tapas and juices",
                        cost: 2500,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "Barcelona Cathedral",
                        description: "Gothic masterpiece",
                        cost: 500,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Tapas crawl in El Born",
                        description: "Local pintxos bars",
                        cost: 3500,
                        type: "food"
                    }
                ]
            },
            {
                day: 2,
                title: "Gaudí Day",
                items: [
                    {
                        time: "09:00",
                        activity: "Sagrada Familia",
                        description: "Gaudí's unfinished basilica",
                        cost: 2600,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Park Güell",
                        description: "Mosaic-covered hilltop park",
                        cost: 1000,
                        type: "activity"
                    },
                    {
                        time: "16:00",
                        activity: "Casa Batlló",
                        description: "Dragon-spine rooftop",
                        cost: 3500,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Dinner at Cervecería Catalana",
                        description: "Famous tapas restaurant",
                        cost: 3500,
                        type: "food"
                    }
                ]
            },
            {
                day: 3,
                title: "Beach & Barceloneta",
                items: [
                    {
                        time: "10:00",
                        activity: "Barceloneta Beach",
                        description: "Mediterranean swimming",
                        cost: 0,
                        type: "relax"
                    },
                    {
                        time: "13:00",
                        activity: "Seafood paella lunch",
                        description: "Beachside restaurant",
                        cost: 3000,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "Picasso Museum",
                        description: "Early Picasso works",
                        cost: 1200,
                        type: "activity"
                    },
                    {
                        time: "22:00",
                        activity: "Nightlife in Raval",
                        description: "Cocktail bars and clubs",
                        cost: 3000,
                        type: "relax"
                    }
                ]
            },
            {
                day: 4,
                title: "Montjuïc & Farewell",
                items: [
                    {
                        time: "10:00",
                        activity: "Montjuïc Castle",
                        description: "Hilltop fortress with views",
                        cost: 800,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Lunch at Tickets",
                        description: "Creative molecular tapas",
                        cost: 4000,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "Las Ramblas stroll",
                        description: "Iconic boulevard shopping",
                        cost: 2000,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Catalan fine dining",
                        cost: 5000,
                        type: "food"
                    }
                ]
            },
            {
                day: 5,
                title: "Departure",
                items: [
                    {
                        time: "07:00",
                        activity: "Checkout",
                        description: "Aerobus to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "10:00",
                        activity: "Departure Flight",
                        description: "BCN → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "rome",
        name: "Rome",
        country: "Italy",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
        description: "The Eternal City - 2,700 years of history from the Colosseum to Vatican masterpieces",
        tags: [
            "History",
            "Art",
            "Food",
            "Ancient",
            "Culture",
            "Romance"
        ],
        duration: "5 Days, 4 Nights",
        costLevel: 2,
        totalCost: 105000,
        vibeVector: {
            History: 0.95,
            Culture: 0.9,
            Romance: 0.8,
            Art: 0.9,
            Food: 0.8,
            Ancient: 0.95,
            Scenic: 0.7
        },
        activityVector: {
            History: 0.95,
            Art: 0.9,
            Food: 0.9,
            Culture: 0.8,
            Photography: 0.8,
            Architecture: 0.9,
            Walking: 0.7
        },
        stayVector: {
            Boutique: 0.7,
            Historic: 0.8,
            City: 0.7,
            Luxury: 0.6
        },
        breakdown: {
            flights: 40000,
            stay: 32000,
            activities: 24000,
            transfers: 9000
        },
        flights: [
            {
                type: "departure",
                airline: "Alitalia",
                flightNo: "AZ769",
                from: "DEL",
                to: "FCO",
                departure: "02:00",
                arrival: "07:30",
                duration: "9h 30m",
                cost: 20000
            },
            {
                type: "return",
                airline: "Alitalia",
                flightNo: "AZ770",
                from: "FCO",
                to: "DEL",
                departure: "11:00",
                arrival: "01:00 +1",
                duration: "9h",
                cost: 20000
            }
        ],
        hotel: {
            name: "Hotel de Russie",
            rating: 5,
            location: "Piazza del Popolo, Rome",
            distanceToCenter: "0.3 km",
            totalCost: 32000,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            nights: 4
        },
        transfers: [
            {
                from: "Fiumicino Airport",
                to: "Hotel",
                type: "Leonardo Express",
                cost: 2500
            },
            {
                from: "Hotel",
                to: "Vatican",
                type: "Metro",
                cost: 500
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Leonardo Express",
                cost: 2500
            }
        ],
        days: [
            {
                day: 1,
                title: "Ancient Rome",
                items: [
                    {
                        time: "09:00",
                        activity: "Colosseum",
                        description: "Iconic Roman amphitheatre",
                        cost: 2500,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Roman Forum",
                        description: "Heart of ancient Rome",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Lunch in Trastevere",
                        description: "Classic Roman pasta",
                        cost: 2500,
                        type: "food"
                    },
                    {
                        time: "17:00",
                        activity: "Palatine Hill",
                        description: "Emperor's palaces",
                        cost: 0,
                        type: "activity"
                    }
                ]
            },
            {
                day: 2,
                title: "Vatican City",
                items: [
                    {
                        time: "08:00",
                        activity: "Vatican Museums",
                        description: "Raphael Rooms and antiquities",
                        cost: 2000,
                        type: "activity"
                    },
                    {
                        time: "11:00",
                        activity: "Sistine Chapel",
                        description: "Michelangelo's ceiling",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "St. Peter's Basilica",
                        description: "World's largest church",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Dinner near Piazza Navona",
                        description: "Cacio e pepe and wine",
                        cost: 4000,
                        type: "food"
                    }
                ]
            },
            {
                day: 3,
                title: "Baroque Rome",
                items: [
                    {
                        time: "10:00",
                        activity: "Trevi Fountain",
                        description: "Toss a coin and make a wish",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Spanish Steps",
                        description: "Iconic stairway",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Pantheon",
                        description: "2000-year-old temple",
                        cost: 500,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Gelato crawl",
                        description: "Best gelaterias in Rome",
                        cost: 1500,
                        type: "food"
                    }
                ]
            },
            {
                day: 4,
                title: "Trastevere & Farewell",
                items: [
                    {
                        time: "10:00",
                        activity: "Borghese Gallery",
                        description: "Bernini sculptures",
                        cost: 2000,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Trastevere food tour",
                        description: "Supplì, pizza al taglio",
                        cost: 3000,
                        type: "food"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Rooftop dining with views",
                        cost: 5000,
                        type: "food"
                    }
                ]
            },
            {
                day: 5,
                title: "Departure",
                items: [
                    {
                        time: "08:00",
                        activity: "Checkout",
                        description: "Train to Fiumicino",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "11:00",
                        activity: "Departure Flight",
                        description: "FCO → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "paris",
        name: "Paris",
        country: "France",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
        description: "The City of Light - art, fashion, cuisine, and the Eiffel Tower under a romantic sky",
        tags: [
            "Romance",
            "Art",
            "Fashion",
            "Cuisine",
            "Culture",
            "Iconic"
        ],
        duration: "5 Days, 4 Nights",
        costLevel: 3,
        totalCost: 130000,
        vibeVector: {
            Romance: 0.95,
            Art: 0.9,
            Elegant: 0.9,
            Culture: 0.9,
            Fashion: 0.8,
            Scenic: 0.8,
            Cosmopolitan: 0.9
        },
        activityVector: {
            Museums: 0.95,
            Food: 0.9,
            Shopping: 0.8,
            Art: 0.9,
            Photography: 0.9,
            Culture: 0.8,
            Architecture: 0.8
        },
        stayVector: {
            Luxury: 0.8,
            Boutique: 0.9,
            Elegant: 0.9,
            City: 0.7
        },
        breakdown: {
            flights: 48000,
            stay: 42000,
            activities: 28000,
            transfers: 12000
        },
        flights: [
            {
                type: "departure",
                airline: "Air France",
                flightNo: "AF225",
                from: "DEL",
                to: "CDG",
                departure: "23:00",
                arrival: "05:30 +1",
                duration: "9h 30m",
                cost: 24000
            },
            {
                type: "return",
                airline: "Air France",
                flightNo: "AF226",
                from: "CDG",
                to: "DEL",
                departure: "10:00",
                arrival: "23:00",
                duration: "9h",
                cost: 24000
            }
        ],
        hotel: {
            name: "Hôtel Plaza Athénée",
            rating: 5,
            location: "Avenue Montaigne, Paris",
            distanceToCenter: "0.5 km",
            totalCost: 42000,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
            nights: 4
        },
        transfers: [
            {
                from: "CDG Airport",
                to: "Hotel",
                type: "RER Train",
                cost: 2000
            },
            {
                from: "Hotel",
                to: "Versailles",
                type: "RER C Train",
                cost: 3000
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "RER Train",
                cost: 2000
            }
        ],
        days: [
            {
                day: 1,
                title: "Eiffel Tower & Seine",
                items: [
                    {
                        time: "10:00",
                        activity: "Eiffel Tower",
                        description: "Iconic iron landmark",
                        cost: 2900,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Lunch at Café de Flore",
                        description: "Classic Parisian café",
                        cost: 3500,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "Seine River Cruise",
                        description: "Bateaux Mouches",
                        cost: 2000,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Dinner in Le Marais",
                        description: "Bistro dining",
                        cost: 4500,
                        type: "food"
                    }
                ]
            },
            {
                day: 2,
                title: "Louvre & Champs-Élysées",
                items: [
                    {
                        time: "09:00",
                        activity: "Louvre Museum",
                        description: "Mona Lisa and 35,000 artworks",
                        cost: 2200,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Tuileries Garden",
                        description: "Royal gardens stroll",
                        cost: 0,
                        type: "relax"
                    },
                    {
                        time: "16:00",
                        activity: "Champs-Élysées",
                        description: "Shopping boulevard",
                        cost: 3000,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Arc de Triomphe sunset",
                        description: "Rooftop panorama",
                        cost: 1600,
                        type: "activity"
                    }
                ]
            },
            {
                day: 3,
                title: "Montmartre & Culture",
                items: [
                    {
                        time: "09:00",
                        activity: "Sacré-Cœur Basilica",
                        description: "Hilltop white church",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Montmartre artists",
                        description: "Place du Tertre",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Musée d'Orsay",
                        description: "Impressionist masterpieces",
                        cost: 1800,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Moulin Rouge show",
                        description: "Iconic cabaret",
                        cost: 8000,
                        type: "activity"
                    }
                ]
            },
            {
                day: 4,
                title: "Versailles & Farewell",
                items: [
                    {
                        time: "09:00",
                        activity: "Palace of Versailles",
                        description: "Hall of Mirrors",
                        cost: 3000,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Versailles Gardens",
                        description: "Fountain shows",
                        cost: 0,
                        type: "relax"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Michelin-starred dining",
                        cost: 8000,
                        type: "food"
                    }
                ]
            },
            {
                day: 5,
                title: "Departure",
                items: [
                    {
                        time: "07:00",
                        activity: "Checkout",
                        description: "RER to CDG",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "10:00",
                        activity: "Departure Flight",
                        description: "CDG → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "london",
        name: "London",
        country: "United Kingdom",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
        description: "Royal palaces, West End theatres, and world-class museums in the British capital",
        tags: [
            "Culture",
            "History",
            "Theatre",
            "Museums",
            "Urban",
            "Cosmopolitan"
        ],
        duration: "5 Days, 4 Nights",
        costLevel: 3,
        totalCost: 135000,
        vibeVector: {
            Culture: 0.9,
            Urban: 0.9,
            History: 0.8,
            Cosmopolitan: 0.95,
            Vibrant: 0.8,
            Royal: 0.7,
            Trendy: 0.7
        },
        activityVector: {
            Museums: 0.95,
            Culture: 0.9,
            Shopping: 0.8,
            Theatre: 0.9,
            History: 0.8,
            Food: 0.7,
            Photography: 0.7
        },
        stayVector: {
            Luxury: 0.7,
            City: 0.9,
            Boutique: 0.6,
            Historic: 0.7
        },
        breakdown: {
            flights: 50000,
            stay: 45000,
            activities: 28000,
            transfers: 12000
        },
        flights: [
            {
                type: "departure",
                airline: "British Airways",
                flightNo: "BA142",
                from: "DEL",
                to: "LHR",
                departure: "21:30",
                arrival: "04:00 +1",
                duration: "9h 30m",
                cost: 25000
            },
            {
                type: "return",
                airline: "British Airways",
                flightNo: "BA143",
                from: "LHR",
                to: "DEL",
                departure: "10:30",
                arrival: "00:30 +1",
                duration: "9h",
                cost: 25000
            }
        ],
        hotel: {
            name: "The Langham London",
            rating: 5,
            location: "Marylebone, London",
            distanceToCenter: "0.3 km",
            totalCost: 45000,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            nights: 4
        },
        transfers: [
            {
                from: "Heathrow Airport",
                to: "Hotel",
                type: "Heathrow Express",
                cost: 3500
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Heathrow Express",
                cost: 3500
            },
            {
                from: "Hotel",
                to: "Greenwich",
                type: "DLR",
                cost: 1000
            }
        ],
        days: [
            {
                day: 1,
                title: "Royal London",
                items: [
                    {
                        time: "09:00",
                        activity: "Buckingham Palace",
                        description: "Changing of the Guard",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Westminster Abbey",
                        description: "Gothic coronation church",
                        cost: 2500,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Fish & Chips lunch",
                        description: "Classic British fare",
                        cost: 2000,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "Big Ben & Houses of Parliament",
                        description: "Iconic London views",
                        cost: 0,
                        type: "activity"
                    }
                ]
            },
            {
                day: 2,
                title: "Museums & Culture",
                items: [
                    {
                        time: "10:00",
                        activity: "British Museum",
                        description: "Rosetta Stone and mummies",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Covent Garden lunch",
                        description: "Market food hall",
                        cost: 2500,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "National Gallery",
                        description: "Van Gogh, Monet, Da Vinci",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "West End show",
                        description: "World-class theatre",
                        cost: 7000,
                        type: "activity"
                    }
                ]
            },
            {
                day: 3,
                title: "Tower & Markets",
                items: [
                    {
                        time: "09:00",
                        activity: "Tower of London",
                        description: "Crown Jewels",
                        cost: 3000,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Borough Market",
                        description: "Artisan food market",
                        cost: 2500,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Tower Bridge",
                        description: "Victorian engineering marvel",
                        cost: 1200,
                        type: "activity"
                    },
                    {
                        time: "19:00",
                        activity: "Pub crawl in Shoreditch",
                        description: "Craft beers",
                        cost: 3000,
                        type: "relax"
                    }
                ]
            },
            {
                day: 4,
                title: "South Bank & Farewell",
                items: [
                    {
                        time: "10:00",
                        activity: "Tate Modern",
                        description: "Contemporary art powerhouse",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "South Bank walk",
                        description: "Thames riverside",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "15:00",
                        activity: "London Eye",
                        description: "360° city views",
                        cost: 3000,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Michelin dining in Mayfair",
                        cost: 6000,
                        type: "food"
                    }
                ]
            },
            {
                day: 5,
                title: "Departure",
                items: [
                    {
                        time: "07:00",
                        activity: "Checkout",
                        description: "Heathrow Express to LHR",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "10:30",
                        activity: "Departure Flight",
                        description: "LHR → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "stockholm",
        name: "Stockholm",
        country: "Sweden",
        image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&q=80",
        description: "Venice of the North - 14 islands connected by bridges, with cutting-edge design and Viking lore",
        tags: [
            "Design",
            "Nordic",
            "Islands",
            "Museums",
            "Nature",
            "Sustainable"
        ],
        duration: "4 Days, 3 Nights",
        costLevel: 3,
        totalCost: 115000,
        vibeVector: {
            Design: 0.9,
            Nordic: 0.9,
            Scenic: 0.8,
            Nature: 0.7,
            Sustainable: 0.8,
            Urban: 0.7,
            Peaceful: 0.6
        },
        activityVector: {
            Museums: 0.9,
            Design: 0.8,
            Photography: 0.8,
            Culture: 0.7,
            Nature: 0.7,
            Food: 0.7,
            Architecture: 0.7
        },
        stayVector: {
            Design: 0.9,
            Boutique: 0.8,
            Eco: 0.7,
            Stylish: 0.8
        },
        breakdown: {
            flights: 45000,
            stay: 35000,
            activities: 25000,
            transfers: 10000
        },
        flights: [
            {
                type: "departure",
                airline: "SAS",
                flightNo: "SK502",
                from: "DEL",
                to: "ARN",
                departure: "01:30",
                arrival: "08:00",
                duration: "9h 30m",
                cost: 22500
            },
            {
                type: "return",
                airline: "SAS",
                flightNo: "SK503",
                from: "ARN",
                to: "DEL",
                departure: "10:00",
                arrival: "00:30 +1",
                duration: "9h 30m",
                cost: 22500
            }
        ],
        hotel: {
            name: "At Six Hotel",
            rating: 5,
            location: "Brunkebergstorg, Stockholm",
            distanceToCenter: "0.1 km",
            totalCost: 35000,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            nights: 3
        },
        transfers: [
            {
                from: "Arlanda Airport",
                to: "Hotel",
                type: "Arlanda Express",
                cost: 3000
            },
            {
                from: "Hotel",
                to: "Djurgården",
                type: "Ferry",
                cost: 500
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Arlanda Express",
                cost: 3000
            }
        ],
        days: [
            {
                day: 1,
                title: "Gamla Stan & Royal Palace",
                items: [
                    {
                        time: "10:00",
                        activity: "Gamla Stan walk",
                        description: "Medieval old town cobblestones",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Royal Palace",
                        description: "Swedish monarchy residence",
                        cost: 1800,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Lunch at Tradition",
                        description: "Classic Swedish meatballs",
                        cost: 3000,
                        type: "food"
                    },
                    {
                        time: "17:00",
                        activity: "Nobel Prize Museum",
                        description: "History of Nobel laureates",
                        cost: 1200,
                        type: "activity"
                    }
                ]
            },
            {
                day: 2,
                title: "Museums & Islands",
                items: [
                    {
                        time: "09:00",
                        activity: "Vasa Museum",
                        description: "1628 warship perfectly preserved",
                        cost: 1800,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "ABBA The Museum",
                        description: "Interactive music experience",
                        cost: 2500,
                        type: "activity"
                    },
                    {
                        time: "15:00",
                        activity: "Fotografiska",
                        description: "Photography museum",
                        cost: 1800,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Södermalm dinner",
                        description: "Trendy neighbourhood dining",
                        cost: 4000,
                        type: "food"
                    }
                ]
            },
            {
                day: 3,
                title: "Nature & Farewell",
                items: [
                    {
                        time: "09:00",
                        activity: "Stockholm Archipelago boat tour",
                        description: "3-hour island cruise",
                        cost: 4000,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Östermalms Saluhall",
                        description: "Gourmet food market",
                        cost: 3000,
                        type: "food"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Nordic fine dining",
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
                        description: "Arlanda Express to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "10:00",
                        activity: "Departure Flight",
                        description: "ARN → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "nice",
        name: "Nice",
        country: "France",
        image: "https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=800&q=80",
        description: "Azure waters, Belle Époque elegance - the crown jewel of the French Riviera",
        tags: [
            "Beach",
            "Luxury",
            "Mediterranean",
            "Sun",
            "Coastal",
            "Relaxation"
        ],
        duration: "4 Days, 3 Nights",
        costLevel: 3,
        totalCost: 120000,
        vibeVector: {
            Beach: 0.9,
            Luxury: 0.8,
            Sun: 0.9,
            Relax: 0.8,
            Scenic: 0.9,
            Coastal: 0.9,
            Elegant: 0.8
        },
        activityVector: {
            Beach: 0.9,
            Photography: 0.7,
            Food: 0.8,
            Art: 0.6,
            Relaxation: 0.9,
            Sailing: 0.5,
            Shopping: 0.6
        },
        stayVector: {
            Luxury: 0.9,
            Sea_view: 0.9,
            Premium: 0.8,
            Boutique: 0.7
        },
        breakdown: {
            flights: 45000,
            stay: 40000,
            activities: 25000,
            transfers: 10000
        },
        flights: [
            {
                type: "departure",
                airline: "Air France",
                flightNo: "AF338",
                from: "DEL",
                to: "NCE",
                departure: "00:30",
                arrival: "07:00",
                duration: "10h 30m",
                cost: 22500
            },
            {
                type: "return",
                airline: "Air France",
                flightNo: "AF339",
                from: "NCE",
                to: "DEL",
                departure: "09:00",
                arrival: "22:30",
                duration: "10h 30m",
                cost: 22500
            }
        ],
        hotel: {
            name: "Hotel Negresco",
            rating: 5,
            location: "Promenade des Anglais",
            distanceToCenter: "0.3 km",
            totalCost: 40000,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
            nights: 3
        },
        transfers: [
            {
                from: "Nice Airport",
                to: "Hotel",
                type: "Tram",
                cost: 300
            },
            {
                from: "Hotel",
                to: "Monaco",
                type: "Train",
                cost: 1200
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Tram",
                cost: 300
            }
        ],
        days: [
            {
                day: 1,
                title: "Promenade & Old Town",
                items: [
                    {
                        time: "10:00",
                        activity: "Promenade des Anglais",
                        description: "Iconic seaside walk",
                        cost: 0,
                        type: "relax"
                    },
                    {
                        time: "12:00",
                        activity: "Cours Saleya Market",
                        description: "Flower and food market",
                        cost: 2000,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Castle Hill viewpoint",
                        description: "Panoramic Riviera views",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Niçoise dinner",
                        description: "Salade Niçoise and ratatouille",
                        cost: 4000,
                        type: "food"
                    }
                ]
            },
            {
                day: 2,
                title: "Monaco Day Trip",
                items: [
                    {
                        time: "09:00",
                        activity: "Monte Carlo Casino",
                        description: "Opulent Belle Époque casino",
                        cost: 1700,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Lunch in Monaco harbour",
                        description: "Yacht-lined dining",
                        cost: 5000,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Oceanographic Museum",
                        description: "Jacques Cousteau's museum",
                        cost: 2000,
                        type: "activity"
                    },
                    {
                        time: "19:00",
                        activity: "Return to Nice",
                        description: "Sunset train ride",
                        cost: 0,
                        type: "travel"
                    }
                ]
            },
            {
                day: 3,
                title: "Beach & Art",
                items: [
                    {
                        time: "10:00",
                        activity: "Villefranche-sur-Mer beach",
                        description: "Crystal-clear cove",
                        cost: 0,
                        type: "relax"
                    },
                    {
                        time: "14:00",
                        activity: "Matisse Museum",
                        description: "Henri Matisse collection",
                        cost: 1000,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Seafood on the port",
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
                        description: "Tram to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "09:00",
                        activity: "Departure Flight",
                        description: "NCE → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "krakow",
        name: "Krakow",
        country: "Poland",
        image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
        description: "Medieval market squares, Wawel Castle, and a vibrant nightlife scene - Poland's cultural heart",
        tags: [
            "Medieval",
            "History",
            "Nightlife",
            "Budget",
            "Culture",
            "Gothic"
        ],
        duration: "4 Days, 3 Nights",
        costLevel: 1,
        totalCost: 60000,
        vibeVector: {
            History: 0.9,
            Culture: 0.8,
            Nightlife: 0.7,
            Heritage: 0.9,
            Medieval: 0.9,
            Urban: 0.6,
            Budget: 0.8
        },
        activityVector: {
            History: 0.9,
            Heritage: 0.8,
            Culture: 0.8,
            Nightlife: 0.7,
            Food: 0.7,
            Photography: 0.6,
            Walking: 0.7
        },
        stayVector: {
            Budget: 0.9,
            Historic: 0.7,
            City: 0.8,
            Cozy: 0.6
        },
        breakdown: {
            flights: 24000,
            stay: 14000,
            activities: 15000,
            transfers: 7000
        },
        flights: [
            {
                type: "departure",
                airline: "LOT Polish",
                flightNo: "LO68",
                from: "DEL",
                to: "KRK",
                departure: "03:00",
                arrival: "09:30",
                duration: "9h 30m",
                cost: 12000
            },
            {
                type: "return",
                airline: "LOT Polish",
                flightNo: "LO69",
                from: "KRK",
                to: "DEL",
                departure: "11:00",
                arrival: "01:30 +1",
                duration: "9h 30m",
                cost: 12000
            }
        ],
        hotel: {
            name: "Hotel Stary",
            rating: 5,
            location: "Old Town, Krakow",
            distanceToCenter: "0.1 km",
            totalCost: 14000,
            image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
            nights: 3
        },
        transfers: [
            {
                from: "Krakow Airport",
                to: "Hotel",
                type: "Train",
                cost: 500
            },
            {
                from: "Hotel",
                to: "Wieliczka Salt Mine",
                type: "Minibus",
                cost: 2000
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
                title: "Main Square & Wawel",
                items: [
                    {
                        time: "10:00",
                        activity: "Main Market Square",
                        description: "Europe's largest medieval square",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "St. Mary's Basilica",
                        description: "Gothic trumpet call hourly",
                        cost: 500,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Pierogi lunch",
                        description: "Classic Polish dumplings",
                        cost: 1000,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "Wawel Castle",
                        description: "Polish royal castle",
                        cost: 2000,
                        type: "activity"
                    }
                ]
            },
            {
                day: 2,
                title: "History & Salt Mines",
                items: [
                    {
                        time: "09:00",
                        activity: "Wieliczka Salt Mine",
                        description: "Underground cathedral at 135m depth",
                        cost: 3500,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Kazimierz Jewish Quarter",
                        description: "Synagogues and galleries",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Krakow bar crawl",
                        description: "Vodka and cocktail bars",
                        cost: 2000,
                        type: "relax"
                    }
                ]
            },
            {
                day: 3,
                title: "Culture & Farewell",
                items: [
                    {
                        time: "10:00",
                        activity: "Oskar Schindler Factory",
                        description: "WWII museum",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Obwarzanek street food",
                        description: "Krakow pretzel and zurek soup",
                        cost: 800,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Cloth Hall shopping",
                        description: "Mediaeval market stalls",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Traditional Polish feast",
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
                        time: "08:00",
                        activity: "Checkout",
                        description: "Train to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "11:00",
                        activity: "Departure Flight",
                        description: "KRK → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    }
];
