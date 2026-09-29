# Pulun ISS-tervetulo — natiivispeksi

Lähde: web PR #3575, commit `761f0893a` (origin/main). Kattaa A–C-tervetulon (`js/linssit/pulu-tervetulo.js`) ja D-rajapinnan (`js/linssit/pulu-iss.js`), joka EI ole kytketty ISS-kyytiin kummassakaan koodikannassa (pulu-iss.js:16 "rajapinta, ei vielä kytketty"). Natiivin tiedostoja ei muokattu, vain kartoitettu (proto-repo, haarat `juna/b13` ja `linssiseppa/pulun-taulu`).

## 1. Repliikit

Tekstit ovat kaanonia `js/livia.js:975-1002` (`LIVIAN_ISS.a/b/c/d`) — ei kopioitu tähän sanatarkasti, vain tiivistettynä. Ääniosoitteiden yhteinen juuri (`js/liviapuhe.js:266-276`): `aanet/pulu/versiot/5d65b85250a9/pulu-16f2c04e9e19bef41d64/tasoitettu/livia-<avain>.mp3`. Poikkeus: `iss-a-2` ja `iss-d-3` uudelleenäänitetty myöhemmin erässä `pulu-ad4d6fcc55d7dd86e8ac` (`versiot/ca095f4d3132/…`). Kestot `js/liviapuhe.js:283-313`. TTS-tunnetagit (jo poltettu äänitteeseen, ei siirrettävää natiiviin) `tools/generoi-pulu.mjs:598-618`.

### A–C: tervetulo, kerran per laite (pulu-tervetulo.js:74-93 `PULUN_TERVETULON_JAKSO`)

| avain | sisältö (tiivis) | kesto s | kamera/toimi | TTS-tagit alku…kohdat…loppu |
|---|---|---|---|---|
| iss-a-1 | tervetuloa avaruuteen; Astronautin kamera = oikeita ISS-valokuvia | 14.32 | – | [wings flapping][excited] … "Tämä on Astronautin kamera":[proud] |
| iss-a-2 | ~400 km korkeus, letkaus sedästä | 12.16 | – | [mischievously] … loppu [pause] |
| iss-b-1 | esittelee 3 suosikkia: Venetsia, Alpit, Santorini | 8.32 | – (liikettaVaativa, ei omaa toimea) | [curious] |
| iss-b-2 | valitsee Venetsian, pyöräyttää pallon sen ylle, kysyy | 6.96 | `pyorayta` @2000 ms, kesto 2600 ms → lat 45.44/lon 12.332 (Venetsia) | [excited] … "Pyöräytän":[wings flapping] … "noin.":[whoosh] |
| iss-c-1 | [napautusääni] nokka väärässä kohdassa, Saharan silmä, pahoittelu | 10.32 | `rappaise` @250 ms (hetkellinen: avaa väärän kohteen kuvan) | [tap][gasp] … "Nokka osui":[embarrassed] … "Painottomuus":[sigh] |
| iss-c-2 | pahoittelee lisää, palauttaa alkunäkymän, luovuttaa ohjat | 11.12 | `palaa` @3080 ms, kesto 2780 ms → `aloitustila` (seuraa: true) | [apologetic] … "Viedään":[wings flapping] … "Kas niin.":[whoosh] … "Lupaan.":[pause] |

### D: ISS-kyyti, rajapinta ei kytketty (pulu-iss.js:16-27)

| avain | sisältö (tiivis) | kesto s | ajastus | TTS-tagit |
|---|---|---|---|---|
| iss-d-1 | Livia radiolla: nyt oikeasti kyydissä | 9.76 | `kyytiAlkoi()` heti | [radio static][excited] |
| iss-d-2 | kiertoaika ~1,5 h, vertailu Ateena–Delfoi | 7.84 | +20000 ms D1:n jonottamisesta (`PULUN_ISS_D2_VIIVE_MS`, pulu-iss.js:67) | [proud] … "Minä en ehtisi":[laughs] |
| iss-d-3 | yöpuolen kaupunkivalot | 9.52 | `yopuoliAlla()`, kerran/sessio | [mischievously] … loppu [pause] |
| iss-d-4 | hyvästely, jää itse kellumaan | 5.68 | `kyytiPaattyi()`, vain jos Livia puhui tässä kyydissä | [warmly] … loppu [wings flapping] |

