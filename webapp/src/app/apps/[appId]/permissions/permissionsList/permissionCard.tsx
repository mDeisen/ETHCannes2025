import { Permission } from "@/connectors/schema";
import { type FC } from "react"

const PermissionCard: FC<{permission: Permission}> = ({permission}) =>
    <div className="card">
        <div className="card-header">
            <p className="card-header-title">
                {permission.name}
            </p>
        </div>
    </div>

export default PermissionCard;