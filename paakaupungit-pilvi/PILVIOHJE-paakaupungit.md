# Pääkaupungit täysiksi kaupungeiksi — pilviohje (tekstisisältö datana)

Omistaja 10.10.2026 klo 21.5x: *"onko kaikki maailman pääkaupungit jo tehty? jos ei niin tee niitä pilvessä"*.
Pelissä on 266 täyttä kaupunkia ja 118 kevyttä pääkaupunkipistettä (`js/packs/paakaupungit.js`,
kokoelma `paakaupungit`: nimi, 3–5 lauseen kuvaus, tunnusrakennukset, asukkaat; 115:llä 2 havainnekuvaa).
Tämä ohje tekee kevyestä pääkaupungista **täyden kaupungin tekstisisällön datana**: yksi tiedosto per
kaupunki, täsmälleen pelin lähdetaulujen muodossa. **Peliin ei viedä mitään tässä työssä**; integrointi
tehdään myöhemmin Macilla (luku 12).

Erät ja kaupungit: `paakaupungit-pilvi/erat.md`. Haara per erä: `paakaupungit-<erä>-pilvi`
(= origin/main + tämä kansio). Työkalu: `paakaupungit-pilvi/tyokalu.mjs` (liite A).

## 1. Rajat — tätä EI tehdä pilvessä

- Pelin tiedostoihin (`js/`, `tools/`, `tests/`, `docs/`, `assets/`, `sw.js`) ei kosketa. Kirjoitetaan vain
  kansioon `paakaupungit-pilvi/<erä>/`. Ei versionostoa, ei PR:ää, ei mergeä, ei `npm test` -ajoa.
- Ei tarinakaanonia (Päätoimittaja): ei isoisän matkakirjamerkintöjä, ei isoisän äänellä kirjoitettuja
  tietoja (`voice: 'isoisa'`), ei kohtaamisia, ei täkynostoja, ei fokusvirtaa, ei Pulun repliikkejä eikä
  Pulun Kysy-vastauksia.
- Ei generointia: ei havainnekuvia, ei miniatyyrejä, ei ääniä. Kuvat vain Wikimedia Commonsista.
- Ei laudan asioita: kaupungin x/y, nimiön paikka (la/lx/ly), lentokenttälippu, reitit, laattamäärät,
  maakoodit ja kohdekartan piirto tehdään Macilla.
- Ei avaimia eikä ämpäriä (niitä ei pilvessä ole).

## 2. Lue ensin (vain nämä, ei koko Raamattua)

1. Tämä ohje kokonaan (agentit vain heille merkityt luvut).
2. `docs/aasia-tyoaineisto/lehtityo-resepti.md` — SITOVA faktakuri, kuvasäännöt ja mitat. Pilvessä
   ohitetaan sen kohdat, jotka koskevat pakettitiedostojen muokkausta, worktreetä, testejä ja committia
   (tilalla tämän ohjeen luvut 6 ja 10).
3. `docs/moduulit/kaupunkilehti.md`: luvut "Mitat, jotka pitävät", "Kuvat" ja "Kolme vikaa, jotka
   toistuvat agenttien tuottamassa lehtityössä".
4. Euroopan ulkopuolella `docs/mantereet-tyoaineisto/spec-mantereet.md` kohta "Kaikkia kolmea lautaa
   koskevat linjaukset" (koskee kaikkia alueita) ja oman alueen kohta; Aasiassa lisäksi
   `docs/aasia-tyoaineisto/spec-asia.md` "Herkkien kohteiden linjaukset".
5. Mallit: faktapohjan rakenne `docs/mantereet-tyoaineisto/faktapohja-nairobi.md`; sisalto.json:n rakenne
   `node paakaupungit-pilvi/tyokalu.mjs malli dakar` (Dakar on pääkaupunki ja vakiomittainen kaupunki).
   Mallista otetaan RAKENNE, ei sisältöä eikä vanhoja tapoja (havainnekuvat eli `osoite`-kuvat,
   kuvailevat kuvatekstit, nelikappaleinen artikkeli, lähteettömät kysymykset, isoisän ääni tiedoissa);
   `tarkista`-komento näyttää mallissa juuri nämä virheinä.

## 3. Sisältö per kaupunki: pienin täysi kaupunki

Sama kokonaisuus kuin pelin vakiokaupungilla (187/266 kaupungilla on täsmälleen kansi + yksi teemasivu).

| Osio (sisalto.json) | Mitä | Mitat | Pelissä (lähdetaulu → kokoelma) |
|---|---|---|---|
| `kaupunki` | id, name, wiki, ambience, pallo | ambience laudan arvoista | `<pakka>.js` cities-rivi (Mac lisää x, y, la, lx, ly, airport) → `kaupungit` |
| `artikkeli` | etusivun leipäteksti ja Lue lisää | intro 7–10 virkettä, 700–1100 mrk, 2–3 kappaletta, 1–3 `**lihavointia**`; teksti 3 kappaletta, 600–1100 mrk | `<pakka>-artikkelit.js` [kaupunki.wiki] → `kaupungit.intro` |
| `kysymykset` | 5 tietovisakysymystä | taso 1 ja 3 mukana | `<PAKKA>_QUESTIONS[id]` → `kysymykset` |
| `tiedot` | 3 tiesitkö-tietoa | merkkijonoja, > 20 mrk | `<PAKKA>_FACTS[id]` → `paikkatiedot` |
| `valokuva` | matkakirjan valokuva (+ lisät) | 1 + 0–2 | `<PAKKA>_VALOKUVAT[id]` → `kuvakysymykset` |
| `kaupunkilehti` | kansi + 1 teemasivu | kansi: johdanto, 3 kansikuvaa, 4 nostoa, matkailijalle-opas (5 jaksoa); teemasivu: johdanto, minitehtävä, 4 nostoa; nosto 440–660 mrk | `KULTTUURI_KATEGORIAT[id]` → `kaupunkilehdet` |
| `kohdekartta` | nähtävyyskartan kohteet | esittely ≤ 400 mrk, rajaus, 6–8 kohdetta (rakennus, aukio, luonto) | `KAUPUNKIKARTAT[id]` (Mac piirtää kartan) → `kohdekartat` |
| `nahtavyydet` | juttu jokaiselle kohteelle | 2–3 kappaletta, 1–2 kuvaa | `NAHTAVYYSJUTUT[id]` → `nahtavyydet` |
| `saatiedot` | kuukausinormaalit | keskilampo[12], sade[12], luonnehdinta | `SAATIEDOT[id]` → `saatiedot` |
| `ehdotukset` | lentoasema ja huomiot Päätoimittajalle | — | ei peliin |

Kuvia noin 22 per kaupunki (kansi 3, nostot 8, matkailijalle 1, oppaan jaksot 3–5, kohteet 6–8,
valokuva 1). Avauskuvia (herokaruselli) ei tehdä: kevyen pisteen kaksi havainnekuvaa ovat jo olemassa
(paitsi Reykjavíkilla, Tunisilla ja Kottella).
Ennen–nyt-pari tehdään vain, jos isoisän aikainen PD-vedos ≥ 1200 px löytyy.

## 4. Sisältölinjaukset (SITOVAT)

1. **Faktat vain lähteistä.** Jokainen väite on faktapohjassa lähteineen (artikkeli, osio, hakupäivä).
   Lähteet: en-Wikipedia ensisijaisesti, fi-Wikipedia, Wikidata; oppaan käytännön tietoihin myös
   en.wikivoyage.org (ei hintoja eikä aukioloaikoja) ja matkustusturvallisuuteen um.fi. Ei muistinvaraisia
   faktoja.
2. **Ei matkaoppaiden pyöreitä lukuja eikä anekdootteja ilman lähdettä** (esim. "100 000 kävijää",
   "vero määräytyi julkisivun leveyden mukaan"). Luku tulee lähteestä tarkkana tai jää pois.
   Superlatiivi (suurin, ensimmäinen, vanhin, ainoa) vain jos lähde sanoo sen, ja silloin "lähteen mukaan".
3. **Ristiriitaiset vuodet ja luvut:** kirjoita "noin" tai "lähteiden mukaan" ilman tarkkaa väliä, tai
   kerro molemmat; ristiriita ja ratkaisu kirjataan faktapohjaan. Älä valitse yhtä lukua hiljaa.
4. **Asukasluku** vain `konteksti.json` → `kevytSisalto.asukkaat` (Sisältökirjurin tarkistama, vuosi
   mukana) tai lähteestä vuosineen.