D:ssä ei kameraliikkeitä — kyydin oma kamera hallitsee koko ajan; Quindar-piippaus soi jokaisen D-repliikin alussa ja lopussa (ei tageissa, malli ei tuota sitä).

## 2. Ajastus ja kamera-ajot

- Odotus: musta verho pois → `PULUN_TERVETULON_VIIVE_MS` 900 ms tauko → A1. Kysely 250 ms (`PULUN_TERVETULON_KYSELY_MS`), katto 20000 ms (`PULUN_TERVETULON_KATTO_MS`) — pulu-tervetulo.js:53/55/57, odotusloop :300-321.
- Repliikkien hengähdystauko `PULUN_ISS_HENGAHDYS_MS` 400 ms (pulu-iss.js:69), käytössä myös A–C:ssä.
- Kameratoimet ajastetaan äänitteen `'playing'`-tapahtumasta, ei kuplan avautumisesta; jos soitin ei kerro alkaneensa `PULUN_TOIMIEN_VARA_MS` 1500 ms kuluessa, toimet ajetaan silti varakellolla (pulu-tervetulo.js:63, 234-249).
- B2 pyöräytys 2000 ms → 4600 ms ("Pyöräytän"→"noin."), kohde `PULUN_SUOSIKKI` {lat 45.44, lon 12.332} (pulu-tervetulo.js:61, 78-82).
- C1 räppäisy 250 ms (napautusääni on äänitteen ensimmäinen äänitapahtuma, puhe "Hups." alkaa 0,86 s) (pulu-tervetulo.js:83-87).
- C2 paluu 3080 ms → 5860 ms ("Viedään"→"Kas niin."), palaa `aloitustila`-pisteeseen seuraten (pulu-tervetulo.js:88-92).
- Ohituksen paluuliuku `PULUN_OHITUKSEN_PALUU_MS` 700 ms, 0 ms Vähennä liikettä -tilassa (pulu-tervetulo.js:65, ohita: 276-299).
- Kaikki ajat mitattu ElevenLabsin forced alignmentilla lopullisista v4-äänitteistä (erä pulu-16f2c04e9e19bef41d64) — päivitettävä, jos äänet generoidaan uudelleen (pulu-tervetulo.js:67-72).
- **Yksikkö natiivissa on SEKUNTI** (`AjaKamera(new Nakyma(lat,lon,h), kestoS, kayrä)`), web käyttää millisekunteja — muunna /1000 kaikkiin yllä oleviin lukuihin.

## 3. Säännöt

