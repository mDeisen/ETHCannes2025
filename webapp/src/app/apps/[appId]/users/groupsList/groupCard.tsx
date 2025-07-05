import { type FC } from "react"
import { Group } from "@/connectors/hypergraph"

const GroupCard: FC<{group: Group}> = ({group}) =>
    <div className="card">
        <div className="card-header">
            <p className="card-header-title">
                {group.name}
            </p>
        </div>
    </div>

export default GroupCard;