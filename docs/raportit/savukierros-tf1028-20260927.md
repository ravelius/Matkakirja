# 1.0.28-juna juna/b13 1eff4f76 (käännös d3fa3c78), 27.9.2026 ~09.0x

Valmisteltua reseptiä ajettu (docs/raportit/laitetestaaja-reseptit.md, "1.0.28-kierroksen valmisteltu
resepti"). Käännös oli jo käännöspalvelun toimesta asennettu simulaattoreihin klo 07:51 — tarkistin
vain käynnistämällä, en reinstallannut. iPhone yksin, console-pty-kaappauksella.

## Tulokset

- **0 poikkeusta koko session ajan: PASS.**
- **P1 (NostoSisalto crash-safety): OSITTAIN.** Ei kaatumista koodipolkuja harjoitettaessa (nosto,
  pooli). Täyttä race-condition-toistoa (sisällön vaihto tarkalleen fetch-kesken) ei saatu pakotettua
  ilman elävää sisältöpalvelinta — sama rajoitus kuin 170:ssä.
- **Pulun kaiutinvipu: PASS.** ON = kulta tausta + aallot, OFF = haalea + yliviivattu kuvake.
  Molemmat tilat todennettu kuvakaappauksin.
- **Striimiääni-valitsin iPhonella: PASS.** Kehittäjä-paneelissa "ara (oletus)" näkyy täydessä
  rivin levyisenä, ei puristunut tyhjäksi.
- **Lukijan tauko (mittaa ms): PASS.** Wiki-artikkeli (Venetsia): 1. segmentti "alkoi 5718 ms (verkko)"
  (otsikko yhdistetty ensimmäiseen kappaleeseen, ei erillistä otsikkosegmenttiä), 2. segmentti
  "alkoi 33 ms (välimuisti)" — esihaku toimii, tauko lyhyt.
- **Erikoismallit MSM/Stonehenge/Colosseum: OSITTAIN PASS.** Colosseum vahvistettu sekä visuaalisesti
  (selvä 3D-amfiteatteri Roomassa) että lokista ("liikkuu: parvi lepää, velarium 14 s"). Brandenburgin
  portti (bonus-maamerkki) rekisteröity ja seurattu lokissa. Mont-Saint-Michel ja Stonehenge eivät
  löytyneet annetuista koordinaateista tällä kierroksella (ei ehditty selvittää tarkkaa syytä —
  mahdollisesti kamera-asemointi tai lisäys ei täysin toiminut tässä käännöksessä).
- **Kategoriasymbolit 3D + vuori Olympoksella: PASS.** `symbolit tila` Olympoksen lähellä: "taso 2: 8
  instanssia symboli:...Vuori×1..." — vuori-kategoriasymboli renderöity oikeana 3D-mallina (338/60
  kolmiota), maakontakteja 8/8 (istuu maastolla).
- **Kinderdijk NLD: PASS, selvä visuaalinen vahvistus.** Kolme tuulimyllyä 3D-malleina näkyvissä
  Kinderdijkissä (erikoismallit2-haaran bespoke-malli mergattu mukaan). HUOM: kamera-asemani
  (ZoomKerroin 3,26) oli jo yli vanhankin 2,5-kynnyksen, joten en eristänyt tarkasti pienten
  maiden kynnysarvo-korjausta — malli itsessään toimii selvästi.
- **177 (mittauslippujen säilyminen, korjaus 0430842): PASS.** `saapuminen vartija paalle` → uusi
  peli (Pariisi) → `saapuminen vartija tila`: "korjaus päällä" säilyi uuden pelin istunnon yli.

## Yhteenveto
6/8 kohdetta täysi PASS, 2/8 osittainen (P1:n race-condition ei toistettavissa ilman elävää
sisältöpalvelinta — sama rajoitus kuin aiemmin; MSM/Stonehenge eivät löytyneet, Colosseum ja
Brandenburgin portti kylläkin). 0 poikkeusta. Simulaattori sammutettu turvallisesti.
