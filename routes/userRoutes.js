const express = require('express');
const {
    logout,
    forgotPassword,
    resetPassword,
    profile,
    updateProfile,
    deleteProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/logout', logout);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/profile', authMiddleware, profile); // Obtener perfil del usuario (requiere autenticación)
router.put('/profile', authMiddleware, updateProfile); // Actualizar perfil del usuario (requiere autenticación)

router.delete('/profile', authMiddleware, deleteProfile); // Eliminar perfil del usuario (requiere autenticación)


module.exports = router;
