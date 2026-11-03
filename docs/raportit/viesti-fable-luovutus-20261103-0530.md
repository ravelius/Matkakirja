# PT:n luovutus 3.11.2026 klo 05.30

Edellinen: viesti-fable-luovutus-20261103-0152.md (sen AAMULLA- ja YÖVALTUUTUS-kohdat voimassa). Osoitteet: /Users/Shared/Claude/osoitekirja.md.
Syy: konteksti (pitkä yövuoro). `date` ennen aikaleimoja (PT käytti tässä vuorossa välillä arvattuja aikoja 03.2x–04.5x, kun kello oli ~03.1x).
Vahdit Monitorilla 30 min: /Users/Shared/Claude/hooks/codex-posti-vahti.sh ja odottajat-vahti.py (viritä uudelleen). Codex hiljaa koko yön.
Junarivit tools/asemataulu/juna.py, tarkistus `tarkista-junat.py scratchpad/asemataulu/data/talo/junat.json` (ilman polkua se tarkistaa väärän tiedoston).

## TÄRKEIN: MUISTITAPPO (NS)
- Junan 218 ja TF 217:n Release kaatui Isolla iPadilla (8 Gt) Pariisin saapumisintron lopussa: kartan UI-kerrosten UITK-sumennuksen liuku
  teki joka ruudussa uuden koko ruudun välitekstuurin (+1,1–1,3 Gt). Korjaus **689cdc446** (intro pikselilleen sama, marginaali 25 %,
  0 varoitusta) KUITATTU → NS mergeää natiiviseppa/juna-218. Pieni iPad (M5) todennäköisesti selviää, mittaamatta (omistajan laite).
- KK:lla aamukortti omistajalle: korjataanko TF 217 erikseen? KK suosittaa: juna 218 riittää. JU: EI asennuksia pieneen iPadiin junasta 218
  ennen korjauksen runkoon menoa.

## KUITATTU TÄSSÄ VUOROSSA
- NS: valkoinen välähdys zoomauksessa a699e2e7e (runko 55ce62126); GC osat 3–5 (4ffd8aae5, 2856c5cc3); muistikorjaus 689cdc446.
- KS: Euroopan välitaso Z9–Z10 (tiet+joet, sarja 2026-11-03-pohja-valitaso, 28 212 laattaa, PR 6079 JU:lle). NS kytkee SileaUrl
  (natiiviseppa/valitaso-218 747e44081) runkoon JU:n ämpäriviennin jälkeen ilman uutta PT-kierrosta → saapumisvideo NS+KS.
- LAV: kujaportti-3:n takainen umpimassa poistettu, korjaukset tausta-**v114** (EI v113), esto v37; pronssien esivalmistelu (42 paikkaa,
  vaihda.py, esto v38 tehdään v114:n pohjalle). LAV lepää pronsseihin asti (Codex). LAV:n kotihaaran 12 raporttia mainiin PR 6066.
- VS (kokeita, ei junaan): salamat sal9 e90183d39 (keijun oikea sivu vielä suora → seuraavalla salamakierroksella), hurrikaani hur3
  94d09ff61. Pimennys: pim4 (ydin tummemmaksi 5a99783c6) JU:n vuorossa → pari PT:lle; sitten tähdenlennot (haku aloitettu).
- PK: läpikulun katto + ovilehti + ylityssuoja jne. haarassa (EI junaan). Kameramittari 485105cdc; lähtötaso 218r: massassa yk44 cx3 tj47
  ty21 th41 xf61 cc0 taso1b 8, piilossa 45/53/28/55/73/248/14/0. Linja: jokainen korjaus koko sarjaa vastaan, tavoite 0 ennen KK:ta,
  tunnettua vikaa EI leikata tallenteesta (aikaleima viestiin). Seuraavaksi xf. 218t-taulukko PT:lle rinnakkain 218r:n kanssa.

## AUKI JA KENELLÄ
- NUI: lepää perustellusti (ilmaisin odottaa a/b-valintaa, veneiden reitti odottaa KS:n uutta Pariisia).
- KS: välitason vienti/kytkentä; Pariisin palat 1–15 Codexilla.
- JU: vienti v114 + välitaso; vuorojärjestys NS ensin.

## AAMULLA OMISTAJALLE (KK:n kautta, KK tietää)
- Edellisen luovutuksen kohdat (a/b-saapumisodotus, videot, Codex hiljaa) + TF 217 -muistikortti.
- TOIMI: CoreDevicen välimuisti nyt 41 Gt → `rm -rf ~/Library/Containers/com.apple.CoreDevice.CoreDeviceService/Data/Library/Caches/AppInstallationBinaryDeltas/fi.matkakirja.peli.kehitys`

## LEVY
14 Gi ~04.0x (PK:n ajo kaatui). PT siirsi proto-3d/lokit/ yli 90 min vanhat (1391) → "/Volumes/T7 4TB/Matkakirja-arkisto/proto-lokit"
symlinkein (skripti scratchpadissa: rsync + määrävertailu + ln -s) → 29 Gi. Esikatselu ~1,3 Gt/ajo → toista tarvittaessa.

## OPPI
- Nollauksen jälkeen tarkista luovutuksesta, että viimeisin PT-kuittaus on mukana (NS, VS puuttui kerran) → lähetä uudelleen.
- TYHJÄKÄYNTI-hälytys ei aina ole lepoa (KS:n pitkä Python-ajo) → `ps` ennen patistusta.
