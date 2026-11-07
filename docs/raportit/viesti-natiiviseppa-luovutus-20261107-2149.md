# Natiivisepän luovutus 7.11.2026 klo 21.49

 KAIKKI VANHEMMAT LUOVUTUKSET, viittausketjua ei ole. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364.
Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b.
ENSIN: cron "4 9 * * *" (session-only, Raamattu 7.41), skripti /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py. Etäyhteyteen ei kosketa.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe, D = P/selvitys-tarina-4b, O = P/valmis-origo, V = P/valmis-jalki2, H = P/selvitys-origo-hinta, L = /Users/Shared/Claude/proto-3d/lokit, A = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/aloitus-tyhjat, T = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/lontoo-kamera. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä.
Viestit: mcp__ccd_session_mgmt__send_message session-id:llä. Vahdit: find, ei zsh-globia (ei osumaa kaataa vahdin). Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto; työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, etä natiivi-backup.

## TYÖ NYT: MUISTITYÖ. KOHDAT 1-4 KOODATTU; ODOTTAA JU:N iPAD-AJOJA; KOHTA 5 ALOITTAMATTA
PT:n käsky 21.2x (sanatarkasti) järjestyksessä, tila merkitty:
1. TEHTY: "Napakalotit junaan 220 ... puhdas commit 72e257a0b:n päälle": 2f64c2eee, juna-220:n kärjessä.
2. KOODATTU, AJO JU:LLA: "Vaihe 0: mittarit, ja erillisenä ajona latausrajakoe 'maasto lataus 64 40 40' sumeasta alueesta (sanani annettu). Ei Rakennus.cs-korjausta; tulos minulle."
3. KOODATTU, AJO JU:LLA: "Vaihe V: palojen lataus seis, kun vapaa muisti loppuu."
4. KOODATTU, AJO JU:LLA (pyyntö 21.48): "Vaihe 1:n DC3 ja pilvet, 2a ja 2b. Kokoa vaihe 1 yhteen koehaaraan: NUI tekee oppaan, aloitusvihjeet ja linssit, PK juoksupelin kuvat, ja he antavat sinulle shan." = natiiviseppa/muisti-vaihe12 10604363c.
5. SEURAAVA, EI ALOITETTU: "Vaihe 3 kokeena: ASTC iPadilla, kuvaparit; junaan vasta omistajan päätöksen jälkeen. Huomioi 3.11. käännösvika." Suunnitelman kohta 3: Nahtavyysalue.cs purkaa PNG:t, lukija DioraamaAstc ja .astcm olemassa, astcenc 4×4, 389 -> 97 Mt LASKETTU; parit lähin ja matala kulma mallikohtaisesti. Käännösvika: etsi loki-hae.mjs:llä ja Raamattu ennen koodia, en ehtinyt katsoa.
"Koe13 tauolle ... Nimien karsinta jää pois. Näkyvä muutos vain omistajan kortilla kuvaparista." Mittaustapa: "jokainen omana ajonaan, sama käynnistys kytkimellä tai vähintään 3 ajoa, määrät pelin lokista, verrokki ei käy kytkimen läpi. Tulokset minulle."
Suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261107-muistisuunnitelma.md.

