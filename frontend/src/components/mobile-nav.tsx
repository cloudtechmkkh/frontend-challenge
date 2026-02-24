import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Sidebar from "./Sidebar"

type MobileNavProps = {
    showDoubleButton?: boolean
    showEditButton?: boolean;
    showDeleteButton?: boolean;
}
export default function MobileNav({ showDoubleButton, showEditButton, showDeleteButton }: MobileNavProps) {
    return (
        <div className="p-4">
            <Sheet>
                <SheetTrigger asChild>
                    <button className="md:hidden bg-transparent border-none cursor-pointer">
                        <Menu className="h-6 w-6" />
                        <SheetTitle className="sr-only">メニューを開く</SheetTitle>
                    </button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <Sidebar showDoubleButton={showDoubleButton} showEditButton={showEditButton} showDeleteButton={showDeleteButton} />
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}
