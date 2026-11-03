# Natiivisepän luovutus 3.11.2026 klo 16.22 (7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-1556.md.
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä eikä omia käynnissä olevia ajoja. Cron Unity-beeta luotu tässä
sessiossa (ab484099) – nollauksen jälkeen luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).

## TEHTY TÄLLÄ VUOROLLA (kaikki proto-haarat peilissä natiivi-backup)
1. **Kylmä Lontoo 64/40/40** (kohta 2, simu 6da58f32b, lokit/natiiviseppa-esilataus-kylma-6da58f32b-20261103-1614): eteläpalat z15
   y 10900–10901 pyydetään ~7 s:ssa (ennen ei 9 s:iin), lähinäkymä valmis 14,4 s (c9ab58e88 16,5 s) → ei lisätoimia, SS 4→3 ei tarpeen.
   Ilmoitettu PT:lle. (Tarkistus ajettiin vahingossa ennakoidun videon aikana 16.13–16.14; kylmä ajo alkoi sen jälkeen.)
2. **PiirrosKerroksen osamerkinnät 70071fea2** (natiiviseppa/piirros-syyt-218, 3ab522752:n päällä): Paivitan Lataukset, Striimi,
   VeneTahti, Suoristus, Verkot, VenePiirto omiksi Ruutusyy-merkinnöiksi. Syy: "PiirrosKerros 63 ms" (iso-1527 ruutu 1998, ilman
   varauksia) ja vierityksissä 30–114 ms toistuvat; staattisesti syytä ei löytynyt. Seuraavan iPad-konsolin syyt kertovat osan.
3. **Leikkeiden mip-pakkaus c5baa2fa7** (natiiviseppa/leikepurku-218 = 56c06b836 + Pakattava(w,h): kaikki mip-tasot ≥ 4 ovat 4:n
   monikertoja). JU:n koe 6da58f32b: "mip level 1 … ETC compression" 10× (180 × 50 jne.). PT 16.2x kohta (1).
   459 ms ruudun PostLateUpdate 354 ms: samanlaisia 100–550 ms PostLateUpdate-ruutuja myös Westminster-, Big Ben- ja paluuajoissa ilman
   leikepurkua (piirto-/GPU-odotus) → seuraa uudesta kokeesta, ei vielä todistettu leikkeiden syyksi tai syyttömäksi.
4. **Häivytys ruudun leveyden mukaan f4334cbfd** (natiiviseppa/pariisi-haivytys-218 = 3ab522752 + 70071fea2 + tämä; PT 16.2x kohta 2):
   TaysiOsuus 1,0 / NollaOsuus 0,45 piirroksen leveydestä suhteessa ruudun maanpinnan leveyteen (2 tan(pysty/2) · kuvasuhde Paivitassa).
   Iso iPad vaakana: täysi ~10,8 km, nolla ~24 km; JU:n laaja (aja … 0.16 = 19,1 km) ≈ 12 %, keski (0.06 = 7,2 km) täysi.
   PalautusKorkeusM = 0,8 × täysi. `karikatyyri reunat pois` = ennen (25–60 km). PiirrosLahinTestit 6/6; KOKO TARKISTUS AJAMATTA
   (PK:n esikatselukäännös käynnissä 16.2x) → aja `zsh tyokalut/tarkista.sh` wt/proto-natiiviseppa-haivytys:ssä, kun simu/käännös vapaa.
   HUOM PT:lle kerrottu: saapumisen loppurajaus (kohteet ≤ 12 km + 25 % reunat) on laajan kokoinen → piirros lähes näkymätön saapuessa.
5. **Sauma keskizoomissa (PT 16.2x kohta 3)**: näkyy myös ennen-kuvassa 693cf437f (Seine katkeaa x 0,44 / y 0,59
   lokit/julkaisija-koe-pari-6da58f32b/pari-zoom-2-keski.jpg) → piirroksen palasauma (kuvasisältö), ei tasorajaa eikä osaa B → KS.
6. **Vieritys reunat on/pois** JU:lle: _tyo/natiiviseppa/fps60/vieritys-reunat.zsh <sha9> on|pois (sk-fps-reunat-on/pois.txt;
   fps218.zsh hyväksyy SK=…). JU ajoi 6da58f32b:llä 16.1x → tulokset lokit/natiiviseppa-fps-vieritys-6da58f32b-reunat-*-ipad-*/liikeruudut.txt.

