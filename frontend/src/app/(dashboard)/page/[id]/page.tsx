'use server'
import MainForm from "@/components/Main";
import Sidebar from "@/components/Sidebar";
import { GetContentById } from "@/lib/contents";

type Params = {
  params: Promise<{id: number}>
}

  export default async function ShowPage({params}: Params) {
    const { id } = await params;
    const content = await GetContentById(Number(id));

    if(!content) {
      return <div>コンテンツが見つかりません</div>
    }

  return (
    <div className="grid w-full gap-2 md:grid-cols-[380px_minmax(0,1fr)] lg:grid-cols-[400px_minmax(0,1fr)_auto]">
      <aside className="h-screen border-r mr-6 border-[#F5F8FA]">
        <Sidebar showEditButton={false} showDeleteButton={false} />
      </aside>
      <div className="bg-[#F5F8FA] rounded-2xl mt-4">
        <MainForm content={content} showSaveButton={false} id={id} showCancelButton={false} />
      </div>
    </div>
  )
}