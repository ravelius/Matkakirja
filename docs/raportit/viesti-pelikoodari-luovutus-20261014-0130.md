# Pelikoodarin luovutus 14.10.2026 klo 01.30 (nollaus, PT: konteksti 53 %)

## Omistajan pyynnöt sanatarkasti (PT:n välittäminä)
- RAKETTI (13.10. 23.3x): "Raketin ääni ei ole synkassa koska puhe lähtee ilmeisesti heti liikkeelle latauksen aikana vaikka pitäisi
  odottaa että lataus valmistuu. Kannattaisiko Alkuun tehdä joku köynnistys nappi ja sitten lasku viidestä nollaan? Saisiko siihen aidon
  radio äänen numeroiden laskuun ja sitten paljon paremmat aluksen savu ja tuli lieskat?" (savu ja liekit LS2)
- MAAPALLO (14.10. 00.0x, iPhone-kuva): "tuossa ed. kuvassa näkyi bugi missä maapallo hävisi lopussa näkyvistä" (T+ 23 h 21 min,
  380 km: pallo tasaisen sininen, reunakaari, tähdet, ratakäyrät ja ISS-kuvake näkyvät). Telemetrian leikkautuminen ja taulun ilme
  ("tuo vihreä taulu pitää tehdä paljon tyylikkäämmin. teksti ei mahdu myöskään sopivasti siihen") = NUI, ei sinun.
- PULU ISS:SSÄ (14.10. 00.1x): "pulua painamalla ISS:n sisällä pitäisi tulla samoja valmiita kysymyksiä joista aukeaisi normaali pulu chat"
- KUPOLI (14.10. 00.0x): "kohteita on paljon enemmän kuin mainitsemasi 64, mutta kertojan ei tarvitse puhua enää niistä jotta esittely
  ISS:n sisällä ei veny yhtään liian pitkäksi." ja "Pitää olla myös selostus miten kuva syntyy kun pelaaja sen ottaa. Pulua napauttamalla
  avautuvasta valikossa voisi yhdistää maapallon ja astronauttien kuvat koska ne ovat samaa toimintoa"
- AVAUS (14.10. 00.1x, PT): raketin alkuun pidempi avaus, kertoja kertoo mistä ja miksi laukaistaan (LS2 kamera, SK teksti, Äänittäjä).
- NORDMELA (PT 14.10.): laukaisupaikka siirtyy Nordmelaan (Pad A); LS2 maastolaatta ja kartan piste, LR alusta, avauskamera päivittyy LS2:lta.

## Proto-haarat (natiivi-backup, ei vielä junassa; PT: "valmistuneet erät junaan heti kun kuitattu")
- **pelikoodari/raketti-laukaisu-189** uusin **53502a886** (PT:n mainitsema 02754cfdd on sen edeltäjä): lataus ensin (laatat + maasto +
  äänet, katto 30 s) → avauslento (LS2 Nousu.AvausKamera 14 s, kertojan "avaus"-klippi manifesti v8) → alustan intro → KÄYNNISTÄ
  (lcdnappi, NUI hyväksyi) → lähtölaskenta 5 s LCD:llä "T− 0:05" + radion laskenta (v8 "lahtolaskenta", ON ämpärissä) → T0 ajastettu
  PlayScheduled (raita 18,32 s:sta, sytytysääni); lennon kello raidan toistoajasta. Mukana LS2:n savu/liekki v2 (11b3ba639),
  lähestymisen nousukaari (Nousu.Lahestyminen, 2e798807e), laattaloki (ffaa27f7b), `linssi raketti kello <+h|pois>` (LS2:lle).
  Testikomennot: `linssi raketti laukaise 0|1 auto`, `kaynnista`, `kupoli`, `tila`. Linssit-testit 1746+, unity-tarkistus 0.
  Puuttuu: Äänittäjän "avaus"-klippi v8:aan (Andøya-teksti hyväksytty; Nordmela voi muuttaa tekstiä → PT/SK).
- **pelikoodari/iss-kupoli-190** uusin **7fef8abf4** (= ad612cb4e + Pulun kysymykset 2ac77d8b3 + laukaisun merge): **mergeä ensin
  raketti-laukaisu-189 (2 uusinta committia puuttuu)**. Sisältö: AstronautinNakyma.CupolaValmis-portti (raita pysähtyy kupolin
  repliikkiin, kunnes näkymä valmis, katto 8 s; ohituksessa puhe loppuu), KupoliAanet + Iss.KupolinSelostus (manifesti
  audio/iss-kupoli-v1.json, ehto "yo"), NYT-nappi Ohjaamon LCD:n oikealle (NUI), Pulun taulussa kyydissä ohjaamon valmiit kysymykset
  (valinta → normaali chat + Kysy). NUI omistaa RakettiNakyma.cs:n (taulun ilme) — älä muokkaa sitä.

