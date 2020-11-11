module.exports = function configJSON(req) {
  return {
    workflowApiVersion: '1.1',
    metaData: {
      // the location of our icon file
      icon: `images/icon.svg`,
      category: 'customer'
    },
    // For Custom Activity this must say, "REST"
    type: 'REST',
    lang: {
      'en-US': {
        name: 'AWS',
        description: 'Send data'
      }
    },
    arguments: {
      execute: {
        // See: https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/how-data-binding-works.htm
        inArguments: [
                              {
              contactInd: "{{Contact.Indicator}}"
            }
        ],
        outArguments: [],
        // Fill in the host with the host that this is running on.
        // It must run under HTTPS
        // url: `https://${req.headers.host}/modules/discount-code/execute`,
        url: 'https://vn60kxue1l.execute-api.eu-central-1.amazonaws.com/StagefiN',
    // The amount of time we want Journey Builder to wait before cancel the request. Default is 60000, Minimal is 1000
        timeout: 10000,
        // how many retrys if the request failed with 5xx error or network error. default is 0
        retryCount: 3,
        // wait in ms between retry.
        retryDelay: 1000,
        // The number of concurrent requests Journey Builder will send all together
        concurrentRequests: 5
      }
    },
    configurationArguments: {
      publish: {
        url: `https://${req.headers.host}/modules/discount-code/publish`
      },
      validate: {
        url: `https://${req.headers.host}/modules/discount-code/validate`
      },
      stop: {
        url: `https://${req.headers.host}/modules/discount-code/stop`
      }
    },
    userInterfaces: {
      configurationSupportsReadOnlyMode : true,
      configInspector: {
        size: 'scm-lg',
        emptyIframe: true
      }
    },
     outcomes: [{
        arguments: {
          branchResult: 'no_activity'
        },
        metaData: {
          label: 'No Activity'
        }
      },
      {
        arguments: {
          branchResult: 'viewed_item'
        },
        metaData: {
          label: 'Viewed Item'
        }
      },
    schema: {
      arguments: {
        execute: {
          inArguments: [],
          outArguments: [{
            discountCode: {
              dataType: 'Text',
              direction: 'out',
              access: 'visible'
            },
            discount: {
              dataType: 'Number',
              direction: 'out',
              access: 'visible'
            }
          }]
        }
      }
    }
  };
};
