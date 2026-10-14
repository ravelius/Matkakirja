# ÄÄNILÄHTEET-inventaario (Äänittäjä 14.10.2026, PT:n pyyntö omistajan toiveesta; PT kirjaa Raamattuun)

Tämä on kooste: vientipakettien `proto-3d/_valmiit/*/LAHTEET.md`-tiedostot (n. 260 pakettia), Raamatun linjaukset (SOUNDLY PRO, ÄMPÄRI EI OLE JAKELUA, MAKSULLISET LÄHTEET, TOISTAISEKSI EI OSTOJA, haku vain virallisilla rajapinnoilla) ja äänisivun lähderivit. Pakettimäärät = montako LAHTEET.md mainitsee lähteen. EI ole oikeudellinen arvio: sellaiset kohdat on merkitty **TARKISTA**.

## Yhteiset säännöt (kaikille lähteille)
- Ämpäri (media.matkakirja.app) EI ole jakelua: ostetut/ladatut äänet viedään normaalia reittiä (`vie-paketti.sh`), tarkistetaan vain, saako pelissä käyttää (kaupallinen käyttö, nimeäminen, tekoälykoulutuskielto). Ämpäri EI ylikirjoita: muutos = uusi nimi/versio.
- Jokaisella vientipaketilla `LAHTEET.md`, jossa lisenssi (vie-paketti.sh vaatii sanan PD/CC0/CC BY/MIT/oma/lisenssi), SHA256SUMS ja ääniportti (`aaniportti.py`: true peak, leikkautuma, kovuus) ennen vientiä.
- Raaka-aineistot ja masterit NAS:lle (`/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/aanet/<aihe>/`, nyt 31 Gt: soundly, shakki-wien, pallokisa, pallo-ateena-lontoo, lyhty-pallo-v2, olavinlinna-lyhty, linnan-keittio, iss-raketti, taidehalli) tai T7:lle (`/Volumes/T7 4TB/`), ei käynnistyslevylle. API-avaimia ei koskaan repoon/lokiin.
- Haku vain virallisilla rajapinnoilla tai robots.txt:n ja käyttöehtojen sallimilla poluilla; robottitarkistuksia ei ohiteta.
- Lataukset: omistaja 12.10. "saa ladata vapaasti lisensoituja (CC0, CC BY, PD)"; maksulliset lähteet vain omistajan ostamina ja "toistaiseksi ei ostoja" (12.10. 04.51: pilotit vain ilmaisilla/omilla).
- CC BY / nimeämisvaativat: tekijätieto lisätään pelin lähdetietoihin (`js/lahteet.js`) vientiä seuraten (esim. Aalto OK5 on jo; **tarkista** että jokainen CC BY -äänen nimeäminen on siellä: Yle Arkisto, CGEffex, Terhen, antistatikk jne.).

## Lähteet

