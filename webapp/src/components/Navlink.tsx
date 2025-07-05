"use client"
import { type FC, PropsWithChildren } from "react"
import cx from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navlink: FC<PropsWithChildren<{href: string, classname?: string}>> = ({href, children, classname}) => {
    const pathname = usePathname()

    return <Link href={href} className={cx(classname ?? "", "navlink", {"is-active": pathname === href})}>
        {children}
    </Link>
}

export default Navlink;
