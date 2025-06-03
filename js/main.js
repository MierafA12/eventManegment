const events = [
  {
    id: 1,
    title: "Music Festival",
    date: "2025-06-15",
    time: "18:00 pm",
    description: "Join us for an amazing night of live music performances",
    price: "500 Birr",
    category: "entertainment",
    image: "images/music-festival.jpg"
  },
  {
    id: 2,
    title: "Tech Conference",
    date: "2025-06-20",
    time: "09:00 pm",
    description: "Learn about the latest technology trends",
    price: "1000 Birr",
    category: "tech",
    image: "images/tech-conference.jpg"
  },
  {
    id: 3,
    title: "Charity Run",
    date: "2025-06-22",
    time: "07:00 am",
    description: "Support a good cause while staying active",
    price: "400 Birr",
    category: "sports",
    image: "images/flowevent.jpg"
  },
  {
    id: 4,
    title: "Art Exhibition",
    date: "2025-06-25",
    time: "14:00 am",
    description: "Explore contemporary art from local artists",
    price: "Free",
    category: "Art",
    image: "images/art-exhibition.jpg"
  },
  {
    id: 5,
    title: "Business Summit",
    date: "2025-07-05",
    time: "09:00 pm",
    description: "Networking opportunities for business professionals",
    price: "800 Birr",
    category: "business",
    image: "images/business-summit.jpg"
  },
  {
    id: 6,
    title: "Food Festival",
    date: "2025-07-10",
    time: "11:00 am",
    description: "Taste your way through local and international cuisine",
    price: "300 Birr",
    category: "foods",
    image: "images/food-festival.jpg"
  },
  {
    id: 9,
    title: "Fashion Show",
    date: "2025-07-25",
    time: "19:00 pm ",
    description: "Spring/Summer fashion collection showcase",
    price: "600 Birr",
    category: "entertainment",
    image: "images/fashion-show.jpg"
  },
  {
    id: 10,
    title: "Science Fair",
    date: "2025-08-01",
    time: "13:00 am ",
    description: "Innovative projects and scientific demonstrations",
    price: "250 Birr",
    category: "tech",
    image: "images/science-fair.jpg"
  },
  {
    id: 12,
    title: "Gaming Convention",
    date: "2025-08-10",
    time: "10:00 pm ",
    description: "Gaming competitions and new releases showcase",
    price: "350 Birr",
    category: "entertainment",
    image: "images/gaming-convention.jpg"
  },
  {
    id: 13,
    title: "Book Fair",
    date: "2025-08-15",
    time: "11:00 am ",
    description: "Meet authors and discover new books",
    price: "100 Birr",
    category: "entertainment",
    image: "images/book-fair.jpg"
  },
  {
    id: 14,
    title: "Startup Pitch",
    date: "2025-08-25",
    time: "14:00 pm ",
    description: "Emerging startups showcase their innovations",
    price: "500 Birr",
    category: "business",
    image: "images/startup-pitch.jpg"
  }
];

const categoryFilter = document.getElementById('categoryFilter');
const eventGrid = document.getElementById('eventGrid');

function displayEvents(eventsToDisplay = events) {
  eventGrid.innerHTML = '';
  eventsToDisplay.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    eventCard.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p>${event.description}</p>
      <p><strong>Price:</strong> ${event.price}</p>
      <button onclick="handleEventRegistration(${event.id})">Register</button>
    `;
    eventGrid.appendChild(eventCard);
  });
}

function filterEvents() {
  const selectedCategory = categoryFilter.value;
  const filtered = selectedCategory === 'all'
    ? events
    : events.filter(e => e.category === selectedCategory);
  displayEvents(filtered);
}

function handleEventRegistration(eventId) {
  const selectedEvent = events.find(e => e.id === eventId);
  if (selectedEvent) {
    localStorage.setItem("selectedEvent", JSON.stringify(selectedEvent));
    window.location.href = "register.html";
  } else {
    alert("Event not found.");
  }
}


document.addEventListener('DOMContentLoaded', () => {
  displayEvents();

  categoryFilter.addEventListener('change', filterEvents);

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  const navItems = navLinks.querySelectorAll('a');
  navItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

