// import    { useContext }                from 'react';
// import      queryString                 from 'query-string';

class HttpHelper {
  static async getP(api, data) {
    data = data || {};
    console.log(`- get to ${api}: ${JSON.stringify(data)}`);

    const contentType = "application/json";
    // let     params          = queryString.stringify (data);
    const url = `${api}`;

    return await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": contentType
      }
    });
  }

  static async postP(api, data) {
    data = data || {};
    console.log(`- post to ${api}: ${JSON.stringify(data)}`);

    const contentType = "application/json";

    const body = JSON.stringify(data);
    const url = `${api}`;

    return await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        crossDomain: true,
        "Content-Type": contentType
      },
      // credentials:    'include',
      body
    });
  }

  static async httpRequestA(api, data, method, erm) {
    console.log(`httpRequestA (${api}, ${JSON.stringify(data)})`);

    let response;
    if (method === 0) {
      response = await this.getP(api, data);
    }
    if (method === 1) {
      response = await this.postP(api, data);
    }

    if (response.status === 400) {
      throw "Already Registerd";
    }

    const response_json = await response.json();
    let resobj;

    resobj = response_json;
    // console.log (`- resobj: ${JSON.stringify (resobj)}`);

    return resobj;
  }

  static handleGenericErr(err, props) {
    // console.log (`[${err.status}] ${err.message}: ${err.stack}`);
    props.onToast(`${err || "Unknown Error"}`);
  }
}

export default HttpHelper;
