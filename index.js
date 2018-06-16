"use strict";

{
  const version = 'v1';
  const origin = 'https://api.pocketwatch.xyz';
  const fetch = require('node-fetch');
  const timer = {
   create, 
   "delete": del
  };
  const key = {
    refresh
  };
  const subscription = {
    cancel
  };
  const pocketwatch = {
    authorize, timer, key, subscription
  };

  let apiKey;

  module.exports = pocketwatch;

  function authorize(key) {
    apiKey = key;
    guardAuthorized();
  }

  async function create({
      name:name="",interval,intervalCount,duration,
      durationCount,url,method,body:body="",
      contentType:contentType = 'application/json'} = {}) {
    guardAuthorized();
    const apimethod = "POST"; 
    const headers = { 
      'Content-Type': 'application/json'
    };
    const apiurl = `${origin}/${version}/timer/new`;
    const apibody = {
      apiKey,
      name,
      interval_unit_type: interval,
      interval_unit_count: intervalCount,
      duration_unit_type: duration,
      duration_unit_count: durationCount,
      url,
      method,
      body,
      contentType
    };
    return fetch(apiurl, {headers,method:apimethod,body:JSON.stringify(apibody)});
  }

  async function del(keyName) {
    guardAuthorized();
    const url = `${origin}/${version}/delete/timer`;
    const method = "POST"; 
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      apiKey,
      keyName
    };
    return fetch(url, {headers,method,body:JSON.stringify(body)});
  }

  async function refresh() {
    guardAuthorized();
    const url = `${origin}/${version}/key/refresh`;
    const method = "POST"; 
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      apiKey
    };
    return fetch(url, {headers,method,body:JSON.stringify(body)});
  }

  async function cancel() {
    guardAuthorized();
    const url = `${origin}/${version}/subscription/cancel`;
    const method = "POST"; 
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      apiKey
    };
    return fetch(url, {headers,method,body:JSON.stringify(body)});
  }

  function guardAuthorized() {
    if ( ! apiKey ) {
      throw new TypeError(`
        Please call .authorize(apiKey) 
        with a valid API key to set your API key before using the API.
        Read the docs at:
        https://dosyago-corp.github.io/pocketwatch-api/
        `);
    }
  }
}
