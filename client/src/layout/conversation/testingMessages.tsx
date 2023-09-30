import { faker } from "@faker-js/faker";

const formattedTime = new Date().toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export const messages = [
  {
    id: 2,
    type: "msg",
    sender: 4,
    receiver: 5,
    content: "this is first message",
    time: formattedTime,
  },
  {
    id: 2,
    type: "msg",
    sender: 5,
    receiver: 4,
    content: faker.name.bio(),
    time: formattedTime,
  },
  {
    id: 2,
    type: "msg",
    sender: 4,
    receiver: 5,
    content: faker.name.bio(),
    time: formattedTime,
  },
  {
    id: 2,
    type: "msg",
    sender: 5,
    receiver: 4,
    content: faker.name.bio(),
    time: formattedTime,
  },
  {
    id: 2,
    type: "msg",
    sender: 4,
    receiver: 5,
    content: faker.name.bio(),
    time: formattedTime,
  },
  {
    id: 2,
    type: "msg",
    sender: 5,
    receiver: 4,
    content: faker.name.bio(),
    time: formattedTime,
  },
  {
    id: 2,
    type: "msg",
    sender: 4,
    receiver: 5,
    content: faker.name.bio(),
    time: formattedTime,
  },
  {
    id: 2,
    type: "msg",
    sender: 5,
    receiver: 4,
    content: faker.name.bio(),
    time: formattedTime,
  },
  {
    id: 2,
    type: "msg",
    sender: 4,
    receiver: 5,
    content: faker.name.bio(),
    time: formattedTime,
  },
  {
    id: 2,
    type: "msg",
    sender: 5,
    receiver: 4,
    content: faker.name.bio(),
    time: formattedTime,
  },
];
