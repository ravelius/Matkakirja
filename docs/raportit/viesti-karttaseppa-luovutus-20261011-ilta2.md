# Karttasepän luovutus 11.10.2026 ilta 2 (noin 19.4x, omistajan Claude-päivitys)

Edellinen luovutus: `viesti-karttaseppa-luovutus-20261011-ilta.md`. Tilamuisti on `karttaseppa-tila-20261010-ilta`, ja sen loppurivit ovat tämän session loki.

## 1. JATKOKOHTA: karttakorjaukset yhtenä PR:nä (PT:n hyväksymä)

- **Haara ja worktree:** haara `karttaseppa-kartta-korjaukset` (8baf26820, KESKEN, pushattu), worktree `/Users/Shared/Claude/wt/karttaseppa-kartta-korjaukset`.
- **Valmista:**
  - Tukholman Saltsjö, Strömmen ja Nybroviken ovat nyt vettä: `meri: true` ja uusi piirtotyökalun valinta `meriHaku: 0.05`, joka hakee rantaviivan laajemmalta alueelta. Sekä värikartta että paperikartta on piirretty.
  - Jänissaari 1703 ja Kolumbus 1484 on siirretty maalle.
  - Tukholman Vädersolstavlan ja Naamiaislaukaus saivat `siirto`n.
  - `tools/tarkista-karttapisteet.mjs` lukee värikartan (vesi #c3d5da).
- **KESKEN:** Barcelonan (pohjoinen +0,002) ja Pietarin (etelä −0,002) rajat on muutettu sekä `maakartat.js`:ssä että piirtotaulussa, mutta kuvia ei ole vielä piirretty.
  - Taustajono `piirrot.sh` (setsid, kopio T7:llä `_tyo/karttaseppa/kartta-korjaukset-20261011/`) piirtää ne Overpass-ruuhkan läpi, 8 kierrosta 10 minuutin välein.
  - Tarkista, että `assets/kartat/barcelona-keskusta.png` ja `pietari-keskusta.png` ovat 11.10. iltaa uudempia. Jos eivät ole, aja käsin: `OVERPASS_PALVELIMET=… node tools/piirra-kaupunkikartta.mjs barcelona` (ja `pietari`). Poista sivutuotteena syntyvä `*.svg`.
- **Sitten:**
  1. Katso kuvat ja aja `tarkista-karttapisteet` Barcelonalle, Pietarille, Pietarin Jänissaarelle, Lissabonille ja Tukholmalle.
  2. Aja `npm test`.
  3. Commit ilman KESKEN-merkintää ja PR Julkaisijalle (PT:n merge-lupa annettu).
  4. Lähetä PT:lle kuvapari T7 `_tyo/karttaseppa/kartta-korjaukset-20261011/tukholma-ennen-jalkeen.jpg`.

## 2. Valmista tässä sessiossa

- **Vatikaanin kohdekartta** (#4415), suojakorjaus (#4413) ja aloituskaupungit (#4380) on mergetty.
- **Pariisin kipin aukiot** (Vendôme, Bastille, République ja Saint-Michel; Tertre pois PT:n päätöksellä) T7 `_tyo/karttaseppa/kippi-pariisi-20261011/`. LS1 otti ne käyttöön. Pelikoodari odottaa kerrontaa ja kuvia PT:ltä.
- **Olavinlinnan keittiön vertailuaineisto** T7 `_tyo/karttaseppa/olavinlinna-keittio-vertailu-20261011/`, toimitettu LR:lle ja LS2:lle.
- **Pääkaupunkien e04–e14 Macin puoli** (#4423, mergetty). Kun Codexin erä tulee, aja `node tools/paakaupungit/kohdekartat.mjs <paakaupungit-pilvi> <erä> --piirra`, katso kuvat ja anna `kohdekartat-mac.json` Pelikoodarille.
- **CMAB-arvio:** ei käytetä. Arvio on kirjattu tiedostoon `peking-20261010/lr/LUEMINUT.md`.
- **Peking Codexille -paketti:** NAS `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/karttaseppa/peking-codex-20261011/`. PT viimeistelee tilauksen.
- **Euroopan kartan kokonaistarkistus** (#4429, mergetty): raportti `docs/raportit/karttaseppa-eurooppa-kartta-tarkistus-20261011.md`.

## 3. Opit

- Peli näyttää värikartan (`varikartta`), kun se on olemassa. Kuudessa kaupungissa `polku`-kuva on vanha laajentamaton piirros, joten karttoja tarkistettaessa katsotaan aina värikarttaa.
- `meriHaku` korjaa meritäytön tunnetun puutteen, jossa saaren ranta katkeaa rajaukseen. Sitä kannattaa kokeilla muihinkin rannikkokaupunkeihin, joissa meri on jätetty paperinväriseksi.
- Overpass oli 11.10. illalla tuntikausia 500/504-tilassa. Pitkä piirto tehdään setsid-jonona, jossa on kierroksia ja taukoja.
- NAS:lle kopioidessa syntyy `._`-tiedostoja. Poista ne: `find … -name '._*' -delete`.
