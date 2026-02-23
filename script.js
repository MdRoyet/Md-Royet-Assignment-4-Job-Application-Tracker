// Data Lists
let interviewList = [];
let rejectedList = [];

// DOM Elements
let total = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

const allCardSection = document.getElementById("job-container");
const filterSection = document.getElementById("filtered-card-information");
const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

// Calculate Counts
function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateCount();

function toggleStyle(id) {
  [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach((btn) => {
    btn.classList.remove("bg-[#3B82F6]", "text-white");
    btn.classList.add("bg-white", "text-black");
  });

  const activeBtn = document.getElementById(id);
  activeBtn.classList.replace("bg-white", "bg-[#3B82F6]");
  activeBtn.classList.replace("text-black", "text-white");

  // Show/Hide Sections
  if (id === "all-filter-btn") {
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
    emptyPage.classList.add("hidden");
  } else if (id === "interview-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderInterview(); // Show interview list
  } else if (id === "rejected-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderRejected(); // Show rejected list
  }
}

// No Jobs Page Setup
const emptyPage = document.createElement("div");
emptyPage.className =
  "hidden flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl border border-gray-200 p-8 shadow-sm";
emptyPage.innerHTML = `
    <img src="./jobs.png" class="w-40 mb-6" />
    <h2 class="text-2xl font-bold text-slate-800">No jobs available</h2>
`;
filterSection.after(emptyPage);

// Handle Clicks (Interview/Rejected buttons)
document.addEventListener("click", function (event) {
  const target = event.target.closest("button");
  if (!target) return;

  // Interviewed and Rejected button logic
  if (target.id.startsWith("btn-int-") || target.id.startsWith("btn-rej-")) {
    const idNumber = target.id.split("-")[2];
    const card = document.getElementById(`job-card-${idNumber}`);

    const cardInfo = {
      id: idNumber,
      companyName: card.querySelector(`#company-${idNumber}`).innerText,
      roleName: card.querySelector(`#role-${idNumber}`).innerText,
      metaDetails: card.querySelector(`#meta-${idNumber}`).innerText,
      jobDescription: card.querySelector(`#desc-${idNumber}`).innerText,
    };

    if (target.id.startsWith("btn-int-")) {
      // 1. Add to Interview list if not already there
      if (!interviewList.find((item) => item.id === idNumber)) {
        interviewList.push(cardInfo);
      }
      // 2. REMOVE from Rejected list (the fix)
      rejectedList = rejectedList.filter((item) => item.id !== idNumber);

      card.querySelector(`#status-${idNumber}`).innerText = "Interviewed";
    } else if (target.id.startsWith("btn-rej-")) {
      // 1. Add to Rejected list if not already there
      if (!rejectedList.find((item) => item.id === idNumber)) {
        rejectedList.push(cardInfo);
      }
      // 2. REMOVE from Interview list (the fix)
      interviewList = interviewList.filter((item) => item.id !== idNumber);

      card.querySelector(`#status-${idNumber}`).innerText = "Rejected";
    }

    calculateCount();
  }
});

// Render Functions
function renderInterview() {
  filterSection.innerHTML = "";
  if (interviewList.length === 0) {
    emptyPage.classList.remove("hidden");
  } else {
    emptyPage.classList.add("hidden");
    interviewList.forEach((item) =>
      createFilterCard(item, "Interviewed", "green"),
    );
  }
}

function renderRejected() {
  filterSection.innerHTML = "";
  if (rejectedList.length === 0) {
    emptyPage.classList.remove("hidden");
  } else {
    emptyPage.classList.add("hidden");
    rejectedList.forEach((item) => createFilterCard(item, "Rejected", "red"));
  }
}

// filtered cards Making >>>>>
function createFilterCard(item, status, color) {
  let div = document.createElement("div");
  div.className =
    "bg-white rounded-xl border border-gray-200 p-8 shadow-sm mb-4 relative";

  div.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-xl font-bold text-slate-800">${item.companyName}</h2>
          <p class="text-slate-500 font-medium mt-1">${item.roleName}</p>
        </div>
        
        <button id="del-filter-${item.id}" class="p-2 text-gray-400 hover:text-red-500 rounded-full border border-gray-100 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div class="flex gap-2 text-sm text-gray-400 mt-4 mb-4">
        ${item.metaDetails}
      </div>
      <p class="text-gray-600 text-sm leading-relaxed mb-6">
        ${item.jobDescription}
      </p>
      <div class="flex justify-between items-center">
        <span class="px-3 py-1.5 bg-${color}-50 text-${color}-700 text-xs font-bold rounded uppercase">
          ${status}
        </span>
      </div>
  `;
  filterSection.appendChild(div);
}
