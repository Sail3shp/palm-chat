import express from 'express'

const app = express()

app.get('/health',(req,res) => {
    res.send("All good")
})


app.listen(5432,() => {
    console.log('server is running ')
})