// ===============================
// 01️⃣ DATA STORAGE SECTION
// ===============================

// Data Lists → Store Interviewed & Rejected Jobs
let interviewList = [];
let rejectedList = [];

// ===============================
// 02️⃣ DOM ELEMENT REFERENCES
// ===============================

// Top Statistics Elements
let total = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let jobCountIndicator = document.getElementById("job-count-indicator");

// Main Sections
const allCardSection = document.getElementById("job-container");
const filterSection = document.getElementById("filtered-card-information");

// Filter Buttons
const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

// ===============================
// 03️⃣ EMPTY PAGE SETUP
// ===============================

// Create "No Jobs Available" UI dynamically
const emptyPage = document.createElement("div");
emptyPage.className =
  "hidden flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl border border-gray-200 p-8 shadow-sm";

emptyPage.innerHTML = `
  <img src="./jobs.png" class="w-40 mb-6" />
  <h2 class="text-2xl font-bold text-slate-800">No jobs available</h2>
`;

// Insert empty page after filter section
filterSection.after(emptyPage);

// ===============================
// 04️⃣ COUNT CALCULATION FUNCTION
// ===============================

function calculateCount() {
  // 4.1 → Count total cards inside ALL section
  const totalInAllPool = allCardSection.children.length;

  // 4.2 → Update Top Statistics Numbers
  total.innerText = totalInAllPool;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;

  // 4.3 → Update "X of Y jobs" Indicator
  if (interviewFilterBtn.classList.contains("bg-[#3B82F6]")) {
    // If Interview Tab is Active
    jobCountIndicator.innerText = `${interviewList.length} of ${totalInAllPool} jobs`;
  } else if (rejectedFilterBtn.classList.contains("bg-[#3B82F6]")) {
    // If Rejected Tab is Active
    jobCountIndicator.innerText = `${rejectedList.length} of ${totalInAllPool} jobs`;
  } else {
    // Default → All Tab
    jobCountIndicator.innerText = `${totalInAllPool} jobs`;
  }
}

// ===============================
// 05️⃣ FILTER TAB STYLE TOGGLING
// ===============================

function toggleStyle(id) {
  // 5.1 → Reset All Buttons to Default Style
  [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach((btn) => {
    btn.classList.remove("bg-[#3B82F6]", "text-white");
    btn.classList.add("bg-white", "text-black");
  });

  // 5.2 → Activate Selected Button
  const activeBtn = document.getElementById(id);
  activeBtn.classList.replace("bg-white", "bg-[#3B82F6]");
  activeBtn.classList.replace("text-black", "text-white");

  // 5.3 → Switch Section Visibility Based on Tab
  if (id === "all-filter-btn") {
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
    emptyPage.classList.add("hidden");
  } else if (id === "interview-filter-btn") {
    allCardSection.classList.add("hidden");
    renderInterview();
  } else if (id === "rejected-filter-btn") {
    allCardSection.classList.add("hidden");
    renderRejected();
  }

  // 5.4 → Recalculate Counts After Tab Switch
  calculateCount();
}

// ===============================
// 06️⃣ RENDER INTERVIEW LIST
// ===============================

function renderInterview() {
  // Clear Previous Filtered Cards
  filterSection.innerHTML = "";

  if (interviewList.length === 0) {
    // Show Empty Page if No Interview Jobs
    filterSection.classList.add("hidden");
    emptyPage.classList.remove("hidden");
  } else {
    emptyPage.classList.add("hidden");
    filterSection.classList.remove("hidden");

    // Create Cards for Each Interview Job
    interviewList.forEach((item) =>
      createFilterCard(item, "Interviewed", "emerald"),
    );
  }
}

// ===============================
// 07️⃣ RENDER REJECTED LIST
// ===============================

function renderRejected() {
  filterSection.innerHTML = "";

  if (rejectedList.length === 0) {
    filterSection.classList.add("hidden");
    emptyPage.classList.remove("hidden");
  } else {
    emptyPage.classList.add("hidden");
    filterSection.classList.remove("hidden");

    rejectedList.forEach((item) => createFilterCard(item, "Rejected", "red"));
  }
}

// ===============================
// 08️⃣ CREATE FILTER CARD UI
// ===============================

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
      <button id="del-filter-${item.id}" class="p-2 text-gray-400 hover:text-red-500 rounded-full border border-gray-100">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
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

  filterSection.appendChild(div);
}

// ===============================
// 09️⃣ GLOBAL CLICK EVENT HANDLER
// ===============================

document.addEventListener("click", function (event) {
  const target = event.target.closest("button");
  if (!target) return;

  // 9.1 → Handle Interview / Rejected Button Click
  if (target.id.startsWith("btn-int-") || target.id.startsWith("btn-rej-")) {
    const idNumber = target.id.split("-")[2];

    // Collect Card Data
    const cardInfo = {
      id: idNumber,
      companyName: document.getElementById(`company-${idNumber}`).innerText,
      roleName: document.getElementById(`role-${idNumber}`).innerText,
      metaDetails: document.getElementById(`meta-${idNumber}`).innerHTML,
      jobDescription: document.getElementById(`desc-${idNumber}`).innerText,
    };

    if (target.id.startsWith("btn-int-")) {
      // Add to Interview List
      if (!interviewList.find((i) => i.id === idNumber))
        interviewList.push(cardInfo);

      // Remove from Rejected if exists
      rejectedList = rejectedList.filter((i) => i.id !== idNumber);

      document.getElementById(`status-${idNumber}`).innerText = "Interviewed";
    } else {
      // Add to Rejected List
      if (!rejectedList.find((i) => i.id === idNumber))
        rejectedList.push(cardInfo);

      // Remove from Interview if exists
      interviewList = interviewList.filter((i) => i.id !== idNumber);

      document.getElementById(`status-${idNumber}`).innerText = "Rejected";
    }

    if (!allCardSection.classList.contains("hidden")) {
      /* Update main counts if visible */
    } else {
      toggleStyle(
        interviewFilterBtn.classList.contains("bg-[#3B82F6]")
          ? "interview-filter-btn"
          : "rejected-filter-btn",
      );
    }

    calculateCount();
  }

  // 9.2 → Handle Delete from Main Section
  if (target.id.startsWith("delete-btn-")) {
    const idNumber = target.id.split("-")[2];
    const card = document.getElementById(`job-card-${idNumber}`);

    if (card) card.remove();

    interviewList = interviewList.filter((i) => i.id !== idNumber);
    rejectedList = rejectedList.filter((i) => i.id !== idNumber);

    calculateCount();
  }

  // 9.3 → Handle Delete from Filter Section
  if (target.id.startsWith("del-filter-")) {
    const idNumber = target.id.split("-")[2];

    interviewList = interviewList.filter((i) => i.id !== idNumber);
    rejectedList = rejectedList.filter((i) => i.id !== idNumber);

    document.getElementById(`status-${idNumber}`).innerText = "Not Applied";

    if (interviewFilterBtn.classList.contains("bg-[#3B82F6]"))
      renderInterview();
    else renderRejected();

    calculateCount();
  }
});

// ===============================
// 🔟 INITIAL LOAD
// ===============================

// Run count calculation when page loads
calculateCount();
