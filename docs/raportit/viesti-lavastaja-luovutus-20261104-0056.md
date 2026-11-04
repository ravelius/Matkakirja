# Lavastajan luovutus 4.11.2026 klo 00.56 (konteksti 26 %) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: viesti-lavastaja-luovutus-20261103-2354.md (haara lavastaja/luovutus-20261103-2354), sen katot- ja mika-kohdat on korvattu tällä. Id:t: osoitekirja. L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/katot-v125. Tiedot: L/LAV-v125.md. Omat python-skriptit: /opt/homebrew/bin/python3 ILMAN -I:tä.

## TILA: tausta-v125 (ei viety, ei koodiviittausta)
- Paketti _valmiit/juoksupeli-kk-lavastaja-tausta-v125-vienti-20261104, SHA256SUMS 53d8e8fec5c5. Sisältö: leijuvat vaakasuorat V4_gold-kolmiot pois (kansi_pois.py, lod0–2), sokkelin kannen UV (sokkeli_yla_uv.py), Wumenin maasauma z −400…−397 tasolle 0 (wumen_sauma.py, ajettu erikseen wumen_aja.zsh:lla; paketoi-v125.zsh ei sisällä tätä eikä toista koko tulosta).
- PT 00.4x: kuittaus koeajoon, EI junaan. Koodin viittaus v125:een vasta KK:n hyväksynnän jälkeen. Pari KK:lle PT:n kautta. Iso iPad vasta KK:n hyväksymän parin jälkeen. Ämpäriin vain, jos pakko: uusi kansio ilman viittausta, JU varmistaa.
- Koeajo: L/koeajo2/ (JU, L1, runko 15d7274ad), sk L/sk-lav-v125-koeajo.txt, juuri L/koejuuri (`palatsi mallit file://…/koejuuri/`; v125 nimellä kielletty-tausta-v124, 1,7 Gt; ei tarvita viennin jälkeen). Pari L/koeajo2/pari-5d-v124-v125.jpg on lähetetty PT:lle 00.5x. ODOTA PT:n/KK:n vastausta.

## NÄHTY PELISSÄ (koeajo2)
- 5d: leveät levyt poissa. Wumen: valkoinen viiva poissa.
- Sokkelin kylki 5d-kuvassa rauhallisempi kuin v124:ssä, mutta en ole verrannut lähikuvaa v124:ään.

## AVOINNA
- 5d: harjakoristeet taivasta vasten ja paljas pääty jäivät. Lappeet ovat tutkitulla talolla ehjät; päädystä lape näkyy ohuena, koska päätyräystäällä ei ole paksuutta. Mahdollinen korjaus: päätyräystäs lappeen reunaan. EI aloitettu; kysy PT:ltä ennen.
- Porrasmainen tummempi kuvio päädyn yläosassa, sama v124:ssä. Syy näkemättä.
- UUSI: Wumenin lattian vasemmassa reunassa (kuva 0–500, y ≈ 540) tumma juova koeajo2:ssa. Ei näkynyt 00.34-kuvassa v124:llä. Voi olla paistettu valo tasatussa kohdassa tai minun wumen_sauma.py:ni. Selvitä ENNEN kuin v125 viedään.
- Wumenin oikean sivuholvin seinässä nuolimainen kivikuvio; rakennuspaketti, ei v125.
- Lähikuvassa 5d-sokkeli pituussauma jalan kohdalla (harmaa kaistale + valkoinen viiva). Ei PT:n listalla, älä tee ilman pyyntöä.
- Tarkistamatta itse: alkulento-1 ja -2, wumen-sivuholvi-v125.png (kuvan 18 holvi). Alkulento-3 katsottu ykkösajosta: ei tasaisia levyjä. Vanhoja varjoja en erottanut 5d:ssä, mutta en vertaillut niitä erikseen (varjostajat.json-lähde tausta-v81).
- Kaksikattoisten hallien turkoosi vyö: ei verrattu havainteeseen.
- Puuttuvat koeajo2:ssa: kielletty-c2-v37/a3-baoding-lod1.glb, a5-marmorikaide-pylvas-lod1.glb (tunnettu), osasarja pursotukset.glb (404 myös ämpärissä).

