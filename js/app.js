/* =========================================
   SSD SCHOOL RESOURCE PORTAL
   Main JavaScript
   ========================================= */


// -----------------------------------------
// Elements
// -----------------------------------------

const documentsList =
    document.getElementById("documentsList");

const searchInput =
    document.getElementById("searchInput");

const documentStatus =
    document.getElementById("documentStatus");


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
// Create Document Card
// -----------------------------------------

function createDocumentCard(document) {

    const tags = document.tags
        .map(tag => `<span class="tag">${tag}</span>`)
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


            <p class="document-meta"
               style="margin-top:10px;">

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

                    Try a different search term.

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
// Initial Display
// -----------------------------------------

displayDocuments(documents);


// -----------------------------------------
// Search
// -----------------------------------------

searchInput.addEventListener(
    "input",
    function () {

        const searchTerm =
            this.value
                .toLowerCase()
                .trim();


        if (!searchTerm) {

            displayDocuments(documents);

            return;

        }


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


                return searchableText
                    .includes(searchTerm);

            });


        displayDocuments(
            filteredDocuments
        );

    }
);
