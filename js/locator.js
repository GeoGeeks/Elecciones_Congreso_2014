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

var chartInfo = null;
//Locate an address or precinct
function LocateAddress() {
    var thisSearchTime = lastSearchTime = (new Date()).getTime();
    dojo.byId("imgSearchLoader").style.display = "block";
    if (dojo.byId("tdsearchAddress").className == "tdSearchByAddress") {
        RemoveScrollBar(dojo.byId('divAddressScrollContainer'));
        if (dojo.byId("txtAddress").value.trim() == '') {
            dojo.byId("imgSearchLoader").style.display = "none";
            RemoveChildren(dojo.byId('tblAddressResults'));
            CreateScrollbar(dojo.byId("divAddressScrollContainer"), dojo.byId("divAddressScrollContent"));
            if (dojo.byId("txtAddress").value != '') {
                alert(messages.getElementsByTagName("blankAddress")[0].childNodes[0].nodeValue);
            }
            return;
        }
        var address = [];

        address[locatorSettings.Locators[0].LocatorParamaters] = dojo.byId('txtAddress').value;
        locator.outSpatialReference = map.spatialReference;
        locator.addressToLocations(address, [locatorSettings.Locators[0].CandidateFields], function (candidates) {
            // Discard searches made obsolete by new typing from user
            if (thisSearchTime < lastSearchTime) {
                return;
            }
            ShowLocatedAddress(candidates);
        }, function (err) {
            dojo.byId("imgSearchLoader").style.display = "none";
        });
    }
    else {
        RemoveChildren(dojo.byId('tblAddressResults'));
        CreateScrollbar(dojo.byId("divAddressScrollContainer"), dojo.byId("divAddressScrollContent"));
        if (dojo.byId("txtAddress").value.trim() == '') {
            dojo.byId("imgSearchLoader").style.display = "none";
            RemoveChildren(dojo.byId('tblAddressResults'));
            if (dojo.byId('txtAddress').value != "") {
                alert(messages.getElementsByTagName("blankPrecinct")[0].childNodes[0].nodeValue);
                return;
            }
        }
        SearchPrecinctName(dojo.byId("txtAddress").value);
    }
}

