# Pelikoodari: luovutus 3.11.2026 klo 17.00 – juna 218

Edellinen: -20261103-1630 (+ lisäys 16.40, PR 6181), voimassa ellei alla toisin. Syy: kontekstiraja 28 % (7.37), iso uusi työ edessä.
Testit (proto pysty-218ak): Peli-testit 808/808; tyokalut/tarkista.sh unity-tarkistus 0 virhettä, kameratestit läpi.
Proto-haarat paikallisia; worktree /Users/Shared/Claude/wt/proto-pelikoodari-ys-218 (nyt haarassa pelikoodari/pysty-218ak).

## Tehty 16.40–17.00
- **ai-ajo (polku-218ai 6311df2d4) ys + tj valmiit** (sali-218ai/20261103-164148-ys-v3.mp4, -164749-tj-v3.mp4; cx ty xf JU L2:lla kesken):
  polkukamera alkaa nyt (ag:n 7–8 s viat poissa), MUTTA:
  - ys 10,25–12,5 s: kamera pylvään / sermin (koko ruutu paneelia 11,25–11,5) / seinän sisällä (~2,8 s massassa).
  - tj 4 s ristikkoseinän takana (Puyi piilossa), 8 s sermin sisällä, 10 s korkea yläkuva (Puyi pieni).
  - Syy (loki): sermin ruudut keisarin vieressä massaa 0,56–5,09 m myös rinnan kohdalla → KameraSuoja.Tarve ei löydä vapaata
    kohtaa rintaa kohti, KameraSivuSuoja ei sivulta, polkuhaku "polku ei" (t 10,75). ys-sali = sokkelo ys-yongshougong (lod0
    "runko+palkit" yhtenä verkkona → pylväät/seinät todennäköisesti samassa verkossa kuin runko).
- **Räystäskorjaus A (PT kuittasi 16.5x, "korjaa omistajan 15.26 pelkkää kiveystä; 2.177 ei muutu")**: proto pelikoodari/raystas-218aj
  34ece9356 (polku-218ai:n päällä): DroneNosto.RaystasNosto – räystäsnosto vain, jos nimellisetäisyyden katto (yEt·sin72°) riittää
  räystään + vara yli; muuten ei nostoa ja kulmaMax = YhtKulmaSisalla 40° (RaystaanAllaKulmaMax). Kaikki häivytetyt läpikulut.
  KK 31.10. "kamera vain jyrkkenee" kirjattu muutetuksi samaan committiin (JuoksuV4Maailma ~1904). Testi RaystasNostoVainYli.
- **Pystypako**: proto pelikoodari/pysty-218ak ceb0ddcb3 (raystas-218aj:n päällä): KameraSuoja.PystyPako 3 m; toinen
  KameraSivuSuoja-instanssi (kameraPystySuoja) kohteena kameran yläpuolinen piste, ennen kameraSuoja.Seuraa, ei läpikulun alla
  (lkAlla). Loki "kamerasuoja pystypako". Testi KameraSuojaPystypakoSerminYli.
- JU:n jonossa (ei vielä tuloksia 17.00):
  - aj: zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218aj/ketju-aj.zsh taso1b mp (raystas-218aj). taso1b siemenellä
    1217174437 (af:n vartija z382) → kohta 2; mp = Meridiaaniportin keskiaukon läpijuoksu (alku 13.25,-435, maali 13.25,-345;
    ovet ohjauksessa kiinni → botti voi kiertää; katso huom-/kameraväli-rivit).
  - ak: zsh .../sali-218ak/ketju-ak.zsh ys tj cx ty xf (pysty-218ak).

## PT:n linjaus 17.2x (SITOVA tälle työlle)
"Ensisijaisesti sama moottori kuin katoissa: kameran ja keisarin väliin jäävä sermi/pylväs häivytetään (periaate 8), kamera pysyy
polulla; pystypako (≤ 3 m) vain jos häivytys ei riitä (esim. kamera massan sisällä). Sitten ys/tj-uusinta, itse tarkistus 4/8/10–12,5 s
ja salipaketti yhdellä rivillä PT:lle."
- Katto-moottori = KattoHaivytys (Peli/Juoksupeli/JuoksuKortteli.cs ~209): Katto-suorakaide + AlaY/YlaY + Linjalla (NakolinjaPiiloon),
  Sovella (JuoksuSokkeloMaailma.cs ~668) häivyttää piirtäjät (Tunniste = MeshRenderer[]), palatsiKatot rekisteröinti
  LisaaPalatsinKatto (Palatsi.cs ~1020–1048).
- EI kartiohäivytystä (JUOKSU_SEINA/JuoksuSeinaHaivytys): omistaja 10.43 "yhtenäisessä dronessa ei häivytysympyrää" (JuoksuV4Maailma ~2608).
- Ehdotettu toteutus: oma KattoHaivytys-instanssi saliesteille (OmaReuna −∞ → häivytys vain Linjalla; AlaY = lattia, YlaY = esteen
  huippu, NakolinjaPiiloon kamera→rinta joka ruutu), Sovella samalla. Ensin selvitä sermin ja pylvään piirtäjät: `ui juoksupeli mika x y`
  ys-ajon 11,3 s:n ruudusta (tai lisää skenaarioon). Jos pylväät ovat runko+palkit-verkossa, niitä ei voi häivyttää erikseen →
  pystypako (pysty-218ak) jää varaksi; kerro PT:lle.

## SEURAAVA
1. aj-tulokset (sali-218aj/): taso1b – 93–97 s ei pelkkää kiveystä (kamera ~40° käytävän läpi), kohta 2 vartija ohi sivulta
   (grep "varoitus"; jos ei vartijaa, uusi siemen); mp – Meridiaaniportti: ei kiveyskuvaa, ei massaa (huom-*.txt). PT: taso1b-paketti
   KK:lle vasta kun kohta 2 todistettu + kiveys korjattu, samaan pakettiin (kuten sali-218ag/kk-taso1b/), sitten rivi PT:lle.
2. ak-tulokset (sali-218ak/): ys 10–12,5 s, tj 4/8/10 s; grep "pystypako".
3. Salieste-häivytys PT:n linjauksen mukaan (yllä), uusi proto-haara pysty-218ak:n päälle, ys/tj-uusinta JU:lta, itse tarkistus, salipaketti
   (video + fps=1,scale=300:-1,tile=6x4) yhdellä rivillä PT:lle.
4. Codex-toimitukset odottavat yhä (Viimeisen keisarin nosto 5345c2379).
5. MUISTA (ennallaan): Editor-työkalumuutokset myös kivi-216-puuhun.
6. Sivuhavainto ennallaan: taso1b unity.log 3646 musiikkiriviä (eräajon ääni pois?) – tarkista laitteella ennen korjausta.
7. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/pelikoodari-20261103-1700.
