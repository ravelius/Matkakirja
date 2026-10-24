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

## Vaihe 2 (vertailulista 810 kohdat 1–5, OMISTAJA 10.53) – paketit JU:lle
- muurikate-v7: koristevyö 0,9 m kultalistoin (V4_kultalista), pilasterit 6 m välein (PT: tiheämmät); normaalit ulos. 108 692 kolmiota.
  _valmiit/juoksupeli-kk-muurikate-v7-vienti-20261024 (SHA256SUMS 7759f31a4bae).
- avoimet-v17: koristevyö 3,2–4,0 m kultalistoin, 8-kulmaiset puolipylväät jalkakivin ja konsolipäin, ikkunat 12 cm:n syvennyksessä 5 × 5 rimoin,
  ovilehdet avattuina sisäpinnalle renkaineen, kynnys. ~4 900 kolmiota/huone. _valmiit/juoksupeli-avoimet-v17-vienti-20261024 (99d8ac5aa318).
- tausta-v20: LOD0 pilastereille konsolipäät, ikkunasyvennys 12 cm; normaalit ulos. LOD0 yhteensä 807 892 (v19 531 461); raskain pala
  kk-tausta-1-3 36 k → 72 k. LOD1/2 kuten v19. _valmiit/juoksupeli-kk-tausta-peking-v20-vienti-20261024 (66 riviä, 0c921d64f7c6).
- Proto lavastaja/muoto-210 524e59015 (45a33c41a:n päällä); tarkista.sh 0 virhettä (sama diff).
- Kuvapari: /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/tavoiteluuppi-k1/muoto-v7b-kuvapari.jpg
- Seuraavaksi: kohta 7 (kivijalan listakivi), 8 (kate: räystäslista), 6 (portin nastaovet, odottaa Codex #923 tai geometria), sitten pelikuvapari.
- iPadin ruutuaika mitataan pelikuvaparin ajossa (runko + ämpäri).

## Vaihe 3 (OMISTAJA 10.53/11.22, Raamattu 2.177: taso karsimatta) – tausta-v21
- LOD0:aan muurikate-v7:n jaksoista (muurikate/muuri-ajot-v7.json, kk_muurikate.py MUURI_AJOT_JSON; v7-glb tavulleen ennallaan):
  21 005 konsolia räystään alle, 6 054 vyön kultarimaa, 1 873 syvennyspaneelia, kivijalan listakivi, räystäslista + 40 010 tiilipäätä;
  hallien ikkunoissa 5 + 5 rimaa. LOD0 yhteensä 1 483 986 kolmiota (v20 807 892), raskain pala kk-tausta-0-3 143 511. LOD1/2 kuten v20.
- Paketti _valmiit/juoksupeli-kk-tausta-peking-v21-vienti-20261024 (66 riviä, 6d4e730ffd03) – korvaa v20:n (v20 voi jäädä vientiin).
- Proto lavastaja/muoto-210 e39681f0c: TaustaKansio v21; tarkista.sh 0 virhettä.
- Esikatselu: /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/tavoiteluuppi-k1/muoto-v21-yksityiskohdat.jpg
- iPadin ruutuaika: mitattava pelikuvaparin ajossa (raskain pala 143 k LOD0 + muurikate 109 k aina).

## Vaihe 4 (PT 24.10. 12.0x + VS:n Codex-kuvat #923–#926)
- muurikate-v8: pilasterit vain jaksojen päihin (pitkä muurikuja sileä, havainne 02), kivijalka 1,5 m, koristevyöhön palkkimaalaus
  kuvatekstuurina (UV 3:1, alareunan vaalea kaista rajattu). Porttiaukkoja muureissa ei löytynyt läpikuljettavina (raot = risteyksiä) →
  ei ovia muureihin. 85 332 kolmiota. Paketti juoksupeli-kk-muurikate-v8-vienti-20261024 (6b91f544f5fa).
- avoimet-v18: palkkimaalaus, 菱花-ikkunaristikko alfa-maskina (MASK, korvaa rimat), huoneen puuovi ovilehtiin. ~3 000 kolmiota/huone.
  Paketti juoksupeli-avoimet-v18-vienti-20261024 (e7959e5c4175).
- rakennukset-v14: Meridiaaniportin kolmen tunnelin pohjoissuulle avatut nastaovet (#925) + kynnyspuu (havainne 05 = keskiaukko).
  Vain a-meridiaaniportti-lod0 muuttui (UV vain sille). Paketti juoksupeli-kielletty-rakennukset-v14-vienti-20261024 (a30e1d8b905d).
- tausta-v22: kivijalka 1,5 m kaikkialla, ei syvennyspaneeleja muureissa, yksityiskohdat muurikate-v8:n jaksoista. LOD0 1 442 512,
  raskain pala 137 109. Paketti juoksupeli-kk-tausta-peking-v22-vienti-20261024 (d6799c7a5546).
- Proto lavastaja/muoto-210 77b01e3a9 (kaikki neljä vakiota); tarkista.sh 0. VS yhdisti testihaaraan simua varten.
- Kuvapari (Blender, tekstuurit; kamera Puyin takaa ~4,4 m): /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/tavoiteluuppi-k1/muoto-v22-kuvapari.jpg
- Omistajan kuvapari: VS ajaa pelissä (paikat −135,0,320 / −245,8,300 / 13,2,−385 ja −420).

## Vaihe 5: kivijalka (PT 24.10. 12.1x "harmaata 1,5 m:n kivijalkaa ei näy")
- Kivijalka (V4_sokkeli → VS:n laji 11, #918) oli mukana kummallakin pitkällä muurilla, mutta v22:ssa korkeus 0,3 × seinän korkeus = 1,35 m
  4,5 m:n muureilla → punainen rako listakiven (1,5 m) alle; ylhäältä katsottuna kapea. v23: min(1,5 m, 0,4 × korkeus).
- Paketti _valmiit/juoksupeli-kk-tausta-peking-v23-vienti-20261024 (01341948cddc), korvaa v22:n. Proto lavastaja/muoto-210 f6a13ab7b; tarkista.sh 0.
- Kuva (lähi | Puyin kamera): /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/tavoiteluuppi-k1/kivijalka-v23.jpg. Blenderin Workbench-
  valossa varjopuolen kivijalka on tumma; pelissä harmaus tulee VS:n kivikuvasta.

## Vaihe 6 (PT 24.10. 12.4x–12.5x, VS:n pelikuva 1-lahtokuja)
- avoimet-v20: talojen etuseinät kiinni – ovipaneelien 3,26 m:n aukot kavennettu 2,4 m:iin (= juoksureitin kaista AvoinLeveys, kaikki ovet
  läpijuostavia, Pelikoodarille tiedoksi), sivuille umpiseinä rappauksin ja kivijalan kansin, oven yläpuoli umpeen, ovilehdet sisäpinnalla.
  Kivijalka 0,95 + 0,05 m. Paketti juoksupeli-avoimet-v20-vienti-20261024 (03fe566b7b87).
- muurikate-v9 + tausta-v24: kivijalka ~1/4 muurin korkeudesta = 1,1 m. Paketit juoksupeli-kk-muurikate-v9-vienti-20261024 (daf72a0457c4),
  juoksupeli-kk-tausta-peking-v24-vienti-20261024 (8a33611c23c5). Vaaleus = VS (V4_sokkeli × 1,28).
- Proto lavastaja/muoto-210 53573be4b; tarkista.sh 0. Kuva: /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/tavoiteluuppi-k1/lahtokuja-v20-etuseinat.png
