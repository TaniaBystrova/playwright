const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const userEmail = faker.internet.email()

test.describe.only('Login page', () => {
test('Register form', async ({page})=> {
 await page.goto('/')
 const signInButton= page.locator('button', {hasText: 'Sign In'})
 const loginPopup= page.locator('div.modal-dialog-centered')
 const registrationButton= loginPopup.locator('button', {hasText: 'Registration'})
 const registrationPopup= page.locator('.modal-dialog.modal-dialog-centered')
 const registrationTitle= registrationPopup.locator('.modal-title')
 const nameInput= registrationPopup.locator('#signupName')
 const lastNameInput= registrationPopup.locator('#signupLastName')
 const emailInput= registrationPopup.locator('#signupEmail')
 const passwordInput= registrationPopup.locator('#signupPassword')
 const repeatPasswordInput= registrationPopup.locator('#signupRepeatPassword')
 const registerButton= registrationPopup.locator('button', {hasText: 'Register'})
 const expectedValidationMessages = [
    'Name is invalidName has to be from 2 to 20 characters long',
    'Last name is invalidLast name has to be from 2 to 20 characters long',
    'Email is incorrect',
    'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
  ];


 
 await signInButton.click()
 await expect(loginPopup).toBeVisible()
 await registrationButton.click()
 await expect(registrationPopup).toBeVisible()
 await expect(registrationTitle).toHaveText('Registration')
 await nameInput.fill(' ')
 //await expect(registrationPopup).toHaveInne('p', {containsText: 'Name is invalid'})
 await lastNameInput.fill(' ')
 await emailInput.fill(' ')
 await passwordInput.fill(' ')
 await repeatPasswordInput.fill(' ')
 await registerButton.scrollIntoViewIfNeeded();
 await expect(registerButton).toBeDisabled()
 await page.waitForSelector('.invalid-feedback')
 const validationMessages = await page.$$eval('.invalid-feedback', (elements) =>
    elements.map((element) => element.textContent.trim())
  )
   expect(validationMessages).toStrictEqual(expectedValidationMessages)

   ///
   await nameInput.fill('John');
    await lastNameInput.fill('Doe');
    await emailInput.fill(`hillel-${userEmail}`);
    await passwordInput.fill('StrongP@ss123');
    await repeatPasswordInput.fill('StrongP@ss123');

    // Scroll to the "Register" button and click it
    await registerButton.scrollIntoViewIfNeeded();
    await registerButton.click();
    expect(page).toHaveURL('/panel/garage')
})
})
