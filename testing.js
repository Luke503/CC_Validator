describe('transformResponse', function () {
    it('should return a service response object', function () {
        let apiResponse = {
            "SUCCESS": [{
                "code": "SUCCESS",
                "message": "Successful operation",
                "invalidInput": null,
                "result": {
                    "messageKey": 'SUCCESS'
                },
                "message": 'SUCCESS'
            }],
        };
        let serviceResponse = transformResponse(apiResponse);
        expect(serviceResponse).toBe({
            responseObject: {
                successList: [{
                    code: 'SUCCESS',
                    message: 'Successful operation',
                    invalidInput: null,
                    result: {
                        messageKey: 'SUCCESS'
                    },
                    message: 'SUCCESS'
                }]
            },
            responseCode: {name: 'OK'},
            statusBean: { code: 'SUCCESS', message: 'Successful operation', statusType: {name: 'SUCCESS'}}
        });
    });
});
