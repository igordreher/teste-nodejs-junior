interface User {
    email: string;
    password: string;
}

export default {
    create: (data: User) => Promise.resolve(data)
};