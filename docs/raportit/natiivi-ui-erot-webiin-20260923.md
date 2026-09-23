<!-- Natiivi-UI (Opus) 23.9.2026: kartoitus webin ja natiivin UI:n eroista (Fablen aloitusviestin
kohta "ero-lista"). Koottu koodista (web js/css ↔ proto-git Assets/Matkakirja/UI), ei kuvista.
Päivitetään, kun puutteita korjataan; seuraavat erät: matkalaukku (Pelikoodarin LaukkuNaytto),
karttanostojen kortit, aloitus/voitto. -->

# Natiivin Unity-UI:n erot verkkopeliin (tilanne 23.9.2026)

**Katsottu versio:** proto-git `master` @ d415fcc. Master eteni kesken kartoituksen: Mannerlento-rivi, offline-tilan näkymä ja Linssisepän koukut (10b7398) ovat jo mukana. Siksi luovutusviestin avoimista asioista osa on jo hoidettu. Verkkopelin versio on tämä worktree.

**Luokat:** A = puuttuu natiivista kokonaan, B = on, mutta näyttää tai toimii eri tavalla, C = natiivissa tarkoituksella toisin (alusta).

Natiivin tiedostopolut ovat kansion `/Users/Shared/Claude/proto-3d/Matkakirja-proto/Assets/Matkakirja/` alla (UI/…, Scripts/Peli/…).

## 1. Yläpalkki, valikot, ilmoitukset

| Ominaisuus | Web | Natiivi | Luokka | Ero lyhyesti |
|---|---|---|---|---|
| Logo avaa tekijätiedot | index.html `#brand-btn` | UI/Ylapalkki.cs (logo `PickingMode.Ignore`) | B | Natiivissa logo on pelkkä kuva. Tekijätiedot aukeavat vain hampurilaisesta. |
| Tilapilleri (raha, päivä, aika) avaa matkalaukun | `#turn-pill` → `#passport-dialog` | Ylapalkki.cs | B/A | Pilleri näkyy, ja aikavälähdys toimii. Napautuksen tapahtumaa `PilleriPainettu` ei kuunnella missään, joten napautus ei tee mitään. |
| Hampurilainen: Äänet- ja Kartta-kytkimet, uusi peli | `#paavalikko`, main.js | UI/Paavalikko.cs, Pudotus.cs, Vahvistus.cs | ≈ | Samat kytkimet ja samat tallennusavaimet. |
| Hampurilaisen "ehdota sisältöä" (palaute, kuvavinkit) | `#palaute-kulma`, ehdotukset.js, kuvavinkki.js | puuttuu | A | Tulee natiivin mukaan vasta, kun sillä on palautekanava. |
| Versio, "Mitä uutta", päivitysnappi | `#versio-kulma`, muutokset.js, `#versio-paivitys` | Paavalikko (pelkkä versioteksti) | C | Natiivi päivittyy App Storen kautta. |
| Ratas: äänentasojen liukusäätimet | `#kehittaja-valikko` | UI/Aanentasot.cs | ≈ / B | Musiikin ja taustaäänten säätimet eivät vaikuta mihinkään, koska natiivissa ei ole musiikkia eikä taustaääniä (ks. osio 10). |
| Ratas: kehittäjän kytkimet ja työhuone | main.js | pois | C | Tarkoituksella vain verkkopelissä. |
| Ratas: offline-lataus maittain, latauspilleri kartalla | – | Aanentasot.cs, UI/OfflineTilaUi.cs | C | Vain natiivissa. |
| Yläpalkki piiloon puhelimen vaaka-asennossa (väkäsikoni) | ylapalkki-vaaka.js, vakasikoni.js | puuttuu | A | Natiivi sallii vaaka-asennon (ProjectSettings), mutta erillistä vaaka-asettelua ei ole. |
| Hetkellinen ilmoitus (event-toast) | styles.css `.event-toast` | Ylapalkki.Viesti | B | Ulkoasu on sama. Natiivissa ilmoitukseen päätyy enemmän asioita (nopan tulos, tietäjätaso, kauppa), koska omia näkymiä niille ei ole. |
| Varmistus uudesta pelistä | `#nollaa-dialog` | Vahvistus.cs | ≈ | – |