5. **1873-kulma:** saa kertoa, mitä paikalla oli tai ei ollut isoisän matkavuonna 1873 ("isoisän
   matkavuonna 1873 …"). Jos kaupunkia ei ollut, sano se suoraan (Nairobi-malli). EI keksitä isoisän
   tekemisiä, merkintöjä, lainauksia eikä reittiä. Kartta elää nykyajassa: nykyiset kohteet ovat sallittuja.
6. **Ei nykysotaa, nykypolitiikkaa, vaaleja eikä nykyrikollisuutta.** Historia neutraalisti, ilman
   julmuuksien yksityiskohtia ja osapuolikehystä. Uskonto historiallis-kulttuurisena ilmiönä.
   Siirtomaahistoria tapahtumina, ei sankarikehystä kumpaankaan suuntaan. Asukkaat omina toimijoinaan,
   ei kurjuus- eikä eksotiikkakuvastoa (Perustuslaki, pilari 3).
7. **Kiistat:** Ramallah on Palestiinan hallinnon paikka, ei kannanottoa pääkaupunkikiistaan;
   hallinnollinen asema neutraalina tosiasiana ("Antaa olla" -linja).
8. **Opas on nykytietoa** ja sanoo suoraan, jos matkustaminen on nyt vaarallista tai rajoitettua
   (asiallisesti, lyhyesti, ilman viranomaisviittausta ja pelottelua).
9. **Älä toista pelin olemassa olevaa:** `konteksti.json` kertoo maalehden aiheet, lähellä olevien
   pelikaupunkien lehtien nostot ja lähinostojen tekstit. Sama tarina toisella kuvalla on toisto.
10. **Kieli:** hyvä yleiskieli, ei huutomerkkejä, ei metatekstiä ("tässä jutussa", "Wikipedian mukaan");
    "lähteen mukaan" saa olla leipätekstissä. Vieraskieliset nimet kirjoitusasussaan, suomennos mukaan.
11. **Kuvateksti kertoo kohteesta** (mitä se on, historia, merkitys), ei kuvan visuaalisesta sisällöstä;
    `lyhyt` ≤ 100 mrk, yksi virke, päättyy pisteeseen (pakollinen, kun `selite` > 100 mrk); `selite`
    1–2 virkettä. Kuvateksteissä ei lähdeviittauksia lukijalle.
12. **Minitehtävä** (teemasivu): vastaus löytyy saman sivun nostoista; ei toista kaupungin kysymyksiä;
    fakta ei ole nostovirke sanasta sanaan; ei mainitse palkkiota.

## 5. Kuvasäännöt (SITOVAT; täysi versio lehtityo-resepti.md)

- Vain Wikimedia Commons. Lisenssi ja koko AINA rajapinnasta: PD, CC0, CC BY, CC BY-SA (myös igo);
  EI NC, ND eikä fair use. Leveys ≥ 1200 px. Haku: `node paakaupungit-pilvi/tyokalu.mjs haku "<sanat>"`
  (tulostaa vain kelvolliset; myös `incategory:"<Commons-kategoria>"`).
- Lähderivi: `Tekijä, Wikimedia Commons (LISENSSI)`; valokuva-osiossa `Tekijä, Commons (LISENSSI)`.
  Tekijä sanatarkasti Commonsin Artist-kentästä (haku-komennon tekijäsarake); lisenssi `PD`, `CC0`,
  `CC BY 4.0`, `CC BY-SA 3.0` tai `CC BY-SA 3.0 igo`. Käyttäjänimen takaa ei arvata oikeaa nimeä.
- JOKAINEN valittu kuva katsotaan: `node paakaupungit-pilvi/tyokalu.mjs esikatselu "<tiedosto>"` ja
  tulostettu polku Read-työkalulla. Hylkää: tunnistettavat kasvot lähikuvassa, vesileimat, aikaleimat,
  kuvan päälle lisätyt tekstit tai kehykset, mainos- ja pakkauskuvat, epäterävät.
- Kansikuvat: 3 laajaa yleiskuvaa kaupungin eri puolilta (siluetti, aukio, ranta, maamerkki
  ympäristössään); ei yksityiskohta-, sisä-, ruoka- eikä esinekuvia.
- Matkailijalle-kuva: tuore, maltillinen pysty (leveys/korkeus 0,60–0,85), yksi aihe, paikan oma
  erikoisuus, selkeä valo. Oppaan kuvat tuoreita; historialliset kuvat kuuluvat nostoihin.
- Yksi tiedosto vain kerran per kaupunki (matkakirjan valokuva saa olla sama kuin ennen–nyt-pari).
  Pelissä jo käytettyä kuvaa ei valita (tarkistin varoittaa).
- Commons-hakuja tekee vain yksi agentti kerrallaan (429-riski).

## 6. Työnkulku

### 6.1 Vaihe 0 (pääsessio, kerran)

```sh
git fetch origin paakaupungit-<erä>-pilvi && git checkout paakaupungit-<erä>-pilvi
node paakaupungit-pilvi/tyokalu.mjs konteksti <erä> <id> <id> ...      # konteksti.json + saa-syote.json
node tools/hae-saaperusdata.mjs --tiedosto paakaupungit-pilvi/<erä>/saa-syote.json > paakaupungit-pilvi/<erä>/saa.txt
node paakaupungit-pilvi/tyokalu.mjs saa <erä>                           # <id>/saa.json
node paakaupungit-pilvi/tyokalu.mjs malli dakar > /tmp/malli-dakar.json # muotomalli agenteille
```

Jos Open-Meteo vastaa 429 tai ei vastaa: säärivi jää pois (`saatiedot: null`, Samarkand-malli), syy
TILANNE.md:hen, ja oppaan sääjakso kirjoitetaan Wikipedian ilmasto-osion varaan sen ääneen sanoen.
Luo `paakaupungit-pilvi/<erä>/TILANNE.md` (luku 10) ja tee commit + push.

### 6.2 Kaupunki kerrallaan

| Vaihe | Kuka | Tuotos | Kesto (arvio) |
|---|---|---|---|
| A faktapohja | agentti | `<id>/faktapohja.md` | 10–20 min |
| B kuvat | agentti (vain yksi B kerrallaan) | `<id>/kuvat.md` | 15–25 min |
| C kirjoitus | agentti | `<id>/sisalto.json`, tarkistin 0 virhettä | 10–20 min |
| D tarkistus | EI sama agentti kuin A tai C | `<id>/tarkistus.md` | 10–20 min |
| E korjaus | uusi agentti | sisalto.json korjattu, tarkistus.md:hen "Korjattu"-osio | 5–10 min |
| F pääsessio | pääsessio | `tarkista <erä> <id> --verkko --lyhyt` → 0 virhettä, TILANNE.md, commit + push | 2 min |

Rinnakkaisuus: enintään **2 agenttia** yhtä aikaa. Pidä toinen paikka Wikipedia-työssä (A tai D
seuraavalle kaupungille) ja toinen kuva- tai kirjoitustyössä (B tai C). B-vaiheita vain yksi kerrallaan.
Jos F:ssä jää virheitä, aja E uudelleen (enintään kaksi kierrosta); sitten kirjaa jäljelle jääneet
TILANNE.md:hen ja jatka. Pääsessio ei lue sisalto.json:ia itse (konteksti säästyy) — korjaukset tekee E.

### 6.3 Loppu

`node paakaupungit-pilvi/tyokalu.mjs tarkista <erä> --verkko > paakaupungit-pilvi/<erä>/tarkistus-kone.txt`,
sitten RAPORTTI.md (luku 11), commit + push.

## 7. sisalto.json — tarkka muoto

Jokainen osio on SELLAISENAAN se olio, joka menee pelin lähdetauluun (luku 3) ja josta vienti tekee
kokoelman alkion `data`-kentän. Kenttien nimet ja tyypit kuten `malli dakar` -tulosteessa. Ei muita
kenttiä kuin alla. Tekstit ovat JSON-merkkijonoja (kappaleraja `\n\n`, ei `+`-jatkoja). Alla on kaava
(ei sellaisenaan kelpaavaa JSONia: `…` = täydennä, listoissa on yksi esimerkkialkio).

```text
{
 "$skeema": "matkakirja-paakaupunki/1",
 "id": "<id>", "maa": "<ISO3>", "era": "<erä>",
 "kaupunki": { "id": "<id>", "name": "<suomenkielinen nimi>", "wiki": "<konteksti.json wiki.ehdotus tai fi-Wikipedian otsikko>",
   "ambience": "<kaupunki|satama|meri|basaari|aavikko|vuoristo|ylanko|savanni|sademetsa|metsa|pohjoinen>",
   "pallo": { "lat": 0.0, "lon": 0.0 } },
 "artikkeli": { "intro": "<7–10 virkettä>", "teksti": "<kappale>\n\n<kappale>\n\n<kappale>" },
 "kysymykset": [ { "q": "<kysymys?>", "options": ["<oikea>", "<väärä>", "<väärä>", "<väärä>"], "correct": 0,
   "level": 1, "hint": "<vihje, ei paljasta>", "fact": "<1–2 virkettä>", "source": "https://en.wikipedia.org/wiki/<Artikkeli>" } ],
 "tiedot": [ "<tieto 1>", "<tieto 2>", "<tieto 3>" ],
 "valokuva": { "tiedosto": "<Commons-nimi>", "vuosi": "<vuosi>", "lahde": "<Tekijä>, Commons (<LISENSSI>)",
   "lyhyt": "<≤ 100 mrk.>", "selite": "<1–2 virkettä>",
   "uusi": { "tiedosto": "…", "lahde": "…", "lyhyt": "…", "selite": "…" },
   "lisat": [ { "tiedosto": "…", "vuosi": "…", "lahde": "…", "lyhyt": "…", "selite": "…" } ] },
 "kaupunkilehti": [
  { "id": "kaupunki", "nimi": "<Kaupunki>", "johdanto": "<1–2 virkettä>",
    "kansikuvat": [ { "tiedosto": "…", "lyhyt": "…", "selite": "…", "lahde": "<Tekijä>, Wikimedia Commons (<LISENSSI>)" } ],
    "ennenNyt": [ { "tiedosto": "…", "vuosi": "1890", "lyhyt": "…", "selite": "…", "lahde": "…" }, { "tiedosto": "…", "lyhyt": "…", "selite": "…", "lahde": "…" } ],
    "nostot": [ { "otsikko": "…", "teksti": "<440–660 mrk>", "tiedosto": "…", "lyhyt": "…", "selite": "…", "lahde": "…", "wiki": "<en- tai fi-otsikko>" } ],
    "matkailijalle": {
      "kuva": { "tiedosto": "…", "lyhyt": "…", "selite": "…", "lahde": "…" },
      "kappale": "<4–7 virkettä nykytietoa>",
      "artikkeli": { "nimi": "Matkailijan <Kaupunki>", "taitto": "opas", "teksti": "<1 kutsuva virke>", "nosto": "<1–2 virkettä>",
        "jaksot": [ { "otsikko": "Perille ja liikkeelle", "teksti": "…", "kuva": { "tiedosto": "…", "lyhyt": "…", "selite": "…", "lahde": "…" } } ],
        "matkailu": { "parasta": [ { "mita": "…", "tahdet": 3, "selite": "<1 virke>" } ],
                      "hyvaTietaa": [ { "otsikko": "…", "teksti": "<1–2 virkettä>" } ] },
        "lahde": "Wikipedia" } } },
  { "id": "<historia|kuvataide|kirjallisuus|musiikki|ruoka|luonto|tiede|nykytaide|huumori>", "nimi": "<sivun nimi>",
    "johdanto": "<1–2 virkettä>",
    "tehtava": { "kysymys": "…?", "vaihtoehdot": ["<oikea>", "…", "…", "…"], "oikea": 0, "fakta": "…" },
    "nostot": [ { "otsikko": "…", "teksti": "…", "tiedosto": "…", "lyhyt": "…", "selite": "…", "lahde": "…", "wiki": "…" } ] } ],
 "kohdekartta": { "numeroympyrat": true, "esittely": "<2–3 virkettä, ei kartan kuvailua>",
   "rajat": { "pohjoinen": 0.0, "etela": 0.0, "lansi": 0.0, "ita": 0.0 },
   "kohteet": [ { "nimi": "<suomeksi, sama kuin nahtavyydet-avain>", "lat": 0.0, "lon": 0.0 },
                { "nimi": "…", "tyyppi": "aukio", "lat": 0.0, "lon": 0.0 } ] },
 "nahtavyydet": { "<kohteen nimi>": { "aika": "<esim. 1880–1902 tai 1200-luku>", "teksti": "<2–3 kappaletta>",
   "kuvat": [ { "tiedosto": "…", "lyhyt": "…", "selite": "…", "lahde": "…" } ], "lahde": "Wikipedia" } },
 "saatiedot": { "lat": 0.0, "lon": 0.0, "keskilampo": [12 lukua], "sade": [12 lukua], "luonnehdinta": "<2–3 lausetta näistä luvuista>" },
 "ehdotukset": { "lentoasema": "<Nimi (IATA)> tai null", "huomiot": ["<Päätoimittajalle, esim. kevyen pisteen kuvauksen virhe lähteineen>"] }
}
```

Tarkennukset:

- `kaupunki.wiki` on artikkeliavain ja Lue lisää -haun otsikko: fi-Wikipedian otsikko; jos se on jo
  varattu (maan nimi tai olemassa oleva avain), `konteksti.json` → `wiki.ehdotus` (muoto "X (kaupunki)",
  vrt. "Luxemburg (kaupunki)"). Otsikon on löydyttävä fi- tai en-Wikipediasta (tarkistin `--verkko`).
- `ambience` kuvaa äänimaisemaa: suurkaupunki `kaupunki`, satamakaupunki `satama`, saari tai rannikko
  `meri`, Lähi-idän tai Pohjois-Afrikan kaupunki `basaari`, muut maiseman mukaan.
- `pallo` = `konteksti.json` lat/lon (kevyen pisteen Wikidata-sijainti).
- `kysymykset`: oikea vastaus mieluiten indeksissä 0 (peli sekoittaa); väärät uskottavia ja suunnilleen
  saman mittaisia (oikea ei saa olla selvästi pisin); vähintään yksi `level` 1 ja yksi 3; oikea vastaus ei
  ole toisen pelikaupungin nimi.
- `tiedot`: nuoren matkaajan havaintoja ilman isoisää; isoisän rivi lisätään Macilla.
- `valokuva`: jos isoisän aikainen PD-vedos (≤ 1900, ≥ 1200 px) löytyy, se on päätiedosto `vuosi`neen ja
  nykykuva `uusi`; muuten päätiedosto on nykykuva eikä `uusi`-kenttää ole.
- `kaupunkilehti`: kansi (`id: "kaupunki"`) ensin, ei minitehtävää kannella. Teemasivun `id` on
  vakioaihe; `nimi` saa olla oma ("Puisto kaupungin rajalla"). Teemasivulla ei `otsikko`-kenttää.
  `ennenNyt` vain jos pari löytyy, muuten kenttä pois. Oppaassa 5 jaksoa, joista enintään 2 kuvatonta;
  suositusjärjestys: Perille ja liikkeelle · nähtävää (1–2 jaksoa) · Mitä täällä syödään · Milloin
  kannattaa tulla (sää `saatiedot`-luvuista tai Wikipedian ilmasto-osiosta, ja se sanotaan).
  `parasta` 5 riviä (`tahdet` 1–3), `hyvaTietaa` 3–4 riviä (rehellisiä varauksia ilman pelottelua).
- `kohdekartta`: kohteet historiallisesta ytimestä (ei hallinnollisesta pisteestä); 6–8 kohdetta,
  pienissä pääkaupungeissa 1–5 perustellen (RAPORTTI.md), enintään 15. Vain paikat: rakennus (oletus,
  ei `tyyppi`-kenttää), `aukio`, `luonto`; ei taideteoksia, esineitä, henkilöitä eikä tapahtumia.
  Koordinaatit 5 desimaalilla Wikipedian koordinaateista tai Wikidatan P625:stä (lähde faktapohjaan).
  `rajat` kattaa kaikki kohteet noin 300 m marginaalilla. Kartan kuvaa, `polku`a, `varikartta`a,
  `piirtoRajat`ia eikä `lahde`-kenttää kirjoiteta (Mac).
- `nahtavyydet`: avain täsmälleen kohteen `nimi`. Teksti kertoo mitä kohde on, sen historian ja
  miltä se näytti (tai ettei sitä vielä ollut) 1873; 700–1400 mrk. `kuvat` 1–2.
- `saatiedot`: lat/lon/keskilampo/sade sellaisenaan `<id>/saa.json`:sta; `luonnehdinta` kirjoitetaan
  vain näistä luvuista (2–3 lausetta). Ilman säädataa `null`.

## 8. Agenttien kehotteet

Pääsessio täyttää `<erä>`, `<id>`, `<NIMI>`, `<ISO3>` ja käynnistää: Agent-työkalu, `model: "sonnet"`,
`effort: "low"`. Kaikki agentit: työhakemisto on repon juuri; älä kirjoita muita tiedostoja kuin
mainitut; lähteet tallennetaan tiedostoihin eikä kontekstiin (`tyokalu.mjs lahde` tallentaa
tmp-kansioon), ja niistä luetaan vain tarvittavat kohdat (`grep -n`, `sed -n`).

**A — faktapohja**

> Olet Matkakirja-pelin faktakokoaja. Kaupunki <NIMI> (id <id>, maa <ISO3>), erä <erä>. Lue
> paakaupungit-pilvi/<erä>/<id>/konteksti.json, paakaupungit-pilvi/PILVIOHJE-paakaupungit.md luvut 3, 4
> ja 7 sekä rakenteen malliksi docs/mantereet-tyoaineisto/faktapohja-nairobi.md (vain rakenne).
> Hae lähteet: `node paakaupungit-pilvi/tyokalu.mjs lahde en "<otsikko>"` (myös fi) — tulostaa
> tiedostopolun, Wikidata-tunnuksen, koordinaatit ja väliotsikot; lue tiedostosta vain tarvittavat
> kohdat. Lue kaupungin pääartikkeli, historia-artikkeli jos on, ja jokaisen ehdotetun kohteen artikkeli.
> Kirjoita paakaupungit-pilvi/<erä>/<id>/faktapohja.md: 0) luetut lähteet (otsikko, kieli, hakupäivä)
> ja 1873-kehys lähteineen (oliko kaupunkia, mitä paikalla oli); 1) perusfaktat (sijainti, synty, nimi,
> asema; asukasluku vain konteksti.json:sta); 2) kansi: johdantoehdotus ja 4 nostoaihetta, kustakin 4–8
> faktaa lähteineen ja wiki-otsikko; 3) teemasivu: vakioaihe, nimi, johdanto ja 4 nostoaihetta faktoineen
> sekä minitehtävän aihe; 4) opas: 5 jaksoa faktoineen, parasta 5, hyvä tietää 3–4, lentoasema (nimi,
> IATA) ja matkustusturvallisuus, jos poikkeava; 5) kohdekartta: 6–8 kohdetta (rakennus, aukio, luonto)
> historiallisesta ytimestä: suomenkielinen nimi, tyyppi, lat/lon 5 desimaalia + lähde, aika ja 6–10
> faktaa lähteineen, sekä ehdotettu rajaus; 6) 5 kysymysaihetta (taso 1–3) ja 3 tietoa lähteineen;
> 7) kuvatarpeet: kohta, aihe sanoin, hakusanat tai Commons-kategoria (kansikuvat 3, nostot 8,
> matkailijalle 1 pysty, oppaan jaksot 3–5, kohteet 1 per kohde, valokuva 1, ennen–nyt-pari jos
> mahdollinen); 8) ristiriidat ja epävarmat (lähde vastaan lähde, ratkaisuehdotus "noin" tai molemmat);
> 9) poisjätetyt aiheet syineen (nykypolitiikka, toisto pelin olemassa olevan kanssa konteksti.json:n
> perusteella). Vain lähteestä luettua; ei pyöreitä matkaopasukuja. Vastaa lopuksi yhdellä rivillä.

