import { type FC } from "react"
import { Permission } from "@/connectors/hypergraph"

const PermissionCard: FC<{permission: Permission}> = ({permission}) =>
    <div className="card">
        <div className="card-header">
            <p className="card-header-title">
                {permission.name}
            </p>
        </div>
    </div>

export default PermissionCard;