# Erikoismalli: Kinderdijkin myllyt (speksi, pohja docs/raportit/erikoismalli-speksi-pohja.md)

## 0. ELÄMÄNIDEA
- Kinderdijkissä 19 tuulimyllyä kuivatti polderia 1700-luvulta alkaen, ja myllyt pyörivät yhä. Kansallisena
  myllypäivänä kaikki 19 pyörivät yhtä aikaa, ja syyskuun valaistusviikolla myllyt valaistaan.
- **Perusliike:** 1–3 myllyä pyörii kerrallaan (käy 20–60 s, seisoo 30–120 s). Siivet kiihtyvät pehmeästi ja
  pysähtyvät pystyristiin (+), joka on myllärin lepoasento. Pyörimissuunta on vastapäivään edestä katsottuna.
- **Harvinainen (noin 1/10 käynnistyksistä):** myllypäivän aalto. Kaikki kahdeksan myllyä käynnistyvät vuorotellen rivin
  päästä päähän (0,6 s:n välein), pyörivät 30 s ja pysähtyvät samassa järjestyksessä.
- **Reaktio:** lähestyttäessä ensimmäinen seisova mylly herää. Napautus käynnistää aallon heti.
- **Yöllä:** ikkunat hehkuvat ja myllyjen juurella on valaistusviikon lämmin valo.

## 1. Tunniste ja paikka
- `kohde:hahmotelma-kinderdijk`, avain `kinderdijk`. Alankomaat, 51,8834 N, 4,649 E, taso 1 (tekniikka,
  lähizoom).

## 2. Viitekuvat (Commons)
- Ilmasta: File:NIMH - 2011 - 0466 - Aerial photograph of Kinderdijk, The Netherlands - 1920 - 1940.jpg (CC BY-SA 4.0,
  NIMH, kuvaaja tuntematon).
- Sivulta: File:KinderdijkMolens02.jpg (CC BY-SA 3.0, Lucas Hirschegger).
- Pohjapiirros: Kinderdijkistä ei löytynyt PD-piirrosta. Rivien suunta on tyylitelty.

## 3. Siluetti ja tunnusmerkit
1. Kaksi rinnakkaista kanavaa, ja kummankin varrella rivi myllyjä, joiden siipiristit ovat jonossa.
2. Kaksi myllytyyppiä: Nederwaardin pyöreät tiilimyllyt (1738) ja Overwaardin kahdeksankulmaiset ruokomyllyt (1740).
3. Siivet ulottuvat lähes maahan asti (grondzeiler), eikä myllyissä ole parvea.
4. Pohjoispäässä on Wisboomin pumppaamo piippuineen.
- Pois jätetään loput 11 myllyä, siipien ristikko, siipirattaat ja pellot, jotka ovat karttaa.

## 4. Mitat ja koko
- Myllyt ovat 25–30 m korkeita, ja siipien väli on 27,5–29,5 m. Rivit ovat noin 1 km pitkiä.
- Yksikkö: 1,0 ≈ 1,2 km. Myllyt on liioiteltu noin kuusinkertaisiksi (runko 0,085, siipiväli 0,12), jotta siipiristit
  erottuvat 60 pt:ssä. Kanavien väli on 0,22.
- Koko 60 pt (KokoKerroin 1,5). Kanavat kulkevat 160°:n suuntaan (tyylitelty), ja siivet ovat lounaaseen tuulta vasten.

## 5. Paletti ja aksentti
- Tiili lämmin seepia, ruoko harmaanruskea, siivet tumma puu ja vaalea purjekangas, kanavat vedenvärisiä
  (EmVesi) ja penkereet vaalea hiekka.
- Aksenttia ei ole. Liike tulee siivistä, ja yövalot ovat lämmin ikkunavalo.

## 6. Animaatio
- **Siivet (osat siivet0–7):** kierto napansa ympäri, akselina tuulen suunta. Kierros kestää 5 s, kiihdytys 3 s, ja
  hidastus on tasainen niin, että siivet pysähtyvät tarkasti pystyristiin.
- Aalto: porrastus 0,6 s, kesto 30 s. Aallon jälkeen jokainen mylly seisoo 30–120 s.
- Ruudulla on enintään 3 myllyä liikkeellä (perusliike). Liikekoordinaattori rajaa lisäksi mallit.
- Levossa piirretään 0 kehystä.

## 7. Kolmiot ja LOD
- Runko 408 (kanavat, penkereet ja kaislat, 8 myllyä, pumppaamo). Siivet 8 × 32 = 256 ja valot 80. Yhteensä 744.

## 8. Ääriviiva ja perspektiivi
- Jokainen mylly ja pumppaamo on oma ääriviivaosansa. Kaislat ovat ilman reunaa, ja siivet ovat liikkuvia osia ilman
  ääriviivaa.

## 9. Hyväksyminen
- Kuvat: ylhäältä (kanavat ja myllyrivit), 30°:n kallistus (siipiristit) ja reuna. Video 12 s aallosta.
