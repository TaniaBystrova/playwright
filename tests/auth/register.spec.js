const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const userEmail = faker.internet.email()

test.describe.only('Login page', () => {
let registrationPopup
let page
test.beforeAll(async({browser}) => {
const context= await browser.newContext()
page= await context.newPage()
registrationPopup= page.locator('.modal-dialog.modal-dialog-centered')
    })
test.beforeEach(async() => {
    const signUpButton= page.locator('button', {hasText: 'Sign Up'})
    const registrationTitle= registrationPopup.locator('.modal-title')
    await page.goto('/')
    await signUpButton.click()
    await expect(registrationPopup).toBeVisible()
    await expect(registrationTitle).toHaveText('Registration')
}) 
test('Register form with empty values', async ()=> {
 
 const nameInput= registrationPopup.locator('#signupName')
 const lastNameInput= registrationPopup.locator('#signupLastName')
 const emailInput= registrationPopup.locator('#signupEmail')
 const passwordInput= registrationPopup.locator('#signupPassword')
 const repeatPasswordInput= registrationPopup.locator('#signupRepeatPassword')
 const registerButton= registrationPopup.locator('button', {hasText: 'Register'})
 const errorMessage= registrationPopup.locator('.invalid-feedback').filter({ state: 'visible' })
 const expectedValidationMessages = [
  'Name is invalid\n\nName has to be from 2 to 20 characters long',
  'Last name is invalid\n\nLast name has to be from 2 to 20 characters long',
  'Email is incorrect',
  'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
  ];
 await nameInput.fill(' ')
 await lastNameInput.fill(' ')
 await emailInput.fill(' ')
 await passwordInput.fill(' ')
 await repeatPasswordInput.fill(' ')
 await registerButton.scrollIntoViewIfNeeded();
 await expect(registerButton).toBeDisabled()
 await expect(errorMessage).toHaveCount(4)

const extractedMessages = []
  for (const message of await errorMessage.all()) {
    extractedMessages.push(await message.innerText())
  }
  
 expect(extractedMessages).toStrictEqual(expectedValidationMessages)
})

test('Register with valid email', async ()=> {
    const nameInput= registrationPopup.locator('#signupName')
    const lastNameInput= registrationPopup.locator('#signupLastName')
    const emailInput= registrationPopup.locator('#signupEmail')
    const passwordInput= registrationPopup.locator('#signupPassword')
    const repeatPasswordInput= registrationPopup.locator('#signupRepeatPassword')
    const registerButton= registrationPopup.locator('button', {hasText: 'Register'})
    await nameInput.fill('John');
    await lastNameInput.fill('Doe');
    await emailInput.fill(`hillel-${userEmail}`)
    await passwordInput.fill('StrongP@ss123');
    await repeatPasswordInput.fill('StrongP@ss123')
    await registerButton.scrollIntoViewIfNeeded()
    await registerButton.click();
    await expect(page).toHaveURL('/panel/garage')
    await expect(registrationPopup).toBeHidden()
   })
})
