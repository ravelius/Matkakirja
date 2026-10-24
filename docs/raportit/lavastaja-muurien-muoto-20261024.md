# Lavastaja 24.10.2026: muurien muoto (OMISTAJAN PÄÄTÖS 10.51, PT:n erä)

Omistaja 10.46: "suurin ongelma: miksi punaisissa seinissä ei ole minkäänlaista muotoa. lisäksi ne ovat liian räikeän punaisia."
Minun osuuteni = muoto (geometria). Väri ja pinta = Valoseppä (materiaalirajat alla).

## Tehty (proto lavastaja/muoto-210, worktree /Users/Shared/Claude/wt/proto-lavastaja-muoto, k1b 45a33c41a:n päällä)
1. **muurikate-v7** (kk_muurikate.py JULKISIVU): pohja.json-muurien kujanpuoleisille pinnoille palkkivyö harjan alle (V4_palkkivyo 0,58 m),
   porrastettu konsolirivi (V4_konsoli, räystään varjo) ja pilasterit 9 m välein (V4_red) kivijalkoineen (V4_sokkeli + kansi).
   Pinta luodattu taustasta vaakasäteellä; puoli ohitetaan rakennuksen kohdalla. 10,6 km vyötä, 2 064 pilasteria; 85 490 kolmiota (v6 22 940).
   Paketti _valmiit/juoksupeli-kk-muurikate-v7-vienti-20261024 (37b1080dcf80).
2. **avoimet-v17** (avoimet_julkisivu.py): huoneiden ulkoseinäpaneeleille ikkuna (kehys, tumma tausta, 4 + 4 ristikkorimaa), pilasterit
   paneelien päihin, palkkivyö 3,55–4,0 m; ovipaneeleihin ovenkehys (aukko auki juoksulle). Ulkopuoli tunnistetaan sisustuksen puolesta.
   ~3 400 kolmiota/huone (jaetut verkot). Paketti _valmiit/juoksupeli-avoimet-v17-vienti-20261024 (ea6025bdfbb8).
3. **tausta-v20** (peking_tausta.py TAUSTA_MUOTO, vain LOD0 ≤ 150 m): hallien punaisille seinille (2,5–8 m, myös jalustalla seisovat)
   pilasterit ~3,6 m jännevälein ja jokaiseen jänteeseen ikkuna ristikkoineen; muurivyöhyke ohitetaan (muurikate hoitaa).
   5 226 ikkunaa, 7 592 pilasteria; LOD0 531 k → 747 k kolmiota koko palatsissa (20 palaa; lähin 1–4 palaa kerrallaan LOD0:na).
4. Proto: TaustaKansio v20, MuurikateTiedosto v7, AvoimetKansio v17. tarkista.sh 0 virhettä.

## Kuvapari (Blender Workbench; pelikuvat vasta ämpärin jälkeen)
/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/tavoiteluuppi-k1/muoto-v7-kuvapari.jpg (havainne | ennen | jälkeen; samankaltaiset kulmat:
muurikuja x −321 z 190, lähtökuja kuja-75 pohjoispää, hallikuja x −300 z 125).

## Materiaalirajat (VS:lle lähetetty 10.5x)
V4_red (pilasterit) → laji 10 rappaus; V4_sokkeli/_kansi → 11/16; uudet V4_palkkivyo, V4_konsoli, V4_ikkunakehys, V4_ikkuna_tausta,
V4_ristikko = mallin tasavärit (laji 0), kunnes VS lisää lajit. Muurikate ja avoimet kulkevat jo LattiaLaji-polun läpi.

## Codex-tilauslista PT:lle (tekstuurit; Tripo-malleja ei tarvita)
1. Palkkivyö (caihua) dougong-konsoleineen, toistuva vaakasuunnassa, 2048 × 512, sinivihreä/kulta (muurien ja huoneiden palkkivyö).
2. Ikkunaristikko 菱花 alfa-maskilla, 512 × 512, tumma punaruskea puu (korvaa nykyiset 4 + 4 rimaa).
3. Portin ovilehti kultaisine nastoineen (9 × 9), 1024 × 2048, punainen lakka (porttikäytävän havainne v2-pari-3).
4. Huoneen puuovi kahvarenkaineen, 512 × 1024 (lähtökujan havainne).

## Puuttuu vielä
- Porttikäytävän nastaovet (tekstuuri 3) ja porrasaskelmat huoneiden oville.
- Pelikuvapari kaikista kolmesta (tarvitsee JU:n ämpärin + rungon).
