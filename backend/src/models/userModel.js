import pool from '../../db/config.js'
import bcrypt from 'bcryptjs';
import format from "pg-format";

export const createUserModel = async (email, password, rol, lenguage) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = format(
        'INSERT INTO usuarios (email, password, rol, lenguage) VALUES (%L, %L, %L, %L) RETURNING *',
        email, hashedPassword, rol, lenguage
    );
    const response = await pool.query(sql);
    return response.rows[0];
}

export const findUserByEmailModel = async (email) => {
    const sql = format('SELECT * FROM usuarios WHERE email = %L', email);
    const response = await pool.query(sql);
    return response.rows[0] || null;
};

export const authenticateUserModel = async (user, password) => {
    if (!user) return false;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
};

export const getUsersModel = async () => {
    console.log('llega la modelo')
    const sql = format('SELECT * FROM usuarios;');
    const response = await pool.query(sql);
    return response.rows;
}   

export const getUserByIdModel = async (id) => {
    const sql = format('SELECT * FROM usuarios WHERE id = %L', id);
    const response = await pool.query(sql);
    return response.rows[0];
}