# Natiivi-UI: luovutus 6.11.2026 (konteksti 30 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat. Oma id local_43962c89-fc14-4098-9dd7-6153133ffcea. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, NS local_99130238-aa54-4a29-bcc9-7a023584944b.
Ei omia ajoja. Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup (ei origin). Oma worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, haara natiivi-ui/aloituslento-mittaus-219 7545b03d6. Tiedot: proto-3d/lokit/nui-tahtikyltit-20261106/tulos-nui.md, kaksi viimeistä lukua + "Ajo 33".

## Odottaa (tulevat viestinä tähän id:hen)
1. JU: ajot c ja d, kansiot lokit/nui-aloitus-mittaus-c ja -d.
2. KS: yhteisajo listalla _tyo/karttaseppa/lisa-kyltti-valke-34.txt; KS kertoo lokikansion.

## 1. TÄRKEIN: aloituslennon tyhjä pohja ja myöhästyvät kuvat (PT, Pariisi-listan kohta 10). Koe, ei junaan.
PT vaatii MITTAUKSEN, ei päättelyä. KK 5.11. 15.12: ei tyhjää pohjaa saapuessa, karkeampi kartta pysyy, kunnes tarkka on valmis.
Mitattu:
- Ajo 356eb0101 (testireitti `uusi-peli 5 pariisi saapuminen`, 11 s alusta): esilataus 0/5 katossa 1498 ms; Eiffel vuoro 8,43 s + purku 2,88 s, reitti levy; kuva latautui oman vuoronsa jälkeen, eli LENTO EI ODOTA, KUVA MENETTÄÄ VUORONSA. Kartta aste 5,3 % zoomauksen alussa; kuvassa tyhjä pohja ja vino reuna.
- Uusinta 45 s:n odotuksella (lokit/nui-aloituslento-kuvat-2): 5/5, 267 ms, kartta täynnä.
- a (oikea reitti `ui aloita pariisi lento`, heti kun sisältö ladattu, lento loppuun) ja b (sama, `ui ohitalento` 3 s:n kohdalla): 212 ja 229 ms, 5/5, kaikki vuorollaan. Kuvajono tyhjenee 2-3 s:ssa lennon alusta. Kuva 1 nousee kartan latauksessa 95 % ja 93 %; 100 % noin 1 s myöhemmin. Terävän odotus ei täyty, katto 3 s. Laskeutuessa kartta on sumea mutta teineen, terävä alue Louvren ja Notre-Damen ympärillä (a z2, b z3). Ei vinoa reunaa.
Auki: ajo 356eb0101 oli testireitti JA ehkä kylmempi puu, joten syytä ei ole erotettu. MITÄ c ja d ratkaisevat:
- c = sama testireitti tällä haaralla. Jos tyhjä pohja ja 0/5 toistuvat, syy on testireitti (ei lennä, ei EsilataaSaapuminen eikä SaapumisEnnakko). Jos eivät, syy oli kylmä puu; kerro näin PT:lle.
- d = b ilman kuvien levyvälimuistia (MATKAKIRJA_KUVAT_KANSIO). Tarkista lokista reitti verkko, "kuvat esiladattu N/5" ja rivit "kuva N t ... vuoro ...": ehtiikö kuva ennen vuoroaan. Tämä on lähin ensimmäisen pelin kuvaa; kartan levyvälimuisti on silti lämmin.
Komento: grep "mittaus \(lento\|testi\)\|ui saapuminen: \(esilataus\|kuvat esi\|kuva [0-9] t\|traileri kuva [0-9] sisään\|kartta\)" unity.log (rajaa tiedostoon).
Jos d:ssä kuva myöhästyy, se on vika (PT 22.2x: myöhässä latautuva kuva on vika, vaikka uusinta onnistuisi). Koodista: Saapumistraileri odottaa esilatausta enintään EsilatausKattoMs 1500 ms; Kuvat.Vuoro on 2 yhtäaikaista ilman tärkeysjärjestystä. Mahdollinen korjaus kokeena: trailerin kuville oma kiirevuoro ja lennolla pidempi odotus; kuva uudesta ajosta PT:lle. Ei korjausta, jos mittaus ei osoita tarvetta; kerro silloin PT:lle.
Tulos PT:lle 3 rivinä. Uudet viestit PT:lle on jo annettu a:sta, b:stä ja ajosta 33; älä toista.
Kuvat kartalla ja napautus: Louvre ja Riemukaari avautuvat täysikokoisina (uusinta, lento-8, 9). Sisältö kunnossa.

