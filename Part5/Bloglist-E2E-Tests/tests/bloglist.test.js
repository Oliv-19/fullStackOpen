const { test, expect, beforeEach, describe } = require('@playwright/test')
const { resetDB, createUser, addBlog } = require('./testHelper')

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
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('Username').fill('root')
      await page.getByLabel('Password').fill('sekret')
      await page.getByRole('button', {name: 'log in'}).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByText('Create new blog').click()
      await page.getByLabel('title:').fill('test blog')
      await page.getByLabel('author:').fill('root')
      await page.getByLabel('url:').fill('none')
      await page.getByRole('button', {name: 'create'}).click()

      await expect(page.getByText('test blog root')).toBeVisible()
    })
    describe( 'When blog is created', async() => {
      beforeEach(async ({page}) => {
        await page.getByText('Create new blog').click()
        await page.getByLabel('title:').fill('test blog')
        await page.getByLabel('author:').fill('root')
        await page.getByLabel('url:').fill('none')
        await page.getByRole('button', {name: 'create'}).click()
      })
      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', {name: 'view'}).click()
        await page.getByRole('button', {name: 'like'}).click()
  
        await expect(page.getByText('likes 1')).toBeVisible()
      })
      test('a blog can be deleted by user who created it', async ({ page }) => {
        await page.getByRole('button', {name: 'view'}).click()
        page.on('dialog', async dialog => {
          await dialog.accept()
        })
        await expect(page.getByRole('button', {name: 'Remove'})).toBeVisible()
        await page.getByRole('button', {name: 'Remove'}).click()
        await expect(page.getByText('test blog root')).not.toBeVisible()
      })
    })
  })
})