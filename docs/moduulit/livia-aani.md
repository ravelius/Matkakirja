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

## Kaupungin kulku: luenta — pulu (omistaja 7.9. ja 8.9.2026)

Raamattu, KAUPUNGIN KULKU: EI KUVIA, PULU - LUENTA - PULU — ja sen
kavennus 8.9.2026, sanatarkasti: *"ota kaikki pulun alustukset pois."*
Saapuminen on kaksi pulun hetkeä, ja kumpikin lukee pakkauksen
`pollo`-lohkosta:

| Kenttä | Milloin | Mitta |
| --- | --- | --- |
| `huudahdus` | luennan **aikana**, `{ kohta, teksti }` | kupla häipyy 2 s:ssa |
| `kommentti` | luennan **jälkeen**, 1–2 kuplaa | kuplan lukuaika kumpikin |

**Isoisä aloittaa.** Alustuskupla ennen luentaa on poistettu joka
kaupungista (`pollo.alustus`, 18 pakkausta), eikä luentaa siksi enää
lykätä pulun takia: se lähtee heti merkinnän piirrosta (`js/ui.js
renderFact` → `asetaMerkinnanLuenta`), ja välihuuto ajastetaan samasta
kohdasta (`fokusvirtaHuudahdus`). Ainoa lykkäys on yhä Ateenan
ensisaapumisen tuurauspaljastus, ja välihuuto odottaa senkin.
**Ateena on ainoa kaupunki, jossa pulu puhuu ennen isoisää** — siellä
puheenvuoro on vanha `pollo.maadoitus`.

Huudahduksen ajoitus tulee luennan äänitteen kestosta kerrottuna
kohdan merkkipaikalla (`kohta` esiintyy `matkakirja.teksti`-kentässä
tasan kerran); ilman äänitettä varapolku on kirjoituskoneen eteneminen.
Välihuuto soi kertojan **päälle** hiljempaa (0,7×) eikä kertoja väisty
(`soitaLivianKaupunkiAani`-asetukset `vaimennus` ja `vaista`).

Kuvia ei näytetä: uuden kulun kaupungin matkakirjakortti on pelkkää
tekstiä, vaikka pakkauksessa olisi vanha `matkakirja.kuva`
(`js/ui.js renderFact` → `fokusvirtaUusiKulku`).

Vanha `pollo.maadoitus` on **varapolku** kaupungille, jota ei ole vielä
kirjoitettu uusiksi: se piirtyy kommenttina eli luennan jälkeen kuten
ennenkin.

## Kaupunkikohtaiset lähteet

Raamattu, VAIN EUROOPPA TYÖN ALLA: puhe soi Euroopan kaupungeissa,
joiden tekstit omistaja on hyväksynyt. Lähteen nimi on **kaupungin
tunnus**, ja indeksi tulee kenttälistan ja sen KUPLIEN järjestyksestä
(`js/liviapuhe.js LIVIAN_KAUPUNKILAHTEET`). Rivi on joko kentän nimi
(yksi kupla) tai `[nimi, kuplien määrä]`.

Uuden kulun kaupungeissa kenttälista alkaa **varatulla paikalla**
(`LIVIAN_VARATTU`) ja jatkuu kentillä `huudahdus`, `kommentti`;
Sofiassa niiden perässä ovat vielä sähketehtävän vaiheet `johdanto`,
`vinkki`, `linkkiSaate`, `oikein`, `odotus`, `paluu`.

**Miksi paikka on varattu eikä poistettu.** Numero on tiedostonimessä,
joten poistetun alustuksen rivin poistaminen taulusta siirtäisi
huudahduksen ykköseksi ja kommentin kakkoseksi — peli hakisi jokaisessa
kaupungissa alustuksen äänen kommentin kuplan alle, ja ainoa korjaus
olisi generoida 18 kaupunkia uudelleen. Varattu paikka ei ole minkään
pakkauksen kenttä, joten sillä ei ole tekstiä eikä siihen osu yksikään
haku; ämpärin `livia-<kaupunki>-1.mp3` jää sinne orvoksi.