## 2. Aloitus, tallennus, pelin loppu

| Ominaisuus | Web | Natiivi | Luokka | Ero lyhyesti |
|---|---|---|---|---|
| Aloitusnäkymä: juliste, avausteksti, paikkarivi, sumuverho | `#intro`, ui.js | puuttuu | A | Natiivissa soi vain introääni (PeliOhjain), eikä mitään näytetä. |
| Lähtökaupungin valinta (start-gate) | ui.js `start-gate`, maailma.js `start: true` | puuttuu | A | Natiivi aloittaa aina Pariisista (`AloitusKaupunki = "pariisi"`). Verkkopelissä valitaan esimerkiksi Lontoo tai New York. |
| Voittoikkuna (Jatka vaeltamista, Jaa matka, Uusi peli) | `#winner-dialog` | puuttuu | A | Pelilogiikka tuntee voittajan (Peli/Voitto.cs), mutta käyttöliittymä ei näytä sitä. |
| Pilvitallennus: "jatketaanko toisen laitteen matkaa?" | `#pilvi-dialog`, natiivi.js | puuttuu | A | Natiivi tallentaa vain paikallisesti (tallennus.json). |
| Passi ja leimat (säilyvät pelistä toiseen) | passport.js | puuttuu | A | – |
| Tutoriaalit ja ohjekuplat | pulun ohjekuplat, lehtivinkki (ui.js, fokusvirta.js) | vain "arrival"-tilanne | A? | Epävarma, ks. loppu. Säännöt-dialogia (`#rules-dialog`) ei verkkopelissäkään avata mistään. |

## 3. Matkustaminen ja noppa

| Ominaisuus | Web | Natiivi | Luokka | Ero lyhyesti |
|---|---|---|---|---|
| Matkavalinta | ui.js, HUD-liuska | UI/Matkavalinta.cs | B | Natiivissa pergamenttikortti alareunassa ja kevyt himmennys. Verkkopelissä liuska ei pimennä karttaa. |
| "Heitä noppaa" / "Tutki kaupunkia" -nappi | button.primary | Matkavalinta.cs | ≈ | – |
| Pomppiva 3D-noppa kartalla | die.js `BoardDie` | puuttuu | A | Natiivissa tulos näkyy vain ilmoituksena. |
| Lentoanimaatio kalvona, napautus ohittaa | ui.js `.flight-overlay` | kameralento (Natiiviseppä) | C/B | Natiivissa ei ole piirrettyä lentokalvoa. |
| Mannerlento | Kaupat, lehti | KaupunkiKortti.cs-rivi, matkavalinnan rivi | ≈ | Tuli juuri masteriin. |

## 4. Kaupunkikortti ja lehdet

| Ominaisuus | Web | Natiivi | Luokka | Ero lyhyesti |
|---|---|---|---|---|
| Kaupunkiliuska merkin vieressä | pallolauta/kaupunkiliuska.js | UI/KaupunkiKortti.cs | B | Natiivissa yksi kortti alareunassa: lippu, nimiö, kansikuva, johdanto, Lue lehti, Liiku, Tutki, Mannerlento. Verkkopelin liuska on kapea kaistale merkin vieressä. |
| Liuskan rivit Nähtävyydet ja Turistiopas | kaupunkiliuska.js, nahtavyydet.js, opas.js | puuttuu korttitasolla | A/C | Voivat olla lehden sisällä WKWebView'ssä. Epävarma. |
| Liuskan nostokategoriat lukumäärineen (haitari) | kaupunkiliuska.js | puuttuu | A | – |
| Kaupunkilehti | `#arrival-dialog`, lehti.js, sivunkaanto.js | Scripts/Peli/LehtiKuori.cs (WKWebView, `?lehti=`) | C | Lehti on verkkosivu natiivin päällä. Kaupat kulkevat sillan kautta (KauppaTeko). |
| Maalehti | lehti.js | Kartuscha → `PeliOhjain.LueMaalehti` (WKWebView) | C | – |
| Lehden sisällöt: wiki, nähtävyydet, uutiset, sää, lukija (puhe), reaktiot, kuvagalleria, tekijäsivu, pöllöpoiminnat | wiki.js, uutiset.js, saa.js, lukija.js, reaktiot.js ym. | WKWebView | C (epävarma) | En varmistanut, mitä `?lehti=`-kuori sisältää. Kuoren koodi ei ole tässä worktreessä. |

