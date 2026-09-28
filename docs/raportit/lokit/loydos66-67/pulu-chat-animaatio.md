# Löydös 66: pulun animaatio chatin aikana (web vs natiivi)

Pariteettitarkastaja 25.9.2026 klo 05.35–06.10. Lähteet: web-vedos (js/livia-eleet.js, livia-chat-tila.js,
livia-tilanteet.js, livia-puhetila.js, pollo.js, lukija.js, liviapuhe.js), tuotanto https://matkakirja.app/
(Playwright Chromium, 402×874, dpr 3, isMobile, hasTouch) ja natiivi `juna/b13` (044a2fe):
Assets/Matkakirja/UI/Pulu/Pulu.cs, PuluChat.cs, Scripts/Peli/Puhe.cs, UI/Aanet.cs, Resources/MatkakirjaUI/Pulu.uss.

## Mittaus tuotannosta

- Video: `web-pulu-chat-iphone.webm`, 52 s. Chat aukeaa kohdassa ~2 s ja kysymys lähtee kohdassa **10,6 s**.
  Koko ajo: `web-pulu-chat-iphone-koko.webm`. Kehykset: `web-pulu-chat-kehykset.png` (10 / 11 / 12,5 / 14 / 17 / 30 s).
- Eleloki: tuotannon `livia-eleet.js` ladattiin sellaisenaan, ja siihen lisättiin vain lokirivit funktioihin
  toista/tilanne/valmis/katkaise (route-paikkaus). SVG:stä otettiin näyte 200 ms välein: `web-pulu-aikajana.json`.
- Mittausajoja oli kaksi. Molemmissa aloituskaupunki oli Ateena, ja saapumisen traileri sekä isoisän luenta olivat
  vielä käynnissä (luenta estää `answer`-eleen, katso rivi 9). Aikajana alla on ajosta 2, t = ms kysymyksen lähdöstä.

| t (ms) | tapahtuma (web) | mitä pulu tekee |
|---|---|---|
| −8464 | chat auki → `waiting` (lähde ehdotukset) ennen `chatOpen` | welcome ei soi, koska ehdotusodotus on jo auki (livia-eleet.js:505). Ajossa 1 tilalle soi mietintärivin ele `wind` (chatWaiting). |
| 25 | kysymys → `waiting` (lähde vastaus) | **chatDashOut** 300 ms: pulu salamana ulos (pölypilvi ja viiru), sen jälkeen piilossa |
| 334–2278 | odotus | pulu poissa (lepoTila = chatDashOut p = 1, opacity 0). Mietintärivi ei soita elettä, koska `lahti` on true. |
| 2278 | ensimmäinen pala → `waitingAnswer` + `waitingEnd` | **chatDashBack** 100 ms: pulu takaisin |
| 2393 | – | **chatDustOff** 1400 ms: pölyt pois sulista, keho ja pää heiluvat |
| 3820 | – | **bookStudy** 4400 ms: kirja esiin, pää kallistelee ja lukee |
| 8233 | bookStudy valmis | lepo (`blink`, p = 0). Pulu seisoo paikallaan loppuun asti, SVG-näytteet eivät muutu 32 sekuntiin. |
| 15369 | striimi valmis → `answer` | ei elettä, koska isoisän luenta oli käynnissä (luennat.size, livia-eleet.js:508). Ilman luentaa soisi `livianRepliikinEle` (blink → smile). |

Havainto: myöskään webissä pulu ei elä koko chatin ajan. Liike keskittyy lähtöön, paluuseen ja kirjaan (noin 8 s
kysymyksestä). Tyhjäkäynnin eleet ja leijunta on tarkoituksella suljettu chatin ajaksi: `rauhallinen()` vaatii
`!pollo.auki` (livia-eleet.js:554). Nokka liikkuu puheen tahdissa vain, jos kaiutin on päällä ja vastaus luetaan.
Natiivissa näistäkin liikkeistä puuttuu lähes kaikki: kysymyksen jälkeen soi vain `smile`, ja lopussa soi yksi `answer`-ele.

## Taulukko

