# Laitetestaaja → seuraava sessio: luovutus (25.9.2026, konteksti 71 %)

## 1. Tila juuri nyt

Haara `laitetestaaja-inventaario-ipad` @ `3de5248e2` (PR #3126, ei
vielä mergetty). Simulaattorit: iPhone 18 Pro (1572C658) ja iPad Pro
13" M5 (3B4CDACB) — molemmat omiani, molemmat booted. iPhonella on
tuore peli käynnissä Ateenassa (Kartta-tilassa) kesken liikkumis-
pariteettikuvauksen J3-jaksoa — ei kesken mitään kriittistä, voi
jättää tai nollata.

## 2. Tämän session isot kohdat (aikajärjestyksessä)

1. **Nappi-inventaario** (jatkoa edelliseltä): Topografialinssi ja
   Isoisän linssi 1873 vahvistettu `linssi <id>`-komennolla,
   Julisterivi selvisi (nappi ehjä, Natiivi-UI korjasi juliste-URL-
   vian de8852b:llä).
2. **Löydös 51** (maalehden vieritys): iPad-simulaattorin lupa oli
   pitkään jumissa (attach ei vastannut), kunnes omistaja tuli
   koneelle — silloin lupa aukesi HETI. Mittasin sekä iPhonella että
   iPadilla: 0 isoa tökkäystä per ~3500-4200 kehystä, mutta
   **simulaattori renderöi 60 Hz:llä** (KehysMittari.cs:n 12,5 ms
   -kynnys on viritetty 120 Hz:lle) — tulos ei siis todista oikeaa
   ProMotion-sulavuutta, vain ettei koodissa ole räikeää pullonkaulaa.
   Raportti: `docs/raportit/sulavuus-maalehti-scroll-20260925.md`.
3. **Radio-viivain** (Linssisepän pyyntö): löysin ja raportoin bugin
   (veto ei liikuttanut neulaa lainkaan — juurisyy: nimien Clickable
   kaappasi osoittimen). Linssiseppä korjasi kahdessa erässä
   (`radio-veto` e8d0cbf, sitten ajoituskorjaus a26b248) — molemmat
   vahvistin toimiviksi juna/b12:ssa. Raportti:
   `docs/raportit/radio-viivain-testi-20260925.md`.
4. **Savukierros juna/b12** (Fablen/Natiiviseppän tilaus, build 13:n
   pohjaksi): saapuminen+välikortti, kartta (reliefi/rannat/rajat),
   kaupunkikortti+kamera, äänet (puhe.aika eteni oikeasti), radio
   veto/lukitus/sulku — KAIKKI PASS sekä iPhonella että iPadilla.
   Kaksi ele-havaintoa jäi epävarmaksi (kallistus/kierron-estin: paljas
   kartta ei reagoinut kahden sormen tilt-eleeseen — ei tiedossa onko
   tarkoituksellista). Kuitattu Natiivisepälle suoraan, BUILD-merge
   heidän käsissään. Raportti: `docs/raportit/savukierros-b12-20260925.md`.
5. **Liikkumisen pariteetti build 13** (Fablen tilaus, Pelikoodarin
   käsikirjoitus `Matkakirja-pelikoodari/docs/raportit/
   liikkuminen-pariteetti-20260925.md`) — KESKEN, ks. kohta 3.

## 3. KESKEN: liikkumisen pariteettivideot

Kansio: `proto-3d/lokit/liikkuminen-pariteetti/`. Käsikirjoitus
(jaksot J1–J5) on Pelikoodarin dokissa, luku 1.

**Valmiit tiedostot:**
- `web-j1-iphone.mp4` — lento+saapuminen+välikortti+kartta (Playwright
  webkit, EI simulaattorin oma Safari, ks. oppi alla).
- `web-j2-iphone-aanet-paalle.mp4` — Ohita-nappi. HUOM nimessä: web
  vaatii käyttäjäeleen (äänet päälle -napautus) ennen kuin pulun/
  isoisän puhe ja siten Ohita-nappi ilmestyvät ollenkaan (45s odotus
  ilman sitä = ei mitään). Natiivissa puhe on oletuksena päällä.
- `natiivi-j1-iphone.mp4` — `uusi-matka ateena` + 45s, sisältää
  todennäköisesti myös J2:n (puhe oli päällä koko ajan, en paikantanut
  tarkkaa Ohita-hetkeä pysäytyskuvista — tarkista videosta tarvittaessa
  tarkka frame).
- **Natiivi-J2 UUSIKSI, ÄLÄ KÄYTÄ TÄTÄ VIDEOTA SELLAISENAAN**:
  Pelikoodari kertoi luovutushetkellä, että vanhassa buildissa Ohita
  EI pysäytä pulua (löydös 53, oma bugi) — korjaus tulee haarasta
  `pelikoodari/liikkuminen` b13-testikäännökseen. Kuvaa J2 uudelleen
  vasta sen jälkeen.