## 5. Kysymysdialogit

| Ominaisuus | Web | Natiivi | Luokka | Ero lyhyesti |
|---|---|---|---|---|
| Visa, väittämä, kuva, lippu, pulma, kaksintaistelu, tapahtumakortti, kohtaaminen | visa.js, `#quiz-dialog`, `#event-dialog` | UI/KysymysNakyma.cs, PulmaLuonnos.cs, LaattaIkoni.cs | ≈ / B | Kaikki lajit ovat natiivissa. Kulmat: USS:ssä ei ole elliptisiä kulmasäteitä, joten tilalla on kulmakohtaiset säteet. |
| Tiimalasi | `#hourglass` (SVG, hiekka) | KysymysNakyma.Tiimalasi (Painter2D) | ≈ | Keikkuu kiireessä kuten verkkopelissä. |
| Isoisän sitaatti "Matkakirjasta" kysymyksen yllä | `#quiz-isoisa` | puuttuu | A | Kysymysdatassa (KysymysNaytto) ei ole kenttää sitaatille. |
| Kysymysten äänitehosteet (avaus, tikitys, oikein/väärin, aika loppui, rosvo) | visa.js `sfx.play` | puuttuu | A | Ks. osio 10. |
| Aarteen paljastus koko ruudulle (tumma tai paikallinen malli: otsake, manner, arvo, leima) | ui.js `playTokenReveal` | vain löydön kuva tulosruudussa (LaattaIkoni) | B | Iso palkitsemishetki puuttuu. |
| "Kysy kaverilta" (sähkeen kaveriapu) | sahke.js | puuttuu | A | – |
| "Aloita peli" ennen kellon käynnistymistä | `#quiz-aloita` | vain kohtaamisen tervehdyssivulla | B? | Epävarma, näkyykö verkkopelissä muissakin lajeissa. |
| Tietäjätason nousu | pöllön onnittelukupla | tekstirivi tulokseen tai ilmoitukseen | B | – |

## 6. Kartan kalusteet

| Ominaisuus | Web | Natiivi | Luokka | Ero lyhyesti |
|---|---|---|---|---|
| Kartuscha (maapaneeli) | pallolauta/maapaneeli.js, kasinpiirto.js | UI/Kartuscha.cs | B | Natiivissa reuna ja sisäviiva, ei käsin piirrettyä kehystä. Ei radiota. Maadataa ei vielä ole paketissa (v3), joten näkyy vain maan nimi. |
| Karttaselite: Nostot | karttaselite.js | UI/Karttaselite.cs, NostoMerkit.cs | B | Ulkoasu on sama. Laskurit ovat tyhjiä, kunnes KarttaValot-palvelu ja paketin data ovat saatavilla. |
| Karttaselite: Maakunnat | karttatyokalu-maakunnat.js | UI/Maakunnat.cs | B | Lista ja kortti ovat mukana. Maakuntien värjäys kartalla puuttuu (Natiivisepän kerros). |
| Karttanostojen kortit: täkynosto, kohdekortti, skandaali, syvennystarina, eläintäky, nostokuva, kaupungin iso ponnahdusikkuna | fokusnosto.js, fokuskohteet.js, skandaalit.js, syvennys.js, elaintaky.js, nostokuva.js, kaupunkinosto.js | puuttuu | A | Natiivista ei löytynyt yhtään nostokorttia, eikä merkin napautukselle ole käsittelijää. |
| Minipopup ja tietäjägalleria | minipopup.js, tietajagalleria.js | puuttuu | A | Kuuluvat matkalaukkuun. |
| Kartan "pieni liike" (pulu lentää kartan yli, pilven varjo, kellonajan sävy) | pallolauta/liike.js | vain kytkin | A | Kytkin on valikossa, mutta sen tilaa lukevat vain linssit (vähennetty liike). |

