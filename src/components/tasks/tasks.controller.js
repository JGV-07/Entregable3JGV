import Task from "../../models/tasks.models.js";
import Category from "../../models/categories.models.js";

/* - un endpoint para que un usuario pueda crear tareas ( Cuando un usuario crea una tarea debe seleccionarse la categoria a la que esta pertenece)  categoryId */
const createTaskByUser = async (req, res) => {
    try {
        const { title, description, completed, categoryId } = req.body; // Get the request data
        const userId = req.params.id; // Get user ID from URL

        // Check if the category specified by categoryId exists
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(400).json({ error: "The specified category does not exist" });
        }

        // Create the task associated with the user and the category
        const task = await Task.create({
            title,
            description,
            completed,
            categoryId,
            userId, // assign ID of the user at the task 
        });

        res.status(201).json(task); 
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Internal Server Error" });
    }
};

/* - un endpoint para obtener todas las tareas de un usuario incluidas sus categorias ( filtros (where), include) */
const getAllTaskByUser = async (req, res) => {
    try {
        
        const tasks = await Task.findAll({
            where: { userId: req.params.id },
            attributes: ['user_id', 'title', 'description', 'completed'], 
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name', 'description']
                }
            ]
        });
        
        res.status(201).json(tasks);
    } catch (error) {
        res.status(400).json({error: "Error trying to obtain the tasks of the user"});
        console.log(error);
    }
}


 // - un endpoint para que un usuario pueda cambiar el atributo completed de una tarea (false a true o viceversa ) por defecto una tarea se crea con el atributo completed false (investigar)
/* PUT */

const updateTaskById = async (req, res) => {
    try {
        const userId = req.params.id; // ID user
        const taskId = req.body.taskId; // ID of the task the user wants to update 
        const completed = req.body.completed; //New value completed 

        //Verify if the task owns the user
        const task = await Task.findOne({
            where: { id: taskId, userId: userId }
        });

        if (!task) {
            return res.status(400).json({ error: "Task not found or not owned by the user" });
        }

        // Actualizar el valor de 'completed'
        task.completed = completed;
        await task.save();

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Internal Server Error" });
    }
};


// - un endpoint que permita eliminar tareas
const deleteTask = async (req, res) => {
    try {
        const userId = req.params.id; // ID user
        const taskId = req.body.taskId; // ID of the task which the user want to eliminate

        const task = await Task.findOne({
            where: { id: taskId, userId: userId }
        });

        if (!task) {
            return res.status(400).json({ error: "Task not found or not owned by the user" });
        }

        await Task.destroy({
            where: { id: taskId }
        });
        
        res.status(201).end(); 
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Internal Server Error" });
    }
};


export { createTaskByUser, getAllTaskByUser, updateTaskById ,deleteTask }
