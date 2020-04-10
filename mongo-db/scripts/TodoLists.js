db.todoList.insertMany([
    { userId: "58060233-0f2c-459b-89d9-ae4ebd9d41c9", title: "Shopping List", todos: [
        { _id: new ObjectId(), title: "Beer", done: false, description: "" },
        { _id: new ObjectId(), title: "Burgers", done: false, description: "" },
        { _id: new ObjectId(), title: "Water", done: true, description: "" },
    ]},
    { userId: "b057668f-4b39-4069-92b0-bbfe13f7de63", title: "Homework", todos: [
        { _id: new ObjectId(), title: "Math", done: false, description: "" },
        { _id: new ObjectId(), title: "Bio", done: true, description: "" },
        { _id: new ObjectId(), title: "History", done: false, description: "" },
    ]},
    { userId: "58060233-0f2c-459b-89d9-ae4ebd9d41c9", title: "Best Chocolate Chip Cookies", todos: [
        { _id: new ObjectId(), title: "1 cup butter, softened", done: false, description: "" },
        { _id: new ObjectId(), title: "1 cup white sugar", done: false, description: "" },
        { _id: new ObjectId(), title: "2 eggs", done: false, description: "" },
        { _id: new ObjectId(), title: "2 teaspoons vanilla extract", done: false, description: "" },
        { _id: new ObjectId(), title: "1 teaspoon baking soda", done: false, description: "" },
        { _id: new ObjectId(), title: "2 teaspoons hot water", done: false, description: "" },
        { _id: new ObjectId(), title: "1 cup chopped walnuts", done: false, description: "" },
    ]}
 ]);
