# Natiivi-UI: luovutus 17.10.2026 klo 09.30 (Postivahti: kova raja 42 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -0625:n jonon; -0625:n, -0320:n, -0140:n ja -0105:n "Opit" ovat yhä voimassa.
Viestit send_messagella id:llä (/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-worktreet /Users/Shared/Claude/wt/proto-natiivi-ui-*.
Ajot: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ (ajo-*.zsh, sk-*.txt, ketjut-20261016/*). Simu VAIN Julkaisijan SIMU NYT -viestistä,
SIMU VAPAA perään. Uusi käännösodottaja ilmoitetaan Julkaisijalle ETUKÄTEEN. Kuvat PT:lle ennen kytkentää.

## TILA 09.30
- BUILD 199 = NS:n pikakorjaus: uni pois 127fc3319 (natiivi-ui/uni-pois-199, d457a1034:n päällä; NS natiiviseppa/pika-199).
- Seepiapalautus (omistaja 06.5x "lasi vain linsseihin ja peleihin"): natiivi-ui/lasi-kartta-199 a9b117e6b + 3e5557308 (Äänet, videopelikortti,
  Livian ohje pois lasilta). Kuvapari KK:lla hyväksytty; PT kuittaa SHA:n NS:lle (älä lähetä itse). Lista docs/raportit/natiivi-ui-lasi-kartta-199.md.
- ISS-levennys 58e779bdb: kuvapari lokit/pari-iss-levea-ipad-20261017.png (e208d45fe 560 pt | 58e779bdb 720 pt) KK:lla; PT lähettää SHA:n NS:lle.
- Kamerapöytä + SEURAA a07ce043a (natiivi-ui/kamerapoyta-198 ⊃ dfa8e69a2 laukaisin→etsin + PK a03177279 IssEtsin.Seuraa), juna 200, kytkin pois.
  Käännös bda7ba2ea; Pariisi-ajo OK (lokit/todistus-kamerapoyta-ipad-198-20261017-0909). PT ei vie omistajalle ennen kuin KS korjaa oranssin
  Ranskan pinnan ja PK yökuvan "valoisa"-kohteella → sitten sama skenaario (sk-kamerapoyta-198.txt, ketjut/simu-200.zsh) → PT → KK.
- Skanneri-viivat (juna 199) ja cupola-ohita2 dc48eb887 kuitattu (cupola2 + kehys-kaaro junan 200 kuvapakettiin).

## ENSIN
1. UNI V2 0079acc76 (natiivi-ui/uni-v2, 127fc3319:n päällä, Kaytossa = false; KK:n tavoite PT:n kautta: 20–30 s, tuntuu unelta, ohitettava,
   liukenee kartaksi): käännös ketjussa (_tyo/natiivi-ui/uni-v2-ketju.out, L2-jono KS:n jälkeen). Kun KÄÄNNETTY → Julkaisijan SIMU NYT →
   `zsh ketjut-20261016/simu-uni-v2.zsh` (iPad vaaka, sk-isoisan-uni-v2.txt, video isoisan-uni-v2.mp4) → KATSO video itse (ffmpeg-arkki) →
   PT:lle video + arkki (ei omistajalle suoraan). Tarkista erityisesti: sumennus (FilterFunction Blur) toimii, kuiskaus ei peitä kuvaa,
   loppu liukenee palloon ilman julisteen välähdystä (JatkaUnesta: intro.opacity 0), valinta alkaa. Kuiskausten ääni vasta omistajan
   nähtyä videon (SK:n teksti docs/raportit/isoisan-uni-kuiskaukset-20261017.md, mainissa 5a7310001).
2. KEHYS-KÄÄRÖ-uusinta 9365854c2 (iPhone, sk-kehys-kaaro-198.txt: lisätty "tap-teksti Käynnistä" — 08.12 musta aloituskortti peitti
   kartan ja käärön): Julkaisijan jonon perällä (~10.40). `zsh ajo-kehys-kaaro-198.zsh _tyo/natiivi-ui/kehys-kaaro-198-app <iPhone> iphone`
   → arkki PT:lle (junan 200 kuvapaketti). Jos käärö ei vieläkään näy: KehysKaaro.Juuri.SendToBack() linssikerroksessa → läpinäkymätön
   linssin tausta peittää sen.
3. SEURAA-video (PK pyysi yhteiskäännöksellä, juna 200): sama a07ce043a, kun PT pyytää.

## LÖYDÖKSET MUILLE (välitetty PT:lle)
- Utm.Vyohyke kaatuu MGRS "1GGL" (int.Parse(Substring(0,2))): vyöhykkeet 1–9 ilman etunollaa → FormatException (PK).
- Kamerapöydän Pariisi-ajo: Ranskan pinta tasaisen oranssi (KS), "valoisa"-kohteen oma kuva yöllinen (PK).

## Opit
- Kohdevalikon pyyhkäisyt aina paneelin SISÄLTÄ (iPad levennetty paneeli päättyy ~645 pt; y 760 sulkee valikon). L3 ipad nyt y 600 → 200.
- ISS-kamera: etsin kiinni → vanha polku (Maa musta kuvan pinnan ajan, 1–3 min); toinen laukaisu kesken kuvan ohitetaan. Skenaarioihin
  `oleta 240 iss-kamera: oma kuva:` ja kohde `linssi astro kyyti kohde pariisi valoisa` (muuten ISS voi olla yöllä meren yllä).
- Liikevahti: uusi liike Liikepohja.Kayrat.Pehmea.Arvo(u) -käyrällä, ei Mathf.Lerp/SmoothStep/oma Pehmea. Kielivahti: avaimet literaaleina.
- Odottavan käännöksen saa pysäyttää (kill ketju + proto-kaanna.sh) ja käynnistää uudella SHA:lla; ilmoita Julkaisijalle.
- PT:n viesti voi olla tarkoitettu toiselle roolille (Nike/Venus-jalustat): tarkista ja kysy ennen kuin yhdistät junaa omaan haaraan.