## JONO
0. JU:n seuraava koe: f4334cbfd + c5baa2fa7 (+ 693cf437f, 9d1ce79e5, ad08abe9a, 582fc208e). Tarkista konsolista: PiirrosKerros-
   osamerkinnät pitkissä ruuduissa (korjaa suurin osa), mip-varoitukset 0, pisin ruutu vs 693cf437f 140 ms, kuvat 3 zoomista → PT ≤ 3 riviä.
1. Vierityksen reunat on/pois -tulokset (kohta 6) → vertaa liikeruudut.txt → PT. Jos on hidastaa liikaa: piilota piirroksen alle
   kokonaan jäävät pallon renderöijät (EI kerma-palaa Laattapalvelimelle).
2. 354 ms PostLateUpdate: jos toistuu uudessa kokeessa, xctrace (ajo-laite.zsh tekee Time Profilerin) kyseisestä hetkestä.
3. Osa D (20 ms ruutuvahti + muistimittaus isolla iPadilla) kun NUI:n A+C rungossa. iPhone vain PT:n luvalla.
4. GC-haara runkoon vasta PT:n luvalla (2856c5cc3, natiiviseppa/gc-mvt-218). Merget PT:n kuittausten mukaan.
5. Odottavat ennallaan: UITK-sumennuksen liuku (+1 Gt) PT:llä; LAV rakennukset-v95 ei runkoon ennen PK:n korjausta; NUI:n leikehaara
   7280634c4 EI; KS:n tasankoresepti; Z11–Z12-välitasoa EI. Osa C (luoteispala) KS:n/Codexin.
6. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- JU:n kokeet: 6da58f32b (= 693cf437f + 9d1ce79e5 + 3ab522752 + ad08abe9a + 56c06b836 + 582fc208e), aba66eace (= + 70071fea2).
  PT 16.2x hyvä: ympäröivä kartta + pehmeä reuna, lähizoom 2×, multiples-of-4 19 → 0.
- Omat haarat (proto): pariisi-haivytys-218 (f4334cbfd ⊃ 70071fea2 ⊃ 3ab522752), piirros-syyt-218 (70071fea2),
  leikepurku-218 (c5baa2fa7), lataus-oletus-218 (ad08abe9a), rakennus-haivytys-218 (582fc208e), nakyva-ensin-218, piirros-astc-218,
  astc-laite-218, saapuminen-ruutu-218, loppurajaus-218, lontoo-z15-218, astc-mittaus-1420265d7; yhdistelma-1b-218 vanhentunut.
- Uudet worktreet: wt/proto-natiiviseppa-syyt, wt/proto-natiiviseppa-haivytys. Älä poista. Juna 218 runko = 1420265d7
  (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218).
- Simuketju: LINJA=2 zsh proto-3d/_tyo/natiiviseppa/lahto-tulo/ketju.zsh <sha9> (käännös + ennakoitu + kylmä Lontoo, ~7 min) JU:n
  "KÄÄNNÖS NYT" -viestillä; valmis → "VAPAA L2" JU:lle.
- iPad-lukko: proto-3d/Matkakirja-proto-esikatselu/tyokalut/ipad-lukko.sh; simu-lukko.sh on proto-3d/tyokalut/.
- Laatta-/tekstuurimuutokset tarkistetaan oikealla iPadilla, ei vain simussa (PT 15.1x).
- Testit: Kartta-testit `sh Kartta-testit/kaanna.sh [nimi]`; tarkistus `zsh tyokalut/tarkista.sh` (zsh!). EI simun eikä käännöksen aikana
  (tarkista `simu-lukko.sh tila` ja `pgrep -fl "esikatselu.sh|Unity -batchmode"`).
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus, -introkoe, -nakyva, -astc, -lataus, -pariisi,
  -leike, -rakennus, -syyt, -haivytys eikä T7-kopioita. natiiviseppa-luovutus-20261103-1310, -1350, -1457, -1518, -1556 ja -1622 saa
  poistaa mergen jälkeen (tools/uusi-worktree.sh --poista <nimi>).
