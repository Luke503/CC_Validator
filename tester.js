
function transformResponse(apiResponse) {
    let serviceResponse = {responseObject:{}};
    let status = {};
    // determine if apiResponse is an error or success response
    if (apiResponse.ERROR) {
        status = apiResponse.ERROR[0].code;
    } else if (apiResponse.SKIP) {
        status = apiResponse.SKIP[0].code;
    } else if (apiResponse.SUCCESS) {
        status = apiResponse.SUCCESS[0].code;
    }
    if (status !== undefined) {
        switch (status) {
            case 'SUCCESS':
                serviceResponse.responseObject["successList"] = apiResponse.SUCCESS;
                serviceResponse.responseCode = { name: "OK" };
                serviceResponse.statusBean = { code: serviceResponse.successList[0].result.messageKey, 
                    message: serviceResponse.successList[0].message,
                    statusType: { name: "SUCCESS" } }};
                break;
            case 'ERROR':
                serviceResponse.responseObject["errorList"] = apiResponse.ERROR;
                serviceResponse.responseCode = { name: "ERROR" };
                serviceResponse.statusBean = { code: serviceResponse.errorList[0].result.messageKey,
                    message: serviceResponse.errorList[0].message,
                    statusType: { name: "ERROR" } };
                break;
            case 'SKIP':
                serviceResponse.responseObject["skipList"] = apiResponse.SKIP;
                serviceResponse.responseCode = { name: "SKIP" };
                serviceResponse.statusBean = { code: serviceResponse.skipList[0].result.messageKey,
                    message: serviceResponse.skipList[0].message,
                    statusType: { name: "SKIP" } };
                break;
            case 'NoChange':
                serviceResponse.responseObject = { name: "NoChange" };
                serviceResponse.responseCode = { name: "OK" };
                serviceResponse.statusBean = { code: serviceResponse.responseObject.name,
                    message: serviceResponse.responseObject.name,
                    statusType: { name: "SUCCESS" } };
                break;
            default:
                serviceResponse.responseObject = { name: "ERROR" };
                serviceResponse.responseCode = { name: "UNKNOWN" };
                serviceResponse.statusBean = { code: serviceResponse.responseObject.name,
                    message: serviceResponse.responseObject.name,
                    statusType: { name: "ERROR" } };
                break;
        }
    } 
    return serviceResponse;
}

