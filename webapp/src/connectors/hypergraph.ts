import { useState } from "react"

export interface App {
    name: string
    id: string
    myPermissions: string[]
}

export interface Permission {
    name: string
    id: string
}

export interface Group {
    name: string,
    id: string
}

export function useApps(): App[] | null {
    return useState([{
        name: "My App",
        id: "1234",
        myPermissions: ["owner"]
    }, {
        name: "Other App",
        id: "abc",
        myPermissions: []
    }])[0]
}

export function useMyApps(): App[] | null {
    return useState([{
        name: "My App",
        id: "1234",
        myPermissions: ["owner"]
    }])[0]
}

export function useApp(): App | null {
    return useState({
        name: "My App",
        id: "1234",
        myPermissions: ["owner"]
    })[0]
}

export function usePermissions(appName: string): Permission[] {
    return useState([{
        name: `A Permission for ${appName}`,
        id: "A"
    }])[0]
}

export function useGroups(appName: string): Permission[] {
    return useState([{
        name: `Users of ${appName}`,
        id: "Users"
    }])[0]
}
