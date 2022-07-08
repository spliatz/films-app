import User from '../models/user.js';
import bcrypt from 'bcrypt';

// бизнес-логика авторизации
class AuthService {
    // проверка: существует ли пользователь в базе данных?
    async isUser(email) {
        return User.findOne({ email: email });
    }
    //регистрация по user id
    async register(email, userPassword) {
        const candidate = await this.isUser(email);
        if (!!candidate) throw new Error('User already exists');
        const encryptedPassword = await bcrypt.hash(userPassword, 12);
        const user = new User({ email: email, password: encryptedPassword });
        await user.save();
        return user.id;
    }
    //логин по user id
    async login(email, password) {
        const candidate = await this.isUser(email);
        if (!candidate) throw new Error('email or password is incorrect');
        const isMatch = await bcrypt.compare(password, candidate.password);
        if (!isMatch) throw new Error('email or password is incorrect');
        return candidate.id;
    }
}

export default new AuthService();
