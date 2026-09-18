# Fablen luovutus Mac Studiolla — 18.9.2026 klo 10.52 Suomen aikaa

Edellinen sessio (17.–18.9.) täyttyi; omistaja pyysi resetin. Kaikki tila on
repossa, Raamatussa (Fablen haara claude/bold-ride-vow4ki) ja tässä.
Lue ensin: CLAUDE.md, docs/roolitus.md, Raamatun osiot AGENTIT VAIN OPUS JA
SONNET (tarkennukset 1–8), MAC STUDIO: UUDEN SESSION ALOITUS (aloitus +
avaimet + avainsääntö), KARTTAUUDISTUKSEN PAATOKSET 32–37, ASTRONAUTIN
KAMERA LISAYS 14–16, IHMISEN MATKA JATKO 4.

## main = v1937 (c752fc84). Julkaistu 17.–18.9.: v1931–v1937

## ENSIMMÄINEN TEHTÄVÄ: v1938 (PR #2577, haara claude/bold-ride-vow4ki-julkaisu-v1938)

Sisältö: kerma heti + meret (PAATOKSET 37), liuskan pohja/marginaalit/zoomi +
nostot kasvavat (34 k15), Ranskan nostojen lukitut ankkurit + polttoketju +
PALLO_LAATTATUNNISTE g (33 tark. 2), Fablen Raamattu. Tila:
- Testit-työnkulku PUNAINEN askeleessa "Niputustarkistus" (tools/tarkista-
  niputus.mjs / MODULES / sw.js SHELL) — selvitä ja korjaa haaralla.
- Savukkeet (Mac): 4 uutta punaista: pariisi-lahizoom 8k (Opus-agentti korjaa
  parhaillaan suoraan haaralle, jos sessio jatkuu; muuten aja uusi erä),
  pallo-nostolaput 6 ja 7 ("poltettuja 0" — johtui siitä, että ämpärin
  luettelo osoitti hetken uuteen nostotasoon ilman pallon sarjaa; aja
  uudestaan), neljäs katso ajosta.
- ÄLÄ MERGEÄ ennen kuin pallon sarja 2026-09-07a-nostot-g on ämpärissä
  (tunniste g osoittaa sinne; muuten pallo putoaa z4-varatekstuuriin).

## Nostotaso 2026-09-18-nostot — kesken, tarkka järjestys

1. TEHTY: laatat ämpärissä julisteet/pyramidi/2026-09-18-nostot/nostot/
   (4 124 laattaa z5–z8, poltettu Macilla; lähde /Users/samireivinen/
   poltto-nostotaso-2026-09-18-z58, luettelo siellä pyramidi.json).
2. Yhdistetty luettelo valmiina: /private/tmp/claude-501/-Users-samireivinen-Matkakirja-fable/1de1d7f9-1349-4671-ad36-3323aaf75d0f/scratchpad/luettelo/pyramidi.json
   (tools/yhdista-nostoluettelo.mjs); ämpärin nykyinen luettelo on
   PALAUTETTU vanhaksi varmuuskopiosta /private/tmp/claude-501/-Users-samireivinen-Matkakirja-fable/1de1d7f9-1349-4671-ad36-3323aaf75d0f/scratchpad/luettelo/ampari-varmuuskopio-20260918-1033.json
   (koska pallon sarjan ajo kesti tunteja ja pallo oli sumea sillä välin).
3. TEKEMÄTTÄ: pallon Mercator-sarja. tools/tee-pallolaatat.mjs lukee
   luettelon ÄMPÄRISTÄ (vakio LUETTELO), joten uusi luettelo on vietävä
   ensin (pallo sumea siksi aikaa) ja sarja ajettava SHARDEINA Macilla:
   tools/polta-paikallisesti.sh --pallo-osia (tai tee-pallolaatat.mjs --osa i/16
   16 rinnakkain, --nostot --tunniste g --max 8), sitten --vain-luettelo →
   laatat.json (nostot: 2026-09-18-nostot), vienti julisteet/pallo/laatat/
   2026-09-07a-nostot-g/, sitten v1938 mergeen. Yksi prosessi = 3 h (5 500
   laattaa 14 min), shardeina ~20–30 min. Raportti: docs/raportit/
   viesti-fable-poltto-ranska-nostot-20260918.md luku E3.5.