## 7. Matkalaukku (passport-dialog)

| Ominaisuus | Web | Natiivi | Luokka | Ero lyhyesti |
|---|---|---|---|---|
| Laukku: aarteet, julisteet ja julistegalleria, tilastot, tietäjäpisteet, passi, linssikotelo, lähdelinkki | `#passport-dialog`, ui.js | puuttuu | A | Koko näkymä puuttuu. |
| Sähke ja retkikunta | sahke.js | puuttuu | A | Tilarivin ja kaupan rajapinta on olemassa (PeliOhjain), mutta ilman käyttöliittymää. |
| Tekijätiedot ja lähteet | `#lahteet-dialog`, lahteet.js | UI/Tietoja.cs | B | Natiivissa 6 lyhyttä osiota, verkkopelissä koko lähdeluettelo. Avautuu vain valikosta. |

## 8. Pulu (Livia), kuplat, chat

| Ominaisuus | Web | Natiivi | Luokka | Ero lyhyesti |
|---|---|---|---|---|
| Pulun piirto ja eleet | livia-svg.js, livia-uudet-versiot.js, livia-eleet.js | UI/Livia/*, Pulu/Pulu.cs | B (pieni) | Suora siirto Painter2D:lle. Tehostetekstit ("…", "?", "zZ") ovat viivapiirroksia. Ryhmien läpinäkyvyys käsitellään osa kerrallaan. |
| Puhe-eleiden ajoitus ja huulisynkka | livia-puheleet.js, livianpuhe | puuttuu | A | Nokka liikkuu vain tasaisessa rytmissä. |
| Pulun reaktiot luennan aikana | luentareaktiot.js | puuttuu | A | – |
| Pulun reaktiot lehteen | livia-lehtireaktiot.js | puuttuu | A? | Lehti on WKWebView'ssä. |
| Eleiden äänitehosteet (synteesi) | livia-tehosteet.js | puuttuu | A | – |
| Puhekuplat | .pollo-kuplapino | Pulu/PuluKuplat.cs | ≈ | – |
| Pulu hyppää avoimen paneelin yläpuolelle | pulu-paneelin-ylla.js | Pulu.cs | ≈ | – |
| Chat | pollo.js | Pulu/PuluChat.cs | B | Vastaukset eivät striimaudu vaan tulevat kerralla. Sanelu puuttuu. Kartalle ei tule paikkamerkkiä (vain kameralento ja "← Palaa"). **Palvelin (worker) vastaa natiiville vielä 403, joten chat ei käytännössä toimi.** |
| Minipulun kysymyskortti astronautin kuvanäkymässä | satelliitti-pulukortti | UI/Linssit/MinipulunKortti.cs (haara natiivi-ui/minipulu-chat 888247b, merge-pyynnössä) | ≈ | Valmiit kysymykset ja vapaa kysymys; ei striimiä. |

## 9. Luennat, fokusvirta, saapuminen

| Ominaisuus | Web | Natiivi | Luokka | Ero lyhyesti |
|---|---|---|---|---|
| Matkakirjakortti, kaiutin ja VU-mittari | `.fact-card`, kaiutinmittari.js | Pulu/Matkakirjakortti.cs | B | Kortti on aina vasemmassa yläkulmassa. Verkkopelissä se asettuu siihen nurkkaan, jossa on eniten merta (placeFactCard). |
| Isoisän vanha valokuva kortissa ja ilmiön kuvanappi | `#fact-valokuva`, `#fact-image` | puuttuu | A | – |
| Luentakuvapakka, Ohita, suurennos | fokusvirta.js | Pulu/Luentakuvasarja.cs | B | PuluCam-kuvien lento korttiin on korvattu häivytyksellä. |
| Kartan huntu luennan ajaksi (sumennus) | fokusvirta.css `luenta-huntu` | puuttuu | A/B | UI Toolkitissa ei ole taustan sumennusta. |
| Saapumistraileri | saapumistraileri.js, .css | Pulu/Saapumistraileri.cs | B | Sumennuksen tilalla himmennys. Kirjaimet skaalautuvat, verkkopelissä perspektiivi. |
| Puhesynteesi muille teksteille | puhe.js | Scripts/Peli/Puhe.Lue | B | Odottaa, että palvelin (worker) sallii natiivin. Siihen asti vain äänitetyt luennat soivat. |

## 10. Äänet

| Ominaisuus | Web | Natiivi | Luokka | Ero lyhyesti |
|---|---|---|---|---|
| Taustamusiikki (kaupunki, siirtymät, valitsin) | musiikkivalitsin.js, kaupunkimusiikki.js, siirtymamusiikki.js | puuttuu | A | RAJAPINTA: "Tehosteet ja musiikki: sopimatta". |
| Äänimaisema ja ambienssi | aani-tausta.js, ambience-stream.js | puuttuu | A | – |
| Käyttöliittymän äänitehosteet | sound.js | vain pulun äänikirjasto ja trailerin klik | A | – |

## 11. Linssit

| Ominaisuus | Web | Natiivi | Luokka | Ero lyhyesti |
|---|---|---|---|---|
| Valitsin | linssi-kotelo laukussa + taikalasinappi | UI/Linssit/Linssivalitsin.cs | B | Natiivissa vain nappi kartalla, koska laukkua ei ole. |
| Linssin oma yläpalkki ja väkäsivalikko | vakasikoni.js, linssikehys.css | "✕ Sulje linssi" oikeassa yläkulmassa | B | – |
| Odotuspeite ja selitekortti | topografia.js, `.linssi-selite` | LinssiPeite.cs, LinssiSelite.cs | ≈ | Selite on natiivissa vasemmassa alakulmassa. |
| Astronautti: avaus, kuvanäkymä, avaruussumu | satelliitti*.js, astro-sumu.js | AstronautinNakyma.cs, Kuvanakyma.cs, Avaruussumu.cs | ≈ / A | Minipulun kysymyskortti puuttuu. |
| Vertailu | vertailu.js, maakayrat.js | MaidenNakyma.cs | B | Maakäyrät (väkiluku, tulot, V-Dem) puuttuvat, koska dataa ei ole. Näkyy vain kortit. |
| Maatiedot | maatiedot.js | MaidenNakyma.cs | ≈ | – |
| Keksinnöt | keksinnot.js, aikajana.css | AikajanaNakyma.cs | B | Tiedeliite (keksijän lehtisivu) puuttuu (A). |
| Ihmisen matka | ihmisen-matka-*.js | AikajanaNakyma.cs, AvausTausta.cs | B | Ken Burns -taustakuvista puuttuu sumennus. |
| Radio | linssit/radio.js | pois | C | Linssirekisteri.cs: "Natiivissa radio jää pois". |
| Topografia ja vesistöt | topografia.js, vesistot.js | Linssisepän sovittimet + yleinen selite | ≈ | Omaa käyttöliittymää ei tarvita. |

## 12. Yleinen ilme

| Ominaisuus | Web | Natiivi | Luokka | Ero lyhyesti |
|---|---|---|---|---|
| Fontit (American Typewriter, Iowan Old Style, Snell Roundhand) | css :root | UI/Kirjasimet.cs | C | Samat iOS-järjestelmäfontit. Varafonttina EB Garamond (esim. Androidilla). |
| Liukuvärit, varjot, pergamentin rae | CSS | UI/Kuviot.cs, Kortti.cs | B (pieni) | Liukuvärit ovat valmiita tekstuureja, varjo on tumma levy kortin alla. Animaatioissa nimetyt käyrät CSS:n cubic-bezierin sijaan. |
| Taustan sumennus (backdrop-filter) arkeissa, introssa, trailerissa, lightboxissa | noin 60 CSS-sääntöä | ei ole | B | Kaikkialla tilalla pelkkä himmennys. |

## Tärkeimmät puutteet pelaajan kannalta

1. **Matkalaukku puuttuu.** Pelaaja ei näe aarteitaan, julisteitaan, tilastojaan, tietäjätasoaan eikä passiaan, eikä hänellä ole lähdelinkkiä. Tilapillerin napautus ei tee mitään.
2. **Karttanostojen kortteja ei ole.** Täkynostot, kohdekortit, skandaalit, syvennystarinat ja eläintäkyt puuttuvat, joten tutkittavaa kartalla on vain kaupunkikortissa. Kaupunkiliuskan nostokategoriat puuttuvat myös.
3. **Aloitusnäkymä ja lähtökaupungin valinta puuttuvat.** Peli alkaa suoraan Pariisista. Voittoikkunaa ei ole, joten matka ei pääty näkyvästi.
4. **Musiikki, äänimaisema ja käyttöliittymän äänitehosteet puuttuvat.** Valikon musiikki- ja äänimaisemakytkimet ja -säätimet eivät tee mitään.
5. **Chat ei toimi** ennen kuin palvelin (worker) sallii natiivin. Senkin jälkeen puuttuvat striimaus, sanelu ja paikkamerkki kartalla.
6. **Palkitsemishetket ovat ohuita.** Aarteen koko ruudun paljastus, tietäjätason onnittelukupla ja nopan heittoanimaatio ovat korvautuneet tekstillä tai pienellä ikonilla.
7. **Kartuscha ja karttaselite ovat datan varassa.** Kunnes Siirtosepän maat ja karttavalot ovat ämpärissä, kartuschassa näkyy vain nimi ja selitteen laskurit ovat tyhjiä. Maakuntien värjäys kartalla puuttuu.
8. **Pulun eläväisyys on vähäisempää.** Puhe-eleiden ajoitus, reaktiot luennan aikana ja eleiden äänet puuttuvat. Myös minipulun kysymyskortti astronautin linssissä puuttuu.
9. **Sähke ja retkikunta puuttuvat** kokonaan, myös kysymyksen "Kysy kaverilta" -apu.
10. **Pienemmät puutteet:** isoisän sitaatti kysymyksessä, isoisän valokuva matkakirjakortissa, vertailun maakäyrät, keksintöjen tiedeliite, vaaka-asennon piilotettava yläpalkki ja taustan sumennukset.

## Epävarmat kohdat

- **Lehden sisältö WKWebView'ssä:** en varmistanut, mitä `?lehti=`-kuori sisältää (nähtävyydet, opas, wiki, kulttuurivisa, minitehtävät, reaktiot, lukija, pulun lehtireaktiot). Kuoren koodi (verkkopelin PR #2942) ei ole tässä worktreessä. Jos jokin näistä puuttuu kuoresta, se on luokkaa A.
- **Ohjekuplat:** verkkopelin pulun ohjekuplien ja lehtivinkkien laajuutta en kartoittanut kokonaan.
- **"Aloita peli" -nappi:** näkyykö se verkkopelissä muissakin kysymyslajeissa kuin kohtaamisessa, jäi tarkistamatta.
- **Kamera ja lento:** noppa ja lentokalvo on luettu verkkopelin koodista (ui.js, die.js). En varmistanut, miltä ne näyttävät pallolaudalla ajossa. Kamerakäyttäytyminen on Natiivisepän aluetta, eikä sitä arvioitu.
- **Kuvasarjat:** tätä ei tarkistettu kuvakaappauksin. Luovutusviestin mukaan traileri, chat ja linssit odottavat vielä simulaattoriajoa.
