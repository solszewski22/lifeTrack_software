const sqlite3 = require('sqlite3');

class DBAbstraction {
    constructor(fileName) {
        this.fileName = fileName;
    }

    init() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.fileName, async (err) => {
                if(err) {
                    reject(err);
                } else {
                    try {
                        await this.createTables();
                        resolve();
                    } catch(err) {
                        reject(err);
                    }
                }
            });
        });
    }

    createTables() {
        const sqlUsers = `
            CREATE TABLE IF NOT EXISTS "Users" (
                "id"	INTEGER,
                "firstName"	TEXT,
                "lastName"	TEXT,
                "email"	TEXT,
                "password"	TEXT,
                PRIMARY KEY("id")
            );`;
        const sqlGoals = `
            CREATE TABLE IF NOT EXISTS "Goals" (
                "id"	INTEGER,
                "title"	TEXT,
                "description"	TEXT,
                "status"    TEXT,
                PRIMARY KEY("id")
            );`;
        const sqlContacts = `            
            CREATE TABLE IF NOT EXISTS "Contacts" (
                "id"	INTEGER,
                "firstName"	TEXT,
                "lastName"	TEXT,
                "phoneNum"	TEXT,
                "email"	TEXT,
                PRIMARY KEY("id")
            );`;
        const sqlSteps = `            
            CREATE TABLE IF NOT EXISTS "Steps" (
                "id"	INTEGER,
                "title"	TEXT,
                "stepNum"	INTEGER,
                "status"    TEXT,
                "notes"     TEXT,
                "goal_id"	INTEGER,
                PRIMARY KEY("id"),
                FOREIGN KEY("goal_id") REFERENCES "Goals"("id")
            );`;
        // const sqlFiles = `            
        //     CREATE TABLE IF NOT EXISTS "Files" (
        //         "id"	INTEGER,
        //         "title"	TEXT,
        //         "file"	BLOB,
        //         PRIMARY KEY("id")
        //     );`;
        // const sqlNotes = `            
        //     CREATE TABLE IF NOT EXISTS "Notes" (
        //         "id"	INTEGER,
        //         "description"	TEXT,
        //         "step_id"	INTEGER,
        //         PRIMARY KEY("id"),
        //         FOREIGN KEY("step_id") REFERENCES "Steps"("id")
        //     );`;
        // const sqlDetails = `            
        //     CREATE TABLE IF NOT EXISTS"Details" (
        //         "id"	INTEGER,
        //         "title"	TEXT,
        //         "description"	TEXT,
        //         "goal_id"	INTEGER,
        //         FOREIGN KEY("goal_id") REFERENCES "Goals"("id"),
        //         PRIMARY KEY("id")
        //     );`;
        // const sqlAttributes = `
        //     CREATE TABLE IF NOT EXISTS "Attributes" (
        //         "id"    INTEGER,
        //         "title" TEXT,
        //         "description"   TEXT,
        //         "step_id"   INTEGER,
        //         FOREIGN KEY("step_id") REFERENCES "Steps"("id"),
        //         PRIMARY KEY("id")
        //     );`;
        // const sqlCategories = `
        //     CREATE TABLE IF NOT EXISTS "Categories" (
        //         "id"    INTEGER,
        //         "name"  TEXT,
        //         PRIMARY KEY("id")
        //     );`;
        const sqlSharedGoals = `
            CREATE TABLE IF NOT EXISTS "SharedGoals" (
                "user_id"   INTEGER,
                "goal_id"   INTEGER,
                FOREIGN KEY("user_id") REFERENCES "Users"("id"),
                FOREIGN KEY("goal_id") REFERENCES "Goals"("id"),
                PRIMARY KEY("goal_id","user_id")
            );`;
        const sqlGoalContact = `            
            CREATE TABLE IF NOT EXISTS "GoalContact" (
                "goal_id"	INTEGER,
                "contact_id"	INTEGER,
                FOREIGN KEY("contact_id") REFERENCES "Contacts"("id"),
                FOREIGN KEY("goal_id") REFERENCES "Goals"("id"),
                PRIMARY KEY("goal_id","contact_id")
            );`;
        // const sqlStepFile = `            
        //     CREATE TABLE IF NOT EXISTS "StepFile" (
        //         "step_id"	INTEGER,
        //         "file_id"	INTEGER,
        //         PRIMARY KEY("step_id","file_id"),
        //         FOREIGN KEY("step_id") REFERENCES "Steps"("id"),
        //         FOREIGN KEY("file_id") REFERENCES "Files"("id")
        //     );`;
            return new Promise((resolve, reject) => { 
                this.db.serialize(() => {   
                    try {
                        this.db.run(sqlUsers, []);
                        this.db.run(sqlGoals, []);
                        this.db.run(sqlContacts, []);
                        this.db.run(sqlSteps, []);
                        // this.db.run(sqlFiles, []);
                        // this.db.run(sqlNotes, []);
                        // this.db.run(sqlDetails, []);
                        // this.db.run(sqlAttributes, []);
                        // this.db.run(sqlCategories, []);
                        this.db.run(sqlSharedGoals, []);
                        this.db.run(sqlGoalContact, []);
                        // this.db.run(sqlStepFile, []);
                        resolve();
                    }              
                    catch(err) {
                        reject(err);
                    }
                }); 
            });
    }

    insertUser(firstName, lastName, email, password) { /*checked*/
        const sql = 'INSERT INTO Users (firstName, lastName, email, password) VALUES (?, ?, ?, ?);'
        return new Promise((resolve, reject) => {
            this.db.run(sql, [firstName, lastName, email, password], (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }

    insertGoal (title, description, status) { /*checked*/
        const sql = 'INSERT INTO Goals (title, description, status) VALUES (?, ?, ?);'
        return new Promise ((resolve, reject) => {
            this.db.run(sql, [title, description, status], function (err) {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(this.lastID);
                }
            });
        });
    }

    insertDetail (title, description, goal_id) {
        const sql = `INSERT INTO Details (title, description, goal_id) VALUES (?, ?, ?);`
        return new Promise ((resolve, reject) => {
            this.db.run(sql, [title, description, goal_id], (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }

    insertContact (firstName, lastName, phoneNum, email) {
        const sql = `INSERT INTO Contacts (firstName, lastName, phoneNum, email) VALUES (?, ?, ?, ?);`;
        return new Promise ((resolve, reject) => {
            this.db.run(sql, [firstName, lastName, phoneNum, email], function (err) {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(this.lastID);
                }
            });
        });
    }

    insertGoalContact(goalID, contactID) {
        const sql = `INSERT INTO GoalContact (goal_id, contact_id) VALUES (?, ?);`;
        return new Promise ((resolve, reject) => {
            this.db.run(sql, [goalID, contactID], (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    insertDescription (description, goalID) {
        const sql = `
            UPDATE Goals
            SET description = ?
            WHERE id = ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.run(sql, [description, goalID], (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }

    insertStep (title, stepNum, status, goal_id) {
        const sql = `INSERT INTO Steps (title, stepNum, status, goal_id) VALUES (?, ?, ?, ?);`;
        return new Promise ((resolve, reject) => {
            this.db.run(sql, [title, stepNum, status, goal_id], (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(err);
                }
            });
        });
    }

    insertAttribute (title, description, step_id) {
        const sql = `INSERT INTO Attributes (title, description, step_id) VALUES (?, ?, ?);`;
        return new Promise ((resolve, reject) => {
            this.db.run(sql, [title, description, step_id], (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }

    insertNote (description, step_id) {
        const sql = `INSERT INTO Notes (description, step_id) VALUES (?, ?);`;
        return new Promise ((resolve, reject) => {
            this.db.run(sql, [description, step_id], (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }

    insertCollaborator(user_id, goal_id) {
        const sql = `INSERT INTO SharedGoals (user_id, goal_id) VALUES (?, ?);`;
        return new Promise ((resolve, reject) => {
            this.db.run(sql, [user_id, goal_id], (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }

    insertCategory(categoryName) {
        const sql = `INSERT INTO Categories (name) VALUES (?);`;
        return new Promise ((resolve, reject) => {
            this.db.run(sql, [categoryName], (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }

    getCategoryID (categoryName) {
        const sql = `
            SELECT id
            FROM Categories
            WHERE name = ? COLLATE NOCASE;
        `;
        return new Promise ((resolve, reject) => {
            this.db.get(sql, [categoryName], (err, row) => {
                if(err)
                {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    getGoalID (goalTitle)
    {
        const sql = `
            SELECT id
            FROM Goals
            WHERE title = ? COLLATE NOCASE;
        `;
        return new Promise ((resolve, reject) => {
            this.db.get(sql, [goalTitle], (err, row) => {
                if(err)
                {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    getStepID (stepTitle) {
        const sql = `
            SELECT id
            FROM Steps
            WHERE title = ? COLLATE NOCASE
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.get(sql, [stepTitle], (err, row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }

    getUser(firstName) {
        firstName = firstName + "%";
        const sql = `
            SELECT firstName, lastName, email
            FROM Users
            WHERE firstName LIKE ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.all(sql, [firstName], (err, row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            })
        });
    }

    getUserID(email) {
        const sql = `
            SELECT id
            FROM Users
            WHERE email = ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.get(sql, [email], (err, row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }

    getAllGoals(email) { /*checked*/
        const sql = `
            SELECT Goals.id, Goals.title, Goals.description, Goals.status
            FROM Users, Goals, SharedGoals
            WHERE SharedGoals.goal_id = Goals.id
            AND SharedGoals.user_id = Users.id
            AND Users.email = ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.all(sql, [email], (err, row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }

    getActiveGoals (email) { /*checked*/
        const sql = `
            SELECT Goals.id, Goals.title, Goals.description, Goals.status
            FROM Goals, Users, SharedGoals
            WHERE SharedGoals.goal_id = Goals.id
            AND SharedGoals.user_id = Users.id
            AND Goals.status = "Active"
            AND Users.email = ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.all(sql, [email], (err, row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }

    getInactiveGoals (email) { /*checked*/
        const sql = `
            SELECT Goals.id, Goals.title, Goals.description, Goals.status
            FROM Goals, Users, SharedGoals
            WHERE SharedGoals.goal_id = Goals.id
            AND SharedGoals.user_id = Users.id
            AND Goals.status = "Inactive"
            AND Users.email = ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.all(sql, [email], (err, row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }

    getCompleteGoals (email) { /*checked*/
        const sql = `
            SELECT Goals.id, Goals.title, Goals.description
            FROM Goals, Users, SharedGoals
            WHERE SharedGoals.goal_id = Goals.id
            AND SharedGoals.user_id = Users.id
            AND Goals.status = "Complete"
            AND Users.email = ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.all(sql, [email], (err, row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }

    getSpecificGoal(goalID) { /*checked*/
        const sql = `
            SELECT Goals.title, Goals.description, Goals.status
            FROM Goals
            WHERE Goals.id = ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.get(sql, [goalID], (err, row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }

    getSteps(goalID) {
        const sql = `
            SELECT stepNum, title, status, notes
            FROM Steps
            WHERE Steps.goal_id = ?
            ORDER BY stepNum ASC
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.all(sql, [goalID], (err, row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }

    getUserGoals (userID) {
        const sql =`
            SELECT Goals.title
            FROM Users, Goals, SharedGoals
            WHERE SharedGoals.user_id = Users.id
            AND SharedGoals.goal_id = Goals.id
            GROUP BY goal_id
            HAVING COUNT(*) = 1
            AND user_id = ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.all(sql, [userID], (err,row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }

    getSharedGoals (userID) {
        const sql = `
            SELECT Goals.title
            FROM Users, Goals, SharedGoals
            WHERE SharedGoals.user_id = Users.id
            AND SharedGoals.goal_id = Goals.id
            AND Goals.id IN (
                SELECT goal_id
                FROM Users, Goals, SharedGoals
                WHERE SharedGoals.user_id = Users.id
                AND SharedGoals.goal_id = Goals.id
                GROUP BY goal_id
                HAVING COUNT(*) > 1
            )
            AND Users.id = ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.all(sql, [userID], (err, rows) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }

    getStepsAndStatus (goalTitle) {
        const sql = `
            SELECT status
            FROM Steps, Goals
            WHERE Steps.goal_id = Goals.id
            AND Goals.title = ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.all(sql, [goalTitle], (err, row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }

    getByCategory (email, category) {
        const sql = `
            SELECT Goals.title
            FROM Categories, Goals, SharedGoals, Users
            WHERE Goals.category_id = Categories.id
            AND SharedGoals.user_id = Users.id
            AND SharedGoals.goal_id = Goals.id
            AND Users.email = ?
            AND Categories.name = ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.all(sql, [email, category], (err, row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }

    getBySearchGoal (email, title) {
        title = title + "%";
        const sql = `
            SELECT Goals.title
            FROM SharedGoals, Goals, Users
            WHERE SharedGoals.goal_id = Goals.id
            AND SharedGoals.user_id = Users.id
            AND Users.email = ?
            AND Goals.title LIKE ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.all(sql, [email, title], (err, row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }

    getContact (title) {
        const sql = `
            SELECT Contacts.firstName, Contacts.lastName, Contacts.phoneNum, Contacts.email
            FROM Goals, Contacts, GoalContact
            WHERE GoalContact.goal_id = Goals.id
            AND GoalContact.contact_id = Contacts.id
            AND Goals.title = ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.all(sql, [title], (err, row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }

    getCredentials (email, password) { /*checked*/
        const sql = `
            SELECT firstName
            FROM Users
            WHERE Users.email = ?
            AND Users.password = ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.get(sql, [email, password], (err, row) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }

    resetPassword(oldPassword, newPassword) {
        const sql = `
            UPDATE Users 
            SET password = ?
            WHERE password = ?
        ;`;
        return new Promise ((resolve, reject) => {
            this.db.run(sql, [newPassword, oldPassword], (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}

module.exports = DBAbstraction;