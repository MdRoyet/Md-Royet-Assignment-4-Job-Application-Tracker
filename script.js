// Total Jobs count >>>>>

let interviewList = [];
let rejectedList = [];

let total = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

const allCardSection = document.getElementById("job-container");

const mainContainer = document.querySelector("main");
console.log(mainContainer);

function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}

calculateCount();

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

jobContainer.parentElement.appendChild(emptyPage);

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