| Lähde | Kuplia | Merkkejä | Tiedostot |
| --- | --- | --- | --- |
| `ateena` | 1 | 243 | `livia-ateena-1.mp3` (vanha maadoitus, yhä yksi merkkijono) |
| `sofia` | 13 | 5–85 | `livia-sofia-2.mp3` … `livia-sofia-14.mp3` |
| `istanbul` | 4 | 9–83 | `livia-istanbul-2.mp3` … `-5.mp3` |
| `bukarest` | 3 | 10–80 | `livia-bukarest-2.mp3` … `-4.mp3` |
| `sarajevo` | 3 | 12–84 | `livia-sarajevo-2.mp3` … `-4.mp3` |
| `budapest` | 3 | 12–91 | `livia-budapest-2.mp3` … `-4.mp3` |
| `wien` | 3 | 5–81 | `livia-wien-2.mp3` … `-4.mp3` |
| `praha` | 3 | 12–80 | `livia-praha-2.mp3` … `-4.mp3` |
| `krakova` | 3 | 18–86 | `livia-krakova-2.mp3` … `-4.mp3` |
| `varsova` | 3 | 18–90 | `livia-varsova-2.mp3` … `-4.mp3` |
| `pietari` | 3 | 8–85 | `livia-pietari-2.mp3` … `-4.mp3` |
| `moskova` | 3 | 13–91 | `livia-moskova-2.mp3` … `-4.mp3` |
| `kiova` | 3 | 7–85 | `livia-kiova-2.mp3` … `-4.mp3` |
| `odessa` | 3 | 12–90 | `livia-odessa-2.mp3` … `-4.mp3` |
| `helsinki` | 3 | 13–91 | `livia-helsinki-2.mp3` … `-4.mp3` |
| `tampere` | 3 | 11–80 | `livia-tampere-2.mp3` … `-4.mp3` |
| `tallinna` | 3 | 12–93 | `livia-tallinna-2.mp3` … `-4.mp3` |
| `riika` | 4 | 5–68 | `livia-riika-2.mp3` … `-5.mp3` |
| `vilna` | 4 | 9–76 | `livia-vilna-2.mp3` … `-5.mp3` |

Numero 1 puuttuu joka kaupungilta paitsi Ateenalta: se on poistetun
alustuksen varattu paikka (yllä). Tekstit luetaan pakkauksista
(`js/packs/fokusvirta-<id>.js`) — niitä ei kopioida työkaluun eikä
peliin. Järjestystä ei saa muuttaa jälkikäteen:
numero on tiedostonimessä. Uusi kenttä lisätään listan LOPPUUN, ja
kuplien määrän on vastattava pakkausta (ero kaataa
`tools/generoi-pulu.mjs`:n `kaupunginRepliikit`-funktion).

Peli soittaa nämä kutsulla `soitaLivianKaupunkiAani(ui, city.id,
'<kenttä>', { kupla, teksti })`, joka on hiljainen jokaiselle
kaupungille, jota ei ole taulussa. Kutsupaikat ovat `js/fokusvirta.js`:
ssä siellä, missä teksti oikeasti tulee ruudulle (kevyt kulku,
`FOKUSVIRTA_KORTIT = false`): huudahdus `ajastaHuudahdus` ja kommentti
`fokusvirtaSaapumiskupla`, johdanto ja odotus `sahkeSaateKuplaan`,
vinkki ja linkkiSaate pullanapeista, oikein kuittauskortista ja paluu
`aloitaSahkelento`:n kuplasta.

**Yksi kupla = yksi tiedosto.** Kirjoitettu kupla soi omana
äänitteenään, ja `js/pollo.js naytaPuheenvuoro` saa asetuksen `aani`,
jota kutsutaan jokaisen osan ilmestyttyä. Vanha muoto (yksi pitkä
merkkijono, esim. Ateenan maadoitus) pilkkoutuu ruudulla osiin
(`jaaPuheenvuoroksi`) ja on yhä yksi äänite.

**Kupla odottaa puheen loppuun.** Äänitetty repliikki saa asetuksen
`viive` ja etenee kuplan lukuajalla (`js/livia.js
livianKuplanLukuaika`). Samasta syystä sähkelento (`aloitaSahkelento`)
odottaa kuittauksen (`oikein`) kuplien yhteenlasketun lukuajan ennen
paluukuplaa, ja aarteen paljastus odottaa paluusarjan viimeistä kuplaa.

