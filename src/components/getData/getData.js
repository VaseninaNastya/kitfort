
/*
Documetation: https://corona.lmao.ninja/docs/#/
*/

class Covid19API {
    constructor() {
      this.API_SERVER = "https://restcountries.eu";
    }
  
    /**
     * Get global data.
     */
    async getAll() {
      return fetch(this.API_SERVER + "/rest/v2/all", {
        method: "GET"
      })
        .then(response => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .catch(error => Error(error));
    }
    
  }
  
  export default Covid19API;