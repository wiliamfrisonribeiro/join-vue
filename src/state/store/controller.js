/* eslint-disable */
import SearchStation from "../data/repository/searchStations"
import GeoJSON from 'ol/format/GeoJSON'
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as defaultControls, ScaleLine } from "ol/control"
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer"
import { OSM, Vector as VectorSource } from 'ol/source'
import Overlay from 'ol/Overlay'
import { Fill, Stroke, Style, Icon, Circle } from 'ol/style'
import dayjs from "dayjs"

class Controller {

    stationsTypesSelected = []
    stationsSelected = []
    stationList = []
    stationTypeList = []
    stations = []
    geojson = null
    context = null
    contextFilter = null
    vectorGeoJSON = null
    message = null
    source = new VectorSource()
    station = {}
    drawer = false
    snackbar = false
    loading = false
    expand = false

    constructor(context) {
        this.context = context
    }


    async created() {
        Promise.all([
            this.searchFeatures(),
            this.searchStation(),
            this.searchStationType(),
        ])
    }

    async searchFeatures() {
        const serchStation = new SearchStation()
        this.geojson = await serchStation.searchFeatures()
    }
    async searchStation() {
        const serchStation = new SearchStation()
        this.stationList = await serchStation.serchStation()
    }

    async searchStationType() {
        const serchStation = new SearchStation()
        this.stationTypeList = await serchStation.searchStationType()

        console.log(this.stationTypeList)

    }

    change() {
        /* eslint-disable */
        this.stations = []
        this.stationsTypesSelected.forEach(sationType => {
            this.stationList.forEach(station => {
                if (sationType.id == station.station_type_id) {
                    this.stations.push(station)
                }
            })
        })
        console.log(this.stations)
    }


    initMap() {
        var source = new VectorSource();
        var vector = new VectorLayer({
            source: source,
        });

        var raster = new TileLayer({
            source: new OSM(),
        });
        this.vectorGeoJSON = new VectorLayer({
            source: this.source,
            style: function (feature) {
                return [
                    new Style({
                        image: new Icon({
                            scale: 0.9,
                            color:
                                feature.get("station_type_id") == "1"
                                    ? "#7cb5ec"
                                    : feature.get("station_type_id") == "2"
                                        ? "#434348"
                                        : feature.get("station_type_id") == "3"
                                            ? "#90ed7d"
                                            : feature.get("station_type_id") == "4"
                                                ? "#f7a35c"
                                                : "#8085e9",
                            src: require("../../assets/location_on-white-48dp.svg"),
                        }),
                    }),
                ];
            },
        });
        var map = new Map({
            controls: defaultControls().extend([
                new ScaleLine({
                    units: "degrees",
                }),
            ]),
            target: "map",
            layers: [raster, vector, this.vectorGeoJSON],
            view: new View({
                projection: "EPSG:4326",
                center: [-49.276855, -25.441105],
                zoom: 8,
            }),
        });
        var popup = document.querySelector(".popup-container");

        var overlayLayer = new Overlay({ element: popup });
        map.addOverlay(overlayLayer);

        const station = {
            id: null,
            name: null,
            stationType: null,
            latitude: null,
            elevation: null,
            longitude: null,
            initOperetion: null,
            fintOperetion: null,
        }

        const station_type = [
            {
                id: "1",
                name: "AGROMETEOROLOGICAL",
                color: "#7cb5ec",
            },
            {
                id: "2",
                name: "CLIMATOLÓGICO",
                color: "#434348",
            },
            {
                id: "3",

                color: "#90ed7d",
            },
            {
                id: "4",
                name: "HIDROMÉTRICO",
                color: "#f7a35c",
            },
            {
                id: "5",
                name: "PLUVIOMETRIC",
                color: "#8085e9",
            },
        ];
        this.station = station
        map.on("click", function (e) {
            overlayLayer.setPosition(undefined);
            map.forEachFeatureAtPixel(e.pixel, function (feature) {
                overlayLayer.setPosition(e.coordinate)
                station.id = feature.get("id");

                station.name = feature.get('name')
                station.latitude = feature.get("latitude")
                station.longitude = feature.get("longitude")
                station.elevation = feature.get("elevation_meters")
                station.initOperetion = dayjs(
                    feature.get("operation_start_date")
                ).format("DD/MM/YYYY")
                station.endOperetion = dayjs(
                    feature.get("operation_end_date")
                ).format("DD/MM/YYYY")

                station_type.forEach(item => {
                    if (feature.get("station_type_id") == item.id) {
                        station.stationType = item.name
                    }
                })
            })

        });
    }


    async consulting() {
        try {
            this.loading = true

            await this.searchFeatures()
            let features = []
            this.geojson.features.forEach(feature => {
                this.stationsSelected.map(satation => {
                    if (feature.properties.id === satation.id) {
                        features.push(feature)
                    }
                })
            })
            this.geojson.features = features
            if (this.geojson.features.length > 0) {
                this.source.clear()
                this.source.addFeatures(new GeoJSON().readFeatures(this.geojson))
                this.drawer = false
            } else {
                this.snackbar = true;
                this.source.clear();
                this.message = "Nenhuma estação encontrada.";
            }


        } catch (error) {
            this.message = error
            this.snackbar = true
        } finally {
            this.loading = false
        }
    }

    allStationTypes() {
        return this.stationsTypesSelected.length === this.stationTypeList.length
    }
    someTypesStation() {
        return this.stationsTypesSelected.length > 0 && !this.allStationTypes()
    }

    iconStationType() {
        if (this.allStationTypes()) return 'mdi-close-box'
        if (this.someTypesStation()) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'

    }

    toggleStationType() {
        this.contextFilter.$nextTick(() => {
            if (this.allStationTypes()) {
                this.stationsTypesSelected = []
            } else {
                this.stationsTypesSelected = this.stationTypeList.slice()
            }
        })
    }

    allStations() {
        return this.stationsSelected.length === this.stations.length
    }
    someStations() {
        return this.stationsSelected.length > 0 && !this.allStations()
    }

    iconStations() {
        if (this.allStations()) return 'mdi-close-box'
        if (this.someStations()) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'

    }

    toggleStations() {
        this.contextFilter.$nextTick(() => {
            if (this.allStations()) {
                this.stationsSelected = []
            } else {
                this.stationsSelected = this.stations.slice()
            }
        })
    }



}


export default Controller