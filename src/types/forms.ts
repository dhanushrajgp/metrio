
export interface Form {
    id: number;
    name: string;
    tags:FormTags[]
}

export interface FormTags {
    name: string;
    choices: string[];
}