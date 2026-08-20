> **ARKISTOITU 19.8.2026 (Opus).** Tämä ei ole ohje vaan KÄYTTÄMÄTÖN
> RAAKA-AINE: Sonnet-agentin kokoama faktapohja, jonka päälle lehteä ei
> ole vielä kirjoitettu. Tiedosto on tallennettu repoon, koska se syntyi
> konttiympäristön väliaikaiskansioon ja olisi muuten kadonnut session
> mukana. JOKAINEN FAKTA ON TARKISTETTAVA LÄHTEESTÄ ennen käyttöä —
> raportti merkitsee itse omat epävarmuutensa viimeiseen osioonsa, ja
> aiemmissa lehdissä agenttien raporteista on löytynyt sekä keksittyjä
> lukuja että väärintulkintoja. Ks. docs/arkisto/kapulanvaihto-2026-08-19-opus.md

# Ruba al-Khali (Rub al-Khali) — aluelehden faktakoostus

Lauta: `middleeast`. Laudalla on jo kohde id:llä `rubalkhali` (middleeast.js,
ambience `aavikko`) sekä aarrejahdin kohtaaminen (`js/tyohuone-kehitys-data.js`)
ja kulttuurivisan kysymyksiä (`middleeast-questions.js`), mutta EI lehteä
`kulttuuri-kategoriat.js`:ssä. Tämä on siis kokonaan uusi ALUELEHTI, malli
Kreeta/Sisilia (kaksi aihetta: `kaupunki` + yksi teema, ei kohdekarttaa eikä
nähtävyysjuttuja).

Kaikki merkkimäärät on laskettu Python `len()`:llä (mukaan lukien ääkköset ja
ajatusviivat). Johdannot 154–232 merkkiä, nostot 440–660 merkkiä — kaikki alla
olevat tekstit on tarkistettu ja osuvat rajoihin.

Sisältölinjaus noudatettu: EI nykysotaa, EI nykypolitiikkaa. Öljy esiintyy vain
geologisena/taloushistoriallisena aiheena (löytövuodet, syvyys, logistiikka).

---

## 1. Sivuehdotukset

### Sivu `kaupunki` — "Ruba al-Khali"

**Johdanto** (216 merkkiä):

> Aavikko, joka on suurempi kuin Ranska, jonka hiekka laulaa illalla dyynin
> valuessa ja jonka alta löytyi maailman suurimpia öljykenttiä. Vielä
> 1930-luvulla sen poikki ei ollut kulkenut yksikään tunnettu ulkomaalainen.

Kantaa yleiskuvan: mitat, dyynit, muinaiset järvet, eläimistö, öljy — sama
rooli kuin Kreetan/Sisilian `kaupunki`-sivulla.

### Teemasivu-ehdotus: `legenda` — "Ubar ja hiekkameren ylittäjät"

**Johdanto** (221 merkkiä):

> Kaksi englantilaista tutkimusmatkailijaa ylitti hiekkameren kamelilla
> 1930-luvulla etsien tarua kadonneesta kaupungista, jota Koraani kutsuu
> Iramiksi. Toinen löysikin sen sijaan aavikkoon pudonneen meteoriitin
> kraatterit.

**Perustelu id:n ja aiheen valinnalle.** Punnitsin kahta vaihtoehtoa:
tutkimusmatkailu/legenda vs. luonto (eläimistö, kasvisto, beduiinien arki).
Valitsin legendan ja tutkimusmatkailijat, koska aineisto on siitä
poikkeuksellisen tarkkaa ja tarinallista — Wikipedian omat artikkelit
Bertram Thomasista, Wilfred Thesigeristä, Wabarin kraattereista ja Iramin
pilareista antavat päivämäärät, reitit, oppaiden heimot ja jopa kamelin nimen,
eli juuri sellaista konkretiaa, josta pelin nostot rakentuvat. Luonto/eläimistö
-aineisto (osiossa 2 käytetty nostoissa 2–3) on ohuempaa: enimmäkseen yksi
laaja Rub al-Khali -artikkeli ja Arabian oryx -artikkeli, ei riitä yksinään
neljäksi erilliseksi nostoksi ilman toistoa kaupunkisivun kanssa. Legenda-teema
sopii myös hyvin pelin isoisän matkapäiväkirja -henkeen: Thomas ja Thesiger
ovat juuri sitä 1900-luvun alun tutkimusmatkailua, jota peli muutenkin
juhlistaa, ja aihe kytkeytyy luontevasti alueen omaan aarrejahti-kohtaamiseen
(jäljenlukija Saif) ilman että faktat toistuvat sen kanssa (ks. luku 6).

---

## 2. Kahdeksan nostoehdotusta (4 per sivu)

### Sivu `kaupunki`

**Nosto 1 — "Hiekkameri, joka on suurempi kuin Ranska"** (656 merkkiä)

