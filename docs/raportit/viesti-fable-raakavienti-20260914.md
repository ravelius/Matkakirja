# Viesti Fablelle: raakavienti pakolliseksi kaikkiin ääniputkiin 14.9.2026

Opus-työagentti. Haara `claude/bold-ride-vow4ki-raakavienti`, pohja `origin/main`
(`31f1524f`, eli v1881 — pulun ääniputken korjaus on jo mainissa). Ei yhtään
ElevenLabs- tai Lyria-kutsua, ei veloittavaa työnkulkuajoa, ei R2-vientiä, ei
mediatiedostoja repoon.

Kolmas ja viimeinen osa sarjassa: PR #2451 (pulun ääniputki), PR #2454
(tehosteputki), tämä (loput seitsemän).

## Lyhyt vastaus

Seitsemän ääniputkea sai saman kuvion kuin #2454: **raaka ämpäriin ennen mitään
käsittelyä, HEAD-varmistus, kieltäytyminen ennen ensimmäistäkään maksullista
kutsua, kuitti jossa `rawObjectKey` ja sha256**. Ulostulomuotoja ja
käsittelyketjuja ei koskettu lainkaan.

Toteutus on **yksi jaettu moduuli** `tools/raakavienti.mjs` seitsemän kopion
sijaan. Sitä ei voi kiertää vahingossa: erätunnus, avaimen muodostus,
kieltäytyminen ja HEAD-varmistus ovat kaikki siellä.

**Löysin samalla kaksi vikaa, joita ei tilattu, ja korjasin ne** — kumpikin oli
suoraan tämän säännön reiän aiheuttama (kohdat 3 ja 5).

## 1. Seitsemän putkea nimeltä

| putki | mitä generoi | raaka-avain | erityistä |
|---|---|---|---|
| `tools/generoi-linssiluennat.mjs` | linssien aikajanaluennat | `<linssin kansio>/raaka/<erä>/` | kaksi ajoreittiä, molemmat kulkevat saman `haeApista`n kautta |
| `tools/generoi-siirtymamusiikki.mjs` | saumattomat looppiraidat | `aanet/raaka/<erä>/` | **raaka = mallin tuotos ENNEN loopin ompelua** |
| `tools/generoi-musiikki.mjs` | paletti-, kaupunki- ja tilaraidat | `audio/raaka/<erä>/` | looppi pyydetään mallilta, ei ommella |
| `tools/generoi-avaus.mjs` | intro- ja lentopuhe | `audio/avaus/raaka/<erä>/` | **hännän tarkistus voi kaataa ajon** |
| `tools/generoi-hihkaisut.mjs` | kolme huudahdusta | `audio/hihkaisut/raaka/<erä>/` | **kolme otosta per tiedosto, hylätyt katosivat** |
| `tools/generoi-kaari.mjs` | kaaripakettien luennat | `audio/kaari/raaka/<erä>/` | ei käsittelyä |
| `tools/generoi-kohtaamiset.mjs` | kohtaamisten tervehdys ja löytö | `audio/kohtaamiset/raaka/<erä>/` | monta puhujaa, ei käsittelyä |

Fablen kysymykseen "yleischat?": **sellaista putkea ei ole.** Pulun chat-repliikit
tulevat `tools/generoi-pulu.mjs`:stä, joka korjattiin jo PR #2451:ssä.

**Lista on tarkistettu koneellisesti, ei muistista:** hain kaikki `tools/`-kansion
tiedostot, jotka viittaavat `api.elevenlabs.io`iin tai Lyriaan. Osumia oli 17,
joista

