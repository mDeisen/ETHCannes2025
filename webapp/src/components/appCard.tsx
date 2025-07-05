import { type FC } from "react"
import { Application } from "@/connectors/schema"
import Link from "next/link";

const AppCard: FC<{app: Application}> = ({app}) =>
    <div className="card">
        <div className="card-header">
            <p className="card-header-title">
                <Link href={`/apps/${app.domain}`}> {app.name} </Link>
            </p>
        </div>
    </div>

export default AppCard;