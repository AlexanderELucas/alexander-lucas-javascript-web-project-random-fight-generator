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
            console.log('fighter was removed');
        }
    }

}

//Used Traversey's Todo/book list guide for reference https://www.udemy.com/course/modern-javascript-from-the-beginning/learn/lecture/8762264
class UI {
    //Set first letter of fighter name to capital and the remaining to lowercase
    setName(fighterName) {
        //return first capitalized remaining lowercased
        let uniformName = fighterName.toLowerCase();

        return uniformName.charAt(0).toUpperCase() + uniformName.slice(1)
    }

    //Adds fighter
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

    //Removes fighter
    deleteFighter(target){
        if(target.className === 'remove'){
            target.parentElement.parentElement.remove();
        }
    }

    //Resets input fields to original state
    clearFields() {
        document.getElementById('fighter').value = '';
        //resets rank field to "select fighter rank"
        document.getElementById('rank').value = 'Select Fighter Rank';
    }

    //Clears previous fight
    clearFight() {
        const teamOne = document.getElementById('first-team');
        const teamTwo = document.getElementById('second-team');
        
        //Removes all fighters from Team One display
        while (teamOne.firstChild) {
            teamOne.removeChild(teamOne.firstChild);
        }
        //Removes all fighters from Team Two display
        while (teamTwo.firstChild) {
            teamTwo.removeChild(teamTwo.firstChild);
        }
    }

    //Adds fighters for team one
    teamOneFighter(fighter, weapon){
        const teamOne = document.getElementById('first-team');
        const selection = document.createElement('div');
        //insert fighter and weapon into selection
        selection.innerHTML = `
            <h1>${fighter}</h1>
            <h1>${weapon}</h1>
            `;
            selection.setAttribute('class','fighter')
        teamOne.appendChild(selection);
    }

    //Adds fighters for team two
    teamTwoFighter(fighter, weapon) {
        const teamTwo = document.getElementById('second-team');
        const selection = document.createElement('div');
        //insert fighter and weapon into selection
        selection.innerHTML = `
            <h1>${fighter}</h1>
            <h1>${weapon}</h1>
            `;
        selection.setAttribute('class','fighter')
        teamTwo.appendChild(selection);
    }

