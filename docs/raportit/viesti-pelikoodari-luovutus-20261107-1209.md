# Pelikoodari: luovutus 07.11.2026 klo 12.09

Korvaa kaikki aiemmat. Nollaus kontekstin rajasta (32 %). Vanhat työkalut: `git show 13d0ce6c9:docs/raportit/viesti-pelikoodari-luovutus-20261107-0956.md` kohdat 2, 4, 5. Lontoon poistotyökalut: `git show ee5465047:docs/raportit/viesti-pelikoodari-luovutus-20261107-0326.md` kohta 5. Lontoon tila ja kertoimet: `git show e5c51a2bf:docs/raportit/viesti-pelikoodari-luovutus-20261107-1121.md` kohta 2.

## 1. Avoinna, tee järjestyksessä
**A. Lontoon kyltit, ajo i7, sha `f9106079e`** (`pelikoodari/lontoo-isot`, proto `/Users/Shared/Claude/wt/proto-pelikoodari-lod-diag`, työnnetty). Skenaario `_tyo/pelikoodari/lontoo/sk-i7.txt`, 9 kuvaa, lokit `lokit/pelikoodari-lontoo-i7-f9106079e`. Pyydetty JU:lta 12.0x, ei vielä kuitattu.
OMISTAJAN PÄÄTÖS 11.42 (PT): isot nähtävyydet sisäiseen koeversioon, kun kyltit on korjattu, ei ulkoiseen julkaisuun. Muisti mitataan yhteisajossa, ei omaa iPad-ajoa. Junavuoro PT:ltä kuvan jälkeen.
KK ja PT haluavat kaikki kuusi samaan kuvaan (kuva korjatusta KK:lle `local_37f7c945-…`, sha + rivi PT:lle). 832e5d24e korjasi vain kohdan 4 (KK):
1. Newgaten vankila St Paul'sin päällä: katso `i7-sp`. i6:ssa yhä päällä.
2. Vanha Westminsterin palatsi palatsin päällä: `i7-west-joelta`. i6:ssa yhä päällä.
3. Exchange Alley St Paul'sin julkisivulla matalalta: `i7-sp-matala`. i6:ssa yhä päällä.
4. Lontoon kaupungintalon nimi Tower Bridgen yli: `i7-tb-matala`, `i7-tb`.
5. Pallon hintakyltti palatsin edessä: i6:ssa poissa `west-joelta`-kuvasta.
6. "Lontoo"-nimen siirtymä: korjaa, tai kerro syy ja kuva. Oma arvio: sääntö KK 5.11. 19.59 / omistaja 20.08, nimi ei jää 3D-kohteen alle. `nimet etsi Lontoo` (unity.log) i6: paikat 0, 1, 3, 4 syy "nähtävyys", paikka 2 "kallistus" tai "ruudun reuna". Näkyvä paikka todennäköisesti 9 (ei luettu suoraan lokista). Vertaa myös `i7-kaukaa-45` ja `i7-kaukaa-45-2` (eri kulku samaan kohtaan). KK kertoo tästä omistajalle kuvan kanssa.
**Kerro KK:lle sivuvaikutus:** sama sääntö kuin Pariisissa (`mallinKohdalla`, `KaupunkiPallot.cs:729`, rajauslaatikko): pallo ja kyltti häipyvät yhdessä mallin kohdalla, ja i6:n `kaukaa-45`-yleiskuvasta pallo puuttuu kokonaan. Kuumailmapallo ei siis näy tuosta näkymästä. Älä piilota KK:lta. Vaihtoehto, jos KK ei hyväksy: pallon maapiste pois palatsin luota (ei vielä selvitetty, mistä datasta paikka tulee).
Korjaus: `Nahtavyysalue.KeraaNimiEsteet` kirjaa ohjelmakohteen myös `ruudut/muodot/ytimet/ydinAlueet`-listoihin. i6:ssa (`4bdd94673`) `ydinAlueet.Add(null)`: `OsuuMallinYtimeen` vertaa `!= ohitaAlue`, oletus null, joten rivit ohitettiin. Tower Bridgen kupera kuori väistättää myös joen päältä: katso `HMS Belfast` ja Lontoon Tower. Jos Tower Bridge poistaa liikaa kylttejä, jätä se pois vain kylttilistoilta.
Lokista: `grep "pois (malli)" unity.log` (i6: 0 riviä, i7:ssä pitää olla).
Kuva: yksi kooste kuudesta rajauksesta tai näkymästä, 8 rivin PIL `/opt/homebrew/opt/python@3.14/bin/python3`, ei selitekaistaa. Pienennä lukeminen (`thumbnail 1400`), mutta katso saumat täysikoossa ennen "ei näy" -arviota.

