# Livian ääni (pulun puhe)

> VALMIS SIIRRETTÄVÄKSI `docs/moduulit/livia-aani.md`:ksi. Tiedostoa EI
> committoitu repoon, koska `tests/dokumentit.test.mjs` vaatii jokaiselle
> `docs/`-ohjeelle rivin Raamatun ohjedokumenttikartalla, ja Raamattuun
> kirjoittaa vain päätoimittaja. Fable: lisää kartalle rivi
> `docs/moduulit/livia-aani.md — pulun ääni: ElevenLabs-resepti, tagit,
> kaiku, manifesti ja repliikkien pituusraja.` ja siirrä tämä tiedosto
> paikalleen — testi menee silloin läpi.

Omistajan tilaus 6.9.2026 aamupäivä, sanatarkasti:

- *"Pululle täytyy etsiä eleveniltä oma ääni joka vähän käheä ja nopea
  puhumaan. Generoidaan kaikki valmiiksi kirjoitetut repliikit puheeksi.
  Pidetään vain huoli että ne ovat mahdollisimman lyhyitä. Pitää varmaan
  vielä lyhentää niitä."*
- *"Voidaan käyttää myös pulun ääneen efektejä (kaiku alussa kun tulee ja
  aloittaa jo huutelemaan viestiä ennenkuin on edes ehtinyt kokonaan
  perille). Kaiku voidaan sitten feidata pois kun pulu 'perillä' ja
  nostaa äänitasoa hieman."*
- *"Tehdään pulusta hyvin vokaalinen ja elävä vastakohta kertojan
  monotoonisuuteen. Paljon elävöitystageja elevenin generointiin."*

## Osat

| Tiedosto | Tehtävä |
| --- | --- |
| `js/livia.js` | repliikkien kaanoni ja kuplien ajoitus (vain päätoimittaja kirjoittaa) |
| `js/liviapuhe.js` | tiedostonimet, soitin, kaikuversion valinta, kaupunkilähteet |
| `js/fokusvirta.js` | Ateenan ja Sofian kuplat: mistä ääni lähtee |
| `tools/generoi-pulu.mjs` | ääniehdokkaat, generointi, kaiku, manifesti, vienti |
| `.github/workflows/generoi-pulu.yml` | ajo (avain on vain secretissä) |
| `tests/livia-aani.test.mjs` | nimet, kaiku, tiivisteet, manifestin muoto, kytkentä peliin |
| `tools/savukkeet/savuke-pulu-ateena.mjs` | selainsavuke: Ateenan rytmi ja lehtivinkki |

## Ääni

- Malli `eleven_v3` (`/v1/text-to-speech/{voice_id}`), `mp3_44100_128`.
- `stability 0.0` (Creative — tottelee tageja; kertoja on 0.5),
  `similarity_boost 0.75`, `style 0.6`, `use_speaker_boost true`.
- Nopeus tehdään ffmpegillä (`atempo`, oletus 1.08): eleven_v3:ssa ei ole
  nopeussäädintä, ja ffmpeg on deterministinen. Lippu `--tempo`.
- Taso −17 LUFS, sama perhe kuin kertojan luennoilla.
- Ääntä EI ole vielä valittu. Työnkulun toiminto `aanet` listaa ehdokkaat
  (omat `/v1/voices` + jaetut `/v1/shared-voices`) piirteillä
  raspy · hoarse · gravelly · husky · rough · energetic · fast · quick ·
  lively · quirky · excited · animated. Valinta on kuuntelupäätös.

## Tagit

Tagit lisätään ohjelmallisesti (`TAGIT`, `puhemuoto`) ankkurisanoihin,
ja ajo kaatuu jos ankkuria ei ole tai tagien poisto ei palauta
kaanonista tekstiä. Kaanonin sanajärjestys ei siis voi muuttua
äänitteessä. Käytössä mm. `[excited] [amused] [proud] [curious]
[quickly] [warmly] [sheepish] [brightly] [reassuring] [modestly]
[squawks] [breathless] [sighs] [flatly] [mutters] [casually]
[helpfully]`.

