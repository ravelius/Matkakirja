# Ihmisen matka värivirtoina — moduulisuunnitelma

*(Moduuli: Ihmisen matka -linssi (js/linssit/ihmisen-matka.js,
aineisto js/linssit/ihmisen-matka-data.js) aikajanamoottorilla
(js/aikajana.js). Linjaukset: Raamattu › "IHMISEN MATKA ON
VARIVIRTOJA, EI PISTEITA" (omistaja 6.9.2026), "AIKAJANAN AJO: KAMERA
LAHEMPANA…", "KAIKKI LIIKE ANIMOIDAAN PEHMEASTI", Karttalinssit. Tämä
dokumentti kertoo MITEN — ristiriidassa Raamattu voittaa. Laatija
Fablemax 6.9.2026. SUUNNITELMA, EI TOTEUTUS: omistaja muutti tilauksen
kesken työn ("Suunnitellaan yhdessä ennen toteutusta"), joten
pelikoodia ei ole muutettu. Luvun 7 luvut on mitattu scratchpad-
laskukokeella (ei repossa), joka ajaa saman mallin Nodessa.)*

## 0. Omistajan linjaus 6.9.2026, sanatarkasti

> "linssi toimii periaatetasolla väärin. Siinä pitäisi näkyä hitaasti
> kartalla lisääntyvä värillinen alue joka laajenee mantereita pitkin
> uusille alueille. Ei tarvitse olla Tumma kartta. Idea siitä että
> ihmiset levisivät Afrikasta Aasiaan ja sitten ylittivät meren
> Alaskaan jäätä pitkin ja jatkoivat sieltä amerikkoihin pitäisi kuvata
> yhdellä värillä. Mitä muita reittejä on? Ne voisi kuvata sitten vielä
> omalla värillään. Mieti uudestaan koko toteutus. Se että Amerikkaan
> jää eri populaatio joka eriytyy voisi ilmaista omalla muuttuvalla
> värillään. Eli kartalle pitäiskö animoida näitä muuttuvia
> värivirtoja. Ja voidaan yksinkertaistaa asioita jos se auttaa
> havainnoinnissa ja korjata sitten tekstissä lisä selityksillä. Onko
> tähän jotakin valmista koodia mitä voisi hyödyntää? Kuvia voisi
> poksahdella kartalle vuosien kuluessa mutta kamera voisi liikkua
> jonkun päävirran mukana kun ihmiset leviävät uudelle alueella."

Kysymyskortin vastaukset: *Suunnitelma + prototyyppi* ja *Neljä
virtaa*. Myöhemmin samana päivänä: *"Suunnitellaan yhdessä ennen
toteutusta"* — siksi tämä dokumentti on ensin, ja luku 10 on sen
tärkein osa.

## 1. Konsepti yhdellä sivulla

Kartalle ei enää sytytetä valoja yksi kerrallaan. Sen sijaan **maa
värjäytyy**: väri lähtee Afrikasta 300 000 vuotta sitten ja leviää
hitaasti mantereita pitkin — Arabiaan, Intian rannikolle,
Kaakkois-Aasiaan, saarihypyin Australiaan; myöhemmin Eurooppaan,
Siperiaan, jäätä pitkin Alaskaan ja koko Amerikkoihin, viimeiseksi
kanooteilla Tyynenmeren saarille ja Madagaskariin. Kello (vuosia
sitten) juoksee kuten nyt, ja jokainen ruutu kartalla värjäytyy sinä
hetkenä, jona ihmiset laskennallisesti saapuivat sinne.

**Neljä virtaa, neljä väriä.** Päävirta (Afrikka → Aasia → Australia)
on yksi väri, kuten omistaja pyysi. Eurooppa saa oman värin, koska se
asutettiin erillisenä haarana Levantista noin 45 000 vuotta sitten.
Amerikat saavat värin, joka alkaa päävirran sävynä Beringiassa ja
**liukuu omakseen** matkan edetessä etelään — se on omistajan pyytämä
"eriytyvä populaatio". Tyynimeri on **merivirta**: nauha, joka kulkee
saarelta saarelle Taiwanilta Polynesiaan, Havaijille, Uuteen-Seelantiin
ja Madagaskariin.

**Rintama kirkas, vanha alue haalea.** Viimeksi värjäytynyt alue
(noin viimeiset kymmenesosa kellon lukemasta — 30 000 vuoden kohdalla
3 000 vuotta) hehkuu kirkkaana ja kyllästettynä; sitä vanhempi alue
haalistuu vaaleaksi sävyksi mutta ei katoa. Silmä löytää rintaman heti,
ja koko siihenastinen matka näkyy taustalla.

**Ei tummaa karttaa.** Pallo on tavallinen vaalea pallo; virrat ovat
sen pinnalla puoliläpinäkyvä kalvo. Keksintölinssi pitää oman
tummennuksensa — tämä on kaaren valinta, ei moottorin muutos.

**Kamera seuraa virtaa.** Kamera ei enää hyppää pysäkiltä pysäkille
vaan liukuu pehmeästi sen virran rintaman painopisteeseen, joka juuri
nyt leviää eniten, sellaisella korkeudella että rintama ja tuore alue
näkyvät (mantereen mitta, ei koko pallo).

**Kuvat poksahtavat.** Nykyiset 20 pysäkkiä jäävät: kun kello ehtii
pysäkin hetkeen, sen kuva ilmestyy kartalle pysäkin kohdalle pienenä
kehyksenä, karuselli ja havainnepaneeli toimivat kuten nyt, selostaja
lukee. Jos pysäkki on ruudun ulkopuolella, reunassa on pieni nuoli —
kamera ei lähde sen perään.

**Mikä ei muutu:** kello, avausjakso, välinäytökset, karuselli,
paneeli, musiikki, luennat, Tiedeliite. Kaikki tulee moottorista
sellaisenaan.

## 2. Neljä virtaa

Ajat ovat *vuosia sitten* (ka = tuhatta vuotta). Sarake "malli"
kertoo, mitä laskukoe antaa, kun virran pisteet, nopeudet, portit ja
ylitykset ovat luvun 2.1–3 mukaiset — ei sitä, mitä tutkimus tarkalleen
sanoo. Lähteet ovat en-Wikipedian artikkeleita, joiden ajoitushaarukat
on kirjattu pysäkkidataan jo 5.9.2026 (js/linssit/ihmisen-matka-data.js);
tämä taulukko ei tuo uusia väitteitä vaan mallintaa ne alueiksi.

