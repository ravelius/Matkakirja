# Natiivi-UI:n luovutus 23.–24.9.2026 (yö)

Jatkaa luovutuksia `viesti-natiivi-ui-luovutus-20260923.md` ja `-ilta.md`. Proto-git:
`/Users/Shared/Claude/proto-3d/Matkakirja-proto`, Natiiviseppä mergeää, `.meta`t syntyvät hänen editorissaan.
Käännöstarkistus `./Peli-testit/unity-tarkistus.sh`, testikomennot `UI-testit/README.md`.

## Masterissa (tämän session erät)

- galleriat, lehden kytkentä (ILehtiNakyma, webin alapalkki, palkintojuliste), portti (juliste + kaanonlause, äänet-nappi),
  keksintöjen esittely, turistiopas + säägraafi + nähtävyysarkki, skeema 1.15 -lukija
- inventaario 5–10 ja 11–20: logo → tekijätiedot, kuvien suurennokset, pulun vastauskuva ja käsitelinkit,
  "Näytä puhekuplat", maalehden etusivu ja Maa numeroina, lipun tarina, kohdekortin korostukset, periaatteiden linkki
- radion kuori (kotelo, pistenäyttö, asteikko, linkkiasema) ja tauko RadioLinssi.Tauko:lla
- pieni liike (UITK-kerros 10), näkyvä noppa (Pelikoodarin PeliNakymat.Noppa + RuutuPiste)
- kaupunkikortin piikkikorjaus (kuvat UnityWebRequestTexture, lehtien JSON taustalla)

## Merge-pyynnössä

- `natiivi-ui/leima` 17e54c7: rahan muutoksen tapahtumakupla (Pelikoodarin RahaMuuttui). `.meta` UI/Leima.cs.

## Kesken (worktreet, tarkista `git status` ja kääntyminen ensin)

1. `wt/proto-natiivi-ui-portti` = `natiivi-ui/sahke` 55b8023 (pelikoodari/sahke + master):
   kaveriapu (KysymysNakyma) ja SahkeNakyma (liuska + retkikunta valikossa) ovat committattu ja kytketty (`PeliNakymat.Sahke`, `ui sahke`).
   **Sähketehtävä** (`UI/Sahke/Sahketehtava.cs`, `Sahketehtava.uss`) teki agentti; tiedostot ovat levyllä committaamatta.
   Tee: käännä, kytke `PeliNakymat.Sahketehtava = _ => Hae().Sahketehtava` (+ tarvittaessa `PeliOhjain.SahkeHakemisto`,
   `AvaaKohde`, `LivianKuplat` → pulun kupla), testikomento, commit, merge-pyyntö (`.meta`t: Sahke/, SahkeNakyma.cs,
   Sahketehtava.cs, Sahke.uss, Sahketehtava.uss).
2. `wt/proto-natiivi-ui-piikki` = `natiivi-ui/nahtavyydet` b7edef3 (WIP, ei käänny ilman agentin tiedostoa):
   `Kohdekartat.cs` (skeema 1.17 kohdekartat + nahtavyydet + miniatyyrit, koepaketti v18+), nähtävyysarkin ☰-valikko ja ‹ › -selaus
   (`AvaaKohde`), `Nahtavyysnakyma.cs` (tiivis lehtiarkki: kartta, Kokoruutu, esittely/Lue lisää), kaupunkikortin rivi "Nähtävyydet",
   `ui nahtavyydet [kaupunki] [kohde n]`. Agentit: **`KohdekarttaNakyma.cs`** (kartta, piirrokset, valinta, zoom, kokoruutu;
   API `KohdekarttaNakyma(Kohdekartta)`, `KohdeAvattu`, `KokoruutuPyydetty`, `Kohdekartan.AvaaKokoruutu`) ja
   **`UI/Lehti/LehtiFokus.cs`** (lehden fokustehtävät v19 lehtitehtavat.json + pullavinkki; kytkentä Lehtinakyman Aihesivuun).
   `Kohdekartta.uss` ja `Lehti.uss` sisältävät sekä minun että agenttien tyylejä committaamatta. Webissä kohdekartta EI ole
   lehden etusivulla (`KOHDEKARTTA_LEHDESSA = false`).