## TYÖKALUT (L)
tunnista.py (5d pelin testikameralla, pikselistä kolmio; oikein päin), nakyma.py (PEILATTU x), talo.py, raot.py, irtolevyt.py, parit-v125.py, koejuuri.py. Mika ei näe testikameraa eikä lukukelvottomia verkkoja: käytä tunnista.py:tä.

## PIDOSSA ennallaan (edellinen luovutus)
Alkulennon keltainen tasainen katto, Taihedianin marmori ja räystäsvyö (PT:lle Pariisin jälkeen), lod1-räystäs ja sali 04, oviaskelman kylki ja sokkelin vinot viivat (parit 01, 05), Baoding-lod1.

## LISÄYS 4.11. (PT, pari ja Wumen katsottu, viety KK:lle; v125 EI vientiin) — SEURAAVAN TYÖLISTA
1. 5d:n koristeet ja pääty.
2. Wumenin lattian tumman juovan syy.
3. Oikean sivuholvin sokkelin revitty reuna (ylempänä "nuolimainen kivikuvio").
4. Holvin pylväiden laikut.
5. 404:t: kielletty-osasarja-v13/pursotukset.glb ja kielletty-c2-v37/a5-marmorikaide-pylvas-lod1.glb: selvitä, onko vika. Baoding-lod1 ei ole vika (PT). Ylempi "tunnettu" koskee vain Baodingia; a5:tä ei ole selvitetty loppuun.
6. Katso alkulennon kuvat 1–3 (koeajo2).

## LISÄYS 4.11. (Postivahti: ei nollausta vielä; työlistan kohdat 2, 5, 6)
- Kohta 6: alkulento 1 ja 2 (koeajo2, L/koeajo2/alkulento-1-2.jpg) ja 3 (ykkösajo) katsottu pienennettynä: ei levyjä eikä harjan rakoja tällä tarkkuudella. Kuva 2 on enimmäkseen taivasta. Täydellä tarkkuudella ei katsottu.
- Kohta 5: ei rikki. pursotukset.glb: Osasarja.cs:90 hakee sen valinnaisena, ja rivi 174 käyttää omaa pursotusta; tiedostoa ei ole luettelossa missään kansiossa, joten ei regressio. a5-marmorikaide-pylvas-lod1: Muurikate.cs Lod1Liite on valinnainen kuten Baodingilla, ja lod1 puuttuu kansiosta kuten Baodingilla; malli piirretään lod0:lla (ei mitattu).
- Kohta 2 EI ratkennut. L/koeajo2/wumen-juova-kolme.jpg: juova tuli wumen_sauma.py:n jälkeen samalle kohdalle, jossa valkoiset palat olivat, joten syy on melkein varmasti korjaukseni. Ylin ja alin rivi ovat samaa rajausta; keskirivin (ykkösajo) kuva on eri kohdasta. Painuneet kolmiot 1-0:ssa ovat pitkiä (105,8 m²) ja vinoja (y −0,39 → 0,07), −0,68:n kolmioita sääntö ei nostanut. Hylätty: "kolmiot olivat piilossa y 0 -pinnan alla" (1-0:ssa 0/23 peitossa saman LODin V4_lattialla). Avoin: UV1-valo tasatussa kolmiossa vai −0,68-kolmioiden reuna. Ei korjattu.

## LISÄYS 4.11. (PT: järjestys juova → 5d:n pääty ja koristeet → sivuholvi)
- Juova, koe käynnissä: wumen_sauma.py:n raja nyt |y| < 0,1 (oli 0,5). Ruudut 1-0 ja 2-0 rakennettu uudelleen paketissa ja koejuuressa, SHA256SUMS 2c97aa9e8c3b (korvaa 53d8e8fec5c5). Pyydetty JU:lta yksi kuva: sk L/sk-lav-v125-wumen.txt → L/koeajo3/. Katso, onko juova poissa JA tuliko valkoinen viiva takaisin (ei vielä nähty). Paketoi-v125.zsh ei toista tätä rakennetta.
- Jos juova jää: palauta vasemman reunan tilanne ja korjaa vain oikean puolen sauma x ≥ 7 (valkoinen viiva oli oikealla pisimmillään).
- Pääty: aloittamatta. Lähtötieto: talo x −155,8…−135,5, harja z ≈ 243, lappeet päättyvät x −135,5:een, päätyseinä x −136; tarkista tunnista.py:llä ja talo.py:llä.

