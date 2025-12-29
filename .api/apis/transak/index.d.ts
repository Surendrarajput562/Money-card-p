import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * Get all the orders for the partner
     *
     * @summary Get Orders
     * @throws FetchError<400, types.GetOrdersResponse400> 400
     * @throws FetchError<401, types.GetOrdersResponse401> 401
     */
    getOrders(metadata: types.GetOrdersMetadataParam): Promise<FetchResponse<200, types.GetOrdersResponse200>>;
    /**
     * Get the order details using the Order Id
     *
     * @summary Get Order By ID
     * @throws FetchError<400, types.GetOrderByOrderIdResponse400> 400
     * @throws FetchError<401, types.GetOrderByOrderIdResponse401> 401
     */
    getOrderByOrderId(metadata: types.GetOrderByOrderIdMetadataParam): Promise<FetchResponse<200, types.GetOrderByOrderIdResponse200>>;
    /**
     * Get the past webhook trigger responses
     *
     * @summary Get Webhooks
     * @throws FetchError<401, types.GetWebhooksResponse401> 401
     */
    getWebhooks(metadata: types.GetWebhooksMetadataParam): Promise<FetchResponse<200, types.GetWebhooksResponse200>>;
    /**
     * Test your webhook integration
     *
     * @summary Test Webhook
     * @throws FetchError<401, types.TestWebhookResponse401> 401
     */
    testWebhook(metadata: types.TestWebhookMetadataParam): Promise<FetchResponse<200, types.TestWebhookResponse200>>;
    /**
     * Update your webhook URL
     *
     * @summary Update Webhook
     * @throws FetchError<400, types.UpdateWebhookResponse400> 400
     * @throws FetchError<401, types.UpdateWebhookResponse401> 401
     */
    updateWebhook(body: types.UpdateWebhookBodyParam, metadata: types.UpdateWebhookMetadataParam): Promise<FetchResponse<200, types.UpdateWebhookResponse200>>;
    /**
     * Get user data by partnerCustomerId
     *
     * @summary Get User Data
     * @throws FetchError<400, types.GetUserDataResponse400> 400
     * @throws FetchError<401, types.GetUserDataResponse401> 401
     */
    getUserData(metadata: types.GetUserDataMetadataParam): Promise<FetchResponse<200, types.GetUserDataResponse200>>;
    /**
     * Refresh Access Token using api secret
     *
     * @summary Refresh Access Token
     * @throws FetchError<400, types.RefreshAccessTokenResponse400> 400
     * @throws FetchError<401, types.RefreshAccessTokenResponse401> 401
     */
    refreshAccessToken(body: types.RefreshAccessTokenBodyParam, metadata: types.RefreshAccessTokenMetadataParam): Promise<FetchResponse<200, types.RefreshAccessTokenResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