**B — kuvat**

> Olet Matkakirja-pelin kuvatoimittaja. Kaupunki <NIMI> (id <id>), erä <erä>. Lue
> paakaupungit-pilvi/PILVIOHJE-paakaupungit.md luku 5, paakaupungit-pilvi/<erä>/<id>/faktapohja.md
> (erityisesti kohta 7) ja konteksti.json. Hae ehdokkaat: `node paakaupungit-pilvi/tyokalu.mjs haku
> "<hakusanat>" 15` tai `haku 'incategory:"<kategoria>"'` (vain kelvolliset: ≥ 1200 px, PD/CC0/CC BY/
> CC BY-SA). Katso JOKAINEN valittu kuva: `node paakaupungit-pilvi/tyokalu.mjs esikatselu "<tiedosto>"`
> ja avaa polku Read-työkalulla. Kirjoita paakaupungit-pilvi/<erä>/<id>/kuvat.md: taulukko kohta |
> tiedosto (tarkka Commons-nimi ilman File:) | leveys×korkeus | lisenssi | lähderivi valmiina
> ("<Artist sellaisenaan>, Wikimedia Commons (<LISENSSI>)") | mitä kuvassa näkyy omin sanoin | vuosi
> (vanhoille); sitten HYLÄTYT (tiedosto + syy). Kansikuvat 3 laajaa yleiskuvaa eri puolilta;
> matkailijalle-kuva maltillinen pysty (0,60–0,85); yksi tiedosto vain kerran; ei kuvia, jotka ovat jo
> pelissä (`grep -rlF "<tiedosto>" js/packs/`). Älä kirjoita lukijan kuvatekstejä. Vastaa yhdellä rivillä.

**C — kirjoitus**

> Olet Matkakirja-pelin lehtikirjoittaja. Kaupunki <NIMI> (id <id>, maa <ISO3>), erä <erä>. Lue
> paakaupungit-pilvi/PILVIOHJE-paakaupungit.md luvut 3, 4 ja 7; docs/aasia-tyoaineisto/lehtityo-resepti.md
> kohta Mitat; /tmp/malli-dakar.json (vain rakenne); faktapohja.md, kuvat.md ja <id>/saa.json (jos on).
> Kirjoita paakaupungit-pilvi/<erä>/<id>/sisalto.json luvun 7 muodossa. Vain faktapohjan faktoja; kuvat
> vain kuvat.md:n valituista (tiedosto ja lähderivi sanatarkasti). Kuvatekstit kertovat kohteesta, eivät
> kuvasta. Aja `node paakaupungit-pilvi/tyokalu.mjs tarkista <erä> <id>` ja korjaa, kunnes virheitä on 0;
> korjaa varoitukset, kun se on järkevää. Vastaa: virheet, varoitukset ja korjaamatta jätetyt varoitukset
> syineen (lyhyesti).

**D — riippumaton tarkistus (eri agentti kuin A ja C)**

> Olet Matkakirja-pelin riippumaton faktantarkistaja. Oleta, että jotain on pielessä. Kaupunki <NIMI>
> (id <id>), erä <erä>. Lue paakaupungit-pilvi/<erä>/<id>/sisalto.json ja kuvat.md sekä
> paakaupungit-pilvi/PILVIOHJE-paakaupungit.md luku 4. Tarkista lähteestä itse (`node
> paakaupungit-pilvi/tyokalu.mjs lahde en|fi "<otsikko>"`; älä luota faktapohjaan): jokainen vuosiluku,
> luku, nimi, superlatiivi ja syy-yhteys; kaikki kysymykset, tiedot ja minitehtävä (vastaus löytyy saman
> sivun nostoista, ei toista kysymyksiä, fakta ei ole nostovirke sanasta sanaan); 1873-väitteet;
> nykypolitiikka ja sota; kuvateksti vastaa kuvat.md:n "mitä kuvassa näkyy" -kuvausta ja kertoo kohteesta;
> kohteen koordinaatti osuu kohteeseen; kysymysten vihjeet eivät paljasta vastausta eikä oikea ole
> pisin. Kirjoita paakaupungit-pilvi/<erä>/<id>/tarkistus.md: taulukko JSON-polku | väite | lähde
> (artikkeli + osio) | OK / VÄÄRIN / EPÄVARMA | tarkka korvaava teksti. Älä muokkaa sisalto.json:ia.
> Vastaa: VÄÄRIN n, EPÄVARMA n.

**E — korjaus**

> Olet Matkakirja-pelin korjaaja. Kaupunki <NIMI> (id <id>), erä <erä>. Lue
> paakaupungit-pilvi/<erä>/<id>/tarkistus.md ja tee sisalto.json:iin jokainen VÄÄRIN-korjaus sanatarkasti;
> EPÄVARMA-kohdat pehmennä ("noin", "lähteen mukaan") tai poista väite. Aja `node
> paakaupungit-pilvi/tyokalu.mjs tarkista <erä> <id> --verkko` ja korjaa, kunnes virheitä on 0 (kuvan
> vaihto vain kuvat.md:n hylkäämättömistä tai uudella `haku`+`esikatselu`-tarkistuksella, kirjaa
> kuvat.md:hen). Lisää tarkistus.md:n loppuun osio "Korjattu" (mitä muutettiin). Vastaa yhdellä rivillä.

## 9. Tarkistukset

`node paakaupungit-pilvi/tyokalu.mjs tarkista <erä> [<id>] [--verkko] [--lyhyt]` — VIRHE pitää korjata
(lopetuskoodi 1), VAROITUS luetaan ja korjataan tai perustellaan RAPORTTI.md:ssä.

- Rakenne: osiot, id = kansio, `kaupunki`-rivi, ambience laudan arvoista, wiki ei törmää olemassa
  olevaan artikkeliavaimeen eikä maan avaimeen, pallo lähellä kevyttä pistettä.
- Artikkeli: intro 600–1200 mrk (varoitus alle 700 tai yli 1100), 2–3 kappaletta, 7–10 virkettä,
  1–3 lihavointia; teksti 3 kappaletta ja 600–1100 mrk; ei huutomerkkejä.
