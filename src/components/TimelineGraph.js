import React from 'react';
// import $ from 'jquery';
import {Colors} from 'theme/colors';
import moment from 'moment';
import {
  formatBytes,
  formatMicroseconds,
  formatDateInLocalTimeZone,
  getEventTypeString
} from 'utils/utils';

/*const data = {
  'total': 354,
  'next': 200,
  'columns': [
    {
      'name': 'json',
      'displayName': 'json',
      'columnType': 'ATTRIBUTE',
      'dataType': 'OBJECT',
      'sortable': true
    }
  ],
  'sorts': [
    {
      'field': 'date',
      'order': 'DESC'
    }
  ],
  'rows': [
    [
      {
        'date': '2016-08-20T12:00:31.702',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.702',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPTPx1NNRKTOKOOSKQMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Viettel Corporation',
          'country': 'VN',
          'port': 8080,
          'city': 'Cho Ha',
          'ipLowBits': 1934156328,
          'ip': '115.72.226.40',
          'name': '115.72.226.40',
          'coordinates': {
            'lon': 106.60000610351562,
            'lat': 21.416702270507812
          },
          'reputation': [

          ],
          'region': '71',
          'asn': 7552
        },
        'micros': 732,
        'id': 'KFcSsWbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63373,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'file'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.628',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.628',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPQRx1SNKNSSKOOVKNOPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Chinanet',
          'country': 'CN',
          'port': 8080,
          'city': 'Kunming',
          'ipLowBits': 1034347899,
          'ip': '61.166.229.123',
          'name': '61.166.229.123',
          'coordinates': {
            'lon': 102.71829223632812,
            'lat': 25.038894653320312
          },
          'reputation': [

          ],
          'region': '29',
          'asn': 4134
        },
        'micros': 722,
        'id': 'ccaDVmbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63345,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.600',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.600',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPPRx1NPUKNURKNPVKONNx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'AVANZADAS INFORMATICAS Y TELECOMUNICACIONES SAITEL',
          'country': 'EC',
          'port': 8080,
          'ipLowBits': 2327415763,
          'ip': '138.185.139.211',
          'name': '138.185.139.211',
          'coordinates': {
            'lon': -77.5,
            'lat': -2.0
          },
          'reputation': [

          ],
          'asn': 263805
        },
        'micros': 719,
        'id': 'cbQMvGbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63335,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.584',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.584',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPOVx1NNTKONUKOQPKUUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'National Internet Backbone',
          'country': 'IN',
          'port': 8080,
          'city': 'Bangalore',
          'ipLowBits': 1977283416,
          'ip': '117.218.243.88',
          'name': '117.218.243.88',
          'coordinates': {
            'lon': 77.58331298828125,
            'lat': 12.983306884765625
          },
          'reputation': [

          ],
          'region': '19',
          'asn': 9829
        },
        'micros': 717,
        'id': 'L_p86GbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63329,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'ssh'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.572',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.572',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPOQx1NMNKOTKNMSKPVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'CNCGROUP China169 Backbone',
          'country': 'CN',
          'port': 8080,
          'city': 'Hebei',
          'ipLowBits': 1696295463,
          'ip': '101.27.106.39',
          'name': '101.27.106.39',
          'coordinates': {
            'lon': 115.27499389648438,
            'lat': 39.88969421386719
          },
          'reputation': [

          ],
          'region': '10',
          'asn': 4837
        },
        'micros': 711,
        'id': 'L-vW42bOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63324,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.464',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.464',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPMPx1QTKNUSKVKRUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'CA',
          'port': 8080,
          'city': 'Ottawa',
          'ipLowBits': 800721210,
          'ip': '47.186.9.58',
          'name': '47.186.9.58',
          'coordinates': {
            'lon': -75.82649993896484,
            'lat': 45.34330749511719
          },
          'reputation': [

          ],
          'region': 'ON'
        },
        'micros': 698,
        'id': 'D2by2mbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63303,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'ssh'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.442',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.442',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOVQx1NQVKSSKONVKUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Cogent Communications',
          'country': 'US',
          'port': 8080,
          'ipLowBits': 2504186632,
          'ip': '149.66.219.8',
          'name': '149.66.219.8',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ],
          'asn': 174
        },
        'micros': 696,
        'id': 'D0X9UWbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63294,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.410',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.410',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOUQx1NOSKNMPKNRQKOOSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Softbank BB Corp.',
          'country': 'JP',
          'port': 8080,
          'ipLowBits': 2120719074,
          'ip': '126.103.154.226',
          'name': '126.103.154.226',
          'coordinates': {
            'lon': 139.69000244140625,
            'lat': 35.69000244140625
          },
          'reputation': [

          ],
          'asn': 17676
        },
        'micros': 689,
        'id': 'C7tQ12bOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63284,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'ip'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.362',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.362',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOTMx1NPSKNNKNOTKORMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Dearborn',
          'ipLowBits': 2282455034,
          'ip': '136.11.127.250',
          'name': '136.11.127.250',
          'coordinates': {
            'lon': -83.17630004882812,
            'lat': 42.322296142578125
          },
          'reputation': [

          ],
          'region': 'MI'
        },
        'micros': 687,
        'id': 'cgM-YWbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63270,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.352',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.352',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOSRx1OOPKNQOKNMUKNQPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Long Distance & Mobile Business Group',
          'country': 'TW',
          'port': 8080,
          'city': 'Taipei',
          'ipLowBits': 3750653071,
          'ip': '223.142.108.143',
          'name': '223.142.108.143',
          'coordinates': {
            'lon': 121.52499389648438,
            'lat': 25.039199829101562
          },
          'reputation': [

          ],
          'region': '03',
          'asn': 17421
        },
        'micros': 682,
        'id': 'H8oMkmbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63265,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'ip'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.328',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.328',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPORQx1TTKONOKRPKSUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Telenor A/S',
          'country': 'DK',
          'port': 8080,
          'ipLowBits': 1305752900,
          'ip': '77.212.53.68',
          'name': '77.212.53.68',
          'coordinates': {
            'lon': 12.56829833984375,
            'lat': 55.67610168457031
          },
          'reputation': [

          ],
          'asn': 9158
        },
        'micros': 681,
        'id': 'C4SwVGbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63254,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.292',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.292',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOPUx1SOKSKOOSKNQRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'BT Public Internet Service',
          'country': 'GB',
          'port': 8080,
          'ipLowBits': 1040638609,
          'ip': '62.6.226.145',
          'name': '62.6.226.145',
          'coordinates': {
            'lon': -0.1300048828125,
            'lat': 51.5
          },
          'reputation': [

          ],
          'asn': 2856
        },
        'micros': 680,
        'id': 'IAvQqWbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63238,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'ssl'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.288',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.288',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOPSx1NPSKPKPMKNVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Dearborn',
          'ipLowBits': 2281905683,
          'ip': '136.3.30.19',
          'name': '136.3.30.19',
          'coordinates': {
            'lon': -83.17630004882812,
            'lat': 42.322296142578125
          },
          'reputation': [

          ],
          'region': 'MI'
        },
        'micros': 680,
        'id': 'IAh1R2bOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63236,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'http'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.264',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.264',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOOUx1VVKNSTKVKVPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 1671891293,
          'ip': '99.167.9.93',
          'name': '99.167.9.93',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 677,
        'id': 'H_vLEGbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63228,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.208',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.208',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOMTx1SPKNNRKNNSKNRUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'MCI Communications Services, Inc. d/b/a Verizon Business',
          'country': 'US',
          'port': 8080,
          'city': 'Linden',
          'ipLowBits': 1064531102,
          'ip': '63.115.116.158',
          'name': '63.115.116.158',
          'coordinates': {
            'lon': -74.24939727783203,
            'lat': 40.62469482421875
          },
          'reputation': [

          ],
          'region': 'NJ',
          'asn': 701
        },
        'micros': 672,
        'id': 'ym9P8GbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63207,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'ssh'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.198',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.198',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOMOx1PTKNPUKNQRKNOx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'EWE TEL GmbH',
          'country': 'DE',
          'port': 8080,
          'ipLowBits': 629838092,
          'ip': '37.138.145.12',
          'name': '37.138.145.12',
          'coordinates': {
            'lon': 9.0,
            'lat': 51.0
          },
          'reputation': [

          ],
          'asn': 9145
        },
        'micros': 672,
        'id': 'ymZ2S2bNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63202,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.194',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.194',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOMMx1STKQOKNPOKNUSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Rio Rancho',
          'ipLowBits': 1126859962,
          'ip': '67.42.132.186',
          'name': '67.42.132.186',
          'coordinates': {
            'lon': -106.72319793701172,
            'lat': 35.2467041015625
          },
          'reputation': [

          ],
          'region': 'NM'
        },
        'micros': 671,
        'id': 'ymLz2WbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63200,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'dns'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.148',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.148',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNVNx1VQKONMKOOKVTx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Ziggo B.V.',
          'country': 'NL',
          'port': 8080,
          'city': 'Voorburg',
          'ipLowBits': 1590826593,
          'ip': '94.210.22.97',
          'name': '94.210.22.97',
          'coordinates': {
            'lon': 4.3596954345703125,
            'lat': 52.07420349121094
          },
          'reputation': [

          ],
          'region': '11',
          'asn': 9143
        },
        'micros': 666,
        'id': 'djavN2bOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63191,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.112',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 44,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 2000,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 100,
            'startTime': '2016-08-20T12:00:31.110',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RUQVUx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 663,
        'id': 'Az9ghGbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 58498,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'dns'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.058',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.058',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNSMx1SKTQKNOSKNQNx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Fort Huachuca',
          'ipLowBits': 105545357,
          'ip': '6.74.126.141',
          'name': '6.74.126.141',
          'coordinates': {
            'lon': -110.36070251464844,
            'lat': 31.527297973632812
          },
          'reputation': [

          ],
          'region': 'AZ'
        },
        'micros': 660,
        'id': '94ZuRmbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63160,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.052',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'reqBytes': 0,
            'missedBytes': 0,
            'history': 'Sr',
            'respPackets': 1,
            'respIPBytes': 40,
            'respBytes': 0,
            'localResponse': false,
            'duration': 28002,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.024',
            'state': 'REJ',
            'reqPackets': 1,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNROx1NOSKOOOKQKNVUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Softbank BB Corp.',
          'country': 'JP',
          'port': 8080,
          'ipLowBits': 2128479430,
          'ip': '126.222.4.198',
          'name': '126.222.4.198',
          'coordinates': {
            'lon': 139.69000244140625,
            'lat': 35.69000244140625
          },
          'reputation': [

          ],
          'asn': 17676
        },
        'micros': 656,
        'id': '94UOtWbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63152,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.032',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.032',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNRSx1NQRKNTRKUTKOMMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'NL',
          'port': 8080,
          'city': 'Utrecht',
          'ipLowBits': 2444187592,
          'ip': '145.175.87.200',
          'name': '145.175.87.200',
          'coordinates': {
            'lon': 5.1190948486328125,
            'lat': 52.09379577636719
          },
          'reputation': [

          ],
          'region': '09'
        },
        'micros': 656,
        'id': '939CUmbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63156,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:31.020',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:31.020',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNRMx1SRKQRKSTKNUQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 1093485496,
          'ip': '65.45.67.184',
          'name': '65.45.67.184',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 655,
        'id': 'TAdF6WbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63150,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.996',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.996',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNQOx1TVKSTKUUKOPQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Tiscali UK Limited',
          'country': 'GB',
          'port': 8080,
          'ipLowBits': 1329813738,
          'ip': '79.67.88.234',
          'name': '79.67.88.234',
          'coordinates': {
            'lon': -0.1300048828125,
            'lat': 51.5
          },
          'reputation': [

          ],
          'asn': 9105
        },
        'micros': 655,
        'id': 'S_WSoGbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63142,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.988',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.988',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNPUx1NRTKOOTKNRSKUQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'IN',
          'port': 8080,
          'city': 'Mumbai',
          'ipLowBits': 2648939604,
          'ip': '157.227.156.84',
          'name': '157.227.156.84',
          'coordinates': {
            'lon': 72.8258056640625,
            'lat': 18.975006103515625
          },
          'reputation': [

          ],
          'region': '16'
        },
        'micros': 653,
        'id': 'S-4ZjGbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63138,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.982',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.982',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNPRx1NOUKUVKNUSKNORx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'BBN Technologies Corp.',
          'country': 'US',
          'port': 8080,
          'city': 'Cambridge',
          'ipLowBits': 2153364093,
          'ip': '128.89.186.125',
          'name': '128.89.186.125',
          'coordinates': {
            'lon': -71.13289642333984,
            'lat': 42.3800048828125
          },
          'reputation': [

          ],
          'region': 'MA',
          'asn': 11488
        },
        'micros': 653,
        'id': 'S-kQeWbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63135,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.946',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.946',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNOPx1VMKNONKVRKRSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Orange S.A.',
          'country': 'FR',
          'port': 8080,
          'city': 'Paris',
          'ipLowBits': 1517903672,
          'ip': '90.121.95.56',
          'name': '90.121.95.56',
          'coordinates': {
            'lon': 2.3332977294921875,
            'lat': 48.86669921875
          },
          'reputation': [

          ],
          'region': 'A8',
          'asn': 3215
        },
        'micros': 649,
        'id': 'H7xQ7GbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63123,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.916',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.916',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNNUx1SOKNNQKNSQKOMVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'ETISALAT MISR',
          'country': 'EG',
          'port': 8080,
          'ipLowBits': 1047700689,
          'ip': '62.114.164.209',
          'name': '62.114.164.209',
          'coordinates': {
            'lon': 31.366592407226562,
            'lat': 30.050003051757812
          },
          'reputation': [

          ],
          'asn': 36992
        },
        'micros': 645,
        'id': 'ylpBRGbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63118,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.860',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.860',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMVVx1UTKRTKRKNOTx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'TDC A/S',
          'country': 'DK',
          'port': 8080,
          'city': 'Kongerslev',
          'ipLowBits': 1463354751,
          'ip': '87.57.5.127',
          'name': '87.57.5.127',
          'coordinates': {
            'lon': 10.126693725585938,
            'lat': 56.90559387207031
          },
          'reputation': [

          ],
          'region': '19',
          'asn': 3292
        },
        'micros': 634,
        'id': 'H562vWbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63099,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.852',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.852',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMVRx1NQOKNMKNTMKNSMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'CA',
          'port': 8080,
          'city': 'Toronto',
          'ipLowBits': 2383063712,
          'ip': '142.10.170.160',
          'name': '142.10.170.160',
          'coordinates': {
            'lon': -79.38600158691406,
            'lat': 43.656402587890625
          },
          'reputation': [

          ],
          'region': 'ON'
        },
        'micros': 635,
        'id': 'H5gnCWbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63095,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.778',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.778',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMSSx1ONQKNTSKOOUKNRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 3601916943,
          'ip': '214.176.228.15',
          'name': '214.176.228.15',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 630,
        'id': 'C7E-sWbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63066,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.742',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.742',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMRNx1UTKROKOMTKOMMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'TDC A/S',
          'country': 'DK',
          'port': 8080,
          'ipLowBits': 1463078856,
          'ip': '87.52.207.200',
          'name': '87.52.207.200',
          'coordinates': {
            'lon': 12.56829833984375,
            'lat': 55.67610168457031
          },
          'reputation': [

          ],
          'asn': 3292
        },
        'micros': 624,
        'id': 'C5itkmbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63051,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.734',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.734',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMQTx1VSKVKNVKNOVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Network Solutions, LLC',
          'country': 'US',
          'port': 8080,
          'city': 'Jacksonville',
          'ipLowBits': 1611207553,
          'ip': '96.9.19.129',
          'name': '96.9.19.129',
          'coordinates': {
            'lon': -81.54010009765625,
            'lat': 30.143798828125
          },
          'reputation': [

          ],
          'region': 'FL',
          'asn': 19871
        },
        'micros': 622,
        'id': 'C5H2zmbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63047,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.728',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.728',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMQQx1NQPKONRKNSTKNPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Georgia Institute of Technology',
          'country': 'US',
          'port': 8080,
          'city': 'Atlanta',
          'ipLowBits': 2413274893,
          'ip': '143.215.167.13',
          'name': '143.215.167.13',
          'coordinates': {
            'lon': -84.39800262451172,
            'lat': 33.77630615234375
          },
          'reputation': [

          ],
          'region': 'GA',
          'asn': 2637
        },
        'micros': 623,
        'id': 'C41i62bOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63044,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.722',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.722',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMQNx1NRMKNUVKNVNKNPSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'VE',
          'port': 8080,
          'city': 'Caracas',
          'ipLowBits': 2529017736,
          'ip': '150.189.191.136',
          'name': '150.189.191.136',
          'coordinates': {
            'lon': -66.91670227050781,
            'lat': 10.5
          },
          'reputation': [

          ],
          'region': '25'
        },
        'micros': 621,
        'id': '_0WeJGbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63041,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.672',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.672',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMOTx1OMMKNMVKOOKOMOx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'VE',
          'port': 8080,
          'ipLowBits': 3362592458,
          'ip': '200.109.22.202',
          'name': '200.109.22.202',
          'coordinates': {
            'lon': -66.0,
            'lat': 8.0
          },
          'reputation': [

          ]
        },
        'micros': 615,
        'id': '-4RQVmbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63027,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.640',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.640',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMNUx1OKNTQKOQUKNTUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Deutsche Telekom AG',
          'country': 'DE',
          'port': 8080,
          'ipLowBits': 45021362,
          'ip': '2.174.248.178',
          'name': '2.174.248.178',
          'coordinates': {
            'lon': 9.0,
            'lat': 51.0
          },
          'reputation': [

          ],
          'asn': 3320
        },
        'micros': 610,
        'id': 'bjeQJmbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63018,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.616',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.616',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMNMx1NOVKOQTKQOKPTx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Verein zur Foerderung eines Deutschen Forschungsnetzes e.V.',
          'country': 'DE',
          'port': 8080,
          'city': 'Luft',
          'ipLowBits': 2180459045,
          'ip': '129.247.42.37',
          'name': '129.247.42.37',
          'coordinates': {
            'lon': 9.5,
            'lat': 47.850006103515625
          },
          'reputation': [

          ],
          'region': '01',
          'asn': 680
        },
        'micros': 609,
        'id': 'biqXz2bOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63010,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.612',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.612',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMMUx1NSPKNQUKNMKNSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'NTT Communications Corporation',
          'country': 'JP',
          'port': 8080,
          'ipLowBits': 2744388112,
          'ip': '163.148.10.16',
          'name': '163.148.10.16',
          'coordinates': {
            'lon': 139.69000244140625,
            'lat': 35.69000244140625
          },
          'reputation': [

          ],
          'asn': 4713
        },
        'micros': 609,
        'id': 'bibuTWbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63008,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.572',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.572',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVVOx1NVPKNRTKNMTKOMMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'UNINETT, The Norwegian University & Research Network',
          'country': 'NO',
          'port': 8080,
          'ipLowBits': 3248319432,
          'ip': '193.157.107.200',
          'name': '193.157.107.200',
          'coordinates': {
            'lon': 10.75,
            'lat': 59.94999694824219
          },
          'reputation': [

          ],
          'asn': 224
        },
        'micros': 604,
        'id': 'LDAua2bOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62992,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.548',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.548',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVUMx1USKNOUKPTKNVUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'BT Public Internet Service',
          'country': 'GB',
          'port': 8080,
          'city': 'Ashton-under-lyne',
          'ipLowBits': 1451238854,
          'ip': '86.128.37.198',
          'name': '86.128.37.198',
          'coordinates': {
            'lon': -2.0865936279296875,
            'lat': 53.49409484863281
          },
          'reputation': [

          ],
          'region': 'O1',
          'asn': 2856
        },
        'micros': 604,
        'id': 'K_5v_2bOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62980,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.544',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.544',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVTUx1VQKNVTKOMRKNNUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Hutchison 3G UK Limited',
          'country': 'GB',
          'port': 8080,
          'ipLowBits': 1590021494,
          'ip': '94.197.205.118',
          'name': '94.197.205.118',
          'coordinates': {
            'lon': -0.1300048828125,
            'lat': 51.5
          },
          'reputation': [

          ],
          'asn': 60339
        },
        'micros': 602,
        'id': '81WWi2bNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62978,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.540',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.540',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVTSx1NQVKNSKNMUKNQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Troy',
          'ipLowBits': 2500881422,
          'ip': '149.16.108.14',
          'name': '149.16.108.14',
          'coordinates': {
            'lon': -73.59510040283203,
            'lat': 42.74949645996094
          },
          'reputation': [

          ],
          'region': 'NY'
        },
        'micros': 603,
        'id': '81JiOWbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62976,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.534',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.534',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVTPx1NTOKRQKNOTKOMUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 2889252816,
          'ip': '172.54.127.208',
          'name': '172.54.127.208',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 603,
        'id': '80y85mbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62973,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.518',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.518',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVSRx1ONSKUOKOPSKSPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Raleigh',
          'ipLowBits': 3629313087,
          'ip': '216.82.236.63',
          'name': '216.82.236.63',
          'coordinates': {
            'lon': -78.7238998413086,
            'lat': 35.746307373046875
          },
          'reputation': [

          ],
          'region': 'NC'
        },
        'micros': 601,
        'id': 'C3-AMWbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62965,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.480',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.480',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVRPx1NSOKOMMKNKNSRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Middletown',
          'ipLowBits': 2731016613,
          'ip': '162.200.1.165',
          'name': '162.200.1.165',
          'coordinates': {
            'lon': -72.6530990600586,
            'lat': 41.54969787597656
          },
          'reputation': [

          ],
          'region': 'CT'
        },
        'micros': 600,
        'id': 'F5qPdWbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62953,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.406',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 50,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 2001,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 106,
            'startTime': '2016-08-20T12:00:30.404',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RUUTVx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 590,
        'id': 'I_btk2bOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 58879,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.388',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.388',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVOTx1VRKNTPKNUKNNVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'AVEA Iletisim Hizmetleri A.S.',
          'country': 'TR',
          'port': 8080,
          'ipLowBits': 1605177975,
          'ip': '95.173.18.119',
          'name': '95.173.18.119',
          'coordinates': {
            'lon': 28.955001831054688,
            'lat': 41.01359558105469
          },
          'reputation': [

          ],
          'asn': 20978
        },
        'micros': 585,
        'id': 'C2n8U2bOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62927,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.378',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.378',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVOOx1NVKTRKPUKOPPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Dearborn',
          'ipLowBits': 323692265,
          'ip': '19.75.38.233',
          'name': '19.75.38.233',
          'coordinates': {
            'lon': -83.17630004882812,
            'lat': 42.322296142578125
          },
          'reputation': [

          ],
          'region': 'MI'
        },
        'micros': 588,
        'id': 'C15jjmbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62922,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.340',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.340',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVMQx1PPKNSKOORKNORx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 554754429,
          'ip': '33.16.225.125',
          'name': '33.16.225.125',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 581,
        'id': 'cfZtGWbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62904,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.332',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.332',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVMMx1ROKQPKQOKOMUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Boardman',
          'ipLowBits': 875244240,
          'ip': '52.43.42.208',
          'name': '52.43.42.208',
          'coordinates': {
            'lon': -119.52899932861328,
            'lat': 45.77879333496094
          },
          'reputation': [

          ],
          'region': 'OR'
        },
        'micros': 581,
        'id': 'H_EcqmbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62900,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.328',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.328',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUVUx1TRKTQKUTKOOQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Comcast Cable Communications, Inc.',
          'country': 'US',
          'port': 8080,
          'city': 'Miami',
          'ipLowBits': 1263163360,
          'ip': '75.74.87.224',
          'name': '75.74.87.224',
          'coordinates': {
            'lon': -80.41200256347656,
            'lat': 25.6614990234375
          },
          'reputation': [

          ],
          'region': 'FL',
          'asn': 7922
        },
        'micros': 581,
        'id': 'H-1MGGbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62898,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.318',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.318',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUVPx1NSUKNMNKVVKOMPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Ministry of Economy',
          'country': 'AR',
          'port': 8080,
          'city': 'Hipolito Yrigoyen',
          'ipLowBits': 2825216971,
          'ip': '168.101.99.203',
          'name': '168.101.99.203',
          'coordinates': {
            'lon': -66.32420349121094,
            'lat': -32.918792724609375
          },
          'reputation': [

          ],
          'region': '19',
          'asn': 7417
        },
        'micros': 580,
        'id': 'T_rueGbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62893,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.300',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.300',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUUTx1TNKNNVKOMRKNRRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'MCI Communications Services, Inc. d/b/a Verizon Business',
          'country': 'US',
          'port': 8080,
          'ipLowBits': 1199033755,
          'ip': '71.119.205.155',
          'name': '71.119.205.155',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ],
          'asn': 701
        },
        'micros': 577,
        'id': 'S9B_XmbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62887,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:30.278',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:30.278',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUTTx1VOKVOKVMKORx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Societe Francaise du Radiotelephone S.A',
          'country': 'FR',
          'port': 8080,
          'ipLowBits': 1549556249,
          'ip': '92.92.90.25',
          'name': '92.92.90.25',
          'coordinates': {
            'lon': 2.350006103515625,
            'lat': 48.86000061035156
          },
          'reputation': [

          ],
          'asn': 15557
        },
        'micros': 575,
        'id': 'ylG1v2bNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62877,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:29.968',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:29.968',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUOOx1NORKNQMKSKNMVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'KR',
          'port': 8080,
          'ipLowBits': 2106328685,
          'ip': '125.140.6.109',
          'name': '125.140.6.109',
          'coordinates': {
            'lon': 126.98001098632812,
            'lat': 37.57000732421875
          },
          'reputation': [

          ]
        },
        'micros': 542,
        'id': '74XJtGbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62822,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:29.958',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:29.958',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUNTx1NVKQPKRPKNSRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Dearborn',
          'ipLowBits': 321598885,
          'ip': '19.43.53.165',
          'name': '19.43.53.165',
          'coordinates': {
            'lon': -83.17630004882812,
            'lat': 42.322296142578125
          },
          'reputation': [

          ],
          'region': 'MI'
        },
        'micros': 544,
        'id': 'ach2uGbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62817,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:29.948',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:29.948',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUNPx1PPKRKPQKOQUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 553984760,
          'ip': '33.5.34.248',
          'name': '33.5.34.248',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 543,
        'id': 'acCug2bOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62813,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:29.946',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:29.946',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUNOx1NOMKSVKNTRKOOTx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Chinanet',
          'country': 'CN',
          'port': 8080,
          'city': 'Ürümqi',
          'ipLowBits': 2017832931,
          'ip': '120.69.175.227',
          'name': '120.69.175.227',
          'coordinates': {
            'lon': 87.60049438476562,
            'lat': 43.800994873046875
          },
          'reputation': [

          ],
          'region': '13',
          'asn': 4134
        },
        'micros': 544,
        'id': 'ab7ZwmbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62812,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:29.944',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-20T12:00:29.944',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUNNx1NOMKQSKORNKTx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'CN',
          'port': 8080,
          'city': 'Beijing',
          'ipLowBits': 2016344839,
          'ip': '120.46.251.7',
          'name': '120.46.251.7',
          'coordinates': {
            'lon': 116.3883056640625,
            'lat': 39.92889404296875
          },
          'reputation': [

          ],
          'region': '22'
        },
        'micros': 544,
        'id': 'ab0sEWbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62811,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:12.229',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 48,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 2001,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 104,
            'startTime': '2016-08-20T12:00:12.227',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RMMMNx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 739,
        'id': 'E8TPLGbOEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 50001,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:12.204',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 44,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 6022,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 100,
            'startTime': '2016-08-20T12:00:12.198',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RMVRTx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 269,
        'id': '85RMYmbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 50957,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:12.202',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 50,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 8002,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 106,
            'startTime': '2016-08-20T12:00:12.194',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SQUQTx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 269,
        'id': '85AGoWbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 64847,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:12.200',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 44,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 14002,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 100,
            'startTime': '2016-08-20T12:00:12.186',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RPMMSx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 269,
        'id': '8428sGbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 53006,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:12.190',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 48,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 6000,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 104,
            'startTime': '2016-08-20T12:00:12.184',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RVSNSx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 269,
        'id': '84md_2bNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 59616,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:12.160',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 50,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 2000,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 106,
            'startTime': '2016-08-20T12:00:12.158',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SROMUx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 268,
        'id': '84fwTmbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 65208,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:12.140',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 48,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 2000,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 104,
            'startTime': '2016-08-20T12:00:12.138',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RMPVNx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 267,
        'id': '84ZprWbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 50391,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:12.132',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 44,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 10000,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 100,
            'startTime': '2016-08-20T12:00:12.122',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RRPSUx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 267,
        'id': '84S7_GbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 55368,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:12.130',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 44,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 10001,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 100,
            'startTime': '2016-08-20T12:00:12.120',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SORMMx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 267,
        'id': '84M1W2bNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62500,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-20T12:00:12.126',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 50,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 14003,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 106,
            'startTime': '2016-08-20T12:00:12.112',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RTUOUx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 264,
        'id': '84FgmmbNEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 57828,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:32.040',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:32.040',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPTPx1NNRKTOKOOSKQMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Viettel Corporation',
          'country': 'VN',
          'port': 8080,
          'city': 'Cho Ha',
          'ipLowBits': 1934156328,
          'ip': '115.72.226.40',
          'name': '115.72.226.40',
          'coordinates': {
            'lon': 106.60000610351562,
            'lat': 21.416702270507812
          },
          'reputation': [

          ],
          'region': '71',
          'asn': 7552
        },
        'micros': 909,
        'id': '4zwBmWYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63373,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.966',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.966',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPQRx1SNKNSSKOOVKNOPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Chinanet',
          'country': 'CN',
          'port': 8080,
          'city': 'Kunming',
          'ipLowBits': 1034347899,
          'ip': '61.166.229.123',
          'name': '61.166.229.123',
          'coordinates': {
            'lon': 102.71829223632812,
            'lat': 25.038894653320312
          },
          'reputation': [

          ],
          'region': '29',
          'asn': 4134
        },
        'micros': 901,
        'id': 'gdB5YWYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63345,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.938',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.938',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPPRx1NPUKNURKNPVKONNx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'AVANZADAS INFORMATICAS Y TELECOMUNICACIONES SAITEL',
          'country': 'EC',
          'port': 8080,
          'ipLowBits': 2327415763,
          'ip': '138.185.139.211',
          'name': '138.185.139.211',
          'coordinates': {
            'lon': -77.5,
            'lat': -2.0
          },
          'reputation': [

          ],
          'asn': 263805
        },
        'micros': 898,
        'id': 'gaQ5NWYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63335,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.922',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.922',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPOVx1NNTKONUKOQPKUUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'National Internet Backbone',
          'country': 'IN',
          'port': 8080,
          'city': 'Bangalore',
          'ipLowBits': 1977283416,
          'ip': '117.218.243.88',
          'name': '117.218.243.88',
          'coordinates': {
            'lon': 77.58331298828125,
            'lat': 12.983306884765625
          },
          'reputation': [

          ],
          'region': '19',
          'asn': 9829
        },
        'micros': 895,
        'id': 'gZYvb2YyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63329,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.910',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.910',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPOQx1NMNKOTKNMSKPVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'CNCGROUP China169 Backbone',
          'country': 'CN',
          'port': 8080,
          'city': 'Hebei',
          'ipLowBits': 1696295463,
          'ip': '101.27.106.39',
          'name': '101.27.106.39',
          'coordinates': {
            'lon': 115.27499389648438,
            'lat': 39.88969421386719
          },
          'reputation': [

          ],
          'region': '10',
          'asn': 4837
        },
        'micros': 893,
        'id': 'gY2j6mYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63324,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.802',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.802',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPMPx1QTKNUSKVKRUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'CA',
          'port': 8080,
          'city': 'Ottawa',
          'ipLowBits': 800721210,
          'ip': '47.186.9.58',
          'name': '47.186.9.58',
          'coordinates': {
            'lon': -75.82649993896484,
            'lat': 45.34330749511719
          },
          'reputation': [

          ],
          'region': 'ON'
        },
        'micros': 884,
        'id': 'yTyKlGYwEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63303,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.780',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.780',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOVQx1NQVKSSKONVKUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Cogent Communications',
          'country': 'US',
          'port': 8080,
          'ipLowBits': 2504186632,
          'ip': '149.66.219.8',
          'name': '149.66.219.8',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ],
          'asn': 174
        },
        'micros': 881,
        'id': 'yS1IS2YwEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63294,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.748',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.748',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOUQx1NOSKNMPKNRQKOOSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Softbank BB Corp.',
          'country': 'JP',
          'port': 8080,
          'ipLowBits': 2120719074,
          'ip': '126.103.154.226',
          'name': '126.103.154.226',
          'coordinates': {
            'lon': 139.69000244140625,
            'lat': 35.69000244140625
          },
          'reputation': [

          ],
          'asn': 17676
        },
        'micros': 878,
        'id': 'GZzn5WYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63284,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.700',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.700',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOTMx1NPSKNNKNOTKORMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Dearborn',
          'ipLowBits': 2282455034,
          'ip': '136.11.127.250',
          'name': '136.11.127.250',
          'coordinates': {
            'lon': -83.17630004882812,
            'lat': 42.322296142578125
          },
          'reputation': [

          ],
          'region': 'MI'
        },
        'micros': 872,
        'id': 'xVK7C2YyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63270,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.690',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.690',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOSRx1OOPKNQOKNMUKNQPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Long Distance & Mobile Business Group',
          'country': 'TW',
          'port': 8080,
          'city': 'Taipei',
          'ipLowBits': 3750653071,
          'ip': '223.142.108.143',
          'name': '223.142.108.143',
          'coordinates': {
            'lon': 121.52499389648438,
            'lat': 25.039199829101562
          },
          'reputation': [

          ],
          'region': '03',
          'asn': 17421
        },
        'micros': 873,
        'id': 'xUMqpmYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63265,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.666',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.666',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPORQx1TTKONOKRPKSUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Telenor A/S',
          'country': 'DK',
          'port': 8080,
          'ipLowBits': 1305752900,
          'ip': '77.212.53.68',
          'name': '77.212.53.68',
          'coordinates': {
            'lon': 12.56829833984375,
            'lat': 55.67610168457031
          },
          'reputation': [

          ],
          'asn': 9158
        },
        'micros': 873,
        'id': 'xQP-umYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63254,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.630',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.630',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOPUx1SOKSKOOSKNQRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'BT Public Internet Service',
          'country': 'GB',
          'port': 8080,
          'ipLowBits': 1040638609,
          'ip': '62.6.226.145',
          'name': '62.6.226.145',
          'coordinates': {
            'lon': -0.1300048828125,
            'lat': 51.5
          },
          'reputation': [

          ],
          'asn': 2856
        },
        'micros': 871,
        'id': 'iyi0sWYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63238,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.626',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.626',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOPSx1NPSKPKPMKNVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Dearborn',
          'ipLowBits': 2281905683,
          'ip': '136.3.30.19',
          'name': '136.3.30.19',
          'coordinates': {
            'lon': -83.17630004882812,
            'lat': 42.322296142578125
          },
          'reputation': [

          ],
          'region': 'MI'
        },
        'micros': 870,
        'id': 'iyULL2YxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63236,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.602',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.602',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOOUx1VVKNSTKVKVPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 1671891293,
          'ip': '99.167.9.93',
          'name': '99.167.9.93',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 867,
        'id': 'LvAyRmYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63228,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.546',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.546',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOMTx1SPKNNRKNNSKNRUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'MCI Communications Services, Inc. d/b/a Verizon Business',
          'country': 'US',
          'port': 8080,
          'city': 'Linden',
          'ipLowBits': 1064531102,
          'ip': '63.115.116.158',
          'name': '63.115.116.158',
          'coordinates': {
            'lon': -74.24939727783203,
            'lat': 40.62469482421875
          },
          'reputation': [

          ],
          'region': 'NJ',
          'asn': 701
        },
        'micros': 859,
        'id': 'LpA34WYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63207,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.536',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.536',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOMOx1PTKNPUKNQRKNOx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'EWE TEL GmbH',
          'country': 'DE',
          'port': 8080,
          'ipLowBits': 629838092,
          'ip': '37.138.145.12',
          'name': '37.138.145.12',
          'coordinates': {
            'lon': 9.0,
            'lat': 51.0
          },
          'reputation': [

          ],
          'asn': 9145
        },
        'micros': 858,
        'id': 'xPfJs2YyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63202,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.532',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.532',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOMMx1STKQOKNPOKNUSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Rio Rancho',
          'ipLowBits': 1126859962,
          'ip': '67.42.132.186',
          'name': '67.42.132.186',
          'coordinates': {
            'lon': -106.72319793701172,
            'lat': 35.2467041015625
          },
          'reputation': [

          ],
          'region': 'NM'
        },
        'micros': 857,
        'id': 'xPSVYWYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63200,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.486',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.486',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNVNx1VQKONMKOOKVTx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Ziggo B.V.',
          'country': 'NL',
          'port': 8080,
          'city': 'Voorburg',
          'ipLowBits': 1590826593,
          'ip': '94.210.22.97',
          'name': '94.210.22.97',
          'coordinates': {
            'lon': 4.3596954345703125,
            'lat': 52.07420349121094
          },
          'reputation': [

          ],
          'region': '11',
          'asn': 9143
        },
        'micros': 853,
        'id': 'YCqxW2YxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63191,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.450',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 44,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 2001,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 100,
            'startTime': '2016-08-19T12:00:31.448',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RUQVUx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 848,
        'id': 'Izv7GWYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 58498,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.396',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.396',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNSMx1SKTQKNOSKNQNx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Fort Huachuca',
          'ipLowBits': 105545357,
          'ip': '6.74.126.141',
          'name': '6.74.126.141',
          'coordinates': {
            'lon': -110.36070251464844,
            'lat': 31.527297973632812
          },
          'reputation': [

          ],
          'region': 'AZ'
        },
        'micros': 842,
        'id': 'Dr0-zGYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63160,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.390',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'reqBytes': 0,
            'missedBytes': 0,
            'history': 'Sr',
            'respPackets': 1,
            'respIPBytes': 40,
            'respBytes': 0,
            'localResponse': false,
            'duration': 28004,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.362',
            'state': 'REJ',
            'reqPackets': 1,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNROx1NOSKOOOKQKNVUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Softbank BB Corp.',
          'country': 'JP',
          'port': 8080,
          'ipLowBits': 2128479430,
          'ip': '126.222.4.198',
          'name': '126.222.4.198',
          'coordinates': {
            'lon': 139.69000244140625,
            'lat': 35.69000244140625
          },
          'reputation': [

          ],
          'asn': 17676
        },
        'micros': 838,
        'id': 'DrgOq2YyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63152,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.370',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.370',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNRSx1NQRKNTRKUTKOMMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'NL',
          'port': 8080,
          'city': 'Utrecht',
          'ipLowBits': 2444187592,
          'ip': '145.175.87.200',
          'name': '145.175.87.200',
          'coordinates': {
            'lon': 5.1190948486328125,
            'lat': 52.09379577636719
          },
          'reputation': [

          ],
          'region': '09'
        },
        'micros': 840,
        'id': 'Dq81CGYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63156,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.358',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.358',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNRMx1SRKQRKSTKNUQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 1093485496,
          'ip': '65.45.67.184',
          'name': '65.45.67.184',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 838,
        'id': 'DpSBE2YyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63150,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.334',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.334',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNQOx1TVKSTKUUKOPQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Tiscali UK Limited',
          'country': 'GB',
          'port': 8080,
          'ipLowBits': 1329813738,
          'ip': '79.67.88.234',
          'name': '79.67.88.234',
          'coordinates': {
            'lon': -0.1300048828125,
            'lat': 51.5
          },
          'reputation': [

          ],
          'asn': 9105
        },
        'micros': 834,
        'id': 'SLuyxGYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63142,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.326',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.326',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNPUx1NRTKOOTKNRSKUQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'IN',
          'port': 8080,
          'city': 'Mumbai',
          'ipLowBits': 2648939604,
          'ip': '157.227.156.84',
          'name': '157.227.156.84',
          'coordinates': {
            'lon': 72.8258056640625,
            'lat': 18.975006103515625
          },
          'reputation': [

          ],
          'region': '16'
        },
        'micros': 832,
        'id': 'SLC2QGYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63138,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.320',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.320',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNPRx1NOUKUVKNUSKNORx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'BBN Technologies Corp.',
          'country': 'US',
          'port': 8080,
          'city': 'Cambridge',
          'ipLowBits': 2153364093,
          'ip': '128.89.186.125',
          'name': '128.89.186.125',
          'coordinates': {
            'lon': -71.13289642333984,
            'lat': 42.3800048828125
          },
          'reputation': [

          ],
          'region': 'MA',
          'asn': 11488
        },
        'micros': 831,
        'id': 'SKcZTWYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63135,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.284',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.284',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNOPx1VMKNONKVRKRSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Orange S.A.',
          'country': 'FR',
          'port': 8080,
          'city': 'Paris',
          'ipLowBits': 1517903672,
          'ip': '90.121.95.56',
          'name': '90.121.95.56',
          'coordinates': {
            'lon': 2.3332977294921875,
            'lat': 48.86669921875
          },
          'reputation': [

          ],
          'region': 'A8',
          'asn': 3215
        },
        'micros': 827,
        'id': 'SHOtMmYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63123,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.254',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.254',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNNUx1SOKNNQKNSQKOMVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'ETISALAT MISR',
          'country': 'EG',
          'port': 8080,
          'ipLowBits': 1047700689,
          'ip': '62.114.164.209',
          'name': '62.114.164.209',
          'coordinates': {
            'lon': 31.366592407226562,
            'lat': 30.050003051757812
          },
          'reputation': [

          ],
          'asn': 36992
        },
        'micros': 826,
        'id': 'nFWGDWYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63118,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.198',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.198',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMVVx1UTKRTKRKNOTx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'TDC A/S',
          'country': 'DK',
          'port': 8080,
          'city': 'Kongerslev',
          'ipLowBits': 1463354751,
          'ip': '87.57.5.127',
          'name': '87.57.5.127',
          'coordinates': {
            'lon': 10.126693725585938,
            'lat': 56.90559387207031
          },
          'reputation': [

          ],
          'region': '19',
          'asn': 3292
        },
        'micros': 818,
        'id': '5wcT82YxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63099,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.190',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.190',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMVRx1NQOKNMKNTMKNSMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'CA',
          'port': 8080,
          'city': 'Toronto',
          'ipLowBits': 2383063712,
          'ip': '142.10.170.160',
          'name': '142.10.170.160',
          'coordinates': {
            'lon': -79.38600158691406,
            'lat': 43.656402587890625
          },
          'reputation': [

          ],
          'region': 'ON'
        },
        'micros': 817,
        'id': '5vt7L2YxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63095,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.116',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.116',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMSSx1ONQKNTSKOOUKNRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 3601916943,
          'ip': '214.176.228.15',
          'name': '214.176.228.15',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 806,
        'id': 'NxRaBmYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63066,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.080',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.080',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMRNx1UTKROKOMTKOMMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'TDC A/S',
          'country': 'DK',
          'port': 8080,
          'ipLowBits': 1463078856,
          'ip': '87.52.207.200',
          'name': '87.52.207.200',
          'coordinates': {
            'lon': 12.56829833984375,
            'lat': 55.67610168457031
          },
          'reputation': [

          ],
          'asn': 3292
        },
        'micros': 804,
        'id': 'wPBnWGYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63051,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.072',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.072',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMQTx1VSKVKNVKNOVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Network Solutions, LLC',
          'country': 'US',
          'port': 8080,
          'city': 'Jacksonville',
          'ipLowBits': 1611207553,
          'ip': '96.9.19.129',
          'name': '96.9.19.129',
          'coordinates': {
            'lon': -81.54010009765625,
            'lat': 30.143798828125
          },
          'reputation': [

          ],
          'region': 'FL',
          'asn': 19871
        },
        'micros': 804,
        'id': 'wOmJhGYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63047,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.066',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.066',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMQQx1NQPKONRKNSTKNPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Georgia Institute of Technology',
          'country': 'US',
          'port': 8080,
          'city': 'Atlanta',
          'ipLowBits': 2413274893,
          'ip': '143.215.167.13',
          'name': '143.215.167.13',
          'coordinates': {
            'lon': -84.39800262451172,
            'lat': 33.77630615234375
          },
          'reputation': [

          ],
          'region': 'GA',
          'asn': 2637
        },
        'micros': 803,
        'id': 'wOQLQWYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63044,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.060',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.060',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMQNx1NRMKNUVKNVNKNPSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'VE',
          'port': 8080,
          'city': 'Caracas',
          'ipLowBits': 2529017736,
          'ip': '150.189.191.136',
          'name': '150.189.191.136',
          'coordinates': {
            'lon': -66.91670227050781,
            'lat': 10.5
          },
          'reputation': [

          ],
          'region': '25'
        },
        'micros': 803,
        'id': 'wN8CLmYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63041,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:31.010',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:31.010',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMOTx1OMMKNMVKOOKOMOx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'VE',
          'port': 8080,
          'ipLowBits': 3362592458,
          'ip': '200.109.22.202',
          'name': '200.109.22.202',
          'coordinates': {
            'lon': -66.0,
            'lat': 8.0
          },
          'reputation': [

          ]
        },
        'micros': 798,
        'id': 'Uj1d32YyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63027,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.978',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.978',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMNUx1OKNTQKOQUKNTUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Deutsche Telekom AG',
          'country': 'DE',
          'port': 8080,
          'ipLowBits': 45021362,
          'ip': '2.174.248.178',
          'name': '2.174.248.178',
          'coordinates': {
            'lon': 9.0,
            'lat': 51.0
          },
          'reputation': [

          ],
          'asn': 3320
        },
        'micros': 793,
        'id': 'Ui0KJWYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63018,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.954',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.954',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMNMx1NOVKOQTKQOKPTx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Verein zur Foerderung eines Deutschen Forschungsnetzes e.V.',
          'country': 'DE',
          'port': 8080,
          'city': 'Luft',
          'ipLowBits': 2180459045,
          'ip': '129.247.42.37',
          'name': '129.247.42.37',
          'coordinates': {
            'lon': 9.5,
            'lat': 47.850006103515625
          },
          'reputation': [

          ],
          'region': '01',
          'asn': 680
        },
        'micros': 787,
        'id': 'UiDVHmYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63010,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.950',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.950',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMMUx1NSPKNQUKNMKNSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'NTT Communications Corporation',
          'country': 'JP',
          'port': 8080,
          'ipLowBits': 2744388112,
          'ip': '163.148.10.16',
          'name': '163.148.10.16',
          'coordinates': {
            'lon': 139.69000244140625,
            'lat': 35.69000244140625
          },
          'reputation': [

          ],
          'asn': 4713
        },
        'micros': 786,
        'id': 'oqRAi2YyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63008,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.910',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.910',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVVOx1NVPKNRTKNMTKOMMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'UNINETT, The Norwegian University & Research Network',
          'country': 'NO',
          'port': 8080,
          'ipLowBits': 3248319432,
          'ip': '193.157.107.200',
          'name': '193.157.107.200',
          'coordinates': {
            'lon': 10.75,
            'lat': 59.94999694824219
          },
          'reputation': [

          ],
          'asn': 224
        },
        'micros': 781,
        'id': 'okzRq2YyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62992,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.886',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.886',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVUMx1USKNOUKPTKNVUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'BT Public Internet Service',
          'country': 'GB',
          'port': 8080,
          'city': 'Ashton-under-lyne',
          'ipLowBits': 1451238854,
          'ip': '86.128.37.198',
          'name': '86.128.37.198',
          'coordinates': {
            'lon': -2.0865936279296875,
            'lat': 53.49409484863281
          },
          'reputation': [

          ],
          'region': 'O1',
          'asn': 2856
        },
        'micros': 778,
        'id': 'PIN-a2YxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62980,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.882',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.882',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVTUx1VQKNVTKOMRKNNUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Hutchison 3G UK Limited',
          'country': 'GB',
          'port': 8080,
          'ipLowBits': 1590021494,
          'ip': '94.197.205.118',
          'name': '94.197.205.118',
          'coordinates': {
            'lon': -0.1300048828125,
            'lat': 51.5
          },
          'reputation': [

          ],
          'asn': 60339
        },
        'micros': 778,
        'id': 'PH7qiWYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62978,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.878',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.878',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVTSx1NQVKNSKNMUKNQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Troy',
          'ipLowBits': 2500881422,
          'ip': '149.16.108.14',
          'name': '149.16.108.14',
          'coordinates': {
            'lon': -73.59510040283203,
            'lat': 42.74949645996094
          },
          'reputation': [

          ],
          'region': 'NY'
        },
        'micros': 778,
        'id': 'PHbUN2YxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62976,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.872',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.872',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVTPx1NTOKRQKNOTKOMUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 2889252816,
          'ip': '172.54.127.208',
          'name': '172.54.127.208',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 776,
        'id': 'PG4hpGYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62973,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.856',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.856',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVSRx1ONSKUOKOPSKSPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Raleigh',
          'ipLowBits': 3629313087,
          'ip': '216.82.236.63',
          'name': '216.82.236.63',
          'coordinates': {
            'lon': -78.7238998413086,
            'lat': 35.746307373046875
          },
          'reputation': [

          ],
          'region': 'NC'
        },
        'micros': 775,
        'id': 'F5flmmYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62965,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.818',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.818',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVRPx1NSOKOMMKNKNSRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Middletown',
          'ipLowBits': 2731016613,
          'ip': '162.200.1.165',
          'name': '162.200.1.165',
          'coordinates': {
            'lon': -72.6530990600586,
            'lat': 41.54969787597656
          },
          'reputation': [

          ],
          'region': 'CT'
        },
        'micros': 776,
        'id': 'DmGKJWYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62953,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.744',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 50,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 2001,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 106,
            'startTime': '2016-08-19T12:00:30.742',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RUUTVx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 767,
        'id': 'Ga4mAmYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 58879,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.726',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.726',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVOTx1VRKNTPKNUKNNVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'AVEA Iletisim Hizmetleri A.S.',
          'country': 'TR',
          'port': 8080,
          'ipLowBits': 1605177975,
          'ip': '95.173.18.119',
          'name': '95.173.18.119',
          'coordinates': {
            'lon': 28.955001831054688,
            'lat': 41.01359558105469
          },
          'reputation': [

          ],
          'asn': 20978
        },
        'micros': 766,
        'id': 'VgZBiGYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62927,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.716',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.716',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVOOx1NVKTRKPUKOPPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Dearborn',
          'ipLowBits': 323692265,
          'ip': '19.75.38.233',
          'name': '19.75.38.233',
          'coordinates': {
            'lon': -83.17630004882812,
            'lat': 42.322296142578125
          },
          'reputation': [

          ],
          'region': 'MI'
        },
        'micros': 764,
        'id': 'VfRAI2YxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62922,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.678',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.678',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVMQx1PPKNSKOORKNORx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 554754429,
          'ip': '33.16.225.125',
          'name': '33.16.225.125',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 761,
        'id': 's3Zki2YxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62904,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.670',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.670',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVMMx1ROKQPKQOKOMUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Boardman',
          'ipLowBits': 875244240,
          'ip': '52.43.42.208',
          'name': '52.43.42.208',
          'coordinates': {
            'lon': -119.52899932861328,
            'lat': 45.77879333496094
          },
          'reputation': [

          ],
          'region': 'OR'
        },
        'micros': 760,
        'id': 's2x5d2YxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62900,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.666',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.666',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUVUx1TRKTQKUTKOOQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Comcast Cable Communications, Inc.',
          'country': 'US',
          'port': 8080,
          'city': 'Miami',
          'ipLowBits': 1263163360,
          'ip': '75.74.87.224',
          'name': '75.74.87.224',
          'coordinates': {
            'lon': -80.41200256347656,
            'lat': 25.6614990234375
          },
          'reputation': [

          ],
          'region': 'FL',
          'asn': 7922
        },
        'micros': 758,
        'id': 's2keFWYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62898,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.656',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.656',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUVPx1NSUKNMNKVVKOMPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Ministry of Economy',
          'country': 'AR',
          'port': 8080,
          'city': 'Hipolito Yrigoyen',
          'ipLowBits': 2825216971,
          'ip': '168.101.99.203',
          'name': '168.101.99.203',
          'coordinates': {
            'lon': -66.32420349121094,
            'lat': -32.918792724609375
          },
          'reputation': [

          ],
          'region': '19',
          'asn': 7417
        },
        'micros': 756,
        'id': 's2C5oGYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62893,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.638',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.638',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUUTx1TNKNNVKOMRKNRRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'MCI Communications Services, Inc. d/b/a Verizon Business',
          'country': 'US',
          'port': 8080,
          'ipLowBits': 1199033755,
          'ip': '71.119.205.155',
          'name': '71.119.205.155',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ],
          'asn': 701
        },
        'micros': 755,
        'id': '5u2YemYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62887,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.616',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.616',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUTTx1VOKVOKVMKORx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Societe Francaise du Radiotelephone S.A',
          'country': 'FR',
          'port': 8080,
          'ipLowBits': 1549556249,
          'ip': '92.92.90.25',
          'name': '92.92.90.25',
          'coordinates': {
            'lon': 2.350006103515625,
            'lat': 48.86000061035156
          },
          'reputation': [

          ],
          'asn': 15557
        },
        'micros': 752,
        'id': 'NtUHB2YxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62877,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.306',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.306',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUOOx1NORKNQMKSKNMVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'KR',
          'port': 8080,
          'ipLowBits': 2106328685,
          'ip': '125.140.6.109',
          'name': '125.140.6.109',
          'coordinates': {
            'lon': 126.98001098632812,
            'lat': 37.57000732421875
          },
          'reputation': [

          ]
        },
        'micros': 677,
        'id': 'GXZ0DWYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62822,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.296',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.296',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUNTx1NVKQPKRPKNSRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Dearborn',
          'ipLowBits': 321598885,
          'ip': '19.43.53.165',
          'name': '19.43.53.165',
          'coordinates': {
            'lon': -83.17630004882812,
            'lat': 42.322296142578125
          },
          'reputation': [

          ],
          'region': 'MI'
        },
        'micros': 674,
        'id': 'GWbjp2YyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62817,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.286',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.286',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUNPx1PPKRKPQKOQUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 553984760,
          'ip': '33.5.34.248',
          'name': '33.5.34.248',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 676,
        'id': 'GUlJdWYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62813,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.284',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.284',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUNOx1NOMKSVKNTRKOOTx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Chinanet',
          'country': 'CN',
          'port': 8080,
          'city': 'Ürümqi',
          'ipLowBits': 2017832931,
          'ip': '120.69.175.227',
          'name': '120.69.175.227',
          'coordinates': {
            'lon': 87.60049438476562,
            'lat': 43.800994873046875
          },
          'reputation': [

          ],
          'region': '13',
          'asn': 4134
        },
        'micros': 675,
        'id': 'GUfC1GYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62812,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:30.282',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-19T12:00:30.282',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUNNx1NOMKQSKORNKTx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'CN',
          'port': 8080,
          'city': 'Beijing',
          'ipLowBits': 2016344839,
          'ip': '120.46.251.7',
          'name': '120.46.251.7',
          'coordinates': {
            'lon': 116.3883056640625,
            'lat': 39.92889404296875
          },
          'reputation': [

          ],
          'region': '22'
        },
        'micros': 676,
        'id': 'Ize1V2YyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62811,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:24.038',
        'protocol': {
          'service': 'HTTP'
        },
        'data': {
          'http': {
            'originalMimeTyes': [

            ],
            'fileName': '',
            'method': 'GET',
            'responseFileUids': [
              'FKNuv33k2lcCcU8Ng8'
            ],
            '__info': {
              'userAgentLen': 23
            },
            'responseLength': 1070,
            'userAgent': 'Microsoft-CryptoAPI/6.1',
            'requestLength': 0,
            'proxied': [

            ],
            'originalFileUids': [

            ],
            'responseMimeTyes': [

            ],
            'uri': '/msdownload/update/v3/static/trustedr/en/F18B538D1BE903B6A6F056435B171589CAF36BF2.crt',
            'statusMessage': 'OK',
            'tags': [

            ],
            'referrer': '',
            'password': '',
            'depth': 1,
            'host': 'www.download.windowsupdate.com',
            'statusCode': 200,
            'infoMessage': '',
            'username': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOTNNx1OPKNRKQKNSx1UM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Akamai International B.V.',
          'country': 'US',
          'port': 80,
          'city': 'Cambridge',
          'ipLowBits': 386860048,
          'ip': '23.15.4.16',
          'name': '23.15.4.16',
          'coordinates': {
            'lon': -71.08429718017578,
            'lat': 42.36259460449219
          },
          'reputation': [

          ],
          'region': 'MA',
          'asn': 20940
        },
        'micros': 44,
        'id': 'cegsWmZwEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62711,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'http'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:12.564',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 48,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 2000,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 104,
            'startTime': '2016-08-19T12:00:12.562',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RMMMNx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 285,
        'id': 'LL56mmYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 50001,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:12.540',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 44,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 6000,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 100,
            'startTime': '2016-08-19T12:00:12.534',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RMVRTx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 262,
        'id': 'LK84VmYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 50957,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:12.538',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 50,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 8000,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 106,
            'startTime': '2016-08-19T12:00:12.530',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SQUQTx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 261,
        'id': 'IyCq4WYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 64847,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:12.536',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 44,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 14000,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 100,
            'startTime': '2016-08-19T12:00:12.522',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RPMMSx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 262,
        'id': 'Ix4S0GYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 53006,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:12.526',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 48,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 6001,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 104,
            'startTime': '2016-08-19T12:00:12.520',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RVSNSx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 260,
        'id': 'Ixt6v2YyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 59616,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:12.496',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 50,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 1999,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 106,
            'startTime': '2016-08-19T12:00:12.494',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SROMUx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 259,
        'id': 'ItWYHmYyEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 65208,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:12.476',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 48,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 2000,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 104,
            'startTime': '2016-08-19T12:00:12.474',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RMPVNx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 256,
        'id': 'F4kYgGYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 50391,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:12.468',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 44,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 10003,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 100,
            'startTime': '2016-08-19T12:00:12.458',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RRPSUx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 251,
        'id': 'F4dqz2YxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 55368,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:12.466',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 44,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 10001,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 100,
            'startTime': '2016-08-19T12:00:12.456',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SORMMx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 252,
        'id': 'F4W9HmYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62500,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-19T12:00:12.462',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 50,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 14002,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 106,
            'startTime': '2016-08-19T12:00:12.448',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RTUOUx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 251,
        'id': 'F4Q2fWYxEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 57828,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:32.292',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:32.292',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPTPx1NNRKTOKOOSKQMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Viettel Corporation',
          'country': 'VN',
          'port': 8080,
          'city': 'Cho Ha',
          'ipLowBits': 1934156328,
          'ip': '115.72.226.40',
          'name': '115.72.226.40',
          'coordinates': {
            'lon': 106.60000610351562,
            'lat': 21.416702270507812
          },
          'reputation': [

          ],
          'region': '71',
          'asn': 7552
        },
        'micros': 365,
        'id': 'i5lHDGYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63373,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:32.218',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:32.218',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPQRx1SNKNSSKOOVKNOPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Chinanet',
          'country': 'CN',
          'port': 8080,
          'city': 'Kunming',
          'ipLowBits': 1034347899,
          'ip': '61.166.229.123',
          'name': '61.166.229.123',
          'coordinates': {
            'lon': 102.71829223632812,
            'lat': 25.038894653320312
          },
          'reputation': [

          ],
          'region': '29',
          'asn': 4134
        },
        'micros': 360,
        'id': 'JR-lXGYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63345,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:32.190',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:32.190',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPPRx1NPUKNURKNPVKONNx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'AVANZADAS INFORMATICAS Y TELECOMUNICACIONES SAITEL',
          'country': 'EC',
          'port': 8080,
          'ipLowBits': 2327415763,
          'ip': '138.185.139.211',
          'name': '138.185.139.211',
          'coordinates': {
            'lon': -77.5,
            'lat': -2.0
          },
          'reputation': [

          ],
          'asn': 263805
        },
        'micros': 357,
        'id': '9kuTqmYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63335,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:32.174',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:32.174',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPOVx1NNTKONUKOQPKUUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'National Internet Backbone',
          'country': 'IN',
          'port': 8080,
          'city': 'Bangalore',
          'ipLowBits': 1977283416,
          'ip': '117.218.243.88',
          'name': '117.218.243.88',
          'coordinates': {
            'lon': 77.58331298828125,
            'lat': 12.983306884765625
          },
          'reputation': [

          ],
          'region': '19',
          'asn': 9829
        },
        'micros': 356,
        'id': '9jlrNGYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63329,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:32.162',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:32.162',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPOQx1NMNKOTKNMSKPVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'CNCGROUP China169 Backbone',
          'country': 'CN',
          'port': 8080,
          'city': 'Hebei',
          'ipLowBits': 1696295463,
          'ip': '101.27.106.39',
          'name': '101.27.106.39',
          'coordinates': {
            'lon': 115.27499389648438,
            'lat': 39.88969421386719
          },
          'reputation': [

          ],
          'region': '10',
          'asn': 4837
        },
        'micros': 354,
        'id': '9jAcX2YlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63324,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:32.054',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:32.054',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPPMPx1QTKNUSKVKRUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'CA',
          'port': 8080,
          'city': 'Ottawa',
          'ipLowBits': 800721210,
          'ip': '47.186.9.58',
          'name': '47.186.9.58',
          'coordinates': {
            'lon': -75.82649993896484,
            'lat': 45.34330749511719
          },
          'reputation': [

          ],
          'region': 'ON'
        },
        'micros': 336,
        'id': '44iRb2YlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63303,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:32.032',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:32.032',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOVQx1NQVKSSKONVKUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Cogent Communications',
          'country': 'US',
          'port': 8080,
          'ipLowBits': 2504186632,
          'ip': '149.66.219.8',
          'name': '149.66.219.8',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ],
          'asn': 174
        },
        'micros': 331,
        'id': 'AuI8A2YmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63294,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:32.000',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:32.000',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOUQx1NOSKNMPKNRQKOOSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Softbank BB Corp.',
          'country': 'JP',
          'port': 8080,
          'ipLowBits': 2120719074,
          'ip': '126.103.154.226',
          'name': '126.103.154.226',
          'coordinates': {
            'lon': 139.69000244140625,
            'lat': 35.69000244140625
          },
          'reputation': [

          ],
          'asn': 17676
        },
        'micros': 328,
        'id': '3IugyWYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63284,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.952',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.952',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOTMx1NPSKNNKNOTKORMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Dearborn',
          'ipLowBits': 2282455034,
          'ip': '136.11.127.250',
          'name': '136.11.127.250',
          'coordinates': {
            'lon': -83.17630004882812,
            'lat': 42.322296142578125
          },
          'reputation': [

          ],
          'region': 'MI'
        },
        'micros': 322,
        'id': 'Iau0q2YmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63270,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.942',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.942',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOSRx1OOPKNQOKNMUKNQPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Long Distance & Mobile Business Group',
          'country': 'TW',
          'port': 8080,
          'city': 'Taipei',
          'ipLowBits': 3750653071,
          'ip': '223.142.108.143',
          'name': '223.142.108.143',
          'coordinates': {
            'lon': 121.52499389648438,
            'lat': 25.039199829101562
          },
          'reputation': [

          ],
          'region': '03',
          'asn': 17421
        },
        'micros': 324,
        'id': 'IZh6xmYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63265,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.918',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.918',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPORQx1TTKONOKRPKSUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Telenor A/S',
          'country': 'DK',
          'port': 8080,
          'ipLowBits': 1305752900,
          'ip': '77.212.53.68',
          'name': '77.212.53.68',
          'coordinates': {
            'lon': 12.56829833984375,
            'lat': 55.67610168457031
          },
          'reputation': [

          ],
          'asn': 9158
        },
        'micros': 318,
        'id': 'IVWlWmYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63254,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.882',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.882',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOPUx1SOKSKOOSKNQRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'BT Public Internet Service',
          'country': 'GB',
          'port': 8080,
          'ipLowBits': 1040638609,
          'ip': '62.6.226.145',
          'name': '62.6.226.145',
          'coordinates': {
            'lon': -0.1300048828125,
            'lat': 51.5
          },
          'reputation': [

          ],
          'asn': 2856
        },
        'micros': 317,
        'id': 'Nx2femYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63238,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.878',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.878',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOPSx1NPSKPKPMKNVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Dearborn',
          'ipLowBits': 2281905683,
          'ip': '136.3.30.19',
          'name': '136.3.30.19',
          'coordinates': {
            'lon': -83.17630004882812,
            'lat': 42.322296142578125
          },
          'reputation': [

          ],
          'region': 'MI'
        },
        'micros': 317,
        'id': 'NxXXSGYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63236,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.854',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.854',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOOUx1VVKNSTKVKVPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 1671891293,
          'ip': '99.167.9.93',
          'name': '99.167.9.93',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 315,
        'id': 'Nv7M0WYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63228,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.798',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.798',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOMTx1SPKNNRKNNSKNRUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'MCI Communications Services, Inc. d/b/a Verizon Business',
          'country': 'US',
          'port': 8080,
          'city': 'Linden',
          'ipLowBits': 1064531102,
          'ip': '63.115.116.158',
          'name': '63.115.116.158',
          'coordinates': {
            'lon': -74.24939727783203,
            'lat': 40.62469482421875
          },
          'reputation': [

          ],
          'region': 'NJ',
          'asn': 701
        },
        'micros': 308,
        'id': 'LAi_yGYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63207,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.788',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.788',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOMOx1PTKNPUKNQRKNOx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'EWE TEL GmbH',
          'country': 'DE',
          'port': 8080,
          'ipLowBits': 629838092,
          'ip': '37.138.145.12',
          'name': '37.138.145.12',
          'coordinates': {
            'lon': 9.0,
            'lat': 51.0
          },
          'reputation': [

          ],
          'asn': 9145
        },
        'micros': 307,
        'id': '3Efg-GYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63202,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.784',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.784',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPOMMx1STKQOKNPOKNUSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Rio Rancho',
          'ipLowBits': 1126859962,
          'ip': '67.42.132.186',
          'name': '67.42.132.186',
          'coordinates': {
            'lon': -106.72319793701172,
            'lat': 35.2467041015625
          },
          'reputation': [

          ],
          'region': 'NM'
        },
        'micros': 307,
        'id': '3EGfZmYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63200,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.738',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.738',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNVNx1VQKONMKOOKVTx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Ziggo B.V.',
          'country': 'NL',
          'port': 8080,
          'city': 'Voorburg',
          'ipLowBits': 1590826593,
          'ip': '94.210.22.97',
          'name': '94.210.22.97',
          'coordinates': {
            'lon': 4.3596954345703125,
            'lat': 52.07420349121094
          },
          'reputation': [

          ],
          'region': '11',
          'asn': 9143
        },
        'micros': 301,
        'id': 'E7K9Z2YmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63191,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.702',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 44,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 2000,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 100,
            'startTime': '2016-08-18T12:00:31.700',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RUQVUx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 299,
        'id': 'GvYtJ2YmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 58498,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.648',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.648',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNSMx1SKTQKNOSKNQNx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Fort Huachuca',
          'ipLowBits': 105545357,
          'ip': '6.74.126.141',
          'name': '6.74.126.141',
          'coordinates': {
            'lon': -110.36070251464844,
            'lat': 31.527297973632812
          },
          'reputation': [

          ],
          'region': 'AZ'
        },
        'micros': 296,
        'id': 'GBXJe2YmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63160,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.642',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'reqBytes': 0,
            'missedBytes': 0,
            'history': 'Sr',
            'respPackets': 1,
            'respIPBytes': 40,
            'respBytes': 0,
            'localResponse': false,
            'duration': 28001,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.614',
            'state': 'REJ',
            'reqPackets': 1,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNROx1NOSKOOOKQKNVUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Softbank BB Corp.',
          'country': 'JP',
          'port': 8080,
          'ipLowBits': 2128479430,
          'ip': '126.222.4.198',
          'name': '126.222.4.198',
          'coordinates': {
            'lon': 139.69000244140625,
            'lat': 35.69000244140625
          },
          'reputation': [

          ],
          'asn': 17676
        },
        'micros': 294,
        'id': 'GBLjSmYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63152,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.622',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.622',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNRSx1NQRKNTRKUTKOMMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'NL',
          'port': 8080,
          'city': 'Utrecht',
          'ipLowBits': 2444187592,
          'ip': '145.175.87.200',
          'name': '145.175.87.200',
          'coordinates': {
            'lon': 5.1190948486328125,
            'lat': 52.09379577636719
          },
          'reputation': [

          ],
          'region': '09'
        },
        'micros': 294,
        'id': 'GAe_t2YmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63156,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.610',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.610',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNRMx1SRKQRKSTKNUQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 1093485496,
          'ip': '65.45.67.184',
          'name': '65.45.67.184',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 294,
        'id': 'F_aBomYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63150,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.586',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.586',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNQOx1TVKSTKUUKOPQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Tiscali UK Limited',
          'country': 'GB',
          'port': 8080,
          'ipLowBits': 1329813738,
          'ip': '79.67.88.234',
          'name': '79.67.88.234',
          'coordinates': {
            'lon': -0.1300048828125,
            'lat': 51.5
          },
          'reputation': [

          ],
          'asn': 9105
        },
        'micros': 289,
        'id': '82Bag2YlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63142,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.578',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.578',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNPUx1NRTKOOTKNRSKUQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'IN',
          'port': 8080,
          'city': 'Mumbai',
          'ipLowBits': 2648939604,
          'ip': '157.227.156.84',
          'name': '157.227.156.84',
          'coordinates': {
            'lon': 72.8258056640625,
            'lat': 18.975006103515625
          },
          'reputation': [

          ],
          'region': '16'
        },
        'micros': 288,
        'id': 'zFL922YmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63138,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.572',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.572',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNPRx1NOUKUVKNUSKNORx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'BBN Technologies Corp.',
          'country': 'US',
          'port': 8080,
          'city': 'Cambridge',
          'ipLowBits': 2153364093,
          'ip': '128.89.186.125',
          'name': '128.89.186.125',
          'coordinates': {
            'lon': -71.13289642333984,
            'lat': 42.3800048828125
          },
          'reputation': [

          ],
          'region': 'MA',
          'asn': 11488
        },
        'micros': 286,
        'id': 'zEpLSGYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63135,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.536',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.536',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNOPx1VMKNONKVRKRSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Orange S.A.',
          'country': 'FR',
          'port': 8080,
          'city': 'Paris',
          'ipLowBits': 1517903672,
          'ip': '90.121.95.56',
          'name': '90.121.95.56',
          'coordinates': {
            'lon': 2.3332977294921875,
            'lat': 48.86669921875
          },
          'reputation': [

          ],
          'region': 'A8',
          'asn': 3215
        },
        'micros': 286,
        'id': 'zCBVDWYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63123,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.506',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.506',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPNNUx1SOKNNQKNSQKOMVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'ETISALAT MISR',
          'country': 'EG',
          'port': 8080,
          'ipLowBits': 1047700689,
          'ip': '62.114.164.209',
          'name': '62.114.164.209',
          'coordinates': {
            'lon': 31.366592407226562,
            'lat': 30.050003051757812
          },
          'reputation': [

          ],
          'asn': 36992
        },
        'micros': 279,
        'id': 'zA_aSGYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63118,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.450',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.450',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMVVx1UTKRTKRKNOTx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'TDC A/S',
          'country': 'DK',
          'port': 8080,
          'city': 'Kongerslev',
          'ipLowBits': 1463354751,
          'ip': '87.57.5.127',
          'name': '87.57.5.127',
          'coordinates': {
            'lon': 10.126693725585938,
            'lat': 56.90559387207031
          },
          'reputation': [

          ],
          'region': '19',
          'asn': 3292
        },
        'micros': 274,
        'id': 'p8ehk2YlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63099,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.442',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.442',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMVRx1NQOKNMKNTMKNSMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'CA',
          'port': 8080,
          'city': 'Toronto',
          'ipLowBits': 2383063712,
          'ip': '142.10.170.160',
          'name': '142.10.170.160',
          'coordinates': {
            'lon': -79.38600158691406,
            'lat': 43.656402587890625
          },
          'reputation': [

          ],
          'region': 'ON'
        },
        'micros': 272,
        'id': 'p8Ccr2YlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63095,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.368',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.368',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMSSx1ONQKNTSKOOUKNRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 3601916943,
          'ip': '214.176.228.15',
          'name': '214.176.228.15',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 255,
        'id': 'GuQrwmYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63066,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.332',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.332',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMRNx1UTKROKOMTKOMMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'TDC A/S',
          'country': 'DK',
          'port': 8080,
          'ipLowBits': 1463078856,
          'ip': '87.52.207.200',
          'name': '87.52.207.200',
          'coordinates': {
            'lon': 12.56829833984375,
            'lat': 55.67610168457031
          },
          'reputation': [

          ],
          'asn': 3292
        },
        'micros': 248,
        'id': 'Grj9AGYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63051,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.324',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.324',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMQTx1VSKVKNVKNOVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Network Solutions, LLC',
          'country': 'US',
          'port': 8080,
          'city': 'Jacksonville',
          'ipLowBits': 1611207553,
          'ip': '96.9.19.129',
          'name': '96.9.19.129',
          'coordinates': {
            'lon': -81.54010009765625,
            'lat': 30.143798828125
          },
          'reputation': [

          ],
          'region': 'FL',
          'asn': 19871
        },
        'micros': 248,
        'id': 'GrC_nGYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63047,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.318',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.318',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMQQx1NQPKONRKNSTKNPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Georgia Institute of Technology',
          'country': 'US',
          'port': 8080,
          'city': 'Atlanta',
          'ipLowBits': 2413274893,
          'ip': '143.215.167.13',
          'name': '143.215.167.13',
          'coordinates': {
            'lon': -84.39800262451172,
            'lat': 33.77630615234375
          },
          'reputation': [

          ],
          'region': 'GA',
          'asn': 2637
        },
        'micros': 247,
        'id': 'GqoI2WYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63044,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.312',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.312',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMQNx1NRMKNUVKNVNKNPSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'VE',
          'port': 8080,
          'city': 'Caracas',
          'ipLowBits': 2529017736,
          'ip': '150.189.191.136',
          'name': '150.189.191.136',
          'coordinates': {
            'lon': -66.91670227050781,
            'lat': 10.5
          },
          'reputation': [

          ],
          'region': '25'
        },
        'micros': 246,
        'id': 'Gp8zZmYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63041,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.262',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.262',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMOTx1OMMKNMVKOOKOMOx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'VE',
          'port': 8080,
          'ipLowBits': 3362592458,
          'ip': '200.109.22.202',
          'name': '200.109.22.202',
          'coordinates': {
            'lon': -66.0,
            'lat': 8.0
          },
          'reputation': [

          ]
        },
        'micros': 239,
        'id': 'GmBVmGYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63027,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.230',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.230',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMNUx1OKNTQKOQUKNTUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Deutsche Telekom AG',
          'country': 'DE',
          'port': 8080,
          'ipLowBits': 45021362,
          'ip': '2.174.248.178',
          'name': '2.174.248.178',
          'coordinates': {
            'lon': 9.0,
            'lat': 51.0
          },
          'reputation': [

          ],
          'asn': 3320
        },
        'micros': 236,
        'id': 'e2pA3mYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63018,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.206',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.206',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMNMx1NOVKOQTKQOKPTx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Verein zur Foerderung eines Deutschen Forschungsnetzes e.V.',
          'country': 'DE',
          'port': 8080,
          'city': 'Luft',
          'ipLowBits': 2180459045,
          'ip': '129.247.42.37',
          'name': '129.247.42.37',
          'coordinates': {
            'lon': 9.5,
            'lat': 47.850006103515625
          },
          'reputation': [

          ],
          'region': '01',
          'asn': 680
        },
        'micros': 236,
        'id': 'e1xeJ2YmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63010,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.202',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.202',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SPMMUx1NSPKNQUKNMKNSx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'NTT Communications Corporation',
          'country': 'JP',
          'port': 8080,
          'ipLowBits': 2744388112,
          'ip': '163.148.10.16',
          'name': '163.148.10.16',
          'coordinates': {
            'lon': 139.69000244140625,
            'lat': 35.69000244140625
          },
          'reputation': [

          ],
          'asn': 4713
        },
        'micros': 234,
        'id': 'e1VZRWYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 63008,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.162',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.162',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVVOx1NVPKNRTKNMTKOMMx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'UNINETT, The Norwegian University & Research Network',
          'country': 'NO',
          'port': 8080,
          'ipLowBits': 3248319432,
          'ip': '193.157.107.200',
          'name': '193.157.107.200',
          'coordinates': {
            'lon': 10.75,
            'lat': 59.94999694824219
          },
          'reputation': [

          ],
          'asn': 224
        },
        'micros': 226,
        'id': 'K_IqfWYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62992,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.138',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.138',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVUMx1USKNOUKPTKNVUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'BT Public Internet Service',
          'country': 'GB',
          'port': 8080,
          'city': 'Ashton-under-lyne',
          'ipLowBits': 1451238854,
          'ip': '86.128.37.198',
          'name': '86.128.37.198',
          'coordinates': {
            'lon': -2.0865936279296875,
            'lat': 53.49409484863281
          },
          'reputation': [

          ],
          'region': 'O1',
          'asn': 2856
        },
        'micros': 223,
        'id': 'K9lLQWYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62980,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.134',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.134',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVTUx1VQKNVTKOMRKNNUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Hutchison 3G UK Limited',
          'country': 'GB',
          'port': 8080,
          'ipLowBits': 1590021494,
          'ip': '94.197.205.118',
          'name': '94.197.205.118',
          'coordinates': {
            'lon': -0.1300048828125,
            'lat': 51.5
          },
          'reputation': [

          ],
          'asn': 60339
        },
        'micros': 223,
        'id': 'dChX0WYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62978,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.130',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.130',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVTSx1NQVKNSKNMUKNQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Troy',
          'ipLowBits': 2500881422,
          'ip': '149.16.108.14',
          'name': '149.16.108.14',
          'coordinates': {
            'lon': -73.59510040283203,
            'lat': 42.74949645996094
          },
          'reputation': [

          ],
          'region': 'NY'
        },
        'micros': 223,
        'id': 'dA18z2YmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62976,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.124',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.124',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVTPx1NTOKRQKNOTKOMUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 2889252816,
          'ip': '172.54.127.208',
          'name': '172.54.127.208',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 221,
        'id': 'dAR8HGYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62973,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.108',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.108',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVSRx1ONSKUOKOPSKSPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Raleigh',
          'ipLowBits': 3629313087,
          'ip': '216.82.236.63',
          'name': '216.82.236.63',
          'coordinates': {
            'lon': -78.7238998413086,
            'lat': 35.746307373046875
          },
          'reputation': [

          ],
          'region': 'NC'
        },
        'micros': 222,
        'id': 'c94vZGYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62965,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:31.070',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:31.070',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVRPx1NSOKOMMKNKNSRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Middletown',
          'ipLowBits': 2731016613,
          'ip': '162.200.1.165',
          'name': '162.200.1.165',
          'coordinates': {
            'lon': -72.6530990600586,
            'lat': 41.54969787597656
          },
          'reputation': [

          ],
          'region': 'CT'
        },
        'micros': 217,
        'id': 'vhRxkGYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62953,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:30.996',
        'protocol': {
          'service': 'dns',
          'udpOrTcp': 'udp'
        },
        'data': {
          'conn': {
            'reqBytes': 50,
            'missedBytes': 0,
            'history': 'D',
            'respPackets': 0,
            'respIPBytes': 0,
            'respBytes': 0,
            'localResponse': false,
            'duration': 2001,
            'protocol': 'udp',
            'localOrigin': true,
            'service': 'dns',
            'reqIPBytes': 106,
            'startTime': '2016-08-18T12:00:30.994',
            'state': 'S0',
            'reqPackets': 2,
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1RUUTVx1OOQKMKMKOROx1RPRR'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'port': 5355,
          'ipLowBits': 3758096636,
          'ip': '224.0.0.252',
          'name': '224.0.0.252',
          'reputation': [

          ]
        },
        'micros': 208,
        'id': '1ojH7GYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 58879,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:30.978',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:30.978',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVOTx1VRKNTPKNUKNNVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'AVEA Iletisim Hizmetleri A.S.',
          'country': 'TR',
          'port': 8080,
          'ipLowBits': 1605177975,
          'ip': '95.173.18.119',
          'name': '95.173.18.119',
          'coordinates': {
            'lon': 28.955001831054688,
            'lat': 41.01359558105469
          },
          'reputation': [

          ],
          'asn': 20978
        },
        'micros': 204,
        'id': '8wG_rGYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62927,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:30.968',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:30.968',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVOOx1NVKTRKPUKOPPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Dearborn',
          'ipLowBits': 323692265,
          'ip': '19.75.38.233',
          'name': '19.75.38.233',
          'coordinates': {
            'lon': -83.17630004882812,
            'lat': 42.322296142578125
          },
          'reputation': [

          ],
          'region': 'MI'
        },
        'micros': 185,
        'id': 'K9PM_mYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62922,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:30.930',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:30.930',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVMQx1PPKNSKOORKNORx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 554754429,
          'ip': '33.16.225.125',
          'name': '33.16.225.125',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 183,
        'id': 'K664vGYmEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62904,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:30.922',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:30.922',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOVMMx1ROKQPKQOKOMUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Boardman',
          'ipLowBits': 875244240,
          'ip': '52.43.42.208',
          'name': '52.43.42.208',
          'coordinates': {
            'lon': -119.52899932861328,
            'lat': 45.77879333496094
          },
          'reputation': [

          ],
          'region': 'OR'
        },
        'micros': 181,
        'id': '9iRciWYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62900,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:30.918',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:30.918',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUVUx1TRKTQKUTKOOQx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Comcast Cable Communications, Inc.',
          'country': 'US',
          'port': 8080,
          'city': 'Miami',
          'ipLowBits': 1263163360,
          'ip': '75.74.87.224',
          'name': '75.74.87.224',
          'coordinates': {
            'lon': -80.41200256347656,
            'lat': 25.6614990234375
          },
          'reputation': [

          ],
          'region': 'FL',
          'asn': 7922
        },
        'micros': 179,
        'id': '9iDaF2YlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62898,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:30.908',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:30.908',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUVPx1NSUKNMNKVVKOMPx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Ministry of Economy',
          'country': 'AR',
          'port': 8080,
          'city': 'Hipolito Yrigoyen',
          'ipLowBits': 2825216971,
          'ip': '168.101.99.203',
          'name': '168.101.99.203',
          'coordinates': {
            'lon': -66.32420349121094,
            'lat': -32.918792724609375
          },
          'reputation': [

          ],
          'region': '19',
          'asn': 7417
        },
        'micros': 179,
        'id': '9hUaQmYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62893,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:30.890',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:30.890',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUUTx1TNKNNVKOMRKNRRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'MCI Communications Services, Inc. d/b/a Verizon Business',
          'country': 'US',
          'port': 8080,
          'ipLowBits': 1199033755,
          'ip': '71.119.205.155',
          'name': '71.119.205.155',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ],
          'asn': 701
        },
        'micros': 176,
        'id': '9gUUqGYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62887,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:30.868',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:30.868',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUTTx1VOKVOKVMKORx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Societe Francaise du Radiotelephone S.A',
          'country': 'FR',
          'port': 8080,
          'ipLowBits': 1549556249,
          'ip': '92.92.90.25',
          'name': '92.92.90.25',
          'coordinates': {
            'lon': 2.350006103515625,
            'lat': 48.86000061035156
          },
          'reputation': [

          ],
          'asn': 15557
        },
        'micros': 173,
        'id': 'TRNrQGYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62877,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:30.558',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:30.558',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUOOx1NORKNQMKSKNMVx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'KR',
          'port': 8080,
          'ipLowBits': 2106328685,
          'ip': '125.140.6.109',
          'name': '125.140.6.109',
          'coordinates': {
            'lon': 126.98001098632812,
            'lat': 37.57000732421875
          },
          'reputation': [

          ]
        },
        'micros': 122,
        'id': 'HWrLcWYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62822,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:30.548',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:30.548',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUNTx1NVKQPKRPKNSRx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'city': 'Dearborn',
          'ipLowBits': 321598885,
          'ip': '19.43.53.165',
          'name': '19.43.53.165',
          'coordinates': {
            'lon': -83.17630004882812,
            'lat': 42.322296142578125
          },
          'reputation': [

          ],
          'region': 'MI'
        },
        'micros': 123,
        'id': 'HVrF3GYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62817,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:30.538',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:30.538',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUNPx1PPKRKPQKOQUx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'country': 'US',
          'port': 8080,
          'ipLowBits': 553984760,
          'ip': '33.5.34.248',
          'name': '33.5.34.248',
          'coordinates': {
            'lon': -97.0,
            'lat': 38.0
          },
          'reputation': [

          ]
        },
        'micros': 122,
        'id': 'HUh2V2YlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62813,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ],
    [
      {
        'date': '2016-08-18T12:00:30.536',
        'protocol': {
          'service': 'HTTP alternate',
          'udpOrTcp': 'TCP'
        },
        'data': {
          'conn': {
            'missedBytes': 0,
            'history': 'S',
            'respPackets': 0,
            'respIPBytes': 0,
            'localResponse': false,
            'duration': 0,
            'protocol': 'tcp',
            'localOrigin': true,
            'service': '',
            'reqIPBytes': 52,
            'startTime': '2016-08-18T12:00:30.536',
            'reqPackets': 1,
            'state': 'S0',
            'tunnel': ''
          }
        },
        'origin': 'live',
        'correlationIds': [
          'CNMKPKNSOKNMRx1SOUNOx1NOMKSVKNTRKOOTx1UMUM'
        ],
        'host': 'rank-sensor',
        'destination': {
          'ipHighBits': 0,
          'owner': 'Chinanet',
          'country': 'CN',
          'port': 8080,
          'city': 'Ürümqi',
          'ipLowBits': 2017832931,
          'ip': '120.69.175.227',
          'name': '120.69.175.227',
          'coordinates': {
            'lon': 87.60049438476562,
            'lat': 43.800994873046875
          },
          'reputation': [

          ],
          'region': '13',
          'asn': 4134
        },
        'micros': 124,
        'id': 'HUJb1mYlEeaWSgrOrMuSaQ',
        'source': {
          'ipHighBits': 0,
          'internal': true,
          'port': 62812,
          'ipLowBits': 168010345,
          'ip': '10.3.162.105',
          'name': '10.3.162.105',
          'reputation': [

          ]
        },
        'type': 'conn'
      }
    ]
  ]
};*/