- **7** on tämän erän putket (yllä),
- **3** on jo korjattu: `generoi-pulu.mjs` ja `generoi-luennat.mjs` (PR #2451,
  mainissa) sekä `generoi-tehosteet.mjs` (PR #2454, jonossa),
- **5** on KUVAgeneraattoreita (`generoi-aarrekuvat`, `generoi-kohtaamiskuvat`,
  `generoi-miniatyyrit`, `generoi-tietaja-avatarit`, `generoi-varustekuvat`) —
  eivät ääniputkia, eivät tämän säännön piirissä,
- **1** on `lyria.mjs`, jaettu hakuapuri kahdelle musiikkityökalulle; sen molemmat
  kutsukohdat ovat tämän erän putkissa ja vievät raa'an,
- **1** on `pulun-historia.mjs`, joka on **pelkkä luku** ElevenLabsin historiasta
  eikä generoi mitään.

Yhtään ääniputkea ei siis jäänyt säännön ulkopuolelle.

## 2. Jaettu moduuli `tools/raakavienti.mjs`

| funktio | tehtävä |
|---|---|
| `raakavientiEste(liput)` | palauttaa syyn, jos ajo ei saa alkaa; `vaadiRaakavienti` kaataa ajon |
| `eratunnus(etuliite, resepti)` | deterministinen `<etuliite>-<20 heksaa>` reseptin tiivisteestä |
| `raakaAmpariKansio(juuri, erä)` | `<juuri>/raaka/<erä>` — **kelvoton tunnus hylätään, ei siivota** |
| `vieRaaka(tavut, { nimi, kansio })` | `aws s3 cp` + **HEAD-varmistus** + sha256; kaatuu, jos vienti ei onnistu |
| `kokoaRaakakuitti(...)`, `vieKuitti(...)` | kuitti `<juuri>/kuitit/<erä>.completed.json` |

Kolme yksityiskohtaa, jotka on helppo tehdä väärin ja jotka siksi ovat testeissä:

- **Kelvoton erätunnus hylätään eikä siivota.** Siivottu tunnus (`../live` →
  `--live`) voisi törmätä toisen erän kanssa ja tuhota sen alkuperäisen.
- **Vienti varmistetaan luennalla.** Pelkkä `aws s3 cp` ilman virhettä ei ole
  todiste siitä, että tiedosto on luettavissa; siksi HEAD julkiseen osoitteeseen,
  ja muu kuin 200 kaataa ajon.
- **Tyhjä tuotos ei mene läpi.** Nollatavuinen vastaus kaataa viennin sen sijaan,
  että kirjaisi "onnistuneen" tyhjän raa'an.

## 3. Löydös A: hihkaisut heitti pois kaksi maksettua ottoa kolmesta

`tools/generoi-hihkaisut.mjs` yrittää **kolme kertaa** per tiedosto ja hylkää
otoksen, jos leikkaus ei löydä puhetta tai jos kesto tai taso ei kelpaa. Jokainen
yritys on maksettu kutsu, mutta vain viimeinen selvinnyt kirjoitettiin levylle —
hylätyt katosivat. Kolmella tiedostolla se on pahimmillaan **yhdeksän maksettua
ottoa, joista kuusi katoaa jäljettömiin**, eikä kukaan voi jälkikäteen kuunnella,
oliko hylkäys oikea vai oliko vika leikkausrajoissa.

Nyt **jokainen yritys** menee ämpäriin omalla juoksevalla nimellään
(`raaka-<nimi>-otos1.mp3`, `-otos2`, `-otos3`), vienti tapahtuu **ennen
leikkausta ja ennen hylkäyspäätöstä**, ja hylätyt näkyvät kuitissa omina
riveinään (`status: 'rejected-take'`). Jos kaikki kolme hylätään, työkalu
tulostaa kaatuessaan kaikkien otosten avaimet.

## 4. Löydös B: avaus kaatui eikä kirjoittanut mitään

`tools/generoi-avaus.mjs` mittaa luennan hännän ja **lopettaa ajon** (`exit 1`),
jos häntä ei ole hiljainen — *"Tiedostoa EI kirjoitettu"*. Kutsu on siinä
vaiheessa jo maksettu, eikä siitä jäänyt mitään jäljelle: hiljaisuusrajan
säätäminen vaati aina uuden maksullisen ajon.

Nyt raaka viedään **ennen häntätarkistusta**, ja kaatuessaan työkalu kertoo, mistä
maksettu otos löytyy. Rajan voi nyt säätää ja mittauksen toistaa ilmaiseksi.

## 5. Löydös C — tämä olisi rikkonut ajot: R2-salaisuudet olivat väärässä paikassa

Kolmessa työnkulussa R2:n salaisuudet olivat **vain vientiaskeleen** ympäristössä,
eivät generointiaskeleen. Koska raaka viedään nyt heti API-vastauksen jälkeen,
generointiaskel olisi kaatunut ensimmäiseen kutsuun virheeseen *"raakavienti ei
onnistu, puuttuu: R2_ACCOUNT_ID…"* — ja nimenomaan **kutsun jälkeen**, eli raha
olisi mennyt.

Tarkistin kaikki kuusi työnkulkua koneellisesti (`yaml.safe_load` + askelten
ympäristöjen luku):

| työnkulku | askel | tila | toimenpide |
|---|---|---|---|
| `generoi-linssiluennat.yml` | Generoi luennat ja vie ämpäriin | R2 **job-tasolla** | ei muutosta |
| `generoi-siirtymamusiikki.yml` | Generoi, leikkaa looppi ja vie | R2 **job-tasolla** | ei muutosta |
| `generoi-musiikki.yml` | Generoi musiikki | **puuttui** | R2 lisätty askeleeseen |
| `generoi-luennat.yml` | Generoi avausluennat | **puuttui** | R2 lisätty askeleeseen |
| `generoi-luennat.yml` | Generoi kaariluennat | **puuttui** | R2 lisätty askeleeseen |
| `generoi-luennat.yml` | Generoi kaupunkiluennat | ei tarvitse | Horation raakavienti tehdään työnkulun vientiaskeleessa (PR #2451) |

`generoi-hihkaisut.mjs` ja `generoi-kohtaamiset.mjs` **ajetaan käsin**, ei
työnkulusta — niillä ajajan on annettava R2:n neljä salaisuutta ympäristöön
samalla tavalla kuin ElevenLabsin avain. Työkalu sanoo sen suoraan, jos ne
puuttuvat, eikä tee yhtäkään kutsua sitä ennen.

## 6. Musiikkiputket: raaka on se, joka merkitsee

`generoi-siirtymamusiikki.mjs` **ompelee** mallin tuotoksesta saumattoman loopin:
lähteestä valitaan alkukohta, siitä leikataan loopin mittainen pala ja sauma
ristihäivytetään. Valmis raita on siis **johdettu teos** — ja juuri siksi mallin
tuotos ennen ompelua on se, mitä ei saa hukata. Uuden sauman, uuden alkukohdan ja
uuden loopin pituuden voi etsiä raa'asta ilmaiseksi niin monta kertaa kuin haluaa;
ilman raakaa jokainen saumakokeilu on uusi maksullinen kutsu.

Vienti tapahtuu siksi **ennen `leikkaaLooppi`-kutsua**, ja testi vartioi juuri sitä
järjestystä.

`generoi-musiikki.mjs` on eri tapaus: siinä looppi **pyydetään mallilta** eikä
ommella jälkikäteen, joten raaka ja valmis ovat sama tavujono. Raaka saa silti
oman eräkohtaisen avaimensa — se on se, mistä on maksettu, ja tiedostot
kirjoitetaan `assets/audio`-kansioon, joka katoaa ajon mukana heti kun työnkulku
on vienyt ne.

## 7. Testit — uusi `tests/raakavienti.test.mjs`, 15 vartiota

**Tilattu testi "kielto ennen API-kutsua" on jokaiselle seitsemälle putkelle
erikseen** (7 testiä), ja se on todistettu niin vahvasti kuin kussakin on
mahdollista:

- **Viisi putkea** (linssiluennat, siirtymämusiikki, musiikki, kaari,
  kohtaamiset): testi **käynnistää työkalun oikeasti** `--ei-vientia`-lipulla
  valeavaimilla ja vaatii paluukoodin 1, raakavientiin viittaavan virheen ja
  **ettei tuloste kerro generoinnin alkaneen**.
- **Kaksi putkea** (avaus, hihkaisut): ne lataavat `mpg123-decoder`in ja
  `lamejs`:n jo moduulitasolla, eivätkä ne ole repon riippuvuuksia (työnkulku
  asentaa ne), joten niitä ei voi käynnistää testissä. Niillä todiste on
  lähdekoodin järjestys: kielto **ennen** ensimmäistä `fetch`iä. Nämä kaksi ovat
  suoraan ylhäältä alas ajettavia skriptejä, joissa lähdekoodin järjestys ON
  suoritusjärjestys.

Lähdekoodin järjestystä **ei** väitetä todisteeksi niissä kolmessa putkessa,
joissa on `main()`: niissä API-kutsu asuu apufunktiossa, joka on tiedostossa
ennen `main()`ia, joten järjestys ei kertoisi mitään. Siellä todiste on ajaminen.

Loput kahdeksan vartiota: jaetun moduulin kieltologiikka, eräkohtainen avain ja
kelvottoman tunnuksen hylkäys, deterministinen reseptiin sidottu erätunnus,
kuitin sisältö ja se ettei siihen voi päätyä salaisuuksia, HEAD-varmistuksen
olemassaolo — sekä kolme putkikohtaista erikoistapausta: hihkaisujen hylätyt
otokset, avauksen vienti ennen häntätarkistusta ja siirtymämusiikin vienti ennen
loopin ompelua.

## 8. Portit

```
npm test                                → # pass 3365  # fail 2 (ks. alla)
node tools/tarkista-kaksoisavaimet.mjs  → ei kaksoisavaimia
node tools/tarkista-niputus.mjs         → 387 moduulia, 4221 julistusta, ei törmäyksiä
node tools/tarkista-savukkeet.mjs       → 1651 ui-viittausta, 405 metodia
yaml.safe_load kaikille 16 työnkululle  → kaikki jäsentyvät
```

**Molemmat failit ovat `tests/pollo.test.mjs`:n KUORMAVARTIOITA** — "indeksi
rakentuu ja on kokoluokaltaan järkevä" (`indeksointi kesti 2878 ms`) ja "haku on
nopea myös koko aineistolla". Ne ovat ajastusrajoja, eivät tämän erän muutos:

- Kontin kuorma mittaushetkellä oli **load average 50** ja **22 rinnakkaista
  `node --test`-prosessia** muiden agenttien worktreissä.
- Muutos ei koske `js/pallolauta/*`:aa, `js/kaupunkinosto.js`:ää eikä indeksointia
  lainkaan: kaikki muutetut tiedostot ovat ääniputkessa, sen testeissä tai
  kahdessa työnkulussa.
- Aiemmin samassa sarjassa (PR #2454) sama vartio meni läpi kevyemmällä kuormalla.

Kirjattu ajopaketin ohjeen mukaan (kuormavartiot saa kirjata).

**Yksi oikea testimuutos tehtiin** ja se on eri asia kuin yllä:
`tests/ihmisen-matka-luenta.test.mjs` vaati `haeApista`-kutsun **yhtenä
kirjaimellisena rivinä**, ja raakavientikansion lisääminen argumentteihin katkaisi
rivin kahtia. Odotus ei löystynyt vaan **kiristyi**: samat argumentit ja sama
`malli` vaaditaan yhä, mutta rivinvaihdoista riippumatta, ja lisäksi vaaditaan,
että raakavientikansio todella menee samalle kutsulle eikä erillistä reittiä
synny.

## 9. Mitä ei tehty

Ei ElevenLabs- eikä Lyria-kutsuja, ei veloittavia työnkulkuajoja, ei R2-vientiä.
**Ei muutoksia ulostulomuotoihin eikä käsittelyketjuihin** — ei bittinopeuksiin,
tasotavoitteisiin, leikkauksiin, häivytyksiin, loopin saumoihin, promptteihin,
ääniin, malleihin eikä vakauksiin. Ei pelin datan muutoksia, ei Raamattuun
kirjoittamista, ei versionostoa, ei mergeä, ei `dist/`-kansiota, ei
mediatiedostoja repoon, ei avaimia lokiin.

**Ei koskettu tehosteputkeen** (`tools/generoi-tehosteet.mjs`, PR #2454) eikä
pulun ääniputkeen (`tools/generoi-pulu.mjs`, jo mainissa) — ne ovat omissa
PR:issään, eikä tämä haara muuta kumpaakaan riviäkään.

## 10. Mitä seuraavaksi

Mitään vanhaa ei tarvitse ajaa uusiksi: sääntö koskee seuraavia ajoja. Jokainen
maksullinen ajo tästä eteenpäin jättää alkuperäisensä talteen, joten leikkaus-,
taso- ja saumapäätökset voi tehdä uudelleen ilmaiseksi.

Kun jokin näistä putkista seuraavan kerran ajetaan, kannattaa tarkistaa kuitista,
että `rawObjectKey` osoittaa oikeaan paikkaan ja että tiedosto vastaa HEADilla —
työkalu tekee sen itse, mutta ensimmäinen oikea ajo on silti se, joka näyttää
ketjun päästä päähän.