> Rub al-Khali eli Tyhjä neljännes on maailman suurin yhtenäinen
> hiekka-aavikko, noin 650 000 neliökilometriä — enemmän kuin Ranskan koko
> pinta-ala. Se ulottuu noin tuhat kilometriä idästä länteen ja viisisataa
> kilometriä pohjoisesta etelään, neljän maan alueelle: Saudi-Arabiaan,
> Omaniin, Arabiemiirikuntiin ja Jemeniin. Suurin osa maastosta on
> hiekkamerta eli ergiä, jonka dyynit kohoavat jopa 250 metrin korkeuteen ja
> jota reunustavat sora- ja kipsitasangot. Hiekka on punaisenoranssia, koska
> siinä on maasälpää. Aavikon korkeuskin vaihtelee suuresti: lounaassa
> maasto on noin 800 metrin korkeudessa, mutta koillisessa se laskee lähes
> merenpinnan tasolle.

Faktat ja lähteet:
- Pinta-ala n. 650 000 km² (infobox 650 010 km², leipäteksti "650,000 km²") — *Rub' al Khali*, en.wikipedia.org
- Pituus n. 1000 km, leveys n. 500 km — *Rub' al Khali*
- Neljä maata: Saudi-Arabia, Oman, Arabiemiirikunnat, Jemen — *Rub' al Khali*
- Maasto on ergiä, dyynit jopa 250 m, väliin sora- ja kipsitasankoja — *Rub' al Khali*
- Hiekan punaisenoranssi väri johtuu maasälvästä (feldspar) — *Rub' al Khali*
- Korkeus vaihtelee n. 800 m (lounas) ja lähes merenpinnan (koillinen) välillä — *Rub' al Khali*

**Nosto 2 — "Muinaiset järvet hiekan alla"** (645 merkkiä)

> Rub al-Khalin hiekan alta on löytynyt todisteita ajoista, jolloin siellä
> oli järviä. Kaksi rankkasadekautta, 6000–5000 ja 3000–2000 vuotta sitten,
> muistuttivat monsuunia ja täyttivät aavikon painanteita vedellä; useimmat
> järvet kestivät vain muutaman vuoden, mutta Mundafanin alueella vesi
> pysyi jopa 800 vuotta. Kerrostumista on kaivettu virtahepojen,
> vesipuhvelien ja pitkäsarvisten nautojen luita sekä etanankuoria ja
> makean veden simpukoita. Kalsiumkarbonaatti ja opaalifytoliitit kertovat
> rannoilla kasvaneista kasveista ja levästä. Samoilta kerroksilta on
> löytynyt 3000–2000 vuotta vanhoja piikivityökaluja — mutta ei yhtään
> ihmisen luuta.

