export type Note = {
	id: string;
	title: string;
	content?: string;
};

const SAMPLE_NOTES: Note[] = [
	{ id: "1", title: "Grocery list", content: "Milk, Eggs, Bread" },
	{ id: "2", title: "Ideas", content: "Build a note app like Keep" },
	{ id: "3", title: "Todo", content: "Workout, Read, Code" },
	{ id: "4", title: "Meeting notes", content: "Discuss roadmap" },
	{ id: "5", title: "Books to read", content: "Clean Code, The Pragmatic Programmer" },
	{ id: "6", title: "Recipes", content: "Pancakes, Pasta" },
];

export default SAMPLE_NOTES;
