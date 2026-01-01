const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return blogs.length === 0? 0:blogs.reduce((prev, curr)=> prev + curr.likes,0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0? {} : blogs.reduce((prev, curr)=> {
       prev =  prev.likes < curr.likes? curr : prev
       return prev
    },blogs[0])
}

const mostBlogs = (blogs) => {
    if(blogs.length == 0){
        return {}
    }
    const authors = {}
    blogs.forEach(blog => {
        if(Object.keys(authors).includes(blog.author)){
            authors[blog.author] = authors[blog.author]+1
        }else{
            authors[blog.author] = 1
        }
    });
    const most =  Object.entries(authors).reduce((prev , curr)=> {
       prev =  prev[1] < curr[1] ? curr : prev
       return prev
    },[Object.keys(authors).at(0), Object.values(authors).at(0)])

    return {
        author: most[0],
        blogs: most[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}