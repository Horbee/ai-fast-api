/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface CardResponse
 */
export interface CardResponse {
    /**
     * 
     * @type {Array<ProbabilityResponse>}
     * @memberof CardResponse
     */
    'probabilities': Array<ProbabilityResponse>;
}
/**
 * 
 * @export
 * @interface CommentInputData
 */
export interface CommentInputData {
    /**
     * 
     * @type {string}
     * @memberof CommentInputData
     */
    'comment': string;
}
/**
 * 
 * @export
 * @interface CommentPutData
 */
export interface CommentPutData {
    /**
     * 
     * @type {boolean}
     * @memberof CommentPutData
     */
    'is_correct': boolean;
}
/**
 * 
 * @export
 * @interface CommentResponse
 */
export interface CommentResponse {
    /**
     * 
     * @type {number}
     * @memberof CommentResponse
     */
    'toxic_prob': number;
    /**
     * 
     * @type {boolean}
     * @memberof CommentResponse
     */
    'is_toxic': boolean;
    /**
     * 
     * @type {number}
     * @memberof CommentResponse
     */
    'id': number;
    /**
     * 
     * @type {number}
     * @memberof CommentResponse
     */
    'perspective_score'?: number | null;
}
/**
 * 
 * @export
 * @interface HTTPValidationError
 */
export interface HTTPValidationError {
    /**
     * 
     * @type {Array<ValidationError>}
     * @memberof HTTPValidationError
     */
    'detail'?: Array<ValidationError>;
}
/**
 * 
 * @export
 * @interface ProbabilityResponse
 */
export interface ProbabilityResponse {
    /**
     * 
     * @type {string}
     * @memberof ProbabilityResponse
     */
    'name': string;
    /**
     * 
     * @type {number}
     * @memberof ProbabilityResponse
     */
    'probability': number;
}
/**
 * 
 * @export
 * @interface RainInputData
 */
export interface RainInputData {
    /**
     * 
     * @type {number}
     * @memberof RainInputData
     */
    'temp': number;
    /**
     * 
     * @type {number}
     * @memberof RainInputData
     */
    'humidity': number;
    /**
     * 
     * @type {number}
     * @memberof RainInputData
     */
    'pressure': number;
}
/**
 * 
 * @export
 * @interface RainResponse
 */
export interface RainResponse {
    /**
     * 
     * @type {number}
     * @memberof RainResponse
     */
    'probability': number;
}
/**
 * 
 * @export
 * @interface TitanicInputData
 */
export interface TitanicInputData {
    /**
     * 
     * @type {number}
     * @memberof TitanicInputData
     */
    'pclass': number;
    /**
     * 
     * @type {number}
     * @memberof TitanicInputData
     */
    'sex': number;
    /**
     * 
     * @type {number}
     * @memberof TitanicInputData
     */
    'age': number;
    /**
     * 
     * @type {number}
     * @memberof TitanicInputData
     */
    'family_size': number;
}
/**
 * 
 * @export
 * @interface TitanicResponse
 */
export interface TitanicResponse {
    /**
     * 
     * @type {number}
     * @memberof TitanicResponse
     */
    'probability': number;
}
/**
 * 
 * @export
 * @interface TweetInputData
 */
export interface TweetInputData {
    /**
     * 
     * @type {string}
     * @memberof TweetInputData
     */
    'tweet': string;
}
/**
 * 
 * @export
 * @interface TweetResponse
 */
export interface TweetResponse {
    /**
     * 
     * @type {number}
     * @memberof TweetResponse
     */
    'disaster_prob': number;
    /**
     * 
     * @type {boolean}
     * @memberof TweetResponse
     */
    'is_disaster': boolean;
}
/**
 * 
 * @export
 * @interface ValidationError
 */
export interface ValidationError {
    /**
     * 
     * @type {Array<ValidationErrorLocInner>}
     * @memberof ValidationError
     */
    'loc': Array<ValidationErrorLocInner>;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    'msg': string;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    'type': string;
}
/**
 * 
 * @export
 * @interface ValidationErrorLocInner
 */
