"use server"
export async function addUserToGroup(userId: string, appId: string, groupId: string) {
    /* Use Hypergraph Graphql API to add user to the group */
    console.log("Adding user to group", userId, appId, groupId)
}
