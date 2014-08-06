/** _Esta aplicación fue modificada por el grupo Semillero de 
Innovación Geografica(SIG) de Esri Colombia, para mayor información 
consulte www.ersi.co o visite @geo_geeks en twitter.*/
/** @license
 | Version 10.2
 | Copyright 2012 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
dojo.provide("js.config");
dojo.declare("js.config", null, {

    // This file contains various configuration settings for "Election Results" template
    //
    // Use this file to perform the following:
    //
    // 1.  Specify application title                  - [ Tag(s) to look for: ApplicationName ]
    // 2.  Set path for application icon              - [ Tag(s) to look for: ApplicationIcon ]
    // 3.  Set splash screen message                  - [ Tag(s) to look for: SplashScreenMessage ]
    // 4.  Set URL for help page                      - [ Tag(s) to look for: HelpURL ]
    //
    // 5.  Specify URL(s) for basemaps                - [ Tag(s) to look for: BaseMapLayers ]
    // 6.  Set initial map extent                     - [ Tag(s) to look for: DefaultExtent ]
    //
    // 7.  Choose to use WebMap or map services       - [ Tag(s) to look for: UseWebmap <true/false> ]
    // 8.  Specify WebMapId, if using WebMap          - [ Tag(s) to look for: WebMapId ]
    // 9.  Or for using map services:
    // 9a. Specify URL(s) for operational and overlay layers
    //                                                - [ Tag(s) to look for: PrecinctLayer, ReferenceOverlayLayer]
    // 9b. Customize data formatting                  - [ Tag(s) to look for: ShowNullValueAs]
    //
    // 10. Customize address search settings          - [ Tag(s) to look for: LocatorSettings]
    //
    // 11. Set URL for geometry service               - [ Tag(s) to look for: GeometryService ]
    //
    // 12. Configure data to be displayed on the bottom panel
    //                                                - [ Tag(s) to look for: InfoBoxWidth, ElectionResultData, ColorCodeOfParties, VotedColor, DidNotVoteColor]
    //
    // 13. Configure data to be displayed for election updates
    //                                                - [Tag(s) to look for: Updates]
    // 14. Specify URLs for map sharing               - [ Tag(s) to look for: FacebookShareURL, TwitterShareURL, ShareByMailLink ]
    // 15a.In case of changing the TinyURL service
    //     Specify URL for the new service            - [ Tag(s) to look for: MapSharingOptions (set TinyURLServiceURL, TinyURLResponseAttribute) ]
    //
    //

    // ------------------------------------------------------------------------------------------------------------------------
    // GENERAL SETTINGS
    // -----------------------------------------------------------------------------------------------------------------------
    // Set application title
    ApplicationName: " ",

    // Set application icon path
    ApplicationIcon: " ",

    // Set splash window content - Message that appears when the application starts
    SplashScreenMessage: "<b>Resultados Elecciones 2014 en Colombia</b> <br/> <hr/> <br/> <img src='http://54.187.22.10/Elecciones2014/images/caja1.png'><img/><br/><br/>",

    // Set URL of help page/portal
    HelpURL: "help.htm",

    // ------------------------------------------------------------------------------------------------------------------------
    // BASEMAP SETTINGS
    // ------------------------------------------------------------------------------------------------------------------------
    // Set baseMap layers
    // Please note: All base maps need to use the same spatial reference. By default, on application start the first basemap will be loaded
    BaseMapLayers: [{
        Key: "baseMapKey",
        MapURL: "http://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer"
    }],


    // Initial map extent. Use comma (,) to separate values and don't delete the last comma
    DefaultExtent: "-11682526,-1050757,-4168460,2422541",

    //DefaultExtent= ShowLocateContainer();

    // ------------------------------------------------------------------------------------------------------------------------
    // OPERATIONAL DATA SETTINGS
    // ------------------------------------------------------------------------------------------------------------------------
    // WebMaps are not supported with the 10.2 version of the Election Results application. Please use Map Services for operational layers. Do not change the "UseWebmap" and "WebMapId" parameters.
    UseWebmap: false,

    WebMapId: "",

    // Set the following options for the configuration of operational layers

    // Key is used as an layerId while adding this layer to the map and has to be unique
    // ServiceURL is the REST end point for the PrecinctLayer
    // UseColor used to override the default symbology defined in the map service
    // Color used to define the renderer color of the symbol
    // Alpha used to define the transparency of the renderer
    // Query is used to query the map server for fetching precinct's
    // PrecinctName is the attribute name from the Precinct Layer which represents Precinct Name
    // County is the attribute name from the Precinct Layer which represents County name


    //partidos ganadores
    PrecinctLayer: {
        Key: "precinctLayer",
        ServiceURL: "http://54.187.22.10:6080/arcgis/rest/services/Elecciones2014/ReferenceOverlay/MapServer/0",
        UseColor: true,
        Color: "",
        Alpha: 0.10,
        Query: "UPPER(elecciones.DBO.departamentos.NOMBRE) LIKE '%${0}%'",
        PrecinctName: "elecciones.DBO.departamentos.NOMBRE",
        County: "elecciones.DBO.departamentos.PAIS"
    },

    //Set ReferenceOverlay Layer
    // ServiceURL is the REST end point for the reference overlay layer
    // DisplayOnLoad setting this will show the reference overlay layer on load
    ReferenceOverlayLayer: {
        ServiceURL: "http://54.187.22.10:6080/arcgis/rest/services/Elecciones2014/ReferenceOverlay/MapServer",
        DisplayOnLoad: true
    },

    // ------------------------------------------------------------------------------------------------------------------------

    // Set string value to be shown for null or blank values
    ShowNullValueAs: "ND",

    // ------------------------------------------------------------------------------------------------------------------------
    // ADDRESS SEARCH SETTINGS
    // ------------------------------------------------------------------------------------------------------------------------

    // Set locator settings such as locator symbol, size, zoom level, display fields, match score
    

    LocatorSettings: {
        Locators: [{
            DisplayText: "Dirección",
            LocatorDefaultAddress: "139 W Porter Ave Naperville IL 60540",
            LocatorParamaters: ["SingleLine"],
            LocatorURL: "http://54.187.22.10:6080/arcgis/rest/services/Elecciones2014/ResultadosSenado/MapServer/0",
            CandidateFields: "Loc_name, Score, Match_addr",
            DisplayField: "${Match_addr}",
            ZoomLevel: 4,
            AddressMatchScore: 80,
            LocatorFieldName: 'Loc_name',
            LocatorFieldValues: ["USA.StreetName", "USA.PointAddress", "USA.StreetAddress"]
        }, {
            DisplayText: "Departamento",
            LocatorDefaultPrecinct: "Cundinamarca"
        }]
    },

    // ------------------------------------------------------------------------------------------------------------------------
    // GEOMETRY SERVICE SETTINGS
    // ------------------------------------------------------------------------------------------------------------------------
    // Set geometry service URL
    GeometryService: "http://54.187.22.10:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer",

    // ------------------------------------------------------------------------------------------------------------------------

    // SETTINGS FOR INFO-PODS ON THE BOTTOM PANEL
    // ------------------------------------------------------------------------------------------------------------------------
    // Set width of the pods in the bottom panel
    InfoBoxWidth: 424,

    // Election Results contest data shown in the bottom panel. Every section is a pod in the bottom panel
    // HeaderColor will set the color of the header of the info pod in the bottom panel
    // Title will set the contest name of the info pod in the bottom panel
    // ServiceURL is the map service URL for the contest
    // ChartData is the attribute information for the contest used in rendering charts
    // ChartType "bar-chart" (or) "pie-chart"
    // PartyDetails is the attribute information used to render party color in the charts. This has to be in the same sequence with the ChartData attribute sequence. This data is not required for piechart
    // CandidateNames is the attribute information used to display Candidate name in the charts. This has to be in the same sequence with the ChartData attribute sequence. This data is not required for piechart
    // WinningParty is the attribute name which gives the winning party name. This is not required for pie-chart
    // DisplayOnLoad setting this will show the contest layer on load. If this is set true for multiple contests, only the first occurrence is considered
    // TotalBallots is the attribute name which gives the total votes casted. This is not required for pie-chart
    



//Prueba 1
    ElectionResultData: {
        POULayer: {
            HeaderColor: "#393939",
            Title: "Senado Nacional",
            ServiceURL:"http://54.187.22.10:6080/arcgis/rest/services/Elecciones2014/ResultadosSenado/MapServer/0",
            ChartData: ["elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_1","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_2","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_5","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_10","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_137","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_3","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_4","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_8","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_9", "elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_996"],
            ChartType: "barchart",
            PartyDetails: ["elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO1","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO2","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO5","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO10","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO137","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO3","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO4","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO8","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO9","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO996"],
           CandidateNames: ["elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO1","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO2","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO5","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO10","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO137","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO3","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO4","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO8","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO9","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO996"],
            DisplayOnLoad: true,
            TotalBallots: "elecciones.DBO.%VW_SENADO_RESULT.TOTAL_SUFRAGANTES_NAC"
        },
        SenadoNacional2: {
            HeaderColor: "#393939",
            Title: "Senado Nacional ",
            ServiceURL:"http://54.187.22.10:6080/arcgis/rest/services/Elecciones2014/ResultadosSenado/MapServer/0",
            ChartData: ["elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_1","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_2","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_5","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_10","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_137","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_3","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_4","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_8","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_9", "elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_996"],
            ChartType: "barchart",
            PartyDetails: ["elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO1","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO2","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO5","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO10","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO137","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO3","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO4","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO8","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO9","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO996"],
           CandidateNames: ["elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO1","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO2","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO5","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO10","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO137","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO3","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO4","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO8","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO9","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO996"],
            DisplayOnLoad: false,
            TotalBallots: "elecciones.DBO.%VW_SENADO_RESULT.TOTAL_SUFRAGANTES"
        },
        CamaraRepresentantesNacional: {
            HeaderColor: "#393939",
            Title: "Cámara de Representantes Nacional",
            ServiceURL:"http://54.187.22.10:6080/arcgis/rest/services/Elecciones2014/ResultadosCamara/MapServer/0",
            ChartData: ["elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_1","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_2","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_3","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_4","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_5","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_6","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_7","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_8","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_9","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_10","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_11","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_12","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_13","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_137","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_159","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_173","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_175","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_996"],
            ChartType: "barchart",
            PartyDetails: ["elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO1", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO2", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO3", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO4", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO5","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO6","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO7","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO8","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO9","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO10","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO11","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO12","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO13","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO137","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO159","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO173","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO175","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO996"],
            CandidateNames: ["elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO1", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO2", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO3", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO4", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO5","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO6","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO7","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO8","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO9","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO10","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO11","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO12","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO13","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO137","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO159","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO173","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO175","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO996"],
            DisplayOnLoad: false,
            TotalBallots: "elecciones.DBO.%VW_CAMARA_RESULT.TOTAL_SUFRAGANTES_NAC"
        },
        
        SenadoDepartamental: {
            HeaderColor: "#393939",
            Title: "Senado Departamental",
            ServiceURL:"http://54.187.22.10:6080/arcgis/rest/services/Elecciones2014/ResultadosSenado/MapServer/0",
            ChartData: ["elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_DEP1","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_DEP2","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_DEP5","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_DEP10","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_DEP137","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_DEP3","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_DEP4","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_DEP8","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_DEP9","elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_DEP996"],
            ChartType: "barchart",
            PartyDetails: ["elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO1","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO2","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO5","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO10","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO137","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO3","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO4","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO8","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO9","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO996"],
            CandidateNames: ["elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO1","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO2","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO5","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO10","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO137","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO3","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO4","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO8","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO9","elecciones.DBO.%VW_SENADO_RESULT.COD_PARTIDO996"],
            DisplayOnLoad: false,
            TotalBallots: "elecciones.DBO.%VW_SENADO_RESULT.TOTAL_SUFRAGANTES"
        },
        CamaraRepresentantesDepartamental: {
            HeaderColor: "#393939",
            Title: "Cámara de Representantes Departamental",
             ServiceURL:"http://54.187.22.10:6080/arcgis/rest/services/Elecciones2014/ResultadosCamara/MapServer/0",
            ChartData: ["elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP1","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP2","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP3","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP4","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP5","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP6","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP7","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP8","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP9","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP10","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP11","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP12","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP13","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP137","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP159","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP173","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP175","elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_DEP996"],
            ChartType: "barchart",
            PartyDetails: ["elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO1", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO2", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO3", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO4", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO5","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO6","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO7","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO8","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO9","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO10","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO11","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO12","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO13","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO137","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO159","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO173","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO175","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO996"],
            CandidateNames: ["elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO1", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO2", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO3", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO4", "elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO5","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO6","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO7","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO8","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO9","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO10","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO11","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO12","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO13","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO137","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO159","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO173","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO175","elecciones.DBO.%VW_CAMARA_RESULT.COD_PARTIDO996"],
            DisplayOnLoad: false,
            TotalBallots: "elecciones.DBO.%VW_CAMARA_RESULT.TOTAL_SUFRAGANTES"
        },
        VoterTurnout: {
            HeaderColor: "#393939",
            Title: "Proporción de Votantes Cámara Nacional",
            ServiceURL: "http://54.187.22.10:6080/arcgis/rest/services/Elecciones2014/ResultadosCamara/MapServer/0",
            ChartData: ["elecciones.DBO.%VW_CAMARA_RESULT.PORC_SUFRAGANTES_NAC","elecciones.DBO.%VW_CAMARA_RESULT.TOTAL_SUFRAGANTES_NAC","elecciones.DBO.%VW_CAMARA_RESULT.POTENCIAL_SUFRAGANTES_NAC"],
            DisplayOnLoad: false,
            ChartType: "piechart"
        },
		VoterTurnout2: {
            HeaderColor: "#393939",
            Title: "Proporción de Votantes Senado Nacional",
            ServiceURL: "http://54.187.22.10:6080/arcgis/rest/services/Elecciones2014/ResultadosSenado/MapServer/0",
            ChartData: ["elecciones.DBO.%VW_SENADO_RESULT.PORC_SUFRAGANTES_NAC","elecciones.DBO.%VW_SENADO_RESULT.TOTAL_SUFRAGANTES_NAC","elecciones.DBO.%VW_SENADO_RESULT.POTENCIAL_SUFRAGANTES_NAC"],
            DisplayOnLoad: false,
            ChartType: "piechart"
        },
        VoterTurnout3: {
            HeaderColor: "#393939",
            Title: "Proporción de Votos en Blanco Senado Nacional",
            ServiceURL: "http://54.187.22.10:6080/arcgis/rest/services/Elecciones2014/ResultadosSenado/MapServer/0",
            ChartData: ["elecciones.DBO.%VW_SENADO_RESULT.PORC_VOTOS_NAC_996","elecciones.DBO.%VW_SENADO_RESULT.TOTAL_SUFRAGANTES_NAC","elecciones.DBO.%VW_SENADO_RESULT.TOTAL_VOTOS_BLANCO"],
            DisplayOnLoad: false,
            ChartType: "piechart"
        },
        VoterTurnout4: {
            HeaderColor: "#393939",
            Title: "Proporción de Votos en Blanco Cámara R. Nacional",
            ServiceURL: "http://54.187.22.10:6080/arcgis/rest/services/Elecciones2014/ResultadosCamara/MapServer/0",
            ChartData: ["elecciones.DBO.%VW_CAMARA_RESULT.PORC_VOTOS_NAC_996","elecciones.DBO.%VW_CAMARA_RESULT.TOTAL_SUFRAGANTES_NAC","elecciones.DBO.%VW_CAMARA_RESULT.TOTAL_VOTOS_BLANCO"],
            DisplayOnLoad: false,
            ChartType: "piechart"
        }
    },

    //Query field for ElectionResultData layers
    ElectionResultDataQueryString: "elecciones.DBO.departamentos.NOMBRE",

    //Set the color for different parties
    ColorCodeOfParties: {
        "001": {
           "Color": "#FF0000"
       },
       "002": {
           "Color": "#0070FF"
       },
       "003": {
           "Color": "#FFEBAF"
       },
       "004": {
           "Color": "#FFBEBE"
       },
       "005": {
           "Color": "#73B273"
       },
       "006": {
           "Color": "#A8A800"
       },
       "007": {
           "Color": "#B8FCED"
       },
       "008": {
           "Color": "#BEE8FF"
       },
       "009": {
           "Color": "#F6C567"
       },
       "010": {
           "Color": "#FFFF73"
       },
       "011": {
           "Color": "#FFFFBE"
       },
       "012": {
           "Color": "#F4B8FC"
       },
       "013": {
           "Color": "#98C1B3"
       },
       "137": {
           "Color": "#E9FFBE"
       },
       "159": {
           "Color": "#F0FCB3"
       },
       "173": {
           "Color": "#F3FCB8"
       },
       "175": {
           "Color": "#D7C29E"
       },
       "Others": {
           "Color": "#ffffff"
       }
   },

    //Set the color for those who voted
    VotedColor: "#66736D",

    //Set the color for those who did not vote
    DidNotVoteColor: "#E6F0E8",

    // ------------------------------------------------------------------------------------------------------------------------
    //SETTING FOR ELECTION UPDATES
    // ------------------------------------------------------------------------------------------------------------------------
    //Set data to be displayed for election updates
    Updates: {
        // Set date format
        FormatDateAs: "MMM dd, yyyy",
        // Set time format
        FormatTimeAs: "HH:mm:ss",
        //Specify the field name for last update
        FieldName: "LASTUPDATE"
    },

    // ------------------------------------------------------------------------------------------------------------------------
    // SETTINGS FOR MAP SHARING
    // ------------------------------------------------------------------------------------------------------------------------
    // Set URL for TinyURL service, and URLs for social media
    MapSharingOptions: {
       TinyURLServiceURL: "http://api.bit.ly/v3/shorten?login=esri&apiKey=R_65fd9891cd882e2a96b99d4bda1be00e&uri=${0}&format=json",
       TinyURLResponseAttribute: "data.url",
       FacebookShareURL: "http://www.facebook.com/sharer.php?u=${0}&t=Elecciones%202014",
       TwitterShareURL: "http://mobile.twitter.com/compose/tweet?status=Elecciones%202014 ${0}",
       ShareByMailLink: "mailto:%20?subject=Elecciones%202014&body=${0}"
   }
});
