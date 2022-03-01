/* eslint-disable */
import Dados from "../data/repository/dados"

// This is library of openlayer for handle map
import GeoJSON from 'ol/format/GeoJSON'
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as defaultControls, ScaleLine } from "ol/control";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from 'ol/source'
import Overlay from 'ol/Overlay'
import { Fill, Stroke, Style, Icon, Circle } from 'ol/style'
import dayjs from "dayjs";
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
    source = new VectorSource()
    drawer = false

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
        const dados = new Dados()
        this.geojson = await dados.searchFeatures()
    }
    async searchStation() {
        const dados = new Dados()
        this.station_list = await dados.serchStation()
    }

    async searchStationType() {
        const dados = new Dados()
        this.station_type_list = await dados.searchStationType()

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
        // create vector layer
        var source = new VectorSource();
        var vector = new VectorLayer({
            source: source,
        });
        // create title layer
        var raster = new TileLayer({
            source: new OSM(),
        });
        // Vector data source in GeoJSON format
        this.vectorGeoJSON = new VectorLayer({
            source: this.source,
            style: function (feature) {
                //console.log(feature.getProperties()); // <== all geojson properties
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
        // create map with 2 layer
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
                zoom: 5,
            }),
        });
        var popup = document.querySelector(".popup-container");

        console.log(popup)
        debugger
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
            })

        });
    }


    async consulting() {
        try {
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

            } else {
                this.source.clear();
                this.snackbar = true;
                this.text = "Nenhuma estação encontrada.";
            }


        } catch (error) {

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

    toggle(flagStatioType) {
        debugger
        if (flagStatioType == "stationsType") {
            this.contextFilter.$nextTick(() => {
                if (this.allStations("allStationsType")) {
                    this.stations_types_selected = [];
                } else if (this.someStations("someStationsType")) {
                    this.stations_types_selected = [];
                } else if (this.emptyStations("emptyStationsType")) {
                    this.stations_types_selected = this.station_type_list.slice();
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

    iconStations(flagStatioType) {
        if (flagStatioType == "iconStationsType") {
            if (this.someStations("someStationType")) {
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