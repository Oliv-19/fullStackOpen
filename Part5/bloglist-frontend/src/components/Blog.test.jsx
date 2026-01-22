import { render, screen } from '@testing-library/react'
import { userEvent} from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blogs />', () => {
    test('displays Title and author by default', () => {
        const mockBlog = {
            title:'Test Blog',
            author: 'Test Author',
            url: 'Test Url',
            likes: 0
        }
        const { container }= render(<Blog blog={mockBlog}/>)
        const blogDiv = container.querySelector('.blog')

        expect(blogDiv.textContent).toBe('Test Blog Test Author view')
        expect(blogDiv.textContent).not.toBe('Test Url')
        expect(blogDiv.textContent).not.toBe('likes 0')
    })
    test('displays Url and likes when viewBtn is clicked', async() => {
        const user = userEvent.setup()
        const mockBlog = {
            title:'Test Blog',
            author: 'Test Author',
            url: 'Test Url',
            likes: 0
        }
        render(<Blog blog={mockBlog}/>)
        const viewBlogBtn = screen.getByTestId('viewBtn')
        await user.click(viewBlogBtn)
        const title = screen.getByText(mockBlog.title)
        const author = screen.getByText(mockBlog.author)
        const url = screen.getByText(mockBlog.url)
        const likes = screen.getByText('likes 0')

        expect(title).toBeVisible()
        expect(author).toBeVisible()
        expect(url).toBeVisible()
        expect(likes).toBeVisible()
    })
})