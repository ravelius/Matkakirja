# Salin penkki ja kaappi — toimitus 954–955

Kaksi Tripo-mallia tilatuissa mitoissa, tekniset tarkistukset tehty. Kaappi on tuottajan tarkistama ehdokas. Penkissä on selvä koristeverkon ulkoasupoikkeama: tämä paketti EI tarkoita penkin hyväksyntää. PT/Lavastaja ratkaisee käyttökelpoisuuden pelin kamerasta ennen käyttöönottoa.

| Malli | Leveys × syvyys × korkeus | Kolmiot | PBR-kartat |
|---|---|---:|---|
| salin-penkki | 1,60 × 0,45 × 0,50 m | 2380 | 1024 × 1024 |
| salin-kaappi | 0,90 × 0,45 × 1,20 m | 2058 | 1024 × 1024 |

Mallit: `mallit/`. GLB:t sisältävät PBR-kartat; samat kartat ovat erillisinä `tekstuurit/`-kansiossa. +Y ylös, +Z eteen (ovien/istuimen puoli), pivot pohjan keskellä y=0, metrit, root scale 1. Ei alfa-aukkoja, riggausta eikä animaatioita. Efektiivisen karheuden minimi 77/255 eli noin 0,302. Yksi materiaali ja yksi primitive per malli. Mitat on paistettu verkkoon akselikohtaisesti, normaalit korjattu; lähteet säilyvät työjuuren raw/ ja sources/ -kansioissa.

## Ulkoasuhavainnot

**Penkki:** Tripo ei säilyttänyt ohutta ristikkoverkkoa ehjänä. Keskellä on liian iso epäsäännöllinen aukko, takana helman alareuna on epätasainen ja sivujen kukkaverkko on yksinkertaistunut. Katso neljän suunnan arkki. Ei hyväksyttyä ulkoasua, ei väitettä identtisyydestä. Arvioikaa ensin havainne/pelikuva-parilla, näkyykö vika käytetyllä etäisyydellä. Ei automaattista uusintaa tai paikallista koristeiden mallinnusta.

**Kaappi:** kaksi paneeliovea, messinkivetimet ja saranalevyt, sivupaneelit, umpinainen takaosa ja tyhjä kansi näkyvät. Vetimissä on epäsymmetriaa ja jalkojen pohjissa pientä rosoisuutta; staattista esinettä ei viimeistelty lähikuvan tasolle. Tarkistakaa pelivalossa puun ja messingin vaste sekä lattiaosuma.

Esikatselut ovat oikeista toimitus-GLB:istä laskettuja tasavaloisia perusvärinäkymiä harmaalla taustalla, eivät pelin kuvia eivätkä PBR-valotuksen lopullinen arvio. Tekninen QA ja kuvien katselu on kirjattu `qa/`-kansioon.

## Vastaanotto

Lavastaja ajaa `node tools/codex-3d-tarkistus.mjs <delivery-v1>`, sijoittaa sopivat mallit tilauksen mukaisesti seinien/pylväsvälien kohdalle, kokoaa avoimet-v37:n ja toimittaa havainne/pelikuva-parin PT:lle. PLACEMENTS-tiedostoa ei ole eikä tätä tilausta varten tarvita. Penkin poikkeama on arvioitava ennen pelikäyttöön hyväksyntää. PT:n hyväksyntää, vastaanottajan kuittausta, peli-integraatiota tai julkaisua ei ole vielä varmennettu.

Kustannus: kaksi kertaluontoista Tripo-ottoa, 90 krediittiä yhteensä; saldo 18845. Ei uusintoja. Katso `LAHTEET.md` ja `MANIFEST.json`.