- Kysymykset (≥ 2, tavoite 5): neljä eri vaihtoehtoa, correct 0–3, level 1–3, hint ja fact, vihje ei
  paljasta vastausta, source https; varoitus, jos taso 1 tai 3 puuttuu tai oikea on selvästi pisin.
  Tiedot: merkkijonoja (≥ 2, tavoite 3), yli 20 mrk, ei kaksoiskappaleita.
- Kaupunkilehti: kansi ensin, 3 kansikuvaa, 4 nostoa, ei tehtävää kannella; opas (nimi, taitto,
  5 jaksoa, ≤ 2 kuvatonta); teemasivu vakioaiheella, minitehtävä (4 eri vaihtoehtoa, ei palkkiosanoja),
  4–7 nostoa; nosto 440–660 mrk (virhe alle 350 tai yli 800).
- Kuvat: tiedosto, lähderivin muoto ja tekijä, selite, `lyhyt` (≤ 100 mrk, piste) kun selite > 100,
  ei havainnekuvia, sama tiedosto vain kerran; varoitus, jos kuva on jo pelissä.
- Kohdekartta: esittely, rajat, 1–15 kohdetta (varoitus alle 6), tyyppi rakennus/aukio/luonto, kohde
  rajauksen sisällä ja alle 12 km pisteestä; jokaisella kohteella juttu ja jokaisella jutulla kohde;
  juttu ≥ 400 mrk, 1–3 kuvaa, lahde "Wikipedia".
- Säätiedot: 12 + 12 lukua (varoitus, jos puuttuu).
- Tekstit: paikkamerkit (TÄYTÄ, TODO), ä/ö puuttuu pitkästä tekstistä (ascii-suomi), pyöreät luvut
  (≥ 4 loppunollaa, "noin miljoona") varoituksena, huutomerkit.
- `--verkko`: Commons-tiedosto on olemassa, leveys ≥ 1200, lisenssi kelpaa ja vastaa lähderiviä,
  tekijä vastaa Artist-kenttää (varoitus); jokainen wiki-otsikko löytyy fi- tai en-Wikipediasta.

Kone ei tarkista faktoja: siksi vaihe D on pakollinen jokaiselle kaupungille.

## 10. Git, TILANNE.md ja keskeytys

- Commit + push jokaisen vaiheen jälkeen (`git add paakaupungit-pilvi/<erä>/` — ei muuta), viesti
  `Pääkaupungit <erä>: <id> <vaihe>` (esim. "Pääkaupungit e01: zagreb faktapohja"). Push vain omaan
  haaraan; jos push hylätään, `git pull --rebase origin paakaupungit-<erä>-pilvi` ja uudelleen.
  Ei koskaan mergeä mainiin, ei PR:ää, ei force-pushia, ei muita haaroja.
- `TILANNE.md`: taulukko id | A | B | C | D | E | F | huomio, merkinnät ✓ / kesken / ESTE: syy, ja
  ylärivillä viimeisin päivitys (`date`). Pääsessio päivittää sen jokaisen vaiheen jälkeen.
- Jos jokin estää (lähde ei vastaa, kuvia ei löydy), kirjaa ESTE ja jatka seuraavaan kaupunkiin.
- Kulutusmittari: kahden ensimmäisen kaupungin jälkeen kirjaa TILANNE.md:n ylälaitaan agenttien tokenit
  yhteensä ja kesto tähän asti (Agent-työkalun ilmoittamat), jotta Päätoimittaja näkee kulutuksen ajoissa.
- Jatkosessio (jos ajo pysähtyy): Päätoimittaja tekee haaran `paakaupungit-<erä>-pilvi-b` edellisen
  haaran kärjestä; jatkosessio ajaa ensin `node paakaupungit-pilvi/tyokalu.mjs malli dakar >
  /tmp/malli-dakar.json`, lukee TILANNE.md:n ja jatkaa ensimmäisestä keskeneräisestä vaiheesta.

## 11. RAPORTTI.md (paakaupungit-pilvi/<erä>/RAPORTTI.md)

1. Erä, haara, alku- ja loppuaika (`date`), kesto, agenttiajojen määrä ja tokenit yhteensä
   (Agent-työkalun ilmoittamat; erittely vaiheittain A–E).
2. Taulukko per kaupunki: intro mrk · nostoja · kohteita/juttuja · kuvia (valittu/hylätty) ·
   kysymykset/tiedot · säärivi · D: VÄÄRIN/EPÄVARMA → korjattu · tarkistin: virheet/varoitukset.
3. Korjaamatta jätetyt varoitukset perusteluineen (tarkistus-kone.txt).
4. Poisjätetyt aiheet ja syyt; pienten kaupunkien alle 6 kohteen perustelut.
5. Kevyen pisteen (paakaupungit.js) havaitut virheet lähteineen ja muut huomiot Päätoimittajalle.
6. Avoimet kysymykset (enintään 5).

## 12. Päätoimittajalle (Macilla)

**Valmistelu ja käynnistys.** `sh scratchpad/paakaupungit-pilvi/tee-paakaupunki-ohje.sh <erä>`
tekee haaran `paakaupungit-<erä>-pilvi` (= origin/main + kansio `paakaupungit-pilvi/`: tämä ohje,
tyokalu.mjs ja erat.md; työhakemistoon ei kosketa) ja kirjoittaa kehotteen
`scratchpad/paakaupungit-pilvi/kehote-<erä>.md`. Käynnistys sovelluksesta (Uusi → Pilvi → Default,
Network access = Full → repo → malli Sonnet → kehote) tai `claude --model claude-sonnet-5-5 --cloud
"$(cat kehote-<erä>.md)"`. Ensin e01 pilottina; seuraavat vasta pilotin pistokokeen jälkeen.
Haara on jo olemassa → skripti pysähtyy (jatkosessio tehdään `-b`-haaraan käsin, luku 10).

**Seuranta.** Commit tulee 10–25 minuutin välein. 20 min ilman committia → jatko-ohje; 30 min →
jatkosessio haaraan `-b` (luku 10). Pistokoe ennen jatkoa: 3 nostoa ja 3 kuvaa per kaupunki.

**Jälkityö Macilla (ei pilvessä), kun sisältö on hyväksytty:**

1. Päätös kytkennästä: pelikaupunki (pysäkki, reitit, 60 lautayksikön väli — moni pääkaupunki ei mahdu,
   ks. erat.md) vai kevyt piste, jonka kortista aukeaa lehti (vaatii koodia: lehti avautuu nyt laudan
   kaupungista `openArrival`-kutsulla, ja kohdekartan avaimen on oltava laudan kaupunki-id,
   `tests/lehdet.test.mjs`).
2. Kopio tauluihin: `artikkeli` → `<pakka>-artikkelit.js`, `kysymykset`/`tiedot` → `<pakka>-questions.js`,
   `valokuva` → `<pakka>-valokuvat.js`, `kaupunkilehti` → `kulttuuri-kategoriat.js`, `kohdekartta` →
   `maakartat.js` KAUPUNKIKARTAT, `nahtavyydet` → `nahtavyysjutut.js`, `saatiedot` → `saatiedot.js`;
   faktapohjan lähderivit lohkokommenteiksi. ÄLÄ käytä `tools/kirjoita-kategoriat.mjs`:ää: se sarjallistaa
   koko tiedoston uudelleen ja pudottaa kansikuvat, matkailijalle- ja tehtävä-kentät kaikilta kaupungeilta.
3. Laudan rivi (x, y, la/lx/ly, airport), reitit, laattamäärät, cityCountry; kohdekartan piirto
   (`tools/piirra-kaupunkikartta.mjs`, `tools/tarkista-karttapisteet.mjs`); säärivin ylin/alin
   (`tools/hae-saanormaalit.mjs --vain <id>`).
4. Päätoimittajan osuudet: isoisän tieto, saapumisteksti tai Euroopan fokusvirta (tai KAARETTOMAT-lista
   omistajan linjauksella), kulttuurivisa; maille ilman pelikaupunkia radio, paikallisaarteet,
   kaupunkimusiikin alue ja uutislähde; äänet; Pulun Kysy-vastaukset integroinnin jälkeen.
5. `npm test` ja tavallinen julkaisukaava.

## Liite A: tyokalu.mjs (sanatarkasti sama kuin haarassa)

Haarassa tiedosto on valmiina. Jos se puuttuu, kirjoita se tästä sanatarkasti polkuun
`paakaupungit-pilvi/tyokalu.mjs` ja aja `node --check paakaupungit-pilvi/tyokalu.mjs`.

