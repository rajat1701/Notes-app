const { default: chalk } = require('chalk')
const fs = require('fs')

const getNotes = ()=>'Your notes...'
/////
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note)=> note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}
const removeNote = (title) => {
    const notes = loadNotes()
    let notecount = 0
    notes.forEach((note)=>{
        if(note.title===title){
            notecount = 1
            const index = notes.indexOf(note);
            if (index > -1) {
                notes.splice(index, 1);
            }
            console.log(chalk.green.inverse(`Note removed having the title : ${title}`))
        } 
    })
    if(notecount === 0){
        console.log(chalk.red.inverse(`No note found to be removed with the title : ${title}`))
    }
    saveNotes(notes)
}
const listNote = () => {
    const notes = loadNotes()
    if(notes.length!=0){
        console.log(chalk.blue.inverse("Your Notes!!!"))
        notes.forEach((note)=>{console.log(chalk.green.inverse(note.title))})
    }else{
        console.log(chalk.red.inverse("You have no notes at the moment!!!"))          
    }
}
const readNote =(title)=>{
    const notes = loadNotes()
    const notetoDisplay =notes.find((note)=>note.title===title)
    if(notetoDisplay){
        console.log(chalk.blue.inverse(notetoDisplay.title))
        console.log(chalk.green(notetoDisplay.body))
    }else{
        console.log(chalk.red.inverse("No such note found"))
    }
}
////
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () =>{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}