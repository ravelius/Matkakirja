# Luovutus: Sisältökirjuri — 2026-09-22 (konteksti 70 %)

Sessio nollataan kontekstin vuoksi. Kolme työjonoa käynnissä, kaikki
etenevät hyvin — ei jumeja.

## 1. Nostotasot (taso: 1 -kenttä pääkartan tähtikohteille)

Malli: `docs/raportit/nostotasot-fra-20260920.md` (taso 1 = kuvamerkki
kaikilla zoomeilla, valitaan olemassa olevista nostoista, ei keksitä
uusia, mieluiten eri tyyppejä, tunnetuin ensin).

**Mainissa/pushattu, Julkaisijan jonossa (odottaa mergeä):**
- FRA: alkuperäinen malli, jo aiemmin mainissa.
- DEU, ITA, ESP: **jo mainissa** (varmistettu — toinen erä oli tehnyt
  nämä samana päivänä eri kautta, 8 nostoa/maa; kolme tarpeetonta
  haaraa poistettu).
- GBR/POL/AUT (erä 1), NLD/BEL/CHE/PRT/GRC/CZE (erä 2),
  HUN/SWE/NOR/DNK/FIN/IRL (erä 3): **15 haaraa pushattu**, kaikki
  fresh origin/main-pohjalta, testit 0 fail jokaisessa erikseen,
  Julkaisijalle ilmoitettu jokaisesta. Haarat: `sisalto-nostotaso-<iso>`
  (gbr/pol/aut/nld/bel/che/prt/grc/cze/hun/swe/nor/dnk/fin/irl).
  Raportit: `docs/raportit/nostotasot-gbr-pol-aut-ehdotus-20260921.md`,
  `-nld-bel-che-prt-grc-cze-ehdotus-20260921.md`,
  `-hun-swe-nor-dnk-fin-irl-ehdotus-20260921.md`.

**TEKEMÄTTÄ, seuraavalle sessiolle (17 maata, 4 nostoa/maa Fablen
ohjeen mukaan, koska pienempiä maita):** HRV, SVN, SVK, ROU, BGR, SRB,
BIH, LTU, LVA, EST, ISL, LUX, MLT, CYP, UKR, RUS, TUR.

**Prosessi joka toistetaan:** 1) dispatchaa Sonnet-tutkimusagentti per
maa (tai muutama rinnakkain) lukemaan `docs/raportit/nostotasot-fra-
20260920.md` + tuoreimmat esimerkit, käymään läpi maan `maastokohteet-
<iso>.js`/`hahmotelma-<iso>.js`/`fokuskohteet-<iso>.js` (jos on) ja
ehdottamaan 4-6 tähtikohdetta — VAROITA aina, että kaupungin
kohdekartan nostot (js/packs/maakartat.js) EIVÄT kelpaa, vain
pääkartan nostot. 2) Kokoa ehdotukset yhteen raporttiin, lähetä
Fablelle tarkastukseen ENNEN dataan kirjoittamista. 3) Kun hyväksytty:
oma haara per maa (`git checkout -b sisalto-nostotaso-<iso>
origin/main`), lisää `taso: 1,` heti `tyyppi: '...',`-rivin jälkeen
täsmälleen samaan nosto-objektiin (tarkista nimi+tyyppi grepillä ensin
— osa nostoista sisältää ylimääräisen `nimio:`/`symboli:`-rivin
`nimi`:n ja `tyyppi`:n välissä, tarkista aina naapuririvit ennen
korvausta). 4) `node --test tests/*.test.mjs` 0 fail, commit, push,
ilmoita Julkaisijalle.

## 2. Maakuntien luonnehdinnat (js/packs/maakunnat-luonnehdinnat.js)

**Erä 1 valmis ja MAINISSA** (v2037): 97 aluetta, 7 maata (FRA 13, DEU
16, ITA 20, ESP 19, GBR 4, POL 16, AUT 9), `lyhyt`-kenttä täytetty
kaikille (Livian äänellä, 1-2 virkettä, ≤160 merkkiä). Fablen
tarkastuskorjaukset tehty (DEU-huutomerkit 16→3, sanatoistoja
korjattu). Rakenne on valmiiksi `{ lyhyt, pitka, kuva, pulu }` per
alue — vain `lyhyt` täytetty. Niputusongelma (tiedostoa ei tuo mikään
moduuli vielä) korjattu lisäämällä `tests/sw.test.mjs`:n
NIPUTTAMATTOMAT-poikkeuslistalle (nimisto-1873.js:n malli) — POISTA
tämä poikkeus heti kun ensimmäinen import ilmestyy.

**TEKEMÄTTÄ, seuraavalle sessiolle:**
- **Erä 2:** `pitka` (3-5 virkettä Livian äänellä: maisema, ihmiset,
  yksi tarina/erikoisuus, 1873-kytkös jos sellainen löytyy) + `kuva`
  ({ osoite, lahde, lisenssi, tekija }, yksi Commons-kuva per alue
  kuvaputken sääntöjen mukaan) kaikille 97 alueelle.
- **Erä 3:** `pulu` ([{ q, a }], 2-3 esikirjoitettua kysymystä
  vastauksineen per alue, sama malli kuin Ihmisen matka -linssin
  pulukeskustelussa, vastaus 2-4 virkettä). Oma tiedosto
  `js/packs/maakunnat-pulu.js` tai sama tiedosto — päätetään erän 3
  yhteydessä Fablen kanssa.