| Lähde | Lisenssi / ehdot | Käyttösääntö | Säilytys | Kuka hakee | Paketteja |
|---|---|---|---|---|---|
| **Soundly Pro** (SND-tunnukset) | Omistajan kuukausitilaus 9.10.2026 alkaen; kaupallinen käyttö peleissä, ei nimeämisvaatimusta. **EULA: tilauksen päättyessä peliin viemättömät raakatiedostot poistetaan** → peliin viedyt käsitellyt äänet saavat jäädä, raakat eivät. | Ensin ilmainen Sonniss, sitten Soundly pelin äänitarvekartoituksen erissä (scratchpad `aanitarve-soundly-20261009.md`). Tilaus pidetään voimassa niin kauan kuin aineistoa käytetään. Jokainen kappale eristysportin (laatuportti) kautta. | Raaka NAS `aanet/soundly/<erä>` (m01-sali, m02-askeleet, m03-sorina…); ämpäriin vain käsitellyt peliäänet | Lataus Soundlyn "Send to folder" -toiminnolla koodaus-käyttäjän näytöllä, kun omistaja ei käytä konetta (ei cmd+shift-yhdistelmiä); Äänittäjä/LS2 | 26 |
| **Sonniss GDC Game Audio Bundle** (2017, 2020, 2021–23 jne.) | Rojaltivapaa, ei nimeämistä, kaupallinen käyttö peleissä. **TARKISTA**: tekoälykoulutuskielto (Raamatun lisenssitarkistus). | Sallittu ämpäriin normaalia reittiä (Raamattu). Vain valitut tiedostot käsiteltyinä; raaka-arkisto ei jakoon. | T7 4TB: `/Volumes/T7 4TB/sonniss/` (GDC 2017 osat 1–6/9 zip + `poiminta`, `silmukat`, luettelot) ja `/Volumes/T7 4TB/koodaus/Soniss/` (GDC 2020 osat, 2023 osat, puretut `Sonniss-N`-kansiot). 2017 osat 7–9 ja 2018/2019 puuttuvat. Hakemisto: `proto-3d/_tyo/sonniss/hakemisto.json`, varastoluettelo `docs/raportit/sonniss-varasto-20261009.md` | Äänittäjä / Pelikoodari (hae.py) | 15 |
| **Freesound CC0** | CC0 1.0, ei nimeämistä | Sallittu (Raamattu "Freesound CC0"); haku **vain API:lla** Actions-salaisuudella (`aanihaku.yml`, tila `ehdokkaat`; syöte `maara`, concurrency peruu odottavan ajon); esikuuntelu-mp3 ladataan cdn.freesound.org kuvaavalla UA:lla; sivuhakua/skriptattua scrapingia ei | Raaka NAS `aanet/<aihe>/`, ämpäriin käsitelty | Äänittäjä (gh workflow run), PT/omistaja valitsee kuuntelemalla | 19 (CC0 yht. 152 mainintaa) |
| **Freesound CC BY (2.0/3.0/4.0)** | Nimeäminen VAADITAAN (tekijä, lisenssi, id); CC BY 4.0 tai uudempi suositus | Sallittu (omistaja 12.10.); jokaisen CC BY -äänen tekijä kirjataan `LAHTEET.md`:hen ja pelin lähdetietoihin (`js/lahteet.js`); esim. CGEffex "Space Shuttle Launch" (93078), Yle Arkisto (naurulokit 250866, shakkikello), Terhen (234174), antistatikk (161839, CC BY 3.0) | kuten yllä | Äänittäjä | n. 19 (CC BY yht. 148 mainintaa, sis. kuvat/data) |
| **Aalto Acoustics Lab OK5 -huonevasteet** (Zenodo 10.5281/zenodo.18622201) | CC BY 4.0, **nimeäminen vaaditaan**: "Kaiut: Aalto Acoustics Lab, OK5 (de las Heras, Meyer-Kahlen, Lokki, Arend), CC BY 4.0" | Konvoluutiokaiku (lyhtyhetki v2, porttikäytävä, museon askeleet/sali, pallo-/lyhty-kaiut) | NAS `aanet/lyhty-pallo-v2/ir` ym. | Äänittäjä; Zenodo: EI `/api` (robots), vain `/records/<id>/files/…` | 10 |
| **Yle Arkisto (Freesound)** | CC BY 4.0, tekijä YleArkisto | Naurulokit, shakkikello, Suomen linnut: nimeäminen pelin tekijätiedoissa | NAS | Äänittäjä | useita |
| **ElevenLabs** (TTS, Viisas Kertoja / William / Pulu) | Äänittäjän/omistajan maksullinen ElevenLabs-tilaus; tuotetun puheen kaupallinen käyttö tilauksen ehdoilla. **TARKISTA** kaupallisen käytön ehdot nykyisellä tilauksella ja Viisas Kertoja -äänen (Sz0tRTEpybtDJ9ru2kgD) jakolisenssi. | **Isoisä AINA eleven_v3** (text-to-dialogue, stability 0,5; omistaja 14.10.), muut (William, Pulu, kertojat) **eleven_v4_turbo**; yksi otto/teksti; pcm_44100 → pakkaus kerran; maksullinen generointi vain omistajan luvalla ja määrällä; ei vertailuottoja; language_code fi | Tekstit/raaka PCM työkansioissa `proto-3d/_tyo/<aihe>/raaka`; ämpäriin vain valmis mp3 | Äänittäjä (avain `~/.zshrc` ELEVEN_API_KEY) | 52 |
| **Google Lyria 3.5** (musiikki) | Omistajan käyttöoikeus (oma tuotanto) Googlen API-ehtojen mukaan. **TARKISTA** Googlen generatiivisen AI:n ehdot (kielletty käyttö; SynthID-vesileima) | Maksullinen generointi vain luvalla; yksi otto; **sävelkorkeutta EI muuteta** (omistaja 13.10.); ääniportti + häiriötarkistus (`musiikkiharia.py`) | Raaka `proto-3d/_tyo/<aihe>/raaka` | Äänittäjä (GOOGLE_API_KEY `~/.zshrc`) | 14 |
| **NASA (KSC-äänitteet, ISS-kuvat)** | Public domain (NASA-aineisto; Commons PD-merkinnät) | Vapaa; lähde kirjataan | NAS `aanet/iss-raketti` | Äänittäjä | 16 |
| **Wikimedia Commons** | Tiedostokohtainen: PD/CC0/CC BY/CC BY-SA. **BY-SA:ta vältetään** (jakoehto) paitsi erikseen hyväksyttynä (esim. Notre-Damen malli) | Vain PD/CC0/CC BY; tarkista tiedoston lisenssi Commonsista ja kirjaa tekijä | NAS/työkansio | Äänittäjä / roolit | 78 (kuvat+äänet) |
| **Kenney, OpenGameArt (CC0)** | CC0 | Vapaa | NAS | Äänittäjä | 4 |
| **Omat äänitykset ja oma tuotanto** (leikkaus, silmukointi, kaiutus, miksaus, tasaus) | Oma tuotanto (Matkakirja), ei kolmannen osapuolen oikeuksia | Vapaa; vain pelin tarpeeseen | NAS/työkansio | Äänittäjä | 134 |

