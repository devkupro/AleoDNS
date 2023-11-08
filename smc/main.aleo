import credits.aleo;

program dns_esollabs_v5.aleo;

struct Domain:
    domain_name as u128;
    owner_domain as address;
    exists as boolean;

struct PrimaryDns:
    primary_dns as u128;

struct MarketPalace:
    owner_market as address;
    dns_listing as Domain;
    dns_name as u128;
    price as u64;

mapping name_server:
    key as u128.public;
    value as Domain.public;

mapping ownerdns:
    key as address.public;
    value as PrimaryDns.public;

mapping market_place:
    key as u128.public;
    value as MarketPalace.public;

function primary_dns:
    input r0 as u128.public;
    assert.eq self.caller aleo1a35mcz80h0nnxhynxu2gupdrs6dcnqvfmeazrx9am3fpwmsx3ggqx36lmj ;
    cast r0 into r1 as PrimaryDns;
    async primary_dns r0 self.caller r1 into r2;
    output r2 as dns_esollabs_v5.aleo/primary_dns.future;

finalize primary_dns:
    input r0 as u128.public;
    input r1 as address.public;
    input r2 as PrimaryDns.public;
    contains ownerdns[r1] into r3;
    assert.eq r3 false ;
    set r2 into ownerdns[r1];

function changeprimarydns:
    input r0 as u128.public;
    assert.eq self.caller aleo1a35mcz80h0nnxhynxu2gupdrs6dcnqvfmeazrx9am3fpwmsx3ggqx36lmj ;
    async changeprimarydns r0 self.caller into r1;
    output r1 as dns_esollabs_v5.aleo/changeprimarydns.future;

finalize changeprimarydns:
    input r0 as u128.public;
    input r1 as address.public;
    contains ownerdns[r1] into r2;
    assert.eq r2 true ;
    cast r0 into r3 as PrimaryDns;
    remove ownerdns[r1];
    set r3 into ownerdns[r1];

function mint_domain:
    input r0 as u128.public;
    call credits.aleo/transfer_public aleo1a35mcz80h0nnxhynxu2gupdrs6dcnqvfmeazrx9am3fpwmsx3ggqx36lmj 2000000u64 into r1;
    cast r0 self.caller true into r2 as Domain;
    async mint_domain r1 r0 r2 into r3;
    output r3 as dns_esollabs_v5.aleo/mint_domain.future;

finalize mint_domain:
    input r0 as credits.aleo/transfer_public.future;
    input r1 as u128.public;
    input r2 as Domain.public;
    await r0;
    contains name_server[r1] into r3;
    assert.eq r3 false ;
    set r2 into name_server[r1];
    set r2 into name_server[r1];

function transfer_dns:
    input r0 as u128.public;
    input r1 as address.public;
    async transfer_dns self.caller r0 r1 into r2;
    output r2 as dns_esollabs_v5.aleo/transfer_dns.future;

finalize transfer_dns:
    input r0 as address.public;
    input r1 as u128.public;
    input r2 as address.public;
    contains name_server[r1] into r3;
    assert.eq r3 true ;
    get name_server[r1] into r4;
    assert.eq r4.owner_domain r0 ;
    remove name_server[r1];
    cast r1 r2 true into r5 as Domain;
    set r5 into name_server[r1];
    contains market_place[r1] into r6;
    is.eq r6 true into r7;
    remove market_place[r1];

function listing_dns:
    input r0 as u128.public;
    input r1 as u64.public;
    async listing_dns self.caller r0 r1 into r2;
    output r2 as dns_esollabs_v5.aleo/listing_dns.future;

finalize listing_dns:
    input r0 as address.public;
    input r1 as u128.public;
    input r2 as u64.public;
    contains name_server[r1] into r3;
    assert.eq r3 true ;
    get name_server[r1] into r4;
    assert.eq r4.owner_domain r0 ;
    contains market_place[r1] into r5;
    assert.eq r5 false ;
    get name_server[r1] into r6;
    cast r0 r6 r1 r2 into r7 as MarketPalace;
    set r7 into market_place[r1];

function transfer_dns_on_market:
    input r0 as u128.public;
    input r1 as address.public;
    input r2 as u64.public;
    call credits.aleo/transfer_public aleo1a35mcz80h0nnxhynxu2gupdrs6dcnqvfmeazrx9am3fpwmsx3ggqx36lmj 1000000u64 into r3;
    call credits.aleo/transfer_public r1 r2 into r4;
    async transfer_dns_on_market r3 r4 self.caller r0 r2 into r5;
    output r5 as dns_esollabs_v5.aleo/transfer_dns_on_market.future;

finalize transfer_dns_on_market:
    input r0 as credits.aleo/transfer_public.future;
    input r1 as credits.aleo/transfer_public.future;
    input r2 as address.public;
    input r3 as u128.public;
    input r4 as u64.public;
    await r0;
    await r1;
    contains name_server[r3] into r5;
    assert.eq r5 true ;
    contains market_place[r3] into r6;
    assert.eq r6 true ;
    remove market_place[r3];
    remove name_server[r3];
    cast r3 r2 true into r7 as Domain;
    set r7 into name_server[r3];

function burn_dns:
    input r0 as u128.public;
    async burn_dns self.caller r0 into r1;
    output r1 as dns_esollabs_v5.aleo/burn_dns.future;

finalize burn_dns:
    input r0 as address.public;
    input r1 as u128.public;
    contains name_server[r1] into r2;
    assert.eq r2 true ;
    get name_server[r1] into r3;
    assert.eq r3.owner_domain r0 ;
    contains market_place[r1] into r4;
    is.eq r4 true into r5;
    remove market_place[r1];
    remove name_server[r1];
