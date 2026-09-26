# Erikoismalli: Stonehenge (speksi, pohja docs/raportit/erikoismalli-speksi-pohja.md)

## 1. Tunniste ja paikka
- `kohde:stonehenge`, avain `stonehenge`. Iso-Britannia, 51,1794 N, 1,8250 W, taso 1 (historia).

## 2. Viitekuvat (Commons)
- Ilmasta: File:Stonehenge and Aerodrome 1928.jpg (PD, Royal Air Force).
- Sivulta: File:Sarsen Circle & Trilithons at Stonehenge.jpg (CC BY-SA 4.0, Jacek Rużyczka) ja File:Summer Solstice
  Sunrise over Stonehenge 2005.jpg (CC BY-SA 2.0).
- Pohjapiirros: File:Stonehenge stones plan by Nash et al 2021.png (CC BY 4.0) ja File:Stonehenge plan - with
  numbers in red.png (CC BY-SA 3.0).

## 3. Siluetti ja tunnusmerkit
1. Sarsenkehä: pystykivet ja niiden päällä yhtenäinen kansikivirengas. Lounaassa on aukkoja (kaatuneet kivet).
2. Viisi trilithonia hevosenkengän muodossa, joka avautuu koilliseen (keskimmäinen on korkein).
3. Kantapääkivi (Heel Stone) kehän ulkopuolella koillisessa akselin suunnassa.
4. Matala vallirengas ympärillä (tasainen rengas maassa).
- Pois jätetään sinikivet (tai 6 matalaa tappia LOD0:ssa), kaatuneiden kivien yksityiskohdat ja kulkureitit.

## 4. Mitat ja koko
- Sarsenkehä halkaisijaltaan 33 m, pystykivet 4,1 m ja trilithonit 6–7,3 m. Kantapääkivi 77 m keskeltä koilliseen.
  Vallirengas 110 m.
- Yksikkö: 1,0 = 110 m (vallirengas). Kivet liioitellaan pystyyn 3,0 ja paksuutta 1,5, jotta kehä erottuu 60 pt:ssä
  renkaana eikä pisteinä.
- Koko 60 pt, juuri kehän keskellä.

## 5. Paletti ja aksentti
- Kivet paperi → seepia (harmaa ei käy, vaan lämmin kivi), vallirengas vaalea seepia ja ruoho paperi.
- Aksentti: aamuauringon valo (`--sym-ihme` #b8862b 35 %) vain valokiilassa ja kivien koillispinnoilla sen aikana.

## 6. Animaatio
- **Auringonnousu (osa 1):** matala kultainen valokiila (valaisematon puolikartio) nousee koillisesta kantapääkiven
  takaa ja osuu kehän läpi keskelle. Nousu 8 s, pito 10 s ja häipyminen 8 s. Samaan aikaan kivien koillispinnat
  lämpenevät (varjostimen `_Aamu`-parametri 0 → 1).
- **Pilven varjo (osa 2, harvoin):** pehmeä tumma soikio liukuu kehän yli 12 s:ssa.
- Vaihtelu: KayMinS 26, KayMaxS 30 (yksi auringonnousu), SeisooMinS 40, SeisooMaxS 120, TaukoTod 1. Pilvi 30 %:ssa
  tauoista.
- Levossa (ei nousua) piirretään 0 kehystä.

## 7. Kolmiot ja LOD
- Pystykivet 24 × 12 = 288, kansikivet 20 × 12 = 240, trilithonit 15 × 12 = 180, kantapääkivi 12, sinikivitapit
  6 × 8 = 48, vallirengas 64. Yhteensä noin 830.
- Valokiila 16 ja pilvi 32. LOD0 noin 880, LOD1 noin 320 (kansikivet yhtenä renkaana, sinikivet pois).

## 8. Ääriviiva ja perspektiivi
- Reuna kiville. Valokiilassa ja pilvessä ei reunaa (valo ja varjo). Perspektiivi juureen.

## 9. Hyväksyminen
- Kuvat: ylhäältä keskellä (rengas ja hevosenkenkä erottuvat), 30°:n kallistus lounaasta (valo tulee kehän läpi
  kohti katsojaa) ja reunalla. Video 10 s nousun huipusta. ≤ 0,3 ms.
