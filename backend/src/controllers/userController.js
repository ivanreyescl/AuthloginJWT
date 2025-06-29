import bcrypt from 'bcryptjs';
import { createUserModel, loginUserModel, getUsersModel, getUserByIdModel} from '../models/userModel.js'
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body;
        if (!email || !password || !rol || !lenguage) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const newUser = await createUserModel(email, password, rol, lenguage);
        res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y password son obligatorios' });
        }
        const user = await loginUserModel(email, password);
        if (!user) {
            return res.status(401).json({ error: 'Credenciales incorrectas o usuario no existe' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Usuario autenticado exitosamente', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al autenticar el usuario' });
    }
}

export const getUser = async (req, res) => {
    try {
        console.log('getUser called');
        const { id } = req.params;
        let user;
        if (id) {
            console.log('id presente:', id);
            user = await getUserByIdModel(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
        } else {
            console.log('id no presente, obteniendo todos los usuarios');
            user = await getUsersModel();
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};