- **Ensimmäinen avaus + muisti**: laitteen `localStorage`-avain `PULUN_TERVETULO_TALLE = 'matkakirja-pulu-astro-tervetulo'` (pulu-tervetulo.js:51); lippu kirjoitetaan vasta kun A1 on OIKEASTI näkynyt (pulu-tervetulo.js:230-233, `sanoRivi(0)`). Yksityinen selaus: moduulin oma istuntolippu kantaa istunnon loppuun (pulu-tervetulo.js:98-116, `pulunTervetuloKuultu`/`merkitsePulunTervetuloKuulluksi`).
- **Napautus ohittaa**: kaappausvaiheen `pointerdown`/`keydown`-kuuntelija (pulu-tervetulo.js:318-321) laukeaa VAIN kun `vaihe === 'puhuu'` (pulu-tervetulo.js:191-193, `ohitaNapautuksesta`) — napautus ennen A1:tä on tavallista kartan katselua, ei ohitus. Ohitus vaientaa äänen heti, sulkee väärän kuvan ja palauttaa kameran; "ote on pelaajan (seurantaa ei kytketä takaisin)" (pulu-tervetulo.js:28-31, 276-299).
- **Mykistys**: `pulunIssMykistetty()` (pulu-iss.js:95-102) = kertojan kytkin pois TAI Pulun oma äänenvoimakkuus 0 → jaksoa ei aloiteta lainkaan eikä lippua kuluteta; tervetulo odottaa seuraavaa avausta (pulu-tervetulo.js:37-38, 148-165 vartija).
- **Vähennä liikettä**: `ui.reducedMotion` tai `prefers-reduced-motion` (pulu-iss.js:104-111) → vain rivit, joilla ei `liikettaVaativa` (A1–A2); B–C suodatetaan pois `pulunTervetulonRepliikit()`-suodattimella (pulu-tervetulo.js:39-40, 126-129), ja kameratoimet ohitetaan varmuudeksi myös `teeToimi`-tasolla (pulu-tervetulo.js:201-204).
- **Puheen päättyminen ja luovutus**: `kunRepliikkiLoppuu` (pulu-iss.js:186-205) kuuntelee soittimen `'ended'`/`'error'`-tapahtumaa tai varakelloa (kesto + `PULUN_ISS_VARA_MS` 2000 ms). Jakson lopussa (`valmis()`, pulu-tervetulo.js:220-225) ohjaus jää pelaajalle ilman automaattista seurannan uudelleenkytkentää.
- **Kupla ei näy** (Livia ei vielä pelissä / chatti auki): ensimmäisellä rivillä jakso jää kokonaan pois eikä lippua kuluteta; myöhemmällä rivillä hypätään seuraavaan hengähdyksen jälkeen (pulu-tervetulo.js:227-249, `sanoRivi`).

## 4. Taulun kytkentä (pulu-taulu.js)

- `automaattiKierros` (pulu-taulu.js:702-725) kysyy `tervetulo.tila().vaihe`: taulu odottaa niin kauan kuin vaihe on `'odottaa'` tai `'puhuu'`; muissa vaiheissa taulu avautuu `TAULUN_HENGAHDYS_MS` (600 ms) päästä. Kysely 200 ms (`TAULUN_KYSELY_MS`), katto 90000 ms (`TAULUN_KATTO_MS`).
- Yleisempi `liviaPuhuu(ui, tervetulo)` (pulu-taulu.js:214-219) kattaa myös muun Livia-puheen, ei vain tervetulon.
- **Pulun napautus** (`avaa({syy:'napautus'})`, pulu-taulu.js:576-582): jos Livia puhuu, kutsuu `tervetulo?.ohita?.()` JA `vaikene(ui)` — puhe vaikenee heti ja taulu aukeaa saman tien, ei odota jakson loppuun.
- Vanhat Pulu-kuplat (tervetulon viimeiset, C1–C2, jäävät lukuajakseen näkyviin) piilotetaan taulun avautuessa (pulu-taulu.js:585-590).

## 5. Natiivin vastineet ja puuttuvat rajapinnat

Ei muokattu, vain kartoitettu:

| Web | Natiivi (olemassa) | Huomio |
|---|---|---|
| `polloLinssikupla`+`soitaLivianAani` | `Pulu.cs:579 Sano(...)`, `:358 Toista(...)`, `:611 AaniOsoite(lahde, indeksi, versio)` | rakenne vastaa suoraan |
| tekstipohjainen ele-päättely | `Pulu.cs:531 RepliikinEle(t)` (static) | jo olemassa, ei uutta logiikkaa |
| `avaruus.katsoKohteeseen(lat, lon, {kestoMs})` | `AstronauttiLinssi.cs:471 AjaKamera(new Nakyma(lat,lon,h), kestoS, Kamerakayrat.Pehmea)` | valmis pehmeä käyrä sopii B2:een sellaisenaan |
| `avaruus.palaaAloitukseen(tila, {kestoMs, seuraa})` | `AstronauttiLinssi.cs:531 AjaKamera(talteen, kestoS, Kamerakayrat.Funktio(Kayra.Kuminauha, PaluunYlitys))` | valmis "kuminauha+ylitys"-käyrä sopii C2:een/ohitukseen |
| `avaruus.paljastettu()` | `AstronauttiLinssi.cs:106 Vaihe` (`AvauksenVaihe.Pois` = paljastettu), käytössä jo `PulunTauluNakyma.cs:350` | uusi tervetulokoodi voi lukea `Vaihe` suoraan |
| `ui.reducedMotion` | `y.VahennettyLiike` (AstronauttiLinssi.cs:206, 422, 471, 531) | nimeä johdonmukaisesti, ei uutta lippua |
| taulun automaattiKierros + napautus-vaikene | `PulunTauluNakyma.cs:345 AutomaattiKierros()`, `:161 Avaa()` (`Aanet.PuluPuhuu`-tarkistus + `"vaiensi"`-loki :165-170) | **PUUTTUU**: :351 tarkistaa vain `Aanet.PuluPuhuu`, ei odotusvaihetta ennen puhetta |

