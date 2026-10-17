# Valoseppä – luovutus 17.10.2026 iltapäivä (15.3x, KOVA RAJA 39 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261017-paiva.md (9f5e10421).
Viestit `send_message` TÄYDELLÄ id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, LR local_996d60ab-b4af-4172-ad31-f8e948f141a3, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Päiväkirja: $D/JONO.md (kaikki rivit 11.00–15.3x). proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto.
SIMUT VAIN JU:n "SIMU NYT" -viestillä, ei ketjutusta. Heti vuoron jälkeen "SIMU VAPAA" JU:lle. JU:n tarkistus ei aiemmin nähnyt asennusvaihetta
(12.52 keskeytys) – korjattu JU:lla.

## 0. ENSIMMÄISENÄ: k74 (Louvren patsas + altaiden peili) → PT
1) L2-käännös `zsh $D/louvre1/k74-kaanna.zsh` lähti taustalle 15.2x (haara linssiseppa2/louvre-peili, appi $D/t207-louvre-peili); seuraa
   $D/louvre1/k74-kaanna.out ja JONO.md:n riviä "K74-appi käännös: KÄÄNNETTY/VIKA". Jos edeltäjän taustatehtävä katkesi nollauksessa
   eikä KÄÄNNETTY-riviä tule, aja käännös uudelleen samalla skriptillä (VIKA valovahti/unity → korjaa wt/proto-linssiseppa2-louvrepeili).
2) Kun käännetty: rivi JU:lle "KÄÄNNÖS VALMIS <sha> k74". JU:n jono: KS → PK → NUI f → LS → VS (k74, iPad ~7 min). SIMU NYT →
   `zsh $D/louvre1/kuvaa-k74.zsh` → SIMU VAPAA. Pari: $D/louvre1/lahi-L1-L3/k74/arkki.jpg (nykyinen k72 | uusi); patsas näkyy L3-kulmassa,
   altaat pyr-kulmassa. Mittaa altaat `python3 -I $D/louvre1/allas.py` ja katso, näkyykö pyramidi altaissa.
   - Peili ei näy → tarkista lokista (lokit/valoseppa-louvre-k74/pariisi/stdout.log) ehdokkaat: OmaVesiPeili.Merkitse vaatii karheus ≤ 0,05
     (vesi 0,03) ja maailman paksuus ≤ 0,3 m; peilikamera Camera.main:sta. A/B: asetus `vesipeili 0|1` (variantti tiedostoon kuten var-k70.txt).
   - Patsas: k73-paketti (louvre1/k73-paketti.py) = k72 + patsaan 927 kolmiota lyijystä omaksi "pronssi" (0,24/0,28/0,22, metalli 0,35,
     karheus 0,45), peitto 0,55 + 0,45 × AO; vain lod0 (lod1/2 atlas). k74 = symlinkki k73:een.
3) PT:lle 3 riviä + polku. Jos ok: k73-paketti LR:lle (md5) ja e05d5808c NS:lle junaan (PT päättää).

## 1. SITTEN: valas k9 (PT 15.3x)
k8 parempi kuin k6, mutta p-1s/p-2s yhä viirujen + hiutaleiden pilvi, josta valaan muoto ei erotu → k9: patsaan ääriviiva luettavaksi
(selkä, pyrstö, pää sävymuutoksena), viirut tiheämmäksi pinnaksi, vähemmän irtohiutaleita → vertailu k8 | k9 PT:lle.
Koodi: wt/proto-linssiseppa2-valas (linssiseppa2/valas-197, k8 = 5065d4acd + valovahti 67803cb08), RakettiValasVat.shader (pisarat _Tyyppi 1,
pinta/kruunu _Tyyppi 0). Uudet värivakiot tarvitsevat `// valopoikkeus: …` -kommentin (valovahti kaatoi k8:n ensimmäisen käännöksen).
Skripti: kopioi $D/valas-havainne/k8/valas-k8.zsh → k9 (sed k8→k9, t205→t208), `--vain-kaannos`, sitten SIMU NYT → `--vain-kuvat`.
Vertailuarkki: python-pätkä kuten k8/vertailu-k6-k8.jpg (p-isku05, p-1s, p-2s, v-1s; valkoista > 230 %).

## 2. TEHTY TÄLLÄ VUOROLLA (17.10. 11.00–15.3x)
- **Aamukaista VALMIS**: V4 katsoi Volgalle (ei vertailukelpoinen), V5 (`kohde pariisi valoisa` KS:n tapaan) ✓ ennen oranssi / jälkeen ei
  (aamukaista/arkki5.jpg) → 0cd7ae1a7 junassa 200 (NS 12.06, runko 52a6f3c04).
- **Louvren altaat RATKAISTU, omistaja 15.18 "Kyllä, junaan" k72**: k69:n punainen hehku oli virheellinen koe (OmaMalli kertoo emissiveFactorin
  emissiveTexturella, oletus musta); k70 kaupunkivesi 0 = ei vaikutusta; k71 vihreä maa → altaat = LR:n vesimesh maan rei'istä. k72 = vesi
  0,085/0,105/0,12 → 0,21/0,26/0,30: altaat 40,50,70 → 71,88,112, muu nollaero. LR: tuotantopaketti v6k23. Natiivi pyramidi-lasi 169c804aa
  puuttui junasta → NS yhdisti (runko b4242fbd2, Linssit 1998/1998). LR luuli ensin "ei natiivia" – korjattu. Leikkaus 253 vs 722 p.: LR päättää.
- **S2-huntu (NUI:n yhteis-pariisi iPhone K1c3)**: kuvan pinnasta takaisin S2:een kerros lisättiin uudelleen alfa 1 → lataamattomat laatat
  sinisenä kalvona. Korjaus 2ce907268 (proto linssiseppa2/s2-huntu-200): S2 alfa 0 kunnes ≥ 90 % omia laattoja (≤ 8 s), sitten häivytys.
  NUI ottaa sen yhteis-pariisi-200f:ään ja tekee K1c3-vertailun PT:lle (oma koe peruttu).
- **Valas k7** 9e42c7b11 (vaaka-roiske: kelaus taaksepäin nollaa roiskeliput) ja **k8** 5065d4acd/67803cb08 (kruunu läpikuultava meren sävyyn,
  viirut harvemmat ja ohuemmat): ydin 3,3 → 0,8–1,1 %. PT: k9 (yllä).
- **Levy** (PT): t202/t203/t204 ja louvre1:n välituotteet T7:lle (/Volumes/T7 4TB/Matkakirja-valoseppa/arkisto-20261017-iltapaiva), ~3,4 G.

## 3. JONO
1) k74 (kohta 0). 2) Valas k9. 3) V4 pala 4 (HDR) PT:n päätöksellä. 4) Valas: sävyt Valopohjaan ennen junaa (valopoikkeus-rivit).
5) Savun jatkot + LR:n raketin valaisinpäät.
Omat appit _tyo:ssa: t200-k65 (Louvre-parien vanha appi; pois kun k74 hyväksytty), t205-valas-k8, t207-louvre-peili (tulossa).
Omat proto-worktreet: wt/proto-linssiseppa2-{valas, s2huntu, s2huntu-koe (= louvre-k72-200), louvrepeili, aamukaista, …}.
