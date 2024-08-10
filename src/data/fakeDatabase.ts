import { v4 as uuidv4 } from 'uuid';

export const fakeUsers = [
    { id: uuidv4(), username: 'Alice', email: 'alice@example.com' },
    { id: uuidv4(), username: 'Bob', email: 'bob@example.com' },
    { id: uuidv4(), username: 'Charlie', email: 'charlie@example.com' },
    { id: uuidv4(), username: 'Dave', email: 'dave@example.com' },
    { id: uuidv4(), username: 'Eve', email: 'eve@example.com' },
    { id: uuidv4(), username: 'Frank', email: 'frank@example.com' },
    { id: uuidv4(), username: 'Grace', email: 'grace@example.com' },
    { id: uuidv4(), username: 'Hank', email: 'hank@example.com' },
    { id: uuidv4(), username: 'Ivy', email: 'ivy@example.com' },
    { id: uuidv4(), username: 'Jack', email: 'jack@example.com' },
];

export const fakeChats = [
    {
        id: uuidv4(),
        participants: [fakeUsers[0].id, fakeUsers[1].id],
        messages: [
            { id: uuidv4(), senderId: fakeUsers[0].id, content: 'Hey Bob, how are you?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[1].id, content: 'Hi Alice, I am good! How about you?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[0].id, content: 'I am doing great, thanks for asking.', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[1].id, content: 'What are you up to these days?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[0].id, content: 'Just working on some new projects.', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[1].id, content: 'That sounds interesting!', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[0].id, content: 'Yeah, it is! We should catch up sometime.', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[1].id, content: 'Definitely! Let’s plan something soon.', timestamp: new Date() },
        ],
    },
    {
        id: uuidv4(),
        participants: [fakeUsers[2].id, fakeUsers[3].id],
        messages: [
            { id: uuidv4(), senderId: fakeUsers[2].id, content: 'Charlie, are you coming to the meeting today?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[3].id, content: 'Yes, I will be there in 10 minutes.', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[2].id, content: 'Great! See you soon.', timestamp: new Date() },
        ],
    },
    {
        id: uuidv4(),
        participants: [fakeUsers[4].id, fakeUsers[5].id],
        messages: [
            { id: uuidv4(), senderId: fakeUsers[4].id, content: 'Eve, have you finished the report?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[5].id, content: 'I am almost done. Will send it over in an hour.', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[4].id, content: 'Awesome, thanks!', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[5].id, content: 'No problem at all.', timestamp: new Date() },
        ],
    },
    {
        id: uuidv4(),
        participants: [fakeUsers[6].id, fakeUsers[7].id],
        messages: [
            { id: uuidv4(), senderId: fakeUsers[6].id, content: 'Grace, do you have a moment to discuss the project?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[7].id, content: 'Sure Hank, what’s up?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[6].id, content: 'Just wanted to go over the timeline with you.', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[7].id, content: 'Okay, let’s do it.', timestamp: new Date() },
        ],
    },
    {
        id: uuidv4(),
        participants: [fakeUsers[8].id, fakeUsers[9].id],
        messages: [
            { id: uuidv4(), senderId: fakeUsers[8].id, content: 'Ivy, are you free for a quick chat?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[9].id, content: 'Yes, Jack. What do you want to talk about?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[8].id, content: 'Just some updates on the new feature.', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[9].id, content: 'Alright, let’s discuss it.', timestamp: new Date() },
        ],
    },
    {
        id: uuidv4(),
        participants: [fakeUsers[0].id, fakeUsers[2].id],
        messages: [
            { id: uuidv4(), senderId: fakeUsers[0].id, content: 'Charlie, did you see the latest update?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[2].id, content: 'Yes Alice, it looks great!', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[0].id, content: 'I thought so too!', timestamp: new Date() },
        ],
    },
    {
        id: uuidv4(),
        participants: [fakeUsers[3].id, fakeUsers[6].id],
        messages: [
            { id: uuidv4(), senderId: fakeUsers[3].id, content: 'Grace, have you completed the design?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[6].id, content: 'Yes, it’s ready for review.', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[3].id, content: 'Great, I’ll take a look.', timestamp: new Date() },
        ],
    },
    {
        id: uuidv4(),
        participants: [fakeUsers[4].id, fakeUsers[7].id],
        messages: [
            { id: uuidv4(), senderId: fakeUsers[4].id, content: 'Hank, any updates on the deployment?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[7].id, content: 'Yes, it’s scheduled for tomorrow.', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[4].id, content: 'Perfect, thanks for the heads up.', timestamp: new Date() },
        ],
    },
    {
        id: uuidv4(),
        participants: [fakeUsers[5].id, fakeUsers[9].id],
        messages: [
            { id: uuidv4(), senderId: fakeUsers[5].id, content: 'Jack, how is the new system performing?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[9].id, content: 'It’s running smoothly so far.', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[5].id, content: 'Good to hear!', timestamp: new Date() },
        ],
    },
    {
        id: uuidv4(),
        participants: [fakeUsers[8].id, fakeUsers[1].id],
        messages: [
            { id: uuidv4(), senderId: fakeUsers[8].id, content: 'Bob, any plans for the weekend?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[1].id, content: 'Not yet, do you have any suggestions?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[8].id, content: 'How about a hiking trip?', timestamp: new Date() },
            { id: uuidv4(), senderId: fakeUsers[1].id, content: 'Sounds good! Let’s do it.', timestamp: new Date() },
        ],
    },
];
