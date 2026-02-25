export const dynamic = "force-dynamic";

import MainForm from "@/components/Main";
import MobileNav from "@/components/mobile-nav";
import Sidebar from "@/components/Sidebar";
import { AddContent } from "@/lib/contents";

export default function MainPage() {

  return (
    <div className="grid w-full gap-2 md:grid-cols-[380px_minmax(0,1fr)] lg:grid-cols-[400px_minmax(0,1fr)_auto]">
      <aside className="h-screen border-r mr-6 border-[#F5F8FA] hidden md:block">
        <Sidebar showDoubleButton={false} showDeleteButton={false} />
      </aside>
      <div className="bg-[#F5F8FA] rounded-2xl mt-4">
        <MobileNav showDoubleButton={false} showDeleteButton={false} />
        <MainForm showEditButton={false} action={AddContent} />
      </div>
    </div>
  )
}