**Lukuaika on vähimmäisaika, äänite voi venyttää sitä (7.9.2026).**
Lukuaika on arvio tekstin pituudesta, ja Dr. Vonin ajossa kymmenen
repliikkiä 85:stä puhui kuplaansa pidempään (esim. 7,37 s puhetta
5,38 s kuplassa) — seuraava kupla häivytti äänen kesken lauseen. Nyt
kuplan ajastin on `max(lukuaika, äänitteen kesto + 400 ms)`, ja kesto
luetaan siitä samasta `<audio>`-elementistä joka soi (`duration`,
metatietojen tultua). Manifestia peli ei lue eikä uutta verkkohakua
tehdä; ilman äänitettä tai mykistettynä aika on tasan entinen, ja
napautus jatkaa yhä heti.

| Missä | Mikä odottaa |
| --- | --- |
| `js/liviapuhe.js` | `LIVIAN_PUHEEN_HANTA_MS`, `livianAanenKesto`, `livianKuplanAika`, `livianKuplanAjastin` |
| `js/livia.js` | avaussarja (`naytaRepliikki`) ja paljastussarja (`paljastusRepliikki`) |
| `js/pollo.js` | `ajastaPuheenvuoro` kysyy `viive`-funktiolta uudestaan, kun metatiedot ovat tulleet (`aaniKahva`) |
| `js/fokusvirta.js` | `livianPuherytmi` (kommentti, sähkevaiheet), `soitaLivianKaupunkiSarja`, `polloKuplasarja`, `fokusvirtaHuudahdus` (välihuuto ajastetaan luennan kestosta) |

Huudahduksen 2 sekunnin kupla EI odota: se on välihuuto kertojan
päällä, ei repliikki omassa vuorossaan. Vartiot:
`tests/livia-aani.test.mjs` (aika ja ajastin) ja
`tools/savukkeet/savuke-pulun-kulku.mjs` (Budapest, äänite mokattu
7 sekunnin mittaiseksi).

**Vanhentunut äänite on hiljainen myös kaupungeissa** (7.9.2026):
kaupunkirepliikit ovat samassa tiivistevartioinnissa kuin `paljastus` ja
`lehtivinkki`, joten ämpärin vanha tiedosto ei voi soida uuden kuplan
alla. Kutsupaikka antaa aina kuplan tekstin.

## Tarkistuskorostus kartalla (väliaikainen)

Omistajan tilaus 7.9.2026: *"voisit merkitä kartalle nuo kaupungit
korostusvärillä, missä on nämä uudet generoinnit käytössä."*

`js/liviapuhe.js livianKorostetutKaupungit()` palauttaa ne kaupungit,
joilla on uuden kulun repliikit **ja** joiden jokaiselle kuplalle on rivi
`LIVIAN_AANITETYT`-taulussa. Lista on johdettu eikä ylläpidetty käsin.
Pallolla kaupunkipiste on kirkkaan kultainen
(`js/pallolauta/lauta.js kaupunkipisteenVari`), tasolaudalla laatan
ympärillä on kultainen kehä (`css .city-tarkistus`). Kehä ei ota
napautuksia vastaan eikä muuta yhtäkään osumapintaa.

Kytkin on `LIVIAN_KOROSTUS_KAYTOSSA` — päätoimittaja kääntää sen
falseksi, kun omistaja on käynyt kaupungit läpi.

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

## Pulu ja kertoja eivät puhu päällekkäin (omistaja 8.9.2026)

Omistajan vikailmoitus 8.9.2026 klo 12.55, sanatarkasti: *"jos minulla
on maailma tila päällä kehittäjänä ja menen kuuntelemaan kaupunkeja
joissa pululla äänet, niin pulun ja kertojan äänet menevät päällekkäin
ja pulu selittää ensin jotain ihan väärää juttua."*

**Juurisyy: kaksi rinnakkaista kirjanpitoa.** Kertojan luenta eli
`ui.diaryVoice`-kentässä ja pulun repliikki `ui.liviaAani`-kentässä,
eikä kumpikaan tiennyt toisesta mitään — järjestys syntyi pelkistä
ajastimista (luenta → huudahdus → kommentti). Ajastimet
kysyvät kaupunkia vasta lauetessaan, mutta **kesken jäänyt äänite ei
kysy mitään**: se soi loppuun. Kehittäjän maailmatilassa kaupunkia
vaihdetaan napauttamalla (`js/ui.js doKehittajaSiirto`), jolloin lähtö
osuu keskelle pulun lausetta — edellinen kaupungin repliikki jää soimaan
uuden kaupungin luennan alle. Juuri se on omistajan kuulema *"ihan väärä
juttu"*: se on **toisen kaupungin** lause, ei väärä äänite. (Mitattu
selaimella: hyppy Riiasta Vilnaan → `livia-riika-2.mp3` soi Vilnan kuplan
päällä.)

