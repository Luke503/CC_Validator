describe('ActionServiceFunctions', () => {

    test('isBulkProcess for a single requestId', () => {
        expect(isBulkProcess('123')).toBe(false);
        expect(isBulkProcess('123,456')).toBe(true);
    });

    // for testing all functions only use ADD_NOTE_BULK and ADD_NOTE for now.
    test('prepareJobUrl', () => {
        expect(prepareJobUrl(cmJobUrl.ADD_NOTE_PATH, '63463764564536', cmJobType.ADD_NOTE)).toBe('/casemanagement/V1/transactions/63463764564536/comments?action=ADD_NOTE');
    }
    );

    test('prepareBulkJobUrl', () => {
        expect(prepareBulkJobUrl(cmJobUrl.ADD_NOTE_PATH, cmJobType.ADD_NOTE)).toBe('/casemanagement/V1/transactions/comments?action=ADD_NOTE');
    }
    );

    test('process', () => {
        expect(process(cmJobUrl.ADD_NOTE_PATH, cmJobType.ADD_NOTE, '63463764564536')).toEqual({
            jobUrl: '/casemanagement/V1/transactions/63463764564536/comments?action=ADD_NOTE',
            payload: { comment: 'comment' }
        });
        expect(process(cmJobUrl.ADD_NOTE_PATH, cmJobType.ADD_NOTE, '63463764564536,63463764564537')).toEqual({
            jobUrl: '/casemanagement/V1/transactions/comments?action=ADD_NOTE',
            payload: { comment: 'comment', requestIds: 'requestIds' }
        });
    }
    );

    test('addReviewComments', () => {
        expect(addReviewComments('hey single', '63463764564536')).toEqual({
            jobUrl: '/casemanagement/V1/transactions/63463764564536/comments?action=ADD_NOTE',
            data: { comment: 'hey single', requestIds: '63463764564536' },
            type: 'PUT'
        });
        expect(addReviewComments('hey bulk', '63463764564536,63463764564537')).toEqual({
            jobUrl: '/casemanagement/V1/transactions/comments?action=ADD_NOTE',
            data: { comment: 'hey bulk', requestIds: '63463764564536,63463764564537' },
            type: 'PUT'
        });
    }
    );
}
);
