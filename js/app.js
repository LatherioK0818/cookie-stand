"use strict";

const locations = [];


// Define a class for location objects
function Location(name, minCustomers, maxCustomers, avgCookiesPerCustomer) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.hourlySales = new Array(14).fill(0);
  this.totalSales = 0;
}

// Define location objects using the Location class
const seattle = new Location(
  'Seattle',
  23,
  65,
  6.3
);
const tokyo = new Location(
  'Tokyo',
  3,
  24,
  1.2
);
const dubai = new Location(
  'Dubai',
  11,
  38,
  3.7
);
const paris = new Location(
  'Paris',
  20,
  38,
  2.3
);
const lima = new Location(
  'Lima',
  2,
  16,
  4.6
);

const hours = [
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm'
];

function generateRandomCustomers(minCustomers, maxCustomers) {
  return Math.floor(Math.random() * (maxCustomers - minCustomers + 1) + minCustomers);
}

Location.prototype.calculateHourlySales = function() {
  for (let i = 0; i < 14; i++) {
    const randomCustomers = generateRandomCustomers(this.minCustomers, this.maxCustomers);
    const cookiesSold = Math.floor(randomCustomers * this.avgCookiesPerCustomer);
    this.hourlySales[i] = cookiesSold;
    this.totalSales += cookiesSold;
  }
};

function renderLocation(location) {
  const tableBody = document.getElementById('sales-data');
  const locationRow = document.createElement('tr');
  tableBody.appendChild(locationRow);

  const locationName = document.createElement('td');
  locationName.textContent = location.name;
  locationRow.appendChild(locationName);

  location.hourlySales.forEach(cookiesSold => {
    const cell = document.createElement('td');
    cell.textContent = cookiesSold;
    locationRow.appendChild(cell);
  });

  const totalSalesCell = document.createElement('td');
  totalSalesCell.textContent = location.totalSales;
  locationRow.appendChild(totalSalesCell);
}

locations.push(seattle, tokyo, dubai, paris, lima);

locations.forEach(location => {
  location.calculateHourlySales();
  renderLocation(location);
});

// Calculate the hourly totals for all locations
const hourlyTotals = new Array(14).fill(0);

locations.forEach(location => {
  location.hourlySales.forEach((cookiesSold, i) => {
    hourlyTotals[i] += cookiesSold;
  });

  // Update the totals in the HTML table
  for (let i = 0; i < 14; i++) {
    const cellId = `total-${hours[i]}`; // Assumes the first cell is for 6am
    const cell = document.getElementById(cellId);
    cell.textContent = hourlyTotals[i];
  }
});
