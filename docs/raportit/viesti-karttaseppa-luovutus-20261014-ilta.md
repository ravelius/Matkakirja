# Karttasepän luovutus 14.10.2026 klo 16.3x (PT:n pyyntö, konteksti ~55 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-20261010-ilta.md` ja `viestit-osoitekirjan-idlla.md`. VIESTIT aina `send_message`
session id:llä tiedostosta `/Users/Shared/Claude/osoitekirja.md` (PT local_74630a27…, ≤ 3 riviä). Edellinen luovutus:
`viesti-karttaseppa-luovutus-20261014.md`. Työtiedostot `proto-3d/_tyo/karttaseppa/`; kopiotestien scratchpad (katoaa):
`/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-karttaseppa/b749dea1-…/scratchpad/` (ateena-koe.py, ajo.sh, ruudukko*.py,
kaanna-ateena.sh = LS1:n kaanna.sh ilman git-polkua; viive.py; venv tifffile+opencv).

## 1. PR #4593 pääkaupunkien loput 44 kohdekarttaa (junaan 190, PT kuittasi arkin)

- Haara `karttaseppa-paakaupungit-kohdekartat-loput-2` (wt `/Users/Shared/Claude/wt/karttaseppa-paakaupungit-kohdekartat-loput`),
  kärki 11ed3001f: f1819fb61 (44 karttaa + KAUPUNGIT-rivit + Funafuti Vaiakuun) → PK 4c4c4d636 (maakartat.js 44 riviä, SK:n
  esittelyt) → 11ed3001f Moroni (meriHaku 0,4, meriMax 0,97: täyttö maalasi Grande Comoren mereksi). npm test 5531/0. PR valmis.
- KESKEN luovutushetkellä: PK:n iPhone-rikkeet paramaribo (Fort Zeelandia, kokoruutuvihje) ja santodomingo (Ozama, reuna 1 px).
  Malli (korjaa --vain) sanoi ok → ajossa `tarkista-kohdekarttavarat.mjs iphone paramaribo santodomingo --json` + `korjaa
  --mitattu … --piirra --mac <pilvi>` (scratchpad mitattu-ps.json). Tarkista `git status` wt:ssä: jos rajat muuttuivat → commit,
  push, `tarkista … iphone|ipad paramaribo santodomingo` 0 rikettä, rivi PK:lle + PT:lle.
- Moronin keskipiste: suositus PT:lle pitää (ainoa kohde Karthala 11 km idässä; kaupunki rannalla). PT:n vastaus auki.
- HUOM: 14.10. iltapäivällä keskeytetty korjaa-ajo (7 Afrikan karttaa) palautettu: T7 mac.json -rajat abuja, lome, brazzaville,
  kinshasa, libreville = mainin arvot. Vika oli PK:n kytkentäskriptissä, ei kartoissa.
- Funafuti: SK korjasi lähteen (pallo −8,5211 / 179,1966). PK ei kytke Oseaniaa peliin ilman omistajaa (data riittää).
- Atollit: Majuro, South Tarawa meriMax 0,98, Funafuti 0,995 (meri aidosti > 85 %).

## 2. Karttaesineet kiinni (omistaja 12.05) — VALMIS, junaan 190

Natiivi-proto haara `karttaseppa/karttamerkit-kiinni-190` 78f0e65be (natiivi-backup; wt /Users/Shared/Claude/wt/proto-karttaseppa-karttamerkit-190):
KaupunkiPallot Ruutu → UiKerros.KameranJalkeen, raketti/torni/museo 0,8 × (≥ 44 pt), RuutuPiste maan korkeudella (MaaM ×
KorkeusKerroin). NUI kuittasi. Todiste `proto-3d/lokit/todistus-karttamerkit-190-vertailu/` (TULOS.md: ennen merkki ruudun jäljessä,
korrelaatio 0,94, ero ≤ 15,5 px; jälkeen ≤ 2,0 px). Oma simu karttaseppa-iPhone DA0AAEEA (NS loi; SIMU NYT Julkaisijalta).
Puhelimen kartta ei mene alle ~180 km → korkeuskorjaus alle pikselin; näkyvä vika oli viive.

## 3. Pallokierrosten kamerat (LS1 tekee versiot ja iPad-ajot)

- Ateena: v3 (Zeus 135, Tuulten torni 55–70, Propylaia porttirakennukseen 37,97155/23,72495) iPadilla OK (2d4e58e4).
  v4 lounaasta (PT:n tilaus, Valosepän valoanalyysi): Propylaia 235, Erekhtheion 225 (LS1:n 215 → liuku 13,4 s), Parthenon 230;
  Hefaistos → Propylaia 48,8 s. `_tyo/karttaseppa/ateena-pallokierros-kamerat-v4-20261014.json` (+ v2.md perustelut).
  AVOIN (PT): Ateenan Erekhtheionin silmä — odota LS1:n v4-iPad-ajoa (silma_m nyt 30–40).
- Lontoo v4 = ämpärin v3 (Trafalgar 172/70–85 jo siellä; LS1:n iPad-ajo käytti v2:ta) + Tower silma_m 45–60:
  `_tyo/karttaseppa/pallokierros-lontoo-v4-20261014.json`.
- Praha v3 = v2 + Josefov katse_suunta 320, silma_m 55–70 (340 laukaisi Kafka-pään rajauskorjauksen −14°; poikkeus LS1:n testiin):
  `_tyo/karttaseppa/pallokierros-praha-v3-20261014.json`.
- LS1:lle kerrottu koodi-/testikohdat (Ateena): liuku < 150 m (OpasSilmukka `matka >= 150`), äänettömän kierroksen loppunousun
  seisahdus, Agoran teksti 418 merkkiä, LoppuKatseSuuntaJasentyy + Ateena.

## 4. Muut

- Valoseppä: tarkat Euroopan yövalot (Black Marble 8192², 4 tiiltä 11,8 Mt) kopioitu `_tyo/karttaseppa/iss-yovalot-8192/`
  (alkuperä NAS `Matkakirja-arkisto/karttaseppa/pyramidi-poltto/iss-yovalot-8192/`). EI ämpärissä; Valoseppä kokeilee
  paikallisesti ja kertoo vientipolun.
- Praha vesi v3 odottaa uuden Valosepän kuvaa (luovutus 497068dd7) → praha3 + index-v23 vientiin.
- Josefov-pallokierros (ent. 340°) → nyt Praha v3:ssa 320°.
- #4579 lähdeluettelo auki (Julkaisija). Pilvivinouma (PT).
