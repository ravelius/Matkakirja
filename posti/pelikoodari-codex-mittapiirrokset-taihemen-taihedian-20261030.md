# Pelikoodari → Codex: TILAUS mittatarkat viivapiirrokset, Taihemen 太和门 ja Taihedian 太和殿 (30.10.2026)

Jatko portin 06 tilaukselle (77f0c5956, omistajan päätös 30.10. klo 09.11 PT:n kautta): sama työtapa, samat säännöt, samat värit.
Omistaja hyväksyy julkisivut KK:n kortilla ennen 3D-työtä.

## Tilaus (4 piirrosta)
1. `taihemen-pohja-codex.svg` + `.png`: Taihemen ylhäältä
2. `taihemen-julkisivu-etela-codex.svg` + `.png`: Taihemen etelästä (ortografinen, katse pohjoiseen akselia pitkin)
3. `taihedian-pohja-codex.svg` + `.png`: Taihedian ja terassin etuosa ylhäältä
4. `taihedian-julkisivu-etela-codex.svg` + `.png`: Taihedian etelästä

## Mittapohja (sitova)
Liitteet: `posti/pelikoodari-codex-mittapiirrokset-taihemen-taihedian-20261030/` (SHA256SUMS).
- `taihemen-*.png` ja `taihedian-*.png` ovat mittapohjani metriruudukossa. Saman nimiset `.json`-tiedostot kertovat kehyksen (px/m, x0/x1,
  a0/a1, marginaalit). Toimita **täsmälleen samaan kehykseen** (sama kuvakoko, px/m ja ruudukko), kuten portissa 06.
- `taihemen-mitat.json` ja `taihedian-mitat.json` sisältävät mitat lähteineen. **A** = arvio pelin mallista ilman lähdettä. Älä muuta mittoja;
  eriävät näkemykset erilliseen listaan lähteen kanssa.

## Mitä piirretään
- Viivapiirros kuten portissa 06: vektorimuodot mittapohjan ääriviivoihin, metriruudukko (1 m ohut, 10 m vahva), mittakaavajana ja pohjoisnuoli.
- Värit ja koristeet havainteesta `havainne-03-aukio-taihedian.png` (Taihedian aukiolta) sekä portin 06 havainteesta (edellinen tilaus):
  - keltaiset tiilikatot;
  - turkoosi-sininen palkkivyö;
  - punaiset pylväät ja seinät;
  - valkoiset marmorijalustat ja -kaiteet.
- Koristeet vain mitattujen ääriviivojen sisään. Ei vapaasti maalattua osaa. Muotomalli `muotomalli-sokkelopiirros-20261020.png`; tekstit suomeksi.

## Mitä piirretään lähteen mukaan, ei pelin mukaan (TÄRKEÄ)
**Taihemen:**
- Etelän ja pohjoisen portaat piirretään **OSM:n paikkoihin** ([3]: x −10,2..−6,8, −5,0..1,6 ja 4,0..7,5). Pelin sivuportaat (oranssi katkoviiva, x ±17) jätetään pois.
- Jalustaan piirretään sivuille myös portaat, 1 + 1 ([2] 左右石阶各一個). Paikka on avoin: merkitse katkoviivalla "paikka avoin".
- Halli on pelin seinälinjassa (A, 46,2 × 20,0; 9 jännettä). Lähteen rakennusala on 1300 m² [1], joten hallin koko on auki. Piirrä A:n mukaan
  ja kirjoita listaan, jos havainne tai lähteet viittaavat isompaan halliin.
- Pronssileijonat piirretään pelin paikkoihin. 4 pronssikattilaa 铜鼎 [1] merkitään katkoviivalla "paikka avoin".

**Taihedian:**
- Halli piirretään **lähteen mitoin**: 63,96 × 37,0 m [2], 11 × 5 jännettä. Pelin halli (60,9 × 34,1, oranssi katkoviiva) jätetään pois.
- Korkeudet: terassi 8,13 [1], halli 26,92 [1], 通高 35,05 [1] = pääharja, 螭吻 3,40 m [2].
- Terassin ylätason etuosa tulee OSM:stä [3]. Alemmat tasot ovat arvioita (A).

## Toimitus
`posti/codex-pelikoodari-mittapiirrokset-taihemen-taihedian-<pvm>/`: SVG + PNG jokaisesta, SHA256SUMS ja lyhyt lista mittahuomioista.
Vastaanottaja on PK. PK ajaa päällekkäisvertailun mittapohjaan ja peliin ja vie piirrokset PT:lle.

Seuraavaksi tulevat sivuhallit 中右门/中左门 (mittapohja erikseen).