KAIKKI TILA: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/muisti-0/tulos.md ja ajopyynto-ipad.md. JU:n kuittaukset suoraan NS:lle. Ajo 1 mittari-ajo.zsh, ajo 2 latausraja-ajo.zsh (63e5260e1), jatko jarru-ajo.zsh (natiiviseppa/muisti-jarru 754644c26), jatko vaihe12-ajo.zsh (10604363c). Lokit lokit/natiiviseppa-muisti-0-mittari, -0-latausraja, -v-jarru, -12.
KUN JU KUITTAA: 1) mittari: palatilasto-rivit (grep "palatilasto" muisti-tarkka.log): piirto vs muistissa, z~, etais (mitä usvan 16 km:n takana), kerros (kerman osuus: tunnista materialKey rivin osoitteesta), rt (muistiton). Tauluksi tulos.md:hen, MITATTU/LASKETTU. Tarkista esim-kenttä: onko nimessä osoite, ja "z eroaa arviosta". 2) latausraja: kytkinrivi joka ajossa, KYLMA ok; kuvat a, b, c täysikoossa v | k samasta rajauksesta, kello kuvasta, fp-huippu ennen 1. kuvaa, lepo, kierto muisti-tarkka.logista. Ei Rakennus.cs-korjausta. 3) jarru: "pallon muistijarru" -rivit, U-rivin "Pallo N +a-b" seis-aikana (lähes 0 paitsi pulssit), kuvat täysikoossa, paluu kuntoon. 4) vaihe12: v = verrokki, y = vaihe 1, a = 2a, b = 2b, kukin 3 ajoa. Kytkinrivi "MATKAKIRJA muistikoe:" joka ajossa; 2b:ssä "usvan takaiset: raja ... poissa N" (ensimmäinen CesiumTileExcluder projektissa: toimiiko iOS:llä, poissa > 0, ruutuaika). Palat, fp, tex ennen 1. kuvaa; b-kuvat k80/k60/k40 täysikoossa v:tä vasten: beige reuna? Tulokset PT:lle ≤ 3 riviä, polku tulos.md. Junaan V ja muut vain PT:n sanalla; 2b:n näkyvä muutos vain omistajan kortilla.
Rajoitukset, jotka kerrotaan: jarrun oikeaa hätää ei ajeta, pulssin purkuhyöty mittaamatta; 64 40 40:n ajot ovat Pariisin aloituslennosta; vaihe12 ei aja NUI:n tarkistuksia (lipputanko, opas, valitsin, raketti, raportti _tyo/natiivi-ui/raportti-muisti-vaihe1-20261107.md) eikä astronautin ensiavauksen pilviviivettä: oma ajo, kun luvut on nähty. PK:N PYYNTÖ (local_91a1bc27-6870-46aa-9886-66fd33b68880): jos ajo avaa juoksupelin komennolla ilman pelilistaa, kerro rivi "latauskuva näkyy ... odotus X s" (verrokki iPad 0,09-0,16 s) ja muistiero.
Työpuu wt/proto-natiiviseppa-kierto on haarassa natiiviseppa/muisti-vaihe12. Koehaarat eivät kuulu junaan: PalaTilasto, latausrajat.txt, MuistiKuva, napat-pois.txt, MuistiKoe, Juoksu-rivi, MuistiKevennys, koekomennot. Junaan viedessä 2a Rakennus.cs:ään (LuoPallo ylikirjoittaa kohtauksen). unity-tarkistus: sh Peli-testit/unity-tarkistus.sh.
PT 21.2x: 630 Mt on muistikuvan aukko, ei kadonnutta muistia; "nähtävyyskuvat 108" ja "talot 43" ovat alarajoja. Katto: PT kuittasi koe13:n päättyneen oikein; v20 jää, päätös KK:n kautta omistajalle.

