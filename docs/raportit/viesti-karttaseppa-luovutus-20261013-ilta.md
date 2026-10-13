# Karttasepän luovutus 13.10.2026 ilta (PT:n nollaus, konteksti 50 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-20261010-ilta.md` (13.10. rivit 11.1x–18.5x), `hiljainen-tunti-ei-testeja.md`,
`agenttiohje-ei-lupakyselyja.md` (haut rajatusti, ei juuresta), `pitkat-ajot-setsid-irrotus.md` (exec listamuodossa: välilyöntipolut).

## Valmista tänään (ämpärissä, Julkaisija vienyt, CDN 200)

- **Kööpenhamina Pariisin tasolle:** ilmakehä + vesiväri (`ilmakeha/aerosoli-v1/koopenhamina/`, `ilmakeha/pilvet-v2/`, `vesi/vari-v2/`),
  elävä kaupunki + muodot + julkisivuvalot + 3D-pisteäänet T7 `_tyo/karttaseppa/kaupunki-koopenhamina-20261013/` (LS2 kytki, Pelikoodari 892797aa3).
- **Kööpenhaminan pallokierros `opas/pallokierros-v6/koopenhamina.json` = LOPULLINEN** (v3 katse → v4 LS2 Amalienborg 112/15 + Kastellet 140/30
  → v5 äänet + Nyhavn 100/15 → v6 Rundetårn 90/20 koko 30 silmä 38–48, Tivoli aukio 280 silmä 32–44). v7 (korkeus_m DHM:stä) HYLÄTTY
  (LS2: huononsi kehystä; `_valmiit/HYLATTY-opas-koopenhamina-v7-20261013`). Seuraava muutos = v7-polku uudelleen käyttöön vasta LS2:n testin jälkeen.
- **Kööpenhaminan DSM (DHM overflade, CC BY 4.0):** `kartta/korkeus/v1/korkeus-koopenhamina-v3.json` (lähi 2 m 4000 × 3000, kauko 10 m ±15 km, ≈ 42 Mt
  purettuna). v2 (90 Mt) on ämpärissä mutta ei kytketä (muisti). LS2 kytkee v3:n junaan 188 erikseen simu- ja muistiajolla; juna 187 = GLO-30.
  DATAFORSYNINGEN_TOKEN toimii. Työkalu T7 `vesimaski/korkeus-dhm.py`, ajo `ajot/dhm-koopenhamina-20261013.sh`.
- **Tukholma maa-v3 (Lantmäteriet Markhöjdmodell 1 m):** `kartta/korkeus/v1/maa-tukholma-v3.json` (lähi 2 m 8 × 6 km, kauko 4 m = v2:n ruutu, 40 Mt).
  LS1 kytki (proto linssiseppa/maa-tukholma-v3-188 **b4769884a**, juna 188). LANTMATERIET_KAYTTAJA/_SALASANA toimivat (vakl0001).
  Työkalu T7 `vesimaski/maa-lantmateriet.py`.
- **MUISTIRAJA (LS2):** natiivi purkaa korkeus-PNG:t ushort-taulukoiksi, kaksi kaupunkia muistissa → per kaupunki ≤ ~45 Mt.

## Kesken

1. **PR #4560 pääkaupunkien kohdekartat e04–e14** (wt `/Users/Shared/Claude/wt/karttaseppa-paakaupungit-kohdekartat-e04-e14`, kärki **7c9474507**):
   20 karttaa, pallopiste aina rajoihin + PALLOVARA 0,15 (kohdekartat.mjs, `--vain`), Conakry meri 'maa' + meriMax 0,98. PT kuittasi.
   **PIDÄTETTY omistajan julkaisupyyntöön** (Julkaisijan lista, muuttaa assets/kartat). Jos kärki muuttuu → uusi SHA Julkaisijalle.
   São Tomé jää enimmäkseen mereksi (Ilhéu das Cabras on Codexin kohde). Codexin A-vaihe: 22 kaupungilla 0 ja 25:llä 1 kohde, joten niitä ei piirretä.
2. **VESI v2 (LS1:n Näsijärvi-löydös):** syy: OSM-järvipolygoni kattoi vain osan järvestä → ESA-täydennys sai liukuvan jokitason (1 km lohkot, 10 %)
   → pinta portaittain Googlen alle, suorat reunat. Korjaus `vesimaski/vesipinta.mjs` (ESA-komponentti, jonka naapureista enemmistö on järveä,
   perii järven tason; varmuuskopio `vesipinta.mjs.ennen-esajarvi-20261013`). Tampere `kaupunki-tampere-20261013/vesi-v2/` valmis
   (Näsijärvi 113,8–114,0 m, ennen 104,6–114) → LS1 ottaa v17:ään nimellä tampere2 ja pyytää viennin itse (pidä T7:llä).
   **AJOSSA nollaushetkellä:** kaikkien kaupunkien uusinta `vesimaski/ajot/vesi-v2-kaikki-20261013.py` → `kaupunki-<id>/vesi-v2/` + raportti
   T7 `_tyo/karttaseppa/vesi-v2-raportti-20261013.md`. JOS RAPORTTIA EI OLE, aja skripti uudelleen (idempotentti, venv-kartta python -I, ~10 min, nice 15).
   Sitten rivi LS1:lle: erityisesti Oslo, Bergen, Reykjavik (islanti), joissa LS1:n 2,0 m:n nostonkin jälkeen jää läiskä.
3. **Kööpenhaminan "2 m maasto":** DSM v3 on ämpärissä (yllä); DTM on yhä Mapterhorn 4 m (`kartta/korkeus/v1/maa-koopenhamina.json`). Jos LS2 pyytää
   2 m DTM:n: `korkeus-dhm.py` + coverage `dhm_terraen` (sama WCS), sama muistiraja.

## Seuraavat erät

- Vesi v2 -raportti → LS1 (kohta 2), tarvittaessa vientipaketit uusilla nimillä (vie-paketti ei ylikirjoita).
- Kööpenhamina: odota LS2:n simukuvia v6:sta ja DSM v3:sta; Pieni merenneito on natiivin Rajatut-listalla (LS2).
- Pääkaupunkikartat: Codexin seuraava erä (postilaatikko claude/postilaatikko) → `kohdekartat.mjs <data> <erä> --piirra`.

## Pelikoodi-SHA:t (muiden roolien kytkennät tämän päivän datalle)

- LS1 maa-tukholma-v3: proto `linssiseppa/maa-tukholma-v3-188` **b4769884a**.
- LS2 Kööpenhamina-kippi: proto `linssiseppa2/koopenhamina-kippi` **53cd6393a** (kytkennät) ja **f32f9e5fb** (kehystestit).
- Pelikoodari Kööpenhaminan 3D-pisteäänet **892797aa3**.
- Web: PR #4560 **7c9474507** (pidätetty).
