# PT:n luovutus 31.10.2026 klo 03.15

Edellinen: viesti-fable-luovutus-20261030-2300.md. Viestit aina id:llä (mcp__ccd_session_mgmt__send_message). Osoitteet: /Users/Shared/Claude/osoitekirja.md.

## Tehty (23.05–03.15)
- Juna 216 runko nyt **1c81bed57** (NS, testit vihreät): lahipuut-v12 (249 kujan puuta pois, 9 epävarmaa jätetty PT:n päätöksellä),
  VS varjokorjaus 02953bc6e (iPadilla muurien varjot näkyvät; vertailu 0 = UUSI valo, vertailu 1 = vanha oletus ilman varjoja),
  lähikaskadi 15 m 5c4427345 (hahmon varjo; 2048-kartta hylätty: kuja +10 ms GPU), KS Louvren pyramidi oikeaan paikkaan/kokoon
  aff20e3fb + nimiö "Metroasema" 254cf53d4 (ei "Métropolitain": karttanimet vain suomeksi), PK be1597494 (turha 1063-portaat-haku pois),
  PALATSIN MUISTIKORJAUS: PK kuvajako 06ef29f9b + VS valopakkaus b7b91e20c/be9b9b96a (ETC2, 1/4) + KS kartan kuvat pois juoksussa 9287cb95e
  + PK LOD2-purku a045ae1d9 → iPad-huippu 5,1 → 3,56 Gt (katto 5,12, 0 jetsamia, GPU 10–14 ms).
- PK:n LÖYDÖS: TF 214/215 viittaavat kk-pohja-v1d-pk7:ään, jota ei ollut mediassa → laitteilla sokkelo-varapolku 29.10. alkaen.
  JU vei pk7:n 01.03 → palatsi kaatui iPadilla (jetsam 3/3) → PT perui viennin 01.4x (pohja.json 404; paketti _valmiit e8a5b2327aa7).
  Muistiajot QA-polusta kk-pohja-v1d-pk7-qa (JU 01.32; TF:t eivät viittaa siihen). **pk7 palautetaan vasta TF 216:n yhteydessä**
  (vie-paketti.sh _valmiit/juoksupeli-kk-pohja-v1d-pk7-vienti-20261030). KK:lle tiedoksi omistajan aamuun (ei korttia).
- Levyhätä 01.13 (81 Gi, LAV:n leivonta pysähtyi): worktree-siivous (PT poisti 3 fable-*), levy nyt ~103 Gi. Tilapäinen 78 Gi:n raja peruttu, LAV 82.
- JU:n valoseppa-vahti.zsh käänsi automaattisesti linssiseppa2-haaroja: VS asetti taukolipun /tmp/matkakirja-valovahti-tauko (pysyy).
- KS 60 fps: A+B+C eivät tuoneet mitattavaa hyötyä → EIVÄT junaan (koehaara). Syy: Cesiumin laattojen valmistuminen pääsäikeessä.
  Koe D (laattavastaukset ≤ 3/ruutu liikkeessä) koehaarassa karttaseppa/fps-d-216, äppi lokit/natiiviseppa-app-216-ks-fps-d valmis;
  KS mittaa LT:n jälkeen + kuvasarja vedosta (tyhjät laatat = hinta, PT katsoo ennen junaa).
- Web PR 5690 (Metroasema) AUKI: merge = julkaisu → vasta junan 216 julkaisun yhteydessä.

## Kesken (jono)
1. LT: uuden valon kokonaiskulu palatsissa VALMIS (V0 uusi vs V1 oletus): +1,3–1,8 ms GPU, +0,3–0,5 Gt muistia, yli 20 ms ≤ 0,8 %.
   LT ottaa vielä pelikamerakuvat (aukio + kuja, ABAB-*). Tämä on pohja kortille "valo oletukseksi?".
2. LAV-leivonta: rakennukset 106–136 → tausta v82 → osasarja-v6 (katkos 01.13–01.3x, ~05.30 arvio voi siirtyä). Sitten VS leivottu pari
   (QA "leivonta 0|1" toimii nyt be9b9b96a:sta) ja PK kerroin 3 -koe b0cf29e42 PT:n luvalla.
3. NS: kuja 02 -ulkoasupari KL:stä LT:ltä (aukio 0,00 %).
4. Valoerän lopuksi kortti KK:n kautta: valo oletuksena päälle? (luvut kohdasta 1). Sitten TF 216 omistajan pyynnöstä:
   pk7 palautus + web PR 5690 + sisältövienti samaan aikaan.
5. Unity: yksi kerrallaan + yksi Blender, levy ≥ 82 Gi. Tilinvaihto su 1.11. ~10–12.

## Säännöt, jotka opin
- Mediaan vietävä uusi polku voi muuttaa julkaistua TF:ää heti: PK vahvistaa ennen vientiä, ettei julkaistu versio hae sitä.
- Varmista valon vertailukytkimen numerointi ennen hälytystä (vertailu 1 = vanha valo ilman varjoja).
- Laitemittaukset: tarkista konsolista 404/sokkelo ennen kuin luvut tulkitaan.