## 2. Havainnekuva-merkintä: liian haalea, korjaus kokeena tekemättä
Lento-8 täysikokoisena: mk-traileri__lahde + mk-nosto__lahde (Pulu.uss 956, Kartta.uss 1577; väri --map-ink-72) suoraan kartan päällä kuvan alla; ohut harmaanruskea kartan kuvioilla. PT: korjaa kokeena, jos hyväksymätön: PT:lle kerrottu "korjaan samassa". Ehdotus: paperitausta kuten valkoisessa kyltissä, vain mk-traileri__lahde. Kuva ajosta.

## 3. Kyltit: ei kuittausta. Ehto 30 vaihtoa, ei löysene
Ajo 33 (karttaseppa-yhteinen-33-b8-5ec6922a5): 12 riviä tallenteissa. PT:lle kerrottu. Laskin: scratchpad ei säily; regex (.+?) piilossa ...; kuva = ruutu - "alkaa"-rivin ruutu, tallenteessa 150 kuvaa. Sarjat lokit/nui-tahtikyltit-20261106/ajo33.
- f4ad1b95b: merkki pysyy kyltin kyljessä kahdessa katsotussa vaihdossa (gr-12-m 66-83, l-8-m 67-82). Tarkista lisää listan -34 ajosta.
- Luxembourgin 0,16 s:n paluu ei toistunut 6 vaihdossa, reitti eri kuin ajossa 30: yhä mahdollinen vika.
- Galerie katoaa ja palaa 0,22 s:ssa (gr-12-m 69-80, gr-12-p 35-46): mahdollinen vika. Bastilji b-3-m 42-73 ei katsottu kuva kuvalta.
Lista -34: 12 paria vain osuneilta reiteiltä, ajamatta, arvio enintään noin 36 riviä. Alle 30 = PT:lle, uusi lista KS:lle, ei omaa ajoa.

## 4. Invalidit (PT, mc-eiffel-85-koe)
`ui kohdenostot kyltti Invalidit` vastasi "ei merkkiä (oikeasti poissa)", pistettä ei saatu. Kuvassa kyltti etualan katon reunalla, noin 120 px kupolista. PT:lle kerrottu. Ei omaa ajoa.

## 5. Muut
99b556890 todistettu ajosta 31; 166378891 toimii, ei junaan. Yhdistelmä 1104d0994 PT:n kuittaama, junarivi JU:lta PT:lle. NS:n Liiku 43a2fa300 erillään. E (yli 10 s:n vika) seurannassa, ei mitattu. Tappien lasku vaakapuhelimelle: vasta, kun UI-sarja on yhdistetty.
Havainnot, ei korjattu: piilossa olevan elementin suodin jää voimaan; Livian ohjeteksti terävä sumean kartan päällä; katujen nimet eroavat samalla kameralla; kyltit portaittain iPadilla (PT: ei nyt); Temple jätetään näin; Les Halles ei ajossa 26; suurennuslasin haalea neliö; Lopeta kierros ja Linssit lähes samassa; Saapumiskortti, Latauspalkki, KaupunkiKortti, Ponnahdus tarkistamatta; aaripisteet 38 × kärkimäärä; Metroasema haalea sc-80:ssä; Tuileries'n kuva Louvren kulmassa.

## Opit
- zsh: "$S:Assets" on muunnin: kirjoita "${S}:polku". Echo "=====" kaatuu zsh:ssa.
- unity-tarkistus.sh ajetaan sh:lla; se ei käännä Editor-kansiota.
- Skenaariossa `oleta` hakee koko lokista; `oleta-uusi` voi ohittaa rivin, jos se tuli ennen askelta. Yksilöllisille riveille `oleta`.
- `git grep` polulla: Assets/Matkakirja/*.cs kattaa alihakemistot; /**/ ei osu suoraan kansiossa olevaan.
- Mac: liikevalinta palaa pääkameraan "siirtymä ohi", joten levossa valinta 640×480 myös komennolla maasto siirtyma.

## Ei todennettu
Kylmä kartan levyvälimuisti. Oikea laite. Välke 30 vaihdossa. Invalidien piste.

## Muuta
Etäyhteys vain KK:lla (ja PT:lla): älä kytke. Hookin työlistarivit (Nimet häipyvät, Vaaleat kyltit, Palatsin sisätilat) eivät tunnistu omikseni, en päivittänyt.

