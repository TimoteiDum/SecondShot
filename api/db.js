import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("task", "task", "task", {
    host: "mysql.taskproject",
    dialect: "mysql",
    port: 3306,
    logging: (msg) => console.log(msg),
    timezone: "+00:00",
});

export async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Sequelize: connection established");
    } catch (err) {
        console.error("Sequelize: cannot connect", err);
    }
}
