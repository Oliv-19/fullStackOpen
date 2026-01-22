import { render, screen } from '@testing-library/react'
import { userEvent} from '@testing-library/user-event'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

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
    test('handleLikes is called twice when likeBtn is clicked twice', async() => {
        const user = userEvent.setup()
        const mockFn = vi.fn()
        const mockBlog = {
            title:'Test Blog',
            author: 'Test Author',
            url: 'Test Url',
            likes: 0
        }
        render(<Blog blog={mockBlog} handleLikes={mockFn}/>)
        const viewBlogBtn = screen.getByTestId('viewBtn')
        await user.click(viewBlogBtn)
        const likeBlogBtn = screen.getByTestId('likeBtn')
        await user.click(likeBlogBtn)
        await user.click(likeBlogBtn)
        expect(mockFn.mock.calls).toHaveLength(2)
    })
    test('form calls createNewBlog with right details', async() => {
        const user = userEvent.setup()
        const mockFn = vi.fn()
        const mockBlog = {
            title:'Test Blog',
            author: 'Test Author',
            url: 'Test Url'
        }
        render(<NewBlogForm createNewBlog={mockFn}/>)
        const titleInput = screen.getByLabelText('title:')
        const authorInput = screen.getByLabelText('author:')
        const urlInput = screen.getByLabelText('url:')
        const submitBtn = screen.getByRole('button')

        await user.type(titleInput, mockBlog.title)
        await user.type(authorInput, mockBlog.author)
        await user.type(urlInput, mockBlog.url)
        await user.click(submitBtn)

        expect(mockFn.mock.calls).toHaveLength(1)
        expect(mockFn.mock.calls[0][0]).toEqual(mockBlog)
    })
})