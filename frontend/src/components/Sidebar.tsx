import { GetContent } from "@/lib/contents";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import { EditButton } from "./Icons";

type ContentType = {
  id: number;
  title: string;
}

type SidebarProps = {
  showDoubleButton?: boolean
  showEditButton?: boolean;
  showDeleteButton?: boolean;
}

      export default async function Sidebar({ showDoubleButton = true, showEditButton = true, showDeleteButton = true }: SidebarProps) {

   const contents = await GetContent();

  return (
    <div className="flex flex-col h-screen">
    <div className="mt-4 text-3xl flex items-center gap-1 font-bold ml-10">
      <Image src="/img/icon/logo.svg" alt="Logo" width={32} height={32} className="mt-1" />
      ServiceName
    </div>
    <div className="mt-8">
      {contents.map((content: ContentType) => {
        return <SidebarItem key={content.id} id={content.id} title={content.title} showDeleteButton={showDeleteButton} />
      })}
      </div>
    { showDoubleButton &&
    <div className="mt-auto flex justify-between bg-[#F5F8FA] p-4">
        <button className="border-2 border-blue-400 rounded-md w-[120px] ml-10">
          <Tooltip title="新規作成">
            <Link href="/" className="flex flex-col justify-center items-center">
            <Image src={'/img/icon/+.svg'} alt="Add" width={32} height={32} />
            <span className="text-blue-400 text-sm">New page</span>
            </Link>
          </Tooltip>
        </button>
         <button className="bg-blue-400 rounded-md w-[120px] mr-3">
          <Tooltip title="完了">
            <Link href="/" className="flex flex-col justify-center items-center">
            <Image src={'/img/icon/done.svg'} alt="Done" width={32} height={32} />
            <span className="text-white text-sm">Done</span>
            </Link>
          </Tooltip>
        </button>
    </div>
    }
    { showEditButton &&
    <div className="mt-auto bg-[#F5F8FA] flex justify-end p-4">
      <EditButton id={contents[0]?.id} />
    </div>
    }
    </div>
  )
}
