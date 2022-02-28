/* eslint-disable */
import Dados from "../data/repository/dados"

// This is library of openlayer for handle map
import GeoJSON from 'ol/format/GeoJSON'
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as defaultControls, ScaleLine } from "ol/control";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from 'ol/source'
import { Fill, Stroke, Style, Icon, Circle } from 'ol/style'
import Overlay from 'ol/Overlay'
class Controller {
    station_list = []
    station_type_list = []
    stations_types_selected = []
    stations_selected = []
    stations = []
    geojson = undefined
    context = null
    vectorGeoJSON = null
    drawer = false
    source = new VectorSource()


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
                center: [-48.815011395380765, -24.650150016322684],
                zoom: 5,
            }),
        });
        var popup = document.querySelector(".popup-container");
        var overlayLayer = new Overlay({ element: popup });
        map.addOverlay(overlayLayer);
        let station_type = [
            {
                id: "1",
                created_at: "2020-11-30 10:43:46.687141-03",
                update_at: "2020-11-30 10:43:46.687162-03",
                name: "AGROMETEOROLOGICAL",
                color: "#7cb5ec",
            },
            {
                id: "2",
                created_at: "2020-11-30 10:43:46.688442-03",
                update_at: "2020-11-30 10:43:46.688459-03",
                name: "CLIMATOLÓGICO",
                color: "#434348",
            },
            {
                id: "3",
                created_at: "2020-11-30 10:43:46.68895-03",
                update_at: "2020-11-30 10:43:46.688964-03",
                name: "HIDROCLIMATOLÓGICO",
                color: "#90ed7d",
            },
            {
                id: "4",
                created_at: "2020-11-30 10:43:46.689495-03",
                update_at: "2020-11-30 10:43:46.689513-03",
                name: "HIDROMÉTRICO",
                color: "#f7a35c",
            },
            {
                id: "5",
                created_at: "2020-11-30 10:43:46.690113-03",
                update_at: "2020-11-30 10:43:46.690134-03",
                name: "PLUVIOMETRIC",
                color: "#8085e9",
            },
        ];
        var overlayFeatureId = document.getElementById("feature-id");
        var overlayFeatureName = document.getElementById("feature-name");
        var overlayFeatureLatitude = document.getElementById("feature-latitude");
        var overlayFeatureLongitude =
            document.getElementById("feature-longitude");
        var overlayFeatureElevation =
            document.getElementById("feature-elevation");
        var overlayFeatureType = document.getElementById("feature-type");
        var overlayFeatureStart = document.getElementById("feature-start");
        var overlayFeatureEnd = document.getElementById("feature-end");

        map.on("click", function (e) {
            overlayLayer.setPosition(undefined);
            map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                overlayLayer.setPosition(e.coordinate);
                overlayFeatureId.innerHTML = feature.get("id");
                overlayFeatureName.innerHTML = feature.get("name");
                overlayFeatureLatitude.innerHTML = feature.get("latitude");
                overlayFeatureLongitude.innerHTML = feature.get("longitude");
                overlayFeatureElevation.innerHTML = feature.get("elevation_meters");
                overlayFeatureStart.innerHTML = dayjs(
                    feature.get("operation_start_date")
                ).format("DD/MM/YYYY");
                //overlayFeatureStart.innerHTML = feature.get("operation_start_date");
                overlayFeatureEnd.innerHTML = dayjs(
                    feature.get("operation_end_date")
                ).format("DD/MM/YYYY");
                //overlayFeatureEnd.innerHTML = feature.get("operation_end_date");
                for (let item in station_type) {
                    if (feature.get("station_type_id") == station_type[item].id) {
                        overlayFeatureType.innerHTML = station_type[item].name;
                    }
                }
            });
        });
    }


    async consulting() {
        try {

            debugger
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

}


export default Controller