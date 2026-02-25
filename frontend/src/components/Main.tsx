'use client'

import { AddContentType } from "@/lib/contents"
import { CancelButton, EditButton, SaveButton } from "./Icons"
import { useActionState, useRef } from "react"

type Content = {
  id?: number;
  title: string;
  body: string;
}

const InitialState = (content?: Content): AddContentType => ({
  state: 'idle',
  content: content ?? {
    title: '',
    body: '',
  },
})

type MainFormProps = {
  content?: Content;
  showCancelButton?: boolean;
  showSaveButton?: boolean;
  showEditButton?: boolean;
  id?: number;
  action?: (prevState: AddContentType, formData: FormData) => Promise<AddContentType>;
}

export default function MainForm({content, showCancelButton = true, showSaveButton = true, showEditButton = true, id, action}: MainFormProps) {

  const [state, formAction] = useActionState(action!, InitialState(content))
  const formRef = useRef<HTMLFormElement>(null)
  const errorObject = state.state === 'error' && typeof state.error != 'string' ? state.error : undefined

  return (
    <>
      <form action={formAction} ref={formRef} className="flex items-start gap-4">
         {id !== undefined && <input type="hidden" name="id" value={id} />}

        <div className="flex flex-col items-center min-h-screen gap-4 p-8 w-full max-w-7xl">
          <input type="text" name="title" placeholder="タイトルを入力してください"
            defaultValue={state.content.title}
            className="w-full border-2 border-[#9CD5FF] h-12 rounded-lg hover:border-blue-400 font-bold text-2xl
      focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 text-start bg-white block pl-3"
            {...errorObject?.title && {
              className: "w-full border-2 border-red-500 h-12 rounded-lg hover:border-red-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 text-center bg-white block"
            }
            }
            disabled={!showSaveButton}
          />
          {errorObject?.title && <p className="text-red-500 font-bold">{errorObject.title}</p>}
          <textarea name="body" className="w-full flex-1 border-2 border-[#9CD5FF] rounded-lg hover:border-blue-400 
      focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white block p-4 mt-5"
            placeholder="内容を入力してください"
            defaultValue={state.content.body}
            {...errorObject?.body && {
              className: "w-full flex-1 border-2 border-red-500 rounded-lg hover:border-red-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 bg-white block p-4 mt-5"
            }
            }
            disabled={!showSaveButton}
          />
          {errorObject?.body && <p className="text-red-500 font-bold">{errorObject.body}</p>}
        </div>
        <div className="flex mt-8 gap-2">
          {showCancelButton && <CancelButton type="button" onClick={() => formRef.current?.reset()} />}
          {showSaveButton && <SaveButton type="submit" id={content?.id} />}
          {showEditButton && 
          <EditButton type="button" id={id} />
          }
        </div>
      </form>
    </>
  )
}
