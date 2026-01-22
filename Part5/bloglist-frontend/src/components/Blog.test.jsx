import { render, screen } from '@testing-library/react'
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
        expect(blogDiv.textContent).not.toBe('0')
    })
})