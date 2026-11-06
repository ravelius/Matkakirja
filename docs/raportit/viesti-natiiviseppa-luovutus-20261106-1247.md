# Natiivisepän luovutus 6.11.2026 klo 12.47 (konteksti yli 25 %, 7.37)

Korvaa -1231:n SEURAAVA TYÖ:n. -1231:n "Mitä koodissa on" ja -1216:n opit pätevät. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Luo ensin cron "4 9 * * *" (Raamattu 7.41). Skripti on koko polulla /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py.

## OMISTAJAN PÄÄTÖS JA KK:N SANA 12.42
- Omistaja: pienennetty Tripo-puu kokeen seuraavaan kuvapariin pallopuun tilalle ("Otetaan (Suositus)"). Nykyiset neljä puuta kevennettynä. PT: VS tekee ja lähettää polun NS:lle; NS kytkee; ei uusia Tripo-ottoja. Pari KK:lle.
- KK: 1) vedessä olevat puut ja tolpat korjataan samaan pariin. 2) Forward+ on ajankohtainen ("kokeile myös GPU Resident Drawer ja Mesh LOD"), sitten suunnitelman mukaan C1 ja D2. 3) Eri talojen kattojen yhdistäminen: EI NYT. 4) Mittaa tilanne, jossa palikat korvaavat nykyiset talot: "ainoa luku, joka kertoo todellisen hinnan".

## SEURAAVA TYÖ, järjestyksessä
ÄLÄ COMMITOI tai vaihda työpuuta wt/proto-natiiviseppa-palikka ennen kuin JU on ilmoittanut iPad 2:n valmiiksi. Se ajaa e1b50940b aikaisintaan 12.59 tästä haarasta. En tarkistanut, kääntääkö JU kopiosta. Tulokset tulevat viestinä; älä pyydä uudelleen.

1. IPAD 2 e1b50940b (ohje palikkakoe/ajopyynto-ipad-2.md, lokit lokit/natiiviseppa-palikka-ipad2-e1b50940b). Parit B2P|B2I, B2P|B2L, B2P|B2K, B2P|B2.
   - Taulukko: palikkakoe/taulukko-ipad.py <palikkakoe.jsonl> (jaksot ja mediaanit tavoittain).
   - Tarkista omatKutsut > 0, kuvamäärän trendi jaksosta toiseen ja aloitusaika. Tulos KK:lle (hinta kerrottu erikseen, lupaus), tiivistys PT:lle.
   - Latvus on alfaleikkaus: katso erityisesti B2L. Ei tarvitse arvioida pitkään, jos Tripo-puu korvaa kortin; kerro silloin, että luku koskee korttia.

2. VESIKORJAUS (tee-palikat.py).
   - KS:ltä kysytty 12.46 pelin näkyvän vesirajan lähdettä lat/lon-kyselyyn, vastaus tulee tälle id:lle. Odota sitä.
   - Älä oleta piirroslaattoja: kartta häivyttää piirroksen kallistettaessa, joten kallistetun kuvan vesi voi olla Cesiumin pergamenttilaatoissa (vesimaski, /Volumes/T7 4TB/Matkakirja-karttaseppa/vesimaski). Piirroslaatat _valmiit/pariisi-tasot-isoisa4-20261103/natiivi/lahig-*.jpg, 5454 × 3634, rajat PiirrosKerros.cs:n Tasot, ja niissä on PiirroksenLat-kutistus. Avoin hypoteesi: puu ei ole vedessä vaan maasta koholla, jolloin kallistus siirtää sen kuvassa veden päälle. Tarkista y-b2:sta (ylhäältä), ennen kuin suodatat.
   - Suodata ENNEN pp[:LKM['puu']]- ja pis[:LKM[laji]]-leikkausta (rivit 394 ja 404), jolloin määrät 20 000, 5 000 ja 100 säilyvät. Säilytä valot silloilla.
   - Aja PK_VAIN_DATA=1, argumentit tee-palikat.zsh:stä, ulos uuteen PalikkaData-v4.bytes; palat-ilman-marais kelpaa ennallaan. Kopio Assets/Matkakirja/Kartta/Resources/PalikkaData.bytes.

3. TRIPO-PUU: VS lähettää polun. Muoto selviää siitä. Kytke PalikkaKerros rivi 327 (l == Puu && latvus ? kortit : verkot) ja PalikkaVerkot; pidä kortti vertailuun. Kerro KK:lle kolmiot puuta kohden ja se, että umpinainen malli poistaa alfaleikkauksen. Mac-6 kuvat kuten sk-mac-5, parit palikkakoe/parit-mac5.py:n ja varit-mac5.py:n mallilla, uusi kansio selvitys-mac6. Katso erityisesti vesiraja ja c-b2-vasen. Kuvapari KK:lle, tiivistys PT:lle.

