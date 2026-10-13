# Päätoimittajan luovutus 13.10.2026 klo 07.0x (konteksti 65 % → oma nollaus; omistaja HEREILLÄ 06.55 alkaen)

Session local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, tili samireivinen@gmail.com (Max, raja 99 %, viikko 44 %). Edellinen: viesti-fable-luovutus-20261013-yo.md. Muisti: fable-tila-20261013-aamuyo (yön tila).

## 0. OMISTAJAN PÄÄTÖKSET 06.57 (kortti, aamuyhteenvedon jälkeen; kuvat lähetetty 06.56)
- JUNA 186: "Julkaise nyt" → PT lähetti NS:lle ja Julkaisijalle "OMISTAJA PYYSI JULKAISUA". Julkaisija tarvitsee omistajan rivin OMAAN ikkunaansa: "Julkaise 186: TF ja web-merget" (vertaisviesti ei ole lupa). Asemataulussa talo/toimi-julkaisija (VAATII TOIMIA) → poista, kun Julkaisija kuittaa luvan.
- Museon pystyotsikko (nimi + tekijä friisin alle, ‹ › teoksen alle, f83ed1201): "Käy näin" → pysyy junassa.
- Kuvaoikeudet: "Ei tämä ole kaupallista kuvaamista" → Raamattu-lokiin kirjattu (tämä PR). Rooma, Barcelona, Lissabon, Madrid ja Ljubljana etenevät (myös kamerarivit); tekijänoikeussääntö pysyy (suojattuja teoksia ei omina 3D-malleina). KS ja LS1 tietävät.
- Mac: "Odota Mac 186:ta" → juna 186 julkaistaan iOS + Mac (NS:lle kerrottu), Mac 185:tä ei ladata.

## 1. JUNA 186 (lähtee)
NS-runko d9d6d0969 (testit 1702/581/487, tarkistus 0) + Siirtosepän v49a 0429ee8b2 (kappelin holvin viuhka pois, botti 17/17, korvaa v48z:n). Kuitattu yöllä: Pelikoodarin shakki 02cf85a1e (Wien, 3D-kahvila, Lautapelit, latauksen himmennys), LS1 museo-v6 6118da320 + kehykset 55f7c7408 + v6-oletus f8040bf37, NUI salikuvat 91ed5a930, LS2 tunikavarjo 02722f970, linnahaara cbad45ba9. Muistiportti läpi (vapaata vähintään: museo 2298 Mt, shakki 2271 Mt, Olavinlinna 572 Mt). Web-merget #4541 #4542 #4543 Julkaisijalla (simuloitu, 0 ristiriitaa). Seuraa: NS:n BUILD 186 -SHA ja muutosloki → TF iOS + Mac → ulkoinen Arvioijat-ryhmä beta-arvioon → rivi omistajalle, kun TF on ulkona.

## 2. JUNA 187 (kertyy)
LS1 haara linssiseppa/kippi-lontoo-praha-187: seitsemän kaupungin elävä kaupunki d3e7725ab (Lontoo vasemmanpuoleinen liikenne) + aukioiden kamerarivit eae275e94; KS:n kaupunkipaketit LS1:lle (Lontoo, Praha, Wien, Rooma, Berliini, Kööpenhamina, Helsinki, Barcelona, Lissabon, Madrid, Marseille, Ljubljana; työn alla Granada → Budapest). KS:llä PT:n pysyvä lupa omiin suosituksiin (keskitysjärjestys, vain Eurooppa, ilmaiset lähteet, robots ja lisenssit tarkistettuina, vie-paketti.sh; kysy vain maksu, maku tai > 5 Gt). Oikeustarkistus: proto-3d/_tyo/karttaseppa/oikeustarkistus-20261013.md.

## 3. OLAVINLINNAN LAAJENNUS (koehuone, EI junassa)
Laajennuksen huoneet viedään peliin yhdessä omana junanaan muistiajon kanssa, kun huoneet ovat valmiit (LS2:n koehuonehaara, PT valitsi b:n). Erä 1 porttikäytävä: valo × 0,35 (ajo6b/6c, noin 2 × piha). Erä 2 pikkupiha: valmis, ja keittiön ulkoseinän verhous jatkuu kulman ympäri ajo8:ssa (siirtymäkuva b uudelleen). Erä 3 linnantupa ja voudin sali pelissä OK (LS2 pal2/pal3); korjataan Tottin vaakuna kivireliefiksi ja valaistuksi sekä porraskuilun ja takaovenpielen sininen kivi. Käytäntö: Blender-pari → LS2:n pelikuvat → PT:n kuittaus → Siirtosepän botti.

## 4. KYSYMÄTTÄ OMISTAJALTA (seuraavaan korttiin, kun sopii)
Museon "iso kuvarivi" -pohja (salikuva rivin levyisenä, iPadilla 2 saraketta); vapaan kävelyn lattiamerkki napautuskohtaan; shakin kahvilan tausta (nyt hämärä nurkka – lisää kahvilaa?); äänisivulla odottavat museon 3 sellokappaletta, kipin soittolista + jazz ja porttikäytävän äänimaisema (näyte v2, +9,6 dB).

## 5. KONE JA MUISTI
Levy 47 Gi 06.59 (appikopioita ~17 Gt, kaikki < 24 h; poistettu 95 appikopion NAS-linkkiä ja viisi yhdistettyä työpuuta). Kone vapaa -lievennys päättyi ma 12.10.: simulaattoreita ≤ 2, GUI-automaatio vain joutoaikaehdolla (Soundly suljettu). JONOKIERROS-cron ei lauennut yöllä kertaakaan → luo uudelleen ja tee kierros käsin, jos se ei laukea. MEMORY.md tiivistetty (indeksit indeksi-julkaisu-juna, indeksi-kone-simulaattorit).
