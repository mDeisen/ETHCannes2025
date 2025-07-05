import { type FC } from "react"
import { App } from "@/connectors/hypergraph"
import Link from "next/link";

const AppCard: FC<{app: App}> = ({app}) =>
    <div className="card">
        <div className="card-header">
            <p className="card-header-title">
                <Link href={`/apps/${app.id}`}> {app.name} </Link>
            </p>
        </div>
        <div className="card-content">
            <div>
                App description
            </div>
            {app.myPermissions.length > 0 && <div>
                My Permissions: {app.myPermissions.join("; ")}
            </div>}
        </div>
    </div>

export default AppCard;