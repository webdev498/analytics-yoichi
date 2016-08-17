import React from 'react';
import $ from 'jquery';
import {Colors} from 'theme/colors';
// import {data} from 'utils/eventData';
/*const data = {
  "total": 497,
  "next": 25,
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
        "date": "2016-08-16T12:00:31.824",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "VN",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.824",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPPTPx1NNRKTOKOOSKQMx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "Viettel Corporation",
          "country": "VN",
          "port": 8080,
          "city": "Cho Ha",
          "ipLowBits": 1934156328,
          "ip": "115.72.226.40",
          "name": "115.72.226.40",
          "coordinates": {
            "lon": 106.60000610351562,
            "lat": 21.416702270507812
          },
          "reputation": [

          ],
          "region": "71",
          "asn": 7552
        },
        "micros": 502,
        "id": "FR6f42OpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63373,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.750",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "CN",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.750",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPPQRx1SNKNSSKOOVKNOPx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "Chinanet",
          "country": "CN",
          "port": 8080,
          "city": "Kunming",
          "ipLowBits": 1034347899,
          "ip": "61.166.229.123",
          "name": "61.166.229.123",
          "coordinates": {
            "lon": 102.71829223632812,
            "lat": 25.038894653320312
          },
          "reputation": [

          ],
          "region": "29",
          "asn": 4134
        },
        "micros": 497,
        "id": "FM75NmOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63345,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.722",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.722",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPPPRx1NPUKNURKNPVKONNx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "AVANZADAS INFORMATICAS Y TELECOMUNICACIONES  SAITEL",
          "country": "EC",
          "port": 8080,
          "ipLowBits": 2327415763,
          "ip": "138.185.139.211",
          "name": "138.185.139.211",
          "coordinates": {
            "lon": -77.5,
            "lat": -2.0
          },
          "reputation": [

          ],
          "asn": 263805
        },
        "micros": 495,
        "id": "FK6f7GOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63335,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.706",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "IN",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.706",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPPOVx1NNTKONUKOQPKUUx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "National Internet Backbone",
          "country": "IN",
          "port": 8080,
          "city": "Bangalore",
          "ipLowBits": 1977283416,
          "ip": "117.218.243.88",
          "name": "117.218.243.88",
          "coordinates": {
            "lon": 77.58331298828125,
            "lat": 12.983306884765625
          },
          "reputation": [

          ],
          "region": "19",
          "asn": 9829
        },
        "micros": 493,
        "id": "FJHJFmOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63329,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.694",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "CN",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.694",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPPOQx1NMNKOTKNMSKPVx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "CNCGROUP China169 Backbone",
          "country": "CN",
          "port": 8080,
          "city": "Hebei",
          "ipLowBits": 1696295463,
          "ip": "101.27.106.39",
          "name": "101.27.106.39",
          "coordinates": {
            "lon": 115.27499389648438,
            "lat": 39.88969421386719
          },
          "reputation": [

          ],
          "region": "10",
          "asn": 4837
        },
        "micros": 489,
        "id": "FHeKUWOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63324,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.586",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "CA",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.586",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPPMPx1QTKNUSKVKRUx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "country": "CA",
          "port": 8080,
          "city": "Ottawa",
          "ipLowBits": 800721210,
          "ip": "47.186.9.58",
          "name": "47.186.9.58",
          "coordinates": {
            "lon": -75.82649993896484,
            "lat": 45.34330749511719
          },
          "reputation": [

          ],
          "region": "ON"
        },
        "micros": 483,
        "id": "G70cfGOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63303,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.564",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "US",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.564",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPOVQx1NQVKSSKONVKUx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "Cogent Communications",
          "country": "US",
          "port": 8080,
          "ipLowBits": 2504186632,
          "ip": "149.66.219.8",
          "name": "149.66.219.8",
          "coordinates": {
            "lon": -97.0,
            "lat": 38.0
          },
          "reputation": [

          ],
          "asn": 174
        },
        "micros": 481,
        "id": "G58NI2OpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63294,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.532",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "JP",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.532",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPOUQx1NOSKNMPKNRQKOOSx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "Softbank BB Corp.",
          "country": "JP",
          "port": 8080,
          "ipLowBits": 2120719074,
          "ip": "126.103.154.226",
          "name": "126.103.154.226",
          "coordinates": {
            "lon": 139.69000244140625,
            "lat": 35.69000244140625
          },
          "reputation": [

          ],
          "asn": 17676
        },
        "micros": 481,
        "id": "G4QLCmOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63284,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.484",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "US",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.484",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPOTMx1NPSKNNKNOTKORMx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "country": "US",
          "port": 8080,
          "city": "Dearborn",
          "ipLowBits": 2282455034,
          "ip": "136.11.127.250",
          "name": "136.11.127.250",
          "coordinates": {
            "lon": -83.17630004882812,
            "lat": 42.322296142578125
          },
          "reputation": [

          ],
          "region": "MI"
        },
        "micros": 477,
        "id": "GgxfrmOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63270,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.474",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "TW",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.474",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPOSRx1OOPKNQOKNMUKNQPx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "Long Distance & Mobile Business Group",
          "country": "TW",
          "port": 8080,
          "city": "Taipei",
          "ipLowBits": 3750653071,
          "ip": "223.142.108.143",
          "name": "223.142.108.143",
          "coordinates": {
            "lon": 121.52499389648438,
            "lat": 25.039199829101562
          },
          "reputation": [

          ],
          "region": "03",
          "asn": 17421
        },
        "micros": 478,
        "id": "GgLCuWOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63265,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.450",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "DK",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.450",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPORQx1TTKONOKRPKSUx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "Telenor A/S",
          "country": "DK",
          "port": 8080,
          "ipLowBits": 1305752900,
          "ip": "77.212.53.68",
          "name": "77.212.53.68",
          "coordinates": {
            "lon": 12.56829833984375,
            "lat": 55.67610168457031
          },
          "reputation": [

          ],
          "asn": 9158
        },
        "micros": 477,
        "id": "GRVVIWOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63254,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.414",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "GB",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.414",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPOPUx1SOKSKOOSKNQRx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "BT Public Internet Service",
          "country": "GB",
          "port": 8080,
          "ipLowBits": 1040638609,
          "ip": "62.6.226.145",
          "name": "62.6.226.145",
          "coordinates": {
            "lon": -0.1300048828125,
            "lat": 51.5
          },
          "reputation": [

          ],
          "asn": 2856
        },
        "micros": 471,
        "id": "GK58w2OpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63238,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.410",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "US",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.410",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPOPSx1NPSKPKPMKNVx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "country": "US",
          "port": 8080,
          "city": "Dearborn",
          "ipLowBits": 2281905683,
          "ip": "136.3.30.19",
          "name": "136.3.30.19",
          "coordinates": {
            "lon": -83.17630004882812,
            "lat": 42.322296142578125
          },
          "reputation": [

          ],
          "region": "MI"
        },
        "micros": 470,
        "id": "Gd7nAGOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63236,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.386",
        "protocol": {
          "service": "HTTP  alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "US",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.386",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPOOUx1VVKNSTKVKVPx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "country": "US",
          "port": 8080,
          "ipLowBits": 1671891293,
          "ip": "99.167.9.93",
          "name": "99.167.9.93",
          "coordinates": {
            "lon": -97.0,
            "lat": 38.0
          },
          "reputation": [

          ]
        },
        "micros": 469,
        "id": "EnfCamOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63228,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.330",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "US",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.330",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPOMTx1SPKNNRKNNSKNRUx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "MCI Communications Services, Inc. d/b/a Verizon Business",
          "country": "US",
          "port": 8080,
          "city": "Linden",
          "ipLowBits": 1064531102,
          "ip": "63.115.116.158",
          "name": "63.115.116.158",
          "coordinates": {
            "lon": -74.24939727783203,
            "lat": 40.62469482421875
          },
          "reputation": [

          ],
          "region": "NJ",
          "asn": 701
        },
        "micros": 466,
        "id": "GPuLhWOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63207,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.320",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "DE",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.320",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPOMOx1PTKNPUKNQRKNOx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "EWE TEL GmbH",
          "country": "DE",
          "port": 8080,
          "ipLowBits": 629838092,
          "ip": "37.138.145.12",
          "name": "37.138.145.12",
          "coordinates": {
            "lon": 9.0,
            "lat": 51.0
          },
          "reputation": [

          ],
          "asn": 9145
        },
        "micros": 463,
        "id": "GPNOIGOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63202,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.316",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "US",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.316",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPOMMx1STKQOKNPOKNUSx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "country": "US",
          "port": 8080,
          "city": "Rio Rancho",
          "ipLowBits": 1126859962,
          "ip": "67.42.132.186",
          "name": "67.42.132.186",
          "coordinates": {
            "lon": -106.72319793701172,
            "lat": 35.2467041015625
          },
          "reputation": [

          ],
          "region": "NM"
        },
        "micros": 463,
        "id": "GO_yvmOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63200,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.270",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "NL",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.270",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPNVNx1VQKONMKOOKVTx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "Ziggo B.V.",
          "country": "NL",
          "port": 8080,
          "city": "Voorburg",
          "ipLowBits": 1590826593,
          "ip": "94.210.22.97",
          "name": "94.210.22.97",
          "coordinates": {
            "lon": 4.3596954345703125,
            "lat": 52.07420349121094
          },
          "reputation": [

          ],
          "region": "11",
          "asn": 9143
        },
        "micros": 459,
        "id": "GH_yl2OpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63191,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.234",
        "protocol": {
          "service": "dns",
          "udpOrTcp": "udp"
        },
        "data": {
          "conn": {
            "responseCC": "",
            "reqBytes": 44,
            "missedBytes": 0,
            "history": "D",
            "respPackets": 0,
            "respIPBytes": 0,
            "respBytes": 0,
            "localResponse": false,
            "duration": 2001,
            "protocol": "udp",
            "localOrigin": true,
            "originCC": "",
            "service": "dns",
            "reqIPBytes": 100,
            "startTime": "2016-08-16T12:00:31.232",
            "state": "S0",
            "reqPackets": 2,
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1RUQVUx1OOQKMKMKOROx1RPRR"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "port": 5355,
          "ipLowBits": 3758096636,
          "ip": "224.0.0.252",
          "name": "224.0.0.252",
          "reputation": [

          ]
        },
        "micros": 453,
        "id": "GLP7CGOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 58498,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.180",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "US",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.180",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPNSMx1SKTQKNOSKNQNx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "country": "US",
          "port": 8080,
          "city": "Fort Huachuca",
          "ipLowBits": 105545357,
          "ip": "6.74.126.141",
          "name": "6.74.126.141",
          "coordinates": {
            "lon": -110.36070251464844,
            "lat": 31.527297973632812
          },
          "reputation": [

          ],
          "region": "AZ"
        },
        "micros": 446,
        "id": "GGQGGmOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63160,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.174",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "JP",
            "reqBytes": 0,
            "missedBytes": 0,
            "history": "Sr",
            "respPackets": 1,
            "respIPBytes": 40,
            "respBytes": 0,
            "localResponse": false,
            "duration": 28003,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.146",
            "state": "REJ",
            "reqPackets": 1,
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPNROx1NOSKOOOKQKNVUx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "Softbank BB Corp.",
          "country": "JP",
          "port": 8080,
          "ipLowBits": 2128479430,
          "ip": "126.222.4.198",
          "name": "126.222.4.198",
          "coordinates": {
            "lon": 139.69000244140625,
            "lat": 35.69000244140625
          },
          "reputation": [

          ],
          "asn": 17676
        },
        "micros": 443,
        "id": "GGFuCWOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63152,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.154",
        "protocol": {
          "service": "HTTP  alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "NL",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.154",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPNRSx1NQRKNTRKUTKOMMx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "country": "NL",
          "port": 8080,
          "city": "Utrecht",
          "ipLowBits": 2444187592,
          "ip": "145.175.87.200",
          "name": "145.175.87.200",
          "coordinates": {
            "lon": 5.1190948486328125,
            "lat": 52.09379577636719
          },
          "reputation": [

          ],
          "region": "09"
        },
        "micros": 442,
        "id": "GFaYlGOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63156,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.142",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "US",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.142",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPNRMx1SRKQRKSTKNUQx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "country": "US",
          "port": 8080,
          "ipLowBits": 1093485496,
          "ip": "65.45.67.184",
          "name": "65.45.67.184",
          "coordinates": {
            "lon": -97.0,
            "lat": 38.0
          },
          "reputation": [

          ]
        },
        "micros": 440,
        "id": "EOabmWOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63150,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.118",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "GB",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.118",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPNQOx1TVKSTKUUKOPQx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "owner": "Tiscali UK Limited",
          "country": "GB",
          "port": 8080,
          "ipLowBits": 1329813738,
          "ip": "79.67.88.234",
          "name": "79.67.88.234",
          "coordinates": {
            "lon": -0.1300048828125,
            "lat": 51.5
          },
          "reputation": [

          ],
          "asn": 9105
        },
        "micros": 439,
        "id": "ENYg0GOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63142,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ],
    [
      {
        "date": "2016-08-16T12:00:31.110",
        "protocol": {
          "service": "HTTP alternate",
          "udpOrTcp": "TCP"
        },
        "data": {
          "conn": {
            "responseCC": "IN",
            "missedBytes": 0,
            "history": "S",
            "respPackets": 0,
            "respIPBytes": 0,
            "localResponse": false,
            "duration": 0,
            "protocol": "tcp",
            "localOrigin": true,
            "originCC": "",
            "service": "",
            "reqIPBytes": 52,
            "startTime": "2016-08-16T12:00:31.110",
            "reqPackets": 1,
            "state": "S0",
            "tunnel": ""
          }
        },
        "origin": "live",
        "correlationIds": [
          "CNMKPKNSOKNMRx1SPNPUx1NRTKOOTKNRSKUQx1UMUM"
        ],
        "host": "rank-sensor",
        "destination": {
          "ipHighBits": 0,
          "country": "IN",
          "port": 8080,
          "city": "Mumbai",
          "ipLowBits": 2648939604,
          "ip": "157.227.156.84",
          "name": "157.227.156.84",
          "coordinates": {
            "lon": 72.8258056640625,
            "lat": 18.975006103515625
          },
          "reputation": [

          ],
          "region": "16"
        },
        "micros": 437,
        "id": "EM-RHGOpEeaCwQrOrMuSaQ",
        "source": {
          "ipHighBits": 0,
          "internal": true,
          "port": 63138,
          "ipLowBits": 168010345,
          "ip": "10.3.162.105",
          "name": "10.3.162.105",
          "reputation": [

          ]
        },
        "type": "conn"
      }
    ]
  ]
};*/

