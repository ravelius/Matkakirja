# Karttaseppä: luovutus 6.11.2026 klo 18.26 (KS)
Syy: tilinvaihto (PT 18.23, tilille vvi@vvi.fi). Korvaa kaikki aiemmat, ei viittauksia edellisiin. Pohja jatkossa `_tyo/karttaseppa/luovutus-koonti.md`: enintään 60 riviä.
Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 92ea0a945, varmuuskopio natiivi-backup karttaseppa/ajo-yhteinen-29). W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219. Remote natiivi-backup, ei origin. L = /Users/Shared/Claude/wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kohtalo on päätetty).
## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. **Ajo 29 valmis 18.29** (92ea0a945, L2, 197 s, 4/4 kuvaa, Shader error 0, error CS 0; `lokit/karttaseppa-yhteinen-29-b8-92ea0a945`). Parit ja viestit tehty, ks. AJON 29 TULOS. Uusia ajoja ei ennen PT:n sanaa (tilinvaihto). Seuraava numero 30.
3. Etäyhteys vain KK:lla. Hookin työlistarivit ovat PT:n työkalulla, en päivitä. Session id:t osoitekirjasta, ne voivat vaihtua tilinvaihdossa.
## AJO 28 (33ea85e3b, lokit/karttaseppa-yhteinen-28-b8-33ea85e3b, L2, 872 s, 31 kuvaa)
- **Eiffel haiv2:** katsottu suurennettuna: vino reuna rannassa poissa, koillisreunan läpi ei kuulta taloja. Parit `parit-yhteinen-28/kk/eiffel-alue.jpg` ja `eiffel-reuna.jpg` lähetetty KK:lle 18.2x; odottaa KK:n kuvakatsomusta ja omistajaa, ei junaan ennen sitä.
- **VS:** kansio, sha ja maavarjorivi välitetty; 23 kuvaa kv-*, minä en arvioinut. KovaVarjo-haku lokista: vain tuontirivi. Maavarjorivillä yksi tyhjä nimi (=11834), kerrottu VS:lle.
- **NUI:** kyltti-liike-1..4 välitetty, en arvioinut.
- Yksi `ArgumentOutOfRangeException` katsottu: Unityn SearchDatabase (haun indeksointi), ei pelikoodi; samanniminen myös ajossa 27 (pinoa ei tarkistettu). JU:n 11 unity.login poikkeusriviä ei käyty kaikkia läpi.
## AJON 29 SISÄLTÖ (kärki 92ea0a945, kaikki kokeena)
- **Pont d'Iéna "Vaalea kaista" (OMISTAJAN PÄÄTÖS 18.09):** viidestä siltaviivasta vain keskilinja (`bicycle=no`) piirtyy primary-tien levyisenä kaistana, muut neljä pois. `TaloAlue.IenanSilta` (35 m keskipisteestä 48.85982, 2.29208), `ElavaTyyli.cs` siltahaara. Palojen pääte `-pariisi2`. Palakoe oikeasta datasta z14–17 näytti yhden kaistan joen yli (`parit-yhteinen-28/palakoe-iena/koonti.jpg`); pelissä katsomatta.
- **Riemukaari #2172 "Kelpaa":** oletus `lod3-20261106/riemukaari` ja normaali, sävy 1.010 0.926 0.643. Kuitattu Codexille 741e22033.
- **Notre-Dame:** oletuspohja `pohja-ranta-vesi1` (raita, PT kuittasi 18.1x). Malli #2171 "Ei vielä": nykyinen pysyy, kuitattu c69dc6088; vahti ilmoittaa seuraavan toimituksen.
- **Kuvat:** silta-iena-kaista (kamera kuin ajon 26 silta-iena), raita-yla-oletus (kuin ajon 27 raita-yla), riemukaari-lod3 (kuin ajon 28 kv-riemukaari), kyltti-liike-5-halles (NUI).
## AJON 29 TULOS (parit `parit-yhteinen-29/kk/`, tehty `parit-yhteinen-28/tee-parit-29.py`)
- **Pont d'Iéna:** yksi kaista, viivat poissa (silta-iena, silta-iena-lahi). Lähetetty KK:lle, odottaa.
- **Riemukaari lod3:** toimii oletuksena, terävämpi kuin nykyinen (riemukaari, riemukaari-lahi). KK:lle huomiot, ei korjausta ilman sanaa: sivukaari näyttää vaalealta täytteeltä, reunalistassa katkoviivamainen juova oikealla.
- **Notre-Dame vesi1:** raitaa ei näy oletuksena (raita-yla), sama kuin ajon 27 vesi1; eroa tuovat VS:n kovat varjot. PT:lle kerrottu.
- **NUI:** kyltti-liike-5-halles välitetty, en arvioinut.
## RAITA (`laikka-vesi-20261106/syy.md`)
Syy todennettu ajossa 27: Notre-Damen pohjakuvan `pohja-ranta.png` punertavat pikselit; vesi1 (162912f91) poistaa ne. Heikko veden sävyn vaihto siniharmaasta oliiviin jää, ei korjattu.
## ODOTTAA KK:LTA (kuvat `parit-yhteinen-26/kk/`, ellei toisin mainita)
- **Sillat:** silta-iena (korvautuu ajon 29 kuvalla), -austerlitz, -beauvoir, -national, sillat-lista.txt (48/63 palaa). Almaa ja Bercyä ei katsottu suurennettuna.
- **Katettu vesi:** katettu-vesi.jpg, Richard-Lenoir poissa. Muut kaupungit jäävät vanhoihin paloihin.
- **Laivat:** pari `parit-yhteinen-25/kk/`, jos KK pyytää. **Eiffel:** ks. ajo 28.
## OMISTAJAN PÄÄTÖKSET VOIMASSA
- 16.46: Seinen litteät muodot "Kaikki pois (Suositus)"; oikea rakennus ei lähde, epäselvä KK:lle kuvan kanssa; ei junaan ennen kuin pari on käynyt KK:n ja omistajan kautta.
- 17.08: Off Paris Seine lähtee, ei poikkeusta. 17.24: Seinen kävely- ja metrosillat ohuina viivoina, pienet kadut pysyvät poissa, kuva ennen junaa. 18.09: ks. ajo 29.
- Lopputulos junaan (e23, -pariisi2, mallit) vain KK:n ja omistajan kuvan jälkeen. KK:n valtuus päättyi 15.51: mallit omistajan kortilla KK:n kautta. Malleista muuta Tripolle tai Codexille vain KK:n sanalla.
## MUUT ODOTTAVAT
- VS: parit ja arvio ajoista 26 ja 28.
- PT: koti-haaran tiedostot. Seuraamattomat omat luovutukset + `.claude/settings.local.json.ennen-kevennysta` (ei committiin, ei poisteta); omat commitit mainin edellä vain docs/raportit-kansiossa. Ei poistoja ennen sanaa.
- h=40 (48.83891,2.37506) jää joesta tunnistamatta; pienet h=3 ja h=4 (48.8606,2.2939) lähtevät, ilmakuvasta katsomatta. `poistuvat.txt` kattaa 48/63 palaa.
- Posti #2174 (kartan taivas, 167dff623): KK:n ja Codexin asia, ei minun.
## AUKI, MUIDEN KÄSISSÄ TAI EI KIIREELLINEN
Louvren haamu PT ja VS, ei omaa korjausta. Eiffel 85b VS. NUI:n kylttisyy NUI. Kärkilaskenta iPadilla mittaamatta. Tuileries'n ruskeat pisteet (pn-matala-2, noin 590,1437 ja 920,1432) tutkimatta. Pn-matala-2:n laikat arvioitu silmämääräisesti. Pont Neufin raita = kartan tie, kuitattu. Rannan kadun mukaan rajattu Eiffelin reuna olisi Codexin työ, ei tilausta ilman KK:n sanaa.
## TYÖTAVAT
- Ajotilaus JU:lle: UNITY b8, Y + kärki, skenaario, loki karttaseppa-yhteinen-NN-b8-<sha>, 1 rivi "ratkaisee". Laske kuvamäärä skenaariosta, älä muuta skenaariota tilauksen jälkeen.
- Parit samasta ajosta: `koemalli` malleille, `koepohja <alue> <kuva>` pohjakuville. Parityökalu `parit-yhteinen-28/tee-parit.py`, suurennos `zoom.py`.
- Kartta-testit `sh kaanna.sh <nimi>` (useita `"A|B"`). Palakoe: `PalakoeTesti.cs.txt` (`laikka-vesi-20261106`) → Kartta-testit/Testit/PalakoeTesti.cs, `PALAKOE_MVT=<mvt> PALAKOE_ULOS=<kansio> PALAKOE_PISTEET="lat,lon;..." sh kaanna.sh Palakoe`, ei committiin.
- Python /opt/homebrew/bin/python3 (numpy ja PIL eivät löydy -I:llä). Kuvat 2752 × 2064. Pelin mvt: /private/tmp/*/Matkakirja/*/laatat/elava/mvt/<z>/<x>/<y>.pbf; jpg:t häviävät ajon mukana (JU kopioi tilauksesta `palat/`-alikansioon, haku `laatat/elava/e2*/{z}/{x}/{y}.jpg`).
- Paikan kohteet ilman verkkoa: `laikka-vesi-20261106/tasot-paikka.py lat lon sade_m`, OSM-ote `natiiviseppa/pariisi-talot/osm.json`. Ilmakuva `hae-orto.py`, vain katsottavaksi. OpenFreeMapin robots 403: ei hakua.
- Parit KK:lle ilman selitekaistaa, samassa vuorokaudenajassa (`parit-yhteinen-26/tee-kk.py`). `elavakartta rakennukset nyt` ohittaa veneehdon. Lähteen tyylikirjamuutos vaatii `node tools/tyylikirja.mjs`.
## OPIT
- Kuva todistaa korjauksen vain, jos vika näkyy samalta kameralta ennen korjausta. Rajaus täysikokoisena, koko kuva ensin; katso kuvan muutkin kohteet.
- Poissulkukokeen listaan kaikki kerrokset; laske ensin, mitkä alueet kattavat pisteen. Tarkista ehdon osuma aineistosta listana ennen ajoa.
- Sävyä laskiessa katso koodista käytössä oleva tiedosto. GLB:n normaalivoimaa peli ei lue (varjostimen _NormaaliVoima 0,6).
- Palojen piirto oikeasta datasta ennen ajoa. `aja`-komennon kolmas luku ei skaalaudu suoraan; komento asettaa katsepisteen, kamera on sen takana. Skenaarion viimeisen komennon perään odota.
- Häivytyksessä katso rajan molemmat puolet. zsh:ssa kirjoita ${C}:refs. Viestit voivat hukkua nollauksen yli: katso muiden sha:t myös haaroista.
## LOPPUTESTIT (siirrä jokaiseen luovutukseen, kunnes PT muuta sanoo)
1. Saapumislento laitteella (2.209, KK, PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