Faktat ja lähteet (kaikki: *Rub' al Khali*, en.wikipedia.org):
- Kaksi järvikautta: 6000–5000 ja 3000–2000 vuotta sitten, syntynyt rankoista monsuunimaisista sateista
- Useimmat järvet kestivät vain muutaman vuoden, Mundafanin alueella jopa 800 vuotta
- Fossiileja: virtahepo, vesipuhveli, pitkäsarvinen nauta, etanat, makean veden simpukat, ostrakodit
- Kalsiumkarbonaatti ja opaalifytoliitit todistavat kasvillisuudesta ja levästä
- 3000–2000 vuotta vanhoja piikivityökaluja löydetty, mutta ei ihmisen luita

**Nosto 3 — "Eläimet jotka selviävät"** (654 merkkiä)

> Rub al-Khali on yksi maailman kuivimmista paikoista, mutta silti
> aavikolla elää eläimiä, jotka ovat sopeutuneet äärioloihin. Vielä
> 1930-luvun puolivälissä yksi arabianoryksin viimeisistä
> luonnonvaraisista kannoista eli juuri täällä ja pohjoisempana Nafudin
> aavikolla — mutta vuoteen 1972 mennessä laji hävisi luonnosta kokonaan.
> Vuodesta 1980 lähtien sitä on istutettu takaisin, ensimmäisenä Omaniin
> San Diegon eläintarhan kannasta, ja vuonna 2016 luonnossa eli jo noin
> 1220 yksilöä. Aasiangepardi sen sijaan on hävinnyt Saudi-Arabiasta
> kokonaan eikä ole enää palannut. Beduiinit ovat pitäneet Omanin mustia
> kameleita harvinaisena ja arvostettuna rotuna.

Faktat ja lähteet:
- 1930-luvun puolivälissä arabianoryksin jäljellä ollut kanta rajoittui Nafudin aavikkoon ja Rub al-Khaliin — *Arabian oryx*
- Laji hävisi luonnosta vuoteen 1972 mennessä — *Arabian oryx*
- Palautusistutus alkoi 1980, ensimmäinen erä Omaniin San Diegon eläintarhan kannasta — *Arabian oryx*
- Vuonna 2016 luonnonvarainen kanta n. 1220 yksilöä (850 aikuista) — *Arabian oryx*
- Aasiangepardi extirpoitunut (hävinnyt) Saudi-Arabiasta — *Rub' al Khali*
- Omanin mustia kameleita pidetään harvinaisena, arvostettuna rotuna — *Rub' al Khali*

**Nosto 4 — "Öljy hiekan alla"** (660 merkkiä)

> Rub al-Khalin hiekan alla piilee osa maailman suurimmista öljyvaroista.
> Vuonna 1948 löydetty Ghawarin kenttä, edelleen maailman suurin
> öljyesiintymä, ulottuu etelään aina hiekka-aavikon pohjoisimpiin osiin
> asti. Syvemmällä hiekkameren sisällä on Shaybahin kenttä, yksi maailman
> eristyneimmistä öljylähteistä: sen rakentamiseen tarvittu materiaali
> kuljetettiin 800 kilometrin päästä Dhahranista asti. Öljyesiintymä on
> 1 494 metrin syvyydessä ja 122 metriä paksu, ja siitä on arvioitu
> saatavan 14 miljardia tynnyriä öljyä sekä 25 biljoonaa kuutiojalkaa
> maakaasua. Työmaalle rakennettiin majoitus tuhannelle työntekijälle ja
> oma kiitorata keskelle tyhjää hiekkaa.

Faktat ja lähteet:
- Ghawarin kenttä löydetty 1948, maailman suurin öljyesiintymä, ulottuu Rub al-Khalin pohjoisimpiin osiin — *Rub' al Khali*
- Shaybahin kenttä sijaitsee syvällä hiekkameren sisällä (HUOM. löytövuodesta ristiriita, ei käytetty tekstissä — ks. luku 6) — *Shaybah Field*
- Rakennusmateriaali kuljetettiin 800 km Dhahranista — *Shaybah Field*
- Öljyesiintymä 1494 m syvyydessä, 122 m paksu — *Shaybah Field*
- Arvioidut varat 14 mrd tynnyriä öljyä + 25 biljoonaa kuutiojalkaa kaasua — *Shaybah Field*
- Työmaalla majoitus 1000 työntekijälle ja oma kiitorata — *Shaybah Field*

### Sivu `legenda`

**Nosto 5 — "Kaupunki, jota Koraani kutsuu Iramiksi"** (646 merkkiä)

> Koraanin suura al-Fajr kertoo Iramista, kadonneesta kaupungista, jonka
> asukkaat, Adin kansa, olivat suurikokoisia, vailla vertaa millään muulla
> maalla. Tekstissä mainitaan myös imad, pilarit — tutkijat kiistelevät
> yhä, tarkoittiko sana rakennuksia vai heimon telttoja, ja oliko Iram
> edes yksittäinen kaupunki. Vuonna 1998 Nicholas Clapp esitti Iramin
> olevan sama paikka kuin legendaarinen Ubar, löytyen Shisrin
> kaivauspaikalta Omanista — väite ei ole yleisesti hyväksytty, ja Clapp
> itsekin kumosi sen myöhemmin. Todennäköisimpänä ehdokkaana pidetään
> nykyisin Wadi Rammia Jordaniassa, jonka temppelistä on löytynyt Iramin
> mainitsevia kirjoituksia.

Faktat ja lähteet (kaikki: *Iram of the Pillars*, en.wikipedia.org):
- Koraanin suura al-Fajr (89:6–14) mainitsee Iramin ja Adin kansan, "suurikokoisia, vailla vertaa"
- Sana "imad" (pilarit) — tutkijat erimielisiä merkityksestä (rakennus vai telttatolppa)
- Tutkijat erimielisiä siitä, oliko Iram kaupunki, alue vai heimon nimi
- Nicholas Clapp esitti 1998 Iram=Ubar=Shisr (Oman) -hypoteesin
- Hypoteesi ei ole yleisesti hyväksytty; Clapp itse kumosi sen myöhemmin
- Todennäköisin ehdokas Wikipedian mukaan: Wadi Ramm Jordaniassa (al-Latin temppelin kirjoitukset)

**Nosto 6 — "Meteoriitti, joka löytyi legendaa etsiessä"** (626 merkkiä)

> Brittiläinen St John Philby etsi legendaarista Ubarin kaupunkia, kun hän
> löysi 2. helmikuuta 1932 jotain muuta: kraatterikentän keskellä Rub
> al-Khalia. Beduiinit kutsuivat paikkaa nimellä Al Hadida, raudan paikka.
> Suurin kraattereista on 116 metriä ja toiseksi suurin 64 metriä leveä.
> Iskun voimasta hiekka suli mustaksi lasiksi, jossa on shokkikvartsia —
> kiistaton todiste meteoriitin törmäyksestä. Iskun iästä lähteet ovat
> erimielisiä: yksi menetelmä antaa noin 6400 vuotta, toinen alle 250
> vuotta — jälkimmäinen sopisi 1800-luvulla Riadin yllä nähtyihin
> tulipalloihin. Suurin talteen otettu kappale painaa 2045 kilogrammaa.

Faktat ja lähteet (kaikki: *Wabar craters*, en.wikipedia.org):
- St John Philby löysi kraatterit 2.2.1932 etsiessään Ubaria
- Beduiininimi "Al Hadida" ("raudan paikka")
- Suurin kraatteri 116 m, toiseksi suurin 64 m leveä
- Mustaa lasia (impaktiittia) shokkikvartsilla (koesiitti)
- Iän ajoitus ristiriitainen: fissioraidoitus n. 6400±2500 v, termoluminesenssi <250 v (viittaa mahd. 1863/1891 tulipallohavaintoihin)
- Suurin talteen otettu kappale ("Camel's Hump") 2045 kg

**Nosto 7 — "Ensimmäinen tunnettu ylitys"** (643 merkkiä)

> Vuosina 1930–1931 brittiläinen Bertram Thomas teki jotain, mitä
> yksikään tunnettu ulkomaalainen ei ollut ennen tehnyt: hän ylitti koko
> Rub al-Khalin Soharista Sharjahiin. Matkalla häntä opasti Rashid-heimon
> beduiineja, ja hänen lempikamelinsa kulki nimellä Khawarah. Thomas
> kirjasi matkansa kirjaan Arabia Felix, joka ilmestyi 1932 ja jossa hän
> kuvasi aavikon eläimiä, asukkaita ja tapoja. Saavutus teki hänestä
> ensimmäisen dokumentoidun länsimaalaisen, joka oli ylittänyt
> hiekkameren keskeltä käsin — samaan aikaan samasta kunniasta kilpaili
> myös St John Philby, joka löysi omalla ylitysyrityksellään sen sijaan
> Wabarin meteoriittikraatterit.

Faktat ja lähteet (kaikki: *Bertram Thomas*, en.wikipedia.org):
- Ensimmäinen dokumentoitu länsimaalainen, joka ylitti Rub al-Khalin, 1930–1931
- Reitti Soharista Sharjahiin
- Oppaina Rashid-heimon beduiineja
- Lempikameli nimeltä "Khawarah" (kuvatekstissä)
- Kirjoitti matkasta kirjan *Arabia Felix* (1932)

**Nosto 8 — "Thesigerin kaksi ylitystä"** (660 merkkiä)

> Brittiläinen Wilfred Thesiger ylitti Rub al-Khalin kahdesti 1940-luvun
> lopulla. Ensimmäinen matka alkoi lokakuussa 1946 Salalahista, kulki
> Mughshinin ja Liwan keitaiden kautta Abu Dhabihin ja päättyi takaisin
> Salalahiin 23. helmikuuta 1947; mukana oli neljä miestä, kaksi Rashid-
> ja kaksi Bait Kathir -heimosta. Toinen matka alkoi joulukuussa 1947
> Manwakhin kaivolta Jemenistä. Saudi-Arabian kuningas ei ollut antanut
> lupaa Thesigerin seurueen tuloon, ja se otettiin kiinni Sulayilissa —
> mutta vapautettiin pian, minkä jälkeen matka jatkui Liwan kautta Abu
> Dhabihin 14. maaliskuuta 1948. Thesiger kirjoitti matkoistaan kirjan
> Arabian Sands, joka ilmestyi 1959.

Faktat ja lähteet (kaikki: *Wilfred Thesiger*, en.wikipedia.org):
- Ensimmäinen ylitys loka. 1946 – 23.2.1947, reitti Salalah–Mughshin–Liwa–Abu Dhabi–Salalah
- Mukana neljä miestä: kaksi Rashid-, kaksi Bait Kathir -heimosta
- Toinen ylitys jouluk. 1947 – 14.3.1948, reitti Manwakh (Jemen)–Sulayil–Liwa–Abu Dhabi
- Saudi-Arabian kuningas ei hyväksynyt tuloa; seurue vangittiin Sulayilissa, vapautettiin pian
- Kirjoitti matkoistaan kirjan *Arabian Sands* (1959)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Näiden faktat EIVÄT toistu nostojen kanssa (tarkistettu erikseen, ks. myös
luku 6 kohta duplikaateista).

**"Perille ja liikkeelle"** (485 merkkiä)

> Rub al-Khaliin ei pääse lentäen eikä junalla — ainoa tie kulkee autolla,
> ja sekin on tuore. Omanin Ibristä Saudi-Arabian Al-Ahsaan kulkeva tie
> valmistui syyskuussa 2021: se on 700–800 kilometriä pitkä, josta 160
> kilometriä on Omanin ja 580 kilometriä Saudi-Arabian puolella. Ennen
> tietä hiekkameren syrjäisimpiin osiin kuljettiin vain
> tutkimusretkikuntien jättämiä uria seuraten, eikä alueella ollut
> minkäänlaista tietä. Aavikon syvimpiin osiin ei vieläkään pääse
> tavallisella autolla.

Faktat: Ibri (Oman) – Al-Ahsa (Saudi-Arabia) -tie valmistui syyskuussa
2021, kokonaispituus 700–800 km (160 km Omanin puolella, 580 km Saudin
puolella); ennen tietä alueella oli vain tutkimusretkikuntien jättämiä uria.
— Lähde: *Rub' al Khali*, en.wikipedia.org.

**Alueen rakenne** (613 merkkiä)

> Rub al-Khali ei ole joka puolelta samanlainen hiekkalakeus. Pohjoisreunalla,
> lähellä Persianlahtea, on Liwan keidas: noin sata kilometriä pitkä
> puolikuun muotoinen vyöhyke, jossa on kymmeniä kyliä keskuksenaan
> Muzayri'. Sen kupeessa, 22 kilometriä etelään, kohoaa Moreeb-dyyni — 300
> metriä korkea ja yksi maailman suurimmista yksittäisistä dyyneistä.
> Aavikon itäreunalla on aivan toisenlainen maasto: Umm al-Samim, suolainen
> kosteikko, jonka kova näköinen kuori pettää yllättäen jalan alta.
> Beduiinit ovat nimenneet sen myrkkyjen äidiksi. Thesiger oli ensimmäinen
> eurooppalainen, joka näki sen 1940-luvun lopulla.

Faktat: Liwan keidas n. 100 km puolikuun muotoinen vyöhyke, n. 50 kylää,
keskuksena Muzayri' (*Liwa Oasis*); Moreeb-dyyni 300 m korkea, 22 km
Muzayri'sta etelään, yksi maailman suurimmista (*Liwa Oasis* — **HUOM.
ristiriita nosto 1:n 250 m -lukuun, ks. luku 6**); Umm al-Samim -suolakosteikko
aavikon itäreunalla, nimi tarkoittaa "myrkkyjen/huolien äiti", Thesiger
ensimmäinen eurooppalainen joka näki sen 1940-luvun lopulla (*Umm al Samim*).

