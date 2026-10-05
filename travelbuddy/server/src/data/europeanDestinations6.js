// HotelAPI-verified European destinations (batch 6)
module.exports = [
    {
        "destinationId": "pisa",
        "name": "Pisa",
        "country": "Italy",
        "image": "https://images.unsplash.com/photo-1544411047-c491e34a24e0?w=800&q=80",
        "description": "Beyond the Tower - Romanesque piazzas and Tuscan charm on the Arno",
        "tags": [
            "History",
            "Architecture",
            "Tuscany",
            "Iconic",
            "Culture",
            "Charming"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 60000,
        "vibeVector": {
            "History": 0.9,
            "Culture": 0.8,
            "Charming": 0.7,
            "Scenic": 0.7,
            "Architecture": 0.8,
            "Compact": 0.7
        },
        "activityVector": {
            "History": 0.9,
            "Photography": 0.9,
            "Culture": 0.7,
            "Walking": 0.7,
            "Food": 0.7,
            "Art": 0.6
        },
        "stayVector": {
            "Central": 0.8,
            "Budget": 0.7,
            "Boutique": 0.6
        },
        "breakdown": {
            "flights": 25200,
            "stay": 15000,
            "activities": 13200,
            "transfers": 6600
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 12600
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 12600
            }
        ],
        "hotel": {
            "name": "Pisa Central Hotel",
            "rating": 4,
            "location": "City Centre, Pisa",
            "distanceToCenter": "0.3 km",
            "totalCost": 15000,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Pisa Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2200
            },
            {
                "from": "Hotel",
                "to": "Pisa Airport",
                "type": "Shuttle",
                "cost": 2200
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Pisa highlights",
                        "cost": 1800,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Italy dishes",
                        "cost": 1200,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1800,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1800,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Pisa highlights",
                        "cost": 1800,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Italy dishes",
                        "cost": 1200,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1800,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1800,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    },
    {
        "destinationId": "verona",
        "name": "Verona",
        "country": "Italy",
        "image": "https://images.unsplash.com/photo-1570288685369-f7305163d0e3?w=800&q=80",
        "description": "City of Romeo and Juliet - Roman arena, wine country, and amore",
        "tags": [
            "Romance",
            "Opera",
            "History",
            "Wine",
            "Architecture",
            "Scenic"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 2,
        "totalCost": 78000,
        "vibeVector": {
            "Romance": 0.9,
            "History": 0.8,
            "Culture": 0.8,
            "Scenic": 0.8,
            "Elegant": 0.7,
            "Charming": 0.8
        },
        "activityVector": {
            "Culture": 0.8,
            "Wine": 0.7,
            "Opera": 0.7,
            "History": 0.8,
            "Food": 0.7,
            "Walking": 0.7
        },
        "stayVector": {
            "Boutique": 0.8,
            "Central": 0.7,
            "Romantic": 0.8
        },
        "breakdown": {
            "flights": 32760,
            "stay": 19500,
            "activities": 17160,
            "transfers": 8580
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 16380
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 16380
            }
        ],
        "hotel": {
            "name": "Verona Central Hotel",
            "rating": 4,
            "location": "City Centre, Verona",
            "distanceToCenter": "0.3 km",
            "totalCost": 19500,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Verona Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2860
            },
            {
                "from": "Hotel",
                "to": "Verona Airport",
                "type": "Shuttle",
                "cost": 2860
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Verona highlights",
                        "cost": 2340,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Italy dishes",
                        "cost": 1560,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2340,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2340,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Verona highlights",
                        "cost": 2340,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Italy dishes",
                        "cost": 1560,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2340,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2340,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    },
    {
        "destinationId": "palermo",
        "name": "Palermo",
        "country": "Italy",
        "image": "https://images.unsplash.com/photo-1523365280197-f667f477fc03?w=800&q=80",
        "description": "Chaotic beauty - Arab-Norman churches, street food, and Sicilian soul",
        "tags": [
            "Street Food",
            "History",
            "Culture",
            "Chaotic",
            "Mediterranean",
            "Authentic"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 55000,
        "vibeVector": {
            "Authentic": 0.9,
            "Culture": 0.8,
            "Chaotic": 0.7,
            "Mediterranean": 0.8,
            "Food": 0.9,
            "Vibrant": 0.8
        },
        "activityVector": {
            "Food": 0.95,
            "History": 0.7,
            "Culture": 0.7,
            "Walking": 0.7,
            "Photography": 0.7,
            "Markets": 0.8
        },
        "stayVector": {
            "Budget": 0.8,
            "City": 0.7,
            "Central": 0.7
        },
        "breakdown": {
            "flights": 23100,
            "stay": 13750,
            "activities": 12100,
            "transfers": 6050
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 11550
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 11550
            }
        ],
        "hotel": {
            "name": "Palermo Central Hotel",
            "rating": 4,
            "location": "City Centre, Palermo",
            "distanceToCenter": "0.3 km",
            "totalCost": 13750,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Palermo Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2017
            },
            {
                "from": "Hotel",
                "to": "Palermo Airport",
                "type": "Shuttle",
                "cost": 2017
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Palermo highlights",
                        "cost": 1650,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Italy dishes",
                        "cost": 1100,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1650,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1650,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Palermo highlights",
                        "cost": 1650,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Italy dishes",
                        "cost": 1100,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1650,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1650,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    },
    {
        "destinationId": "catania",
        "name": "Catania",
        "country": "Italy",
        "image": "https://images.unsplash.com/photo-1610545936490-3f1f6c0eba09?w=800&q=80",
        "description": "Baroque city at Etna's foot - fish markets, volcanos, and Sicilian fire",
        "tags": [
            "Volcano",
            "Baroque",
            "Street Food",
            "Sicily",
            "Sun",
            "Culture"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 52000,
        "vibeVector": {
            "Authentic": 0.8,
            "Sun": 0.8,
            "Culture": 0.7,
            "Vibrant": 0.7,
            "Adventure": 0.6,
            "Mediterranean": 0.7
        },
        "activityVector": {
            "Food": 0.8,
            "Volcano": 0.8,
            "History": 0.7,
            "Culture": 0.7,
            "Walking": 0.7,
            "Photography": 0.6
        },
        "stayVector": {
            "Budget": 0.8,
            "City": 0.7,
            "Central": 0.7
        },
        "breakdown": {
            "flights": 21840,
            "stay": 13000,
            "activities": 11440,
            "transfers": 5720
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 10920
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 10920
            }
        ],
        "hotel": {
            "name": "Catania Central Hotel",
            "rating": 4,
            "location": "City Centre, Catania",
            "distanceToCenter": "0.3 km",
            "totalCost": 13000,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Catania Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 1907
            },
            {
                "from": "Hotel",
                "to": "Catania Airport",
                "type": "Shuttle",
                "cost": 1907
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Catania highlights",
                        "cost": 1560,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Italy dishes",
                        "cost": 1040,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1560,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1560,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Catania highlights",
                        "cost": 1560,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Italy dishes",
                        "cost": 1040,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1560,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1560,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    },
    {
        "destinationId": "bari",
        "name": "Bari",
        "country": "Italy",
        "image": "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=800&q=80",
        "description": "Puglia's capital - orecchiette pasta, whitewashed old town, and Adriatic coast",
        "tags": [
            "Coastal",
            "Gastronomy",
            "Authentic",
            "Puglia",
            "Mediterranean",
            "Charming"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 55000,
        "vibeVector": {
            "Coastal": 0.8,
            "Authentic": 0.9,
            "Charming": 0.7,
            "Mediterranean": 0.8,
            "Food": 0.8,
            "Relaxed": 0.7
        },
        "activityVector": {
            "Food": 0.9,
            "Walking": 0.7,
            "Beach": 0.6,
            "Culture": 0.6,
            "Photography": 0.6,
            "History": 0.5
        },
        "stayVector": {
            "Budget": 0.8,
            "Central": 0.7,
            "Boutique": 0.6
        },
        "breakdown": {
            "flights": 23100,
            "stay": 13750,
            "activities": 12100,
            "transfers": 6050
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 11550
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 11550
            }
        ],
        "hotel": {
            "name": "Bari Central Hotel",
            "rating": 4,
            "location": "City Centre, Bari",
            "distanceToCenter": "0.3 km",
            "totalCost": 13750,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Bari Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2017
            },
            {
                "from": "Hotel",
                "to": "Bari Airport",
                "type": "Shuttle",
                "cost": 2017
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Bari highlights",
                        "cost": 1650,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Italy dishes",
                        "cost": 1100,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1650,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1650,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Bari highlights",
                        "cost": 1650,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Italy dishes",
                        "cost": 1100,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1650,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1650,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    },
    {
        "destinationId": "wroclaw",
        "name": "Wroclaw",
        "country": "Poland",
        "image": "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=800&q=80",
        "description": "Bridge city of gnomes - colourful market square and island cathedral",
        "tags": [
            "Charming",
            "Budget",
            "Culture",
            "Bridges",
            "Gnomes",
            "River"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 45000,
        "vibeVector": {
            "Charming": 0.9,
            "Budget": 0.9,
            "Culture": 0.7,
            "River": 0.7,
            "Quirky": 0.8,
            "Scenic": 0.7
        },
        "activityVector": {
            "Walking": 0.8,
            "Culture": 0.7,
            "Photography": 0.7,
            "History": 0.6,
            "Food": 0.7,
            "Beer": 0.6
        },
        "stayVector": {
            "Budget": 0.9,
            "Central": 0.8,
            "Cozy": 0.7
        },
        "breakdown": {
            "flights": 18900,
            "stay": 11250,
            "activities": 9900,
            "transfers": 4950
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 9450
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 9450
            }
        ],
        "hotel": {
            "name": "Wroclaw Central Hotel",
            "rating": 4,
            "location": "City Centre, Wroclaw",
            "distanceToCenter": "0.3 km",
            "totalCost": 11250,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Wroclaw Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 1650
            },
            {
                "from": "Hotel",
                "to": "Wroclaw Airport",
                "type": "Shuttle",
                "cost": 1650
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Wroclaw highlights",
                        "cost": 1350,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Poland dishes",
                        "cost": 900,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1350,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1350,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Wroclaw highlights",
                        "cost": 1350,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Poland dishes",
                        "cost": 900,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1350,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1350,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    },
    {
        "destinationId": "zagreb",
        "name": "Zagreb",
        "country": "Croatia",
        "image": "https://images.unsplash.com/photo-1558612286-1b192e41a24a?w=800&q=80",
        "description": "Austro-Hungarian charm - cafe culture, museums, and a lively upper town",
        "tags": [
            "Culture",
            "Cafe",
            "Museums",
            "Budget",
            "Charming",
            "History"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 50000,
        "vibeVector": {
            "Culture": 0.8,
            "Charming": 0.7,
            "Budget": 0.8,
            "History": 0.6,
            "Social": 0.7,
            "Cozy": 0.7
        },
        "activityVector": {
            "Culture": 0.8,
            "Food": 0.7,
            "History": 0.6,
            "Walking": 0.7,
            "Museums": 0.7,
            "Beer": 0.6
        },
        "stayVector": {
            "Budget": 0.8,
            "City": 0.7,
            "Central": 0.7
        },
        "breakdown": {
            "flights": 21000,
            "stay": 12500,
            "activities": 11000,
            "transfers": 5500
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 10500
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 10500
            }
        ],
        "hotel": {
            "name": "Zagreb Central Hotel",
            "rating": 4,
            "location": "City Centre, Zagreb",
            "distanceToCenter": "0.3 km",
            "totalCost": 12500,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Zagreb Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 1833
            },
            {
                "from": "Hotel",
                "to": "Zagreb Airport",
                "type": "Shuttle",
                "cost": 1833
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Zagreb highlights",
                        "cost": 1500,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Croatia dishes",
                        "cost": 1000,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1500,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1500,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Zagreb highlights",
                        "cost": 1500,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Croatia dishes",
                        "cost": 1000,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1500,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1500,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    },
    {
        "destinationId": "belgrade",
        "name": "Belgrade",
        "country": "Serbia",
        "image": "https://images.unsplash.com/photo-1586710334442-86e1c61a8a17?w=800&q=80",
        "description": "Where the Sava meets the Danube - fortress views, splavovi, and legendary nightlife",
        "tags": [
            "Nightlife",
            "River",
            "Fortress",
            "Budget",
            "Vibrant",
            "Social"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 42000,
        "vibeVector": {
            "Nightlife": 0.95,
            "Vibrant": 0.9,
            "Budget": 0.9,
            "Social": 0.9,
            "River": 0.7,
            "Urban": 0.7
        },
        "activityVector": {
            "Nightlife": 0.95,
            "Food": 0.7,
            "History": 0.6,
            "Culture": 0.6,
            "Walking": 0.6,
            "Photography": 0.5
        },
        "stayVector": {
            "Budget": 0.9,
            "City": 0.7,
            "Central": 0.7
        },
        "breakdown": {
            "flights": 17640,
            "stay": 10500,
            "activities": 9240,
            "transfers": 4620
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 8820
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 8820
            }
        ],
        "hotel": {
            "name": "Belgrade Central Hotel",
            "rating": 4,
            "location": "City Centre, Belgrade",
            "distanceToCenter": "0.3 km",
            "totalCost": 10500,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Belgrade Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 1540
            },
            {
                "from": "Hotel",
                "to": "Belgrade Airport",
                "type": "Shuttle",
                "cost": 1540
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Belgrade highlights",
                        "cost": 1260,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Serbia dishes",
                        "cost": 840,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1260,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1260,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Belgrade highlights",
                        "cost": 1260,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Serbia dishes",
                        "cost": 840,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1260,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1260,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    },
    {
        "destinationId": "tirana",
        "name": "Tirana",
        "country": "Albania",
        "image": "https://images.unsplash.com/photo-1580306682852-81bd8e40361a?w=800&q=80",
        "description": "Colourful capital reinventing itself - bunkers, boulevards, and Bunk'Art",
        "tags": [
            "Budget",
            "Colourful",
            "Hidden Gem",
            "Culture",
            "History",
            "Emerging"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 38000,
        "vibeVector": {
            "Budget": 0.95,
            "Emerging": 0.9,
            "Colourful": 0.8,
            "Culture": 0.6,
            "Quirky": 0.7,
            "Friendly": 0.7
        },
        "activityVector": {
            "Culture": 0.7,
            "History": 0.7,
            "Walking": 0.7,
            "Food": 0.6,
            "Photography": 0.6,
            "Markets": 0.5
        },
        "stayVector": {
            "Budget": 0.95,
            "City": 0.7,
            "Central": 0.7
        },
        "breakdown": {
            "flights": 15960,
            "stay": 9500,
            "activities": 8360,
            "transfers": 4180
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 7980
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 7980
            }
        ],
        "hotel": {
            "name": "Tirana Central Hotel",
            "rating": 4,
            "location": "City Centre, Tirana",
            "distanceToCenter": "0.3 km",
            "totalCost": 9500,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Tirana Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 1393
            },
            {
                "from": "Hotel",
                "to": "Tirana Airport",
                "type": "Shuttle",
                "cost": 1393
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Tirana highlights",
                        "cost": 1140,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Albania dishes",
                        "cost": 760,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1140,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1140,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Tirana highlights",
                        "cost": 1140,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Albania dishes",
                        "cost": 760,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1140,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1140,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    },
    {
        "destinationId": "larnaca",
        "name": "Larnaca",
        "country": "Cyprus",
        "image": "https://images.unsplash.com/photo-1560415755-bd80d06eda60?w=800&q=80",
        "description": "Salt lake flamingos, Zenobia wreck diving, and golden Mediterranean beaches",
        "tags": [
            "Beach",
            "Diving",
            "Mediterranean",
            "Sun",
            "History",
            "Relaxed"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 60000,
        "vibeVector": {
            "Beach": 0.9,
            "Sun": 0.9,
            "Mediterranean": 0.9,
            "Relaxed": 0.8,
            "Warm": 0.9,
            "Coastal": 0.8
        },
        "activityVector": {
            "Beach": 0.9,
            "Diving": 0.7,
            "Relaxation": 0.8,
            "History": 0.6,
            "Swimming": 0.8,
            "Photography": 0.6
        },
        "stayVector": {
            "Beach": 0.8,
            "Resort": 0.7,
            "Budget": 0.7
        },
        "breakdown": {
            "flights": 25200,
            "stay": 15000,
            "activities": 13200,
            "transfers": 6600
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 12600
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 12600
            }
        ],
        "hotel": {
            "name": "Larnaca Central Hotel",
            "rating": 4,
            "location": "City Centre, Larnaca",
            "distanceToCenter": "0.3 km",
            "totalCost": 15000,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Larnaca Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2200
            },
            {
                "from": "Hotel",
                "to": "Larnaca Airport",
                "type": "Shuttle",
                "cost": 2200
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Larnaca highlights",
                        "cost": 1800,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Cyprus dishes",
                        "cost": 1200,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1800,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1800,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Larnaca highlights",
                        "cost": 1800,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Cyprus dishes",
                        "cost": 1200,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1800,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1800,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    },
    {
        "destinationId": "paphos",
        "name": "Paphos",
        "country": "Cyprus",
        "image": "https://images.unsplash.com/photo-1580402427914-a6cc60d7c150?w=800&q=80",
        "description": "Birthplace of Aphrodite - UNESCO mosaics, sea caves, and turquoise bays",
        "tags": [
            "Beach",
            "Ancient",
            "Mythology",
            "UNESCO",
            "Sun",
            "Scenic"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 62000,
        "vibeVector": {
            "Beach": 0.9,
            "Ancient": 0.8,
            "Scenic": 0.9,
            "Sun": 0.9,
            "Romantic": 0.7,
            "Mythology": 0.7
        },
        "activityVector": {
            "Beach": 0.9,
            "History": 0.8,
            "Photography": 0.8,
            "Swimming": 0.7,
            "Culture": 0.6,
            "Nature": 0.6
        },
        "stayVector": {
            "Beach": 0.8,
            "Resort": 0.7,
            "Scenic": 0.7
        },
        "breakdown": {
            "flights": 26040,
            "stay": 15500,
            "activities": 13640,
            "transfers": 6820
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 13020
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 13020
            }
        ],
        "hotel": {
            "name": "Paphos Central Hotel",
            "rating": 4,
            "location": "City Centre, Paphos",
            "distanceToCenter": "0.3 km",
            "totalCost": 15500,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Paphos Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2273
            },
            {
                "from": "Hotel",
                "to": "Paphos Airport",
                "type": "Shuttle",
                "cost": 2273
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Paphos highlights",
                        "cost": 1860,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Cyprus dishes",
                        "cost": 1240,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1860,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1860,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Paphos highlights",
                        "cost": 1860,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Cyprus dishes",
                        "cost": 1240,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1860,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1860,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    },
    {
        "destinationId": "cork",
        "name": "Cork",
        "country": "Ireland",
        "image": "https://images.unsplash.com/photo-1564959130747-897e0b5d5e13?w=800&q=80",
        "description": "Ireland's foodie capital - English Market, craft beer, and Wild Atlantic Way gateway",
        "tags": [
            "Food",
            "Pubs",
            "Culture",
            "Coastal",
            "Friendly",
            "Green"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 2,
        "totalCost": 78000,
        "vibeVector": {
            "Food": 0.9,
            "Social": 0.8,
            "Culture": 0.7,
            "Coastal": 0.6,
            "Green": 0.7,
            "Friendly": 0.8
        },
        "activityVector": {
            "Food": 0.9,
            "Beer": 0.8,
            "Culture": 0.7,
            "Walking": 0.7,
            "Nature": 0.6,
            "Music": 0.6
        },
        "stayVector": {
            "City": 0.7,
            "Boutique": 0.6,
            "Cozy": 0.7
        },
        "breakdown": {
            "flights": 32760,
            "stay": 19500,
            "activities": 17160,
            "transfers": 8580
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 16380
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 16380
            }
        ],
        "hotel": {
            "name": "Cork Central Hotel",
            "rating": 4,
            "location": "City Centre, Cork",
            "distanceToCenter": "0.3 km",
            "totalCost": 19500,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Cork Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2860
            },
            {
                "from": "Hotel",
                "to": "Cork Airport",
                "type": "Shuttle",
                "cost": 2860
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Cork highlights",
                        "cost": 2340,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Ireland dishes",
                        "cost": 1560,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2340,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2340,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Cork highlights",
                        "cost": 2340,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Ireland dishes",
                        "cost": 1560,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2340,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2340,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    },
    {
        "destinationId": "varna",
        "name": "Varna",
        "country": "Bulgaria",
        "image": "https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b?w=800&q=80",
        "description": "Black Sea pearl - Roman baths, sea garden promenades, and summer nightlife",
        "tags": [
            "Beach",
            "Budget",
            "Sun",
            "History",
            "Coastal",
            "Nightlife"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 42000,
        "vibeVector": {
            "Beach": 0.85,
            "Budget": 0.9,
            "Sun": 0.85,
            "Coastal": 0.8,
            "Nightlife": 0.6,
            "Relaxed": 0.7
        },
        "activityVector": {
            "Beach": 0.85,
            "History": 0.6,
            "Relaxation": 0.7,
            "Nightlife": 0.6,
            "Swimming": 0.7,
            "Walking": 0.6
        },
        "stayVector": {
            "Beach": 0.8,
            "Budget": 0.9,
            "Resort": 0.6
        },
        "breakdown": {
            "flights": 17640,
            "stay": 10500,
            "activities": 9240,
            "transfers": 4620
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 8820
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 8820
            }
        ],
        "hotel": {
            "name": "Varna Central Hotel",
            "rating": 4,
            "location": "City Centre, Varna",
            "distanceToCenter": "0.3 km",
            "totalCost": 10500,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Varna Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 1540
            },
            {
                "from": "Hotel",
                "to": "Varna Airport",
                "type": "Shuttle",
                "cost": 1540
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Varna highlights",
                        "cost": 1260,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Bulgaria dishes",
                        "cost": 840,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1260,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1260,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Varna highlights",
                        "cost": 1260,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Bulgaria dishes",
                        "cost": 840,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1260,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1260,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    },
    {
        "destinationId": "clujnapoca",
        "name": "Cluj-Napoca",
        "country": "Romania",
        "image": "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&q=80",
        "description": "Transylvanian cultural hub - festivals, students, and a booming tech scene",
        "tags": [
            "Culture",
            "Budget",
            "Festivals",
            "Students",
            "Emerging",
            "History"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 40000,
        "vibeVector": {
            "Culture": 0.8,
            "Budget": 0.9,
            "Vibrant": 0.7,
            "Emerging": 0.8,
            "Social": 0.7,
            "History": 0.6
        },
        "activityVector": {
            "Culture": 0.8,
            "Nightlife": 0.7,
            "Food": 0.7,
            "History": 0.6,
            "Walking": 0.6,
            "Music": 0.6
        },
        "stayVector": {
            "Budget": 0.9,
            "City": 0.7,
            "Central": 0.7
        },
        "breakdown": {
            "flights": 16800,
            "stay": 10000,
            "activities": 8800,
            "transfers": 4400
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 8400
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 8400
            }
        ],
        "hotel": {
            "name": "Cluj-Napoca Central Hotel",
            "rating": 4,
            "location": "City Centre, Cluj-Napoca",
            "distanceToCenter": "0.3 km",
            "totalCost": 10000,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Cluj-Napoca Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 1467
            },
            {
                "from": "Hotel",
                "to": "Cluj-Napoca Airport",
                "type": "Shuttle",
                "cost": 1467
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Cluj-Napoca highlights",
                        "cost": 1200,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Romania dishes",
                        "cost": 800,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1200,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1200,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Cluj-Napoca highlights",
                        "cost": 1200,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Romania dishes",
                        "cost": 800,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1200,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1200,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    },
    {
        "destinationId": "sarajevo",
        "name": "Sarajevo",
        "country": "Bosnia",
        "image": "https://images.unsplash.com/photo-1590079407872-e8afecb00e6e?w=800&q=80",
        "description": "East meets West - Ottoman bazaars, Austro-Hungarian boulevards, wartime resilience",
        "tags": [
            "History",
            "Culture",
            "Budget",
            "Ottoman",
            "Authentic",
            "Hidden Gem"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 40000,
        "vibeVector": {
            "History": 0.9,
            "Culture": 0.9,
            "Budget": 0.9,
            "Authentic": 0.9,
            "Heritage": 0.8,
            "Emerging": 0.7
        },
        "activityVector": {
            "History": 0.9,
            "Culture": 0.8,
            "Food": 0.7,
            "Walking": 0.7,
            "Photography": 0.7,
            "Heritage": 0.7
        },
        "stayVector": {
            "Budget": 0.9,
            "Central": 0.7,
            "Boutique": 0.6
        },
        "breakdown": {
            "flights": 16800,
            "stay": 10000,
            "activities": 8800,
            "transfers": 4400
        },
        "flights": [
            {
                "type": "departure",
                "airline": "Multi-carrier",
                "flightNo": "XX100",
                "from": "DEL",
                "to": "DEST",
                "departure": "02:00",
                "arrival": "09:00",
                "duration": "10h",
                "cost": 8400
            },
            {
                "type": "return",
                "airline": "Multi-carrier",
                "flightNo": "XX101",
                "from": "DEST",
                "to": "DEL",
                "departure": "11:00",
                "arrival": "01:00 +1",
                "duration": "10h",
                "cost": 8400
            }
        ],
        "hotel": {
            "name": "Sarajevo Central Hotel",
            "rating": 4,
            "location": "City Centre, Sarajevo",
            "distanceToCenter": "0.3 km",
            "totalCost": 10000,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Sarajevo Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 1467
            },
            {
                "from": "Hotel",
                "to": "Sarajevo Airport",
                "type": "Shuttle",
                "cost": 1467
            }
        ],
        "days": [
            {
                "day": 1,
                "title": "Arrival & Discovery",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Sarajevo highlights",
                        "cost": 1200,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Bosnia dishes",
                        "cost": 800,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1200,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1200,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Sarajevo highlights",
                        "cost": 1200,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Bosnia dishes",
                        "cost": 800,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1200,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1200,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Departure",
                "items": [
                    {
                        "time": "08:00",
                        "activity": "Checkout",
                        "description": "Transfer to airport",
                        "cost": 0,
                        "type": "travel"
                    },
                    {
                        "time": "11:00",
                        "activity": "Departure Flight",
                        "description": "Return flight",
                        "cost": 0,
                        "type": "travel"
                    }
                ]
            }
        ]
    }
];
