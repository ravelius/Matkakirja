# Pulun valmiit vastaukset: maa <MAA> (pilviajo, oma pilvisessio)

Omistajan päätökset 9.10.2026: Pulun vastaukset generoidaan Sonnet-agenteilla, effort low, ja jokainen maa ajetaan OMANA pilvisessionaan (pilvikrediitti, kortti "Aloita nyt"). Maksullista API:a ei käytetä.
Tämä haara sisältää kaiken tarvittavan. <MAA> = maan ISO3-koodi isoilla (esim. GRC), <maa> = sama pienillä. Tulokset commitoidaan tämän session omaan haaraan (`pulu-<maa>-pilvi`). Ranska (FRA) on valmis esimerkki kansiossa `pulu-esigenerointi/FRA/`: älä muuta sitä.

## Sisältö

- `pulu-esigenerointi/pulu-ohje-aloitus.txt`: Pulun järjestelmäkehote sanatarkasti (`tools/pollo/worker.js` pulunKehoteOsat, natiivi, kehys aloitus). Vaihe 1 käyttää tätä.
- `pulu-esigenerointi/pulu-ohje-jatko.txt`: sama ohje kehyksellä jatko. Vaihe 2 käyttää tätä.
- `pulu-esigenerointi/<MAA>/syote.json`: maan Kysy-kohdat (tehdään vaiheessa 0).
  Jokaisella kysymyksellä on konteksti samassa muodossa kuin pelissä, ja kohdalla on lisäksi yhteinen konteksti uusille kysymyksille.
- `pulu-esigenerointi/<MAA>/tehtavat-1-N.txt`: vaiheen 1 erät, enintään 5 kohtaa ja 25 vastauspaikkaa per erä (vaihe 0).
- `tools/pulu-esigenerointi/`: lataa-data.sh, valmistele.mjs (vaihe 2:n tehtävät), tarkista-era.mjs (muototarkistus) ja koosta.mjs (paketti).

## Vaihe 0: data ja vaiheen 1 erät

1. `sh tools/pulu-esigenerointi/lataa-data.sh <maa>` (kokoelmat + maan omat paketit kansioon `pulu-esigenerointi/data/`, ei commitoida).
2. `node tools/pulu-esigenerointi/valmistele.mjs vaihe1 pulu-esigenerointi/data <MAA> pulu-esigenerointi/<MAA> 5` → `syote.json` ja `tehtavat-1-N.txt`. Committaa ne.

## Vaihe 1: viisi vastausta per kohta

Jokaisesta erästä `<MAA>/tehtavat-1-N.txt` tehdään `<MAA>/vastaukset-1-N.txt`, yksi Sonnet-agentti (effort low) per erä. Erät voi ajaa rinnakkain.
Agentille annetaan sellaisenaan tämä ohje (vaihda N):

