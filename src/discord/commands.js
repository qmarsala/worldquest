const TEST_COMMAND = {
    name: "test",
    description: "testing things out",
    options: []
};

const INFO_COMMAND = {
    name: "info",
    description: "show some basic information about your charactar",
    options: []
};

const ACT_COMMAND = {
    name: "act",
    description: "queue action for the next game tick",
    options: [{
        name: "action",
        description: "the name of the action to queue",
        type: 3
    }, {
        name: "target",
        description: "the target of the action",
        type: 3
    }]
}

const commands = [
    TEST_COMMAND,
    ACT_COMMAND
];

export {
    TEST_COMMAND,
    ACT_COMMAND,
    commands
};