## Kaupunkikohtaiset lähteet (Ateena ja Sofia ensin)

Raamattu, PULUN ÄÄNI VAIN ATEENA JA SOFIA ENSIN: puhe soi aluksi
kahdessa kaupungissa, jotta ääni ehditään kuunnella ja hyväksyä ennen
kuin koko repliikistö ajetaan. Lähteen nimi on **kaupungin tunnus** ja
indeksi tulee kenttälistan järjestyksestä (`js/liviapuhe.js
LIVIAN_KAUPUNKILAHTEET`):

| Lähde | Kentät järjestyksessä | Tiedostot |
| --- | --- | --- |
| `ateena` | `pollo.maadoitus` | `livia-ateena-1.mp3` |
| `sofia` | `pollo.maadoitus`, sähketehtävän `johdanto`, `vinkki`, `linkkiSaate`, `oikein`, `odotus`, `paluu` | `livia-sofia-1.mp3` … `livia-sofia-7.mp3` |

Tekstit luetaan pakkauksista (`js/packs/fokusvirta-ateena.js`,
`js/packs/fokusvirta-sofia.js`) — niitä ei kopioida työkaluun eikä
peliin. Järjestystä ei saa muuttaa jälkikäteen: numero on
tiedostonimessä. Uusi kenttä lisätään listan LOPPUUN.

Peli soittaa nämä kutsulla `soitaLivianKaupunkiAani(ui, city.id,
'<kenttä>')`, joka on hiljainen jokaiselle kaupungille, jota ei ole
taulussa. Kutsupaikat ovat `js/fokusvirta.js`:ssä siellä, missä teksti
oikeasti tulee ruudulle (kevyt kulku, `FOKUSVIRTA_KORTIT = false`):
maadoitus `fokusvirtaSaapumiskupla`, johdanto ja odotus
`sahkeSaateKuplaan`, vinkki ja linkkiSaate pullanapeista, oikein
kuittauskortista ja paluu `aloitaSahkelento`:n kuplasta.

**Kupla odottaa puheen loppuun.** Osiin jaettu puheenvuoro
(`js/pollo.js naytaPuheenvuoro`) etenee oletuksena 1,8–4,2 sekunnin
rytmillä. Äänitetty repliikki saa asetuksen `viive` ja etenee kuplan
lukuajalla (`js/livia.js livianKuplanLukuaika`) — sama sääntö kuin
avauksessa. Samasta syystä sähkelento (`aloitaSahkelento`) odottaa
kuittauksen (`oikein`) lukuajan ennen paluukuplaa, jottei paluun ääni
katkaise kuittausta kesken.

Tagitaulua ei näille lähteille ole eikä vaadita: v2-malli ei lähetä
tageja lainkaan.

## Ateenan rytmi ja lehtivinkki (omistaja 7.9.2026)

Raamattu, PULUN UUSI RYTMI ATEENASSA. Ensimmäinen saapuminen koskaan
kulkee kolmessa osassa (`js/livia.js livianPaljastus`, kolme repliikkiä):

1. kaksi kuplaa ENNEN isoisän luentaa (tuuraus + tervetulotoivotus),
2. isoisän luenta — pulu on hiljaa; luenta on lykätty kuplien taakse
   (`js/ui.js asetaMerkinnanLuenta` portti `luennanLykkays`, jonka
   `aloitaLykattyLuenta` laskee),
3. kolmas kupla vasta luennan päätyttyä (`js/luenta.js luennanLoppuun`;
   ilman luentaa yhden kuplan vähimmäislukuaika).

Kaupungin nimi taipuu apureista: `maahanMuoto` ("Ateenaan") ja uusi
`paikkaaMuoto` ("Ateenaa", `js/ui-apurit.js`). Ilman nimeä toivotus on
"Tervetuloa." ja ohje puhuu "kaupungista".

