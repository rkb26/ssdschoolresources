/* =========================================
   SSD SCHOOL RESOURCE PORTAL
   Search + Filter Engine
   ========================================= */

const documentsList =
    document.getElementById("documentsList");

const searchInput =
    document.getElementById("searchInput");

const documentStatus =
    document.getElementById("documentStatus");

const categoryFilter =
    document.getElementById("categoryFilter");

const yearFilter =
    document.getElementById("yearFilter");

const typeFilter =
    document.getElementById("typeFilter");

const clearFilters =
    document.getElementById("clearFilters");


// -----------------------------------------
// Format Date
// -----------------------------------------

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


// -----------------------------------------
// Create Filter Options
// -----------------------------------------

function populateFilters() {

    const categories = [
        ...new Set(
            documents.map(
                document => document.category
            )
        )
    ].sort();


    const years = [
        ...new Set(
            documents.map(
                document =>
                    new Date(document.date)
                        .getFullYear()
                        .toString()
            )
        )
    ].sort().reverse();


    const types = [
        ...new Set(
            documents.map(
                document => document.type
            )
        )
    ].sort();


    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);

    });


    years.forEach(year => {

        const option =
            document.createElement("option");

        option.value = year;
        option.textContent = year;

        yearFilter.appendChild(option);

    });


    types.forEach(type => {

        const option =
            document.createElement("option");

        option.value = type;
        option.textContent = type;

        typeFilter.appendChild(option);

    });

}


// -----------------------------------------
// Create Document Card
// -----------------------------------------

function createDocumentCard(document) {

    const tags = document.tags
        .map(
            tag =>
                `<span class="tag">${tag}</span>`
        )
        .join("");


    return `

        <article class="document-card">

            <div class="document-top">

                <div>

                    <div class="document-title">
                        ${document.title}
                    </div>

                    <div class="document-meta">

                        ${document.department}
                        •
                        ${formatDate(document.date)}

                        <br>

                        Letter No:
                        ${document.letterNo}

                    </div>

                </div>

            </div>


            <div class="document-tags">

                ${tags}

            </div>


            <p
                class="document-meta"
                style="margin-top:10px;"
            >

                ${document.description}

            </p>


            <div class="document-actions">

                <a
                    href="${document.file}"
                    class="btn btn-primary"
                    target="_blank"
                >
                    👁 View
                </a>


                <a
                    href="${document.file}"
                    class="btn btn-secondary"
                    download
                >
                    ⬇ Download
                </a>

            </div>

        </article>

    `;
}


// -----------------------------------------
// Display Documents
// -----------------------------------------

function displayDocuments(list) {

    documentsList.innerHTML = "";


    if (list.length === 0) {

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


    list.forEach(document => {

        documentsList.innerHTML +=
            createDocumentCard(document);

    });


    documentStatus.textContent =
        `${list.length} document${list.length !== 1 ? "s" : ""} available`;

}


// -----------------------------------------
// Apply Search + Filters
// -----------------------------------------

function applyFilters() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();

    const selectedCategory =
        categoryFilter.value;

    const selectedYear =
        yearFilter.value;

    const selectedType =
        typeFilter.value;


    const filteredDocuments =
        documents.filter(document => {

            const searchableText = [

                document.title,

                document.letterNo,

                document.department,

                document.category,

                document.type,

                document.description,

                ...document.tags

            ]
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                !searchTerm ||
                searchableText.includes(searchTerm);


            const matchesCategory =
                !selectedCategory ||
                document.category === selectedCategory;


            const documentYear =
                new Date(document.date)
                    .getFullYear()
                    .toString();


            const matchesYear =
                !selectedYear ||
                documentYear === selectedYear;


            const matchesType =
                !selectedType ||
                document.type === selectedType;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesYear &&
                matchesType
            );

        });


    displayDocuments(filteredDocuments);

}


// -----------------------------------------
// Events
// -----------------------------------------

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


// -----------------------------------------
// Reset Filters
// -----------------------------------------

clearFilters.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        categoryFilter.value = "";

        yearFilter.value = "";

        typeFilter.value = "";

        displayDocuments(documents);

    }
);


// -----------------------------------------
// Start
// -----------------------------------------

populateFilters();

displayDocuments(documents);
