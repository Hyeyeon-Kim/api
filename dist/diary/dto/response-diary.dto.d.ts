import { DiaryDocument } from "../entities/diary.schema";
export declare class ResponseDiaryDto {
    readonly id: string;
    readonly title: string;
    readonly content: string;
    readonly modes: string[];
    readonly createdAt: Date;
    constructor(data: Pick<DiaryDocument, "_id" | "title" | "content" | "modes" | "createdAt">);
}
export declare class MoodCountDto {
    readonly mood: string;
    readonly cnt: number;
    constructor(partial: {
        mood: string;
        cnt: number;
    });
}
export declare class CalendarDayDto {
    readonly year: number;
    readonly month: number;
    readonly date: string;
    readonly mood: string;
    readonly id: string;
    constructor(partial: {
        year: number;
        month: number;
        date: string;
        mood: string;
        id: string;
    });
}
export declare class SummaryDto {
    readonly moods?: MoodCountDto[];
    readonly days?: CalendarDayDto[];
    constructor(partial: Partial<{
        moods: MoodCountDto[];
        days: CalendarDayDto[];
    }>, type: "weekly" | "calendar");
}
declare const ResponseWeeklyDto_base: import("@nestjs/common").Type<Pick<SummaryDto, "moods">>;
export declare class ResponseWeeklyDto extends ResponseWeeklyDto_base {
    constructor(data: {
        mood: string;
        cnt: number;
    }[]);
}
declare const ResponseCalendarDto_base: import("@nestjs/common").Type<Pick<SummaryDto, "days">>;
export declare class ResponseCalendarDto extends ResponseCalendarDto_base {
    constructor(data: {
        year: number;
        month: number;
        date: string;
        mood: string;
        id: string;
    }[]);
}
export {};
