# Fablelle: tarina14-kuvapaikat vaihdettu — 14/14, kolme porttipoikkeamaa

**Päivä:** 15.9.2026 · **Haara:** `claude/bold-ride-vow4ki-tarina14` · **Lähtökohta:** `origin/main` @ `f8b98294`

Kuvatoimituksen manifesti `posti/kuvatoimitus-tarina14-20260914.json`,
SHA-256 `dfea7c13b3fbd6fcaf6afabf3dda00f9f4e5248c826cd2f0fbfe6bfa829f8229`
— **varmennettu**, täsmää postilaatikon ilmoitukseen.

Omistajan lupa koordinaattorin kautta: "Synkkaa ne eleet ja vaihda kuvat".
Tämä erä on **vain kuvien vaihto**. Eleiden synkkaus (kohdistusajot) ei
kuulu tähän — se vaatii ElevenLabs-kiintiötä ja on erillinen työ.

## Yhteenveto

- 14/14 kuvapaikkaa vaihdettu täsmälleen manifestin `replacement`-kentistä sanasta sanaan.
- Ennen vaihtoa 14/14 nykytila (vanha URL, lyhyt, selite) ja tarinatekstin SHA-256 vastasivat manifestin odotusta. Ei poikkeamia.
- 14/14 uutta media-URLia: HTTP 200, GET-tavujen SHA-256 ja tavumäärä täsmäävät manifestin `delivery`-kenttiin.
- Rakenteellinen sisältödiff: 69 muuttunutta kenttää, **kaikki 14 kohdepaikan sisällä; muualla 0**.
- Selaintarkistus oikeassa Chromiumissa (141.0.7390.37): 14/14 `naturalWidth` 1536 × 1024, oikea URL, kuvateksti näkyvissä. Kuva: `docs/raportit/kuvat/tarina14-kuvapaikat-20260915.jpg`.
- Tromssa P1 jätetty koskematta manifestin `held`-merkinnän mukaisesti.

## ⚠ POIKKEAMA — kolme porttitestiä kaatuu manifestin teksteistä

Nämä kolme olivat **vihreitä ennen muutosta** (mitattu erillisessä
`origin/main`-worktreessa: `# pass 29, # fail 0`). Ne kaatuvat nyt siksi,
että manifestin hyväksytyt kuvatekstit ovat ristiriidassa repon vanhojen
lukkojen kanssa. **En muuttanut manifestin tekstejä enkä testejä** —
päätös kuuluu Fablelle.

1. `tests/horatio-livia-europe-batches.test.mjs:122` ja `:153` — sääntö
   "pitkän selitteen pitää olla kaksi sisältölausetta". **10/14 uutta
   selitettä on yksilauseinen** (vanhat olivat kaksilauseisia):
   bergen I2/P1/P2, amsterdam I1/I2/P1/P2, varsova P1, bukarest P1, oslo I1.
   Pariisin kolme ja bergen I1 täyttävät säännön.
   Lyhyiden kuvatekstien yhden lauseen sääntö täyttyy 14/14.
2. `tests/luentakuva.test.mjs:518` — "alkuerän seitsemän retain-kuvaa
   käyttää hyväksyttyä paper-v4-versiota" lukitsee Pariisin luentakuvan
   osoitteen `-pariisi-r20260909-paper-v4.jpg`:hen. Manifesti korvaa
   tämän tarkoituksella uudella Tuileries-kuvalla.

Vaihtoehdot: (a) manifestin kymmeneen selitteeseen lisätään toinen
sisältölause ja Pariisin lukko päivitetään, tai (b) portit päivitetään
vastaamaan uutta hyväksyttyä sisältöä. Kumpikin on Fablen kaanonpäätös.

## Portit

