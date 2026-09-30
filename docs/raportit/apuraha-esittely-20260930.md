# Apurahan arvioijalle – esittelykortti (Päätoimittaja 30.9.2026, luonnos v4)

Omistajan pyyntö 30.9.2026 klo 11.0x: pelin aloitusnäkymään (natiivi + web) nappi
**"Apurahahakemus – katso tämä ensin"**, joka avaa esittelykortin (kuvat + teksti, luettavissa
noin kahdessa minuutissa). Myöhemmin (lähiviikkoina) kortin alkuun lyhyt esittelyvideo pelin
huippukohdista ja kehityksen tilanteesta. Webiin lisäksi pysyvä huomautus App Store -versiosta
(ks. loppu).

Merkinnät [TARKISTA] Laitetestaaja varmistaa TF-versiosta ennen julkaisua; Päätoimittaja
päivittää tekstin sen mukaan.

---

## Kortti

**Otsikko:** Apurahan arvioijalle

**Alaotsikko (kursiivi):** Matkakirja ja unohdettu aarre · tilanne 30.9.2026

**Kappale 1 – mikä peli on**

Matkakirja ja unohdettu aarre on suomenkielinen seikkailupeli 13 vuotta täyttäneille ja
aikuisille. Nuori Fogg seuraa isoisänsä vuoden 1873 matkapäiväkirjaa halki nykyajan Euroopan ja
etsii kadonneen luettelon unohdettuja aarteita. Maailmasta oppii matkustamalla: jokaisella
kaupungilla on oma matkakirjansa, kartan nostot johdattavat nähtävyyksiin ja tarinoihin, ja
isoisän ääni lukee matkakirjan ääneen.

**Kappale 2 – kokeile kolmessa minuutissa**

1. Aloita uusi matka ja valitse ensimmäinen kohde. Perillä avautuu isoisän matkakirja, ja isoisä
   lukee sen ääneen.
2. Napauta kartalta nostoa: kuva ja lyhyt tarina nähtävyydestä.
3. Kysy Pulu-kyyhkyltä kaupungista mitä tahansa. Vastaus tulee noin puolessa minuutissa.
4. Kokeile linssejä: ne näyttävät maailman eri aiheen kautta, esimerkiksi astronautin kamera,
   maailman radiot ja Olavinlinnan poikkileikkaus. Jos linssilista on tyhjä, tämän kortin nappi
   "Avaa esittelylinssit" avaa kaikki, myös kehitteillä olevat.

   WEB (webTeksti): 4. Kokeile linssejä: ne näyttävät maailman eri aiheen kautta, esimerkiksi
   maailman radiot ja ihmisen matka. Jos linssilista on tyhjä, tämän kortin nappi "Avaa
   esittelylinssit" avaa kaikki. Kolmiulotteiset linssit ovat vain iOS-sovelluksessa.

**Kappale 3 – missä mennään**

Kehitys tapahtuu nyt iOS-sovelluksessa, joka rakennettiin syyskuussa uudelleen natiivina. Kartta
on pelin oma, itse poltettu, ja se tarkentuu koko maapallolta kaupunkitasolle. Uusi testiversio
ilmestyy lähes päivittäin, ja tämä testiryhmä saa aina uusimman. Sisältöä on 266 kaupungista ja
117 maasta; työn alla on Euroopan viimeistely. Seuraavaksi tulevat ensimmäiset Euroopan
perinteiset pelit ja kolmiulotteiset kohteet; ensimmäisen, Olavinlinnan, voi jo kokeilla esittelylinsseistä.

WEB (webTeksti, loppu): … kolmiulotteiset kohteet; ensimmäistä, Olavinlinnaa, voi jo kokeilla
iOS-sovelluksessa.

**Kappale 4 – keskeneräisyys ja lisätiedot**

Testiversio on keskeneräinen, joten siinä voi näkyä kokeiluja ja paikkamerkkejä. Selainpeli
osoitteessa matkakirja.app on suppeampi versio. Koko tilannekatsaus osa-alueittain:
projektisivu (linkki projekti.html).

**Kuvat (rivi, avautuvat kokoruutuun):** Laitetestaaja 30.9., haara laitetestaaja-savukierros-b13
(b25281bc9), docs/raportit/kuvat/apuraha-esittely/01–05, puhdas asennus juna-käännöksestä 28def2a6
(TF ei aja simulaattorissa):

1. Ateenan matkakirja ja kartta.
2. Eurooppa kaukaa.
3. Nosto: Marathon.
4. Pulu-chat, kysymys ja vastaus.
5. Astronautin kamera (Cupola).

Kuvateksteissä ei sisäisiä tietoja (roolit, id:t, mallit).

---

## Webin huomautus (omistaja 30.9.2026 klo 11.1x)

Webin aloitusnäkymään pysyvä, kevyt rivi:

> Selainpeli ei sisällä kaikkia ominaisuuksia. Suosittelemme iOS-sovellusta
> (App Store -testiversion linkki on apurahahakemuksessa).

Linkkiä ei julkaista sivulla; se on vain hakemuksessa.

---

## Esittelyvideo, käsikirjoitus v1 (Päätoimittaja 30.9.2026)

Omistaja 30.9.: "nopea esittelyvideo, missä näkyisi pelin huippujutut sekä nykyisen kehityksen tilanne".
Muoto: 60–75 s, pysty 9:16 iPhonen ruutuna (laitekehys ei), pelin omat äänet (isoisän luenta, radio, Pulu),
ei erillistä kertojaa. Lyhyet tekstitykset suomeksi alareunaan pelin fontilla, 1 rivi / kohtaus. Tulee esittelykortin
alkuun (paikka varattu) ja ladataan erikseen (ei pakettiin).

| # | Aika | Kuva | Tekstitys |
| ---: | --- | --- | --- |
| 1 | 0–6 s | Portti: juliste, Uusi matka | Seikkailupeli, jossa maailmasta oppii matkustamalla |
| 2 | 6–16 s | Lento Euroopan yli ja saapuminen Ateenaan; matkakirja auki, isoisä lukee (ääni ~5 s) | Isoisän vuoden 1873 matkakirja luetaan ääneen |
| 3 | 16–26 s | Kartta: maasta kaupunkiin, nosto auki (Marathon) | Oma kartta koko maapallolle, kaupunkitasolle asti |
| 4 | 26–34 s | Pulu-chat: kysymys ja vastaus | Pulu vastaa kysymyksiin |
| 5 | 34–44 s | ISS:n Cupola: maa ikkunasta, kytkinpaneeli, nopeus 100× | Linssit näyttävät maailman uusista kulmista |
| 6 | 44–54 s | Olavinlinna aukileikattuna (vasta omistajan katselmoinnin jälkeen; muuten Tähtitaivas) | Kolmiulotteiset kohteet: Olavinlinna sisältä |
| 7 | 54–62 s | Radio: asema soi, VU-mittari | Maailman radiot suorana |
| 8 | 62–72 s | Loppukuva: logo | Uusi testiversio lähes päivittäin. Seuraavaksi: Euroopan perinteiset pelit, lisää 3D-kohteita, App Store |

Ei sisäisiä tietoja (roolit, mallit, id:t). Kuvat vain pelistä (ei kehittäjänappeja).