```js
#!/usr/bin/env node
/*
 * PÄÄKAUPUNKIEN PILVITYÖKALU — paakaupungit-pilvi/tyokalu.mjs
 *
 *   node paakaupungit-pilvi/tyokalu.mjs konteksti <erä> <id> [<id> ...]
 *   node paakaupungit-pilvi/tyokalu.mjs malli <laudan-kaupunki-id>
 *   node paakaupungit-pilvi/tyokalu.mjs saa <erä>
 *   node paakaupungit-pilvi/tyokalu.mjs tarkista <erä> [<id> ...] [--verkko] [--malli] [--lyhyt]
 *   node paakaupungit-pilvi/tyokalu.mjs lahde <en|fi> "<Wikipedia-otsikko>"
 *   node paakaupungit-pilvi/tyokalu.mjs haku "<Commons-haku>" [määrä]
 *   node paakaupungit-pilvi/tyokalu.mjs esikatselu "<Commons-tiedosto>"
 *
 * Ajetaan repon juuresta, Node 20+, ei riippuvuuksia. Lukee pelin paketit
 * (js/packs/*.js) VAIN lukemiseen ja kirjoittaa vain kansioon
 * paakaupungit-pilvi/<erä>/ (lahde ja esikatselu: tmp-kansioon matkakirja-lahteet, matkakirja-kuvat).
 * Ohje: paakaupungit-pilvi/PILVIOHJE-paakaupungit.md.
 *
 *   lahde      Wikipedian tekstiote tiedostoon (ei kontekstiin): tulostaa polun,
 *              pituuden, Wikidata-tunnuksen, koordinaatit ja väliotsikot. Lue
 *              tiedostosta vain tarvitsemasi kohdat (grep -n, sed -n).
 *   haku       Commons-haku (myös incategory:"…"): vain kelvolliset ehdokkaat
 *              (leveys >= 1200, PD/CC0/CC BY/CC BY-SA, kuva) riveinä
 *              leveys×korkeus | lisenssi | tekijä | päiväys | tiedosto.
 *   esikatselu lataa 900 px esikatselun ja tulostaa polun (avaa Read-työkalulla).
 *
 *   konteksti  kirjoittaa <erä>/<id>/konteksti.json (pelin nykyinen aineisto,
 *              jota EI saa toistaa) ja <erä>/saa-syote.json
 *              (tools/hae-saaperusdata.mjs --tiedosto).
 *   malli      tulostaa olemassa olevan laudan kaupungin samassa muodossa kuin
 *              sisalto.json (esim. dakar, fes) — muotomalli kirjoittajalle.
 *   saa        jäsentää <erä>/saa.txt:n (hae-saaperusdata.mjs:n tuloste)
 *              tiedostoiksi <erä>/<id>/saa.json.
 *   tarkista   <erä>/<id>/sisalto.json: VIRHE = korjattava (exit 1),
 *              VAROITUS = luetaan ja perustellaan RAPORTTI.md:ssä.
 *              --verkko: Commons (olemassa, leveys >= 1200, lisenssi, tekijä)
 *              ja wiki-otsikot (fi tai en). --malli: ohittaa pääkaupunkiehdot.
 *              --lyhyt: vain virheet ja määrät (pääsessiolle).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const [komento, ...argit] = process.argv.slice(2);
const VERKKO = argit.includes('--verkko') || ['konteksti', 'lahde', 'haku', 'esikatselu'].includes(komento);
// Konttiympäristössä Noden fetch tarvitsee NODE_USE_ENV_PROXY=1 (sama kuin tools/hae-saaperusdata.mjs).
if (VERKKO && !process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, process.argv.slice(1), {
    stdio: 'inherit', env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const TYOKANSIO = dirname(fileURLToPath(import.meta.url));
const JUURI = join(TYOKANSIO, '..');
const tuo = (polku) => import(pathToFileURL(join(JUURI, polku)).href);
const UA = { 'User-Agent': 'Matkakirja-pilviajo/1.0 (https://github.com/ravelius/Matkakirja)' };
const PAKAT = ['europe', 'africa', 'asia', 'middleeast', 'northamerica', 'southamerica', 'oceania'];
const VAKIOAIHEET = ['historia', 'kuvataide', 'kirjallisuus', 'musiikki', 'ruoka', 'luonto', 'tiede', 'nykytaide', 'huumori'];
const KARTTATYYPIT = ['rakennus', 'aukio', 'luonto'];
const OSIOT = ['kaupunki', 'artikkeli', 'kysymykset', 'tiedot', 'valokuva', 'kaupunkilehti', 'kohdekartta', 'nahtavyydet'];
const LAHDE_RE = /^(.+), (?:Wikimedia )?Commons \((PD|CC0|CC BY(?:-SA)? \d\.\d(?: [Ii][Gg][Oo])?)\)$/;

async function taulut(nimi, vienti) {
  const ulos = {};
  for (const p of PAKAT) {
    const polku = `js/packs/${p}-${nimi}.js`;
    if (!existsSync(join(JUURI, polku))) continue;
    const m = await tuo(polku);
    for (const [avain, arvo] of Object.entries(m)) if (vienti(avain)) ulos[p] = arvo;
  }
  return ulos;
}
const artikkelit = () => taulut('artikkelit', (a) => a.endsWith('ARTIKKELIT'));
const kysymystaulut = () => taulut('questions', (a) => a.endsWith('_QUESTIONS'));
const tietotaulut = () => taulut('questions', (a) => a.endsWith('_FACTS'));
const valokuvataulut = () => taulut('valokuvat', (a) => a.endsWith('_VALOKUVAT'));

async function lauta() {
  const { MAAILMANKARTTA } = await tuo('js/packs/maailmankartta.js');
  const { PALLON_KAUPUNKIPISTEET } = await tuo('js/packs/maailmankartta-pallopisteet.js');
  const { laudaltaAsteiksi } = await tuo('js/fokusmitat.js');
  const kaupungit = MAAILMANKARTTA.cities.map((c) => {
    const p = c.pallo ?? PALLON_KAUPUNKIPISTEET[c.id] ?? laudaltaAsteiksi('maailmankartta', c.x, c.y);
    return { ...c, lat: p?.lat ?? null, lon: p?.lon ?? null, maa: MAAILMANKARTTA.map.cityCountry?.[c.id] ?? null };
  });
  return { P: MAAILMANKARTTA, kaupungit };
}
const km = (a, b) => {
  const r = Math.PI / 180;
  const h = Math.sin(((b.lat - a.lat) * r) / 2) ** 2
    + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lon - a.lon) * r) / 2) ** 2;
  return Math.round(12742 * Math.asin(Math.sqrt(h)));
};
const otsikot = (aiheet) => (aiheet ?? []).map((a) => ({ id: a.id, nimi: a.nimi, nostot: (a.nostot ?? []).map((n) => n.otsikko) }));

async function haeJson(url) {
  for (let yritys = 1; ; yritys += 1) {
    try {
      const v = await fetch(url, { headers: UA, signal: AbortSignal.timeout(60000) });
      if (v.status === 429 || v.status >= 500) throw new Error(`HTTP ${v.status}`);
      if (!v.ok) throw new Error(`HTTP ${v.status} (ei uusita)`);
      return await v.json();
    } catch (e) {
      if (yritys >= 6 || /ei uusita/.test(e.message)) throw e;
      await new Promise((r) => setTimeout(r, 2000 * 2 ** yritys));
    }
  }
}

/* ------------------------------------------------------------ konteksti */

async function konteksti(era, idt) {
  if (!era || !idt.length) throw new Error('käyttö: konteksti <erä> <id> [<id> ...]');
  const { PAAKAUPUNKIPISTEET, MAIDEN_PERUSTIEDOT } = await tuo('js/packs/paakaupungit.js');
  const { MAA_KATEGORIAT } = await tuo('js/packs/maa-kategoriat.js');
  const { KULTTUURI_KATEGORIAT } = await tuo('js/packs/kulttuuri-kategoriat.js');
  const { KAUPUNKIKARTAT } = await tuo('js/packs/maakartat.js');
  const { P, kaupungit } = await lauta();
  const art = await artikkelit();
  const avaimet = new Set(Object.values(art).flatMap((t) => Object.keys(t)));
  let valot = [];
  try {
    const o = await haeJson('https://media.matkakirja.app/sisalto/1/uusin.json');
    valot = (await haeJson(`https://media.matkakirja.app/${o.polku}kokoelmat/karttavalot.json`)).alkiot;
  } catch (e) {
    console.warn(`karttavalot ei saatavilla (${e.message}) — lahiNostot jää tyhjäksi`);
  }
  // Lähinostojen tekstin alku, jotta samaa tarinaa ei kirjoiteta toiseen kertaan.
  const { KOHDE_MAAT } = await tuo('js/fokuskohteet.js');
  const { SKANDAALIT } = await tuo('js/packs/skandaalit.js');
  const { HISTORIAN_HETKET } = await tuo('js/packs/historian-hetket.js');
  const tekstit = new Map([
    ...Object.values(KOHDE_MAAT).flat().map((x) => [`kohde:${x.id}`, x.teksti]),
    ...Object.values(SKANDAALIT).flat().map((x) => [`skandaali:${x.id}`, x.teksti]),
    ...HISTORIAN_HETKET.map((x) => [`hetki:${x.id}`, x.teksti]),
  ]);
  const alku = (t) => (typeof t === 'string' ? (t.length > 240 ? `${t.slice(0, 239)}…` : t) : null);
  const saa = [];
  for (const id of idt) {
    const p = PAAKAUPUNKIPISTEET.find((x) => x.id === id);
    if (!p) throw new Error(`${id}: ei ole js/packs/paakaupungit.js:n PAAKAUPUNKIPISTEET-taulussa`);
    const muoto = P.map.countryShapes?.[p.maa] ?? {};
    const maanAvain = muoto.wiki ?? muoto.nimi ?? null;
    const varattu = (k) => avaimet.has(k) || k === maanAvain;
    const wikiEhdotus = varattu(p.nimi) ? `${p.nimi} (kaupunki)` : p.nimi;
    const lahella = kaupungit.filter((c) => c.lat != null).map((c) => ({ c, d: km(p, c) }))
      .filter(({ d }) => d <= 150).sort((a, b) => a.d - b.d)
      .map(({ c, d }) => ({ id: c.id, nimi: c.name, km: d, lehti: otsikot(KULTTUURI_KATEGORIAT[c.id]),
        kohdekartta: (KAUPUNKIKARTAT[c.id]?.kohteet ?? []).map((k) => k.nimi) }));
    const lahiNostot = valot.filter((v) => Number.isFinite(v.lat)).map((v) => ({ v, d: km(p, v) }))
      .filter(({ d }) => d <= 30).sort((a, b) => a.d - b.d)
      .map(({ v, d }) => ({ id: v.id, nimi: v.nimi, lahde: v.lahde, laji: v.laji, km: d,
        teksti: alku(tekstit.get(v.id.replace(/~\d+$/, ''))) }));
    const perus = MAIDEN_PERUSTIEDOT[p.maa] ?? null;
    const k = {
      id, era, nimi: p.nimi, nimiAlkukieli: p.nimiAlkukieli, maa: p.maa, maanNimi: muoto.nimi ?? null,
      asema: p.asema, lat: p.lat, lon: p.lon, wikidata: p.wikidata,
      kevytSisalto: { kuvaus: p.kuvaus, tunnusrakennukset: p.tunnusrakennukset, asukkaat: p.asukkaat },
      maanPerustiedot: perus && { esittely: perus.esittely, genetiivi: perus.genetiivi, kielet: perus.kielet, valuutta: perus.valuutta },
      maalehti: MAA_KATEGORIAT[p.maa] ? otsikot(MAA_KATEGORIAT[p.maa]) : null,
      lahiKaupungit: lahella,
      lahiNostot,
      wiki: { ehdotus: wikiEhdotus, maanAvain, varattuNimi: varattu(p.nimi) },
      huom: 'Tämä on pelin NYKYINEN aineisto: älä toista samoja tarinoita, kuvia tai nostoja. '
        + 'Kevyen pisteen kuvaus ja tunnusrakennukset ovat Sisältökirjurin tarkistamia; '
        + 'ristiriita lähteen kanssa kirjataan faktapohjaan ja RAPORTTI.md:hen.',
    };
    mkdirSync(join(TYOKANSIO, era, id), { recursive: true });
    writeFileSync(join(TYOKANSIO, era, id, 'konteksti.json'), `${JSON.stringify(k, null, 1)}\n`);
    saa.push({ id, lat: Math.round(p.lat * 100) / 100, lon: Math.round(p.lon * 100) / 100 });
    console.log(`${id}: konteksti.json (lähikaupunkeja ${lahella.length}, lähinostoja ${lahiNostot.length}, wiki "${wikiEhdotus}")`);
  }
  writeFileSync(join(TYOKANSIO, era, 'saa-syote.json'), `${JSON.stringify(saa, null, 1)}\n`);
  console.log(`${era}/saa-syote.json: ${saa.length} paikkaa`);
}

/* ------------------------------------------------------------ malli */

async function malli(id) {
  const { P, kaupungit } = await lauta();
  const c = kaupungit.find((x) => x.id === id);
  if (!c) throw new Error(`${id}: ei laudan kaupunki`);
  const loyda = (t, avain) => Object.values(t).find((x) => x?.[avain] !== undefined)?.[avain] ?? null;
  const { KULTTUURI_KATEGORIAT } = await tuo('js/packs/kulttuuri-kategoriat.js');
  const { KAUPUNKIKARTAT } = await tuo('js/packs/maakartat.js');
  const { NAHTAVYYSJUTUT } = await tuo('js/packs/nahtavyysjutut.js');
  const { SAATIEDOT } = await tuo('js/packs/saatiedot.js');
  const kartta = KAUPUNKIKARTAT[id];
  const { polku, varikartta, piirtoRajat, lahde, ...karttaTeksti } = kartta ?? {};
  const ulos = {
    $skeema: 'matkakirja-paakaupunki/1', id, maa: c.maa, era: 'malli',
    kaupunki: { id, name: c.name, wiki: c.wiki ?? c.name, ambience: c.ambience, pallo: { lat: c.lat, lon: c.lon } },
    artikkeli: loyda(await artikkelit(), c.wiki ?? c.name),
    kysymykset: loyda(await kysymystaulut(), id),
    tiedot: loyda(await tietotaulut(), id),
    valokuva: loyda(await valokuvataulut(), id),
    kaupunkilehti: KULTTUURI_KATEGORIAT[id] ?? null,
    kohdekartta: kartta ? karttaTeksti : null,
    nahtavyydet: NAHTAVYYSJUTUT[id] ?? null,
    saatiedot: SAATIEDOT[id] ?? null,
    ehdotukset: { lentoasema: null, huomiot: [`malli: laudan kaupunki ${id} (${P.id})`] },
  };
  process.stdout.write(`${JSON.stringify(ulos, null, 1)}\n`);
}

