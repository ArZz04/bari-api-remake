const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { secret, expiresIn } = require('../config/jwt');

const register = async (req, res) => {
    const { name, lastname, username, email, role, password } = req.body;
    try {
        const newUser = new User({ name, lastname, username, email, role, password});
        await newUser.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Registration failed' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, secret, { expiresIn });

        const dataUser = { id: user._id, username: user.username, role: user.role, fullName: `${user.name} ${user.lastname}` };

        res.cookie('token', token, {
            // Configuración de la cookie (opcional)
        });
        res.json({ dataUser, token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Login failed' });
    }
};

const logout = (req, res) => {
    res.clearCookie('token'); // Limpiar la cookie de token (o manejar como sea necesario)
    res.json({ message: 'Logout successful' });
};

const forgotPassword = async (req, res) => {
    // Lógica para enviar correo electrónico con enlace para restablecer contraseña
    // Implementación depende de tu sistema de correo electrónico y lógica de negocio
};

const resetPassword = async (req, res) => {
    // Lógica para restablecer la contraseña
    // Esto implica verificar el token enviado y permitir al usuario cambiar su contraseña
};

const profile = (req, res) => {
    // Obtener el perfil del usuario autenticado
    res.json(req.user); // 'req.user' debe ser seteado por el middleware de autenticación
};

const updateProfile = async (req, res) => {
    // Lógica para actualizar el perfil del usuario
    const { name, lastname } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.name = name;
        user.lastname = lastname;
        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

const deleteProfile = async (req, res) => {
    // Lógica para eliminar la cuenta del usuario
    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete profile' });
    }
};

module.exports = { register, login, logout, forgotPassword, resetPassword, profile, updateProfile, deleteProfile };
