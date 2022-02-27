import Dados from "../data/repository/dados"


class Controller {
    station_list = []
    station_type_list = []
    stations_types_selected = []
    stations_selected = []
    stations = []
    expand = true
    geojson = undefined
    context = null
    menuFiltro = false
    constructor(context) {
        this.context = context
    }
    async created() {
        await this.fetchFeatures()
        await this.fetchStation()
        await this.fetchStationType()

    }

    /*  change() {
         this.context.$nextTick(() => {
             if (this.allTypes) {
                 this.stations_types_selected = []
             } else if (this.someTypes) {
                 this.stations_types_selected = []
             } else if (this.emptyTypes) {
                 this.stations_types_selected = this.station_type_list.slice()
             }
         })
     }
 
     toggle() {
         this.context.$nextTick(() => {
             if (this.allStations) {
                 this.stations_selected = []
             } else if (this.someStations) {
                 this.stations_selected = []
             } else if (this.emptyStations) {
                 this.stations_selected = this.stations.slice()
             }
         })
     } */

    async fetchFeatures() {

        const dados = new Dados()

        this.geojson = await dados.fetchFeatures()


        console.log(this.geojson)


    }
    async fetchStation() {
        const dados = new Dados()
        this.station_list = await dados.fetchStation()
        console.log(this.station_list)
    }

    async fetchStationType() {
        const dados = new Dados()
        this.station_type_list = await dados.fetchStationType()
        console.log(this.station_type_list)

    }


    change() {
        /* eslint-disable */
        console.log(this.stations_types_selected)
        this.stations = []
        console.log("teste")



        this.stations_types_selected.forEach(sation_type => {
            this.station_list.forEach(station => {
                if (sation_type.id == station.station_type_id) {
                    this.stations.push(station)
                }
            })

        })
        console.log(this.stations)
    }

    /* consulting() {
        let features = []
        for (let item in this.geojson.features) {
            for (let station in this.stations_selected) {
                if (
                    this.geojson.features[item].properties.id === this.stations_selected[station].id
                ) {

                    features.push(this.geojson.features[item])
                }
            }
        }
        this.geojson.features = features
        this.context.$emit('stations', this.geojson)
        this.context.$emit('types', this.stations_types_selected)
    }

    allTypes() {
        return (
            this.stations_types_selected.length === this.station_type_list.length
        )
    }
    someTypes() {
        return (
            this.stations_types_selected.length > 0 &&
            this.stations_types_selected.length < this.station_type_list.length
        )
    }
    emptyTypes() {
        return this.stations_types_selected.length === 0
    }
    allStations() {
        return this.stations_selected.length === this.stations.length
    }
    someStations() {
        return (
            this.stations_selected.length > 0 &&
            this.stations_selected.length < this.stations.length
        )
    }
    emptyStations() {
        return this.stations_selected.length === 0
    }
    iconStations() {
        if (this.allStations) return 'disabled_by_default'
        if (this.someStations) return 'indeterminate_check_box'
        if (this.emptyStations) return 'check_box_outline_blank'
    }
    iconTypes() {
        if (this.allTypes) {
            return 'disabled_by_default'
        }
        if (this.someTypes) {
            return 'indeterminate_check_box'
        }
        if (this.emptyTypes) {
            return 'check_box_outline_blank'
        }
    } */
}


export default Controller