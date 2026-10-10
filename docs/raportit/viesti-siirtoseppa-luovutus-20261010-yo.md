# Siirtosepän luovutus 10.10.2026 myöhäisilta (Opus 5.5, high; PT:n nollaus 65 %)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high): Olavinlinnan historiamoottori ja pelattava pala (natiivi proto). Lue tämä, CLAUDE.md ja Raamatun
Ydinajatus kohta 2. Simu 8362879F = siirtoseppa-iPad13 (T7). Simuajot vain Julkaisijan SIMULAATTORI NYT -vuorolla, käännökset
KÄÄNNÖS NYT -vuorolla; ilmoita "lukko vapaa" / "SIMU VAPAA". Proto-worktree /Users/Shared/Claude/wt/proto-siirtoseppa-kello.
Todistusajo: Natiivisepän korjattu versio /Users/Shared/Claude/wt/proto-natiiviseppa-tyokalut/tyokalut/todistusajo/todistusajo.sh
(odottaa komennon luvun ennen kuvaa; vanha kuvasi ennen kuin appi luki linssi-komennon). Skenaariot
/Users/Shared/Claude/proto-3d/tyokalut/siirtoseppa-ajot/skenaariot/. Valmiit ajoskriptit edellisen session scratchpadissa eivät säily:
kopioi kaava (proto-kaanna.sh + PROTO_APP_KOPIO, todistusajo --sha <käännös> --haara <commit>).

## HAARAT (proto-git, ei versionostoa)

| Haara | Kärki | Tila |
|---|---|---|
| siirtoseppa/rantakivet-hamara | 71c2080c9 | KUITATTU juna 180 (valkoiset rantakivet: DioraamaMaasto _HamaraKerroin 0,3) |
| siirtoseppa/kavely-monimesh | dc53ccd54 | KUITATTU juna 180 (kävelyosien kaikki mesh-solmut) |
| siirtoseppa/repliikit-v5 | c9da3b20d | SHA Natiivisepälle juna 180 (venepuhe ilman kuiskausta; vienti 200) |
| siirtoseppa/kelluva-tappi | 0f1d24980 | LAITURI-KIIRE TODENNETTU (50f2cf918), kuittausrivi PT:lle, SHA Natiivisepälle → juna 180 |
| siirtoseppa/vene-kuiva | d71ce2d4a | kelluva-tappi + vesimaski leimapuskurilla + Pulu piiloon veneessä; TODENNETTU (50f2cf918); PT päättää junan 180 |
| siirtoseppa/v47c | 7344767e7 | LR v47c kytkentä (pala 77689bce4a356885, esittely 95819c0630851d2f, mallien kuva_hamara); Linssit 1344/1344, LAAJA TESTI AJAMATTA; pohja rantakivet-hamara |
| siirtoseppa/diag-kivet | 362134280 | DIAG, EI JUNAAN (poikki piilota/nayta/lista/mustakorvaus/mallikirkkaus) |

## LAITURI-KIIRE (omistaja iPad TF 179: "ei pääse laiturilta eteenpäin, ei tule ohjaimia")

Juurisyyt (iPad-simu, todistus-laituri-tapit-179*, -kelluva-*):
1. Linnan koko ruudun näyttämökuva (DioraamaTaulu mk-dioraama-nakyma, PickingMode.Position, 29.9.) teki UiKerros.Peittaa:sta aina toden →
   SeikkailuTapit hylkäsi jokaisen kosketuksen (ei liikettä, katsetta eikä napautusta). Korjaus 6ccff76dd UiKerros.PeittaaMuu.
2. Vasen tappi oli 8.10. alkaen levossa opacity 0 ja 64 pt kulmassa Pulun alla. Korjaus b3dd4d6e7: TAPPI-pohjan mukaan himmeä levossa,
   kelluva kosketuksessa (OpasTapit.Tappi KelluvaAlku/Siirto/Loppu).
