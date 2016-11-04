import anomalyChart from '../../server/components/anomalyChart';

function getCtx(data) {
  return  {
      tempData: {
        clone() {
          return {
            json() {
              return Object.assign({}, data)
            }
          }
        }
      }
    }
}

// DAL stands for Data Abstraction Layer.
describe('Anomaly Chart DAL', () => {
  it("exists", async function() {
    const result = await anomalyChart;
    expect(result).to.exist;
  });

  it("returns undefined if uiConfig is not defined", async function() {
    const ctx = getCtx();
    const result = await anomalyChart(ctx);
    expect(result).to.be.undefined;
  });

  it("returns undefined if rows are empty array", async function() {
    let ctx = getCtx({
      uiConfig: { type: 'combination' },
      rows: [],
      columns: []
    });

    const result = await anomalyChart(ctx);
    expect(result).to.be.undefined;
  });

  it("returns undefined if it is an Object of graphs Objects but don't have uiConfig", async function() {
    let ctx = getCtx({ 0: {} });

    const result = await anomalyChart(ctx);
    expect(result).to.be.undefined;
  });

  it("returns undefined if it is an Object of graphs Objects but rows are empty", async function() {
    let ctx = getCtx({ 0: {uiConfig: { type: 'combination' }, rows: [], columns: []} });
    const result = await anomalyChart(ctx);
    expect(result).to.be.undefined;
  });
})