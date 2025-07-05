"use client"
import { type FC } from "react"
import { usePermissions } from "@/connectors/hypergraph"
import PermissionCard from "./permissionCard";

const PermissionsList: FC<{appId: string}> = ({appId}) => {
    const permissions = usePermissions(appId);

    return <div>{permissions
        ? permissions.map((p) => <PermissionCard permission={p} key={p.id}/>)
        : "No permissions found"
    }</div>
}

export default PermissionsList;