//search desired precinct
function SearchPrecinctName(precinctName, carouselVisible) {
    var thisSearchTime = lastSearchTime = (new Date()).getTime();
    RemoveChildren(dojo.byId('tblAddressResults'));
    map.infoWindow.hide();
    selectedGraphic = null;
    var query = esri.tasks.Query();
    query.where = dojo.string.substitute(precinctLayer.Query, [dojo.string.trim(precinctName).toUpperCase()]);
    map.getLayer(precinctLayer.Key).queryFeatures(query, function (featureset) {
        if (dojo.byId("txtAddress").value != '') {
            // Discard searches made obsolete by new typing from user
            if (thisSearchTime < lastSearchTime) {
                return;
            }
            var featureSet = [];
            for (j in featureset.features) {
                featureSet.push({ name: featureset.features[j].attributes[precinctLayer.PrecinctName],
                    attributes: featureset.features[0].attributes,
                    polygon: featureset.features[j].geometry
                });
            }
            featureSet.sort(function (a, b) {
                var x = a.name;
                var y = b.name;
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            RemoveChildren(dojo.byId('tblAddressResults'));
            var table = dojo.byId("tblAddressResults");
            var tBody = document.createElement("tbody");
            table.appendChild(tBody);

            setTimeout(function () {
                if (featureSet.length == 0) {
                    dojo.byId("imgSearchLoader").style.display = "none";
                    var tr = document.createElement("tr");
                    tBody.appendChild(tr);
                    var td1 = document.createElement("td");
                    td1.className = 'bottomborder';
                    td1.innerHTML = messages.getElementsByTagName("noSearchResults")[0].childNodes[0].nodeValue;
                    tr.appendChild(td1);
                    dojo.byId("imgSearchLoader").style.display = "none";
                    return;
                }
                else if (featureSet.length == 1) {
                    dojo.byId("txtAddress").blur();
                    if (!carouselVisible) {
                        dojo.byId('txtAddress').setAttribute("defaultPrecinct", featureSet[0].attributes[precinctLayer.PrecinctName]);
                        dojo.byId("txtAddress").value = dojo.byId("txtAddress").getAttribute("defaultPrecinct");
                    }
                    var polygon = featureSet[0].polygon;
                    var mapPoint = polygon.getExtent().getCenter();
                    if (!polygon.contains(mapPoint)) {
                        mapPoint = polygon.getPoint(0, 0);
                    }
                    if (carouselVisible) {
                        FindPrecinctLayer(mapPoint, featureSet[0].attributes[precinctLayer.PrecinctName], true, carouselVisible);
                    }
                    else {
                        FindPrecinctLayer(mapPoint, featureSet[0].attributes[precinctLayer.PrecinctName], (!currentSelectedLayer) ? true : false);
                    }
                    HideAddressContainer();
                }
                else {
                    for (var i = 0; i < featureSet.length; i++) {
                        var tr = document.createElement("tr");
                        tBody.appendChild(tr);
                        var td1 = document.createElement("td");
                        td1.innerHTML = featureSet[i].name;
                        td1.setAttribute("index", i);
                        td1.className = 'bottomborder';
                        td1.style.cursor = "pointer";
                        td1.height = 20;
                        td1.onclick = function () {
                            HideAddressContainer();
                            dojo.byId('txtAddress').setAttribute("defaultPrecinct", this.innerHTML);
                            dojo.byId("txtAddress").value = dojo.byId("txtAddress").getAttribute("defaultPrecinct");
                            lastSearchString = dojo.byId("txtAddress").value.trim();
                            var polygon = featureSet[this.getAttribute("index")].polygon;
                            var mapPoint = polygon.getExtent().getCenter();
                            if (!polygon.contains(mapPoint)) {
                                mapPoint = polygon.getPoint(0, 0);
                            }
                            FindPrecinctLayer(mapPoint, this.innerHTML, (!currentSelectedLayer) ? true : false);
                        }
                        tr.appendChild(td1);
                    }
                    SetHeightAddressResults();
                }
                dojo.byId("imgSearchLoader").style.display = "none";

            }, 100);
        }
    }, function (err) {
        HideProgressIndicator();
    });
}

//search desired Address
function ShowLocatedAddress(candidates) {
    map.infoWindow.hide();
    selectedGraphic = null;
    RemoveChildren(dojo.byId('tblAddressResults'));
    CreateScrollbar(dojo.byId("divAddressScrollContainer"), dojo.byId("divAddressScrollContent"));
    var table = dojo.byId("tblAddressResults");
    var tBody = document.createElement("tbody");
    table.appendChild(tBody);
    if (candidates.length > 0) {
        var counter = 0;
        for (var i in candidates) {
            if (candidates[i].score > locatorSettings.Locators[0].AddressMatchScore) {
                if (candidates[i].score > locatorSettings.Locators[0].AddressMatchScore) {
                    for (var bMap = 0; bMap < baseMapLayers.length; bMap++) {
                        if (map.getLayer(baseMapLayers[bMap].Key).visible) {
                            var bmap = baseMapLayers[bMap].Key;
                        }
                    }
                    if (map.getLayer(bmap).fullExtent.contains(candidates[i].location)) {
                        for (j in locatorSettings.Locators[0].LocatorFieldValues) {
                            if (candidates[i].attributes[locatorSettings.Locators[0].LocatorFieldName] == locatorSettings.Locators[0].LocatorFieldValues[j]) {
                                counter++;
                                var candidate = candidates[i];
                                var tr = document.createElement("tr");
                                tBody.appendChild(tr);
                                var td1 = document.createElement("td");
                                td1.innerHTML = candidates[i].address;
                                td1.className = 'bottomborder';
                                td1.style.cursor = "pointer";
                                td1.height = 20;
                                td1.setAttribute("index", i);
                                td1.onclick = function () {
                                    HideAddressContainer();
                                    dojo.byId('txtAddress').setAttribute("defaultAddress", this.innerHTML);
                                    dojo.byId("txtAddress").value = dojo.byId("txtAddress").getAttribute("defaultAddress");
                                    lastSearchString = dojo.byId("txtAddress").value.trim();
                                    FindPrecinctLayer(candidates[this.getAttribute("index")].location, null, (!currentSelectedLayer) ? true : false);
                                }
                                tr.appendChild(td1);
                            }
                        }
                    }
                }
            }
        }
        //Display error message if there are no valid candidate addresses
        if (counter == 0) {
            var tr = document.createElement("tr");
            tBody.appendChild(tr);
            var td1 = document.createElement("td");
            td1.className = 'bottomborder';
            td1.innerHTML = messages.getElementsByTagName("noSearchResults")[0].childNodes[0].nodeValue;
            tr.appendChild(td1);
            dojo.byId("imgSearchLoader").style.display = "none";
            return;
        }
        dojo.byId("imgSearchLoader").style.display = "none";
        SetHeightAddressResults();
    }
    else {
        var tr = document.createElement("tr");
        tBody.appendChild(tr);
        var td1 = document.createElement("td");
        td1.className = 'bottomborder';
        td1.innerHTML = messages.getElementsByTagName("noSearchResults")[0].childNodes[0].nodeValue;
        tr.appendChild(td1);
        dojo.byId("imgSearchLoader").style.display = "none";
    }
}

//Add precinct layer
function FindPrecinctLayer(mapPoint, precintName, showBottomPanel, carouselVisible) {
    if (dojo.hasClass('divShareContainer', "showContainerHeight")) {
        dojo.replaceClass("divShareContainer", "hideContainerHeight", "showContainerHeight");
        dojo.byId('divShareContainer').style.height = '0px';
    }
    ShowProgressIndicator('map');
    var query = new esri.tasks.Query();

    if (precintName) {
        query.where = dojo.string.substitute(precinctLayer.Query, [precintName.toUpperCase()]);
    }
    else {
        query.geometry = mapPoint;
        query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_WITHIN;
    }

    map.getLayer(precinctLayer.Key).selectFeatures(query, esri.layers.FeatureLayer.SELECTION_ADD, function (features) {
        HideProgressIndicator();
        if (features.length > 0) {
            var selectedFeatures = map.getLayer(precinctLayer.Key).getSelectedFeatures();
            var removeOID = null;
            for (var i in selectedFeatures) {
                if (selectedFeatures[i].attributes[map.getLayer(precinctLayer.Key).objectIdField] != features[0].attributes[map.getLayer(precinctLayer.Key).objectIdField]) {
                    removeOID = selectedFeatures[i].attributes[map.getLayer(precinctLayer.Key).objectIdField];
                    break;
                }
            }
            if (removeOID) {
                map.getLayer(precinctLayer.Key)._unSelectFeatureIIf(removeOID, map.getLayer(precinctLayer.Key)._mode);
                map.getLayer(precinctLayer.Key)._mode._removeFeatureIIf(removeOID);
            }

            dojo.byId("spanAddress").innerHTML = "Nuevo Boletin " + features[0].attributes[precinctLayer.PrecinctName];

            if (!isMobileDevice) {
                leftOffsetCarosuel = 0;
                dojo.byId("divElectionResultsContent").style.left = "0px";
                ResetSlideControls();

                WipeInBottomPanel(features[0].attributes[precinctLayer.PrecinctName], null, showBottomPanel, carouselVisible);

                if (currentSelectedLayer && mapPoint) {
                    ShowInfoWindow(mapPoint, precintName, carouselVisible);
                }
                else {
                    if (!carouselVisible) {
                        map.setExtent(features[0].geometry.getExtent().expand(4));
                    }
                }
            }
            else {
                if (!mapPoint) {
                    var polygon = features[0].geometry;
                    mapPoint = polygon.getExtent().getCenter();
                    if (!polygon.contains(mapPoint)) {
                        mapPoint = polygon.getPoint(0, 0);
                    }
                }
                selectedGraphic = mapPoint;
                if (!carouselVisible) {
                    map.setExtent(GetMobileExtent(mapPoint, features[0].geometry.getExtent().expand(4)));
                }
                ShowDetails(mapPoint, features[0].attributes[precinctLayer.PrecinctName], features[0].attributes[precinctLayer.County]);
            }
        }
        else {
            dojo.byId("imgSearchLoader").style.display = "none";
            var tr = document.createElement("tr");
            tBody.appendChild(tr);
            var td1 = document.createElement("td");
            td1.className = 'bottomborder';
            td1.innerHTML = messages.getElementsByTagName("noSearchResults")[0].childNodes[0].nodeValue;
            tr.appendChild(td1);
            dojo.byId("imgSearchLoader").style.display = "none";
            return;
        }
    }, function (err) {
        HideProgressIndicator();
        dojo.byId("imgSearchLoader").style.display = "none";
        alert(messages.getElementsByTagName("unableToLocatePrecinct")[0].childNodes[0].nodeValue);
    });
}

//show pods with wipe-in animation
function WipeInBottomPanel(searchParameter, mapPoint, showBottomPanel, carouselVisible) {
    for (var index in electionResultData) {
        dojo.byId("div" + index).style.display = "block";
        FetchContestData(electionResultData[index], index, mapPoint, searchParameter, false, showBottomPanel, carouselVisible);
    }
}

//Fetch the data for pods
function FetchContestData(layer, index, mapPoint, searchParameter, isInfoWindow, showBottomPanel, carouselVisible) {
    var queryTask = new esri.tasks.QueryTask(layer.ServiceURL);
    ShowProgressIndicator(null);
    var query = new esri.tasks.Query();
    if (mapPoint) {
        query.geometry = mapPoint;
    }
    else {
        query.where = electionResultDataQuery + "='" + searchParameter + "'";
    }
    query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_WITHIN;
    query.outFields = ["*"];
    queryTask.execute(query, function (features) {

        HideProgressIndicator();
        if (isMobileDevice) {
            var chartDiv = document.createElement("div");
            chartDiv.id = "chartDiv";
            var table = document.createElement("table");
            table.style.marginTop = "5px";
            table.style.width = "100%";
            var tbody = document.createElement("tbody");
            table.appendChild(tbody);
            var tr = document.createElement("tr");
            tbody.appendChild(tr);
            var td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = layer.Title;
            td.align = "left";
            td.style.fontWeight = "bold";
            td.style.paddingLeft = "10px";
            dojo.byId('divRepresentativeScrollContent').appendChild(table);
            dojo.byId('divRepresentativeScrollContent').appendChild(chartDiv);
        }
        else {
            RemoveChildren(dojo.byId('div' + index + 'content'));
            var chartDiv = document.createElement("div");
            chartDiv.className = "divChartStyle";
            dojo.byId('div' + index + 'content').appendChild(chartDiv);
        }
        if (features.features.length > 0) {
            PopulateChartData(layer.ChartType, layer.ChartData, layer.PartyDetails, chartDiv, features, layer.CandidateNames, layer.TotalBallots,layer.Title);
            if (isMobileDevice) {
                chartInfo = {};
                chartInfo.ChartType = layer.ChartType;
                chartInfo.ChartData = layer.ChartData;
                chartInfo.PartyDetails = layer.PartyDetails;
                chartInfo.features = features;
                chartInfo.CandidateNames = layer.CandidateNames;
                chartInfo.WinningParty = layer.WinningParty
                chartInfo.TotalBallots = layer.TotalBallots;
                SetHeightRepresentativeResults();
            }
        }
        else {
            if (isInfoWindow) {
                var table = document.createElement("table");
                table.style.width = "100%";
                table.style.height = "100%";
                var tbody = document.createElement("tbody");
                table.appendChild(tbody);
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                var td = document.createElement("td");
                td.align = "center";
                td.innerHTML = "Data Unavailable";
                td.style.fontColor = "#ffffff"
                tr.appendChild(td);
                chartDiv.appendChild(table);
            }
            else {
                dojo.byId("div" + index).style.display = "none";
            }
        }
        if (showBottomPanel) {
            if (!isMobileDevice) {
                setTimeout(function () {
                    dojo.byId("imgToggle").src = "images/down.png";
                    dojo.byId("imgToggle").style.cursor = "pointer";
                    dojo.byId("imgToggle").setAttribute("state", "maximized");
                    dojo.byId("esriLogo").style.bottom = "250px";
                    dojo.byId("divBottomPanelHeader").style.visibility = "visible";
                    dojo.byId("divBottomPanelHeader").style.bottom = "250px";
                    dojo.replaceClass("divBottomPanelHeader", "showHeaderContainer", "hideHeaderContainer");
                    dojo.byId('divBottomPanelBody').style.height = "250px";
                    dojo.replaceClass("divBottomPanelBody", "showBottomContainer", "hideBottomContainer");
                    if (carouselVisible && currentSelectedLayer) {
                        dojo.addClass(dojo.byId('div' + currentSelectedLayer), "border");
                        if (dojo.byId('div' + currentSelectedLayer).style.display == "block") {
                            var hiddenContests = 0;
                            for (var index in electionResultData) {
                                if (index == currentSelectedLayer)
                                    break;
                                if (dojo.byId('div' + index).style.display == "none") {
                                    hiddenContests++;
                                }
                            }
                            var position = Number(dojo.byId("tdContest" + index).getAttribute("position")) - hiddenContests;
                            SlideLeft((position * infoBoxWidth) + (position * 4));
                        }
                        carouselVisible = false;
                    }
                }, 500);
            }
        }
    });
}

//Sort according to value
function SortResultFeatures(a, b) {
    var x = a.y;
    var y = b.y;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

//Fetch data for charts
function PopulateChartData(chartType, chartData, partyDetails, chartDiv, features, candidateNames, totalBallots, title) {
    if (isMobileDevice) {
        chartDiv.style.width = screen.width;
        chartDiv.style.height = "190px";
    }
    switch (chartType) {
        case "barchart":
            jsonValues = [];
            myLabelSeriesarray = [];
            myParallelLabelSeriesarray = [];
            var party;
            var ballots = features.features[0].attributes[totalBallots];
            var totalBallots = 0;
            //for (var i in chartData) {
               // totalBallots += features.features[0].attributes[chartData[i]];
               totalBallots = ballots;
            //}

            /*for (var i = 0; i < 8; i++) {
                int min = i;

                for (var j = 0; i < 8; j++) {
                    if((features.features[0].attributes[chartData[i]]) < (features.features[0].attributes[chartData[min]])){

                        min=j;
                    }
                }
                if (i != min) {
                    int aux = features.features[0].attributes[chartData[i]];
                    (features.features[0].attributes[chartData[i]])=(features.features[0].attributes[chartData[min]]);
                    (features.features[0].attributes[chartData[min]]) = aux;

                }
            }*/
            for (var i in chartData) {
				if(features.features[0].attributes[chartData[i]] != null){
					var votes = parseFloat(features.features[0].attributes[chartData[i]]);
					var candidateName = features.features[0].attributes[candidateNames[i]];
					//ACA SE ESCRIBE EL PORCENTAJE DE LAS BARRAS
					//var percentVote = ((votes / totalBallots) * 100).toFixed(0) + "%";
					votes = parseFloat(votes);
					var percentVote = (votes.toFixed(2)+"%");
					if (candidateName && candidateName != "") {
						var jsonItem = {};
						jsonItem.label = candidateName;
						jsonItem.parallelLabel = percentVote;
						//ACA SE PINTAN LAS BARRAS
						//jsonItem.y = Number(((votes / totalBallots) * 100).toFixed(0));
						jsonItem.y = Number((votes*1).toFixed(2));

						jsonItem.party = (features.features[0].attributes[partyDetails[i]]);
						var fillColor = (partyDetails) ? colorCodeOfParties[jsonItem.party] : null;
						fillColor = (fillColor) ? fillColor.Color : colorCodeOfParties["Others"].Color;
						jsonItem.fill = fillColor;
						jsonItem.stroke = "";
						jsonValues.push(jsonItem);
					}
				}
            }

            jsonValues.sort(SortResultFeatures);
            if("Senado Nacional "==title)
                jsonValues = jsonValues.slice(jsonValues.length-10,jsonValues.length-5);
            else
                jsonValues = jsonValues.slice(jsonValues.length-5,jsonValues.length);

            for (var i in jsonValues) {
                var labelItem = {};
                labelItem.value = Number(i) + 1;
                labelItem.text = "<img/src='images/Partidos/"+(jsonValues[i].label).replace(/ /g,"%20")+".png'/width='63'/height='21'>"
               // alert((jsonValues[i].label).replace(" ","%20"));
                //labelItem.text = jsonValues[i].label;//Se imprime el nombre del partido
               // labelItem.text += ('<img src="images/Partidos/Alianza_verde_00205.png" title="Imagen" />');
                myLabelSeriesarray.push(labelItem);
                party = jsonValues[i].party;
            }

            for (var i in jsonValues) {
                var parallelLabelItem = {};
                parallelLabelItem.value = Number(i) + 1;
                parallelLabelItem.text = jsonValues[i].parallelLabel;
                myParallelLabelSeriesarray.push(parallelLabelItem);
            }

            ShowBarChart(jsonValues, chartDiv, myLabelSeriesarray, myParallelLabelSeriesarray, party, ballots, title);
            break;
        case "piechart":
           /* var jsonValues = [];
            var percentVoted = Number((features.features[0].attributes[chartData[0]] * 100).toFixed(0));
            var nonVoters = 100 - percentVoted;
            */


            var jsonValues = [];
            //var total = Number(features.features[0].attributes[chartData[1]]*100);

            //Proporcion de Votos en Blanco Departamental
            //var percentVoted =parseFloat(features.features[0].attributes[chartData[0]]);
            var percentVoted =parseFloat(features.features[0].attributes[chartData[0]]).toFixed(0);
			var votosTotal = features.features[0].attributes[chartData[1]];
			var votosVar = features.features[0].attributes[chartData[2]];
           // alert(features.features[0].attributes[chartData[0]]);
            var nonVoters = 100 - percentVoted;


            /*percentVoted = Number((features.features[0].attributes[chartData[0]] * 100).toFixed(0));
            var nonVoters = 100 - percentVoted;*/

            var jsonItemVoted = {};
            jsonItemVoted.y = percentVoted;
            jsonItemVoted.stroke = "#000000";
            if(title == "Proporción de Votos en Blanco Senado Nacional" || title ==  "Proporción de Votos en Blanco Cámara R. Nacional")
                jsonItemVoted.text = "Votos en Blanco: " + percentVoted + "% ("+votosVar+")";
            else
                jsonItemVoted.text = "Votos Realizados: " + percentVoted + "% ("+votosTotal+")";////////////////////////////////////////////////////////////----------
            jsonItemVoted.color = votedColor;
            jsonValues.push(jsonItemVoted);

            var jsonItemNonVoted = {};
            jsonItemNonVoted.y = nonVoters;
            jsonItemNonVoted.stroke = "#000000";
            if(title == "Proporción de Votos en Blanco Senado Nacional" || title ==  "Proporción de Votos en Blanco Cámara R. Nacional")
                jsonItemNonVoted.text = "Votos Realizados: " + nonVoters + "% ("+votosTotal+")";////////////////////////////////////////////////////////////----------
            else
                jsonItemNonVoted.text = "Posibles Votantes: " + nonVoters + "% ("+votosVar+")";////////////////////////////////////////////////////////////----------
            jsonItemNonVoted.color = didNotVoteColor;
            jsonValues.push(jsonItemNonVoted);

            ShowPieChart(jsonValues, chartDiv);
            break;
    }
}
