import QueryString from "qs";
import { runInThisContext } from "vm";

export default class OnSearch {
    constructor() {
        this.search = '';
    }

    searchCountries() {
        const url = `https://restcountries.eu/rest/v2/name/${this.search}`;
        return fetch(url).then(response => {
            if (response.ok) return response.json();
            throw new Error(response.statusText);
        }).then(data => {
            return data;
        })
    }
    get query() {
        return this.search;
    }
    set query(newQuery) {
        this.search = newQuery;
    }
}