3. EnhancedTouch vain PalloKierron varassa → a1a5925d7 oma viitelaskettu Enable/Disable.
4. Pulu: reunakuva (SeikkailuTapit joka ruutu) ja linnan minipulu (DioraamaTaulu, 099a7f33d) piiloon pelaajan ja veneen ajaksi.
5. Kelluvan tapin irrotus kutsui HasPointerCapture(1<<20) → IndexOutOfRange, arvo jäi päälle (pelaaja käveli seinään); 0f1d24980.
Todiste a2efc0ce0 (todistus-laituri-kelluva-20261010-2114): veto vasemmalla LIIKUTTAA (juurisyy 1 korjattu), irrotusvika 5.
Kulmakiertotie 179:ssä EI toimi (älä anna omistajalle).
VALMIS: käännös 50f2cf918 (vene-kuiva d71ce2d4a ⊃ kelluva-tappi 0f1d24980), iPad-simu 0 poikkeusta. Pysyvä kosketustesti
skenaariot/olavinlinna-kosketus.txt (todistus-olavinlinna-kosketus-20261010-2131): 3 vetoa vasen liikuttaa, tappi palaa kulmaan,
2 vetoa oikea kääntää katseen, napautus tulee perille (osui seinään → kävelyä napautuksella EI todennettu: siirrä napautus lattiaan).
Vene (todistus-vene-kuiva-lopullinen-20261010-2134): kuiva, ei Pulua. Arkit proto-3d/lokit/arkki-siirtoseppa-vene-tappi-20261010/.
Aja kosketustesti jokaisen junan Olavinlinna-todisteessa.

## MUUT AVOIMET

- Laiturin vaalea laatta: ulkokuoren vedenalaiset vaakakolmiot (vierasvenelaituri, Karttasepän löytö) → LR v47d. Natiivi-discard
  (y < VesiY − 0,05 ja |n.y| > 0,9) vain jos LR ei ehdi. Tarkista samalla, miksi vesi ei peitä 0,25–0,5 m syvyyttä.
- v47c: aja `OLAVINLINNA_LAAJA=1 ./kaanna.sh KiinniJokaPisteessa` ennen kuittausta; kuvat iPadilla (portaat 43↔44, rantakivien hämäräkuva).
- Koko pelin läpiajo seuraavaksi (PT/omistaja: Olavinlinna ensin, sitten kippi, taidemuseo, kartta).

## OPITTUA

- Renderer.enabled ei kerro LODGroupin karsintaa (kuoren Kevyt/Huippu eivät piirry yhtä aikaa).
- SeikkailuHistoria kytkee ranta-1499:n renderin joka ruutu (r.enabled = ranta); piilotuskokeisiin forceRenderingOff.
- Valkoiset rantakivet = ympäristön rantakivet.glb päiväkuvalla hämärässä (kokeet 1–7, todistus-kivet-diag*).
- Natiivi piirsi tilasta vain glb:n ensimmäisen mesh-solmun; LR:n kävelyosat ovat solmu per pinta.

## PÄIVITYS 22.3x (nollauksen jälkeinen sessio)

- KUITATTU 180: siirtoseppa/v47d b51f3aefb (LR v47d: pala 8f0bba9b0f80d3fd, esittely 0df8a41e9b4ecec4; Linssit 1344/1344, laaja 2/2)
  ja siirtoseppa/lapipeluu-vahdit 25fe0ce70 (vene-kuivan päällä: Kuuntele-nappi piiloon pelaajan ajaksi, laatu-korvaajat-pankin
  suorat klipit äänivahdin rekisteriin; simulla vahdit OK, todistus-olavinlinna-vahdit-20261010-2224). SHA:t Natiivisepällä.
- Läpipeluu: todistus-olavinlinna-lapipeluu-20261010-2205 (kuva-arkki). Laiturin sininen möykkypinta = ympäristön rantakivet.glb
  hämäräkuvalla (ei v47d:n vika); LR teki rantakivet v2 (juna 181) → LR pyytää pelikuvan samasta laiturin kulmasta viennin jälkeen.
- KOSKETUSKOORDINAATIT: simu pystyssä, peli vaakana → tap/veto x = 1032 − y_vaaka, y = x_vaaka. Vanhat kosketusskenaariot osuivat
  vasemmalle puoliskolle (katsetta ei todennettu). Korjatut: skenaariot/olavinlinna-kosketus.txt, -lapipeluu.txt, -vahdit.txt.
- Botti: pelaaja-15+ siirtää ilman kävelyä ja kamera jää kappelin näkymään (vanha, ei junaa). SEURAAVA (PT): huoneiden 3–10 kuvat
  tarkistuspisteistä (tallennuksesta jatko) Julkaisijan simuvuorolla junan 180 jälkeen → mallivirheet LR:lle erinä (sijainti, mitä, kuva).
