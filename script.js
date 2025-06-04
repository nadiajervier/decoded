const lyricWords = document.querySelectorAll('.lyric-word');
const techniqueButtons = document.querySelectorAll('.techniques p');
const techniqueClasses = ['slang-text', 'rhyme-text'];
let currentWord = null;
let currentPopup = null;
let activeTechnique = null;

// highlight all words on page load
function highlightAllWords () {
    lyricWords.forEach(word => {
        const types = word.dataset.type.split(" ").sort(); // sort the techniques alphabetically 
        const primaryType = types[0];

        //add classes to highlight text
        word.classList.add('highlighted', `${primaryType}-text`);
    });
}

// tell the browser to do this instantly
highlightAllWords();


// change visisble highlights on techniques based on the technique selected
techniqueButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedType = button.classList[0];
        
    
        // only highlight words in selected techniques
        lyricWords.forEach(word => {
        const types = word.dataset.type.split(" "); // turns rhyme slang into 'rhyme', 'slang'
        if (types.includes(selectedType)) {
            word.classList.add('highlighted', `${selectedType}-text`)
        }
        else {
            word.classList.remove('highlighted');
            techniqueClasses.forEach(classTechniqueName => word.classList.remove(classTechniqueName));
        }
        });
    });
});

// remove pop up if a new one is clicked
lyricWords.forEach(word => {
    word.addEventListener('click', () => {
        if (currentPopup) {
            currentPopup.remove();

            // remove highlight of previous active word
            if (currentWord) {
                currentWord.classList.remove('active-word');
            }
        }

        // make word active when clicked
        currentWord = word;
        word.classList.add('active-word'); // define changes to word in css

        // use of || (or) allows for a fallback should the data fail or be missing
        const term = word.dataset.term || 'Word / term';
        const type = word.dataset.type.split(" ") || 'Technique';
        const info = word.dataset.info || 'No info available';
        const year = word.dataset.year || 'Unknown';
        const origin = word.dataset.origin || 'Unknown';
        
        // create the pop up
        const popup = document.createElement('div'); // creates a div for the popup
        popup.classList.add('word-popup');  // once the div is created, it is given the class word-popup
        
        document.body.appendChild(popup); // append popup to the body of the document

        // fill the popup content
        popup.innerHTML = `
            <div class="${type}">
                <p class="info-close">&times; close</p>
                <h3>${type}</h3>
                <h2>${term}</h2>
                <p>${info}</p>
                <p>Origin: ${origin}</p>
                <p>Year: ${year}</p>
            </div>
        `;
        const heading = popup.querySelector('h3');
        heading.classList.add(`${type}-text`);

        // place the popup after the content 
        /*
        const snippetContnainer = document.querySelector('.snippet-container');
        snippetContnainer.appendChild(popup);
        currentPopup = popup; */

        // scroll to popup on click
        popup.scrollIntoView({behavior: 'smooth', block: 'center'});
        currentPopup = popup;

        // makes button active to close pop up
        popup.querySelector('.info-close').addEventListener('click', () => {
            popup.remove();
            currentPopup = null;
        });
    });
});
