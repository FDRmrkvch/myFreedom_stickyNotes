document.addEventListener('DOMContentLoaded',function(){

var board = document.getElementById('board');
var new_note_btn = document.getElementById('newnote');


var notesArr = [];
var dragNote;
var dragObj;
var deltaX;
var deltaY;


function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

function Note(){
    this.posX = getRandomInRange(15, 1000);
    this.posY = getRandomInRange(15, 300);
    this.text = '';

};


function createOneNoteMarkup(item, index){
    var tempNote = document.createElement('div');
    var textarea = document.createElement('textarea');
    var deleteBtn = document.createElement('button');
    
    textarea.className = 'sticker_textarea';
    tempNote.appendChild(textarea);

    
    tempNote.className = 'note';
    tempNote.style.left = item.posX + 'px';
    tempNote.style.top = item.posY + 'px';


    deleteBtn.className = 'deleteButton';
    tempNote.appendChild(deleteBtn);

    deleteBtn.onclick = function(){
        notesArr.splice(index, 1);
        updateMarkup();
    }

    textarea.value = item.text;
    textarea.onkeyup = function(){
        item.text = textarea.value;
    }
     
    
    return tempNote;
};


function getMouse(e){
    var mouseX = e.pageX;
    var mouseY = e.pageY;
    
    dragNote.style.left = (mouseX - deltaX)  + 'px';
    dragNote.style.top = (mouseY - deltaY) + 'px';
    
    dragObj.posX = mouseX - deltaX;
    dragObj.posY = mouseY - deltaY;
};


function updateMarkup(){
    board.innerHTML = '';
    notesArr.map(function(item,index){
        var newNote = createOneNoteMarkup(item, index);
        newNote.onmousedown = function(e){
             
            document.addEventListener('mousemove',getMouse); // добавить событие перетягивания
            dragNote = newNote;
            dragObj = item;
            
            deltaX = e.pageX - newNote.offsetLeft; // позициz курсора в заметке
            deltaY = e.pageY - newNote.offsetTop;
        }
        newNote.onmouseup = function(){
            document.removeEventListener('mousemove',getMouse); // убрать перетягивания
        }

        board.appendChild(newNote);
    });

};


new_note_btn.onclick = function(e){
    notesArr.push(new Note());
    updateMarkup();
}


});