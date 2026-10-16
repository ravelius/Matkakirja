# Pelikoodarin luovutus 16.10.2026 aamupäivä (KOVA RAJA 37 %, Postivahti 10.1x, klo 10.13)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261016-aamu: kaikki kohdat hoidettu (alla).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md).
  PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
  Valoseppä local_c238f4af-ae73-44e7-81f1-92848acd9217, LR local_996d60ab-b4af-4172-ad31-f8e948f141a3, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
- Testit (worktreen juuressa): `sh Linssit-testit/kaanna.sh`, `sh Peli-testit/kaanna.sh`, `sh Linssit-testit/unity-tarkistus.sh`.
- Ajotyökalut /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/. Oma simu iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19.

## ENSIMMÄISENÄ: KORIN KÖYSIEN KIINNITYSLUUPPI (omistaja 10.02 PT:n kautta, Codex-tilaus c35130fe5, juna 197)
Omistaja: "Voisiko köyden kiinnityksestä tehdä havainne referenssi kuvan. Nyt näyttää vielä irralliselle." Tavoite (PT): köysi ja kori yksi
kappale; köysi tulee korin reunaan ja kiertyy sen ympäri/läpi näkyvällä sidonnalla, reunassa nahkasuojus; köysi ei jatku tyhjään ja
liikkuu täsmälleen korin mukana. Nykytila PT:n kuva /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/kori-koydet-nyt-20261016.jpg.
Codexin havainnekuva tulossa: posti/kori-koydet-20261016/havainne-kori-k1.png (Fablen checkoutin posti/). Köysikoodi on Valosepän (varattu ISS:ään) → tee itse.

Haara pelikoodari/kori-koydet-197 e737615de (pohja juna-196 573a7652e, worktree /Users/Shared/Claude/wt/proto-pelikoodari-kori-koydet-197, peilattu),
unity-tarkistus 0. Tiedostot Linssit/Unity/PalloKori.cs, LinssiOhjain.cs (komennot):
- b9d72b308 + c4a534fd9 KÖYSIMITTARI `linssi opas kori mittaa 1|0`: 0,5 s välein "köysimittari ala … mm (… px), keskiheilunta … cm, alakulma …°,
  kori kallistus/nyökkäys"; kerran "köysimittari kiinnitys köysi i: alapää, reunan yläpinta, rako mm, köyden säde".
- e737615de KÖYSI JA KORI YHTENÄ, kytkin PalloKori.KoydetYhtena (oletus pois), `linssi opas kori yhtena 0|1`: köysi lepoasennossa, verkko
  taipuu (KoysiMuoto): alaosa kiertyy jäykästi korin mukana (w = 1 alapäässä → 0 t 0,22–0,8), yläpää kantorenkaassa, Verlet vain yläosassa.
DIAGNOOSI (lähde _valmiit/ilmapallo-v1/kori/lahde/kori.py): (1) korin pivot on köysien kiinnitysten keskellä → alapäät tuskin liikkuvat, kori
keinuu (KoriLiike 1,8° + 0,7°, kiihdytyksissä ≤ 5,5°) paikallaan pysyvien köysien alla = "eri tahti"; (2) mallin 2 kiinnityskierrosta ovat
korin mesh-osassa (kori_etureuna, 3. materiaali koysi) kiinteästi θ = 32°:ssa, köyden alapää B on 2,2 cm reunarullan ulkopuolella ja 1,2 cm
keskiviivan yllä → päättyy ilmaan; (3) SovitaMalli siirtää kapealla ruudulla köyden alapään x:n sisemmäs (KoysiX 0,551 → 0,85 × puolileveys),
jolloin köysi irtoaa mallin kierroksista kokonaan.
SEURAAVAT ASKELEET:
1. JU kääntää kori-koydet-197:n (kärki e737615de; jonossa 10.12, lukossa SS meri2) → simu 96044270, app _tyo/pelikoodari/kori-koydet-197-app/.
   KÄÄNNETTY → `SHA=<käännös> UDID=96044270-92AA-4BD3-BE2D-772C8495AB19 HAARA=e737615de zsh ajo-kori-koydet-197.zsh` (skenaario
   sk-kori-koydet-197.txt: Praha pelaajana vaaka, mittari päällä, video kori-koydet-nyt (yhtena 0) ja kori-koydet-yhtena (1), kuvat n01–n03/u02).
   Lue lokista köysimittarin rivit (alakulma: nyt ~korin kallistus, yhtenä ~0) ja kiinnitysrivi (rako).