/*const data = {
  "total": 23,
  "next": 23,
  "columns": [
    {
      "name": "json",
      "displayName": "json",
      "columnType": "ATTRIBUTE",
      "dataType": "OBJECT",
      "sortable": true
    }
  ],
  "sorts": [
    {
      "field": "date",
      "order": "DESC"
    }
  ],
  "rows": [
    [
      {
        "date": "2016-09-21T13:01:17.472",
        "protocol": {
          "service": "ssh",
          "udpOrTcp": "tcp"
        },
        "data": {
          "conn": {
            "reqBytes": 713,
            "missedBytes": 0,
            "history": "ShAdDafF",
            "respPackets": 15,
            "respIPBytes": 3155,
            "respBytes": 2075,
            "localResponse": false,
            "duration": 2005814,
            "protocol": "tcp",
            "localOrigin": false,
            "service": "ssh",
            "reqIPBytes": 1461,
            "startTime": "2016-09-21T13:01:15.466",
            "state": "SF",
            "reqPackets": 14,
            "tunnel": "",
            "status": "success"
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1RVPPO"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 830,
        "id": "gBOq53_7EeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 59332,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-09-21T13:01:15.606",
        "protocol": {
          "service": "SSH"
        },
        "data": {
          "ssh": {
            "kex_alg": "curve25519-sha256@libssh.org",
            "server": "SSH-2.0-OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.7",
            "mac_alg": "hmac-sha1",
            "host_key": "df:e3:98:68:6a:29:2b:b3:1a:6e:cf:6f:e8:af:61:01",
            "success": false,
            "cipher_alg": "aes128-ctr",
            "client": "SSH-2.0-libssh-0.6.3",
            "host_key_alg": "ssh-rsa",
            "compression_alg": "none",
            "version": "2",
            "direction": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1RVPPO"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 104,
        "id": "hh7nw3_7EeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 59332,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "ssh"
      }
    ],
    [
      {
        "date": "2016-09-21T12:34:31.427",
        "data": {
          "rank_alert": {
            "triggered": "2016-09-21T08:57:47.723",
            "triggerName": "t_failures",
            "created": "2016-09-21T08:57:47.723",
            "interesting": [
              {
                "additionalInfo": {
                  "country": "UA",
                  "internal": false,
                  "displayName": "185.110.132.201",
                  "enriched": true,
                  "name": "185.110.132.201",
                  "coordinates": {
                    "lon": 30.523300170898438,
                    "lat": 50.44999694824219
                  }
                },
                "id": "OikKAfhBaXBOMTg1LjExMC4xMzIuMjAx-Q",
                "type": "ip",
                "value": "185.110.132.201"
              },
              {
                "additionalInfo": {
                  "internal": true,
                  "displayName": "172.31.9.169",
                  "enriched": true,
                  "name": "172.31.9.169"
                },
                "relatedInterestingObjects": [
                  {
                    "additionalInfo": {
                      "displayName": "root",
                      "enriched": true,
                      "name": "root"
                    },
                    "id": "OikKAfhDdXNlckNyb290-Q",
                    "type": "user",
                    "value": "root"
                  }
                ],
                "id": "OikKAfhBaXBLMTcyLjMxLjkuMTY5-Q",
                "type": "ip",
                "value": "172.31.9.169"
              }
            ],
            "scoreDetails": [
              {
                "contribution": 5.0,
                "lastSeen": "2016-09-21T12:34:31.449",
                "firstSeen": "2016-09-21T08:57:47.742",
                "message": "SSH Brute Force Attack Attempt",
                "uuid": "-715235765"
              }
            ],
            "description": "SSH Brute Force Attack Attempt",
            "message": "185.110.132.201 attempted to connect to 172.31.9.169 610 times",
            "score": 5,
            "partition": "OikKAfhDbGl2ZU4xODUuMTEwLjEzMi4yMDFLMTcyLjMxLjkuMTY5-Q",
            "name": "ssh-brute-force",
            "modified": "2016-09-21T12:34:31.427",
            "justification": [
              {
                "eventId": "OikKAfh1T2lrS0FmaERiR2wyWlU0eU1qRXVNakk1TGpFM01pNHhNRE5MTVRjeUxqTXhMamt1TVRZNS1RQ2xpdmVSYmFkLXJlcHV0YXRpb24uZnJvbfk",
                "score": 65,
                "category": "bad-reputation-traffic",
                "message": "172.31.9.169 received a connection from 221.229.172.103 known to have a bad reputation: [{source=Alien Vault, reputation=[Scanning Host]}]",
                "eventDate": "2016-09-21T09:45:25.253"
              },
              {
                "eventId": "OikKAfhzT2lrS0FmaERiR2wyWlUweE1qUXVNak15TGpFMU5pNDNPRXN4TnpJdU16RXVPUzR4TmpuNUNsaXZlUmJhZC1yZXB1dGF0aW9uLmZyb235",
                "score": 65,
                "category": "bad-reputation-traffic",
                "message": "172.31.9.169 received a connection from 124.232.156.78 known to have a bad reputation: [{source=Alien Vault, reputation=[Scanning Host]}]",
                "eventDate": "2016-09-21T10:17:18.781"
              },
              {
                "eventId": "OikKAfhyT2lrS0FmaERiR2wyWlV3NU5DNHhNREl1TkRrdU1UYzBTekUzTWk0ek1TNDVMakUyT2ZrQ2xpdmVSYmFkLXJlcHV0YXRpb24uZnJvbfk",
                "score": 5,
                "category": "bad-reputation-traffic",
                "message": "172.31.9.169 received a connection attempt from 94.102.49.174 known to have a bad reputation: [{source=Alien Vault, reputation=[Malicious Host]}]",
                "eventDate": "2016-09-21T10:27:39.931"
              },
              {
                "eventId": "OikKAfhvT2lrS0FmaERiR2wyWlVveU1qSXVNekl1TnpndU5rc3hOekl1TXpFdU9TNHhOam41Q2xpdmVSYmFkLXJlcHV0YXRpb24uZnJvbfk",
                "score": 65,
                "category": "bad-reputation-traffic",
                "message": "172.31.9.169 received a connection from 222.32.78.6 known to have a bad reputation: [{source=Alien Vault, reputation=[Scanning Host]}]",
                "eventDate": "2016-09-21T11:33:09.390"
              },
              {
                "eventId": "OikKAfhfT2lrS0FmaERiR2wyWlVzeE56SXVNekV1T1M0eE5qbjVDbGl2ZUdueGRvbWFpbvk",
                "score": 15,
                "category": "potential-apt",
                "message": "172.31.9.169 is receiving high rate of NXDOMAIN responses",
                "eventDate": "2016-09-21T11:43:10.227"
              },
              {
                "eventId": "OikKAfhyT2lrS0FmaERiR2wyWlV3NU15NHhOelF1T1RNdU1UTTJTekUzTWk0ek1TNDVMakUyT2ZrQ2xpdmVSYmFkLXJlcHV0YXRpb24uZnJvbfk",
                "score": 5,
                "category": "bad-reputation-traffic",
                "message": "172.31.9.169 received a connection attempt from 93.174.93.136 known to have a bad reputation: [{source=Alien Vault, reputation=[Malicious Host]}]",
                "eventDate": "2016-09-21T11:54:09.812"
              },
              {
                "occurrences": [
                  1471425893313,
                  1473873722245,
                  1472296815430,
                  1471722066438,
                  1471196992341,
                  1471428784674,
                  1472291141606,
                  1474454531930,
                  1473411169338,
                  1472757370746,
                  1471630134878,
                  1472235758362,
                  1471079441589,
                  1470992242533,
                  1472244207778,
                  1473871202574,
                  1473700150846,
                  1473767864578,
                  1472805741038,
                  1473108116542,
                  1471194831101,
                  1473630764846,
                  1472671531962,
                  1472589812610,
                  1471434590086,
                  1472289744106,
                  1473888654674,
                  1471381489814,
                  1472499787162,
                  1471711568478,
                  1473282130678,
                  1472677912050,
                  1472807182354,
                  1472201041302,
                  1473961908394,
                  1472643154706,
                  1473509115274,
                  1472810014910,
                  1471951370262,
                  1473758634578,
                  1472246308378,
                  1473110293542,
                  1471116936497,
                  1471295521537,
                  1474138373570,
                  1474131608378,
                  1473503433122,
                  1473444690626,
                  1470649136529,
                  1473097265638,
                  1472552452830,
                  1472746753262,
                  1474451301094,
                  1473618471318,
                  1472581316662,
                  1471368588114,
                  1472231570262,
                  1472641752030,
                  1472587682678,
                  1473967359162,
                  1471297650154,
                  1473271423114,
                  1472817152034,
                  1472493432390,
                  1472765906690,
                  1473090822402,
                  1472298219466,
                  1470657956945,
                  1470652064745,
                  1471954212206,
                  1472501908946,
                  1473980145734,
                  1473761584850,
                  1471000917945,
                  1471088037341,
                  1472637524682,
                  1472669543730,
                  1473702464034,
                  1474129280445,
                  1472667410430,
                  1472665298434,
                  1471080838705,
                  1473717009282,
                  1473264965010,
                  1473613336866,
                  1473269252406,
                  1472227352450,
                  1472761620746,
                  1472818561070,
                  1473457638206,
                  1473714857714,
                  1471085135549,
                  1472288349110,
                  1473099409938,
                  1470647622373,
                  1474147231694,
                  1473704868250,
                  1472210948282,
                  1470650615829,
                  1473448950378,
                  1472750972610,
                  1472645954762,
                  1471078017877,
                  1471003829521,
                  1472209518238,
                  1473502009674,
                  1471002389025,
                  1474133713698,
                  1473451070974,
                  1471284783673,
                  1471366443834,
                  1473419757710,
                  1472553869554,
                  1473453218194,
                  1472292547338,
                  1471203519053,
                  1470507647573,
                  1471291258373,
                  1472548188102,
                  1473416879274,
                  1473972604094,
                  1472636112150,
                  1470996546253,
                  1471112589389,
                  1471282653261,
                  1473418316574,
                  1472585547994,
                  1471436036126,
                  1473455355006,
                  1472205280502,
                  1471005293953,
                  1473497782722,
                  1473625763010,
                  1472213778658,
                  1472549597242,
                  1472638930730,
                  1472497670446,
                  1471423032506,
                  1473500598874,
                  1473893691358,
                  1473610746138,
                  1474448253078,
                  1471289106945,
                  1474140661098,
                  1470659386845,
                  1470505504741,
                  1471623734914,
                  1472559572858,
                  1472237866774,
                  1472811434914,
                  1470518365621,
                  1474461252746,
                  1471634384514,
                  1473424066854,
                  1470501207517,
                  1471106137617,
                  1472815735374,
                  1471083698885,
                  1473624688954,
                  1471642923866,
                  1473878572954,
                  1471944265866,
                  1473421193614,
                  1473876285914,
                  1472748866094,
                  1473092995110,
                  1474456262898,
                  1472556723390,
                  1473771282818,
                  1471952797002,
                  1470514097441,
                  1473712415270,
                  1473499187190,
                  1473697526970,
                  1473975171906,
                  1471636508458,
                  1473883631806,
                  1472675797594,
                  1472206682038,
                  1471717856946,
                  1471286950605,
                  1472299629446,
                  1472293965762,
                  1471947100482,
                  1474145063474,
                  1473103767958,
                  1473284255526,
                  1472579197358,
                  1472239982866,
                  1473764773714,
                  1471199176105,
                  1471205695441,
                  1472640341785,
                  1473766251878,
                  1470511944657,
                  1471638645694,
                  1474457929670,
                  1472663190351,
                  1471192692225,
                  1471121272325,
                  1472555298086,
                  1470656458025,
                  1471945676470,
                  1472295376650,
                  1472577097206,
                  1470654995089,
                  1470999452593,
                  1472575000194,
                  1471424469262,
                  1472753116434,
                  1472491316750,
                  1471090917033,
                  1472759496974,
                  1472633295658,
                  1472506176610,
                  1471207866585,
                  1472583423034,
                  1471430240501,
                  1472551018818,
                  1472814308558,
                  1470499040721,
                  1470995093313,
                  1473422623386,
                  1473969977594,
                  1473959046350,
                  1472489217134,
                  1473510530842,
                  1472755241414,
                  1471942852270,
                  1470503344305,
                  1472572838238,
                  1471713648042,
                  1471201352769,
                  1472808591682,
                  1473438353926,
                  1473414025546,
                  1471082261825,
                  1471640795878,
                  1471383625538,
                  1470993661889,
                  1472644558026,
                  1471941393574,
                  1471379351441,
                  1473267092190,
                  1472661087642,
                  1472242102118,
                  1471210010885,
                  1471293390121,
                  1471726265942,
                  1472673668742,
                  1470646153609,
                  1473760079262,
                  1471632268666,
                  1473886329954,
                  1472487099306,
                  1473757180846,
                  1473101578358,
                  1471190541849,
                  1471728358870,
                  1472558155530,
                  1472208093254,
                  1473622126130,
                  1472286914794,
                  1472203868134,
                  1471372884946,
                  1473710018594,
                  1472202472222,
                  1471086581581,
                  1471724166390,
                  1472504045542,
                  1471433131494,
                  1471625868454,
                  1470509798609,
                  1471103964433,
                  1473956165994,
                  1472812873754,
                  1474452941650,
                  1473891135226,
                  1471278398425,
                  1471719959226,
                  1473628233610,
                  1471949931402,
                  1471114767517,
                  1471123399217,
                  1471089483413,
                  1472634717566,
                  1471377190034,
                  1473440471542,
                  1473977649013,
                  1473105948554,
                  1474449756914,
                  1474149580698,
                  1472212358726,
                  1473719414922,
                  1473881032502,
                  1472658924654,
                  1473442564710,
                  1471948516462,
                  1471119120121,
                  1473504861758,
                  1472546755870,
                  1471715750210,
                  1473273556734,
                  1471427331302,
                  1474459607154,
                  1473446823354,
                  1473507692233,
                  1472763755094,
                  1473412600602,
                  1473277833734,
                  1471110421917,
                  1470653514521,
                  1472233659182,
                  1473769564762,
                  1473964642506,
                  1471364318442,
                  1471280506905,
                  1473415455950,
                  1473275676414,
                  1471108278797,
                  1471431676702,
                  1473615934688,
                  1473506282642,
                  1474142929169,
                  1472591933958,
                  1471370732014,
                  1473279993670,
                  1471709459514,
                  1473763215646,
                  1472229475898,
                  1472495555122,
                  1471375033234,
                  1470997991361,
                  1474136006994,
                  1470516242057
                ],
                "eventId": "MJ9zQGYzEeaWSgrOrMuSaQ",
                "score": 0,
                "details": {

                },
                "eventDate": "2016-08-19T17:33:16.730"
              },
              {
                "eventId": "OikKAfh1T2lrS0FmaERiR2wyWlU0eE9EVXVNVEV3TGpFek1pNHlNREZMTVRjeUxqTXhMamt1TVRZNS1RQ2xpdmVSYmFkLXJlcHV0YXRpb24uZnJvbfk",
                "score": 65,
                "category": "bad-reputation-traffic",
                "message": "172.31.9.169 received a connection from 185.110.132.201 known to have a bad reputation: [{source=Alien Vault, reputation=[Scanning Host]}]",
                "eventDate": "2016-09-21T13:02:05.501"
              }
            ],
            "category": "suspicious-login"
          }
        },
        "origin": "live",
        "correlationIds": [

        ],
        "destination": {
          "ipHighBits": 0,
          "port": 0,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "172.31.9.169",
          "reputation": [

          ]
        },
        "id": "OikKAfh1T2lrS0FmaERiR2wyWlU0eE9EVXVNVEV3TGpFek1pNHlNREZMTVRjeUxqTXhMamt1TVRZNS1RQ2xpdmVOc3NoLWJydXRlLWZvcmNl-Q",
        "source": {
          "ipHighBits": 0,
          "port": 0,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "reputation": [

          ]
        },
        "type": "rank_alert"
      }
    ],
    [
      {
        "date": "2016-09-21T12:34:13.829",
        "protocol": {
          "service": "ssh",
          "udpOrTcp": "tcp"
        },
        "data": {
          "conn": {
            "reqBytes": 713,
            "missedBytes": 0,
            "history": "ShAdDaFf",
            "respPackets": 13,
            "respIPBytes": 2759,
            "respBytes": 2075,
            "localResponse": false,
            "duration": 1229941,
            "protocol": "tcp",
            "localOrigin": false,
            "service": "ssh",
            "reqIPBytes": 1397,
            "startTime": "2016-09-21T12:34:12.599",
            "state": "SF",
            "reqPackets": 13,
            "tunnel": "",
            "status": "success"
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1RVQQV"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 348,
        "id": "uAFHSn_3EeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 59449,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-09-21T12:34:12.746",
        "protocol": {
          "service": "SSH"
        },
        "data": {
          "ssh": {
            "kex_alg": "curve25519-sha256@libssh.org",
            "server": "SSH-2.0-OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.7",
            "mac_alg": "hmac-sha1",
            "host_key": "df:e3:98:68:6a:29:2b:b3:1a:6e:cf:6f:e8:af:61:01",
            "success": false,
            "cipher_alg": "aes128-ctr",
            "client": "SSH-2.0-libssh-0.6.3",
            "host_key_alg": "ssh-rsa",
            "compression_alg": "none",
            "version": "2",
            "direction": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1RVQQV"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 243,
        "id": "t6ig73_3EeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 59449,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "ssh"
      }
    ],
    [
      {
        "date": "2016-09-21T12:06:48.767",
        "protocol": {
          "service": "ssh",
          "udpOrTcp": "tcp"
        },
        "data": {
          "conn": {
            "reqBytes": 713,
            "missedBytes": 0,
            "history": "ShAdDaFf",
            "respPackets": 15,
            "respIPBytes": 2875,
            "respBytes": 2075,
            "localResponse": false,
            "duration": 1760123,
            "protocol": "tcp",
            "localOrigin": false,
            "service": "ssh",
            "reqIPBytes": 1397,
            "startTime": "2016-09-21T12:06:47.007",
            "state": "SF",
            "reqPackets": 13,
            "tunnel": "",
            "status": "success"
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1RVRVP"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 604,
        "id": "46BCWX_zEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 59593,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-09-21T12:06:47.154",
        "protocol": {
          "service": "SSH"
        },
        "data": {
          "ssh": {
            "kex_alg": "curve25519-sha256@libssh.org",
            "server": "SSH-2.0-OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.7",
            "mac_alg": "hmac-sha1",
            "host_key": "df:e3:98:68:6a:29:2b:b3:1a:6e:cf:6f:e8:af:61:01",
            "success": false,
            "cipher_alg": "aes128-ctr",
            "client": "SSH-2.0-libssh-0.6.3",
            "host_key_alg": "ssh-rsa",
            "compression_alg": "none",
            "version": "2",
            "direction": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1RVRVP"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 147,
        "id": "51nvG3_zEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 59593,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "ssh"
      }
    ],
    [
      {
        "date": "2016-09-21T11:38:51.821",
        "protocol": {
          "service": "ssh",
          "udpOrTcp": "tcp"
        },
        "data": {
          "conn": {
            "reqBytes": 713,
            "missedBytes": 0,
            "history": "ShAdDaFf",
            "respPackets": 14,
            "respIPBytes": 2863,
            "respBytes": 2075,
            "localResponse": false,
            "duration": 2302040,
            "protocol": "tcp",
            "localOrigin": false,
            "service": "ssh",
            "reqIPBytes": 1409,
            "startTime": "2016-09-21T11:38:49.519",
            "state": "SF",
            "reqPackets": 13,
            "tunnel": "",
            "status": "success"
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1RVURU"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 399,
        "id": "-_5YX3_vEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 59858,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-09-21T11:38:49.670",
        "protocol": {
          "service": "SSH"
        },
        "data": {
          "ssh": {
            "kex_alg": "curve25519-sha256@libssh.org",
            "server": "SSH-2.0-OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.7",
            "mac_alg": "hmac-sha1",
            "host_key": "df:e3:98:68:6a:29:2b:b3:1a:6e:cf:6f:e8:af:61:01",
            "success": false,
            "cipher_alg": "aes128-ctr",
            "client": "SSH-2.0-libssh-0.6.3",
            "host_key_alg": "ssh-rsa",
            "compression_alg": "none",
            "version": "2",
            "direction": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1RVURU"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 57,
        "id": "_Aa81H_vEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 59858,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "ssh"
      }
    ],
    [
      {
        "date": "2016-09-21T11:11:05.036",
        "protocol": {
          "service": "ssh",
          "udpOrTcp": "tcp"
        },
        "data": {
          "conn": {
            "reqBytes": 713,
            "missedBytes": 0,
            "history": "ShAdDaFf",
            "respPackets": 14,
            "respIPBytes": 2863,
            "respBytes": 2075,
            "localResponse": false,
            "duration": 2274241,
            "protocol": "tcp",
            "localOrigin": false,
            "service": "ssh",
            "reqIPBytes": 1513,
            "startTime": "2016-09-21T11:11:02.761",
            "state": "SF",
            "reqPackets": 15,
            "tunnel": "",
            "status": "success"
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1QQMVV"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 858,
        "id": "GjMvCH_sEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 44099,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-09-21T11:11:02.898",
        "protocol": {
          "service": "SSH"
        },
        "data": {
          "ssh": {
            "kex_alg": "curve25519-sha256@libssh.org",
            "server": "SSH-2.0-OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.7",
            "mac_alg": "hmac-sha1",
            "host_key": "df:e3:98:68:6a:29:2b:b3:1a:6e:cf:6f:e8:af:61:01",
            "success": false,
            "cipher_alg": "aes128-ctr",
            "client": "SSH-2.0-libssh-0.6.3",
            "host_key_alg": "ssh-rsa",
            "compression_alg": "none",
            "version": "2",
            "direction": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1QQMVV"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 63,
        "id": "HTarLX_sEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 44099,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "ssh"
      }
    ],
    [
      {
        "date": "2016-09-21T10:42:13.277",
        "protocol": {
          "service": "ssh",
          "udpOrTcp": "tcp"
        },
        "data": {
          "conn": {
            "reqBytes": 713,
            "missedBytes": 0,
            "history": "ShAdDaFf",
            "respPackets": 13,
            "respIPBytes": 2759,
            "respBytes": 2075,
            "localResponse": false,
            "duration": 1528693,
            "protocol": "tcp",
            "localOrigin": false,
            "service": "ssh",
            "reqIPBytes": 1397,
            "startTime": "2016-09-21T10:42:11.748",
            "state": "SF",
            "reqPackets": 13,
            "tunnel": "",
            "status": "success"
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1PUMPT"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 307,
        "id": "EjePin_oEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 38037,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-09-21T10:42:11.930",
        "protocol": {
          "service": "SSH"
        },
        "data": {
          "ssh": {
            "kex_alg": "curve25519-sha256@libssh.org",
            "server": "SSH-2.0-OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.7",
            "mac_alg": "hmac-sha1",
            "host_key": "df:e3:98:68:6a:29:2b:b3:1a:6e:cf:6f:e8:af:61:01",
            "success": false,
            "cipher_alg": "aes128-ctr",
            "client": "SSH-2.0-libssh-0.6.3",
            "host_key_alg": "ssh-rsa",
            "compression_alg": "none",
            "version": "2",
            "direction": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1PUMPT"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 69,
        "id": "EjKGdX_oEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 38037,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "ssh"
      }
    ],
    [
      {
        "date": "2016-09-21T10:15:43.071",
        "protocol": {
          "service": "ssh",
          "udpOrTcp": "tcp"
        },
        "data": {
          "conn": {
            "reqBytes": 713,
            "missedBytes": 0,
            "history": "ShAdDaFf",
            "respPackets": 13,
            "respIPBytes": 2759,
            "respBytes": 2075,
            "localResponse": false,
            "duration": 1611635,
            "protocol": "tcp",
            "localOrigin": false,
            "service": "ssh",
            "reqIPBytes": 1397,
            "startTime": "2016-09-21T10:15:41.459",
            "state": "SF",
            "reqPackets": 13,
            "tunnel": "",
            "status": "success"
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1PTTVM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 623,
        "id": "Xu77hH_kEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 37790,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-09-21T10:15:41.650",
        "protocol": {
          "service": "SSH"
        },
        "data": {
          "ssh": {
            "kex_alg": "curve25519-sha256@libssh.org",
            "server": "SSH-2.0-OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.7",
            "mac_alg": "hmac-sha1",
            "host_key": "df:e3:98:68:6a:29:2b:b3:1a:6e:cf:6f:e8:af:61:01",
            "success": false,
            "cipher_alg": "aes128-ctr",
            "client": "SSH-2.0-libssh-0.6.3",
            "host_key_alg": "ssh-rsa",
            "compression_alg": "none",
            "version": "2",
            "direction": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1PTTVM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 101,
        "id": "ZPtyD3_kEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 37790,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "ssh"
      }
    ],
    [
      {
        "date": "2016-09-21T09:48:22.839",
        "protocol": {
          "service": "ssh",
          "udpOrTcp": "tcp"
        },
        "data": {
          "conn": {
            "reqBytes": 713,
            "missedBytes": 0,
            "history": "ShAdDaFf",
            "respPackets": 11,
            "respIPBytes": 2655,
            "respBytes": 2075,
            "localResponse": false,
            "duration": 1894024,
            "protocol": "tcp",
            "localOrigin": false,
            "service": "ssh",
            "reqIPBytes": 1345,
            "startTime": "2016-09-21T09:48:20.945",
            "state": "SF",
            "reqPackets": 12,
            "tunnel": "",
            "status": "success"
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1QMOQP"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 142,
        "id": "jINdjn_gEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 40243,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-09-21T09:48:21.094",
        "protocol": {
          "service": "SSH"
        },
        "data": {
          "ssh": {
            "kex_alg": "curve25519-sha256@libssh.org",
            "server": "SSH-2.0-OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.7",
            "mac_alg": "hmac-sha1",
            "host_key": "df:e3:98:68:6a:29:2b:b3:1a:6e:cf:6f:e8:af:61:01",
            "success": false,
            "cipher_alg": "aes128-ctr",
            "client": "SSH-2.0-libssh-0.6.3",
            "host_key_alg": "ssh-rsa",
            "compression_alg": "none",
            "version": "2",
            "direction": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1QMOQP"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 199,
        "id": "jIfxb3_gEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 40243,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "ssh"
      }
    ],
    [
      {
        "date": "2016-09-21T09:22:37.989",
        "protocol": {
          "service": "ssh",
          "udpOrTcp": "tcp"
        },
        "data": {
          "conn": {
            "reqBytes": 713,
            "missedBytes": 0,
            "history": "ShAdDaFf",
            "respPackets": 13,
            "respIPBytes": 2759,
            "respBytes": 2075,
            "localResponse": false,
            "duration": 1224847,
            "protocol": "tcp",
            "localOrigin": false,
            "service": "ssh",
            "reqIPBytes": 1397,
            "startTime": "2016-09-21T09:22:36.764",
            "state": "SF",
            "reqPackets": 13,
            "tunnel": "",
            "status": "success"
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1RNVPT"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 842,
        "id": "9FD-G3_cEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 51937,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-09-21T09:22:36.914",
        "protocol": {
          "service": "SSH"
        },
        "data": {
          "ssh": {
            "kex_alg": "curve25519-sha256@libssh.org",
            "server": "SSH-2.0-OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.7",
            "mac_alg": "hmac-sha1",
            "host_key": "df:e3:98:68:6a:29:2b:b3:1a:6e:cf:6f:e8:af:61:01",
            "success": false,
            "cipher_alg": "aes128-ctr",
            "client": "SSH-2.0-libssh-0.6.3",
            "host_key_alg": "ssh-rsa",
            "compression_alg": "none",
            "version": "2",
            "direction": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1RNVPT"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 192,
        "id": "_Srsn3_cEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 51937,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "ssh"
      }
    ],
    [
      {
        "date": "2016-09-21T08:57:34.069",
        "protocol": {
          "service": "ssh",
          "udpOrTcp": "tcp"
        },
        "data": {
          "conn": {
            "reqBytes": 713,
            "missedBytes": 0,
            "history": "ShAdDaFf",
            "respPackets": 13,
            "respIPBytes": 2759,
            "respBytes": 2075,
            "localResponse": false,
            "duration": 1128115,
            "protocol": "tcp",
            "localOrigin": false,
            "service": "ssh",
            "reqIPBytes": 1397,
            "startTime": "2016-09-21T08:57:32.941",
            "state": "SF",
            "reqPackets": 13,
            "tunnel": "",
            "status": "success"
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1RMNOO"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 101,
        "id": "dAZPX3_ZEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 50122,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-09-21T08:57:33.078",
        "protocol": {
          "service": "SSH"
        },
        "data": {
          "ssh": {
            "kex_alg": "curve25519-sha256@libssh.org",
            "server": "SSH-2.0-OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.7",
            "mac_alg": "hmac-sha1",
            "host_key": "df:e3:98:68:6a:29:2b:b3:1a:6e:cf:6f:e8:af:61:01",
            "success": false,
            "cipher_alg": "aes128-ctr",
            "client": "SSH-2.0-libssh-0.6.3",
            "host_key_alg": "ssh-rsa",
            "compression_alg": "none",
            "version": "2",
            "direction": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1RMNOO"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 46,
        "id": "c2OmsX_ZEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 50122,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "ssh"
      }
    ],
    [
      {
        "date": "2016-09-21T08:22:33.360",
        "protocol": {
          "service": "SCTP or Secure Shell (SSH, scp, sftp)",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "reqBytes": 0,
            "missedBytes": 0,
            "history": "ShR",
            "respPackets": 1,
            "respIPBytes": 44,
            "respBytes": 0,
            "localResponse": false,
            "duration": 134159,
            "protocol": "tcp",
            "localOrigin": false,
            "service": "",
            "reqIPBytes": 80,
            "startTime": "2016-09-21T08:22:33.226",
            "state": "RSTO",
            "reqPackets": 2,
            "tunnel": "",
            "status": "success"
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNTOKPNKVKNSVx1OOx1NURKNNMKNPOKOMNx1PUVNN"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "internal": true,
          "assets": [
            {
              "id": "root",
              "type": "user",
              "info": {
                "displayName": "root",
                "name": "root"
              }
            }
          ],
          "port": 22,
          "ipLowBits": 2887715241,
          "ip": "172.31.9.169",
          "name": "rank-sensor",
          "reputation": [

          ]
        },
        "micros": 454,
        "id": "j4_Qs3_UEeaOzwrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "country": "UA",
          "internal": false,
          "port": 38911,
          "ipLowBits": 3111027913,
          "ip": "185.110.132.201",
          "name": "185.110.132.201",
          "coordinates": {
            "lon": 30.523300170898438,
            "lat": 50.44999694824219
          },
          "reputation": [
            {
              "reputation": [
                "Scanning Host"
              ],
              "source": "Alien Vault"
            }
          ]
        },
        "type": "conn"
      }
    ]
  ]
};*/

