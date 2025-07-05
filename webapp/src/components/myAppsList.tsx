"use client"
import { type FC } from "react"
import AppCard from "./appCard";
import { useHypergraphAuth, useQuery } from "@graphprotocol/hypergraph-react";
import { Application } from "@/connectors/schema";

const MyAppsList: FC = () => {
    const { identity, authenticated } = useHypergraphAuth()
    const { data: apps, isPending, isError } = useQuery(Application, { mode: 'public' });
    if (!authenticated || !identity) {
        return <div>Please authenticate to see your apps...</div>
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error</div>
    }

    return (
        <div>
            {apps && apps.length > 0 
                ? apps.map((app) => <AppCard app={app} key={app.id}/>)
                : "No apps found"
            }
        </div>
    )
}

export default MyAppsList;