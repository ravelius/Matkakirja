# Natiivisepän luovutus 28.9.2026 (v), klo 22.2x EEST

Luovuttaja: Natiiviseppä (Opus 5.5, max, Macin käyttäjä koodaus). Syy: konteksti 71 %, Päätoimittajan nollauskäsky.
Edellinen: -t.md. Sen kohdat ovat voimassa, ellei tässä toisin sanota.

## Tila heti (lue ensin)

- **1.0.40-junan käännös on asennusvaiheessa ja pitää lukkoa.** Vahti käänsi juna/b13 **b3001497** klo 21.27 alkaen; Unity ja
  xcodebuild ovat valmiit. Kuormaraja-lippu /tmp/matkakirja-kuormaraja on yhä olemassa, vaikka sen oma teksti sanoo "Poista
  klo 17". Siksi asennus odottaa jokaista laitetta enintään 20 min, kun muita simulaattoreita on käynnissä:
  - 1572C658 ja 3B4CDACB jäivät asentamatta; lokissa on rivi "jäi asentamatta (muita käynnissä 20 min)".
  - C1D5E34C odotti klo 22.1x, ja 993F8873 on vielä jäljellä.
  - Lipun poisto koskee jaettua palvelua, joten sen tekee Julkaisija tai omistaja. Kun KÄÄNNETTY-rivi tulee, .app on
    käännöskopiossa (Matkakirja-proto-kaannos/Build/dd-sim/…/Matkakirja3D.app) vain seuraavaan käännökseen asti.
- **1.0.40:n edellinen yritys klo 21.15 kaatui:** "VIKA unity-sim: käännös Failed, 16 s, virheitä 1". Uusintayritys 21.27 meni
  läpi, joten vika oli ohimenevä kuten 17.07:n Burst-kaatuminen. VIKA-rivi näkyy nyt vahdissa proto-kaanna.sh-korjauksen
  ansiosta (ks. alla).
- **Laitetestaaja** on ohjeistettu ajamaan savuke b3001497:lle, lisäkohtana aloituslento Ateenaan. PASS → BUILD 40:
  `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto merge --no-ff <testattu SHA>` masteriin, kaavana BUILD 39:n viesti.
  SHA ja muutosrivi menevät Julkaisijalle ja Päätoimittajalle. Testattavaa jätetään tyhjäksi (omistajan päätös).

## Tehty (sessio u)

- **v3f4** (omistajan palaute v3f3:een) on haarassa natiiviseppa/aloitus-paivayo a7906b8b + 67204c35, käännös 7d8a0812.
  - Päivä tulee korkealla 0,4–3,5 s:ssa, ja kone lentää lähikuvassa 15 km/s.
  - Kaarto kallistuu 35–40° kameraan päin, ja maastolisä pysyy vakiona, joten yskähdys ylöspäin on poissa.
  - Kamera tekee bumerangin: kaksi kierrosta, kärjen kehys, eikä kamera seuraa konetta.
  - Kartta-testit 391/391.
  - Kuvattiin 20.50, ja Päätoimittaja ja omistaja saivat videon, kuvaparit ja reittikuvan (raportti 81f0082aa).
  - Omistaja: **"Ei ole viel hyvä mutta pidetään tämä toistaiseksi"**. v3f4 on 1.0.40-junassa välivaiheena. **Uutta
    aloituslentokierrosta ei aloiteta ennen omistajan suuntaa.** Kuvat säilytetään (aloituslento-33/SAILYTA.txt).
  - Sääntömuutos, jonka Päätoimittaja kirjaa: bumerangissa kone näkyy takaviistosta (α ≤ 138°, ei koskaan suoraan takaa),
    ja testi sallii α ≤ 150° kärjestä saapumiseen.
- **proto-kaanna.sh:n virheenkäsittely korjattu omistajan luvalla** (19.0x suoraan tässä sessiossa, atominen vaihto 19.14).
  - Vaiheet ovat nyt funktio `kaanna` (return 11–17), joten viimeinen rivi on aina VIKA tai KÄÄNNETTY.
  - Unity-virheissä VIKA-riville tulee MATKAKIRJA:-yhteenveto.
  - Varmuuskopio on proto-kaanna.sh.ennen-virheenkasittely-20260928.
