"use strict";
        
function CookieStand(name, minCustomers, maxCustomers, avgCookiesPerCustomer) {
    this.name = name;
    this.minCustomers = minCustomers;
    this.maxCustomers = maxCustomers;
    this.avgCookiesPerCustomer = avgCookiesPerCustomer;
    this.cookiesSoldPerHour = [];

    this.calculateCookiesSold = function() {
        for (let hour = 6; hour <= 20; hour++) {
            const randomCustomers = Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
            const cookiesSold = Math.ceil(randomCustomers * this.avgCookiesPerCustomer);
            this.cookiesSoldPerHour.push(cookiesSold);
        }
    };
}

const seattle = new CookieStand('Seattle', 23, 65, 6.3);
const tokyo = new CookieStand('Tokyo', 3, 24, 1.2);
const dubai = new CookieStand('Dubai', 11, 38, 3.7);
const paris = new CookieStand('Paris', 20, 38, 2.3);
const lima = new CookieStand('Lima', 2, 16, 4.6);

const locations = [seattle, tokyo, dubai, paris, lima];
const salesTable = document.getElementById('sales-data');

const hours = [
    '6:00am',
    '7:00am',
    '8:00am',
    '9:00am',
    '10:00am',
    '11:00am',
    '12:00pm',
    '1:00pm',
    '2:00pm',
    '3:00pm',
    '4:00pm',
    '5:00pm',
    '6:00pm',
    '7:00pm',
    '8:00pm',
];

function generateHourlySales(location) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${location.name}</td>`;
    
    location.calculateCookiesSold();

    for (let i = 0; i < location.cookiesSoldPerHour.length; i++) {
        row.innerHTML += `<td>${location.cookiesSoldPerHour[i]}</td>`;
    }

    const totalCookies = location.cookiesSoldPerHour.reduce((a, b) => a + b, 0);
    row.innerHTML += `<td>${totalCookies}</td>`;
    
    salesTable.appendChild(row);
    
}
// Create a function to calculate and display hourly totals
function calculateHourlyTotals() {
    const hourlyTotals = new Array(hours.length).fill(0);

    locations.forEach(location => {
        location.calculateCookiesSold();

        for (let i = 0; i < location.cookiesSoldPerHour.length; i++) {
            hourlyTotals[i] += location.cookiesSoldPerHour[i];
        }
    });

    return hourlyTotals;
}

function calculateTotalCookiesForHour(locations, hourIndex) {
    // Initialize a variable to store the total cookies for the specified hour
    let totalCookies = 0;

    // Loop through each location
    locations.forEach(location => {
        // Add the cookies sold for the specified hour to the total
        totalCookies += location.cookiesSoldPerHour[hourIndex];
    });
    return totalCookies; // Return the total cookies for the specified hour
}
locations.forEach(loc => {
    generateHourlySales(loc);
});
CookieStand.prototype.render = function() {
    const tableBody = document.querySelector('tbody');

    // Create a new row for this location
    const row = document.createElement('tr');

    // Populate the row with data
    const locationCell = document.createElement('td');
    locationCell.textContent = this.name;
    row.appendChild(locationCell);

    // Loop through hours and add cookies sold data
    for (let i = 0; i < this.cookiesSoldPerHour.length; i++) {
        const cookiesSoldCell = document.createElement('td');
        cookiesSoldCell.textContent = this.cookiesSoldPerHour[i];
        row.appendChild(cookiesSoldCell);
    }

    // Calculate and add the "Daily Location Total" cell
    const dailyTotalCell = document.createElement('td');
    dailyTotalCell.textContent = this.cookiesSoldPerHour.reduce((a, b) => a + b, 0);
    row.appendChild(dailyTotalCell);

    // Append the row to the table body
    tableBody.appendChild(row);
};
{
const totalsRow = document.createElement('tr');
totalsRow.innerHTML = '<td>Totals</td>';
for (let i = 0; i < hourlyTotals.length; i++) {
    totalsRow.innerHTML += `<td>${hourlyTotals[i]}</td>`;
}
const grandTotal = hourlyTotals.reduce((a, b) => a + b, 0);
totalsRow.innerHTML += `<td>${grandTotal}</td>`;
tableBody.appendChild(totalsRow);
}
renderLocations(locations);