## LISÄYS 04.11. 01.06 (juova EI korjattu; aloita tästä)
- Paketti ja koejuuri nyt: 2-0 raja |y| < 0,1, 1-0 raja |y| < 0,8 (RAJA-ympäristömuuttuja, wumen_sauma.py). SHA256SUMS 5cc5d6bf5625, korvaa aiemmat. Paketoi-v125.zsh ei toista tätä: käytetty scratchpadin rakennetta, joten uudelleen rakentaessa aja kansi_pois → sokkeli_yla_uv → wumen_sauma näillä rajoilla.
- Tulos pelissä (L/koeajo3/wumen-c-vasen.jpg, kuva wumen-edesta-v125c.png, 2752 px: x 0–650, y ≈ 735–770): oikea puoli puhdas, ei valkoista viivaa. Vasemmalla tumma juova yhä, kapeampi; lisäksi ohut valkoinen katkoviiva vasemmassa reunassa (x 0–150). Pieni tumma kohta näkyi jo v124:ssä, |y| < 0,5 pidensi sitä.
- Syy näkemättä. Kokeita ei jatkettu arvaamalla. Seuraavaksi: tunnista.py pelin kameran arvoilla ei toimi (Wumen-ajossa ei testikameraa); aja kuva testikameralla 3.0 6.88 10 45, jolloin pikseli voidaan nimetä. Tarkista myös muut kuin V4_lattia-kerrokset ja UV1-valo tällä kaistalla (x −72…7, z −400…−397), sekä ruudun 1-0 rajalla olevat −0,68-kolmiot.
- Jatkojärjestys (PT): juova → 5d:n pääty ja koristeet → sivuholvi ja pylväiden laikut.

## LISÄYS 04.11. 01.10 (juova: syy löytyi, koe JU:lla)
- Syy (mitattu, ei vielä nähty pelissä): kaistalla z −400…−397 on V4_lattia-pintakerros y ≈ −0,02 ja sen alla kerroksia y −0,4…−0,68. Edellinen tasaus nosti piilokerrokset pintaan: sama korkeus, eri UV1. Rajalla 0,1 kolmio (−25, −0,39)–(0, 0,07) leikkasi pinnan.
- Korjaus wumen_sauma.py: V4_lattia-kolmiot, joiden alin kärki < −0,1, pois (lod0 ruudussa 1-0: 11 kpl; lod1–2: 0), |y| < 0,1 tasolle 0. RAJA-muuttuja poistettu. Ylhäältä mitattuna lod0:ssa ei reikiä (4 cm:n ruudukko); lod1–2:sta ei poistettu kolmioita. Päällekkäisyyttä jäi pieniä aloja x −75…−72 ja x 0…7, ei korjattu. Valkoisen katkoviivan syy ei selvillä.
- Ruudut 1-0 ja 2-0 lod0–2 rakennettu v124:stä (kansi_pois → sokkeli_yla_uv → wumen_sauma) pakettiin ja koejuureen, SHA256SUMS 7707ff52969c. Paketoi-v125.zsh ei toista tätä.
- Pyydetty JU:lta: sk L/sk-lav-v125-wumen-d.txt → L/koeajo3/wumen-edesta-v125d.png. Katso sama rajaus kuin c:ssä (2752 px: x 0–650, y ≈ 735–770): juova, valkoinen katkoviiva, oikean puolen viiva.

