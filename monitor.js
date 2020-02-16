// OT Monitor Data and post updates to Telegram
var axios = require('axios');


	class Monitor{
		
		
		constructor(bot, NodesWatched){
			this.init = false;
			this.NodesWatched = NodesWatched;
			this.telegram = bot;
			this.offerdata = [];
			this.run();
		}
		
		
		run(){
			var self = this;
			this.getOffers();	
			setTimeout(function(){ self.run(); }, 20000);
		}
		
		
		getOffers(){
			
			axios.get('https://othub-api.origin-trail.network/api/globalactivity?pageLength=50&start=0&searchText=&filters=New%20Offer')
			.then( (response) => {
				
				var newOffers = 0;
				let r = response.data.data;
				for(let i = 0; i < r.length; i++){
				
					 var checkOffer = this.addOffer(r[i]);
					 
					 if(checkOffer == true){
						 newOffers++;
					 }
					 
				 }
				
				if(newOffers > 0){
					for(let i = 0; i < this.NodesWatched.length; i++){
						let chat_id = this.NodesWatched[i].chat_id;
						if(i == 0 && this.init == true){ // Need to pool the node_id's to prevent multiple sending of same info
							this.telegram.telegram.sendMessage(chat_id,
							  newOffers + " new offers have been added to the ODN."
							);
						}
						break; 
					}	
				}
				
				this.init = true;
				
			})
			.catch(error => {
				console.log(error);
			});
			
		}
		
		addOffer(offerData){
			
			var newOffer = true;
			
			for(let i = 0; i < this.offerdata; i++){
				if(this.offerdata[i].TransactionHash == offerData.TransactionHash){
					newOffer = false;
					break;
				}
			}
			
			this.offerdata.push( offerData );
			
			return newOffer;
		}
	}
				  
	// Export Module
	module.exports = Monitor;
	