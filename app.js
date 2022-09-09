




//HARD CODED FIGHTER OBJECT
let fighter = {};

//Remove fighter
    //remove fighter from fighter array


class UI {
    addFighterToList(fighter){

    }

    deleteFighter(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('fighter').value = '';
        document.getElementById('rank').value = '';
    }
}




class Random {
    //Random Weapon Selection function
    //random selection from 0 to 6 using if statement to filter between options of Blue/Red/Shield/Ranged/Pole/FightersChoice
    //return fighters selected weapon
    weapon() {
        let randomSelection = Math.floor(Math.random()*6);
        if (randomSelection < 1) {
            console.log('BLUE');
        } else if (randomSelection < 2) {
            console.log('RED');
        } else if (randomSelection < 3) {
            console.log('SHIELD');
        } else if (randomSelection < 4) {
            console.log('RANGED');
        } else if (randomSelection < 5) {
            console.log('POLE');
        } else {
            console.log('Fighter\'s Choice');
        }
    }

    //Random Fighter Selection
    //uses Object.key(fighters) to create array 
    //random floor selection from 0 to fighterArray.length to select fighter
    //return fighters names and remove first fighter from fighterArray map
    fighter(fighterArray) {
        let randomSelection = Math.floor(Math.random() * fighterArray.length);
        //this line is the selected fighter
        console.log(fighterArray[randomSelection]);
        //remove selected fighter from current fight pool
        fighterArray.splice(randomSelection, 1);
    }
}


//Notes: Object with keys  
//Call the Object.keys(object) method to get an array of the object's keys
//Use the Math.floor() and Math.random() functions to get a random index of the array
//Use the random index to access one of the object's properties.












// EVENT LISTENERS








//Event Listeners for Random Fight Generation
    //uses Object.key(fighters) to create array
    //uses Random methods to select fighters and weapons
document.getElementById('generate-fight').addEventListener('submit', function(e){
    const random = new Random();
    let fighterArray = Object.keys(fighter);
    if (fighterArray.length > 1) {
        random.fighter(fighterArray);
        random.weapon();
        random.fighter(fighterArray);
        random.weapon();
    } else {
        //not enough fighters for generated fight alert
        console.log("You need at least 2 fighters") 
    }
    e.preventDefault();
    });




//Event Listeners for Add New Fighter
document.getElementById('add-fighter').addEventListener('submit', function(e){
    //get fighter information
    const ui = new UI();
    const
        newFighter = document.getElementById('fighter').value,
        rank = document.getElementById('rank').value;
    //add new fighter to fighter object
    fighter[newFighter] = rank;
    ui.clearFields();
    
    console.log(fighter);
    e.preventDefault();
    });

























    //>>>WANTS<<<
//Format fighter name and rank to be capitalized and uniform

//Save Fighters to local
    //stringify JSON/fighterArray
    //save fighter array to local storage API
    //requires a setup with parsing the JSON

//Choose which input fighters to randomly select from
    //push selected fighter from fighter array to selectedFighterArray

    //Choose team size
    //

//Random team size selection

//tournament