document.addEventListener('DOMContentLoaded', () => {
    const entries = document.querySelectorAll('.entry');
    const filterDropdown = document.getElementById('filter-dropdown');
    const sortDropdown = document.getElementById('sort-dropdown');
    const glossaryList = document.querySelector('.glossary-list');

    // Helper function to filter entries based on selected filter criteria
    function filterEntries() {
        const selectedValue = filterDropdown.value;

        // If 'all' is selected, show all entries
        if (selectedValue === 'all') {
            entries.forEach(entry => entry.style.display = 'block');
            return;
        }

        // Separate the filter type and value (origin or era)
        const [filterType, filterValue] = selectedValue.split(':');
        
        entries.forEach(entry => {
            const entryOrigin = entry.dataset.origin?.toLowerCase();
            const entryEra = entry.dataset.era;

            // Filter based on origin or era
            if (
                (filterType === 'origin' && entryOrigin === filterValue) ||
                (filterType === 'era' && entryEra === filterValue)
            ) {
                entry.style.display = 'block'; // Show entry
            } else {
                entry.style.display = 'none'; // Hide entry
            }
        });
    }

    // Function to sort entries
    function sortEntries() {
        const sortType = sortDropdown.value;
        const visibleEntries = Array.from(entries).filter(entry => entry.style.display !== 'none');

        let sortedEntries;

        if (sortType === 'az') {
            sortedEntries = visibleEntries.sort((a, b) => a.dataset.term.localeCompare(b.dataset.term)); // A-Z
        } else if (sortType === 'za') {
            sortedEntries = visibleEntries.sort((a, b) => b.dataset.term.localeCompare(a.dataset.term)); // Z-A
        } else if (sortType === 'year-asc') {
            sortedEntries = visibleEntries.sort((a, b) => a.dataset.era - b.dataset.era); // Year Ascending
        } else if (sortType === 'year-desc') {
            sortedEntries = visibleEntries.sort((a, b) => b.dataset.era - a.dataset.era); // Year Descending
        }

        // Re-append sorted entries back into the glossary list
        sortedEntries.forEach(entry => glossaryList.appendChild(entry));
    }

    // Event listener for filter change
    filterDropdown.addEventListener('change', () => {
        filterEntries();
        sortEntries(); // Reapply sorting after filtering
    });

    // Event listener for sort change
    sortDropdown.addEventListener('change', sortEntries);

    // Initial application of filter and sort on page load
    filterEntries();
    sortEntries();
});
