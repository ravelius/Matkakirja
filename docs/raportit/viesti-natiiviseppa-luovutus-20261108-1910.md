# Natiivisepän luovutus 8.11.2026 klo 19.10

KAIKKI VANHEMMAT LUOVUTUKSET; edellinen git show 65e8e6172:docs/raportit/viesti-natiiviseppa-luovutus-20261108-1620.md (tausta: cron, levy, id:t).
Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi. Nollauksen syy: konteksti pehmeällä rajalla 25 % (7.37).
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364.
Cron "4 9 * * *" (unity-julkaisut.py, /opt/homebrew/bin/python3.14 ILMAN -I:tä, tyokalut/natiiviseppa-skriptit/) luotu 17.0x (4ab85eb3): LUO UUDELLEEN.
Numpy/PIL/scipy: /opt/homebrew/bin/python3.14 -P skripti.py. wt/proto-natiiviseppa-kierto on poistettu; wt fpvb on nyt haarassa navat-kohokalotit.

## TILA 8.11. 19.10 (VOITTAA kaikki vanhemmat)
1. POHJAPALLO f7cf0bd7c KUITATTU, PT KATSONUT 18.5x (KOE, ei junaan). Sininen reunakaista poissa (KS:n rajaus 12373 → 0 px), ei rakoja,
   lähikuvat ennallaan. AVOIN (PT, ei estä): Perun–Chilen haudan reunapiikit nyt suoraan mustaa vasten.
   _tyo/natiiviseppa/merenpohja-pohjapallo/kuittaus/ (MITTAUS.txt, parit).
2. KOHOKARTAN NAPAKALOTIT 300e9923f (natiivi-backup natiiviseppa/navat-kohokalotit = ecabf1855 + NapaKannet: KalottiVersioKoho
   "2026-11-08-kohokartta", reuna 84°, AsennaKoho, yhteinen latausketju Lataa()/LataaKalotit(kierros), kohokansi varana, _KermaMaa (2,3)).
   unity 0, Kartta 714/714. iPad 19.04 4/4: kytkentä toimii ("kohokalotti etela: 2048×2048 … reuna 84°"), MUTTA TYYLI EI TÄSMÄÄ:
   KS poltti v6:n reseptillä (valkoinen jää, varjostettu merenpohja), laite näyttää Topografia.cs:n kohokartta/v5-20261108 (oranssi
   Etelämanner, tasaiset meren vyöt); mikään haara ei käytä v6:ta. Suositeltu PT:lle 19.0x: KS polttaa v5:n reseptillä uuteen versio-
   kansioon → NS vaihtaa vain KalottiVersioKoho (+ KohoKuvanReuna jos muuttuu) → JU uusi ajo sk-navat-kohokalotit.txt.
   ODOTTAA PT:N VALINTAA (v5-poltto vai Topografia v6:een). Saumarajaukset (aja ±83 … 8) eivät osuneet kalottiin: seuraavaan ajoon
   saumakuviin esim. "komento aja -86 60 6" / "aja 86 -30 6" (tarkista kuvasta, että 84–85° näkyy).
   Parit: _tyo/natiiviseppa/navat-koho/kohokalotit-parit/. Laattapakettiin vasta junavaiheessa (OfflinePolut: yksi kansio/sarja).
3. FPV A/B 2fa367316 KATSOTTU, PT:lle 19.0x: A = B ≥ 20 km (fpvlahi lähi 15/kauko 50 km → vaikuttaa vain 15 km:n kuvaan).
   Lähin siisti D = 120 000 m kummallakin → Skaala = D/3 = 40 000. 15–80 km: ×15-piikit, sininen aukko alhaalla (pohjapallon väri),
   terävä vaakasuora usvaraja yläkolmanneksessa. _tyo/natiiviseppa/fpv-b/parit-2fa367316/MITTAUS.txt. KK tilaa superdronen kuvan (PT).
4. iPadin "failed to launch" 17.08–17.32 = ipad-skenaario-f1c.zsh:n --console-käynnistys (tavallinen launch toimi); JU korjasi (kiinni
   ennen konsolia), kaikki ajot 18.4x→ menivät 1. yrityksellä. Ajot vain JU:n jonon kautta (PT 17.2x).
5. JONO: PT:n vastaus kohdan 2 valintaan → FPV osa 4 (PT:n sanalla; 1620-luovutuksen kohdat). Muuten "JONO TYHJÄ: Natiiviseppä" PT:lle.