| tila | web: laukaisin, kesto, tiedosto:rivi | natiivi (juna/b13) | SAMA/ERI/PUUTTUU | ehdotettu korjaus + tiedosto |
|---|---|---|---|---|
| 1. Chat auki | `nappiVahti` → `tilanne('chatOpen')` → **welcome** 2900 ms (livia-eleet.js:599–602, 524). Jos ehdotusodotus on jo alkanut, welcome ei soi (505), ja tilalle soi mietintärivin ele (kohta 3). | PuluChat.cs:235 kutsuu `pulu.Tilanne("chatOpen")`, mutta Pulu.cs:309–323:n switchissä ei ole chatOpenia → id null → ei elettä. Pulu.cs:499–500 soittaa welcomen vain, kun Napautus-tilaaja puuttuu, eli ei chatin kautta. | PUUTTUU | Pulu.cs `Tilanne`: `"chatOpen" => "welcome"` ja `vapaa` mukaan kuten webissä (519). Jos ehdotusodotus on auki, soita mietintäele (kohta 3). |
| 2. Chat kiinni | `tilanne('chatClose')` → **wink** 2300 ms. Tyhjentää chatOdotuksen ja katkaisee dashBack- ja dustOff-eleet (376–379, 524). | PuluChat.cs:310 → Tilanne("chatClose") → null | PUUTTUU | Pulu.cs `Tilanne`: `"chatClose" => "wink"`. Kesken olevan chatDash-, dustOff- tai bookStudy-eleen katkaisu ja paluu lepoon. |
| 3. Odotus: ehdotukset / mietintärivi | Mietintärivin teksti → `livianMietintaEle` (tarkka taulukko + regex: crumb 6200, preen 6000, peek 3300, wind 5000, think 3400, lookRight 2200, reading 3200, flyAway 3100 …) omistajalla chatWaiting (livia-eleet.js:27–46, 536–546). Pitkä odotus vaihtaa rivin 6000 ms:n jälkeen (pollo.js:1533, 1581–1590) → uusi ele. | PuluChat.cs:689–690 näyttää mietintärivin ja vaihtaa sen 6 s:n jälkeen, mutta puluun ei välity mitään. Ehdotushaussa (HaeEhdotukset) ei ole ilmoitusta. | PUUTTUU | PuluChat.cs: kun mietintärivi syntyy tai vaihtuu (689–690 ja ehdotushaku), kutsu uutta `pulu.Mietinta(teksti)`. Pulu.cs: siirrä `livianMietintaEle`-taulukko ja regexit sellaisinaan, omistajaksi "chatWaiting". Jos tulos on flyAway, pulu lähtee kuten kohdassa 4. |
| 4. Kysymys lähetetty | `aloitaLivianOdotus({lahde:'vastaus'})` (pollo.js:1943) → `waiting` → chatOdotus → `pinkaiseChatista` → **chatDashOut** 300 ms. Pulu jää piiloon (opacity 0, lepoTila chatDashOut p = 1) vastaukseen asti (livia-eleet.js:176–181, 437–449, 314). | PuluChat.cs:691 `pulu.Tilanne("answer","hetkinen")` → RepliikinEle("hetkinen") = blink → **smile** 2700 ms. Sen jälkeen lepo näkyvissä. | ERI | PuluChat.cs:691 → `pulu.ChatOdotus(alku)`, jossa Toista("chatDashOut","chatWaiting"). Pulu.cs `EleValmis` (271–290): chatDashOutin jälkeen `lepoEle` jää p = 1 -asentoon (näkymätön) eikä palaa blinkkiin. LiviaAsento.cs:362 osaa asennon jo. |
| 5. Odotuksen aikana | Pulu piilossa, ei eleitä. Pitkän odotuksen `confused` (6000 ms, livia-tilanteet.js:3) ei soi, koska chatOdotus estää sen (livia-eleet.js:200). | Pulu näkyy levossa (tai smile-eleen jälkeen levossa). | ERI | Seuraa korjauksesta 4. |
| 6. Ensimmäinen pala (striimi alkaa) | `ilmoitaVastaus` ensimmäisestä palasta (pollo.js:6007, 5947–5953) → `waitingAnswer` → **chatDashBack** 100 ms → **chatDustOff** 1400 ms → **bookStudy** 4400 ms (livia-eleet.js:182–198). Jos pulu ei ollut vielä lähtenyt, soi suoraan bookStudy (187). Samalla `waitingEnd` (6009). | Ensimmäisen palan takaisinkutsu (PuluChat.cs:695–707) ei kerro pulle mitään. | PUUTTUU | PuluChat.cs:699–705 (osittainen == null -haara): `pulu.ChatVastausAlkoi()` → Pulu.cs-ketju chatDashBack → chatDustOff → bookStudy `valmis`-kutsuilla (Toista tukee jo valmis-parametria). Vähennetyssä liikkeessä bookStudy staattisena p = .42 (livia-eleet.js:186). |
| 7. Vastaus striimaa ja luetaan ääneen | Kun kaiutin on päällä, pollo-persoonan puhe → `ilmoitaLivianKasvopuhe` (lukija.js:1466/1584, liviapuhe.js:1585) → `puhe` = true → nokka `talk` 1500 ms:n jaksolla (livia-eleet.js:296–297). bookStudy jää p = .5 -asentoon puheen ajaksi (315), ja puhe ei katkaise chatAnswer-omistajaa (663). | PuluChat.cs:735 `Puhe.Hae()?.Lue(nakyva,"pollo")` soittaa Puhe.cs:n omalla AudioSourcella. Nokka katsoo vain `Aanet.PuluPuhuu` (Pulu.cs:162, Aanet.cs:59), joka on false. Puhe.Instanssi.Soi näkyy pululle **kertojana** (Aanet.cs:58 KertojaPuhuu), joten `Rauhallinen()` on false ja `TekstitPiilossa` on true. | PUUTTUU (nokka), ERI (luokitus) | Puhe.cs: kun `persoona == "pollo"` soi, näytä se pululle puheena: esim. `Aanet.PuluPuhuu => puhe?.isPlaying == true \|\| Puhe.Instanssi?.SoiPersoona == "pollo"`, ja jätä se pois KertojaPuhuu-ehdosta. Pulu.cs: bookStudy pysyy p = .5:ssä puheen ajan. |
| 8. Vastaus valmis | `tilanne('answer',{teksti})` striimin lopussa (pollo.js:6558) → `livianRepliikinEle`; jos tulos on blink → **smile** (livia-eleet.js:519, 525). Ei soi, jos puhe, luenta, odotus tai Liike-ele on käynnissä (505–520). | PuluChat.cs:734 `Tilanne("answer", nakyva)` → RepliikinEle / smile (Pulu.cs:316) | SAMA (ele), ERI (ajoitus, koska kohdat 4 ja 6 puuttuvat) | Säilytä. Kun kohta 6 on korjattu, varmista että answer ei katkaise bookStudya ennen p = 1:tä. Web katkaisee sen toista-kutsussa, joten mittaa kuvaparilla. |
| 9. Luenta käynnissä chatin aikana | Isoisän luenta (luennat.size) estää chatin answer-eleen (508) mutta ei chatDash- ja bookStudy-ketjua. | Tilanne("answer") estyy vain, jos PuluPuhuu on true. | ERI (pieni) | Pulu.cs `Tilanne`: estä answer, kun `Aanet.KertojaPuhuu` on true (vastaa webin luennat.size-ehtoa). |
| 10. Lepo ja tyhjäkäynti chatissa | Ei taustaeleitä, unta eikä leijuntaa: `rauhallinen()` vaatii `!pollo.auki` (livia-eleet.js:552–557, 584–586). Lepo on staattinen blink p = 0. | `Rauhallinen()` vaatii `!SyoteLukko.Estetty` (Pulu.cs:205), ja chat asettaa lukon (PuluChat.cs:233), joten tulos on sama | SAMA | Ei muutosta. |
| 11. Mikrofoni | `tilanne('microphone')` → **listen** 2600 ms (livia-eleet.js:524) | PuluChat.cs:1215 → Tilanne("microphone") → listen | SAMA | – |
| 12. Virhe / katkennut | `virhereaktio` → `error`-tunnetagi (pollo.js:6301) | PuluChat.cs:718, 725, 1254 → emotion/error hammentynyt | SAMA | – |
| 13. Pulun koko chatin aikana | Täysi kokopulu 88×104 px chatin oikeassa alakulmassa (livia-chat-tila.js:10–11). Pieni pulu (0,72) vain lehdessä, passissa ja visassa (45–46). | Pulu.cs:173–175: `SyoteLukko.Estetty` → `mk-pulu--pieni` (Pulu.uss:15, scale 0,72). Chat asettaa lukon, joten pulu on chatissa pieni (näkyy omistajan kuvassa). | ERI | Pulu.cs:173: `modaali = SyoteLukko.Estetty && !PuluChat.Auki` tai tarkempi lista (lehti, passi, visa) kuten webissä. Paikka webin `livianChatAsettelu`n mukaan. |
| 14. propsRight chatissa | `propsRight: pollo.auki` (livia-eleet.js:299): pullat ja kirjat oikealle, koska chat on vasemmalla | ei vastinetta (grep propsRight: ei osumia natiivissa) | PUUTTUU (vähäinen) | LiviaKuvaaja: propsRight-lippu ja LiviaTila-kenttä, joka on true kun chat on auki. |

