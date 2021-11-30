const express = require("express")
const cors = require("cors")

const app = express()

//top-level middleware
app.use(express.json())
app.use(cors())

const movies = [{
    id: 1,
    title: "Ghostbusters"
},
{
    id: 2,
    title: "Knives Out"
},
{
    id: 3,
    title: "Dune"
}]

let movieId = 4

//endpoints
app.get("/api/movies", (req, res) => {
    res.status(200).send(movies)
})

app.post("/api/movies", (req, res) => {
    let {title} = req.body
    let movieToAdd = {
        id: movieId,
        title
    }
    movies.push(movieToAdd)
    res.status(200).send(movies)
    movieId++
})

app.put("/api/movies/:id", (req, res) => {
    //an identifier to locate the object in the array and then change the title
    const {id} = req.params
    const {newTitle} = req.body
    const index = movies.findIndex(m => +id === m.id)
    movies[index].title = newTitle
    res.status(200).send(movies)
})

app.delete("/api/movies/:id", (req, res) => {
    const {id} = req.params
    const index = movies.findIndex(m => +id === m.id)
    movies.splice(index, 1)
    res.status(200).send(movies)
})


//listen to server
app.listen(4040, () => console.log("server running on port 4040"))