2. Codexin kuva tullessa: proseduraalinen sidonta malliKorin lapseksi köyden TODELLISEEN kohtaan (SovitaMallin x): nahkasuojus (nahka-
   materiaali, putki rullan RULLA_R 0,032 ympärillä, ~16 cm), 3–4 köysikierrosta suojuksen ympäri (putki r ~0,0105, koysi-materiaali),
   köyden alapää rullan ulkoyläpinnalle sidonnan alkuun; mallin kiinteät kierrokset piiloon (kori-meshin koysi-alimesh tyhjäksi). Kaikki
   kytkimen takana (esim. KoydetYhtena tai oma). Rullan keskiviiva x:n kohdalla: nahka-verkon kärjet |dx| < 1 cm (vrt. AsetaKompassinPaikka).
3. Looppi kuten ISS-havainneluuppi: rinnakkain nykyinen / uusi / Codex samasta korikamerasta → kuvat PT:lle (≤ 3 riviä + polku). Junaan 197 NS:lle
   L2:n jälkeen; kytkin päälle vasta PT:n/omistajan hyväksynnällä.

## Tässä vuorossa valmiit
- MAX-Q-JÄÄTYMINEN: selvitetty omasta pinonäytteestä (raportti /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/raketti-jaatyminen/LOYDOS-0545.md):
  simulaattorin Metal-ajurin XPC-viive + testikomentojen tiedosto-operaatiot; pelaajaa koskeva osa korjattu: Esilataajan rename/delete
  taustasäikeeseen pelikoodari/maxq-jaatyminen-196 bdeb1bceb, KÄÄNNETTY 344b80a1c, junassa 196.
- MUSEO V2 -TESTI (NS:n pyyntö, omistajan 07.55 kytkentä): pelikoodari/museo-v2-testi-196 4052e3793 (ZoomNyt: V2:n silmän korkeus heti
  nipistyksen/vedon/sovituksen jälkeen; tuplanapautuksen ankkuri V2:lle 5 mm), junassa 196 (ba6dc69bd).
- RAKETIN KAMERA (omistaja 08.03 "easy in out"): pelikoodari/raketti-kamera-196 af52dcc6e, kytkin Nousu.KameraV2 (`linssi raketti kamera v2 1`):
  laaja kamera pehmennetään näyttöajassa (Hann ±2 s), alustan 90° sivukuva kääntyy 24 T:ssä, lähikuvat 2,6/2,8 s quintic. Testit
  RakettiKameraV2Testit. PT 08.10: raketti Valosepän tavoiteluuppiin → haara annettu Valosepälle (kopio PT:lle), koostetta ei tehty (JU peruttu).
  Kokeilukooste pelikoodari/raketti-kooste-196 f9d34c59c (kamera + LR alusta 37cd85cdc + Valosepän liekki fda1ac8f3) jäi haaraksi.
  LR korjasi ValaanValo-testin a620d4959. Worktree proto-pelikoodari-raketti-kamera-196 jää, kunnes Valoseppä on ottanut haaran.
- Levykierros (Postivahti 09.13): ~3,1 Gi vapautettu, kuitattu. Jäljellä kohtaaminen-196-mac (omistajan Mac-hipaisutesti).

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-pelikoodari-luovutus-20261016-aamupaiva.md
(haara pelikoodari-luovutus-20261014-paiva). Jatka korin köysien kiinnitysluuppia: JU:n käännös e737615de → mittausajo, sitten sidonta Codexin kuvan mukaan."
