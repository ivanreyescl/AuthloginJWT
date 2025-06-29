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

export const loginUserModel = async (email, password) => {
    const sql = format('SELECT * FROM usuarios WHERE email = %L', email);
    const response = await pool.query(sql);
    const user = response.rows[0];
    if (!user) {
        return null;
    }
    return user;
}

export const getUsersModel = async () => {
    const sql = format('SELECT * FROM usuarios;');
    const response = await pool.query(sql);
    return response.rows;
}

export const getUserByEmailModel = async (email) => {
    const sql = format('SELECT * FROM usuarios WHERE email = %L', email);
    const response = await pool.query(sql);
    return response.rows[0];
}