export const validateAuthUser = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y password son obligatorios' });
    }
    next();
};