**Arjen ilmiö** (604 merkkiä)

> Rub al-Khalin reunoilla asuu yhä beduiiniheimoja, joista suurimman
> alueen hallitsee Al Murrah — noin 15 000 ihmistä, jotka perinteisesti
> vaelsivat kamelikarjansa kanssa jopa 3000 kilometriä vuodessa. Heidän
> elämästään on kirjoitettu tutkimuskirja Nomads of the Nomads: The Al
> Murrah Bedouin of the Empty Quarter. Vanhempi arki näkyy myös
> kaupankäynnin reiteissä: 300-luvulta eaa. 200-luvulle jaa. suitsuke-
> karavaanit kulkivat Dhofarista Najranin, Mekan ja Medinan kautta aina
> Petraan ja Gazaan asti, kuljettaen pohjoiseen suitsuketta ja mirhamia ja
> tuoden vastaan intialaisia mausteita, helmiä ja silkkiä.

Faktat: Al Murrah n. 15 000 henkeä, perinteisesti vaelsivat jopa 3000
km/vuosi kamelikarjan kanssa, tutkimuskirja "Nomads of the Nomads" (*Al
Murrah*); suitsukekaravaanien kauppa huipussaan n. 300-luvulta eaa.
200-luvulle jaa., reitti Dhofar(Moscha Limen)–Shabwa–Najran–Mekka/Medina–
Petra–Gaza, tavarana suitsuke, mirha, intialaiset mausteet/helmet/silkki
(*Incense Road*).

