//Web3 = require('web3');
//web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.91.175:8545"));
//abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
//VotingContract = web3.eth.contract(abi);
// Colocar o numero de contrato a cada novo processo
//if (typeof web3 !== 'undefined') { console.log('web3 undefined')}
var abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "candidate",
				"type": "bytes32"
			}
		],
		"name": "totalVotesFor",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "candidate",
				"type": "bytes32"
			}
		],
		"name": "validCandidate",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "votesReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidateList",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "candidate",
				"type": "bytes32"
			}
		],
		"name": "voteForCandidate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "candidateNames",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]
var contractAdress = '0xc8193239a4cd1225fd7630d68e22cbe3d2ed606a';
var myAbi = web3.eth.contract(abi)
var myFunction = myAbi.at(contractAdress)
candidates = {"Germano": "candidato-1", "Carla": "candidato-2", "Jose": "candidato-3"}

function voteForCandidate() {
  /*candidateName = $("#candidate").val();
  contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });*/    // THIS IS THE OLD WAY, CONNECTING TO GANACHE-CLI

  candidateName = $("#candidate").val();
  var candidateBytes32 = getBytes32(candidateName);
  console.log('votando no candidato ' + candidateName + ' com endereco '+ candidateBytes32);
  myFunction.voteForCandidate(candidateBytes32, {from: web3.eth.accounts[0], gas: 4000000}, function(err,
    result){
      let div_id = candidates[candidateName];
      //$("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
      updateCandidate(candidateBytes32, div_id)
      if(err){console.log(err);}
      else{console.log(result);}
    })
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    
    let name = candidateNames[i];
    var candidateBytes32 = getBytes32(name);
    updateCandidate(candidateBytes32, candidates[name]); //endereco e o id
  }
});

function updateCandidate(candidateBytes32, htmlID){ //endereco e o id
  myFunction.totalVotesFor.call(candidateBytes32,function(err, result){
    if(err){console.log(err)}
    else{
      $('#' + htmlID).html(result.toString());
      console.log('colocando o valor ' + result.toString() + ' no '+ htmlID)
    }
  })
}

function getBytes32(name){
  var candidateBytes32;
  if(name === 'Germano') candidateBytes32 = '0x63616e6469646174653100000000000000000000000000000000000000000000'
  else if(name === 'Carla') candidateBytes32 = '0x6332000000000000000000000000000000000000000000000000000000000000'
  else if (name === 'Jose') candidateBytes32 = '0x6333000000000000000000000000000000000000000000000000000000000000'
  return candidateBytes32;
}