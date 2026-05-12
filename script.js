
const bhandaras = [
  {
    title: "Kashi Vishwanath Seva Bhoj",
    city: "varanasi",
    location: "Godowlia, Varanasi",
    time: "Serving 11:00 AM - 3:00 PM",
    menu: "Khichdi, aloo sabzi, gur, and jal seva",
    need: "volunteers",
    status: "Serving Soon",
  },
  {
    title: "Hanuman Mandir Mangal Bhandara",
    city: "delhi",
    location: "Connaught Place, Delhi NCR",
    time: "Every Tuesday, 12:30 PM",
    menu: "Puri sabzi, boondi, and chilled water",
    need: "supplies",
    status: "Needs Supplies",
  },
  {
    title: "Govind Dev Ji Annadaan",
    city: "jaipur",
    location: "Jaleb Chowk, Jaipur",
    time: "Sunday, 10:00 AM - 2:00 PM",
    menu: "Dal, rice, roti, halwa prasad",
    need: "sponsor",
    status: "Sponsor Open",
  },
];

const cityFilter = document.querySelector("#cityFilter");
const needFilter = document.querySelector("#needFilter");
const list = document.querySelector("#bhandaraList");
const form = document.querySelector("#joinForm");
const formNote = document.querySelector("#formNote");

function renderBhandaras() {
  const city = cityFilter.value;
  const need = needFilter.value;
  const visible = bhandaras.filter((item) => {
    const cityMatch = city === "all" || item.city === city;
    const needMatch = need === "all" || item.need === need;
    return cityMatch && needMatch;
  });

  list.innerHTML = visible
    .map(
      (item) => `
        <article class="bhandara-card">
          <div>
            <h3>${item.title}</h3>
            <p>${item.menu}</p>
            <div class="bhandara-meta" aria-label="${item.title} details">
              <span>${item.location}</span>
              <span>${item.time}</span>
              <span>${item.need}</span>
            </div>
          </div>
          <span class="status-pill">${item.status}</span>
        </article>
      `,
    )
    .join("");

  if (!visible.length) {
    list.innerHTML = `
      <article class="bhandara-card">
        <div>
          <h3>No bhandara found</h3>
          <p>Try a wider city or need filter. New seva cards can be added from the form below.</p>
        </div>
      </article>
    `;
  }
}

cityFilter.addEventListener("change", renderBhandaras);
needFilter.addEventListener("change", renderBhandaras);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name").toString().trim();
  formNote.textContent = `${name} seva card drafted. Connect this form to your backend when ready.`;
  form.reset();
});

renderBhandaras();
