import { ApiCallAction } from '../middleware/apiMiddleware';
import { ApiResponseAction } from '.';

export enum Admin {
    RequestNews = 'REQUEST_NEWS',
    NewsRecevied = 'NEWS_RECEIVED',
    AddNewsItem = 'ADD_NEWSITEM',
    NewsItemAdded = 'NEWSITEM_ADDED',
    RemoveNewsItem = 'REMOVE_NEWSITEM',
    NewsItemRemoved = 'NEWSITEM_REMOVED',
    UpdateNewsItem = 'UPDATE_NEWSITEM',
    NewsItemUpdated = 'NEWSITEM_UPDATED'
}

export type AdminState = {
    news: NewsItem[];
};

export interface NewsItem {
    id: number;
    datePublished: Date;
    posterId: number;
    newsText: string;
    poster: string;
}

export interface RequestNewsAction extends ApiCallAction, ApiResponseAction {
    type: typeof Admin.NewsRecevied;
}

export interface AddNewsItemAction extends ApiCallAction, ApiResponseAction {
    type: typeof Admin.NewsItemAdded;
}

export interface RemoveNewsItemAction extends ApiCallAction, ApiResponseAction {
    type: typeof Admin.NewsItemRemoved;
}

export interface UpdateNewsItemAction extends ApiCallAction, ApiResponseAction {
    type: typeof Admin.NewsItemUpdated;
}

export type AdminAction = RequestNewsAction | AddNewsItemAction | UpdateNewsItemAction;
