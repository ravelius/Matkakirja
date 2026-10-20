# Pelikoodarin luovutus 20.10.2026 klo 08.00 (Postivahdin KOVA RAJA 36 %)

Edellinen: viesti-pelikoodari-luovutus-20261020-0703.md (sen kaikki kohdat tehty). Rooli: Pelikoodari (Opus, high).
Proto-repo paikallinen (ei pushia), worktree /Users/Shared/Claude/wt/proto-pelikoodari-kerattavat-206, haarassa
**pelikoodari/palatsi-208 = 0437ac75b** (puhdas).

## KÄYNNISSÄ NOLLAUSHETKELLÄ
- Ei mitään. Simu palatsi-208 valmis 08.06 (iPhone + iPad OK, lokit/todistus-juoksu-palatsi-208-{iphone-20261020-0756,ipad-20261020-0758}),
  SIMU VAPAA lähetetty JU:lle, P1–P4 + havainto lähetetty KK:lle (kopio PT) – kohdat 1–2 TEHTY. Odota KK:n palautetta palatsi v1:stä.

## ENSIN
1. **Palatsi v2** (PT 07.5x: heti v1-droonien jälkeen): suunnitelma _tyo/pelikoodari/palatsi-208/V2-SUUNNITELMA.md (epätasainen ruudukko
   KS:n kujista + kujatila-keskilinjoista, päärakennusten etupihat KK 07.4x, Lavastajan v3 G-terassi + hallit ja v2 portit, KS:n
   nimet.json, Lavastajan Peking v11 -taustalaatat paketin tultua, VS:n marmori V4_marmori → laji 16; 60 fps iPad LT:llä).

## JUNA 208 (KK OK:t saatu)
- **f6e92d277** (haara pelikoodari/ovet-etelaan-208) = fe6db12fb (halli + clip-variantit, KK OK H1) + 4c31cdfdf (ovet etelään, omistaja 07.12,
  KK OK 07.5x) + varianttien lämmitys (PT 07.4x, LT:n 350 ms; simu: "sokkelon variantit lämmitetty" ennen 1. korttelia). PT antaa NS:lle.
- Palatsi (omistaja 07.34: identtinen palatsi junaan 208, 208 lukitaan vasta kun valmis): haara pelikoodari/palatsi-208 ⊃ f6e92d277.

## TEHTY TÄLLÄ VUOROLLA (testit 667/667, unity-tarkistus 0)
- H1-kuvateksti korjattu ("katto poissa ovella") halli-208-todisteisiin ja sk-halli-208.txt:hen (KK).
- 4c31cdfdf ovet etelään: JuoksuSokkelo.EtelaKierto (pääovi S/W/E/N → pelin etelä), hallit kierto 0, QA `ovet 0|1`; pohjapiirros
  _tyo/pelikoodari/pohjapiirros/pohjapiirros-777-ovet-etelaan.png (128/128). Droonipari lokit/todistus-juoksu-ovet-208-*-20261020-073x.
- f6e92d277 JuoksuSokkeloMaailma.Lammita: 6 ruutua kaikki mallit 0,001 m kameran eteen, katot myös HAIVYTYS-kopiona, SEINA 0–2 päällä/3–5 pois.
- Palatsi v1: 369f50204 JuoksuPalatsi (pohja.json → 16 m ruudukko: Ulko/Vesi/Aukio/Piha/Rakennus, kujat, umpikujien karsinta), JuoksuSokkelo.Palatsi,
  LuoSokkelo-lähtö kohteesta (QA `palatsi 0|1|alku A|G|1|2|url U`), aukiot ilman muureja; d4b7942c0 kierto A→B (−2,2°), portit kuljettavia,
  351 sisämuuria, autoportit; 31ea5494d Palatsi.Maailmaan(x, z, y) (VS käyttää vesissä) + Vesi/Ulko tyhjiksi; 0437ac75b KS:n 29 porttiaukkoa
  (autoportit 35, saavutettavissa 1935/1943), ämpäripolku kk-pohja-v1c (JU ladannut 07.55, sha 0f5f644f…).
- Sovittu KS:n kanssa: jokainen pohja.json-muutos = uusi ämpäripolku (v1d, …) + rivi PK:lle ja JU:lle; peli kiertää pohjan itse.

## AVOIMET
- Asuinpihojen 3–5 m kujat eivät osu 16 m ruudukkoon → v2.
- Kortteleita ei juosta läpi palatsissa (rakennuskorttelien portteihin ei avointa kujaa) → v2:n etupihat.
- Ulko-solut (muurien ulkopuoli) ilman ulkomuuria; Lavastaja/VS.
- Simuskriptit: _tyo/pelikoodari/simu-sokkelo-206/aja-{ovet,palatsi}-208.zsh + sk-*.txt; viejä (ei committia):
  _tyo/pelikoodari/palatsi-208/TilapainenPalatsiVienti.cs.txt (PALATSI_SISAAN/PALATSI_ULOS) + pohjapiirros-palatsi.py.
- Ennallaan: hurraa-isommat odottaa omistajaa, iPadin loppukortti = PT:n UI-pohjakysymys.
