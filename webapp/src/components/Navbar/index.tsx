"use client"
import { useState, type FC, useEffect } from "react"
import cx from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar: FC = () => {
    const pathname = usePathname()
    const [ menuDisplayed, setMenuDisplayed ] = useState(false);
    const toggleMenu = () => {
        setMenuDisplayed(!menuDisplayed)
    };
    useEffect(() => {
        // Close menu when pathname changes
        setMenuDisplayed(false)
    }, [ pathname ])

    return <nav className="navbar is-light">
        <div className="navbar-brand">
            <Link href="/" className="has-text-weight-bold navbar-item is-size-4 has-text-primary">
                I&#39;m Graph
            </Link>
            <a 
                role="button"
                className={cx("navbar-burger", {"is-active": menuDisplayed})}
                onClick={toggleMenu}
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div className={cx("navbar-menu", {"is-active": menuDisplayed})}>
            <div className="navbar-start">
                {/* Navlinks could go here */}
            </div>
            <div className="navbar-end">
                {/* Navlinks could go here */}
            </div>
        </div>
    </nav>
}

export default Navbar