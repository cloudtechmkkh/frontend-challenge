'use server';

import { revalidatePath } from "next/cache";
import { ContentSchema } from "./validations/contentSchema";
import { redirect } from "next/navigation";

export type AddContentType = {
    state: 'idle' | 'success' | 'error';
    error?: {
        title?: string;
        body?: string;
    } | string;
    content: {
        title: string;
        body: string;
    }
}

export async function AddContent(
    prevState: AddContentType,
    formData: FormData
): Promise<AddContentType> {
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;
    const validateData = ContentSchema.safeParse({ title, body });
    if(!validateData.success) {
        const { fieldErrors } = validateData.error.flatten();
        return {
            state: 'error',
            error: {
                title: fieldErrors.title?.[0],
                body: fieldErrors.body?.[0],
            },
            content: {
                title,
                body,
            },
        };
    }

    try {
        const res = await fetch('http://localhost:3000/content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validateData.data),
        });

        if (!res.ok) {
            throw new Error('コンテンツの作成に失敗しました');
        }

        const newContent = await res.json();

        revalidatePath('/');
        redirect(`/page/${newContent.id}`);
    } catch (error: unknown) {
        // Next.jsのリダイレクト例外は再throwする
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            throw error;
        }
        console.error('不明なエラーが発生しました:', error);
        return {
            state: 'error',
            error: error instanceof Error ? error.message : '不明なエラーが発生しました',
            content: {
                title,
                body,
            },
        };
    }
}

export async function GetContent() {
    try { 
       const res = await fetch('http://localhost:3000/content', {
            cache: 'no-store',
       });
         if (!res.ok) {
            throw new Error('コンテンツの取得に失敗しました');
        }
       return await res.json();
    } catch (error) {
        console.error('不明なエラーが発生しました:', error);
    }
}

export async function GetContentById(id: number) {
    try {
        const res = await fetch(`http://localhost:3000/content/${id}`, {
            cache: 'no-store',
        });
        if (!res.ok) {
            throw new Error('コンテンツの取得に失敗しました');
        }
        return await res.json();
    } catch (error) {
        console.error('不明なエラーが発生しました:', error);
        return null;  
    }
}

export async function DeleteContent(id: number) {
    try {
         const res = await fetch(`http://localhost:3000/content/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            throw new Error('コンテンツの削除に失敗しました');
        }

        revalidatePath('/page/remove-content')

        return null;
    } catch (error) {
        console.error('不明なエラーが発生しました:', error);
        return null;
    }
}

export async function UpdateContent(
 prevState: AddContentType,
 formData: FormData,
): Promise<AddContentType> {
  const id = formData.get('id') as unknown as number;
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;

  const validateData = ContentSchema.safeParse({ title, body });
  if(!validateData.success) {
    const  {fieldErrors} = validateData.error.flatten();
    return {
        state: 'error',
        error: {
            title: fieldErrors.title?.[0],
            body: fieldErrors.body?.[0],
        },
        content: {
            title,
            body,
        },
    };
  }

  try {
    const res = await fetch(`http://localhost:3000/content/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(validateData.data)
    });
    if (!res.ok) {
        throw new Error('コンテンツの更新に失敗しました');
    }

    const updatedContent = await res.json();

    revalidatePath('/');
    redirect(`/page/${updatedContent.id}`);
  } catch (error: unknown) {
    // Next.jsのリダイレクト例外は再throwする
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
        throw error;
    }
    console.error('不明なエラーが発生しました:', error);
    return {
        state: 'error',
        error: error instanceof Error ? error.message : '不明なエラーが発生しました',
        content: {
            title,
            body,
        },
    };
  }
}