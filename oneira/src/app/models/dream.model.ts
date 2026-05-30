export type Dream = {
    id: number,
    title : string,
    type: "normal" | "nightmare" | "lucid" | "recurring",
    date: Date,
    content: string,
}