| Virta | Reitti | Lähtö → saapuminen (lähde) | Malli (koe) | Väri | Sävyn muutos |
| --- | --- | --- | --- | --- | --- |
| **a. Päävirta** | Marokko/Etiopia → koko Afrikka → Siinai ja Bab-el-Mandeb → Arabia → Intian rannikko → Sunda → Wallacea → Sahul; myöhemmin Itä-Aasia, Japani, Siperia | Jebel Irhoud 300 ka, Omo 233 ka, Pinnacle Point 164 ka (*Early human migrations*); Skhul/Qafzeh 120–90 ka, Al Wusta 95–86 ka (varhaiset retket); Bab-el-Mandeb n. 70–60 ka, Sumatra 73–63 ka, Sahul 65–50 ka (*Southern Dispersal*); Tianyuan 42–39 ka, Japani n. 38 ka, Yana 32 ka | Levantti 122 ka, Arabia 89 ka, Intia 75 ka, Sumatra 73 ka, Australia 65 ka, Tianyuan 43 ka, Korea 42 ka, Honshu 38 ka, Yana 31 ka | Meripihka/oranssi, kirkas #EB7618, vaalea #F7CC9C | Ei |
| **b. Eurooppa** | Balkan → Keski-Eurooppa → Iberia ja Britannia (Doggerland maata) → jään vetäydyttyä Fennoskandia → Islanti viikinkiaikana | Bacho Kiro 46–43 ka (*Early human migrations*), Aurignacian Ranskassa n. 42 ka, Britannia 44–40 ka, Fennoskandia n. 11 ka, Islanti 1,15 ka (*Settlement of Iceland*) | Bacho Kiro 45 ka, Chauvet 43 ka, Lissabon 41 ka, Britannia 42 ka, Lappi 10 ka, Islanti 1,1 ka | Sininen, kirkas #2C6CE0, vaalea #B0C8F0 | Ei |
| **c. Amerikat** | Tšuktšien niemimaa (Beringian tauko) → Beringinsalmi → Alaska → rannikkoa etelään → koko Amerikat; Kuuba; Grönlanti | Beringian tauko n. 24–16 ka, Alaska n. 16 ka, Monte Verde 14,5 ka, Clovis 13 ka (*Peopling of the Americas*); Karibia n. 6 ka; Grönlanti 4,5 ka | Alaska 16 ka, White Sands 15 ka (kuva 22 ka — ks. 4), Meksiko 15 ka, Monte Verde 13,9 ka, Kuuba 6,1 ka, Grönlanti 3,8 ka | Alkaa päävirran meripihkana, liukuu turkoosiin/vihreään (kirkas #189E7A, vaalea #A6DCCA) | **Kyllä:** sävy liukuu saapumisajan mukaan 17 ka → 11 ka |
| **d. Tyynimeri** | Taiwan → Filippiinit → Sulawesi/Halmahera → Bismarck → Salomonit → Vanuatu → Fidži → Tonga → Samoa; tauko; Cookinsaaret → Tahiti → Marquesas → Havaiji, Rapa Nui, Aotearoa; sivuhaara Borneo → Madagaskar; Mikronesia (Guam) | Taiwan 5,5 ka, Filippiinit 4,3 ka, Lapita Bismarckista 3,4 ka Tongaan 2,85 ka (*Austronesian peoples*, *Lapita culture*); Itä-Polynesia 1,1–0,95 ka, Havaiji n. 1,0–0,85 ka, Rapa Nui n. 0,8 ka, Uusi-Seelanti 0,75 ka (*Polynesians*); Madagaskar n. 1,5 ka (*Madagascar*); Guam 3,5 ka | Nauhan ajat sellaisinaan; Wairau Bar 0,63 ka | Ruusu/magenta, kirkas #D63A94, vaalea #F0B8D6 | Ei |

Sävyt ovat ehdotus (avoin kysymys 10.1). Nelijako on omistajan valinta
kysymyskortista; luku 4 kertoo, mitä sen ulkopuolelle jää.

### 2.1 Virran aineisto (js/linssit/ihmisen-matka-virrat.js, ehdotus)

Jokaisella virralla on:

- `tunnus`, `nimi`, `vari` (`kirkas`, `vaalea`, valinnainen `liuku`
  = sävyliu'un lähtövärit ja aikaväli `alkaen → valmis`).
- `nopeus` km/vuosi — luku tai taulu `[[vuosiaSitten, km/v], …]`,
  jolloin nopeus vaihtuu ajan mukaan. Päävirta: 0,05 km/v Afrikan
  sisäinen leviäminen (koko Afrikka noin 150 ka mennessä), 2,0 km/v
  rannikkosprintti 90 ka:sta, 0,9 km/v manner-Aasiassa 50 ka:sta.
  Eurooppa 1,2; Amerikat 8 (rannikkoreitti Alaskasta Chileen
  kahdessa tuhannessa vuodessa); Tyynimeri 3 saarilla.
- `sisamaa` — sisämaan kerroin rannikkoon nähden (0,3–0,6):
  rannikkoruutu on maaruutu, jolla on merinaapuri. Tämä yksi luku
  antaa "rannikkoreitin" ilman jokia tai maastoa.
- `alue` / `pois` — laatikot, joihin virta saa levitä (Eurooppa:
  35°N:stä pohjoiseen 26°E:hen asti, 42°N:stä pohjoiseen 60°E:hen;
  Amerikat: 180°W–30°W; Tyynimeri: 118°E–100°W + Intian valtameren
  kaista Madagaskariin). Päävirta saa kaiken muun. Ruudun väri on
  aina *ensin saapuneen* virran väri, joten alueet eivät leikkaa
  toisiaan kuin reunoilta.
- `pisteet` — lähteet: paikka, aika (esim. Jebel Irhoud 300 ka).
- `nauhat` — reitit meren yli: pisteet `[lat, lon, aika]` ja
  `sade` km. Nauhan sisään jäävät ruudut saavat ajan suoraan
  reitiltä; meriruudut piirretään hennosti, maaruudut jatkavat
  leviämistä. Tyynimeri on kokonaan nauhoja; päävirralla on yksi
  nauha Bali → Flores → Timor → Kimberley (Wallacea → Sahul).

## 3. Ylitykset, portit ja estot

**Ylitykset** ovat nimettyjä särmiä meren yli: ruudusta a ruutuun b,
aikaikkuna `[avautuu, sulkeutuu]` ja `kesto` vuosina. Rintama, joka
ehtii a:han ennen ikkunaa, odottaa; ikkunan jälkeen ylitys on kiinni.

| Ylitys | a → b | Ikkuna | Kesto | Virta | Peruste |
| --- | --- | --- | --- | --- | --- |
| Bab-el-Mandeb | Djibouti → Jemenin Tihama | 80–55 ka | 500 v | a | Southern Dispersal; salmi 26 km, matala meri jääkaudella |
| Borneo (Sunda) | Malakka → Länsi-Borneo | 80–12 ka | 300 v | a | Sundan jalusta oli maata; Niah 40 ka |
| Sulawesi | Itä-Borneo → Sulawesi | 60–40 ka | 500 v | a | Makassarinsalmi, Wallacean raja |
| Wallacea → Sahul | nauha Bali → Flores → Timor → Kimberley | 67–65 ka | — | a | Madjedbebe 65–50 ka; nauha eikä ylitys, jotta saarihypyt näkyvät |
| Torres | Cape York → Uusi-Guinea | 60–8 ka | 300 v | a | Sahul oli yksi manner |
| Tasmania | Victoria → Tasmania | 40–12 ka | 500 v | a | Bassinsalmi maata jääkaudella |
| Japani | Korea → Kyushu; Sahalin → Hokkaido | 40–15 ka; 30–12 ka | 500; 300 v | a | Japani n. 38 ka |
| Taiwan | Fujian → Taiwan | 30–12 ka | 300 v | a | Paleoliittinen asutus maasillan kautta |
| **Beringia** | Tšuktšit → Sewardin niemimaa | 16,5–11 ka | 300 v | c | Peopling of the Americas: tauko Beringiassa, Alaska n. 16 ka |
| Kuuba | Yucatán → Kuuba | 6,5–3 ka | 300 v | c | Karibian asutus |
| Islanti | Norja → Islanti | 1,15–1,0 ka | 50 v | b | Settlement of Iceland |

**Portit** ovat alueita, jotka avautuvat vasta annettuna aikana:
rintama pysähtyy reunalle ja jatkaa, kun alue aukeaa. Niillä
mallinnetaan jääpeite ja se kronologia, jota nopeus ei tavoita.

| Portti | Alue | Avautuu | Peruste |
| --- | --- | --- | --- |
| Levantti ja Arabia | 12–36°N, 32–48°E | 130 ka | Skhul/Qafzeh 120–90 ka |
| Aasia (rannikkoreitti) | 48°E:stä itään | 78 ka | onnistunut Afrikasta-lähtö n. 70 ka |
| Anatolia ja Kaukasus | 36–45°N, 25–48°E | 48 ka | Üçağızlı n. 43 ka |
| Pohjoinen Itä-Aasia | 28–55°N, 95–150°E | 45 ka | Tianyuan 42–39 ka |
| Siperia / arktinen Siperia | 50°N / 62°N pohjoiseen | 50 ka / 35 ka | Denisova n. 50 ka, Yana 32 ka |
| Fennoskandia, Pohjois-Venäjä, Pohjois-Britannia, Irlanti | jään peittämät alueet | 11–12 ka / 10 ka | Jääkauden loppu |
| Kordilleran rannikko, Laurentide, Keskilänsi | 48–62°N rannikko; 47°N:stä pohjoiseen; jään eteläreuna | 16 ka; 13 ka; 14 ka | Rannikkoreitti auki n. 16 ka, jäätön käytävä n. 13 ka |
| Arktinen Kanada, Grönlanti | 62°N:stä pohjoiseen | 4,5 ka | Paleoeskimot, Saqqaq |

**Estot** ovat ruutuja, jotka pakotetaan mereksi, koska 0,5°:n
ruudukko siltaisi salmen, jota ihmiset eivät ylittäneet: Gibraltar
(muuten Marokon väri valuisi Iberiaan 250 ka) ja Bab-el-Mandeb (jotta
ylitys tapahtuu ikkunassa eikä 200 ka). Beringinsalmi on luonnostaan
neljän ruudun levyinen.

## 4. Yksinkertaistukset ja "tekstissä täsmennettävää"

Omistaja: *"voidaan yksinkertaistaa asioita jos se auttaa
havainnoinnissa ja korjata sitten tekstissä lisä selityksillä."*
Nämä ovat tietoisia oikaisuja, jotka pysäkkien tekstit tai loppusanat
saavat täsmentää:

1. **Varhaiset retket Levanttiin ja Arabiaan (Skhul/Qafzeh, Al
   Wusta) näytetään osana päävirtaa, vaikka ne sammuivat.** Väri ei
   katoa kartalta; teksti sanoo, että nämä ryhmät eivät jättäneet
   jälkeläisiä ja Afrikasta lähdettiin uudelleen 70 ka.
2. **Neandertalilaiset ja denisovalaiset eivät näy.** Kartta
   näyttää vain Homo sapiensin. Denisovan pysäkki kertoo kohtaamisesta
   tekstissä (avoin kysymys 10.7: oma haalea harmaa "vanhan väestön"
   alue Euraasiassa, joka väistyy värin tieltä?).
3. **Blombos (75 ka), Chauvet (36 ka), Lake Mungo (42 ka), Niah (40
   ka) ovat kulttuuripysäkkejä, eivät ensisaapumisia** — väri on
   siellä jo kauan ennen kuvaa (mallissa 87 000, 7 000, 19 000 ja
   32 000 vuotta ennen). Kuvateksti sanoo "täällä asuttiin jo".
4. **White Sands 22 ka on kiistelty, ja väri saapuu vasta 15 ka.**
   Kuva poksahtaa tyhjälle mantereelle 7 000 vuotta ennen väriä. Se on
   rehellinen kuva kiistasta, mutta vaatii lauseen tekstiin (avoin
   kysymys 10.8).
5. **Beringia-pysäkki (20 ka) on salmen keskellä, väri ylittää salmen
   16,5 ka.** Teksti: Beringiassa asuttiin tuhansia vuosia ennen kuin
   jää päästi Alaskasta etelään.
6. **Filippiinit, Taiwanin sisämaa ja Andamaanit:** paleoliittinen
   asutus (Tabon 47 ka, Callao 67 ka) jää pois; kartalla Filippiinit
   värjäytyvät vasta austronesialaisen nauhan mukana 4 ka. Taiwan saa
   päävirran värin 30 ka maasillan kautta.
7. **Australia täyttyy 5 000 vuodessa** (Mungo 61 ka mallissa vs.
   42 ka kuvassa); tutkimus antaa 50–40 ka mantereen sisäosille.
   Hyväksytään havainnollisuuden vuoksi.
8. **Intia 75 ka** on "varhaisen lähdön" tulkinta; osa tutkijoista
   sanoo 60–50 ka. Pysäkkejä Intiassa ei ole, joten kiista jää
   tekstin ulkopuolelle.
9. **Jääpeitteet ja portit ovat laatikoita**, eivät jään todellisia
   reunoja. Ne näkyvät suorina viivoina (koe, luku 7.3) — toteutuksen
   pitää pehmentää ne (polygonit tai satunnaistettu reuna).
10. **Sahul, Sunda, Doggerland**: jääkauden matalampi meri
    mallinnetaan ylityksinä ja nauhoina, ei muuttuvana rantaviivana.
    Ruudukko on nykyinen rantaviiva koko ajan.
11. **Meri ei värjäydy paitsi Tyynenmeren nauhoissa** (ja
    Madagaskarin kaistassa): merivirta on nauha, ei alue — valtameri
    ei muutu vaaleanpunaiseksi.
12. **Grönlanti** on maskissa kiinni Kanadassa (Naresin salmi
    siltautuu); portti 4,5 ka pitää ajoituksen. Etelämanner ja 76°N:n
    pohjoispuoli puuttuvat, koska lauta loppuu siihen (js/packs/
    maailmankartta.js Miller 76°N…58°S) — Svalbard ja Pohjois-
    Grönlanti eivät ole tarinassa.
13. **Vanhan maailman "sisäinen" liike** (esim. bantujen leviäminen,
    indoeurooppalaiset, Australian sisämaa) ei näy: väri on
    ensisaapuminen, ei väestöhistoria.

## 5. Laskenta ja piirto

### 5.1 Ruudukko ja maamaski

Maa jaetaan 0,5° ruudukkoon (720 × 360 = 259 200 ruutua), rivi 0
pohjoisin, sarake 0 = 180°W — sama järjestys kuin tasavälisessä
pallotekstuurissa, joten sama puskuri kelpaa suoraan pallon
kalvoksi. Maamaski generoidaan **pelin omasta datasta** työkalulla
`tools/tee-maamaski.mjs`: js/packs/maailmankartta.js OUTLINES ja
COUNTRY_SHAPES-renkaat rasteroidaan laudan Milleristä
(js/fokusmitat.js projisoiLaudalle) skannausviivalla, 3 × 3
alinäytettä per ruutu, ruutu on maata kun ≥ 2/9 osuu. Työkalu lisää
käsin Tyynenmeren saaret pisteinä (Tonga, Samoa, Cookinsaaret, Tahiti,
Marquesas, Mangareva, Rapa Nui, Havaiji 4 ruutua, Guam, Palau,
Uusi-Kaledonia, Vanuatu, Tuvalu, Tarawa, Chuuk, Pohnpei, Andamaanit,
Färsaaret) ja estot (luku 3). Se tulostaa komponentit ja
tarkistuspisteet, jotta jokainen salmi on todennettu: kokeessa
Afrikka–Euraasia–Britannia–Sunda on yksi komponentti, Amerikat +
Grönlanti toinen, Australia, Japani, Borneo, Sulawesi, Flores, Timor,
Tasmania, Uusi-Guinea, Islanti, Kuuba, Madagaskar ja saaret
erillisiä — juuri ne, joille ylitykset ja nauhat on kirjoitettu.

Maski talletetaan `js/linssit/ihmisen-matka-maamaski.js`:ään
rivijuoksuina (varint-tavut base64:nä): **6,2 kt** (tavoite oli
< 40 kt). Purku 9 ms. Maaruutuja 64 480 (24,9 % — ilman
Etelämannerta oikea suuruusluokka).

### 5.2 Saapumisaika

Puhdas moduuli `js/aikajana-virrat-laskenta.js` (ei DOM:ia, ei
three.js:ää; testattava Nodessa):

- `puraMaamaski`, `rannikkoMaski` (maaruutu, jolla merinaapuri).
- `laskeVirta(virta, { maa, rannikko, ruudukko, ylitykset, portit })`
  → Float32Array τ, jossa τ = −vuosiaSitten (kasvava, jotta Dijkstra
  on tavallinen). Monilähde-Dijkstra 8-naapurustossa binäärikeolla;
  kustannus = askeleen kilometrit (leveysasteen mukaan) / (nopeus
  hetkellä × sisämaakerroin). Portti: `τ = max(τ, −avautuu)`
  alueeseen tullessa. Ylitys: lähtö `max(τ, −avautuu)`, kiinni jos
  > −sulkeutuu, + kesto. Nauhat rasteroidaan janoina (etäisyys
  janaan km, aika lineaarisesti janalta, reuna 15 % myöhemmin).
- `yhdistaVirrat(kentat)` → `aika` (Float32, vuosia sitten), `virta`
  (Int8), `meri` (nauhan meriruutu) ja `jarjestys` (saavutetut ruudut
  vanhimmasta uusimpaan — piirto katkaisee silmukan siihen, mihin
  kello on ehtinyt).
- `ruudunTila(aika, nyt, meri)` → paino w (1 rintamalla, 0 vanha) ja
  peittävyys; `virranVari(vari, aika)` → kirkas/vaalea RGB (liuku);
  `rintamienPainopisteet(kentta, nyt)` → kameralle (luku 6).

Huomio toteuttajalle: keon avaimen on oltava sama Float32-pyöristetty
arvo kuin kentässä, muuten `t > tau[u]` hylkää puolet avauksista ja
leviäminen kuolee (koe löysi tämän).

### 5.3 Piirto pallolla

Canvas 720 × 360 RGBA: yksi pikseli per ruutu, alfa = peittävyys,
väri = vaalea → kirkas painon w mukaan. Se pannaan pallon pinnalle
**samalla mekanismilla kuin topografialinssin kalvo**
(js/pallolauta/linssit.js `kalvo`: mesh pinnan geometriasta säteellä
KALVON_SADE 1,0015, valaisematon MeshBasicMaterial, `depthWrite
false`, `renderOrder 1`). Ainoa laajennus: `kalvo` hyväksyy kuvan
osoitteen lisäksi **canvas-elementin** ja palauttaa kahvassa
`paivita()` (`tekstuuri.needsUpdate = true` + `lauta.heraa()`).
Näytönohjaimen bilineaarinen suodatus pehmentää ruudut itsestään;
1440 × 720 -tekstuuria ei tarvita. Napakannet ja merkit pysyvät:
merkit ovat CSS2D:tä kalvon päällä, kannet omia meshejä.

Päivitys 10–12 kertaa sekunnissa ja vain kun kello on edennyt:
silmukka kulkee `jarjestys`-listaa vanhimmasta kunnes ruudun
peittävyys on nolla, joten alkupäässä (300 ka, muutama tuhat ruutua)
työ on pienempi kuin lopussa (68 000 ruutua). Pehmeä rintama:
ruudun peittävyys nousee smoothstepillä 5 % kellon lukemasta ennen
saapumista (vähintään 300 v), rintaman kirkkaus laskee 10 %:n
matkalla (vähintään 600 v) — vakiot suhteellisia, koska kello on
logaritminen.

### 5.4 Piirto tasokartalla (?lauta=kartta)

Tasokartta on linssikartta (Miller). Sama 720 × 360 -puskuri
uudelleenprojisoidaan toiseen canvasiin laudan mitoissa (esim.
1500 × 675, rivi kerrallaan: Miller-y → lat → ruudukon rivi) ja
pannaan `<image>`-elementiksi kuten topografialinssi
(js/linssit/topografia.js). Kaksi vaihtoehtoa, joista ensimmäinen
mitataan ensin: (a) `href = canvas.toDataURL('image/png')` enintään
4 kertaa sekunnissa — yksinkertainen, mutta 1500 × 675 PNG:n koodaus
on 10–30 ms; (b) `<foreignObject>` + canvas — ei koodausta, mutta
Safarin foreignObject-viat ovat tunnetut. Suositus: prototyyppi vain
pallolla; tasokartta vaiheessa 3 (luku 8), ja jos se ei kelpaa,
tasokartalla pysyy nykyinen valolinssi (kaari valitsee `virrat` vain
pallolla). Aalto 3B sulkee vanhan kartan joka tapauksessa
(docs/moduulit/karttapallo.md luku 10).

### 5.5 Moottorin koukut (js/aikajana.js, minimissä)

Toinen agentti muokkaa samaan aikaan kameraa, reittiviivaa ja kelloa.
Siksi virrat asuvat uudessa moduulissa `js/aikajana-virrat.js`
(kalvo, kamera, kuvakehykset, nuoli) ja moottoriin tulee vain:

1. kaaren kentät `virrat` (aineisto) ja `tummennus: false`;
2. `rakennaValotPallolle`: `if (kaari.virrat) this.virrat =
   luoVirrat({ ajo: this, lauta, kaari })`; ruutukalvo
   (`linssit.kalvoRuudulle`) vain kun `tummennus !== false`;
3. `ajaPysakille`: `if (this.virrat?.ohjaaKameraa()) return
   Promise.resolve(false)` — alkunäkymä (ensimmäinen pysäkki) ja
   lopun peräytyminen jäävät moottorille;
4. `sytyta(i)`: `this.virrat?.sytyta(i, t, valo?.g)`;
5. `pura()`: `this.virrat?.pura()`.

Virtamoduulilla on oma rAF-silmukka, joka lukee kellon
`ajo.asteikko.lukema(ajo.tila.vuosi)`:sta — kehys-koukkua ei tarvita.
Avausjakson koodiin ei kosketa. tests/aikajana-pallolla.test.mjs
lukee moottoria tekstinä (`linssit.kalvoRuudulle(PALLON_OSA, {`
pallohaarassa) — rivi säilyy if-lohkon sisällä.

## 6. Kamera ja pysäkkikuvat

**Aktiivisin virta** = se, jonka rintamaruutujen (ikä 0…rintaman
leveys) paino (1 − ikä/leveys, kerrottuna cos φ) on suurin; painot
tasoitetaan liukuvalla keskiarvolla, ettei kamera vaihda virtaa
kehyksittäin. Painopiste lasketaan 3D-yksikkövektoreiden summana,
jotta Beringinsalmi (antimeridiaani) ei riko sitä; hajonta =
2·√(1 − |R̄|) asteina (tasaisen kiekon kulmasäde).

**Kohde:** lat/lng = painopiste, näkyvä leveys asteina =
clamp(2,6 × hajonta + 12°, 28°, 100°) → lautayksiköt × 33,3 → korkeus
`korkeusLeveydesta` (js/pallolauta/kamera.js, ruudun kuvasuhde,
`lauta.kamera.korkeusMin()`). Kokeessa hajonta on 6° (Alaskan
rintama 16 ka) … 30° (Keski-Aasia 45 ka, portin avautuessa) — leveys
28°…90°, ei koskaan koko pallo.

**Liike:** joka kehyksellä `pov += (kohde − pov) · (1 − e^(−dt/τ))`,
τ = 1,5 s sijainnille ja 2,5 s korkeudelle (`pallo.pointOfView(pov,
0)` + `lauta.heraa()`), pituusaste lyhintä tietä. Seuraaminen alkaa
ensimmäisen pysäkin syttyessä ja loppuu `ajo.loppu`-tilassa
(moottorin peräytyminen koko kaareen jää). Pelaajan sormi tai rulla
pallolla keskeyttää seuraamisen 8 sekunniksi (Raamattu: ele
keskeyttää), minkä jälkeen kamera liukuu takaisin. Reduced motion:
ei seuraamista, kamera jää alkunäkymään (avoin kysymys 10.10).

**Pysäkkikuvat:** `sytyta(i)`-koukussa pysäkin merkkielementtiin
(liekin kehys, CSS2D pallon pinnassa) lisätään pieni kuvakehys
(havainnekuva 64 × 44 px, paperikehys), joka "poksahtaa" esiin
(scale 0 → 1,08 → 1, 360 ms) ja kutistuu seuraavan pysäkin syttyessä
puoleen mittaansa (jää kartalle). Kuva on sama tiedosto kuin
paneelin, joten toista pyyntöä ei synny. Jos pysäkki on ruudun
ulkopuolella (`pallo.getScreenCoords` + kameran puoli), linssin
juureen tulee pieni nuoli reunalle pysäkin suuntaan; pallon
takapuolella olevalle ei näytetä mitään. Karuselli, paneeli,
selostaja ja välinäytökset toimivat kuten nyt.

**Reittiviiva** (`reitti: true`, isoympyrät pysäkiltä pysäkille)
kannattaa virtojen kanssa sammuttaa: Beringia → Monte Verde
-isoympyrä kulkisi Tyynenmeren yli värivirran vierestä. Toinen
agentti työstää samaa viivaa juuri nyt — avoin kysymys 10.6.

## 7. Suorituskyky (mitattu laskukokeella, Node 22 tällä palvelimella)

### 7.1 Laskenta linssin käynnistyessä

| Vaihe | ms |
| --- | --- |
| maskin purku + rannikkomaski | 9 |
| päävirta (alue 15, portit 29, Dijkstra 70; 34 805 ruutua) | 115 |
| Eurooppa (6 230 ruutua) | 36 |
| Amerikat (22 158 ruutua) | 48 |
| Tyynimeri (1 311 ruutua + nauhat) | 24 |
| yhdistäminen ja järjestys | 30 |
| **yhteensä** | **261** |

Tavoite oli < 150 ms iPhonella. Arvio: iPhone 12–15 on tässä
laskennassa suunnilleen tämän palvelimen luokkaa (0,3–0,5 s), eli
tavoite ei täyty sellaisenaan. Kolme keinoa, joista ensimmäinen
riittää: (1) laskenta ajetaan avausjakson mustan peitteen aikana
(≥ 3 s ennen Käynnistä-nappia) `setTimeout`-paloissa virta
kerrallaan tai Workerissa — pelaaja ei näe sitä; (2) alue- ja
porttimaskit lasketaan kerran riviväleinä eikä ruuduittain (−90 ms);
(3) varasuunnitelma: työkalu laskee kentät valmiiksi ja tallettaa
`aika` Uint16:na (vuosia sitten / 50) + `virta` rivijuoksuina —
arviolta 60–120 kt pakattuna, mikä on liikaa moduuliksi; tai
1°-ruudukko (65 ms, mutta rannikot karkeat). Suositus: (1) + (2),
ei esilaskentaa.

### 7.2 Kehyskohtainen työ

| Hetki | ruutuja esillä | piirto 720 × 360 RGBA | painopiste |
| --- | --- | --- | --- |
| 150 ka | 5 031 | 1,3 ms | 1,6 ms |
| 60 ka | 21 617 | 1,4 ms | 2,7 ms |
| 45 ka | 27 580 | 1,7 ms | 0,5 ms |
| 16 ka | 41 449 | 1,7 ms | 0,3 ms |
| 12 ka | 50 684 | 2,0 ms | 0,9 ms |
| 1 ka | 68 121 | 2,6 ms | 0,3 ms |

Kymmenen päivitystä sekunnissa on siis alle 3 % kehysajasta;
tekstuurin lataus (1 Mt RGBA) 10 kertaa sekunnissa on pallon
laattojen rinnalla pieni. Kameran easing on muutama kertolasku
kehyksessä. Riski on pikemminkin `lauta.heraa()`:n pitäminen hereillä
koko ajon ajan (laatunosto lepää vasta liikkeen loputtua, ks.
js/pallo.js asennaLaatunosto) — mitataan prototyypissä
kehysnopeus 390 × 844 -koossa (tilaus: rAF 5 s).

### 7.3 Kokeen kuvista opittua

Kuusi esikatselukuvaa (150, 60, 45, 16, 12 ja 1 ka; tasavälinen
kartta, scratchpad) näyttävät, että malli tuottaa pyydetyn
vaikutelman: 60 ka kirkas rintama Australiassa, haalea Afrikka–Aasia
takana; 16 ka Alaska kirkkaana ja rannikko valumassa etelään; 1 ka
ruusunväriset nauhat Tyynellämerellä, Madagaskarin kaista kirkkaana,
Islanti sinisenä. Kolme korjattavaa: (1) **portit näkyvät
laatikoina** — Laurentiden, Aasian 48°E:n ja Uralin 60°E:n reunat
ovat suoria viivoja; ratkaisu on porttien reunan satunnaistus
(avautumisaika ± kohina ruuduittain, reuna rosoiseksi) tai
polygonit, ja päävirran/Euroopan raja Uralin kohdalle nopeuden
hidasteena eikä seinänä; (2) **vanha alue on liian haalea** vaalealla
kartalla (peitto 0,6 vaalealla sävyllä hukkuu beigeen) — säädetään
omistajan kanssa (10.2); (3) **Amerikkojen sävyliuku RGB:ssä** kulkee
oranssista turkoosiin oliivin kautta — liuku tehdään sävykulmassa
(HSL/OKLCH) tai Amerikoille valitaan väri, jonka polku
meripihkasta on puhdas (punaviolettiin?), 10.1.

## 8. Testit (toteutusvaiheessa)

tests/aikajana-virrat.test.mjs:

1. maamaskin pakkaus ↔ purku pyöreä matka; maskin mitat 720 × 360;
   tunnetut pisteet maalla (Siinai, Panama) ja meressä (Beringinsalmi,
   Gibraltar-esto);
2. saapumisaika synteettisellä 12 × 6 -ruudukolla: meri estää,
   ylitys aikaikkunassa toimii ja ikkunan ulkopuolella ei, portti
   viivyttää, sisämaakerroin hidastaa, nauha antaa ajan janalta;
3. virtadatan eheys: pisteiden ja ylitysten päät maalla (maskin
   mukaan), nauhojen ajat laskevia, laatikot kelvollisia, värit
   0…255, liuvun `alkaen > valmis`;
4. värin funktio ajasta: rintamalla w = 1, vanhalla 0, ennen
   saapumista peitto 0, meriruudun peitto pienempi; liuku antaa
   lähtövärin `alkaen`-hetkellä ja oman värin `valmis`-hetkellä;
5. painopiste: kaksi ruutua antimeridiaanin molemmin puolin →
   painopiste 180°, ei 0°;
6. kaari pyytää `virrat` ja `tummennus: false`, moottorin koukut
   tekstitasolla (kuten tests/aikajana-pallolla.test.mjs), sw.js
   SHELL ja niputus (tests/sw.test.mjs vaatii uudet moduulit
   SHELLiin: js/aikajana-virrat.js, js/aikajana-virrat-laskenta.js,
   js/linssit/ihmisen-matka-virrat.js,
   js/linssit/ihmisen-matka-maamaski.js).

Savuke: tools/savukkeet/savuke-aikajana.mjs --lauta pallo saa
ihmisen-matka-haaran: kalvo-mesh on näyttämöllä, tekstuuri päivittyy
kellon edetessä (pikselin alfa muuttuu), kamera liikkuu ilman
pysäkkihyppyä, kuvakehys ilmestyy syttyessä. Kuvakaappaukset 390 ×
844 ja 1280 × 800 hetkiltä 150, 60, 45, 16, 12 ja 1 ka.

## 9. Vaiheistus toteutukselle

| Vaihe | Sisältö | Tuotos | Portti |
| --- | --- | --- | --- |
| **0** | Tämä suunnitelma; omistaja vastaa lukuun 10 | hyväksytty suunnitelma | omistaja |
| **1** | Työkalu `tools/tee-maamaski.mjs` + maski + laskentamoduuli + testit 1–5 | js/aikajana-virrat-laskenta.js, js/linssit/ihmisen-matka-maamaski.js, js/linssit/ihmisen-matka-virrat.js | node --test, kaksoisavaimet |
| **2** | Pallon prototyyppi: kalvo canvasista, kello → tekstuuri, kamera seuraa, kuvakehykset, moottorin koukut; kuvakaappaukset ja kehysnopeus puhelinkoossa | js/aikajana-virrat.js, linssit.js `kalvo(canvas)`, koukut, css | savukkeet, omistajan arvio kuvista |
| **3** | Hionta omistajan palautteesta: värit, vanhan alueen näkyvyys, porttien reunat, nopeudet pysäkeittäin; tekstien täsmennykset (luku 4) Fablen kanssa | data + tekstit | Fable |
| **4** | Tasokartta (`<image>`), tai päätös jättää tasokartta valolinssiksi | topografian malli | mittaus 5.4 |
| **5** | Julkaisu; linssikatalogin malli muille leviämislinsseille (maanviljely, kielet, bantut) — sama moottori, uusi aineisto | docs/linssikatalogi.md | päätoimittaja |

Vaiheet 1–2 ovat yhden agentin päivän työ; vaihe 1 voi alkaa heti
hyväksynnän jälkeen, koska se ei koske pelikoodia. Scratchpadin
laskukoe (laskenta.mjs, tee-maamaski.mjs, virrat-data.mjs, koe.mjs)
on vaiheen 1 pohja lähes sellaisenaan: laskentamoduuli on kirjoitettu
talon tyylillä, työkalu tarvitsee vain kirjoituskohteen ja otsikon.

## 10. Avoimet kysymykset omistajalle

1. **Värit.** Ehdotus: päävirta meripihka, Eurooppa sininen,
   Amerikat meripihkasta liukuva turkoosi/vihreä, Tyynimeri ruusu.
   Sopiiko paletti pallon vaaleaan pintaan ja keksintöjen
   kellanvalkeaan valoon? Vaihtoehto Amerikoille: punavioletti, jolloin
   liuku meripihkasta pysyy kirkkaana ilman oliivivaihetta.
2. **Kuinka näkyvä vanha alue on?** Kokeessa vaalea sävy 60 %:n
   peitolla hukkuu beigeen. Haluatko vanhan alueen selvästi
   värillisenä (esim. 75 % peitto, tummempi sävy) vai hennon
   "muistijälkenä", jolloin rintama on ainoa kirkas asia?
3. **Rintaman leveys.** Kymmenesosa kellon lukemasta (30 ka → 3 000
   v; 1 ka → 600 v vähimmäisarvona). Riittääkö, vai pitäisikö rintama
   olla kapeampi ja terävämpi?
4. **Näkyvätkö kaikki 20 pysäkkiä kuvina kartalla?** Ehdotus: kyllä,
   pieninä kehyksinä, jotka kutistuvat seuraavan syttyessä. Vaihtoehto:
   vain nykyinen pysäkki kartalla, menneet pelkkinä pisteinä.
5. **Kello.** Kello säilyy nykyisenä (vilistävä matkamittari, toisen
   agentin työ). Pitäisikö kellon rytmiä muuttaa, kun pysäkkien väli
   ei enää ole kameran ajo vaan värin leviäminen — esimerkiksi
   hitaampi tahti Australian ja Amerikkojen täyttymisen aikana?
6. **Reittiviiva pois?** Isoympyrä pysäkiltä pysäkille on virtojen
   kanssa harhaanjohtava (Beringia → Chile meren yli). Ehdotus:
   `reitti: false` tälle kaarelle; keksinnöillä ennallaan.
7. **Neandertalilaiset ja denisovalaiset.** Vaihtoehdot: (a) eivät
   näy, vain teksti; (b) haalea harmaa alue Euroopassa ja
   Keski-Aasiassa 300–40 ka, joka väistyy värin tieltä (viides,
   "vanhan väestön" kenttä — sama laskenta, negatiivinen väri);
   (c) pelkkä merkki Denisovan pysäkillä. Ehdotus (b) vaiheessa 3,
   jos (a) tuntuu köyhältä.
8. **White Sands 22 ka.** Näytetäänkö kuva 7 000 vuotta ennen väriä
   (kiista näkyviin) vai siirretäänkö pysäkki kertomaan 15 ka:n
   saapumisesta ja kiista vain tekstiin?
9. **Tasokartta vai vain pallo?** Ehdotus: prototyyppi vain pallolla;
   tasokartta vaiheessa 4 tai jätetään valolinssiksi (aalto 3B sulkee
   vanhan kartan).
10. **Reduced motion.** Kamera ei seuraa; värit päivittyvät
    askelittain. Vai pitäisikö silloinkin seurata hitaammin?
11. **Nelijaon rajat.** Siperia ja Itä-Aasia ovat päävirrassa (sama
    väestö, josta Amerikat haarautuvat); Eurooppa loppuu Uraliin ja
    Anatoliaan. Sopiiko, vai haluatko Siperian omaksi (viidenneksi)
    virraksi?
12. **Varhaiset retket (Skhul, Al Wusta).** Jäävätkö ne päävirran
    väriin (luku 4 kohta 1) vai näytetäänkö ne omana haaleana
    "sammuvana" läikkänä, joka katoaa 70 ka mennessä (lisää yhden
    mekanismin: ruudun väri voi sammua)?
13. **Portit laatikoina vai polygoneina?** Laatikot ovat halpoja
    mutta näkyvät viivoina. Ehdotus: laatikot + satunnaistettu reuna
    prototyypissä; polygonit vasta jos reuna häiritsee kuvissa.
14. **Loppusanat ja avausteksti** on kirjoitettu valoille ("kaikki
    kaksikymmentä valoa palavat"). Fable kirjoittaa ne uusiksi
    virroille vaiheessa 3 — hyväksytäänkö, että tekstit muuttuvat?

## 11. Päätökset (omistaja 6.9.2026 iltapäivä, kysymyskortit)

Kaikki luvun 10 kysymykset käytiin läpi kortteina. Päätökset ovat
sitovia (Raamattu: IHMISEN MATKA ON VARIVIRTOJA, EI PISTEITA →
PAATOKSET); ristiriidassa Raamattu voittaa.

| # | Kysymys | Päätös |
|---|---------|--------|
| 1 | Värit | Päävirta meripihka, Eurooppa sininen, Amerikat meripihkasta turkoosin kautta vihreään, Tyynimeri ruusu. |
| 2 | Vanha alue | Selvästi värillinen: n. 75 % peitto, hieman tummempi sävy; rintama kirkkaampi reuna. |
| 3 | Rintaman leveys | Kymmenesosa kellon lukemasta, vähintään 600 v. |
| 4 | Pysäkkikuvat | Kaikki 20 poksahtavat kuvina ja kutistuvat pieniksi kehyksiksi seuraavan syttyessä. |
| 5 | Kello | Ennallaan (vilisevä matkamittari). |
| 6 | Reittiviiva | Pois tästä linssistä (`reitti: false`); Keksinnöissä säilyy. |
| 7 | Neandertalilaiset ja denisovalaiset | Haalea harmaa alue Euroopassa ja Keski-Aasiassa 300–40 ka, joka väistyy värin tieltä (viides kenttä, negatiivinen väri). |
| 8 | White Sands | Kuva 22 ka, väri saapuu vasta n. 15 ka; kiista näkyviin, teksti selittää. |
| 9 | Tasokartta | Ensin vain pallolle. |
| 10 | Reduced motion | Kamera ei seuraa, värit päivittyvät askelittain. |
| 11 | Nelijaon rajat | **Siperia omaksi viidenneksi virraksi** (omistajan valinta vastoin ehdotusta): oma sävy, haarautuu päävirrasta n. 45 ka, Amerikat jatkavat siitä. Virtoja on siis viisi + vanhan väestön kenttä. |
| 12 | Varhaiset retket | Skhul ja Al Wusta omana haaleana sammuvana läikkänä, joka katoaa 70 ka mennessä (ruudun väri voi sammua). |
| 13 | Portit | Laatikot + satunnaistettu reuna prototyypissä; polygonit vain jos reuna häiritsee. |
| 14 | Tekstit | Fable kirjoittaa avaustekstin ja loppusanat uusiksi virroille vaiheessa 3. |

Seurauksia lukuihin 3–6: viides virta (Siperia) tarvitsee oman sävyn,
joka erottuu sekä päävirran meripihkasta että Amerikkojen turkoosista
(ehdotus: vaalea sinivihreä, joka on Amerikkojen liu'un lähtökohta —
niin Amerikkojen eriytyminen jatkaa Siperian sävystä, ei suoraan
meripihkasta); Amerikkojen lähtöportti Beringiassa lukee Siperian
kentän saapumisajan, ei päävirran. Sammuva läikkä (12) lisää
laskentaan yhden mekanismin: ruudulla on saapumisajan lisäksi
mahdollinen sammumisaika.

Seuraava askel: fablemax toteuttaa prototyypin näiden päätösten
mukaan; omistaja arvioi kuvakaappaukset ennen hiontaa.

## 12. Prototyyppi toteutettu (fablemax 6.9.2026 ilta) — vaiheet 1–2

Tiedostot: `tools/tee-maamaski.mjs` (maski pelin laudasta, 5,5 kt
base64, 62 016 maaruutua, 104 komponenttia; Tšuktšien kärki puuttuu,
koska lauta katkeaa 175°W:ssä — Beringian portti lukee Siperian kentän
176°W:stä), `js/linssit/ihmisen-matka-maamaski.js`,
`js/aikajana-virrat-laskenta.js` (puhdas laskenta: Dijkstra, portit,
ylitykset, nauhat, tila, väri, painopiste; generaattori virta
kerrallaan), `js/linssit/ihmisen-matka-virrat.js` (viisi virtaa +
retki + vanha väestö), `js/aikajana-virrat.js` (kangas 720 × 360 →
pallon kalvo, kamera, kehykset, nuoli), `tests/aikajana-virrat.test.mjs`
(15 testiä). Moottoriin viisi koukkua (luku 5.5), kalvo hyväksyy
canvasin ja antaa `paivita()`, kaari `reitti: false`, `tummennus:
false`, `virrat`.

**Poikkeamat luvuista 2–6 ja miksi:**

- Amerikkojen sävy liukuu KELLON mukaan 17 → 11 ka koko alueella, ei
  saapumisajan mukaan ruuduittain: saapumisajan mukainen liuku jätti
  rannikon turkoosiksi ja sisämaan vihreäksi pysyvästi, mikä ei ollut
  "eriytyvä populaatio" vaan rannikkokartta.
- Porttien ruutukohtainen aikahajonta on nolla: kokeessa se kynnysti
  kohinakentän neliölaikuiksi (Tiibet 40 ka). Rosoreuna riittää; jään
  reunat (Laurentide, Keskilänsi, Kordillera) ja Tiibet saivat 3–3,5°
  reunan, koska 1,5° näkyi vielä suorakulmaisina lovina.
- Retki (Skhul, Al Wusta) on oma kenttä, joka häipyy 78 → 70 ka;
  päävirran Levantin portti on 72 ka (uusi lähtö), Bab-el-Mandeb
  78–55 ka, Aasian rannikko 76 ka → Lida Ajer 68,8 ka (kuva 70).
- Puhelimen pystyruudulla kameran leveys skaalataan kuvasuhteella,
  muuten kamera menisi kattoon (2,5).
- Kehykset syntyvät myös selattaessa (siirry), ei vain kellosta.

**Mitattu:** laskenta Node 450–800 ms, Chromium (kontti) 1,2–2,4 s
avausjakson aikana setTimeout-paloissa; kankaan maalaus 3–70 ms
kontin Chromiumissa (ruudut 62 871), 12 Hz. Mallin saapumisajat:
Levantti 72 ka, Australia 62 ka, Eurooppa 45–41 ka, Yana 34 ka, Alaska
16,7 ka, White Sands 15,1 ka, Monte Verde 14,1 ka, Tonga 2,8 ka,
Aotearoa 0,73 ka. Kuvakaappaukset ja avoimet kysymykset: fablemaxin
raportti 6.9.2026.

**Hiontaan (luku 9 vaihe 3):** avausteksti ja loppusanat virroille
(TODO datassa), maskin Malakan itäpuolinen ylimäärä, Tiibetin ja
jään porttien muoto (polygonit?), laskenta Workeriin, tasokartta.
→ Tehty luvussa 13 (paitsi tasokartta).

## 13. Hiontakierros (fablemax 6.9.2026 ilta) — omistajan "hio ensin, julkaise sitten"

Omistaja katsoi prototyypin kuvakaappaukset ja antoi seitsemän
korjausta; kaikki tehtiin samaan committiin. Mitä muuttui ja miksi:

1. **Pinonta (puhelin, loppu).** Kirjaston CSS2D-kerros antaa
   jokaiselle merkille oman z-indexin (mitattu 29), ja koska pallon
   kuori ei ollut pinontayhteys, lamput ja kuvakehykset kilpailivat
   suoraan linssin juuren (z 7) kanssa ja piirtyivät loppusanojen ja
   korttien päälle. `body.aikajana-paalla .pallo-kuori.pallolauta {
   isolation: isolate }` (css/aikajana.css) tekee kuoresta oman
   pinontayhteyden: merkit järjestyvät keskenään pallon sisällä ja koko
   pallo jää linssin elementtien alle. Nuoli siirtyi samasta syystä
   linssin juuresta pallon koteloon.
2. **Ruutureunat.** Kolme syytä, kolme korjausta:
   - *Rintama ja rannikko:* kalvo piirretään 1440 × 720 (PIIRTOKERROIN
     2) ja jokainen pikseli saa saapumisajan, peiton ja virran neljän
     lähimmän ruudun bilineaarisena sekoituksena
     (`tarkennaKentat`); kerrokset yhdistetään päällekkäin
     peittävyyden mukaan. Rannikolla paino on lisäksi ruudun
     MAAPEITTO (kohta 3).
   - *Porttien laatikot (Tiibet, jään reunat):* portin ulkopuolelle
     tuli LUISU (`portinLuisu`, `laatikonSyvyys`): kaistalla rajan
     ulkopuolella avautuminen viivästyy neliöllisesti rajaa kohti,
     joten kenttä on jatkuva rajan yli ja rintama hiipuu ylängön tai
     jään juurelle sen sijaan että pysähtyisi porrasreunaan. Tiibet
     3° / 30 000 v, jään reunat 2° / 5 000 v, Fennoskandia 2,5° /
     30 000 v; oletus 1,5° ja 75 % avautumisajasta. Laurentiden
     länsireuna siirtyi −120 → −116 (kaista ja rosoreuna ulottuivat
     muuten rannikolle: Vancouver 15,7 → 14,8 ka, White Sands 15,2 →
     13,5 ka — mitattu ja korjattu; Kordillera jatkuu samaan rajaan).
     Arktinen Siperia on yksi laatikko antimeridiaanin yli, jottei
     kahden laatikon sauma 180°:ssa näy reunana.
   - *Vanha väestö:* harmaan alueen reuna on pehmeä 2° kaistalla
     (`laatikkoPehmea`), ei binäärinen.
   Polygoneja ei tarvittu (päätös 13: vain jos reuna häiritsee — luisu
   riitti).
3. **Maski.** `peitot`: maapeitto 0…9 per ruutu (osumia yhdeksästä
   alinäytteestä) piirtoa varten; kulku käyttää yhä binääristä maskia
   kynnyksellä 2/9, jotta kannakset pysyvät. Malakan itäpuolen
   "ylimääräinen maa" oli täytenä piirrettyjä reunaruutuja, joissa
   maata on viidennes — nyt ne piirtyvät viidenneksen peitolla (5 818
   osittaista rannikkoruutua, peitto 23,9 kt base64). Laudan sauma
   175°W: Tšuktšien kärki (Dežnjovinniemi) lisätään käsin polygonina
   (LISAYKSET, 48 ruutua); Beringinsalmi on 66°N:llä 1,5° leveä
   (oli 7°), tarkistuspisteet Dežnjov, Provideniya, Tšuktšimeri.
4. **Tekstit** virroille (Fable, päätös 14): esittely, avausteksti ja
   loppusanat js/linssit/ihmisen-matka-data.js; TODO pois.
5. **Suorituskyky.** Laskenta ja tarkennus ajetaan Web Workerissa
   (js/aikajana-virrat-tyo.js, moduulityösäie sivun juuresta; sw.js
   SHELL). Varapolku: jos Worker ei käynnisty (yhden tiedoston versio,
   file://), sama laskenta pääsäikeessä paloissa kuten ennen.
   Käynnistä-nappi odottaa laskennan valmistumista (`odotaVirtoja`:
   disabled + aria-busy, painallus toistetaan itse) — Afrikka ei näy
   hetkeäkään värittömänä. Esilaskettu taulu hylättiin: 62 000 ruudun
   ajat olisivat > 150 kt ja vanhenisivat jokaisesta datan muutoksesta.
6. **Savuke** savuke-aikajana.mjs: reitti kuuntelee myös
   media.matkakirja.app:ia CORS-otsakkeella (sama kaava kuin
   savuke-avauslento.mjs); kolme vanhentunutta odotusta korjattu
   (kortin vuosi, menneiden korttien sumeus, paneelin henkilörivi →
   kuvatekstin otsikko).
7. **Kellon liike-epäterävyys** (omistajan lisätilaus): ks. js/aikajana.js
   RULLIEN LIIKE-EPÄTERÄVYYS — nopeus × valotusaika (1/48 s) numeron
   korkeuksina rullan painoarvolla, kuusi text-shadow-otosta
   pystysuunnassa, tasoitus 0,35/kehys, reduced motion nollaa.

Mitat: laskenta Node 265–500 ms + tarkennus 150–300 ms (Workerissa);
kalvon maalaus 1440 × 720 kontin Chromiumissa ks. fablemaxin raportti
6.9.2026 ilta; päivitysväli venyy hitaalla laitteella
(PAIVITYSVALIN_KERROIN × maalauksen kesto).

