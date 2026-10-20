# Natiivisepän luovutus 20.10.2026 klo 12.0x (BUILD 207 TF:ssä; juna 208 auki, palatsi sisällä)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jonot (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna208/jono-208.txt ja juna207/jono-207.txt. Id:t AINA osoitekirjasta (PT local_8d8ebf72-…, JU local_24e63224-…, LT local_36a45147-…, NUI local_c6d63773-…, VS local_e675f86d-…, PK local_11aca9cd-…).

## TILA
- **BUILD 207 = proto master 7ffa2ed9a261304de5f41ad68f9c8cbebb152825** (juna/b35 = runko f3e77a5fc, lukituskäännös 810bfc4d9 L1 08.21–08.26).
  Muutosloki #5024 = main 62693d53f (tiivistetty 280 merkkiin). Muistiajo OK (vapaa min 1892 Mt) → julkaisija-tyokalut/muistiajo-207.txt.
  TF iOS 39376168926 + Mac 39375751988 completed success; JU hoitaa sisäinen → vienti → ulkoinen → 206 vanhennus. **207:stä ei ole enää NS:n töitä.**
- **JUNA 208 auki**: runko natiiviseppa/juna-208 (wt/proto-natiiviseppa-ehdokas, HEAD tällä haaralla) = **df83610ab**
  = BUILD 207 + PK ovet 4c31cdfdf + VS juoksu-208 d3ec8c808 + NUI 02cd8a51b + LS kehykset v2 8662afc61 + NUI kertoja-napit 472d8f4ca (⊃ museo 44096a792)
  + PK palatsi 83ba2501e (⊃ 9c59233cf v12-lattia, 6b34f90be, VS pinnat 1dfc80671, NUI juoksunimet e6238c958, VS vesi k6 9a82a1fa0, **lämmitys f6e92d277**).
  Peili natiivi-backup peili/proto/natiiviseppa/juna-208.

## IRROTETUT AJOT (kestävät nollauksen)
- testit208 df83610ab VIHREÄ: Linssit 2165, Peli 676 (PK:n haarassa 677 – ei virhe), Kartta 517, tarkista 0 → PT:lle ilmoitettu.
1. **laite208.sh df83610ab runko-df83610ab** → lokit/natiiviseppa-laite-runko208-df83610ab.log; odottaa L1-lukkoa (esikatselu 6856156b1).
   Kun "REL-APP …" → **polku + rungon sha LT:lle** (PT 11.5x: LT mittaa lämmityksen f6e92d277 ennen lukitusta; hylkäyksessä PK tekee pois-kytkimen), kopio PT.
   Tarkista käännöslokista: Shader error 0 (grep laite.log b5-kopiossa), "MATKAKIRJA syväterävyys" -rivi.

## SÄÄNNÖT, JOTKA MUUTTUIVAT TÄNÄÄN
- **OMISTAJA 09.47**: "Julkaisi juna vasta kun minä sanon." → 208 lukitaan VAIN PT:n viestillä "OMISTAJA PYYSI JULKAISUA". build208-viesti.txt:ssä TÄYTÄ LUKITSE estää -b:n.
  muutosloki-208.txt puuttuu → -b estää (PT:n teksti; JSON-työkalun raja 3 lausetta / 280 merkkiä → tiivistä ja kerro PT:lle).
- **OMISTAJA 11.45**: simu vain uudelle tekniikalle, omistajan pyytämiin kuviin ja yöjunan laitekierrokseen/muistiajoon. Muut erät suoraan junaan automaattitarkistusten jälkeen, PT:n OK-rivillä.
- Erät vain PT:n omalla OK-rivillä (ei toisen roolin välittämää "PT OK"); tarkista aina, tuoko haara pidossa olevia commiteja (merge-base --is-ancestor).

## OPITUT 20.10. päivä
- zsh: `$R:refs/...` ja `$H:refs/...` tulkitaan :r-modifierina → käytä `${R}:refs/...`.
- Käännöspalvelun commitit ("Käännöspalvelu: <sha>") ovat master + erä -yhdistelmiä; ota erän oma kärki, ei niitä (puu sama).
- Laitekäännöksen "SSAO pois juoksupelin ajaksi" on ajonaikainen Debug.Log → LT:n konsolista, ei käännöslokista.
- Orpo `simctl io recordVideo` voi jäädä tuntikausiksi → testiportti katsoo vain kirjoittavat nauhoitukset (testit20x-odota.sh).
- Älä yhdistä runkoon testiajon aikana: pysäytä oma ajo (myös orpo dotnet LinssiTestit.dll, cwd ehdokas-worktree) ja aja uudelleen.
- Skriptit juna208/: testit208(-odota), laite208, yhdista.sh (yhdistelmä ilman checkoutia), lukitse208-a/-b/-ajo, mac208, muisti208 (pohja 7ffa2ed9a, b36).
