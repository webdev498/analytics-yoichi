import React from 'react';

import { mount, shallow } from 'enzyme';
import {spy} from 'sinon';

import PieChart from 'components/charts/PieChart';
import {wrapThemeProvider} from '../../testUtils';

let props = {
  data: {
    rows: [],
    columns: [],
    pieProps: {
      piePercentage: '89',
      assetPercentage: '11'
    },
    pieJson: {
      meta: {
        api: {
          reportId: 'apiReportId'
        }
      },
      chart: {
        options: {},
        data: {
          fieldMapping: [
            {
              reportId: 'taf_asset_count_time_shifted',
              columns: [
                {
                  name: '0.0',
                  type: 'index'
                }
              ],
              returnValueIs: 'countValue'
            },
            {
              reportId: 'taf_total_usage',
              columns: [
                {
                  name: 'date',
                  type: 'name'
                }
              ],
              returnValueIs: 'totalValue'
            },
            {
              reportId: 'taf_top_talkers_connections',
              columns: [
                {
                  name: 'connections',
                  type: 'name'
                }
              ],
              returnValueIs: 'topValue'
            }
          ]
        },
        legends: {
          title: [
            'Connections',
            'Assets'
          ],
          label: 'Used by'
        }
      }
    }
  },
  attributes: {
    id: 'pieChart'
  }
};

function renderPieChart(propsOptions) {
  props = Object.assign({}, props, propsOptions);

  let component = shallow(wrapThemeProvider(<PieChart {...props} />));
  return component.find('PieChart');
}

function mountPieChart(propsOptions) {
  props = Object.assign({}, props, propsOptions);

  let component = mount(<PieChart {...props} />);
  return component;
}

describe('<PieChart />', function() {
  it('exists', () => {
    expect(PieChart).to.exist;
  });

  it('should have correct props', () => {
    const component = renderPieChart({});
    expect(component.props().attributes).to.be.defined;
    expect(component.props().attributes.id).to.be.defined;
    expect(component.props().data).to.be.defined;
    expect(component.props().data).to.be.a('object');
    expect(component.props().type).to.be.defined;
    expect(component.props().type).to.be.a('string');
    expect(component.type()).to.equal(PieChart);
  });
});
