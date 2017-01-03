import {
  countryCode
} from 'utils/countryUtils';

describe('countryUtils', function() {
  it('countryCode should return country id.', function() {
    expect(countryCode('IN')).to.deep.equal('104');
  });
});
