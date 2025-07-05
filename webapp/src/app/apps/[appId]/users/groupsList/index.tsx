"use client"
import { type FC } from "react"
import GroupCard from "./groupCard";
import { Permission } from "@/connectors/schema";
import { useQuery } from "@graphprotocol/hypergraph-react";

const GroupsList: FC<{appId: string}> = ({appId}) => {
    const { data, isPending, isError } = useQuery(Permission, { mode: 'public', 
        include: { application: {} } });

    if (isPending) {
        return <div>Loading...</div>
    }
    
    if (isError) {
        return <div>Error</div>
    }

    const appPermissions = data?.filter((p) => p.application[0].domain === appId)

    const groups = appPermissions?.map((p) => p.group[0])
    return <div>{groups
        ? groups.map((g) => <GroupCard group={g} key={g.id}/>)
        : "No groups found"
    }</div>
}

export default GroupsList;