# Pelikoodarin luovutus 25.9.2026 yö (klo 00.4x)

Jatkoa luovutukselle `viesti-pelikoodari-luovutus-20260924-ilta.md`. Merge-pyynnöt, mitat ja kuvaparit ovat edelleen
tiedostossa `/Users/Shared/Claude/proto-3d/lokit/merge-pyynto-pelikoodari-maisemakompressori.md`.

## 1. ETUSIJA: löydös 49, iPadilla ei kuulu ääniä (Fable: build 12, etusijalla kaikkeen)
Omistaja: build 11:ssä iPadilla ei kuulu mitään, vaikka mykistys ei ole päällä.
- **Selvitetty:**
  - iPad Pro 13:n (00008103-001819421413401E) kehityskäännöksen (`fi.matkakirja.peli.kehitys`) konsolissa ei ole
    äänivirheitä: `luento marseille` ja `ui tehoste correct/coin/dieLand` ajautuvat. Ainoa löytö on puuttuva
    `aanet/pulu/livia-marseille-1.mp3` (404). Kaava, konsoli ja tila: `proto-3d/lokit/loydos49-aanet/`.
  - TestFlight-käännöksen (`fi.matkakirja.peli`, 202609241305) Unity-loki ei näy (release). Peli-komennot toimivat
    siinäkin, koska `MATKAKIRJA_APPSTORE` puuttuu sisäisestä TestFlightista.
  - Äänilaitteen kaappaus USB:n kautta vaatisi kameraluvan (TCC), joten sitä ei tehty.
- **Hypoteesi ja korjaus haarassa `pelikoodari/aanet-kuuluviin` d14f766** (proto-git, unity-tarkistus 0 virhettä):
  - Playback-istunto asetettiin ennen vasta ensimmäisestä puheesta, joten sitä ennen soitiin Unityn
    Ambient-istunnossa. `Scripts/Peli/AaniIstunto.cs` asettaa Playback + MixWithOthers heti käynnistyksessä ja
    etualalle palatessa.
  - Mittari: `aani mittaa [s]` (peli-komento) kirjaa AudioListener.GetOutputData-tason (rms, huippu), soivat
    AudioSourcet ja istunnon luokan, voimakkuuden ja reitin (`MatkakirjaAani_Tila`) peli-lokiin.
  - HUOM: omistajan mukaan mykistys ei ollut päällä, joten istunto ei välttämättä ole koko syy. MITTAA ENNEN KUIN
    NIMEÄT SYYN.
- **Seuraavaksi:** Natiiviseppä kääntää laitekäännöksen b12q = juna/b12 + d14f766 isoon iPadiin 00008103 (arvio klo
  01.15–01.30, hän ilmoittaa). Sen jälkeen:
  1. `tyokalut/ipad.sh peli` -kaava: `odota-tila Aloitus 40`, `uusi-peli 5 marseille`, `odota-tila Kartta 30`,
     `aani mittaa 3`, `luento marseille`, `odota 2`, `aani mittaa 5`.
  2. ui-komennot `ui tehoste correct` + `aani mittaa 2` peli-komennolla.
  3. Musiikki, radio (`linssi-komento.txt: linssi radio`) ja pulu samoin.
  4. rms 0 = Unityssä ei soi mitään (lataus tai kytkin). rms > 0, mutta omistaja ei kuule = istunto tai reitti.
  5. Raportoi Fablelle 8 riviä mitatusti.
- Oma iPad 13 -simulaattori `88939C12` saa käännöksen juna/b12 + d14f766 käännöspalvelusta (lokin
  `kaanna-aanet.log` jono oli klo 00.16 natiiviseppa/lento-pinta:n takana). Simulaattori ei toista iPadin
  äänetöntä tilaa, mutta mittari toimii siinä.

