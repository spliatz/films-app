import AuthService from '../services/AuthService.js';

class AuthController {
    async register(req, res) {
        if (!req.body) return res.status(400).json({ error: 'Заполните все поля!' });
        const { email, password } = req.body;
        try {
            const result = await AuthService.register(email, password);
            res.json({ token: result });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err.toString());
        }
    }

    async login(req, res) {
        console.log(req.body);
        if (!req.body) return res.status(400).json({ error: 'Заполните все поля!' });
        const { email, password } = req.body;
        try {
            const result = await AuthService.login(email, password);
            res.json({ token: result });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err.toString());
        }
    }
}

export default new AuthController();
