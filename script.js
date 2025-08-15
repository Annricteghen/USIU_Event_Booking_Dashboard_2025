let events = JSON.parse(localStorage.getItem('events')) || [
    {name: "Orientation Day", date: "2025-08-25", venue: "Auditorium", slots: 10},
    {name: "Tech Fair", date: "2025-09-02", venue: "ICT Hall", slots: 5},
    {name: "Cultural Night", date: "2025-09-10", venue: "Open Grounds", slots: 3},
    {name: "Sports Gala", date: "2025-09-15", venue: "Sports Complex", slots: 7},
    {name: "Career Expo", date: "2025-09-20", venue: "Main Hall", slots: 4}
];

function renderEvents() {
    const table = document.getElementById('eventTable');
    const select = document.getElementById('eventSelect');
    table.innerHTML = "";
    select.innerHTML = "";

    events.forEach((event, index) => {
        let row = `<tr>
            <td>${event.name}</td>
            <td>${event.date}</td>
            <td>${event.venue}</td>
            <td>${event.slots}</td>
            <td><button ${event.slots === 0 ? "disabled" : ""} onclick="registerEvent(${index})">${event.slots === 0 ? "Fully Booked" : "Register"}</button></td>
        </tr>`;
        table.innerHTML += row;
        if (event.slots > 0) {
            select.innerHTML += `<option value="${event.name}">${event.name}</option>`;
        }
    });
    localStorage.setItem('events', JSON.stringify(events));
}

function registerEvent(index) {
    if (events[index].slots > 0) {
        events[index].slots--;
        alert("Successfully Registered!");
        renderEvents();
    }
}

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let studentId = document.getElementById('studentId').value;
    let event = document.getElementById('eventSelect').value;

    // ✅ Updated validation: Only digits, 6 or 7 numbers
    if (!/^\d{6,7}$/.test(studentId)) {
        alert("Invalid Student ID. Please enter your 6 or 7-digit USIU ID number.");
        return;
    }

    document.getElementById('confirmation').innerHTML = 
        `Thank you ${name} (ID: ${studentId}) for registering for ${event}.`;
    localStorage.setItem('events', JSON.stringify(events));
});

renderEvents();
