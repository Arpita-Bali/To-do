module.exports = (sequelize, Sequelize) => {
    const Tasks = sequelize.define("Tasks", {
        Heading: {
            type: Sequelize.STRING
        },
        Body: {
            type: Sequelize.STRING
        },
        StartDate: {
            type: Sequelize.DATE
        },
        EndDate: {
            type: Sequelize.DATE
        },
        IsActive: {
            type: Sequelize.BOOLEAN,
            default: 1
        }
    });

    return Tasks;
};