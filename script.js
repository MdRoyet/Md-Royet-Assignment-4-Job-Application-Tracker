// Stores all jobs marked as "Interviewed"
let interviewList = [];

// Stores all jobs marked as "Rejected"
let rejectedList = [];

// ==============================
// DOM ELEMENT REFERENCES
// ==============================

// Top statistic counters
let total = document.getElementById("totalCount"); // Shows total jobs in main section
let interviewCount = document.getElementById("interviewCount"); // Shows total interviewed jobs
let rejectedCount = document.getElementById("rejectedCount"); // Shows total rejected jobs
let jobCountIndicator = document.getElementById("job-count-indicator"); // Shows "X of Y jobs" text

// Sections
const allCardSection = document.getElementById("job-container");
// Main container where all original job cards exist

const filterSection = document.getElementById("filtered-card-information");
// Container where filtered (Interviewed/Rejected) cards are rendered

// Filter buttons
const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

// ==============================
// EMPTY PAGE SETUP
// ==============================

// Create an empty state div dynamically
const emptyPage = document.createElement("div");

// Apply styling classes to empty state
emptyPage.className =
  "hidden flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl border border-gray-200 p-8 shadow-sm";

// Inner content of empty state
emptyPage.innerHTML = `
    <img src="./jobs.png" class="w-40 mb-6" /> 
    <h2 class="text-2xl font-bold text-slate-800">No jobs available</h2>
`;

// Insert empty state element after the filter section
filterSection.after(emptyPage);

// ===================================================
// FUNCTION: calculateCount()
// PURPOSE: Updates all counters and job indicators
// ===================================================
function calculateCount() {
  // Get total number of job cards currently inside main section
  // Each child element represents one job card
  const totalInAllPool = allCardSection.children.length;

  // Update top statistic boxes
  total.innerText = totalInAllPool; // Total jobs
  interviewCount.innerText = interviewList.length; // Interviewed jobs
  rejectedCount.innerText = rejectedList.length; // Rejected jobs

  // Determine which tab is active based on active button class
  if (interviewFilterBtn.classList.contains("bg-[#3B82F6]")) {
    // If Interview tab is active,
    // show interviewed count out of total jobs
    jobCountIndicator.innerText = `${interviewList.length} of ${totalInAllPool} jobs`;
  } else if (rejectedFilterBtn.classList.contains("bg-[#3B82F6]")) {
    // If Rejected tab is active,
    // show rejected count out of total jobs
    jobCountIndicator.innerText = `${rejectedList.length} of ${totalInAllPool} jobs`;
  } else {
    // If All tab is active,
    // show total jobs only
    jobCountIndicator.innerText = `${totalInAllPool} jobs`;
  }
}

