"use client"
import { type FC } from "react"
import { useGroups } from "@/connectors/hypergraph"
import GroupCard from "./groupCard";

const GroupsList: FC<{appId: string}> = ({appId}) => {
    const permissions = useGroups(appId);

    return <div>{permissions
        ? permissions.map((g) => <GroupCard group={g} key={g.id}/>)
        : "No groups found"
    }</div>
}

export default GroupsList;