# Linssiseppä 2 – luovutus 13.10.2026 klo 21.35 (Suomen aika), tilinvaihto (PT 21.30)

Luovuttaja: Linssiseppä 2 (Opus, high). Edellinen: viesti-linssiseppa-2-luovutus-20261013-1940.md.

## Lue ensin
1. `CLAUDE.md` (agentit vain Opus/Sonnet, VAIN EUROOPPA, AIKA).
2. Raamattu (`js/tyohuone-raamattu.js`): Ydinajatus kohta 2 "TYÖTAPA JA SESSIOT".
3. Tämä raportti, KESKEN ylhäältä alas. Muistio: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/koopenhamina-kytkennat.md`
   (loppuosa "Rodin-sali 13.10. ilta" = tämän illan kulku).

## Tila
- Proto-worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-koopenhamina`, haara `linssiseppa2/museo-ranska-rodin2` **a29af6561**
  (pushattu natiivi-backupiin, puhdas). Pohja: LS1:n `linssiseppa/museo-maa-188` 427bd1a04 (sali-v2c).
- Ajo käynnissä tilinvaihdon hetkellä: rodin4 (käännös 992ce2800 = 7f741cd83, simu A26BC7D0, alkoi 21.28) – ketju sammuttaa simun
  itse. Loki `_tyo/linssiseppa2/taidemuseo-ranska/ketju-rodin4.log`, tulos `proto-3d/lokit/todistus-rodin4-*`. Lähetä Julkaisijalle
  SIMU VAPAA, jos se ei vielä mennyt (tarkista lokin viimeinen rivi "SIMU VAPAA").
- App-kopio `proto-3d/lokit/linssiseppa2-app-rodin3/` (554c12de3): LS1 käyttää ranska188b-ajoonsa – ÄLÄ POISTA ennen LS1:n kuittausta.

## Haaran commitit (Rodin-sali, sali 4)
- f3cbd9b0b veistokset.json lahteet[] + Tietoja.VeistostenLahteet (skannaajat Tekijätietoihin).
- 4a8c0525c Rodin-veistospysähdykset kierros.json:iin + huoneet.json rodin-rivi.
- 6a907171e KORJAUS LS1:n runkoon: MuseoSovitin antoi MuseoNayttelyille vain teos-id:t → Rodin ei ollut näyttely. Nyt jalusta-id:t.
- 7f741cd83 PT 13.10.: Helvetin portit pois (skannaus tumma laatta).
- a29af6561 LR:n sali-v2d (rp-portit → rp-haamut puksisyvennyksessä, esteet sivuilla/takana, malli 5 cm jalustan sisään) +
  Kolme haamua (rodin-kolme-haamua, SaschaGoto CC BY 4.0) kierroksen viimeiseksi. 57 pysähdystä, Rodin 50–57 (8 veistosta).
  Testit 1746/1746, unity-tarkistus 0.

## KESKEN (ylhäältä alas)
1. sali-v2d ämpärissä (Julkaisija VIETY 21.31, 31/31).
2. **rodin5-ajo**: käännös a29af6561 linjalla 1 KÄYNNISTETTY 21.31 (`ketju-rodin5.zsh`, loki `ketju-rodin5.log`); kun lokissa
   "LUKKO VAPAA <sha>", lähetä Julkaisijalle KÄÄNNETTY/LUKKO VAPAA. Simu odottaa lippua `_tyo/linssiseppa2/taidemuseo-ranska/simu-nyt-rodin5`:
   luo se (touch) vasta Julkaisijan SIMU NYT -viestillä (jono: LS1 palaute188 → NUI siluetti → rodin5 + LS1 vesi19c). Lopuksi SIMU VAPAA.
   Skenaario `sk-rodin5-ipad.txt` (Haamut edestä + v08b/c keskikäytävän reunoista ±20° + v08d poikkikäytävältä; puutarha v09/v10).
3. **PT:n kuittaus odottaa**: kuva-arkki PT:lle ennen kuittausta. PT:n ehdot Haamuille: (a) repaleinen alareuna ei näy, (b) selkäpuolen
   reiät eivät näy kulkureitiltä, (c) CC BY -krediitti (tehty: LAHTEET.md + veistokset.json lahteet). Tarkista myös puutarhan
   päivänvalo (v2c ev100 7,2: rodin3:ssa pensaat ja Ajattelija olivat mustia/siluetti, rodin4 ja rodin5 näyttävät korjauksen).
4. LS1:lle tiedoksi: a29af6561 voi fast-forwardata `linssiseppa/museo-maa-188`:n (LS1 tekee omistajan museopalautetta junaan 188).
5. Avoimet muille: Ranskan näyttelyvalikon "Rijksmuseum"-otsikko korjattu LS1:n 9fecfada9:ssä (kuva-alue piilossa); veistosten
   tekstit eivät vielä näy pelissä (MuseoTaulu näyttää vain Teokset) – luonnos `_tyo/linssiseppa2/taidemuseo-ranska/rodin-pysahdykset-luonnos.json`
   (8 veistosta, SK:n tekstit, Haamut mukana) odottaa LS1/NUI:n veistosriviä.
7. **rodin4 valmis 21.33** (lokit/todistus-rodin4-20261013-2128/kuva-arkki.png, 7/7 veistosta, 0 virhettä): puutarha nyt päivänvalossa
   (v2c korjasi). LÖYDÖS (LR: veistosten kohdevalot ovat LS2:n): Balzacin ja Porvarien ALAOSA on tumma – puutarhan veistoksilla ei ole
   ympäristövaloa, ja kohdevalojen kartio (puolikulma 22°, kohde 0,4 × max_koko.y) ei ylety alas. Korjausehdotus: puutarhan (rp) valoille
   puolikulma ~35° ja kohde keskelle, tai veistosmateriaalille ulkona ympäristövalo (MuseoValaistu, LS1:n runko) – sovi LS1/LR:n kanssa.
6. Simussa patsaat näkyvät marmorivarana (simu ei tue ASTC:tä) – värit tarkistetaan vasta laitteella; kerro PT:lle kuvien yhteydessä.

## Paketit (ämpärissä)
- `_valmiit/taidemuseo-ranska-patsaat-astc-v1-vienti-20261013` (10 patsasta, viety 19.38).
- `_valmiit/taidemuseo-ranska-haamut-astc-v1-vienti-20261013` (Kolme haamua, viety 21.11). Lähde `_tyo/linssiseppa2/taidemuseo-ranska/haamut-lataus/`
  (malli.glb, lisenssin tilannekuva), työkalut `tyokalut/{lataa_haamut.py, rajaa_kaanna.py, esikatsele_glb.py}`.
