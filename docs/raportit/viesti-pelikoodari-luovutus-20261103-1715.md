# Pelikoodari: luovutus 3.11.2026 klo 17.15 – juna 218

Edellinen: -20261103-1700 (7dfc9a3ce), voimassa ellei alla toisin. Syy: kontekstiraja 25 % (7.37), ajot JU:n jonossa.
Testit (proto salieste-218al): Peli-testit 809/809; Peli-testit/unity-tarkistus.sh 0 virhettä.
Proto-haarat paikallisia; worktree /Users/Shared/Claude/wt/proto-pelikoodari-ys-218 (nyt haarassa pelikoodari/salieste-218al).

## Tehty 17.00–17.15
- **ak:n ys valmis** (sali-218ak/20261103-170112-ys-v3.mp4): pystypako ei lauennut kertaakaan (ei "pystypako"-rivejä), kamera
  rakennusmassassa yhä 98–100, -718…-723 (ruutuja 281) → pystypako yksin ei riitä. tj/cx/ty/xf ak:ssa kesken 17.15.
- **Salieste-häivytys PT:n 17.2x linjauksen mukaan**: proto pelikoodari/salieste-218al e9d4526b8 (pysty-218ak:n päällä).
  - Peli/Juoksupeli/SaliEsteet.cs (puhdas, testattu): ulkoseinien rajaus (kärjet > lattia + 1,5 m), sisäosa = kolmion keskipiste
    > 0,7 m seinästä eikä lattiassa; 2 m:n ruudut; ruudun geometria 0,25 m:n soluihin (korkeusväli). Linjalla: näkölinja kamera→rinta
    0,1 m:n välein, viimeiset 0,4 m pois; jo häivytetty ruutu osuu myös naapurisoluista (ei vilkuntaa).
  - Scripts/Juoksupeli/JuoksuSokkeloMaailma.SaliEsteet.cs: sisätilasalit rakennukset.json:sta (reitit + lattia_y 0,1–2 m, ei lapikulku
    → 12 salia c, y, ys, th, tj, ty, cc, xf, c3, z3, y3, j3); LOD0:n "runko"-solmu pilkotaan "salieste i j" -solmuiksi ennen
    rakennaSolmut-kutsua (Palatsi.cs malli-haara); oma KattoHaivytys saliEsteet (OmaReuna −∞ → vain Linjalla), Sovella samalla,
    piilotettu ruutu heittää varjon (varjoJaa). Loki "salin esteet" (lataus) ja "salieste häivytetty" (ajo, 1/s).
  - SaliEsteMassa(p): salin sisäosien alueella massaa on vain näkyvä este → KameraSuojaan, KameraMassassa (mittari, Peitto ≥ 0,5),
    polkutukos (Tukossa ohittaa alueen) ja PelaajaPiilossa (ohita-funktio) käyttävät soluja peittokartan sijaan.
  - QA `ui juoksupeli drone salieste 0|1` (DroneNosto.SaliEsteHaivytys). Testi DroneNostoTestit.SaliEsteetSerminHaivytys.
- JU:lle 17.1x (jonossa): `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218al/ketju-al.zsh ys tj` (huom-grepissä myös
  salieste/salin esteet/pystypako).

## SEURAAVA
1. al-tulokset (sali-218al/): grep unity.log "salin esteet" (ruutuja ys/tj > 0? jos 0 → rajaus ei kelvannut tai runko-solmua ei
   löytynyt), "salieste häivytetty"; huom: "kamera rakennusmassassa" ja "PELAAJA PIILOSSA" pitäisi pudota ys 10–12,5 s ja tj 4/8/10 s.
   Itse tarkistus videosta 4/8/10–12,5 s (fps=1,scale=300:-1,tile=6x4). Jos kunnossa: salipaketti (video + koonti) yhdellä rivillä PT:lle.
   Riskit: ulkoseinän vierus (0,7 m) jää peittokartalle; jos pylväsrivi on seinän vieressä, SeinaVara pienemmäksi. Piirtokutsuja
   lisää (ruutu × materiaali) – kerro PT:lle "salin esteet … piirtäjää" -luku.
2. aj-tulokset (sali-218aj/): ei vielä tuloksia 17.15 (taso1b + mp). Kohta 1 edellisestä luovutuksesta ennallaan (taso1b-paketti KK:lle
   vasta kun kohta 2 todistettu + kiveys korjattu).
3. ak:n tj/cx/ty/xf jos valmistuvat: vain vertailuksi (salieste korvaa).
4. Edellisen luovutuksen kohdat 4–7 ennallaan (Codex-toimitukset, Editor-työkalut kivi-216:een, taso1b musiikkirivit, checkout).
5. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/pelikoodari-20261103-1715.
