export type SignUpUserFormData = {
    name: string
    email: string
    password: string 
}

export type SignInUserFormData = {
    email: string
    password: string
}

export type User = {
    id: number
    name: string
    email: string
    isActive: boolean
}