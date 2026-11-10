# Natiivisepän luovutus 10.11.2026 klo 08.00

Edellinen: luovutus -0740 (haara natiiviseppa-luovutus-20261110-0628, 18db1e07b) + LISÄYS 07.5x (539e1a1b2). Syy: kontekstivahti ~30 % (7.37).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja. Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (ks. -0740). Älä poista mitään.
Työlista: python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava NS. NYT: Cesium ja ISS muistirajan alle.

## LEVY: siirto-wt.zsh ajossa (aloitettu uudelleen 07.44, loki _tyo/natiiviseppa/levy/siirto-wt-0750.log)
Jos katkennut: aja uudelleen taustalla (valmiit "ei kansiota"). Loppuun rivi PT:lle (montako, paljonko vapautui; alussa 12,8 Gt vapaana).

## TEHTY TÄLLÄ VUOROLLA
- P3/P4-paluuajo 8c2956804 KATSOTTU (lokit/kartan-purku-ipad-p34-8c2956804): P4 kartta ISS:n jälkeen ehjä (pallo, pohjarasteri, talot 56,
  nähtävyydet), P3 Cupola ok, komennot jatkuivat VIKAn yli. PT:lle 07.55 → PT kuittaa JU:lle purun (c31e0eb9e tai 8c2956804).
  HUOM: ISS:n huippu tässä ajossa 5030 Mt.
- Pariisi-pino kysymys 4 (nimikarsinta) PT:lle: keskustelukanava/kuvat/pariisi-pino-20261110/4-nimikarsinta.md + pari.

## ISS-MUISTI (työn alla)
Syy c31e0eb9e-lokista (U-rivien "ov"): Cupolassa pallon rasterit 141 → 705 Mt (BMNG ja S2 molemmat näyttövirhe 2, tekstuuri 2048);
latauskuvan 3 kerrosta 84 Mt LRU:ssa; Cupola 3 reunavalot 3 × 28 Mt; malloc +940 (oletus: Cesiumin rasterien CPU-kopiot – todistamatta);
kaupungin MSAA4x-liitteet (85–106 Mt kpl) näkyvät listoissa vielä ISS:ssä – onko luotu/memoryless, selviää R-riveistä.
Koe natiivi-backup natiiviseppa/iss-muisti 0fc5b9a73 (wt /Users/Shared/Claude/wt/proto-natiiviseppa-kartanpurku, 8c2956804 + 2), unity-tarkistus 0:
- BMNG kevyt S2-maailman alla (8 / 512), ei talvella/kuvan pinnalla/häivytyksessä; QA `linssi astro kyyti bmngkevyt 0|1`.
- Latauskuvan kerrokset Kuvat.Poista (OpasValikko.PiilotaPalloKerrokset). Reunavalot HaeSivulla puolikkaina (IssKyytiNakyma).
- MuistiTarkka: O-rivi (rasterit kerroksittain), R-rivi (RenderTexturet ≥ 8 Mt, luotu, memoryless, 10 s).
JU:LLA (kuitattu 07.5x): museo-1:n jälkeen _tyo/natiiviseppa/iss-muisti/sk-iss-muisti-b.txt → lokit/natiiviseppa-iss-muisti-b-0fc5b9a73,
sitten sk-iss-muisti-a.txt (bmngkevyt 0 alusta) → -a-0fc5b9a73. JU:n kuittaus mainitsi vielä 96a372227 → korjaus lähetetty, TARKISTA kansio.
KUN VALMIS: vertaa b vs a: fp-huippu/vakaa Cupolassa, O-rivit (BMNG vs S2 Mt), malloc (laskeeko BMNG:n mukana → CPU-kopiot), R-rivit;
kuvat I1/I2 (b vs a) ja I3 (b, bmngkevyt 0 lopussa) täysikoossa: näkyykö karkea BMNG jossain (S2:n aukot, reunat). Tulos ja pari PT:lle.
Seuraavat vivut datasta riippuen: MSAA-liitteet memorylessiksi tai pois ISS:ssä; S2 kevyempi isolla iPadilla (näkyvä → KK:n kortti).
Junaan vasta kun ISS < 4080 ja kuvat katsottu; haara junan päälle.

## SEURAAVA JONOSSA
- Museo: sk-museo-1 (JU ajaa paluuajon jälkeen) → lokit/natiiviseppa-museo-1-91bc37c4b → katso → pari PT:lle (ks. -0740).
- Työlista: Muistin keventäminen (vaiheet 0, V, 1, 2), Pariisin muistin kevennys kahdella keinolla.
