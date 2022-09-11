//create fighterObject to store fighters and ranks

//methods to add fighters and remove fighters from fighterObject
class Fighter {
    //adds fighter to object
    addFighter(newFighter, rank) {
        fighterObject[newFighter] = rank;
        console.log(fighterObject);
    }
    //removes fighter from object
    removeFighter(target) {
        if(target.className === 'remove'){
            let fighterName = target.parentElement.previousElementSibling.previousElementSibling.textContent;
            delete fighterObject[fighterName];
            console.log(fighterName);
            console.log(fighterObject)
        }
    }

}

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
        //resets rank field to "select fighter rank"
        document.getElementById('rank').value = 'Select Fighter Rank';
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

    figherTwo(fighter, weapon) {
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

    alert(message, type) {
        //remove any current alerts
        if (document.querySelector('.alert') !== null) {
            document.querySelector('.alert').remove();
        }

        //create alert message block
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type}`;
        
        //fill in message
        alertDiv.appendChild(document.createTextNode(message));

        //select location for alert
        const addFighter = document.getElementById('add-fighter');
        const inputDiv = document.getElementById('input-div');

        //insert alert message above input div inside add fighter form
        addFighter.insertBefore(alertDiv, inputDiv);
        
        //timeout alert
        setTimeout(function() {
            //check if alert still exists before trying to remove alert to stop error from being thrown
            if (document.querySelector('.alert') !== null) {
                document.querySelector('.alert').remove();
            }
        }, 3500);
    }
    
    //Add alert for not enough fighters
    
}



//Randomizers
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



//Local Storage
class Store {
    //retrieve fighters
    static retrieveFighters() {
        //create fighterObject
        let fighterObject = {};

        //check if fighterObject exists in LS
        if(localStorage.getItem('fighterObject') === null) {
            fighterObject = {'This': 'doesn\'t exist'};
        } else {
           return fighterObject = JSON.parse(localStorage.getItem('fighterObject'));
        }
    }

    //display fighters
        //USE Object.entries()
    static displayFighters() {
        //get stored fighterObject
        const fighterObject = Store.retrieveFighters();
        
        //instantiate UI
        const ui = new UI();

        //check for object properties, display if not null
        if (fighterObject != null || fighterObject != undefined) {
            //display each fighter and rank using Object.entries()
            for (const [key, value] of Object.entries(fighterObject)) {
                ui.addFighterToList(`${key}: ${value}`);
            }
        }
    }

    //add fighter to storage
    //remove fighter from storage


    //update stored fighterObject
    static updateStorage() {
        localStorage.setItem('fighterObject', JSON.stringify(fighterObject));
    }


}



//Load fighters and UI from storage event for DOM
document.addEventListener('DOMContentLoaded', (event) => {
    Store.displayFighters();
    console.log('DOM fully loaded and parsed');
});


    let fighterObject = Store.retrieveFighters();

///CURRENTLY WORKING ON DISPLAYING correctly and creating fighterObject










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
    //instantiate fighter
    const fighter = new Fighter();

    //get fighter and rank
    const
        newFighter = document.getElementById('fighter').value,
        rank = document.getElementById('rank').value;


    //add new fighter to fighter object
    //check if fields are both entered
     //Add alert for not enough fighters
    
    //Add alert for fighter added
    //Add alert for fighter removed
    if (newFighter === '') {
        ui.alert('Please fill in fighter\'s name.', 'failure');
    } else if (rank === 'Select Fighter Rank') {
        ui.alert('Please select a rank.', 'failure');  
    } else {
        //add new fighter to object
        fighter.addFighter(newFighter, rank);
        //display new fighter
        ui.addFighterToList(newFighter, rank);
        //update storage
        Store.updateStorage();
        //reset user input
        ui.clearFields();
        //display message success
        ui.alert(`${newFighter} added to fighter list.`, 'success');
        console.log('fighter added');
    }
    
    e.preventDefault();
    });


//Event Listeners for Deleting Fighter
    //Based of Traversey's Todo list
document.getElementById('fighter-list').addEventListener('click', function(e){
    //instantiate ui
    const ui = new UI();
    //instantiate fighter
    const fighter = new Fighter();
    //instantiate store
    const store = new Store();
    
    //delete fighter from object
    fighter.removeFighter(e.target);
    //delete fighter from ui list
    ui.deleteFighter(e.target);
    //update storage
    store.updateStorage();
    //display message success
    ui.alert('Fighter removed from fighter list.', 'success');
})























    //>>>WANTS<<<
//Format fighter name and rank to be capitalized and uniform

//Save Fighters to local     CURRENTLY WORKING ON THIS
    //stringify JSON/fighterArray
    //save fighter array to local storage API
    //requires a setup with parsing the JSON

//Choose which input fighters to randomly select from
    //push selected fighter from fighter array to selectedFighterArray

    //Choose team size
    //

//Random team size selection

//tournament