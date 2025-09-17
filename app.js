import express from "express";

const PORT = 3000;
const app = express();

app.use(express.json());

let customers = [
    { id:1, name: "Benedek", email:"b1farben@vasvari.org"},
    { id:2, name: "Máté", email:"b1nagmat@vasvari.org"},
    { id:3, name: "Ádám", email:"b1barada@vasvari.org"}
]

app.get("/customers", (req, res) => {
    res.status(200).json(customers);
})

app.get("/customer/:id", (req, res) => {
    const id = +req.params.id;
    const customer = customers.find(x => x.id == id);
    if (!customer) {
        return res.status(404).json({message: "Customer not found"})
    }
    res.status(200).json(customer);
})

app.post("/customer", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    if (!name || !email) {
        return res.status(400).json({message: "name or email is missing"})
    }
    const id = customers[customers.length - 1].id + 1 || 1;
    const customer = { id, name, email };
    customers.push(customer);
    res.status(201).json(customer);
})

app.put("/customer", (req, res) => {
    const id = +req.params.id;
  let customer = customers.find((i) => i.id === id);
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "name or email is missing" });
  }
  const index = customers.indexOf(customer);
  customer = { ...customer, name, email };
  customers[index] = customer;
  return res.status(200).json(customer);
})

app.delete("/customer/:id", (req, res) => {
    const id = +req.params.id;
    customers = customers.filter((x) => x.id != id);
    res.status(200).json({message: "delete successful"})
})

app.listen(PORT, () => {
    console.log(`Server run on http://localhost:${PORT}`);
})