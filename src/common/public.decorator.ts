import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = "public"; // 메타데이터 키 이름
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); // 데코레이터 정의
