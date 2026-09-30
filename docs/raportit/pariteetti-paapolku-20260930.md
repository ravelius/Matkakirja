# Pariteettikierros: pelaajan pääpolku, web vs. natiivi (Natiivi-UI 30.9.2026)

Päätoimittajan tilaus 30.9.: aloitus → lento → saapuminen → nosto → visa → kauppa, web vs. natiivi.
- Web: tuotanto 30.9. klo 12, `tools/pariteettikuvat.mjs --kaupunki marseille --koot 393x852`, 16 näkymää.
- Natiivi: BUILD 67 + Natiivi-UI:n kaistale 3b0a4c29 (sama kuin TF 1.0.67 + matkakirja), iPhone 17 FB234D08, `paapolku.sh`, 18 näkymää.
- Kuvaparit (web vasemmalla, natiivi oikealla, merkinnät kuvassa): `/Users/Shared/Claude/proto-3d/lokit/natiivi-ui-paapolku/parit/<näkymä>.png`

## Viisi suurinta pelaajalle näkyvää eroa

| # | Näkymä (kuvapari) | Web | Natiivi | Omistaja |
|---|---|---|---|---|
| 1 | aloitusvalinta.png | Päiväkartta paperina, yläpalkki ja 4 aloituskaupunkia | Yökartta (kaupunkien valot), kellopaneeli "02.30 PÄIVÄ 1/80", Livian kupla, ei yläpalkkia. Pelin ensimmäinen näkymä on eri tunnelmassa | Pelikoodari (Aloitusnakyma), pallon valaistus Natiiviseppä |
| 2 | kaupunkilehti-kansi.png | Sääriviä kahdella rivillä sääikonin kanssa ("tänään 26° (22…26°), pilvistä, sadetta 2 mm", VUOSIENNUSTE ›) | Sama rivi yhdellä rivillä ja leikkautuu kummastakin reunasta ("änään 26° … VUOSIENNU"). Näkyvä vika | Pelikoodari (Lehti/) |
| 3 | liiku.png | Kulkutapojen rivi kartan alareunassa maanimen yllä, Liiku pelkkänä tekstinä | Napit kartan keskellä pelaajan kaupungin kohdalla ja Liiku pillerinä sen alla | Pelikoodari (Matkavalinta/Liiku) |
| 4 | matkakirjakortti-auki.png, kartta.png | Yläpalkin pilleri yhdellä rivillä "400 £ · Päivä 1, aamu"; kortissa 4 pikkukuvaa | Pilleri kahdella rivillä. Omistajan uusi muoto "1/80, keskipäivä" + rahat oikealle on tulossa (natiivi-ui/ylapalkki-saari 71b327d9). Kortissa 2 pikkukuvaa (webissä 4; syy selvitettävä, webinkin noppakuvissa rivi puuttuu) | Natiivi-UI |
| 5 | kartta.png, liiku.png, noppa.png | Maan ja kaupungin isot harvennetut nimiöt ("PARIISI", "MARSEILLE", "RANSKA") ja pisteet selkeinä | Pienet kursiivinimiöt (Peilisali, Chambordin linna ym.) tiheämmin, isot alueen nimet puuttuvat. Kartta näyttää kiireisemmältä | Karttaseppä |

## Ei vertailukelpoinen tällä kierroksella (kaappausongelma, ei ero)

- kohtaaminen ja visa: natiivin `etsi-katko marseille` ja `aloita` eivät avanneet kohtaamista, ruudussa näkyy kartta ja matkakirja. Komennot on tarkistettava ennen seuraavaa kierrosta.
- kartta: natiivin kuvassa saapumisen luentakuva on yhä kartan päällä (ajoitus).
- nostovisa: natiivissa eri nosto (Shakkiturkkilainen, ei Roquefortin lukijan kysymystä).
- kaupunkikortti: web avaa naapurikaupungin tarinakortin (nakyva-kaupunki-nosto), natiivin `kortti barcelona` avaa avauskortin (turisti-info + OSM). Eri polku, on tarkistettava `napauta barcelona` -komennolla.
- kauppa: webin työkalussa ei ole kauppanäkymää. Natiivin Pulun pulla- ja mannerlentokuvat ovat kansiossa `natiivi/kauppa-*.png` ilman webin paria.

## Sallitut erot (ei listalla)

Natiivin aloitusportti ilman yläpalkkia, nahkapalkki ja pillerivalikko (natiivi ensin), aarteen sisältö (satunnainen).

## Päätoimittajan päätökset (30.9.2026)

1. Aloitusvalinnan yökartta, kellopaneeli ja Livia: ei korjata. Ne ovat omistajan 28.9. hyväksymä natiivin oma ratkaisu (v3f, päivän ja yön raja), natiivi ensin.
2. Kaupunkilehden sääriviä: korjataan kahdelle riville ikonin kanssa kuten webissä. Tekijä on Natiivi-UI kohdan 4 jälkeen.
3. Liiku: ei korjata nyt. Se on aiemmin kirjattu tietoinen poikkeama (turva-alue, Liiku +38 pt).
4. Matkakirjan pikkukuvat neljäksi kuten webissä: Natiivi-UI yläpalkin jälkeen.
5. Isot maan ja alueen nimet: Päätoimittaja välittää Karttasepälle polton jälkeen.

## Uusinta 30.9. klo 14.10 (natiivi 1.0.71, iPhone 17, Marseille; `paapolku2.sh`)

Kuvaparit: `/Users/Shared/Claude/proto-3d/lokit/natiivi-ui-paapolku/parit2/<näkymä>.png` (web vasemmalla).

| Näkymä | Tulos |
|---|---|
| matkakirjakortti-auki | Täsmää: 4 pikkukuvaa kuten webissä. Laitetestaajan kolme kuvaa tulivat Pariisista, jonka merkinnässä on 3 kuvaa. |
| kaupunkilehti-kansi | Täsmää: sää kahdella rivillä ikonin kanssa. Ateenan lyhyt rivi mahtuu yhdelle riville kuten webissäkin. |
| kohtaaminen | Täsmää: alkukortti ja Aloita peli. |
| visa | EROAA: natiivissa matkakirjan kortti jää auki visan taakse, ja sen teksti leikkautuu visakortin alle. Webissä kortti on pienennetty yhden rivin lapuksi. |
| kaupunkikortti (`ui lisakaupunki lyon`) | EROAA: natiivissa Lyonin kuvan paikalla on harmaa laatikko 6 s jälkeen, kun webissä näkyy kaupungintalon kuva. Loki: "kuvia 1", valmis 19 ms. Syy selvitettävä. |
| nostovisa | Sisältö täsmää. Natiivin kuvassa lukijan kysymys jää alareunaan, koska kappaletta ei vieritetty (web vierittää scrollIntoView'lla). Kyse on kaappauksesta, ei erosta. |