## Reliefipyramidi (topografia yhtä terävä kuin pääkartta)

- Pyramidi ämpärissä: matkakirja/reliefipyramidi/20260918/ (z0–z7, 9 508
  laattaa, manifesti). Paikallinen kopio /private/tmp/claude-501/-Users-samireivinen-Matkakirja-fable/1de1d7f9-1349-4671-ad36-3323aaf75d0f/scratchpad/reliefi15/maailma/.
- Haara claude/bold-ride-vow4ki-reliefi-kytkenta (erät 2–4, EI mergetty):
  topografialinssi piirtää pyramidista OLETUKSENA (?reliefipyramidi=0
  varalla), pohjaa ei ladota, luenta-huntu-vika korjattu (tummensi linssin),
  nimiöille vaalea reunus; mittari tools/savukkeet/mittaa-reliefipyramidi.mjs.
  Avoinna: WebKit-luvut, nimiön kontrastimitta, ~700 ms linssiketjussa
  (js/ui.js sytytaLinssi), Astronautin kameran laastari (suunnitelma
  raportissa viesti-fable-reliefi-kytkenta-era2-20260918.md). Julkaise v1939.
- Työkalu tools/tee-reliefipyramidi.mjs (haara reliefi-15s, sisältyy
  kytkenta-haaraan).

## Muut avoimet haarat (ei PR:iä, Raamattu TARKENNUS 8)

- claude/bold-ride-vow4ki-kaulanauha-tupla: Opus-erä käynnissä (kaksi
  Kaulanauhajuttu-nimiötä Pariisissa, ennestään oleva vika).
- claude/bold-ride-vow4ki-merkkikerros: KOE, ei mergetä (PAATOKSET 36 tila).

## Velkaa (Raamatussa kohdittain)

- Liuskan jäsenyys kasauspassin pisteestä (Versailles 108 km vs 15 km).
- Aihemerkin sisällä olevat ulkopuoliset nostot (Biskajanlahti, Carnac,
  Chambord) eivät pala (33 tark. 2 f); aihemerkit kaupunkien ulkopuolella
  päätettävä.
- nimikyltti vartio 4; poltettu "Kaulanauhajuttu" laatassa liuskan alla 1400 px.
- Macin tunnetut kuormahäilyt sarjat.jsonissa (tunnetutPunaisetMac).
- Työnkulut Macille: tools/aja-macilla.mjs (kokoaa dispatch-työnkulkujen
  komennot) tekemättä; 13 kuollutta työnkulkua poistettu (#2576).
- Avaimet: ~/.zshrc:ssä tyhjät export-rivit (ELEVEN_API_KEY ym.) odottavat
  omistajan arvoja; R2 (AWS_*/AMPARI/PAATE/R2_*) toimii.

## Omistajan viimeisimmät toiveet, jotka eivät ole vielä pelissä

- v1938:n sisältö (yllä). Puhelintesti v1937:stä tekemättä.

## Aloitusviesti uudelle sessiolle

"Olet Fable, päätoimittaja pelissä Matkakirja ja unohdettu aarre, Mac Studiolla.
git fetch origin && git checkout -B claude/bold-ride-vow4ki origin/claude/bold-ride-vow4ki;
lue CLAUDE.md, docs/roolitus.md, docs/raportit/viesti-fable-luovutus-20260918.md
ja Raamatun MAC STUDIO -osio. Tee ensin v1938 (PR #2577) valmiiksi luovutusraportin
järjestyksessä (Niputustarkistus, savukkeet, pallon sarja shardeina, merge),
sitten reliefipyramidi v1939. Agentit vain Opus/Sonnet, enintään kolme, ei PR:iä
agenteilta; kaikki mahdollinen Macilla; avaimet etsitään ennen kysymistä."