**Historian käännekohta** (628 merkkiä)

> Aavikon todellinen käännekohta ei ole legenda vaan kuivuminen. Shisrin
> kauppapaikka Omanin puolella rakennettiin 400-luvulla ja toimi sisämaan
> kauppa-asemana vuosisatoja, kunnes se hylättiin 1400–1500-luvuilla.
> Wikipedian mukaan paikka saattoi juuri innoittaa Ubarin legendan: kun
> kaivon lähde ehtyi, asutus autioitui, ja tarina muuttui vuosisatojen
> kuluessa taruksi kadonneesta kaupungista. Osa on pitänyt Shisriä samana
> paikkana kuin legendaarinen Ubar tai Iram, mutta tätä ei pidetä
> tutkijoiden keskuudessa yleisesti hyväksyttynä. Paikka on nykyään osa
> Unescon maailmanperintökohdetta Suitsukkeen maa, suojeltu vuodesta 2000.

Faktat (kaikki: *Archaeological site of Shisr*, en.wikipedia.org — **HUOM.
nämä poikkeavat rajusti ei-Wikipedia-lähteistä, ks. luku 6**): Shisr
rakennettu 400-luvulla, hylätty 1400–1500-luvuilla; toimi sisämaan
kauppa-asemana; Unescon maailmanperintökohde "Land of Frankincense"
vuodesta 2000; osa pitää sitä Ubarina/Iramina, ei yleisesti hyväksytty;
artikkeli arvelee kuivuneen lähteen selittävän legendan synnyn.

**Milloin kannattaa tulla** (482 merkkiä)

> Rub al-Khali on äärimmäisen kuiva: sadetta kertyy vuodessa yleensä alle
> 50 millimetriä. Ilmankosteus vaihtelee rajusti vuodenajan mukaan —
> tammikuussa se on noin 52 prosenttia, kesä–heinäkuussa enää noin 15.
> Lämpötilaero yön ja päivän välillä voi olla valtava: Shaybahin
> öljykentällä talviyöt voivat pudota noin kymmeneen asteeseen, kun
> kesäpäivät nousevat noin viiteenkymmeneen. Paras aika matkalle on talvi,
> jolloin päivälämpötila pysyy siedettävänä eikä yö ole vaarallisen kylmä.

Faktat: hyperaridi ilmasto, vuosisade tyypillisesti alle 50 mm (*Rub' al
Khali*); ilmankosteus n. 52 % tammikuussa, n. 15 % kesä-heinäkuussa (*Rub'
al Khali*); Shaybahissa lämpötila talviöistä (n. 10 °C) kesäpäiviin (n. 50
°C) (*Shaybah Field*). Ei kuukausikohtaisia lämpötila-/sadelukuja — ne
haetaan erikseen `tools/hae-saanormaalit.mjs`:llä.