**Korjaus on yksi vuorokirjanpito, ei kahta.** Sama taulu, joka jo tiesi
kaikki soivat luennat taustan väistöä varten (`js/luenta.js
soivatLuennat`), tietää nyt myös **kuka** puhuu:

| Missä | Mikä |
| --- | --- |
| `js/luenta.js` | `PUHUJA_KERTOJA` / `PUHUJA_PULU`, `merkitsePuhuja(ui, audio, rooli)`, `puhujaAanessa(paitsi)`, `luovutaPuhevuoro(audio)` |
| `js/liviapuhe.js` | `soitaLivianAani` ei aloita, jos kertoja on äänessä (`vaista` päällä); merkintä roolilla `PUHUJA_PULU` |
| `js/luenta.js playDiaryVoice` | kertoja odottaa pulun lauseen loppuun (250 ms välein, katto 15 s) |
| `js/fokusvirta.js` | `vaiennaLivianKaupunkipuhe(ui)` katkaisee kaupungin kaikki pulun ajastimet ja soivan repliikin |
| `js/ui.js` | `vaiennaPaikanPuhe()` = kertojan häivytys + edellinen kutsu; sitä käyttävät noppa, jalan, lento ja kehittäjän hyppy |

Samalla korjattiin kaksi kohtaa, joissa järjestys nojasi kelloon:

- **Välihuudon odotus vartioi kaupunkiaan** (`fokusvirtaHuudahdus`).
  Se odottaa lykättyä luentaa; väärässä kaupungissa lauetessaan se
  ajastaisi edellisen kaupungin välihuudon uuden luennan päälle.
- **Kommentti odottaa myös vasta lähdössä olevaa luentaa.** Kutsu tulee
  kirjoituskoneen lopusta, ja kone voi ehtiä maaliin ennen kertojaa —
  ensisaapumisessa luenta odottaa vielä tuurauspaljastuksen kuplia.
  Silloin `ui.diaryVoice` on vielä tyhjä eikä `luennanLoppuun` tiedä
  luennasta mitään — nyt `ui.luennanLykkays` kertoo sen, ja kommentti
  odottaa (400 ms välein, katto 30 s).
- **Pulun loppuhäivytys lasketaan kellosta eikä askelmäärästä**
  (`pysaytaLivianAani`). Neljä kiinteää askelta venyi ajastimia
  kuristavassa selaimessa sekunniksi ääntä sen jälkeen kun peli jo
  käski vaieta.

Kolme sääntöä, jotka on helppo rikkoa vahingossa:

1. **Välihuuto on tietoinen poikkeus.** `huudahdus` soi kertojan päälle
   hiljempaa (`vaista: false`) eikä varaa vuoroa lainkaan — omistajan
   päätös 7.9.2026, ja portti ohittaa sen.
2. **Häivytys luovuttaa vuoron heti** (`luovutaPuhevuoro`). Lähdön
   0,7 sekunnin loppuhäivytys on hyvästely, ei puheenvuoro; ilman tätä
   se olisi vaientanut seuraavan kaupungin ensimmäisen repliikin.
3. **Portti vaientaa vain äänen.** Kupla näkyy ja etenee kuten ennen —
   sama sopimus kuin puuttuvalla tai vanhentuneella äänitteellä.

Vartiot: `tests/puhevuoro.test.mjs` (vuorokirjanpito, molemmat portit,
välihuudon poikkeus, lähdön vaiennus) ja
`tools/savukkeet/savuke-pulun-vuoro.mjs` (selain: hyppy kaupungista
toiseen kesken pulun lauseen).

