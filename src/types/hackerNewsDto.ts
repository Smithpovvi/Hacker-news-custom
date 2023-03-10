export interface HackerNewsDto {
    id: number;
    deleted: boolean;
    type: string;
    by: string;
    time: number;
    dead: boolean;
    kids: number[];
    text: string;
    title: string;
    url: string
    score: number
    descendants: number
}