## PARIISIN MUISTI: ENSIMMÄINEN AJO (tausta; raportoitu PT:lle 21.00)
Tulos _tyo/natiiviseppa/pariisi-muisti/tulos.md (loppu "TULOS, ajo 0b"), parit pariisi-muisti/parit/, purku kuva1/kuva2 + csv samassa kansiossa. Kokonaissuunnitelman tekee KK. MuistiKuva ja kytkimet eivät mene junaan. Odottaa PT:n tai KK:n sanaa: latausrajat (LuoPallo ylikirjoittaa kohtauksen, 40/64 ei ole koskaan päätynyt käännökseen; EI KORJAUSTA ilman sanaa); napakalottien kevennys. muistikuva/pura.zsh on nyt U = b8. ajo.zsh hakee vanhan muistivahti-tuloksen, kun vahti on pois: korjaa ennen uusintaa.
## KATOT: KOE13 PÄÄTTYI, V20 JÄÄ (PT kuitannut; EI UUSIA KOKEITA)
LUE _tyo/natiiviseppa/talotyylit/tulos.md LOPPU. PT 21.1x: koe13 oli VIIMEINEN koe; jos mittari ei täyty, v20 jää ja päätös menee omistajalle PT:n kautta. Ei koko Pariisia, ei Lontoota, ei junaan.
JUURISYY (PT hyväksynyt): tee-palat.py lisaa(): `if ala(r)<0:r.reverse();ulko=ulko[::-1]` antaa avain[i]=r[i-1]: naapuritieto yhden reunan väärässä kohdassa. 18 488 / 127 983 taloa (14,4 %), 604 km naapurireunaa; koealueella 1 375 / 1 460. Mukana v20:ssä ja saman rivin kautta tee-palat-lontoo.py:ssä. EI korjattu kummassakaan.
KOE12 (palat-v21-koe12-katot, kuvat/koe12/): mansardin jatkuvuus v20:tä parempi; hampaat (piikit väliseinien päissä, sulun pystykulma; koodista ja kuvasta, ei ajolla todistettu) ja raot (r85:ssä 2) huonommat. Kaukaa 45°: dL -2,24, L-hajonta 7,3/6,6.
KOE13 EI AJETTU PT:n ehdolla: ilman sulkua vähintään 0,5 m:n avoin porras 15,5 km:llä (54 % yhteisistä seinistä), ilman kiilaa kansi yli 0,5 m reunasta 9,3 km:llä. Koe13:n muutos: pariisi-talot/tee-palat-koe13-ei-ajettu.py, talotyylit/paivita-koe13.py. pariisi-talot/tee-palat.py = koe12 (kopio talotyylit/tee-palat-koe12.py).
R85:N KAKSI RAKOA EI SELVINNYT KOHDALTA (kerrottu PT:lle): sijaintinaapuri ja alle 3,5 m:n vapaat välit poissuljettu. Kamera r85: suunta 315, 343 m taakse, silmä 80, f 1966 (kuva 2752), horisontti y 860; perspektiivi-skripti oli scratchpadissa, ei säily.
Mahdollinen jatko vain PT:n tai omistajan sanalla: uusi tapa (korttelin yhteinen kattokorkeus tai vino sulku).
Cron "4 9 * * *" luodaan aloituksessa. Lukulista 7.47: lue silti.

## AUKI, ODOTTAA MUITA (ei toisteta, ei tehdä ilman sanaa)
- Yksi taso: koe jää haaraan, 80°:n kevennys auki. Julkisivu: PT/KK:n sana, ei junaan. Palikkakirjasto: odottaa omistajan korttia (Pariisi valmis + muisti). Kameraeste ea5823b4f: ei junaan. Sumea alue: aamun kysymys KK:lla, ei yrityksiä. Meri: VS:lle PT:n kautta.
- Muisti: PT 17.1x: ei A/B-ajoa, yhteisajo mittaa junan. Tulos _tyo/natiiviseppa/muisti-7-b8/tulos.md.
- iPhone-katto 901e4004b junassa 220; JU katsoo hypyn iPhonella; jos näkyy, korjaus NS:lle.
- Työpuita wt/-kansiossa yli rajan: kerro PT:lle ennen poistoja.

- Tärinä: iPad 4 A0, 0 palaa, thermal 0: GPU 13 → 29 ms noin 3 min:n kohdalla, huippu 37, 10 min:n tauon jälkeen 11,6; kolmiot ennallaan; seisova kamera kuvaero 0,000. Syy auki. Muistipiikki t 20 s: 3660 (0 palaa) | 4039 (3b); iPad 3b VIKA 4106 ≥ 4080, huippu 4220. Skriptit P/selvitys-muisti-3b/.
- r3-rata oli viallinen (zoomirajan nosto, 4,15 m/ms): r4 = 60 m/s, pelaajaa ei koske. Pelaajan veto 156–209 m/s lähimmällä zoomilla. Silmä 56 m kartan yllä, alle ND:n tornien.
- Iso iPad on Forward+ (Ultra_Renderer mode 2), muut Forward. iPad 1 r3: B2−A0 +8,34 ms, kolmiot 1,06 → 2,03 milj.
- Näkyvä vesi: Z14 + ND:n pohjakuva; maski P/selvitys-tolpat/nakyva-vesi-alueet-2m.png, poisto poista-vedesta.py. Jos KS muuttaa kanavaa tai ND:n pohjaa: nakyva-vesi.py, alue-vesi.py ja poisto uudelleen. tee-palikat.zsh:n jälkeen poista-omat-sillat.py.

