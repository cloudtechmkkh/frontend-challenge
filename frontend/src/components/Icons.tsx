"use client";

import Image from "next/image";
import Tooltip from '@mui/material/Tooltip';
import Link from "next/link";

interface IconButtonProps {
    type?: 'submit' | 'button';
    onClick?: () => void;
    disabled?: boolean;
}

export function SaveButton({ type = 'submit', onClick, disabled, id }: IconButtonProps & { id?: number }) {
    return (
        <button type={type} className="ml-2 bg-blue-400 px-2 rounded-md" onClick={onClick} disabled={disabled}>
            <Tooltip title="保存">
                <Image src="/img/icon/save.svg" alt="Save" width={32} height={32} />
            </Tooltip>
            <span className="text-white text-sm">Save</span>
        </button>
    );
}

export function EditButton({ type = 'button', onClick, id }: IconButtonProps & { id?: number }) {
    const href = id ? `/page/${id}/edit` : '#';

    return (
        <button type={type} className="w-[130px] bg-blue-400 px-2 rounded-md text-center" onClick={onClick} >
            <Link href={href} className="w-[130px] flex flex-col justify-center items-center">
            <Tooltip title="編集">
                <Image src="/img/icon/edit.svg" alt="Edit" width={32} height={32} />
            </Tooltip>
            <span className="text-white text-sm">Edit</span>
        </Link>
        </button>
    );
}

export function DeleteButton({ type = 'button', onClick }: IconButtonProps) {
    return (
        <button type={type} className="ml-2 px-2 rounded-md" onClick={onClick}>
            <Tooltip title="削除">
                <Image src="/img/icon/delete.svg" alt="Delete" width={32} height={32} />
            </Tooltip>
        </button>
    );
}

export function CancelButton({ type = 'button', onClick }: IconButtonProps) {
    return (
        <button type={type} className="ml-2 bg-gray-400 px-2 rounded-md" onClick={onClick}>
            <Tooltip title="キャンセル">
                <Image src="/img/icon/cancel.svg" alt="Cancel" width={32} height={32} />
            </Tooltip>
            <span className="text-white text-xs">Cancel</span>
        </button>
    );
}

export default function Icons() {
    return (
        <div className='mt-8'>
            <CancelButton />
            <SaveButton />
            <EditButton />
        </div>
    );
}