## LISÄYS 19.1x (PT, VOITTAA kohdan 2 ja 5)
- KOHOKALOTIT = v5: KS polttaa v5:n reseptillä ja antaa NS:lle polun → vaihda 300e9923f:n päälle vain KalottiVersioKoho (+ KohoKuvanReuna,
  jos reuna muuttuu; tarkista KS:n kalotit.json), uudet saumakamerat (aja ±86 … 6) → ajo. EI vielä polkua KS:ltä 19.1x.
- FPV OSA 4: JATKA (PT 19.1x; B ei ratkaise, este ×15-kerroin). Sisältö 14.45-luovutuksen kohta 4 (PK:n lentomalli 61fc67ce4,
  FPV-kamera, origon siirto, korkeusruudukko, NUI:n tikut; suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261108-fpv-drone-topo.md).
- UUSI PYSYVÄ SÄÄNTÖ (omistaja 19.08, Raamattu 12.26): uudet kokeet ENSIN MACILLA iPad-koossa; iPadille vain muisti, nopeus, kosketus
  ja koeversion tarkistus. → kohokalottien v5-ajo ja FPV osa 4 Mac-esikatselulla (JU:n vuoro, koko ipad; muistit esikatselu-*).

## LISÄYS 19.1x (2) PT KORJAA FPV-JÄRJESTYKSEN (VOITTAA "FPV OSA 4: JATKA" yllä)
Omistaja 14.47 "Korostus pysyy": KorkeusKerroin ×15 EI muutu dronen ympärillä ilman omistajan korttia; korkeuskoe vain vaihtoehdoksi
kuvien kanssa KK:lle PT:n kautta.
1) ENSIN VIAT POIS (2fa367316:n kuvat, _tyo/natiiviseppa/fpv-b/parit-2fa367316/): sininen aukko kuvan alaosassa (pohjapallon
   reliefisininen 38,78,145 – kokeile myös f7cf0bd7c:n pohjapallo 168 km alempana, ja selvitä, puuttuvatko lähilaatat vai näkyykö maaston alta)
   ja terävä vaakasuora usvaraja yläkolmanneksessa (horisonttiusvan raja, ks. DroneKuva/usva).
2) Lähin siisti D uudelleen MACILLA iPad-koossa (Raamattu 12.26; JU:n esikatseluvuoro) → pari PT:lle → KK. Codex-kuvat odottavat D:tä.
3) Vasta sitten FPV osa 4 (lentomalli, Skaala = D/3, EI kertoimen muutosta).

## LISÄYS 19.2x (3): KOHOKALOTIT v5 KYTKETTY
KS 19.2x: 2026-11-08-kohokartta-v5 (KS 58253267f, reuna 84°, häive 84,4–85,0, paketti _valmiit/kohokartta-napakalotit-v5-vienti-20261108,
vienti JU:lla, KS ilmoittaa CDN:n). NS: 95f5af086 (natiivi-backup natiiviseppa/navat-kohokalotit) = 300e9923f + KalottiVersioKoho
"2026-11-08-kohokartta-v5"; unity 0. Skenaario sk-navat-kohokalotit.txt: saumakamerat aja ±86 … 6. JU:lle pyydetty 19.2x MAC-esikatselu
(12.26) CDN:n jälkeen → lokit/natiiviseppa-navat-koho/kohokalotit-v5/ (ajopyynto-kohokalotit-v5.md).
KUN KUITTAA: parit koho2 | kohokalotit (v6) | kohokalotit-v5, saumarajaus 84–85° täysikoossa (sauma näkyy?), konsolista "versio
2026-11-08-kohokartta-v5" → PT ≤ 3 riviä. Sitten FPV-järjestys (lisäys 2).

## LISÄYS 19.3x (4): KOHOKALOTIT v5 KUITATTU PT:lle (VOITTAA lisäyksen 3 "KUN KUITTAA")
JU:n Mac-esikatselu iPad-koossa 19.24 (95f5af086, 4/4, "kohokalotti … versio 2026-11-08-kohokartta-v5"): napa samaa tyyliä kuin laatat, ei
läikkää, ei näkyvää saumaa. Saumakamerat (aja ±86 … 6) eivät vieläkään osu 84–85°:een (etelä = sisämaa, pohjoinen = Grönlannin pohjoisranta);
tummat alueet = laattojen korkeusvyöt (samat v6-ajossa). Kolmikot _tyo/natiiviseppa/navat-koho/kohokalotit-parit/*-3vaihetta.png.
Junaan vasta PT:n sanalla (laattapakettiin OfflinePolut erikseen). MAC-SKENAARIOISSA "kuva X", EI "komento kuva X" (JU 19.2x).
SEURAAVA: FPV-järjestys (lisäys 2).
