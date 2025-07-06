"use client"
import { type FC } from "react"
import PermissionCard from "./permissionCard";
import { useQuery } from "@graphprotocol/hypergraph-react";
import { Application, Group, Permission, User } from "@/connectors/schema";

const PermissionsList: FC<{domain: string}> = ({domain}) => {
    // const { data, isPending, isError } = useQuery(Permission, {
    //     mode: 'public',
    //     include: { application: {} },
    //   });

    // if (isPending) {
    //     return <div>Loading...</div>
    // }

    // if (isError) {
    //     return <div>Error</div>
    // }

    // const permissions = data.filter((p) => p.application[0].domain === domain)

    const permissions: Permission[] = [
        {
            name: "read",
            application: [],
            group: [],
            permissionType: "read",
        },
        {
            name: "write",
            application: [],
            group: [],
            permissionType: "read",
        },
        {
            name: "delete",
            application: [],
            group: [],
            permissionType: "delete",
        },
    ]
    

    return <div>{permissions
        ? permissions.map((p) => <PermissionCard permission={p} key={p.id}/>) // TODO: add key
        : "No permissions found"
    }</div>
}

export default PermissionsList;