**B. "Keisari on hieman maan alla" (omistaja 12.02, PT 12.0x).** LAV: kuja-alussa Puyi y -0,2…-0,3, kartta -0,25, lattia 0,0, noin 5 000 m²; epäily `kulkukartta.py` rivi 154 floor, ei ajettu, julkaistua karttaa ei verrattu. Selvitä ja korjaa kartta, kuva pelaajan jaloista, Mac JU:n vuorolla. Tiedot `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/KORJAUS.md`. Ei junaan ilman vuoroa. Ei aloitettu. Huom: `JuoksuV4Maailma.cs:1060–1069` kartan lattia 0,25 m:n portain, ja jousi on nyt `JousiAskelin`.

**C. Yöportin Node.** Syy kerrottu PT:lle 11.5x: "Homebrew polkuun" panee `/opt/homebrew/bin`:n edelle, ajurin node = 26.8.1, `kerroin`-luvut eroavat viimeisessä desimaalissa (32 riviä), aanijalki.json eroaa (toistettu paikallisesti 26.8.1: `123d3238…`, 22.23.2: `57fe0ccd…`). Korjaus `natiivi-yoportti.yml:66` PATH alkamaan `/opt/homebrew/opt/node@22/bin`:llä, ei tiivisteiden päivitystä. Odottaa PT:n sanaa, kuka tekee (JU:n PR-alue). Älä tee ilman sanaa.

**D. Ruudukon kuva** (omistaja 11.11): junan seuraavasta juoksuajosta, jossa jotain rikotaan, ei omaa ajoa (PT). Esimerkkidataa ei omistajalle: `j1-ruudukko-esimerkki` näyttää vanhan kortin läpi, koska skenaario avasi sen auki olevan päälle; `ui juoksuloppu pois` ennen `maali`. Jos rikottiin eikä ruudukko aukea, vika: rivi PT:lle.

## 2. Tehty, PT:llä
- `497782741` (`pelikoodari/vartija-kopiot`), junassa 220: vartijan kopiot. Yöportti sen jälkeen punainen vain kohdan C takia.
- `15c97cc56` (`pelikoodari/juoksu-jousi-askeleet`): `Liikepohja.JousiAskelin`, junavuoro saatu testin varassa. j1:ssä juoksua ei näy (alkulento, matka 10 m), joten 60 fps:n vertailu on testin varassa.
- `2190c6870` (`pelikoodari/haivytys-testi`): testi oli vanhentunut, ei häivytysvika; junavuoro saatu. Testilukukysymys vastattu.
- `f86344e8f` junassa 220.

## 3. Vanha, ennallaan
- Juna 220: kala-allas ja kukkaruukku `067210c0f` (`pelikoodari/ulkoesine-kuplat`), huudot NUI:lta (0956 kohta 2).
- Peruttu: rikottujen rivi kortilla, `pelikoodari/kortti-rikotut` ei junaan.
- Työpuut: `proto-pelikoodari-kortti` haarassa `juoksu-jousi-askeleet`, `proto-pelikoodari-tarkastelu` haarassa `haivytys-testi`, `proto-pelikoodari-lod-diag` haarassa `lontoo-isot`. Kaikki puhtaita.
- `.claude/settings.local.json.ennen-kevennysta` ei minun, älä lisää. Työlistan hookin rivit ovat PT:n.

## 4. Opit
- Zsh: `"$R:Polku"` ajaa `:P`-muuntimen, käytä `"${R}:Polku"`.
- Älä ole varma PT:n tai omasta oletuksesta Nodesta: ajurilla `which node` ratkaisee, ja ExperimentalWarning localStorage kertoo Node ≥ 25:stä.
- Listaan lisätyn rivin avain: tarkista vertailu (`null != null`), ennen kuin pyydät ajon. Hintakyltti lähti, koska pallo lukee eri listaa, joten yksi toimiva kohta ei todista muita.
- Linssit-testit ja unity-tarkistus eivät näe Lontoon kylttejä; todistus vain ajosta.
- Linssit-testien luku riippuu haarasta, älä vertaa eri haarojen summia.
- Älä vaihda haaraa työpuussa, josta JU ajaa.