## 2. Löydös 52: saapumisen välikortti ensimmäisen lennon jälkeen (Fable, build 12, äänten jälkeen)
- **Webin kaava koodista** (origin/main js/ui.js `naytaSaapumiskortti` ~21497, vakiot ~800):
  1. Lento päättyy: `sfx.stopFlight`.
  2. Pergamenttiarkki (`naytaAloitusverho`, sisään `ALOITUSVERHO_SISAAN_MS` 420) ja `SAAPUMISKORTTI_TAUKO_MS` 280.
  3. Konekirjoituksella `"<KAUPUNKI> · PÄIVÄ <n>/80"` (`saapumisKortinTeksti`, `typeText` ääni 'saapuminen',
     `INTRO_TYPE_MS` 190).
  4. `SAAPUMISKORTTI_LUKUAIKA_MS` 1000 ja tekstin häivytys `SAAPUMISKORTTI_TEKSTI_MS` 320 (css .saapumiskortti-teksti
     styles.css:7127–7151).
  5. Kartta paljastuu (verho ulos `ALOITUSVERHO_ULOS_MS` 700) ja pulun kuplat (1800 / 2500 ms tai luennan jälkeen 900).
- **Mitattu tuotannosta** (Lontoo → Ateena, 402×874): valinnasta lento alkaa 0,4 s, lento päättyy 10,9 s = arkki
  ilmestyy, arkki täysi 11,4 s, teksti "ATEENA · PÄIVÄ 1/80" 11,6 s, häivytys alkaa 13,3 s, teksti poistui 13,6 s,
  arkki poistui 14,4 s.
  - Aikajana ja kuva: `proto-3d/lokit/loydos52-saapumiskortti/` (web-saapuminen-aikajana-402x874.json,
    web-saapumiskortti-402x874.png).
  - Mittari: `mittaa-saapuminen.mjs` samassa kansiossa, iPad 1032x1376 on
    ajamatta.
- **Natiivissa ei ole välikorttia** (grep: ei Saapumiskortti / PÄIVÄ n/80). Rakenna Natiivisepän saapumisnäkymän
  (masterissa) päälle. Raja on sovittava Natiivisepän kanssa: lento on hänen, välikortti ja pelilogiikka minun.
  Tarvitaan video isolta iPadilta.

## 3. Natiivi, merge-pyynnöt
- `pelikoodari/eleet-kierto` c5a4833 on juna/b12:ssa: tahattoman kierron estin 15° ja kallistus ylösvedolla,
  0,20 °/pt. Omistaja valitsi arvot kortilla, koska Google Earthia ei voitu mitata. **Video isolta iPadilta
  puuttuu:** oma iPad 13 -simulaattori 88939C12, `komento.txt: kierra 10 1.5`, `kierra 40 2`, `kallista`,
  `xcrun simctl io recordVideo`.
- `pelikoodari/liiku-luenta` e9b39de (löydös 45): Natiivisepällä. `pelikoodari/ui-puu` a909f2f on masterissa.
- **UUSI PYYNTÖ Natiivi-UI:lta (löydös 48, ei tehty):** `PeliOhjain.AvaaKortti` (Napautettu → Kartta →
  AvaaKortti).
  - Kameraohitus webin mukaan (lauta.js napautaKaupunki): `kameranOhitus = () => kierto.Panoroi(lat, lon, new
    Vector2(Screen.width / 4f, Screen.height / 2f), 0.42f, null)`, vain siirto eikä zoomia.
  - Nykyinen "kamera lentää kaupunkiin" tuottaa omistajan moittiman uloszoomauksen.
  - Panoroi-rajapinta on Natiivisepältä pyydetty. Natiivi-UI:n liuska: natiivi-ui/liuska-48 397b37f.

## 4. Pariteettiajo (Fablen tilaus, web-haara `pelikoodari-pariteetti-ajo` 983809349, pushattu, ei PR:ää)
- `node tools/pariteetti-ajo.mjs --build <nimi>` ajaa taulun 44 riviä × 4 kokoa kahdessa osassa: web
  (pariteettikuvat --laatikot) ja omat simulaattorit (ui/peli/linssi-komennot, `ui puu`). Tulos on
  kontaktiarkki.html, raportti.md ja tulos.json.
