




//create fighterObject to store fighters and ranks
let fighterObject = {};

//methods to add fighters and remove fighters from fighterObject
class Fighter {
    addFighter(newFighter, rank) {
        fighterObject[newFighter] = rank;
        console.log(fighterObject);
    }

    removeFighter() {

    }

}




//Remove fighter
    //remove fighter from fighter array

//Used Traversey's Todo list guide to get this list to work correctly
class UI {
    addFighterToList(fighter, rank){
        const fighterList = document.getElementById('fighter-list');
        const row = document.createElement('tr');
        //add fighter to ui
        row.innerHTML = `
            <td>${fighter}</td>
            <td>${rank}</td>
            <td><a href="#" class="remove">X</td>
            `;
        fighterList.appendChild(row);
    }

    deleteFighter(target){
        if(target.className === 'remove'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('fighter').value = '';
        document.getElementById('rank').value = '';
    }

    clearFight() {
        const teamOne = document.getElementById('first-fighter');
        const teamTwo = document.getElementById('second-fighter');
        let teamOneNode = document.getElementById('fighter-one');
        let teamTwoNode = document.getElementById('fighter-two');
        teamOne.removeChild(teamOneNode);
        teamTwo.removeChild(teamTwoNode);
    }

    figherOne(fighter, weapon){
        const teamOne = document.getElementById('first-fighter');
        const selection = document.createElement('div');
        //insert fighter and weapon into selection
        selection.innerHTML = `
            <h1>${fighter}</h1>
            <h1>${weapon}</h1>
            `;
            selection.setAttribute('id','fighter-one')
        teamOne.appendChild(selection);
    }

    figherTwo(fighter, weapon){
        const teamTwo = document.getElementById('second-fighter');
        const selection = document.createElement('div');
        //insert fighter and weapon into selection
        selection.innerHTML = `
            <h1>${fighter}</h1>
            <h1>${weapon}</h1>
            `;
        selection.setAttribute('id','fighter-two')
        teamTwo.appendChild(selection);
    }

    
}




class Random {
    //Random Weapon Selection function
    //random selection from 0 to 6 using if statement to filter between options of Blue/Red/Shield/Ranged/Pole/FightersChoice
    //return fighters selected weapon
    weapon() {
        let randomSelection = Math.floor(Math.random()*6);
        if (randomSelection < 1) {
            return 'BLUE';
        } else if (randomSelection < 2) {
            return 'RED';
        } else if (randomSelection < 3) {
            return 'SHIELD';
        } else if (randomSelection < 4) {
            return 'RANGED';
        } else if (randomSelection < 5) {
            return 'POLE';
        } else {
            return 'Fighter\'s Choice';
        }
    }

    //Random Fighter Selection
    //uses Object.key(fighters) to create array 
    //random floor selection from 0 to fighterArray.length to select fighter
    //return fighters names and remove first fighter from fighterArray map
    fighter(fighterArray) {
        //randomly select fighter
        let randomSelection = Math.floor(Math.random() * fighterArray.length);
        //copy selection into var
        let selectedFighter = fighterArray[randomSelection];
        //remove selected fighter from current fight pool
        fighterArray.splice(randomSelection, 1);
        //return selected fighter
        return selectedFighter;
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
    //instantiate random
    const random = new Random();
    //instantiate ui
    const ui = new UI();
    //create array of fighterObject keys
    let fighterArray = Object.keys(fighterObject);
    
    if (fighterArray.length > 1) {
        //clear previous fight
        ui.clearFight();
        
        //randomize fighter one and display
        ui.figherOne(random.fighter(fighterArray), random.weapon());
        //randomize fighter two and display
        ui.figherTwo(random.fighter(fighterArray), random.weapon());
        
        
        // random.fighter(fighterArray);
        // random.weapon();
        // random.fighter(fighterArray);
        // random.weapon();
    } else {
        //not enough fighters for generated fight alert
        console.log("You need at least 2 fighters") 
    }
    e.preventDefault();
    });




//Event Listeners for Add New Fighter
document.getElementById('add-fighter').addEventListener('submit', function(e){
    //instantiate ui
    const ui = new UI();
    //instantiate ui
    const fighter = new Fighter();

    //get fighter and rank
    const
        newFighter = document.getElementById('fighter').value,
        rank = document.getElementById('rank').value;


    //add new fighter to fighter object
    //check if fields are both entered
    if (newFighter === '' || rank === '') {
        console.log('please fill in all fields')
    } else {
        fighter.addFighter(newFighter, rank);
        ui.addFighterToList(newFighter, rank);
        ui.clearFields();
    }
    
    e.preventDefault();
    });


//Event Listeners for Deleting Fighter
    //Based of Traversey's Todo list
document.getElementById('fighter-list').addEventListener('click', function(e){
    //instantiate ui
    const ui = new UI();
    ui.deleteFighter(e.target);
})























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