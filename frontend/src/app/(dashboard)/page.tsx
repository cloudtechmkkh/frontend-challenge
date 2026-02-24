import MainForm from "@/components/Main";
import Sidebar from "@/components/Sidebar";

export default function MainPage() {

  return (
    <div className="grid w-full gap-2 md:grid-cols-[380px_minmax(0,1fr)] lg:grid-cols-[400px_minmax(0,1fr)_auto]">
      <aside className="h-screen border-r mr-6 border-[#F5F8FA]">
        <Sidebar showDoubleButton={false} showDeleteButton={false} />
      </aside>
      <div className="bg-[#F5F8FA] rounded-2xl mt-4">
        <MainForm showEditButton={false} />
      </div>
    </div>
  )
}
