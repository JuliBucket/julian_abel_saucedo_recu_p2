const express = require("express");
const app = express();

app.use(express.json());

const students = [];


app.get("/students", (req, res) => {
  res.json(students);
});


app.get("/students/:id", (req, res) => {
  const { id } = req.params;

  const getStudent = students.find((students) => students.id === parseInt(id));

  if (!getStudent) {
    res.status(404).send("El id no coincide con ningún estudiante");
  }

  res.json(getStudent);
});


app.post("/students", (req, res) => {
  let { fullName, age, curse } = req.body;

  const id = new Date().getTime();

  if(fullName !== String){
    fullName = fullName.trim();
  } else {
    return res.status(406).send("Debe ingresar una cadena de caracteres en el nombre")
  }

  if(curse !== String){
    curse = curse.trim();
  } else {
    return res.status(406).send("Debe ingresar una cadena de caracteres en el curso")
  }

  if(age == Number){
    return res.status(406).send("Solo puede ingresar valores numericos")
  } else {
    age = parseInt(age);
  }
  
  if (isNaN(age) || (age < 0 || age > 99)) {
    return res.status(404).send("Debe colocar una edad válida");
  }

  const duplicateStudent = students.find(
    (student) => student.fullName.toLowerCase() === fullName.toLowerCase()
  );

  if (duplicateStudent) {
    return res.status(409).send("Ya existe un estudiante con ese nombre");
  }

  const nameParts = fullName.split(" ");
  if (nameParts.length < 2) {
    return res.status(400).send("El nombre completo debe contener tanto nombre como apellido");
  }


  const newStudent = {
    id: id,
    fullName,
    age,
    curse,
  };

  students.push(newStudent);
  res.status(201).json(students);

  console.log(typeof age);
});


app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let { fullName, age, curse } = req.body;

  const getStudent = students.find((students) => students.id === parseInt(id));

  if (!getStudent) {
    return res.status(404).send("No se encontró el alumno");
  }

  if (fullName) {
    fullName = fullName.trim();
    if (fullName) {
      getStudent.fullName = fullName;
    }
  }

  if (age) {
    age = parseInt(age);
    if (!isNaN(age)) {
      getStudent.age = age;
    }
  }


  res.status(200).json(students);
});


app.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  const getStudent = students.find((students) => students.id === parseInt(id));

  if (!getStudent) {
    return res.send("Estudiante no encontrado");
  } else students.splice(getBook, 1);
  res.send("Estudiante eliminado correctamente");
});

app.listen(
  4321,
  console.log("servidor corriendo en el puerto htpp://localhost:4321")
);
