# Linssisepän luovutus 10.10.2026 klo 21.xx (nollaus PT:n käskystä, konteksti 50 %)

Proto-haarat ovat paikallisia (sama git /Users/Shared/Claude/proto-3d/Matkakirja-proto, ei pushia). Simu-, käännös- ja
laitevuorot vain Julkaisijalta. Käännös: `PROTO_APP_KOPIO=<lokit/linssiseppa-app/<nimi>> proto-kaanna.sh <haara>`.
Todistusajot nyt Natiivisepän versiolla (odottaa komentotiedoston kuittauksen, 80d418513, juna 180):
`/Users/Shared/Claude/wt/proto-natiiviseppa-tyokalut/tyokalut/todistusajo/todistusajo.sh` (--doc, aani-alku/-loppu mukana).
Ajoskriptit ja skenaariot: `proto-3d/tyokalut/linssiseppa-ajot/` (simuvuoro-*.zsh, sk-*.txt).

## Worktreet (omat)
- `wt/proto-linssiseppa-taidemuseo` — linssiseppa/museo-varjot-180 (9106d012f)
- `wt/proto-linssiseppa-kaupunkiaanet` — linssiseppa/pariisi-kippi-180 (KESKEN, ks. alla)
- `wt/proto-linssiseppa-intro` — nyt linssiseppa/saumaton-pakattu-180 (ec837bba5); intro-luenta-180 87f1dd8a0 samassa gitissä
- `wt/proto-linssiseppa-puut` — linssiseppa/kaupunkipuut-181 (Opus-agentti aloitti 20.5x; tila ks. alla)

## Kuitattu tänään illalla (juna 180)
- **museo-varjot-180 9106d012f**: LR:n NL-sali v2f (sali-v2, Julkaisija vei ämpäriin), veistokset 34, huoneet.json graf-kabinetti,
  lattiaheijastus (peilikamera, Fresnel-pohja 0,25, mip karheus²·2; QA `museo heijastus 0|1|voima <x>|tila`). PT kuittasi
  EHDOLLA: iPad Pro 13 -muistimittaus Natiivisepän muistiportissa ennen vientiä (swap 19 Gt → yön uudelleenkäynnistyksen jälkeen).
  SHA lähetetty Natiivisepälle "muistiajo ennen vientiä". Kuvapari: lokit/todistus-museo-heijastus-180-20261010-1915/kuvapari-heijastus.jpg.
- **intro-luenta-180 87f1dd8a0** (PT välitti Natiivisepälle): (a) KIIRE: nykyintro ei pidä luentatilaa C1–C5:n ajan
  (Luentakuvasarja.IntroOhita; 179:ssä nappula ja kohteet katosivat), (b) omistaja 20.0x "Uusi korvaa vanhan": Pariisissa vain
  uusi esittely, isoisän luenta pois (PeliOhjain.SaapumisluentoPois), esittely suoraan saapumisesta (Saapumisesitys.AloitaUusiEsittely),
  kehittäjätilassa joka saapumisella, pelaajilla kerran. QA `ui saapumisintro 0|1`. Videot äänen kanssa:
  lokit/todistus-esittely-pariisi-180-klikkaus-20261010-2015/esittely-{1,2}-aani.mp4, -saapuminen-20261010-2012/saapuminen-aani.mp4.
- **Louvre**: Pelikoodarin worker valmiinPaikka + esittely-v1f tuotannossa (pyramidi 48.86098/2.33585, koko 25, korkeus 22,
  katse 112) → pyramidi keskellä (lokit/todistus-kulmat-louvre-v1f-20261010-2033/louvre-v1f-arkki.png). PT: korjattu.

## Junaan 181
- **saumaton-pakattu-180 ec837bba5**: pakattuna ladatun klipin GetData-lokispämmi pois (laiva.lautta/moottorivene). PT: juna 181.

## PÄIVITYS 21.4x (nollaus PT:n käskystä)
- **f65ed2a39 KUITATTU junaan 180** (PT 21.4x, kuittaus Natiivisepälle). **Linjaus 2 (99459eca5) → juna 181**: jatka -l2:sta
  (kaatuvat kohdat alla).
- **Kompassi + kierroshyppy TODENNETTU** NUI:n yhdistetyllä 6c9d434df:llä simulla 00CF62C2 (Julkaisijan NYT 21.37, SIMU VAPAA
  21.42): kompassi korin vasemmalla reunalla, keinuu korin mukana; `opas hyppy 5` → 1 → 5 Riemukaari → kierros jatkuu. 0 poikkeusta.
  Todistus: proto-3d/lokit/todistus-kompassi-hyppy-180-20261010-2138/ (skenaario linssiseppa-ajot/sk-kompassi-hyppy-yhdistetty-180.txt,
  simuvuoro-kompassi-hyppy.zsh). Löydös NUI:lle (PT välitti): metrolinjalla Louvren nimen alla Notre-Damen alaotsikko.
- Ansa: todistusajon kuvien merkintäkaista peittää kompassin (vasen alakulma) → katso kuvat/raaka/.

## KESKEN: pariisi-kippi-180 (juna 180, PT:n KIPPIKORJAUKSET)
- 50204e0f2: kompassi korin solmun lapsena vasemmalla nahkareunuksen päällä (keinuu korin mukana) + OpasSovitin.KierrosKohteeseen(i)
  NUI:n metrolinjalle (QA `opas hyppy <i>`; NUI kytkee natiivi-ui/kippi-pariisi-180).
