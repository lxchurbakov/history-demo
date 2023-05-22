const API_URL = 'http://localhost:3000';

// POST
// eturn fetch(`${API_HOST}/packs`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then((r) => r.json())

export const cars = {
    create: (make: string, model: string, vin: string) => {
        return fetch(`${API_URL}/cars`, { 
            method: 'POST', body: JSON.stringify({ make, model, vin }),
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        }).then((r) => r.json());
    },
};