## Opit
- GIT ADD KAATUU KOKONAAN YHDESTÄ VÄÄRÄSTÄ POLUSTA: fatal pathspec jätti lisäyksen tekemättä, ja commit vei vain renamet (korjattu amendilla). Tarkista --cached --stat ennen commitia.
- LUE KÄYTTÄJÄ ENNEN KEVENNYSTÄ: suunnitelman "DC3 lennon alussa" oli turha; v3 ei käytä sitä lainkaan. grep kaikki kutsupolut, ennen kuin suunnittelet latausta.
- VERROKKI VAPAA UUDELLEENLUONNISTA: "maasto lataus" luo pallon uudelleen; siksi kesken ajon annettuna tulos ei erota rajaa luonnista (z10-tulos). Kytkin ennen tilesetin ensimmäistä päivitystä samalla käynnistyksellä. Asettimet luovat tilesetin aina uudelleen (Valmius.cs:165), suspendUpdate ja kamerat eivät.
- SEIS EI PURA: Cesiumin suspendUpdate palaa Updatesta heti, joten mitään ei pureta; siksi jarrussa pulssi. Muuten kartta voi jäädä jumiin (R5 10.10.).
- zsh: ei $R:polku eikä alkurivin echo ==== (molemmat osuivat taas tässä ajossa). ${R}:polku ja echo "--".
- KOORDINAATTI ENNEN KOETTA: kaksi rengasta, joiden pitää kulkea rinnan (r ja avain), voi käännös siirtää yhdellä. Tulosta reunan pituus ja naapurin avain rinnakkain, kun naapurilogiikka näyttää oudolta: osa koe4-11:n syistä (raot, V-urat, puuttuvat mansardit) oli tämän seurausta; värisyyt eivät. Koe8:n "seinillä ei samoja solmuja, 31 km" oli sama vika (todellinen 435 m).
- LAASTARIN POISTO VAATII MALLIN ENSIN: kiila ja sulku paikkasivat myös aitoja korkeuseroja, joten poisto olisi avannut 15,5 km rakoja. Laske portaat ennen ajoa.
- KÄÄNNÖS EI LUE KOHTAUSTA: proto-kaanna.sh ajaa LuoPallon, joka tallentaa Pallo.unity:n koodista. Kohtauksen arvot tarkistetaan käännetystä Data/level0:sta; asetus kuuluu Rakennus.cs:ään. Mac-esikatselu taas avaa kohtauksen gitistä.
- VAHTI POIS = VANHA TULOSTIEDOSTO: laitteelta haettu muistivahti-tulos voi olla edellisen ajon; katso aika.
- ÄLÄ KIRJAA PALAUTETUKSI OSITTAISTA: koe11:ssä korjautui yhden talon tyyppi, ja kirjasin mansardit palautetuiksi; PT näki kadun puolen katkonaiseksi v20:een verrattuna. Vertaa koko jatkuvuutta verrokkiin ennen sanaa "palasi".
- KOHTA OSOITTAA KUVASTA, EI NIMESTÄ: "pallo" nimi kuvassa ei todista sijaintia; pm-1-pallo oli Pariisista. Katso verrokin kuva ennen kuin uusinta lähtee: skriptin korjaus ennen ajoa säästi yhden iPad-ajon.
- ÄLÄ LISÄÄ VAIHETTA VERROKKIIN ENNEN VERTAILUKOHTAA: PT kumosi lisälennon; profiilikuvat vertailun jälkeen, luvut vain ennen ensimmäistä kuvaa.
- REGRESSION SYY REUNOISTA ENNEN KOETTA: koe10 korjasi väärää syytä (0,08 % pikseleistä). Lue reunat ja talon tyyppi ennen hypoteesia; harmaa seinä kuvassa kertoi tyypistä.
