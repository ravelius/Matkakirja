# Pelikoodari: luovutus 3.11.2026 klo 17.35 – juna 218

Edellinen: -20261103-1715 (f2faddf63), voimassa ellei alla toisin. Syy: kontekstiraja 25 % (7.37), ajot JU:n jonossa.
Testit (proto horisontti-218am 67fdba66c): Peli-testit 810/810 (`bash Peli-testit/kaanna.sh`, zsh ei toimi); unity-tarkistus.sh 0 virhettä.
Proto-haarat paikallisia; worktree /Users/Shared/Claude/wt/proto-pelikoodari-ys-218 (nyt haarassa pelikoodari/horisontti-218am).

## Tehty 17.15–17.35
- **taso1b-218aj (raystas-218aj 34ece9356)**: vartija z382 ohi sivulta, kiveys korjattu (ag 95–97 s → aj horisontti). Paketti
  sali-218aj/kk-taso1b/ (taso1b-218aj.mp4 + arkki-01…05.jpg). PT kuittasi → KK katsoi 17.25: (a)(b)(c) KUNNOSSA, 3 uutta korjattavaa:
  (1) 58,5–64,5 s kujalta aukiolle kamera jyrkästi alas (pelkkää kiveystä), (2) 35–37 s vasen käännös jyrkästi alas ~2 s,
  (3) 89,75–90,5 s harmaa sumea raita kiveyksen poikki. Kuvat /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/kuvat/
  218aj-taso1b-4fps-{c-aukio,b-kulma,e-portti}.jpg. PT: korjaus → uusi otto JU-jonoon; EI omistajalle ennen korjausta.
- **(1) korjattu**: proto pelikoodari/horisontti-218am 67fdba66c (salieste-218al:n päällä). Syy: kujalta aukiolle kamera 6–7 m takana ja
  4,0–4,3 m ylhäällä (nimellinen 3,7 / 2,4), "Puyi samankokoisena" -kavennus (JuoksuV4Maailma ~1492) kavensi kentän 29–33°:een →
  yläreuna horisontin alla. DroneNosto.HorisonttiKentta: ulkona (ei sisalla/puyiKatonAlla/SaliKatonAlla) kenttä vähintään niin laaja
  (enintään KujaKentta 60°), että yläreuna 5° horisontin yllä; vain kamera ≤ 5,5 m (muurien yli nostettu drone kapenee ennallaan).
  Testi DroneNostoTestit.HorisonttiKuvassaKavennettuna.
- **(2) EI vielä korjattu**: videon 35–37 s = juoksun t ~10,5–11,5 (opetus hidastaa, kamera.txt t ei ole juoksuaikaa): huoneesta
  kujalle vasemmalle käännyttäessä kamera osui työhuoneen räystääseen (huom: "kamera rakennusmassassa (123.5, 3.3, -820.3) … v4 palatsi
  avoin tyohuone katto+katto_raystas…", "PELAAJA PIILOSSA", kamerasuoja veto → kamera 5,5 m:iin 2–3 m:n päähän → jyrkkä yläkuva).
  Ehdotus: työhuoneen katto/räystäs häivytetään näkölinjalta (katto-moottori, periaate 8) eikä kamerasuoja nosta; tarkista
  KameraSuoja/KameraSivuSuoja ja polkukamera (alkaa t 11.22). Horisonttikorjaus ei auta (kamera > 5,5 m tai kulma liian jyrkkä).
- **(3) EI vielä selvitetty**: 89,75–90,5 s kamera (132.8, 3.8, -562.9) → (127.6, 5.6, -561.9), Longzongmenin/kujaportin läpikulku
  ("läpikulun katto 5.4 m s 352"); raita näyttää kynnys-/porraskiveltä matalalla tekstuurilla tai LOD2:lta. Selvitä `ui juoksupeli mika`
  -QA:lla tai osamallista (osamallit791-v10, porras-*.glb); jos malli/tekstuuri → Lavastaja/Natiiviseppä (vastuukartta), rivi PT:lle.
- **mp (Meridiaaniportti)**: aj:n ajo virheellinen (sali-218aj/mp-havainto.txt): etupiha z −435 ei ole verkossa → alku tunnelin
  pohjoissuulla, maali 17 m:ssä, kamera portin massassa ilman avausta. Pelissä maali A = Meridiaaniportti (ei läpijuoksua).
  Uusinta sali-218am/sk3-mp.txt: alku keski, maali A, lopetus "juoksupeli: maali Meridiaaniportti".
- JU:n jonossa (ei tuloksia 17.35): 1) al: `zsh …/sali-218al/ketju-al.zsh ys tj` (salieste-218al), 2) am:
  `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218am/ketju-am.zsh taso1b mp` (horisontti-218am, taso1b siemen 1217174437).

