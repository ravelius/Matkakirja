# Karttaseppä: luovutus 30.10.2026 klo 21.55

Edellinen luovutus: b4c2c5036 (viesti-karttaseppa-luovutus-20261029-2210.md). PT pyysi nollausta ennen puolen päivän erää
(konteksti 26 %). Omistajan päätökset 21.42/21.45/21.50 on kirjattu PT:n lokiin (PR 5669).

**Taustalla on kaksi tämän session käynnistämää käännöstä käännöspalvelussa** (`/Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh`,
lukko `/tmp/matkakirja-kaannospalvelu.lukko`). Niitä ei tarvitse pysäyttää; ne asentavat simuun DA0AAEEA-B29A-46EE-BD82-DA314CF21BF8:
- `_tyo/karttaseppa/piirrokset-216/kaannos.out` = haara silloin 795803d74 (vain kohdat 1–2) → app-kopio `piirrokset-216-app/`. VANHENTUNUT.
- `_tyo/karttaseppa/piirrokset-216/kaannos-z17.out` = 7ee385523 (kohdat 1–2 + zoom 2×) → app-kopio `piirrokset-216-z17-app/`. **Tätä käytetään parissa.**
- Jos kumpikaan ei ole tulostanut `KÄÄNNETTY …` -riviä, käynnistä uudelleen (lue lukko ensin, älä tapa toisten käännöksiä):
  `cd /Users/Shared/Claude/wt/proto-karttaseppa-piirrokset-216; PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/piirrokset-216-z17-app nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh karttaseppa/piirrokset-216 DA0AAEEA-B29A-46EE-BD82-DA314CF21BF8`
- HUOM: repon `tyokalut/palvelu/proto-kaanna.sh` on vanha (Unity 6.3:n kova polku → `VIKA luo`); käytä proto-3d/tyokalut/-kopiota.

## 1. PT:n erä 21.42: Pariisin striimikartta (juna 216)

Omistajan kuvat: `docs/raportit/kaappaukset/omistaja-20261030/2142-pariisi-{kauko,lahi-1,lahi-2}.png` + `2142-pariisi-vaara-tyyli-rajaus.png`
(Matkakirja-fable-checkoutissa). Worktree `/Users/Shared/Claude/wt/proto-karttaseppa-piirrokset-216`, haara
`karttaseppa/piirrokset-216` (pohja natiiviseppa/juna-216 3f30ef0cb), EI vielä peilissä eikä NS:llä.

| Kohta | Tila | Commit |
|---|---|---|
| 1) Nähtävyyspiirrokset kartan mittakaavassa | koodattu, testit OK, pari puuttuu | 795803d74 |
| 2) Kadut vaaleammiksi ja kevyemmiksi | koodattu, testit OK, pari puuttuu | 795803d74 |
| 4) Zoom-arvio KK:lle | lähetetty 21.47 → OMISTAJAN PÄÄTÖS 21.50 "Kyllä, kaksi kertaa" | – |
| Zoom 2× (päätös 21.50) | koodattu, testit OK, pari puuttuu | 7ee385523 |
| 3) Väärän tyyliset piirrokset (Codex) | odottaa Codexia | – |

- **1) Piirrokset** (`UI/NostotKartalla.cs`, `Kartta/KaupunkiPalloMitat.PiirrosMittakaava`): näkyvä koko = PiirrosTaysiPt (59,2 pt =
  aiempi koko lähimmällä zoomilla) × MinKorkeus / korkeus, vähintään PiirrosMinPt 8 pt; korvaa 28.10. 14.23:n 1,25-suurennuksen.
  Nimiö, väistö ja napautusala seuraavat näkyvää kokoa (m.Ruutu). Pyramidi on KaupunkiPallot-karttaesine (oma lukitussääntö), EI muutettu
  – omistaja 21.45: pyramidi ei ole väärän tyylinen; jos parissa pyramidi näyttää liian isolta piirrosten rinnalla, kysy PT:ltä.
- **2) Kadut** (`Kartta/ElavaTyyli.cs`): minor (1,95/1,15) ja service (1,35/0,7) kermatäytteellä, ReunusKevytAlfa 150 → 95,
  ElavaTyyliVersio e14 (`Laattapalvelin.Elava.cs`). Tavoite: lahi-1:n vaaleat kadut, ei lahi-2:n tummia seepiaviivoja.
