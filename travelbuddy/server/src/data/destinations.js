// Auto-fixed names
module.exports = [
  {
    destinationId: 'tromsø',
    name: 'Tromsø',
    country: 'Norway',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    description: 'Gateway to the Arctic - chase the aurora borealis',
    tags: [
      'Northern Lights',
      'Arctic',
      'Nature',
      'Photography',
      'Winter',
      'Remote',
      'Snowy'
    ],
    duration: '5 Days, 4 Nights',
    costLevel: 3,
    totalCost: 125000,
    vibeVector: {
      Nature: 0.9,
      Cold: 0.8,
      Magical: 0.9,
      Scenic: 0.7,
      Adventure: 0.5,
      Quiet: 0.6,
      Remote: 0.8,
      Winter: 0.9,
      Photography: 0.7,
      Snowy: 0.8
    },
    activityVector: {
      Hiking: 0.7,
      Wildlife: 0.9,
      Photography: 0.8,
      Culture: 0.4,
      Nature: 0.8,
      Food: 0.5,
      Outdoors: 0.7,
      Safari: 0.3
    },
    stayVector: { Cozy: 0.8, Boutique: 0.5, Eco: 0.4, Nature: 0.3, Quiet: 0.6 },
    breakdown: { flights: 52000, stay: 36000, activities: 28000, transfers: 9000 },
    flights: [
      {
        type: 'departure',
        airline: 'Norwegian Air',
        flightNo: 'DY1502',
        from: 'DEL',
        to: 'TOS',
        departure: '23:30',
        arrival: '08:45 +1',
        duration: '12h 15m',
        cost: 26000
      },
      {
        type: 'return',
        airline: 'Norwegian Air',
        flightNo: 'DY1503',
        from: 'TOS',
        to: 'DEL',
        departure: '10:00',
        arrival: '00:30 +1',
        duration: '11h 30m',
        cost: 26000
      }
    ],
    hotel: {
      name: 'Clarion Hotel The Edge',
      rating: 4,
      location: 'City Centre, Tromsø',
      distanceToCenter: '0.3 km',
      totalCost: 36000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 4
    },
    transfers: [
      {
        from: 'Tromsø Airport',
        to: 'Hotel',
        type: 'Airport Shuttle',
        cost: 2500
      },
      {
        from: 'Hotel',
        to: 'Northern Lights Camp',
        type: 'Tour Bus',
        cost: 3500
      },
      {
        from: 'Hotel',
        to: 'Airport',
        type: 'Airport Shuttle',
        cost: 3000
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Arctic Welcome',
        items: [
          {
            time: '09:00',
            activity: 'Arrive at Tromsø Airport',
            description: 'Transfer to hotel',
            cost: 0,
            type: 'travel'
          },
          {
            time: '12:00',
            activity: 'Arctic Cathedral Visit',
            description: 'Iconic triangular church',
            cost: 800,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Lunch at Fiskekompaniet',
            description: 'Fresh Arctic seafood',
            cost: 3500,
            type: 'food'
          },
          {
            time: '19:00',
            activity: 'Northern Lights Chase',
            description: 'Guided minibus tour',
            cost: 8000,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Fjord Expedition',
        items: [
          {
            time: '08:30',
            activity: 'Breakfast at hotel',
            description: 'Continental breakfast',
            cost: 0,
            type: 'food'
          },
          {
            time: '10:00',
            activity: 'Fjord Cruise',
            description: '4-hour scenic cruise',
            cost: 6000,
            type: 'activity'
          },
          {
            time: '15:00',
            activity: 'Polaria Aquarium',
            description: 'Arctic wildlife exhibit',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Dinner at Hildr',
            description: 'Nordic gastronomy',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Husky & Wilderness Day',
        items: [
          {
            time: '09:00',
            activity: 'Husky Sledding',
            description: '3-hour husky adventure',
            cost: 9000,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Sami Culture Experience',
            description: 'Reindeer herding & lunch',
            cost: 5000,
            type: 'activity'
          },
          {
            time: '18:00',
            activity: 'Free evening in city',
            description: 'Explore local bars',
            cost: 2000,
            type: 'relax'
          }
        ]
      },
      {
        day: 4,
        title: 'Arctic Exploration',
        items: [
          {
            time: '09:00',
            activity: 'Tromsø Cable Car',
            description: 'Panoramic views',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Lunch at Risø',
            description: 'Local café fare',
            cost: 2000,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Arctic-Alpine Botanic Garden',
            description: "World's northernmost garden",
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Fine dining with views',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 5,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Breakfast & Checkout',
            description: 'Pack & checkout',
            cost: 0,
            type: 'travel'
          },
          {
            time: '09:00',
            activity: 'Transfer to Airport',
            description: 'Shuttle to TOS',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:00',
            activity: 'Departure Flight',
            description: 'TOS → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'reykjavik',
    name: 'Reykjavik',
    country: 'Iceland',
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80',
    description: 'Fire and ice - geysers, glaciers, and volcanic landscapes',
    tags: [
      'Glaciers',
      'Hot Springs',
      'Adventure',
      'Nature',
      'Photography',
      'Remote',
      'Volcanic',
      'Snowy'
    ],
    duration: '6 Days, 5 Nights',
    costLevel: 3,
    totalCost: 145000,
    vibeVector: {
      Nature: 0.9,
      Adventure: 0.8,
      Scenic: 0.9,
      Cold: 0.7,
      Thrill: 0.5,
      Remote: 0.7,
      Photography: 0.6,
      Volcanic: 0.8,
      Snowy: 0.8
    },
    activityVector: {
      Hiking: 0.9,
      Adventure: 0.8,
      Photography: 0.8,
      Spa: 0.6,
      Food: 0.4,
      Outdoors: 0.8,
      Nature: 0.7,
      Active: 0.6
    },
    stayVector: { Boutique: 0.6, Cozy: 0.5, Eco: 0.5, Nature: 0.4 },
    breakdown: {
      flights: 58000,
      stay: 42000,
      activities: 35000,
      transfers: 10000
    },
    flights: [
      {
        type: 'departure',
        airline: 'Icelandair',
        flightNo: 'FI455',
        from: 'DEL',
        to: 'KEF',
        departure: '22:00',
        arrival: '06:30 +1',
        duration: '13h 30m',
        cost: 29000
      },
      {
        type: 'return',
        airline: 'Icelandair',
        flightNo: 'FI456',
        from: 'KEF',
        to: 'DEL',
        departure: '11:00',
        arrival: '02:00 +1',
        duration: '12h',
        cost: 29000
      }
    ],
    hotel: {
      name: 'Fosshotel Reykjavik',
      rating: 4,
      location: 'Downtown Reykjavik',
      distanceToCenter: '0.5 km',
      totalCost: 42000,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
      nights: 5
    },
    transfers: [
      {
        from: 'Keflavik Airport',
        to: 'Hotel',
        type: 'Flybus',
        cost: 3000
      },
      {
        from: 'Hotel',
        to: 'Golden Circle',
        type: 'Tour Bus',
        cost: 4000
      },
      { from: 'Hotel', to: 'Airport', type: 'Flybus', cost: 3000 }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & City Walk',
        items: [
          {
            time: '07:00',
            activity: 'Land at Keflavik',
            description: 'Flybus to city',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Hallgrímskirkja Church',
            description: 'Iconic landmark',
            cost: 500,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Lunch at Grillið',
            description: 'Icelandic cuisine',
            cost: 4000,
            type: 'food'
          },
          {
            time: '18:00',
            activity: 'Harpa Concert Hall',
            description: 'Glass architecture',
            cost: 0,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Golden Circle',
        items: [
          {
            time: '08:00',
            activity: 'Þingvellir National Park',
            description: 'Tectonic rift',
            cost: 0,
            type: 'activity'
          },
          {
            time: '11:00',
            activity: 'Geysir Geothermal Area',
            description: 'Strokkur eruption',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Gullfoss Waterfall',
            description: 'Golden waterfall',
            cost: 0,
            type: 'activity'
          },
          {
            time: '18:00',
            activity: 'Secret Lagoon',
            description: 'Natural hot spring',
            cost: 3500,
            type: 'relax'
          }
        ]
      },
      {
        day: 3,
        title: 'South Coast',
        items: [
          {
            time: '08:00',
            activity: 'Seljalandsfoss',
            description: 'Walk behind the waterfall',
            cost: 0,
            type: 'activity'
          },
          {
            time: '11:00',
            activity: 'Skógafoss Waterfall',
            description: '60m cascade',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Black Sand Beach',
            description: 'Reynisfjara',
            cost: 0,
            type: 'activity'
          },
          {
            time: '18:00',
            activity: 'Dinner in Vík',
            description: 'Village restaurant',
            cost: 3500,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Glacier & Ice',
        items: [
          {
            time: '08:00',
            activity: 'Glacier Walk',
            description: 'Sólheimajökull hike',
            cost: 8000,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Jökulsárlón Lagoon',
            description: 'Icebergs floating',
            cost: 0,
            type: 'activity'
          },
          {
            time: '16:00',
            activity: 'Diamond Beach',
            description: 'Ice on black sand',
            cost: 0,
            type: 'activity'
          }
        ]
      },
      {
        day: 5,
        title: 'Blue Lagoon & Relax',
        items: [
          {
            time: '10:00',
            activity: 'Blue Lagoon',
            description: 'Geothermal spa',
            cost: 8000,
            type: 'relax'
          },
          {
            time: '15:00',
            activity: 'Reykjavik Shopping',
            description: 'Laugavegur street',
            cost: 3000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Fine dining',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 6,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout & Transfer',
            description: 'Flybus to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'KEF → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'tallinn',
    name: 'Tallinn',
    country: 'Estonia',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80',
    description: 'Fairy-tale medieval city with vibrant modern culture',
    tags: [
      'Medieval',
      'Baltic',
      'Culture',
      'History',
      'City',
      'Heritage',
      'Historic City',
      'Metropolis'
    ],
    duration: '4 Days, 3 Nights',
    costLevel: 1,
    totalCost: 72000,
    vibeVector: {
      Culture: 0.9,
      History: 0.8,
      Heritage: 0.8,
      City: 0.6,
      Art: 0.5,
      Peaceful: 0.4,
      Urban: 0.5,
      'Historic City': 0.8,
      Metropolis: 0.8
    },
    activityVector: {
      Heritage: 0.9,
      Culture: 0.8,
      History: 0.7,
      Food: 0.6,
      Art: 0.5,
      Photography: 0.5,
      Local: 0.4
    },
    stayVector: { Boutique: 0.6, City: 0.8, Budget: 0.6, Historic: 0.7 },
    breakdown: { flights: 32000, stay: 18000, activities: 15000, transfers: 7000 },
    flights: [
      {
        type: 'departure',
        airline: 'Turkish Airlines',
        flightNo: 'TK718',
        from: 'DEL',
        to: 'TLL',
        departure: '03:00',
        arrival: '12:45',
        duration: '12h 45m',
        cost: 16000
      },
      {
        type: 'return',
        airline: 'Turkish Airlines',
        flightNo: 'TK719',
        from: 'TLL',
        to: 'DEL',
        departure: '13:30',
        arrival: '01:15 +1',
        duration: '11h 45m',
        cost: 16000
      }
    ],
    hotel: {
      name: 'Hotel Telegraaf',
      rating: 5,
      location: 'Old Town, Tallinn',
      distanceToCenter: '0.1 km',
      totalCost: 18000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Tallinn Airport',
        to: 'Hotel',
        type: 'Taxi',
        cost: 2500
      },
      { from: 'Hotel', to: 'Airport', type: 'Taxi', cost: 2500 },
      { from: 'Hotel', to: 'Pirita Beach', type: 'Bus', cost: 2000 }
    ],
    days: [
      {
        day: 1,
        title: 'Old Town Discovery',
        items: [
          {
            time: '13:00',
            activity: 'Arrive & Check In',
            description: 'Settle in',
            cost: 0,
            type: 'travel'
          },
          {
            time: '15:00',
            activity: 'Toompea Castle',
            description: 'Medieval fortress',
            cost: 500,
            type: 'activity'
          },
          {
            time: '18:00',
            activity: 'Town Hall Square',
            description: 'Gothic town hall',
            cost: 2000,
            type: 'food'
          },
          {
            time: '20:00',
            activity: 'Old Town bars',
            description: 'Medieval-themed pubs',
            cost: 2500,
            type: 'relax'
          }
        ]
      },
      {
        day: 2,
        title: 'Culture & Coast',
        items: [
          {
            time: '09:00',
            activity: 'Kadriorg Palace',
            description: 'Baroque palace & art',
            cost: 800,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Lunch at Rataskaevu 16',
            description: 'Estonian cuisine',
            cost: 2000,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Pirita Beach',
            description: 'Beach & monastery ruins',
            cost: 0,
            type: 'relax'
          },
          {
            time: '19:00',
            activity: 'Telliskivi Creative City',
            description: 'Street food & art',
            cost: 2500,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Markets & Medieval',
        items: [
          {
            time: '09:00',
            activity: 'Balti Jaam Market',
            description: 'Local food market',
            cost: 1500,
            type: 'food'
          },
          {
            time: '12:00',
            activity: 'Estonian Open Air Museum',
            description: 'Traditional village',
            cost: 1000,
            type: 'activity'
          },
          {
            time: '16:00',
            activity: 'Souvenir Shopping',
            description: 'Estonian crafts',
            cost: 2000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Rooftop dining',
            cost: 3500,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '09:00',
            activity: 'Checkout & Transfer',
            description: 'Taxi to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '13:30',
            activity: 'Departure Flight',
            description: 'TLL → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'bergen',
    name: 'Bergen',
    country: 'Norway',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'Gateway to the fjords - colorful Bryggen waterfront',
    tags: [
      'Fjords',
      'Scenic',
      'Nature',
      'Hiking',
      'Photography',
      'Peaceful'
    ],
    duration: '5 Days, 4 Nights',
    costLevel: 2,
    totalCost: 110000,
    vibeVector: {
      Scenic: 0.9,
      Nature: 0.8,
      Peaceful: 0.7,
      Mountains: 0.5,
      Culture: 0.4,
      Photography: 0.6,
      Quiet: 0.6
    },
    activityVector: {
      Hiking: 0.9,
      Photography: 0.7,
      Food: 0.5,
      Culture: 0.4,
      Nature: 0.8,
      Outdoors: 0.7,
      Cycling: 0.3
    },
    stayVector: { Cozy: 0.8, Scenic: 0.9, Boutique: 0.4, Eco: 0.5, Quiet: 0.6 },
    breakdown: { flights: 45000, stay: 32000, activities: 24000, transfers: 9000 },
    flights: [
      {
        type: 'departure',
        airline: 'SAS',
        flightNo: 'SK2867',
        from: 'DEL',
        to: 'BGO',
        departure: '21:00',
        arrival: '07:30 +1',
        duration: '11h 30m',
        cost: 22500
      },
      {
        type: 'return',
        airline: 'SAS',
        flightNo: 'SK2868',
        from: 'BGO',
        to: 'DEL',
        departure: '09:00',
        arrival: '22:30',
        duration: '11h 30m',
        cost: 22500
      }
    ],
    hotel: {
      name: 'Hotel Havnekontoret',
      rating: 4,
      location: 'Bryggen, Bergen',
      distanceToCenter: '0.2 km',
      totalCost: 32000,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
      nights: 4
    },
    transfers: [
      {
        from: 'Bergen Airport',
        to: 'Hotel',
        type: 'Airport Bus',
        cost: 2500
      },
      { from: 'Hotel', to: 'Flåm', type: 'Train', cost: 4000 },
      { from: 'Hotel', to: 'Airport', type: 'Airport Bus', cost: 2500 }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Bryggen',
        items: [
          {
            time: '08:00',
            activity: 'Arrive Bergen',
            description: 'Bus to Bryggen',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Bryggen Wharf Walk',
            description: 'UNESCO Hanseatic wharf',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Fish Market Lunch',
            description: 'Fresh seafood',
            cost: 3000,
            type: 'food'
          },
          {
            time: '17:00',
            activity: 'Fløibanen Funicular',
            description: 'Panoramic city views',
            cost: 1500,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Fjord Day Trip',
        items: [
          {
            time: '07:00',
            activity: 'Norway in a Nutshell',
            description: 'Scenic train to Flåm',
            cost: 8000,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Fjord Cruise',
            description: 'Nærøyfjord cruise',
            cost: 4000,
            type: 'activity'
          },
          {
            time: '18:00',
            activity: 'Dinner at Enhjørningen',
            description: 'Traditional Norwegian',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Nature & Hikes',
        items: [
          {
            time: '09:00',
            activity: 'Mount Ulriken Hike',
            description: "Bergen's highest peak",
            cost: 0,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Lunch at Cornelius',
            description: 'Seafood on an island',
            cost: 3500,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Troldhaugen Museum',
            description: 'Grieg composer home',
            cost: 1000,
            type: 'activity'
          }
        ]
      },
      {
        day: 4,
        title: 'Culture & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'KODE Art Museum',
            description: 'Norwegian art collection',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Tyskebryggen Lunch',
            description: 'Cozy harbour café',
            cost: 2500,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Old Bergen Museum',
            description: 'Open-air wooden houses',
            cost: 1000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Fine Norwegian dining',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 5,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Pack & checkout',
            cost: 0,
            type: 'travel'
          },
          {
            time: '09:00',
            activity: 'Departure Flight',
            description: 'BGO → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'helsinki',
    name: 'Helsinki',
    country: 'Finland',
    image: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=800&q=80',
    description: 'Sleek Nordic design capital with sauna culture',
    tags: [
      'Design',
      'Sauna',
      'Nordic',
      'City',
      'Wellness',
      'Art',
      'Metropolis'
    ],
    duration: '4 Days, 3 Nights',
    costLevel: 2,
    totalCost: 95000,
    vibeVector: {
      City: 0.7,
      Culture: 0.7,
      Relax: 0.6,
      Spa: 0.5,
      Wellness: 0.5,
      Art: 0.4,
      Urban: 0.6,
      Trendy: 0.5,
      Metropolis: 0.8
    },
    activityVector: {
      Spa: 0.8,
      Culture: 0.6,
      Art: 0.5,
      Food: 0.6,
      Shopping: 0.4,
      Photography: 0.4,
      Wellness: 0.7
    },
    stayVector: { City: 0.8, Spa: 0.7, Boutique: 0.6, Luxury: 0.4 },
    breakdown: { flights: 38000, stay: 27000, activities: 22000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'Finnair',
        flightNo: 'AY122',
        from: 'DEL',
        to: 'HEL',
        departure: '02:00',
        arrival: '10:30',
        duration: '8h 30m',
        cost: 19000
      },
      {
        type: 'return',
        airline: 'Finnair',
        flightNo: 'AY121',
        from: 'HEL',
        to: 'DEL',
        departure: '23:00',
        arrival: '10:00 +1',
        duration: '8h',
        cost: 19000
      }
    ],
    hotel: {
      name: 'Hotel St. George',
      rating: 5,
      location: 'Central Helsinki',
      distanceToCenter: '0.3 km',
      totalCost: 27000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Helsinki Airport',
        to: 'Hotel',
        type: 'Airport Train',
        cost: 2500
      },
      { from: 'Hotel', to: 'Suomenlinna', type: 'Ferry', cost: 3000 },
      {
        from: 'Hotel',
        to: 'Airport',
        type: 'Airport Train',
        cost: 2500
      }
    ],
    days: [
      {
        day: 1,
        title: 'Design District',
        items: [
          {
            time: '11:00',
            activity: 'Arrive Helsinki',
            description: 'Train to city',
            cost: 0,
            type: 'travel'
          },
          {
            time: '13:00',
            activity: 'Design District Walk',
            description: 'Boutiques & galleries',
            cost: 0,
            type: 'activity'
          },
          {
            time: '16:00',
            activity: 'Amos Rex Museum',
            description: 'Modern art underground',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '19:00',
            activity: 'Dinner & Sauna',
            description: 'Löyly public sauna & dinner',
            cost: 4000,
            type: 'relax'
          }
        ]
      },
      {
        day: 2,
        title: 'Island & Culture',
        items: [
          {
            time: '09:00',
            activity: 'Suomenlinna Fortress',
            description: 'UNESCO island fortress',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Market Square Lunch',
            description: 'Harbour market food',
            cost: 2500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Temppeliaukio Church',
            description: 'Rock church',
            cost: 500,
            type: 'activity'
          },
          {
            time: '19:00',
            activity: 'Finnish dinner',
            description: 'Reindeer & salmon',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Nature & Farewell',
        items: [
          {
            time: '09:00',
            activity: 'Nuuksio National Park',
            description: 'Forest hike',
            cost: 2000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Lunch at Juuri',
            description: 'New Finnish cuisine',
            cost: 3000,
            type: 'food'
          },
          {
            time: '17:00',
            activity: 'Shopping at Marimekko',
            description: 'Finnish design',
            cost: 3000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Night Out',
            description: 'Helsinki nightlife',
            cost: 3500,
            type: 'relax'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Train to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '23:00',
            activity: 'Departure Flight',
            description: 'HEL → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    description: 'Iconic white-washed cliffs and Aegean sunsets',
    tags: [
      'Beach',   'Romance',
      'Sun',     'Scenic',
      'Warm',    'Coastal',
      'Beaches'
    ],
    duration: '5 Days, 4 Nights',
    costLevel: 2,
    totalCost: 115000,
    vibeVector: {
      Beach: 0.9,
      Sun: 0.9,
      Relax: 0.8,
      Scenic: 0.7,
      Romance: 0.8,
      Culture: 0.3,
      Warm: 0.9,
      Coastal: 0.8
    },
    activityVector: {
      Photography: 0.8,
      Food: 0.8,
      Wine: 0.6,
      Sailing: 0.5,
      Culture: 0.3,
      Gastronomy: 0.5
    },
    stayVector: {
      Boutique: 0.9,
      Luxury: 0.6,
      Scenic: 0.8,
      Romance: 0.9,
      Premium: 0.5
    },
    breakdown: {
      flights: 42000,
      stay: 38000,
      activities: 25000,
      transfers: 10000
    },
    flights: [
      {
        type: 'departure',
        airline: 'Aegean Airlines',
        flightNo: 'A3501',
        from: 'DEL',
        to: 'JTR',
        departure: '20:00',
        arrival: '05:00 +1',
        duration: '10h',
        cost: 21000
      },
      {
        type: 'return',
        airline: 'Aegean Airlines',
        flightNo: 'A3502',
        from: 'JTR',
        to: 'DEL',
        departure: '12:00',
        arrival: '23:30',
        duration: '10h 30m',
        cost: 21000
      }
    ],
    hotel: {
      name: 'Canaves Oia Suites',
      rating: 5,
      location: 'Oia, Santorini',
      distanceToCenter: '0.1 km',
      totalCost: 38000,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80',
      nights: 4
    },
    transfers: [
      {
        from: 'Santorini Airport',
        to: 'Hotel',
        type: 'Private Transfer',
        cost: 3500
      },
      {
        from: 'Hotel',
        to: 'Airport',
        type: 'Private Transfer',
        cost: 3500
      },
      { from: 'Hotel', to: 'Caldera Cruise', type: 'Bus', cost: 3000 }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Oia Sunset',
        items: [
          {
            time: '06:00',
            activity: 'Arrive Santorini',
            description: 'Transfer to Oia',
            cost: 0,
            type: 'travel'
          },
          {
            time: '12:00',
            activity: 'Oia Village Walk',
            description: 'White-washed lanes',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Lunch at Ammoudi Bay',
            description: 'Seafood by the sea',
            cost: 3500,
            type: 'food'
          },
          {
            time: '18:30',
            activity: 'Famous Oia Sunset',
            description: 'Castle sunset viewpoint',
            cost: 0,
            type: 'relax'
          }
        ]
      },
      {
        day: 2,
        title: 'Caldera & Wine',
        items: [
          {
            time: '09:00',
            activity: 'Caldera Catamaran Cruise',
            description: '5hr sailing, hot springs',
            cost: 8000,
            type: 'activity'
          },
          {
            time: '16:00',
            activity: 'Santo Wines Tasting',
            description: 'Volcanic wine tasting',
            cost: 2500,
            type: 'food'
          },
          {
            time: '20:00',
            activity: 'Dinner at Fira',
            description: 'Caldera-view dining',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Beach Day',
        items: [
          {
            time: '10:00',
            activity: 'Red Beach',
            description: 'Volcanic red cliffs',
            cost: 0,
            type: 'relax'
          },
          {
            time: '13:00',
            activity: 'Perissa Beach Lunch',
            description: 'Beach taverna',
            cost: 2500,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Akrotiri Ruins',
            description: 'Ancient Minoan city',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Rooftop Dinner',
            description: 'Oia fine dining',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Explore & Farewell',
        items: [
          {
            time: '09:00',
            activity: 'Fira to Oia Hike',
            description: '10km caldera trail',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Shopping in Fira',
            description: 'Souvenirs & jewelry',
            cost: 3000,
            type: 'activity'
          },
          {
            time: '19:00',
            activity: 'Farewell Sunset Dinner',
            description: 'Best of Greek cuisine',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 5,
        title: 'Departure',
        items: [
          {
            time: '09:00',
            activity: 'Checkout & Transfer',
            description: 'To airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '12:00',
            activity: 'Departure Flight',
            description: 'JTR → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'prague',
    name: 'Prague',
    country: 'Czech Republic',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80',
    description: 'Gothic spires, cobblestone streets, and world-class beer',
    tags: [
      'Culture',
      'History',
      'Nightlife',
      'City',
      'Art',
      'Heritage',
      'Green',
      'Historic City',
      'Metropolis'
    ],
    duration: '4 Days, 3 Nights',
    costLevel: 1,
    totalCost: 68000,
    vibeVector: {
      Culture: 0.9,
      History: 0.9,
      City: 0.7,
      Nightlife: 0.6,
      Art: 0.6,
      Heritage: 0.7,
      Urban: 0.6,
      Photography: 0.5,
      Green: 0.8
    },
    activityVector: {
      Heritage: 0.9,
      Culture: 0.8,
      History: 0.7,
      Night: 0.7,
      Food: 0.7,
      Music: 0.5,
      Photography: 0.5
    },
    stayVector: { Historic: 0.7, City: 0.8, Boutique: 0.5, Cozy: 0.4, Budget: 0.6 },
    breakdown: { flights: 28000, stay: 16000, activities: 17000, transfers: 7000 },
    flights: [
      {
        type: 'departure',
        airline: 'Czech Airlines',
        flightNo: 'OK765',
        from: 'DEL',
        to: 'PRG',
        departure: '01:00',
        arrival: '08:00',
        duration: '9h',
        cost: 14000
      },
      {
        type: 'return',
        airline: 'Czech Airlines',
        flightNo: 'OK766',
        from: 'PRG',
        to: 'DEL',
        departure: '10:00',
        arrival: '22:30',
        duration: '9h 30m',
        cost: 14000
      }
    ],
    hotel: {
      name: 'Hotel Josef',
      rating: 4,
      location: 'Old Town, Prague',
      distanceToCenter: '0.2 km',
      totalCost: 16000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Prague Airport',
        to: 'Hotel',
        type: 'Airport Express',
        cost: 2500
      },
      {
        from: 'Hotel',
        to: 'Airport',
        type: 'Airport Express',
        cost: 2500
      },
      { from: 'Hotel', to: 'Prague Castle', type: 'Tram', cost: 2000 }
    ],
    days: [
      {
        day: 1,
        title: 'Old Town Discovery',
        items: [
          {
            time: '09:00',
            activity: 'Arrive Prague',
            description: 'Bus to Old Town',
            cost: 0,
            type: 'travel'
          },
          {
            time: '12:00',
            activity: 'Old Town Square',
            description: 'Astronomical Clock',
            cost: 500,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Czech Lunch',
            description: 'Svíčková & beer',
            cost: 1500,
            type: 'food'
          },
          {
            time: '17:00',
            activity: 'Charles Bridge Walk',
            description: 'Iconic gothic bridge',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Beer Hall Night',
            description: 'Czech craft beer',
            cost: 2000,
            type: 'relax'
          }
        ]
      },
      {
        day: 2,
        title: 'Castle & Jewish Quarter',
        items: [
          {
            time: '09:00',
            activity: 'Prague Castle',
            description: 'Largest ancient castle',
            cost: 2500,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Malá Strana Lunch',
            description: 'Charming quarter',
            cost: 2000,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Jewish Quarter',
            description: 'Historic synagogues',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Jazz Club Night',
            description: 'Live jazz scene',
            cost: 2500,
            type: 'relax'
          }
        ]
      },
      {
        day: 3,
        title: 'Art & Markets',
        items: [
          {
            time: '10:00',
            activity: 'DOX Contemporary Art',
            description: 'Modern art center',
            cost: 1000,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Naplavka Market',
            description: 'Riverside food market',
            cost: 2000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Petřín Hill',
            description: 'Gardens & mini Eiffel',
            cost: 1000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Rooftop restaurant',
            cost: 3500,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Express to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:00',
            activity: 'Departure Flight',
            description: 'PRG → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'istanbul',
    name: 'Istanbul',
    country: 'Turkey',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
    description: 'Where East meets West - mosques, bazaars, and Bosphorus',
    tags: [
      'Culture',
      'History',
      'Food',
      'Gastronomy',
      'Heritage',
      'Shopping',
      'Historic City',
      'Metropolis'
    ],
    duration: '5 Days, 4 Nights',
    costLevel: 1,
    totalCost: 78000,
    vibeVector: {
      Culture: 0.9,
      History: 0.9,
      Food: 0.8,
      Gastronomy: 0.7,
      Heritage: 0.8,
      Shopping: 0.5,
      City: 0.5,
      Social: 0.4
    },
    activityVector: {
      Food: 0.9,
      Culture: 0.8,
      Shopping: 0.7,
      History: 0.7,
      Heritage: 0.6,
      Art: 0.5,
      Spa: 0.4,
      Local: 0.5
    },
    stayVector: { Boutique: 0.8, City: 0.7, Historic: 0.6, Luxury: 0.5 },
    breakdown: { flights: 30000, stay: 20000, activities: 20000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'Turkish Airlines',
        flightNo: 'TK720',
        from: 'DEL',
        to: 'IST',
        departure: '03:00',
        arrival: '08:00',
        duration: '7h',
        cost: 15000
      },
      {
        type: 'return',
        airline: 'Turkish Airlines',
        flightNo: 'TK721',
        from: 'IST',
        to: 'DEL',
        departure: '23:00',
        arrival: '08:00 +1',
        duration: '7h',
        cost: 15000
      }
    ],
    hotel: {
      name: 'Sura Hagia Sophia Hotel',
      rating: 5,
      location: 'Sultanahmet, Istanbul',
      distanceToCenter: '0.1 km',
      totalCost: 20000,
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80',
      nights: 4
    },
    transfers: [
      {
        from: 'Istanbul Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2500
      },
      { from: 'Hotel', to: 'Airport', type: 'Shuttle', cost: 2500 },
      {
        from: 'Hotel',
        to: 'Bosphorus Cruise',
        type: 'Taxi',
        cost: 3000
      }
    ],
    days: [
      {
        day: 1,
        title: 'Sultanahmet Arrival',
        items: [
          {
            time: '09:00',
            activity: 'Arrive Istanbul',
            description: 'Shuttle to hotel',
            cost: 0,
            type: 'travel'
          },
          {
            time: '12:00',
            activity: 'Hagia Sophia',
            description: 'Byzantine marvel',
            cost: 2500,
            type: 'activity'
          },
          {
            time: '15:00',
            activity: 'Blue Mosque',
            description: 'Iconic 6-minaret mosque',
            cost: 0,
            type: 'activity'
          },
          {
            time: '18:00',
            activity: 'Turkish Dinner',
            description: 'Kebabs & mezze',
            cost: 2500,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Grand Bazaar & Spices',
        items: [
          {
            time: '09:00',
            activity: 'Grand Bazaar',
            description: '4000+ shops',
            cost: 3000,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Spice Bazaar Lunch',
            description: 'Street food tour',
            cost: 2000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Basilica Cistern',
            description: 'Underground palace',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '19:00',
            activity: 'Rooftop Dinner',
            description: 'Bosphorus views',
            cost: 3500,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Bosphorus Day',
        items: [
          {
            time: '09:00',
            activity: 'Bosphorus Cruise',
            description: '3hr cruise',
            cost: 4000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Lunch in Ortaköy',
            description: 'Kumpir & waffles',
            cost: 1500,
            type: 'food'
          },
          {
            time: '17:00',
            activity: 'Dolmabahçe Palace',
            description: 'Ottoman palace',
            cost: 2000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Turkish Night Show',
            description: 'Whirling dervishes',
            cost: 3000,
            type: 'relax'
          }
        ]
      },
      {
        day: 4,
        title: 'Asian Side & Hamam',
        items: [
          {
            time: '09:00',
            activity: 'Kadıköy Market',
            description: 'Asian side food market',
            cost: 2000,
            type: 'food'
          },
          {
            time: '13:00',
            activity: 'Çamlıca Hill',
            description: 'Panoramic city views',
            cost: 0,
            type: 'activity'
          },
          {
            time: '16:00',
            activity: 'Traditional Hamam',
            description: 'Turkish bath experience',
            cost: 3000,
            type: 'relax'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Ottoman cuisine',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 5,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Shuttle to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '23:00',
            activity: 'Departure Flight',
            description: 'IST → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
    description: "Canals, culture, and cycling - Amsterdam is Europe's most charming and free-spirited capital",
    tags: [
      'Canals',
      'Museums',
      'Culture',
      'Cycling',
      'Nightlife',
      'Cosmopolitan',
      'Metropolis'
    ],
    duration: '5 Days, 4 Nights',
    costLevel: 2,
    totalCost: 110000,
    vibeVector: {
      Culture: 0.9,
      Urban: 0.8,
      Vibrant: 0.8,
      Romantic: 0.6,
      Scenic: 0.7,
      Cosmopolitan: 0.9,
      Artistic: 0.8,
      Metropolis: 0.8
    },
    activityVector: {
      Museums: 0.9,
      Culture: 0.8,
      Food: 0.7,
      Nightlife: 0.8,
      Photography: 0.7,
      Architecture: 0.8,
      Shopping: 0.6
    },
    stayVector: { Boutique: 0.7, Urban: 0.8, Stylish: 0.7, Central: 0.9 },
    breakdown: { flights: 45000, stay: 35000, activities: 22000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'KLM',
        flightNo: 'KL871',
        from: 'DEL',
        to: 'AMS',
        departure: '23:55',
        arrival: '06:30 +1',
        duration: '10h 35m',
        cost: 22500
      },
      {
        type: 'return',
        airline: 'KLM',
        flightNo: 'KL872',
        from: 'AMS',
        to: 'DEL',
        departure: '10:10',
        arrival: '23:30',
        duration: '9h 20m',
        cost: 22500
      }
    ],
    hotel: {
      name: 'NH Collection Amsterdam',
      rating: 4,
      location: 'City Centre',
      distanceToCenter: '0.2 km',
      totalCost: 35000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 4
    },
    transfers: [
      {
        from: 'Schiphol Airport',
        to: 'Hotel',
        type: 'Train',
        cost: 800
      },
      { from: 'Hotel', to: 'Keukenhof', type: 'Tour Bus', cost: 3500 },
      { from: 'Hotel', to: 'Airport', type: 'Train', cost: 800 }
    ],
    days: [
      {
        day: 1,
        title: 'Canals & Old Masters',
        items: [
          {
            time: '09:00',
            activity: 'Rijksmuseum',
            description: 'Dutch Golden Age masterpieces',
            cost: 2200,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Lunch at Foodhallen',
            description: "Amsterdam's indoor food market",
            cost: 2500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Anne Frank House',
            description: 'Historic WWII site',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '19:00',
            activity: 'Canal boat tour',
            description: 'Evening canal cruise',
            cost: 2000,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Art & Cycling',
        items: [
          {
            time: '10:00',
            activity: 'Van Gogh Museum',
            description: 'Largest Van Gogh collection',
            cost: 2500,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Vondelpark cycling',
            description: 'Rent a bike through the park',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '19:00',
            activity: 'Dinner at BREDA',
            description: 'Modern Dutch cuisine',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Keukenhof & Markets',
        items: [
          {
            time: '09:00',
            activity: 'Keukenhof Tulip Gardens',
            description: '7 million flowers in bloom',
            cost: 2000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Albert Cuyp Market',
            description: "Amsterdam's largest street market",
            cost: 1500,
            type: 'shopping'
          },
          {
            time: '20:00',
            activity: 'Leidseplein Nightlife',
            description: 'Bars and clubs',
            cost: 3000,
            type: 'activity'
          }
        ]
      },
      {
        day: 4,
        title: 'Day at Your Pace',
        items: [
          {
            time: '10:00',
            activity: 'NEMO Science Museum',
            description: 'Interactive science exhibits',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Lunch at De Hallen',
            description: 'Trendy neighbourhood lunch',
            cost: 2000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Jordaan District Walk',
            description: "Amsterdam's most charming neighbourhood",
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell dinner',
            description: 'Indonesian Rijsttafel experience',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 5,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout & Airport',
            description: 'Train to Schiphol',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:10',
            activity: 'Departure Flight',
            description: 'AMS → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'vienna',
    name: 'Vienna',
    country: 'Austria',
    image: 'https://images.unsplash.com/photo-1495562569060-2eec283d3391?w=800&q=80',
    description: 'Imperial palaces, classical music, and the finest coffee houses in the world',
    tags: [
      'Imperial',
      'Classical Music',
      'Culture',
      'Coffee Houses',
      'Art',
      'Architecture'
    ],
    duration: '5 Days, 4 Nights',
    costLevel: 2,
    totalCost: 105000,
    vibeVector: {
      Culture: 0.9,
      Elegant: 0.9,
      Romantic: 0.7,
      Historic: 0.9,
      Scenic: 0.6,
      Artistic: 0.8,
      Royal: 0.8
    },
    activityVector: {
      Museums: 0.9,
      Culture: 0.9,
      Music: 0.8,
      Food: 0.7,
      Architecture: 0.9,
      Art: 0.8,
      History: 0.9
    },
    stayVector: { Boutique: 0.6, Luxury: 0.7, Historic: 0.8, Elegant: 0.9 },
    breakdown: { flights: 44000, stay: 32000, activities: 20000, transfers: 9000 },
    flights: [
      {
        type: 'departure',
        airline: 'Austrian Airlines',
        flightNo: 'OS069',
        from: 'DEL',
        to: 'VIE',
        departure: '13:45',
        arrival: '17:30',
        duration: '10h 45m',
        cost: 22000
      },
      {
        type: 'return',
        airline: 'Austrian Airlines',
        flightNo: 'OS070',
        from: 'VIE',
        to: 'DEL',
        departure: '19:00',
        arrival: '06:00 +1',
        duration: '10h',
        cost: 22000
      }
    ],
    hotel: {
      name: 'Hotel Sacher Vienna',
      rating: 5,
      location: 'Vienna 1st District',
      distanceToCenter: '0.1 km',
      totalCost: 32000,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
      nights: 4
    },
    transfers: [
      {
        from: 'Vienna Airport',
        to: 'Hotel',
        type: 'CAT Train',
        cost: 1800
      },
      { from: 'Hotel', to: 'Schonbrunn', type: 'Metro', cost: 500 },
      { from: 'Hotel', to: 'Airport', type: 'CAT Train', cost: 1800 }
    ],
    days: [
      {
        day: 1,
        title: 'Imperial Vienna',
        items: [
          {
            time: '10:00',
            activity: 'Schonbrunn Palace',
            description: 'Habsburg summer residence',
            cost: 2800,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Cafe Sacher',
            description: 'Original Sachertorte',
            cost: 1500,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Belvedere Palace',
            description: "Klimt's The Kiss",
            cost: 2200,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Vienna State Opera',
            description: 'Classical performance',
            cost: 5000,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Museums & Music',
        items: [
          {
            time: '10:00',
            activity: 'Kunsthistorisches Museum',
            description: 'Art History Museum',
            cost: 2500,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Naschmarkt',
            description: "Vienna's famous open market",
            cost: 2000,
            type: 'food'
          },
          {
            time: '18:00',
            activity: 'Concert at Musikverein',
            description: 'Classical concert hall',
            cost: 4000,
            type: 'activity'
          }
        ]
      },
      {
        day: 3,
        title: 'Coffee Houses & Architecture',
        items: [
          {
            time: '09:00',
            activity: 'Cafe Central',
            description: 'Historic grand coffee house',
            cost: 1200,
            type: 'food'
          },
          {
            time: '11:00',
            activity: 'Stephansdom Cathedral',
            description: 'Gothic masterpiece',
            cost: 800,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Haas Haus & Graben Walk',
            description: 'Modern architecture meets history',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Heuriger Winery Dinner',
            description: 'Garden wine tavern dinner',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Habsburg Treasures',
        items: [
          {
            time: '10:00',
            activity: 'Hofburg Palace',
            description: 'Imperial Apartments tour',
            cost: 2200,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Burggarten Lunch',
            description: 'Picnic in the palace garden',
            cost: 1500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Spanish Riding School',
            description: 'Lipizzaner stallions',
            cost: 3500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Viennese Wiener schnitzel',
            cost: 3500,
            type: 'food'
          }
        ]
      },
      {
        day: 5,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'CAT Train to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '19:00',
            activity: 'Departure Flight',
            description: 'VIE → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'budapest',
    name: 'Budapest',
    country: 'Hungary',
    image: 'https://images.unsplash.com/photo-1558005137-d9619a5c539f?w=800&q=80',
    description: 'The Pearl of the Danube - thermal baths, ruin bars, and stunning river views',
    tags: [
      'Thermal Baths',
      'Architecture',
      'Nightlife',
      'Culture',
      'River',
      'Budget-Friendly',
      'Historic City',
      'Metropolis'
    ],
    duration: '4 Days, 3 Nights',
    costLevel: 1,
    totalCost: 80000,
    vibeVector: {
      Culture: 0.8,
      Urban: 0.7,
      Vibrant: 0.8,
      Romantic: 0.8,
      Historic: 0.8,
      Scenic: 0.9,
      Nightlife: 0.8,
      'Historic City': 0.8
    },
    activityVector: {
      Spa: 0.9,
      Culture: 0.8,
      Nightlife: 0.9,
      Architecture: 0.9,
      Food: 0.7,
      History: 0.8,
      Relaxation: 0.7
    },
    stayVector: { Boutique: 0.7, Urban: 0.8, Budget: 0.6, Central: 0.9 },
    breakdown: { flights: 35000, stay: 22000, activities: 15000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'Wizz Air',
        flightNo: 'W63201',
        from: 'DEL',
        to: 'BUD',
        departure: '14:00',
        arrival: '18:30',
        duration: '9h 30m',
        cost: 17500
      },
      {
        type: 'return',
        airline: 'Wizz Air',
        flightNo: 'W63202',
        from: 'BUD',
        to: 'DEL',
        departure: '20:00',
        arrival: '08:30 +1',
        duration: '9h 30m',
        cost: 17500
      }
    ],
    hotel: {
      name: 'New York Palace Budapest',
      rating: 5,
      location: 'Budapest VII',
      distanceToCenter: '0.8 km',
      totalCost: 22000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Budapest Airport',
        to: 'Hotel',
        type: 'Airport Shuttle',
        cost: 1200
      },
      {
        from: 'Hotel',
        to: 'Szechenyi Baths',
        type: 'Metro',
        cost: 400
      },
      {
        from: 'Hotel',
        to: 'Airport',
        type: 'Airport Shuttle',
        cost: 1200
      }
    ],
    days: [
      {
        day: 1,
        title: 'Buda Castle & Thermal Baths',
        items: [
          {
            time: '10:00',
            activity: 'Buda Castle',
            description: 'UNESCO-listed historic castle',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: "Fisherman's Bastion Lunch",
            description: 'Panoramic Danube views',
            cost: 3000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Szechenyi Thermal Bath',
            description: 'Historic outdoor thermal pools',
            cost: 2500,
            type: 'relax'
          },
          {
            time: '21:00',
            activity: 'Ruin Bar Night',
            description: 'Szimpla Kert ruin bar',
            cost: 2000,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Parliament & Cruise',
        items: [
          {
            time: '10:00',
            activity: 'Hungarian Parliament',
            description: 'Neo-Gothic masterpiece tour',
            cost: 2000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Great Market Hall',
            description: 'Hungarian paprika & street food',
            cost: 2000,
            type: 'food'
          },
          {
            time: '18:00',
            activity: 'Danube river cruise',
            description: 'Evening cruise with dinner',
            cost: 5000,
            type: 'activity'
          }
        ]
      },
      {
        day: 3,
        title: 'Jewish Quarter & Chain Bridge',
        items: [
          {
            time: '10:00',
            activity: 'Dohany Street Synagogue',
            description: "Europe's largest synagogue",
            cost: 1500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Lunch at Karavan',
            description: 'Street food village',
            cost: 2000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Chain Bridge Walk',
            description: 'Iconic suspension bridge',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Traditional Hungarian goulash',
            cost: 3500,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout & Airport',
            description: 'Shuttle to Budapest Airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '20:00',
            activity: 'Departure Flight',
            description: 'BUD → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    image: 'https://images.unsplash.com/photo-1585208798174-6cedd4f35827?w=800&q=80',
    description: 'Sun-drenched hilltop city of Fado music, trams, and golden Age of Exploration',
    tags: [
      'Sun',     'Fado',
      'Trams',   'Beaches',
      'Culture', 'Seafood',
      'Beaches'
    ],
    duration: '6 Days, 5 Nights',
    costLevel: 2,
    totalCost: 100000,
    vibeVector: {
      Sunny: 0.9,
      Cultural: 0.8,
      Romantic: 0.8,
      Relaxed: 0.7,
      Scenic: 0.8,
      Coastal: 0.7,
      Vibrant: 0.7
    },
    activityVector: {
      Food: 0.9,
      Culture: 0.8,
      Architecture: 0.8,
      Photography: 0.8,
      Beaches: 0.6,
      History: 0.8,
      Music: 0.7
    },
    stayVector: { Boutique: 0.8, Stylish: 0.7, Eco: 0.5, Central: 0.8 },
    breakdown: {
      flights: 42000,
      stay: 30000,
      activities: 18000,
      transfers: 10000
    },
    flights: [
      {
        type: 'departure',
        airline: 'TAP Portugal',
        flightNo: 'TP455',
        from: 'DEL',
        to: 'LIS',
        departure: '23:55',
        arrival: '10:15 +1',
        duration: '14h 20m',
        cost: 21000
      },
      {
        type: 'return',
        airline: 'TAP Portugal',
        flightNo: 'TP456',
        from: 'LIS',
        to: 'DEL',
        departure: '12:30',
        arrival: '02:00 +1',
        duration: '12h 30m',
        cost: 21000
      }
    ],
    hotel: {
      name: 'Bairro Alto Hotel',
      rating: 5,
      location: 'Chiado, Lisbon',
      distanceToCenter: '0.3 km',
      totalCost: 30000,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
      nights: 5
    },
    transfers: [
      { from: 'Lisbon Airport', to: 'Hotel', type: 'Metro', cost: 300 },
      { from: 'Hotel', to: 'Sintra', type: 'Train + Bus', cost: 2000 },
      { from: 'Hotel', to: 'Airport', type: 'Metro', cost: 300 }
    ],
    days: [
      {
        day: 1,
        title: 'Alfama & Fado',
        items: [
          {
            time: '10:00',
            activity: 'Alfama District Walk',
            description: "Lisbon's oldest neighbourhood",
            cost: 0,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Pasteis de Belem',
            description: 'World-famous custard tarts',
            cost: 500,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Jeronimos Monastery',
            description: 'UNESCO Manueline architecture',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '21:00',
            activity: 'Fado show & dinner',
            description: 'Live traditional music',
            cost: 5000,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Sintra Day Trip',
        items: [
          {
            time: '09:00',
            activity: 'Pena Palace Sintra',
            description: 'Colorful hilltop palace',
            cost: 2000,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Lunch in Sintra Village',
            description: 'Local queijadas pastry',
            cost: 2000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Moorish Castle',
            description: 'Medieval fortress ruins',
            cost: 1200,
            type: 'activity'
          }
        ]
      },
      {
        day: 3,
        title: 'Tram 28 & Miradouros',
        items: [
          {
            time: '10:00',
            activity: 'Tram 28 ride',
            description: 'Historic yellow tram tour',
            cost: 300,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Time Out Market',
            description: "Lisbon's food market hall",
            cost: 2500,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Portas do Sol viewpoint',
            description: 'Panoramic Lisbon views',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'LX Factory dinner',
            description: 'Trendy repurposed factory',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Cascais Beach Day',
        items: [
          {
            time: '10:00',
            activity: 'Cascais beach town',
            description: 'Train to Cascais',
            cost: 800,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Seafood lunch',
            description: 'Fresh Atlantic grilled fish',
            cost: 3000,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Guincho Beach',
            description: 'Wild Atlantic coastline',
            cost: 0,
            type: 'activity'
          }
        ]
      },
      {
        day: 5,
        title: 'Shopping & Farewell',
        items: [
          {
            time: '11:00',
            activity: 'Chiado Shopping',
            description: 'Local boutiques and cork products',
            cost: 3000,
            type: 'shopping'
          },
          {
            time: '14:00',
            activity: 'Belem Tower',
            description: 'Iconic fortress on the Tagus',
            cost: 800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Grilled Portuguese octopus',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 6,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Metro to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '12:30',
            activity: 'Departure Flight',
            description: 'LIS → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'copenhagen',
    name: 'Copenhagen',
    country: 'Denmark',
    image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80',
    description: "The world's happiest city - hygge, Michelin stars, and Viking heritage",
    tags: [
      'Hygge',
      'Design',
      'Sustainability',
      'Cycling',
      'Food',
      'Nordic'
    ],
    duration: '5 Days, 4 Nights',
    costLevel: 3,
    totalCost: 120000,
    vibeVector: {
      Cozy: 0.9,
      Design: 0.9,
      Sustainable: 0.8,
      Urban: 0.7,
      Scenic: 0.7,
      Nordic: 0.9,
      Trendy: 0.8
    },
    activityVector: {
      Food: 0.9,
      Culture: 0.8,
      Cycling: 0.8,
      Architecture: 0.7,
      Design: 0.9,
      Museums: 0.7,
      Relaxation: 0.6
    },
    stayVector: { Boutique: 0.8, Design: 0.9, Eco: 0.7, Stylish: 0.8 },
    breakdown: {
      flights: 52000,
      stay: 36000,
      activities: 22000,
      transfers: 10000
    },
    flights: [
      {
        type: 'departure',
        airline: 'Scandinavian Airlines',
        flightNo: 'SK571',
        from: 'DEL',
        to: 'CPH',
        departure: '02:50',
        arrival: '08:00',
        duration: '11h 10m',
        cost: 26000
      },
      {
        type: 'return',
        airline: 'Scandinavian Airlines',
        flightNo: 'SK572',
        from: 'CPH',
        to: 'DEL',
        departure: '11:05',
        arrival: '00:30 +1',
        duration: '10h 25m',
        cost: 26000
      }
    ],
    hotel: {
      name: 'Nimb Hotel',
      rating: 5,
      location: 'Tivoli Gardens Area',
      distanceToCenter: '0.1 km',
      totalCost: 36000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 4
    },
    transfers: [
      {
        from: 'Copenhagen Airport',
        to: 'Hotel',
        type: 'Metro',
        cost: 500
      },
      { from: 'Hotel', to: 'Tivoli', type: 'Walk', cost: 0 },
      { from: 'Hotel', to: 'Airport', type: 'Metro', cost: 500 }
    ],
    days: [
      {
        day: 1,
        title: 'Tivoli & Nyhavn',
        items: [
          {
            time: '10:00',
            activity: 'Tivoli Gardens',
            description: 'Historic amusement park & gardens',
            cost: 2000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Nyhavn Harbour',
            description: 'Colorful canal; smørrebrød lunch',
            cost: 2500,
            type: 'food'
          },
          {
            time: '17:00',
            activity: 'The Little Mermaid',
            description: 'Iconic bronze sculpture',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Dinner at Kadeau',
            description: 'New Nordic cuisine',
            cost: 6000,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Cycling & Design',
        items: [
          {
            time: '09:00',
            activity: 'Cycling tour',
            description: 'Bike the city like a local',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Torvehallerne Market',
            description: 'Gourmet food market',
            cost: 2000,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Design Museum Denmark',
            description: 'Danish design excellence',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Meatpacking District',
            description: 'Trendy restaurants & bars',
            cost: 3000,
            type: 'activity'
          }
        ]
      },
      {
        day: 3,
        title: 'Castles & Culture',
        items: [
          {
            time: '10:00',
            activity: 'Rosenborg Castle',
            description: 'Danish Crown Jewels',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Botanisk Have',
            description: 'Botanical garden lunch',
            cost: 1000,
            type: 'relax'
          },
          {
            time: '15:00',
            activity: 'National Museum Denmark',
            description: 'Viking history exhibits',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Hygge night in',
            description: 'Coffee, candles, pastries',
            cost: 1500,
            type: 'relax'
          }
        ]
      },
      {
        day: 4,
        title: 'Christiania & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Freetown Christiania',
            description: 'Alternative self-governing community',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Christianshavn canal',
            description: 'Alternative district exploration',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Smorgasbord & Danish classics',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 5,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Metro to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:05',
            activity: 'Departure Flight',
            description: 'CPH → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'dubrovnik',
    name: 'Dubrovnik',
    country: 'Croatia',
    image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&q=80',
    description: 'The Pearl of the Adriatic - medieval walls, crystal clear sea, and Game of Thrones magic',
    tags: [
      'Beach',
      'Medieval',
      'Sea',
      'Sunny',
      'Scenic',
      'History',
      'Beaches',
      'Historic City'
    ],
    duration: '5 Days, 4 Nights',
    costLevel: 2,
    totalCost: 95000,
    vibeVector: {
      Sunny: 0.9,
      Scenic: 0.95,
      Coastal: 0.9,
      Historic: 0.8,
      Romantic: 0.8,
      Beach: 0.8,
      Mediterranean: 0.9,
      Beaches: 0.8,
      'Historic City': 0.8
    },
    activityVector: {
      Swimming: 0.9,
      History: 0.8,
      Photography: 0.9,
      Kayaking: 0.7,
      Culture: 0.7,
      Walking: 0.8,
      Food: 0.7
    },
    stayVector: { Boutique: 0.8, Luxury: 0.6, Sea_view: 0.9, Central: 0.7 },
    breakdown: {
      flights: 42000,
      stay: 28000,
      activities: 15000,
      transfers: 10000
    },
    flights: [
      {
        type: 'departure',
        airline: 'Croatia Airlines',
        flightNo: 'OU491',
        from: 'DEL',
        to: 'DBV',
        departure: '23:00',
        arrival: '09:30 +1',
        duration: '13h 30m',
        cost: 21000
      },
      {
        type: 'return',
        airline: 'Croatia Airlines',
        flightNo: 'OU492',
        from: 'DBV',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '13h',
        cost: 21000
      }
    ],
    hotel: {
      name: 'Hotel Excelsior Dubrovnik',
      rating: 5,
      location: 'Old Town Dubrovnik',
      distanceToCenter: '0.5 km',
      totalCost: 28000,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80',
      nights: 4
    },
    transfers: [
      {
        from: 'Dubrovnik Airport',
        to: 'Hotel',
        type: 'Airport Bus',
        cost: 1200
      },
      {
        from: 'Hotel',
        to: 'Lokrum Island',
        type: 'Boat Ferry',
        cost: 1000
      },
      { from: 'Hotel', to: 'Airport', type: 'Taxi', cost: 2000 }
    ],
    days: [
      {
        day: 1,
        title: 'Old City Walls',
        items: [
          {
            time: '09:00',
            activity: 'Old City Walls walk',
            description: '2km circuit above the Adriatic',
            cost: 2500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Stradun lunch',
            description: 'Main promenade seafood',
            cost: 3000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Fort Lovrijenac',
            description: 'Game of Thrones filming site',
            cost: 800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Sunset from Buza Bar',
            description: 'Cliff bar on the sea',
            cost: 1500,
            type: 'relax'
          }
        ]
      },
      {
        day: 2,
        title: 'Lokrum Island',
        items: [
          {
            time: '10:00',
            activity: 'Lokrum Island day trip',
            description: 'Peacocks and salt lake swim',
            cost: 2500,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Dead Sea Salt Lake swim',
            description: 'Natural seawater lake',
            cost: 0,
            type: 'activity'
          },
          {
            time: '19:00',
            activity: 'Barba restaurant',
            description: 'Fresh Adriatic fish',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Sea Kayaking',
        items: [
          {
            time: '09:00',
            activity: 'Sea Kayaking tour',
            description: '3-hour coastal kayak',
            cost: 3000,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Beach BBQ',
            description: 'Local grilled seafood',
            cost: 3000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Cable car to Mt Srd',
            description: 'Panoramic city views',
            cost: 1500,
            type: 'activity'
          }
        ]
      },
      {
        day: 4,
        title: 'Relaxation Day',
        items: [
          {
            time: '10:00',
            activity: 'Banje Beach',
            description: 'Iconic beach below Old Town',
            cost: 0,
            type: 'relax'
          },
          {
            time: '14:00',
            activity: 'Dubrovnik Museum',
            description: 'City history and art',
            cost: 800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Seafood risotto with sea view',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 5,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Taxi to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'DBV → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'athens',
    name: 'Athens',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80',
    description: 'Birthplace of democracy, philosophy, and the Olympics - ancient wonders under the Mediterranean sun',
    tags: [
      'Ancient History',
      'Ruins',
      'Mediterranean',
      'Culture',
      'Food',
      'Sunny',
      'Beaches',
      'Historic City'
    ],
    duration: '5 Days, 4 Nights',
    costLevel: 2,
    totalCost: 90000,
    vibeVector: {
      Historic: 0.95,
      Sunny: 0.8,
      Cultural: 0.9,
      Scenic: 0.7,
      Mediterranean: 0.8,
      Ancient: 0.95,
      Vibrant: 0.7,
      Beaches: 0.8,
      'Historic City': 0.8
    },
    activityVector: {
      History: 0.95,
      Museums: 0.9,
      Culture: 0.8,
      Food: 0.8,
      Photography: 0.8,
      Walking: 0.7,
      Architecture: 0.9
    },
    stayVector: { Boutique: 0.7, Urban: 0.7, Central: 0.9, Stylish: 0.6 },
    breakdown: {
      flights: 40000,
      stay: 25000,
      activities: 15000,
      transfers: 10000
    },
    flights: [
      {
        type: 'departure',
        airline: 'Aegean Airlines',
        flightNo: 'A3601',
        from: 'DEL',
        to: 'ATH',
        departure: '02:20',
        arrival: '07:00',
        duration: '11h 40m',
        cost: 20000
      },
      {
        type: 'return',
        airline: 'Aegean Airlines',
        flightNo: 'A3602',
        from: 'ATH',
        to: 'DEL',
        departure: '09:30',
        arrival: '22:00',
        duration: '11h 30m',
        cost: 20000
      }
    ],
    hotel: {
      name: 'Hotel Grande Bretagne',
      rating: 5,
      location: 'Syntagma Square Athens',
      distanceToCenter: '0.1 km',
      totalCost: 25000,
      image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&q=80',
      nights: 4
    },
    transfers: [
      {
        from: 'Athens Airport',
        to: 'Hotel',
        type: 'Metro',
        cost: 1000
      },
      { from: 'Hotel', to: 'Acropolis', type: 'Walk', cost: 0 },
      { from: 'Hotel', to: 'Airport', type: 'Metro', cost: 1000 }
    ],
    days: [
      {
        day: 1,
        title: 'The Acropolis',
        items: [
          {
            time: '09:00',
            activity: 'Acropolis & Parthenon',
            description: 'UNESCO world heritage site',
            cost: 2000,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Monastiraki Flea Market',
            description: 'Souvlaki and local cheeses',
            cost: 2000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Acropolis Museum',
            description: 'Ancient sculptures and friezes',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Rooftop dinner with Acropolis view',
            description: 'Fine dining at Oxo Nou',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Ancient Agora & Plaka',
        items: [
          {
            time: '10:00',
            activity: 'Ancient Agora',
            description: 'Heart of ancient Athens',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Plaka District',
            description: 'Authentic Athens neighbourhood',
            cost: 0,
            type: 'activity'
          },
          {
            time: '15:00',
            activity: 'National Archaeological Museum',
            description: "World's finest Greek antiquities",
            cost: 1500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Psiri evening dinner',
            description: 'Mezze and ouzo',
            cost: 3000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Cape Sounion Day Trip',
        items: [
          {
            time: '09:00',
            activity: 'Temple of Poseidon, Sounion',
            description: 'Clifftop temple with sea views',
            cost: 2000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Vouliagmeni Lake',
            description: 'Natural thermal lake swim',
            cost: 1500,
            type: 'relax'
          },
          {
            time: '20:00',
            activity: 'Piraeus Seafood',
            description: 'Harbour-fresh grilled fish',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Markets & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Varvakios Market',
            description: 'Athens central market',
            cost: 0,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Lunch at Diporto',
            description: '100-year-old taverna',
            cost: 2500,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Benaki Museum',
            description: 'Greek cultural heritage',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Greek seafood mezze',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 5,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Metro to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '09:30',
            activity: 'Departure Flight',
            description: 'ATH → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'edinburgh',
    name: 'Edinburgh',
    country: 'Scotland',
    image: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&q=80',
    description: "Castles, whisky, and breathtaking highland scenery - Scotland's dramatic capital",
    tags: [
      'Castles',
      'Whisky',
      'Highlands',
      'Festivals',
      'Gothic',
      'Nature',
      'Mountains',
      'Historic City',
      'Metropolis'
    ],
    duration: '5 Days, 4 Nights',
    costLevel: 2,
    totalCost: 105000,
    vibeVector: {
      Dramatic: 0.9,
      Historic: 0.9,
      Nature: 0.7,
      Cozy: 0.8,
      Mysterious: 0.8,
      Scenic: 0.9,
      Cultural: 0.8,
      Mountains: 0.8,
      'Historic City': 0.8,
      Metropolis: 0.8
    },
    activityVector: {
      History: 0.9,
      Hiking: 0.7,
      Culture: 0.8,
      Whisky: 0.8,
      Photography: 0.8,
      Museums: 0.7,
      Architecture: 0.8
    },
    stayVector: { Boutique: 0.7, Historic: 0.9, Cozy: 0.8, Central: 0.8 },
    breakdown: {
      flights: 46000,
      stay: 30000,
      activities: 18000,
      transfers: 11000
    },
    flights: [
      {
        type: 'departure',
        airline: 'British Airways',
        flightNo: 'BA143',
        from: 'DEL',
        to: 'EDI',
        departure: '01:50',
        arrival: '09:05',
        duration: '13h 15m',
        cost: 23000
      },
      {
        type: 'return',
        airline: 'British Airways',
        flightNo: 'BA144',
        from: 'EDI',
        to: 'DEL',
        departure: '11:45',
        arrival: '01:00 +1',
        duration: '12h 15m',
        cost: 23000
      }
    ],
    hotel: {
      name: 'The Scotsman Hotel',
      rating: 5,
      location: 'Old Town Edinburgh',
      distanceToCenter: '0.1 km',
      totalCost: 30000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 4
    },
    transfers: [
      {
        from: 'Edinburgh Airport',
        to: 'Hotel',
        type: 'Tram',
        cost: 800
      },
      { from: 'Hotel', to: "Arthur's Seat", type: 'Walk', cost: 0 },
      { from: 'Hotel', to: 'Airport', type: 'Tram', cost: 800 }
    ],
    days: [
      {
        day: 1,
        title: 'Royal Mile & Castle',
        items: [
          {
            time: '10:00',
            activity: 'Edinburgh Castle',
            description: 'Crown Jewels and Scottish history',
            cost: 2500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Royal Mile lunch',
            description: 'Haggis and Scottish ale',
            cost: 2500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Holyrood Palace',
            description: "Queen's official Scottish residence",
            cost: 1800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Whisky tasting',
            description: 'Scotch Whisky Experience',
            cost: 3000,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: "Arthur's Seat Hike",
        items: [
          {
            time: '09:00',
            activity: "Arthur's Seat hike",
            description: 'Ancient volcano, panoramic views',
            cost: 0,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Picnic at Princes Street Gardens',
            description: 'With castle views',
            cost: 1500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Scottish National Gallery',
            description: 'Free world-class art',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Dinner at Timberyard',
            description: 'Farm-to-table Scottish cuisine',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Scottish Highlands Day Trip',
        items: [
          {
            time: '08:00',
            activity: 'Loch Lomond & Trossachs',
            description: 'Highland day trip by coach',
            cost: 5000,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Loch Lomond lunch',
            description: 'Highland pub meal',
            cost: 2500,
            type: 'food'
          },
          {
            time: '18:00',
            activity: 'Return to Edinburgh',
            description: 'Sunset views over Highlands',
            cost: 0,
            type: 'travel'
          }
        ]
      },
      {
        day: 4,
        title: 'Old Town & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Grassmarket District',
            description: 'Historic market & colourful shops',
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Victoria Street',
            description: 'Inspiration for Diagon Alley',
            cost: 0,
            type: 'activity'
          },
          {
            time: '15:00',
            activity: 'Camera Obscura',
            description: 'Victorian optical illusions',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Burns Supper',
            description: 'Traditional Scottish farewell dinner',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 5,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Tram to Edinburgh Airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:45',
            activity: 'Departure Flight',
            description: 'EDI → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
    description: "Gaudí's masterpieces, golden beaches, and legendary tapas - Barcelona is Spain's Mediterranean jewel",
    tags: [
      'Beach',
      'Art',
      'Nightlife',
      'Gastronomy',
      'Architecture',
      'Mediterranean'
    ],
    duration: '5 Days, 4 Nights',
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
    stayVector: { Boutique: 0.8, City: 0.7, Beach: 0.6, Stylish: 0.7 },
    breakdown: { flights: 38000, stay: 30000, activities: 22000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'Vueling',
        flightNo: 'VY8701',
        from: 'DEL',
        to: 'BCN',
        departure: '22:00',
        arrival: '06:30 +1',
        duration: '11h 30m',
        cost: 19000
      },
      {
        type: 'return',
        airline: 'Vueling',
        flightNo: 'VY8702',
        from: 'BCN',
        to: 'DEL',
        departure: '10:00',
        arrival: '00:30 +1',
        duration: '11h 30m',
        cost: 19000
      }
    ],
    hotel: {
      name: 'Hotel Arts Barcelona',
      rating: 5,
      location: 'Barceloneta, Barcelona',
      distanceToCenter: '1.5 km',
      totalCost: 30000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 4
    },
    transfers: [
      {
        from: 'Barcelona Airport',
        to: 'Hotel',
        type: 'Aerobus',
        cost: 2000
      },
      { from: 'Hotel', to: 'Airport', type: 'Aerobus', cost: 2000 },
      { from: 'Hotel', to: 'Montserrat', type: 'Tour Bus', cost: 4000 }
    ],
    days: [
      {
        day: 1,
        title: 'Gothic Quarter & Tapas',
        items: [
          {
            time: '10:00',
            activity: 'Gothic Quarter Walk',
            description: 'Medieval lanes and plazas',
            cost: 0,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'La Boqueria Market',
            description: 'Fresh tapas and juices',
            cost: 2500,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Barcelona Cathedral',
            description: 'Gothic masterpiece',
            cost: 500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Tapas crawl in El Born',
            description: 'Local pintxos bars',
            cost: 3500,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Gaudí Day',
        items: [
          {
            time: '09:00',
            activity: 'Sagrada Familia',
            description: "Gaudí's unfinished basilica",
            cost: 2600,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Park Güell',
            description: 'Mosaic-covered hilltop park',
            cost: 1000,
            type: 'activity'
          },
          {
            time: '16:00',
            activity: 'Casa Batlló',
            description: 'Dragon-spine rooftop',
            cost: 3500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Dinner at Cervecería Catalana',
            description: 'Famous tapas restaurant',
            cost: 3500,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Beach & Barceloneta',
        items: [
          {
            time: '10:00',
            activity: 'Barceloneta Beach',
            description: 'Mediterranean swimming',
            cost: 0,
            type: 'relax'
          },
          {
            time: '13:00',
            activity: 'Seafood paella lunch',
            description: 'Beachside restaurant',
            cost: 3000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Picasso Museum',
            description: 'Early Picasso works',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '22:00',
            activity: 'Nightlife in Raval',
            description: 'Cocktail bars and clubs',
            cost: 3000,
            type: 'relax'
          }
        ]
      },
      {
        day: 4,
        title: 'Montjuïc & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Montjuïc Castle',
            description: 'Hilltop fortress with views',
            cost: 800,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Lunch at Tickets',
            description: 'Creative molecular tapas',
            cost: 4000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Las Ramblas stroll',
            description: 'Iconic boulevard shopping',
            cost: 2000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Catalan fine dining',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 5,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Aerobus to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:00',
            activity: 'Departure Flight',
            description: 'BCN → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'rome',
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    description: 'The Eternal City - 2,700 years of history from the Colosseum to Vatican masterpieces',
    tags: [ 'History', 'Art', 'Food', 'Ancient', 'Culture', 'Romance' ],
    duration: '5 Days, 4 Nights',
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
    stayVector: { Boutique: 0.7, Historic: 0.8, City: 0.7, Luxury: 0.6 },
    breakdown: { flights: 40000, stay: 32000, activities: 24000, transfers: 9000 },
    flights: [
      {
        type: 'departure',
        airline: 'Alitalia',
        flightNo: 'AZ769',
        from: 'DEL',
        to: 'FCO',
        departure: '02:00',
        arrival: '07:30',
        duration: '9h 30m',
        cost: 20000
      },
      {
        type: 'return',
        airline: 'Alitalia',
        flightNo: 'AZ770',
        from: 'FCO',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '9h',
        cost: 20000
      }
    ],
    hotel: {
      name: 'Hotel de Russie',
      rating: 5,
      location: 'Piazza del Popolo, Rome',
      distanceToCenter: '0.3 km',
      totalCost: 32000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 4
    },
    transfers: [
      {
        from: 'Fiumicino Airport',
        to: 'Hotel',
        type: 'Leonardo Express',
        cost: 2500
      },
      { from: 'Hotel', to: 'Vatican', type: 'Metro', cost: 500 },
      {
        from: 'Hotel',
        to: 'Airport',
        type: 'Leonardo Express',
        cost: 2500
      }
    ],
    days: [
      {
        day: 1,
        title: 'Ancient Rome',
        items: [
          {
            time: '09:00',
            activity: 'Colosseum',
            description: 'Iconic Roman amphitheatre',
            cost: 2500,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Roman Forum',
            description: 'Heart of ancient Rome',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Lunch in Trastevere',
            description: 'Classic Roman pasta',
            cost: 2500,
            type: 'food'
          },
          {
            time: '17:00',
            activity: 'Palatine Hill',
            description: "Emperor's palaces",
            cost: 0,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Vatican City',
        items: [
          {
            time: '08:00',
            activity: 'Vatican Museums',
            description: 'Raphael Rooms and antiquities',
            cost: 2000,
            type: 'activity'
          },
          {
            time: '11:00',
            activity: 'Sistine Chapel',
            description: "Michelangelo's ceiling",
            cost: 0,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: "St. Peter's Basilica",
            description: "World's largest church",
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Dinner near Piazza Navona',
            description: 'Cacio e pepe and wine',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Baroque Rome',
        items: [
          {
            time: '10:00',
            activity: 'Trevi Fountain',
            description: 'Toss a coin and make a wish',
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Spanish Steps',
            description: 'Iconic stairway',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Pantheon',
            description: '2000-year-old temple',
            cost: 500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Gelato crawl',
            description: 'Best gelaterias in Rome',
            cost: 1500,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Trastevere & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Borghese Gallery',
            description: 'Bernini sculptures',
            cost: 2000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Trastevere food tour',
            description: 'Supplì, pizza al taglio',
            cost: 3000,
            type: 'food'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Rooftop dining with views',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 5,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Train to Fiumicino',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'FCO → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'paris',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    description: 'The City of Light - art, fashion, cuisine, and the Eiffel Tower under a romantic sky',
    tags: [ 'Romance', 'Art', 'Fashion', 'Cuisine', 'Culture', 'Iconic' ],
    duration: '5 Days, 4 Nights',
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
    stayVector: { Luxury: 0.8, Boutique: 0.9, Elegant: 0.9, City: 0.7 },
    breakdown: {
      flights: 48000,
      stay: 42000,
      activities: 28000,
      transfers: 12000
    },
    flights: [
      {
        type: 'departure',
        airline: 'Air France',
        flightNo: 'AF225',
        from: 'DEL',
        to: 'CDG',
        departure: '23:00',
        arrival: '05:30 +1',
        duration: '9h 30m',
        cost: 24000
      },
      {
        type: 'return',
        airline: 'Air France',
        flightNo: 'AF226',
        from: 'CDG',
        to: 'DEL',
        departure: '10:00',
        arrival: '23:00',
        duration: '9h',
        cost: 24000
      }
    ],
    hotel: {
      name: 'Hôtel Plaza Athénée',
      rating: 5,
      location: 'Avenue Montaigne, Paris',
      distanceToCenter: '0.5 km',
      totalCost: 42000,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
      nights: 4
    },
    transfers: [
      {
        from: 'CDG Airport',
        to: 'Hotel',
        type: 'RER Train',
        cost: 2000
      },
      {
        from: 'Hotel',
        to: 'Versailles',
        type: 'RER C Train',
        cost: 3000
      },
      { from: 'Hotel', to: 'Airport', type: 'RER Train', cost: 2000 }
    ],
    days: [
      {
        day: 1,
        title: 'Eiffel Tower & Seine',
        items: [
          {
            time: '10:00',
            activity: 'Eiffel Tower',
            description: 'Iconic iron landmark',
            cost: 2900,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Lunch at Café de Flore',
            description: 'Classic Parisian café',
            cost: 3500,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Seine River Cruise',
            description: 'Bateaux Mouches',
            cost: 2000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Dinner in Le Marais',
            description: 'Bistro dining',
            cost: 4500,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Louvre & Champs-Élysées',
        items: [
          {
            time: '09:00',
            activity: 'Louvre Museum',
            description: 'Mona Lisa and 35,000 artworks',
            cost: 2200,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Tuileries Garden',
            description: 'Royal gardens stroll',
            cost: 0,
            type: 'relax'
          },
          {
            time: '16:00',
            activity: 'Champs-Élysées',
            description: 'Shopping boulevard',
            cost: 3000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Arc de Triomphe sunset',
            description: 'Rooftop panorama',
            cost: 1600,
            type: 'activity'
          }
        ]
      },
      {
        day: 3,
        title: 'Montmartre & Culture',
        items: [
          {
            time: '09:00',
            activity: 'Sacré-Cœur Basilica',
            description: 'Hilltop white church',
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Montmartre artists',
            description: 'Place du Tertre',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: "Musée d'Orsay",
            description: 'Impressionist masterpieces',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Moulin Rouge show',
            description: 'Iconic cabaret',
            cost: 8000,
            type: 'activity'
          }
        ]
      },
      {
        day: 4,
        title: 'Versailles & Farewell',
        items: [
          {
            time: '09:00',
            activity: 'Palace of Versailles',
            description: 'Hall of Mirrors',
            cost: 3000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Versailles Gardens',
            description: 'Fountain shows',
            cost: 0,
            type: 'relax'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Michelin-starred dining',
            cost: 8000,
            type: 'food'
          }
        ]
      },
      {
        day: 5,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'RER to CDG',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:00',
            activity: 'Departure Flight',
            description: 'CDG → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'london',
    name: 'London',
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    description: 'Royal palaces, West End theatres, and world-class museums in the British capital',
    tags: [
      'Culture',
      'History',
      'Theatre',
      'Museums',
      'Urban',
      'Cosmopolitan'
    ],
    duration: '5 Days, 4 Nights',
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
    stayVector: { Luxury: 0.7, City: 0.9, Boutique: 0.6, Historic: 0.7 },
    breakdown: {
      flights: 50000,
      stay: 45000,
      activities: 28000,
      transfers: 12000
    },
    flights: [
      {
        type: 'departure',
        airline: 'British Airways',
        flightNo: 'BA142',
        from: 'DEL',
        to: 'LHR',
        departure: '21:30',
        arrival: '04:00 +1',
        duration: '9h 30m',
        cost: 25000
      },
      {
        type: 'return',
        airline: 'British Airways',
        flightNo: 'BA143',
        from: 'LHR',
        to: 'DEL',
        departure: '10:30',
        arrival: '00:30 +1',
        duration: '9h',
        cost: 25000
      }
    ],
    hotel: {
      name: 'The Langham London',
      rating: 5,
      location: 'Marylebone, London',
      distanceToCenter: '0.3 km',
      totalCost: 45000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 4
    },
    transfers: [
      {
        from: 'Heathrow Airport',
        to: 'Hotel',
        type: 'Heathrow Express',
        cost: 3500
      },
      {
        from: 'Hotel',
        to: 'Airport',
        type: 'Heathrow Express',
        cost: 3500
      },
      { from: 'Hotel', to: 'Greenwich', type: 'DLR', cost: 1000 }
    ],
    days: [
      {
        day: 1,
        title: 'Royal London',
        items: [
          {
            time: '09:00',
            activity: 'Buckingham Palace',
            description: 'Changing of the Guard',
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Westminster Abbey',
            description: 'Gothic coronation church',
            cost: 2500,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Fish & Chips lunch',
            description: 'Classic British fare',
            cost: 2000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Big Ben & Houses of Parliament',
            description: 'Iconic London views',
            cost: 0,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Museums & Culture',
        items: [
          {
            time: '10:00',
            activity: 'British Museum',
            description: 'Rosetta Stone and mummies',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Covent Garden lunch',
            description: 'Market food hall',
            cost: 2500,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'National Gallery',
            description: 'Van Gogh, Monet, Da Vinci',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'West End show',
            description: 'World-class theatre',
            cost: 7000,
            type: 'activity'
          }
        ]
      },
      {
        day: 3,
        title: 'Tower & Markets',
        items: [
          {
            time: '09:00',
            activity: 'Tower of London',
            description: 'Crown Jewels',
            cost: 3000,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Borough Market',
            description: 'Artisan food market',
            cost: 2500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Tower Bridge',
            description: 'Victorian engineering marvel',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '19:00',
            activity: 'Pub crawl in Shoreditch',
            description: 'Craft beers',
            cost: 3000,
            type: 'relax'
          }
        ]
      },
      {
        day: 4,
        title: 'South Bank & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Tate Modern',
            description: 'Contemporary art powerhouse',
            cost: 0,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'South Bank walk',
            description: 'Thames riverside',
            cost: 0,
            type: 'activity'
          },
          {
            time: '15:00',
            activity: 'London Eye',
            description: '360° city views',
            cost: 3000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Michelin dining in Mayfair',
            cost: 6000,
            type: 'food'
          }
        ]
      },
      {
        day: 5,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Heathrow Express to LHR',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:30',
            activity: 'Departure Flight',
            description: 'LHR → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'stockholm',
    name: 'Stockholm',
    country: 'Sweden',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&q=80',
    description: 'Venice of the North - 14 islands connected by bridges, with cutting-edge design and Viking lore',
    tags: [
      'Design',
      'Nordic',
      'Islands',
      'Museums',
      'Nature',
      'Sustainable'
    ],
    duration: '4 Days, 3 Nights',
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
    stayVector: { Design: 0.9, Boutique: 0.8, Eco: 0.7, Stylish: 0.8 },
    breakdown: {
      flights: 45000,
      stay: 35000,
      activities: 25000,
      transfers: 10000
    },
    flights: [
      {
        type: 'departure',
        airline: 'SAS',
        flightNo: 'SK502',
        from: 'DEL',
        to: 'ARN',
        departure: '01:30',
        arrival: '08:00',
        duration: '9h 30m',
        cost: 22500
      },
      {
        type: 'return',
        airline: 'SAS',
        flightNo: 'SK503',
        from: 'ARN',
        to: 'DEL',
        departure: '10:00',
        arrival: '00:30 +1',
        duration: '9h 30m',
        cost: 22500
      }
    ],
    hotel: {
      name: 'At Six Hotel',
      rating: 5,
      location: 'Brunkebergstorg, Stockholm',
      distanceToCenter: '0.1 km',
      totalCost: 35000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Arlanda Airport',
        to: 'Hotel',
        type: 'Arlanda Express',
        cost: 3000
      },
      { from: 'Hotel', to: 'Djurgården', type: 'Ferry', cost: 500 },
      {
        from: 'Hotel',
        to: 'Airport',
        type: 'Arlanda Express',
        cost: 3000
      }
    ],
    days: [
      {
        day: 1,
        title: 'Gamla Stan & Royal Palace',
        items: [
          {
            time: '10:00',
            activity: 'Gamla Stan walk',
            description: 'Medieval old town cobblestones',
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Royal Palace',
            description: 'Swedish monarchy residence',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Lunch at Tradition',
            description: 'Classic Swedish meatballs',
            cost: 3000,
            type: 'food'
          },
          {
            time: '17:00',
            activity: 'Nobel Prize Museum',
            description: 'History of Nobel laureates',
            cost: 1200,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Museums & Islands',
        items: [
          {
            time: '09:00',
            activity: 'Vasa Museum',
            description: '1628 warship perfectly preserved',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'ABBA The Museum',
            description: 'Interactive music experience',
            cost: 2500,
            type: 'activity'
          },
          {
            time: '15:00',
            activity: 'Fotografiska',
            description: 'Photography museum',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Södermalm dinner',
            description: 'Trendy neighbourhood dining',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Nature & Farewell',
        items: [
          {
            time: '09:00',
            activity: 'Stockholm Archipelago boat tour',
            description: '3-hour island cruise',
            cost: 4000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Östermalms Saluhall',
            description: 'Gourmet food market',
            cost: 3000,
            type: 'food'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Nordic fine dining',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Arlanda Express to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:00',
            activity: 'Departure Flight',
            description: 'ARN → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'nice',
    name: 'Nice',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=800&q=80',
    description: 'Azure waters, Belle Époque elegance - the crown jewel of the French Riviera',
    tags: [
      'Beach',
      'Luxury',
      'Mediterranean',
      'Sun',
      'Coastal',
      'Relaxation'
    ],
    duration: '4 Days, 3 Nights',
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
    stayVector: { Luxury: 0.9, Sea_view: 0.9, Premium: 0.8, Boutique: 0.7 },
    breakdown: {
      flights: 45000,
      stay: 40000,
      activities: 25000,
      transfers: 10000
    },
    flights: [
      {
        type: 'departure',
        airline: 'Air France',
        flightNo: 'AF338',
        from: 'DEL',
        to: 'NCE',
        departure: '00:30',
        arrival: '07:00',
        duration: '10h 30m',
        cost: 22500
      },
      {
        type: 'return',
        airline: 'Air France',
        flightNo: 'AF339',
        from: 'NCE',
        to: 'DEL',
        departure: '09:00',
        arrival: '22:30',
        duration: '10h 30m',
        cost: 22500
      }
    ],
    hotel: {
      name: 'Hotel Negresco',
      rating: 5,
      location: 'Promenade des Anglais',
      distanceToCenter: '0.3 km',
      totalCost: 40000,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
      nights: 3
    },
    transfers: [
      { from: 'Nice Airport', to: 'Hotel', type: 'Tram', cost: 300 },
      { from: 'Hotel', to: 'Monaco', type: 'Train', cost: 1200 },
      { from: 'Hotel', to: 'Airport', type: 'Tram', cost: 300 }
    ],
    days: [
      {
        day: 1,
        title: 'Promenade & Old Town',
        items: [
          {
            time: '10:00',
            activity: 'Promenade des Anglais',
            description: 'Iconic seaside walk',
            cost: 0,
            type: 'relax'
          },
          {
            time: '12:00',
            activity: 'Cours Saleya Market',
            description: 'Flower and food market',
            cost: 2000,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Castle Hill viewpoint',
            description: 'Panoramic Riviera views',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Niçoise dinner',
            description: 'Salade Niçoise and ratatouille',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Monaco Day Trip',
        items: [
          {
            time: '09:00',
            activity: 'Monte Carlo Casino',
            description: 'Opulent Belle Époque casino',
            cost: 1700,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Lunch in Monaco harbour',
            description: 'Yacht-lined dining',
            cost: 5000,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Oceanographic Museum',
            description: "Jacques Cousteau's museum",
            cost: 2000,
            type: 'activity'
          },
          {
            time: '19:00',
            activity: 'Return to Nice',
            description: 'Sunset train ride',
            cost: 0,
            type: 'travel'
          }
        ]
      },
      {
        day: 3,
        title: 'Beach & Art',
        items: [
          {
            time: '10:00',
            activity: 'Villefranche-sur-Mer beach',
            description: 'Crystal-clear cove',
            cost: 0,
            type: 'relax'
          },
          {
            time: '14:00',
            activity: 'Matisse Museum',
            description: 'Henri Matisse collection',
            cost: 1000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Seafood on the port',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Tram to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '09:00',
            activity: 'Departure Flight',
            description: 'NCE → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'krakow',
    name: 'Krakow',
    country: 'Poland',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
    description: "Medieval market squares, Wawel Castle, and a vibrant nightlife scene - Poland's cultural heart",
    tags: [
      'Medieval',
      'History',
      'Nightlife',
      'Budget',
      'Culture',
      'Gothic'
    ],
    duration: '4 Days, 3 Nights',
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
    stayVector: { Budget: 0.9, Historic: 0.7, City: 0.8, Cozy: 0.6 },
    breakdown: { flights: 24000, stay: 14000, activities: 15000, transfers: 7000 },
    flights: [
      {
        type: 'departure',
        airline: 'LOT Polish',
        flightNo: 'LO68',
        from: 'DEL',
        to: 'KRK',
        departure: '03:00',
        arrival: '09:30',
        duration: '9h 30m',
        cost: 12000
      },
      {
        type: 'return',
        airline: 'LOT Polish',
        flightNo: 'LO69',
        from: 'KRK',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:30 +1',
        duration: '9h 30m',
        cost: 12000
      }
    ],
    hotel: {
      name: 'Hotel Stary',
      rating: 5,
      location: 'Old Town, Krakow',
      distanceToCenter: '0.1 km',
      totalCost: 14000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      nights: 3
    },
    transfers: [
      { from: 'Krakow Airport', to: 'Hotel', type: 'Train', cost: 500 },
      {
        from: 'Hotel',
        to: 'Wieliczka Salt Mine',
        type: 'Minibus',
        cost: 2000
      },
      { from: 'Hotel', to: 'Airport', type: 'Train', cost: 500 }
    ],
    days: [
      {
        day: 1,
        title: 'Main Square & Wawel',
        items: [
          {
            time: '10:00',
            activity: 'Main Market Square',
            description: "Europe's largest medieval square",
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: "St. Mary's Basilica",
            description: 'Gothic trumpet call hourly',
            cost: 500,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Pierogi lunch',
            description: 'Classic Polish dumplings',
            cost: 1000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Wawel Castle',
            description: 'Polish royal castle',
            cost: 2000,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'History & Salt Mines',
        items: [
          {
            time: '09:00',
            activity: 'Wieliczka Salt Mine',
            description: 'Underground cathedral at 135m depth',
            cost: 3500,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Kazimierz Jewish Quarter',
            description: 'Synagogues and galleries',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Krakow bar crawl',
            description: 'Vodka and cocktail bars',
            cost: 2000,
            type: 'relax'
          }
        ]
      },
      {
        day: 3,
        title: 'Culture & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Oskar Schindler Factory',
            description: 'WWII museum',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Obwarzanek street food',
            description: 'Krakow pretzel and zurek soup',
            cost: 800,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Cloth Hall shopping',
            description: 'Mediaeval market stalls',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Traditional Polish feast',
            cost: 2500,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Train to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'KRK → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80',
    description: "Raw creativity, Cold War history, and Europe's best nightlife in Germany's edgy capital",
    tags: [
      'Nightlife',
      'History',
      'Art',
      'Urban',
      'Alternative',
      'Street Food'
    ],
    duration: '4 Days, 3 Nights',
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
    stayVector: { Budget: 0.7, Urban: 0.9, Trendy: 0.8, Boutique: 0.6 },
    breakdown: { flights: 30000, stay: 18000, activities: 19000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'Lufthansa',
        flightNo: 'LH761',
        from: 'DEL',
        to: 'BER',
        departure: '03:00',
        arrival: '08:00',
        duration: '8h',
        cost: 15000
      },
      {
        type: 'return',
        airline: 'Lufthansa',
        flightNo: 'LH762',
        from: 'BER',
        to: 'DEL',
        departure: '10:00',
        arrival: '00:30 +1',
        duration: '8h 30m',
        cost: 15000
      }
    ],
    hotel: {
      name: 'Hotel Zoo Berlin',
      rating: 4,
      location: 'Kurfürstendamm, Berlin',
      distanceToCenter: '1 km',
      totalCost: 18000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      nights: 3
    },
    transfers: [
      { from: 'BER Airport', to: 'Hotel', type: 'S-Bahn', cost: 500 },
      { from: 'Hotel', to: 'Potsdam', type: 'S-Bahn', cost: 1000 },
      { from: 'Hotel', to: 'Airport', type: 'S-Bahn', cost: 500 }
    ],
    days: [
      {
        day: 1,
        title: 'Wall & History',
        items: [
          {
            time: '10:00',
            activity: 'Brandenburg Gate',
            description: 'Symbol of reunification',
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Holocaust Memorial',
            description: 'Haunting concrete stelae',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Currywurst lunch',
            description: "Berlin's iconic street food",
            cost: 800,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'East Side Gallery',
            description: 'Berlin Wall art mile',
            cost: 0,
            type: 'activity'
          },
          {
            time: '22:00',
            activity: 'Techno club night',
            description: 'Tresor or Watergate',
            cost: 2500,
            type: 'relax'
          }
        ]
      },
      {
        day: 2,
        title: 'Museum Island',
        items: [
          {
            time: '10:00',
            activity: 'Pergamon Museum',
            description: 'Ancient Babylonian gate',
            cost: 1900,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Hackescher Markt lunch',
            description: 'Trendy courtyard dining',
            cost: 2000,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Checkpoint Charlie',
            description: 'Cold War border crossing',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Kreuzberg dinner',
            description: 'Multicultural street food',
            cost: 2000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Alternative Berlin & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Street art tour',
            description: 'Kreuzberg murals',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Markthalle Neun',
            description: 'Street food market',
            cost: 1500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Tempelhofer Feld',
            description: 'Abandoned airport park',
            cost: 0,
            type: 'relax'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Rooftop bar with views',
            cost: 3500,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'S-Bahn to BER',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:00',
            activity: 'Departure Flight',
            description: 'BER → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'riga',
    name: 'Riga',
    country: 'Latvia',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&q=80',
    description: 'Art Nouveau gem of the Baltics - medieval old town meets vibrant Central Market',
    tags: [
      'Art Nouveau',
      'Baltic',
      'Medieval',
      'Budget',
      'Culture',
      'Architecture'
    ],
    duration: '3 Days, 2 Nights',
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
    stayVector: { Budget: 0.9, Historic: 0.6, City: 0.7, Boutique: 0.5 },
    breakdown: { flights: 26000, stay: 12000, activities: 11000, transfers: 6000 },
    flights: [
      {
        type: 'departure',
        airline: 'airBaltic',
        flightNo: 'BT504',
        from: 'DEL',
        to: 'RIX',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 13000
      },
      {
        type: 'return',
        airline: 'airBaltic',
        flightNo: 'BT505',
        from: 'RIX',
        to: 'DEL',
        departure: '10:00',
        arrival: '23:00',
        duration: '10h',
        cost: 13000
      }
    ],
    hotel: {
      name: 'Grand Hotel Kempinski Riga',
      rating: 5,
      location: 'Old Town, Riga',
      distanceToCenter: '0.1 km',
      totalCost: 12000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      { from: 'Riga Airport', to: 'Hotel', type: 'Bus', cost: 400 },
      { from: 'Hotel', to: 'Jurmala', type: 'Train', cost: 500 },
      { from: 'Hotel', to: 'Airport', type: 'Bus', cost: 400 }
    ],
    days: [
      {
        day: 1,
        title: 'Old Town & Art Nouveau',
        items: [
          {
            time: '10:00',
            activity: 'Riga Old Town walk',
            description: 'UNESCO medieval centre',
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Central Market lunch',
            description: 'Zeppelin hangars food market',
            cost: 1000,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Art Nouveau District',
            description: 'Alberta Street facades',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Black Balsam bar',
            description: 'Traditional Latvian liqueur',
            cost: 1500,
            type: 'relax'
          }
        ]
      },
      {
        day: 2,
        title: 'Culture & Farewell',
        items: [
          {
            time: '09:00',
            activity: 'Latvian National Museum of Art',
            description: 'Baltic art collection',
            cost: 800,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Freedom Monument',
            description: 'Latvian independence symbol',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Jurmala Beach excursion',
            description: 'Baltic seaside resort town',
            cost: 1500,
            type: 'relax'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Latvian farm-to-table',
            cost: 2500,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Bus to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:00',
            activity: 'Departure Flight',
            description: 'RIX → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'split',
    name: 'Split',
    country: 'Croatia',
    image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&q=80',
    description: "Diocletian's Palace meets crystal-clear Adriatic - Croatia's Mediterranean gateway",
    tags: [
      'Beach',
      'Ancient',
      'Mediterranean',
      'Coastal',
      'Sailing',
      'Sun'
    ],
    duration: '4 Days, 3 Nights',
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
    stayVector: { Sea_view: 0.8, Boutique: 0.7, Budget: 0.7, Central: 0.7 },
    breakdown: { flights: 30000, stay: 18000, activities: 16000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'Croatia Airlines',
        flightNo: 'OU481',
        from: 'DEL',
        to: 'SPU',
        departure: '23:00',
        arrival: '08:00 +1',
        duration: '12h',
        cost: 15000
      },
      {
        type: 'return',
        airline: 'Croatia Airlines',
        flightNo: 'OU482',
        from: 'SPU',
        to: 'DEL',
        departure: '10:00',
        arrival: '01:00 +1',
        duration: '12h',
        cost: 15000
      }
    ],
    hotel: {
      name: 'Hotel Luxe Split',
      rating: 4,
      location: 'Old Town, Split',
      distanceToCenter: '0.2 km',
      totalCost: 18000,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80',
      nights: 3
    },
    transfers: [
      { from: 'Split Airport', to: 'Hotel', type: 'Bus', cost: 800 },
      { from: 'Hotel', to: 'Hvar', type: 'Catamaran', cost: 3000 },
      { from: 'Hotel', to: 'Airport', type: 'Bus', cost: 800 }
    ],
    days: [
      {
        day: 1,
        title: "Diocletian's Palace",
        items: [
          {
            time: '10:00',
            activity: "Diocletian's Palace",
            description: "Roman emperor's retirement villa",
            cost: 1500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Lunch at Uje Oil Bar',
            description: 'Dalmatian olive oil tasting',
            cost: 2000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Riva Promenade',
            description: 'Waterfront café stroll',
            cost: 0,
            type: 'relax'
          },
          {
            time: '20:00',
            activity: 'Seafood dinner',
            description: 'Grilled Adriatic fish',
            cost: 3000,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Islands & Sea',
        items: [
          {
            time: '08:00',
            activity: 'Blue Lagoon boat trip',
            description: 'Crystal-clear swimming',
            cost: 4000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Hvar Town visit',
            description: 'Lavender island',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Harbour dinner',
            description: 'Fresh catch dining',
            cost: 3000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Beaches & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Bacvice Beach',
            description: 'Sandy city beach',
            cost: 0,
            type: 'relax'
          },
          {
            time: '14:00',
            activity: 'Marjan Hill hike',
            description: 'Forest hill overlooking the sea',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Peka lamb under a bell',
            cost: 3500,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Bus to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:00',
            activity: 'Departure Flight',
            description: 'SPU → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'venice',
    name: 'Venice',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80',
    description: 'A floating city of gondolas, Byzantine mosaics, and timeless romance on the lagoon',
    tags: [
      'Romance',
      'Gondolas',
      'Architecture',
      'Art',
      'Unique',
      'Historic'
    ],
    duration: '4 Days, 3 Nights',
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
    stayVector: { Luxury: 0.8, Boutique: 0.8, Romantic: 0.9, Historic: 0.8 },
    breakdown: {
      flights: 42000,
      stay: 45000,
      activities: 28000,
      transfers: 10000
    },
    flights: [
      {
        type: 'departure',
        airline: 'Alitalia',
        flightNo: 'AZ590',
        from: 'DEL',
        to: 'VCE',
        departure: '02:00',
        arrival: '08:00',
        duration: '9h',
        cost: 21000
      },
      {
        type: 'return',
        airline: 'Alitalia',
        flightNo: 'AZ591',
        from: 'VCE',
        to: 'DEL',
        departure: '10:00',
        arrival: '23:00',
        duration: '9h',
        cost: 21000
      }
    ],
    hotel: {
      name: 'Hotel Danieli',
      rating: 5,
      location: 'Riva degli Schiavoni, Venice',
      distanceToCenter: '0.2 km',
      totalCost: 45000,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Marco Polo Airport',
        to: 'Hotel',
        type: 'Water Taxi',
        cost: 4000
      },
      {
        from: 'Hotel',
        to: 'Murano/Burano',
        type: 'Vaporetto',
        cost: 2000
      },
      { from: 'Hotel', to: 'Airport', type: 'Water Taxi', cost: 4000 }
    ],
    days: [
      {
        day: 1,
        title: 'San Marco & Gondola',
        items: [
          {
            time: '10:00',
            activity: "St. Mark's Basilica",
            description: 'Byzantine golden mosaics',
            cost: 500,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: "Doge's Palace",
            description: 'Gothic masterpiece',
            cost: 2500,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Cicchetti lunch',
            description: 'Venetian tapas bars',
            cost: 2000,
            type: 'food'
          },
          {
            time: '17:00',
            activity: 'Gondola ride',
            description: 'Classic Venice experience',
            cost: 8000,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Islands of the Lagoon',
        items: [
          {
            time: '09:00',
            activity: 'Murano glass-blowing',
            description: 'Centuries-old craft',
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Burano lace island',
            description: 'Rainbow-coloured houses',
            cost: 0,
            type: 'activity'
          },
          {
            time: '15:00',
            activity: 'Torcello',
            description: 'Ancient Byzantine church',
            cost: 500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Rialto Bridge dinner',
            description: 'Grand Canal views',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Hidden Venice & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Dorsoduro art walk',
            description: 'Peggy Guggenheim Collection',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Campo Santa Margherita',
            description: 'Local student piazza',
            cost: 1500,
            type: 'food'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Lagoon-fresh seafood risotto',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Water taxi to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:00',
            activity: 'Departure Flight',
            description: 'VCE → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'madrid',
    name: 'Madrid',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
    description: "Spain's vibrant capital - world-class art, late-night tapas, and royal grandeur",
    tags: [ 'Art', 'Nightlife', 'Food', 'Royal', 'Culture', 'Urban' ],
    duration: '4 Days, 3 Nights',
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
    stayVector: { City: 0.8, Boutique: 0.7, Stylish: 0.7, Central: 0.8 },
    breakdown: { flights: 34000, stay: 25000, activities: 21000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'Iberia',
        flightNo: 'IB6904',
        from: 'DEL',
        to: 'MAD',
        departure: '22:00',
        arrival: '05:30 +1',
        duration: '10h 30m',
        cost: 17000
      },
      {
        type: 'return',
        airline: 'Iberia',
        flightNo: 'IB6905',
        from: 'MAD',
        to: 'DEL',
        departure: '12:00',
        arrival: '02:00 +1',
        duration: '10h',
        cost: 17000
      }
    ],
    hotel: {
      name: 'The Westin Palace Madrid',
      rating: 5,
      location: 'Art Triangle, Madrid',
      distanceToCenter: '0.2 km',
      totalCost: 25000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Madrid Barajas Airport',
        to: 'Hotel',
        type: 'Metro',
        cost: 600
      },
      { from: 'Hotel', to: 'Toledo', type: 'AVE Train', cost: 3000 },
      { from: 'Hotel', to: 'Airport', type: 'Metro', cost: 600 }
    ],
    days: [
      {
        day: 1,
        title: 'Art Triangle',
        items: [
          {
            time: '10:00',
            activity: 'Museo del Prado',
            description: 'Velázquez, Goya, El Greco',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Mercado de San Miguel',
            description: 'Gourmet tapas market',
            cost: 3000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Reina Sofía',
            description: "Picasso's Guernica",
            cost: 1200,
            type: 'activity'
          },
          {
            time: '22:00',
            activity: 'Late-night tapas crawl',
            description: 'La Latina neighbourhood',
            cost: 3000,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Royal Madrid',
        items: [
          {
            time: '10:00',
            activity: 'Royal Palace',
            description: "Europe's largest royal palace",
            cost: 1500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Retiro Park',
            description: 'Crystal Palace and lake',
            cost: 0,
            type: 'relax'
          },
          {
            time: '16:00',
            activity: 'Gran Vía shopping',
            description: "Madrid's Broadway",
            cost: 2000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Flamenco & dinner',
            description: 'Corral de la Morería',
            cost: 5000,
            type: 'activity'
          }
        ]
      },
      {
        day: 3,
        title: 'Day Trip & Farewell',
        items: [
          {
            time: '09:00',
            activity: 'Toledo Day Trip',
            description: 'City of Three Cultures',
            cost: 3000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Toledo lunch',
            description: 'Carcamusas stew',
            cost: 2000,
            type: 'food'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Churros and chocolate',
            cost: 2500,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '09:00',
            activity: 'Checkout',
            description: 'Metro to Barajas',
            cost: 0,
            type: 'travel'
          },
          {
            time: '12:00',
            activity: 'Departure Flight',
            description: 'MAD → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'warsaw',
    name: 'Warsaw',
    country: 'Poland',
    image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=800&q=80',
    description: 'Phoenix city risen from the ashes - cutting-edge culture meets reconstructed Old Town',
    tags: [ 'History', 'Modern', 'Budget', 'Culture', 'Resilient', 'Urban' ],
    duration: '3 Days, 2 Nights',
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
    stayVector: { Budget: 0.9, City: 0.8, Modern: 0.6, Boutique: 0.5 },
    breakdown: { flights: 24000, stay: 10000, activities: 12000, transfers: 6000 },
    flights: [
      {
        type: 'departure',
        airline: 'LOT Polish',
        flightNo: 'LO66',
        from: 'DEL',
        to: 'WAW',
        departure: '02:00',
        arrival: '08:00',
        duration: '9h',
        cost: 12000
      },
      {
        type: 'return',
        airline: 'LOT Polish',
        flightNo: 'LO67',
        from: 'WAW',
        to: 'DEL',
        departure: '10:00',
        arrival: '23:00',
        duration: '9h',
        cost: 12000
      }
    ],
    hotel: {
      name: 'Hotel Bristol Warsaw',
      rating: 5,
      location: 'Krakowskie Przedmieście',
      distanceToCenter: '0.1 km',
      totalCost: 10000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      nights: 2
    },
    transfers: [
      { from: 'Chopin Airport', to: 'Hotel', type: 'Bus', cost: 400 },
      { from: 'Hotel', to: 'Airport', type: 'Bus', cost: 400 }
    ],
    days: [
      {
        day: 1,
        title: 'Old Town & History',
        items: [
          {
            time: '10:00',
            activity: 'Old Town Market Square',
            description: 'Meticulously rebuilt UNESCO site',
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Pierogi lunch',
            description: 'Polish dumpling house',
            cost: 800,
            type: 'food'
          },
          {
            time: '14:00',
            activity: 'Warsaw Uprising Museum',
            description: '1944 resistance history',
            cost: 1000,
            type: 'activity'
          },
          {
            time: '19:00',
            activity: 'Chopin concert',
            description: 'Piano recital in Old Town',
            cost: 2000,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Modern Warsaw & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Palace of Culture viewpoint',
            description: 'Soviet-era tower panorama',
            cost: 1000,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Hala Koszyki food hall',
            description: 'Modern food court',
            cost: 1500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Łazienki Park',
            description: 'Royal palace in the park',
            cost: 500,
            type: 'relax'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Modern Polish cuisine',
            cost: 2500,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Bus to Chopin Airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:00',
            activity: 'Departure Flight',
            description: 'WAW → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'oslo',
    name: 'Oslo',
    country: 'Norway',
    image: 'https://images.unsplash.com/photo-1513519245288-fdf0b3ce7491?w=800&q=80',
    description: "Norway's coastal capital - Viking ships, fjord views, and the world's greatest sculpture park",
    tags: [
      'Nordic',
      'Nature',
      'Museums',
      'Fjords',
      'Sustainable',
      'Modern'
    ],
    duration: '4 Days, 3 Nights',
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
    stayVector: { Design: 0.8, Eco: 0.8, City: 0.7, Boutique: 0.6 },
    breakdown: {
      flights: 48000,
      stay: 40000,
      activities: 27000,
      transfers: 10000
    },
    flights: [
      {
        type: 'departure',
        airline: 'Norwegian Air',
        flightNo: 'DY1105',
        from: 'DEL',
        to: 'OSL',
        departure: '01:00',
        arrival: '07:30',
        duration: '9h 30m',
        cost: 24000
      },
      {
        type: 'return',
        airline: 'Norwegian Air',
        flightNo: 'DY1106',
        from: 'OSL',
        to: 'DEL',
        departure: '10:00',
        arrival: '00:30 +1',
        duration: '9h 30m',
        cost: 24000
      }
    ],
    hotel: {
      name: 'The Thief Hotel',
      rating: 5,
      location: 'Tjuvholmen, Oslo',
      distanceToCenter: '1 km',
      totalCost: 40000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Oslo Airport',
        to: 'Hotel',
        type: 'Flytoget Express',
        cost: 3000
      },
      {
        from: 'Hotel',
        to: 'Airport',
        type: 'Flytoget Express',
        cost: 3000
      }
    ],
    days: [
      {
        day: 1,
        title: 'Viking & Munch',
        items: [
          {
            time: '10:00',
            activity: 'Viking Ship Museum',
            description: '1,000-year-old Viking vessels',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Norwegian lunch',
            description: 'Smoked salmon open-face',
            cost: 3000,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'MUNCH Museum',
            description: 'Edvard Munchs The Scream',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '19:00',
            activity: 'Aker Brygge dinner',
            description: 'Harbourfront dining',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Sculpture & Nature',
        items: [
          {
            time: '09:00',
            activity: 'Vigeland Sculpture Park',
            description: '212 granite and bronze works',
            cost: 0,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Mathallen food hall',
            description: 'Oslos premier food market',
            cost: 3000,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Oslo Opera House',
            description: 'Walk on the marble roof',
            cost: 0,
            type: 'activity'
          },
          {
            time: '19:00',
            activity: 'Grünerløkka bars',
            description: 'Trendy neighbourhood',
            cost: 3000,
            type: 'relax'
          }
        ]
      },
      {
        day: 3,
        title: 'Fjord & Farewell',
        items: [
          {
            time: '09:00',
            activity: 'Oslofjord boat cruise',
            description: 'Island-hopping cruise',
            cost: 4000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Holmenkollen Ski Jump',
            description: 'Panoramic city views',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'New Nordic cuisine',
            cost: 6000,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Flytoget to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:00',
            activity: 'Departure Flight',
            description: 'OSL → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'milan',
    name: 'Milan',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1520440229-6469cfa21b70?w=800&q=80',
    description: "Fashion capital of the world - from Da Vinci's Last Supper to Armani boutiques",
    tags: [ 'Fashion', 'Design', 'Art', 'Shopping', 'Culture', 'Modern' ],
    duration: '4 Days, 3 Nights',
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
    stayVector: { Luxury: 0.8, Design: 0.9, City: 0.8, Stylish: 0.9 },
    breakdown: { flights: 38000, stay: 35000, activities: 24000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'Alitalia',
        flightNo: 'AZ769',
        from: 'DEL',
        to: 'MXP',
        departure: '02:00',
        arrival: '07:30',
        duration: '9h 30m',
        cost: 19000
      },
      {
        type: 'return',
        airline: 'Alitalia',
        flightNo: 'AZ770',
        from: 'MXP',
        to: 'DEL',
        departure: '10:00',
        arrival: '00:30 +1',
        duration: '9h 30m',
        cost: 19000
      }
    ],
    hotel: {
      name: 'Armani Hotel Milano',
      rating: 5,
      location: 'Quadrilatero della Moda',
      distanceToCenter: '0.2 km',
      totalCost: 35000,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Malpensa Airport',
        to: 'Hotel',
        type: 'Malpensa Express',
        cost: 2000
      },
      { from: 'Hotel', to: 'Lake Como', type: 'Train', cost: 2000 },
      {
        from: 'Hotel',
        to: 'Airport',
        type: 'Malpensa Express',
        cost: 2000
      }
    ],
    days: [
      {
        day: 1,
        title: 'Duomo & Fashion',
        items: [
          {
            time: '09:00',
            activity: 'Milan Cathedral',
            description: 'Gothic marble masterpiece',
            cost: 1600,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Galleria Vittorio Emanuele II',
            description: 'Luxurious shopping arcade',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Risotto alla Milanese lunch',
            description: 'Saffron risotto',
            cost: 3000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Quadrilatero della Moda',
            description: 'Fashion district shopping',
            cost: 3000,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Art & Culture',
        items: [
          {
            time: '09:00',
            activity: 'The Last Supper',
            description: "Da Vinci's masterpiece",
            cost: 1500,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Navigli lunch',
            description: 'Canal district dining',
            cost: 2500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'La Scala Opera House tour',
            description: 'World-famous opera theatre',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Aperitivo in Brera',
            description: 'Italian aperitif culture',
            cost: 2500,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Lake Como & Farewell',
        items: [
          {
            time: '08:00',
            activity: 'Lake Como day trip',
            description: 'Villa Bellagio cruise',
            cost: 5000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Lakeside lunch',
            description: 'Fresh lake fish',
            cost: 3000,
            type: 'food'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Milanese osso buco',
            cost: 4500,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Malpensa Express to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:00',
            activity: 'Departure Flight',
            description: 'MXP → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'geneva',
    name: 'Geneva',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&q=80',
    description: "Jet d'Eau fountain, Mont Blanc views, and the world capital of diplomacy and watches",
    tags: [
      'Lake',
      'Mountains',
      'Luxury',
      'Watches',
      'International',
      'Scenic'
    ],
    duration: '3 Days, 2 Nights',
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
    stayVector: { Luxury: 0.95, Scenic: 0.9, Premium: 0.9, Lake_view: 0.8 },
    breakdown: {
      flights: 50000,
      stay: 45000,
      activities: 25000,
      transfers: 10000
    },
    flights: [
      {
        type: 'departure',
        airline: 'Swiss',
        flightNo: 'LX149',
        from: 'DEL',
        to: 'GVA',
        departure: '23:30',
        arrival: '05:00 +1',
        duration: '8h 30m',
        cost: 25000
      },
      {
        type: 'return',
        airline: 'Swiss',
        flightNo: 'LX150',
        from: 'GVA',
        to: 'DEL',
        departure: '13:00',
        arrival: '01:30 +1',
        duration: '8h 30m',
        cost: 25000
      }
    ],
    hotel: {
      name: 'Hotel Beau-Rivage Geneva',
      rating: 5,
      location: 'Lake Geneva waterfront',
      distanceToCenter: '0.3 km',
      totalCost: 45000,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
      nights: 2
    },
    transfers: [
      { from: 'Geneva Airport', to: 'Hotel', type: 'Train', cost: 500 },
      { from: 'Hotel', to: 'Chamonix', type: 'Bus', cost: 4000 },
      { from: 'Hotel', to: 'Airport', type: 'Train', cost: 500 }
    ],
    days: [
      {
        day: 1,
        title: 'Lake & Old Town',
        items: [
          {
            time: '10:00',
            activity: "Jet d'Eau fountain",
            description: 'Iconic 140m water jet',
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Old Town walk',
            description: 'St. Pierre Cathedral',
            cost: 500,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Swiss fondue lunch',
            description: 'Cheese fondue by the lake',
            cost: 4000,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'CERN Science Centre',
            description: 'Particle physics exhibition',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Lakeside dinner',
            description: 'Fine French-Swiss cuisine',
            cost: 6000,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Chamonix & Mont Blanc',
        items: [
          {
            time: '08:00',
            activity: 'Chamonix day trip',
            description: 'Cable car to Mont Blanc views',
            cost: 6000,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Alpine lunch',
            description: 'Mountain chalet dining',
            cost: 4000,
            type: 'food'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Gourmet Swiss dining',
            cost: 6000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '09:00',
            activity: 'Checkout',
            description: 'Train to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '13:00',
            activity: 'Departure Flight',
            description: 'GVA → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'brussels',
    name: 'Brussels',
    country: 'Belgium',
    image: 'https://images.unsplash.com/photo-1559113202-c916b8e44373?w=800&q=80',
    description: 'EU capital with stunning Grand Place, Belgian chocolate, waffles, and world-class beer',
    tags: [ 'Chocolate', 'Beer', 'Art Nouveau', 'EU', 'Culture', 'Food' ],
    duration: '3 Days, 2 Nights',
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
    stayVector: { City: 0.8, Boutique: 0.6, Central: 0.8, Budget: 0.6 },
    breakdown: { flights: 32000, stay: 20000, activities: 15000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'Brussels Airlines',
        flightNo: 'SN560',
        from: 'DEL',
        to: 'BRU',
        departure: '22:00',
        arrival: '05:00 +1',
        duration: '10h',
        cost: 16000
      },
      {
        type: 'return',
        airline: 'Brussels Airlines',
        flightNo: 'SN561',
        from: 'BRU',
        to: 'DEL',
        departure: '10:30',
        arrival: '00:30 +1',
        duration: '10h',
        cost: 16000
      }
    ],
    hotel: {
      name: 'Hotel Amigo Brussels',
      rating: 5,
      location: 'Grand Place, Brussels',
      distanceToCenter: '0.1 km',
      totalCost: 20000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Brussels Airport',
        to: 'Hotel',
        type: 'Train',
        cost: 1500
      },
      { from: 'Hotel', to: 'Airport', type: 'Train', cost: 1500 }
    ],
    days: [
      {
        day: 1,
        title: 'Grand Place & Chocolate',
        items: [
          {
            time: '10:00',
            activity: 'Grand Place',
            description: 'UNESCO gilded square',
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Moules-frites lunch',
            description: 'Belgian mussel classic',
            cost: 2500,
            type: 'food'
          },
          {
            time: '14:00',
            activity: 'Belgian Chocolate tour',
            description: 'Pierre Marcolini tasting',
            cost: 2000,
            type: 'activity'
          },
          {
            time: '17:00',
            activity: 'Manneken Pis',
            description: 'Iconic peeing boy statue',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Belgian beer tasting',
            description: 'Delirium Café',
            cost: 2500,
            type: 'relax'
          }
        ]
      },
      {
        day: 2,
        title: 'Art & Waffles',
        items: [
          {
            time: '10:00',
            activity: 'Magritte Museum',
            description: 'Surrealist masterpieces',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Liège waffle',
            description: 'Authentic street waffle',
            cost: 500,
            type: 'food'
          },
          {
            time: '14:00',
            activity: 'Atomium',
            description: 'Iconic 1958 Expo monument',
            cost: 1600,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Traditional waterzooi stew',
            cost: 3500,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Train to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:30',
            activity: 'Departure Flight',
            description: 'BRU → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'vilnius',
    name: 'Vilnius',
    country: 'Lithuania',
    image: 'https://images.unsplash.com/photo-1573158770290-e4e9ed6d7f49?w=800&q=80',
    description: 'Baroque jewel of the Baltics - cobblestone lanes, hilltop castles, and a bohemian spirit',
    tags: [ 'Baroque', 'Baltic', 'Budget', 'Art', 'Bohemian', 'Heritage' ],
    duration: '3 Days, 2 Nights',
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
    stayVector: { Budget: 0.95, Boutique: 0.5, Historic: 0.6, Cozy: 0.6 },
    breakdown: { flights: 24000, stay: 8000, activities: 10000, transfers: 6000 },
    flights: [
      {
        type: 'departure',
        airline: 'Turkish Airlines',
        flightNo: 'TK780',
        from: 'DEL',
        to: 'VNO',
        departure: '02:00',
        arrival: '10:00',
        duration: '11h',
        cost: 12000
      },
      {
        type: 'return',
        airline: 'Turkish Airlines',
        flightNo: 'TK781',
        from: 'VNO',
        to: 'DEL',
        departure: '11:00',
        arrival: '02:00 +1',
        duration: '11h',
        cost: 12000
      }
    ],
    hotel: {
      name: 'Hotel Pacai',
      rating: 5,
      location: 'Old Town, Vilnius',
      distanceToCenter: '0.1 km',
      totalCost: 8000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      nights: 2
    },
    transfers: [
      { from: 'Vilnius Airport', to: 'Hotel', type: 'Bus', cost: 300 },
      { from: 'Hotel', to: 'Trakai', type: 'Bus', cost: 800 },
      { from: 'Hotel', to: 'Airport', type: 'Bus', cost: 300 }
    ],
    days: [
      {
        day: 1,
        title: 'Old Town & Castles',
        items: [
          {
            time: '10:00',
            activity: 'Gediminas Tower',
            description: 'Hilltop castle panorama',
            cost: 600,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Vilnius Cathedral',
            description: 'Neoclassical landmark',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Lithuanian cepelinai lunch',
            description: 'Potato dumplings',
            cost: 600,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Užupis Republic',
            description: 'Bohemian artist quarter',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Craft beer bars',
            description: 'Lithuanian craft scene',
            cost: 1500,
            type: 'relax'
          }
        ]
      },
      {
        day: 2,
        title: 'Trakai & Farewell',
        items: [
          {
            time: '09:00',
            activity: 'Trakai Island Castle',
            description: 'Medieval lake castle day trip',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Kibinai lunch',
            description: 'Karaite pastries at Trakai',
            cost: 800,
            type: 'food'
          },
          {
            time: '17:00',
            activity: 'Gates of Dawn',
            description: 'Sacred religious icon',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Modern Lithuanian cuisine',
            cost: 2000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Bus to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'VNO → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'lyon',
    name: 'Lyon',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1524397057410-1e775ed476f3?w=800&q=80',
    description: 'Gastronomic capital of France - silk traditions, traboules, and Michelin-star density',
    tags: [ 'Gastronomy', 'Culture', 'History', 'Wine', 'Food', 'UNESCO' ],
    duration: '3 Days, 2 Nights',
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
    stayVector: { Boutique: 0.7, City: 0.7, Stylish: 0.6, Central: 0.7 },
    breakdown: { flights: 36000, stay: 22000, activities: 19000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'Air France',
        flightNo: 'AF342',
        from: 'DEL',
        to: 'LYS',
        departure: '23:00',
        arrival: '06:00 +1',
        duration: '10h',
        cost: 18000
      },
      {
        type: 'return',
        airline: 'Air France',
        flightNo: 'AF343',
        from: 'LYS',
        to: 'DEL',
        departure: '09:00',
        arrival: '22:00',
        duration: '10h',
        cost: 18000
      }
    ],
    hotel: {
      name: 'Cour des Loges',
      rating: 5,
      location: 'Vieux Lyon',
      distanceToCenter: '0.2 km',
      totalCost: 22000,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Lyon Airport',
        to: 'Hotel',
        type: 'Rhonexpress',
        cost: 2000
      },
      { from: 'Hotel', to: 'Beaujolais', type: 'Tour Bus', cost: 4000 },
      { from: 'Hotel', to: 'Airport', type: 'Rhonexpress', cost: 2000 }
    ],
    days: [
      {
        day: 1,
        title: 'Bouchon Crawl',
        items: [
          {
            time: '09:00',
            activity: 'Vieux Lyon traboules',
            description: 'Hidden Renaissance passageways',
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Bouchon Lyonnais lunch',
            description: 'Quenelles and andouillette',
            cost: 3000,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Basilica of Notre-Dame de Fourvière',
            description: 'Hilltop basilica views',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Les Halles de Lyon Paul Bocuse',
            description: 'Gourmet food market dinner',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Wine & Farewell',
        items: [
          {
            time: '09:00',
            activity: 'Beaujolais wine tour',
            description: 'Vineyard tasting half-day',
            cost: 5000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: "Presqu'ile shopping",
            description: "Lyon's peninsula",
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Michelin dining experience',
            cost: 6000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '06:00',
            activity: 'Checkout',
            description: 'Rhonexpress to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '09:00',
            activity: 'Departure Flight',
            description: 'LYS → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'bucharest',
    name: 'Bucharest',
    country: 'Romania',
    image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0748b1?w=800&q=80',
    description: 'Little Paris of the East - grand boulevards, Ottoman churches, and Dracula legends',
    tags: [
      'History',
      'Budget',
      'Architecture',
      'Nightlife',
      'Eclectic',
      'Cultural'
    ],
    duration: '3 Days, 2 Nights',
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
    stayVector: { Budget: 0.95, City: 0.7, Boutique: 0.5, Central: 0.7 },
    breakdown: { flights: 22000, stay: 10000, activities: 12000, transfers: 6000 },
    flights: [
      {
        type: 'departure',
        airline: 'Turkish Airlines',
        flightNo: 'TK790',
        from: 'DEL',
        to: 'OTP',
        departure: '03:00',
        arrival: '10:00',
        duration: '10h',
        cost: 11000
      },
      {
        type: 'return',
        airline: 'Turkish Airlines',
        flightNo: 'TK791',
        from: 'OTP',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 11000
      }
    ],
    hotel: {
      name: 'Hotel Epoque Bucharest',
      rating: 5,
      location: 'Old Town, Bucharest',
      distanceToCenter: '0.5 km',
      totalCost: 10000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Otopeni Airport',
        to: 'Hotel',
        type: 'Express Bus',
        cost: 500
      },
      { from: 'Hotel', to: 'Airport', type: 'Express Bus', cost: 500 }
    ],
    days: [
      {
        day: 1,
        title: 'Palaces & Old Town',
        items: [
          {
            time: '10:00',
            activity: 'Palace of the Parliament',
            description: "World's heaviest building",
            cost: 1500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Romanian lunch',
            description: 'Sarmale and mămăligă',
            cost: 800,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Old Town walk',
            description: 'Lipscani historical centre',
            cost: 0,
            type: 'activity'
          },
          {
            time: '21:00',
            activity: 'Old Town nightlife',
            description: 'Craft bars and clubs',
            cost: 2000,
            type: 'relax'
          }
        ]
      },
      {
        day: 2,
        title: 'Villages & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Village Museum',
            description: 'Open-air traditional houses',
            cost: 500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Mici street food',
            description: 'Romanian grilled rolls',
            cost: 500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Romanian Athenaeum',
            description: 'Neoclassical concert hall',
            cost: 800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Modern Romanian cuisine',
            cost: 2000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Bus to Otopeni',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'OTP → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'valletta',
    name: 'Valletta',
    country: 'Malta',
    image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&q=80',
    description: 'A fortified Mediterranean gem - Knights of Malta, azure grottoes, and ancient temples',
    tags: [
      'Mediterranean',
      'History',
      'Knights',
      'Beach',
      'Heritage',
      'Sun'
    ],
    duration: '4 Days, 3 Nights',
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
    stayVector: { Boutique: 0.7, Historic: 0.8, Budget: 0.7, Sea_view: 0.6 },
    breakdown: { flights: 28000, stay: 16000, activities: 14000, transfers: 7000 },
    flights: [
      {
        type: 'departure',
        airline: 'Air Malta',
        flightNo: 'KM101',
        from: 'DEL',
        to: 'MLA',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 14000
      },
      {
        type: 'return',
        airline: 'Air Malta',
        flightNo: 'KM102',
        from: 'MLA',
        to: 'DEL',
        departure: '10:00',
        arrival: '23:00',
        duration: '10h',
        cost: 14000
      }
    ],
    hotel: {
      name: 'The Phoenicia Malta',
      rating: 5,
      location: 'City Gate, Valletta',
      distanceToCenter: '0.1 km',
      totalCost: 16000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 3
    },
    transfers: [
      { from: 'Malta Airport', to: 'Hotel', type: 'Bus', cost: 500 },
      { from: 'Hotel', to: 'Gozo', type: 'Ferry', cost: 2500 },
      { from: 'Hotel', to: 'Airport', type: 'Bus', cost: 500 }
    ],
    days: [
      {
        day: 1,
        title: 'Knights & Cathedrals',
        items: [
          {
            time: '10:00',
            activity: "St. John's Co-Cathedral",
            description: "Caravaggio's masterpiece",
            cost: 1500,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Upper Barrakka Gardens',
            description: 'Grand Harbour panorama',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Pastizzi lunch',
            description: 'Maltese ricotta pastry',
            cost: 500,
            type: 'food'
          },
          {
            time: '17:00',
            activity: 'Mdina Old Capital',
            description: 'Silent city walls',
            cost: 0,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Blue Grotto & Temples',
        items: [
          {
            time: '09:00',
            activity: 'Blue Grotto boat trip',
            description: 'Azure sea caves',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Hagar Qim Temples',
            description: '5,000-year-old megalithic temples',
            cost: 1000,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Marsaxlokk fish market',
            description: 'Colourful fishing village',
            cost: 1500,
            type: 'food'
          },
          {
            time: '20:00',
            activity: 'Harbour dinner',
            description: 'Fresh swordfish',
            cost: 3000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Gozo Island & Farewell',
        items: [
          {
            time: '08:00',
            activity: 'Gozo Island trip',
            description: 'Citadella fortress and beaches',
            cost: 2500,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Gozo ftira sandwich',
            description: 'Traditional flatbread',
            cost: 500,
            type: 'food'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Rabbit stew and local wine',
            cost: 2500,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Bus to Malta Airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:00',
            activity: 'Departure Flight',
            description: 'MLA → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'sofia',
    name: 'Sofia',
    country: 'Bulgaria',
    image: 'https://images.unsplash.com/photo-1561631918-0e0d6af260af?w=800&q=80',
    description: 'An underrated gem - Roman ruins, Ottoman mosques, and Vitosha Mountain on the doorstep',
    tags: [
      'Budget',
      'Mountains',
      'History',
      'Thermal',
      'Culture',
      'Hidden Gem'
    ],
    duration: '3 Days, 2 Nights',
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
    stayVector: { Budget: 0.95, City: 0.7, Boutique: 0.4, Central: 0.7 },
    breakdown: { flights: 20000, stay: 8000, activities: 11000, transfers: 6000 },
    flights: [
      {
        type: 'departure',
        airline: 'Turkish Airlines',
        flightNo: 'TK800',
        from: 'DEL',
        to: 'SOF',
        departure: '03:00',
        arrival: '10:00',
        duration: '9h',
        cost: 10000
      },
      {
        type: 'return',
        airline: 'Turkish Airlines',
        flightNo: 'TK801',
        from: 'SOF',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '9h',
        cost: 10000
      }
    ],
    hotel: {
      name: 'Sense Hotel Sofia',
      rating: 4,
      location: 'City Centre, Sofia',
      distanceToCenter: '0.2 km',
      totalCost: 8000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      nights: 2
    },
    transfers: [
      { from: 'Sofia Airport', to: 'Hotel', type: 'Metro', cost: 200 },
      { from: 'Hotel', to: 'Vitosha', type: 'Bus', cost: 500 },
      { from: 'Hotel', to: 'Airport', type: 'Metro', cost: 200 }
    ],
    days: [
      {
        day: 1,
        title: 'Ancient & Ottoman',
        items: [
          {
            time: '10:00',
            activity: 'Alexander Nevsky Cathedral',
            description: 'Iconic gold-domed church',
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Shopska salad lunch',
            description: "Bulgaria's national salad",
            cost: 500,
            type: 'food'
          },
          {
            time: '14:00',
            activity: 'Roman Serdica ruins',
            description: 'Ancient Roman city underground',
            cost: 0,
            type: 'activity'
          },
          {
            time: '16:00',
            activity: 'Banya Bashi Mosque',
            description: 'Ottoman thermal mosque',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Rakija bar evening',
            description: 'Bulgarian brandy tasting',
            cost: 1200,
            type: 'relax'
          }
        ]
      },
      {
        day: 2,
        title: 'Vitosha & Farewell',
        items: [
          {
            time: '09:00',
            activity: 'Vitosha Mountain hike',
            description: 'Ski resort in winter, trails in summer',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Banitsa pastry lunch',
            description: 'Flaky cheese pastry',
            cost: 500,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Central Mineral Baths',
            description: 'Ottoman-era thermal baths',
            cost: 1000,
            type: 'relax'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Traditional mehana tavern',
            cost: 1500,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Metro to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'SOF → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'ljubljana',
    name: 'Ljubljana',
    country: 'Slovenia',
    image: 'https://images.unsplash.com/photo-1569347043882-6088c95e914d?w=800&q=80',
    description: "Europe's greenest capital - dragon bridges, riverside cafés, and Lake Bled nearby",
    tags: [
      'Green',
      'Charming',
      'Nature',
      'Lake',
      'Sustainable',
      'Peaceful'
    ],
    duration: '3 Days, 2 Nights',
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
    stayVector: { Boutique: 0.8, Eco: 0.8, Cozy: 0.7, Central: 0.7 },
    breakdown: { flights: 26000, stay: 12000, activities: 14000, transfers: 6000 },
    flights: [
      {
        type: 'departure',
        airline: 'Turkish Airlines',
        flightNo: 'TK810',
        from: 'DEL',
        to: 'LJU',
        departure: '03:00',
        arrival: '10:00',
        duration: '10h',
        cost: 13000
      },
      {
        type: 'return',
        airline: 'Turkish Airlines',
        flightNo: 'TK811',
        from: 'LJU',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:30 +1',
        duration: '10h 30m',
        cost: 13000
      }
    ],
    hotel: {
      name: 'Hotel Lev Ljubljana',
      rating: 4,
      location: 'City Centre, Ljubljana',
      distanceToCenter: '0.3 km',
      totalCost: 12000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Ljubljana Airport',
        to: 'Hotel',
        type: 'Bus',
        cost: 500
      },
      { from: 'Hotel', to: 'Lake Bled', type: 'Bus', cost: 1500 },
      { from: 'Hotel', to: 'Airport', type: 'Bus', cost: 500 }
    ],
    days: [
      {
        day: 1,
        title: 'Old Town & Castle',
        items: [
          {
            time: '10:00',
            activity: 'Ljubljana Castle',
            description: 'Funicular to hilltop fortress',
            cost: 1300,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Dragon Bridge',
            description: 'Art Nouveau dragon statues',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Slovenian lunch',
            description: 'Štruklji and potica',
            cost: 1200,
            type: 'food'
          },
          {
            time: '17:00',
            activity: 'Riverside cafe stroll',
            description: 'Plečnik promenade',
            cost: 1000,
            type: 'relax'
          }
        ]
      },
      {
        day: 2,
        title: 'Lake Bled & Farewell',
        items: [
          {
            time: '08:00',
            activity: 'Lake Bled day trip',
            description: 'Island church and cream cake',
            cost: 3000,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Bled cream cake',
            description: 'Famous kremšnita',
            cost: 500,
            type: 'food'
          },
          {
            time: '14:00',
            activity: 'Vintgar Gorge walk',
            description: '1.6km boardwalk canyon',
            cost: 1000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Slovenian farm-to-table',
            cost: 2500,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Bus to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'LJU → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'bordeaux',
    name: 'Bordeaux',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1499456315959-920e6df20fde?w=800&q=80',
    description: 'World wine capital - elegant neoclassical architecture along the Garonne River',
    tags: [
      'Wine',
      'Architecture',
      'Gastronomy',
      'Elegant',
      'River',
      'Culture'
    ],
    duration: '3 Days, 2 Nights',
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
    stayVector: { Boutique: 0.8, Elegant: 0.8, Stylish: 0.7, Central: 0.7 },
    breakdown: { flights: 38000, stay: 24000, activities: 18000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'Air France',
        flightNo: 'AF356',
        from: 'DEL',
        to: 'BOD',
        departure: '23:00',
        arrival: '06:30 +1',
        duration: '10h 30m',
        cost: 19000
      },
      {
        type: 'return',
        airline: 'Air France',
        flightNo: 'AF357',
        from: 'BOD',
        to: 'DEL',
        departure: '09:00',
        arrival: '22:30',
        duration: '10h 30m',
        cost: 19000
      }
    ],
    hotel: {
      name: 'InterContinental Bordeaux',
      rating: 5,
      location: 'Grand Théâtre, Bordeaux',
      distanceToCenter: '0.1 km',
      totalCost: 24000,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Bordeaux Airport',
        to: 'Hotel',
        type: 'Tram',
        cost: 300
      },
      {
        from: 'Hotel',
        to: 'Saint-Émilion',
        type: 'Tour Bus',
        cost: 4000
      },
      { from: 'Hotel', to: 'Airport', type: 'Tram', cost: 300 }
    ],
    days: [
      {
        day: 1,
        title: 'Wine & Water Mirror',
        items: [
          {
            time: '10:00',
            activity: 'Place de la Bourse',
            description: "Miroir d'Eau water mirror",
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Canelé pastry',
            description: "Bordeaux's signature sweet",
            cost: 500,
            type: 'food'
          },
          {
            time: '14:00',
            activity: 'La Cité du Vin',
            description: 'Wine museum with tasting',
            cost: 2500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Bordeaux wine dinner',
            description: 'Saint-Émilion grand cru pairing',
            cost: 5000,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Saint-Émilion & Farewell',
        items: [
          {
            time: '09:00',
            activity: 'Saint-Émilion day trip',
            description: 'UNESCO vineyard village',
            cost: 4000,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Château lunch',
            description: 'Winery estate dining',
            cost: 3000,
            type: 'food'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Entrecôte à la Bordelaise',
            cost: 4500,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '06:00',
            activity: 'Checkout',
            description: 'Tram to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '09:00',
            activity: 'Departure Flight',
            description: 'BOD → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'malaga',
    name: 'Malaga',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1585506942812-e72b29cef752?w=800&q=80',
    description: "Picasso's birthplace on the Costa del Sol - sun, tapas, and a Moorish fortress",
    tags: [ 'Sun', 'Beach', 'Tapas', 'Picasso', 'Budget', 'Mediterranean' ],
    duration: '4 Days, 3 Nights',
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
    stayVector: { Beach: 0.8, Budget: 0.8, City: 0.6, Central: 0.7 },
    breakdown: { flights: 26000, stay: 14000, activities: 14000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'Iberia',
        flightNo: 'IB6860',
        from: 'DEL',
        to: 'AGP',
        departure: '01:00',
        arrival: '09:00',
        duration: '11h',
        cost: 13000
      },
      {
        type: 'return',
        airline: 'Iberia',
        flightNo: 'IB6861',
        from: 'AGP',
        to: 'DEL',
        departure: '10:00',
        arrival: '01:00 +1',
        duration: '11h',
        cost: 13000
      }
    ],
    hotel: {
      name: 'Room Mate Valeria',
      rating: 4,
      location: 'Old Town, Malaga',
      distanceToCenter: '0.2 km',
      totalCost: 14000,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80',
      nights: 3
    },
    transfers: [
      { from: 'Malaga Airport', to: 'Hotel', type: 'Train', cost: 300 },
      { from: 'Hotel', to: 'Nerja', type: 'Bus', cost: 1000 },
      { from: 'Hotel', to: 'Airport', type: 'Train', cost: 300 }
    ],
    days: [
      {
        day: 1,
        title: 'Picasso & Alcazaba',
        items: [
          {
            time: '10:00',
            activity: 'Picasso Museum',
            description: 'Birthplace and early works',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Espetos on the beach',
            description: 'Grilled sardines',
            cost: 1500,
            type: 'food'
          },
          {
            time: '16:00',
            activity: 'Alcazaba Fortress',
            description: 'Moorish palatial fortress',
            cost: 500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Tapas in Atarazanas',
            description: 'Market-fresh tapas',
            cost: 2000,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Beach & Nerja',
        items: [
          {
            time: '09:00',
            activity: 'Nerja sea caves',
            description: 'Prehistoric caverns',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Balcón de Europa',
            description: 'Cliffside sea viewpoint',
            cost: 0,
            type: 'activity'
          },
          {
            time: '14:00',
            activity: 'Nerja seafood lunch',
            description: 'Fresh prawns and fish',
            cost: 2000,
            type: 'food'
          },
          {
            time: '18:00',
            activity: 'Malagueta Beach sunset',
            description: 'City beach relaxation',
            cost: 0,
            type: 'relax'
          }
        ]
      },
      {
        day: 3,
        title: 'Markets & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Atarazanas Market',
            description: 'Traditional food market',
            cost: 1500,
            type: 'food'
          },
          {
            time: '14:00',
            activity: 'Centre Pompidou Malaga',
            description: 'Modern art',
            cost: 1000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Andalusian rooftop dining',
            cost: 3000,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '07:00',
            activity: 'Checkout',
            description: 'Train to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '10:00',
            activity: 'Departure Flight',
            description: 'AGP → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'thessaloniki',
    name: 'Thessaloniki',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80',
    description: "Greece's cultural capital - Byzantine churches, waterfront promenade, and legendary nightlife",
    tags: [
      'Culture',
      'Food',
      'Nightlife',
      'Byzantine',
      'Waterfront',
      'Budget'
    ],
    duration: '4 Days, 3 Nights',
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
    stayVector: { Budget: 0.8, City: 0.8, Central: 0.7, Boutique: 0.6 },
    breakdown: { flights: 26000, stay: 14000, activities: 14000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'Aegean Airlines',
        flightNo: 'A3610',
        from: 'DEL',
        to: 'SKG',
        departure: '02:00',
        arrival: '07:30',
        duration: '11h 30m',
        cost: 13000
      },
      {
        type: 'return',
        airline: 'Aegean Airlines',
        flightNo: 'A3611',
        from: 'SKG',
        to: 'DEL',
        departure: '09:00',
        arrival: '22:00',
        duration: '11h',
        cost: 13000
      }
    ],
    hotel: {
      name: 'Electra Palace Thessaloniki',
      rating: 5,
      location: 'Aristotelous Square',
      distanceToCenter: '0.1 km',
      totalCost: 14000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Makedonia Airport',
        to: 'Hotel',
        type: 'Bus',
        cost: 400
      },
      { from: 'Hotel', to: 'Airport', type: 'Bus', cost: 400 }
    ],
    days: [
      {
        day: 1,
        title: 'Waterfront & White Tower',
        items: [
          {
            time: '10:00',
            activity: 'White Tower',
            description: "City's iconic landmark",
            cost: 800,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Bougatsa breakfast',
            description: 'Custard-filled phyllo pastry',
            cost: 500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Waterfront promenade',
            description: 'Nea Paralia walk',
            cost: 0,
            type: 'relax'
          },
          {
            time: '20:00',
            activity: 'Meze dinner',
            description: 'Greek seafood meze spread',
            cost: 2500,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Byzantine Heritage',
        items: [
          {
            time: '09:00',
            activity: 'Rotunda of Galerius',
            description: "Roman emperor's mausoleum",
            cost: 500,
            type: 'activity'
          },
          {
            time: '11:00',
            activity: 'Modiano Market',
            description: 'Indoor food market',
            cost: 1500,
            type: 'food'
          },
          {
            time: '14:00',
            activity: 'Byzantine Museum',
            description: 'UNESCO mosaics and icons',
            cost: 800,
            type: 'activity'
          },
          {
            time: '21:00',
            activity: 'Ladadika nightlife',
            description: 'Bar district until sunrise',
            cost: 2500,
            type: 'relax'
          }
        ]
      },
      {
        day: 3,
        title: 'Upper Town & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Ano Poli (Upper Town)',
            description: 'Ottoman houses and views',
            cost: 0,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Gyros and souvlaki',
            description: 'Best gyros in Greece',
            cost: 800,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Aristotelous Square',
            description: 'Grand central plaza',
            cost: 0,
            type: 'relax'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Seaside taverna',
            cost: 3000,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '06:00',
            activity: 'Checkout',
            description: 'Bus to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '09:00',
            activity: 'Departure Flight',
            description: 'SKG → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'glasgow',
    name: 'Glasgow',
    country: 'Scotland',
    image: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&q=80',
    description: "Scotland's vibrant heartbeat - street art, live music, whisky, and Mackintosh architecture",
    tags: [ 'Music', 'Whisky', 'Street Art', 'Urban', 'Culture', 'Vibrant' ],
    duration: '3 Days, 2 Nights',
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
    stayVector: { City: 0.8, Boutique: 0.6, Urban: 0.7, Budget: 0.6 },
    breakdown: { flights: 38000, stay: 22000, activities: 17000, transfers: 8000 },
    flights: [
      {
        type: 'departure',
        airline: 'British Airways',
        flightNo: 'BA145',
        from: 'DEL',
        to: 'GLA',
        departure: '01:50',
        arrival: '09:00',
        duration: '13h 10m',
        cost: 19000
      },
      {
        type: 'return',
        airline: 'British Airways',
        flightNo: 'BA146',
        from: 'GLA',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '12h',
        cost: 19000
      }
    ],
    hotel: {
      name: 'Kimpton Blythswood Square',
      rating: 5,
      location: 'City Centre, Glasgow',
      distanceToCenter: '0.2 km',
      totalCost: 22000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Glasgow Airport',
        to: 'Hotel',
        type: 'Express Bus',
        cost: 1200
      },
      { from: 'Hotel', to: 'Airport', type: 'Express Bus', cost: 1200 }
    ],
    days: [
      {
        day: 1,
        title: 'Mackintosh & Music',
        items: [
          {
            time: '10:00',
            activity: 'Kelvingrove Museum',
            description: 'Dalí, Mackintosh, dinosaurs',
            cost: 0,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Finnieston lunch',
            description: "Glasgow's foodie hood",
            cost: 2500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Glasgow Cathedral',
            description: 'Medieval Gothic cathedral',
            cost: 0,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: "Live music at King Tut's",
            description: 'Legendary music venue',
            cost: 2000,
            type: 'activity'
          }
        ]
      },
      {
        day: 2,
        title: 'Street Art & Whisky',
        items: [
          {
            time: '10:00',
            activity: 'Glasgow Mural Trail',
            description: 'City-wide street art tour',
            cost: 0,
            type: 'activity'
          },
          {
            time: '12:00',
            activity: 'Barras Market lunch',
            description: 'Street food and vintage finds',
            cost: 1500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Whisky tasting experience',
            description: 'Single malt masterclass',
            cost: 3000,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Farewell Dinner',
            description: 'Modern Scottish cuisine',
            cost: 4000,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Express bus to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'GLA → DEL',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'dublin',
    name: 'Dublin',
    country: 'Ireland',
    image: 'https://images.unsplash.com/photo-1549918864-48f4421fa9c0?w=800&q=80',
    description: 'Literary pubs, Georgian squares, and the wild Irish spirit',
    tags: [ 'Pubs', 'Literature', 'Culture', 'Music', 'Friendly', 'Green' ],
    duration: '4 Days, 3 Nights',
    costLevel: 2,
    totalCost: 82000,
    vibeVector: {
      Culture: 0.8,
      Social: 0.9,
      Music: 0.8,
      Green: 0.6,
      Friendly: 0.9,
      Urban: 0.7,
      Cozy: 0.7
    },
    activityVector: {
      Food: 0.8,
      Music: 0.9,
      Culture: 0.7,
      Nightlife: 0.8,
      History: 0.6,
      Walking: 0.7
    },
    stayVector: { City: 0.8, Central: 0.7, Boutique: 0.6 },
    breakdown: { flights: 34440, stay: 20500, activities: 18040, transfers: 9020 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 17220
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 17220
      }
    ],
    hotel: {
      name: 'Dublin Central Hotel',
      rating: 4,
      location: 'City Centre, Dublin',
      distanceToCenter: '0.3 km',
      totalCost: 20500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Dublin Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 3007
      },
      {
        from: 'Hotel',
        to: 'Dublin Airport',
        type: 'Shuttle',
        cost: 3007
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Dublin highlights',
            cost: 2460,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Ireland dishes',
            cost: 1640,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2460,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2460,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Deep Dive',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Dublin highlights',
            cost: 2460,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Ireland dishes',
            cost: 1640,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2460,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2460,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Dublin highlights',
            cost: 2460,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Ireland dishes',
            cost: 1640,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2460,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2460,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'manchester',
    name: 'Manchester',
    country: 'England',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aede?w=800&q=80',
    description: 'Football, music heritage, and a thriving Northern Quarter scene',
    tags: [
      'Football',
      'Music',
      'Urban',
      'Nightlife',
      'Culture',
      'Industrial'
    ],
    duration: '4 Days, 3 Nights',
    costLevel: 2,
    totalCost: 85000,
    vibeVector: {
      Urban: 0.9,
      Music: 0.8,
      Vibrant: 0.8,
      Social: 0.8,
      Culture: 0.7,
      Industrial: 0.6
    },
    activityVector: {
      Music: 0.8,
      Football: 0.9,
      Nightlife: 0.8,
      Culture: 0.7,
      Food: 0.7,
      Shopping: 0.6
    },
    stayVector: { City: 0.8, Urban: 0.7, Budget: 0.6 },
    breakdown: { flights: 35700, stay: 21250, activities: 18700, transfers: 9350 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 17850
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 17850
      }
    ],
    hotel: {
      name: 'Manchester Central Hotel',
      rating: 4,
      location: 'City Centre, Manchester',
      distanceToCenter: '0.3 km',
      totalCost: 21250,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Manchester Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 3117
      },
      {
        from: 'Hotel',
        to: 'Manchester Airport',
        type: 'Shuttle',
        cost: 3117
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Manchester highlights',
            cost: 2550,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional England dishes',
            cost: 1700,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2550,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2550,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Deep Dive',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Manchester highlights',
            cost: 2550,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional England dishes',
            cost: 1700,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2550,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2550,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Manchester highlights',
            cost: 2550,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional England dishes',
            cost: 1700,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2550,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2550,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'antalya',
    name: 'Antalya',
    country: 'Turkey',
    image: 'https://images.unsplash.com/photo-1593238739364-18cfde4d08b3?w=800&q=80',
    description: 'Turquoise coast paradise - ancient ruins meet all-inclusive resorts',
    tags: [ 'Beach', 'Sun', 'Resort', 'Ancient', 'Mediterranean', 'Budget' ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 55000,
    vibeVector: {
      Beach: 0.95,
      Sun: 0.9,
      Warm: 0.9,
      Resort: 0.8,
      Mediterranean: 0.8,
      Relaxed: 0.8
    },
    activityVector: {
      Beach: 0.9,
      History: 0.7,
      Relaxation: 0.8,
      Food: 0.7,
      Swimming: 0.8,
      Photography: 0.6
    },
    stayVector: { Beach: 0.9, Resort: 0.8, Budget: 0.7 },
    breakdown: { flights: 23100, stay: 13750, activities: 12100, transfers: 6050 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 11550
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 11550
      }
    ],
    hotel: {
      name: 'Antalya Central Hotel',
      rating: 4,
      location: 'City Centre, Antalya',
      distanceToCenter: '0.3 km',
      totalCost: 13750,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Antalya Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2017
      },
      {
        from: 'Hotel',
        to: 'Antalya Airport',
        type: 'Shuttle',
        cost: 2017
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Antalya highlights',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Turkey dishes',
            cost: 1100,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1650,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Antalya highlights',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Turkey dishes',
            cost: 1100,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1650,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'izmir',
    name: 'Izmir',
    country: 'Turkey',
    image: 'https://images.unsplash.com/photo-1570838414685-ea711da48d60?w=800&q=80',
    description: 'Aegean breezes, bazaars, and gateway to ancient Ephesus',
    tags: [ 'Ancient', 'Coastal', 'Bazaar', 'Culture', 'Aegean', 'History' ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 52000,
    vibeVector: {
      Coastal: 0.8,
      Culture: 0.8,
      History: 0.8,
      Warm: 0.7,
      Authentic: 0.8,
      Budget: 0.8
    },
    activityVector: {
      History: 0.9,
      Culture: 0.7,
      Food: 0.8,
      Shopping: 0.7,
      Walking: 0.7,
      Photography: 0.6
    },
    stayVector: { City: 0.7, Budget: 0.8, Central: 0.7 },
    breakdown: { flights: 21840, stay: 13000, activities: 11440, transfers: 5720 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 10920
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 10920
      }
    ],
    hotel: {
      name: 'Izmir Central Hotel',
      rating: 4,
      location: 'City Centre, Izmir',
      distanceToCenter: '0.3 km',
      totalCost: 13000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Izmir Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 1907
      },
      {
        from: 'Hotel',
        to: 'Izmir Airport',
        type: 'Shuttle',
        cost: 1907
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Izmir highlights',
            cost: 1560,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Turkey dishes',
            cost: 1040,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1560,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1560,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Izmir highlights',
            cost: 1560,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Turkey dishes',
            cost: 1040,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1560,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1560,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'corfu',
    name: 'Corfu',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1588362951121-3ee319b018a2?w=800&q=80',
    description: 'Venetian old town, olive groves, and crystal Ionian waters',
    tags: [
      'Beach',
      'Island',
      'Venetian',
      'Olive',
      'Scenic',
      'Mediterranean'
    ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 60000,
    vibeVector: {
      Beach: 0.9,
      Island: 0.9,
      Scenic: 0.9,
      Mediterranean: 0.9,
      Peaceful: 0.7,
      Romantic: 0.7
    },
    activityVector: {
      Beach: 0.9,
      Swimming: 0.8,
      Photography: 0.8,
      Culture: 0.6,
      Nature: 0.7,
      Relaxation: 0.8
    },
    stayVector: { Beach: 0.8, Boutique: 0.7, Scenic: 0.8 },
    breakdown: { flights: 25200, stay: 15000, activities: 13200, transfers: 6600 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 12600
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 12600
      }
    ],
    hotel: {
      name: 'Corfu Central Hotel',
      rating: 4,
      location: 'City Centre, Corfu',
      distanceToCenter: '0.3 km',
      totalCost: 15000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Corfu Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2200
      },
      {
        from: 'Hotel',
        to: 'Corfu Airport',
        type: 'Shuttle',
        cost: 2200
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Corfu highlights',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Greece dishes',
            cost: 1200,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1800,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Corfu highlights',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Greece dishes',
            cost: 1200,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1800,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'rhodes',
    name: 'Rhodes',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1601990795572-9a2c16b49ea5?w=800&q=80',
    description: 'Medieval walled city and sun-drenched Aegean beaches',
    tags: [ 'Beach', 'Medieval', 'Sun', 'Island', 'History', 'Warm' ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 58000,
    vibeVector: {
      Beach: 0.9,
      Sun: 0.9,
      History: 0.8,
      Island: 0.8,
      Warm: 0.9,
      Medieval: 0.7
    },
    activityVector: {
      Beach: 0.9,
      History: 0.8,
      Walking: 0.7,
      Swimming: 0.8,
      Photography: 0.7,
      Culture: 0.6
    },
    stayVector: { Beach: 0.8, Resort: 0.7, Budget: 0.7 },
    breakdown: { flights: 24360, stay: 14500, activities: 12760, transfers: 6380 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 12180
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 12180
      }
    ],
    hotel: {
      name: 'Rhodes Central Hotel',
      rating: 4,
      location: 'City Centre, Rhodes',
      distanceToCenter: '0.3 km',
      totalCost: 14500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Rhodes Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2127
      },
      {
        from: 'Hotel',
        to: 'Rhodes Airport',
        type: 'Shuttle',
        cost: 2127
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Rhodes highlights',
            cost: 1740,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Greece dishes',
            cost: 1160,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1740,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1740,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Rhodes highlights',
            cost: 1740,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Greece dishes',
            cost: 1160,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1740,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1740,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'mykonos',
    name: 'Mykonos',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80',
    description: 'Iconic windmills, white-washed lanes, and legendary beach parties',
    tags: [ 'Beach', 'Party', 'Luxury', 'Island', 'Nightlife', 'Iconic' ],
    duration: '4 Days, 3 Nights',
    costLevel: 3,
    totalCost: 120000,
    vibeVector: {
      Beach: 0.9,
      Party: 0.9,
      Luxury: 0.8,
      Island: 0.9,
      Nightlife: 0.9,
      Vibrant: 0.8
    },
    activityVector: {
      Beach: 0.9,
      Nightlife: 0.9,
      Photography: 0.8,
      Swimming: 0.7,
      Food: 0.7,
      Relaxation: 0.6
    },
    stayVector: { Luxury: 0.9, Beach: 0.8, Boutique: 0.7 },
    breakdown: {
      flights: 50400,
      stay: 30000,
      activities: 26400,
      transfers: 13200
    },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 25200
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 25200
      }
    ],
    hotel: {
      name: 'Mykonos Central Hotel',
      rating: 4,
      location: 'City Centre, Mykonos',
      distanceToCenter: '0.3 km',
      totalCost: 30000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Mykonos Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 4400
      },
      {
        from: 'Hotel',
        to: 'Mykonos Airport',
        type: 'Shuttle',
        cost: 4400
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Mykonos highlights',
            cost: 3600,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Greece dishes',
            cost: 2400,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 3600,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 3600,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Deep Dive',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Mykonos highlights',
            cost: 3600,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Greece dishes',
            cost: 2400,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 3600,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 3600,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Mykonos highlights',
            cost: 3600,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Greece dishes',
            cost: 2400,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 3600,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 3600,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'chania',
    name: 'Chania',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1597466765990-64ad1c35dafc?w=800&q=80',
    description: 'Venetian harbour, Cretan cuisine, and a gateway to Samaria Gorge',
    tags: [ 'Beach', 'Venetian', 'Cuisine', 'Gorge', 'Harbour', 'Scenic' ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 58000,
    vibeVector: {
      Beach: 0.8,
      Scenic: 0.9,
      Coastal: 0.8,
      Authentic: 0.8,
      Charming: 0.8,
      Peaceful: 0.7
    },
    activityVector: {
      Beach: 0.8,
      Food: 0.9,
      Hiking: 0.7,
      Photography: 0.8,
      Culture: 0.7,
      Nature: 0.7
    },
    stayVector: { Beach: 0.7, Boutique: 0.8, Charming: 0.8 },
    breakdown: { flights: 24360, stay: 14500, activities: 12760, transfers: 6380 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 12180
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 12180
      }
    ],
    hotel: {
      name: 'Chania Central Hotel',
      rating: 4,
      location: 'City Centre, Chania',
      distanceToCenter: '0.3 km',
      totalCost: 14500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Chania Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2127
      },
      {
        from: 'Hotel',
        to: 'Chania Airport',
        type: 'Shuttle',
        cost: 2127
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Chania highlights',
            cost: 1740,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Greece dishes',
            cost: 1160,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1740,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1740,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Chania highlights',
            cost: 1740,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Greece dishes',
            cost: 1160,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1740,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1740,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'palma',
    name: 'Palma',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
    description: 'Cathedral views, tapas bars, and turquoise Balearic coves',
    tags: [ 'Beach', 'Mediterranean', 'Cathedral', 'Tapas', 'Island', 'Sun' ],
    duration: '3 Days, 2 Nights',
    costLevel: 2,
    totalCost: 78000,
    vibeVector: {
      Beach: 0.9,
      Sun: 0.9,
      Mediterranean: 0.9,
      Elegant: 0.7,
      Island: 0.8,
      Relaxed: 0.7
    },
    activityVector: {
      Beach: 0.9,
      Food: 0.8,
      Culture: 0.6,
      Cycling: 0.6,
      Swimming: 0.8,
      Photography: 0.7
    },
    stayVector: { Beach: 0.8, Boutique: 0.7, Resort: 0.7 },
    breakdown: { flights: 32760, stay: 19500, activities: 17160, transfers: 8580 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 16380
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 16380
      }
    ],
    hotel: {
      name: 'Palma de Mallorca Central Hotel',
      rating: 4,
      location: 'City Centre, Palma de Mallorca',
      distanceToCenter: '0.3 km',
      totalCost: 19500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Palma de Mallorca Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2860
      },
      {
        from: 'Hotel',
        to: 'Palma de Mallorca Airport',
        type: 'Shuttle',
        cost: 2860
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Palma de Mallorca highlights',
            cost: 2340,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Spain dishes',
            cost: 1560,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2340,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2340,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Palma de Mallorca highlights',
            cost: 2340,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Spain dishes',
            cost: 1560,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2340,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2340,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'tenerife',
    name: 'Tenerife',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80',
    description: 'Volcanic island - Mount Teide, black sand beaches, and year-round sun',
    tags: [ 'Beach', 'Volcano', 'Sun', 'Island', 'Nature', 'Warm' ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 62000,
    vibeVector: {
      Beach: 0.85,
      Sun: 0.95,
      Nature: 0.8,
      Warm: 0.95,
      Island: 0.9,
      Adventure: 0.6
    },
    activityVector: {
      Beach: 0.85,
      Hiking: 0.7,
      Nature: 0.8,
      Swimming: 0.8,
      Photography: 0.7,
      Relaxation: 0.8
    },
    stayVector: { Beach: 0.8, Resort: 0.8, Budget: 0.7 },
    breakdown: { flights: 26040, stay: 15500, activities: 13640, transfers: 6820 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 13020
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 13020
      }
    ],
    hotel: {
      name: 'Tenerife Central Hotel',
      rating: 4,
      location: 'City Centre, Tenerife',
      distanceToCenter: '0.3 km',
      totalCost: 15500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Tenerife Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2273
      },
      {
        from: 'Hotel',
        to: 'Tenerife Airport',
        type: 'Shuttle',
        cost: 2273
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Tenerife highlights',
            cost: 1860,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Spain dishes',
            cost: 1240,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1860,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1860,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Tenerife highlights',
            cost: 1860,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Spain dishes',
            cost: 1240,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1860,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1860,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'faro',
    name: 'Faro',
    country: 'Portugal',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80',
    description: 'Algarve gateway - golden cliffs, sea caves, and endless coastline',
    tags: [ 'Beach', 'Coastal', 'Cliffs', 'Sun', 'Budget', 'Nature' ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 55000,
    vibeVector: {
      Beach: 0.9,
      Coastal: 0.9,
      Sun: 0.9,
      Nature: 0.8,
      Relaxed: 0.8,
      Budget: 0.8
    },
    activityVector: {
      Beach: 0.9,
      Nature: 0.8,
      Photography: 0.8,
      Swimming: 0.8,
      Relaxation: 0.8,
      Kayaking: 0.6
    },
    stayVector: { Beach: 0.8, Budget: 0.8, Coastal: 0.7 },
    breakdown: { flights: 23100, stay: 13750, activities: 12100, transfers: 6050 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 11550
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 11550
      }
    ],
    hotel: {
      name: 'Faro Central Hotel',
      rating: 4,
      location: 'City Centre, Faro',
      distanceToCenter: '0.3 km',
      totalCost: 13750,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Faro Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2017
      },
      {
        from: 'Hotel',
        to: 'Faro Airport',
        type: 'Shuttle',
        cost: 2017
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Faro highlights',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Portugal dishes',
            cost: 1100,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1650,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Faro highlights',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Portugal dishes',
            cost: 1100,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1650,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'marseille',
    name: 'Marseille',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80',
    description: 'Gritty port city with bouillabaisse, calanques, and Mediterranean soul',
    tags: [
      'Coastal',
      'Gastronomy',
      'Port',
      'Mediterranean',
      'Vibrant',
      'Culture'
    ],
    duration: '3 Days, 2 Nights',
    costLevel: 2,
    totalCost: 80000,
    vibeVector: {
      Coastal: 0.8,
      Vibrant: 0.8,
      Mediterranean: 0.8,
      Culture: 0.7,
      Urban: 0.7,
      Authentic: 0.8
    },
    activityVector: {
      Food: 0.9,
      Culture: 0.7,
      Nature: 0.7,
      Photography: 0.7,
      Walking: 0.7,
      Sailing: 0.6
    },
    stayVector: { City: 0.7, Boutique: 0.7, Central: 0.7 },
    breakdown: { flights: 33600, stay: 20000, activities: 17600, transfers: 8800 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 16800
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 16800
      }
    ],
    hotel: {
      name: 'Marseille Central Hotel',
      rating: 4,
      location: 'City Centre, Marseille',
      distanceToCenter: '0.3 km',
      totalCost: 20000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Marseille Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2933
      },
      {
        from: 'Hotel',
        to: 'Marseille Airport',
        type: 'Shuttle',
        cost: 2933
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Marseille highlights',
            cost: 2400,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional France dishes',
            cost: 1600,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2400,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2400,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Marseille highlights',
            cost: 2400,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional France dishes',
            cost: 1600,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2400,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2400,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'toulouse',
    name: 'Toulouse',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1574866412185-4e87e tried-9fa5?w=800&q=80',
    description: 'The Pink City - aerospace, cassoulet, and canal-side charm',
    tags: [ 'Culture', 'Space', 'Gastronomy', 'Charming', 'River', 'Pink' ],
    duration: '3 Days, 2 Nights',
    costLevel: 2,
    totalCost: 75000,
    vibeVector: {
      Culture: 0.7,
      Charming: 0.8,
      Gastronomy: 0.8,
      River: 0.6,
      Relaxed: 0.7,
      Scenic: 0.6
    },
    activityVector: {
      Food: 0.9,
      Culture: 0.7,
      Walking: 0.7,
      Photography: 0.6,
      History: 0.6,
      Cycling: 0.5
    },
    stayVector: { City: 0.7, Boutique: 0.7, Central: 0.7 },
    breakdown: { flights: 31500, stay: 18750, activities: 16500, transfers: 8250 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 15750
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 15750
      }
    ],
    hotel: {
      name: 'Toulouse Central Hotel',
      rating: 4,
      location: 'City Centre, Toulouse',
      distanceToCenter: '0.3 km',
      totalCost: 18750,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Toulouse Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2750
      },
      {
        from: 'Hotel',
        to: 'Toulouse Airport',
        type: 'Shuttle',
        cost: 2750
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Toulouse highlights',
            cost: 2250,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional France dishes',
            cost: 1500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2250,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2250,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Toulouse highlights',
            cost: 2250,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional France dishes',
            cost: 1500,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2250,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2250,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'frankfurt',
    name: 'Frankfurt',
    country: 'Germany',
    image: 'https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?w=800&q=80',
    description: 'Skyline city - finance, apple wine, and the museum mile along the Main',
    tags: [ 'Urban', 'Modern', 'Finance', 'Culture', 'River', 'Museums' ],
    duration: '4 Days, 3 Nights',
    costLevel: 2,
    totalCost: 88000,
    vibeVector: {
      Urban: 0.9,
      Modern: 0.9,
      Culture: 0.7,
      Business: 0.7,
      River: 0.5,
      Efficient: 0.7
    },
    activityVector: {
      Culture: 0.7,
      Food: 0.7,
      Museums: 0.7,
      Walking: 0.6,
      Shopping: 0.6,
      Photography: 0.5
    },
    stayVector: { City: 0.9, Modern: 0.8, Central: 0.8 },
    breakdown: { flights: 36960, stay: 22000, activities: 19360, transfers: 9680 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 18480
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 18480
      }
    ],
    hotel: {
      name: 'Frankfurt Central Hotel',
      rating: 4,
      location: 'City Centre, Frankfurt',
      distanceToCenter: '0.3 km',
      totalCost: 22000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Frankfurt Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 3227
      },
      {
        from: 'Hotel',
        to: 'Frankfurt Airport',
        type: 'Shuttle',
        cost: 3227
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Frankfurt highlights',
            cost: 2640,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Germany dishes',
            cost: 1760,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2640,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2640,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Deep Dive',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Frankfurt highlights',
            cost: 2640,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Germany dishes',
            cost: 1760,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2640,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2640,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Frankfurt highlights',
            cost: 2640,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Germany dishes',
            cost: 1760,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2640,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2640,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'dusseldorf',
    name: 'Dusseldorf',
    country: 'Germany',
    image: 'https://images.unsplash.com/photo-1545243424-0ce743321e11?w=800&q=80',
    description: 'Fashion capital on the Rhine - Altbier, art, and the Altstadt',
    tags: [ 'Fashion', 'Art', 'Beer', 'Urban', 'Rhine', 'Shopping' ],
    duration: '4 Days, 3 Nights',
    costLevel: 2,
    totalCost: 82000,
    vibeVector: {
      Urban: 0.8,
      Fashion: 0.7,
      Art: 0.7,
      Social: 0.7,
      Modern: 0.7,
      River: 0.6
    },
    activityVector: {
      Shopping: 0.8,
      Art: 0.7,
      Beer: 0.7,
      Culture: 0.7,
      Food: 0.7,
      Walking: 0.6
    },
    stayVector: { City: 0.8, Modern: 0.7, Central: 0.7 },
    breakdown: { flights: 34440, stay: 20500, activities: 18040, transfers: 9020 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 17220
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 17220
      }
    ],
    hotel: {
      name: 'Dusseldorf Central Hotel',
      rating: 4,
      location: 'City Centre, Dusseldorf',
      distanceToCenter: '0.3 km',
      totalCost: 20500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 3
    },
    transfers: [
      {
        from: 'Dusseldorf Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 3007
      },
      {
        from: 'Hotel',
        to: 'Dusseldorf Airport',
        type: 'Shuttle',
        cost: 3007
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Dusseldorf highlights',
            cost: 2460,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Germany dishes',
            cost: 1640,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2460,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2460,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Deep Dive',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Dusseldorf highlights',
            cost: 2460,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Germany dishes',
            cost: 1640,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2460,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2460,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Dusseldorf highlights',
            cost: 2460,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Germany dishes',
            cost: 1640,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2460,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2460,
            type: 'food'
          }
        ]
      },
      {
        day: 4,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'cologne',
    name: 'Cologne',
    country: 'Germany',
    image: 'https://images.unsplash.com/photo-1567186726-045c85e88847?w=800&q=80',
    description: 'Gothic cathedral city - Kölsch beer, carnival, and Roman history',
    tags: [ 'Cathedral', 'Beer', 'History', 'Carnival', 'Culture', 'River' ],
    duration: '3 Days, 2 Nights',
    costLevel: 2,
    totalCost: 80000,
    vibeVector: {
      Culture: 0.8,
      History: 0.8,
      Social: 0.8,
      River: 0.6,
      Vibrant: 0.7,
      Heritage: 0.8
    },
    activityVector: {
      History: 0.8,
      Beer: 0.8,
      Culture: 0.7,
      Photography: 0.7,
      Walking: 0.7,
      Food: 0.6
    },
    stayVector: { City: 0.8, Central: 0.7, Budget: 0.6 },
    breakdown: { flights: 33600, stay: 20000, activities: 17600, transfers: 8800 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 16800
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 16800
      }
    ],
    hotel: {
      name: 'Cologne Central Hotel',
      rating: 4,
      location: 'City Centre, Cologne',
      distanceToCenter: '0.3 km',
      totalCost: 20000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Cologne Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2933
      },
      {
        from: 'Hotel',
        to: 'Cologne Airport',
        type: 'Shuttle',
        cost: 2933
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Cologne highlights',
            cost: 2400,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Germany dishes',
            cost: 1600,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2400,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2400,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Cologne highlights',
            cost: 2400,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Germany dishes',
            cost: 1600,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2400,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2400,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'pisa',
    name: 'Pisa',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1544411047-c491e34a24e0?w=800&q=80',
    description: 'Beyond the Tower - Romanesque piazzas and Tuscan charm on the Arno',
    tags: [
      'History',
      'Architecture',
      'Tuscany',
      'Iconic',
      'Culture',
      'Charming'
    ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 60000,
    vibeVector: {
      History: 0.9,
      Culture: 0.8,
      Charming: 0.7,
      Scenic: 0.7,
      Architecture: 0.8,
      Compact: 0.7
    },
    activityVector: {
      History: 0.9,
      Photography: 0.9,
      Culture: 0.7,
      Walking: 0.7,
      Food: 0.7,
      Art: 0.6
    },
    stayVector: { Central: 0.8, Budget: 0.7, Boutique: 0.6 },
    breakdown: { flights: 25200, stay: 15000, activities: 13200, transfers: 6600 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 12600
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 12600
      }
    ],
    hotel: {
      name: 'Pisa Central Hotel',
      rating: 4,
      location: 'City Centre, Pisa',
      distanceToCenter: '0.3 km',
      totalCost: 15000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Pisa Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2200
      },
      {
        from: 'Hotel',
        to: 'Pisa Airport',
        type: 'Shuttle',
        cost: 2200
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Pisa highlights',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Italy dishes',
            cost: 1200,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1800,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Pisa highlights',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Italy dishes',
            cost: 1200,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1800,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'verona',
    name: 'Verona',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1570288685369-f7305163d0e3?w=800&q=80',
    description: 'City of Romeo and Juliet - Roman arena, wine country, and amore',
    tags: [ 'Romance', 'Opera', 'History', 'Wine', 'Architecture', 'Scenic' ],
    duration: '3 Days, 2 Nights',
    costLevel: 2,
    totalCost: 78000,
    vibeVector: {
      Romance: 0.9,
      History: 0.8,
      Culture: 0.8,
      Scenic: 0.8,
      Elegant: 0.7,
      Charming: 0.8
    },
    activityVector: {
      Culture: 0.8,
      Wine: 0.7,
      Opera: 0.7,
      History: 0.8,
      Food: 0.7,
      Walking: 0.7
    },
    stayVector: { Boutique: 0.8, Central: 0.7, Romantic: 0.8 },
    breakdown: { flights: 32760, stay: 19500, activities: 17160, transfers: 8580 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 16380
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 16380
      }
    ],
    hotel: {
      name: 'Verona Central Hotel',
      rating: 4,
      location: 'City Centre, Verona',
      distanceToCenter: '0.3 km',
      totalCost: 19500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Verona Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2860
      },
      {
        from: 'Hotel',
        to: 'Verona Airport',
        type: 'Shuttle',
        cost: 2860
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Verona highlights',
            cost: 2340,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Italy dishes',
            cost: 1560,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2340,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2340,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Verona highlights',
            cost: 2340,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Italy dishes',
            cost: 1560,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2340,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2340,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'palermo',
    name: 'Palermo',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1523365280197-f667f477fc03?w=800&q=80',
    description: 'Chaotic beauty - Arab-Norman churches, street food, and Sicilian soul',
    tags: [
      'Street Food',
      'History',
      'Culture',
      'Chaotic',
      'Mediterranean',
      'Authentic'
    ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 55000,
    vibeVector: {
      Authentic: 0.9,
      Culture: 0.8,
      Chaotic: 0.7,
      Mediterranean: 0.8,
      Food: 0.9,
      Vibrant: 0.8
    },
    activityVector: {
      Food: 0.95,
      History: 0.7,
      Culture: 0.7,
      Walking: 0.7,
      Photography: 0.7,
      Markets: 0.8
    },
    stayVector: { Budget: 0.8, City: 0.7, Central: 0.7 },
    breakdown: { flights: 23100, stay: 13750, activities: 12100, transfers: 6050 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 11550
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 11550
      }
    ],
    hotel: {
      name: 'Palermo Central Hotel',
      rating: 4,
      location: 'City Centre, Palermo',
      distanceToCenter: '0.3 km',
      totalCost: 13750,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Palermo Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2017
      },
      {
        from: 'Hotel',
        to: 'Palermo Airport',
        type: 'Shuttle',
        cost: 2017
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Palermo highlights',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Italy dishes',
            cost: 1100,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1650,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Palermo highlights',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Italy dishes',
            cost: 1100,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1650,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'catania',
    name: 'Catania',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1610545936490-3f1f6c0eba09?w=800&q=80',
    description: "Baroque city at Etna's foot - fish markets, volcanos, and Sicilian fire",
    tags: [ 'Volcano', 'Baroque', 'Street Food', 'Sicily', 'Sun', 'Culture' ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 52000,
    vibeVector: {
      Authentic: 0.8,
      Sun: 0.8,
      Culture: 0.7,
      Vibrant: 0.7,
      Adventure: 0.6,
      Mediterranean: 0.7
    },
    activityVector: {
      Food: 0.8,
      Volcano: 0.8,
      History: 0.7,
      Culture: 0.7,
      Walking: 0.7,
      Photography: 0.6
    },
    stayVector: { Budget: 0.8, City: 0.7, Central: 0.7 },
    breakdown: { flights: 21840, stay: 13000, activities: 11440, transfers: 5720 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 10920
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 10920
      }
    ],
    hotel: {
      name: 'Catania Central Hotel',
      rating: 4,
      location: 'City Centre, Catania',
      distanceToCenter: '0.3 km',
      totalCost: 13000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Catania Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 1907
      },
      {
        from: 'Hotel',
        to: 'Catania Airport',
        type: 'Shuttle',
        cost: 1907
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Catania highlights',
            cost: 1560,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Italy dishes',
            cost: 1040,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1560,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1560,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Catania highlights',
            cost: 1560,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Italy dishes',
            cost: 1040,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1560,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1560,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'bari',
    name: 'Bari',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=800&q=80',
    description: "Puglia's capital - orecchiette pasta, whitewashed old town, and Adriatic coast",
    tags: [
      'Coastal',
      'Gastronomy',
      'Authentic',
      'Puglia',
      'Mediterranean',
      'Charming'
    ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 55000,
    vibeVector: {
      Coastal: 0.8,
      Authentic: 0.9,
      Charming: 0.7,
      Mediterranean: 0.8,
      Food: 0.8,
      Relaxed: 0.7
    },
    activityVector: {
      Food: 0.9,
      Walking: 0.7,
      Beach: 0.6,
      Culture: 0.6,
      Photography: 0.6,
      History: 0.5
    },
    stayVector: { Budget: 0.8, Central: 0.7, Boutique: 0.6 },
    breakdown: { flights: 23100, stay: 13750, activities: 12100, transfers: 6050 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 11550
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 11550
      }
    ],
    hotel: {
      name: 'Bari Central Hotel',
      rating: 4,
      location: 'City Centre, Bari',
      distanceToCenter: '0.3 km',
      totalCost: 13750,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Bari Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2017
      },
      {
        from: 'Hotel',
        to: 'Bari Airport',
        type: 'Shuttle',
        cost: 2017
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Bari highlights',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Italy dishes',
            cost: 1100,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1650,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Bari highlights',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Italy dishes',
            cost: 1100,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1650,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1650,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'wroclaw',
    name: 'Wroclaw',
    country: 'Poland',
    image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=800&q=80',
    description: 'Bridge city of gnomes - colourful market square and island cathedral',
    tags: [ 'Charming', 'Budget', 'Culture', 'Bridges', 'Gnomes', 'River' ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 45000,
    vibeVector: {
      Charming: 0.9,
      Budget: 0.9,
      Culture: 0.7,
      River: 0.7,
      Quirky: 0.8,
      Scenic: 0.7
    },
    activityVector: {
      Walking: 0.8,
      Culture: 0.7,
      Photography: 0.7,
      History: 0.6,
      Food: 0.7,
      Beer: 0.6
    },
    stayVector: { Budget: 0.9, Central: 0.8, Cozy: 0.7 },
    breakdown: { flights: 18900, stay: 11250, activities: 9900, transfers: 4950 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 9450
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 9450
      }
    ],
    hotel: {
      name: 'Wroclaw Central Hotel',
      rating: 4,
      location: 'City Centre, Wroclaw',
      distanceToCenter: '0.3 km',
      totalCost: 11250,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Wroclaw Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 1650
      },
      {
        from: 'Hotel',
        to: 'Wroclaw Airport',
        type: 'Shuttle',
        cost: 1650
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Wroclaw highlights',
            cost: 1350,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Poland dishes',
            cost: 900,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1350,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1350,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Wroclaw highlights',
            cost: 1350,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Poland dishes',
            cost: 900,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1350,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1350,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'zagreb',
    name: 'Zagreb',
    country: 'Croatia',
    image: 'https://images.unsplash.com/photo-1558612286-1b192e41a24a?w=800&q=80',
    description: 'Austro-Hungarian charm - cafe culture, museums, and a lively upper town',
    tags: [ 'Culture', 'Cafe', 'Museums', 'Budget', 'Charming', 'History' ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 50000,
    vibeVector: {
      Culture: 0.8,
      Charming: 0.7,
      Budget: 0.8,
      History: 0.6,
      Social: 0.7,
      Cozy: 0.7
    },
    activityVector: {
      Culture: 0.8,
      Food: 0.7,
      History: 0.6,
      Walking: 0.7,
      Museums: 0.7,
      Beer: 0.6
    },
    stayVector: { Budget: 0.8, City: 0.7, Central: 0.7 },
    breakdown: { flights: 21000, stay: 12500, activities: 11000, transfers: 5500 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 10500
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 10500
      }
    ],
    hotel: {
      name: 'Zagreb Central Hotel',
      rating: 4,
      location: 'City Centre, Zagreb',
      distanceToCenter: '0.3 km',
      totalCost: 12500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Zagreb Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 1833
      },
      {
        from: 'Hotel',
        to: 'Zagreb Airport',
        type: 'Shuttle',
        cost: 1833
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Zagreb highlights',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Croatia dishes',
            cost: 1000,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1500,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Zagreb highlights',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Croatia dishes',
            cost: 1000,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1500,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1500,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'belgrade',
    name: 'Belgrade',
    country: 'Serbia',
    image: 'https://images.unsplash.com/photo-1586710334442-86e1c61a8a17?w=800&q=80',
    description: 'Where the Sava meets the Danube - fortress views, splavovi, and legendary nightlife',
    tags: [ 'Nightlife', 'River', 'Fortress', 'Budget', 'Vibrant', 'Social' ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 42000,
    vibeVector: {
      Nightlife: 0.95,
      Vibrant: 0.9,
      Budget: 0.9,
      Social: 0.9,
      River: 0.7,
      Urban: 0.7
    },
    activityVector: {
      Nightlife: 0.95,
      Food: 0.7,
      History: 0.6,
      Culture: 0.6,
      Walking: 0.6,
      Photography: 0.5
    },
    stayVector: { Budget: 0.9, City: 0.7, Central: 0.7 },
    breakdown: { flights: 17640, stay: 10500, activities: 9240, transfers: 4620 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 8820
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 8820
      }
    ],
    hotel: {
      name: 'Belgrade Central Hotel',
      rating: 4,
      location: 'City Centre, Belgrade',
      distanceToCenter: '0.3 km',
      totalCost: 10500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Belgrade Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 1540
      },
      {
        from: 'Hotel',
        to: 'Belgrade Airport',
        type: 'Shuttle',
        cost: 1540
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Belgrade highlights',
            cost: 1260,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Serbia dishes',
            cost: 840,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1260,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1260,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Belgrade highlights',
            cost: 1260,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Serbia dishes',
            cost: 840,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1260,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1260,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'tirana',
    name: 'Tirana',
    country: 'Albania',
    image: 'https://images.unsplash.com/photo-1580306682852-81bd8e40361a?w=800&q=80',
    description: "Colourful capital reinventing itself - bunkers, boulevards, and Bunk'Art",
    tags: [
      'Budget',
      'Colourful',
      'Hidden Gem',
      'Culture',
      'History',
      'Emerging'
    ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 38000,
    vibeVector: {
      Budget: 0.95,
      Emerging: 0.9,
      Colourful: 0.8,
      Culture: 0.6,
      Quirky: 0.7,
      Friendly: 0.7
    },
    activityVector: {
      Culture: 0.7,
      History: 0.7,
      Walking: 0.7,
      Food: 0.6,
      Photography: 0.6,
      Markets: 0.5
    },
    stayVector: { Budget: 0.95, City: 0.7, Central: 0.7 },
    breakdown: { flights: 15960, stay: 9500, activities: 8360, transfers: 4180 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 7980
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 7980
      }
    ],
    hotel: {
      name: 'Tirana Central Hotel',
      rating: 4,
      location: 'City Centre, Tirana',
      distanceToCenter: '0.3 km',
      totalCost: 9500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Tirana Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 1393
      },
      {
        from: 'Hotel',
        to: 'Tirana Airport',
        type: 'Shuttle',
        cost: 1393
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Tirana highlights',
            cost: 1140,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Albania dishes',
            cost: 760,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1140,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1140,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Tirana highlights',
            cost: 1140,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Albania dishes',
            cost: 760,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1140,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1140,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'larnaca',
    name: 'Larnaca',
    country: 'Cyprus',
    image: 'https://images.unsplash.com/photo-1560415755-bd80d06eda60?w=800&q=80',
    description: 'Salt lake flamingos, Zenobia wreck diving, and golden Mediterranean beaches',
    tags: [ 'Beach', 'Diving', 'Mediterranean', 'Sun', 'History', 'Relaxed' ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 60000,
    vibeVector: {
      Beach: 0.9,
      Sun: 0.9,
      Mediterranean: 0.9,
      Relaxed: 0.8,
      Warm: 0.9,
      Coastal: 0.8
    },
    activityVector: {
      Beach: 0.9,
      Diving: 0.7,
      Relaxation: 0.8,
      History: 0.6,
      Swimming: 0.8,
      Photography: 0.6
    },
    stayVector: { Beach: 0.8, Resort: 0.7, Budget: 0.7 },
    breakdown: { flights: 25200, stay: 15000, activities: 13200, transfers: 6600 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 12600
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 12600
      }
    ],
    hotel: {
      name: 'Larnaca Central Hotel',
      rating: 4,
      location: 'City Centre, Larnaca',
      distanceToCenter: '0.3 km',
      totalCost: 15000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Larnaca Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2200
      },
      {
        from: 'Hotel',
        to: 'Larnaca Airport',
        type: 'Shuttle',
        cost: 2200
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Larnaca highlights',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Cyprus dishes',
            cost: 1200,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1800,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Larnaca highlights',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Cyprus dishes',
            cost: 1200,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1800,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1800,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'paphos',
    name: 'Paphos',
    country: 'Cyprus',
    image: 'https://images.unsplash.com/photo-1580402427914-a6cc60d7c150?w=800&q=80',
    description: 'Birthplace of Aphrodite - UNESCO mosaics, sea caves, and turquoise bays',
    tags: [ 'Beach', 'Ancient', 'Mythology', 'UNESCO', 'Sun', 'Scenic' ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 62000,
    vibeVector: {
      Beach: 0.9,
      Ancient: 0.8,
      Scenic: 0.9,
      Sun: 0.9,
      Romantic: 0.7,
      Mythology: 0.7
    },
    activityVector: {
      Beach: 0.9,
      History: 0.8,
      Photography: 0.8,
      Swimming: 0.7,
      Culture: 0.6,
      Nature: 0.6
    },
    stayVector: { Beach: 0.8, Resort: 0.7, Scenic: 0.7 },
    breakdown: { flights: 26040, stay: 15500, activities: 13640, transfers: 6820 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 13020
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 13020
      }
    ],
    hotel: {
      name: 'Paphos Central Hotel',
      rating: 4,
      location: 'City Centre, Paphos',
      distanceToCenter: '0.3 km',
      totalCost: 15500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Paphos Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2273
      },
      {
        from: 'Hotel',
        to: 'Paphos Airport',
        type: 'Shuttle',
        cost: 2273
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Paphos highlights',
            cost: 1860,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Cyprus dishes',
            cost: 1240,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1860,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1860,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Paphos highlights',
            cost: 1860,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Cyprus dishes',
            cost: 1240,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1860,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1860,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'cork',
    name: 'Cork',
    country: 'Ireland',
    image: 'https://images.unsplash.com/photo-1564959130747-897e0b5d5e13?w=800&q=80',
    description: "Ireland's foodie capital - English Market, craft beer, and Wild Atlantic Way gateway",
    tags: [ 'Food', 'Pubs', 'Culture', 'Coastal', 'Friendly', 'Green' ],
    duration: '3 Days, 2 Nights',
    costLevel: 2,
    totalCost: 78000,
    vibeVector: {
      Food: 0.9,
      Social: 0.8,
      Culture: 0.7,
      Coastal: 0.6,
      Green: 0.7,
      Friendly: 0.8
    },
    activityVector: {
      Food: 0.9,
      Beer: 0.8,
      Culture: 0.7,
      Walking: 0.7,
      Nature: 0.6,
      Music: 0.6
    },
    stayVector: { City: 0.7, Boutique: 0.6, Cozy: 0.7 },
    breakdown: { flights: 32760, stay: 19500, activities: 17160, transfers: 8580 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 16380
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 16380
      }
    ],
    hotel: {
      name: 'Cork Central Hotel',
      rating: 4,
      location: 'City Centre, Cork',
      distanceToCenter: '0.3 km',
      totalCost: 19500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Cork Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 2860
      },
      {
        from: 'Hotel',
        to: 'Cork Airport',
        type: 'Shuttle',
        cost: 2860
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Cork highlights',
            cost: 2340,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Ireland dishes',
            cost: 1560,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2340,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2340,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Cork highlights',
            cost: 2340,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Ireland dishes',
            cost: 1560,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 2340,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 2340,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'varna',
    name: 'Varna',
    country: 'Bulgaria',
    image: 'https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b?w=800&q=80',
    description: 'Black Sea pearl - Roman baths, sea garden promenades, and summer nightlife',
    tags: [ 'Beach', 'Budget', 'Sun', 'History', 'Coastal', 'Nightlife' ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 42000,
    vibeVector: {
      Beach: 0.85,
      Budget: 0.9,
      Sun: 0.85,
      Coastal: 0.8,
      Nightlife: 0.6,
      Relaxed: 0.7
    },
    activityVector: {
      Beach: 0.85,
      History: 0.6,
      Relaxation: 0.7,
      Nightlife: 0.6,
      Swimming: 0.7,
      Walking: 0.6
    },
    stayVector: { Beach: 0.8, Budget: 0.9, Resort: 0.6 },
    breakdown: { flights: 17640, stay: 10500, activities: 9240, transfers: 4620 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 8820
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 8820
      }
    ],
    hotel: {
      name: 'Varna Central Hotel',
      rating: 4,
      location: 'City Centre, Varna',
      distanceToCenter: '0.3 km',
      totalCost: 10500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Varna Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 1540
      },
      {
        from: 'Hotel',
        to: 'Varna Airport',
        type: 'Shuttle',
        cost: 1540
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Varna highlights',
            cost: 1260,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Bulgaria dishes',
            cost: 840,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1260,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1260,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Varna highlights',
            cost: 1260,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Bulgaria dishes',
            cost: 840,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1260,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1260,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'clujnapoca',
    name: 'Cluj-Napoca',
    country: 'Romania',
    image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&q=80',
    description: 'Transylvanian cultural hub - festivals, students, and a booming tech scene',
    tags: [
      'Culture',
      'Budget',
      'Festivals',
      'Students',
      'Emerging',
      'History'
    ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 40000,
    vibeVector: {
      Culture: 0.8,
      Budget: 0.9,
      Vibrant: 0.7,
      Emerging: 0.8,
      Social: 0.7,
      History: 0.6
    },
    activityVector: {
      Culture: 0.8,
      Nightlife: 0.7,
      Food: 0.7,
      History: 0.6,
      Walking: 0.6,
      Music: 0.6
    },
    stayVector: { Budget: 0.9, City: 0.7, Central: 0.7 },
    breakdown: { flights: 16800, stay: 10000, activities: 8800, transfers: 4400 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 8400
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 8400
      }
    ],
    hotel: {
      name: 'Cluj-Napoca Central Hotel',
      rating: 4,
      location: 'City Centre, Cluj-Napoca',
      distanceToCenter: '0.3 km',
      totalCost: 10000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Cluj-Napoca Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 1467
      },
      {
        from: 'Hotel',
        to: 'Cluj-Napoca Airport',
        type: 'Shuttle',
        cost: 1467
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Cluj-Napoca highlights',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Romania dishes',
            cost: 800,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1200,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Cluj-Napoca highlights',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Romania dishes',
            cost: 800,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1200,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  },
  {
    destinationId: 'sarajevo',
    name: 'Sarajevo',
    country: 'Bosnia',
    image: 'https://images.unsplash.com/photo-1590079407872-e8afecb00e6e?w=800&q=80',
    description: 'East meets West - Ottoman bazaars, Austro-Hungarian boulevards, wartime resilience',
    tags: [
      'History',
      'Culture',
      'Budget',
      'Ottoman',
      'Authentic',
      'Hidden Gem'
    ],
    duration: '3 Days, 2 Nights',
    costLevel: 1,
    totalCost: 40000,
    vibeVector: {
      History: 0.9,
      Culture: 0.9,
      Budget: 0.9,
      Authentic: 0.9,
      Heritage: 0.8,
      Emerging: 0.7
    },
    activityVector: {
      History: 0.9,
      Culture: 0.8,
      Food: 0.7,
      Walking: 0.7,
      Photography: 0.7,
      Heritage: 0.7
    },
    stayVector: { Budget: 0.9, Central: 0.7, Boutique: 0.6 },
    breakdown: { flights: 16800, stay: 10000, activities: 8800, transfers: 4400 },
    flights: [
      {
        type: 'departure',
        airline: 'Multi-carrier',
        flightNo: 'XX100',
        from: 'DEL',
        to: 'DEST',
        departure: '02:00',
        arrival: '09:00',
        duration: '10h',
        cost: 8400
      },
      {
        type: 'return',
        airline: 'Multi-carrier',
        flightNo: 'XX101',
        from: 'DEST',
        to: 'DEL',
        departure: '11:00',
        arrival: '01:00 +1',
        duration: '10h',
        cost: 8400
      }
    ],
    hotel: {
      name: 'Sarajevo Central Hotel',
      rating: 4,
      location: 'City Centre, Sarajevo',
      distanceToCenter: '0.3 km',
      totalCost: 10000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      nights: 2
    },
    transfers: [
      {
        from: 'Sarajevo Airport',
        to: 'Hotel',
        type: 'Shuttle',
        cost: 1467
      },
      {
        from: 'Hotel',
        to: 'Sarajevo Airport',
        type: 'Shuttle',
        cost: 1467
      }
    ],
    days: [
      {
        day: 1,
        title: 'Arrival & Discovery',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Sarajevo highlights',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Bosnia dishes',
            cost: 800,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1200,
            type: 'food'
          }
        ]
      },
      {
        day: 2,
        title: 'Exploration & Farewell',
        items: [
          {
            time: '10:00',
            activity: 'Morning exploration',
            description: 'Explore Sarajevo highlights',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '13:00',
            activity: 'Local cuisine lunch',
            description: 'Traditional Bosnia dishes',
            cost: 800,
            type: 'food'
          },
          {
            time: '15:00',
            activity: 'Afternoon activity',
            description: 'Cultural experience',
            cost: 1200,
            type: 'activity'
          },
          {
            time: '20:00',
            activity: 'Evening dining',
            description: 'Dinner at local restaurant',
            cost: 1200,
            type: 'food'
          }
        ]
      },
      {
        day: 3,
        title: 'Departure',
        items: [
          {
            time: '08:00',
            activity: 'Checkout',
            description: 'Transfer to airport',
            cost: 0,
            type: 'travel'
          },
          {
            time: '11:00',
            activity: 'Departure Flight',
            description: 'Return flight',
            cost: 0,
            type: 'travel'
          }
        ]
      }
    ]
  }
]