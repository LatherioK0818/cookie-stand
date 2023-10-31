"use strict";

const cl = (input) => { console.log(input) };

const seattle = {
    name: 'Seattle',
    hoursOpen: '6 am - 7pm',
    contactInfo: '123-456-7890',
    location: '2901 3rd Ave #300, Seattle, WA 98121',
    minCustomers: 23,
    maxCustomers: 65,
    avgCookiesPerCustomer: 6.3,
};
const tokyo = {
    name: 'Tokyo',
    hoursOpen: '6 am - 7pm',
    contactInfo: '222-222-2222',
    location: '1 Chrome-1-2 Oshiage, Sumida City, Tokyo 131-8634',
    minCustomers: 3,
    maxCustomers: 24,
    avgCookiesPerCustomer: 1.2,
};
const dubai = {
    name: 'Dubai',
    hoursOpen: '6 am - 7pm',
    contactInfo: '333-333-3333',
    location: 'Sheikh Mohammad bin Rashid Blvd - Dubai',
    minCustomers: 11,
    maxCustomers: 38,
    avgCookiesPerCustomer: 3.7,
};
const paris = {
    name: 'Paris',
    hoursOpen: '6 am - 7pm',
    contactInfo: '444-444-4444',
    location: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris',
    minCustomers: 20,
    maxCustomers: 38,
    avgCookiesPerCustomer: 2.3,
};
const lima = {
    name: 'Lima',
    hoursOpen: '6 am - 7pm',
    contactInfo: '555-555-5555',
    location: 'Ca. Gral. Borgono cuadra 8, Miraflores 15074',
    minCustomers: 2,
    maxCustomers: 16,
    avgCookiesPerCustomer: 4.6,
};
const locations = [seattle, tokyo, dubai, paris, lima];
const salesList = document.getElementById('sales-list');

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
]

function generateHourlySales(location) {
    const hourlySales = [];
    const locationHeader = document.createElement('h2');
    locationHeader.textContent = location.name;
    salesList.appendChild(locationHeader);
    hours.forEach(hour => {
        const randomCustomers = Math.floor(Math.random() * (location.maxCustomers - location.minCustomers + 1) + location.minCustomers);
        const cookiesSold = Math.ceil(randomCustomers * location.avgCookiesPerCustomer);
        hourlySales.push(cookiesSold);
        // Display the results on the page
        const listItem = document.createElement('li');
        listItem.textContent = `${hour}: ${cookiesSold} cookies`;
        salesList.appendChild(listItem);
    })
    // Calculate and display the total cookies sold for the day
    const totalCookies = hourlySales.reduce((a, b) => a + b, 0);
    const totalListItem = document.createElement('li');
    totalListItem.textContent = `Total: ${totalCookies} cookies`;
    salesList.appendChild(totalListItem);
}

locations.forEach(loc => {
    generateHourlySales(loc);
});