## LISÄYS 04.11. 01.40 (juova EI korjaantunut; 5d:n kiilat)
- Edellisen lisäyksen syy ei riitä: koeajo3/wumen-edesta-v125d.png näyttää vasemmalla leveämmät tummat kiilat (2752 px: x 0–700, y ≈ 490–550). Kamera d-kuvassa eri kuin c:ssä, vaikka skripti on sama, joten rajaukset eivät vastaa toisiaan. Muissa paketeissa ei ole maailmankoordinaateissa geometriaa tällä kaistalla (koodin sijoittamia malleja ei tarkistettu). TILA: leivonta-216/uusinta/TILA.md kertoo tummista tuplista ruudussa 1-0: selvitä UV1-valo; valokarttaa en vielä löytänyt.
- Pyydetty JU:lta: sk L/sk-lav-v125-wumen-e.txt → koeajo3/wumen-testikamera-v125d.png (pelaaja −15, −412, suunta −2,03; testikamera 3.0 6.88 10 45). Nimeä juovan pikselit: tunnista.py ulos.png -15 0 -412 -2.03 3.0 6.88 10 45 90 "x,y;…" ruudut 1-0, 2-0.
- 5d: V4_red-seinän ylin kolmio on vino (esim. −135,6: A y 6,1 → B y 7,4), yläosa puuttuu ja friisi peittää vain 6,1–6,6. Kiilasta näkyy taivas, oletettavasti myös koristeiden alla (kuvasta päätelty, ei nimetty pikselistä). Sama muoto kaikissa vanhoissa versioissa (v116 asti tarkistettu). Mittaus: L/kiilat-lod0.txt, kiilat.py: 3542 vinoa, 2677 peittämätöntä, 12 886 m²; räystäät eivät ole mukana, joten näkyviä on vähemmän. Korjausajatus, ei tehty: täyttökolmio (A ylös, A B:n korkeudella, B ylös), UV ja normaali saman kolmion tasosta. Ensin kokeeksi yksi talo.
- Porrasmainen tumma kuvio päädyssä näyttää karkealta paistetulta valolta (ei varmistettu).

## LISÄYS 04.11. 02.35 (juova: paistettu valo; tilaus i JU:lla; aloita tästä)
- Mitattu: UV1 osuu valokartan (kuva glb:n sisällä) tummiin kohtiin ruudussa 1-0: kolmiot (−1,−397)(−72,−400)(−41,−397), 22 % tummaa, ja isot (−75,−400)(0,−400)(−50,−425), 36 %, ja (0,−400)(0,−412)(−50,−425), 18 %. Sama valokartta v124:ssä; miksi juova ei näkynyt v124:ssä, on selvittämättä.
- Korjaus L/wumen_valo.py (ajetaan wumen_sauman jälkeen, lod0, ruudut 1-0 ja 2-0): kaistan kolmiot ja edustan ≥ 20 m² kolmiot, joissa valo < 140, saavat vakio-UV1:n kuvapisteeseen, joka vastaa naapurien mediaanisävyä (ajo voidaan toistaa). 1-0: 8, 2-0: 28 kolmiota. SHA256SUMS e0eb5409a814 (paketti ja koejuuri). Ei vientiin. Paketoi-v125.zsh ei toista: wumen_valo ajettu käsin.
- Pelissä: d → f juova pieneni selvästi, g:ssä vasemmassa reunassa yhä kaksi kiilaa + valkoinen katkoviiva (koeajo3/wumen-edesta-v125g.png). Ylhäältä (wumen-ylhaalta-v125g.png, testikamera 25 0 89 60, pelaaja −15 −400, ei bottiliikettä): tumma varjo x ≈ −5…0, z ≈ −400, katkeaa suoraan x = 0:aan; lattiassa näkyi vaakaraja z ≈ −400 ja pystyraja x = 0, joista osa on oma korjaukseni (vakiovalo 245, siksi nyt sävy naapureista). Alareunan vaaleat täplät eivät ole selvillä.
- Odottaa: JU, sk L/sk-lav-v125-wumen-i.txt → koeajo3/wumen-ylhaalta-v125i.png ja wumen-edesta-v125i.png. Tarkista kolme asiaa: juova, valkoinen katkoviiva, rajat z −400 ja x 0.
- Vakiovalo poistaa lattian paistetut varjot näiltä kolmioilta. Jos alueelle kuuluu oikea varjo, se katoaa. Vaihtoehto: uusi leivonta.
- Sivuholvin punaisen ja harmaan raja vaihtuu ajosta toiseen (f ja g), JU näki myös keskioven pylväiden repaleisen rajan: epäily päällekkäisistä pinnoista, ei varmistettu. Tämä on listan seuraava kohde 5d:n jälkeen.
- 5d:n kiilatäyttö yhä aloittamatta.

