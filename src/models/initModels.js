import User from "./users.models.js";
import Task from "./tasks.models.js";
import Category from "./categories.models.js";

const initModels =  () => {
    //Here is the relations of the tables

    //User has many tasks
    User.hasMany(Task, {foreignKey: 'userId'})
    // Task belongs to one user
    Task.belongsTo(User, {foreignKey: 'userId'})

    //Task belongs to one category
    Task.belongsTo(Category, {foreignKey: 'categoryId'})
    //Category hasMany task
    Category.hasMany(Task, {foreignKey: 'categoryId'})
}

export default initModels;