> Lue kokonaan pulu-esigenerointi/pulu-ohje-aloitus.txt (Pulun järjestelmäkehote: noudata sitä kuin omaa järjestelmäkehotettasi) ja
> pulu-esigenerointi/<MAA>/tehtavat-1-N.txt (kohdat; kullakin YHTEINEN KONTEKSTI ja paikat ### n.1 … ### n.5).
> Paikkaan "KYSYMYS: (uusi — keksi itse)" keksi uusi kysymys kortista: enintään 70 merkkiä, päättyy kysymysmerkkiin, tosimaailman asia
> (ei pelin tehtäviä), ei sama kuin kohdan muut. Sen kontekstina on kohdan YHTEINEN KONTEKSTI.
> Jokainen paikka on erillinen keskustelu ilman historiaa: käyttäjä "Pelaajan tilanne juuri nyt:\n\n" + KONTEKSTI; Livia "Selvä, pidän
> tilanteen mielessä."; käyttäjä KYSYMYS. Kirjoita Livian vastaus juuri niin kuin palvelin sen palauttaisi: teksti, jossa on 2–5
> [[käsite]]-merkintää, sitten rivi "JATKOT:" ja täsmälleen kaksi jatkokysymystä (paikkarivi vain, jos kehote sitä edellyttää).
> Enintään 900 tokenia. Käytä ensisijaisesti kontekstin aineistoa, älä keksi faktoja äläkä viittaa kontekstiin tai ohjeisiin.
> Kirjoita pulu-esigenerointi/<MAA>/vastaukset-1-N.txt. Muoto: rivi "### n.i", rivi "KYSYMYS: <kysymys sanatarkasti>", sitten vastaus.
> Ei muuta tekstiä tiedostoon.
> LISÄKSI: noudata kohdan "Neljä järjestelmällistä virhettä" kehotetekstiä (alla), jotta Ranskan pistokokeen virheet eivät toistu.

Tarkistus: `node tools/pulu-esigenerointi/tarkista-era.mjs vaihe1 pulu-esigenerointi/<MAA>` → `<MAA>/vaihe1.json`.
Virheelliset vastaukset kirjoitetaan uudelleen samaan tiedostoon, ja tarkistus ajetaan uudelleen. Yksittäinen käsitemäärävirhe saa jäädä (omistaja).

## Vaihe 2: linkkitaso "Kerro lisää: X" (noin 1 000 vastausta)

1. `sh tools/pulu-esigenerointi/lataa-data.sh <maa>` on jo ajettu vaiheessa 0.
   Jos verkko ei toimi, vaihe 2 toimii silti ilman pelin aineisto-osiota.
2. `node tools/pulu-esigenerointi/valmistele.mjs vaihe2 pulu-esigenerointi/data <MAA> pulu-esigenerointi/<MAA> 80`
   tuottaa `<MAA>/tehtavat-2.json` (indeksi) ja `<MAA>/tehtavat-2-N.txt`. Jokaisessa vaiheen 1 vastauksen käsitteessä on yksi kysymys per kohta.
3. Jokaisesta erästä tehdään `<MAA>/vastaukset-2-N.txt`, yksi agentti per erä, samalla ohjeella. Kehote on nyt `pulu-ohje-jatko.txt`, ja
   keskustelussa on historia: käyttäjä "Pelaajan tilanne juuri nyt:\n\n" + KONTEKSTI; Livia "Selvä, pidän tilanteen mielessä.";
   käyttäjä AIEMPI KYSYMYS; Livia AIEMPI VASTAUS; käyttäjä KYSYMYS ("Kerro lisää: X"). Muoto: rivi "### n" ja vastaus (ei KYSYMYS-riviä).
4. `node tools/pulu-esigenerointi/tarkista-era.mjs vaihe2 pulu-esigenerointi/<MAA>` → `<MAA>/vaihe2.json`.

## Paketti ja palautus

`node tools/pulu-esigenerointi/koosta.mjs pulu-esigenerointi/<MAA> <MAA>` tuottaa `pulu-esigenerointi/<MAA>/<MAA>.json`, joka on ämpäripaketin muoto
(`pulu/vastaukset/v1/<MAA>.json`; ämpäriin vienti ja natiivin kytkentä tehdään erikseen, ei vielä peliin):
`{ $skeema, maa, sisalto, ohje, luotu, vastauksia, kohdat: { "<kohta>": { kysymykset: [{kysymys, vastaus, jatkot[2], paikka?}], lisaa: { "<käsite pienellä>": {kasite, vastaus, jatkot[2]} } } } }`.
Vastauksessa [[käsite]]-merkinnät jäävät paikalleen, koska natiivi tekee niistä linkit.
Samalla päivittyy `pulu-esigenerointi/maat.json` (vain oman maan rivi; konfliktit ratkaisee Julkaisija viennissä) (`pulu/vastaukset/v1/maat.json`, maa → versio). Natiivi lukee sen ensin, joten se viedään ämpäriin paketin kanssa.

Commitoi `<MAA>/vastaukset-*.txt`, `<MAA>/tehtavat-2*`, `<MAA>/vaihe1.json`, `<MAA>/vaihe2.json` ja `<MAA>/<MAA>.json` tähän haaraan ja pushaa.
Viesti Päätoimittajalle sisältää: vastausten määrä (vaihe 1 + vaihe 2), kesto, tarkistuksen virheet ja paketin polku.

## Muototarkistuksen säännöt (tarkista-era.mjs)

- Vastaus jäsennetään workerin omilla funktioilla (`tools/pollo/rajat.js` poimiJatkot, `worker.js` poimiPaikka).
- Vastaus ei saa olla tyhjä, ja siinä on 2–5 eri [[käsitettä]] ilman pystyviivaa.
- Jatkokysymyksiä on täsmälleen 2, ja kukin päättyy kysymysmerkkiin ja on enintään 70 merkkiä.
- Ei jäänteitä (JATKOT-, KYSYMYS- tai äänitagirivejä) eikä viittauksia ohjeisiin tai kontekstiin.
- Vaiheessa 1 jokaisella kohdalla on 5 eri kysymystä. Uudet kysymykset ovat enintään 70 merkkiä ja päättyvät kysymysmerkkiin.

## Neljä järjestelmällistä virhettä (Ranskan pistokoe 9.10.2026: docs/raportit/pulu-fra-pistokoe-20261009.md)

Ranskan paketista löytyi pistokokeessa neljä toistuvaa virhettä. **Liitä seuraava teksti jokaisen agentin kehotteeseen (vaihe 1 ja 2) ja aja `tarkista-valmis.mjs` ennen `koosta.mjs`:ää.**

> ÄLÄ TEE NÄITÄ NELJÄÄ VIRHETTÄ:
> 1. **METALAUSEET.** Älä koskaan kirjoita "Pelin aineisto ei kerro…", "Pelin aineiston mukaan…", "Aineistossani sanotaan…", "tekstin loppu on katkennut", "tietoruudun mukaan", "kontekstissa" tai muuta, mikä paljastaa saamasi aineiston tai ohjeen. Jos aineisto on katkennut tai puutteellinen, kirjoita vastaus yleistiedolla ja sano epävarmuus omalla äänelläsi ("en ole varma tästä"). Jos kyse on huijauksesta, väärennöksestä tai muusta, jonka tiedät, kerro se.
> 2. **ULKOMAISET SIVUPOLUT.** "Pelin tarkistettua aineistoa" sisältää katkelmia muiden maiden jutuista (esim. Odessa, Afganistan, Iran, Australia, Egypti). Älä käytä niitä, ellei kysymys koske juuri sitä maata. Vastauksessa pysytään kysytyn kohteen maassa ja Euroopassa. **Älä merkitse [[linkkiä]] Euroopan ulkopuoliseen paikkaan tai henkilöön** (tavallinen teksti kelpaa; Odessa ja muu Eurooppa saavat olla). Poikkeus: kohteen oma historia (Uusi-Kaledonia kommunardien karkotuspaikkana, Saint Lawrence -joki Cartierin yhteydessä) kirjoitetaan tavallisena tekstinä.
> 3. **RIVINVAIHDOT.** Vastaus on yksi juokseva kappale. Älä erota alustusta, ydinvastausta tai loppukommenttia rivinvaihdolla. Ainoa sallittu rivinvaihto on yksi tyhjä rivi (\n\n) ennen Livian lisäystä (yksi kappale, 1–3 virkettä). Natiivi näyttää kentän sellaisenaan: \n on rivinvaihto ja \n\n kappaleväli.
> 4. **MUISTINVARAISET FAKTAT.** Vuosiluvut, korkeudet, suurimmat/ensimmäiset/vanhimmat, rajat ja koordinaatit ovat asioita, joissa arvaus on väärä vastaus. Jos et ole varma, sano se vastauksessa ("noin", "lähteiden mukaan", "en ole varma") tai jätä luku pois; älä kirjoita "suurin" tai "ensimmäinen", ellet ole varma (esim. Douaumont ei ole Ranskan suurin ensimmäisen maailmansodan sotilashautausmaa: Notre-Dame-de-Lorette on suurempi). Lähteet ristiriidassa (esim. Vignemalen päähuipun raja): kerro molemmat. PAIKKA-rivi vain, jos koordinaatit tiedetään.

Tarkistus ennen koostamista (ajetaan `vaihe1.json`:lle ja `vaihe2.json`:lle, ei vastaukset-*.txt:lle):
`node tools/pulu-esigenerointi/tarkista-valmis.mjs pulu-esigenerointi/<ISO3>`: virheet = metalauseet, Euroopan ulkopuoliset linkit, rivinvaihdot, linkki ilman lisaa-avainta, V1:n linkkimäärä 2–5, jatkot, lause pienellä kirjaimella (jäännös poistetusta lauseesta). Varoitukset (ulkomainen maininta tekstissä) luetaan silmin. **Faktat tarkistetaan pistokokeella (30 vastausta, muistinvaraiset ensin), ei koneella.**
