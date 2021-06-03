import { User } from 'models/user';


export default {
    render(user: User) {
        return {
            id: user._id,
            email: user.email,
            password: user.password
        };
    },

    renderMany(users: User[]) {
        return users.map(user => this.render(user));
    }
};