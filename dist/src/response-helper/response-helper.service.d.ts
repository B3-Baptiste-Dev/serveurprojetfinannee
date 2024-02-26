export declare class ResponseHelperService {
    returnError(message: string): {
        error: boolean;
        message: string;
    };
    returnSuccess(data: Record<string, any>): {
        success: boolean;
        data: Record<string, any>;
    };
}
