const axios = require("axios");

const _axs = axios.create({
  baseURL: 'https://sheetdb.io/api/v1/0r5wmmkzshav7',
  headers: {
    'Authorization': 'Bearer w9esggf8w96j6wjc6jwaj5p9iq9trc82bqg8jowd',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

const GoogleSpreadSheets = {
  create: async ()  => {

  },
  read: async () => {
    try {
      const response = await _axs.get('?sheet=Invitados');

      return response;
    
    } catch (error) {
      console.error('Error:', error);
    }
  },
  update: async (payload) => {
    try {
      const response = await _axs.patch(`code/${payload.code}?sheet=Invitados`, payload.data);

      return response;
    
    } catch (error) {
      console.error('Error:', error);
    }
  },
  delete: async () => {

  }
}

module.exports = GoogleSpreadSheets;
