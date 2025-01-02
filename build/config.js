const apiConfig = {
  rapidAPIKey: '551fb32346mshe50f87950d5dcb3p133f07jsn93e08ff1b17d', // RapidAPI की मुख्य Key
  services: {
    flightBooking: {
      url: 'https://amadeus-api2.p.rapidapi.com/airport-on-time-performance',
      host: 'amadeus-api2.p.rapidapi.com'
    },
    trainBooking: {
      url: 'https://amadeus-api2.p.rapidapi.com/airport-on-time-performance',
      host: 'amadeus-api2.p.rapidapi.com'
    },
    busBooking: {
      url: 'https://bus-booking-api.p.rapidapi.com/book',
      host: 'bus-booking-api.p.rapidapi.com'
    },
    movieBooking: {
      url: 'https://tmdb-movies-and-tv-shows-api-by-apirobots.p.rapidapi.com/v1/tmdb/random',
      host: 'tmdb-movies-and-tv-shows-api-by-apirobots.p.rapidapi.com'
    },

    creditscore: {
       url: 'https://equifax-credit-report-score.p.rapidapi.com/GetReport',
       host: 'equifax-credit-report-score.p.rapidapi.com '
      }
    }
  };
     paymentGateway: {
      url: 'https://payment-gateway.p.rapidapi.com/transaction',
      host: 'payment-gateway.p.rapidapi.com'
    }
  }
};


module.exports = apiConfig;