# Puyin kaavun käsipito – vastaanottajan pelitestiin, 28.10.2026

Korjattu `jump_robe` ja `stairs_robe` molemmille Puyi-malleille. Vasen käsi tarttuu todelliseen helman reunaan ennen nostoa. Etusormi ja peukalo on kohdistettu kankaaseen; muut sormet kiertyvät reunan alle. Tämä on paikallisesti tarkistettu toimitus PK:n pelivertailuun. KK:n ja omistajan hyväksyntä puuttuu.

## Käyttöönotto

1. Varmista lähtömalli manifestia vasten. Lähteenä vastaanottajan `hahmot-v11-koe`-mallit, kopiot säilyvät muuttumattomina T7:llä.
2. Aja `python3 tools/apply_robe_handhold.py VANHA.glb morph/perus/morph-manifest.json UUSI.glb` (viittamallille `morph/viitta/`). Apuohjelma käyttää vain Pythonin vakiokirjastoa. Se kieltäytyy ylikirjoittamasta tiedostoja ja tarkistaa geometrian, sidonnan, luurangon sekä aiemman morfin. Asennuksia ei tarvita.
3. Tuo vastaava `motions/puyi-perus-liikkeet.glb` tai `motions/puyi-liikkeet.glb` nykyisellä nimiperusteisella tuonnilla. Paketti sisältää vastaanottajan nykyiset 11 liikeleikettä: vain `jump_robe` ja `stairs_robe` ovat muuttuneet. Muut yhdeksän säilyvät. Älä poista päämallin tai muiden aiempien toimitusten muita leikkeitä.
4. Päivitä morfi ja liikkeet yhdessä. Alkuperäinen `robeHemLiftLeft` säilyy muuttumattomana indeksissä 0. Lisätty `robeHemJumpForward` on indeksissä 1. Hypyssä painot ovat `[nosto, nosto]`; portaissa `[1, 0]`. Molemmat nollataan muun liikkeen aikana vastaanottajan aiemmin kuvaaman lukijan käytännön mukaan.

`models/` sisältää apuohjelmalla vastaanottajan tarkasta lähtömallista tehdyt täydet tarkistusmallit. Niitä ei tarvitse käyttää koko päämallin korvaamiseen. GLB:t toimitetaan T7-polulla, eivät Gitissä. Pelikoodiin ei ole tehty muutoksia.

## Liikkeen ajoitus

Hyppy: tarttuminen 0,035–0,12 s; nosto 0,12–0,30 s; täysi pito 0,30–0,62 s; lasku kädessä 0,62–0,72 s; otteen avaus ja käden palautus 0,72–0,84 s. Kankaan nousu ei ala ennen otetta. Portaissa ote säilyy koko silmukan ajan.

Muuttuvat vain vasemman olkapään, käsivarren, ranteen ja sormien rotaatiokanavat sekä morfipainot. Jalat, vartalon liike, viitan luut, muiden leikkeiden kanavat, alkuperäiset pintaverkot, UV:t, ihon painot ja materiaalit säilyvät. Uusi hyppymorfi siirtää nostettua helmaa myös käden ulottuville eteen ja sivulle; portaissa käytetään alkuperäistä nostomorfia.

## Tarkistus ja rajat

- 961 kirjoitettua asentoa neljässä korjatussa leikkeessä; ei venytettyjä luita. Täyden pidon kohdistus läpäisee numeerisen tarkistuksen.
- Tallennetusta GLB:stä uudelleen luettuna suurin ero kirjoittajan asentoon noin 0,077 mm; muiden kehonosien kanavien ero 0.
- Kaikki vanhat päämallin accessor-taulukot säilyvät tavutarkasti. Lisämorfin asentaja on kokeiltu todellisilla vastaanottajan lähteillä.
- Tarkistuskuvat edestä ja vasemmalta: 0,30 / 0,46 / 0,62 / 0,69 s. Erilliset lähikuvat ja portaiden kuvat. PK:n vanhat pelikuvat rinnalla täsmällisinä leikeaikoina 0,403 / 0,516 / 0,693 s; paikallisen kuvan kamera ja valaistus eivät ole sama kuin pelissä.
- Paikallisen viite-esteen tarkistuksessa ei uusia osumia. Viittamallin alkuperäinen noin 0,16 mm lattiarajan alitus säilyy; tiukka 0,10 mm lattiatoleranssi ei siten läpäise itsenäisenä väitteenä. Jalkojen kärjet ovat muuttumattomat. Peli käyttää omaa juuriliikettään ja maahan sovitustaan.
- Sormien ja avoimen, taittuvan kankaan etumerkillinen pintatesti ei todista koko hahmon läpileikkaamattomuutta. Reunan alle kiertyvät sormet tuottavat myös negatiivisia etäisyyksiä. Tarkistusraportit säilytetään kokonaan; vastaanottajan samojen kameroiden pelivertailu tarvitaan.
- Kuvat ovat kevyitä paikallisia CPU-kuvia, eivät pelin PBR-valaistuksen hyväksyntä. Ei videorenderöintiä. Ei uusia Tripo-kutsuja tai krediittejä.

Viitan aiemmin raportoidut jump_robe-reiät ratkaistiin vastaanottajan Cull Off -korjauksella. Tässä paketissa ei vaihdeta viitan ihon painotusta. Uusi liito-/siipiasentokorjaus toimitetaan erikseen.
