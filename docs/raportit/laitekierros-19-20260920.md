# Laitekierros 19 — v1980 tuotanto, iPhone 18 Pro -simulaattori (Safari)

20.9.2026 n. klo 20.10–20.21. Testattu matkakirja.app (tuotanto, v1980
vahvistettu päivitysdialogista). Reitti: Ljubljana → (juna) Venetsia →
(juna) Alpit → (liftaus) Pariisi. Kaappaukset vain tämän session
transkriptissa — simulaattorityökalu ei tallenna kuvia tiedostoiksi,
joten en voinut viedä niitä docs/raportit/kaappaukset/-kansioon.

## Vahvistettu toimivaksi

- **Liftauksen kantaman kaaret**: Grindelwaldista (Sveitsi) liftatessa
  näkyivät katkoviivat ja noppa-animaatio kaikkiin kantaman kaupunkeihin
  (Pariisi, Marseille, Bryssel, Berliini, Venetsia, Firenze) selkeinä
  ympyröinä. Toimii hyvin.
- **Saapumisen piilot**: Pariisin saapumiskortin aikana (Notre Dame
  -kuva) tausta oli voimakkaasti sumennettu, matkakirjapaneelia tai
  pulun kuplaa ei näkynyt. Täsmää "huntu 80 %" -linjaukseen.
- **VARUSTEET-paneeli**: avautuu suoraan matkalaukkukuvakkeesta
  (£-summan vieressä), ei tarvinnut erillistä "Maailma"-kytkintä.
  Vesistölinssi (sinivihreä suurennuslasi) tunnistettu ikonilistalta.

## Joet Ranskan kartalla: EI NÄY — mutta tämä on jo tiedossa

Tarkistin Ranskan kartan kolmella zoomilla (koko maa, Pariisi-Loire
-taso, kaupunkitaso) enkä nähnyt yhtään piirrettyä jokiviivaa: Seine ei
näy Pariisin ympärillä lainkaan (vaikka saapumisteksti mainitsee
"Seinen rannalla"), Loire näkyy vain tekstilabelina ja pienenä ≈-ikonina
ilman viivaa, Rhônea en ehtinyt tarkistaa Lyonin kohdalla erikseen.
Kaupunkitason zoomissa (Pariisi-teksti täyttää ruudun) koko reliefi-
tausta katoaa tyhjäksi pergamentiksi.

**Tämä ei ole uusi löydös.** git log paljastaa, että omistaja löysi
saman tänä iltana omilla kaappauksillaan ennen minua: commit
`d75bb272 Omistajan kaappaukset 20.9. ilta: nimiot reunassa, joet eivat
nay`, ja korjaustyö on jo käynnissä haaralla `v1973-prep`/`laitetestaaja`
(`64e402d3 Jokitaso: joet ilman reitteja pallon lepokerrokselle`,
`a91b76f4 Loki: joet levossa - jokitaso (A)`). Vahvistan siis vain, että
sama oire toistuu myös iPhone-Safarissa tuotannossa — ei uutta tikettiä,
ei kaappauksia (Fablen ohje: severiteetti 3 vain tiedostoon, mutta tämä
ei edes ole uusi rivi — pelkkä vahvistus).

## Ei ehditty tarkistaa (aikabudjetti)

Navigointi Ljubljanasta Ranskaan kesti odotettua kauemmin (kosketus-
pisteiden muunnos pikseleistä laitepisteiksi, ks. opit alla), joten
seuraavat kierros 19 -kohdat jäivät auki:

- Rajaviiva 3 px (ei mitattu pikselitasolla)
- Huntu 80 % (nähty visuaalisesti saapumisessa, ei mitattu erikseen)
- Kartuscha (radiovalo, lippu, vilkku) — maakortin alaosassa näkyi vain
  lippu+nimi, en löytänyt radiovaloa/vilkkua tällä kierroksella
- Astronautin kamera (kypärä, inforuutu, karttaselitenappi pois) — en
  löytänyt varsinaista Astronautti-tilaa, vain pallon zoomaus

## Opit seuraavalle kierrokselle

- **Kosketuskoordinaatit ovat laitepisteinä (402×874 iPhone 18 Prolla),
  eivät kuvapikseleinä.** Kuvakaappaus on n. 2,289× suurempi. Jaa
  kaappauksesta luetut pikselit 2,289:llä ennen `tap`-kutsua, muuten
  kosketus osuu väärään kohtaan (tai laudan ulkopuolelle).
- **Pallon/reliefin zoomaustaso on kiinnitetty pelaajaan** — yhden
  sormen raahaus ei panoroi vapaasti, vain nipistys zoomaa. Etäisen
  maan (esim. Ranskan Sloveniasta) tarkistus vaatii oikeaa matkustamista
  (juna/liftaus), ei vapaata karttaselausta. `?lauta=maailmankartta`
  katselutila jäi mustaksi ruuduksi tällä yrityksellä — en selvittänyt
  syytä, ei kriittinen (ei pelaajapolku).
- Tuotanto-osoite on **matkakirja.app**, ei pages.dev.
