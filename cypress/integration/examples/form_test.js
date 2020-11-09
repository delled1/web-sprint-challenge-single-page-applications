//Write tests here

describe('Onboarding Form App Testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/Pizza');
    })

//helpers to select elements
const nameInput = () => cy.get('input[name=name]');
const specialInstructionsInput = () => cy.get('input[name=specialInstructions]');
const sizeInput = () => cy.get('select')
const cheeseInput = () => cy.get('input[name="cheese"]')
const pepperoniInput = () => cy.get('input[name="pepperoni"]')
const mushroomInput = () => cy.get('input[name="mushrooms"]')
const sausageInput = () => cy.get('input[name="sausage"]')
const submitButton = () => cy.get(`button[id="submit"]`)

//Initializing testing

it('Should display name input text area', () => {
    nameInput().type('Eric')
    nameInput().should('exist')
    nameInput().should('have.value', 'Eric');
})

it('Should display special instructions input text area', () => {
    specialInstructionsInput().type('n/a')
    specialInstructionsInput().should('exist')
    specialInstructionsInput().should('have.value', 'n/a');
})

it('Checking checks for toppings', () => {
    cheeseInput().check();
    pepperoniInput().check();
    mushroomInput().check();
    sausageInput().check();
})

it('Checking if you can submit with no toppings', () => {
    nameInput().type('eric');
    sizeInput().select("Small").should('have.value', '1');
    specialInstructionsInput().type('n/a')
    submitButton().should('not.be.disabled');

})

it('Check to see if form can be submitted with single topping', () =>{
    nameInput().type('eric');
    sizeInput().select("Small").should('have.value', '1');
    cheeseInput().check();
    specialInstructionsInput().type('n/a')
    submitButton().should('not.be.disabled');
})

it('Check to see if submit disabled on initial render', () => {
    submitButton().should('be.disabled');
})



})