## Tilausten ja ostojen tila
- Soundly Pro: aktiivinen (omistajan tilaus), EULA-ehto raakojen poistosta tilauksen päättyessä. **Ennen tilauksen lopettamista**: vie kaikki tarvittavat käsitellyt äänet ämpäriin ja poista NAS:n `aanet/soundly/` raakat (tai pidä tilaus). Lista käytetyistä SND-tunnuksista on paketteja `LAHTEET.md`:ssä.
- ElevenLabs ja Google (Lyria): kuukausi-/käyttömaksu omistajan tileillä; ehdot tarkistamatta tässä (TARKISTA).
- Sonniss: ilmainen (ei tilausta), mutta ehdot hyväksytty latauksessa.
- Ostot: "Ei osteta mitään vielä" (12.10.); uusi ostoehdotus (tuote, hinta, lisenssi, hyöty) Päätoimittajan kautta omistajalle.

## Avoimet tarkistukset (ehdotus PT:lle)
1. ElevenLabs: tilaustason kaupallinen lupa ja Viisas Kertoja -äänen käyttöoikeus (ääni on kirjastoääni?).
2. Lyria: Googlen ehtojen kaupallinen käyttö ja vesileima.
3. Sonniss: tekoälykoulutus-/uudelleenjakokielto (peli ei jaa raakaa; ok) — kirjaa ehto lähteisiin.
4. `js/lahteet.js`: täydennä CC BY -nimeäminen kaikille viedyille äänille (Yle Arkisto, CGEffex, Terhen, antistatikk…) — tee kokonaisajo `grep -h "CC BY" _valmiit/*/LAHTEET.md` vs. lahteet.js.
5. NAS:n 31 Gt: Soundly-raakojen poistoaikataulu, jos tilaus loppuu.
