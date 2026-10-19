# Valoseppä – luovutus 19.10.2026 klo 11.4x (Postivahdin KOVA RAJA 46 %)

Luovuttaja: Valoseppä (Opus, high). Tili: gmail (19.10.), id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31
(≤ 3 riviä), JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b, KK local_8e4fcfed-fc40-464c-854a-1d031b005332, LS local_7a457b99-7ecd-4634-93a0-0c02b53e8d24,
KS local_16f80454-5b30-4180-ae9b-8c6d1edb6779, Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b. D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2
(päiväkirja $D/JONO.md – lue sen loppu ensin). Simu vain JU:n SIMU NYT -viestillä, perään SIMU VAPAA. Juna 204 ainoa auki; julkaisu vain omistajan pyynnöstä.
Edellinen luovutus: viesti-valoseppa-luovutus-20261018-iltapaiva.md (sen Tripo-osa PERUTTU omistajan 07.20 ja 08.28 päätöksillä).

## 0. KÄYNNISSÄ LUOVUTUSHETKELLÄ
- JU kääntää L1:llä B5:n c08cfa898 → $D/nostot-app (~11.40; nyt appissa vielä 533981cbf). Nostojen simuvuoro tulee JU:lta erikseen
  (PT: NUI C1e:n jälkeen tai kun rinnakkainen simu vapautuu). KUN SIMU NYT TULEE: tarkista `cat $D/nostot-app/Matkakirja3D.app/Data/Raw/kaannos.txt`:
  - c08cfa89 → `zsh $D/ajo-nostot-204-k3c.zsh c08cfa898` (hurrikaani 9 + vanat 8 + pimennys 4 + tulivuoret 11 + ISS-kamerat ennen-video, ~32 min, taustalle)
  - 533981cb → `zsh $D/ajo-nostot-204-k3b.zsh 533981cbf` (ilman hurrikaania, ~27 min)
  Sitten SIMU VAPAA JU:lle. ÄLÄ tapa ajoa kesken (isän tappaminen jättää parit tekemättä: `zsh $D/parit-uudelleen.zsh <efekti> <N>`).
- Ei agentteja käynnissä.

## 1. B5 – ISS-valikon luonnonilmiöt (PT, juna 204; haara proto linssiseppa2/iss-nostot-204, wt /Users/Shared/Claude/wt/proto-linssiseppa2-nostot, kärki c08cfa898)
Lista $D/B5-iss-nostot-lista.md. Joka kierros: koodi (Opus-agentti, ei committeja) → minä committaan → JU-käännös → simu → tuore Sonnet-arvioija per efekti
(ohje $D/<efekti>/arvioija.md, kirjoittaa kierrokset/kN/ARVIO.md) → korjauslista seuraavalle. Valmis = keskiarvo ≥ 7 → Kaytossa = true + IssKohokohdat-testi → kuvaparit
PT:lle täysikokoisina (peli | havainnekuva, teksti kuvan ulkopuolelle) → juna 204.
| Efekti | Viimeisin arvio | Seuraava kierros koodissa |
|---|---|---|
| Vanat | k7 7,0 / havainne 5,5 LÄHES | k8 0c99599c3 (kihara valkoinen reuna, nuoret kaartuvat, varjot) |
| Tulivuoret | k10 2,8 / 2,6 EI (kaikki piirtyvät NaN-korjauksen bfcdeecbb jälkeen) | k11 = v8 7c9e9db75 (läpinäkymättömät kuohupallot, 1 varjo, terävä pilvikansi, Etna 305°, Reykjanes) |
| Pimennys | k3 3,5 / 3,5 EI (muoto tuli) | k4 947afa535 (umbran lämmin hehku: sininen = meri itse, pehmeä pilvikansi, sk-pohja-k4) |
| Hurrikaani | k8 3,9 / 3,25 EI | k9 c08cfa898 (aito Gerst-silmäkuva NASA PD, 78 m/tekseli, dyynit pois, renkaat = 8-bit-portaat korjattu) |
Hurrikaanin perusratkaisu (v2 f2d53dab1): pilvikilpi aidosta NASA Terra/MODIS -kuvasta 12.9.2018 (PD), lähteet Resources/Hurrikaani/LAHTEET.md.
Codex-havainnekuvat h01–h11 (omistajan lupa tasan 11, 07.12; toimitettu, PT kuittasi) ovat $D/<efekti>/tavoitteet/hNN-havainne-*.png; h02/h05/h07 vain ulkonäköön.
Ei uusia Codex-kutsuja. Arvioijien muistiot: hurrikaani pari 2 vertaa GOES-kuvaan (mittakaava), vanojen v1-laikku on aitoa pilveä.
Agentit, jotka tekivät kierrokset (jatka niillä, jos ovat vielä tallessa, muuten uusi Opus samalla ohjeella): hurrikaani v2, vanat k7, tulivuoret v7, pimennys v2.