- Molemmat: tekstit Fablelle tarkastukseen ENNEN Julkaisijaa (Fablen
  nimenomainen ohje tälle sisältötyypille).
- CHE (26 aluetta) puuttuu kokonaan tästä työstä — Fablen tilaus
  rajasi sen pois (vain FRA/DEU/ITA/ESP/GBR/POL/AUT).

## 3. Linssien lajittelu maanosittain — VALMIS

`docs/raportit/linssit-maanosittain-20260921.md`: 9 toteutettua + 9
varattua työkalulinssiä (rekisteri.js) ja 112+25 tarinalinssi-ideaa
(linssikatalogi.md + MAAPALLON VOIMAT -ideavarasto) luokiteltu
mantereittain. Pahimmat aukot: napa-alueet ja Oseania. Ei jatkotoimia
odota — Fable päättää sijoitukset, Pelikoodari toteuttaa linssisivujen
suodattimen sulavuuden jälkeen. Ei tarvitse ottaa uudelleen esiin
ellei Fable pyydä.

## 4. Codex-toimitukset odottavat (ei minun toimenpiteitäni, FYI)

- Kadonneiden monumenttien kulta-aikakuvat: 81 kohdetta tilattu, ei
  vielä toimitettu (edellinen 26 rappeutunutta jo kytketty aiemmin).
- Pienoismallit (kohdekarttojen miniatyyrit): 97 kpl toimitettu ja
  kytketty jo (v2017 tienoilla, tarkistettu pistokokein 21.9. — 7
  vanhaa puuttuu yhä, tilattu jatkoksi
  docs/raportit/pienoismallit-puuttuvat-7-20260921.md). **25 lisää**
  odottaa toimitusta (Fablen luku — en ole itse verifioinut, tarkista
  postilaatikosta kun Julkaisija ilmoittaa).
- Kun toimituksia tulee: Julkaisija hakee, Sisältökirjuri kytkee
  (miniatyyrit js/packs/miniatyyrit.js:ään, ks. malli olemassa
  olevista merkinnöistä; monumenttikuvat ihme-kohteiden `osoite`-
  kenttiin, ei koodimuutosta — ks. docs/raportit/pelikaupunki-era-a-
  yhteenveto-20260921.md monumenttiosuus).

## 5. Opitut säännöt tälle työlle (tärkeää seuraavalle sessiolle)

- **Haarat AINA tuoreelta origin/main-kärjestä**, ei vanhalta
  pohjalta (`git fetch origin main` ensin joka kerta). Vanha pohja
  (614+ committia jäljessä) teki DEU/ITA/ESP-haaroista turhia
  vertailussa — main oli jo ohittanut ne.
- **Ei rinnakkaisia muokkauksia samaan tiedostoon.** Kartuscha-erässä
  (BIH/UKR/RUS/ISL, kaikki `js/packs/maa-kategoriat.js`) ja
  pelikaupunki-erässä (LUX/MLT, molemmat `europe.js`/`maailmankartta.js`
  counts-laskurit) rinnakkaiset agentit samasta pohjasta aiheuttivat
  hiljaisia counts-konflikteja, joita git ei liputa (identtiset
  rivilisäykset). Sisältökirjuri ketjuttaa nyt saman tiedoston
  muutokset peräkkäin, ei rinnakkain. Nostotasot ovat turvallisia
  rinnakkain, koska jokainen maa on oma tiedostonsa.
- **Ennen "ilmeisen" kohteen ehdottamista, TARKISTA datasta.** Moni
  maan tunnetuin nähtävyys (Big Ben, Guinness Storehouse, Vasa-museo,
  Sibelius/sauna Suomessa) on kaupungin KOHDEKARTALLA
  (js/packs/maakartat.js), ei pääkartan nosto-poolissa — ei kelpaa
  nostotasolle. Tämä toistui lähes joka maassa, tutkimusagentit
  ohjeistettu tarkistamaan aina erikseen.
- **Fable haluaa listan tarkastukseen ennen dataan kirjoittamista**
  kaikessa uudessa sisältötyypissä (nostotasot, maakuntaluonnehdinnat)
  — älä kirjoita suoraan, lähetä ehdotus ensin.

## 6. Aiemmin valmistuneet erät (ei toimenpiteitä, historiatietoa)

- Pelikaupunki-erä A (CYP/LUX/MLT): valmis, mainissa (v2024-v2025,
  MLT PR:ssä). docs/raportit/pelikaupunki-era-a-yhteenveto-
  20260921.md.
- Kartuscha-erä B (BIH/UKR/RUS/ISL): valmis, mainissa (v2034-v2036).
  docs/raportit/kartuscha-era-b-yhteenveto-20260921.md.
- Eurooppa-sisältöinventaario ja pienoismallitarkistus: valmis,
  docs/raportit/sisaltoinventaario-eurooppa-20260921.md ja
  pienoismallit-puuttuvat-7-20260921.md.
- Vedos 4 -kielitarkistus (ITA/ESP/GBR/POL/AUT maakuntanimet
  Karttasepälle): valmis.

## Uuden session ensimmäiset askeleet

1. Lue CLAUDE.md, tämä luovutus.
2. `ListAgents` — sessiot ovat auki, älä lähetä aloitusviestejä
   uudelleen.
3. Kysy Fablelta onko erä 2 (maakuntien pitkä+kuva) vai loput 17 maan
   nostotasot ensin — molemmat odottavat, kumpaakaan ei ole aloitettu.