Lehtivinkki on oma lähteensä (`lehtivinkki`, yksi repliikki
`LIVIAN_LEHTIVINKKI`). Se sanotaan VAIN ENSIMMÄISELLÄ kerralla koskaan
— laitelippu `matkakirja-livia-lehtivinkki` + istuntolippu, sama kaava
kuin paljastuksella — eikä siinä ole enää "Älä näytä jatkossa"
-ruksia (vanha avain `matkakirja-lehtivinkki-pois` on poistettu).

## Vanhentunut äänite on hiljainen

Tiedostonimi johdetaan lähteestä ja indeksistä, joten repliikin tekstin
muuttuminen EI muuta nimeä: ämpärin vanha äänite sanoisi eri asian kuin
kupla, eikä mikään kaatuisi. Siksi `js/liviapuhe.js` pitää taulua
`LIVIAN_AANITETYT` (avain → generoidun tekstin tiiviste,
`livianTiiviste`, FNV-1a). Kun kuplan teksti ei vastaa taulua, äänite
jätetään soittamatta.

Taulu kattaa `js/livia.js`:n lähteet (avaus, paljastus, mannerivihje,
lehtivinkki); kaupunkilähteet kulkevat ilman tekstiä eikä niitä
vartioida. Kuiva ajo merkitsee jokaisen repliikin **UUSI**,
**MUUTTUNUT** tai **AJAN TASALLA** ja tulostaa lopuksi valmiin taulun
liitettäväksi — päivitä se ajon jälkeen, muuten peli pysyy hiljaa.

## Kaiku

Saapumisrepliikit (`js/liviapuhe.js LIVIAN_SAAPUMISREPLIIKIT`) ovat
`avaus-1` (Livia lennähtää mukaan), `paljastus-1` (tulee sähkeen
kanssa) ja `sofia-7` (`paluu`: Livia palaa pöllön luota ja aloittaa
raporttinsa jo ilmasta). Muut kaupunkirepliikit sanotaan pelaajan
vieressä, joten niissä kaiulla ei olisi mitään kerrottavaa. Näistä
kolmesta tehdään ffmpegillä oma `-kaiku.mp3`, jossa kaikuinen ja
vaimennettu raita häipyy 1,5 sekunnissa pois ja kuiva raita nousee
täyteen tasoon — pulu huutaa viestiä jo lentäessä ja on perillä reilun
sekunnin kuluttua. Peli soittaa saapumisrepliikistä kaikuversion, muista
kuivan.

Efekti leivotaan tiedostoon eikä tehdä Web Audiolla: kuplaäänet soitetaan
tavallisella `<audio>`-elementillä, ja konvolveri vaatisi koko soittotien
vaihtamisen AudioContextiin kahden repliikin takia.

## Manifesti

`aanet/pulu/manifesti.json` — koko repliikistö, ei vain ajon osa:

```json
{ "versio": 1, "kansio": "aanet/pulu", "paivitetty": "2026-09-06",
  "repliikit": [ { "avain": "avaus-1", "lahde": "avaus", "indeksi": 0,
    "teksti": "…", "merkit": 45, "kuplaSekunteina": 2.8,
    "tiedosto": "livia-avaus-1.mp3", "kaiku": "livia-avaus-1-kaiku.mp3",
    "saapuu": true, "kesto": 3.4, "kaikuKesto": 3.6 } ] }
```

Peli ei lue manifestia (nimi johdetaan koodista); se on ämpärin
sisällysluettelo ja ajon kuitti. Puuttuva tiedosto on hiljainen — kupla
toimii ilman ääntä kuten ennenkin.

## Ajojärjestys

1. `toiminto: aanet` → kuuntele esikuuntelut, valitse `voice_id`.
2. `toiminto: kuiva` → tarkista tekstit, tagit ja kestot.
3. `toiminto: generoi`, `aani: <voice_id>` → generoi ja vie ämpäriin.
4. Kuuntele. Tekstin tai äänen muuttuessa: `pakota: kyllä` (tarvittaessa
   `repliikit: avaus-2,paljastus-1`).

