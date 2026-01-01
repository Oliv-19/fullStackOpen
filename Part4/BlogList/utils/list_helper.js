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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}