import Link from "next/link";

export default function NavbarLinks() {
    return <>
        <div
            className="rounded-full text-md  transition-all  text-blue-900"
        >
            <Link href='/cho-doanh-nghiep'>
                For Business
            </Link>

        </div>
    </>
}