## 2. ISS-KAMERAT KAMERAJOHTAJAAN (PT 09.4x; haara proto linssiseppa2/iss-kamerat-204, wt /Users/Shared/Claude/wt/proto-linssiseppa2-kamerat, kärki fc1d0a3f0)
Pohja: KS karttaseppa/kamerajohtaja-kartta-204 7e33d426d + merge natiiviseppa/juna-204 61d8c3ba4 (IssEtsin-ristiriita B6 NipistysAvasi ratkaistu, molemmat).
- Erä 1 55096a2ae: Ydin/Iss/KyytiLiikkeet.cs (KyytiTila, KyytiSiirto elävällä lopulla) + IssKyyti johtajalle; rata bitilleen sama.
- Erä 2 20380733f (PT: KYLLÄ kesto kulman mukaan): Kohde↔Ikkuna 212 → 68 °/s (raja 125 testinä), keskeytys perii nopeuden, EtsinZoom ~2 s
  (korvataan LS:n `new Zoom(fov, Liikepohja.SuurennusLnHuippu)` kun fbe537200 on pohjassa), IssKatse-paluu Kaanto, SeuraaAsemaa elävä siirto,
  kamerapoikkeukset: Pulun lähikuvat, tärinä, Nousu-aikajana, pimeä 0 s. Testit Linssit 2127/2127, Kartta 509/509 (`bash Linssit-testit/kaanna.sh`).
- Käännös 6af0b0d5d ($D/kamerat-app). JÄLKEEN-video valmis: $D/iss-kamerat/jalkeen-1080.mp4 (28 s) + kaavio kohde-ikkuna-kulmanopeus.png.
  ENNEN-video tulee nostojen ajossa (k3c/k3b, $APP = nostot-app = vanha kamera) → $D/iss-kamerat/ennen.mp4 → pakkaa
  (`ffmpeg -fflags +igndts -i ennen.mp4 -vf "scale=-2:1080,fps=30" -c:v libx264 -crf 26 -an ennen-1080.mp4`) → PT:lle molemmat + kaavio (PT pyysi).
- Huom: Kohde-tilaan pääsee vain kehittäjän seurannalla (astro kyyti seuranta 1); tavallinen pelaaja ei näe Kohde↔Ikkuna-siirtymää – kerro PT:lle.
- Jatkoehdotukset: SeuraaAsemaa → KS:n PalloSeuranta, Nousu → PalloRata (karttaseppa/lentojen-kamera-204 33a7550f6); kameravahti/liikevahti --kirjaa vasta junan jälkeen.
- Junaan 204: kun PT hyväksyy videot → NS:lle haara (fc1d0a3f0).

## 3. OPIT
- JU:n vuorotarkistus voi osua kierrosten väliin (simu sammutettuna) → jos JU perii SIMU NYT:n ajon aikana, kerro heti, että ajo on käynnissä.
- MODIS-JPG:n valkoinen saturoituu; korkeus luminanssista vaatii paikallisen kontrastin + värinän (8-bit-portaat näkyvät renkaina).
- Uusi mesh-geometria: sqrt pienestä negatiivisesta float-arvosta → NaN kaataa koko meshin; NaN-vahti Mesh():iin (Tulivuoret.cs).
- Ilmakeha2-muutokset: tarkista itse, että ilman efektiä kerroin on tasan 1.
- Agenttien välitys: SendMessage agentin id:llä jatkaa sen kontekstista (halvempi kuin uusi agentti).

## 4. JONO
1. Kohta 0 (nostojen simu) → 4 arvioijaa → seuraava kierros. 2. ISS-kamerat ennen/jälkeen PT:lle. 3. Kun efekti ≥ 7: kytkin päälle + kuvaparit PT:lle.
