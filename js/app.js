"use strict";

const locations = [];
const totalDailyCookies = new Array(14).fill(0);

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
const seattle = new Location('Seattle', 23, 65, 6.3);
const tokyo = new Location('Tokyo', 3, 24, 1.2);
const dubai = new Location('Dubai', 11, 38, 3.7);
const paris = new Location('Paris', 20, 38, 2.3);
const lima = new Location('Lima', 2, 16, 4.6);

// Add these location objects to your 'locations' array
locations.push(seattle, tokyo, dubai, paris, lima);

const hours = [
  '6am', '7am', '8am', '9am', '10am', '11am', '12pm',
  '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'
];

function generateRandomCustomers(minCustomers, maxCustomers) {
  return Math.floor(Math.random() * (maxCustomers - minCustomers + 1) + minCustomers);
}

Location.prototype.calculateHourlySales = function () {
  for (let i = 0; i < 14; i++) {
    const randomCustomers = generateRandomCustomers(this.minCustomers, this.maxCustomers);
    const cookiesSold = Math.floor(randomCustomers * this.avgCookiesPerCustomer);
    this.hourlySales[i] = cookiesSold;
    this.totalSales += cookiesSold;
    totalDailyCookies[i] += cookiesSold; // Update the daily total cookies
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

function updateFooter() {
  const footerTotals = document.getElementById('Totals');
  const grandTotalCell = footerTotals.querySelector('#grand-total');
  grandTotalCell.textContent = calculateGrandTotal();
}

function calculateGrandTotal() {
  return totalDailyCookies.reduce((a, b) => a + b, 0);
}

function updateTable() {
  const tableBody = document.getElementById('sales-data');
  tableBody.innerHTML = ''; // Clear the table

  locations.forEach(location => {
    location.calculateHourlySales();
    renderLocation(location);
  });

  const hourlyTotals = new Array(14).fill(0);

  locations.forEach(location => {
    location.hourlySales.forEach((cookiesSold, i) => {
      hourlyTotals[i] += cookiesSold;
    });
  });

  // Clear the old footer totals.
  const footerTotals = document.getElementById('Totals');
  footerTotals.innerHTML = '';

  // Create a new footer row for totals
  const totalsRow = document.createElement('tr');
  footerTotals.appendChild(totalsRow);

  // Create and append the 'Totals' cell
  const totalsCell = document.createElement('td');
  totalsCell.textContent = 'Totals';
  totalsRow.appendChild(totalsCell);

  // Calculate and add the hourly totals
  hourlyTotals.forEach(total => {
    const totalCell = document.createElement('td');
    totalCell.textContent = total;
    totalsRow.appendChild(totalCell);
  });

  // Calculate and add the sum of the totals to the footer
  const sumTotalCell = document.createElement('td');
  sumTotalCell.textContent = hourlyTotals.reduce((a, b) => a + b, 0);
  totalsRow.appendChild(sumTotalCell);

  updateFooter();
}

// Get DOM elements for event listener
const addLocationForm = document.getElementById('new-form'); 

// ... EVENT LISTENER ...
addLocationForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page.

  // Get user input from the form fields.
  const name = document.getElementById('name').value;
  const minCustomers = parseInt(document.getElementById('min-cust').value);
  const maxCustomers = parseInt(document.getElementById('max-cust').value);
  const avgCookiesPerCustomer = parseFloat(document.getElementById('avg-cookies').value);

  const existingLocation = locations.find(location => location.name === name);
  if (existingLocation) {
    alert("A location with the same name already exists. Please provide a unique name.");
    return;
  }

  // Create a new Location instance with the user input.
  const newLocation = new Location(name, minCustomers, maxCustomers, avgCookiesPerCustomer);

  // Add the new location to the locations array.
  locations.push(newLocation);
  addLocationForm.reset();

  updateTable(); // Update the table and footer
});

updateTable(); // Initial table setup
