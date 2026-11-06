# Karttaseppä: luovutus 6.11.2026 klo 20.40 (KS)
Syy: konteksti yli pehmeän rajan, luonteva tauko ajon 31 tilauksen jälkeen. Korvaa kaikki aiemmat, ei viittauksia edellisiin. Pohja jatkossa `_tyo/karttaseppa/luovutus-koonti.md`: enintään 60 riviä.
Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 08f5ea7bf, varmuuskopio natiivi-backup karttaseppa/ajo-yhteinen-31). W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, eb4fa95d2). Remote natiivi-backup, ei origin. L = /Users/Shared/Claude/wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kohtalo on päätetty).
## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. **Ajo 31 tilattu JU:lta 20.38, ei vielä valmis:** loki `lokit/karttaseppa-yhteinen-31-b8-08f5ea7bf` (voi olla `esikatselu-*-N`, katso `ajo.log`). Skenaario `sk-pariisi-yhteinen-31.txt`, 66 kuvaa + 25 tallennetta; kokoaja `parit-yhteinen-31/tee-skenaario.py <sha> varjo`. Odota JU:n viestiä.
3. **Kun ajo on valmis:** katso kuvat täysikokoisina, tee parit `parit-yhteinen-31/kk/` (`r1-eiffel-*-nyt | -uusi`, sama `r1-mp-*`, ilman selitekaistaa; malli `parit-yhteinen-30/tee-parit-30.py`). Ryhmän 1 parit **PT:lle ennen KK:ta**. Sitten kansio VS:lle (av-*, mc-*, se-*, sf-*; kerro: taivas v2 9af846cec, maalattu kytkin päällä mc- ja saumoissa) ja NUI:lle (kyltti-kerronta: kuvan pitää tulla ennen lokin riviä "ui liiku: esiin", muuten ajo ei todista; kyltti31-*; 'UI-kello peliajassa' lokissa).
4. **Jos VS:n varjostin 3d6e35696 kaataa käännöksen tai kuvat:** PT:n sana: ota pois, aja muu, rivi VS:lle ja PT:lle. Varjostin ajamatta. Sen jälkeen ryhmä 2 (LUOKITUS.md): yksi lähialueryhmä per ajo. VS lähettää myöhemmin sillan pään liu'un ja Palais Bourbonin kameran.
6. Etäyhteys vain KK:lla. Hookin työlistarivit ovat PT:n työkalulla, en päivitä. Session id:t osoitekirjasta.
## RYHMÄ 1: TEHTY, AJAMATTA (`lahialue-20261106/ryhma1/RYHMA1.md`)
- **TDF EI ole etujalan kortteli** (kerrottu PT:lle): se on jo maskin alla, paloissa ei mitään. Kortteli = way/69034126, 120, 173, 153, 149: asuintaloja 34–57 m jalanjäljestä, malli 2,4× oikea. LUOKITUS.md:n Eiffel-rivi vanhentunut, korjattu merkinnällä.
- Montparnasse: Monoprixin kortteli, 25 m:n sääntö: 79621484, 246, 921, 999, 362 (Monoprix 4260 m²), 758, 577, 834 + orpo 658. 212 ja 597 jäävät. PT: kokeena ok, parit ajosta 31. Monoprixin poisto on KK:n päätös parin perusteella.
- palat-v11-ryhma1 (`_pois`, syöte palat-v11-syote, skripti tee-palat-v11-ryhma1.zsh): 14 taloa vähemmän, 6 palaa eri. Puut 6 + 6 `ryhma1/tee-puut.py`: W eb4fa95d2, Y 9c21f9757. Skenaariossa pari samasta ajosta: `talot kansio v10` + `ndpuut 0` | `v11` + `ndpuut 1`.
- Tarkista kuvasta: peittävätkö puut etujalan 70°:ssa, takaseinät Monoprixin takana, irtoavatko puut maasta (MaanpintaH 90). Työkalut `ryhma1/kartta-talot.py`, `palasta.py`, `ehdokkaat.py`.
- Iéna d8af34b86 (-pariisi4): eteläpää 25 m pidemmäksi pohjan alle (läpinäkymätön noin 15 m aineiston päästä). Kuva `silta-iena-etela`, sama kamera kuin ajon 30 silta-iena-paa; vain Y:ssä, kuten pohjoispääkin.
## AJO 31:N SISÄLTÖ (Y)
VS f9fb1893d (taivas v2 + saumat), VS 3d6e35696 (varjo, PT: kyllä), NUI 99b556890 poimittu f143ec2e5, NUI 166378891 poimittu 76a04625f (**jää pois, kun Y kootaan junaan**, kuten 33ea85e3b). Järjestys: NUI liike ja kerronta, ryhmä 1, Iéna, varjo, taivas, saumat, `ui lentopiilo pois`, viistousva ja taivas 0, kyltti-31 viimeisenä. Saumat-lista palauttaa portaat, kallistuksen ja kerroksen.
Ajo 30 katsottu: kansio `lokit/karttaseppa-yhteinen-30-b8-38ab4d14d`, arvio `parit-yhteinen-30/ARVIO.md`. Parit KK:lla PT:n sanalla; ND-malli ei vaihdu ilman omistajan sanaa. NUI:n ja VS:n arviot heiltä PT:lle.
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
- Ennen väitettä "tuo talo näkyy kuvassa" katso paloista, onko talo olemassa (`palasta.py`): maskin alla oleva ei näy. TDF-väite oli väärä.
- Kuva todistaa korjauksen vain, jos vika näkyy samalta kameralta ennen korjausta. Rajaus täysikokoisena, koko kuva ensin; katso kuvan muutkin kohteet.
- Ennen "junaan"-lupausta katso, onko riippuvuus rungossa (`ls-tree`): Pariisin kohteet ovat vain koehaaroissa.
- Poissulkukokeen listaan kaikki kerrokset; tarkista ehdon osuma aineistosta listana ennen ajoa. Sävyä laskiessa katso koodista käytössä oleva tiedosto. GLB:n normaalivoimaa peli ei lue.
- Palojen piirto oikeasta datasta ennen ajoa. `aja`-komennon kolmas luku ei skaalaudu suoraan. Skenaarion viimeisen komennon perään odota.
- Bash-työkalu: `cat > tiedosto` ilman heredocia jää odottamaan. JU:n ajokansio voi olla `esikatselu-*-N`: katso `ajo.log`, älä odota tilattua nimeä; pgrepiin ei voi luottaa.
- zsh: `=sana` laajenee, `for p in "a b c"` ei jaa sanoja. Viestit voivat hukkua nollauksen yli: katso muiden sha:t myös haaroista.
## LOPPUTESTIT (siirrä jokaiseen luovutukseen, kunnes PT muuta sanoo)
1. Saapumislento laitteella (2.209, KK, PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
