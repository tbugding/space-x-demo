import {atom} from "recoil";
import {SpacexLaunchItem} from "./types";
import {DateRange} from "@mui/x-date-pickers-pro";
import dayjs, {Dayjs} from 'dayjs';

export const themeState = atom<'dark' | 'light'>({
    key: 'themeState',
    default: 'dark',
});

export const listState = atom<SpacexLaunchItem[]>({
    key: 'listState',
    default: [],
});

export const filterKeyWords = atom<string>({
    key: 'filterKeyWords',
    default: "",
});

export const filterType = atom<-1 | 0 | 1>({
    key: 'filterType',
    default: -1,
});

export const filterRange = atom<DateRange<Dayjs>>({
    key: 'filterRange',
    default: [
        dayjs('2008-01-01'),
        dayjs()
    ],
});

export const filterSort = atom<'desc' | 'asc'>({
    key: 'filterSort',
    default: 'desc',
});
