// Define location data using arrays
const seattleData = [
    'Seattle',
    '6 am - 7 pm',
    '123-456-7890',
    '2901 3rd Ave #300, Seattle, WA 98121',
    23,
    65,
    6.3
  ];
  
  const tokyoData = [
    'Tokyo',
    '6 am - 7 pm',
    '222-222-2222',
    '1 Chrome-1-2 Oshiage, Sumida City, Tokyo 131-8634',
    3,
    24,
    1.2
  ];
  
  const dubaiData = [
    'Dubai',
    '6 am - 7 pm',
    '333-333-3333',
    'Sheikh Mohammad bin Rashid Blvd - Dubai',
    11,
    38,
    3.7
  ];
  
  const parisData = [
    'Paris',
    '6 am - 7 pm',
    '444-444-4444',
    'Champ de Mars, 5 Avenue Anatole France, 75007 Paris',
    20,
    38,
    2.3
  ];
  
  const limaData = [
    'Lima',
    '6 am - 7 pm',
    '555-555-5555',
    'Ca. Gral. Borgono cuadra 8, Miraflores 15074',
    2,
    16,
    4.6
  ];
  
  // Create location objects using arrays
  const seattle = new CookieLocation(...seattleData);
  const tokyo = new CookieLocation(...tokyoData);
  const dubai = new CookieLocation(...dubaiData);
  const paris = new CookieLocation(...parisData);
  const lima = new CookieLocation(...limaData);
  
  // Define a class for location objects
  function CookieLocation(name, hoursOpen, contactInfo, address, minCustomers, maxCustomers, avgCookiesPerCustomer) {
    this.name = name;
    this.hoursOpen = hoursOpen;
    this.contactInfo = contactInfo;
    this.address = address;
    this.minCustomers = minCustomers;
    this.maxCustomers = maxCustomers;
    this.avgCookiesPerCustomer = avgCookiesPerCustomer;
    this.hourlySales = new Array(14).fill(0);
    this.totalSales = 0;
  }
  
  // Function to display location information
  function displayLocationInformation(location) {
    const locationInfoDiv = document.getElementById('location-info');
    locationInfoDiv.innerHTML = `
      <h3>${location.name}</h3>
      <p><strong>Address:</strong> ${location.address}</p>
      <p><strong>Hours Open:</strong> ${location.hoursOpen}</p>
      <p><strong>Contact Information:</strong> ${location.contactInfo}</p>
    `;
  }
  
  // Add an event listener to display location information when a location is clicked
  const locationList = document.querySelectorAll('ul li');
  locationList.forEach(locationItem => {
    locationItem.addEventListener('click', () => {
      const locationId = locationItem.id;
      const location = getLocationObject(locationId);
      displayLocationInformation(location);
    });
  });
  
  // Function to get the location object based on the location ID
  function getLocationObject(locationId) {
    switch (locationId) {
      case 'seattle':
        return seattle;
      case 'tokyo':
        return tokyo;
      case 'dubai':
        return dubai;
      case 'paris':
        return paris;
      case 'lima':
        return lima;
      default:
        return null;
    }
  }
  