## Pituusraja — repliikit on lyhennettävä

Kuplien rytmi ohjaa ääntä (*"luenta seuraa kuplia"*): kupla vaihtuu
`min(8200, max(2800, merkit × 58))` millisekunnin kuluttua, ja seuraavan
repliikin alkaessa edellinen äänite häivytetään pois. Nopea puhe etenee
noin 14 merkkiä sekunnissa, kuplan rytmi noin 17 — eli **jokainen nykyinen
repliikki jää kesken**. Sarjan VIIMEINEN repliikki saa puhua loppuun
(6.9.2026 muutos), muut eivät.

Nykytila ja ehdotukset (päätoimittaja päättää; kaanonia ei muuteta täällä):

| Avain | Merkkejä | Puhe ~s | Kupla s | Ehdotus (merkkejä) |
| --- | --- | --- | --- | --- |
| avaus-1 | 45 | 3,2 | 2,8 | kelpaa (ero 0,4 s) |
| avaus-2 | 112 | 8,0 | 6,5 | "Minä olen Livia. Pöllö luki isoisäsi kirjan, ja minä kannoin ne sähkeet." (72) |
| avaus-3 | 119 | 8,5 | 6,9 | "Valitse rauhassa mistä aloitat — vaikka se maanosa, joka kutkuttaa eniten." (74) |
| avaus-4 | 120 | 8,6 | 7,0 | "Anteeksi valikoima: pöllö on tarkistanut vasta yhden reitin. Ateenasta se alkaa." (80) |
| avaus-5 | 92 | 6,6 | 5,3 | "Perillä sinua odottaa Viisas Pöllö. Minä olen vain viestinviejä." (64) |
| paljastus-1 | 72 | 5,1 | 5,6 | uusittu 7.9.2026, mahtuu kuplaan |
| paljastus-2 | 77 | 5,5 | 6,0 | uusittu 7.9.2026, mahtuu kuplaan |
| paljastus-3 | 61 | 4,4 | 4,8 | uusi 7.9.2026, mahtuu kuplaan |
| lehtivinkki-1 | 27 | 1,9 | 3,2 | uusi 7.9.2026, mahtuu kuplaan |
| mannerivihje-1 | 143 | 10,2 | 8,2 | "Kuule — jos tämä maa alkaa tuntua pitkältä, kerää rahaa lentoon. Isosta kaupungista pääsee toiselle mantereelle." (112, viimeinen kupla → saa puhua loppuun) |

Nyrkkisääntö: **enintään noin 85 merkkiä** repliikkiä kohti (≈6 s).
Kuiva ajo laskee jokaiselle repliikille ylityksen merkkeinä.

## Muut Livian repliikkilähteet (ei vielä äänitetty)

- `js/fokusvirta.js LIVIAN_SAAPUMISET` — 10 kaupunkikohtaista
  saapumisrepliikkiä (Venetsia, Firenze, Dubrovnik, Budapest, Wien,
  Kreeta, Sisilia, Odessa, Marseille, Pariisi), 190–260 merkkiä eli
  2–3 kertaa liian pitkiä puheeksi sellaisenaan.
- `js/fokusvirta.js` fokuskaupunkien maadoituskommentit (paketeissa
  `js/packs/fokusvirta-<id>.js`, kenttä `pollo.maadoitus`) — Ateena ja
  Sofia on jo äänitetty, muut neljä eivät.
- `js/pollo.js LIVIAN_MIETINNAT` — 52 odotusriviä (yleiset, vastaus,
  pitkat). Lyhyitä (30–60 merkkiä) ja arvottuja: sopisivat äänitettäviksi
  hyvin, mutta niitä on paljon.
- `js/fokustehtavat.js` — pullatarjouksen kelluke- ja kuittausrivit.

