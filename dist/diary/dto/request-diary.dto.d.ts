declare class UpdatableDiary {
    title: string;
    content: string;
    modes: string[];
}
declare const RequestUpdateDiaryNameDto_base: import("@nestjs/common").Type<Pick<UpdatableDiary, "title">>;
export declare class RequestUpdateDiaryNameDto extends RequestUpdateDiaryNameDto_base {
}
declare const RequestUpdateDiaryDescriptionDto_base: import("@nestjs/common").Type<Pick<UpdatableDiary, "content">>;
export declare class RequestUpdateDiaryDescriptionDto extends RequestUpdateDiaryDescriptionDto_base {
}
declare const RequestUpdateDiaryModesDto_base: import("@nestjs/common").Type<Pick<UpdatableDiary, "modes">>;
export declare class RequestUpdateDiaryModesDto extends RequestUpdateDiaryModesDto_base {
}
export {};
