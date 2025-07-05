"use client"
import { type FC } from "react"
import AppCard from "./appCard";
import { useMyApps } from "@/connectors/hypergraph"

const MyAppsList: FC = () => {
    const apps = useMyApps();

    return <div>{apps
        ? apps.map((app) => <AppCard app={app} key={app.name}/>)
        : "No apps found"
    }</div>
}

export default MyAppsList;