Näiden äänittäminen on oma tilauksensa: lähde lisätään
`LIVIAN_AANILAHTEET`-listaan ja tekstit `repliikit()`-funktioon, jolloin
nimeäminen, kaikusääntö, manifesti ja testit pätevät sellaisenaan.

## Kuplien näkymä ruudulla ja Livian loki (7.9.2026)

Omistajan linjaus (Raamattu, *"PULUN KUPLAT: VAIN VIIMEISIN, HISTORIA
CHATISSA"*): kartan päällä näkyy **vain viimeisin kupla**, kelaus
laajentaa näkymän ylöspäin noin kymmeneen tekstiriviin, ja kartan liike
supistaa sen takaisin yhteen — kaikki pehmeästi animoiden. Repliikkien
sanoja, paljastussarjan ajoitusta tai lehtivinkin logiikkaa tämä ei
kosketa; kyse on pelkästä näkymästä.

| Osa | Missä |
| --- | --- |
| Pinon laajuus (`pinoLaaja`, `laajennaPino`, `supistaPino`, `paivitaPinonKorkeus`) | `js/pollo.js` |
| Kelauksen tunnistus (rulla, sormen veto, nuoli ylös, Escape) | `js/pollo.js varmistaPino` |
| Supistus kartan vedosta (dokumentin `pointerdown`) | `js/pollo.js seuraaSulkemista` |
| Korkeuden liuku, häivytys ja puhelimen katto | `css/styles.css .pollo-kuplapino` |
| Laitteen loki (`matkakirja-livia-loki`, katto 400) | `js/pollo.js lueLivianLoki`, `kirjaaLivianLokiin` |
| Lokin lataus chattiin ja kuplaviestien asu | `js/pollo.js lataaLokiVirtaan`, `css .pollo-kuplaviesti` |
| Selainvartiot | `tools/savukkeet/savuke-pulun-kuplat.mjs` |

Muistettavaa:

- **Supistettu korkeus mitataan, ei arvata.** `paivitaPinonKorkeus`
  asettaa pinon katoksi viimeisimmän kuplan mitan pikseleinä;
  laajennettuna inline-arvo poistuu ja css:n oma katto
  (`min(60vh, 14rem)`, puhelimella `min(45vh, 14rem)`) on taas voimassa.
  Molemmat päät ovat pikseleitä, joten `transition: max-height` liu'uttaa
  niiden välillä. Ensimmäinen kupla ja liikeherkkyys ohittavat liu'un
  (`.pollo-kuplapino-hyppy`).
- **Supistettuna ei tehdä FLIP-siirtoa.** Vanhat kuplat ovat pinon
  leikkauksen takana, joten niiden nousu olisi liikettä jota kukaan ei
  näe — ja se kilpailisi korkeuden liu'un kanssa.
- **Loki on oma avaimensa eikä osa pelitallennusta.** Se saa kadota
  (yksityinen selaus, muisti täynnä) ilman että peli menettää mitään, ja
  uusi peli ei pyyhi sitä. Merkintä on `{ r, t, aika }`, jossa `r` on
  `kupla`, `kayttaja` tai `pollo`. Chattiin loki ladataan **kerran**,
  ensimmäisellä avauksella, istunnon omien viestien yläpuolelle; ladatut
  rivit kantavat luokan `.pollo-historiaviesti` eivätkä siksi estä
  tervehdystä.
- **Chatin tervehdys on kolme virkettä** ja sen ydin lihavoidaan
  (`TERVEHDYS_ALKU` + `TERVEHDYS_YDIN` + `TERVEHDYS_LOPPU`,
  `naytaTervehdys`). Teksti on kaanonia — päätoimittaja kirjoittaa.
- **Laajennus hakee lokista aiemmat kuplat** kartan päälle
  (`taytaPinoHistorialla`, enintään kuusi). Ne ovat lajia `historia`:
  kartan kosketus ei poista niitä, napautus avaa chatin.
