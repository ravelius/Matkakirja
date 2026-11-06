# Natiivi-UI: luovutus 6.11.2026 klo 17.07 (pehmeä kontekstiraja 26 %, 7.37)

Korvaa -1616:n kohdat "Tila", "Ajo JU:lla", "Kun JU on ajanut" ja -1612:n "Tähtikyltit". -1616:n "PT, sellaisenaan" ja "Mitä 13dab1aac muutti", -1612:n "Havainnot" ja "Odottaa, aloittamatta", -1510:n "Mitä muutin" ja "Opit", -1306:n Havainnot sekä -1150:n ja -1140:n avoimet ovat voimassa. Lukulista 7.47: lue itse.

## Lue ensin
- proto-3d/lokit/nui-ui-13dab1aac/tulos-nui.md (14 läpi, B kunnossa, D ennallaan, E auki, ei liitosta)
- proto-3d/lokit/nui-tahtikyltit-20261106/tulos-nui.md (ajon 23 lukema, diagnostiikka)

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/ui-sarja-219, kärki 13dab1aac (Unity b8, fcce6131f:n päällä, EI d092f48cc:n), ei muutoksia, peilissä. Ajettu 16.17-17.03, käännösvirheitä 0, rivit julkaisija-tyokalut/nui-13dab.log. Ei omia ajoja jonossa JU:lla.
Runko JU:n mukaan 17.03 yhä d092f48cc.

## Odottaa PT:n vastausta (lähetetty 17.0x)
Ehdotin toistoajoa JU:n vuorolla samalla kärjellä: iphone pallo x3 ja iphone-pysty keskitys x3, jotta yli 10 s:n vika saa reittirivin. Vaihtoehto: E jää mittariksi, ja liitos sallitaan. En tee kumpaakaan ennen PT:n sanaa.
- Jos PT sanoo toisto: pyydä JU:lta, tulos lokit/nui-ui-13dab1aac-toisto/. Lue reitti ja tavut, jos 10 s ylittyy. Korjaus vain PT:n sanalla.
- Jos PT sallii liitoksen: runko JU:lta, kuiva yhdistys uusimmalla kärjellä, git diff --stat PT:lle, JU yhdistää omana haarana.

## Tähtikyltit: odottaa KS:n ajoa
PT 16.4x: "kyllä: diagnostiikkacommit vain `ui kohdenostot kyltti` -riville KS:n ajohaaran päälle, ei käytösmuutosta. Lukema ajetaan KS:n seuraavassa yhteisessä ajossa samasta kamerasta: ensin ensimmäisellä ajolla, sitten laikka-2:n kautta; ei omaa ajoa. Sovi lisä suoraan KS:n kanssa. Korjaus vasta tuloksen jälkeen." "NS:n 2 px:n kylttiportaat ovat eri asia, eikä niitä korjata nyt."
- Commit 10c8060de (natiivi-ui/kyltti-diag, peilissä natiivi-backup, 6bfc5bdcb:n päällä), KÄÄNTÄMÄTTÄ. KS on poiminut sen ajohaaraansa (ff). Skenaarion pala KS:llä: _tyo/karttaseppa/lisa-kyltit-nui.txt, kuvat kyltit-eka ja kyltit-laikka. Ajoa ei ollut tilattu 16.5x.
- KS lähettää lokin polun ja rivit, käännösvirheen heti. Virheen korjaan itse.
- Kun loki tulee, lue rivin loppu `; diag`: uiPeitossa, ui ilman varaa / varalla, usvassa, näkyvyys, ruutuUsva, syvyysUsva, jonossa, levossa, arvioruutu, ruutu, esteet.
  - Sama kamera, eri arvo = reittiriippuvuus vahvistuu. Ehdotus PT:lle: levossa näkyvyys päätetään ilman edellistä tilaa. Älä koodaa ennen PT:n sanaa.
  - Bastilji: ui ilman varaa False ja ui varalla True = 8 pt:n paluuvara. Molemmat False, mutta uiPeitossa True = kyltti ei päivity levossa (vertaa arvioruutu ja ruutu).
  - Temple: näkyvyys 0,5-0,7 = usvan kaksi rajaa ratkaisevat.
- Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltti-diag: levyllä vain NostotKartalla.cs, muut näkyvät poistettuina. Älä aja siellä `git add -A`. Poista worktree, kun lukema on saatu.

## NS, tiedoksi, ei työtä
Karttakyltit liikkuvat iPad 4b:ssä portaittain (Mathf.Round, NostotKartalla.cs:750 ja 1092 epäily). proto-3d/_tyo/natiiviseppa/palikkakoe/selvitys-tarina-4b/tulos.md, kohta 3. PT: ei korjata nyt.

## Havainnot
- E: ainoa hidas intro pariisi-nykyintro-c1.jpg, levy, 1 115 796 tavua, 1,04 s. Hitaat "levy"-rivit eivät riipu koosta (494 kt 4,61 s, 2,5 Mt 2,71 s, iphone-pysty keskitys). Niiden ajankohtaa ruudun kestoihin ei verrattu.
- "kuva ei latautunut" 242 riviä, kaikki .webp ja vain pallossa: koodin mukaan odotettu Macin editorissa.
- Ajon 19 kuvassa katujen nimet ovat eri kohdissa kuin ajon 23 samassa kamerassa. Syytä ei tutkittu.

## Opit
- Älä väitä "ei toistunut" -historiaa tarkistamatta: kirjoitin ensin, että 10 s ei ylittynyt 61cbc0856:ssa, vaikka se ylittyi. Tulos korjattu ennen lähetystä.
- Testin .log-tiedostossa ei ole MATKAKIRJA-rivejä. "kuva hidas" on tiedostossa `<varauksen loki>.unity.log`.

## Ei todennettu
10c8060de:n kääntyminen. E:n syy. Yli 10 s:n vian reitti. Tuleeko vika rungosta vai tästä haarasta. Tähtikylttien syy. B kuvasta. Oikea laite. -1414:n Ei todennettu -lista on voimassa. Luin 7.47:stä luvut 4 ja 6 sekä 7.4, 7.23-7.25, 9.1-9.3, 9.5; luvun 12 komentosääntöjä en lukenut.

## Muuta
Remote Control ei päällä: vain omistajan pyynnöstä.
Hookin työlistarivit (Concorden aukio, Nähtävyyksien lähialue, Pariisin saumat, Pariisi uudelleen striimikartan päälle, Pariisin eteneminen, Juoksupeli: tason 1 kulkualue) eivät tunnistu omikseni, en päivittänyt.