export interface ValidationErrorLocInner {
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Card
         * @param {File} image 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cardApiCardPost: async (image: File, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'image' is not null or undefined
            assertParamExists('cardApiCardPost', 'image', image)
            const localVarPath = `/api/card`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();


            if (image !== undefined) { 
                localVarFormParams.append('image', image as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Comment
         * @param {CommentApiCommentVersionPostVersionEnum} version 
         * @param {CommentInputData} commentInputData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        commentApiCommentVersionPost: async (version: CommentApiCommentVersionPostVersionEnum, commentInputData: CommentInputData, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'version' is not null or undefined
            assertParamExists('commentApiCommentVersionPost', 'version', version)
            // verify required parameter 'commentInputData' is not null or undefined
            assertParamExists('commentApiCommentVersionPost', 'commentInputData', commentInputData)
            const localVarPath = `/api/comment/{version}`
                .replace(`{${"version"}}`, encodeURIComponent(String(version)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(commentInputData, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Health Check
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        healthCheckApiHealthGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/health`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Rain
         * @param {RainInputData} rainInputData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        rainApiRainPost: async (rainInputData: RainInputData, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'rainInputData' is not null or undefined
            assertParamExists('rainApiRainPost', 'rainInputData', rainInputData)
            const localVarPath = `/api/rain`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(rainInputData, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Titanic
         * @param {TitanicInputData} titanicInputData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        titanicApiTitanicPost: async (titanicInputData: TitanicInputData, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'titanicInputData' is not null or undefined
            assertParamExists('titanicApiTitanicPost', 'titanicInputData', titanicInputData)
            const localVarPath = `/api/titanic`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(titanicInputData, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Tweet
         * @param {TweetInputData} tweetInputData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tweetApiTweetPost: async (tweetInputData: TweetInputData, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tweetInputData' is not null or undefined
            assertParamExists('tweetApiTweetPost', 'tweetInputData', tweetInputData)
            const localVarPath = `/api/tweet`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(tweetInputData, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update Comment
         * @param {number} id 
         * @param {CommentPutData} commentPutData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCommentApiCommentIdPut: async (id: number, commentPutData: CommentPutData, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateCommentApiCommentIdPut', 'id', id)
            // verify required parameter 'commentPutData' is not null or undefined
            assertParamExists('updateCommentApiCommentIdPut', 'commentPutData', commentPutData)
            const localVarPath = `/api/comment/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(commentPutData, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Card
         * @param {File} image 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async cardApiCardPost(image: File, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CardResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.cardApiCardPost(image, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Comment
         * @param {CommentApiCommentVersionPostVersionEnum} version 
         * @param {CommentInputData} commentInputData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async commentApiCommentVersionPost(version: CommentApiCommentVersionPostVersionEnum, commentInputData: CommentInputData, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CommentResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.commentApiCommentVersionPost(version, commentInputData, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Health Check
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async healthCheckApiHealthGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<{ [key: string]: string; }>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.healthCheckApiHealthGet(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Rain
         * @param {RainInputData} rainInputData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async rainApiRainPost(rainInputData: RainInputData, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RainResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.rainApiRainPost(rainInputData, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Titanic
         * @param {TitanicInputData} titanicInputData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async titanicApiTitanicPost(titanicInputData: TitanicInputData, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TitanicResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.titanicApiTitanicPost(titanicInputData, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Tweet
         * @param {TweetInputData} tweetInputData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async tweetApiTweetPost(tweetInputData: TweetInputData, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TweetResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.tweetApiTweetPost(tweetInputData, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update Comment
         * @param {number} id 
         * @param {CommentPutData} commentPutData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateCommentApiCommentIdPut(id: number, commentPutData: CommentPutData, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateCommentApiCommentIdPut(id, commentPutData, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @summary Card
         * @param {File} image 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cardApiCardPost(image: File, options?: any): AxiosPromise<CardResponse> {
            return localVarFp.cardApiCardPost(image, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Comment
         * @param {CommentApiCommentVersionPostVersionEnum} version 
         * @param {CommentInputData} commentInputData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        commentApiCommentVersionPost(version: CommentApiCommentVersionPostVersionEnum, commentInputData: CommentInputData, options?: any): AxiosPromise<CommentResponse> {
            return localVarFp.commentApiCommentVersionPost(version, commentInputData, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Health Check
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        healthCheckApiHealthGet(options?: any): AxiosPromise<{ [key: string]: string; }> {
            return localVarFp.healthCheckApiHealthGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Rain
         * @param {RainInputData} rainInputData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        rainApiRainPost(rainInputData: RainInputData, options?: any): AxiosPromise<RainResponse> {
            return localVarFp.rainApiRainPost(rainInputData, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Titanic
         * @param {TitanicInputData} titanicInputData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        titanicApiTitanicPost(titanicInputData: TitanicInputData, options?: any): AxiosPromise<TitanicResponse> {
            return localVarFp.titanicApiTitanicPost(titanicInputData, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Tweet
         * @param {TweetInputData} tweetInputData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tweetApiTweetPost(tweetInputData: TweetInputData, options?: any): AxiosPromise<TweetResponse> {
            return localVarFp.tweetApiTweetPost(tweetInputData, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update Comment
         * @param {number} id 
         * @param {CommentPutData} commentPutData 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCommentApiCommentIdPut(id: number, commentPutData: CommentPutData, options?: any): AxiosPromise<void> {
            return localVarFp.updateCommentApiCommentIdPut(id, commentPutData, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @summary Card
     * @param {File} image 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public cardApiCardPost(image: File, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).cardApiCardPost(image, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Comment
     * @param {CommentApiCommentVersionPostVersionEnum} version 
     * @param {CommentInputData} commentInputData 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public commentApiCommentVersionPost(version: CommentApiCommentVersionPostVersionEnum, commentInputData: CommentInputData, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).commentApiCommentVersionPost(version, commentInputData, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Health Check
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public healthCheckApiHealthGet(options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).healthCheckApiHealthGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Rain
     * @param {RainInputData} rainInputData 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public rainApiRainPost(rainInputData: RainInputData, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).rainApiRainPost(rainInputData, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Titanic
     * @param {TitanicInputData} titanicInputData 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public titanicApiTitanicPost(titanicInputData: TitanicInputData, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).titanicApiTitanicPost(titanicInputData, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Tweet
     * @param {TweetInputData} tweetInputData 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public tweetApiTweetPost(tweetInputData: TweetInputData, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).tweetApiTweetPost(tweetInputData, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update Comment
     * @param {number} id 
     * @param {CommentPutData} commentPutData 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public updateCommentApiCommentIdPut(id: number, commentPutData: CommentPutData, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).updateCommentApiCommentIdPut(id, commentPutData, options).then((request) => request(this.axios, this.basePath));
    }
}

/**
 * @export
 */
export const CommentApiCommentVersionPostVersionEnum = {
    V1: 'v1',
    V2: 'v2',
    V3: 'v3',
    V4: 'v4'
} as const;
export type CommentApiCommentVersionPostVersionEnum = typeof CommentApiCommentVersionPostVersionEnum[keyof typeof CommentApiCommentVersionPostVersionEnum];


