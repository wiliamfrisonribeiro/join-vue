class SearchStation {

    searchFeatures() {

        const response = fetch(
            'https://raw.githubusercontent.com/wiliamfrisonribeiro/geojson/master/station_list.geojson'
        )
            .then((response) => response.json())
            .then((response) => {
                return response
            })
            .catch((error) => {
                throw 'Looks like there was a problem: \n', error
            })


        return response
    }

    serchStation() {
        const response = fetch(
            'https://raw.githubusercontent.com/wiliamfrisonribeiro/geojson/master/station.json'
        )
            .then((response) => response.json())
            .then((response) => {
                return response.station
            })
            .catch((error) => {
                throw 'Looks like there was a problem: \n', error
            })


        return response
    }

    searchStationType() {
        const response = fetch(
            'https://raw.githubusercontent.com/wiliamfrisonribeiro/geojson/master/station_type.json'
        )
            .then((response) => response.json())
            .then((response) => {
                return response.station_type
            })
            .catch((error) => {
                throw 'Looks like there was a problem: \n', error
            })

        return response
    }



}
export default SearchStation