## SEURAAVA
0. ENSIN (PT 18.0x): Codex toimitti viimeisen keisarin 5 havainnekuvaa + lähteet (ee0eda022, origin/claude/postilaatikko
   posti/codex-pelikoodari-viimeinen-keisari-havainnekuvat-20261103/); PT kuittasi vastaanoton. Arvioi ja kytke Puyin nostoon
   (Raamattu 2.200; aiempi tilaus "Viimeisen keisarin nosto" 5345c2379). Tulos PT:lle.
1. al-tulokset: kohta 1 edellisestä luovutuksesta (grep "salin esteet", "salieste häivytetty"; ys 10–12,5 s, tj 4/8/10 s; salipaketti
   yhdellä rivillä PT:lle).
2. am taso1b: tarkista 58,5–64,5 s (horisontti/hallit näkyvissä), ettei (a) 78–92 s ja vartija 95 s heikentyneet; Puyi aina ruudussa.
   Aikavastaavuus: videon s × 51,935 = kamera.txt-ruutu (tallenne 50 fps). Korjaa samaan junaan myös (2) ja selvitä (3) ennen KK-pakettia
   (PT: ei omistajalle ennen korjausta). Paketti kuten sali-218aj/kk-taso1b/, rivi PT:lle.
3. am mp: ei kiveyskuvaa, ei massaa portilla (huom-*.txt), maalin näköala.
4. LISÄYS 17.5x (PT: jatka 35 %:iin): ALKULENTO KYTKETTY proto horisontti-218am a592f6e28 (67fdba66c:n päällä): JuoksuAvausJuliste
   Kerrokset MITAT.json "alkulento" -paikoilla yhdessä lohkossa ruudun keskellä (leveys 86 %, korkeus ≤ 42 %), ryhmät 0,4/1,0/1,6 s,
   häivytys alkaa 4,0 s (KuvatNakyvissaS 4,8); usva PÄÄTETTY: soikea gaussi-usva (alfa 0,42) lohkon takana. Resources-kuvat tavuittain
   Codexin. Unity-tarkistus 0 virhettä. JU:n am-ajo (taso1b, haaran kärki) näyttää sen → tarkista videon 0–5 s, sitten rivi PT:lle.
   AUKI: LATAUSKUVA (rivi1 + latauskuva-viiva + rivi2, MITAT "latauskuva" 3000 × 625; vaakaan Codexin tiiviimmät rivivälit
   previews.loadingLandscape.nativeRowOverrides: tausta 2560 × 1180, otsikko x 580 y 35 leveys 1400). Ehdotus: koosta kaksi PNG:tä
   (perus + vaaka) → media-paketti JU:lle (media-vienti = julkaisu, PT:n kuittaus), sitten JuoksupeliNakyma.OtsikkoUrl + VaakaOtsikko
   ({1400/2560, 1280/2560, (35 + korkeus/2)/1180}) ja pysty Osa(…) Codexin pysty-esikatselun mukaan (x 67 y 250 leveys 1120 / 2048).
   Tarkista hattumaskin päällekkäisyys alfoista (LatausRajausTestit). Tilaus: Codexin elokuvaotsikot #1867–1868 toimitettu (c3a5c2e29,
   posti/codex-pelikoodari-juoksupeli-elokuvatekstit-20261103/; kuitti bba783c3a). Arvioi ja kytke rivit + ~4 s häivytys; Codexin ehdotus
   pehmeä vaalea usva tekstin taakse tummilla kattoalueilla – päätä itse. Tulos PT:lle.
5. Edellisen luovutuksen kohdat 4–7 ennallaan (Codex-toimitukset, Editor-työkalut kivi-216:een, taso1b musiikkirivit, checkout).
6. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/pelikoodari-20261103-1735.
