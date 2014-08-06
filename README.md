# _Proyecto Elecciones Congreso_

Esta aplicación fue modificada por el grupo Semillero de Innovación Geográfica (SIG) de Esri Colombia, para mayor información consulte www.ersi.co o visite @geo_geeks en twitter.

En esta aplicación web se pueden encontrar los resultados de las Elecciones a Cámara y Senado de la República de Colombia, adicionalmente contiene distinta información importante de las mismas. Los datos son suministrados por la registraduría de la Republica y materializados por ARCGIS.

## Configuración

Para que la aplicación sea funcional es necesario contar con un los Sistemas de Información Geográfica de ESRI Colombia por medio de la plataforma ArcGis, de ahí se toman lo datos a mostrar

1. Cargar los distintos servicios desde ArcGis, con los datos que se quieren mostrar

    ```js
    //partidos ganadores
    PrecinctLayer: {
        Key: "precinctLayer",
        ServiceURL: "http://54.186.71.160:6080/arcgis/rest/services/Elecciones2014/ReferenceOverlay/MapServer/0",
        UseColor: true,
        Color: "",
        Alpha: 0.10,
        Query: "UPPER(elecciones.DBO.departamentos.NOMBRE) LIKE '%${0}%'",
        PrecinctName: "elecciones.DBO.departamentos.NOMBRE",
        County: "elecciones.DBO.departamentos.PAIS"
    },
    ```
2. Si desea personalizar la aplicación es necesario crear los diferentes servicios y modificarlos en la aplicación

## Implementación

- Se requiere que los servicios de Arcgis se encuentren habilitados y públicos
- Agregue el proyecto en el directorio destinado para las aplicaciones web de los distintos servidores

## Licenciamiento

Copyright 2014 Esri

Licenciado bajo la licencia Apache, Versión 2.0; usted no puede utilizar este archivo excepto en conformidad con la Licencia. Usted puede obtener una copia de la licencia en

http://www.apache.org/licenses/LICENSE-2.0

A menos que lo requiera la ley o se acuerde por escrito, el software distribuido bajo la licencia se distribuye "TAL CUAL", SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ya sea expresa o implícita. Consulte la licencia para los permisos específicos de gobierno de idiomas y limitaciones en la licencia. 

Una copia de la licencia está disponible en el archivo license.txt del repositorio.