3. Linssisepän vertailukäyrät (`VertailuLinssi.Kayrakuva()` → `Vertailukuva`: Maat, Lohkot[KayraOsa line/text/polyline/circle],
   Lahderivi) vertailuarkkiin `UI/Linssit/MaidenNakyma.cs` RakennaArkki korttien alle; webin värit `.maakayra-*`
   (viiva #a4691c 1.8, toinen #b03a2b, kolmas #4a6b3a, neljäs #35577f, apuviiva rgba(70,51,31,.18) 0.7, akseli 8.5 px).
   `MaaNumeroina.cs`:n NumeroKuvio on mallina. Ei aloitettu.

## Inventaarion seuraavat 10 riviä (`nappi-inventaario-natiivi-20260923.md`)

1. Nähtävyydet-rivi ja kohdekartta (yllä, kesken)
2. Pulun kuvakortti "Avaa juttu" (paikallinen nähtävyysjuttu, `Nahtavyysarkki.AvaaKohde`)
3. Linssin hampurilainen: Aloita alusta, Kertoja, Taustamusiikki (Linssiseppä)
4. Matkakirjakortti "Katso kuva" (ilmiön kuva → wiki)
5. Isoisän vanha valokuva → postikortti (Siirtoseppä: data)
6. Nostokortin kaiutin (lukija, Puhe.Lue)
7. Kohdekortti "Koe ihme" ja "Livian leikekirja" (Siirtoseppä: ihmeiden data)
8. Varusteet: linssirivi → esikatselu (kuvaus)
9. Puhelimen vaaka-asento: yläpalkin piilotus (väkäsikoni)
10. Versionumero → "Mitä uutta" (Siirtoseppä: muutosloki)

## Kuvasarjat Laitetestaajalle (kaikki `ui aloita pariisi` jälkeen)

`ui aloitus portti` · `ui julisteet 7` · `ui tietaja 120` · `ui seloste` · `ui lehti venetsia` + `ui lehti tehtava` + `ui lehti viimeinen` ·
`ui maalehti FRA` + `ui lehti viimeinen` (Maa numeroina) · `ui lippu FIN` · `ui opas lontoo` (+ `ui opas lontoo 900`) ·
`ui nosto kohde:thessaloniki@GRC` (korostukset) · `ui chat Mikä on Colosseum?` (vastauskuva, käsitelinkit) ·
`ui linssi radio soi|linkki` · `ui liike` · `ui noppa 5` · `ui leima 10` · `ui sahke liuska|apu|uusi|jasen` ·
kysymys: `ui kysymys kuva` + kuvan napautus, `ui kysymys kohtaaminen` + kuvan napautus.

## Sopimukset ja sovitut asiat

- Radio: sallittu ja epaselva soivat, kielletty = linkki, luokaton ei näy (Fable/omistaja). Siirtoseppä poisti kielletyt paketista.
- Pelikoodari: `PeliNakymat.Noppa(arvo, lat, lon, valmis)`, `MatkaPerilla`, `RahaMuuttui(muutos, syy, saldo)` (coin-ääni tulee häneltä),
  fokus-lehtitehtävät Minitehtavavastauksena aiheella `fokus:<id>`, KulttuurivisaTarjolla odottaa kulttuurivisat-dataa.
- Natiiviseppä: `PalloKierto.RuutuPiste(lat, lon, out ruutu, korkeus)`, `LepoMuuttui`/`Levossa`.
- Push natiivi-backupiin estettiin tässä sessiossa luvalla (Remote Repoint); Natiiviseppä pushaa mergetyt.
