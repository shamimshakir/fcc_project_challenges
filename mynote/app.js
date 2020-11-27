const note = document.getElementById("note");
    const noteColors = document.querySelector(".noteColors");
    const colors = noteColors.querySelectorAll(".color");
    const AddNote = document.querySelector(".AddNote");
    const noteGrid = document.querySelector(".noteGrid");

    colors.forEach((color) => {
        color.addEventListener("click", function() {
            removePicked();
            this.classList.add("picked");
        });
    });

    function removePicked() {
        colors.forEach((color) => {
            if (color.classList.contains("picked")) {
                color.classList.remove("picked");
            }
        });
    }
    AddNote.addEventListener("click", function() {
        if (note.value) {
            let notesArr = note.value.split("\n");
            let gcolor = "";
            colors.forEach((color) => {
                if (color.classList.contains("picked")) {
                    gcolor = color.classList[1];
                }
            });
            let noteObj = {note:notesArr, gcolor};
            saveToStorage(noteObj);
            displayNotes();
            note.value = '';
        }
    });
    noteGrid.addEventListener('click', function(e) {
        if (e.target.classList.contains('closeIcon')) {
            let icon = e.target;
            let note = icon.parentElement;
            note.remove();
            removeFromStorage(note.dataset.noteId)
        }
    });
    window.addEventListener('DOMContentLoaded', displayNotes);

    // function makeElement(elem, className, content = "") {
    //     let element = document.createElement(elem);
    //     element.classList.add(className);
    //     element.innerHTML = content;
    //     return element;
    // }
    function displayNotes() {
        let notes = getDataFromStorage();
        let noteGrids = notes.map((note,index) => {
            let content = note.note
                .map((str) => {
                    return `<p>${str}</p>`;
                })
                .join("");
            let color = '';
            if (note.gcolor == "red") {
                color = "#ff5b5e";
            } else if (note.gcolor == "blue") {
                color = "#4b61dc";
            } else if (note.gcolor == "green") {
                color = "#4CAF50";
            } else if (note.gcolor == "yellow") {
                color = "#f5e026";
            };
            return `<div class="singleNote" style="background: ${color}" data-note-id="${index}">
                        ${content}
                        <span class="closeIcon">&times;</span>
                    </div>`;
        }).join('');
        noteGrid.innerHTML = noteGrids;
    }

    function saveToStorage(note){
        let notes = getDataFromStorage();
        let newNotes = [...notes, note];
        localStorage.setItem('notes', JSON.stringify(newNotes));
    }
    function getDataFromStorage(){
        if(localStorage.getItem('notes') !== null){
            return JSON.parse(localStorage.getItem('notes'));
        }else {
            return [];
        }
    }
    function removeFromStorage(id){
        let notes = getDataFromStorage();
        let filtered = notes.filter((item,index) => {
            if(index != id){
                return item;
            }
        })
        localStorage.setItem('notes', JSON.stringify(filtered));
    }

    /**** Masonry Grid *****/
    var msnry = new Masonry( noteGrid, {
        // options...
        itemSelector: '.singleNote',
        columnWidth: 200
    });