4. KORVAUSMITTAUS (KK:n kohta 4), kooditta vielä, ehdotettu tapa:
   - TaloKerros: korvauskansio, josta AloitaLataus lukee vain siellä olevat palat (polku rivillä noin 178; Kansio-vaihto vapauttaisi kaikki palat ja jakso menisi lataukseen). Vaihdossa vapauta vain korvattavat palat. Korvaavat 7 tiedostoa ovat palat-ilman-marais:n tavalliset tiedostot, 15 Mt; symlinkit ovat nykyisiä paloja.
   - Laitteelle: JU kopioi Documents/palikka-korvaus/. Ei gitiin, ei StreamingAssetsiin. Tarkista, mikä palaversio iPadilla on (v9 tai v10); korvaukset on tehty v9:stä. Kirjaa tulokseen.
   - Ajon tavat: KA0 (talot pois, ei palikoita) ja KB2 (talot pois + palikat). Ajot A0|KA0 ja A0|KB2. Korjaa Kayta(): kaikki = s.Length == 2 ei toimi tavalle KB2.
   - Vahvista jsonl:n kolmioista, että KA0 < A0. Ohitus on 3 s (OhitusS): tarkista, ehtivätkö 7 palaa latautua sinä aikana (TarkistusS 0,25 s, yksi pala kerrallaan); pidennä jaksoa tarvittaessa.
   - Kerro tuloksessa, että korvaus koskee vain 2 000 Marais'n taloa, mutta 20 000 puuta, 5 000 valoa, mastot ja sillat ovat kokonaan lisäkuormaa. Laske kolmiot lajeittain, jos ne näkyvät.

5. FORWARD+:N HINTA isolla iPadilla (KK:lle kerrottu 12.45, suositus): Ultra_Renderer on jo mode 2. Tee kopio Ultra_Renderer_F.asset (uusi guid, m_RenderingMode 0, sisältää SSAO-aliobjektin) Ultra_RPAsset-listan toiseksi. AsetaFp kirjaa renderingMode:n lokiin. HUOM: isolla iPadilla tapa A1 = Forward, Mobile-tasolla A1 = Forward+, joten kirjaa tulokseen, ettei merkitys käänny. Mobile-tasoisia laitteita tämä ei mittaa. Sama iPad-kierros kuin kohdassa 4; ohje ajopyynto-ipad-3.md.

6. C1 JA D2 kohtien 4 ja 5 jälkeen (tutkimus 20261106-rakennuspalikat-tutkimus.md, osa E). C1: B1 (GameObject + LOD Group, ei ole koodattu) + DOTS-tuki varjostimeen + Keep All + static batching pois + peittokarsinta pois. Forward+ täyttyy Ultralla ilman vaihtoa, mutta kohdan 5 Forward-kopio pitää ottaa pois listalta: RD vaatii Forward+:n kaikilla renderöijillä. D2: B2 + forceMeshLod vs erilliset verkot. Näihin tarvitaan kaksi käännöstä pitkin vuoroin.

7. KS:N pr-pohjoinen (seuraava yhteinen ajo, KS laski kameran 48.8642 2.3372 0.002 2 suunta 180, ei ajettu): arvio KK:lle etelämuurista. pr-etela-2 ei todista (KK:lle kerrottu). Canopéen välke liikkeessä edelleen katsomatta.

## Mitä tässä sessiossa nähtiin
- Mac-5 e1b50940b: 0 varjostinvirhettä, B3 = B2 (0,0 %). Parit palikkakoe/selvitys-mac5/. Ikkunat kelpaavat (#887058 / nyt #887054, seinä #d8bc90 / #d4bc8c; ylin rivi paikoin räystään alla; ei kattoikkunoita; välke liikkeessä katsomatta). Latvus parempi, väri #8d713b, #876c37 (tavoite #8f7743), yhä vähän mallipuu. Katto yhtenäistyi, ei reikiä rajauksissa, heikko värisauma. Rivi pieniä kattoja näkyy, todennäköisesti eri taloja (ei mitattu). Puita ja tolppia vedessä. Tulos KK:lla ja PT:llä.
- iPad 1 d015acab6, r3 (iPad Pro 12.9, 5. sukupolvi): suurinP95Ero B2−A0 +8,34 ms (2,57…19,14), B3−A0 +5,56 (2,46…14,19), B3−B2 +0,58 (−0,61…1,20). Ruudun P95 16,8 → 25 (B2), 23 (B3). Kuvat/jakso A0 1 015, B2 970, B3 994. Kolmiot 1,06 → 2,03 miljoonaa. Ajossa B2|B3 kuvamäärä 985 → 888, GPU p50 29 → 33 ms, lämpötaso Normaali koko ajan; lämpeneminen on päätelty, ei mitattu. A0 yksin GPU P95 17–30 ms. Tulos KK:lla ja PT:llä.
- KS:n ajo 12 pr-etela-2 katsottu. Muut ajon 12 kuvat (po-la, po-ita, us-eiffel) eivät kuulu NS:lle.

## Opit
- ISO IPAD ON FORWARD+: M-sarjan iPad = taso 1 Ultra_RPAsset (juna 169, 773372d34), Ultra_Renderer m_RenderingMode 2, SSAO päällä. Tutkimuksen "iPad = Mobile, Forward" koskee vain muita laitteita. iPad 1:n A0, B2 ja B3 on siis mitattu Forward+:lla, ja A1 = A0 (kohinan mitta, ei tulos; ensimmäisen A0-jakson 948 kuvaa on lataus). Kerrottu KK:lle ja PT:lle.
- Lue RP-asset ennen kuin lupaat korjausta: lupasin KK:lle Ultra-korjauksen 12.4x ja oikaisin sen.
- Mittari suurinP95Ero ei yksin riitä: raja alittui, mutta ruudun P95 ja kuvamäärä näyttivät pudotuksen. Kerro molemmat.
- Parikuvissa nykyisessä kuvassa ei ole puita Marais'n alueella, joten puuta ei voi verrata samassa parissa.
- Hookin asemataulu-muistutus ei koske koetta: ei junaan, junat kirjaa PT.

## Huomiot
- NS:n työpuita wt/-kansiossa 8 (raja 3): kerro PT:lle ennen poistoja (-1140).
- KK:n ja PT:n viestit nimellä vaativat ref:n (ListAgents).
