declare const GetOrderByOrderId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly orderId: {
                    readonly type: "string";
                    readonly default: "YOUR_ORDER_ID";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "User order ID";
                };
            };
            readonly required: readonly ["orderId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "access-token": {
                    readonly type: "string";
                    readonly default: "YOUR_ACCESS_TOKEN";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your Access Token, you can generate one using our [Refresh Token](ref:refresh-access-token) endpoint";
                };
            };
            readonly required: readonly ["access-token"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly meta: {
                    readonly type: "object";
                    readonly properties: {
                        readonly orderId: {
                            readonly type: "string";
                            readonly examples: readonly ["322dc79c-fad2-4df1-bf50-b292191fc953"];
                        };
                    };
                };
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly _id: {
                            readonly type: "string";
                            readonly examples: readonly ["322dc79c-fad2-4df1-bf50-b292191fc953"];
                        };
                        readonly walletAddress: {
                            readonly type: "string";
                            readonly examples: readonly ["0xD902d7eBF7bc5eCa9EEA22a6Ee9F1A30EBeBEFeE"];
                        };
                        readonly createdAt: {
                            readonly type: "string";
                            readonly examples: readonly ["2024-10-15T14:29:11.104Z"];
                        };
                        readonly status: {
                            readonly type: "string";
                            readonly examples: readonly ["COMPLETED"];
                        };
                        readonly fiatCurrency: {
                            readonly type: "string";
                            readonly examples: readonly ["EUR"];
                        };
                        readonly cryptoCurrency: {
                            readonly type: "string";
                            readonly examples: readonly ["ETH"];
                        };
                        readonly isBuyOrSell: {
                            readonly type: "string";
                            readonly examples: readonly ["BUY"];
                        };
                        readonly fiatAmount: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [45];
                        };
                        readonly ipAddress: {
                            readonly type: "string";
                            readonly examples: readonly ["35.177.158.9"];
                        };
                        readonly amountPaid: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [45];
                        };
                        readonly paymentOptionId: {
                            readonly type: "string";
                            readonly examples: readonly ["sepa_bank_transfer"];
                        };
                        readonly walletLink: {
                            readonly type: "string";
                            readonly examples: readonly ["https://sepolia.etherscan.io/address/0xD902d7eBF7bc5eCa9EEA22a6Ee9F1A30EBeBEFeE"];
                        };
                        readonly quoteId: {
                            readonly type: "string";
                            readonly examples: readonly ["20148892-f984-4e3f-8bb7-fba6c0ec9182"];
                        };
                        readonly orderProcessingType: {
                            readonly type: "string";
                            readonly examples: readonly ["NORMAL"];
                        };
                        readonly addressAdditionalData: {
                            readonly type: "boolean";
                            readonly default: true;
                            readonly examples: readonly [false];
                        };
                        readonly network: {
                            readonly type: "string";
                            readonly examples: readonly ["ethereum"];
                        };
                        readonly appVersionName: {
                            readonly type: "string";
                            readonly examples: readonly ["staging-api"];
                        };
                        readonly conversionPriceData: {
                            readonly type: "object";
                            readonly properties: {
                                readonly _id: {
                                    readonly type: "string";
                                    readonly examples: readonly ["a28c76cc-b9e3-4ba4-81fc-0eece6f28559"];
                                };
                                readonly id: {
                                    readonly type: "string";
                                    readonly examples: readonly ["a28c76cc-b9e3-4ba4-81fc-0eece6f28559"];
                                };
                                readonly createdAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-10-15T14:29:19.198Z"];
                                };
                                readonly fiatCurrency: {
                                    readonly type: "string";
                                    readonly examples: readonly ["EUR"];
                                };
                                readonly cryptoCurrency: {
                                    readonly type: "string";
                                    readonly examples: readonly ["ETH"];
                                };
                                readonly paymentMethod: {
                                    readonly type: "string";
                                    readonly examples: readonly ["sepa_bank_transfer"];
                                };
                                readonly fiatAmount: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [45];
                                };
                                readonly network: {
                                    readonly type: "string";
                                    readonly examples: readonly ["ethereum"];
                                };
                                readonly cryptoAmount: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [0.01788752];
                                };
                                readonly isBuyOrSell: {
                                    readonly type: "string";
                                    readonly examples: readonly ["BUY"];
                                };
                                readonly conversionPrice: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [0.0004122498711328036];
                                };
                                readonly marketConversionPrice: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [0.00041436312306041164];
                                };
                                readonly slippage: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [0.51];
                                };
                                readonly cryptoLiquidityProvider: {
                                    readonly type: "string";
                                    readonly examples: readonly ["transak"];
                                };
                                readonly fiatLiquidityProvider: {
                                    readonly type: "string";
                                    readonly examples: readonly ["coinbase"];
                                };
                                readonly partnerApiKey: {
                                    readonly type: "string";
                                    readonly examples: readonly ["d79671a4-b021-4a4f-a444-6862a680a94b"];
                                };
                                readonly sourceTokenAmount: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [0.017887521908452348];
                                };
                                readonly sourceToken: {
                                    readonly type: "string";
                                    readonly examples: readonly ["ETH"];
                                };
                                readonly notes: {
                                    readonly type: "array";
                                    readonly items: {};
                                };
                                readonly fiatFeeAmount: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [1.61];
                                };
                                readonly feeDecimal: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [0.03577777777777778];
                                };
                                readonly swaps: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly sourceCurrency: {
                                                readonly type: "string";
                                                readonly examples: readonly ["EUR"];
                                            };
                                            readonly destinationCurrency: {
                                                readonly type: "string";
                                                readonly examples: readonly ["USDT"];
                                            };
                                            readonly sourceAmount: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [45];
                                            };
                                            readonly destinationAmount: {
                                                readonly type: "number";
                                                readonly default: 0;
                                                readonly examples: readonly [49.10881925158181];
                                            };
                                            readonly paymentMethod: {
                                                readonly type: "string";
                                                readonly examples: readonly ["sepa_bank_transfer"];
                                            };
                                            readonly liquidityProvider: {
                                                readonly type: "string";
                                                readonly examples: readonly ["coinbase"];
                                            };
                                            readonly conversionPrice: {
                                                readonly type: "number";
                                                readonly default: 0;
                                                readonly examples: readonly [1.0913070944795957];
                                            };
                                            readonly feeInSourceAmount: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [0];
                                            };
                                            readonly networkFeeInSourceAmount: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [0];
                                            };
                                            readonly marketConversionPrice: {
                                                readonly type: "number";
                                                readonly default: 0;
                                                readonly examples: readonly [1.0913070944795957];
                                            };
                                            readonly isNonCustodial: {
                                                readonly type: "boolean";
                                                readonly default: true;
                                                readonly examples: readonly [false];
                                            };
                                            readonly isFiatliquidityProvider: {
                                                readonly type: "boolean";
                                                readonly default: true;
                                                readonly examples: readonly [true];
                                            };
                                            readonly isFiatPartnerDirectCryptoDeposit: {
                                                readonly type: "boolean";
                                                readonly default: true;
                                                readonly examples: readonly [false];
                                            };
                                            readonly isFiatPartnerAccountWalletDeposit: {
                                                readonly type: "boolean";
                                                readonly default: true;
                                                readonly examples: readonly [false];
                                            };
                                            readonly liquidityProviderData: {
                                                readonly type: "boolean";
                                                readonly default: true;
                                                readonly examples: readonly [false];
                                            };
                                            readonly originalDestinationAmount: {
                                                readonly type: "number";
                                                readonly default: 0;
                                                readonly examples: readonly [49.10881925158181];
                                            };
                                        };
                                    };
                                };
                                readonly fees: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly name: {
                                                readonly type: "string";
                                                readonly examples: readonly ["Transak fee"];
                                            };
                                            readonly value: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [1];
                                            };
                                            readonly id: {
                                                readonly type: "string";
                                                readonly examples: readonly ["transak_fee"];
                                            };
                                            readonly ids: {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["transak_fee"];
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly fiatAmountInUsd: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [49.1];
                                };
                                readonly internalFees: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly name: {
                                                readonly type: "string";
                                                readonly examples: readonly ["Network/Exchange fee"];
                                            };
                                            readonly id: {
                                                readonly type: "string";
                                                readonly examples: readonly ["network_fee"];
                                            };
                                            readonly value: {
                                                readonly type: "number";
                                                readonly default: 0;
                                                readonly examples: readonly [0.16];
                                            };
                                        };
                                    };
                                };
                                readonly cost: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly ethPriceInLocalCurrency: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [2413.3421734400004];
                                        };
                                        readonly gasCostinLocalCurrency: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.16410726779392];
                                        };
                                        readonly transakMinimumFee: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [1];
                                        };
                                        readonly transakFeeAmount: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [1];
                                        };
                                        readonly fiatLiquidityProviderFee: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [0];
                                        };
                                        readonly gasCostinLocalCurrencyByFiatPartner: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [0];
                                        };
                                        readonly gasCostinLocalCurrencyByCryptoPartner: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [0];
                                        };
                                        readonly partnerFeeDecimal: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.01];
                                        };
                                        readonly partnerFeeInLocalCurrency: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.45];
                                        };
                                        readonly totalFeeDecimal: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.03577777777777778];
                                        };
                                        readonly totalFeeAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [1.61];
                                        };
                                        readonly gasCurrency: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ETH"];
                                        };
                                        readonly gasInNativeToken: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.000068];
                                        };
                                        readonly gasCurrencyRateInUsd: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.0003798006806028196];
                                        };
                                        readonly totalAmountChargedByTransak: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [1.6141072677939199];
                                        };
                                    };
                                };
                            };
                        };
                        readonly conversionPrice: {
                            readonly type: "number";
                            readonly default: 0;
                            readonly examples: readonly [0.0004122498271491127];
                        };
                        readonly cryptoAmount: {
                            readonly type: "number";
                            readonly default: 0;
                            readonly examples: readonly [0.01788752];
                        };
                        readonly totalFeeInFiat: {
                            readonly type: "number";
                            readonly default: 0;
                            readonly examples: readonly [1.61];
                        };
                        readonly fiatAmountInUsd: {
                            readonly type: "number";
                            readonly default: 0;
                            readonly examples: readonly [49.1];
                        };
                        readonly countryCode: {
                            readonly type: "string";
                            readonly examples: readonly ["IN"];
                        };
                        readonly paymentOptions: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly currency: {
                                        readonly type: "string";
                                        readonly examples: readonly ["EUR"];
                                    };
                                    readonly id: {
                                        readonly type: "string";
                                        readonly examples: readonly ["sepa_bank_transfer"];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Bank Transfer Details"];
                                    };
                                    readonly fields: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["Account Type"];
                                                };
                                                readonly value: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["Personal"];
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly fromWalletAddress: {
                            readonly type: "string";
                            readonly examples: readonly ["0x085ee67132ec4297b85ed5d1b4c65424d36fda7d"];
                        };
                        readonly autoExpiresAt: {
                            readonly type: "string";
                            readonly examples: readonly ["2024-10-15T15:14:11+00:00"];
                        };
                        readonly stateCode: {
                            readonly type: "string";
                            readonly examples: readonly ["Karnataka"];
                        };
                        readonly orderChannelType: {
                            readonly type: "string";
                            readonly examples: readonly ["WIDGET"];
                        };
                        readonly tokenContractAddress: {
                            readonly type: "string";
                            readonly examples: readonly ["0x0000000000000000000000000000000000000000"];
                        };
                        readonly userKycType: {
                            readonly type: "string";
                            readonly examples: readonly ["STANDARD"];
                        };
                        readonly cardPaymentData: {
                            readonly type: "object";
                            readonly properties: {
                                readonly orderId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["322dc79c-fad2-4df1-bf50-b292191fc953"];
                                };
                                readonly paymentId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["670e7c387b5777f9332927b6"];
                                };
                                readonly pgData: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly liquidityProvider: {
                                            readonly type: "string";
                                            readonly examples: readonly ["OPENPAYD_MALTA"];
                                        };
                                        readonly status: {
                                            readonly type: "string";
                                            readonly examples: readonly ["CREATED"];
                                        };
                                        readonly beneficiaryName: {
                                            readonly type: "string";
                                            readonly examples: readonly ["Ashutosh Jha"];
                                        };
                                        readonly paymentOptions: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly currency: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["EUR"];
                                                    };
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["sepa_bank_transfer"];
                                                    };
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["Bank Transfer Details"];
                                                    };
                                                    readonly fields: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly name: {
                                                                    readonly type: "string";
                                                                    readonly examples: readonly ["Account Type"];
                                                                };
                                                                readonly value: {
                                                                    readonly type: "string";
                                                                    readonly examples: readonly ["Personal"];
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly liquidityProvider: {
                                    readonly type: "string";
                                    readonly examples: readonly ["OPENPAYD_MALTA"];
                                };
                                readonly updatedAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-10-15T14:29:12.243Z"];
                                };
                            };
                        };
                        readonly id: {
                            readonly type: "string";
                            readonly examples: readonly ["322dc79c-fad2-4df1-bf50-b292191fc953"];
                        };
                        readonly statusHistories: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly status: {
                                        readonly type: "string";
                                        readonly examples: readonly ["AWAITING_PAYMENT_FROM_USER"];
                                    };
                                    readonly createdAt: {
                                        readonly type: "string";
                                        readonly examples: readonly ["2024-10-15T14:29:12.863Z"];
                                    };
                                    readonly message: {
                                        readonly type: "string";
                                        readonly examples: readonly ["*📦 New order by Ashutosh Jha* \n*Order Id:* 322dc79c-fad2-4df1-bf50-b292191fc953\n*Email:* ashutosh@transak.com\n*Crypto Amount:* 0.01788752 ETH\n*Fiat Amount:* 45 EUR\n*Payment Method:*  sepa_bank_transfer\n*Liquidity Provider*  OPENPAYD_MALTA\n*Wallet Address:* 0xD902d7eBF7bc5eCa9EEA22a6Ee9F1A30EBeBEFeE\n*User Id:* 243a8ce2-9cc6-41a9-aaeb-b0deeb0b19a3 \n*Partner name:* Staging"];
                                    };
                                    readonly isEmailSentToUser: {
                                        readonly type: "boolean";
                                        readonly default: true;
                                        readonly examples: readonly [true];
                                    };
                                    readonly partnerEventId: {
                                        readonly type: "string";
                                        readonly examples: readonly ["ORDER_CREATED"];
                                    };
                                };
                            };
                        };
                        readonly isFirstOrder: {
                            readonly type: "boolean";
                            readonly default: true;
                            readonly examples: readonly [false];
                        };
                        readonly updatedAt: {
                            readonly type: "string";
                            readonly examples: readonly ["2024-10-15T14:29:19.220Z"];
                        };
                        readonly exchangeId: {
                            readonly type: "string";
                            readonly examples: readonly ["binance"];
                        };
                        readonly internalOrderStatus: {
                            readonly type: "string";
                            readonly examples: readonly ["RISK_APPROVED"];
                        };
                        readonly completedAt: {
                            readonly type: "string";
                            readonly examples: readonly ["2024-10-15T14:29:26.029Z"];
                        };
                        readonly transactionHash: {
                            readonly type: "string";
                            readonly examples: readonly ["DUMMY_TX_ID"];
                        };
                        readonly transactionLink: {
                            readonly type: "string";
                            readonly examples: readonly ["https://sepolia.etherscan.io/tx/DUMMY_TX_ID"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly statusCode: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [400];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Bad Request"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["Order not found"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly statusCode: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [401];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Unauthorized"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["Authorization Required"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOrders: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 100;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "limits the number of records returned";
                };
                readonly skip: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 0;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "skip omits the specified number of returned records";
                };
                readonly startDate: {
                    readonly type: "string";
                    readonly default: "2024-04-01";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "startDate in YYYY-MM-DD format";
                };
                readonly endDate: {
                    readonly type: "string";
                    readonly default: "2024-05-01";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "endDate in YYYY-MM-DD format";
                };
                readonly "filter[productsAvailed]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly default: readonly ["[\"BUY\"]"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "products availed i.e., BUY or SELL";
                };
                readonly "filter[status]": {
                    readonly type: "string";
                    readonly default: "COMPLETED";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "order status filter";
                };
                readonly "filter[sortOrder]": {
                    readonly type: "string";
                    readonly default: "desc";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "sort order by which you want your orders either desc or asc";
                };
                readonly "filter[walletAddress]": {
                    readonly type: "string";
                    readonly default: "0x5CCb2C2EAe7f1f4A49d66f0E2B42580028C555AF";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "filter orders based on a wallet address. Note: Returns BUY orders only";
                };
                readonly "filter[partnerOrderId]": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "filter orders based on a partnerOrderId";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "access-token": {
                    readonly type: "string";
                    readonly default: "YOUR_ACCESS_TOKEN";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your Access Token, you can generate one using our [Refresh Token](ref:refresh-access-token) endpoint";
                };
            };
            readonly required: readonly ["access-token"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly oneOf: readonly [{
                readonly title: "Buy Order";
                readonly type: "object";
                readonly properties: {
                    readonly meta: {
                        readonly type: "object";
                        readonly properties: {
                            readonly filter: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly productsAvailed: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                            readonly examples: readonly ["BUY"];
                                        };
                                    };
                                    readonly status: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                            readonly examples: readonly ["COMPLETED"];
                                        };
                                    };
                                };
                            };
                            readonly sortOrder: {
                                readonly type: "string";
                                readonly examples: readonly ["desc"];
                            };
                            readonly startDate: {
                                readonly type: "string";
                                readonly examples: readonly ["2024-04-01"];
                            };
                            readonly endDate: {
                                readonly type: "string";
                                readonly examples: readonly ["2024-05-01"];
                            };
                            readonly limit: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [100];
                            };
                            readonly skip: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [0];
                            };
                            readonly totalCount: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [12];
                            };
                        };
                    };
                    readonly data: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly _id: {
                                    readonly type: "string";
                                    readonly examples: readonly ["7d8e0655-728e-458c-9c15-b3e9f2aa66ed"];
                                };
                                readonly walletAddress: {
                                    readonly type: "string";
                                    readonly examples: readonly ["0x12d8885e0F0BFc487d93A9e3DcB5c23cB86EE9ae"];
                                };
                                readonly createdAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-04-23T14:41:14.063Z"];
                                };
                                readonly status: {
                                    readonly type: "string";
                                    readonly examples: readonly ["COMPLETED"];
                                };
                                readonly fiatCurrency: {
                                    readonly type: "string";
                                    readonly examples: readonly ["GBP"];
                                };
                                readonly userId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["aebd10cb-0f51-4152-b98d-708602cecf26"];
                                };
                                readonly cryptoCurrency: {
                                    readonly type: "string";
                                    readonly examples: readonly ["ETH"];
                                };
                                readonly isBuyOrSell: {
                                    readonly type: "string";
                                    readonly examples: readonly ["BUY"];
                                };
                                readonly fiatAmount: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [50];
                                };
                                readonly dispute: {
                                    readonly type: "boolean";
                                    readonly default: true;
                                    readonly examples: readonly [false];
                                };
                                readonly ipAddress: {
                                    readonly type: "string";
                                    readonly examples: readonly ["35.177.158.9"];
                                };
                                readonly amountPaid: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [50];
                                };
                                readonly paymentOptionId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["gbp_bank_transfer"];
                                };
                                readonly walletLink: {
                                    readonly type: "string";
                                    readonly examples: readonly ["https://sepolia.etherscan.io/address/0x12d8885e0F0BFc487d93A9e3DcB5c23cB86EE9ae"];
                                };
                                readonly quoteId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["4015367c-3636-4ea1-a4a9-f583608ad3b5"];
                                };
                                readonly orderProcessingType: {
                                    readonly type: "string";
                                    readonly examples: readonly ["NORMAL"];
                                };
                                readonly addressAdditionalData: {
                                    readonly type: "boolean";
                                    readonly default: true;
                                    readonly examples: readonly [false];
                                };
                                readonly network: {
                                    readonly type: "string";
                                    readonly examples: readonly ["ethereum"];
                                };
                                readonly appVersionName: {
                                    readonly type: "string";
                                    readonly examples: readonly ["staging-api"];
                                };
                                readonly conversionPriceDataAtCreateOrder: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly _id: {
                                            readonly type: "string";
                                            readonly examples: readonly ["1e1346bb-b0ff-47cb-95be-297557743d29"];
                                        };
                                        readonly id: {
                                            readonly type: "string";
                                            readonly examples: readonly ["1e1346bb-b0ff-47cb-95be-297557743d29"];
                                        };
                                        readonly createdAt: {
                                            readonly type: "string";
                                            readonly examples: readonly ["2024-04-23T14:41:14.002Z"];
                                        };
                                        readonly fiatCurrency: {
                                            readonly type: "string";
                                            readonly examples: readonly ["GBP"];
                                        };
                                        readonly cryptoCurrency: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ETH"];
                                        };
                                        readonly paymentMethod: {
                                            readonly type: "string";
                                            readonly examples: readonly ["gbp_bank_transfer"];
                                        };
                                        readonly fiatAmount: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [50];
                                        };
                                        readonly network: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ethereum"];
                                        };
                                        readonly cryptoAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.01596979];
                                        };
                                        readonly isBuyOrSell: {
                                            readonly type: "string";
                                            readonly examples: readonly ["BUY"];
                                        };
                                        readonly conversionPrice: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.00038032370328306114];
                                        };
                                        readonly marketConversionPrice: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.0003824223836841305];
                                        };
                                        readonly slippage: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.55];
                                        };
                                        readonly cryptoLiquidityProvider: {
                                            readonly type: "string";
                                            readonly examples: readonly ["transak"];
                                        };
                                        readonly fiatLiquidityProvider: {
                                            readonly type: "string";
                                            readonly examples: readonly ["coinbase"];
                                        };
                                        readonly partnerApiKey: {
                                            readonly type: "string";
                                            readonly examples: readonly ["d79671a4-b021-4a4f-a444-6862a680a94b"];
                                        };
                                        readonly sourceTokenAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.01596979230085574];
                                        };
                                        readonly sourceToken: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ETH"];
                                        };
                                        readonly notes: {
                                            readonly type: "array";
                                            readonly items: {};
                                        };
                                        readonly fiatFeeAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [8.01];
                                        };
                                        readonly feeDecimal: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.1602];
                                        };
                                        readonly swaps: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly sourceCurrency: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["GBP"];
                                                    };
                                                    readonly destinationCurrency: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["USDT"];
                                                    };
                                                    readonly sourceAmount: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [50];
                                                    };
                                                    readonly destinationAmount: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [62.14139149305077];
                                                    };
                                                    readonly paymentMethod: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["gbp_bank_transfer"];
                                                    };
                                                    readonly liquidityProvider: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["coinbase"];
                                                    };
                                                    readonly conversionPrice: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [1.2428278298610154];
                                                    };
                                                    readonly feeInSourceAmount: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0];
                                                    };
                                                    readonly networkFeeInSourceAmount: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0];
                                                    };
                                                    readonly marketConversionPrice: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [1.2428278298610154];
                                                    };
                                                    readonly isNonCustodial: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                    readonly isFiatliquidityProvider: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [true];
                                                    };
                                                    readonly isFiatPartnerDirectCryptoDeposit: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                    readonly isFiatPartnerAccountWalletDeposit: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                    readonly liquidityProviderData: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                    readonly originalDestinationAmount: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [62.14139149305077];
                                                    };
                                                };
                                            };
                                        };
                                        readonly fees: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["Network/Exchange fee"];
                                                    };
                                                    readonly value: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [6.01];
                                                    };
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["network_fee"];
                                                    };
                                                    readonly ids: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["network_fee"];
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly fiatAmountInUsd: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [62.17];
                                        };
                                        readonly internalFees: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["Network/Exchange fee"];
                                                    };
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["network_fee"];
                                                    };
                                                    readonly value: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [6.01];
                                                    };
                                                };
                                            };
                                        };
                                        readonly cost: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly ethPriceInLocalCurrency: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [2614.90969845];
                                                };
                                                readonly gasCostinLocalCurrency: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [6.014292306435];
                                                };
                                                readonly transakMinimumFee: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [1];
                                                };
                                                readonly transakFeeAmount: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [1];
                                                };
                                                readonly fiatLiquidityProviderFee: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0];
                                                };
                                                readonly gasCostinLocalCurrencyByFiatPartner: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0];
                                                };
                                                readonly gasCostinLocalCurrencyByCryptoPartner: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0];
                                                };
                                                readonly partnerFeeDecimal: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.02];
                                                };
                                                readonly partnerFeeInLocalCurrency: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [1];
                                                };
                                                readonly totalFeeDecimal: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.1602];
                                                };
                                                readonly totalFeeAmount: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [8.01];
                                                };
                                                readonly gasCurrency: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["ETH"];
                                                };
                                                readonly gasInNativeToken: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.0023];
                                                };
                                                readonly gasCurrencyRateInUsd: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.00030758347046429724];
                                                };
                                                readonly totalAmountChargedByTransak: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [8.014292306435];
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly conversionPriceData: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly _id: {
                                            readonly type: "string";
                                            readonly examples: readonly ["98c423b9-ff2c-42a1-bb27-59d8f9530095"];
                                        };
                                        readonly id: {
                                            readonly type: "string";
                                            readonly examples: readonly ["98c423b9-ff2c-42a1-bb27-59d8f9530095"];
                                        };
                                        readonly createdAt: {
                                            readonly type: "string";
                                            readonly examples: readonly ["2024-04-23T14:41:21.612Z"];
                                        };
                                        readonly fiatCurrency: {
                                            readonly type: "string";
                                            readonly examples: readonly ["GBP"];
                                        };
                                        readonly cryptoCurrency: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ETH"];
                                        };
                                        readonly paymentMethod: {
                                            readonly type: "string";
                                            readonly examples: readonly ["gbp_bank_transfer"];
                                        };
                                        readonly fiatAmount: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [50];
                                        };
                                        readonly network: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ethereum"];
                                        };
                                        readonly cryptoAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.01596979];
                                        };
                                        readonly isBuyOrSell: {
                                            readonly type: "string";
                                            readonly examples: readonly ["BUY"];
                                        };
                                        readonly conversionPrice: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.00038032370328306114];
                                        };
                                        readonly marketConversionPrice: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.0003824223836841305];
                                        };
                                        readonly slippage: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.55];
                                        };
                                        readonly cryptoLiquidityProvider: {
                                            readonly type: "string";
                                            readonly examples: readonly ["transak"];
                                        };
                                        readonly fiatLiquidityProvider: {
                                            readonly type: "string";
                                            readonly examples: readonly ["coinbase"];
                                        };
                                        readonly partnerApiKey: {
                                            readonly type: "string";
                                            readonly examples: readonly ["d79671a4-b021-4a4f-a444-6862a680a94b"];
                                        };
                                        readonly sourceTokenAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.01596979230085574];
                                        };
                                        readonly sourceToken: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ETH"];
                                        };
                                        readonly notes: {
                                            readonly type: "array";
                                            readonly items: {};
                                        };
                                        readonly fiatFeeAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [8.01];
                                        };
                                        readonly feeDecimal: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.1602];
                                        };
                                        readonly swaps: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly sourceCurrency: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["GBP"];
                                                    };
                                                    readonly destinationCurrency: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["USDT"];
                                                    };
                                                    readonly sourceAmount: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [50];
                                                    };
                                                    readonly destinationAmount: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [62.14139149305077];
                                                    };
                                                    readonly paymentMethod: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["gbp_bank_transfer"];
                                                    };
                                                    readonly liquidityProvider: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["coinbase"];
                                                    };
                                                    readonly conversionPrice: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [1.2428278298610154];
                                                    };
                                                    readonly feeInSourceAmount: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0];
                                                    };
                                                    readonly networkFeeInSourceAmount: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0];
                                                    };
                                                    readonly marketConversionPrice: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [1.2428278298610154];
                                                    };
                                                    readonly isNonCustodial: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                    readonly isFiatliquidityProvider: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [true];
                                                    };
                                                    readonly isFiatPartnerDirectCryptoDeposit: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                    readonly isFiatPartnerAccountWalletDeposit: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                    readonly liquidityProviderData: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                    readonly originalDestinationAmount: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [62.14139149305077];
                                                    };
                                                };
                                            };
                                        };
                                        readonly fees: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["Network/Exchange fee"];
                                                    };
                                                    readonly value: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [6.01];
                                                    };
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["network_fee"];
                                                    };
                                                    readonly ids: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["network_fee"];
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly fiatAmountInUsd: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [62.17];
                                        };
                                        readonly internalFees: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["Network/Exchange fee"];
                                                    };
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["network_fee"];
                                                    };
                                                    readonly value: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [6.01];
                                                    };
                                                };
                                            };
                                        };
                                        readonly cost: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly ethPriceInLocalCurrency: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [2614.90969845];
                                                };
                                                readonly gasCostinLocalCurrency: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [6.014292306435];
                                                };
                                                readonly transakMinimumFee: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [1];
                                                };
                                                readonly transakFeeAmount: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [1];
                                                };
                                                readonly fiatLiquidityProviderFee: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0];
                                                };
                                                readonly gasCostinLocalCurrencyByFiatPartner: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0];
                                                };
                                                readonly gasCostinLocalCurrencyByCryptoPartner: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0];
                                                };
                                                readonly partnerFeeDecimal: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.02];
                                                };
                                                readonly partnerFeeInLocalCurrency: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [1];
                                                };
                                                readonly totalFeeDecimal: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.1602];
                                                };
                                                readonly totalFeeAmount: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [8.01];
                                                };
                                                readonly gasCurrency: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["ETH"];
                                                };
                                                readonly gasInNativeToken: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.0023];
                                                };
                                                readonly gasCurrencyRateInUsd: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.00030758347046429724];
                                                };
                                                readonly totalAmountChargedByTransak: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [8.014292306435];
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly conversionPrice: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [0.0003803236484877352];
                                };
                                readonly cryptoAmount: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [0.01596979];
                                };
                                readonly totalFeeInFiat: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [8.01];
                                };
                                readonly totalfeeDecimal: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [0.1602];
                                };
                                readonly fiatAmountInUsd: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [62.17];
                                };
                                readonly countryCode: {
                                    readonly type: "string";
                                    readonly examples: readonly ["FR"];
                                };
                                readonly referenceCode: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [393693];
                                };
                                readonly paymentOptions: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly currency: {
                                                readonly type: "string";
                                                readonly examples: readonly ["GBP"];
                                            };
                                            readonly id: {
                                                readonly type: "string";
                                                readonly examples: readonly ["gbp_bank_transfer"];
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly examples: readonly ["Bank Transfer Details"];
                                            };
                                            readonly fields: {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly name: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["Name"];
                                                        };
                                                        readonly value: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["Transak Limited"];
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly fromWalletAddress: {
                                    readonly type: "string";
                                    readonly examples: readonly ["0x085ee67132ec4297b85ed5d1b4c65424d36fda7d"];
                                };
                                readonly isPaymentProcessing: {
                                    readonly type: "boolean";
                                    readonly default: true;
                                    readonly examples: readonly [false];
                                };
                                readonly autoExpiresAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-04-23T15:26:14+00:00"];
                                };
                                readonly partnerApiKey: {
                                    readonly type: "string";
                                    readonly examples: readonly ["d79671a4-b021-4a4f-a444-6862a680a94b"];
                                };
                                readonly stateCode: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Paris"];
                                };
                                readonly userKycType: {
                                    readonly type: "string";
                                    readonly examples: readonly ["STANDARD"];
                                };
                                readonly cardPaymentData: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly orderId: {
                                            readonly type: "string";
                                            readonly examples: readonly ["7d8e0655-728e-458c-9c15-b3e9f2aa66ed"];
                                        };
                                        readonly paymentId: {
                                            readonly type: "string";
                                            readonly examples: readonly ["6627c88bb6fc7f4ae6ca86e1"];
                                        };
                                        readonly pgData: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly paymentOptions: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly currency: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["GBP"];
                                                            };
                                                            readonly id: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["gbp_bank_transfer"];
                                                            };
                                                            readonly name: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["Bank Transfer Details"];
                                                            };
                                                            readonly fields: {
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly type: "object";
                                                                    readonly properties: {
                                                                        readonly name: {
                                                                            readonly type: "string";
                                                                            readonly examples: readonly ["Name"];
                                                                        };
                                                                        readonly value: {
                                                                            readonly type: "string";
                                                                            readonly examples: readonly ["Transak Limited"];
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly liquidityProvider: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["MODULR"];
                                                };
                                                readonly status: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["CREATED"];
                                                };
                                            };
                                        };
                                        readonly liquidityProvider: {
                                            readonly type: "string";
                                            readonly examples: readonly ["MODULR"];
                                        };
                                        readonly updatedAt: {
                                            readonly type: "string";
                                            readonly examples: readonly ["2024-04-23T14:41:20.262Z"];
                                        };
                                        readonly status: {
                                            readonly type: "string";
                                            readonly examples: readonly ["CAPTURED"];
                                        };
                                        readonly processedOn: {
                                            readonly type: "string";
                                            readonly examples: readonly ["2024-04-23T14:41:18.000Z"];
                                        };
                                    };
                                };
                                readonly liquidityProvider: {
                                    readonly type: "string";
                                    readonly examples: readonly ["MODULR"];
                                };
                                readonly id: {
                                    readonly type: "string";
                                    readonly examples: readonly ["7d8e0655-728e-458c-9c15-b3e9f2aa66ed"];
                                };
                                readonly slackThreadId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["1713883276.352889"];
                                };
                                readonly statusHistories: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly status: {
                                                readonly type: "string";
                                                readonly examples: readonly ["AWAITING_PAYMENT_FROM_USER"];
                                            };
                                            readonly createdAt: {
                                                readonly type: "string";
                                                readonly examples: readonly ["2024-04-23T14:41:16.423Z"];
                                            };
                                            readonly message: {
                                                readonly type: "string";
                                                readonly examples: readonly ["*📦 New order by First Last* \n*Order Id:* 7d8e0655-728e-458c-9c15-b3e9f2aa66ed\n*Email:* ashutosh+12342024@transak.com\n*Crypto Amount:* 0.01596979 ETH\n*Fiat Amount:* 50 GBP\n*Payment Method:*  gbp_bank_transfer\n*Liquidity Provider*  MODULR\n*Wallet Address:* 0x12d8885e0F0BFc487d93A9e3DcB5c23cB86EE9ae\n*Reference Code:* 393693 \n*Partner name:* Transak"];
                                            };
                                            readonly isEmailSentToUser: {
                                                readonly type: "boolean";
                                                readonly default: true;
                                                readonly examples: readonly [true];
                                            };
                                            readonly partnerEventId: {
                                                readonly type: "string";
                                                readonly examples: readonly ["ORDER_CREATED"];
                                            };
                                        };
                                    };
                                };
                                readonly paymentMarkedAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-04-23T14:41:18.535Z"];
                                };
                                readonly capturedAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-04-23T14:41:19.773Z"];
                                };
                                readonly liquidityProviderData: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly examples: readonly ["T2100AEP4M"];
                                        };
                                        readonly amount: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [50];
                                        };
                                        readonly currency: {
                                            readonly type: "string";
                                            readonly examples: readonly ["GBP"];
                                        };
                                        readonly description: {
                                            readonly type: "string";
                                            readonly examples: readonly ["Payment from First Last: 393693"];
                                        };
                                        readonly transactionDate: {
                                            readonly type: "string";
                                            readonly examples: readonly ["2024-04-23T14:41:18.000+0000"];
                                        };
                                        readonly postedDate: {
                                            readonly type: "string";
                                            readonly examples: readonly ["2024-04-23T14:41:19.002+0000"];
                                        };
                                        readonly credit: {
                                            readonly type: "boolean";
                                            readonly default: true;
                                            readonly examples: readonly [true];
                                        };
                                        readonly type: {
                                            readonly type: "string";
                                            readonly examples: readonly ["PI_BACS"];
                                        };
                                        readonly sourceId: {
                                            readonly type: "string";
                                            readonly examples: readonly ["P2100FRAQ4"];
                                        };
                                        readonly additionalInfo: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly payer: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly name: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["First Last"];
                                                        };
                                                        readonly address: {
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly country: {
                                                                    readonly type: "string";
                                                                    readonly examples: readonly ["France"];
                                                                };
                                                                readonly postCode: {
                                                                    readonly type: "string";
                                                                    readonly examples: readonly ["75010"];
                                                                };
                                                                readonly postTown: {
                                                                    readonly type: "string";
                                                                    readonly examples: readonly ["Paris"];
                                                                };
                                                                readonly addressLine1: {
                                                                    readonly type: "string";
                                                                    readonly examples: readonly ["170 Rue du Faubourg Saint-Denis, Paris"];
                                                                };
                                                                readonly addressLine2: {
                                                                    readonly type: "string";
                                                                    readonly examples: readonly [""];
                                                                };
                                                            };
                                                        };
                                                        readonly identifier: {
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly type: {
                                                                    readonly type: "string";
                                                                    readonly examples: readonly ["SCAN"];
                                                                };
                                                                readonly sortCode: {
                                                                    readonly type: "string";
                                                                    readonly examples: readonly ["000000"];
                                                                };
                                                                readonly accountNumber: {
                                                                    readonly type: "string";
                                                                    readonly examples: readonly ["03744184"];
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly account: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["A2100C5B5K"];
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["Transak"];
                                                };
                                                readonly balance: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["50.00"];
                                                };
                                                readonly currency: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["GBP"];
                                                };
                                                readonly status: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["ACTIVE"];
                                                };
                                                readonly identifiers: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly type: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["SCAN"];
                                                            };
                                                            readonly accountNumber: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["03744184"];
                                                            };
                                                            readonly sortCode: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["000000"];
                                                            };
                                                            readonly providerExtraInfo: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["{}"];
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly customerId: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["C120H84Y"];
                                                };
                                                readonly customerName: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["Transak"];
                                                };
                                                readonly externalReference: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["aebd10cb-0f51-4152-b98d-708602cecf26"];
                                                };
                                                readonly accessGroups: {
                                                    readonly type: "array";
                                                    readonly items: {};
                                                };
                                                readonly createdDate: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["2024-04-23T14:41:15.930+0000"];
                                                };
                                                readonly directDebit: {
                                                    readonly type: "boolean";
                                                    readonly default: true;
                                                    readonly examples: readonly [false];
                                                };
                                                readonly securedFundingLimit: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["0.00"];
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly paymentTnxId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["A2100C5B5K_T2100AEP4M"];
                                };
                                readonly paymentdateTime: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-04-23T14:41:18.000Z"];
                                };
                                readonly isFirstOrder: {
                                    readonly type: "boolean";
                                    readonly default: true;
                                    readonly examples: readonly [true];
                                };
                                readonly paymentProcessingAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-04-23T14:41:21.046Z"];
                                };
                                readonly updatedAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-04-23T14:41:21.638Z"];
                                };
                                readonly cryptoTransactionData: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly examples: readonly ["9861ba99-41dd-456a-ab52-ae84fba1844c"];
                                        };
                                        readonly txid: {
                                            readonly type: "string";
                                            readonly examples: readonly ["DUMMY_TX_ID"];
                                        };
                                        readonly timestamp: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [1619973309000];
                                        };
                                        readonly datetime: {
                                            readonly type: "string";
                                            readonly examples: readonly ["2021-05-02T16:35:09.000Z"];
                                        };
                                        readonly address: {
                                            readonly type: "string";
                                            readonly examples: readonly ["DUMMY_ADDRESS"];
                                        };
                                        readonly type: {
                                            readonly type: "string";
                                            readonly examples: readonly ["withdrawal"];
                                        };
                                        readonly amount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.00114222];
                                        };
                                        readonly currency: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ETH"];
                                        };
                                        readonly status: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ok"];
                                        };
                                        readonly fee: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly currency: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["ETH"];
                                                };
                                                readonly cost: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["0.0005"];
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly exchangeId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["binance"];
                                };
                                readonly partnerTransactionHash: {
                                    readonly type: "string";
                                    readonly examples: readonly ["9861ba99-41dd-456a-ab52-ae84fba1844c"];
                                };
                                readonly transactionHashCreatedAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-04-23T14:41:22.550Z"];
                                };
                                readonly completedAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-04-23T14:41:50.278Z"];
                                };
                                readonly orderCost: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly ethPriceInLocalCurrency: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [2614.90969845];
                                        };
                                        readonly gasCostinLocalCurrency: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [6.014292306435];
                                        };
                                        readonly transakMinimumFee: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [1];
                                        };
                                        readonly transakFeeAmount: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [1];
                                        };
                                        readonly fiatLiquidityProviderFee: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [0];
                                        };
                                        readonly gasCostinLocalCurrencyByFiatPartner: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [0];
                                        };
                                        readonly gasCostinLocalCurrencyByCryptoPartner: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [0];
                                        };
                                        readonly partnerFeeDecimal: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.02];
                                        };
                                        readonly partnerFeeInLocalCurrency: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [1];
                                        };
                                        readonly totalFeeDecimal: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.1602];
                                        };
                                        readonly totalFeeAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [8.01];
                                        };
                                        readonly gasCurrency: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ETH"];
                                        };
                                        readonly gasInNativeToken: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.0023];
                                        };
                                        readonly gasCurrencyRateInUsd: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.00030758347046429724];
                                        };
                                        readonly totalAmountChargedByTransak: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [8.014292306435];
                                        };
                                    };
                                };
                                readonly transactionHash: {
                                    readonly type: "string";
                                    readonly examples: readonly ["DUMMY_TX_ID"];
                                };
                                readonly transactionLink: {
                                    readonly type: "string";
                                    readonly examples: readonly ["https://sepolia.etherscan.io/tx/DUMMY_TX_ID"];
                                };
                                readonly partnerFeeInUsd: {
                                    readonly type: "string";
                                    readonly examples: readonly ["1.24"];
                                };
                                readonly partnerFeeDecimal: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [0.02];
                                };
                                readonly webhookResponses: {
                                    readonly type: "array";
                                    readonly items: {};
                                };
                            };
                        };
                    };
                };
            }, {
                readonly title: "Sell Order";
                readonly type: "object";
                readonly properties: {
                    readonly meta: {
                        readonly type: "object";
                        readonly properties: {
                            readonly filter: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly productsAvailed: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                            readonly examples: readonly ["SELL"];
                                        };
                                    };
                                    readonly status: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                            readonly examples: readonly ["COMPLETED"];
                                        };
                                    };
                                };
                            };
                            readonly sortOrder: {
                                readonly type: "string";
                                readonly examples: readonly ["desc"];
                            };
                            readonly startDate: {
                                readonly type: "string";
                                readonly examples: readonly ["2024-06-01"];
                            };
                            readonly endDate: {
                                readonly type: "string";
                                readonly examples: readonly ["2024-07-01"];
                            };
                            readonly limit: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [100];
                            };
                            readonly skip: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [0];
                            };
                            readonly totalCount: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [2];
                            };
                        };
                    };
                    readonly data: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly _id: {
                                    readonly type: "string";
                                    readonly examples: readonly ["3d87c21b-4129-452e-ad05-86197f41413b"];
                                };
                                readonly createdAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-06-10T10:59:51.044Z"];
                                };
                                readonly status: {
                                    readonly type: "string";
                                    readonly examples: readonly ["COMPLETED"];
                                };
                                readonly fiatCurrency: {
                                    readonly type: "string";
                                    readonly examples: readonly ["GBP"];
                                };
                                readonly userId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["6ca25212-79b8-4221-93a3-883114826338"];
                                };
                                readonly cryptoCurrency: {
                                    readonly type: "string";
                                    readonly examples: readonly ["ETH"];
                                };
                                readonly isBuyOrSell: {
                                    readonly type: "string";
                                    readonly examples: readonly ["SELL"];
                                };
                                readonly fiatAmount: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [242.21];
                                };
                                readonly dispute: {
                                    readonly type: "boolean";
                                    readonly default: true;
                                    readonly examples: readonly [false];
                                };
                                readonly ipAddress: {
                                    readonly type: "string";
                                    readonly examples: readonly ["35.177.158.9"];
                                };
                                readonly amountPaid: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [242.21];
                                };
                                readonly paymentOptionId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["gbp_bank_transfer"];
                                };
                                readonly quoteId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["fb94dcdd-9bb9-451f-993e-092974a5a2b6"];
                                };
                                readonly bankId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["66f4e082-2cd0-4023-82f1-8a138bc761a9"];
                                };
                                readonly orderProcessingType: {
                                    readonly type: "string";
                                    readonly examples: readonly ["NORMAL"];
                                };
                                readonly addressAdditionalData: {
                                    readonly type: "boolean";
                                    readonly default: true;
                                    readonly examples: readonly [false];
                                };
                                readonly network: {
                                    readonly type: "string";
                                    readonly examples: readonly ["ethereum"];
                                };
                                readonly appVersionName: {
                                    readonly type: "string";
                                    readonly examples: readonly ["staging-api"];
                                };
                                readonly conversionPriceDataAtCreateOrder: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly _id: {
                                            readonly type: "string";
                                            readonly examples: readonly ["4dbb1b6c-8096-471a-92d7-11d93a1b5705"];
                                        };
                                        readonly id: {
                                            readonly type: "string";
                                            readonly examples: readonly ["4dbb1b6c-8096-471a-92d7-11d93a1b5705"];
                                        };
                                        readonly createdAt: {
                                            readonly type: "string";
                                            readonly examples: readonly ["2024-06-10T10:59:51.014Z"];
                                        };
                                        readonly fiatCurrency: {
                                            readonly type: "string";
                                            readonly examples: readonly ["GBP"];
                                        };
                                        readonly cryptoCurrency: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ETH"];
                                        };
                                        readonly paymentMethod: {
                                            readonly type: "string";
                                            readonly examples: readonly ["gbp_bank_transfer"];
                                        };
                                        readonly fiatAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [242.21];
                                        };
                                        readonly network: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ethereum"];
                                        };
                                        readonly cryptoAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.0887];
                                        };
                                        readonly isBuyOrSell: {
                                            readonly type: "string";
                                            readonly examples: readonly ["SELL"];
                                        };
                                        readonly conversionPrice: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.000347289168633282];
                                        };
                                        readonly marketConversionPrice: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.0003454212488349677];
                                        };
                                        readonly slippage: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.54];
                                        };
                                        readonly cryptoLiquidityProvider: {
                                            readonly type: "string";
                                            readonly examples: readonly ["transak"];
                                        };
                                        readonly fiatLiquidityProvider: {
                                            readonly type: "string";
                                            readonly examples: readonly ["coinbase"];
                                        };
                                        readonly partnerApiKey: {
                                            readonly type: "string";
                                            readonly examples: readonly ["d79671a4-b021-4a4f-a444-6862a680a94b"];
                                        };
                                        readonly sourceTokenAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.0887];
                                        };
                                        readonly sourceToken: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ETH"];
                                        };
                                        readonly isExchangeInternalTransfer: {
                                            readonly type: "boolean";
                                            readonly default: true;
                                            readonly examples: readonly [false];
                                        };
                                        readonly notes: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly examples: readonly ["As per our estimate, ensure that you have at least 0.09134105 ETH to complete this transaction successfully!"];
                                            };
                                        };
                                        readonly fiatFeeAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [13.2];
                                        };
                                        readonly feeDecimal: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.05168226635805324];
                                        };
                                        readonly swaps: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly sourceCurrency: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["ETH"];
                                                    };
                                                    readonly destinationCurrency: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["USDT"];
                                                    };
                                                    readonly sourceAmount: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0.0887];
                                                    };
                                                    readonly destinationAmount: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [324.4238796926999];
                                                    };
                                                    readonly paymentMethod: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["gbp_bank_transfer"];
                                                    };
                                                    readonly liquidityProvider: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["transak"];
                                                    };
                                                    readonly conversionPrice: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0.0002720133612963069];
                                                    };
                                                    readonly feeInSourceAmount: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0];
                                                    };
                                                    readonly networkFeeInSourceAmount: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0];
                                                    };
                                                    readonly marketConversionPrice: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0.0002720133612963069];
                                                    };
                                                    readonly isNonCustodial: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                    readonly isFiatliquidityProvider: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [true];
                                                    };
                                                    readonly isFiatPartnerDirectCryptoDeposit: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                    readonly isFiatPartnerAccountWalletDeposit: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                    readonly liquidityProviderData: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                };
                                            };
                                        };
                                        readonly fees: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["Processing fee"];
                                                    };
                                                    readonly value: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [7.65];
                                                    };
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["processing_fee"];
                                                    };
                                                    readonly ids: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["processing_fee"];
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly fiatAmountInUsd: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [326.09];
                                        };
                                        readonly internalFees: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["Processing fee"];
                                                    };
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["processing_fee"];
                                                    };
                                                    readonly value: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [7.65];
                                                    };
                                                };
                                            };
                                        };
                                        readonly cost: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly ethPriceInLocalCurrency: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [2895.01587807];
                                                };
                                                readonly gasCostinLocalCurrency: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [9.709260597657215];
                                                };
                                                readonly transakMinimumFee: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [3];
                                                };
                                                readonly transakFeeAmount: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [3];
                                                };
                                                readonly fiatLiquidityProviderFee: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0];
                                                };
                                                readonly gasCostinLocalCurrencyByFiatPartner: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0];
                                                };
                                                readonly gasCostinLocalCurrencyByCryptoPartner: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0];
                                                };
                                                readonly partnerFeeDecimal: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.01];
                                                };
                                                readonly partnerFeeInLocalCurrency: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [2.554067561308319];
                                                };
                                                readonly totalFeeDecimal: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.05168226635805324];
                                                };
                                                readonly totalFeeAmount: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [13.2];
                                                };
                                                readonly gasCurrency: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["ETH"];
                                                };
                                                readonly gasInNativeToken: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.0026410486108705286];
                                                };
                                                readonly gasCurrencyRateInUsd: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.0002720133612963069];
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly conversionPriceData: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly _id: {
                                            readonly type: "string";
                                            readonly examples: readonly ["f1a458d4-6448-4c5b-b20a-09ada884d454"];
                                        };
                                        readonly id: {
                                            readonly type: "string";
                                            readonly examples: readonly ["f1a458d4-6448-4c5b-b20a-09ada884d454"];
                                        };
                                        readonly createdAt: {
                                            readonly type: "string";
                                            readonly examples: readonly ["2024-06-10T11:00:07.286Z"];
                                        };
                                        readonly fiatCurrency: {
                                            readonly type: "string";
                                            readonly examples: readonly ["GBP"];
                                        };
                                        readonly cryptoCurrency: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ETH"];
                                        };
                                        readonly paymentMethod: {
                                            readonly type: "string";
                                            readonly examples: readonly ["gbp_bank_transfer"];
                                        };
                                        readonly fiatAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [242.21];
                                        };
                                        readonly network: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ethereum"];
                                        };
                                        readonly cryptoAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.0887];
                                        };
                                        readonly isBuyOrSell: {
                                            readonly type: "string";
                                            readonly examples: readonly ["SELL"];
                                        };
                                        readonly conversionPrice: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.000347289168633282];
                                        };
                                        readonly marketConversionPrice: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.0003454212488349677];
                                        };
                                        readonly slippage: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.54];
                                        };
                                        readonly cryptoLiquidityProvider: {
                                            readonly type: "string";
                                            readonly examples: readonly ["transak"];
                                        };
                                        readonly fiatLiquidityProvider: {
                                            readonly type: "string";
                                            readonly examples: readonly ["coinbase"];
                                        };
                                        readonly partnerApiKey: {
                                            readonly type: "string";
                                            readonly examples: readonly ["d79671a4-b021-4a4f-a444-6862a680a94b"];
                                        };
                                        readonly sourceTokenAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.0887];
                                        };
                                        readonly sourceToken: {
                                            readonly type: "string";
                                            readonly examples: readonly ["ETH"];
                                        };
                                        readonly isExchangeInternalTransfer: {
                                            readonly type: "boolean";
                                            readonly default: true;
                                            readonly examples: readonly [false];
                                        };
                                        readonly notes: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly examples: readonly ["As per our estimate, ensure that you have at least 0.09134105 ETH to complete this transaction successfully!"];
                                            };
                                        };
                                        readonly fiatFeeAmount: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [13.2];
                                        };
                                        readonly feeDecimal: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [0.05168226635805324];
                                        };
                                        readonly swaps: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly sourceCurrency: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["ETH"];
                                                    };
                                                    readonly destinationCurrency: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["USDT"];
                                                    };
                                                    readonly sourceAmount: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0.0887];
                                                    };
                                                    readonly destinationAmount: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [324.4238796926999];
                                                    };
                                                    readonly paymentMethod: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["gbp_bank_transfer"];
                                                    };
                                                    readonly liquidityProvider: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["transak"];
                                                    };
                                                    readonly conversionPrice: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0.0002720133612963069];
                                                    };
                                                    readonly feeInSourceAmount: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0];
                                                    };
                                                    readonly networkFeeInSourceAmount: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0];
                                                    };
                                                    readonly marketConversionPrice: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0.0002720133612963069];
                                                    };
                                                    readonly isNonCustodial: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                    readonly isFiatliquidityProvider: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [true];
                                                    };
                                                    readonly isFiatPartnerDirectCryptoDeposit: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                    readonly isFiatPartnerAccountWalletDeposit: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                    readonly liquidityProviderData: {
                                                        readonly type: "boolean";
                                                        readonly default: true;
                                                        readonly examples: readonly [false];
                                                    };
                                                };
                                            };
                                        };
                                        readonly fees: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["Processing fee"];
                                                    };
                                                    readonly value: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [7.65];
                                                    };
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["processing_fee"];
                                                    };
                                                    readonly ids: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["processing_fee"];
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly fiatAmountInUsd: {
                                            readonly type: "number";
                                            readonly default: 0;
                                            readonly examples: readonly [326.09];
                                        };
                                        readonly internalFees: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["Processing fee"];
                                                    };
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["processing_fee"];
                                                    };
                                                    readonly value: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [7.65];
                                                    };
                                                };
                                            };
                                        };
                                        readonly cost: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly ethPriceInLocalCurrency: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [2895.01587807];
                                                };
                                                readonly gasCostinLocalCurrency: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [9.709260597657215];
                                                };
                                                readonly transakMinimumFee: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [3];
                                                };
                                                readonly transakFeeAmount: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [3];
                                                };
                                                readonly fiatLiquidityProviderFee: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0];
                                                };
                                                readonly gasCostinLocalCurrencyByFiatPartner: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0];
                                                };
                                                readonly gasCostinLocalCurrencyByCryptoPartner: {
                                                    readonly type: "integer";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0];
                                                };
                                                readonly partnerFeeDecimal: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.01];
                                                };
                                                readonly partnerFeeInLocalCurrency: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [2.554067561308319];
                                                };
                                                readonly totalFeeDecimal: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.05168226635805324];
                                                };
                                                readonly totalFeeAmount: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [13.2];
                                                };
                                                readonly gasCurrency: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["ETH"];
                                                };
                                                readonly gasInNativeToken: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.0026410486108705286];
                                                };
                                                readonly gasCurrencyRateInUsd: {
                                                    readonly type: "number";
                                                    readonly default: 0;
                                                    readonly examples: readonly [0.0002720133612963069];
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly conversionPrice: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [0.000347289168633282];
                                };
                                readonly cryptoAmount: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [0.0887];
                                };
                                readonly totalFeeInFiat: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [13.2];
                                };
                                readonly totalfeeDecimal: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [0.05168226635805324];
                                };
                                readonly fiatAmountInUsd: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [326.09];
                                };
                                readonly referenceCode: {
                                    readonly type: "integer";
                                    readonly default: 0;
                                    readonly examples: readonly [544053];
                                };
                                readonly paymentOptions: {
                                    readonly type: "array";
                                    readonly items: {};
                                };
                                readonly countryCode: {
                                    readonly type: "string";
                                    readonly examples: readonly ["FR"];
                                };
                                readonly isPaymentProcessing: {
                                    readonly type: "boolean";
                                    readonly default: true;
                                    readonly examples: readonly [false];
                                };
                                readonly autoExpiresAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-06-10T11:59:51+00:00"];
                                };
                                readonly partnerApiKey: {
                                    readonly type: "string";
                                    readonly examples: readonly ["d79671a4-b021-4a4f-a444-6862a680a94b"];
                                };
                                readonly redirectURL: {
                                    readonly type: "string";
                                    readonly examples: readonly ["https://transak-redirect.vercel.app/redirect"];
                                };
                                readonly stateCode: {
                                    readonly type: "string";
                                    readonly examples: readonly ["ABC"];
                                };
                                readonly userKycType: {
                                    readonly type: "string";
                                    readonly examples: readonly ["SIMPLE"];
                                };
                                readonly cryptoPaymentData: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly paymentAddress: {
                                            readonly type: "string";
                                            readonly examples: readonly ["0x343B3F1793E2434f210BCF778Bc6Da841C0d58A3"];
                                        };
                                    };
                                };
                                readonly id: {
                                    readonly type: "string";
                                    readonly examples: readonly ["3d87c21b-4129-452e-ad05-86197f41413b"];
                                };
                                readonly slackThreadId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["1718017191.791849"];
                                };
                                readonly statusHistories: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly status: {
                                                readonly type: "string";
                                                readonly examples: readonly ["AWAITING_PAYMENT_FROM_USER"];
                                            };
                                            readonly createdAt: {
                                                readonly type: "string";
                                                readonly examples: readonly ["2024-06-10T10:59:51.855Z"];
                                            };
                                            readonly message: {
                                                readonly type: "string";
                                                readonly examples: readonly ["*📦 New sell order by ABC ABC* \n*Order Id:* 3d87c21b-4129-452e-ad05-86197f41413b\n*Email:* ashutosh+sell-demo-one@transak.com\n*Crypto Amount:* 0.0887 ETH\n*Fiat Amount:* 242.21 GBP\n*Payment Method:* gbp_bank_transfer\n*Wallet Address:* 0x343B3F1793E2434f210BCF778Bc6Da841C0d58A3 \n*Partner name:* Transak"];
                                            };
                                            readonly isEmailSentToUser: {
                                                readonly type: "boolean";
                                                readonly default: true;
                                                readonly examples: readonly [true];
                                            };
                                            readonly partnerEventId: {
                                                readonly type: "string";
                                                readonly examples: readonly ["ORDER_CREATED"];
                                            };
                                        };
                                    };
                                };
                                readonly liquidityProviderData: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Modulr"];
                                };
                                readonly paymentMarkedAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-06-10T10:59:59.508Z"];
                                };
                                readonly paymentTnxId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["c60e0ec0-73db-4719-afb8-e87dd8232fe5"];
                                };
                                readonly paymentdateTime: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-06-10T10:59:59.508Z"];
                                };
                                readonly paymentProcessingAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-06-10T11:00:07.038Z"];
                                };
                                readonly updatedAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-06-10T11:00:07.321Z"];
                                };
                                readonly fiatAmountPaid: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [242.21];
                                };
                                readonly payoutFiatData: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly payoutType: {
                                            readonly type: "string";
                                            readonly examples: readonly ["Bank"];
                                        };
                                        readonly payoutMethod: {
                                            readonly type: "string";
                                            readonly examples: readonly ["6282032cf8fe2226684ce35e"];
                                        };
                                        readonly payoutCurrency: {
                                            readonly type: "string";
                                            readonly examples: readonly ["GBP"];
                                        };
                                        readonly payoutDetails: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly _id: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["66f4e082-2cd0-4023-82f1-8a138bc761a9"];
                                                };
                                                readonly createdAt: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["2024-06-06T10:02:57.289Z"];
                                                };
                                                readonly userId: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["6ca25212-79b8-4221-93a3-883114826338"];
                                                };
                                                readonly isDeleted: {
                                                    readonly type: "boolean";
                                                    readonly default: true;
                                                    readonly examples: readonly [false];
                                                };
                                                readonly detailsType: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["accountNumber"];
                                                };
                                                readonly isDefault: {
                                                    readonly type: "boolean";
                                                    readonly default: true;
                                                    readonly examples: readonly [true];
                                                };
                                                readonly isVerified: {
                                                    readonly type: "boolean";
                                                    readonly default: true;
                                                    readonly examples: readonly [false];
                                                };
                                                readonly disabled: {
                                                    readonly type: "boolean";
                                                    readonly default: true;
                                                    readonly examples: readonly [false];
                                                };
                                                readonly sortCode: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["000000"];
                                                };
                                                readonly accountNumber: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["11114444"];
                                                };
                                                readonly originalVerificationData: {
                                                    readonly type: "object";
                                                    readonly properties: {};
                                                };
                                                readonly valid: {
                                                    readonly type: "boolean";
                                                    readonly default: true;
                                                    readonly examples: readonly [true];
                                                };
                                                readonly firstName: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["ABC"];
                                                };
                                                readonly lastName: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["ABC"];
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly payoutFiatTransactionId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["P2100G3SDE"];
                                };
                                readonly payoutFiatTransationCreatedAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-06-10T11:00:07.703Z"];
                                };
                                readonly completedAt: {
                                    readonly type: "string";
                                    readonly examples: readonly ["2024-06-10T11:00:23.149Z"];
                                };
                                readonly userPayoutFiatTransactionId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["T2100AUF9M"];
                                };
                                readonly partnerFeeInUsd: {
                                    readonly type: "string";
                                    readonly examples: readonly ["3.26"];
                                };
                                readonly partnerFeeDecimal: {
                                    readonly type: "number";
                                    readonly default: 0;
                                    readonly examples: readonly [0.01];
                                };
                                readonly webhookResponses: {
                                    readonly type: "array";
                                    readonly items: {};
                                };
                            };
                        };
                    };
                };
            }];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly statusCode: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [400];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Error"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["startDate is a required argument"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly statusCode: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [401];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Unauthorized"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["Authorization Required"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetUserData: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly partnerCustomerId: {
                    readonly type: "string";
                    readonly default: "YOUR_CUSTOMER_ID";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "It is your unique customer ID that will be used to identify the customer that made the transaction once a webhook is called back to your app";
                };
            };
            readonly required: readonly ["partnerCustomerId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "access-token": {
                    readonly type: "string";
                    readonly default: "YOUR_ACCESS_TOKEN";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your Access Token, you can generate one using our [Refresh Token](ref:refresh-access-token) endpoint";
                };
            };
            readonly required: readonly ["access-token"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly meta: {
                    readonly type: "object";
                    readonly properties: {
                        readonly partnerCustomerId: {
                            readonly type: "string";
                            readonly examples: readonly ["832351"];
                        };
                    };
                };
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly firstName: {
                            readonly type: "string";
                            readonly examples: readonly ["Sandeep"];
                        };
                        readonly lastName: {
                            readonly type: "string";
                            readonly examples: readonly ["Kumar"];
                        };
                        readonly kycStatus: {
                            readonly type: "string";
                            readonly examples: readonly ["APPROVED"];
                        };
                        readonly email: {
                            readonly type: "string";
                            readonly examples: readonly ["sandeep@transak.com"];
                        };
                        readonly dob: {
                            readonly type: "string";
                            readonly examples: readonly ["1997-06-06T00:00:00.000Z"];
                        };
                        readonly mobileNumber: {
                            readonly type: "string";
                            readonly examples: readonly ["+91XXXXXXXXXX"];
                        };
                        readonly address: {
                            readonly type: "object";
                            readonly properties: {
                                readonly addressLine1: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Bengaluru"];
                                };
                                readonly addressLine2: {
                                    readonly type: "string";
                                    readonly examples: readonly [""];
                                };
                                readonly state: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Karnataka"];
                                };
                                readonly city: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Bengaluru"];
                                };
                                readonly postCode: {
                                    readonly type: "string";
                                    readonly examples: readonly ["560048"];
                                };
                                readonly country: {
                                    readonly type: "string";
                                    readonly examples: readonly ["India"];
                                };
                                readonly countryCode: {
                                    readonly type: "string";
                                    readonly examples: readonly ["IN"];
                                };
                            };
                        };
                        readonly createdAt: {
                            readonly type: "string";
                            readonly examples: readonly ["2021-06-19T18:25:08.000Z"];
                        };
                        readonly partnerCustomerId: {
                            readonly type: "string";
                            readonly examples: readonly ["832351"];
                        };
                        readonly partnerApiKey: {
                            readonly type: "string";
                            readonly examples: readonly ["765678-3316-4cbb-8a68-rt7688fgu886"];
                        };
                        readonly kycDocuments: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly type: {
                                        readonly type: "string";
                                        readonly examples: readonly ["addressProof"];
                                    };
                                    readonly side: {
                                        readonly type: "boolean";
                                        readonly default: true;
                                        readonly examples: readonly [false];
                                    };
                                    readonly url: {
                                        readonly type: "string";
                                        readonly examples: readonly ["https://api.transak.com/api/v2/user/get-kyc-image?userId=34234gsf-3erg-42b4-b4e7-435323232&docType=addressProof&side=45343243-b21d-49d0-9f53-343243232"];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly statusCode: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [400];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Bad Request"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["Invalid user id"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly statusCode: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [401];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Unauthorized"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["Authorization Required"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetWebhooks: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly eventID: {
                    readonly type: "string";
                    readonly default: "ORDER_COMPLETED";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by event id (ORDER_COMPLETED, ORDER_CANCELLED, ORDER_CREATED, ORDER_FAILED, ORDER_PROCESSING,ORDER_PAYMENT_VERIFYING))";
                };
                readonly orderID: {
                    readonly type: "string";
                    readonly default: "YOUR_ORDER_ID";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by order id";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "access-token": {
                    readonly type: "string";
                    readonly default: "YOUR_ACCESS_TOKEN";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your Access Token, you can generate one using our [Refresh Token](ref:refresh-access-token) endpoint";
                };
            };
            readonly required: readonly ["access-token"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly meta: {
                    readonly type: "object";
                    readonly properties: {
                        readonly orderID: {
                            readonly type: "string";
                            readonly examples: readonly ["322dc79c-fad2-4df1-bf50-b292191fc953"];
                        };
                        readonly eventID: {
                            readonly type: "string";
                            readonly examples: readonly ["ORDER_COMPLETED"];
                        };
                    };
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly examples: readonly ["670e7c469f2a5dd93fbe4406"];
                            };
                            readonly partnerApiKey: {
                                readonly type: "string";
                                readonly examples: readonly ["d79671a4-b021-4a4f-a444-6862a680a94b"];
                            };
                            readonly createdAt: {
                                readonly type: "string";
                                readonly examples: readonly ["2024-10-15T14:29:26.929Z"];
                            };
                            readonly eventID: {
                                readonly type: "string";
                                readonly examples: readonly ["ORDER_COMPLETED"];
                            };
                            readonly webhookData: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly examples: readonly ["322dc79c-fad2-4df1-bf50-b292191fc953"];
                                    };
                                    readonly walletAddress: {
                                        readonly type: "string";
                                        readonly examples: readonly ["0xD902d7eBF7bc5eCa9EEA22a6Ee9F1A30EBeBEFeE"];
                                    };
                                    readonly createdAt: {
                                        readonly type: "string";
                                        readonly examples: readonly ["2024-10-15T14:29:11.104Z"];
                                    };
                                    readonly status: {
                                        readonly type: "string";
                                        readonly examples: readonly ["COMPLETED"];
                                    };
                                    readonly fiatCurrency: {
                                        readonly type: "string";
                                        readonly examples: readonly ["EUR"];
                                    };
                                    readonly userId: {
                                        readonly type: "string";
                                        readonly examples: readonly ["243a8ce2-9cc6-41a9-aaeb-b0deeb0b19a3"];
                                    };
                                    readonly cryptoCurrency: {
                                        readonly type: "string";
                                        readonly examples: readonly ["ETH"];
                                    };
                                    readonly isBuyOrSell: {
                                        readonly type: "string";
                                        readonly examples: readonly ["BUY"];
                                    };
                                    readonly fiatAmount: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [45];
                                    };
                                    readonly ipAddress: {
                                        readonly type: "string";
                                        readonly examples: readonly ["35.177.158.9"];
                                    };
                                    readonly amountPaid: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [45];
                                    };
                                    readonly paymentOptionId: {
                                        readonly type: "string";
                                        readonly examples: readonly ["sepa_bank_transfer"];
                                    };
                                    readonly walletLink: {
                                        readonly type: "string";
                                        readonly examples: readonly ["https://sepolia.etherscan.io/address/0xD902d7eBF7bc5eCa9EEA22a6Ee9F1A30EBeBEFeE"];
                                    };
                                    readonly quoteId: {
                                        readonly type: "string";
                                        readonly examples: readonly ["20148892-f984-4e3f-8bb7-fba6c0ec9182"];
                                    };
                                    readonly orderProcessingType: {
                                        readonly type: "string";
                                        readonly examples: readonly ["NORMAL"];
                                    };
                                    readonly addressAdditionalData: {
                                        readonly type: "boolean";
                                        readonly default: true;
                                        readonly examples: readonly [false];
                                    };
                                    readonly network: {
                                        readonly type: "string";
                                        readonly examples: readonly ["ethereum"];
                                    };
                                    readonly conversionPrice: {
                                        readonly type: "number";
                                        readonly default: 0;
                                        readonly examples: readonly [0.0004122498271491127];
                                    };
                                    readonly cryptoAmount: {
                                        readonly type: "number";
                                        readonly default: 0;
                                        readonly examples: readonly [0.01788752];
                                    };
                                    readonly totalFeeInFiat: {
                                        readonly type: "number";
                                        readonly default: 0;
                                        readonly examples: readonly [1.61];
                                    };
                                    readonly fiatAmountInUsd: {
                                        readonly type: "number";
                                        readonly default: 0;
                                        readonly examples: readonly [49.1];
                                    };
                                    readonly countryCode: {
                                        readonly type: "string";
                                        readonly examples: readonly ["IN"];
                                    };
                                    readonly stateCode: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Karnataka"];
                                    };
                                    readonly orderChannelType: {
                                        readonly type: "string";
                                        readonly examples: readonly ["WIDGET"];
                                    };
                                    readonly tokenContractAddress: {
                                        readonly type: "string";
                                        readonly examples: readonly ["0x0000000000000000000000000000000000000000"];
                                    };
                                    readonly userKycType: {
                                        readonly type: "string";
                                        readonly examples: readonly ["STANDARD"];
                                    };
                                    readonly cardPaymentData: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly orderId: {
                                                readonly type: "string";
                                                readonly examples: readonly ["322dc79c-fad2-4df1-bf50-b292191fc953"];
                                            };
                                            readonly paymentId: {
                                                readonly type: "string";
                                                readonly examples: readonly ["670e7c387b5777f9332927b6"];
                                            };
                                            readonly pgData: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly liquidityProvider: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["OPENPAYD_MALTA"];
                                                    };
                                                    readonly status: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["CREATED"];
                                                    };
                                                    readonly beneficiaryName: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["Ashutosh Jha"];
                                                    };
                                                    readonly paymentOptions: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly currency: {
                                                                    readonly type: "string";
                                                                    readonly examples: readonly ["EUR"];
                                                                };
                                                                readonly id: {
                                                                    readonly type: "string";
                                                                    readonly examples: readonly ["sepa_bank_transfer"];
                                                                };
                                                                readonly name: {
                                                                    readonly type: "string";
                                                                    readonly examples: readonly ["Bank Transfer Details"];
                                                                };
                                                                readonly fields: {
                                                                    readonly type: "array";
                                                                    readonly items: {
                                                                        readonly type: "object";
                                                                        readonly properties: {
                                                                            readonly name: {
                                                                                readonly type: "string";
                                                                                readonly examples: readonly ["Account Type"];
                                                                            };
                                                                            readonly value: {
                                                                                readonly type: "string";
                                                                                readonly examples: readonly ["Personal"];
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                            readonly liquidityProvider: {
                                                readonly type: "string";
                                                readonly examples: readonly ["OPENPAYD_MALTA"];
                                            };
                                            readonly updatedAt: {
                                                readonly type: "string";
                                                readonly examples: readonly ["2024-10-15T14:29:12.243Z"];
                                            };
                                        };
                                    };
                                    readonly statusHistories: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly status: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["PENDING_DELIVERY_FROM_TRANSAK"];
                                                };
                                                readonly createdAt: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["2024-10-15T14:29:15.542Z"];
                                                };
                                                readonly message: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["*💸 Payment reconciled successfully. Received 45 EUR"];
                                                };
                                                readonly isEmailSentToUser: {
                                                    readonly type: "boolean";
                                                    readonly default: true;
                                                    readonly examples: readonly [false];
                                                };
                                                readonly partnerEventId: {
                                                    readonly type: "string";
                                                    readonly examples: readonly ["ORDER_PROCESSING"];
                                                };
                                            };
                                        };
                                    };
                                    readonly isFirstOrder: {
                                        readonly type: "boolean";
                                        readonly default: true;
                                        readonly examples: readonly [false];
                                    };
                                    readonly updatedAt: {
                                        readonly type: "string";
                                        readonly examples: readonly ["2024-10-15T14:29:19.220Z"];
                                    };
                                    readonly completedAt: {
                                        readonly type: "string";
                                        readonly examples: readonly ["2024-10-15T14:29:26.029Z"];
                                    };
                                    readonly transactionHash: {
                                        readonly type: "string";
                                        readonly examples: readonly ["DUMMY_TX_ID"];
                                    };
                                    readonly transactionLink: {
                                        readonly type: "string";
                                        readonly examples: readonly ["https://sepolia.etherscan.io/tx/DUMMY_TX_ID"];
                                    };
                                    readonly conversionPriceData: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly _id: {
                                                readonly type: "string";
                                                readonly examples: readonly ["a28c76cc-b9e3-4ba4-81fc-0eece6f28559"];
                                            };
                                            readonly id: {
                                                readonly type: "string";
                                                readonly examples: readonly ["a28c76cc-b9e3-4ba4-81fc-0eece6f28559"];
                                            };
                                            readonly createdAt: {
                                                readonly type: "string";
                                                readonly examples: readonly ["2024-10-15T14:29:19.198Z"];
                                            };
                                            readonly fiatCurrency: {
                                                readonly type: "string";
                                                readonly examples: readonly ["EUR"];
                                            };
                                            readonly cryptoCurrency: {
                                                readonly type: "string";
                                                readonly examples: readonly ["ETH"];
                                            };
                                            readonly paymentMethod: {
                                                readonly type: "string";
                                                readonly examples: readonly ["sepa_bank_transfer"];
                                            };
                                            readonly fiatAmount: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [45];
                                            };
                                            readonly network: {
                                                readonly type: "string";
                                                readonly examples: readonly ["ethereum"];
                                            };
                                            readonly cryptoAmount: {
                                                readonly type: "number";
                                                readonly default: 0;
                                                readonly examples: readonly [0.01788752];
                                            };
                                            readonly isBuyOrSell: {
                                                readonly type: "string";
                                                readonly examples: readonly ["BUY"];
                                            };
                                            readonly conversionPrice: {
                                                readonly type: "number";
                                                readonly default: 0;
                                                readonly examples: readonly [0.0004122498711328036];
                                            };
                                            readonly marketConversionPrice: {
                                                readonly type: "number";
                                                readonly default: 0;
                                                readonly examples: readonly [0.00041436312306041164];
                                            };
                                            readonly slippage: {
                                                readonly type: "number";
                                                readonly default: 0;
                                                readonly examples: readonly [0.51];
                                            };
                                            readonly cryptoLiquidityProvider: {
                                                readonly type: "string";
                                                readonly examples: readonly ["transak"];
                                            };
                                            readonly fiatLiquidityProvider: {
                                                readonly type: "string";
                                                readonly examples: readonly ["coinbase"];
                                            };
                                            readonly partnerApiKey: {
                                                readonly type: "string";
                                                readonly examples: readonly ["d79671a4-b021-4a4f-a444-6862a680a94b"];
                                            };
                                            readonly sourceTokenAmount: {
                                                readonly type: "number";
                                                readonly default: 0;
                                                readonly examples: readonly [0.017887521908452348];
                                            };
                                            readonly sourceToken: {
                                                readonly type: "string";
                                                readonly examples: readonly ["ETH"];
                                            };
                                            readonly notes: {
                                                readonly type: "array";
                                                readonly items: {};
                                            };
                                            readonly fiatFeeAmount: {
                                                readonly type: "number";
                                                readonly default: 0;
                                                readonly examples: readonly [1.61];
                                            };
                                            readonly feeDecimal: {
                                                readonly type: "number";
                                                readonly default: 0;
                                                readonly examples: readonly [0.03577777777777778];
                                            };
                                            readonly swaps: {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly sourceCurrency: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["EUR"];
                                                        };
                                                        readonly destinationCurrency: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["USDT"];
                                                        };
                                                        readonly sourceAmount: {
                                                            readonly type: "integer";
                                                            readonly default: 0;
                                                            readonly examples: readonly [45];
                                                        };
                                                        readonly destinationAmount: {
                                                            readonly type: "number";
                                                            readonly default: 0;
                                                            readonly examples: readonly [49.10881925158181];
                                                        };
                                                        readonly paymentMethod: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["sepa_bank_transfer"];
                                                        };
                                                        readonly liquidityProvider: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["coinbase"];
                                                        };
                                                        readonly conversionPrice: {
                                                            readonly type: "number";
                                                            readonly default: 0;
                                                            readonly examples: readonly [1.0913070944795957];
                                                        };
                                                        readonly feeInSourceAmount: {
                                                            readonly type: "integer";
                                                            readonly default: 0;
                                                            readonly examples: readonly [0];
                                                        };
                                                        readonly networkFeeInSourceAmount: {
                                                            readonly type: "integer";
                                                            readonly default: 0;
                                                            readonly examples: readonly [0];
                                                        };
                                                        readonly marketConversionPrice: {
                                                            readonly type: "number";
                                                            readonly default: 0;
                                                            readonly examples: readonly [1.0913070944795957];
                                                        };
                                                        readonly isNonCustodial: {
                                                            readonly type: "boolean";
                                                            readonly default: true;
                                                            readonly examples: readonly [false];
                                                        };
                                                        readonly isFiatliquidityProvider: {
                                                            readonly type: "boolean";
                                                            readonly default: true;
                                                            readonly examples: readonly [true];
                                                        };
                                                        readonly isFiatPartnerDirectCryptoDeposit: {
                                                            readonly type: "boolean";
                                                            readonly default: true;
                                                            readonly examples: readonly [false];
                                                        };
                                                        readonly isFiatPartnerAccountWalletDeposit: {
                                                            readonly type: "boolean";
                                                            readonly default: true;
                                                            readonly examples: readonly [false];
                                                        };
                                                        readonly liquidityProviderData: {
                                                            readonly type: "boolean";
                                                            readonly default: true;
                                                            readonly examples: readonly [false];
                                                        };
                                                        readonly originalDestinationAmount: {
                                                            readonly type: "number";
                                                            readonly default: 0;
                                                            readonly examples: readonly [49.10881925158181];
                                                        };
                                                    };
                                                };
                                            };
                                            readonly fees: {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly name: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["Transak fee"];
                                                        };
                                                        readonly value: {
                                                            readonly type: "integer";
                                                            readonly default: 0;
                                                            readonly examples: readonly [1];
                                                        };
                                                        readonly id: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["transak_fee"];
                                                        };
                                                        readonly ids: {
                                                            readonly type: "array";
                                                            readonly items: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["transak_fee"];
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                            readonly fiatAmountInUsd: {
                                                readonly type: "number";
                                                readonly default: 0;
                                                readonly examples: readonly [49.1];
                                            };
                                            readonly internalFees: {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly name: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["Network/Exchange fee"];
                                                        };
                                                        readonly id: {
                                                            readonly type: "string";
                                                            readonly examples: readonly ["network_fee"];
                                                        };
                                                        readonly value: {
                                                            readonly type: "number";
                                                            readonly default: 0;
                                                            readonly examples: readonly [0.16];
                                                        };
                                                    };
                                                };
                                            };
                                            readonly cost: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly ethPriceInLocalCurrency: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [2413.3421734400004];
                                                    };
                                                    readonly gasCostinLocalCurrency: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0.16410726779392];
                                                    };
                                                    readonly transakMinimumFee: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [1];
                                                    };
                                                    readonly transakFeeAmount: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [1];
                                                    };
                                                    readonly fiatLiquidityProviderFee: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0];
                                                    };
                                                    readonly gasCostinLocalCurrencyByFiatPartner: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0];
                                                    };
                                                    readonly gasCostinLocalCurrencyByCryptoPartner: {
                                                        readonly type: "integer";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0];
                                                    };
                                                    readonly partnerFeeDecimal: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0.01];
                                                    };
                                                    readonly partnerFeeInLocalCurrency: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0.45];
                                                    };
                                                    readonly totalFeeDecimal: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0.03577777777777778];
                                                    };
                                                    readonly totalFeeAmount: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [1.61];
                                                    };
                                                    readonly gasCurrency: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["ETH"];
                                                    };
                                                    readonly gasInNativeToken: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0.000068];
                                                    };
                                                    readonly gasCurrencyRateInUsd: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [0.0003798006806028196];
                                                    };
                                                    readonly totalAmountChargedByTransak: {
                                                        readonly type: "number";
                                                        readonly default: 0;
                                                        readonly examples: readonly [1.6141072677939199];
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly partnerFeeInLocalCurrency: {
                                        readonly type: "number";
                                        readonly default: 0;
                                        readonly examples: readonly [0.45];
                                    };
                                };
                            };
                            readonly webhookResponse: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly body: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly success: {
                                                readonly type: "boolean";
                                                readonly default: true;
                                                readonly examples: readonly [false];
                                            };
                                            readonly error: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly message: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["Token \"e6228527-526f-44a8-a8c1-a2f7a8bb2927\" not found"];
                                                    };
                                                    readonly id: {
                                                        readonly type: "string";
                                                        readonly examples: readonly [""];
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly statusCode: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [404];
                                    };
                                    readonly statusMessage: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Not Found"];
                                    };
                                    readonly url: {
                                        readonly type: "string";
                                        readonly examples: readonly ["https://webhook.site/e6228527-526f-44a8-a8c1-a2f7a8bb2927"];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly statusCode: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [401];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Unauthorized"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["Authorization Required"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const RefreshAccessToken: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["apiKey"];
        readonly properties: {
            readonly apiKey: {
                readonly type: "string";
                readonly description: "Your Api Key which you can get it from <a href=\"https://dashboard.transak.com\" target=\"_blank\">Transak Partner Dashboard</a> for respective environment";
                readonly default: "YOUR_API_KEY";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "api-secret": {
                    readonly type: "string";
                    readonly default: "YOUR_API_SECRET";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your api secret, you can get it from  <a href=\"https://dashboard.transak.com\" target=\"_blank\">Transak Partner Dashboard</a>  for respective environment";
                };
            };
            readonly required: readonly ["api-secret"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly accessToken: {
                            readonly type: "string";
                            readonly examples: readonly ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBUElfS0VZIjoiZDc5NjcxYTQtYjAyMS00YTRmLWE0NDQtNjg2MmE2ODBhOTRiIiwiaWF0IjoxNzI5MTcxMDI1LCJleHAiOjE3Mjk3NzU4MjV9.IhlgDVlYcctmfUfyZv-CMylZpJK5-b3hD40cLLsWwU0"];
                        };
                        readonly expiresAt: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [1729775825];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly statusCode: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [400];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Bad Request"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["Invalid api-secret. Please generate new api-secret from Partner Dashboard"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly statusCode: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [401];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Unauthorized"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["Authorization Required"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const TestWebhook: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "access-token": {
                    readonly type: "string";
                    readonly default: "YOUR_ACCESS_TOKEN";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your Access Token, you can generate one using our [Refresh Token](ref:refresh-access-token) endpoint";
                };
            };
            readonly required: readonly ["access-token"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly meta: {
                    readonly type: "object";
                    readonly properties: {
                        readonly success: {
                            readonly type: "boolean";
                            readonly default: true;
                            readonly examples: readonly [true];
                        };
                        readonly webhookURL: {
                            readonly type: "string";
                            readonly examples: readonly ["www.transak.com"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly statusCode: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [401];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Unauthorized"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["Authorization Required"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UpdateWebhook: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["webhookURL"];
        readonly properties: {
            readonly webhookURL: {
                readonly type: "string";
                readonly description: "Enter your new webhook URL";
                readonly default: "www.transak.com";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "access-token": {
                    readonly type: "string";
                    readonly default: "YOUR_ACCESS_TOKEN";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your Access Token, you can generate one using our [Refresh Token](ref:refresh-access-token) endpoint";
                };
            };
            readonly required: readonly ["access-token"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly meta: {
                    readonly type: "object";
                    readonly properties: {
                        readonly success: {
                            readonly type: "boolean";
                            readonly default: true;
                            readonly examples: readonly [true];
                        };
                    };
                };
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["Your request to update webhook url is successfully processed."];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly statusCode: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [400];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Bad Request"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["Invalid request payload input"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly statusCode: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [401];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Unauthorized"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["Authorization Required"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { GetOrderByOrderId, GetOrders, GetUserData, GetWebhooks, RefreshAccessToken, TestWebhook, UpdateWebhook };