    //Display alert messages
    alert(message, type) {
        //remove any current alerts
        if (document.querySelector('.alert') !== null) {
            document.querySelector('.alert').remove();
        }

        //create alert message block
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type} fixed-top`;

        //fill in message
        alertDiv.appendChild(document.createTextNode(message));

        //select location for alert
        const wrapper = document.getElementById('wrapper');
        const fightDiv = document.getElementById('random-fight');

        //insert alert message above input div inside add fighter form
        wrapper.insertBefore(alertDiv, fightDiv);
        
        //timeout alert
        setTimeout(function() {
            //check if alert still exists before trying to remove alert to stop error from being thrown
            if (document.querySelector('.alert') !== null) {
                document.querySelector('.alert').remove();
            }
        }, 3500);
    }    
}


//Randomizers
class Random {
    //Random Weapon Selection function
    //Random selection from 0 to 6 using if statement to filter between options of Blue/Red/Shield/Ranged/Pole/FightersChoice
    //Return fighters selected weapon
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
            return 'ANY';
        }
    }

    //Random Fighter Selection
    //Uses Object.key(fighters) to create array 
    //Random floor selection from 0 to fighterArray.length to select fighter
    //Return fighters names and remove first fighter from fighterArray map
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

    //Battle selection
    //1v1    selection value 1
    oneVOne() {
        //instantiate UI
        const ui = new UI();

        //check if enough fighters exist
        let fighterArray = Object.keys(fighterObject)
        if (fighterArray.length > 1) {
            //clear previous fight
            ui.clearFight();
            
            //randomize team one
            ui.teamOneFighter(this.fighter(fighterArray), this.weapon());
            
            //randomize team two
            ui.teamTwoFighter(this.fighter(fighterArray), this.weapon());
        } else {
            ui.alert('Not enough fighters', 'failure');
        }
    }

    //2v1   selection value 2
    twoVOne() {
        //instantiate UI
        const ui = new UI();

        

        //check if enough fighters exist
        let fighterArray = Object.keys(fighterObject)
        if (fighterArray.length > 2) {
            //clear previous fight
            ui.clearFight();
            
            //randomize team one
            for (let i = 0; i < 2; i++) {
                ui.teamOneFighter(this.fighter(fighterArray), this.weapon());
            }
            
            //randomize team two
            ui.teamTwoFighter(this.fighter(fighterArray), this.weapon());
        } else {
            ui.alert('Not enough fighters', 'failure');
        }
    }

    //2v2   selection value 3
    twoVTwo() {
        //instantiate UI
        const ui = new UI();

        //check if enough fighters exist
        let fighterArray = Object.keys(fighterObject)
        if (fighterArray.length > 3) {
            //clear previous fight
            ui.clearFight(); 

            //randomize team one
            for (let i = 0; i < 2; i++) {
                ui.teamOneFighter(this.fighter(fighterArray), this.weapon());
            }
            //randomize team two
            for (let i = 0; i < 2; i++) {
                ui.teamTwoFighter(this.fighter(fighterArray), this.weapon());
            }
        } else {
            ui.alert('Not enough fighters', 'failure');
        }

    }

    //Full Battle Half v Half   selection value 4
    fullBattle(){
        let teamSize = Math.floor(Object.keys(fighterObject).length / 2);
        
        //instantiate UI
        const ui = new UI();

        

        //check if enough fighters exist
        let fighterArray = Object.keys(fighterObject)
        if (fighterArray.length > 3) {
            //clear previous fight
            ui.clearFight();

            //randomize team one
            for (let i = 0; i < teamSize; i++) {
                ui.teamOneFighter(this.fighter(fighterArray), this.weapon());
            }
            //randomize team two
            for (let i = 0; i < teamSize; i++) {
                ui.teamTwoFighter(this.fighter(fighterArray), this.weapon());
            }
        } else {
            ui.alert('Not enough fighters', 'failure');
        }

    }
}


//Local Storage
class Store {
    //Retrieve fighters
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

    //Display fighters
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
                ui.addFighterToList(`${key}`, `${value}`);
            }
        }
    }

    //update stored fighterObject
    //Add/Remove fighter from stored object
    static updateStorage() {
        localStorage.setItem('fighterObject', JSON.stringify(fighterObject));
    }


}


//Load fighters and UI from storage event for DOM
document.addEventListener('DOMContentLoaded', (event) => {
    Store.displayFighters();
    console.log('DOM fully loaded and parsed');
});

//Create fighterObject based on local storage, if first time then create empty object
let fighterObject = Store.retrieveFighters();
if (fighterObject == undefined) {
    fighterObject = {};
}


// EVENT LISTENERS


//Event Listeners for Random Fight Generation
    //uses Object.key(fighters) to create array
    //uses Random methods to select fighters and weapons
document.getElementById('generate-fight').addEventListener('submit', function(e){
    //Instantiate random
    const random = new Random();
    //Instantiate ui
    const ui = new UI();

    //Check battle selection
    let battleType = document.getElementById('battle').value;
    
    //Generate selected battle
    if (battleType == 0) {
        ui.alert('Please select a battle type', 'failure');
    } else if (battleType == 1) {
        random.oneVOne();
    } else if (battleType == 2) {
        random.twoVOne();
    } else if (battleType == 3) {
        random.twoVTwo();
    } else if (battleType == 4) {
        random.fullBattle();
    }

    e.preventDefault();
});


//Event Listeners for Add New Fighter
document.getElementById('add-fighter').addEventListener('submit', function(e){
    //Instantiate ui
    const ui = new UI();
    //Instantiate fighter
    const fighter = new Fighter();

    //Get fighter and rank
    const
        newFighter = ui.setName(document.getElementById('fighter').value);
        rank = document.getElementById('rank').value;


    //Add new fighter to fighter object
    //Check if fields are both entered
    //Add alert for not enough fighters
    if (newFighter === '') {
        ui.alert('Please fill in fighter\'s name.', 'failure');
    } else if (rank === 'Select Fighter Rank') {
        ui.alert('Please select a rank.', 'failure');  
    } else {
        //check if fighter is already on list
        if (fighterObject.hasOwnProperty(newFighter)) {
            ui.alert(`${newFighter} is already on the list`, 'failure');
            ui.clearFields();
        } else {
            //add new fighter to object
            fighter.addFighter(newFighter, rank);
            //display new fighter
            ui.addFighterToList(newFighter, rank);
            //update storage
            Store.updateStorage();
            //reset user input
            ui.clearFields();
            //display alert message for fighter add success
            ui.alert(`${newFighter} added to fighter list.`, 'success');
            console.log('fighter added');
        }
    }
    e.preventDefault();
    });


//Event Listeners for Deleting Fighter
    //Used Traversey's Todo/book list guide for reference https://www.udemy.com/course/modern-javascript-from-the-beginning/learn/lecture/8762264
document.getElementById('fighter-list').addEventListener('click', function(e){
    //Instantiate ui
    const ui = new UI();
    //Instantiate fighter
    const fighter = new Fighter();
    
    //Track which fighter was removed to display in message
    let fighterName = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    //Delete fighter from object
    fighter.removeFighter(e.target);
    //Delete fighter from ui list
    ui.deleteFighter(e.target);
    //Update storage
    Store.updateStorage();

    //Display alert message for fighter removal success
    ui.alert(`${fighterName} was removed from fighter list.`, 'success');
    e.preventDefault();
})





    //>>>WANTS<<<
//Format fighter name and rank to be capitalized and uniform   COMPLETED
    //fighter name is now capitalized
    //ranks are uniform from dropdown

//Save Fighters to local     COMPLETED
    //stringify JSON/fighterArray
    //save fighter array to local storage API
    //requires a setup with parsing the JSON

//Choose which input fighters to randomly select from          INCOMPLETE
    //push selected fighter from fighter array to selectedFighterArray

//Random team size selection    COMPLETED
    //1v1
    //2v1
    //2v2
    //Half v Half

//Tournament   INCOMPLETE