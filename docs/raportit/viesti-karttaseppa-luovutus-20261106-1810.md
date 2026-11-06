# Karttaseppä: luovutus 6.11.2026 klo 18.10 (KS)
Syy: konteksti 35 % (PT:n kova raja). Korvaa kaikki aiemmat, ei viittauksia edellisiin. Pohja jatkossa `_tyo/karttaseppa/luovutus-koonti.md`: enintään 60 riviä.
Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 33ea85e3b, varmuuskopio natiivi-backup karttaseppa/ajo-yhteinen-28). W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219. Remote natiivi-backup, ei origin. L = /Users/Shared/Claude/wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kohtalo on päätetty).
## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. Ajo 28 tilattu JU:lta 18.07: Y 33ea85e3b, `sk-pariisi-yhteinen-28.txt` (31 kuvaa, alkoi 18.06), loki karttaseppa-yhteinen-28-b8-33ea85e3b. Älä yhdistä Y:hen ajon aikana.
3. Etäyhteys vain KK:lla. Hookin työlistarivit ovat PT:n työkalulla, en päivitä.
## AJON 28 JÄLKEEN
- **Eiffel:** pari ei-bourdonnais-nyt | -haiv2 ja ei-alue-nyt | -haiv2 KK:lle (`parit-yhteinen-27/tee-parit.py` mallina). Ajon 27 haiv1 toi koillisreunalle kuultavat talot; haiv2 c45221c01: avoimen rannan kivireuna 30 m (y < 75 tai luode), muu 5 m, `eiffel-haivytys/tee-haivytys.py`. Tarkista, ettei vino reuna palannut ja ettei talot kuulta. Jos ei korjaannu alfalla, kerro KK:lle; kadun mukaan rajattu reuna olisi Codexin työ, ei tilausta ilman KK:n sanaa.
- **VS (local_3b36fe96-0199-4b17-9eb4-46a882ce7399):** kansio ja sha; lokista `MATKAKIRJA maavarjot` ja shader-virheet nimellä KovaVarjo; 23 kuvaa kv-*. Käännösvirhe VS:lle.
- **NUI (local_a3754ed8-f155-43b5-9095-b51e9e29ff53):** lokin polku, kuvat kyltti-liike-*. Käännösvirhe NUI:lle.
- **Ajo 29:** NUI:n viides kuva `lisa-kyltti-halles.txt` (ajo 28 alkoi 18.06 ilman sitä, 31 kuvaa).
- Rivi PT:lle, päivitä `laikka-vesi-20261106/syy.md`, jos raidasta tulee uutta.
## RAITA (`laikka-vesi-20261106/syy.md`, parit `parit-yhteinen-27/kk/raita-*`)
Syy todennettu ajossa 27: Notre-Damen pohjakuvan `pohja-ranta.png` punertavat pikselit. Koekuva `pohja-ranta-vesi1` (162912f91) poistaa ne; PT katsoi raita-yla:n ja kuittasi 18.1x: tee siitä Notre-Damen oletus kokeen haarassa ajoon 29, ei junaan (Nahtavyysalue.cs Pohja). Heikko veden sävyn vaihto siniharmaasta oliiviin jää, ei korjattu.
## TEE AJON 28 JÄLKEEN (OMISTAJAN PÄÄTÖS 18.09, ei ennen ajon loppua; ajoon 29, kokeena, ei junaan)
1. **Riemukaari #2172 "Kelpaa (Suositus)":** korvaa nykyisen kokeessa: Nahtavyysalue.cs:n Riemukaaren Tiedosto ja sävy lod3-20261106:een (sävy 1.010 0.926 0.643, sama `koemalli`:n kanssa, tarkista `tee-lod-v3.py`). Kuitattu Codexille 741e22033.
2. **Notre-Dame #2171 "Ei vielä (Suositus)":** nykyinen pysyy. Kuitattu c69dc6088; vahti ilmoittaa seuraavan toimituksen.
3. **Pont d'Iéna "Vaalea kaista (Suositus)":** kokeile ajosillan tapaista kaistaa kuten Pont d'Austerlitzilla, vain -pariisi1-paloilla; kuva KK:lle (kamera `komento aja 48.85972 2.29194 0.0015 2`, kallista 0, suunta 0). Sillat: `ElavaTyyli.OhutSilta`, `ViivaSeinella`. Muista uusi pääte, jos palat muuttuvat. Pont d'Iénan viivat eivät saa jäädä kaistan rinnalle sotkuksi.
4. NUI `lisa-kyltti-halles.txt` samaan ajoon.
## ODOTTAA KK:LTA (kuvat `parit-yhteinen-26/kk/`)
- **Sillat:** silta-iena, -austerlitz, -beauvoir, -national, sillat-lista.txt (48/63 palaa). Almaa ja Bercyä ei katsottu suurennettuna.
- **Katettu vesi:** katettu-vesi.jpg, Richard-Lenoir poissa. Muut kaupungit jäävät vanhoihin paloihin.
- **Laivat:** pari `parit-yhteinen-25/kk/`, jos KK pyytää.
## OMISTAJAN PÄÄTÖKSET VOIMASSA
- 16.46: Seinen litteät muodot "Kaikki pois (Suositus)"; oikea rakennus ei lähde, epäselvä KK:lle kuvan kanssa; ei junaan ennen kuin pari on käynyt KK:n ja omistajan kautta.
- 17.08: Off Paris Seine lähtee, ei poikkeusta. 17.24: Seinen kävely- ja metrosillat ohuina viivoina, pienet kadut pysyvät poissa, kuva ennen junaa.
- Lopputulos junaan (e23, -pariisi1, mallit) vain KK:n ja omistajan kuvan jälkeen. KK:n valtuus päättyi 15.51: mallit omistajan kortilla KK:n kautta. Malleista muuta Tripolle tai Codexille vain KK:n sanalla.
## MUUT ODOTTAVAT
- VS: parit ja arvio ajosta 26 (kansio ja sha viety).
- PT: koti-haaran tiedostot. 54 seuraamatonta omaa luovutusta + `.claude/settings.local.json.ennen-kevennysta` (ei committiin, ei poisteta); 22 omaa commitia mainin edellä vain docs/raportit-kansiossa. Ei poistoja ennen sanaa.
- h=40 (48.83891,2.37506) jää joesta tunnistamatta; pienet h=3 ja h=4 (48.8606,2.2939) lähtevät, ilmakuvasta katsomatta. `poistuvat.txt` kattaa 48/63 palaa.
## AUKI, MUIDEN KÄSISSÄ TAI EI KIIREELLINEN
Louvren haamu PT ja VS, ei omaa korjausta. Eiffel 85b VS. NUI:n kylttisyy NUI. Kärkilaskenta iPadilla mittaamatta. Tuileries'n ruskeat pisteet (pn-matala-2, noin 590,1437 ja 920,1432) tutkimatta. Pn-matala-2:n laikat arvioitu silmämääräisesti. Pont Neufin raita = kartan tie, kuitattu.
## TYÖTAVAT
- Ajotilaus JU:lle: UNITY b8, Y + kärki, skenaario, loki karttaseppa-yhteinen-NN-b8-<sha>, 1 rivi "ratkaisee". Laske kuvamäärä skenaariosta, älä muuta skenaariota tilauksen jälkeen. Seuraava numero 29.
- Parit samasta ajosta: `koemalli` malleille, `koepohja <alue> <kuva>` pohjakuville.
- Kartta-testit `sh kaanna.sh <nimi>` (useita `"A|B"`). Palakoe: `PalakoeTesti.cs.txt` (`laikka-vesi-20261106`) → Kartta-testit/Testit/PalakoeTesti.cs, `PALAKOE_MVT=<mvt> PALAKOE_ULOS=<kansio> PALAKOE_PISTEET="lat,lon;..." sh kaanna.sh Palakoe`, ei committiin.
- Python /opt/homebrew/bin/python3 (numpy ja PIL eivät löydy -I:llä). Kuvat 2752 × 2064. Pelin mvt: /private/tmp/*/Matkakirja/*/laatat/elava/mvt/<z>/<x>/<y>.pbf; jpg:t häviävät ajon mukana (JU kopioi tilauksesta `palat/`-alikansioon, haku `laatat/elava/e2*/{z}/{x}/{y}.jpg`).
- Paikan kohteet ilman verkkoa: `laikka-vesi-20261106/tasot-paikka.py lat lon sade_m`, OSM-ote `natiiviseppa/pariisi-talot/osm.json`. Ilmakuva `hae-orto.py`, vain katsottavaksi. OpenFreeMapin robots 403: ei hakua.
- Parit KK:lle ilman selitekaistaa, samassa vuorokaudenajassa (`parit-yhteinen-26/tee-kk.py`). `elavakartta rakennukset nyt` ohittaa veneehdon. Lähteen tyylikirjamuutos vaatii `node tools/tyylikirja.mjs`.
## OPIT
- Kuva todistaa korjauksen vain, jos vika näkyy samalta kameralta ennen korjausta. Rajaus täysikokoisena, koko kuva ensin; katso kuvan muutkin kohteet.
- Poissulkukokeen listaan kaikki kerrokset: raita haettiin kartasta ja kerroksista, vaikka nähtävyyden pohjakuva peitti kohdan. Laske ensin, mitkä alueet kattavat pisteen.
- Tarkista ehdon osuma aineistosta listana ennen ajoa (`class=river` toi kanavien sillat); koko kartan ehto vesikaupungista. Vesialueen OSM-id erottaa Seinen kanavista.
- Sävyä laskiessa katso koodista käytössä oleva tiedosto (ND: paletti-v2/notre-dame.bytes). GLB:n normaalivoimaa peli ei lue (varjostimen _NormaaliVoima 0,6).
- Palojen piirto oikeasta datasta ennen ajoa. `aja`-komennon kolmas luku ei skaalaudu suoraan, mittaa tunnetuista kohteista; komento asettaa katsepisteen, kamera on sen takana. Skenaarion viimeisen komennon perään odota.
- Häivytyksessä katso rajan molemmat puolet: nurmen reuna sumeni leveällä häivytyksellä, siksi eri leveys kivelle ja nurmelle; värin luku muutaman pikselin sisältä, koska reunassa voi olla ohut juova.
- zsh:ssa kirjoita ${C}:refs. Viestit voivat hukkua nollauksen yli: katso muiden sha:t myös haaroista, kun PT mainitsee ne.
## LOPPUTESTIT (siirrä jokaiseen luovutukseen, kunnes PT muuta sanoo)
1. Saapumislento laitteella (2.209, KK, PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