## Yhteenveto korjauksista (Natiivi-UI omistaa, Pulu.cs + PuluChat.cs)

1. Pulu.cs `Tilanne`: tapaukset chatOpen → welcome ja chatClose → wink sekä `vapaa`-lista webin rivin 519 mukaan.
2. Uusi chatin odotuksen elinkaari Pulu.cs:ään (vastine webin chatOdotus-tilalle): `ChatOdotusAlkoi(lahde)` (dashOut, pulu jää piiloon),
   `Mietinta(teksti)` (livianMietintaEle-taulukko), `ChatVastausAlkoi()` (dashBack → dustOff → bookStudy) ja
   `ChatOdotusLoppui()` (paluu lepoon, jos vastausta ei tullut). Kutsut PuluChat.cs:ään riveille 689–707 ja ehdotushakuun.
   PuluChat.cs:691:n "hetkinen"-answer poistetaan.
3. Chatin ääneen luku pululle puheena, ei kertojana (Puhe.cs/Aanet.cs), jotta nokka liikkuu ja bookStudy pysyy auki.
4. Pulu ei pienene chatin aikana (Pulu.cs:173).

Kaikki tarvittavat asennot ovat jo natiivissa (LiviaData.cs:80–92, LiviaAsento.cs:362–376, LiviaKuvaaja.cs:234).
Vika on pelkässä kytkennässä.