| Portti | Tulos |
|---|---|
| `npm test` | 3440 testiä, **# pass 3424 / # fail 3** (+13 skipped) — kolme yllä kuvattua poikkeamaa. Lisäksi `tests/pollo.test.mjs:919` kuormavartio "indeksi rakentuu ja on kokoluokaltaan järkevä" hylkäsi (indeksointi 4962 ms) — kirjattu kuormavartiona, ei sisältövirheenä. |
| `node tools/tarkista-kaksoisavaimet.mjs` | ✅ ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | ✅ 390 moduulia, 4308 top-level-julistusta, ei törmäyksiä |
| `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node tools/tarkista-savukkeet.mjs` | ✅ 1702 ui-viittausta, 407 metodia, 536 kenttää, 31 lehtitilan kenttää |

## Sisältöpistokoe (`tools/vertaa-sisaltodiff.mjs`)

`node tools/vertaa-sisaltodiff.mjs origin/main HEAD <pakki> <EXPORT>`:
bergen 4, amsterdam 4, oslo 1, varsova 1 muuttunutta `selite`/`teksti`-kenttää
— kaikki kohdepaikkojen `selite`-kenttiä, yhtään `teksti`-kenttää (tarina,
kupla) ei muuttunut. Pariisi ja Bukarest eivät aja tällä työkalulla:
työkalu kopioi pakin `/tmp`-hakemistoon, jolloin sisarmoduulien
(`maalehtinostot-fra.js`, `fokuskohteet-rou.js`) tuonti hajoaa. Tämä on
työkalun ennestään oleva rajoitus, ei tämän muutoksen seuraus. Nämä kaksi
katettiin omalla, rakenteellisella kaikki-kentät-diffillä (ks. yllä).

## Selaintarkistus

Mittaussivu tarjoiltiin paikallisesti ja se latasi pakit oikeista
moduuleista (`js/packs/fokusvirrat.js`, `js/fokusvirta.js`
`luentakuvanOsoite`, `js/kuvatekstit.js`). Selaimella ei ole suoraa
ulkoyhteyttä, joten `media.matkakirja.app`-pyynnöt haettiin Nodella
agenttiproxyn kautta ja syötettiin selaimeen alkuperäisestä URL-osoitteesta;
tavut ovat samat, joiden SHA-256 on erikseen varmennettu manifestia vasten.
Mittari oli kertakäyttöinen eikä jäänyt repoon.

Tulos 14/14: `naturalWidth` 1536, `naturalHeight` 1024, `img.src` täsmää
manifestin `replacement.osoite`-kenttään, ja lyhyt kuvateksti renderöityi
näkyvällä laatikolla. Pariisi ja Bergen ajettiin myös erikseen (7/7).

## Muu huomio

