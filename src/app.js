import express from 'express';
import db from './utils/database.js';
import initModels from './models/initModels.js';
import taskRoutes from './components/tasks/tasks.routes.js'
import userRoutes from './components/users/users.routes.js'
import categoryRoutes from './components/categories/categories.routes.js'

initModels();

db.authenticate()
  .then(() => console.log("Data base is connected correctly"))
  .catch((e) => console.log(e));

db.sync() 
  .then( ()=> console.log('Data base synchronized'))
  .catch((error) => console.log(error))

const PORT = process.env.PORT ?? 8000;

const app = express();

app.use(express.json())

app.use(taskRoutes)
app.use(userRoutes)
app.use(categoryRoutes)

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});