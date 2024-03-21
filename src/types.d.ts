export type EmailBatch = {
    emails: string[]
}


export type UserData = {
    id: string;
    name: string;
    numDoc: string;
    companion: string;
    email: string;
    status: number;
}


export type Message = {
    From: string;
    To: string;
    TemplateId: string;
    Tag: string;
    TemplateModel: { [k: string]: any }
}
