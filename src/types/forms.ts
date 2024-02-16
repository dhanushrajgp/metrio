
export interface Form {
    id: number | string;
    name: string;
    tags:FormTags[]
}

export interface FormTags {
    name: string;
    choices: string[];
}