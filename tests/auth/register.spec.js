const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { default: WelcomePage } = require('../../src/pageObjects/welcomePage/WelcomePage');
const { default: Registration } = require('../../src/pageObjects/components/RegistrationPopup');
const userEmail = faker.internet.email()

test.describe('Login page @regression', () => {
let registration
let welcomePage
let page
const baseSignUpData = {
  name: 'John',
  lastName: 'Doe',
  email: `hillel-${userEmail}`,
  password: 'StrongP@ss123',
  rePassword: 'StrongP@ss123'
}
test.beforeAll(async({browser}) => {
const context= await browser.newContext()
page= await context.newPage()
welcomePage = new WelcomePage(page)
registration = new Registration(page)
})
test.beforeEach(async() => {
   await welcomePage.navigate()
   await welcomePage.getRegistrationPopup()
   await welcomePage.waitLoaded()
   await registration.getRegistrationPopup()
   await registration.verifyRegistrationPopupTitle()
}) 
test('Register form with empty values', async ()=> {
  const emptySignUpData = {
    ...baseSignUpData,
    name: ' ',
    lastName: ' ',
    email: ' ',
    password: ' ',
    rePassword: ' '
  }
  const expectedValidationMessages = [
  'Name is invalid\n\nName has to be from 2 to 20 characters long',
  'Last name is invalid\n\nLast name has to be from 2 to 20 characters long',
  'Email is incorrect',
  'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
  ];
 await registration.fill(emptySignUpData)
 await registration.registerButton.scrollIntoViewIfNeeded()
 await expect(registration.registerButton).toBeDisabled()
 await expect(registration.errorMessage).toHaveCount(4)

const extractedMessages = []
  for (const message of await registration.errorMessage.all()) {
    extractedMessages.push(await message.innerText())
  }
 expect(extractedMessages).toStrictEqual(expectedValidationMessages)
})

test('Last Name is required', async ()=> {
  const signUpData = {
    ...baseSignUpData,
    lastName: ''
  }
  await registration.fill(signUpData)
  await expect(registration.errorMessage).toHaveText('Last name required')
  await registration.registerButton.scrollIntoViewIfNeeded()
  await expect(registration.registerButton).toBeDisabled()
 })

 test('First Name more than 20 characters', async ()=> {
  const signUpData = {
    ...baseSignUpData,
    name: 'Johnnnnnnnnnnnnnnnnnn'
  }
  await registration.fill(signUpData)
  await expect(registration.errorMessage).toHaveText('Name has to be from 2 to 20 characters long')
  await registration.registerButton.scrollIntoViewIfNeeded()
  await expect(registration.registerButton).toBeDisabled()
 })
 test('Register with invalid email', async ()=> {
  const signUpData = {
    ...baseSignUpData,
    email: 'hillel-'
  }
  await registration.fill(signUpData)
  await expect(registration.errorMessage).toHaveText('Email is incorrect')
  await registration.registerButton.scrollIntoViewIfNeeded()
  await expect(registration.registerButton).toBeDisabled()
 })

test('Successful registration', async ()=> {
    await registration.registerNewUser(baseSignUpData)
    await expect(registration.registrationPopup).toBeHidden()
   })
})
