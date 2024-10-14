import axios from "axios";

/**
 * 
 * @param {String} endpoint 
 * @param {RequestInit} init 
 * @returns 
 */

export function api(endpoint, init) {
    const url = 'http://localhost:3000' + endpoint


    return axios({
        method: init.method || 'GET', // Define o método padrão como GET, se não for especificado
        url: url,
        timeout: 10000,
        headers: init.headers || {},  // Define headers, se houver
        data: init.data || {}, });
}