import axios from "axios";

/**
 * 
 * @param {String} endpoint 
 * @param {RequestInit} init 
 * @returns 
 */

export function api(endpoint, init) {
    const url = 'https://m3p-backend-squad3-3vsm.onrender.com' + endpoint


    return axios({
        method: init.method || 'GET', // Define o método padrão como GET, se não for especificado
        url: url,
        timeout: 10000,
        headers: init.headers || {},  // Define headers, se houver
        data: init.data || {}, });
}