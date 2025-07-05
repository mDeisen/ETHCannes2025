"use client"
import { type FC } from "react"
import AppCard from "./appCard";
import { useApps } from "@/connectors/hypergraph"

const AppsList: FC = () => {
    const apps = useApps();

    return <div>{apps
        ? apps.map((app) => <AppCard app={app} key={app.id}/>)
        : "No apps found"
    }</div>
}

export default AppsList;