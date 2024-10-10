import axios from "axios";

/**
 * 
 * @param {String} endpoint 
 * @param {RequestInit} init 
 * @returns 
 */

export function api(endpoint, init) {
    const url = 'http://localhost:3000' + endpoint


    return axios({ url: url, init, ...init });
}