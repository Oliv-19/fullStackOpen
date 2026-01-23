const { test, expect, beforeEach, describe } = require('@playwright/test')
const { resetDB, createUser } = require('./testHelper')

describe('Blog app', () => {
  beforeEach(async ({ page, request}) => {
    await page.goto('http://localhost:5173')
    await resetDB(request)
    await createUser(request, 'root', 'sekret', 'root')
  })

  test('Login form is shown', async ({ page }) => {
    const title =  page.getByText('Log in to application')
    await expect(title).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('Username').fill('root')
      await page.getByLabel('Password').fill('sekret')
      await page.getByRole('button', {name: 'log in'}).click()
      await expect(page.getByText('root logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('Username').fill('root')
      await page.getByLabel('Password').fill('wrong')
      await page.getByRole('button', {name: 'log in'}).click()
      await expect(page.getByText('root logged in')).not.toBeVisible()
    })
  })
})