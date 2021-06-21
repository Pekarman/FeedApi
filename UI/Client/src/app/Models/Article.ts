export class Article{
    Title: string;
    Author: string;
    Source: string;
    Link: string;
    ImageLink: string;
    Content: string;
    PublishDate: string;

    constructor(_title: string, _author: string){
        this.Title = _title;
        this.Author = _author;
        this.Source = _author;
        this.Link = _author;
        this.ImageLink = _author;
        this.Content = _author;
        this.PublishDate = _author;
    }
}