// const rows = data.rows;
// let rows = [];
let baseHeight = 500,
  timelineBarHeight = '2', // 2',
  timelineBarWidth = '50'; // '50';

let style = {
  'selectedArea': {
    'marginTop': '5px',
    'height': '0px',
    'width': '50px',
    'position': 'absolute',
    'marginLeft': '5px',
    'background': Colors.smoke
  }
};

function getDetails(row) {
  if (row.type.toLowerCase() === 'conn') {
    const {data} = row;
    console.log('conn');
    let details = '';
    details += '<div>';
    details += '<span>Service: ' + data.conn.service + '</span><br />';
    details += '<span>State: ' + data.conn.state + '</span><br />';
    details += '<span>Requested Bytes: ' + formatBytes(data.conn.reqBytes, 2) + '</span><br />';
    details += '<span>Response Bytes: ' + formatBytes(data.conn.respBytes, 2) + '</span><br />';
    details += '<span>Duration: ' + formatMicroseconds(data.conn.duration) + '</span>';
    details += '</div>';
    return details;
  }
  else {
    return null;
  }
}

function getTimelineColor(eventType) {
  let color = '';
  switch (eventType) {
    case 'conn':
      color = Colors.defaultTimelineGraphPaletteColors[0];
      break;
    case 'ip':
      color = Colors.defaultTimelineGraphPaletteColors[1];
      break;
    case 'ssh':
      color = Colors.defaultTimelineGraphPaletteColors[2];
      break;
    case 'dns':
      color = Colors.turquoise;
      break;
    case 'ssl':
      color = Colors.cloud;
      break;
    case 'file':
      color = Colors.garnet;
      break;
    case 'http':
      color = 'red';
      break;
  }
  return color;
}