// ===================================================
// FUNCTION: toggleStyle(id)
// PURPOSE: Switch active filter tab and update UI
// ===================================================
function toggleStyle(id) {
  // Reset all filter buttons to inactive state
  [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach((btn) => {
    // Remove active styling
    btn.classList.remove("bg-[#3B82F6]", "text-white");

    // Add default styling
    btn.classList.add("bg-white", "text-black");
  });

  // Get the clicked button
  const activeBtn = document.getElementById(id);

  // Replace default style with active style
  activeBtn.classList.replace("bg-white", "bg-[#3B82F6]");
  activeBtn.classList.replace("text-black", "text-white");

  // Show/hide sections depending on selected tab
  if (id === "all-filter-btn") {
    // Show main job section
    allCardSection.classList.remove("hidden");

    // Hide filtered section
    filterSection.classList.add("hidden");

    // Hide empty state
    emptyPage.classList.add("hidden");
  } else if (id === "interview-filter-btn") {
    // Hide main section
    allCardSection.classList.add("hidden");

    // Render interview jobs
    renderInterview();
  } else if (id === "rejected-filter-btn") {
    // Hide main section
    allCardSection.classList.add("hidden");

    // Render rejected jobs
    renderRejected();
  }

  // Recalculate counts whenever tab changes
  calculateCount();
}

// ===================================================
// FUNCTION: renderInterview()
// PURPOSE: Render all Interviewed jobs in filter section
// ===================================================
function renderInterview() {
  // Clear previously rendered filtered cards
  filterSection.innerHTML = "";

  // If there are no interviewed jobs
  if (interviewList.length === 0) {
    // Hide filtered section
    filterSection.classList.add("hidden");

    // Show empty state
    emptyPage.classList.remove("hidden");
  } else {
    // Hide empty state
    emptyPage.classList.add("hidden");

    // Show filtered section
    filterSection.classList.remove("hidden");

    // Loop through interviewList
    // Create a filtered card for each item
    interviewList.forEach((item) =>
      createFilterCard(item, "Interviewed", "emerald"),
    );
  }
}

// ===================================================
// FUNCTION: renderRejected()
// PURPOSE: Render all Rejected jobs in filter section
// ===================================================
function renderRejected() {
  // Clear previously rendered filtered cards
  filterSection.innerHTML = "";

  // If there are no rejected jobs
  if (rejectedList.length === 0) {
    // Hide filtered section
    filterSection.classList.add("hidden");

    // Show empty state
    emptyPage.classList.remove("hidden");
  } else {
    // Hide empty state
    emptyPage.classList.add("hidden");

    // Show filtered section
    filterSection.classList.remove("hidden");

    // Loop through rejectedList
    // Create a filtered card for each rejected job
    rejectedList.forEach((item) => createFilterCard(item, "Rejected", "red"));
  }
}

// ===================================================
// FUNCTION: createFilterCard()
// PURPOSE: Dynamically create a filtered job card
// ===================================================
function createFilterCard(item, status, color) {
  // Create wrapper div for filtered card
  let div = document.createElement("div");

  // Apply card styling
  div.className = `bg-white rounded-xl border border-gray-200 border-l-4 border-l-${color}-500 p-8 shadow-sm mb-4 relative`;

  // Inject dynamic job content using template literal
  div.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-xl font-bold text-slate-800">${item.companyName}</h2>
          <p class="text-slate-500 font-medium mt-1">${item.roleName}</p>
        </div>
        <button id="del-filter-${item.id}" class="p-2 text-gray-400 hover:text-red-500 rounded-full border border-gray-100">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <div class="flex gap-2 text-sm text-gray-400 mt-4 mb-4">${item.metaDetails}</div>
      <p class="text-gray-600 text-sm leading-relaxed mb-6">${item.jobDescription}</p>
      <div class="flex justify-between items-center">
        <span class="px-3 py-1.5 bg-${color}-50 text-${color}-700 text-xs font-bold rounded uppercase">${status}</span>
        <div class="flex gap-3">
           <button id="btn-int-${item.id}" class="px-4 py-2 text-xs font-bold uppercase border border-emerald-500 text-emerald-500 rounded">Interview</button>
           <button id="btn-rej-${item.id}" class="px-4 py-2 text-xs font-bold uppercase border border-red-400 text-red-400 rounded">Rejected</button>
        </div>
      </div>
  `;

  // Append new card to filter section
  filterSection.appendChild(div);
}

// ===================================================
// GLOBAL CLICK LISTENER (Event Delegation)
// PURPOSE: Handle all dynamic button clicks
// ===================================================
document.addEventListener("click", function (event) {
  // Find closest button element (important when clicking inside SVG)
  const target = event.target.closest("button");

  // If click wasn't on a button, stop execution
  if (!target) return;

  // --------------------------------------------------
  // HANDLE INTERVIEW / REJECT BUTTONS
  // --------------------------------------------------
  if (target.id.startsWith("btn-int-") || target.id.startsWith("btn-rej-")) {
    // Extract job id from button id
    const idNumber = target.id.split("-")[2];

    // Create job info object from existing DOM elements
    const cardInfo = {
      id: idNumber,
      companyName: document.getElementById(`company-${idNumber}`).innerText,
      roleName: document.getElementById(`role-${idNumber}`).innerText,
      metaDetails: document.getElementById(`meta-${idNumber}`).innerHTML,
      jobDescription: document.getElementById(`desc-${idNumber}`).innerText,
    };

    // If Interview button clicked
    if (target.id.startsWith("btn-int-")) {
      // Prevent duplicate interview entry
      if (!interviewList.find((i) => i.id === idNumber))
        interviewList.push(cardInfo);

      // Remove from rejected list if exists
      rejectedList = rejectedList.filter((i) => i.id !== idNumber);

      // Update status text in main card
      document.getElementById(`status-${idNumber}`).innerText = "Interviewed";
    } else {
      // Prevent duplicate rejected entry
      if (!rejectedList.find((i) => i.id === idNumber))
        rejectedList.push(cardInfo);

      // Remove from interview list if exists
      interviewList = interviewList.filter((i) => i.id !== idNumber);

      // Update status text in main card
      document.getElementById(`status-${idNumber}`).innerText = "Rejected";
    }

    calculateCount();
  }

  // --------------------------------------------------
  // HANDLE DELETE FROM MAIN SECTION
  // --------------------------------------------------
  if (target.id.startsWith("delete-btn-")) {
    const idNumber = target.id.split("-")[2];

    // Remove card from DOM
    const card = document.getElementById(`job-card-${idNumber}`);
    if (card) card.remove();

    // Remove from both state lists
    interviewList = interviewList.filter((i) => i.id !== idNumber);
    rejectedList = rejectedList.filter((i) => i.id !== idNumber);

    calculateCount();
  }

  // --------------------------------------------------
  // HANDLE DELETE FROM FILTERED SECTION
  // --------------------------------------------------
  if (target.id.startsWith("del-filter-")) {
    const idNumber = target.id.split("-")[2];

    // Remove job from both lists
    interviewList = interviewList.filter((i) => i.id !== idNumber);
    rejectedList = rejectedList.filter((i) => i.id !== idNumber);

    // Reset status in main card
    document.getElementById(`status-${idNumber}`).innerText = "Not Applied";

    // Re-render current filter view
    if (interviewFilterBtn.classList.contains("bg-[#3B82F6]"))
      renderInterview();
    else renderRejected();

    calculateCount();
  }
});

// Initialize counters on page load
calculateCount();