---

## 4. Säätiedot: mittauspisteehdotus

**Ehdotus: 20,0° N, 50,0° E** — ei mikään asutus tai öljykenttä, vaan piste
joka on kirjaimellisesti Wikipedian oma koordinaatti koko Rub al-Khalille
(infobox: "20°N 50°E"). Perustelu: piste osuu hiekkameren SISÄOSAAN, kaukana
Liwan keitaasta ja Shaybahin öljykentästä pohjoisessa ja Umm al-Samimista
idässä — se siis edustaa "keskeltä autiomaata" -pyyntöä paremmin kuin mikään
nimetty paikka, koska nimetyt paikat (Liwa, Shaybah, Sanaw) ovat kaikki
aavikon REUNOILLA. Koordinaatti on myös pituus-/leveyspiiriltään suunnilleen
aavikon pitkittäissuunnan keskikohdassa (pituuspiirit 44,5°–56,5° E,
leveyspiirit 16,5°–23,0° N Wikipedian mukaan).

**Korkeus — EI VARMAA LUKUA.** Wikipedia antaa vain koko aavikon
yleisgradientin: "pinnan korkeus vaihtelee noin 800 metristä lounaassa lähes
merenpinnan tasoon koillisessa" (*Rub' al Khali*). Koordinaatille 20°N/50°E ei
löytynyt tarkkaa korkeuslukua Wikipediasta. Karkea arvio gradientin perusteella
olisi luokkaa 300–500 m, mutta tämä ON PELKKÄ PÄÄTELMÄ eikä lähteestä suoraan
luettu luku — se pitää tarkistaa oikealla korkeusmallilla (esim. Open-Meteon
oma elevation-kenttä hakee sen automaattisesti annetuista koordinaateista)
ennen kuin lukua kirjataan peliin todellisena arvona.

**Vuodenkierto sanallisesti** (ei kuukausilukuja, kuten pyydetty):
Rub al-Khali on äärimmäisen kuiva ympäri vuoden, ja sade on harvinaista ja
epäsäännöllistä. Talvi on selvästi leudompi, ja yöt voivat olla viileitä tai
kylmiä; kesä on äärimmäisen kuuma sekä päivällä että usein myös yöllä.
Ilmankosteus on Wikipedian mukaan korkeimmillaan tammikuussa ja
alimmillaan kesä-heinäkuussa. Talvikuukaudet ovat siksi selvästi
suositeltavin matka-aika — kesällä päivälämpötilat nousevat äärimmäisiksi.

---

## 5. Kuva-aiheet (sanoin, ei tiedostonimiä)

Kaikki rajattava maisemaan/luontoon/esineisiin. HUOM. autiomaakuvissa on usein
kameliajajia tai muita ihmisiä — ne on aina rajattava pois kuvasta tai
valittava kuva jossa niitä ei alun perinkään näy.

**3 avauskuvaa (leveitä maisemia):**
1. Loputon dyynimeri auringonlaskussa tai -nousussa, punaisenoranssit dyynit
   aaltoilevat horisonttiin asti, ei ihmishahmoja.
2. Laaja näkymä dyyniharjanteista, joissa pitkät varjot korostavat
   tuulikuvioita ja dyynien muotoa — hiekan tekstuuri lähikuvasta laajaan
   näkymään.
3. Panoraama, jossa hiekkameri kohtaa sora- tai kipsitasangon tai
   suolakosteikon reunan — kalpea, kova pinta dyyniseinämää vasten.

**3 kansikuvaa (kaupunkisivun kansi, tyyliltään kuten Kreetan
Chania/Knossos/Elafonisi-kolmikko):**
1. Lähikuva dyynin harjasta hienoine hiekkarippeineen ja tuulen
   kuljettamine hiekkajuovineen — tekstuuri-/geologiakuva.
2. Keidasnäkymä: vihreä palmulehto korkeiden dyynien juurella, kontrasti
   vehreän ja hiekan välillä (ei ihmisiä, palmut/rakennukset sallittu).
3. Yksittäinen, dramaattisen korkea dyyni voimakkaassa valossa ja varjossa,
   tyhjä ilman ihmisiä tai ajoneuvoja.

**8 nosto-/jaksokuvaa:**
1. Lähikuva punaisenoranssista hiekasta/hiekanjyvistä tai terävästä
   dyyninharjasta (nosto 1, geologia).
2. Kuivunut järvenpohja tai kerrostuma-altaan poikkileikkaus, halkeillut
   savipinta (nosto 2, muinaiset järvet).
3. Arabianoryksi avoimella hiekka-/pensasaavikolla, tai yksinäinen
   dromedaari ilman ohjaajaa (nosto 3, eläimistö).
4. Öljyputkisto tai -laitos etäältä kuvattuna dyynien keskellä, ei
   työntekijöitä näkyvissä (nosto 4 / jakso "käännekohta", öljy).
5. Autiomaan raunio: matalia muurinjäänteitä tai tornin perustuksia
   hiekan keskellä (nosto 5, Ubar/Iram-legenda ja Shisr).
