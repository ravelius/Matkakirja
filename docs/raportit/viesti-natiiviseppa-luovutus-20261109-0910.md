# Natiivisepän luovutus 9.11.2026 klo 09.10

Edellinen: git show 9d77cf4dd:docs/raportit/viesti-natiiviseppa-luovutus-20261108-2320.md (cron, varjostimen regenerointi, FPV, pohjapallo).
Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi. Nollauksen syy: konteksti 26 % > pehmeä 25 % (7.37) uuden ison työn alussa.
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, NUI local_43962c89-fc14-4098-9dd7-6153133ffcea.
Cron "4 9 * * *" unity-julkaisut.py (ks. edellinen luovutus): LUO UUDELLEEN.

## TEHTY 8.11. 23.2x–9.11. 00.0x
1. AJON ENNAKKOKAMERAT fd8193758 (natiivi-backup natiiviseppa/cesium-esilataus, pohja 7bbea110d; wt /Users/Shared/Claude/wt/proto-natiiviseppa-esilataus).
   Lentoraja-6 s. 12,9 karkea esivanhempi + sauma ja s. 13,1 lovi: kamera katsoo pohjoiseen etelään kulkiessa → uusi maa alareunasta pyytämättä.
   Kartta/AjoEnnakko.cs: piirtämättömät kamerat additionalCamerasiin radalla 0,3/0,7 s edellä + ajon loppu (PalloKierto.AjonEnnakkoAsento),
   vain kohokarttalento (pystyOsuus > 0); komento `maasto ajoennakko kohokartta|kaikki|pois|tila`.
   PT KUITTASI kokeena; JU: koehaara julkaisija/koe-lentoraja-ajoennakko = fd8193758, EI junaan. Pari + MITTAUS
   /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/ajoennakko/kuittaus/ (raidat = Atlantin selänne, myös pois-ajossa). Valmis.

## TYÖN ALLA: TOISEN KAUPUNGIN NOSTON LENTO (PT 9.11. 09.0x)
Suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261109-paikkapalkki-ja-noston-lento.md.
Ongelma (NUI): Pariisi → Carcassonne 600 km lento 2,2 s (NahtavyysEsittely.LentoS) ~1,7 km:n korkeudella → koko ruutu pallon pohjaväriä.
Nousu PalloKierto.AjaKallistukseen: nousu = (kulma − näkyvä/2)/90° ≈ 0,06. Tehtävä: kaupunkien välinen käyrä nousee niin korkealle, että
maan tason laatat peittävät reitin, kesto kasvaa matkan mukaan; paluulento sulkiessa samalla käyrällä; NUI:lle rajapinta (kesto, korkeus).
NUI tekee palkin ja paluun haarassa natiivi-ui/paikkapalkki. POHJA junan 223 kärki 4e972eeed. Mac-kuvat lennon puolivälistä ensin PT:lle.
Ei junaan ilman korttia.
- Worktree luotu, EI muutoksia: /Users/Shared/Claude/wt/proto-natiiviseppa-nostolento (haara natiiviseppa/noston-lento @ 4e972eeed).
- Huom: pystyOsuus (lentoraja-4/6) ja AjoEnnakko EIVÄT ole junassa; 4e972eeed:n PalloAjo = vanha (nousu × sin(πe), kohtiPistetta).
- Kutsut: NahtavyysEsittely.AjaOletus → k.AjaKiertaen(lat, lon, h, LentoS, KohdeKiertoOhje, …, Kameramatikka.Pehmennys);
  Etene luo PalloAjo(…, MaxKorkeus(), ajo.nousu, …) ja KohdeKierto(pallo, ohje) käärii sen (PalloKierto.cs ~2305).
SUUNNITELMA (ei koodattu):
- PalloAjo-tila "matka" (huippuM > 0): katto = huippu, korkeusprofiili ajassa x: W(x) = ss(x/a) alussa, 1 välissä, ss((1−x)/a) lopussa;
  lh = lerp(lnA, lnL, ss(x)) + W·(lnH − lerp); sivuliike p = ss((x − a·lap)/(1 − 2·a·lap)). Suosittelen a 0,4, lap 0,6.
- Huippu H = 1,2 × matka / (2 tan(fov/2)) (600 km → 772 km), rajaus [max(h0, h1), MaxKorkeus()].
- Kesto Mitoita-funktiolla: muoto näytteistetään kerran, kesto = max(zoom/(0,85×5,4), siirto/(0,85×3,6), √(kiiht/(0,85×raja))) (KarttaRajat).
  Simulaatio /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/nostolento/kaari-mitoitus.py (1,7 km päät): 100 km 4,4 s, 300 km 5,5 s,
  600 km 6,3 s, 1 200 km 7,0 s; sivuliike alle H/4:n korkeudella ≤ 0,4 km (600 km). ZOOM-RAJA RATKAISEE (12,2 ln yhteensä).
  Jos 6 s on PT:n mielestä liikaa: kysy PT:ltä, saako matkalento ylittää KarttaRajat-zoomin (5,4 ln/s) vai lasketaanko huippua.
- Rajapinta NUI:lle (Linssit/Ydin/Kamera, testattava): static MatkaLento.Mitoita(lat0, lon0, h0, lat1, lon1, h1, fovDeg, kattoM)
  → (KestoS, HuippuM); PalloKierto.AjaKiertaen/Aja saa valinnaisen huippuM-parametrin (Ajo.huippu → PalloAjo). Paluulento: sama Mitoita.
- Testit Linssit-testit PalloLiikeTestit: matka 100/600/1200 km PalloTarkastus.Aja OK; unity-tarkistus sh.
- Ennakkokamera reitille: AjoEnnakko (fd8193758) voisi kattaa matkalennon (Tila.Kaikki) – vain PT:n luvalla, se on koe.
- Mac-ajo JU:lla: Pariisi → Carcassonne -nosto, kuvat lennon puolivälistä; JU:n skenaarioihin `komento maasto siirtyma 5 0 30`.

## JONO
1. Yllä oleva työ (aloita Mitoita + PalloAjo-matkatila + testit). 2. Muuten jono tyhjä.