- **BUILD 38** = proto master 77ff5f6e = TF 1.0.38: Maapallon vuosi (kehittäjätila), maakuntakartta, kyydin-taivas ja
  ISS-nopeutus.
- **BUILD 39** = proto master e4c624a9 = TF 1.0.39 (21.00): puhe-hanta (hyppykorjaus ja Pulun pysäytys) ja maan loitonnus.
  - Päätoimittaja päätti viennistä, vaikka savuke oli EI PASS lukijakortin vuoksi. Vika oli jo TF 1.0.37/1.0.38:ssa, ja
    Natiivi-UI todensi hypyn laitteella.
- **1.0.40-juna = juna/b13 b3001497** = master e4c624a9 + natiiviseppa/juna-1040 9c974fd8 + aloitus-paivayo 67204c35.
  Sivuhaara juna-1040 sisältää nämä:
  - kerma-404 306134ee (Siirtosepän E2E PASS)
  - Linssisepän symbolit-3d-luonnollinen 9ed9288f (omistajan korjaukset: maalle ja seepiaramppi)
  - cupola-polyt 616dd193
  - pilvet-tarkat cc513896
  - Natiivi-UI:n maakunta-linssi aa203879
  Yhdistelmä: unity-tarkistus 0, Kartta 401/401, Linssit 393/393, Peli 357/357.

## Tulossa (merge-pyynnöt junaan)

- **Natiivi-UI: kortti-napautus** (942f37bf osittain). LISÄÄ-laajennuksen jälkeen lukijarivin kaiutin sulkee kortin. Mergeä,
  kun Natiivi-UI on todentanut sen; jos 1.0.40 on jo savukkeessa, korjaus menee seuraavaan junaan.
- **Natiivi-UI: mallin-nimiot** (v2) Linssisepän symbolien perään.
- Linssiseppä 2: NDVI-läiskä Lähi-idässä (Maapallon vuosi, ei-blokkaava) on välitetty.
- Siirtoseppä: "vapaa 0,0 Gt" on DriveInfo = 0 iOS-hiekkalaatikossa, ja UI käsittelee sen arvona "ei tiedossa". Oikea
  lukema vaatisi natiivin liitännäisen (matala prioriteetti).

## Käytännöt, jotka opin tänään

- Junaa ei avata savukkeen aikana, koska vahti asentaisi Laitetestaajan laitteille kesken ajon. Seuraavan junan sisältö
  kootaan sivuhaaraan, esimerkiksi natiiviseppa/juna-1040 komennolla `juna-merge.sh <haara> <sivuhaara>`. Yhdistelmä
  tarkistetaan tilapäisessä worktreessä (scratchpad): tarkista.sh ja Kartta-, Linssit- ja Peli-testit. Sen jälkeen
  `juna-merge.sh master` ja `juna-merge.sh <sivuhaara>`.
- Kuvaus: tallennettu peli muuttaa aloitusnäytön napit (Laita äänet / Jatka matkaa 630 / **Uusi matka 690** pt). Ota
  kuvakaappaus ennen napautusta. Konsolin `simctl launch` kuolee 30 minuutin aikarajassa, jolloin sovellus kaatuu.
- Bash-työkalussa `nohup … &` kuolee komennon lopussa, joten pitkät ajot tehdään run_in_background-lipulla. Auto-tilan
  tarkistin oli poissa 18.13–18.5x: jos se estää komennot kesken hiljaisen vuoron, vapauta vuoro Julkaisijalle.
- Skriptit: proto-3d/lokit/natiiviseppa-skriptit/sessio-u/ (talteen.sh, reittikuva2.py) ja sessio-s/ (valmistele,
  nauhoita, kehyserot, kooste, kuvapari).

## Worktreet ja haarat (proto)

- wt/proto-natiiviseppa-paivayo (aloitus-paivayo 67204c35) ja wt/proto-natiiviseppa-kerma404 (306134ee) ovat junassa, ja ne
  poistetaan BUILD 40:n jälkeen. Samoin sivuhaara natiiviseppa/juna-1040.
- wt/proto-natiiviseppa-juna, -offline-media ja -symbolit on mergetty, ja ne voi poistaa.
