/* Interactive Calendar for Events */
const eventsData = JSON.parse(document.getElementById('events-data').textContent.trim());

const calendarToggle = document.getElementById('calendar-toggle');
const calendarModal = document.getElementById('calendar-modal');
const calendarBackdrop = document.querySelector('.calendar-backdrop');
const closeBtn = document.getElementById('close-calendar');
const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');
const currentMonthEl = document.getElementById('current-month');
const calendarGrid = document.querySelector('.calendar-grid');
const eventDetails = document.getElementById('event-details');
const selectedDateEl = document.getElementById('selected-date');
const eventsListEl = document.getElementById('events-list');

// Set initial date to first event month or current month
let currentDate = new Date();
if (eventsData.length > 0) {
  const firstEventDate = new Date(eventsData[0].date);
  currentDate = new Date(firstEventDate.getFullYear(), firstEventDate.getMonth(), 1);
}
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Parse events and create date map
const eventsByDate = {};
eventsData.forEach(event => {
  const date = new Date(event.date);
  const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  if (!eventsByDate[dateKey]) {
    eventsByDate[dateKey] = [];
  }
  eventsByDate[dateKey].push(event);
});

function openCalendar() {
  calendarModal.classList.remove('hidden');
  calendarModal.classList.add('visible');
  document.body.style.overflow = 'hidden';
  renderCalendar();
}

function closeCalendar() {
  calendarModal.classList.remove('visible');
  calendarModal.classList.add('hidden');
  document.body.style.overflow = '';
  eventDetails.classList.add('hidden');
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  currentMonthEl.textContent = `${months[month]} ${year}`;
  
  // Clear existing days (keep headers)
  const dayElements = calendarGrid.querySelectorAll('.calendar-day');
  dayElements.forEach(el => el.remove());
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    const prevMonthDay = new Date(year, month, 0 - (startingDayOfWeek - 1 - i));
    const dayEl = createDayElement(prevMonthDay.getDate(), true);
    calendarGrid.appendChild(dayEl);
  }
  
  // Add days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const hasEvents = !!(eventsByDate[dateKey] && eventsByDate[dateKey].length > 0);
    
    const dayEl = createDayElement(day, false, hasEvents, dateKey);
    calendarGrid.appendChild(dayEl);
  }
  
  // Fill remaining cells
  const totalCells = calendarGrid.children.length - 7; // Subtract headers
  const remainingCells = 42 - totalCells; // 6 rows × 7 days
  for (let i = 1; i <= remainingCells; i++) {
    const nextMonthDay = createDayElement(i, true);
    calendarGrid.appendChild(nextMonthDay);
  }
}

function createDayElement(day, isOtherMonth = false, hasEvents = false, dateKey = null) {
  const dayEl = document.createElement('div');
  dayEl.className = 'calendar-day';
  dayEl.textContent = day;
  
  if (isOtherMonth) {
    dayEl.classList.add('other-month');
  }
  
  if (hasEvents) {
    dayEl.classList.add('has-event');
    // Add inline styles as fallback
    dayEl.style.background = 'rgba(255, 215, 0, 0.3)';
    dayEl.style.color = '#FFD700';
    dayEl.style.fontWeight = 'bold';
    dayEl.style.border = '1px solid rgba(255, 215, 0, 0.5)';
    dayEl.addEventListener('click', () => showEventDetails(dateKey));
  }
  
  return dayEl;
}

function showEventDetails(dateKey) {
  const events = eventsByDate[dateKey];
  if (!events || events.length === 0) return;
  
  const date = new Date(dateKey);
  const formattedDate = date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  selectedDateEl.textContent = formattedDate;
  
  eventsListEl.innerHTML = '';
  events.forEach(event => {
    const eventEl = document.createElement('div');
    eventEl.className = 'event-item';
    eventEl.innerHTML = `
      <h5>${event.title}</h5>
      <p>${event.location}</p>
    `;
    eventsListEl.appendChild(eventEl);
  });
  
  eventDetails.classList.remove('hidden');
}

function changeMonth(direction) {
  currentDate.setMonth(currentDate.getMonth() + direction);
  renderCalendar();
  eventDetails.classList.add('hidden');
}

// Event listeners
calendarToggle.addEventListener('click', openCalendar);
closeBtn.addEventListener('click', closeCalendar);
calendarBackdrop.addEventListener('click', closeCalendar);
prevBtn.addEventListener('click', () => changeMonth(-1));
nextBtn.addEventListener('click', () => changeMonth(1));

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && calendarModal.classList.contains('visible')) {
    closeCalendar();
  }
});
