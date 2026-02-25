'use client';

// import { DeleteContent } from "@/lib/contents";
import { DeleteButton } from "./Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItemProps = {
  id: number;
  title: string;
  showDeleteButton?: boolean;
  showEditButton?: boolean;
}

export function SidebarItem({ id, title, showDeleteButton = true, showEditButton = true }: SidebarItemProps) {

  const pathname = usePathname();

  const handleDelete = async (id: number) => {
    if (confirm('本当に削除しますか？')) {
      try {
         const res = await fetch(`http://localhost:3000/content/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            throw new Error('コンテンツの削除に失敗しました');
        }

         window.location.reload();

        return null;
    } catch (error) {
        console.error('不明なエラーが発生しました:', error);
        return null;
    }
      // await DeleteContent(id);
    }
  };

  return (
    <div className={`text-2xl my-2 flex items-center gap-3 ml-10 py-4 ${pathname === `/page/${id}` ? 'bg-[#F5F8FA] text-[#32A8F8] font-bold' : ''}`}>
      <Link
        href={`/page/${id}`}
        className="hover:text-blue-500 ml-10 flex-1 min-w-0 truncate"
        title={title}
      >
        {title}
      </Link>
      <div className="ml-auto shrink-0">
        {showDeleteButton && <DeleteButton onClick={() => handleDelete(id)} />}
      </div>
    </div>
  );
}
