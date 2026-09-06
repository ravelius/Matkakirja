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
| `tests/livia-aani.test.mjs` | nimet, kaiku, manifestin muoto, kytkentä peliin |

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
| paljastus-1 | 168 | 12,0 | 8,2 | "Kaak. Sähke pöllöltä: \"Tervetuloa Kreikkaan.\" Pöllö on juuttunut matkoilleen. Minä tuuraan." (91) |
| paljastus-2 | 210 | 15,0 | 8,2 | jaa kahdeksi kuplaksi: "Ei hätää. Olen kantanut sen sähkeet vuosia ja lukenut joka ikisen. Melkein joka ikisen." (87) + "Tämän loppu kuuluu: ratkaise tehtävä Ateenassa. Napauta kaupungin kultaista merkkiä." (84) |
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
