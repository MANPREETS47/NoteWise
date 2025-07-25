import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    // res.cookie('jwt', token, {
    //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    //     sameSite: 'strict', // Prevent CSRF attacks
    // })
}