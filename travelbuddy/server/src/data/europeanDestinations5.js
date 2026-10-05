// HotelAPI-verified European destinations (batch 5)
module.exports = [
    {
        "destinationId": "dublin",
        "name": "Dublin",
        "country": "Ireland",
        "image": "https://images.unsplash.com/photo-1549918864-48f4421fa9c0?w=800&q=80",
        "description": "Literary pubs, Georgian squares, and the wild Irish spirit",
        "tags": [
            "Pubs",
            "Literature",
            "Culture",
            "Music",
            "Friendly",
            "Green"
        ],
        "duration": "4 Days, 3 Nights",
        "costLevel": 2,
        "totalCost": 82000,
        "vibeVector": {
            "Culture": 0.8,
            "Social": 0.9,
            "Music": 0.8,
            "Green": 0.6,
            "Friendly": 0.9,
            "Urban": 0.7,
            "Cozy": 0.7
        },
        "activityVector": {
            "Food": 0.8,
            "Music": 0.9,
            "Culture": 0.7,
            "Nightlife": 0.8,
            "History": 0.6,
            "Walking": 0.7
        },
        "stayVector": {
            "City": 0.8,
            "Central": 0.7,
            "Boutique": 0.6
        },
        "breakdown": {
            "flights": 34440,
            "stay": 20500,
            "activities": 18040,
            "transfers": 9020
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
                "cost": 17220
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
                "cost": 17220
            }
        ],
        "hotel": {
            "name": "Dublin Central Hotel",
            "rating": 4,
            "location": "City Centre, Dublin",
            "distanceToCenter": "0.3 km",
            "totalCost": 20500,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 3
        },
        "transfers": [
            {
                "from": "Dublin Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 3007
            },
            {
                "from": "Hotel",
                "to": "Dublin Airport",
                "type": "Shuttle",
                "cost": 3007
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
                        "description": "Explore Dublin highlights",
                        "cost": 2460,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Ireland dishes",
                        "cost": 1640,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2460,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2460,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Deep Dive",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Dublin highlights",
                        "cost": 2460,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Ireland dishes",
                        "cost": 1640,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2460,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2460,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Dublin highlights",
                        "cost": 2460,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Ireland dishes",
                        "cost": 1640,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2460,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2460,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 4,
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
        "destinationId": "manchester",
        "name": "Manchester",
        "country": "England",
        "image": "https://images.unsplash.com/photo-1515879218367-8466d910aede?w=800&q=80",
        "description": "Football, music heritage, and a thriving Northern Quarter scene",
        "tags": [
            "Football",
            "Music",
            "Urban",
            "Nightlife",
            "Culture",
            "Industrial"
        ],
        "duration": "4 Days, 3 Nights",
        "costLevel": 2,
        "totalCost": 85000,
        "vibeVector": {
            "Urban": 0.9,
            "Music": 0.8,
            "Vibrant": 0.8,
            "Social": 0.8,
            "Culture": 0.7,
            "Industrial": 0.6
        },
        "activityVector": {
            "Music": 0.8,
            "Football": 0.9,
            "Nightlife": 0.8,
            "Culture": 0.7,
            "Food": 0.7,
            "Shopping": 0.6
        },
        "stayVector": {
            "City": 0.8,
            "Urban": 0.7,
            "Budget": 0.6
        },
        "breakdown": {
            "flights": 35700,
            "stay": 21250,
            "activities": 18700,
            "transfers": 9350
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
                "cost": 17850
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
                "cost": 17850
            }
        ],
        "hotel": {
            "name": "Manchester Central Hotel",
            "rating": 4,
            "location": "City Centre, Manchester",
            "distanceToCenter": "0.3 km",
            "totalCost": 21250,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 3
        },
        "transfers": [
            {
                "from": "Manchester Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 3117
            },
            {
                "from": "Hotel",
                "to": "Manchester Airport",
                "type": "Shuttle",
                "cost": 3117
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
                        "description": "Explore Manchester highlights",
                        "cost": 2550,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional England dishes",
                        "cost": 1700,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2550,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2550,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Deep Dive",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Manchester highlights",
                        "cost": 2550,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional England dishes",
                        "cost": 1700,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2550,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2550,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Manchester highlights",
                        "cost": 2550,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional England dishes",
                        "cost": 1700,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2550,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2550,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 4,
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
        "destinationId": "antalya",
        "name": "Antalya",
        "country": "Turkey",
        "image": "https://images.unsplash.com/photo-1593238739364-18cfde4d08b3?w=800&q=80",
        "description": "Turquoise coast paradise - ancient ruins meet all-inclusive resorts",
        "tags": [
            "Beach",
            "Sun",
            "Resort",
            "Ancient",
            "Mediterranean",
            "Budget"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 55000,
        "vibeVector": {
            "Beach": 0.95,
            "Sun": 0.9,
            "Warm": 0.9,
            "Resort": 0.8,
            "Mediterranean": 0.8,
            "Relaxed": 0.8
        },
        "activityVector": {
            "Beach": 0.9,
            "History": 0.7,
            "Relaxation": 0.8,
            "Food": 0.7,
            "Swimming": 0.8,
            "Photography": 0.6
        },
        "stayVector": {
            "Beach": 0.9,
            "Resort": 0.8,
            "Budget": 0.7
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
            "name": "Antalya Central Hotel",
            "rating": 4,
            "location": "City Centre, Antalya",
            "distanceToCenter": "0.3 km",
            "totalCost": 13750,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Antalya Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2017
            },
            {
                "from": "Hotel",
                "to": "Antalya Airport",
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
                        "description": "Explore Antalya highlights",
                        "cost": 1650,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Turkey dishes",
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
                        "description": "Explore Antalya highlights",
                        "cost": 1650,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Turkey dishes",
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
        "destinationId": "izmir",
        "name": "Izmir",
        "country": "Turkey",
        "image": "https://images.unsplash.com/photo-1570838414685-ea711da48d60?w=800&q=80",
        "description": "Aegean breezes, bazaars, and gateway to ancient Ephesus",
        "tags": [
            "Ancient",
            "Coastal",
            "Bazaar",
            "Culture",
            "Aegean",
            "History"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 52000,
        "vibeVector": {
            "Coastal": 0.8,
            "Culture": 0.8,
            "History": 0.8,
            "Warm": 0.7,
            "Authentic": 0.8,
            "Budget": 0.8
        },
        "activityVector": {
            "History": 0.9,
            "Culture": 0.7,
            "Food": 0.8,
            "Shopping": 0.7,
            "Walking": 0.7,
            "Photography": 0.6
        },
        "stayVector": {
            "City": 0.7,
            "Budget": 0.8,
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
            "name": "Izmir Central Hotel",
            "rating": 4,
            "location": "City Centre, Izmir",
            "distanceToCenter": "0.3 km",
            "totalCost": 13000,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Izmir Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 1907
            },
            {
                "from": "Hotel",
                "to": "Izmir Airport",
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
                        "description": "Explore Izmir highlights",
                        "cost": 1560,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Turkey dishes",
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
                        "description": "Explore Izmir highlights",
                        "cost": 1560,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Turkey dishes",
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
        "destinationId": "corfu",
        "name": "Corfu",
        "country": "Greece",
        "image": "https://images.unsplash.com/photo-1588362951121-3ee319b018a2?w=800&q=80",
        "description": "Venetian old town, olive groves, and crystal Ionian waters",
        "tags": [
            "Beach",
            "Island",
            "Venetian",
            "Olive",
            "Scenic",
            "Mediterranean"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 60000,
        "vibeVector": {
            "Beach": 0.9,
            "Island": 0.9,
            "Scenic": 0.9,
            "Mediterranean": 0.9,
            "Peaceful": 0.7,
            "Romantic": 0.7
        },
        "activityVector": {
            "Beach": 0.9,
            "Swimming": 0.8,
            "Photography": 0.8,
            "Culture": 0.6,
            "Nature": 0.7,
            "Relaxation": 0.8
        },
        "stayVector": {
            "Beach": 0.8,
            "Boutique": 0.7,
            "Scenic": 0.8
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
            "name": "Corfu Central Hotel",
            "rating": 4,
            "location": "City Centre, Corfu",
            "distanceToCenter": "0.3 km",
            "totalCost": 15000,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Corfu Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2200
            },
            {
                "from": "Hotel",
                "to": "Corfu Airport",
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
                        "description": "Explore Corfu highlights",
                        "cost": 1800,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Greece dishes",
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
                        "description": "Explore Corfu highlights",
                        "cost": 1800,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Greece dishes",
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
        "destinationId": "rhodes",
        "name": "Rhodes",
        "country": "Greece",
        "image": "https://images.unsplash.com/photo-1601990795572-9a2c16b49ea5?w=800&q=80",
        "description": "Medieval walled city and sun-drenched Aegean beaches",
        "tags": [
            "Beach",
            "Medieval",
            "Sun",
            "Island",
            "History",
            "Warm"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 58000,
        "vibeVector": {
            "Beach": 0.9,
            "Sun": 0.9,
            "History": 0.8,
            "Island": 0.8,
            "Warm": 0.9,
            "Medieval": 0.7
        },
        "activityVector": {
            "Beach": 0.9,
            "History": 0.8,
            "Walking": 0.7,
            "Swimming": 0.8,
            "Photography": 0.7,
            "Culture": 0.6
        },
        "stayVector": {
            "Beach": 0.8,
            "Resort": 0.7,
            "Budget": 0.7
        },
        "breakdown": {
            "flights": 24360,
            "stay": 14500,
            "activities": 12760,
            "transfers": 6380
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
                "cost": 12180
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
                "cost": 12180
            }
        ],
        "hotel": {
            "name": "Rhodes Central Hotel",
            "rating": 4,
            "location": "City Centre, Rhodes",
            "distanceToCenter": "0.3 km",
            "totalCost": 14500,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Rhodes Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2127
            },
            {
                "from": "Hotel",
                "to": "Rhodes Airport",
                "type": "Shuttle",
                "cost": 2127
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
                        "description": "Explore Rhodes highlights",
                        "cost": 1740,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Greece dishes",
                        "cost": 1160,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1740,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1740,
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
                        "description": "Explore Rhodes highlights",
                        "cost": 1740,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Greece dishes",
                        "cost": 1160,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1740,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1740,
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
        "destinationId": "mykonos",
        "name": "Mykonos",
        "country": "Greece",
        "image": "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80",
        "description": "Iconic windmills, white-washed lanes, and legendary beach parties",
        "tags": [
            "Beach",
            "Party",
            "Luxury",
            "Island",
            "Nightlife",
            "Iconic"
        ],
        "duration": "4 Days, 3 Nights",
        "costLevel": 3,
        "totalCost": 120000,
        "vibeVector": {
            "Beach": 0.9,
            "Party": 0.9,
            "Luxury": 0.8,
            "Island": 0.9,
            "Nightlife": 0.9,
            "Vibrant": 0.8
        },
        "activityVector": {
            "Beach": 0.9,
            "Nightlife": 0.9,
            "Photography": 0.8,
            "Swimming": 0.7,
            "Food": 0.7,
            "Relaxation": 0.6
        },
        "stayVector": {
            "Luxury": 0.9,
            "Beach": 0.8,
            "Boutique": 0.7
        },
        "breakdown": {
            "flights": 50400,
            "stay": 30000,
            "activities": 26400,
            "transfers": 13200
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
                "cost": 25200
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
                "cost": 25200
            }
        ],
        "hotel": {
            "name": "Mykonos Central Hotel",
            "rating": 4,
            "location": "City Centre, Mykonos",
            "distanceToCenter": "0.3 km",
            "totalCost": 30000,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 3
        },
        "transfers": [
            {
                "from": "Mykonos Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 4400
            },
            {
                "from": "Hotel",
                "to": "Mykonos Airport",
                "type": "Shuttle",
                "cost": 4400
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
                        "description": "Explore Mykonos highlights",
                        "cost": 3600,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Greece dishes",
                        "cost": 2400,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 3600,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 3600,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Deep Dive",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Mykonos highlights",
                        "cost": 3600,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Greece dishes",
                        "cost": 2400,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 3600,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 3600,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Mykonos highlights",
                        "cost": 3600,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Greece dishes",
                        "cost": 2400,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 3600,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 3600,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 4,
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
        "destinationId": "chania",
        "name": "Chania",
        "country": "Greece",
        "image": "https://images.unsplash.com/photo-1597466765990-64ad1c35dafc?w=800&q=80",
        "description": "Venetian harbour, Cretan cuisine, and a gateway to Samaria Gorge",
        "tags": [
            "Beach",
            "Venetian",
            "Cuisine",
            "Gorge",
            "Harbour",
            "Scenic"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 58000,
        "vibeVector": {
            "Beach": 0.8,
            "Scenic": 0.9,
            "Coastal": 0.8,
            "Authentic": 0.8,
            "Charming": 0.8,
            "Peaceful": 0.7
        },
        "activityVector": {
            "Beach": 0.8,
            "Food": 0.9,
            "Hiking": 0.7,
            "Photography": 0.8,
            "Culture": 0.7,
            "Nature": 0.7
        },
        "stayVector": {
            "Beach": 0.7,
            "Boutique": 0.8,
            "Charming": 0.8
        },
        "breakdown": {
            "flights": 24360,
            "stay": 14500,
            "activities": 12760,
            "transfers": 6380
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
                "cost": 12180
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
                "cost": 12180
            }
        ],
        "hotel": {
            "name": "Chania Central Hotel",
            "rating": 4,
            "location": "City Centre, Chania",
            "distanceToCenter": "0.3 km",
            "totalCost": 14500,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Chania Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2127
            },
            {
                "from": "Hotel",
                "to": "Chania Airport",
                "type": "Shuttle",
                "cost": 2127
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
                        "description": "Explore Chania highlights",
                        "cost": 1740,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Greece dishes",
                        "cost": 1160,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1740,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1740,
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
                        "description": "Explore Chania highlights",
                        "cost": 1740,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Greece dishes",
                        "cost": 1160,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 1740,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 1740,
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
        "destinationId": "palma",
        "name": "Palma de Mallorca",
        "country": "Spain",
        "image": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
        "description": "Cathedral views, tapas bars, and turquoise Balearic coves",
        "tags": [
            "Beach",
            "Mediterranean",
            "Cathedral",
            "Tapas",
            "Island",
            "Sun"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 2,
        "totalCost": 78000,
        "vibeVector": {
            "Beach": 0.9,
            "Sun": 0.9,
            "Mediterranean": 0.9,
            "Elegant": 0.7,
            "Island": 0.8,
            "Relaxed": 0.7
        },
        "activityVector": {
            "Beach": 0.9,
            "Food": 0.8,
            "Culture": 0.6,
            "Cycling": 0.6,
            "Swimming": 0.8,
            "Photography": 0.7
        },
        "stayVector": {
            "Beach": 0.8,
            "Boutique": 0.7,
            "Resort": 0.7
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
            "name": "Palma de Mallorca Central Hotel",
            "rating": 4,
            "location": "City Centre, Palma de Mallorca",
            "distanceToCenter": "0.3 km",
            "totalCost": 19500,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Palma de Mallorca Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2860
            },
            {
                "from": "Hotel",
                "to": "Palma de Mallorca Airport",
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
                        "description": "Explore Palma de Mallorca highlights",
                        "cost": 2340,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Spain dishes",
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
                        "description": "Explore Palma de Mallorca highlights",
                        "cost": 2340,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Spain dishes",
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
        "destinationId": "tenerife",
        "name": "Tenerife",
        "country": "Spain",
        "image": "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
        "description": "Volcanic island - Mount Teide, black sand beaches, and year-round sun",
        "tags": [
            "Beach",
            "Volcano",
            "Sun",
            "Island",
            "Nature",
            "Warm"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 62000,
        "vibeVector": {
            "Beach": 0.85,
            "Sun": 0.95,
            "Nature": 0.8,
            "Warm": 0.95,
            "Island": 0.9,
            "Adventure": 0.6
        },
        "activityVector": {
            "Beach": 0.85,
            "Hiking": 0.7,
            "Nature": 0.8,
            "Swimming": 0.8,
            "Photography": 0.7,
            "Relaxation": 0.8
        },
        "stayVector": {
            "Beach": 0.8,
            "Resort": 0.8,
            "Budget": 0.7
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
            "name": "Tenerife Central Hotel",
            "rating": 4,
            "location": "City Centre, Tenerife",
            "distanceToCenter": "0.3 km",
            "totalCost": 15500,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Tenerife Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2273
            },
            {
                "from": "Hotel",
                "to": "Tenerife Airport",
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
                        "description": "Explore Tenerife highlights",
                        "cost": 1860,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Spain dishes",
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
                        "description": "Explore Tenerife highlights",
                        "cost": 1860,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Spain dishes",
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
        "destinationId": "faro",
        "name": "Faro",
        "country": "Portugal",
        "image": "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
        "description": "Algarve gateway - golden cliffs, sea caves, and endless coastline",
        "tags": [
            "Beach",
            "Coastal",
            "Cliffs",
            "Sun",
            "Budget",
            "Nature"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 1,
        "totalCost": 55000,
        "vibeVector": {
            "Beach": 0.9,
            "Coastal": 0.9,
            "Sun": 0.9,
            "Nature": 0.8,
            "Relaxed": 0.8,
            "Budget": 0.8
        },
        "activityVector": {
            "Beach": 0.9,
            "Nature": 0.8,
            "Photography": 0.8,
            "Swimming": 0.8,
            "Relaxation": 0.8,
            "Kayaking": 0.6
        },
        "stayVector": {
            "Beach": 0.8,
            "Budget": 0.8,
            "Coastal": 0.7
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
            "name": "Faro Central Hotel",
            "rating": 4,
            "location": "City Centre, Faro",
            "distanceToCenter": "0.3 km",
            "totalCost": 13750,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Faro Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2017
            },
            {
                "from": "Hotel",
                "to": "Faro Airport",
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
                        "description": "Explore Faro highlights",
                        "cost": 1650,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Portugal dishes",
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
                        "description": "Explore Faro highlights",
                        "cost": 1650,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Portugal dishes",
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
        "destinationId": "marseille",
        "name": "Marseille",
        "country": "France",
        "image": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80",
        "description": "Gritty port city with bouillabaisse, calanques, and Mediterranean soul",
        "tags": [
            "Coastal",
            "Gastronomy",
            "Port",
            "Mediterranean",
            "Vibrant",
            "Culture"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 2,
        "totalCost": 80000,
        "vibeVector": {
            "Coastal": 0.8,
            "Vibrant": 0.8,
            "Mediterranean": 0.8,
            "Culture": 0.7,
            "Urban": 0.7,
            "Authentic": 0.8
        },
        "activityVector": {
            "Food": 0.9,
            "Culture": 0.7,
            "Nature": 0.7,
            "Photography": 0.7,
            "Walking": 0.7,
            "Sailing": 0.6
        },
        "stayVector": {
            "City": 0.7,
            "Boutique": 0.7,
            "Central": 0.7
        },
        "breakdown": {
            "flights": 33600,
            "stay": 20000,
            "activities": 17600,
            "transfers": 8800
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
                "cost": 16800
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
                "cost": 16800
            }
        ],
        "hotel": {
            "name": "Marseille Central Hotel",
            "rating": 4,
            "location": "City Centre, Marseille",
            "distanceToCenter": "0.3 km",
            "totalCost": 20000,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Marseille Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2933
            },
            {
                "from": "Hotel",
                "to": "Marseille Airport",
                "type": "Shuttle",
                "cost": 2933
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
                        "description": "Explore Marseille highlights",
                        "cost": 2400,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional France dishes",
                        "cost": 1600,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2400,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2400,
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
                        "description": "Explore Marseille highlights",
                        "cost": 2400,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional France dishes",
                        "cost": 1600,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2400,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2400,
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
        "destinationId": "toulouse",
        "name": "Toulouse",
        "country": "France",
        "image": "https://images.unsplash.com/photo-1574866412185-4e87e tried-9fa5?w=800&q=80",
        "description": "The Pink City - aerospace, cassoulet, and canal-side charm",
        "tags": [
            "Culture",
            "Space",
            "Gastronomy",
            "Charming",
            "River",
            "Pink"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 2,
        "totalCost": 75000,
        "vibeVector": {
            "Culture": 0.7,
            "Charming": 0.8,
            "Gastronomy": 0.8,
            "River": 0.6,
            "Relaxed": 0.7,
            "Scenic": 0.6
        },
        "activityVector": {
            "Food": 0.9,
            "Culture": 0.7,
            "Walking": 0.7,
            "Photography": 0.6,
            "History": 0.6,
            "Cycling": 0.5
        },
        "stayVector": {
            "City": 0.7,
            "Boutique": 0.7,
            "Central": 0.7
        },
        "breakdown": {
            "flights": 31500,
            "stay": 18750,
            "activities": 16500,
            "transfers": 8250
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
                "cost": 15750
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
                "cost": 15750
            }
        ],
        "hotel": {
            "name": "Toulouse Central Hotel",
            "rating": 4,
            "location": "City Centre, Toulouse",
            "distanceToCenter": "0.3 km",
            "totalCost": 18750,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Toulouse Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2750
            },
            {
                "from": "Hotel",
                "to": "Toulouse Airport",
                "type": "Shuttle",
                "cost": 2750
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
                        "description": "Explore Toulouse highlights",
                        "cost": 2250,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional France dishes",
                        "cost": 1500,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2250,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2250,
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
                        "description": "Explore Toulouse highlights",
                        "cost": 2250,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional France dishes",
                        "cost": 1500,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2250,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2250,
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
        "destinationId": "frankfurt",
        "name": "Frankfurt",
        "country": "Germany",
        "image": "https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?w=800&q=80",
        "description": "Skyline city - finance, apple wine, and the museum mile along the Main",
        "tags": [
            "Urban",
            "Modern",
            "Finance",
            "Culture",
            "River",
            "Museums"
        ],
        "duration": "4 Days, 3 Nights",
        "costLevel": 2,
        "totalCost": 88000,
        "vibeVector": {
            "Urban": 0.9,
            "Modern": 0.9,
            "Culture": 0.7,
            "Business": 0.7,
            "River": 0.5,
            "Efficient": 0.7
        },
        "activityVector": {
            "Culture": 0.7,
            "Food": 0.7,
            "Museums": 0.7,
            "Walking": 0.6,
            "Shopping": 0.6,
            "Photography": 0.5
        },
        "stayVector": {
            "City": 0.9,
            "Modern": 0.8,
            "Central": 0.8
        },
        "breakdown": {
            "flights": 36960,
            "stay": 22000,
            "activities": 19360,
            "transfers": 9680
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
                "cost": 18480
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
                "cost": 18480
            }
        ],
        "hotel": {
            "name": "Frankfurt Central Hotel",
            "rating": 4,
            "location": "City Centre, Frankfurt",
            "distanceToCenter": "0.3 km",
            "totalCost": 22000,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 3
        },
        "transfers": [
            {
                "from": "Frankfurt Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 3227
            },
            {
                "from": "Hotel",
                "to": "Frankfurt Airport",
                "type": "Shuttle",
                "cost": 3227
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
                        "description": "Explore Frankfurt highlights",
                        "cost": 2640,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Germany dishes",
                        "cost": 1760,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2640,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2640,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Deep Dive",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Frankfurt highlights",
                        "cost": 2640,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Germany dishes",
                        "cost": 1760,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2640,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2640,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Frankfurt highlights",
                        "cost": 2640,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Germany dishes",
                        "cost": 1760,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2640,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2640,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 4,
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
        "destinationId": "dusseldorf",
        "name": "Dusseldorf",
        "country": "Germany",
        "image": "https://images.unsplash.com/photo-1545243424-0ce743321e11?w=800&q=80",
        "description": "Fashion capital on the Rhine - Altbier, art, and the Altstadt",
        "tags": [
            "Fashion",
            "Art",
            "Beer",
            "Urban",
            "Rhine",
            "Shopping"
        ],
        "duration": "4 Days, 3 Nights",
        "costLevel": 2,
        "totalCost": 82000,
        "vibeVector": {
            "Urban": 0.8,
            "Fashion": 0.7,
            "Art": 0.7,
            "Social": 0.7,
            "Modern": 0.7,
            "River": 0.6
        },
        "activityVector": {
            "Shopping": 0.8,
            "Art": 0.7,
            "Beer": 0.7,
            "Culture": 0.7,
            "Food": 0.7,
            "Walking": 0.6
        },
        "stayVector": {
            "City": 0.8,
            "Modern": 0.7,
            "Central": 0.7
        },
        "breakdown": {
            "flights": 34440,
            "stay": 20500,
            "activities": 18040,
            "transfers": 9020
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
                "cost": 17220
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
                "cost": 17220
            }
        ],
        "hotel": {
            "name": "Dusseldorf Central Hotel",
            "rating": 4,
            "location": "City Centre, Dusseldorf",
            "distanceToCenter": "0.3 km",
            "totalCost": 20500,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 3
        },
        "transfers": [
            {
                "from": "Dusseldorf Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 3007
            },
            {
                "from": "Hotel",
                "to": "Dusseldorf Airport",
                "type": "Shuttle",
                "cost": 3007
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
                        "description": "Explore Dusseldorf highlights",
                        "cost": 2460,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Germany dishes",
                        "cost": 1640,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2460,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2460,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 2,
                "title": "Deep Dive",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Dusseldorf highlights",
                        "cost": 2460,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Germany dishes",
                        "cost": 1640,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2460,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2460,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 3,
                "title": "Exploration & Farewell",
                "items": [
                    {
                        "time": "10:00",
                        "activity": "Morning exploration",
                        "description": "Explore Dusseldorf highlights",
                        "cost": 2460,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Germany dishes",
                        "cost": 1640,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2460,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2460,
                        "type": "food"
                    }
                ]
            },
            {
                "day": 4,
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
        "destinationId": "cologne",
        "name": "Cologne",
        "country": "Germany",
        "image": "https://images.unsplash.com/photo-1567186726-045c85e88847?w=800&q=80",
        "description": "Gothic cathedral city - Kölsch beer, carnival, and Roman history",
        "tags": [
            "Cathedral",
            "Beer",
            "History",
            "Carnival",
            "Culture",
            "River"
        ],
        "duration": "3 Days, 2 Nights",
        "costLevel": 2,
        "totalCost": 80000,
        "vibeVector": {
            "Culture": 0.8,
            "History": 0.8,
            "Social": 0.8,
            "River": 0.6,
            "Vibrant": 0.7,
            "Heritage": 0.8
        },
        "activityVector": {
            "History": 0.8,
            "Beer": 0.8,
            "Culture": 0.7,
            "Photography": 0.7,
            "Walking": 0.7,
            "Food": 0.6
        },
        "stayVector": {
            "City": 0.8,
            "Central": 0.7,
            "Budget": 0.6
        },
        "breakdown": {
            "flights": 33600,
            "stay": 20000,
            "activities": 17600,
            "transfers": 8800
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
                "cost": 16800
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
                "cost": 16800
            }
        ],
        "hotel": {
            "name": "Cologne Central Hotel",
            "rating": 4,
            "location": "City Centre, Cologne",
            "distanceToCenter": "0.3 km",
            "totalCost": 20000,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            "nights": 2
        },
        "transfers": [
            {
                "from": "Cologne Airport",
                "to": "Hotel",
                "type": "Shuttle",
                "cost": 2933
            },
            {
                "from": "Hotel",
                "to": "Cologne Airport",
                "type": "Shuttle",
                "cost": 2933
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
                        "description": "Explore Cologne highlights",
                        "cost": 2400,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Germany dishes",
                        "cost": 1600,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2400,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2400,
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
                        "description": "Explore Cologne highlights",
                        "cost": 2400,
                        "type": "activity"
                    },
                    {
                        "time": "13:00",
                        "activity": "Local cuisine lunch",
                        "description": "Traditional Germany dishes",
                        "cost": 1600,
                        "type": "food"
                    },
                    {
                        "time": "15:00",
                        "activity": "Afternoon activity",
                        "description": "Cultural experience",
                        "cost": 2400,
                        "type": "activity"
                    },
                    {
                        "time": "20:00",
                        "activity": "Evening dining",
                        "description": "Dinner at local restaurant",
                        "cost": 2400,
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
