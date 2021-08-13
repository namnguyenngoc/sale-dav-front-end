/* eslint-disable no-unused-vars */

const API_URL = 'http://103.69.193.126:8789/'; //  platform server
// const API_URL = 'http://127.0.0.1' //  platform server

// Only developing application connect to local ip ,another applications connect to developement server ip.
const config = {
  API_FAMILY: `${API_URL}:8789`,
//  API_FAMILY: `${API_URL}:8789`,
  dateTimeFormat: 'YYYYMMDD', // Format date time constant for condition search
  tooltipWidth: 300,
}

export default config
