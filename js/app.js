/* =========================================
   SSD SCHOOL RESOURCE PORTAL
   Document Search & Filter
   ========================================= */

const documentsList = document.getElementById("documentsList");
const searchInput = document.getElementById("searchInput");
const documentStatus = document.getElementById("documentStatus");

const categoryFilter = document.getElementById("categoryFilter");
const yearFilter = document.getElementById("yearFilter");
const typeFilter = document.getElementById("typeFilter");
const clearFilters = document.getElementById("clearFilters");


// =========================================
// FORMAT DATE
// =========================================

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


// =========================================
// POPULATE FILTERS
// =========================================

function populateFilters() {

    const categories = [];

    const years = [];

    const types = [];


    documents.forEach(item => {

        if (item.category && !categories.includes(item.category)) {
            categories.push(item.category);
        }

        if (item.date) {

            const year =
                new Date(item.date).getFullYear().toString();

            if (!years.includes(year)) {
                years.push(year);
            }
        }

        if (item.type && !types.includes(item.type)) {
            types.push(item.type);
        }

    });


    categories.sort();

    years.sort().reverse();

    types.sort();


    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);

    });


    years.forEach(year => {

        const option = document.createElement("option");

        option.value = year;
        option.textContent = year;

        yearFilter.appendChild(option);

    });


    types.forEach(type => {

        const option = document.createElement("option");

        option.value = type;
        option.textContent = type;

        typeFilter.appendChild(option);

    });

}


// =========================================
// CREATE DOCUMENT CARD
// =========================================

function createDocumentCard(item) {

    const keywords = item.keywords || [];


    let keywordHTML = "";

    keywords.forEach(keyword => {

        keywordHTML += `
            <span class="tag">
                ${keyword}
            </span>
        `;

    });


    let importantHTML = "";

    if (item.important) {

        importantHTML = `
            <span
                class="tag"
                style="background:#fff3cd;color:#8a5a00;"
            >
                ⭐ Important
            </span>
        `;

    }


    return `

        <article class="document-card">

            <div class="document-top">

                <div>

                    <div class="document-title">
                        ${item.title}
                    </div>

                    <div class="document-meta">

                        ${item.authority || "SSD Department"}

                        <br>

                        ${item.type}
                        •
                        ${formatDate(item.date)}

                        <br>

                        Letter / Order No.:
                        ${item.letterNo}

                    </div>

                </div>

            </div>


            <div class="document-tags">

                <span class="tag">
                    ${item.category}
                </span>

                ${importantHTML}

                ${keywordHTML}

            </div>


            <p
                class="document-meta"
                style="margin-top:10px;"
            >
                ${item.summary || ""}
            </p>


            ${
                item.effectiveFrom
                ? `
                    <div
                        class="document-meta"
                        style="margin-top:8px;"
                    >
                        Effective from:
                        ${formatDate(item.effectiveFrom)}
                    </div>
                `
                : ""
            }


            <div class="document-actions">

                <a
                    href="${item.file}"
                    class="btn btn-primary"
                    target="_blank"
                    rel="noopener"
                >
                    📄 View PDF
                </a>


                <a
                    href="${item.file}"
                    class="btn btn-secondary"
                    download
                >
                    ⬇ Download
                </a>

            </div>

        </article>

    `;
}


// =========================================
// DISPLAY DOCUMENTS
// =========================================

function displayDocuments(list) {

    documentsList.innerHTML = "";


    if (!list || list.length === 0) {

        documentsList.innerHTML = `

            <div class="document-card">

                <div class="document-title">
                    No documents found
                </div>

                <div class="document-meta">
                    Try changing your search or filters.
                </div>

            </div>

        `;

        documentStatus.textContent =
            "No matching documents";

        return;

    }


    list.forEach(item => {

        documentsList.innerHTML +=
            createDocumentCard(item);

    });


    documentStatus.textContent =
        `${list.length} document${list.length === 1 ? "" : "s"} available`;

}


// =========================================
// FILTER DOCUMENTS
// =========================================

function applyFilters() {

    const searchTerm =
        searchInput.value.toLowerCase().trim();

    const selectedCategory =
        categoryFilter.value;

    const selectedYear =
        yearFilter.value;

    const selectedType =
        typeFilter.value;


    const filtered = documents.filter(item => {

        const searchableText = [

            item.title,

            item.letterNo,

            item.authority,

            item.category,

            item.type,

            item.summary,

            ...(item.keywords || [])

        ]
            .join(" ")
            .toLowerCase();


        const searchMatch =
            !searchTerm ||
            searchableText.includes(searchTerm);


        const categoryMatch =
            !selectedCategory ||
            item.category === selectedCategory;


        const itemYear =
            new Date(item.date)
                .getFullYear()
                .toString();


        const yearMatch =
            !selectedYear ||
            itemYear === selectedYear;


        const typeMatch =
            !selectedType ||
            item.type === selectedType;


        return (
            searchMatch &&
            categoryMatch &&
            yearMatch &&
            typeMatch
        );

    });


    displayDocuments(filtered);

}


// =========================================
// RESET
// =========================================

function resetFilters() {

    searchInput.value = "";

    categoryFilter.value = "";

    yearFilter.value = "";

    typeFilter.value = "";

    displayDocuments(documents);

}


// =========================================
// EVENTS
// =========================================

searchInput.addEventListener(
    "input",
    applyFilters
);

categoryFilter.addEventListener(
    "change",
    applyFilters
);

yearFilter.addEventListener(
    "change",
    applyFilters
);

typeFilter.addEventListener(
    "change",
    applyFilters
);

clearFilters.addEventListener(
    "click",
    resetFilters
);


// =========================================
// START
// =========================================

populateFilters();

displayDocuments(documents);