Puuttuvat/rakennettavat:

1. Kokonaan uusi tilakoneluokka (esim. `PulunTervetulo`) vastaamaan `aloitaPulunTervetulo`: vaihe (odottaa/puhuu/valmis/ohitettu/pois), ajastimet, `Ohita()`, `Pura()`, `Tila()`. Ei vastinetta missään proto-tiedostossa.
2. Tapa avata väärän kohteen kortti (C1) ja sulkea se (C2) samalla kahvalla kuin pisteen napautus (`AvoinKuva`, AstronauttiLinssi.cs:107).
3. `PulunTauluNakyma.AutomaattiKierros` (:345-360) ja `Avaa` (:161-178) tarvitsevat lisäehdon nykyisen `Aanet.PuluPuhuu`-tarkistuksen rinnalle, ja `Avaa`:iin `tervetulo?.Ohita()`-kutsun `"vaiensi"`-haaraan.
4. **Quindar-piippaus**: `Aanet.cs`:ssä ei ole oskillaattori-/siniäänirajapintaa, vain nimetyt esirekisteröidyt tehosteklipit (`RekisteroiTehoste`/`Tehoste`/`PulunTehoste`, Aanet.cs:334-368, 719-726). Joko (a) esirenderöity 250 ms 2525 Hz -liite `PulunTehoste`-nimellä, tai (b) uusi `AudioClip.Create`-pohjainen synteesiapuri. Web-vakiot siirtyvät suoraan: 2525 Hz, 250 ms, taso 0,1× puhetaso, reunapehmennys 6 ms (pulu-iss.js:53-65).
5. D-osan Livia-repliikit: `AstronauttiLinssi.cs:201 NapautaIss()` / `:222 PoistuKyydista()` / `:191-192 Kyyti`/`Kyydissa` ovat olemassa, mutta eivät kutsu Livia/Pulu-koodia — täsmälleen sama tilanne kuin webissä (pulu-iss.js:16). Kytkentä on erillinen, myöhempi tehtävä molemmilla puolilla.

## 6. Testit (webissä)

`tests/pulu-iss.test.mjs` (486 riviä, lisätty tässä commitissa): tynkäkello/soitin/kupla/dokumentti/muisti, ei selainta eikä ääntä. 14 testiä kattaa: kaanoninen teksti+ääni+kesto per repliikki; A1–C2-järjestys kameran kanssa; napautus ohittaa ja vaientaa+palauttaa näkymän; ohitus ennen kameraliikettä ei liikuta kameraa; kerran-muisti (laite+istunto); kupla ei näy → jakso pois, muisti ennallaan; mykistys → ei aloitusta; Vähennä liikettä → vain A1–A2; odotus mustalle verholle; D1 piippauksin + D2 ~20 s myöhemmin + D3 yöpuolella + D4 poistuessa; D1 kerran/sessio; mykistys D:ssä; `pura()` hiljentää kaiken myöhemmän; Quindar-parametrit (2525 Hz, 250 ms, pehmeät reunat, sama äänikonteksti). Sama commit päivitti myös `tests/astronautin-kuvaselain.test.mjs`, `tests/livia-aani.test.mjs`, `tests/pulun-aaniputki.test.mjs` ja `tests/horatio-livia-europe-batches.test.mjs` (äänitaulukoiden ja putken laajennukset uusille iss-avaimille).