## PÄIVITYS: c ja d luettu, korvaa kohdan 1 "Auki" ja "Odottaa" rivin 1
c (sama testireitti kuin 356eb0101): 5/5, 233 ms, kartta täynnä. Testireitti ei ole syy; importit samat (592), joten kylmä puu ei selitä. d (Ohita, kuvat verkosta, tyhjä levyvälimuisti): 5/5, 1137 ms, kaikki vuorollaan, "kartta terävä 3117 ms".
SYY MITATTU: ajossa 356eb0101 kaksi kartan pientä kuvaa (pantheon ja notre-dame @54x54) varasivat kuvajonon molemmat paikat 9,16 s:ksi, ja Eiffel ja Riemukaari odottivat niiden takana 8,43 s. c:ssä yksikään lataus ei kestänyt yli 2 s (paitsi alun tripoli). Miksi lataus jumitti 9,16 s, ei mitattu. Vika 1 ajossa 6:sta. Tyhjän pohjan syytä ajossa 356eb0101 ei mitattu.
PT:lle kerrottu, ehdotus odottaa sanaa: trailerin kuville oma paikka kuvajonossa (Kuvat.Vuoro), ettei pieni kuva tuki niitä. Korjaus vain PT:n sanalla, kokeena; todennus vaatii keinotekoisen jumin, koska vika ei toistu itsestään. Havainnekuva-korjaus (kohta 2) tehdään samalla.
Laskeutuessa ja perille tullessa d z3:ssa näkyy tasoraja sumean ja tarkemman välillä oikealla alhaalla; kuuluu kartan puolelle, kerrottu PT:lle.

## PÄIVITYS 2 (uusin): KORVAA EDELLISEN "ehdotus odottaa sanaa". LUE TÄMÄ ENSIN.
PT antoi sanan. Korjaus tehty kokeena, ei junaan: haara natiivi-ui/aloituslento-mittaus-219, proto-repo, 51f9fad72 (Kuvat.HaeKiireella, Saapumistraileri, `ui kuvajumi`, Pulu.uss). Tulokset: tulos-nui.md, viimeinen luku; PT:lle kerrottu.
Todennettu: jumi 12 s ilman korjausta vika toistuu (0/5), korjauksella 5/5 ennen vuoroa (lokit/nui-aloitus-jumi-vertailu, -korjaus).

SEURAAVA TEHTÄVÄ, kun JU kuittaa lokit/nui-aloitus-kk-2 (51f9fad72):
1. Katso täysikoossa k12-riemukaari-iso ja k13-louvre-iso: Havainnekuva-merkintä vaalealla paperilla, tumma teksti, keskellä kuvan alla, luettava. Ensimmäinen versio oli tumma tumman päällä. Jos ei kelpaa: korjaa Pulu.uss (.mk-nosto__lahde.mk-traileri__lahde), uusi ajo.
2. Katso k01-k11: viisi kuvaa järjestyksessä Eiffel, Riemukaari, Sacré-Cœur, Notre-Dame, Louvre.
3. PT:n käsky: "kuvat lentoalkuineen KK:lle (omistajalle luvattu korjattu intro), sha minulle". Lähetä KK:lle (local_37f7c945-e1a0-4638-90b8-93c389a36fbe) lokikansio ja lyhyt kuvaus; PT:lle 51f9fad72 3 rivinä. Älä leikkaa tunnettua vikaa: kerro KK:lle samassa viestissä k01:n suorakaiteet ja laskeutumisen sumea kartta (k05) sekä se, ettei laitteella ole mitattu.

AUKI, kirjattu PT:lle:
- Tyhjän pohjan ja vinon reunan syy ajossa 356eb0101 ei ole mitattu; ei toistunut 9 muussa ajossa. Rivit "mittaus lento" kertovat kartan valmiuden ensimmäiseen kuvaan asti.
- k01 (lennon alku, 2 s): pallolla isot tasaiset vaaleat suorakaiteet Euroopan ja Afrikan päällä; syy mittaamatta, kartan puolta. Ei ole sinun korjattavasi ilman PT:n sanaa.
- Jumin 9,16 s:n syy ei tiedossa (kaksi @54x54-kuvaa ajossa 356eb0101). Pääsäie seisoi 5,8 s ajossa jumi-korjaus, ei toistunut ajossa kk.
- Oikea laite ja kylmä kartan levyvälimuisti: ei mitattu.
Testikomento `ui kuvajumi` ja mittausrivit on poistettava, jos korjaus viedään junaan; poiminta vain PT:n sanalla.
Kyltit: KS ajaa listan -34 ajossa 34 ja kertoo lokikansion; kohta 3 pätee. Ajon arvio tehdään kyltit33.py:llä (lokit/nui-tahtikyltit-20261106/).

## PÄIVITYS 3: PT k01:stä
PT: suorakaiteet ovat iso vika pelaajan ensimmäisessä näkymässä; PT kysyy syyn NS:ltä, sinä et korjaa karttaa. KK:lle menevissä kuvissa alku on mukana ja vika kerrotaan viestissä, ei leikata. AIKALEIMA: näkyvät, kauanko suorakaiteet ovat ruudussa.
Skenaario sk-aloitus-kk.txt muutettu: k01a-k01f peräkkäin heti lennon alusta. Laske aika unity.logista: "ESIKATSELU kuva k01x" rivin edeltävä "mittaus lento: t ... (+x s)". Kuvaväli on noin 1-2 s (kuvakaappaus pysäyttää pelin), joten kesto on arvio. Ei ole kuvatallenne.
