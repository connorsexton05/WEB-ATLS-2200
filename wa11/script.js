const API_KEY = "Nv7JmQzA2sO1LMpooQlgJHwlAOKX1iNg";
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearHistory");
const eventsDiv = document.getElementById("events");
const errorDiv = document.getElementById("error");

searchBtn.addEventListener("click", () => {
  const city = document.getElementById("city").value.trim();
  const radius = document.getElementById("radius").value.trim();

  if (!city) {
    errorDiv.textContent = "Please enter a city name.";
    return;
  }

  fetchEvents(city, radius);
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("searchHistory");
  eventsDiv.innerHTML = "";
  errorDiv.textContent = "Search history cleared.";
});

async function fetchEvents(city, radius) {
  errorDiv.textContent = "";
  eventsDiv.innerHTML = "<p>Loading events...</p>";

  try {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&city=${encodeURIComponent(city)}&radius=${radius}&unit=miles&classificationName=music`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    const events = data._embedded?.events || [];

    displayEvents(events, city);

    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    history.push({ city, radius, time: new Date().toLocaleString() });
    localStorage.setItem("searchHistory", JSON.stringify(history));

  } catch (err) {
    console.error(err);
    errorDiv.textContent = `${err.message}`;
    eventsDiv.innerHTML = "";
  }
}

function displayEvents(events, city) {
  eventsDiv.innerHTML = "";
  if (!events.length) {
    eventsDiv.innerHTML = `<p>No upcoming events found near ${city}.</p>`;
    return;
  }

  events.forEach(event => {
    const div = document.createElement("div");
    div.classList.add("event");
    const imgObj = event.images?.find(i => i.ratio === "16_9") || event.images?.[0];
    const img = imgObj?.url || "";

    div.innerHTML = `
      <h2>${event.name}</h2>
      <p>${event.dates?.start?.localDate || "No date"}</p>
      ${img ? `<img src="${img}" alt="Event image" />` : ""}
      <p><a href="${event.url}" target="_blank">View on Ticketmaster</a></p>`;
    eventsDiv.appendChild(div);
  });
}