- **Zoom 2×**: ElavaTyyli.Viimeinen 16 → 17, ElavaLahinLeveys 1,25 → 0,625, TieKerroin(17) 1,8, Valmiiksi-esilataus (17, 0,375 km),
  testit päivitetty (Z11–Z17, palaraja 300). Piirrosten täysi koko siirtyy automaattisesti uudelle lähimmälle tasolle (MinKorkeus).
  Tarkista parissa: kadunnimien tiheys Z17:llä, katujen leveys (1,8 voi olla liikaa/liian vähän), relief (ReliefiOsuus z ≥ 16 = 0,55).
- Kartta-testit 575/575, tyokalut/tarkista.sh 0 (7ee385523).
- **SEURAAVA:**
  1. Kun käännös valmis: `zsh` todistusajo skenaariolla `_tyo/karttaseppa/piirrokset-216/sk-pari.txt` (K1 kauko, K2 keski, K3 lähin,
     K4 lähin Louvre; `komento aja lat lon kaari s`). Malli: `_tyo/karttaseppa/savytys-214/ajo.zsh` (todistusajo.sh
     `/Users/Shared/Claude/wt/proto-natiiviseppa-tyokalut/tyokalut/todistusajo/todistusajo.sh --era … --udid … --app … --sha … --haara …
     --laite iphone --nyt --skenaario …`). Ennen-kuvina omistajan 2142-kuvat.
  2. Pari PT:lle (ennen junaa), PT → KK → omistaja. OK:n jälkeen haara peiliin (`peili/proto/karttaseppa/piirrokset-216`) ja NS:lle.
- **3) Codex** (PT 21.45, tilaus 0c7afb570, `posti/fable-codex-pariisi-tuileries-metro-20261030.md`): väärän tyyliset = Tuileries +
  metron sisäänkäynti (EI pyramidi). Uusi `miniatyyrit/pariisi-tuileries.webp` (ihme-tuileries.webp jää ihmekortille) ja korvaava
  `pariisi-metron-sisaankaynti.webp`. Kun Codex palauttaa: kytke Tuileries kartalle uuteen kuvaan (viittaukset web-repossa
  `js/packs/fokuskohteet-fra.js`, `tools/vienti/mediakuvat.json`, `sw.js`; natiivi lukee kohdekartan piirroksen Kohdekartta-datasta →
  Kohdenostot.Piirros), pari PT:lle.

## 2. Meridiaaniportti 06, juna 215 (valmis, odottaa PT/KK:n kuittausta)

Kaikki `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/portti06-215/`; erolista `erolista-06.md` (lopussa uusimmat).
- Lopullinen sovitettu pari 05.22: `lokit/havainne-editori-20261030-051707/06/vierekkain.png` (REF 3aac603dc, LR v95, testikamera
  `2.5 6.2 3 51`): keisari 0,12/0,12, räystäät 0,25 vs 0,27, muurin juuri 0,47 molemmissa. Taivaan alaraja 0,25 vs 0,07 = havainteen
  siipipaviljongit, ei kamera. PT:lle lähetetty; ei vastausta ennen tätä luovutusta.
- Pintaportin 15 "vikaa" = lahipuut-v11:n Codex-osat, jotka REF:n listassa sallittuja; editorin checkoutin lista vanha → 0 todellista.
- Proto-haara `karttaseppa/portti06-215` (wt/proto-karttaseppa-maasto-214) = vain poimitut commitit (ac9163111, cb9141ddc, cf8e41976),
  ei pushattu eikä tarvita junaan. Commitoimaton `tyokalut/havainne/editori-tk.sh` (TK06-testikamera) samassa worktreessa – ei NUI:n työkaluun.
- Ajoskriptit: `aja-pari06-v95-tk.zsh` (pelikameran kulma) ja `aja-pari06-v95-sov.zsh` (sovitettu; `TK06=` env ylikirjoittaa).

## 3. Muuta
- Proto-repon junavahti (`lokit/kaannospalvelu/juna.log`) on näyttänyt `VIKA tarkista` 14.10. lähtien (Unity 6000.7.0b5 -symlinkki
  osoittaa poistettuun editoriin); ei Karttasepän alue, ei kiireellinen.