/* ------------------------------------------------------------ saa */

function saaKomento(era) {
  const polku = join(TYOKANSIO, era, 'saa.txt');
  if (!existsSync(polku)) throw new Error(`${era}/saa.txt puuttuu (aja tools/hae-saaperusdata.mjs ensin)`);
  let n = 0;
  for (const rivi of readFileSync(polku, 'utf8').split('\n')) {
    const m = rivi.match(/^\s*([a-z0-9]+): \{ lat: (-?[\d.]+), lon: (-?[\d.]+), keskilampo: \[([^\]]*)\], sade: \[([^\]]*)\] \},?\s*$/);
    if (!m) continue;
    const luvut = (s) => s.split(',').map((x) => Number(x.trim()));
    const kansio = join(TYOKANSIO, era, m[1]);
    mkdirSync(kansio, { recursive: true });
    writeFileSync(join(kansio, 'saa.json'), `${JSON.stringify({
      lat: Number(m[2]), lon: Number(m[3]), keskilampo: luvut(m[4]), sade: luvut(m[5]),
    })}\n`);
    n += 1;
  }
  console.log(`${n} säärivia → ${era}/<id>/saa.json`);
}

/* ------------------------------------------------------------ tarkista */

// Virkkeiden likimääräinen määrä (varoituksiin): lyhenteiden pisteet pois, sitten välimerkki +
// iso alkukirjain tai numero. Unicode-rajat, koska \b ei tunne ä- ja ö-kirjaimia ("tänään." ≠ "n.").
const virkkeita = (s) => (String(s)
  .replace(/(?<![\p{L}\p{N}])(n|esim|mm|ns|jne|ym|tms|eaa|jaa|eKr|jKr|klo|s|ks|vrt|pl|engl|ransk|lat|kreik|arab)\./gu, '$1')
  .match(/[.?!…]["”»)]?(?=\s+["„«(]?[\p{Lu}\p{N}]|\s*$)/gu) ?? []).length;
const kappaleita = (s) => String(s).split('\n\n').filter((x) => x.trim()).length;

