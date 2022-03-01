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
    station_list = []
    station_type_list = []
    stations_types_selected = []
    stations_selected = []
    stations = []
    geojson = null
    context = null
    contextFilter = null
    vectorGeoJSON = null
    message = null
    source = new VectorSource()
    drawer = false
    snackbar = false
    loading = false
    station = {}



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
        this.station_list = await serchStation.serchStation()
    }

    async searchStationType() {
        const serchStation = new SearchStation()
        this.station_type_list = await serchStation.searchStationType()

        console.log(this.station_type_list)

    }

    change() {
        /* eslint-disable */
        this.stations = []
        this.stations_types_selected.forEach(sation_type => {
            this.station_list.forEach(station => {
                if (sation_type.id == station.station_type_id) {
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
            if (this.contextFilter.$refs.form.validate()) {
                await this.searchFeatures()
                let features = []
                this.geojson.features.forEach(feature => {
                    this.stations_selected.map(satation => {
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
            }

        } catch (error) {
            this.message = error
            this.snackbar = true
        } finally {
            this.loading = false
        }
    }

    allStations(flagStatioType) {
        if (flagStatioType == "allStationsType") {
            return (
                this.stations_types_selected.length === this.station_type_list.length
            )
        } else {
            return this.stations_selected.length === this.stations.length;
        }
    }

    someStations(flagStatioType) {

        if (flagStatioType == "someStationsType") {
            return (
                this.stations_types_selected.length > 0 &&
                this.stations_types_selected.length < this.station_type_list.length
            )
        } else {
            return (
                this.stations_selected.length > 0 &&
                this.stations_selected.length < this.stations.length
            )
        }

    }

    emptyStations(flagStatioType) {
        if (flagStatioType == "emptyStationsType") {
            return this.stations_types_selected.length === 0;
        } else {
            return this.stations_selected.length === 0
        }
    }

    toggle(flagStationType) {
        if (flagStationType == "stationsType") {
            this.contextFilter.$nextTick(() => {
                if (this.allStations("allStationsType")) {
                    this.stations_selected = [];
                } else if (this.someStations("someStationsType")) {
                    this.stations_selected = [];
                } else if (this.emptyStations("emptyStations")) {
                    this.stations_selected = this.stations.slice();
                }
            });

        } else {
            this.contextFilter.$nextTick(() => {
                if (this.allStations("")) {
                    this.stations_selected = [];
                } else if (this.someStations("")) {
                    this.stations_selected = [];
                } else if (this.emptyStations("")) {
                    this.stations_selected = this.stations.slice();
                }
            });
        }
    }

    iconStations(flagStationType) {

        if (flagStationType == "iconStationsType") {
            if (this.someStations("someStationType")) {
                iconStationsType
                return "mdi-close-box";
            } else if (this.allStations("allStationType")) {

                return "mdi-close-box";
            } else {

                return "mdi-checkbox-blank-outline";
            }

        } else {

            if (this.someStations("")) {
                return "mdi-close-box";
            } else if (this.allStations("")) {
                return "mdi-close-box";
            } else {
                return "mdi-checkbox-blank-outline";
            }
        }


    }
}


export default Controller