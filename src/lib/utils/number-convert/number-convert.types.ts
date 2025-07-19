export type NumberConvertType = (
  text: unknown,
  options?: {
    numberOnly?: boolean;
    locale?: string;
  },
) => string;
