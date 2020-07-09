export interface IStory
{
  id: number,
  title: string,
  url: string,
  descendants: number,
  score: number
}

export interface IComment
{
  id: number,
  text: string,
  by: string,
  kids: number[],
  parent: number
}

export interface MatchParams {
  id: string;
}