**Raja:** striimattu lukija (`js/lukija.js`) ei kulje tämän taulun
kautta, koska se ei ole `<audio>`-elementti. Kaupunkien saapumisluennat
ovat äänitteitä, joten vuoro on niissä aina tiedossa.

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
`min(9500, max(3200, merkit × 78))` millisekunnin kuluttua, ja seuraavan
repliikin alkaessa edellinen äänite häivytetään pois. Sarjan VIIMEINEN
repliikki saa puhua loppuun (6.9.2026 muutos). Arvio ei aina osu, ja
7.9.2026 alkaen kuplan ajastin venyy äänitteen todelliseen kestoon
(ks. *Kupla odottaa puheen loppuun*) — lyhyys on silti tavoite, koska
pitkä kupla seisoo ruudulla pitkään.

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
| ateena-1 | 243 | 17,4 | 18,9 | pinoutuu ruudulla, mahtuu osien summaan |
| kaupunkien uusi kulku (95 kuplaa) | 5–93 | 0,4–6,6 | 3,2–7,3 | omistajan hyväksymät tekstit 7.9.2026, jokainen mahtuu kuplaansa |
| mannerivihje-1 | 143 | 10,2 | 8,2 | "Kuule — jos tämä maa alkaa tuntua pitkältä, kerää rahaa lentoon. Isosta kaupungista pääsee toiselle mantereelle." (112, viimeinen kupla → saa puhua loppuun) |

Nyrkkisääntö: **enintään noin 85 merkkiä** repliikkiä kohti (≈6 s).
Kuiva ajo laskee jokaiselle repliikille ylityksen merkkeinä.

Ylitys ei enää katkaise lausetta (kupla odottaa puheen loppuun), mutta
se pidentää kuplan seisomista ruudulla — lyhyys on siis yhä tavoite.

## Muut Livian repliikkilähteet (ei vielä äänitetty)

- `js/fokusvirta.js LIVIAN_SAAPUMISET` — 10 kaupunkikohtaista
  saapumisrepliikkiä (Venetsia, Firenze, Dubrovnik, Budapest, Wien,
  Kreeta, Sisilia, Odessa, Marseille, Pariisi), 190–260 merkkiä eli
  2–3 kertaa liian pitkiä puheeksi sellaisenaan.
- `js/packs/fokusvirta-<id>.js` kenttä `pollo.maadoitus` niissä
  kaupungeissa, joita ei ole vielä kirjoitettu uuteen kulkuun — ne
  piirtyvät kommenttina, mutta niitä ei ole äänitetty.
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

