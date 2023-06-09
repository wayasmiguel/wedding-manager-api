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
  create: async (payload)  => {
    try {
      await _axs.post(`?sheet=Invitados`, payload.data);
    } catch (error) {
      console.error('Error:', error);
    }
  },
  read: async () => {
    try {
      await _axs.get('?sheet=Invitados');
    } catch (error) {
      console.error('Error:', error);
    }
  },
  update: async (payload) => {
    try {
      await _axs.patch(`code/${payload.code}?sheet=Invitados`, payload.data);
    } catch (error) {
      console.error('Error:', error);
    }
  },
  delete: async (payload) => {
    try {
      await _axs.delete(`code/${payload.code}?sheet=Invitados`);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

module.exports = GoogleSpreadSheets;