- **Rivit:** `tools/pariteetti-rivit.mjs`. Linssit avataan `linssi:linssi <id>` + webin kamera (`ui linssi …` on vain
  UI-esimerkki).
- **Vertailu:** `tools/pariteetti-vertailu.mjs` + testit (21). Tekstiankkurit, turva-alueen siirto vähennetään,
  anfangi ja katkelmat kootaan, natiivin peitto, webin karttanimet pois ja kuvaero siirrolla.
- **Tilavartija:** ennen natiivikuvaa webin erottava teksti UI-puussa tai linssin oma tila 5 s:ssa, muuten VIRHE.
  Siivouksen jälkeen perustila (Liiku) vahvistetaan.
- **Omat simulaattorit** (Fable: vain omia):

  | Simulaattori | UDID |
  |---|---|
  | pariteetti-iPhone | A2FD9C9F |
  | -iPhone-vaaka | 993F8873 (`ui kierto vaaka`) |
  | -iPad11-834 | C1D5E34C (834×1210) |
  | -iPad13 | 88939C12 |

  Käännös: `proto-3d/tyokalut/proto-kaanna.sh <haara> <UDID…>`; toiseen voi kopioida .appin `simctl install`.
  Kolme ensimmäistä on sammutettu (Natiiviseppä: liikaa simulaattoreita jumittaa laitekäännöksen).
- **Ajot:**
  - b12g-1: 28,7 min, kalibroimaton.
  - **b12-2** (juna/b12 0a55b60): 23,5 min. SAMA 3, ERI 124, PUUTTUU 31, VIRHE 18.
    - Vartija korjattu ajon jälkeen (rivit 19/21b).
    - Rivin 24 VIRHE on aito: natiivin `tutki` ei avannut kohtaamista.
    - Reitityslista `proto-3d/lokit/pariteetti-ajo/b12-2/reititys.md` (39 iPhone-riviä) odottaa Fablen päätöstä
      ERI-rajasta (±8 px on tiukka).
- **Nopeutus kohti 15 min:** web ajaa 4 kokoa kahdessa rinnakkaisessa noin 7 min kokoa kohden, joten se on
  pullonkaula. Kokeile 4 rinnakkain, jos muisti riittää.

## 5. Web (Matkakirja-repo)
- #3116 (Liiku-varaventtiili), #3118 (iso kuva 'playing'-hetkestä, varaventtiili 1,5 s) ja #3119 (havainnekuvan
  tyyli): Julkaisijan jonossa. Tarkista, ovatko mergetty.
- PR #3128 (Sisältökirjuri, linssikatalogi): ulkoasutarkistus on PR:n kommenttina.

## 6. Worktreet ja simulaattorit
- `wt/pelikoodari-liiku-luenta`: web-haarat vuorotellen, nyt pelikoodari-pariteetti-ajo. Poista, kun kaikki
  mergetty.
- `wt/proto-pelikoodari-liiku-luenta`: proto, nyt pelikoodari/aanet-kuuluviin.
- `wt/pelikoodari-vanha-checkout`: ei kosketa.
- Raja on 3 worktreetä roolia kohden.

## 7. Linjaukset tältä yöltä (Fable/omistaja)
- **JUMI → KORTTI:** jumissa AskUserQuestion-kortti omistajalle JA samalla PushNotification
  "Pelikoodari: kysymyskortti auki — <aihe>". Lisäksi yksi rivi Fablelle.
- **Varakanavat:** SendMessage noin 10 viestiä omistajan vuoroa kohden. Kun raja täyttyy tai tulee "Failed to
  send", käytä `mcp__ccd_session_mgmt__send_message` session id:llä. Jos molemmat estyvät,
  `docs/raportit/posti-pelikoodari-<pvm>.md` + push. Omistajalta ei pyydetä ok-viestejä.
- **Käännöspalvelu:** testikäännökset käännetään itse `proto-kaanna.sh`:lla ja asennetaan vain omiin
  simulaattoreihin.