async function tarkista(era, rajaus, { verkko, malliTila, lyhyt }) {
  if (!era) throw new Error('käyttö: tarkista <erä> [<id> ...] [--verkko] [--malli]');
  const eraKansio = join(TYOKANSIO, era);
  const idt = rajaus.length ? rajaus : readdirSync(eraKansio, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(eraKansio, d.name, 'sisalto.json'))).map((d) => d.name);
  const { PAAKAUPUNKIPISTEET } = await tuo('js/packs/paakaupungit.js');
  const { P, kaupungit } = await lauta();
  const ambienssit = new Set(kaupungit.map((c) => c.ambience).filter(Boolean));
  const avaimet = new Set(Object.values(await artikkelit()).flatMap((t) => Object.keys(t)));
  const pakkateksti = readdirSync(join(JUURI, 'js/packs')).filter((f) => f.endsWith('.js'))
    .map((f) => readFileSync(join(JUURI, 'js/packs', f), 'utf8')).join('\n');
  let virheita = 0;
  let varoituksia = 0;

  for (const id of idt) {
    const V = [];
    const W = [];
    const virhe = (s) => V.push(s);
    const varoitus = (s) => W.push(s);
    let s;
    try {
      s = JSON.parse(readFileSync(join(eraKansio, id, 'sisalto.json'), 'utf8'));
    } catch (e) {
      console.log(`VIRHE ${id}: sisalto.json ei lue (${e.message})`);
      virheita += 1;
      continue;
    }
    const p = PAAKAUPUNKIPISTEET.find((x) => x.id === id);
    if (!malliTila && !p) virhe('id ei ole PAAKAUPUNKIPISTEET-taulussa');
    if (s.id !== id) virhe(`id "${s.id}" ei vastaa kansiota`);
    for (const o of OSIOT) if (s[o] == null) virhe(`osio ${o} puuttuu`);
    for (const k of Object.keys(s)) if (![...OSIOT, '$skeema', 'id', 'maa', 'era', 'saatiedot', 'ehdotukset'].includes(k)) varoitus(`tuntematon kenttä ${k}`);

    // kaupunki-rivi
    const k = s.kaupunki ?? {};
    if (k.id !== id) virhe('kaupunki.id ei ole kansion id');
    if (!k.name) virhe('kaupunki.name puuttuu');
    if (!k.wiki) virhe('kaupunki.wiki puuttuu');
    if (!ambienssit.has(k.ambience)) virhe(`kaupunki.ambience "${k.ambience}" ei ole laudan arvoja (${[...ambienssit].join(', ')})`);
    if (!Number.isFinite(k.pallo?.lat) || !Number.isFinite(k.pallo?.lon)) virhe('kaupunki.pallo {lat, lon} puuttuu');
    if (!malliTila) {
      if (kaupungit.some((c) => c.id === id)) virhe('id on jo laudan kaupunki');
      const muoto = P.map.countryShapes?.[s.maa] ?? {};
      if (k.wiki && (avaimet.has(k.wiki) || k.wiki === (muoto.wiki ?? muoto.nimi))) virhe(`kaupunki.wiki "${k.wiki}" on jo artikkeliavain — käytä muotoa "${k.name} (kaupunki)"`);
      if (p && s.maa !== p.maa) virhe(`maa ${s.maa} ≠ ${p.maa}`);
      if (p && k.pallo && (Math.abs(k.pallo.lat - p.lat) > 0.1 || Math.abs(k.pallo.lon - p.lon) > 0.1)) varoitus('kaupunki.pallo poikkeaa yli 0,1° kevyen pisteen sijainnista');
    }

    // artikkeli
    const a = s.artikkeli ?? {};
    const teksti = a.teksti ?? a.artikkeli;
    if (!a.intro || a.intro.length < 600 || a.intro.length > 1200) virhe(`artikkeli.intro ${a.intro?.length ?? 0} mrk (600–1200, tavoite 700–1100)`);
    else if (a.intro.length < 700 || a.intro.length > 1100) varoitus(`artikkeli.intro ${a.intro.length} mrk (tavoite 700–1100)`);
    if (a.intro && ![2, 3].includes(kappaleita(a.intro))) varoitus(`artikkeli.intro ${kappaleita(a.intro)} kappaletta (2–3)`);
    if (a.intro && (virkkeita(a.intro) < 7 || virkkeita(a.intro) > 10)) varoitus(`artikkeli.intro noin ${virkkeita(a.intro)} virkettä (7–10)`);
    const lihat = ((a.intro ?? '').match(/\*\*[^*]+\*\*/g) ?? []).length;
    if (a.intro && (lihat < 1 || lihat > 3)) varoitus(`artikkeli.intro: ${lihat} lihavointia (1–3)`);
    if (!teksti || kappaleita(teksti) !== 3 || teksti.length < 600 || teksti.length > 1100) virhe(`artikkeli.teksti: ${teksti ? `${kappaleita(teksti)} kappaletta, ${teksti.length} mrk` : 'puuttuu'} (3 kappaletta, 600–1100)`);
    if (/!/.test(`${a.intro ?? ''}${teksti ?? ''}`)) virhe('artikkelissa on huutomerkki');

    // kysymykset ja tiedot
    const q = Array.isArray(s.kysymykset) ? s.kysymykset : [];
    if (q.length < 2) virhe(`kysymyksiä ${q.length} (vähintään 2, tavoite 5)`);
    else if (q.length < 5) varoitus(`kysymyksiä ${q.length} (tavoite 5)`);
    if (q.length && (!q.some((x) => x.level === 1) || !q.some((x) => x.level === 3))) varoitus('kysymyksistä puuttuu taso 1 tai taso 3');
    if (new Set(q.map((x) => x.q)).size !== q.length) virhe('sama kysymys kahdesti');
    q.forEach((x, i) => {
      const missa = `kysymys ${i + 1}`;
      if (!x.q?.trim()) virhe(`${missa}: q puuttuu`);
      if (!Array.isArray(x.options) || x.options.length !== 4 || new Set(x.options).size !== 4) virhe(`${missa}: neljä eri vaihtoehtoa`);
      if (!Number.isInteger(x.correct) || x.correct < 0 || x.correct > 3) virhe(`${missa}: correct 0–3`);
      if (![1, 2, 3].includes(x.level)) virhe(`${missa}: level 1–3`);
      if (!x.fact?.trim() || !x.hint?.trim()) virhe(`${missa}: fact ja hint pakollisia`);
      const oikea = x.options?.[x.correct];
      if (oikea && x.hint?.toLowerCase().includes(oikea.toLowerCase())) virhe(`${missa}: vihje paljastaa vastauksen`);
      const lahteet = [x.source].flat().filter(Boolean);
      if (!lahteet.length || lahteet.some((u) => !/^https:\/\/\S+$/.test(u))) virhe(`${missa}: source = https-osoite (tai lista)`);
      else if (!lahteet.some((u) => /\.wikipedia\.org\/wiki\//.test(u))) varoitus(`${missa}: source ei ole Wikipedia-artikkeli`);
      const vaarat = (x.options ?? []).filter((_, j) => j !== x.correct).map((o) => o.length);
      if (oikea && oikea.length > 1.4 * Math.max(...vaarat)) varoitus(`${missa}: oikea vastaus selvästi pisin (tools/tarkista-vaihtoehdot.mjs)`);
    });
    const t = Array.isArray(s.tiedot) ? s.tiedot : [];
    if (t.length < 2) virhe(`tiedot: ${t.length} (vähintään 2, tavoite 3)`);
    else if (t.length < 3) varoitus(`tiedot: ${t.length} (tavoite 3)`);
    if (t.some((x) => typeof x !== 'string')) virhe('tiedot ovat merkkijonoja (isoisän ääni kuuluu Päätoimittajalle)');
    if (t.some((x) => typeof x === 'string' && x.trim().length <= 20)) virhe('tieto alle 21 merkkiä');
    if (new Set(t).size !== t.length) virhe('sama tieto kahdesti');

    // kuvat: kerätään kaikki kuvaoliot
    const kuvat = [];
    const kuva = (o, missa) => {
      if (!o) return;
      if (o.osoite) virhe(`${missa}: osoite-kuva (havainnekuva) ei kuulu pilvityöhön`);
      if (!o.tiedosto) { virhe(`${missa}: tiedosto puuttuu`); return; }
      kuvat.push({ ...o, missa });
      const m = String(o.lahde ?? '').match(LAHDE_RE);
      if (!m) virhe(`${missa}: lahde "${o.lahde}" ei ole muotoa "Tekijä, Wikimedia Commons (LISENSSI)"`);
      else if (m[1].trim().length <= 2 || /^(unknown|wikimedia|commons|tuntematon)$/i.test(m[1].trim())) virhe(`${missa}: tekijä puuttuu tai katkennut ("${m[1]}")`);
      const pitka = o.selite ?? o.kuvateksti;
      if (!pitka) virhe(`${missa}: selite puuttuu`);
      else if (virkkeita(pitka) > 2) varoitus(`${missa}: selite yli kahden virkkeen`);
      if (pitka && pitka.length > 100 && !o.lyhyt) virhe(`${missa}: selite yli 100 mrk ilman lyhyt-kenttää`);
      if (o.lyhyt && (o.lyhyt.length > 100 || !/\.$/.test(o.lyhyt))) virhe(`${missa}: lyhyt enintään 100 mrk ja päättyy pisteeseen`);
      if (/(wikipedia|commons|kuvauksen mukaan|tekoäly)/i.test(`${pitka ?? ''} ${o.lyhyt ?? ''}`)) varoitus(`${missa}: kuvatekstissä lähdeviittaus lukijalle`);
    };
    const nostoTarkistus = (n, missa) => {
      if (!n.otsikko || !n.teksti) { virhe(`${missa}: otsikko ja teksti pakollisia`); return; }
      if (n.teksti.length < 350 || n.teksti.length > 800) virhe(`${missa}: teksti ${n.teksti.length} mrk (440–660)`);
      else if (n.teksti.length < 440 || n.teksti.length > 660) varoitus(`${missa}: teksti ${n.teksti.length} mrk (440–660)`);
      if (!n.wiki) varoitus(`${missa}: wiki-otsikko puuttuu`);
      kuva(n, missa);
    };

    // valokuva
    const vk = s.valokuva ?? {};
    kuva(vk, 'valokuva');
    for (const [i, l] of (vk.lisat ?? []).entries()) kuva(l, `valokuva.lisat ${i + 1}`);
    if (vk.uusi) kuva(vk.uusi, 'valokuva.uusi');

    // kaupunkilehti
    const lehti = Array.isArray(s.kaupunkilehti) ? s.kaupunkilehti : [];
    const kansi = lehti[0];
    if (kansi?.id !== 'kaupunki') virhe('kaupunkilehden ensimmäinen aihe on id "kaupunki"');
    if (lehti.length > 9) virhe(`aiheita ${lehti.length} (enintään 9)`);
    if (lehti.length < 2) virhe('kaupunkilehdestä puuttuu teemasivu');
    if (kansi) {
      if (!kansi.nimi || !kansi.johdanto) virhe('kansi: nimi ja johdanto pakollisia');
      if (kansi.johdanto && (virkkeita(kansi.johdanto) > 2 || kansi.johdanto.length > 320)) varoitus('kansi.johdanto: 1–2 virkettä');
      if (kansi.tehtava) virhe('kannella ei ole minitehtävää');
      if ((kansi.kansikuvat ?? []).length !== 3) virhe(`kansikuvia ${(kansi.kansikuvat ?? []).length} (3 laajaa yleiskuvaa)`);
      (kansi.kansikuvat ?? []).forEach((x, i) => kuva(x, `kansikuva ${i + 1}`));
      (kansi.avauskuvat ?? []).forEach((x, i) => kuva(x, `avauskuva ${i + 1}`));
      if (kansi.ennenNyt) {
        if (kansi.ennenNyt.length !== 2 || !kansi.ennenNyt[0].vuosi) virhe('ennenNyt: [vanha (vuosi), uusi]');
        kansi.ennenNyt.forEach((x, i) => kuva(x, `ennenNyt ${i + 1}`));
      }
      const kn = kansi.nostot ?? [];
      if (kn.length !== 4) virhe(`kannen nostoja ${kn.length} (4)`);
      kn.forEach((n, i) => nostoTarkistus(n, `kansi nosto ${i + 1}`));
      const m = kansi.matkailijalle;
      if (!m?.kuva || !m?.kappale || !m?.artikkeli) virhe('matkailijalle { kuva, kappale, artikkeli } puuttuu');
      else {
        kuva(m.kuva, 'matkailijalle.kuva');
        const ar = m.artikkeli;
        if (!/^Matkailijan /.test(ar.nimi ?? '') || ar.taitto !== 'opas' || !ar.teksti || !ar.nosto) virhe('opas: nimi "Matkailijan X", taitto "opas", teksti ja nosto');
        const j = ar.jaksot ?? [];
        if (j.length !== 5) virhe(`oppaan jaksoja ${j.length} (5)`);
        if (j.filter((x) => !x.kuva).length > 2) virhe('oppaassa yli kaksi kuvatonta jaksoa');
        j.forEach((x, i) => {
          if (!x.otsikko || !x.teksti) virhe(`opas jakso ${i + 1}: otsikko ja teksti`);
          kuva(x.kuva, `opas jakso ${i + 1}`);
        });
        if (!ar.matkailu?.parasta?.length || !ar.matkailu?.hyvaTietaa?.length) varoitus('oppaasta puuttuu matkailu { parasta, hyvaTietaa }');
      }
    }
    lehti.slice(1).forEach((sivu, i) => {
      const missa = `teemasivu ${sivu.id ?? i + 2}`;
      if (!VAKIOAIHEET.includes(sivu.id)) virhe(`${missa}: id ei ole vakioaihe (${VAKIOAIHEET.join(', ')})`);
      if (!sivu.nimi || !sivu.johdanto) virhe(`${missa}: nimi ja johdanto`);
      const te = sivu.tehtava;
      if (!te || te.vaihtoehdot?.length !== 4 || new Set(te.vaihtoehdot).size !== 4 || !Number.isInteger(te.oikea)
        || te.oikea < 0 || te.oikea > 3 || !te.kysymys || !te.fakta) virhe(`${missa}: minitehtävä { kysymys, vaihtoehdot[4], oikea, fakta }`);
      else if (/\b(punta|puntaa|pistettä|palkkio)/i.test([te.kysymys, te.fakta, ...te.vaihtoehdot].join(' '))) virhe(`${missa}: minitehtävä ei mainitse palkkiota`);
      const sn = sivu.nostot ?? [];
      if (sn.length < 4 || sn.length > 7) virhe(`${missa}: nostoja ${sn.length} (4)`);
      sn.forEach((n, j) => nostoTarkistus(n, `${missa} nosto ${j + 1}`));
    });

    // kohdekartta ja nähtävyysjutut
    const kk = s.kohdekartta ?? {};
    const r = kk.rajat ?? {};
    const kohteet = kk.kohteet ?? [];
    if (!kk.esittely) virhe('kohdekartta.esittely puuttuu');
    else if (kk.esittely.length > 450) varoitus(`kohdekartta.esittely ${kk.esittely.length} mrk (lyhyt, ei kartan kuvailua)`);
    if (!(r.pohjoinen > r.etela && r.ita > r.lansi)) virhe('kohdekartta.rajat { pohjoinen > etela, ita > lansi }');
    if (kohteet.length < 1 || kohteet.length > 15) virhe(`kohteita ${kohteet.length} (1–15)`);
    else if (kohteet.length < 6) varoitus(`kohteita ${kohteet.length} (pohjataso 6; perustele RAPORTTI.md:ssä)`);
    if (new Set(kohteet.map((x) => x.nimi)).size !== kohteet.length) virhe('kaksi samannimistä kohdetta');
    for (const x of kohteet) {
      if (!x.nimi || !Number.isFinite(x.lat) || !Number.isFinite(x.lon)) { virhe(`kohde ${x.nimi ?? '?'}: nimi, lat, lon`); continue; }
      if (!KARTTATYYPIT.includes(x.tyyppi ?? 'rakennus')) virhe(`kohde ${x.nimi}: tyyppi rakennus | aukio | luonto`);
      if (x.lat > r.pohjoinen || x.lat < r.etela || x.lon > r.ita || x.lon < r.lansi) virhe(`kohde ${x.nimi}: rajauksen ulkopuolella`);
      if (k.pallo && km(k.pallo, x) > 12) varoitus(`kohde ${x.nimi}: ${km(k.pallo, x)} km kaupunkipisteestä`);
    }
    if (kk.polku || kk.varikartta || kk.piirtoRajat) varoitus('kohdekartan polku/varikartta/piirtoRajat tehdään Macilla');
    const jutut = s.nahtavyydet ?? {};
    for (const x of kohteet) if (!jutut[x.nimi]) virhe(`nähtävyysjuttu puuttuu kohteelta "${x.nimi}"`);
    for (const [nimi, ju] of Object.entries(jutut)) {
      if (!kohteet.some((x) => x.nimi === nimi)) virhe(`juttu "${nimi}" ilman kohdetta (nimen oltava sama)`);
      if (!ju.teksti || ju.teksti.length < 400) virhe(`juttu ${nimi}: teksti ${ju.teksti?.length ?? 0} mrk`);
      else if (![2, 3].includes(kappaleita(ju.teksti)) || ju.teksti.length > 1800) varoitus(`juttu ${nimi}: ${kappaleita(ju.teksti)} kappaletta, ${ju.teksti.length} mrk (2–3, enintään ~1500)`);
      if (!(ju.kuvat ?? []).length || ju.kuvat.length > 3) virhe(`juttu ${nimi}: kuvia 1–3`);
      (ju.kuvat ?? []).forEach((x, i) => kuva(x, `juttu ${nimi} kuva ${i + 1}`));
      if (ju.lahde !== 'Wikipedia') varoitus(`juttu ${nimi}: lahde "Wikipedia"`);
      if (!ju.aika) varoitus(`juttu ${nimi}: aika puuttuu`);
    }

    // säätiedot
    const sa = s.saatiedot;
    if (!sa) varoitus('saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)');
    else if (!Number.isFinite(sa.lat) || !Number.isFinite(sa.lon) || sa.keskilampo?.length !== 12 || sa.sade?.length !== 12
      || [...sa.keskilampo, ...sa.sade].some((x) => !Number.isFinite(x))) virhe('saatiedot { lat, lon, keskilampo[12], sade[12] }');
    else if (!sa.luonnehdinta) varoitus('saatiedot.luonnehdinta puuttuu');

    // kuvien yksikäsitteisyys ja aiempi käyttö. Matkakirjan valokuva saa olla
    // sama tiedosto kuin ennenNyt-pari (kaupunkilehti.md: parit kopioitiin
    // valokuvatauluista); lehdessä ja jutuissa sama tiedosto vain kerran.
    const nahty = new Map();
    const lehdessa = new Map();
    for (const x of kuvat) {
      const ryhma = x.missa.startsWith('valokuva') ? nahty : lehdessa;
      if (ryhma.has(x.tiedosto)) virhe(`sama kuva kahdesti: ${x.tiedosto} (${ryhma.get(x.tiedosto)} ja ${x.missa})`);
      else ryhma.set(x.tiedosto, x.missa);
    }
    for (const [nimi, missa] of lehdessa) if (!nahty.has(nimi)) nahty.set(nimi, missa);
    for (const nimi of nahty.keys()) {
      if (pakkateksti.includes(nimi) || pakkateksti.includes(nimi.replace(/'/g, "\\'"))) varoitus(`kuva on jo pelissä: ${nimi}`);
    }

    // tekstit: paikkamerkit, ascii-suomi, pyöreät luvut, huutomerkit
    const ohita = new Set(['tiedosto', 'lahde', 'wiki', 'source', 'id', 'taitto', 'ambience', '$skeema', 'era', 'maa', 'name', 'nimi', 'otsikko']);
    const kay = (o, polku) => {
      if (typeof o === 'string') {
        const avain = polku.split('.').pop();
        if (ohita.has(avain)) return;
        if (/(TÄYTÄ|TODO|XXX|lorem ipsum)/i.test(o)) virhe(`${polku}: paikkamerkki jäi`);
        if (o.length > 200 && !/[äö]/i.test(o)) virhe(`${polku}: ei ä- eikä ö-kirjaimia (ascii-suomi?)`);
        for (const m of o.matchAll(/\b(\d{1,3})((?:\s000)+)\b/g)) {
          if ((m[1].match(/0+$/)?.[0].length ?? 0) + 3 * (m[2].length / 4) >= 4) varoitus(`${polku}: pyöreä luku "${m[0]}" — onko lähteessä tarkka?`);
        }
        if (/\b(noin|yli|lähes|arviolta|jopa|peräti)\s+(\S+\s+)?(miljoona|miljoonaa|miljardi|satojatuhansia|kymmeniätuhansia)\b/i.test(o)) varoitus(`${polku}: pyöreä suuruusluokka — onko lähteessä tarkka?`);
        if (!polku.startsWith('artikkeli') && /!/.test(o)) varoitus(`${polku}: huutomerkki`);
      } else if (Array.isArray(o)) o.forEach((x, i) => kay(x, `${polku}[${i}]`));
      else if (o && typeof o === 'object') for (const [kk2, v] of Object.entries(o)) kay(v, polku ? `${polku}.${kk2}` : kk2);
    };
    kay(s, '');

    if (verkko && nahty.size) await verkkotarkistus([...nahty.keys()], kuvat, s, virhe, varoitus);

    for (const x of V) console.log(`VIRHE ${id}: ${x}`);
    if (!lyhyt) for (const x of W) console.log(`VAROITUS ${id}: ${x}`);
    console.log(`== ${id}: ${V.length} virhettä, ${W.length} varoitusta, ${nahty.size} kuvaa`);
    virheita += V.length;
    varoituksia += W.length;
  }
  console.log(`YHTEENSÄ ${idt.length} kaupunkia: ${virheita} virhettä, ${varoituksia} varoitusta`);
  if (virheita) process.exitCode = 1;
}

const normLisenssi = (s) => String(s ?? '').replace(/^Public domain$/i, 'PD').replace(/^PD.*/i, 'PD')
  .replace(/^CC[- ]?Zero$/i, 'CC0').replace(/-/g, ' ').replace(/\s+/g, ' ').trim().toUpperCase();
const normNimi = (s) => String(s ?? '').replace(/<[^>]*>/g, ' ').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

async function verkkotarkistus(nimet, kuvat, s, virhe, varoitus) {
  const tieto = new Map();
  for (let i = 0; i < nimet.length; i += 40) {
    const osa = nimet.slice(i, i + 40);
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&prop=imageinfo'
      + '&iiprop=size|extmetadata&iiextmetadatafilter=LicenseShortName|Artist&titles='
      + encodeURIComponent(osa.map((n) => `File:${n}`).join('|'));
    const d = await haeJson(url);
    const takaisin = new Map((d.query?.normalized ?? []).map((n) => [n.to, n.from]));
    for (const sivu of d.query?.pages ?? []) {
      const nimi = (takaisin.get(sivu.title) ?? sivu.title).replace(/^File:/, '');
      tieto.set(nimi, sivu);
    }
  }
  for (const x of kuvat) {
    const sivu = tieto.get(x.tiedosto) ?? tieto.get(`File:${x.tiedosto}`);
    const ii = sivu?.imageinfo?.[0];
    if (!ii) { virhe(`${x.missa}: Commons-tiedostoa ei löydy (${x.tiedosto})`); continue; }
    if (ii.width < 1200) virhe(`${x.missa}: leveys ${ii.width} px (vähintään 1200)`);
    const lis = ii.extmetadata?.LicenseShortName?.value ?? '';
    if (/\b(NC|ND)\b|fair use/i.test(lis) || !/^(CC0|CC[- ]BY|Public domain|PD)/i.test(lis)) virhe(`${x.missa}: lisenssi "${lis}" ei kelpaa`);
    const m = String(x.lahde ?? '').match(LAHDE_RE);
    if (m && normLisenssi(m[2]) !== normLisenssi(lis)) varoitus(`${x.missa}: lähderivin lisenssi ${m[2]} ≠ Commons "${lis}"`);
    const tekija = normNimi(ii.extmetadata?.Artist?.value);
    const oma = normNimi(m?.[1]);
    if (m && tekija && !tekija.includes(oma) && !oma.includes(tekija)) varoitus(`${x.missa}: tekijä "${m[1]}" ≠ Commons Artist "${tekija.slice(0, 80)}"`);
  }
  const otsikot2 = [...new Set([s.kaupunki?.wiki, ...(s.kaupunkilehti ?? []).flatMap((a) => (a.nostot ?? []).map((n) => n.wiki))]
    .filter(Boolean))];
  const puuttuu = async (kieli, lista) => {
    const ulos = new Set();
    for (let i = 0; i < lista.length; i += 40) {
      const d = await haeJson(`https://${kieli}.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&redirects=1&titles=`
        + encodeURIComponent(lista.slice(i, i + 40).join('|')));
      const takaisin = new Map([...(d.query?.normalized ?? []), ...(d.query?.redirects ?? [])].map((n) => [n.to, n.from]));
      for (const sivu of d.query?.pages ?? []) if (sivu.missing) ulos.add(takaisin.get(sivu.title) ?? sivu.title);
    }
    return ulos;
  };
  const eiFi = await puuttuu('fi', otsikot2);
  const eiEn = eiFi.size ? await puuttuu('en', [...eiFi]) : new Set();
  for (const o of eiEn) virhe(`wiki "${o}" ei löydy fi- eikä en-Wikipediasta`);
}

/* ------------------------------------------------------------ tutkimusapurit */

const KELPO = (lis) => /^(CC0|CC[- ]BY|Public domain|PD)/i.test(lis) && !/\b(NC|ND)\b|fair use/i.test(lis);
// Artist ilman HTML:ää alkuperäisessä kirjoitusasussa: lähderivin tekijä kirjoitetaan juuri näin.
const siisti = (s) => String(s ?? '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

async function lahdeKomento(kieli, otsikko) {
  if (!['en', 'fi'].includes(kieli) || !otsikko) throw new Error('käyttö: lahde <en|fi> "<otsikko>"');
  const d = await haeJson(`https://${kieli}.wikipedia.org/w/api.php?action=query&format=json&formatversion=2`
    + '&prop=extracts|coordinates|pageprops&explaintext=1&exsectionformat=wiki&redirects=1&titles='
    + encodeURIComponent(otsikko));
  const sivu = d.query?.pages?.[0];
  if (!sivu || sivu.missing) { console.log(`EI LÖYDY: ${kieli}:${otsikko}`); process.exitCode = 1; return; }
  const kansio = join(tmpdir(), 'matkakirja-lahteet');
  mkdirSync(kansio, { recursive: true });
  const polku = join(kansio, `${kieli}-${sivu.title.replace(/[^\p{L}\p{N}]+/gu, '_')}.txt`);
  writeFileSync(polku, `${kieli}.wikipedia.org/wiki/${sivu.title.replace(/ /g, '_')} (haettu ${new Date().toISOString().slice(0, 10)})\n\n${sivu.extract}`);
  const k = sivu.coordinates?.[0];
  console.log(`${polku}\n${sivu.title}${sivu.title !== otsikko ? ` (ohjaus: ${otsikko})` : ''} · ${sivu.extract.length} mrk · `
    + `${sivu.pageprops?.wikibase_item ?? 'ei Q'} · ${k ? `${k.lat.toFixed(5)}, ${k.lon.toFixed(5)}` : 'ei koordinaatteja'}`);
  if (/may refer to|voi tarkoittaa/i.test(sivu.extract.slice(0, 400))) console.log('HUOM: täsmennyssivu — valitse tarkempi otsikko');
  for (const r of sivu.extract.split('\n').filter((x) => /^==/.test(x))) console.log(r);
}

async function hakuKomento(haku, maara = 15) {
  if (!haku) throw new Error('käyttö: haku "<hakusanat tai incategory:\\"…\\">" [määrä]');
  const d = await haeJson('https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2'
    + `&generator=search&gsrnamespace=6&gsrlimit=50&gsrsearch=${encodeURIComponent(haku)}`
    + '&prop=imageinfo&iiprop=size|mime|extmetadata&iiextmetadatafilter=LicenseShortName|Artist|DateTimeOriginal');
  const rivit = (d.query?.pages ?? []).sort((a, b) => (a.index ?? 0) - (b.index ?? 0)).map((p) => ({ p, ii: p.imageinfo?.[0] }))
    .filter(({ ii }) => ii && /^image\/(jpeg|png|tiff)/.test(ii.mime) && ii.width >= 1200 && KELPO(ii.extmetadata?.LicenseShortName?.value ?? ''));
  for (const { p, ii } of rivit.slice(0, Number(maara) || 15)) {
    const e = ii.extmetadata ?? {};
    console.log(`${ii.width}×${ii.height} | ${e.LicenseShortName?.value} | ${siisti(e.Artist?.value)} | `
      + `${String(e.DateTimeOriginal?.value ?? '').replace(/<[^>]*>/g, '').slice(0, 10)} | ${p.title.replace(/^File:/, '')}`);
  }
  console.log(`(${rivit.length} kelvollista / ${(d.query?.pages ?? []).length} osumaa; tekijä lähderiville tarkista-komennon --verkko-vertailulla)`);
}

async function esikatseluKomento(tiedosto) {
  if (!tiedosto) throw new Error('käyttö: esikatselu "<Commons-tiedosto>"');
  const v = await fetch(`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(tiedosto)}?width=900`,
    { headers: UA, signal: AbortSignal.timeout(60000) });
  if (!v.ok) throw new Error(`HTTP ${v.status}: ${tiedosto}`);
  const kansio = join(tmpdir(), 'matkakirja-kuvat');
  mkdirSync(kansio, { recursive: true });
  const polku = join(kansio, `${tiedosto.replace(/\.\w+$/, '').replace(/[^\p{L}\p{N}]+/gu, '_').slice(0, 120)}.jpg`);
  writeFileSync(polku, Buffer.from(await v.arrayBuffer()));
  console.log(polku);
}

/* ------------------------------------------------------------ pääohjelma */

try {
  const vapaat = argit.filter((x) => !x.startsWith('--'));
  if (komento === 'konteksti') await konteksti(vapaat[0], vapaat.slice(1));
  else if (komento === 'malli') await malli(vapaat[0]);
  else if (komento === 'saa') saaKomento(vapaat[0]);
  else if (komento === 'lahde') await lahdeKomento(vapaat[0], vapaat[1]);
  else if (komento === 'haku') await hakuKomento(vapaat[0], vapaat[1]);
  else if (komento === 'esikatselu') await esikatseluKomento(vapaat[0]);
  else if (komento === 'tarkista') {
    await tarkista(vapaat[0], vapaat.slice(1), {
      verkko: argit.includes('--verkko'), malliTila: argit.includes('--malli'), lyhyt: argit.includes('--lyhyt'),
    });
  } else {
    console.error('käyttö: konteksti <erä> <id...> | malli <id> | saa <erä> | tarkista <erä> [<id...>] [--verkko] [--malli] [--lyhyt]'
      + ' | lahde <en|fi> "<otsikko>" | haku "<haku>" [määrä] | esikatselu "<tiedosto>"');
    process.exitCode = 2;
  }
} catch (e) {
  console.error(`VIRHE: ${e.message}`);
  process.exitCode = 2;
}
```

## LISÄSÄÄNTÖ (Päätoimittaja 11.10.2026, Pulun Kyproksen pistokokeesta: 19/37 väitettä epätarkkoja)
Tarkat luvut ja vuodet (asukasluvut, määrät, perustamis- ja rakennusvuodet, etäisyydet) kirjataan vain, jos kaksi toisistaan
riippumatonta lähdettä tukee niitä; muuten luku pyöristetään ("noin", vuosisata) tai jätetään pois. Syy–seuraus-selitykset
kirjoitetaan vain lähteen sanoin, ei päätellen. Tarkistaja (vaihe E/F) käy jokaisen luvun läpi erikseen.