6. Tummaa lasimaista kivimateriaalia (impaktiittia) hiekalla tai
   kraatterin reunaa autiomaassa (nosto 6, Wabarin meteoriitti).
7. Vanha kivikehäinen aavikkokaivo tai vesipaikka ilman ihmisiä (nosto 7,
   tutkimusmatkailijoiden reitit/vesipaikat).
8. Valtava dyyni kohoaa pienen keidaskylän kattojen yllä, tai
   maastoajoneuvon jäljet hiekassa ilman kulkijoita (jakso "alueen
   rakenne", Liwa/Moreeb-dyyni).

---

## 6. Ristiriidat, epävarmuudet ja ei-Wikipedia-lähteet

**A. Pinta-ala — pieni epätarkkuus.** Infobox antaa 650 010 km², leipäteksti
"650,000 km²" (pyöristetty). Ei todellinen ristiriita, mutta huomioitava ettei
650 010 ole "tarkka" luku sekään — kyseessä on yleisesti käytetty pyöristys.

**B. Dyynien korkeus — TODELLINEN RISTIRIITA, kuten pyydettiin varoa.**
Pääartikkeli *Rub' al Khali* sanoo dyynien nousevan "jopa 250 metriin".
Erillinen artikkeli *Liwa Oasis* (joka sijaitsee "aavikon pohjoisreunalla")
sanoo Moreeb-dyynin olevan 300 metriä korkea ja "yksi maailman suurimmista
dyyneistä". En löytänyt Wikipediasta selitystä ristiriidalle (esim. onko
Moreeb-dyyni teknisesti aavikon reunalla eikä "varsinaisessa" ergissä).
Käytin molempia lukuja rinnakkain (nosto 1: 250 m; jakso "Alueen rakenne":
Moreeb 300 m) — kirjoittajan kannattaa joko selittää ero tekstissä tai valita
vain toinen luku.

**C. Shaybahin kentän löytövuosi — TODELLINEN RISTIRIITA kahden
Wikipedia-artikkelin välillä.** Pääartikkeli *Rub' al Khali* sanoo suoraan:
"The Shaybah oil field was discovered in 1968." Erillinen artikkeli *Shaybah
Field* sanoo kentän LÖYDETYN JA OTETUN TUOTANTOON vuonna 1998. Nämä eivät voi
molemmat pitää paikkaansa samasta tapahtumasta. Jätin löytövuoden pois
nosto 4:n tekstistä juuri tästä syystä — ennen julkaisua joku (mieluiten
Opus/Fable) tarkistaa kumpi on oikea, tai mainitseeko toinen artikkeli
esim. alustavan löydön vs. varsinaisen tuotantoon oton eri vuosina.

**D. Wabarin meteoriitin paino — kolmas ristiriitainen luku, JA PÄÄLLEKKÄISYYS
JO PELISSÄ OLEVAN SISÄLLÖN KANSSA.** `js/packs/nahtavyysjutut.js` (Riadin
kansallismuseon nosto) mainitsee jo meteoriitin painoksi "2,2 tonnia"
(nimeämätön lähde tekstissä) ja museon oman kyltin lukemana "2,75". Wikipedian
*Wabar craters* -artikkeli antaa KOLMANNEN luvun: suurin talteen otettu
kappale ("Camel's Hump") painaa 2045 kg (2,045 t), ja koko alkuperäisen kappaleen
arvioidaan painaneen yli 3500 tonnia ennen ilmakehässä hajoamista. En osaa
sanoa, ovatko 2,2/2,75 tonnia ja 2,045 tonnia sama kappale eri
pyöristyksin vai kaksi eri kappaletta — Wikipedian artikkeli ei mainitse
museonäyttelyn lukuja. Käytin nosto 6:ssa vain Wikipedia-lukua (2045 kg).
Koska Riadin lehti käsittelee samaa meteoriittia jo museonäkökulmasta, tämä on
myös harkinnan paikka kaupunkilehti.md:n "sama tarina ei saa toistua" -säännön
kannalta — suosittelen pitämään molemmat (eri kulma: löytötarina autiomaassa
vs. museonäyttely), mutta Fablen/Opuksen kannattaa päättää tietoisesti eikä
vahingossa.

**E. Wabar-kraatterin ikä — ristiriita on Wikipedian SISÄLLÄ selitetty, ei
piilotettu.** Fissioraidoitusmenetelmä antaa n. 6400±2500 vuotta,
termoluminesenssi alle 250 vuotta (mahdollisesti 1863 tai 1891 nähty
tulipallo Riadin yllä). Kirjasin molemmat nosto 6:een avoimesti "lähteet ovat
erimielisiä" -muodossa — tätä ei tarvitse korjata, kunhan teksti säilyy näin.

