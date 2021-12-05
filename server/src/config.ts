interface IConfig{
    Port: number,
    dbData: {
        dbUsername: string,
        dbPassword: string,
        dbLink: string
    },
    tokens: { // рандомное название для того чтобы токен было сложнее украсть
        nameTokenA: string,
        nameTokenR: string,
        secretA: string,
        secretR: string,
    }
}

export const config: IConfig = {
    Port: 5000,
    dbData: {
        dbUsername: "1111",
        dbPassword: "1111",
        dbLink: `mongodb+srv://1111:1111@cluster0.pybsa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    },
    tokens: {
        nameTokenA: "mdAHzGDxL6Ot",
        nameTokenR: "MVEjh0T1KExh",
        secretA: "VpSkTjxQYi9O",
        secretR: "Sz8r1j2pdmQ2",
    }
}