- f65ed2a39 (Opus-agentti): pallo ei pysähdy (saapuminen suoraan kiertoon ~7 s, spiraali loppuun ~⅓ kuvan korkeudesta,
  tangenttilähtö, kaarenpituusprofiili kaikille pallolennoille). L1315.
- PT 20.5x LINJAUS 2 (agentti teki/tekee yhteen committiin f65ed2a39:n päälle): kertoja 3–6 s ennen saapumista (ei 15–21 s),
  pallo kiertää koko kertomuksen ja lähtee sen loppuessa, yli ~10 s lento lyhennetään pehmeällä kiihdytyksellä, kierto ≥ 3°/s aina.
  → EI VIHREÄ: WIP-commit **linssiseppa/pariisi-kippi-180-l2 99459eca5** (f65ed2a39:n päällä): kertoja 5 s ennen, lento
  0,35·√matka 12,5–22 s, kierto ≥ 3°/s tulokaaren suuntaan. Kaatuu: kääntö > 10°/s (Venetsia 19,3, Bryssel 11,1, Firenze 10,7),
  Tukholman kokonaiskierto 94° > 90°, EsilatausNopeanLennonRadalta (esilataus ei huomioi pidennettyä lentoa); 3°/s ei näy heti
  ~18 %:ssa (kehys kohteen sivulla/edessä); koko sarjaa ei ajettu. JATKA TÄSTÄ (wt kaupunkiaanet on nyt -l2-haaralla).
- KÄÄNNÖS: omistaja 21.3x → ei omaa LS1-käännöstä; NUI:n yhdistetty käännös natiivi-ui/yhdistetty-180 (pohja 6c9d434df) sisältää
  50204e0f2 mutta EI f65ed2a39:ää (ei ehtinyt). .app: proto-3d/lokit/natiivi-ui-app-yhdistetty-180 → kompassi + hyppy simulla
  00CF62C2 rinnakkain NUI:n kanssa. f65ed2a39 (vihreä) tarjottu PT:lle kuittaukseen → SHA Natiivisepälle PT:n kuittauksella.
- (Vanha suunnitelma, jos oma käännös sallitaan: `PROTO_APP_KOPIO=…/linssiseppa-app/pariisi-kippi-180 proto-kaanna.sh
  linssiseppa/pariisi-kippi-180`) → `zsh proto-3d/tyokalut/linssiseppa-ajot/simuvuoro-kippi.zsh <käännös-SHA>` (päivitä --haara
  uuteen kärkeen!) → videot kansioon todistus-kippi-video-180-* (louvre/concorde/riemukaari.mp4 + aani/*.wav) → mux:
  `ffmpeg -i X.mp4 -itsoffset 1.6 -i aani/X.wav -map 0:v -map 1:a -c:v copy -af loudnorm=I=-18:TP=-1.5 -c:a aac -b:a 160k -ar 48000 X-aani.mp4`
  (natiivikaappauksen wav on tyhjä 4 kt → käytä Unity-kaappausta) → PT → omistaja → SHA Natiivisepälle PT:n kuittauksella.

## VALMIS, todentamatta: kaupunkipuut (juna 181, PT KYLLÄ 18.5x)
- **linssiseppa/kaupunkipuut-181 ef020d7a7** (wt/proto-linssiseppa-puut; Opus-agentti; L1350, unity 0, VARJOSTIN KÄÄNTÄMÄTTÄ):
  Ydin/Elava/PuuRuudukko.cs (jäsennys, ruudut, kartio, LOD), Unity/KaupunkiPuut.cs, Varjostimet/KaupunkiPuu.shader,
  KaupunkiPuutTestit (6), tyokalut/kaupunki_puut_paketti.py; ElavaKaupunki.AsetaValo julkinen, OpasSovitin.MaanpintaLadattu/
  OmaMaanpintaDtm, LinssiOhjain QA, OpasValikko krediitti (OSM ODbL + Meta/WRI CC BY 4.0).
- Data ämpärissä: kartta/puut/v1/ (Karttasepän vienti 18.54, SHA täsmää _valmiit/kaupunkipuut-v1-vienti-20261010:een; Julkaisija 21.1x)
  — ei vientitarvetta.
- Muisti ~3,5 Mt (2,75 km säde; 70 k puuta × 16 t GPU 1,1 Mt; ei tekstuureja). Lähi < 400 m latvus + runko, kauko < 2,5 km latvus.
- Tuplapuut: PEITTO (kameraan kääntyvä latvuskortti 1,2 × latvus, siirretty säteen verran kameraa kohti); Googlen laattoihin ei
  kosketa. Riski: möykyn alaosa katutasolla → säädä `opas puut peitto 1.3` tai rivi PT:lle.
- QA: `opas puut 0|1|tila|lahi N|kauko N|peitto N`.
- PT:n ehdot ennen kuittausta: kuvaparit Pariisi + Tukholma katutasolta ja pallosta, iPad Pro 13 -muistimittaus, LISÄÄ MUISTIA -arvio
  (~3,5 Mt → Natiivisepälle).

## Huomiot
- Natiivikaappauksen (aani-alku → <nimi>-natiivi.wav) tiedosto jää 4 kt:ksi simulla; Unity-kaappaus (<nimi>.wav, 24 kHz) toimii.
- Todistusajon "uusi-peli <kaupunki>" Pariisissa ei soita luentaa (aloituslento) → intro alkaa heti saapuessa.
- Pelin kaupunki-id:t: "lyon" ei ole pelin kaupunki (maailmahyppy), "marseille" on.
- Kortti 2. käynnillä supistettuna (sama merkintä) — PT: ei muutosta.
