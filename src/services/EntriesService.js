export default class EntriesService {

    async getPersonas(token)
    {
        console.log(process.env);
        const res = await fetch(`${process.env.VUE_APP_API}/GetPersona?code=${process.env.VUE_APP_CODE}`,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        const data = await res.json();

        return data;
    }

    async getEmpresas(token)
    {
        const res = await fetch(`${process.env.VUE_APP_API}/GetEmpresa?code=${process.env.VUE_APP_CODE}`,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        const data = await res.json();

        return data;
    }

    async getTipoCarga(token)
    {
        const res = await fetch(`${process.env.VUE_APP_API}/GetTipoCarga?code=${process.env.VUE_APP_CODE}`,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        const data = await res.json();

        return data;
    }

    async getVehiculo(token)
    {
        const res = await fetch(`${process.env.VUE_APP_API}/GetVehiculo?code=${process.env.VUE_APP_CODE}`,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        const data = await res.json();

        return data;
    }

    async getIngresos(from,
                      to,
                      idEmpresa,
                      idVehiculo,
                      idPersona,
                      idTipoCarga,
                      token)
    {
        const res = await fetch(`${process.env.VUE_APP_API}/GetIngresos?code=${process.env.VUE_APP_CODE}&from=${from}&to=${to}&idempresa=${idEmpresa}&idvehiculo=${idVehiculo}&idpersona=${idPersona}&idtipocarga=${idTipoCarga}`,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        const data = await res.json();

        return data;
    }

    async getEgresos(token)
    {
        const res = await fetch(`${process.env.VUE_APP_API}/GetEgresosPendientes?code=${process.env.VUE_APP_CODE}`,
        {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`
            }
        })
        .catch(error => {
        console.error('Error:', error);
        });

        const data = await res.json();

        return data;
    }

    async addPerson(document,
                    documentType,
                    names, 
                    surnames, 
                    country,
                    mobile,
                    token){
            const res = await fetch(`${process.env.VUE_APP_API}/AddPersona?code=${process.env.VUE_APP_CODE}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
            {
                Documento : document,
                TipoDocumento: documentType,
                Nombres: names,
                Apellidos: surnames,
                Pais: country,
                Celular: mobile
            })
            })
            .catch(error => console.error('Error:', error));
    }

    async addVehicle(plate, 
        country,
        token){
        const res = await fetch(`${process.env.VUE_APP_API}/AddVehiculo?code=${process.env.VUE_APP_CODE}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
        {
            Matricula : plate,
            Pais: country
        })
        })
        .catch(error => console.error('Error:', error));
    }

    async addCompany(name, 
        token){
        const res = await fetch(`${process.env.VUE_APP_API}/AddEmpresa?code=${process.env.VUE_APP_CODE}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
        {
            Nombre : name
        })
        })
        .catch(error => console.error('Error:', error));
    }

    async addLoadType(description, 
        token){
        const res = await fetch(`${process.env.VUE_APP_API}/AddTipoCarga?code=${process.env.VUE_APP_CODE}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
        {
            Descripcion : description
        })
        })
        .catch(error => console.error('Error:', error));
    }

    async addEntry(idCompany,
        idVehicle,
        idPerson,
        idLoadType, 
        weight,
        token){
        const res = await fetch(`${process.env.VUE_APP_API}/AddIngreso?code=${process.env.VUE_APP_CODE}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
        {
            IdEmpresa : idCompany,
            IdVehiculo: idVehicle,
            IdPersona: idPerson,
            IdTipoCarga: idLoadType,
            Peso: weight
        })
        })
        .catch(error => console.error('Error:', error));
    }

    async addExit(idIngreso,
                token){

        const res = await fetch(`${process.env.VUE_APP_API}/UpdateEgreso?code=${process.env.VUE_APP_CODE}&idIngreso=${idIngreso}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        })
        .catch(error => console.error('Error:', error));
    }

}