## LISÄYS 04.11. 02.4x (LUOVUTUS, konteksti 25 %; seuraava aloittaa tästä)
- Ensin: JU:n tilaus i (kuvat koeajo3/wumen-ylhaalta-v125i.png, wumen-edesta-v125i.png), odottaa L1:tä palvelijat v10:n jälkeen; JU ilmoittaa Lavastajalle. Katso kolme asiaa (edellinen lisäys), rivi PT:lle.
- Sitten 5d: L/kiila_tayta.py sisään.glb ulos.glb lisää täyttökolmiot. Koe vain ruudulle 1-3 lod0: L/koe-kiila/kk-tausta-1-3-lod0.glb, 368 täyttöä; EI asennettu pakettiin eikä koejuureen eikä nähty pelissä. Geometria tarkistettu yhdestä päädystä (−135,6: uusi kolmio 6,1→7,4). Riski: täyttö on päädyssä 7,1–7,4 samassa tasossa kuin päätykolmio, ja räystään alla turhia täyttöjä. Koe: kopioi koejuureen vasta i:n jälkeen, tilaa 5d (kuten sk-lav-v125-koeajo.txt, testikamera) ja vertaa koeajo2/5d-v125.png:hen, tunnista.py:llä pikselit. Koko palatsiin (kiilat-lod0.txt, 2677 kpl) vasta PT:n kuittauksella; lod1–2 tarkistamatta.
- Jonon loppu ennallaan: sivuholvi ja pylväiden laikut. v125 ei vientiin; koodi ei viittaa siihen.

## LISÄYS 04.11. 03.4x (5d: kiilakoe 2 nähty; odottaa PT:tä)
- Pari L/koeajo3/pari-5d-kiila2.jpg (ylä ennen, ala koe, sama rajaus). Isot taivasaukot ja päätyjen kiilat kiinni tässä kuvassa. Jäljellä: pitkällä seinällä kapeita vihreitä kiiloja (rajaus x 320–520) ja päädyssä vihreä kiila (x 105–180), punainen porrasmainen kohta seinän yläreunassa räystään kohdalla (x ≈ 450–510; voi olla täyttö räystään yli, ei tutkittu), lyhyet tummat viirut oikeassa päädyssä (osa näkyy jo ennen-kuvassa).
- Vihreä näkyi ennen-kuvassa samalla kohdalla kiilan läpi; syytä (mikä pinta) ei ole nimetty pikselistä. Friisi on seinän tasossa (−0,009 m), joten se on täytön edessä.
- kiila_tayta.py nyt: nouseva ja laskeva yläreuna, 3 cm seinän taakse. Ruutu 1-3: 487 täyttöä, vain koejuuressa ja L/koe-kiila/; EI paketissa, eli koejuuri ≠ paketti tämän ruudun osalta (SHA256SUMS e0eb5409a814 ei kata tätä). Koko palatsi ja lod1–2 vasta PT:n kuittauksella.
- Wumen: pari koeajo3/pari-wumen-v124-v125i.jpg; pieni läiskä ja ylhäältä näkyvät laikut x −1…7 auki (viimeksi nähty: päällekkäiset kolmiot 1-0/2-0, katkoviivoja, ei korjattu).
- Lattian pystyviiva 5d:ssä (hahmon kohdalla) ennallaan kokeissa, näkyy jo koeajo2:ssa; ei kuulu tähän.
