// smithy-typescript generated code
import { RuleSetObject } from "@aws-sdk/util-endpoints";

export const ruleSet: RuleSetObject = {
  version: "1.0",
  parameters: {
    Region: {
      builtIn: "AWS::Region",
      required: false,
      documentation: "The AWS region used to dispatch the request.",
      type: "String",
    },
    UseFIPS: {
      builtIn: "AWS::UseFIPS",
      required: true,
      default: false,
      documentation:
        "When true, send this request to the FIPS-compliant regional endpoint. If the configured endpoint does not have a FIPS compliant endpoint, dispatching the request will return an error.",
      type: "Boolean",
    },
    Endpoint: {
      builtIn: "SDK::Endpoint",
      required: false,
      documentation: "Override the endpoint used to send this request",
      type: "String",
    },
  },
  rules: [
    {
      conditions: [
        {
          fn: "aws.partition",
          argv: [
            {
              ref: "Region",
            },
          ],
          assign: "PartitionResult",
        },
      ],
      type: "tree",
      rules: [
        {
          conditions: [
            {
              fn: "isSet",
              argv: [
                {
                  ref: "Endpoint",
                },
              ],
            },
            {
              fn: "parseURL",
              argv: [
                {
                  ref: "Endpoint",
                },
              ],
              assign: "url",
            },
          ],
          type: "tree",
          rules: [
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseFIPS",
                    },
                    true,
                  ],
                },
              ],
              error: "Invalid Configuration: FIPS and custom endpoint are not supported",
              type: "error",
            },
            {
              conditions: [],
              endpoint: {
                url: {
                  ref: "Endpoint",
                },
                properties: {},
                headers: {},
              },
              type: "endpoint",
            },
          ],
        },
        {
          conditions: [],
          type: "tree",
          rules: [
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    true,
                    {
                      fn: "getAttr",
                      argv: [
                        {
                          ref: "PartitionResult",
                        },
                        "supportsDualStack",
                      ],
                    },
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        {
                          ref: "UseFIPS",
                        },
                        true,
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [
                        {
                          fn: "booleanEquals",
                          argv: [
                            true,
                            {
                              fn: "getAttr",
                              argv: [
                                {
                                  ref: "PartitionResult",
                                },
                                "supportsFIPS",
                              ],
                            },
                          ],
                        },
                      ],
                      type: "tree",
                      rules: [
                        {
                          conditions: [],
                          endpoint: {
                            url: "https://resource-explorer-2-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                            properties: {},
                            headers: {},
                          },
                          type: "endpoint",
                        },
                      ],
                    },
                    {
                      conditions: [],
                      error: "FIPS is enabled but this partition does not support FIPS",
                      type: "error",
                    },
                  ],
                },
                {
                  conditions: [],
                  endpoint: {
                    url: "https://resource-explorer-2.{Region}.{PartitionResult#dualStackDnsSuffix}",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
              ],
            },
            {
              conditions: [],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        {
                          ref: "UseFIPS",
                        },
                        true,
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [
                        {
                          fn: "booleanEquals",
                          argv: [
                            true,
                            {
                              fn: "getAttr",
                              argv: [
                                {
                                  ref: "PartitionResult",
                                },
                                "supportsFIPS",
                              ],
                            },
                          ],
                        },
                      ],
                      type: "tree",
                      rules: [
                        {
                          conditions: [],
                          endpoint: {
                            url: "https://resource-explorer-2-fips.{Region}.{PartitionResult#dnsSuffix}",
                            properties: {},
                            headers: {},
                          },
                          type: "endpoint",
                        },
                      ],
                    },
                    {
                      conditions: [],
                      error: "FIPS is enabled but this partition does not support FIPS",
                      type: "error",
                    },
                  ],
                },
                {
                  conditions: [],
                  endpoint: {
                    url: "https://resource-explorer-2.{Region}.{PartitionResult#dnsSuffix}",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
