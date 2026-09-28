'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

global.window = {};
require('./drug-reference.js');
const records = global.window.DRUG_REFERENCE;

test('generated reference catalog contains approval and tender records', () => {
  assert.ok(records.length > 4000);
  assert.ok(records.some((record) => record.type === 'approval'));
  assert.ok(records.some((record) => record.type === 'tender'));
  assert.ok(records.some((record) => record.name.toLowerCase().includes('ibuprofen') && record.indication));
  assert.ok(records.some((record) => record.type === 'tender' && record.specification && record.unitSize));
});

test('reference records do not import stock, price, or ignored source identifiers', () => {
  for (const record of records) {
    assert.equal('onHand' in record, false);
    assert.equal('price' in record, false);
    assert.equal('batch' in record, false);
    assert.equal('expiry' in record, false);
    assert.equal('serial' in record, false);
    assert.equal('drugCode' in record, false);
    assert.equal('approvalDate' in record, false);
    assert.equal('requirement' in record, false);
  }
});