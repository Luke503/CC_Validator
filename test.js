describe('ActionServiceFunctions', () => {

    // test for isBulkProcess for a single requestId
    test('isBulkProcess for a single requestId', () => {
        expect(isBulkProcess('123')).toBe(false);
    });

    // test for isBulkProcess for a multiple requestIds
    test('isBulkProcess for a multiple requestIds', () => {
        expect(isBulkProcess('123,456')).toBe(true);
    });

    // test for prepareBulkJobUrl for missing requestId
    test('prepareBulkJobUrl for missing requestId', () => {
        expect(prepareBulkJobUrl('%s')).toBe('/casemanagement/%s');
    });

    // test for prepareBulkJobUrl for a single requestId
    test('prepareBulkJobUrl for a single requestId', () => {
        expect(prepareBulkJobUrl('%s', 'ACCEPT')).toBe('/casemanagement/V1/transactions/123/decision?action=ACCEPT');
    });

    // test for prepareBulkJobUrl for a multiple requestIds
    test('prepareBulkJobUrl for a multiple requestIds', () => {
        expect(prepareBulkJobUrl('%s', 'ACCEPT_SETTLE')).toBe('/casemanagement/V1/transactions/123,456/decision?action=ACCEPT_SETTLE');
    });

    // test for prepareJobUrl for missing requestId
    test('prepareJobUrl for missing requestId', () => {
        expect(prepareJobUrl('%s')).toBe('/casemanagement/%s');
    });

    // test for prepareJobUrl for a single requestId
    test('prepareJobUrl for a single requestId', () => {
        expect(prepareJobUrl('%s', '123', 'ACCEPT')).toBe('/casemanagement/V1/transactions/123/decision?action=ACCEPT');
    });

    // test for prepareJobUrl for a multiple requestIds
    test('prepareJobUrl for a multiple requestIds', () => {
        expect(prepareJobUrl('%s', '123,456', 'ACCEPT_SETTLE')).toBe('/casemanagement/V1/transactions/123,456/decision?action=ACCEPT_SETTLE');
    });

    // test for process for missing requestId
    test('process for missing requestId', () => {
        expect(process(cmJobUrl.ACCEPT_PATH, cmJobType.ACCEPT)).toEqual({
            jobUrl: '/casemanagement/V1/transactions/%s/decision?action=ACCEPT',
            payload: {}
        });
    });

    // test for process for a single requestId
    test('process for a single requestId', () => {
        expect(process(cmJobUrl.ACCEPT_PATH, cmJobType.ACCEPT, '123')).toEqual({
            jobUrl: '/casemanagement/V1/transactions/123/decision?action=ACCEPT',
            payload: {}
        });
    });

    // test for process for a multiple requestIds
    test('process for a multiple requestIds', () => {
        expect(process(cmJobUrl.ACCEPT_PATH, cmJobType.ACCEPT_SETTLE, '123,456')).toEqual({
            jobUrl: '/casemanagement/V1/transactions/123,456/decision?action=ACCEPT_SETTLE',
            payload: {}
        });
    });

        // test addReviewComments
    test('addReviewComments'), () => {
        let comment = 'ADD_NOTE';
        let requestIds = ['32432432434'];
        let ajaxCall = addReviewComments(comment, requestIds);
        expect(ajaxCall.data).toEqual(payloadParams[cmJobType.ADD_NOTE]);
        expect(ajaxCall.type).toEqual('PUT');
        expect(ajaxCall.url).toEqual(prepareJobUrl(cmJobUrl.ADD_NOTE_PATH, requestIds, cmJobType.ADD_NOTE));
    }
});
