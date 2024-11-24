export interface Ad {
    _id?: String;
    title: String;
    body: String;
    date: Date;
    img: {
        data: String;
        contentType: String;
    }
}
