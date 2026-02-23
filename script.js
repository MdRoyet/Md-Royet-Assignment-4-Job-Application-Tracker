// Total Jobs count >>>>>

let interviewList = [];
let rejectedList = [];

let total = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

const allCardSection = document.getElementById("job-container");
const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filtered-card-information");

function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}

calculateCount();

// Toggling Button Style Section >>>>>>>>>>>>

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

function toggleStyle(id) {
  // Reset all buttons to white
  allFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
  interviewFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
  rejectedFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");

  allFilterBtn.classList.add("bg-white", "text-black");
  interviewFilterBtn.classList.add("bg-white", "text-black");
  rejectedFilterBtn.classList.add("bg-white", "text-black");

  // Make clicked button active (blue)
  const activeBtn = document.getElementById(id);
  activeBtn.classList.remove("bg-white", "text-black");
  activeBtn.classList.add("bg-[#3B82F6]", "text-white");

  if (id == "interview-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");

    if (interviewList.length === 0) {
      emptyPage.classList.remove("hidden");
    } else {
      emptyPage.classList.add("hidden");
      renderInterview();
    }
  }
}

//No Jobs Available section >>>>>>

const allBtn = document.getElementById("all-filter-btn");
const interviewBtn = document.getElementById("interview-filter-btn");
const rejectedBtn = document.getElementById("rejected-filter-btn");

const jobContainer = document.getElementById("job-container");

// Create empty page inside Interview & Rejection Button
const emptyPage = document.createElement("div");
emptyPage.id = "empty-state";
emptyPage.className =
  "hidden flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl border border-gray-200 p-8 shadow-sm relative";

emptyPage.innerHTML = `
    <img 
      src="./jobs.png" 
      alt="No jobs available"
      class="w-40 mb-6"
    />

    <h2 class="text-2xl font-bold text-slate-800">
      No jobs available
    </h2>

    <p class="text-slate-500 mt-2">
      Check back soon for new job opportunities
    </p>
`;

filterSection.appendChild(emptyPage);

// Show all jobs
allBtn.addEventListener("click", function () {
  jobContainer.classList.remove("hidden");
  emptyPage.classList.add("hidden");
});

// Show empty state for Interview
interviewBtn.addEventListener("click", function () {
  jobContainer.classList.add("hidden");
  emptyPage.classList.remove("hidden");
});

// Show empty state for Rejected
rejectedBtn.addEventListener("click", function () {
  jobContainer.classList.add("hidden");
  emptyPage.classList.remove("hidden");
});

// Main Container Section

mainContainer.addEventListener("click", function (event) {
  if (event.target.id.startsWith("btn-int-")) {
    const card = event.target.closest("[id^='job-card-']");
    const idNumber = event.target.id.split("-")[2];

    const companyName = card.querySelector(`#company-${idNumber}`).innerText;
    const roleName = card.querySelector(`#role-${idNumber}`).innerText;
    const metaDetails = card.querySelector(`#meta-${idNumber}`).innerText;
    const jobDescription = card.querySelector(`#desc-${idNumber}`).innerText;

    const cardInfo = {
      id: idNumber,
      companyName,
      roleName,
      metaDetails,
      jobDescription,
    };

    const companyExist = interviewList.find((item) => item.id === idNumber);

    card.querySelector(`#status-${idNumber}`).innerText = "Interviewed";

    if (!companyExist) {
      interviewList.push(cardInfo);
    }

    calculateCount();
    renderInterview();
  }
});

function renderInterview() {
  filterSection.innerHTML = "";

  if (interviewList.length === 0) {
    emptyPage.classList.remove("hidden");
    return;
  }

  emptyPage.classList.add("hidden");

  interviewList.forEach((interview) => {
    let div = document.createElement("div");

    div.innerHTML = `
      <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm relative">
        <h2 class="text-xl font-bold text-slate-800">
          ${interview.companyName}
        </h2>
        <p class="text-slate-500 font-medium mt-1">
          ${interview.roleName}
        </p>
        <div class="flex gap-2 text-sm text-gray-400 mt-4 mb-4">
          ${interview.metaDetails}
        </div>
        <p class="text-gray-600 text-sm leading-relaxed mb-6">
          ${interview.jobDescription}
        </p>
        <span class="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded uppercase">
          Interviewed
        </span>
      </div>
    `;

    filterSection.appendChild(div);
  });
}
