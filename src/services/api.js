import axios from 'axios';

const API_ENDPOINT = 'https://devlix-test.firebaseapp.com/';

class API {
    /**
     * @param resource
     * @param params
     * @return {Promise.<*>}
     */
    async get(resource, params = new Map()) {
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        let url = API_ENDPOINT + resource + '?' + this.serializeParams(params);

        let response = await this.request(url, options);
        if (response.status !== 200) {
            throw Error('Cannot get data');
        }
        return response.data;
    }

    /**
     * @param resource
     * @param params
     * @return {Promise.<*>}
     */
    async put(resource, params = {}) {
        let options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: params
        };

        let url = API_ENDPOINT + resource;

        let response = await this.request(url, options);
        if (response.status !== 200) {
            throw Error('Cannot put data');
        }
        return response.data;
    }

    /**
     * @param url
     * @param options
     * @returns {Promise.<*>}
     */
    async request(url, options) {
        return await axios(url, options);
    }

    /**
     * @param params
     * @return {string}
     */
    serializeParams(params) {
        let array = [];

        params.forEach((value, key) => {
            array.push(key + '=' + encodeURIComponent(value));
        });

        return array.join('&');
    }
}

export default new API();