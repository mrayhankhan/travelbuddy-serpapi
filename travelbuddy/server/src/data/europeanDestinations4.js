// Additional European destinations (HotelAPI-verified)
module.exports = [
    {
        destinationId: "sofia",
        name: "Sofia",
        country: "Bulgaria",
        image: "https://images.unsplash.com/photo-1561631918-0e0d6af260af?w=800&q=80",
        description: "An underrated gem - Roman ruins, Ottoman mosques, and Vitosha Mountain on the doorstep",
        tags: [
            "Budget",
            "Mountains",
            "History",
            "Thermal",
            "Culture",
            "Hidden Gem"
        ],
        duration: "3 Days, 2 Nights",
        costLevel: 1,
        totalCost: 45000,
        vibeVector: {
            Budget: 0.9,
            Mountains: 0.7,
            History: 0.7,
            Culture: 0.6,
            Thermal: 0.6,
            Quiet: 0.6,
            Nature: 0.6
        },
        activityVector: {
            History: 0.8,
            Culture: 0.7,
            Food: 0.6,
            Hiking: 0.6,
            Spa: 0.5,
            Photography: 0.5,
            Walking: 0.6
        },
        stayVector: {
            Budget: 0.95,
            City: 0.7,
            Boutique: 0.4,
            Central: 0.7
        },
        breakdown: {
            flights: 20000,
            stay: 8000,
            activities: 11000,
            transfers: 6000
        },
        flights: [
            {
                type: "departure",
                airline: "Turkish Airlines",
                flightNo: "TK800",
                from: "DEL",
                to: "SOF",
                departure: "03:00",
                arrival: "10:00",
                duration: "9h",
                cost: 10000
            },
            {
                type: "return",
                airline: "Turkish Airlines",
                flightNo: "TK801",
                from: "SOF",
                to: "DEL",
                departure: "11:00",
                arrival: "01:00 +1",
                duration: "9h",
                cost: 10000
            }
        ],
        hotel: {
            name: "Sense Hotel Sofia",
            rating: 4,
            location: "City Centre, Sofia",
            distanceToCenter: "0.2 km",
            totalCost: 8000,
            image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
            nights: 2
        },
        transfers: [
            {
                from: "Sofia Airport",
                to: "Hotel",
                type: "Metro",
                cost: 200
            },
            {
                from: "Hotel",
                to: "Vitosha",
                type: "Bus",
                cost: 500
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Metro",
                cost: 200
            }
        ],
        days: [
            {
                day: 1,
                title: "Ancient & Ottoman",
                items: [
                    {
                        time: "10:00",
                        activity: "Alexander Nevsky Cathedral",
                        description: "Iconic gold-domed church",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Shopska salad lunch",
                        description: "Bulgaria's national salad",
                        cost: 500,
                        type: "food"
                    },
                    {
                        time: "14:00",
                        activity: "Roman Serdica ruins",
                        description: "Ancient Roman city underground",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "16:00",
                        activity: "Banya Bashi Mosque",
                        description: "Ottoman thermal mosque",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Rakija bar evening",
                        description: "Bulgarian brandy tasting",
                        cost: 1200,
                        type: "relax"
                    }
                ]
            },
            {
                day: 2,
                title: "Vitosha & Farewell",
                items: [
                    {
                        time: "09:00",
                        activity: "Vitosha Mountain hike",
                        description: "Ski resort in winter, trails in summer",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Banitsa pastry lunch",
                        description: "Flaky cheese pastry",
                        cost: 500,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "Central Mineral Baths",
                        description: "Ottoman-era thermal baths",
                        cost: 1000,
                        type: "relax"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Traditional mehana tavern",
                        cost: 1500,
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
                        description: "Metro to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "11:00",
                        activity: "Departure Flight",
                        description: "SOF → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "ljubljana",
        name: "Ljubljana",
        country: "Slovenia",
        image: "https://images.unsplash.com/photo-1569347043882-6088c95e914d?w=800&q=80",
        description: "Europe's greenest capital - dragon bridges, riverside cafés, and Lake Bled nearby",
        tags: [
            "Green",
            "Charming",
            "Nature",
            "Lake",
            "Sustainable",
            "Peaceful"
        ],
        duration: "3 Days, 2 Nights",
        costLevel: 1,
        totalCost: 58000,
        vibeVector: {
            Nature: 0.8,
            Charming: 0.9,
            Peaceful: 0.8,
            Green: 0.9,
            Scenic: 0.8,
            Sustainable: 0.8,
            Romantic: 0.7
        },
        activityVector: {
            Nature: 0.8,
            Photography: 0.8,
            Culture: 0.7,
            Walking: 0.8,
            Food: 0.6,
            Adventure: 0.6,
            Cycling: 0.6
        },
        stayVector: {
            Boutique: 0.8,
            Eco: 0.8,
            Cozy: 0.7,
            Central: 0.7
        },
        breakdown: {
            flights: 26000,
            stay: 12000,
            activities: 14000,
            transfers: 6000
        },
        flights: [
            {
                type: "departure",
                airline: "Turkish Airlines",
                flightNo: "TK810",
                from: "DEL",
                to: "LJU",
                departure: "03:00",
                arrival: "10:00",
                duration: "10h",
                cost: 13000
            },
            {
                type: "return",
                airline: "Turkish Airlines",
                flightNo: "TK811",
                from: "LJU",
                to: "DEL",
                departure: "11:00",
                arrival: "01:30 +1",
                duration: "10h 30m",
                cost: 13000
            }
        ],
        hotel: {
            name: "Hotel Lev Ljubljana",
            rating: 4,
            location: "City Centre, Ljubljana",
            distanceToCenter: "0.3 km",
            totalCost: 12000,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            nights: 2
        },
        transfers: [
            {
                from: "Ljubljana Airport",
                to: "Hotel",
                type: "Bus",
                cost: 500
            },
            {
                from: "Hotel",
                to: "Lake Bled",
                type: "Bus",
                cost: 1500
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
                title: "Old Town & Castle",
                items: [
                    {
                        time: "10:00",
                        activity: "Ljubljana Castle",
                        description: "Funicular to hilltop fortress",
                        cost: 1300,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Dragon Bridge",
                        description: "Art Nouveau dragon statues",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Slovenian lunch",
                        description: "Štruklji and potica",
                        cost: 1200,
                        type: "food"
                    },
                    {
                        time: "17:00",
                        activity: "Riverside cafe stroll",
                        description: "Plečnik promenade",
                        cost: 1000,
                        type: "relax"
                    }
                ]
            },
            {
                day: 2,
                title: "Lake Bled & Farewell",
                items: [
                    {
                        time: "08:00",
                        activity: "Lake Bled day trip",
                        description: "Island church and cream cake",
                        cost: 3000,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Bled cream cake",
                        description: "Famous kremšnita",
                        cost: 500,
                        type: "food"
                    },
                    {
                        time: "14:00",
                        activity: "Vintgar Gorge walk",
                        description: "1.6km boardwalk canyon",
                        cost: 1000,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Slovenian farm-to-table",
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
                        time: "08:00",
                        activity: "Checkout",
                        description: "Bus to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "11:00",
                        activity: "Departure Flight",
                        description: "LJU → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "bordeaux",
        name: "Bordeaux",
        country: "France",
        image: "https://images.unsplash.com/photo-1499456315959-920e6df20fde?w=800&q=80",
        description: "World wine capital - elegant neoclassical architecture along the Garonne River",
        tags: [
            "Wine",
            "Architecture",
            "Gastronomy",
            "Elegant",
            "River",
            "Culture"
        ],
        duration: "3 Days, 2 Nights",
        costLevel: 2,
        totalCost: 88000,
        vibeVector: {
            Elegant: 0.9,
            Wine: 0.95,
            Gastronomy: 0.9,
            River: 0.7,
            Culture: 0.7,
            Romantic: 0.7,
            Scenic: 0.7
        },
        activityVector: {
            Wine: 0.95,
            Food: 0.9,
            Architecture: 0.7,
            Culture: 0.7,
            Photography: 0.7,
            Cycling: 0.5,
            History: 0.6
        },
        stayVector: {
            Boutique: 0.8,
            Elegant: 0.8,
            Stylish: 0.7,
            Central: 0.7
        },
        breakdown: {
            flights: 38000,
            stay: 24000,
            activities: 18000,
            transfers: 8000
        },
        flights: [
            {
                type: "departure",
                airline: "Air France",
                flightNo: "AF356",
                from: "DEL",
                to: "BOD",
                departure: "23:00",
                arrival: "06:30 +1",
                duration: "10h 30m",
                cost: 19000
            },
            {
                type: "return",
                airline: "Air France",
                flightNo: "AF357",
                from: "BOD",
                to: "DEL",
                departure: "09:00",
                arrival: "22:30",
                duration: "10h 30m",
                cost: 19000
            }
        ],
        hotel: {
            name: "InterContinental Bordeaux",
            rating: 5,
            location: "Grand Théâtre, Bordeaux",
            distanceToCenter: "0.1 km",
            totalCost: 24000,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
            nights: 2
        },
        transfers: [
            {
                from: "Bordeaux Airport",
                to: "Hotel",
                type: "Tram",
                cost: 300
            },
            {
                from: "Hotel",
                to: "Saint-Émilion",
                type: "Tour Bus",
                cost: 4000
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
                title: "Wine & Water Mirror",
                items: [
                    {
                        time: "10:00",
                        activity: "Place de la Bourse",
                        description: "Miroir d'Eau water mirror",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Canelé pastry",
                        description: "Bordeaux's signature sweet",
                        cost: 500,
                        type: "food"
                    },
                    {
                        time: "14:00",
                        activity: "La Cité du Vin",
                        description: "Wine museum with tasting",
                        cost: 2500,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Bordeaux wine dinner",
                        description: "Saint-Émilion grand cru pairing",
                        cost: 5000,
                        type: "food"
                    }
                ]
            },
            {
                day: 2,
                title: "Saint-Émilion & Farewell",
                items: [
                    {
                        time: "09:00",
                        activity: "Saint-Émilion day trip",
                        description: "UNESCO vineyard village",
                        cost: 4000,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Château lunch",
                        description: "Winery estate dining",
                        cost: 3000,
                        type: "food"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Entrecôte à la Bordelaise",
                        cost: 4500,
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
                        description: "Tram to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "09:00",
                        activity: "Departure Flight",
                        description: "BOD → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "malaga",
        name: "Malaga",
        country: "Spain",
        image: "https://images.unsplash.com/photo-1585506942812-e72b29cef752?w=800&q=80",
        description: "Picasso's birthplace on the Costa del Sol - sun, tapas, and a Moorish fortress",
        tags: [
            "Sun",
            "Beach",
            "Tapas",
            "Picasso",
            "Budget",
            "Mediterranean"
        ],
        duration: "4 Days, 3 Nights",
        costLevel: 1,
        totalCost: 62000,
        vibeVector: {
            Sun: 0.95,
            Beach: 0.85,
            Warm: 0.9,
            Relaxed: 0.8,
            Budget: 0.8,
            Mediterranean: 0.9,
            Scenic: 0.6
        },
        activityVector: {
            Beach: 0.85,
            Food: 0.8,
            Culture: 0.6,
            Art: 0.6,
            Photography: 0.6,
            Relaxation: 0.8,
            Walking: 0.6
        },
        stayVector: {
            Beach: 0.8,
            Budget: 0.8,
            City: 0.6,
            Central: 0.7
        },
        breakdown: {
            flights: 26000,
            stay: 14000,
            activities: 14000,
            transfers: 8000
        },
        flights: [
            {
                type: "departure",
                airline: "Iberia",
                flightNo: "IB6860",
                from: "DEL",
                to: "AGP",
                departure: "01:00",
                arrival: "09:00",
                duration: "11h",
                cost: 13000
            },
            {
                type: "return",
                airline: "Iberia",
                flightNo: "IB6861",
                from: "AGP",
                to: "DEL",
                departure: "10:00",
                arrival: "01:00 +1",
                duration: "11h",
                cost: 13000
            }
        ],
        hotel: {
            name: "Room Mate Valeria",
            rating: 4,
            location: "Old Town, Malaga",
            distanceToCenter: "0.2 km",
            totalCost: 14000,
            image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80",
            nights: 3
        },
        transfers: [
            {
                from: "Malaga Airport",
                to: "Hotel",
                type: "Train",
                cost: 300
            },
            {
                from: "Hotel",
                to: "Nerja",
                type: "Bus",
                cost: 1000
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Train",
                cost: 300
            }
        ],
        days: [
            {
                day: 1,
                title: "Picasso & Alcazaba",
                items: [
                    {
                        time: "10:00",
                        activity: "Picasso Museum",
                        description: "Birthplace and early works",
                        cost: 1200,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Espetos on the beach",
                        description: "Grilled sardines",
                        cost: 1500,
                        type: "food"
                    },
                    {
                        time: "16:00",
                        activity: "Alcazaba Fortress",
                        description: "Moorish palatial fortress",
                        cost: 500,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Tapas in Atarazanas",
                        description: "Market-fresh tapas",
                        cost: 2000,
                        type: "food"
                    }
                ]
            },
            {
                day: 2,
                title: "Beach & Nerja",
                items: [
                    {
                        time: "09:00",
                        activity: "Nerja sea caves",
                        description: "Prehistoric caverns",
                        cost: 1500,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Balcón de Europa",
                        description: "Cliffside sea viewpoint",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "14:00",
                        activity: "Nerja seafood lunch",
                        description: "Fresh prawns and fish",
                        cost: 2000,
                        type: "food"
                    },
                    {
                        time: "18:00",
                        activity: "Malagueta Beach sunset",
                        description: "City beach relaxation",
                        cost: 0,
                        type: "relax"
                    }
                ]
            },
            {
                day: 3,
                title: "Markets & Farewell",
                items: [
                    {
                        time: "10:00",
                        activity: "Atarazanas Market",
                        description: "Traditional food market",
                        cost: 1500,
                        type: "food"
                    },
                    {
                        time: "14:00",
                        activity: "Centre Pompidou Malaga",
                        description: "Modern art",
                        cost: 1000,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Andalusian rooftop dining",
                        cost: 3000,
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
                        description: "Train to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "10:00",
                        activity: "Departure Flight",
                        description: "AGP → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "thessaloniki",
        name: "Thessaloniki",
        country: "Greece",
        image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",
        description: "Greece's cultural capital - Byzantine churches, waterfront promenade, and legendary nightlife",
        tags: [
            "Culture",
            "Food",
            "Nightlife",
            "Byzantine",
            "Waterfront",
            "Budget"
        ],
        duration: "4 Days, 3 Nights",
        costLevel: 1,
        totalCost: 62000,
        vibeVector: {
            Culture: 0.8,
            Nightlife: 0.8,
            Urban: 0.7,
            Warm: 0.8,
            Vibrant: 0.8,
            Heritage: 0.7,
            Social: 0.8
        },
        activityVector: {
            Food: 0.9,
            Culture: 0.8,
            Nightlife: 0.8,
            History: 0.7,
            Photography: 0.6,
            Walking: 0.7,
            Heritage: 0.7
        },
        stayVector: {
            Budget: 0.8,
            City: 0.8,
            Central: 0.7,
            Boutique: 0.6
        },
        breakdown: {
            flights: 26000,
            stay: 14000,
            activities: 14000,
            transfers: 8000
        },
        flights: [
            {
                type: "departure",
                airline: "Aegean Airlines",
                flightNo: "A3610",
                from: "DEL",
                to: "SKG",
                departure: "02:00",
                arrival: "07:30",
                duration: "11h 30m",
                cost: 13000
            },
            {
                type: "return",
                airline: "Aegean Airlines",
                flightNo: "A3611",
                from: "SKG",
                to: "DEL",
                departure: "09:00",
                arrival: "22:00",
                duration: "11h",
                cost: 13000
            }
        ],
        hotel: {
            name: "Electra Palace Thessaloniki",
            rating: 5,
            location: "Aristotelous Square",
            distanceToCenter: "0.1 km",
            totalCost: 14000,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            nights: 3
        },
        transfers: [
            {
                from: "Makedonia Airport",
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
                title: "Waterfront & White Tower",
                items: [
                    {
                        time: "10:00",
                        activity: "White Tower",
                        description: "City's iconic landmark",
                        cost: 800,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Bougatsa breakfast",
                        description: "Custard-filled phyllo pastry",
                        cost: 500,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Waterfront promenade",
                        description: "Nea Paralia walk",
                        cost: 0,
                        type: "relax"
                    },
                    {
                        time: "20:00",
                        activity: "Meze dinner",
                        description: "Greek seafood meze spread",
                        cost: 2500,
                        type: "food"
                    }
                ]
            },
            {
                day: 2,
                title: "Byzantine Heritage",
                items: [
                    {
                        time: "09:00",
                        activity: "Rotunda of Galerius",
                        description: "Roman emperor's mausoleum",
                        cost: 500,
                        type: "activity"
                    },
                    {
                        time: "11:00",
                        activity: "Modiano Market",
                        description: "Indoor food market",
                        cost: 1500,
                        type: "food"
                    },
                    {
                        time: "14:00",
                        activity: "Byzantine Museum",
                        description: "UNESCO mosaics and icons",
                        cost: 800,
                        type: "activity"
                    },
                    {
                        time: "21:00",
                        activity: "Ladadika nightlife",
                        description: "Bar district until sunrise",
                        cost: 2500,
                        type: "relax"
                    }
                ]
            },
            {
                day: 3,
                title: "Upper Town & Farewell",
                items: [
                    {
                        time: "10:00",
                        activity: "Ano Poli (Upper Town)",
                        description: "Ottoman houses and views",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Gyros and souvlaki",
                        description: "Best gyros in Greece",
                        cost: 800,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Aristotelous Square",
                        description: "Grand central plaza",
                        cost: 0,
                        type: "relax"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Seaside taverna",
                        cost: 3000,
                        type: "food"
                    }
                ]
            },
            {
                day: 4,
                title: "Departure",
                items: [
                    {
                        time: "06:00",
                        activity: "Checkout",
                        description: "Bus to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "09:00",
                        activity: "Departure Flight",
                        description: "SKG → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    },
    {
        destinationId: "glasgow",
        name: "Glasgow",
        country: "Scotland",
        image: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&q=80",
        description: "Scotland's vibrant heartbeat - street art, live music, whisky, and Mackintosh architecture",
        tags: [
            "Music",
            "Whisky",
            "Street Art",
            "Urban",
            "Culture",
            "Vibrant"
        ],
        duration: "3 Days, 2 Nights",
        costLevel: 2,
        totalCost: 85000,
        vibeVector: {
            Urban: 0.8,
            Music: 0.9,
            Vibrant: 0.8,
            Culture: 0.7,
            Art: 0.7,
            Alternative: 0.7,
            Social: 0.8
        },
        activityVector: {
            Music: 0.9,
            Art: 0.7,
            Culture: 0.7,
            Whisky: 0.8,
            Food: 0.7,
            Photography: 0.6,
            Nightlife: 0.7
        },
        stayVector: {
            City: 0.8,
            Boutique: 0.6,
            Urban: 0.7,
            Budget: 0.6
        },
        breakdown: {
            flights: 38000,
            stay: 22000,
            activities: 17000,
            transfers: 8000
        },
        flights: [
            {
                type: "departure",
                airline: "British Airways",
                flightNo: "BA145",
                from: "DEL",
                to: "GLA",
                departure: "01:50",
                arrival: "09:00",
                duration: "13h 10m",
                cost: 19000
            },
            {
                type: "return",
                airline: "British Airways",
                flightNo: "BA146",
                from: "GLA",
                to: "DEL",
                departure: "11:00",
                arrival: "01:00 +1",
                duration: "12h",
                cost: 19000
            }
        ],
        hotel: {
            name: "Kimpton Blythswood Square",
            rating: 5,
            location: "City Centre, Glasgow",
            distanceToCenter: "0.2 km",
            totalCost: 22000,
            image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
            nights: 2
        },
        transfers: [
            {
                from: "Glasgow Airport",
                to: "Hotel",
                type: "Express Bus",
                cost: 1200
            },
            {
                from: "Hotel",
                to: "Airport",
                type: "Express Bus",
                cost: 1200
            }
        ],
        days: [
            {
                day: 1,
                title: "Mackintosh & Music",
                items: [
                    {
                        time: "10:00",
                        activity: "Kelvingrove Museum",
                        description: "Dalí, Mackintosh, dinosaurs",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "13:00",
                        activity: "Finnieston lunch",
                        description: "Glasgow's foodie hood",
                        cost: 2500,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Glasgow Cathedral",
                        description: "Medieval Gothic cathedral",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Live music at King Tut's",
                        description: "Legendary music venue",
                        cost: 2000,
                        type: "activity"
                    }
                ]
            },
            {
                day: 2,
                title: "Street Art & Whisky",
                items: [
                    {
                        time: "10:00",
                        activity: "Glasgow Mural Trail",
                        description: "City-wide street art tour",
                        cost: 0,
                        type: "activity"
                    },
                    {
                        time: "12:00",
                        activity: "Barras Market lunch",
                        description: "Street food and vintage finds",
                        cost: 1500,
                        type: "food"
                    },
                    {
                        time: "15:00",
                        activity: "Whisky tasting experience",
                        description: "Single malt masterclass",
                        cost: 3000,
                        type: "activity"
                    },
                    {
                        time: "20:00",
                        activity: "Farewell Dinner",
                        description: "Modern Scottish cuisine",
                        cost: 4000,
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
                        description: "Express bus to airport",
                        cost: 0,
                        type: "travel"
                    },
                    {
                        time: "11:00",
                        activity: "Departure Flight",
                        description: "GLA → DEL",
                        cost: 0,
                        type: "travel"
                    }
                ]
            }
        ]
    }
];