**Päivitys 8.9.2026** (Raamattu, *"PULUN HUUDAHDUS EI KESKEYTA LUKIJAA,
JA KUPLAPINO NAKYY KAHDEKSAAN RIVIIN ASTI KUNNES KARTTA LIIKKUU"*):
oletus kääntyi päinvastoin. Pino on **auki kahdeksaan riviin asti** heti
(ilman lokin historiaa), kartan liike ja Escape supistavat sen yhteen
kuplaan entisellä liu'ulla ja kurkistuksella, ja seuraava uusi kupla
avaa pinon taas. Tila on siksi kolmiarvoinen `pinoTila`
(`'auki' | 'laaja' | 'supistettu'`), jossa `'laaja'` on pelaajan oma
laajennus — vain se hakee lokin aiemmat puheenvuorot pinoon.

| Osa | Missä |
| --- | --- |
| Pinon tila (`pinoTila`, `laajennaPino`, `supistaPino`, `paivitaPinonKorkeus`) | `js/pollo.js` |
| Kelauksen tunnistus (rulla, sormen veto, nuoli ylös, Escape) | `js/pollo.js varmistaPino` |
| Supistus kartan vedosta (dokumentin `pointerdown`) | `js/pollo.js seuraaSulkemista` |
| Korkeuden liuku, häivytys ja puhelimen katto | `css/styles.css .pollo-kuplapino` |
| Kurkistus edelliseen kuplaan (`PINON_KURKISTUS_REM`, `pidaPinoPohjassa`) | `js/pollo.js`, `css .pollo-kuplapino-kurkistus` |
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
- **Edellisestä kuplasta pilkottaa alaosa** (omistaja 7.9.2026 ilta:
  *"pulun kuplassa saisi yläpuolella näkyä vähän sitä aiempaa kuplaa.
  Nyt se jää kokonaan peittoon. Se voisi näkyä niin, että kuplan alaosa
  näkyy ja sitten se feidautuu läpinäkyväksi."*). Supistetun pinon
  katto on viimeisin kupla + `PINON_KURKISTUS_REM` (2.2 rem = kuplien
  väli ja noin puolitoista tekstiriviä), ja yläreuna häivytetään saman
  mitan matkalta. Häivytys on maski, jota ei voi liu'uttaa arvosta
  `none` gradienttiin, joten gradientti on AINA päällä ja sen pituus on
  rekisteröity muuttuja `--kuplapino-haive` (0 px = umpinainen maski).
  Rekisteröinti (`@property`) puuttuu vanhasta iOS-Safarista (< 16.4):
  siellä maski toimii mutta ei liu'u. Yhden kuplan pinossa ei ole
  lisäkorkeutta eikä häivytystä — häivytys söisi ainoan kuplan
  ensimmäisen rivin. "Edellinen" on aina pinon toiseksi viimeinen
  elementti, joten laajennuksesta jäänyt historiakupla kelpaa siksi
  vasta kun se on pinossa.
- **Häipyvä siivu ei ota napautusta vastaan** (`pointer-events: none`
  supistetun pinon ei-viimeisille kuplille): puoliksi leikattu kupla
  avaisi chatin vahingossa. Ele osuu pinoon itseensä, joka ei tee
  mitään eikä päästä sitä kartallekaan (kehys on "sisäpuolta").
- **Supistuksen aikana pino pidetään pohjassa joka kehyksessä**
  (`pidaPinoPohjassa`). Kertavieritys pohjaan tehdään ennen kuin katto
  on ehtinyt kutistua, jolloin selain rajaa `scrollTopin` vielä laajaan
  `clientHeightiin` — ja supistuttuaan ruudulle jäi VANHIN kupla
  uusimman sijaan. Kurkistus teki vian näkyväksi. Laajennuksessa
  pohjaan ei pakoteta: silloin pelaaja on itse kelaamassa.

## Pulun äänitaso on kertojan alapuolella (omistaja 8.9.2026)

Omistaja, sanatarkasti: *"Pulun ääni on vähän voimakkaampi kuin
kertojan, sitä voisi laskea koko pelissä hieman."*

Kertoja soi pelin yleisellä puhevoimalla sellaisenaan (`js/luenta.js
playDiaryVoice`: `audio.volume = puheVoima()`), ja pulu soi samalla
luvulla — mutta käheä, nopea ja tagitettu ääni kuulostaa
voimakkaammalta kuin kertojan tasainen luenta. Nyt kaikki pulun
äänitteet kulkevat yhden kertoimen kautta:

`js/liviapuhe.js` → `LIVIAN_PERUSTASO = 0.8`, ja `soitaLivianAani`
laskee voimakkuuden `puheVoima() × LIVIAN_PERUSTASO × vaimennus`.

Kutsupaikkojen vaimennukset (`HUUDAHDUKSEN_VAIMENNUS`,
`LIVIAN_VALIHUOMION_VAIMENNUS`, kumpikin 0,7) **kertovat** tähän lukuun
eivätkä korvaa sitä, joten välihuuto on yhä suhteessa yhtä paljon
hiljaisempi kuin ennen. Yksi luku kattaa kaikki pulun äänet:
kaupunkirepliikit, välihuomiot linsseissä, avauksen, paljastuksen ja
lehtivinkin.

## Kuplat tyhjenevät uudessa kaupungissa (omistaja 8.9.2026)

Omistaja, sanatarkasti: *"Pulun puhekuplat pitää tyhjentyä kun tullaan
uuteen kaupunkiin."*

Kuplapino jäi ennen ruudulle kaupungin vaihtuessa, ja uuden kaupungin
kuplat kasautuivat edellisen kaupungin puheiden päälle — pinossa oli
kahden kaupungin keskustelu yhtä aikaa. Tyhjennys tehdään
LÄHTÖHETKELLÄ, samassa paikassa jossa lähtö jo vaientaa molemmat äänet:

`js/ui.js vaiennaPaikanPuhe()` = `haivytaLuenta` +
`vaiennaLivianKaupunkipuhe` + `polloKuplatPois()`.

Sitä kutsuvat kaikki neljä lähtötapaa (noppa, jalan, lento, kehittäjän
hyppy). Pino häipyy pehmeästi (`js/pollo.js poistaKuplat`, 200 ms) eikä
räpsähdä pois, ja kaikki sanottu jää chatin historiaan
(`kirjaaKuplaViestiin`) — kelattavaksi kuten ennenkin. Vartiot:
`tests/puhevuoro.test.mjs` (kutsu on yhdessä paikassa) ja
`tools/savukkeet/savuke-pulun-kuplat.mjs` vartio 8 (Riika → Vilna:
Riiassa sanottu ei ole Vilnan pinossa mutta on yhä lokissa).
