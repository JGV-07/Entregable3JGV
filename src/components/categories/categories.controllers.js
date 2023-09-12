import Category from "../../models/categories.models.js";

const createCategory = async (req, res) => {
    try {
        const { body } = req;
        const [newCategory, created] = await Category.findOrCreate({
            where: { name: body.name }, // Search for a category with the same name
            defaults: body, // Uses the request body as default values if not found
        });

        if (!created) {
            return res.status(400).json({ error: "Category already exist" });
        }

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
};

export { createCategory }