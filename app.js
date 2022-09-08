//Add new fighter
    //take fighter input
    //add to fighter array
    //clear input fields
class Fighter {
    constructor(name) {
        this.name = name;
    }
}



//Remove fighter
    //remove fighter from fighter array


class Random {
    //Random Weapon Selection function
    //Blue/Red/Shield/Ranged/Pole/FightersChoice
    //random selection from 0 to 6 using if statement to filter between options
    //return fighters selected weapon
    weapon() {
        let randomSelection = Math.floor(Math.random()*6);
        console.log(randomSelection);
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
    //uses map of fighterArray.length
    //random floor selection from 0 to fighterArray.length to filter out first fighter
    //remove first fighter from fighterArray map
    //random floor selection from 0 to new map fighterArray.length to filter out second fighter
    //remove second fighter from fighterArray map
    //return fighters names
    fighter() {

    }
}


//Notes: Object with keys  
//Call the Object.keys() method to get an array of the object's keys
//Use the Math.floor() and Math.random() functions to get a random index of the array
//Use the random index to access one of the object's properties.



//>>>WANTS<<<

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


















//Event Listeners for random generation
document.getElementById('generate-fight').addEventListener('submit', function(e){
    const random = new Random();
    random.weapon()
    e.preventDefault;
    });
