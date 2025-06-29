export const validateCreateUser = (req, res, next) => {
    const { email, password, rol, lenguage } = req.body;
    if (!email || !password || !rol || !lenguage) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    next();
};