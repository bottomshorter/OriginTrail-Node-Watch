var axios = require('axios');

let nodeState = {
    // 1 entry per node
    // "nodeid" : { "offerid" : true, "offerid2" : true },
    // "nodeid2" : { "offerid" : true }
}


let debugOfferCounter = 100
function makeOfferRequest(nodeid) {
    return Promise.resolve(
        {
            "Offers":[
                {
                    "OfferId": "0x" + (debugOfferCounter++).toString(),
                    "FinalizedTimestamp":"2018-12-08T10:41:03",
                    "HoldingTimeInMinutes":6249,
                    "Paidout":false,
                    "TokenAmountPerHolder":111.0,
                    "EndTimestamp":"2018-12-12T18:50:03",
                    "Status":"Completed"
                }
            ]
        })
}

function OfferRequest(nodeid){
    
    return axios.get('https://api.othub.info/api/nodes/dataholders/' + nodeid)
        .then((httpResult) => httpResult["data"]);
    
        // .then(response => {
        //     //console.log(response.data);
        //     console.log(response.data.Identity);
        //     NodesWatched.push(response.data.Identity);
        //     console.log(NodesWatched);
        //     ctx.reply("You have sucessfully added node: " + response.data.Identity);
        // })
        // .catch(error => {
        //     console.log(error);
        //     ctx.reply('You did not enter a valid ERC725 Address. Please enter a valid one.');
        // });
}

// {"nodeid": "<nodeid>", "newoffers": ["newoffer1", ...]}
function returnNewOffersForNode(nodeid) {
    return makeOfferRequest(nodeid).then(
        (nodeDetails) => {
            let oldOffers = nodeState[nodeid] || {}
            let newOffers = {}
            //console.log(nodeDetails);
            nodeDetails["Offers"]
                .forEach((offer) => newOffers[offer["OfferId"]] = true)
            nodeState[nodeid] = newOffers // Update our tracking
            let trulyNewOffers = getNewerEntries(oldOffers, newOffers)
            return {
                "nodeid": nodeid,
                "newoffers": (trulyNewOffers.length > 0) ? trulyNewOffers : null
            }
        }
    )
    .catch(error => {
        console.log(error);
        return {
            "nodeid": nodeid,
            "newoffers": null
        }
        //ctx.reply('You did not enter a valid ERC725 Address. Please enter a valid one.');
    });
}

// returns { "nodeid": ["newoffer1", ...], "nodeid2" : ..., ...}
// (array of new entry)
function runBackgroundCheck(nodesToWatch, onNewEntry) {
    //console.log("Going to query for " + nodesToWatch.join(", "))
    //console.log("Ran the background check")
    Promise.all(nodesToWatch.map(returnNewOffersForNode)).then(
        (nodeResults) => {
            onNewEntry(
                nodeResults
                    .filter((offer) => offer["newoffers"] !== null)
                    .reduce((results, result) => {
                        results[result["nodeid"]] = result["newoffers"];
                        return results;
                    }, {})
            )
        }
    )
    return Promise.resolve()
}

// ["offer1","offer2",...]
function getNewerEntries(olde, newe) {
    let result = []
    for(let id in newe) {
        if (! (id in olde)) {
            result.push(id)
        }
    }
    return result;
}

module.exports = {
    runBackgroundCheck: runBackgroundCheck,

    // Export internal functions for testing.
    isSame: () => 0, // DELETE mE
    getNewerEntries:getNewerEntries
}
