"use client"
import { type FC } from "react"
import { Group } from "@/connectors/hypergraph"
import Link from "next/link";
import { useParams } from "next/navigation";

const GroupCard: FC<{group: Group}> = ({group}) => {
    const { appId } = useParams();

    return <div className="card">
        <div className="card-header">
            <p className="card-header-title">
                {group.name}
            </p>
        </div>
        <div className="card-content">
            Self-enrollment available.
            Minimum age: {group.minAge}
        </div>
        <footer className="card-footer">
            <Link className="card-footer-item" href={`/apps/${appId}/groups/${group.id}/enroll`}>Enroll</Link>
        </footer>
    </div>
}

export default GroupCard;