# Bastiljin otsikon leikkaus (bastilji/v2) ja äänitysjonon avaimet (L5-7)

KK:n päätös 20.11.2026 klo 08.40 (omistaja 20.11. klo 08.10 ja toteutuslupa 08.16, P-261120-2 ja -3: lukija lukee vain leipätekstin). Ei uutta generointia.

## 1. Bastilji v2

| | ENNEN (v1) | NYT (v2) |
|---|---|---|
| tiedosto | `kertoja-1-otsikko-jakso2.mp3` | sama nimi, kansio `aanet/bastilji/v2/` |
| kesto | 28,64 s | 21,55 s (−7,09 s = otsikon kesto) |
| ensimmäinen sana | "Bastilji" (otsikko: "Bastilji tuhatseitsemänsataakahdeksankymmentäyhdeksän — linna, joka jaettiin kivinä.") | "Bastilji" (leipätekstin ensimmäinen virke: "Bastilji rakennettiin 1300-luvun lopulla …") 0,722 s kohdalla |
| sanoja `.sanat.json`:ssa | 38 | 31 (otsikon 7 sanaa pois, ajat nollattu uuteen alkuun) |
| keskitaso | −17,9 LUFS, huippu −2,3 dBFS | −17,9 LUFS, huippu −2,2 dBFS (muut jaksot −18,0) |

**Leikkaus.** Lähde on v1:n raaka PCM-master (T7, `bastilji-20261117/kertoja.raaka.pcm`) ja ElevenLabsin alignment: vain uudelleenleikkaus ja yksi koodaus (sama `kasittele` kuin v1: keskitaso + alimiter ≤ −1 dBTP → mp3 192k). Otsikon lopun ja leipätekstin alun aikaleimat: 14,96 s ja 15,44 s oton alusta. Puoliväli (15,20 s) osui sisäänhengitykseen (huippu −28 dBFS), joten leikkauskohdaksi valittiin tauon hiljaisin 10 ms:n ikkuna ennen hengitystä: **14,718 s** oton alusta (v1-tiedoston ajassa 7,086 s). Jakson alkuun jää 0,72 s tauko ja hengitys, kuten muissa jaksoissa (0,72–0,83 s).

**Naksahdus.** Raaka PCM leikkauskohdassa: ensimmäinen näyte 10 (16 bitin täysasteikosta 32 767), huippu 5 ms ennen leikkauskohtaa 20 (−64 dBFS), 5 ms sen jälkeen 11 ja 20 ms:n ikkunassa 23 (−63 dBFS). Häivytys: 20 ms lineaarinen nousu (vaatimus ≥ 10 ms). Kuva: `docs/raportit/kaappaukset/bastilji-v2-leikkaus-aaltomuoto-20261120.png` (ENNEN, NYT ja leikkauskohta ±60 ms).

**Paketti** `proto-3d/_valmiit/bastilji-vienti-20261120-v2/` (16 tiedostoa): kertoja-1 uusi; nimi, esittely, isoisa ja kertoja-2…4 (mp3 + sanat) ovat v1:n byte-identtisiä kopioita (`cmp` 12/12), jotta pelissä riittää `aanikansio: 'bastilji/v1'` → `'bastilji/v2'`. Manifest osoittaa v2-osoitteisiin. Ääniportti: 7 tiedostoa, hylättyjä 0, varoituksia 0 (`--puhe`); `vie-paketti.sh --kuiva` ok, vientiä ei ajettu. v1-paketti ja v1-kansio koskemattomia.

**Ei tehty tässä (odottaa KK:ta ja SK:n tekstejä):** datan `aanikansio` ei vaihdettu (js/packs/fokuskohteet-fra.js, `bastilji/v1` → `bastilji/v2`) eikä Tuileries'n `aanikansio`ta poistettu; molemmat yhdessä SK:n tekstien kanssa (suunnitelma L5.7). Vienti ämpäriin vasta JU:n linkin ja KK:n vientisanan jälkeen.

## 2. Äänitysjono: avaimet = pelin pyytämät palat

`tools/aanitysjono/tarkista.mjs`: jaksollisen noston (`jaksot`) luettavat ovat jaksot **ilman nimi-, esittely- ja isoisäjaksoa (aani `isoisa`) ja ilman otsikkoa**, yksi jakso = yksi pala (peilaa `NostoJaksot.IlmanIsoisaa` + nimijakso pois + `Nostokortti.JaksoLuenta`). Ennen luettavat olivat nimi + päätason `teksti` (jossa isoisä ja esittely mukana) puolitettuna. Lisäksi jakso, jolla on oma äänite (`aanikansio` + `aanite`: Bastilji, Tuileries), ei kuulu jonoon.

`data/aanitysjono.tsv`: jaksollisten kohteiden (Pariisin 13 + St Paulin katedraali + Trevi) rivit 88 → 51 (38 pois: esittelyn ja isoisän palat sekä Bastiljin ja Tuileries'n omat äänitteet; pala-numerot uusiksi; 1 uusi: St Paulin katedraali 1). Muut rivit ja päivämäärät ennallaan; ei `--siivoa`-ajoa (se poistaisi myös muiden maanosien rivit).

**Vertailu (testi `tests/aanitysjono.test.mjs`, "Pariisin 13 jaksollisen noston palat = pelin pyytämät")**: kullekin 13 nostolle pelin pyytämät palat lasketaan datan jaksoista erikseen (jaksot ilman nimeä, esittelyä ja isoisää → `luenta` → avain) ja verrataan työkalun riveihin: **eroja 0** kaikilla 13:lla.

| nosto | paloja | | nosto | paloja |
|---|---|---|---|---|
| tuileries (oma äänite) | 4 | | lavoisier-1780 | 4 |
| louvre | 4 | | pasteur-1862 | 4 |
| bastilji (oma äänite) | 4 | | palais-garnier | 4 |
| eiffel-torni | 4 | | palais-orsay | 4 |
| sainte-chapelle | 4 | | palais-industrie | 3 |
| curie-1898 | 4 | | les-halles | 4 |
| lumiere-1895 | 4 | | | |

Testi tarkistaa lisäksi, ettei yksikään pala sisällä nimi-, esittely- tai isoisäjakson tekstiä, ja että oma-äänitteisellä jaksolla ei ole jonoriviä. `node tools/aanitysjono/tarkista.mjs`: OK (puuttuvat 98, kaikki jonossa).
