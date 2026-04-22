import { sequelize } from "./db.js";
import { Task } from "./models/task.model.js";

(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("FINISHED SUCCESS");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
