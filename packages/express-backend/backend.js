import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const deleteUser = (id) => {
    const userInd = users["users_list"].findIndex(user => user.id === id);
    if(userInd !== -1){
        return users["users_list"].splice(userInd, 1)[0];
    }
    return null;
};

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => 
            user["name"] === name &&
            user["job"] === job
    );
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined) {
        let result;
        if (job != undefined){
            result = findUserByNameAndJob(name, job);
        } else {
            result = findUserByName(name);
        }

        result = { users_list: result };
        res.send(result);
        
    } else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = generateID();
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

app.delete("/users/:id", (req, res) => {
    const userId = req.params["id"];

    if(findUserById(id) === undefined){
        res.status(404).send("Resource not found")
    } else {
        deleteUser(userId);
        res.status(204).send();
    }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

//Generating ID 
function generateID(){
    let id = '';

    for(let i = 0; i < 3; i++){
        id += String.fromCharCode(
            Math.floor(Math.random() * 26)
            + 97
        );
    }

    for(let i = 0; i < 3; i++){
        id += Math.floor(Math.random() * 10);
    }

    return id;
}