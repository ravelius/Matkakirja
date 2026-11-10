# Natiivisepän luovutus 10.11.2026 klo 06.28

Edellinen: git show 5be668ae9:docs/raportit/viesti-natiiviseppa-luovutus-20261110-0611.md (tausta: TOP 10, VS-viestit). Syy: kontekstivahti 26 % (7.37).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py,
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …").
Työkansio /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/. Repo natiivi-backup (remote natiivi-backup, EI origin), worktree
/Users/Shared/Claude/wt/proto-natiiviseppa-ndpohjat, nyt haarassa natiiviseppa/kiertopiste-pinta. Älä poista mitään.

## ODOTTAA JU:LTA (kolme pyyntöä, kaikki PT:n hyväksymiä)
1. KIIRE – MAC-PARI kierto (omistajan havainto 06.23, tarina-224 1a6bdd8fa iPhone): esikatselu iphone, PISTEKERROIN 0.465,
   _tyo/natiiviseppa/kiertopiste/sk-kiertopiste-mac.txt, 930eaae96 (juna) | f8cb3ac61 (natiiviseppa/kiertopiste-pinta)
   → lokit/natiiviseppa-kiertopiste-mac-<sha>. Tarkista: "talot tila: palat" > 0, eletila-korkeus; k-1…k-3: tähtäimen alla sama maan
   kohta (korjaus) vs. liukuu (juna). t-0/t-1: aarteen 3D-tähdet (vika 1 valkoinen neliö, vika 2 rakennusten päällä). PARI PT:lle.
2. LD-uusinta 95c02d6bc (natiiviseppa/kartan-purku = 857fe63da + Google-tileset ei lepoon purun aikana, jos vapaa < 2,2 Gt), sama
   sk-kartan-purku-ipad.txt → lokit/kartan-purku-ipad-95c02d6bc. Odotus: rivi "Google-tileset ei lepoon (… kartan purku palautuu)",
   sulkemisen huippu ≲ 3,1 Gt, ISS P3 + paluut P2/P4 ehjät. JUNAEHTO (PT): Cesium + ISS ilman VIKAa, kuvat, paluu ehjä → pari PT:lle.
   857fe63da-ajon tulos: _tyo/natiiviseppa/iso/raportti-kartan-purku.md (loppu): P1 Google ehjä (PT katsonut), VIKA 4155 vain levosta.
3. KU nd-pohjat-ipad-3 (sk-nd-pohjat-ipad-3.txt, äpit julkaisija-laite-218-69cd72344 / -7a9c1a971) → lokit/natiiviseppa-nd-pohjat-ipad-3-<sha>.
   ipad-2:n juurisyy: "iso ampari <Macin polku>" iPadilla → tyhjä hakemisto → Nahtavyysalue.LuoMalli NRE joka kehys. Nähtävyysosa on
   nyt mediassa (JU vei 06.16). Tarkista: "notre-dame: mallien tiedostot levyllä", "koe luotu", 0 × Nahtavyysalue-poikkeus; parit Q1–Q6.

## OMISTAJAN KOLME HAVAINTOA (PT 06.2x KIIRE) – raportoitu PT:lle 06.4x
Mikään ei johdu lähiorigosta (tärinäkoe); kaikki myös junassa 930eaae96.
- 3) KORJATTU f8cb3ac61: kiertopiste/tähtäin olivat ellipsoidilla h = 0 → PalloKierto.KiertoKorkeus (MaanPinta.Hae × (1 − piirros)).
- 2) 3D-tähti on UI-elementti (NostotKartalla.AsetaTahti3D, merkin maapisteen yllä −34 px) → ei peity, liukuu perspektiivin mukana.
  PT 06.4x: TÄHTI (2 ja 1) = NUI; havainnot lähetetty NUI:lle 06.5x. NS ei koske tähteen.
- PT 06.4x: omistajan ehto täyttyi (tähdet eivät johdu lähiorigosta) → tarina-224 (1a6bdd8fa) junaan JU:lle (PT kuittasi).
  f8cb3ac61:n Mac-pari → SEURAAVALLE PT:lle (PT nollautui 06.4x).
- 1) Valkoinen neliö: arvio = kadonneen kyltin ★-laatta, kunnes 72 tähtiruutua (PiirrosKerros.Tahdet, 256² RGBA, alfa ok) latautuvat;
  myös hehku asetetaan vain luonnissa (AsetaTahti3D: jos hehku ei vielä ladattu, jää ilman). Varmista Mac-parin t-0:sta. Korjaus:
  ruudut esiladataan Pariisiin tullessa + hehku asetetaan myöhemmin.

## EDELLISESTÄ (ennallaan)
TOP 10 jatko (Museo 50,7, KavelyKerrokset 16,9, IssPaneeli 15,7 + Raketti 14,2; iso-kuvat-astc.py) ja VS-viestit (tulivuoret palvelimella;
Revontulet.PaivitaNakyvyys:207 MissingReference): ks. 0510-luovutus.
