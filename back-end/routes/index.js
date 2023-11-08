const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res, next) => {
  let data = await getKeyMintDomain();
  //console.log(data);
  let resultNameServer = [];
  for (id of data) {
    let check = await name123(id, "name_server")
    if(check){
      resultNameServer.push(check)
    }
  }

  res.send({
    message: "success",
    data: resultNameServer,
  });
});

router.get("/marketplace", async (req, res, next) => {
  let data = await getKeyMintDomain();
  let resultMarketplace = [];
  for (id of data) {
    let check = await name123(id, "market_place");
    if (check) {
      resultMarketplace.push(check);
    }
  }

  res.send({
    message: "success",
    data: resultMarketplace,
  });
});

async function name123(key, mapping) {
  const url = `https://aleo123.io/api/v4/aleo/programs/program/dns_esollabs_v5.aleo/mapping/${mapping}/${key}`
  const mappingData = await axios.get(
    url
  );
  if (mapping == "name_server") {
    //console.log(mappingData.data);
    let check = await formatNameServer(mappingData.data);
    if (check) {
      return check;
    }
  } else {
    let check = await formatMarketplace(mappingData.data);
    if (check) {
      return check;
    }
  }
}

// 
async function getKeyMintDomain() {
  let data = await axios.get(
    `https://aleo123.io/api/v4/aleo/transactions/transition?program=dns_esollabs_v5.aleo&page=0&page_size=10000000`
  );
  data = data.data.transitions;
  let txid = [];
  data.forEach((tx) => {
    txid.push(tx.transaction);
  });
  let key = [];
  for (id of txid) {
    const aleo123 = await axios.get(
      `https://aleo123.io/api/v4/aleo/transactions/transaction/${id}`
    );
    if (aleo123.data.transaction.transaction_status !== "rejected") {
      let acceptedTX = aleo123.data.transaction.execution.transitions;
      for (data of acceptedTX) {
        if (data.function === "mint_domain") {
          console.log(data.inputs[0].value);
          key.push(data.inputs[0].value);
        }
      }
    }
  }
  return key;
}

async function formatNameServer(data) {
  if (data != null) {
    const domainNameRegex = /domain_name:\s*([^,\n]+)/;
    const ownerDomainRegex = /owner_domain:\s*([^,\n]+)/;

    const domainNameMatch = data.match(domainNameRegex);
    const ownerDomainMatch = data.match(ownerDomainRegex);

    const domainName = domainNameMatch ? domainNameMatch[1] : null;
    const ownerDomain = ownerDomainMatch ? ownerDomainMatch[1] : null;

    return {
      domain_name: domainName,
      owner_domain: ownerDomain,
    };
  } else {
    return false;
  }
}

async function formatPrimaryServer(data) {
  const primaryNameRegex = /primary_dns:\s*([^,\n]+)/;

  const primaryNameMatch = data.match(primaryNameRegex);

  const primaryName = primaryNameMatch ? primaryNameMatch[1] : null;

  return {
    primary_dns: primaryName.slice(0, -1),
  };
}

async function formatMarketplace(data) {
  if (data != null) {
    // regex
    const ownerDomainRegex = /owner_market:\s*([^,\n]+)/;
    const dnsNameRegex = /dns_name:\s*([^,\n]+)/;
    const priceRegex = /price:\s*([^,\n]+)/;

    // match
    const ownerMarketMatch = data.match(ownerDomainRegex);
    const dnsNameMatch = data.match(dnsNameRegex);
    const priceMatch = data.match(priceRegex);

    // data
    const ownerDomain = ownerMarketMatch ? ownerMarketMatch[1] : null;
    const dnsName = dnsNameMatch ? dnsNameMatch[1] : null;
    let price = priceMatch ? priceMatch[1] : null;
    price = price.slice(0, -1);
    price = price.split("u");
    return {
      owner_domain: ownerDomain,
      dns_name: dnsName,
      price: parseInt(price[0]),
    };
  } else {
    return false;
  }
}
module.exports = router;
