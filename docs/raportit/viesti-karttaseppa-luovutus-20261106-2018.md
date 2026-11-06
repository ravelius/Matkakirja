# Karttaseppä: luovutus 6.11.2026 klo 20.18 (KS)
Syy: konteksti yli pehmeän rajan, luonteva tauko ajon 30 jälkeen. Korvaa kaikki aiemmat, ei viittauksia edellisiin. Pohja jatkossa `_tyo/karttaseppa/luovutus-koonti.md`: enintään 60 riviä.
Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 38ab4d14d, varmuuskopio natiivi-backup karttaseppa/ajo-yhteinen-30). W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, 0ab14d552). Remote natiivi-backup, ei origin. L = /Users/Shared/Claude/wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kohtalo on päätetty).
## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. **Lue `_tyo/karttaseppa/lahialue-20261106/LUOKITUS.md` KOKONAAN:** PT:n sitova järjestys ja ajon 31 kaikki pyynnöt. Seuraava työ on ryhmä 1 (Eiffel, Montparnasse), aloittamatta. Kerroin PT:lle 20.16 aloittavani sen.
3. PT:n vastaus ND:n ja Iénan parien viennistä KK:lle: odottaa (viesti 20.16). Ei KK:lle ilman PT:n sanaa.
4. Etäyhteys vain KK:lla. Hookin työlistarivit ovat PT:n työkalulla, en päivitä. Session id:t list_sessionsista, ne voivat vaihtua.
## AJO 30: VALMIS JA KATSOTTU (20.15)
- Kansio `lokit/esikatselu-20261106-195533-2` (JU:n nimi, ei karttaseppa-yhteinen-30), 28 kuvaa + 5 tallennetta. NUI ja VS saivat kansion 20.15; odotan heidän arvioitaan, tulokset heiltä PT:lle.
- Arvio `_tyo/karttaseppa/parit-yhteinen-30/ARVIO.md`, parit `parit-yhteinen-30/kk/`, skripti `tee-parit-30.py`. Iéna: 7 px, Austerlitz 8 px, pohjoispää kunnossa, **eteläpää loppuu pyöreänä Eiffelin kiveykseen** (ei korjattu). ND #2175: raita poissa, pinta piirretympi, leveneminen +12 % (vanha +17 %; omistajan tilaama, mainittava KK:lle). Nykyinen pysyy oletuksena.
- Skenaarion tilat: KS:n kuvat `viistousva 0` ja `taivas kartta maalattu 0`; VS:n listat vaihtavat niitä; NUI:n tallenteet molemmat pois.
## AJO 31 (vasta ryhmä 1 valmiina, JU:n vuorolla; yksi lähialueryhmä per ajo)
Listattu LUOKITUS.md:ssä: NUI 99b556890 + kuva kerronnan ajalta; VS varjo-aariviiva 3d6e35696 + sk-varjo-aariviiva.txt; VS taivas v2 9af846cec + sk-taivas-codex.txt; VS saumat-y f9fb1893d + sk-saumat-y.txt **listan loppuun**, "seuraavaan ajoon, johon mahtuu". Tarkista haarojen yhteensopivuus kuivakokeella. VS haluaa tiedon, millä taivaalla ajo meni, ja kansion kuvien jälkeen. VS lähettää myöhemmin sillan pään liu'un ja Palais Bourbonin kameran.
## LÄHIALUEEN HUOMIOT
- Pompidou ja Saint-Sulpice: kartta ei tue poistoa, vain puut. TDF:n varmistus kuvasta ennen kuin sanon sen (PT); Grand Palais: mittaa verkko ennen KK:ta. Mittaustyökalut `lahialue-20261106/` (etaisyydet.py, hae-orto.py, rajaa-kaikki.py). `kv-*`-kuvat ajossa 28.
- Pystysauma 2,3291: vastattu VS:lle 20.0x (mitattu reunaero, ei kuvatodistetta, Montmartren reunassa voi näkyä).
- Maskit: `nahtavyyssarja/alueet/<id>/` + `kohteet-pariisi.json`, palat `natiiviseppa/pariisi-talot/tee-palat.py` aina uuteen kansioon. Pohjat Codexin (24b).
## OMISTAJAN JA PT:N PÄÄTÖKSET VOIMASSA
- **Eiffelin reuna 18.49 "Kelpaa":** haiv2 oletus W 0ab14d552 ja Y 1ab552a69 (oletuksena ajamatta, koepohjana ajo 28; W kääntämättä). PT: avoin juna on runko 603d4213a (julkaisija/runko-219-muisti), jossa ei ole Eiffeliä eikä Nahtavyysalue.cs:ää; häivytys lähtee samalla kun Eiffel ja Pariisin mallit menevät runkoon. Ei omaa vientiä, ei rungon kosketusta.
- **Riemukaari #2172 "Kelpaa" 18.09:** oletus lod3, kokeena. Viat 1–6 Codexilla (741e22033, 08aef8575). Korjattu versio tulee uuteen kansioon.
- **Notre-Dame #2171 "Ei vielä":** korvautuu #2175:n arviolla. Oletuspohja `pohja-ranta-vesi1`.
- **Pont d'Iéna "Vaalea kaista" 18.09**, muut neljä viivaa pois.
- 16.46: Seinen litteät muodot "Kaikki pois"; oikea rakennus ei lähde, epäselvä KK:lle kuvan kanssa. 17.08: Off Paris Seine lähtee. 17.24: Seinen kävely- ja metrosillat ohuina viivoina, pienet kadut pois, kuva ennen junaa.
- Lopputulos junaan (e23, -pariisi3, mallit) vain KK:n ja omistajan kuvan jälkeen. KK:n valtuus päättyi 15.51: mallit omistajan kortilla KK:n kautta. Malleista muuta Tripolle tai Codexille vain KK:n sanalla.
## ODOTTAA KK:LTA (kuvat `parit-yhteinen-26/kk/`, ellei toisin mainita)
- **Sillat:** -austerlitz, -beauvoir, -national, sillat-lista.txt (48/63 palaa). Almaa ja Bercyä ei katsottu suurennettuna. **Pont d'Iéna:** korvautuu ajon 30 kuvalla `parit-yhteinen-30/kk/silta-iena-austerlitz.jpg`.
- **Katettu vesi:** katettu-vesi.jpg, Richard-Lenoir poissa. Muut kaupungit jäävät vanhoihin paloihin.
- **Laivat:** pari `parit-yhteinen-25/kk/`, jos KK pyytää.
- **Notre-Dame vesi1:** raitaa ei näy oletuksena (`parit-yhteinen-29/kk/raita-yla.jpg`); eroa tuovat VS:n kovat varjot.
## MUUT ODOTTAVAT
- VS: parit ja arvio ajoista 26, 28 ja 30.
- PT: koti-haaran tiedostot. Seuraamattomat omat luovutukset + `.claude/settings.local.json.ennen-kevennysta` (ei committiin, ei poisteta); omat commitit mainin edellä vain docs/raportit-kansiossa. Ei poistoja ennen sanaa.
- h=40 (48.83891,2.37506) jää joesta tunnistamatta; pienet h=3 ja h=4 (48.8606,2.2939) lähtevät, ilmakuvasta katsomatta. `poistuvat.txt` kattaa 48/63 palaa.
- Posti #2174/#2178 (kartan taivas): KK:n, VS:n ja Codexin asia, ei minun.
- Raita (`laikka-vesi-20261106/syy.md`): heikko veden sävyn vaihto siniharmaasta oliiviin jää, ei korjattu.
## AUKI, MUIDEN KÄSISSÄ TAI EI KIIREELLINEN
Louvren haamu PT ja VS, ei omaa korjausta. Eiffel 85b VS. NUI:n kylttisyy NUI. Kärkilaskenta iPadilla mittaamatta. Tuileries'n ruskeat pisteet (pn-matala-2, noin 590,1437 ja 920,1432) tutkimatta. Pn-matala-2:n laikat arvioitu silmämääräisesti. Pont Neufin raita = kartan tie, kuitattu. Rannan kadun mukaan rajattu Eiffelin reuna olisi Codexin työ, ei tilausta ilman KK:n sanaa. JU:n ajon 28 unity.login 11 poikkeusriviä ei käyty kaikkia läpi.
## TYÖTAVAT
- Ajotilaus JU:lle: UNITY b8, Y + kärki, skenaario, loki karttaseppa-yhteinen-NN-b8-<sha>, 1 rivi "ratkaisee". Laske kuvamäärä skenaariosta, älä muuta skenaariota alkaneen ajon jälkeen; ennen alkua uusi tilaus korvaa. Muiden lisät: lue lista ja oletustilat, NUI:n kamerat viimeisenä.
- Parit samasta ajosta: `koemalli` malleille, `koepohja <alue> <kuva>` pohjakuville. Parityökalu `parit-yhteinen-28/tee-parit.py`, malli `tee-parit-29.py`, suurennos `zoom.py`.
- Kartta-testit `sh kaanna.sh <nimi>` Kartta-testit-kansiosta (useita `"A|B"`). Palakoe: `PalakoeTesti.cs.txt` (`laikka-vesi-20261106`) → Kartta-testit/Testit/PalakoeTesti.cs, `PALAKOE_MVT=<mvt> PALAKOE_ULOS=<kansio> PALAKOE_PISTEET="lat,lon;..." sh kaanna.sh Palakoe`, ei committiin.
- Python /opt/homebrew/bin/python3 (numpy ja PIL eivät löydy -I:llä). Kuvat 2752 × 2064. Pelin mvt: /private/tmp/*/Matkakirja/*/laatat/elava/mvt/<z>/<x>/<y>.pbf.
- Paikan kohteet ilman verkkoa: `laikka-vesi-20261106/tasot-paikka.py lat lon sade_m`, OSM-ote `natiiviseppa/pariisi-talot/osm.json`. Ilmakuva `hae-orto.py`, vain katsottavaksi. OpenFreeMapin robots 403: ei hakua.
- Parit KK:lle ilman selitekaistaa, samassa vuorokaudenajassa (`parit-yhteinen-26/tee-kk.py`). `elavakartta rakennukset nyt` ohittaa veneehdon. Lähteen tyylikirjamuutos vaatii `node tools/tyylikirja.mjs`.
- Codex-posti: worktree karttaseppa-postilaatikko, `checkout --detach origin/claude/postilaatikko`, commit, `push origin HEAD:claude/postilaatikko`.
## OPIT
- Kuva todistaa korjauksen vain, jos vika näkyy samalta kameralta ennen korjausta. Rajaus täysikokoisena, koko kuva ensin; katso kuvan muutkin kohteet.
- Ennen "junaan"-lupausta katso, onko riippuvuus rungossa (`ls-tree`): Pariisin kohteet ovat vain koehaaroissa.
- Poissulkukokeen listaan kaikki kerrokset; tarkista ehdon osuma aineistosta listana ennen ajoa. Sävyä laskiessa katso koodista käytössä oleva tiedosto. GLB:n normaalivoimaa peli ei lue.
- Palojen piirto oikeasta datasta ennen ajoa. `aja`-komennon kolmas luku ei skaalaudu suoraan. Skenaarion viimeisen komennon perään odota.
- Bash-työkalu: `cat > tiedosto` ilman heredocia jää odottamaan. JU:n ajokansio voi olla `esikatselu-*-N`: katso `ajo.log`, älä odota tilattua nimeä; pgrepiin ei voi luottaa.
- zsh: `=sana` laajenee, `for p in "a b c"` ei jaa sanoja. Viestit voivat hukkua nollauksen yli: katso muiden sha:t myös haaroista.
## LOPPUTESTIT (siirrä jokaiseen luovutukseen, kunnes PT muuta sanoo)
1. Saapumislento laitteella (2.209, KK, PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