// const rows = data.rows;
// let timelineBars = '';

// function displayTimelineBars() {
//   let top = (100 * 71 / 240) * 100;
//   for (let i = 0; i < rows.length; i++) {
//     // top = top + ;
//     timelineBars += "<div style={{height: '1px', width: '50px', backgroundColor: 'yellow'}}></div>";
//   }
//   timelineBars = $.parseHTML(timelineBars);
// }

class TimelineGraph extends React.Component {
  // displayTimeline() {
  //   for(let i = 0; i < 24; i++) {
  //   }
  // }

  render() {
    return (
      <div>
        <div style={{height: '500px', width: '70px', border: '0px solid red', overflowY: 'scroll', direction: 'rtl'}}>
          <div style={{height: '240px', width: '50px', borderBottom: '1px solid blue'}}>
            {/*{console.log(timelineBars)}
            {displayTimelineBars()}
            {timelineBars}*/}
            {/*<div style={{height: '1px', width: '50px', backgroundColor: 'yellow'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'transparent'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'red'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'red'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'yellow'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'yellow'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'transparent'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'red'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'red'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'yellow'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'yellow'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'transparent'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'red'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'red'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'yellow'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'yellow'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'transparent'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'red'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'red'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'yellow'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'yellow'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'transparent'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'red'}}></div>
            <div style={{height: '1px', width: '50px', backgroundColor: 'transparent'}}></div>*/}
          </div>
          <div style={{height: '240px', width: '50px', borderBottom: '1px solid blue'}}>
          </div>
          <div style={{height: '240px', width: '50px', borderBottom: '1px solid blue'}}>
          </div>
        </div>
      </div>
    );
  }
}

export default TimelineGraph;
