import * as z from "zod";

export const ContentSchema = z.object({
    title: z.string()
    .min(1, { message: "タイトルは必須です" })
    .max(50, { message: "タイトルは50文字以内で入力してください" }),
    body: z.string()
    .min(1, { message: "詳細は必須です" })
    .min(10, { message: "詳細は10文字以上で入力してください" })
    .max(2000, { message: "詳細は2000文字以内で入力してください" }),
})