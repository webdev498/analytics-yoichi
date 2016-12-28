import {
  getCountryIDByCountryCode
} from 'utils/countryUtils';

describe('countryUtils', function() {
  it('getCountryIDByCountryCode should return country id.', function() {
    expect(getCountryIDByCountryCode('IN')).to.deep.equal('104');
  });
});
