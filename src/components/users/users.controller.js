import User from "../../models/users.models.js";

const createUser = async (req, res) => {
    try {
        const { body } = req;

        // Find a user with the same email
        const [newUser, created] = await User.findOrCreate({
            where: { email: body.email },
            defaults: body,
        });

        if (!created) {
            return res.status(400).json({ error: "The email has already used" });
        }

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json(error);
    }
};

export {createUser}