# Herokuvien silmätarkistus, erä 1

Tarkastettu 23.8.2026. Kohde: 13 kaupungin generoidut herokuvat
(`js/packs/kulttuuri-kategoriat.js`, kenttä `ampari` alkaa `herokoe/`).
Tässä erässä EI generoitu mitään — työvaihe on ilmainen silmätarkistus,
jonka tehtävä on löytää ne kuvat, jotka kannattaa maksaa uusiksi.

## Miten tarkistus tehtiin

1. Generoitu kuva ladattiin R2:sta
   (`https://pub-…r2.dev/julisteet/herokoe/<tiedosto>`), pienennettiin
   ja katsottiin silmin.
2. Kuvatekstin nimeämästä kohteesta haettiin AITOJA valokuvia
   Wikimedia Commonsista `tools/hae-viitekuvat.mjs`:llä. Ensisijaisesti
   käytettiin kohteen omaa Commons-kategoriaa (en-Wikipedian otsikko →
   Wikidata P373 → categorymembers); kun työkalu ei tunnistanut kohdetta
   (Yusuf Khass Hajibin mausoleumi, Kyauktawgyi, Megjid Janraisig,
   Kašgarin basaari, Kadhimiyan pyhäkkö), kategoria haettiin käsin
   Commonsin kategoriahaulla ja annettiin työkalulle
   `--kategoria`-lipulla. Kadhimiyassa tekstihaku tarjosi vain vuosien
   1916 ja 1920 valokuvia; nykykuvat löytyivät vasta vuosikategoriasta
   `Category:Al-Kadhimiya Mosque in 2020`.
3. Aidot valokuvat katsottiin silmin ja verrattiin: muoto, kerrosluku,
   kupolit, minareetit, materiaali, värit, ympäristö.
4. Jokainen ladattu kuva poistettiin heti katsomisen jälkeen.

Tuomiot: **VÄÄRÄ** = eri rakennus tai selvästi väärä arkkitehtuuri
(nämä generoidaan uusiksi) · **EPÄILYTTÄVÄ** = tunnistettavia piirteitä
mutta jotain pielessä · **OK** = vastaa kohdetta riittävän hyvin.

**Kabul ja Mosul jäivät tarkastuksen ulkopuolelle: kummallakaan ei ole
yhtään generoitua heroa** — niiden avauskuvat ovat aitoja Commons-kuvia.
Tarkastettuja herokuvia oli siis 11 kaupunkia × 3 = 33.

## Taulukko