function getPos(el) {
  let lx = 0, ly = 0;
  for (lx = 0, ly = 0;
     el != null;
     lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
  return {x: lx, y: ly};
}

class TimelineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'style': {
        'selectedArea': {
          'marginTop': '0px',
          'height': '0px',
          'width': '50px',
          'position': 'absolute',
          'marginLeft': '5px',
          'background': Colors.smoke
        }
      },
      'selectedMin': '',
      'selectedMax': ''
    };

    this.updateSelectedArea = this.updateSelectedArea.bind(this);
    this.displayEvents = this.displayEvents.bind(this);
    this.displayEventBar = this.displayEventBar.bind(this);
  }

  updateSelectedArea() {
    return (event) => {
      let sliderValue = $('#slider-range').slider('value'),
        selectedRange = [
          sliderValue - 6,
          sliderValue + 6
        ];

      this.setState({
        'style': {
          'selectedArea': {
            'marginTop': ((baseHeight * (100 - selectedRange[1]) / 100) - 12.8) + 'px',
            'height': (baseHeight * (selectedRange[1] - selectedRange[0]) / 100) + 'px',
            'width': timelineBarWidth + 'px',
            'position': 'absolute',
            'marginLeft': '5px',
            'background': Colors.smoke,
            'zIndex': 1000,
            'opacity': 0.7
          }
        },
        'selectedMin': ((baseHeight * (100 - selectedRange[1]) / 100) - 12.8),
        'selectedMax': ((baseHeight * (100 - selectedRange[1]) / 100) - 12.8) +
          (baseHeight * (selectedRange[1] - selectedRange[0]) / 100)
      });
    };
  }

  componentDidMount() {
    // $('#slider-range').slider({
    //   orientation: 'vertical',
    //   range: 'min',
    //   min: 0,
    //   max: 100,
    //   slide: this.updateSelectedArea()
    // });
  }

  displayEventBar() {
    // return (a) => {
      // const {props} = this;

      // if(!props.data) {
      //   return;
      // }

      // rows = props.data.rows;

      // console.log(JSON.stringify(rows));

      // let prevTimestamp = 0,
      //   prevMarginTop = 0;

      // rows.map(function(event, index) {
      //   let dateString = event[0].date;
      //   console.log(dateString);
      //   let localTime = moment.utc(dateString).format('YYYY-MM-DD HH:mm:ss'),
      //     d = new Date(localTime),
      //     dateInUTCFormat = moment.utc(d.toUTCString()).format('YYYY-MM-DD HH:mm:ss');

      //   dateInUTCFormat = dateInUTCFormat.replace(/-/g, '/');
      //   let convertedDate = new Date(Date.parse((dateInUTCFormat).toString()));
      //   let currentTimestamp = convertedDate.getTime();

      //   let barId = 'bar' + index;

      //   let style = {
      //     height: timelineBarHeight + 'px',
      //     width: timelineBarWidth + 'px',
      //     fontSize: '11px',
      //     backgroundColor: Colors.timelineBarColors[1], // getTimelineColor((event[0].type).toLowerCase()),
      //     marginTop: (index === 0) ? 0 : ((prevTimestamp - currentTimestamp) === prevMarginTop
      //       ? 2 : ((prevTimestamp - currentTimestamp) / 100))
      //   };

      //   prevMarginTop = (prevTimestamp - currentTimestamp);
      //   prevTimestamp = currentTimestamp;
      //   //{dateString}{event[0].type}

      //   return (
      //     <div id={barId} style={style}>1111111</div>
      //   );
      // })
    // };
  }

  displayEvents(selectedMin, selectedMax) {
    // return (a) => {
    const {props} = this;

    if (!props.data) {
      return;
    }

    const rows = props.data.rows;
    // return (eventReturn) => {
    let eventDetails = '';

    rows.map(function(event, index) {
      let dateString = event[0].date,
        newLine = '<br />';

      let stylenew = {
        height: '20px',
        width: '200px',
        marginLeft: '150px'
      };
      // let barId = 'bar' + index,
      //   topPositions = getPos(document.getElementById(barId));

      // if (topPositions.y !== undefined) {
      //   let top = topPositions.y - 215;
      //   if (selectedMin !== '' && selectedMax !== '') {
      //     if (selectedMin <= top && selectedMax >= top) {
      //       if (document.getElementById(barId) !== undefined && document.getElementById(barId) !== null) {
      //         document.getElementById(barId).style.backgroundColor = Colors.timelineBarColors[0];
      //       }
      //     }
      //     else {
      //       if (document.getElementById(barId) !== undefined && document.getElementById(barId) !== null) {
      //         document.getElementById(barId).style.backgroundColor = Colors.timelineBarColors[1];
      //       }
      //       dateString = '';
      //     }
      //   }
      //   else {
      //     if (document.getElementById(barId) !== undefined && document.getElementById(barId) !== null) {
      //       document.getElementById(barId).style.backgroundColor = Colors.timelineBarColors[1];
      //     }
      //     dateString = '';
      //   }
      // }
      if (dateString !== '') {
        newLine = (index === 0) ? '' : '<br />';
        let dateTime = formatDateInLocalTimeZone(dateString);
        console.log('get details', getDetails(event[0]));
        let details = getDetails(event[0]);
        // details = details.toString();

        eventDetails += '<div style="display:flex;">';
        eventDetails += '<div style="width: 120px;"><span style="font-size: 9pt; font-weight: 600;">' + dateTime.date;
        eventDetails += '<br/>' + dateTime.time + '</span></div>';
        eventDetails += '<div style="height:170px;width:20px;font-size: 10pt;background-color:#fcc875;box-shadow: 2px 2px 0 #cccccc;writing-mode:tb;padding-top: 7px;">' + getEventTypeString(event[0].type) + '</div>';
        eventDetails += '<div style="box-shadow: 2px 2px 0 #cccccc;float:left;padding: 10px;height:170px;width:500px;background-color:white;border: 1px solid #cbcbd1;font-size: 14px;margin-bottom:20px;">';
        eventDetails += '<div style="font-size:13pt;color:#444C63;font-weight:semibold;">' + event[0].id + ' ' + event[0].type + '</div>';
        eventDetails += '<div style="font-size:13pt;color:#444C63;font-weight:lighter;">' + details + '</div>';
        // eventDetails += '<br/>Protocol: ' + event[0].protocol.service;
        // eventDetails += '<br/>udpOrTcp: ' + event[0].protocol.udpOrTcp + '</div>';
        eventDetails += '</div>';
        eventDetails += '</div>';

        // eventDetails += newLine + '<span style="font-size: 14px; font-weight: 600;">' + dateTime.date;
        // eventDetails += '<br/>' + dateTime.time + '</span>';
      }
    });
    return (
      <div dangerouslySetInnerHTML={{__html: eventDetails}}></div>
    );
    // };
  }

  render() {
    let prevTimestamp = 0,
      prevMarginTop = 0;

    return (
      <div>{/*{this.displayEventBar()}*/}
        {/*<div id='slider-range' style={{height: baseHeight + 'px', position: 'absolute'}}></div>
        <div id='selectedArea' style={this.state.style.selectedArea}></div>
        <div id='timelineGraph' style={{
          height: baseHeight + 'px', width: '70px', border: '0px solid red',
          marginLeft: '5px', position: 'absolute'}}>
          {
            rows.map(function(event, index) {
              let dateString = event[0].date;

              let localTime = moment.utc(dateString).format('YYYY-MM-DD HH:mm:ss'),
                d = new Date(localTime),
                dateInUTCFormat = moment.utc(d.toUTCString()).format('YYYY-MM-DD HH:mm:ss');

              dateInUTCFormat = dateInUTCFormat.replace(/-/g, '/');
              let convertedDate = new Date(Date.parse((dateInUTCFormat).toString()));
              let currentTimestamp = convertedDate.getTime();

              let barId = 'bar' + index;

              let style = {
                height: timelineBarHeight + 'px',
                width: timelineBarWidth + 'px',
                fontSize: '11px',
                backgroundColor: Colors.timelineBarColors[1], // getTimelineColor((event[0].type).toLowerCase()),
                // marginTop: (index === 0) ? 0 : ((prevTimestamp - currentTimestamp) === prevMarginTop
                //   ? 2 : ((prevTimestamp - currentTimestamp) / 10000))
                marginTop: (index === 0) ? 0 : 2
              };

              prevMarginTop = (prevTimestamp - currentTimestamp);
              prevTimestamp = currentTimestamp;
              //{dateString}{event[0].type}

              return (
                <div id={barId} style={style}></div>
              );
            })
          }
        </div>*/}
        <div style={{'marginLeft': '150px', 'position': 'absolute'}}>
          {this.displayEvents(this.state.selectedMin, this.state.selectedMax)}
        </div>
      </div>
    );
  }
}

export default TimelineGraph;