**KESKEN J3** (liftaus Ateenasta, kauimmainen reitin varren kohde):
natiivi ei vielä yritetty (olin kesken kun luovutus tuli — peli on
juuri nyt Ateenan kartalla valmiina `kulkutapa liftaus`-komennolle).
Web epäonnistui KAHDESTI eri tavoin (debug-kuvat
`proto-3d/lokit/liikkuminen-pariteetti/j3-debug/`): 1. yritys osui
kesken saapumisen välikortin (kortti ei ollut vielä hävinnyt), 2.
yritys (30s odotus Pelikoodarin ohjeen mukaan) osui sen sijaan pulun
postikorttiin (esim. "Artan kaarisilta"). Liiku-nappi ja Liftaus-ikoni
löytyvät ja napautuvat (log vahvistaa), mutta jokin overlay on aina
tiellä ennen oikeaa noppa/kohteet-näkymää. **VASTAUS SAATU juuri
luovutushetkellä Pelikoodarilta, EI VIELÄ KOKEILTU**: oikea selektori
on `button[aria-label="Liftaus"]` (ui.js:11331) — klikkaus kutsuu
doWalk-funktiota suoraan (noppa+kohteet samalla klikkauksella, ei
erillistä vaihetta). Playwright: `await page.locator('button[aria-label="Liftaus"]').click()`.
Muiden kulkutapojen aria-labelit vieressä (esim. "Bussilla"). Kokeile
tätä ENSIN seuraavassa sessiossa pikselikoordinaattien sijaan.

**EI ALOITETTU:** J4 (saapuminen automaattiheitoilla), J5 (Maailma-
tila, kehittäjätila → KOKEET → Maailma → napauta Lontoo). J5:lle
natiivin polku on tiedossa (`napauta lontoo` -komento kehittäjätilan
Maailma-valikosta), ei vielä testattu.

**Menetelmäoppi tälle sessiolle:** simulaattorin oma synteettinen
kosketus (tämän session `mcp__Claude_Code_iOS_Simulator__control`
-työkalu) EI rekisteröinyt tappeja luotettavasti Safarissa (5-6
yritystä samaan nappiin ennen kuin yksikin toimi, sama nappi/kohde) —
sama työkalu toimii täysin luotettavasti NATIIVISSA sovelluksessa koko
session ajan. Siksi vaihdoin web-puolelle Playwright webkit -moottoriin
(video: `recordVideo` context-optio, kosketus: `hasTouch`/`isMobile`,
napautus: `locator.tap()`/`page.mouse.click()`) — toimi luotettavasti
paitsi J3:n overlay-ongelmassa yllä. Natiivin videot: `xcrun simctl io
<UDID> recordVideo <tiedosto>.mp4` taustaprosessina, `kill -INT` lopettaa
siististi.

## 4. Simulaattorien omistus ja iPad-lupa

- iPhone 18 Pro (1572C658) ja iPad Pro 13" M5 (3B4CDACB): minun,
  molemmat booted koko session ajan.
- **iPad-lupa (3B4CDACB) katosi kesken yön** (`attach` jäi jumiin
  "did not respond" -virheeseen tunneiksi) ja **aukesi heti kun
  omistaja tuli koneelle** — jos sama toistuu, älä jää odottamaan:
  ilmoita Fablelle (JUMI → FABLE, ei enää korttia) ja jatka muuta
  työtä sillä välin, kokeile attach uudelleen kun omistaja on
  todennäköisesti läsnä.
- Käännösvahti (proto-kaanna.sh) asentaa junan AUTOMAATTISESTI
  simulaattoreihini kun joku toinen sessio (esim. Natiiviseppä) ajaa
  sen minun UDIDeilleni — ei tarvitse itse kääntää joka kerta, mutta
  tarkista aina `xcrun simctl listapps` tai peli-loki jos epäilet
  buildin olevan vanha.

## 5. JUMI → FABLE (omistaja 25.9. klo 04.4x, sitova, korvaa kortin)

Jumissa (luokitin estää, päätös puuttuu, tai simulaattorin
lupaikkuna katoaa): älä tee AskUserQuestion-korttia, vaan lähetä
Fablelle viesti (tilanne + vaihtoehdot + suositus) ja jatka muuta
työtä samalla. Fable kertoo omistajalle tarvittaessa.

## 6. Avoimet langat seuraavalle sessiolle

1. Jatka liikkumisen pariteettivideoita: native J3 (peli on valmiina
   Ateenan kartalla), sitten J4/J5 molemmilla puolilla, ja odota
   Pelikoodarin vastaus web-J3:n selektoriongelmaan.
2. Tarkista onko Pelikoodari/Linssiseppä/Natiiviseppä vastannut
   viesteihin (radio, J3-selektori).
3. Videot ja tarkistuslistan rivit menevät Pelikoodarille suoraan
   (docs `Matkakirja-pelikoodari/docs/raportit/
   liikkuminen-pariteetti-20260925.md` luku 2, EI omaan haaraan).