| Tiedosto | Kaupunki | Kuvatekstin lupaama kohde | Viitekuvia | Tuomio | Peruste |
| --- | --- | --- | --- | --- | --- |
| hero-kashgar-aamu.png | Kašgar | Kašgarin vanhakaupunki, savitiiliseinät loessikukkulalla | 2 | OK | Savitiilinen sakaramuuri ja porttiholvi tasakattoisen savikaupungin edessä vastaa Kašgarin vanhankaupungin porttia ja korttelirakennetta. |
| hero-kashgar-keskipaiva.png | Kašgar | Yusuf Balasagunin (Yusuf Khass Hajib) mausoleumi | 2 | **VÄÄRÄ** | Kuvassa on Samarkandin tyylinen korkea uurrekupolinen timuridimausoleumi, kun aito kohde on matala, litteä, kuusitornisen sinikaakeloidun julkisivun rakennus ilman suurta kupolia. |
| hero-kashgar-ilta.png | Kašgar | Kašgarin sunnuntaimarkkinat | 3 | EPÄILYTTÄVÄ | Markkinat on kuvattu Buharan mittakaavan kaksikerroksisena timuridiportaalina, kun Kašgarin oma markkinaportti (Id Kah, vihreäkupolinen basaarihalli) on paljon pienempi ja koruttomampi. |
| hero-lhasa-aamu.png | Lhasa | Jokhangin temppeli | 3 | OK | Valkoiset muurit, tummanpunainen benma-vyöhyke, kullatut kattopaviljongit ja suitsutusastiat Barkhorin aukiolla vastaavat kohdetta. |
| hero-lhasa-keskipaiva.png | Lhasa | Drepungin luostari | 3 | OK | Rinteeseen porrastuva valkoinen luostarikaupunki punaisine reunuksineen ja kullattuine kattoineen vastaa Drepungia. |
| hero-lhasa-ilta.png | Lhasa | Norbulingka, seitsemännen dalai-laman kesäpalatsi | 2 | OK | Valkokeltainen palatsirakennus kullattuine kattoineen puistossa lampineen ja paviljonkeineen vastaa Norbulingkaa. |
| hero-mandalay-aamu.png | Mandalay | Atumashin luostari, viisi suorakulmaista pengermää | 2 | EPÄILYTTÄVÄ | Pengerretty valkoinen hahmo on oikea, mutta kaikki burmalainen kultakoriste ja pyatthat-huiput puuttuvat ja tilalla on länsimainen pylväikkö ja suorakulmaiset ikkunarivit. |
| hero-mandalay-keskipaiva.png | Mandalay | Sandamunin pagodi | 2 | OK | Kullattu keskusstupa satojen valkoisten kirjoituspagodien ruudukossa vastaa kohdetta. |
| hero-mandalay-ilta.png | Mandalay | Kyauktawgyin temppeli | 2 | OK | Valkoinen neliömäinen temppelihalli kullattuine porrastettuine pyatthat-torneineen vastaa kohteen rakennustapaa. |
| hero-ulanbator-aamu.png | Ulan Bator | Gandanin Megzed Janraisegin temppeli | 2 | OK | Valkoinen korkea alaosa, kaksi porrastettua puukattoa kullattuine harjakoristeineen ja dharmapyörä vastaavat aitoa temppeliä. |
| hero-ulanbator-keskipaiva.png | Ulan Bator | Sükhbaatarin aukio ja hallituspalatsi | 2 | OK | Pitkä pylväikköjulkisivu keskellä istuvan Tsingis-kaanin patsaan syvennys ja aukion ratsastajapatsas vastaavat kohdetta. |
| hero-ulanbator-ilta.png | Ulan Bator | Zaisanin muistomerkki | 2 | OK | Ympyränmuotoinen betonirengas mosaiikkiseinineen, keskellä ikuinen tuli, kukkulalla kaupungin yllä — vastaa kohdetta. |
| hero-tabriz-aamu.png | Tabriz | Tabrizin Sininen moskeija | 2 | OK | Sinikaakeloitu porttiholvi, sen molemmin puolin tyngäksi jääneet tornit ja takana tiilikupoli vastaavat jälleenrakennettua Sinistä moskeijaa. |
| hero-tabriz-keskipaiva.png | Tabriz | Tabrizin Arg (Alishahin muuri) | 2 | OK | Yksinäinen massiivinen tiiliholvin jäänne kaupungin keskellä vastaa Argia tarkasti. |
| hero-tabriz-ilta.png | Tabriz | Kaupungintalo eli Saat-torni | 2 | OK | Symmetrinen kivijulkisivu ja keskellä nelitauluinen kellotorni terävine kattoineen vastaavat kohdetta. |
| hero-teheran-aamu.png | Teheran | Azadi-torni | 2 | OK | Valkoinen marmorikaari ja verkkoholvi vastaavat Azadia. |
| hero-teheran-keskipaiva.png | Teheran | Shams ol-Emareh, Golestanin palatsi | 2 | OK | Kaksi samanlaista kaakeloitua tornia, niiden päällä avoimet paviljongit ja niiden välissä pieni kellotorni — vastaa kohdetta. |
| hero-teheran-ilta.png | Teheran | Milad-torni | 2 | OK | Kahdeksankulmaisesta jalustasta nouseva betonivarsi ja 12-kerroksinen pää vastaavat Miladia. |
| hero-isfahan-aamu.png | Isfahan | Shaahin moskeija Naqsh-e Jahanin aukiolla | 2 | OK | Turkoosi kaakelikupoli, iwan-portaali minareetteineen ja takana aukio arkadeineen vastaavat kohdetta. |
| hero-isfahan-keskipaiva.png | Isfahan | Si-o-se-pol | 2 | OK | Kaksikerroksinen kaariarkadisilta Zayandehin yli vastaa kohdetta. |
| hero-isfahan-ilta.png | Isfahan | Sheikh Lotfollahin moskeija | 2 | OK | Vaalea arabeskikupoli ilman minareetteja ja pihaa, aukion laidalla Ali Qapu — vastaa kohdetta. |
| hero-riad-aamu.png | Riad | Masmakin savitiililinnoitus | 2 | OK | Savitiilimuuri, neljä lieriömäistä sakaratornia ja portin päällä keskustorni vastaavat Masmakia. |
| hero-riad-keskipaiva.png | Riad | Al Faisaliahin torni | 2 | OK | Pyramidivartinen torni, kultainen lasipallo ja kärkipiikki vastaavat kohdetta. |
| hero-riad-ilta.png | Riad | Kingdom Centre | 2 | OK | Ylimmän kaaren muotoinen aukko ja sen yli kulkeva näköalasilta vastaavat kohdetta. |
| hero-kuwait-aamu.png | Kuwait | Kuwaitin tornit | 2 | OK | Kaksi palloa korkeimmassa tornissa, yksi toisessa ja kolmas paljas piikki vastaavat kohdetta. |
| hero-kuwait-keskipaiva.png | Kuwait | Kuwaitin suurmoskeija | 2 | EPÄILYTTÄVÄ | Massa ja yksi kulmaminareetti ovat oikeat, mutta kupoli on kuvassa uurrettu ja julkisivu suippokaariarkadi, kun aidossa kupoli on sileä ja julkisivu suora hiekkakivipinta. |
| hero-kuwait-ilta.png | Kuwait | Seifin palatsi ja sen kellotorni | 3 | EPÄILYTTÄVÄ | Sinikaakeloitu kellotorni kultakattoineen on tunnistettava, mutta se on kuvassa matala ja tanakka aidon korkean ja hoikan sijaan, ja palatsi on kaksikerroksinen kaariarkadirakennus aidon sakaramuurisen hiekanvärisen palatsin sijaan. |
| hero-bagdad-aamu.png | Bagdad | Mustansiriyan madrasa | 2 | OK | Suorakulmainen tiilipiha kaksikerroksisine arkadeineen, koristeltu iwan-portaali ja Tigris takana vastaavat kohdetta. |
| hero-bagdad-keskipaiva.png | Bagdad | Kadhimiyan pyhäkkö | 2 | OK | Kaksi kullattua kupolia, kullatut minareetit ja niiden alla sinikaakeloitu iwan-portaali vastaavat kohdetta. |
| hero-bagdad-ilta.png | Bagdad | Marttyyrien muistomerkki (al-Shaheed) | 2 | OK | Kahtia halkaistu turkoosi kupoli, puolikkaiden limitys ja väliin jäävä liekki vastaavat monumenttia. |
| hero-damaskos-aamu.png | Damaskos | Umaijadimoskeija | 1 | OK | Suuri arkadipiha, kultamosaiikkivyö julkisivussa ja pylväiden päällä aarrekammion kupoli vastaavat kohdetta. |
| hero-damaskos-keskipaiva.png | Damaskos | Suq al-Hamidiyyan rautaholvattu pääkatu | 2 | **VÄÄRÄ** | Kuvassa on keksitty basilikamainen kivijulkisivu ruusuikkunoineen ja katto nähdään ulkoa, kun kuvateksti lupaa nimenomaan holvin alla kulkevan kadun, jonka luodinreiät piirtävät valopisteitä — aito kohde on sisätila, ei monumenttijulkisivu. |
| hero-damaskos-ilta.png | Damaskos | Vanhakaupunki Qasiun-vuoren rinteeltä, kattojen ja kupolien matto | 1 | EPÄILYTTÄVÄ | Kuva on ilmakuva Umaijadimoskeijasta eikä luvattu panoraama vuoren rinteeltä, ja se toistaa saman kaupungin aamukuvan aiheen. |