## Avoin jono (PT:n järjestys)
1. **Maapallon katoaminen lennon lopussa** (KESKEN). Toistettu simussa pelikoodari-iPad13: ajo4 (raketti-laukaisu-189, lyhyt lento)
   T+ 21 h 40 min / 368 km = tasainen sininen (Pohjapallo) + ratakäyrät + ISS-kuvake, täsmälleen omistajan kuva. Masterin (BUILD 188)
   täysi lento ajo2 pysyi kuvioituna. Nousukaari auttoi keskivaiheessa (T+ 12 h korkealla kuvioitu), mutta vika jäi loppulaskeutumiseen.
   Poissuljettu: kameran päivitysjärjestys (KyydinKameraEnnen kattaa jo Laukaisussa), CupolaEnnakko (vain levyesihaku).
   Ehdokkaat: lataamattomat laatat nopeassa loppulaskeutumisessa vs. laukaisun kerrokset (laukaisussa ei BMNG:tä, reliefi paikassa 1;
   AstronauttiKerros.PaivitaKuukaudenPinta(kyydissa=false)). SEURAAVA: käännös **a68d71a70** (laattaloki) on JO ASENNETTU omaan simuun;
   pyydä Julkaisijalta SIMU NYT ja aja `proto-3d/_tyo/pelikoodari/raketti-pallo/ajo-raketti-pallo.sh <ulos> 0` (kirjoittaa
   peli-komennon käynnistyksen jälkeen; aloitusvalikko muuten jää päälle), lue `raketti: laatat …` -rivit raketti.log:sta/konsolista.
   puuttuu > 0 → lataus (esim. hitaampi lasku viimeisillä %:lla, CupolaEnnakko-tyylinen esihaku kohteeseen); puuttuu 0 → kerrokset
   (vertaa kyyti-BMNG:hen; LS2 jos pallon piirto). Kuva-arkki PT:lle ennen junaa. Lokit proto-3d/lokit/pk-raketti-pallo-20261014/.
2. ~~Pulun valmiit kysymykset ISS:ssä~~ tehty (2ac77d8b3), simussa ajamatta.
3. Avauksen ajoitus LS2:n kanssa: tehty (AvausS, avaus = max(14 s, repliikki + 0,5)). Nordmela: LS2 päivittää kameran; tarkista sauma.
4. **ISS-kupoli** (suunnitelma proto-3d/_tyo/pelikoodari/iss-kupoli/suunnitelma-20261014.md, PT hyväksyi muutoksin):
   - V1: tekstit hyväksytty (SK docs/raportit/iss-kupoli-v1-v2-v3-kertoja-20261014.md), Äänittäjä tekee; manifestin muoto lähetetty
     Äänittäjälle: {"jaksot": [{id, tiedosto, ehto?}], "tapahtumat": {id: tiedosto}}. KupoliAanet lukee nyt vain "jaksot" — lisää
     "tapahtumat" (V2/V3). SOITTOSÄÄNNÖT (PT): v1-aika ("…Napauta maapalloa, niin kelataan…") vasta kun V2:n napautus on pelissä
     (siihen asti ohita); V3b kuvan synty -klipit kukin vain kerran (ensimmäinen kuva siinä tilassa); kulma 23° (ei 22,5) myös LCD:ssä;
     V1 n. 70 s, ei lisää jaksoja ilman PT:tä. Paikan nimi vain LCD:lle. Vivun portaat 1/10/100/1000 pysyvät.
   - V2: napautus maapallolla → Ylilennot.Seuraava (500 km, 72 h, koko maailma: poista Kohteet-funktion Eurooppa-suodatin) → kelaus
     (~8 s, korkealta kuten nousukaari), LCD "HUOMENNA 04.12 · 14 KIERROSTA", tapahtumaklipit v2-*.
   - V3: ylilennot KAIKKIEN astronautin kameran kohteiden yli, EI kertojaa kohteista; oma kuva vs. astronauttikuva; kuvan synty
     (v3-kuva-paikka/-paiva/-yo); galleria NUI:n GALLERIA-pohjalla (Pohjat/galleria.uss, KUVAT n/m, osio per kohde: oma kuva ensin,
     sitten astronauttikuvat); Pulun valikon "Maapallo" + "Astronauttien kuvat" → "Kuvat".
   - Kupoli V1 menee samaan junaan kuin raketti, jos kuitattu ennen lukitusta.
5. Video raketista PT:lle, kun äänet (avaus) ovat valmiit: SIMU NYT Julkaisijalta.

## Web
- #4573 (pääkaupungit e04–e14, 93 kaupunkia) PT kuitannut → junan 189 web-merge-lista (NS:lle ilmoitettu). Kohdekarttojen
  näkyvyys tarkistettu (Canberran Mount Majura ohjeen alla → KS korjaa reunavaran, haarasta pelikoodari-pk-kytkenta-e04-e14).
- Kuvaustyökalut: proto-3d/_tyo/pelikoodari/pk-kytkenta/kuvaus/ (kuvaa-pk.mjs, kuvaa-kartta.mjs, arkki.py).

## Työtilat
Proto: wt/proto-pelikoodari-laukaisu (raketti-laukaisu-189), wt/proto-pelikoodari-kupoli (iss-kupoli-190); muut poistettu.
Web: ei erä-worktreetä. Simu pelikoodari-iPad13 (39644E75…) sammutettu, a68d71a70 asennettuna.
