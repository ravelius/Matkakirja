# ISS-otot ilman suomen pakotusta: selvitys ja pakotusehdotus (Äänittäjä 19.10.2026)

Tehtävä: PT 19.10. 07.3x (omistaja 18.10. 17.55: "generoi paikan nimet ja lyhyet tekstit uudestaan jos niitä ei ole vielä generoitu suomi pakotettuna kielenä. pidä myös huoli että jatkossa kaikki ovat pakotettuja."). Ei generointia tehty.

## 1. ISS: mitä EI ole tehty `language_code: fi`

**Pelissä käytössä olevia pakottamattomia ottoja ei ole.** Perustelu:

| ISS-ryhmä | Tila |
|---|---|
| Kertojan 31 repliikkiä (3 863 mrk) | 15.10. alkuperäiset tehty ilman kielikoodia; uusittu fi pakotettuna 18.10. (`<id>-2`, KK 01.13), viittaukset junassa 202. Lista: `aanittaja-iss-kertoja-fi-lista-20261018.md` |
| 277 Kuvat-selitettä | fi pakotettu alusta asti (`generoi.py`) |
| Pulun ISS-otot (`pulu*.py`, `pulu-iss-vastaukset`) | fi pakotettu |
| Raketin selostus (text-to-dialogue) | fi pakotettu |
| **Paikannimet** (kohdevalikon sijainti, kohokohta, oma sijainti, Cupolan napautus) | Ei esigeneroitu: `KupoliAanet.LueNimi` → `Puhe.Lue("kertoja")` workerin kautta (eleven_v4). Worker lähettää fi:n 6.10. 15.27 alkaen (#4055) ja kaikille malleille 18.10. (#4830); nimien luenta tuli vasta 17.10. → kaikki fi |

**Vain ei-käytössä olevat pakottamattomat ISS-otot (10 kpl, ei viittauksia koodissa tai manifesteissa, ei ämpärin käyttöä):**

| id | merkkiä | työkansio |
|---|---|---|
| iss-johdanto-1-cupola | 205 | iss-kupoli-kertoja-20261013 |
| iss-johdanto-3-nopeus | 155 | sama (korvattu v1-nopeus-2:lla) |
| iss-johdanto-4-kierros | 108 | sama (v1-kierros-2) |
| iss-johdanto-5-auringonnousut | 136 | sama (v1-auringonnousut-2) |
| iss-johdanto-6-lansi | 264 | sama (v1-lansi-2) |
| iss-johdanto-7-yo | 150 | sama (v1-yo-2) |
| iss-raketti-fakta-alusta | 236 | iss-fakta-kertoja-20261015 |
| iss-raketti-fakta-nousu | 121 | sama |
| iss-raketti-fakta-toinen-vaihe | 94 | sama |
| iss-raketti-fakta-telakointi | 125 | sama |

Yhteensä **10 ottoa, 1 594 merkkiä** (hinta ~ 1 594 × 0,066 ≈ 105 kr turbolla). Suositus: **ei uusintaa** (ei pelissä); jos omistaja haluaa silti kaikki fi:ksi: 10 ottoa / 1 594 mrk.

**Auki oleva laatukysymys (aiempi, ei kielikoodi):** `v1-auringonnousut-2` ja `iss-loppu-vastaus-ohjaus-a-2` tunnistuivat Whisperillä heikommin kuin vanhat (0,61 / 0,71). Uusinta 2 ottoa ≈ 182 mrk, vaatii luvan.

## 2. Pakotus kaikkiin työkaluihin: nykytila ja aukot

**Katettu (tools/):** `tools/elevenlabs-kieli.mjs` (`kieliFi`, tukematon malli → virhe) + `tests/eleven-kielikoodi.test.mjs` skannaa kaikki tools/-tiedostot, jotka kutsuvat text-to-speech/dialogue-päätettä, ja vaatii `kieliFi(`/`language_code: 'fi'`; worker lähettää fi:n aina.

**Aukko: `proto-3d/_tyo/**/tee.py` -generointiskriptit (Python) eivät kuulu testin piiriin.** Skannaus: 55 text-to-speech/dialogue-skriptiä, **18 ilman `language_code`** (10.–17.10. ajetut):
iss-kupoli-kertoja-20261013 (+ lisa), iss-kamera-kertoja-20261015, iss-192-ottot-20261015, iss-fakta-kertoja-20261015, iss-loppu-20261014, iss-telakointi-20261014, iss-nyt-teksti-20261015, iss-lahtolasku-20261013, ranska-kertoja-20261013, ranska-kohdat-20261014, ranska-korjaus-20261016, ranska-2027-20261016, ranska-ympyrat-20261017, taidemuseo-kertoja-20261011, yovartio-kertoja-20261013, raketti-andoya-20261014, lautapeli-tavoite-20261014.
Näistä ISS:n 9 ovat käsitelty yllä; Ranskan/taidemuseon/yövartion/Andøyan/lautapelin otot ovat vanhoja pakottamattomia (Ranskan 47 riskiottoa: omistaja 23.03 ei uusita; muut ryhmät eivät kuulu tähän ISS-tehtävään, lista PT:lle jos halutaan laajentaa).

### Ehdotus (ei vielä tehty; PT/KK hyväksyy)
1. **Yksi yhteinen Python-apuri** `tools/elevenlabs_kieli.py` (`kieli_fi(malli)`, sama sääntö kuin mjs: multilingual → virhe) ja `tools/elevenlabs_pyynto.py` (`puhekutsu(polku, runko)`), joka **kieltäytyy lähettämästä** runkoa ilman `language_code == 'fi'` ja lisää sen itse. Uusi Äänittäjän `tee.py`-pohja (`_tyo/ranska-lahestyminen-20261017/tee.py`) käyttää vain tätä.
2. **Testi** `tests/eleven-kielikoodi-python.test.mjs`: skannaa `tools/**/*.py` ja `docs/`-pohjat; sama sääntö kuin mjs-testi (puhepääte → `kieli_fi(`/`language_code`).
3. **_tyo-vartija** `tools/tarkista-puhekutsut.sh`: skannaa `/Users/Shared/Claude/proto-3d/_tyo/**/*.{py,zsh,sh,mjs}`, ilmoittaa tiedostot joissa text-to-speech/dialogue ilman `language_code`; Postivahti ajaa kierroksellaan (kuten tarkista-tyotilat.sh).
4. **Ääniporttiin (`aaniportti.py` ennen vientiä)** vaatimus: vie-paketin mukana `kieli.json` (`{"language_code":"fi","mallit":[…]}`, tee.py kirjoittaa); ilman sitä portti hylkää viennin. Näin pakottamaton otto ei pääse ämpäriin vaikka skripti kierrettäisiin.
5. **Raamattu/pohjat:** uudet generointipohjat vain `tee.py`-pohjasta (1); käsin kirjoitettua `urllib`-kutsua ElevenLabsiin ei hyväksytä.

Kaikki ehdotukset ovat koodimuutoksia (tools/, tests/), eivät generointia; toteutus 1–4 ≈ 1 sessiotunti.