## Yhteenveto

- **VÄÄRÄ: 2**
- **EPÄILYTTÄVÄ: 5**
- **OK: 26**
- Tarkastettuja kuvia yhteensä 33 (11 kaupunkia). Kabulilla ja
  Mosulilla ei ole generoituja heroja.

## Uusiksi generoitavat, tärkeysjärjestyksessä

1. `herokoe/hero-kashgar-keskipaiva.png` — Yusuf Balasagunin
   mausoleumi. Väärä rakennus: Samarkandin timuridikupoli aidon
   matalan kuusitornisen mausoleumin tilalla. Commonsissa on
   käyttökelpoinen kategoria `Category:Mausoleum of Yusuf Khass Hajib`
   (2 kelvollista ulkokuvaa; kategorian kolmas kuva on pelkkä
   opastekyltti, joka ei kelpaa viitteeksi).
2. `herokoe/hero-damaskos-keskipaiva.png` — Suq al-Hamidiyya. Kuva on
   keksitty ulkojulkisivu, kun kuvateksti lupaa holvin alla kulkevan
   kadun valopisteineen. Viitteet:
   `Category:Al-Hamidiyah Souq` (49 kelvollista kuvaa, joissa
   sisänäkymä holvin alta).

## Huomio jatkoon

Molemmat VÄÄRÄT ovat samaa lajia kuin alkuperäinen Kašgar-havainto:
malli ei tunne kohdetta ja täyttää aukon alueen arkkityypillä
(Kašgarissa timuridimausoleumi, Damaskoksessa monumentaalijulkisivu).
Kolme EPÄILYTTÄVÄÄ (Kašgarin markkinat, Atumashi, Seifin palatsi)
ovat lievempi versio samasta: oikea siluetti, väärä koristekieli tai
mittakaava. Kaikissa viidessä Commonsista löytyi aitoja valokuvia,
joten `tools/hae-viitekuvat.mjs`:n viiteportti olisi estänyt virheen —
jos kohteen kategoria olisi osattu nimetä. Kaikki tässä erässä käsin
etsityt kategoriat on kirjattu yllä, jotta uusintageneroinnin ei tarvitse
etsiä niitä uudelleen.
