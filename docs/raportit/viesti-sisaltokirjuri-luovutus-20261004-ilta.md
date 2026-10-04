# Sisältökirjurin tila 4.10.2026 klo ~22 (Sonnet 5, high)

Omistajan "lisätään niitä vain" -tilaus jatkuu: astronautin kameran eurooppalaisten
kohteiden laajennus kohti ~100 uutta kohdetta. Päätoimittajan ohje 4.10.: vähintään
15 kohdetta per PR, koska jokainen PR maksaa junassa saman verran. Yötauko klo 23
alkaen (sovittu Päätoimittajan kanssa); jatketaan aamulla.

## 1. Tila: neljä erää, kolme mainissa

| Erä | Kohteita | PR | Tila |
|---|---|---|---|
| 1 | 6 | #3954 | mainissa (v2608) |
| 2+3 | 16 (yhdistetty) | #3957 | mainissa (v2611) |
| 4 | 15 | #3966 | **auki**, Julkaisijan junaa odottamassa |

Kokonaismäärä mainissa nyt 211 kohdetta (189 + 6 + 16; #3966 tuo vielä 15 lisää
kun mergetään). Worktree `wt/sisaltokirjuri-satelliitti-eurooppa-era1` (erät 2–3)
poistettu mergen jälkeen. `wt/sisaltokirjuri-satelliitti-eurooppa-era4` jäljellä,
odottaa #3966:n mergeä — poista sen jälkeen `tools/uusi-worktree.sh --poista
sisaltokirjuri-satelliitti-eurooppa-era4`.

## 2. Löydetty ja korjattu bugi: Gateway-reititys vs. vanhat STS-tunnukset

Pelikoodarin uusi Gateway-haku (#3960, #3961) tunnistaa `gatewayTunnus()`-säännöllä
myös vanhoja, jo ennestään images-api.nasa.gov:ssa toimivia STS-tunnuksia (esim.
`STS062-85-021`), koska niiden muoto täsmää sääntöön. Niiden Gateway-kuvasivu ei
kuitenkaan aukea (etunollaton tiedostonimi Gatewayssä — Pelikoodari löysi juurisyyn).
Korjasin `hae-satelliittihavainnot.mjs`:n `haeKuva()`-funktioon varmistuksen: jos
Gateway-haku epäonnistuu, kokeillaan vielä images-apia ennen kuin kohde hylätään.
Tehty sekä #3957:ään että #3966:een (molemmat tarvitsivat saman korjauksen erikseen,
koska branchasivat eri main-tiloista). **Pelikoodari tekee oikean korjauksen
`gatewayTunnus()`-sääntöön omana PR:nään** kun #3966 on mainissa — sen jälkeen
fallback voi jäädä talteen varmistukseksi, ei tarvitse poistaa.

## 3. Avoimet/tyhjät kierrokset (älä yritä uudelleen samoin hauin)

- **Norjan vuonot, Itämeren/Pohjolan saaristo, Islanti**: ei käyttökelpoista ISS-
  kuvaa images-api.nasa.gov:ssa (tarkistettu laajasti, ks. #3966:n kuvaus). Gatewayn
  raakakatalogissa on kuvia, mutta ei vielä kokeiltu Gateway-haulla — kannattaa
  yrittää uudelleen kun Pelikoodarin `gatewayTunnus()`-korjaus on mainissa.
- **Sierra Nevada / Granada** (`iss012e11144`): hyvä, vahvistettu kohde, mutta
  kuvassa on vanha NASA-tunnuspalkki. Vaatii rajauksen (`astro-palkki.mjs rajaa`)
  ja uuden version viennin ämpäriin + `KUVAPOIKKEUKSET`-merkinnän — en ehtinyt
  tätä työnkulkua tällä kierroksella. Hyvä ensimmäinen kohde seuraavalle erälle.
- **Split, Eoliansaaret**: samat, tunnuspalkilliset, jäivät #3966:sta pois samasta
  syystä. Kuva-URL:t ja kuvaukset löytyvät #3966:n PR-kuvauksesta.

## 4. Pelikoodarin ehdokasarkit valmiina seuraavaan erään

`/Users/Shared/Claude/proto-3d/lokit/astro-ehdokkaat/2026-10-04/` — 38 Euroopan
pelikaupunkia ilman satelliittikohdetta, 291 ehdokasta. Käytetty tästä erästä:
odessa, praha, marseille, sarajevo, bryssel, dubrovnik, varsova (+ sivusta
kiova/kreeta/sofia/dublin, jotka olivat jo lisättyjä aiemmista eristä — arkki oli
tehty ennen niiden mergeä, joten samat kaupungit toistuvat, ei duplikaattiriskiä
jos tarkistaa aina ensin `grep tunnus`).

**Pikasilmäys tehty, EI vielä kuvatarkistettu — hyviä lupaavia ehdokkaita:**
- **Berliini**: `ISS016-E-18797` (Central Berlin, Spree-joki, Tegel-järvi, päivä)
- **Valletta** (Malta, eri kohde kuin nykyinen `malta-sisilia`-kaukokuva): `ISS008-E-14282`
- **Amsterdam**: `ISS023-E-48029` (Astel-joki, Markermeer, päivä)
- **Riika**: useita vaihtoehtoja, mm. `ISS006-E-45886` (Gulf of Riga, jää) ja
  vanhempia STS-kuvia
- **Firenze (Florence)**: aiemmat 3 ehdokasta osoittautuivat hurrikaanikuviksi
  (virheellinen paikkaosuma) — arkissa on kuitenkin MYÖS yö-sarja 2015:ltä
  (`ISS043-E-121711` ym.), jota ei vielä tarkistettu
- **Alpit**: `ISS040-E-16849` (Luzern, Sveitsin Alpit, Vierwaldstättersee) ja
  `ISS023-E-11086` (Thun/Brienzin järvet) — eri kohde kuin nykyinen `chevril-jarvi`
- **Madrid**: useita ehdokkaita, mutta tarkista huolella `iberia-yolla`-kohteen
  lat/lon-läheisyys ennen lisäystä (erässä 2 Madrid jätettiin pois juuri tästä syystä)

Kaikki yllä olevat vaativat vielä: kuvan lataus+silmämääräinen tarkistus,
astro-palkki.mjs-tarkistus, duplikaattitarkistus (lat/lon JA nasa_id koko
KOHTEET-listaa vasten) ennen lisäystä.

## 5. Muuta

- Pelikoodarin ehdokkaat.mjs-työkalu (`node tools/astronaut/ehdokkaat.mjs --kohteet
  valinnat.json`) tuottaa valmiin KOHTEET-lohkon valinnoista — nopeuttaa seuraavaa
  erää huomattavasti, kannattaa käyttää käsin etsimisen sijaan jos arkit riittävät.
- qa-era-numerointi: käytetty qa-era9, qa-era10 (haarassa joka nyt on mainissa) ja
  qa-era11 (#3966:ssa). Seuraava vapaa numero mainista tarkistettuna: `ls
  tools/astronaut/qa-era*.json | sort -V | tail -1`.
