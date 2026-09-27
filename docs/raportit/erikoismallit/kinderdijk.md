# Erikoismalli: Kinderdijkin myllyt (speksi, pohja docs/raportit/erikoismalli-speksi-pohja.md)

*v3 27.9. klo 08.4x (proto mallinseppa/erikoismallit3 29632e19): laitteella v2 näkyi noin 35 pt:n "tikapuuna",
koska kanavat hallitsivat ja myllyt jäivät 2 pt:n tapeiksi. Nyt kuusi isoa myllyä on kahdessa rivissä kameraa kohti.*

## 0. ELÄMÄNIDEA
- Kinderdijkissä 19 tuulimyllyä kuivatti polderia 1700-luvulta alkaen, ja myllyt pyörivät yhä. Kansallisena
  myllypäivänä kaikki 19 pyörivät yhtä aikaa, ja syyskuun valaistusviikolla myllyt valaistaan.
- **Perusliike:** 1–3 myllyä pyörii kerrallaan (käy 20–60 s, seisoo 30–120 s). Siivet kiihtyvät pehmeästi ja
  pysähtyvät pystyristiin (+), joka on myllärin lepoasento. Pyörimissuunta on vastapäivään edestä katsottuna.
- **Harvinainen (noin 1/10 käynnistyksistä):** myllypäivän aalto. Kaikki kuusi myllyä käynnistyvät vuorotellen lännestä
  itään (0,6 s:n välein), pyörivät 30 s ja pysähtyvät samassa järjestyksessä.
- **Reaktio:** lähestyttäessä ensimmäinen seisova mylly herää. Napautus käynnistää aallon heti.
- **Yöllä:** ikkunat hehkuvat, ja valaistusviikon lämmin valo heijastuu kanavaan myllyjen edessä.

## 1. Tunniste ja paikka
- `kohde:hahmotelma-kinderdijk`, avain `kinderdijk`. Alankomaat, 51,8834 N, 4,649 E, taso 1 (tekniikka,
  lähizoom).

## 2. Viitekuvat (Commons)
- Ilmasta: File:NIMH - 2011 - 0466 - Aerial photograph of Kinderdijk, The Netherlands - 1920 - 1940.jpg (CC BY-SA 4.0,
  NIMH, kuvaaja tuntematon).
- Sivulta: File:KinderdijkMolens02.jpg (CC BY-SA 3.0, Lucas Hirschegger).
- Pohjapiirros: Kinderdijkistä ei löytynyt PD-piirrosta. Rivien suunta on tyylitelty (kohta 4).

## 3. Siluetti ja tunnusmerkit
1. Kaksi rinnakkaista kanavaa, ja kummankin varrella rivi myllyjä. Siipiristit ovat kameraa kohti vierekkäin.
2. Kaksi myllytyyppiä: Nederwaardin pyöreät tiilimyllyt (1738) ja Overwaardin kahdeksankulmaiset ruokomyllyt (1740).
3. Siivet ulottuvat lähes maahan asti (grondzeiler), eikä myllyissä ole parvea.
4. Takarivin itäpäässä on Wisboomin pumppaamo piippuineen.
- Pois jätetään loput 13 myllyä, kanavien penkereet, siipirattaat ja pellot, jotka ovat karttaa. Siivissä on
  tumma reunarima ja kaksi poikkirimaa, jotta ristikko erottuu paperista myös pienenä.

## 4. Mitat ja koko
- Myllyt ovat 25–30 m korkeita, ja siipien väli on 27,5–29,5 m. Rivit ovat noin 1 km pitkiä.
- Yksikkö: 1,0 ≈ 1,2 km. Myllyt on liioiteltu noin 20-kertaisiksi (runko 0,22, siipiväli 0,24), jotta siipiristit
  erottuvat myös pienten maiden kynnyskoossa (33 pt). Rivien väli on 0,26, ja takarivi on puoli väliä lännempänä.
- Koko 60 pt (KokoKerroin 1,5). Tyylitelty suunta: kanavat kulkevat idästä länteen, vaikka oikeasti ne kulkevat
  pohjoisluoteesta etelään. Näin rivit näkyvät vierekkäin eivätkä peräkkäin, kun kamera katsoo etelästä. Siivet ovat
  etelälounaaseen kameraa kohti.

## 5. Paletti ja aksentti
- Tiili lämmin seepia, ruoko harmaanruskea, siivet tumma puu ja vaalea purjekangas (0xddcfae), kanavat
  vedenvärisiä (EmVesi).
- Aksenttia ei ole. Liike tulee siivistä, ja yövalot ovat lämmin ikkunavalo.

## 6. Animaatio
- **Siivet (osat siivet0–5, numerointi lännestä itään rivien välillä vuorotellen):** kierto napansa ympäri, akselina
  tuulen suunta. Kierros kestää 5 s, kiihdytys 3 s, ja
  hidastus on tasainen niin, että siivet pysähtyvät tarkasti pystyristiin.
- Aalto: porrastus 0,6 s, kesto 30 s. Aallon jälkeen jokainen mylly seisoo 30–120 s.
- Ruudulla on enintään 3 myllyä liikkeellä (perusliike). Liikekoordinaattori rajaa lisäksi mallit.
- Levossa piirretään 0 kehystä.

## 7. Kolmiot ja LOD
- Runko 348 (kanavat ja kaislat, 6 myllyä, pumppaamo). Siivet 6 × 80 = 480 ja valot 72. Yhteensä 900. (v2: 744.)

## 8. Ääriviiva ja perspektiivi
- Jokainen mylly ja pumppaamo on oma ääriviivaosansa. Kanava ja sen kaislat ovat yksi ääriviivaryhmä, jolloin viiva
  kiertää vain veden reunan. Siivet ovat liikkuvia osia ilman ääriviivaa.

## 9. Hyväksyminen
- Kuvat: pelikoko 30° ja 55°, lähizoomi 45° ja yö. Video 12 s aallosta.