**F. Ubar=Iram=Shisr-samaistus — Wikipedia on VARSIN VARAUKSELLINEN, toisin
kuin suosittu tarina antaa ymmärtää.** Artikkeli *Iram of the Pillars* sanoo
nimenomaisesti, ettei Nicholas Clappin 1998 hypoteesi ole tutkijoiden
yleisesti hyväksymä ja että Clapp itse kumosi sen myöhemmin, ja että
todennäköisin ehdokas Iramin sijainniksi on itse asiassa Wadi Ramm
JORDANIASSA — siis kokonaan Rub al-Khalin ulkopuolella. Kirjoitin tämän
suoraan nosto 5:een, koska se on tärkeä osa tarinaa ("legenda kuin legenda,
ei todistettu fakta"), mutta huomauttakoon vielä kerran: JOS peliin joskus
kirjoitetaan Ubar "faktana" sijoitettuna Rub al-Khaliin, se ei olisi
Wikipedian tukema väite.

**G. Shisrin (Archaeological site of Shisr) ajoitus — SUURI RISTIRIITA
Wikipedian ja EI-WIKIPEDIA-LÄHTEIDEN välillä, merkittävä varoitus.** Tein
alkuun yleisen web-haun ("Ubar Iram lost city wikipedia Shisr Oman"), joka
palautti EI-WIKIPEDIA-lähteitä (madainproject.com, Oman Observer, matkablogeja).
Nämä väittivät: kaupunki syntyi pronssikaudella n. 2800 eaa., asuttu n.
3000 eaa. – 300/500 jaa., ja se LÖYDETTIIN 1992 satelliittikuvien avulla
Nicholas Clappin johdolla, kaivauksissa paljastui linnoitus 8 seinällä ja
30 jalan vartiotorneilla. KUN HAIN VARSINAISEN WIKIPEDIA-ARTIKKELIN
(*Archaeological site of Shisr*), se antoi TÄYSIN ERI TIEDOT: paikka
rakennettu 400-luvulla, hylätty 1400–1500-luvuilla, Unesco-kohde "Land of
Frankincense" vuodesta 2000 — EIKÄ mainitse Clappia, satelliittikuvia, 1992
löytövuotta, pronssikautta EIKÄ kaivauslöytöjä (linnoitus/tornit) LAINKAAN.
Käytin jakso 4:ssä ja tarvittaessa muualla VAIN Wikipedia-artikkelin lukuja
(400-luku / 1400–1500-luku / Unesco 2000). Kaikki muu ylempänä mainittu
(pronssikausi, 1992, Clapp/satelliitti, linnoitusmitat) EI OLE
Wikipedia-lähteistä eikä sitä pidä käyttää faktana pelissä ilman erillistä
tarkistusta oikeasta Wikipedia-artikkelista tai muusta luotettavasta
lähteestä.

**H. "Arabianoryksi" — suomenkielinen laji-/käsitenimi ei ole vahvistettu.**
Käytin nostoissa termiä "arabianoryksi" Oryx leucoryx -lajista, mutta en
tarkistanut tätä virallisesta suomenkielisestä lähteestä (esim. Luonnontieteellinen
keskusmuseo). Kirjoittajan kannattaa varmistaa vakiintunut suomenkielinen nimi
ennen julkaisua.

**I. Päällekkäisyydet pelin MUUN sisällön kanssa (ei tässä lehdessä, mutta
huomioitava kokonaisuutena).**
- Aarrejahdin kohtaaminen (`js/tyohuone-kehitys-data.js`, id `rubalkhali`)
  käyttää jo faktoja: hiekan "laulaminen" dyynin valuessa, nimen "Rub
  al-Khali" merkitys ("tyhjä neljännes"), ja kaivonkaivajien "maan
  lukemisen" taito. En käyttänyt näitä uudelleen nostoissa — johdannoissa
  viittaan hiekan lauluun vain kevyesti tunnelman vuoksi (Kreetan/Sisilian
  tapaan johdanto saa olla tunnelmallinen, ei faktapohjainen sellaisenaan).
- `middleeast-questions.js` sisältää jo yksinkertaisen visan, jossa mainitaan
  "dyynit yli 200 metriin" (yhteensopiva nosto 1:n 250 m -luvun kanssa) ja
  "ensimmäiset tunnetut eurooppalaiset ylittivät 1930-luvulla
  kamelikaravaanilla" — tämä on lyhyt yleistys samasta asiasta kuin nostot
  7–8 (Thomas/Thesiger), mutta nostot menevät paljon syvemmälle (päivämäärät,
  reitit, oppaat, kirjat), joten en pidä tätä ongelmallisena toistona.
- `js/packs/asia-valokuvat.js`:ssä on jo rekisteröityjä Rub al-Khali -kuvia
  (mm. "Sanaw well.jpg" Thesigeriltä 1946, dyynikuvia, kamelinjälkikuva) —
  näitä EI pidä käyttää uudelleen lehden nostoissa/kansikuvissa (kuvan saa
  esiintyä kaupungissa vain kerran -sääntö); uudet kuvat pitää hakea erikseen.

**J. Väestö/heimot-lause nostossa 1.** Kirjoitin nostoon 1 vain maalistan
("neljän maan alueelle"), en heimojen aluejakoa (Al Murrah, Banu Yam/Hamdan,
Bani Yas) — ne mainitaan Wikipediassa (*Rub' al Khali*) mutta siirsin
Al Murrahin yksityiskohdat jakso 3:een duplikaatin välttämiseksi; Banu
Yam/Hamdan ja Bani Yas jäivät kokonaan käyttämättä — vapaasti käytettävissä
lisänostoihin tulevaisuudessa.
