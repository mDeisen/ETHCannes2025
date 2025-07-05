"use client"
import { type FC } from "react"
import { useGroups } from "@/connectors/hypergraph"
import GroupCard from "./groupCard";

const GroupsList: FC<{appId: string}> = ({appId}) => {
    const groups = useGroups(appId);

    return <div>{groups
        ? groups.map((g) => <GroupCard group={g} key={g.id}/>)
        : "No groups found"
    }</div>
}

export default GroupsList;