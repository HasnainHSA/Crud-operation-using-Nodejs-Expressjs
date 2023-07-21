// importing express for package.json
import express from "express";

// initialize express server
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

// hardcode array of object in which data create, delete or update data
let contactdetails = [
    {
        id: 1,
        name: "Hasnain"
    }
]


// get that return all the products
app.get("/contacts", (req, res) => {
    res.status(200).send({
        success: true,
        message: "Contact fetch successfully ",
        data: contactdetails
    })
})


// post request for creating data 
app.post("/contact", (req, res) => {
    let name = req.body.name

    if (name) {
        contactdetails.push({
            id: (contactdetails.length + 1).toString(),
            name: name
        })
        res.status(201).send({
            success: true,
            message: "Contact created successfully"
        })
    }
    else {
        res.send({
            success: false,
            message: "Body is empty",
            error: [{
                field: "name",
                message: "cannot be undefined"
            }]
        })
    }
})


//  Delete product by specific product by id
app.delete("/contact/:id", (req, res) => {
    let id = req.params.id

    let newContact = contactdetails.filter(data => data.id != id)
    contactdetails = newContact

    res.status(204).send({
        success: true,
        message: "Contact deleted successfully"
    })
})


// for updating specific contact
app.put("/contact/:id", (req, res) => {
    let id = req.params.id
    let name = req.body.name

    if (name) {
        let index = contactdetails.findIndex(i => i.id == id)

        contactdetails[index] = {
            ...contactdetails[index],
            name: name
        }

        res.status(203).send({
            success: true,
            messsage: "Contact updated successfully"
        })
    }
    else {
        res.status(404).send({
            success: false,
            message: "Body is empty",
            error: [{
                field: "name",
                message: "cannot be undefined"
            }]
        })
    }
})


// our server is running on this port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})