Pariisin `luentakuva`-lohkon sisältä poistui kaksi kommenttiriviä
("Kuvatekstit tekstisessiolta (KOKO-EUROOPPA V1.2…)"), koska ne
kuvasivat juuri korvattuja kuvatekstejä. Muita kommentteja ei muutettu.
Huom: joidenkin lohkojen yläpuolella on yhä vanhaan kuvaan viittaavia
kommentteja (esim. Bergenin "Hyväksytty lopullinen paperikuva; toimitus
10.9.2026, SHA-256 8f941560…"). En koskenut niihin, koska ne ovat
Fablen kaanontekstiä — päivitys kannattaa tehdä samalla kun yllä oleva
tekstiristiriita ratkaistaan.

Mediatiedostoja ei tuotu repoon. Versionostoa, mergeä, dist/-ajoa tai
ääniajoja ei tehty.

## VANHA/UUSI kaikista 14 paikasta

### bergen:I1 — js/packs/fokusvirta-bergen.js · matkakirja.luentakuva

| kenttä | VANHA | UUSI |
|---|---|---|
| osoite | https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-bergen-r20260909-paper-v4.jpg | https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-bergen-i1-r20260914-tarina-v1.jpg |
| lyhyt | Bergen, 1873. Kuiva kala, märkä vierailija. | Bergen, 1873. Opas ja kuula tuomiokirkolla. |
| selite | Kauppias nosti kapakalan esiin Bryggenin katoksen alla kuin arvotavaran. Kala ja myyjä pysyivät suojassa, kun sade kasteli laiturin ja kamerani jalat. | Opas odottaa Bergenin tuomiokirkon seinään kiinnitetyn kuulan alapuolella. Kuulan kiinnityksen ajankohtaa ei tunneta. |
| lahde | Matkakirjan havainnekuva | Matkakirjan havainnekuva |
| lahteet | (ks. git-diff) | https://tohundrefortellinger.w.uib.no/1966/06/20/2017-kanonkule/ |

tarinateksti muuttumaton, SHA-256 `5540447ea82fb1beca5cacfe9737e931b29bc084005696a9defd68ace2a3f90a`; julkaistun JPEG:n SHA-256 `b5a39e626ba1c0af6b55c19ad626cdda5fda42bf30cd65168a92e989888f48cd` (698445 tavua, HTTP 200 varmennettu).

### bergen:I2 — js/packs/fokusvirta-bergen.js · matkakirja.luentakuva2

| kenttä | VANHA | UUSI |
|---|---|---|
| osoite | https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-bergen-r20260911-paper2-v1.jpg | https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-bergen-i2-r20260914-tarina-v1.jpg |
| lyhyt | Bergen, 1873. Katon alla kala pysyi kuivempana kuin vieras. | Bergen, 1873. Pieni kuula korkealla kiviseinässä. |
| selite | Sade valui katoksen reunalta, mutta kapakalat pysyivät kuivina puuseinän vieressä. Takkini kiilsi vedestä, ja kaupungin arvojärjestys tuli selväksi. | Rautakuula on kiinnitetty tuomiokirkon kiviseinän syvennykseen, mutta kiinnityksen ajankohtaa ei tunneta. |
| lahde | Matkakirjan havainnekuva | Matkakirjan havainnekuva |
| lahteet | (ks. git-diff) | https://tohundrefortellinger.w.uib.no/1966/06/20/2017-kanonkule/ |

tarinateksti muuttumaton, SHA-256 `5540447ea82fb1beca5cacfe9737e931b29bc084005696a9defd68ace2a3f90a`; julkaistun JPEG:n SHA-256 `bf0f89b505db218cde5d0f94aee95136a81c0d1585e331e57319d45538f6f8bf` (723088 tavua, HTTP 200 varmennettu).

### bergen:P1 — js/packs/fokusvirta-bergen.js · pollo.kuvat[0]

| kenttä | VANHA | UUSI |
|---|---|---|
| osoite | https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-bergen-01-r20260909-euv1-v1.jpg | https://media.matkakirja.app/matkakirja/pulu-cam/matkakirja-bergen-p1-r20260914-tarina-v1.jpg |
| lyhyt | Bergen: varastotalot saivat suojan, minä etsin oman. | Bergen: rumpujoukon tahdissa kadunrajasta. |
| selite | Bryggenin kapean puukäytävän sade piirtää lautoihin oman karttansa. Pysähdyin kynnyksen suojaan ja totesin, että kuiva paikka on yhä arvokas löytö. | Lasten ja nuorten rumpujoukko marssii kuvaavien katsojien ohi. |
| lahde | Matkakirjan havainnekuva | Matkakirjan havainnekuva |
| lahteet | (ks. git-diff) | https://en.visitbergen.com/ideas-and-inspiration/explore-bergen/the-living-tradition-of-buekorps-bergen |

tarinateksti muuttumaton, SHA-256 `7201aaa2bd48165faf357260db7ed3902e9f6385ca7535b8d70b4083856c43f1`; julkaistun JPEG:n SHA-256 `a6fe3110b2743519e77a71cc42d05f0da9e0664c26b0baab08f41b4fdcaa987a` (689936 tavua, HTTP 200 varmennettu).

### bergen:P2 — js/packs/fokusvirta-bergen.js · pollo.kuvat[1]

| kenttä | VANHA | UUSI |
|---|---|---|
| osoite | https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-bergen-02-r20260909-euv1-v4.jpg | https://media.matkakirja.app/matkakirja/pulu-cam/matkakirja-bergen-p2-r20260914-tarina-v1.jpg |
| lyhyt | Bergen: ulkona satoi aivan samaa sadetta. | Bergen: nuori johtaja tarkistaa rumpujoukon järjestystä. |
| selite | Käytävän suulta näkyvät Bryggenin talorivi, märkä katu ja satama. Otin kuvan nopeasti ulkona ja palasin puolen siivenmitan kuivemmalle. | Nuorempien soittajien muodostelma näkyy matalalta ikkunalaudalta. |
| lahde | Matkakirjan havainnekuva | Matkakirjan havainnekuva |
| lahteet | (ks. git-diff) | https://en.visitbergen.com/ideas-and-inspiration/explore-bergen/the-living-tradition-of-buekorps-bergen |

tarinateksti muuttumaton, SHA-256 `7201aaa2bd48165faf357260db7ed3902e9f6385ca7535b8d70b4083856c43f1`; julkaistun JPEG:n SHA-256 `e85b6d1e44cb071c25b8445c2a4b53369fa64ea14de43616f1aa96bf3599df4e` (824105 tavua, HTTP 200 varmennettu).

### amsterdam:I1 — js/packs/fokusvirta-amsterdam.js · matkakirja.luentakuva

| kenttä | VANHA | UUSI |
|---|---|---|
| osoite | https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-amsterdam-r20260909-paper-v5.jpg | https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-amsterdam-i1-r20260914-tarina-v1.jpg |
| lyhyt | Amsterdam, 1873. Tuoli saapui omasta ikkunastaan. | Amsterdam, 1873. Kanavatalon ullakolle mahtui kokonainen kirkko. |
| selite | Kattokoukku ja kaksi miestä pitivät tuolin matkalla kohti yläikkunaa. Kaluste pysähtyi kuvaani arvokkaasti kesken nousun. | Pappi seisoo kapean ullakkokirkon alttarin vierellä puuparvien alla. |
| lahde | Matkakirjan havainnekuva | Matkakirjan havainnekuva |
| lahteet | (ks. git-diff) | https://opsolder.nl/en/the-monument/ |

tarinateksti muuttumaton, SHA-256 `1413b21f7c0fa9a45f29e0e60cd691e4e5ec666ef3c35b688d7e720138c7db31`; julkaistun JPEG:n SHA-256 `a0cbd13757b77584679bbe4fa0b20abaf24de58823d08415f255118beaa745f3` (732386 tavua, HTTP 200 varmennettu).

### amsterdam:I2 — js/packs/fokusvirta-amsterdam.js · matkakirja.luentakuva2

| kenttä | VANHA | UUSI |
|---|---|---|
| osoite | https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-amsterdam-r20260911-paper2-v1.jpg | https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-amsterdam-i2-r20260914-tarina-v1.jpg |
| lyhyt | Amsterdam, 1873. Tuoli pääsi sisään, portaat jäivät sivuun. | Amsterdam, 1873. Ullakkokirkon urut salin toisessa päädyssä. |
| selite | Kaksi miestä ohjasi tuolin ikkunasta sisään ja jaloilleen. Köysi lepäsi lattialla, kun kapea porras jäi aivan vieressä käyttämättä. | Vuonna 1794 rakennetut urut ovat parven päädyssä penkkien yläpuolella. |
| lahde | Matkakirjan havainnekuva | Matkakirjan havainnekuva |
| lahteet | (ks. git-diff) | https://opsolder.nl/wp-content/uploads/2024/04/haantje36.pdf |

tarinateksti muuttumaton, SHA-256 `1413b21f7c0fa9a45f29e0e60cd691e4e5ec666ef3c35b688d7e720138c7db31`; julkaistun JPEG:n SHA-256 `f015bed264e0c59bb90a173c4afaf5f2581856eaf40edc030755f7a3ab345f16` (682768 tavua, HTTP 200 varmennettu).

### amsterdam:P1 — js/packs/fokusvirta-amsterdam.js · pollo.kuvat[0]

| kenttä | VANHA | UUSI |
|---|---|---|
| osoite | https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-amsterdam-01-r20260909-euv1-v1.jpg | https://media.matkakirja.app/matkakirja/pulu-cam/matkakirja-amsterdam-p1-r20260914-tarina-v1.jpg |
| lyhyt | Amsterdam: lentokoulun oppilas on tällä kertaa nojatuoli. | Amsterdam: pyörät parkissa veden alla, kuivin renkain. |
| selite | Nostolava kuljettaa nojatuolia Amsterdamin kapean talon ikkunaan, kun portaat eivät taivu tehtävään. Seurasin oppilaan nousua: lentoasento kunnossa, suuntavaisto täysin nostimen varassa. | Stationsplein-hallin pyörätelineet ja valkoiset pylväät kohoavat matalan kameran yllä. |
| lahde | Matkakirjan havainnekuva | Matkakirjan havainnekuva |
| lahteet | (ks. git-diff) | https://www.prorail.nl/nieuws/twee-grote-fietsenstallingen-bij-station-amsterdam-centraal-geopend |

tarinateksti muuttumaton, SHA-256 `a22b040783d01e72dc7e15b6827bcd4d099cda9389c72108cd3377c8ed8e0378`; julkaistun JPEG:n SHA-256 `23f819989fa86a90d8e6f999a3033d613a99ac0152bcead9cb83a55a19ab2660` (510100 tavua, HTTP 200 varmennettu).

### amsterdam:P2 — js/packs/fokusvirta-amsterdam.js · pollo.kuvat[1]

| kenttä | VANHA | UUSI |
|---|---|---|
| osoite | https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-amsterdam-02-r20260909-euv1-v1.jpg | https://media.matkakirja.app/matkakirja/pulu-cam/matkakirja-amsterdam-p2-r20260914-tarina-v1.jpg |
| lyhyt | Amsterdam: saavuin ikkunalle ennen huonekaluja. | Amsterdam: ankka ui pyörähallin katon yllä. |
| selite | Saavuin ikkunalle ennen nojatuolia, joka lähestyi muuttajaa omalla pienellä lavallaan. En huomauttanut lentoreitistäni, sillä vaivalla tehty suoritus ansaitsee hienotunteisen asiantuntijan. | Ankka kelluu Open Havenfrontilla, jonka alla sijaitsee aseman edustan pyörähalli. |
| lahde | Matkakirjan havainnekuva | Matkakirjan havainnekuva |
| lahteet | (ks. git-diff) | https://www.prorail.nl/nieuws/twee-grote-fietsenstallingen-bij-station-amsterdam-centraal-geopend |

tarinateksti muuttumaton, SHA-256 `a22b040783d01e72dc7e15b6827bcd4d099cda9389c72108cd3377c8ed8e0378`; julkaistun JPEG:n SHA-256 `a7144ee16f81507393e43d5686327592073e772be44018ffb157fb0c137d5cba` (708468 tavua, HTTP 200 varmennettu).

### varsova:P1 — js/packs/fokusvirta-varsova.js · pollo.kuvat[0]

| kenttä | VANHA | UUSI |
|---|---|---|
| osoite | https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-varsova-01-r20260909-euv1-v1.jpg | https://media.matkakirja.app/matkakirja/pulu-cam/matkakirja-varsova-p1-r20260914-tarina-v1.jpg |
| lyhyt | Varsova: tämän torin tunnistaminen on jonkun tekemää työtä. | Varsova: metsäpolku kulkee raunioista rakennetun kukkulan halki. |
| selite | Varsovan vanhankaupungin värikkäät julkisivut rakennettiin sodan jälkeen uudelleen, jotta torille voitiin palata asumaan ja kulkemaan. Matalalta kuvattuna pieni oviaukko muistuttaa, että suuren jälleenrakennuksen päämäärä oli tavallinen elämä. | Kukkula koottiin sodassa tuhoutuneen Varsovan raunioista, ja nykyisen puiston reiteillä historia kohtaa kasvavan metsän. |
| lahde | Matkakirjan havainnekuva | Matkakirjan havainnekuva |
| lahteet | (ks. git-diff) | https://zzw.waw.pl/nasze-tereny/parki/park-akcji-burza/ |

tarinateksti muuttumaton, SHA-256 `6107f701ffea15bd593cd6f1ad33568d5e68e7e6da274c85edde186191484de5`; julkaistun JPEG:n SHA-256 `7d7f702120ff364b49d0bb36f674c6438a1be8787fff54d0bf87b7cdc210ea1f` (1126122 tavua, HTTP 200 varmennettu).

### bukarest:P1 — js/packs/fokusvirta-bukarest.js · pollo.kuvat[0]

| kenttä | VANHA | UUSI |
|---|---|---|
| osoite | https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-bukarest-01-r20260909-euv1-v1.jpg | https://media.matkakirja.app/matkakirja/pulu-cam/matkakirja-bukarest-p1-r20260914-tarina-v1.jpg |
| lyhyt | Bukarest: parvelta löytyi suora yhteys lounaaseen. | Bukarest: lintuharrastajat kiikaroivat Văcăreștin ruovikossa. |
| selite | Manucin majatalon puuparvet kehystävät nykyään ravintolan täyttä sisäpihaa. Etsin pöytien alta murusia, kun viereisestä pöydästä kuultu salaisuus vei huomioni. | Hylätyn tekojärvihankkeen betonivallien sisään on kehittynyt Bukarestin kaupunkiluonnonpuisto. |
| lahde | Matkakirjan havainnekuva | Matkakirjan havainnekuva |
| lahteet | (ks. git-diff) | https://parculnaturalbucuresti.ro/en/the-park/ |

tarinateksti muuttumaton, SHA-256 `130666b9dd63aeb3413a7e1c190dbb14840b57a14d91c992e9ff1a3ade979d53`; julkaistun JPEG:n SHA-256 `e8014318dc71755d2b2087732c9beb5d40874feb6da689d04e4f79ecf5ed2015` (845396 tavua, HTTP 200 varmennettu).

### oslo:I1 — js/packs/fokusvirta-oslo.js · matkakirja.luentakuva

| kenttä | VANHA | UUSI |
|---|---|---|
| osoite | https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-oslo-r20260909-paper-v4.jpg | https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-oslo-i1-r20260914-tarina-v1.jpg |
| lyhyt | Christiania, 1873. Metsä valmistautui lähtemään laivalla. | Christiania, 1873. Työmies kantoi astiaa Lysakerin tehtaan luona. |
| selite | Christianian rannassa lankut odottavat suorina pinoina purjelaivan vieressä. Metsä on saanut merimatkaa varten siistimmän järjestyksen kuin moni matkustaja. | Vuoteen 1873 sijoittuva kuviteltu kohtaaminen pohjautuu Lysakerin nitroglyseriinitehtaan noin vuonna 1870 kuvattuun ympäristöön. |
| lahde | Matkakirjan havainnekuva | Matkakirjan havainnekuva |
| lahteet | (ks. git-diff) | https://snl.no/nitroglyserin<br>https://media.snl.no/media/263334/standard_compressed_Nitroglyserinfabrikken_Lysaker_Justert.jpg |

tarinateksti muuttumaton, SHA-256 `049aacd3f63354eed994764dac549e49507f960db662c3995d378dd7a04488f4`; julkaistun JPEG:n SHA-256 `6643295f8e2445ec302acfbb8f63a1e4ff8e1212c38ee11a9b40d94dff8aa238` (800545 tavua, HTTP 200 varmennettu).

### pariisi:I1 — js/packs/fokusvirta-pariisi.js · matkakirja.luentakuva

| kenttä | VANHA | UUSI |
|---|---|---|
| osoite | https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-pariisi-r20260909-paper-v4.jpg | https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-pariisi-i1-r20260914-tarina-v1.jpg |
| lyhyt | Pariisi, 1873. Ooppera harjoitteli juhlapukuaan. | Pariisi, 1873. Tuileries’n tyhjät ikkunat puutarhan laidalla. |
| selite | Uusi oopperatalo seisoo jo juhlapuvussaan, vaikka telineet, kivilohkot ja mutainen työmaa paljastavat harjoitusten jatkuvan. Arki tekee vielä töitä, jotta yleisö voisi myöhemmin vain astua sisään. | Vuoden 1871 palon jäljiltä palatsin runko seisoo yhä puutarhan edessä. Näkymä pohjautuu Henri Emile Godefroyn historialliseen valokuvaan. |
| lahde | Matkakirjan havainnekuva | Matkakirjan havainnekuva |
| lahteet | (ks. git-diff) | https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/vue-des-tuileries-apres-l-incendie-de-1871-5 |

tarinateksti muuttumaton, SHA-256 `a1e38ff0f7dd9a5da7842a59622f01ec167ee50c412153381ad96be5bd88a5c5`; julkaistun JPEG:n SHA-256 `c4f1d7d194d369c538d03201b2de034adfa11e0248718d4f057aa807bbc8cc46` (790594 tavua, HTTP 200 varmennettu).

### pariisi:I2 — js/packs/fokusvirta-pariisi.js · matkakirja.luentakuva2

| kenttä | VANHA | UUSI |
|---|---|---|
| osoite | https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-pariisi-r20260911-paper2-v1.jpg | https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-pariisi-i2-r20260914-tarina-v1.jpg |
| lyhyt | Pariisi, 1873. Leipä kainalossa kulki kadun paras esiintyjä. | Pariisi, 1873. Rauniot näkyivät myös puiden alta. |
| selite | Sade kiillotti kadun, ja mies kulki edellä leipä kainalossa. Seurasin häntä kaksi korttelia kuulematta pääsymaksusta sanaakaan. | Puiden varjosta avautuu toinen näkymä palaneen Tuileries’n julkisivuun. Puutarhan rajaus on kuviteltu saman historiallisen valokuvalähteen pohjalta. |
| lahde | Matkakirjan havainnekuva | Matkakirjan havainnekuva |
| lahteet | (ks. git-diff) | https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/vue-des-tuileries-apres-l-incendie-de-1871-5 |

tarinateksti muuttumaton, SHA-256 `a1e38ff0f7dd9a5da7842a59622f01ec167ee50c412153381ad96be5bd88a5c5`; julkaistun JPEG:n SHA-256 `3455bbf148efea528e00a82d71d08147724fe1b24d435edd50c1d55e6d262c38` (780358 tavua, HTTP 200 varmennettu).

### pariisi:P1 — js/packs/fokusvirta-pariisi.js · pollo.kuvat[0]

| kenttä | VANHA | UUSI |
|---|---|---|
| osoite | https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-pariisi-01-r20260909-euv1-v1.jpg | https://media.matkakirja.app/matkakirja/pulu-cam/matkakirja-pariisi-p1-r20260914-tarina-v1.jpg |
| lyhyt | Pariisi: oopperan paras aitiopaikka jäi ilman samettia. | Pariisi: tuoli kääntyi ystävää kohti. |
| selite | Palais Garnierin katon reunalla kulta, saumat ja sadejäljet näkyvät samassa lähikuvassa. Juhla-asukin tarvitsee huoltoa, ja minun aitiopaikastani puuttui vain tuoli. | Tuileries’n vihreillä tuoleilla kaksi ystävää jatkaa keskusteluaan puiden varjossa. Näkymä avautuu tuolin selkänojan korkeudelta. |
| lahde | Matkakirjan havainnekuva | Matkakirjan havainnekuva |
| lahteet | (ks. git-diff) | https://votrebanc.louvre.fr/en/the-project/<br>https://www.edmond-fils.com/les-collections/tuileries-mobilier-en-acier/ |

tarinateksti muuttumaton, SHA-256 `3b524abb834d06e629bef36e5d672a0c118e71cbee05b7ae24099d0df7171230`; julkaistun JPEG:n SHA-256 `bbcfa1f47b7f1c0d24b9931f105d871a7fc10731d74a9c565d941663aad01f9a` (671909 tavua, HTTP 200 varmennettu).

