# Asunción-faktapohjan riippumaton tarkistus

Tarkistettu 24.8.2026 en-Wikipedian raakatekstistä (`action=raw`, curl,
uusinnat kasvavalla viiveellä 429-tilanteissa) seuraavista artikkeleista:
**Asunción**, Guarani language, Paraguayan War, Sacking of Asunción,
Palacio de los López, National Pantheon of the Heroes, Casa de la
Independencia Museum, Tereré, Ñandutí, Catedral (Asunción, barrio).
Koordinaatit tarkistettu suoraan MediaWikin
`action=query&prop=coordinates`-rajapinnasta jokaiselle kohdekartan
kohteelle erikseen ja verrattu faktapohjan taulukkoon; etäisyydet ja
suunnat laskettu itsenäisesti Python-skriptillä samalla kaavalla kuin
faktapohja ilmoittaa käyttäneensä (asteet × 111 km, pituusasteille
kerrottu cos(25,286°)). Commons-kategoriat tarkistettu
`action=query&prop=categoryinfo`-rajapinnasta 15 listatulle
kategorialle sekä erikseen neljälle väitetysti puuttuvalle
(arvatulle) kategorianimelle. Merkkimäärät laskettu koneellisesti
Python-skriptillä kaikille 12 nostolle ja kaikille kolmelle
sivujohdannolle.

**Yleisarvio: faktapohja on erittäin huolellisesti koottu, ja lähes
kaikki yksittäiset faktaväitteet (vuosiluvut, nimet, luvut,
koordinaatit, Commons-kategoriat) osoittautuivat oikeiksi
riippumattomasti tarkistettuina** — myös vaikeimmat kohdat, kuten
Kolmoisliiton sodan kiistanalainen väestötappiohaarukka, joka on
kirjoitettu auki lähteineen tehtävänannon vaatimusten mukaisesti eikä
tiivistetty yhdeksi konsensusluvuksi. En löytänyt merkkejä
Christchurch- tai muusta vieraasta kontaminaatiosta yhdestäkään
kohdasta. Löysin kuitenkin **neljä todellista sisältövirhettä**
(otsikon ja leipätekstin sisäinen ristiriita, kirjoitusvirhe,
kahden rakennusvaiheen sekoittuminen ja yksi lähteetön
yksityiskohta) sekä kolme pienempää huomiota.

---

## A. VIRHE — K1: nostotitteli ("kuusikymmentä") ristiriidassa oman leipätekstin ("yli seitsemänkymmentä") kanssa

**Otsikko:** "Kaupunki joka synnytti **kuusikymmentä** muuta"

**Leipäteksti (sama nosto):** "...Buenos Airesin toinen perustaminen,
Villarrica, Corrientes, Santa Fe ja Córdoba – **yli
seitsemänkymmentä** siirtokuntaa kaikkiaan."

**Ongelma:** Otsikko ja leipäteksti antavat kaksi eri lukua samasta
asiasta yhden ja saman noston sisällä. En-Wikipedian "Asunción"-
artikkeli tukee leipätekstin lukua: "...including the second
foundation of Buenos Aires, that of other important cities such as
Villarrica, Corrientes, Santa Fe, Córdoba, Santa Cruz de la Sierra and
**65 more**" (5 nimettyä + 65 muuta = 70), ja artikkelin oma
BBC-lähde otsikoi asian "más de **70** ciudades". Otsikon "kuusikymmentä"
ei vastaa mitään Wikipedia-lukua läheltäkään — se on joko vanha
luonnos tai suora virhe.

**Suositus:** Korjaa otsikko vastaamaan leipätekstiä ja lähdettä,
esim. "Kaupunki joka synnytti seitsemänkymmentä muuta".

---

## B. VIRHE — K3: kirjoitusvirhe "jokaparáa", pitäisi olla "joparáa"

**Väite (K3, proosa, rivi 180):** "...yli neljännes asunciónilaisista
puhuu **jokaparáa**, guaranin ja espanjan sekakieltä..."

**Ongelma:** Kielen nimi on "jopará" (guaranin ja espanjan
sekakieli) — sama faktapohja käyttää oikeaa muotoa kahdessa muussa
kohdassa samassa dokumentissa: "jopará (guaranin ja espanjan
sekakieli) 27,4 %" (K3:n oma lähteet-kohta, rivi 199) ja "jopará
27,4 %" (osio 7, rivi 761). Proosan "jokaparáa" sisältää ylimääräisen
"ka"-tavun ("jo-**ka**-pa-rá-a" vs. oikea "jo-pa-rá-a") ja on selkeä
kirjoitusvirhe, joka on lisäksi ristiriidassa dokumentin oman
kirjoitusasun kanssa.

**Suositus:** Korjaa proosaan "joparáa" (partitiivimuoto sanasta
jopará).

---

## C. VIRHE — L3: kaksi eri rakennusvaihetta sekoitettu keskenään

**Väite (L3, proosa ja lähteet):** "Toinen rakennusvaihe, joka
valmistui vuodesta 2019 alkaen, toi lisää pyöräkaistoja, siltoja ja
liikuntapaikkoja." / lähteet: "Hankkeen toinen vaihe (rakennustyöt
alkoivat 2019) lisäsi pyöräkaistoja, pysäköintiä, siltoja,
urheilukenttiä ja muita virkistysalueita."

**Ongelma — kaksi asiaa on yhdistetty virheellisesti yhdeksi:**
En-Wikipedian "Asunción" (Coastal Linear Park -osio) erottaa selvästi
kaksi vaihetta: "...the **first stage** of which was enabled at the
end of **2019** with the following characteristics: exclusive
bicycle lanes, paths, fair spaces, gym equipment, and a parking lot
with capacity for 350 vehicles. **The second stage** of this linear
park **will add** 10 hectares of new green space... The
characteristics of the second stage... 3 reinforced concrete
bridges, soccer fields, playgrounds..." Toisin sanoen:
- Vuonna 2019 valmistunut vaihe on artikkelin mukaan **ENSIMMÄINEN**
  vaihe (pyöräkaistat, kevyt kalusto, pysäköinti) — EI toinen.
- Sillat ja liikuntapaikat (urheilukentät, leikkipaikat) kuuluvat
  artikkelin mukaan **TOISEEN** vaiheeseen, jolle ei anneta mitään
  valmistumisvuotta (verbi on futuurissa "will add").

Faktapohja on siis nimennyt vuonna 2019 valmistuneen vaiheen
"toiseksi vaiheeksi" ja liittänyt siihen piirteitä (sillat,
liikuntapaikat), jotka lähteen mukaan kuuluvat sille nimeämättömälle,
tulevaisuudessa valmistuvalle toiselle vaiheelle. Kumpikaan
Wikipedian kahdesta vaiheesta ei yksinään vastaa faktapohjan
kuvausta.

**Suositus:** Erota kaksi vaihetta oikein, tai jos molemmat halutaan
yhteen virkkeeseen, älä liitä "2019"-vuotta ja siltoja/liikunta-
paikkoja samaan lauseeseen syy-seuraussuhteessa. Esim.: "Vuonna 2019
valmistui ensimmäinen laajennusvaihe pyöräkaistoineen; toinen vaihe
lisää vielä siltoja ja liikuntapaikkoja." (tarkista kirjoitusvaiheessa,
onko toinen vaihe sittemmin valmistunut).

---

## D. VIRHE — H3: lähteetön "kolmekymmentä vuotta suunnitellun aikataulun jälkeen"

**Väite (H3, proosa):** "Vasta presidentti Juan Bautista Egusquiza sai
palatsin valmiiksi 1894, **kolmekymmentä vuotta suunnitellun
aikataulun jälkeen**."

**Ongelma:** En-Wikipedian "Palacio de los López" -artikkelissa ei
mainita mitään "suunnitellusta aikataulusta", johon 1894 olisi
verrattavissa. Artikkeli kertoo vain, että rakentaminen alkoi 1857 ja
oli "olennaisesti valmis" 1867 — mistään alkuperäisestä
tavoiteaikataulusta ei puhuta. "30 vuotta" ei myöskään täsmää
suoraviivaisesti kumpaankaan mahdolliseen vertailukohtaan (1857→1894 =
37 vuotta; 1867→1894 = 27 vuotta). Tämä on faktapohjan oma,
lähteetön lisäys, ei suora Wikipedia-fakta — sama lähteet-kohta ei
sisällä tätä väitettä lainkaan.

**Suositus:** Poista "kolmekymmentä vuotta suunnitellun aikataulun
jälkeen" tai korvaa se lähteeseen perustuvalla muotoilulla, esim.
"lähes neljä vuosikymmentä rakennustyön alkamisesta".

---

## E. Huomio — K4: viittaus vääriin lähdeartikkeliin yhden yksityiskohdan osalta

**Väite (K4, lähteet):** "...ryhmä miehiä käveli talon vierestä
kuvernööri Bernardo de Velascon talolle ja **pakotti hänet
antautumaan**. — en-Wikipedia 'Casa de la Independencia Museum'
(johdanto, History-osio, Historical Alley -osio)"

**Ongelma:** "Casa de la Independencia Museum" -artikkeli itse ei
puhu antautumisesta vaan pehmeämmästä lopputuloksesta: "...in order
to **force him into a power-sharing agreement**." "Antautumaan"
(surrender) löytyy sanatarkasti vain "Asunción"-pääartikkelista
(Early history -osio): "...the rebels succeeded and **forced governor
Velasco to surrender**." Väite on siis asiallisesti oikein (toinen
Wikipedia-artikkeli tukee sitä täsmälleen), mutta lähdeviittaus
osoittaa väärään artikkeliin — kirjoittajan kannattaa lisätä
"Asunción"-artikkeli lähteeksi tälle yksittäiselle yksityiskohdalle.

**Suositus:** Päivitä lähdeviittaus kattamaan myös "Asunción"
(Early history -osio), josta "antautumaan"-sanamuoto todella tulee.

---

## F. Huomio — L2: "120 sädettä" jättää pois lähteen ilmoittaman ylärajan 150

**Väite (L2, proosa):** "...syntyy pyöreitä, seittimäisiä kuvioita,
joihin voi kertyä **satakaksikymmentä** sädettä yhtä kiekkoa kohti."

**Lähde:** En-Wikipedian "Ñandutí" (Technique-osio): "From **120 to
150** rays per disc are thus stretched." Faktapohjan oma lähteet-
kohta toistaa tämän oikein ("120–150 sädelankaa"), mutta proosa
pyöristää sen yhdeksi kiinteäksi luvuksi (120), joka jättää pois
puolet lähteen ilmoittamasta vaihteluvälistä.

**Suositus:** Käytä proosassa koko haarukkaa, esim. "120–150 sädettä"
tai "jopa 150 sädettä".

---

## G. Huomio — kolmen sivujohdannon ilmoitetut merkkimäärät eivät täsmää todellisiin

Laskin kaikkien kolmen sivujohdannon merkkimäärän koneellisesti
(Python `len()`, sama menetelmä joka täsmäsi tarkalleen kaikkiin 12
noston ilmoitettuun merkkimäärään — ks. kohta "Vahvistettu erityisen
huolella"):

| Sivu | Ilmoitettu | Todellinen |
|---|---|---|
| A (kaupunki) | 221 | 206 |
| B (historia) | 226 | 189 |
| C (kulttuuri) | 207 | 193 |

Kaikki kolme todellista lukua mahtuvat silti `kaupunkilehti.md`:n
vaadittuun 154–232 merkin väliin, joten tämä EI ole spec-rikkomus
eikä vaadi tekstin muuttamista — mutta ilmoitetut merkkimäärät ovat
vääriä ja kannattaa korjata dokumentin sisäisen luotettavuuden
vuoksi.

---

## H. Huomio — Commons-kategorioiden kuvamäärät ovat hieman muuttuneet mittaushetkien välillä

Kaikki 15 osiossa 5 listattua kategoriaa vahvistettiin olemassa
oleviksi (`missing` ei ollut asetettu millekään), mutta useiden
kuvamäärä poikkeaa hieman faktapohjan ilmoittamasta (esim.
`Category:Asunción` 208→178, `Category:Guaraní` 235→215,
`Category:War of the Triple Alliance` 205→191,
`Category:Crafts of Paraguay` 47→40; muut lähempänä alkuperäistä).
Tämä on todennäköisesti tavanomaista Commons-kategorioiden ajallista
vaihtelua (kuvia lisätään/poistetaan jatkuvasti) eikä osoita väärää
kategoriaa — kaikki kategoriat ovat edelleen olemassa ja sisältävät
runsaasti kuvia. Kirjoittajan kannattaa silti tarkistaa tarkat
kuvamäärät uudelleen kirjoitusvaiheessa, koska ne elävät.

---

## Vahvistettu erityisen huolella (tehtävänannon painotukset)

- **Kolmoisliiton sodan väestötappiohaarukka (erityispiste 1):**
  faktapohja EI poimi yhtä konsensuslukua. H1-nosto ja osio 7 kohta 2
  esittävät sekä matalan arvion (21 000 / 7 %, Reber 1988) että
  korkean arvion (60–70 %, jopa 69 %, Whigham & Potthast 1999)
  lähteineen, ja mainitsee myös artikkelin oman huomautuksen
  "without support" 90 %:n arviosta, jota faktapohja tietoisesti
  vältti käyttämästä. En-Wikipedian "Paraguayan War" (Casualties of
  the war -osio) vahvistaa täsmälleen nämä luvut sanasta sanaan:
  "a possible low of 21,000 (7% of population) (Reber, 1988) to as
  high as 69% of the total prewar population (Whigham, Potthast,
  1999)" ja 1871 väestönlaskennan luvut (221 079 / 106 254 / 28 746 /
  86 079) täsmäävät tismalleen. Sodan käsittely on suoraviivaista
  tapahtumakerrontaa ilman taistelu- tai kärsimyskuvauksia —
  spec-mantereet.md:n ja ikäsopivuuden (13+) mukaista.
- **Christchurch-kontaminaatio (erityispiste 2):** koko dokumentti
  luettu läpi ja haettu hakusanoilla "Christchurch", "New Zealand",
  "Uusi-Seelanti" sekä muiden mannereiden kaupunkien/maiden nimillä
  (Venezuela, Caracas, Bolívar, Jakarta, Helsinki, Santiago, Lima,
  Quito, Montevideo) — EI löytynyt yhtään vierasta osumaa
  varsinaisesta sisällöstä. Ainoat "christchurch"-osumat viittaavat
  legitiimisti `faktapohja-christchurch.md`-tiedostoon rakennemallina
  (rivit 12, 613). Kontaminaatio on siis todella korjattu eikä ole
  levinnyt muualle dokumenttiin.
- **Kohdekartan koordinaatit (erityispiste 3):** kaikki 8 kohdetta +
  vertailupiste (La Catedral, Asunción-barrio) haettu itsenäisesti
  MediaWikin coordinates-rajapinnasta — jokainen täsmäsi faktapohjan
  taulukkoon desimaalin tarkkuudella. Etäisyydet ja suunnat laskettu
  itsenäisesti samalla kaavalla (111 km/aste, pituusaste ×
  cos(25,286°) ≈ 0,904): kaikki 8 etäisyyttä täsmäsivät 3 desimaalin
  tarkkuudella, ja kaikki 8 ilmansuuntaa (luode/koillinen/lounas/
  kaakko) osuivat oikeaan kvadranttiin.
- **Commons-kategoriat (erityispiste 4):** kaikki 15 listattua
  kategoriaa vahvistettu olemassa oleviksi kuvineen (ks. huomio H).
  Lisäksi kaikki neljä faktapohjan mainitsemaa VÄÄRÄÄ arvausta
  (`Category:Ñandutí`, `Category:Costanera de Asunción`,
  `Category:National Pantheon of the Heroes, Asunción`, ja implisiit-
  tisesti myös `Category:Sacking of Asunción`) vahvistettiin
  itsenäisesti todella puuttuviksi (`missing`) — faktapohjan väite
  näiden korvaamisen tarpeesta piti paikkansa täydellisesti.
- **H2, H3, H4 (isoisän 1873-kulma):** kaikki numeeriset ja
  nimelliset yksityiskohdat (evakuointi kaksi päivää ennen valtausta,
  30 000/4 000/200/800 sotilasta, arkiston palautus 1980-luvulla,
  miehitys 1876 asti; palatsin rakennus 1857–1867, ryöstö tammikuussa
  1869, kunnostusyritys 1890, valmistuminen 1894, Peñan virkavala
  2023; Panteonin tilaus lokakuussa 1863, yli 70 vuotta keskeneräisenä,
  valmistuminen 12.10.1936, haudatut henkilöt, "Fides et Patria")
  täsmäsivät kaikki lähteisiin täsmälleen (paitsi kohdat D ja E yllä).
- **K3 (guaraní elävänä kielenä, pilari 3):** 1992 perustuslaki,
  Mercosurin kolmas virallinen kieli ja Asunciónin oma kielijakauma
  (56,9/11,2/27,4/4,5 %, oikein merkitty {{citation needed}} -
  varauksella) täsmäsivät kaikki. Stroessnerin diktatuuri on
  tarkoituksella jätetty pois, vaikka "Guarani language" -artikkelin
  Political status -osio mainitsee sen suoraan — Raamatun rajausta on
  noudatettu oikein.
- **Merkkimäärät (nostot):** kaikki 12 nostoa mitattu koneellisesti —
  kaikki 12 lukua (633, 568, 589, 490, 639, 643, 659, 628, 519, 481,
  463, 534) täsmäsivät koostajan ilmoittamiin lukuihin tismalleen, ja
  kaikki osuvat vaadittuun 440–660 merkin väliin (H3:n 659 on juuri
  ylärajan alla). Ks. kohta G johdantojen osalta.

---

## Yhteenveto korjattavista kohdista

### PAKOLLISET KORJAUKSET

1. **[VIRHE, sisäinen ristiriita] K1:** nostotitteli "kuusikymmentä
   muuta" on ristiriidassa oman leipätekstin ("yli seitsemänkymmentä")
   ja lähteen (65 + 5 nimettyä = 70) kanssa. Ks. kohta A.
2. **[VIRHE, kirjoitusvirhe] K3:** "jokaparáa" pitää olla "joparáa" —
   sama dokumentti käyttää oikeaa muotoa kahdessa muussa kohdassa.
   Ks. kohta B.
3. **[VIRHE, tosiasiat sekoitettu] L3:** vuonna 2019 valmistunut vaihe
   on lähteen mukaan ENSIMMÄINEN vaihe, ei toinen; sillat ja
   liikuntapaikat kuuluvat lähteen mukaan sille toiselle, vielä
   päivämäärättömälle vaiheelle. Ks. kohta C.
4. **[VIRHE, lähteetön] H3:** "kolmekymmentä vuotta suunnitellun
   aikataulun jälkeen" ei löydy lähteestä eikä täsmää suoraviivaisesti
   mihinkään lähteen antamaan vuosilukuun. Ks. kohta D.

### HUOMIOT

5. **[Huomio] K4:** "antautumaan"-väite on oikein, mutta viitattu
   väärään lähdeartikkeliin (oikea lähde on "Asunción", ei "Casa de
   la Independencia Museum"). Ks. kohta E.
6. **[Huomio] L2:** proosa käyttää vain lukua 120, vaikka lähde
   (ja faktapohjan oma lähteet-kohta) antaa haarukan 120–150. Ks.
   kohta F.
7. **[Huomio] Kolme sivujohdantoa:** ilmoitetut merkkimäärät (221,
   226, 207) eivät täsmää todellisiin (206, 189, 193) — kaikki silti
   spec-rajojen sisällä. Ks. kohta G.
8. **[Huomio] Commons-kuvamäärät:** hieman muuttuneet mittaushetkien
   välillä, tarkista uudelleen kirjoitusvaiheessa. Ks. kohta H.

---

## Kelpaako-tuomio

**Ei vielä sellaisenaan kirjoittajalle — mutta lähellä.** Faktapohja
on poikkeuksellisen tarkasti lähdetetty ja erityisen hyvin onnistunut
juuri niissä kohdissa, joita tehtävänanto erikseen painotti
(väestötappiohaarukan auki kirjoittaminen, Christchurch-siivous,
koordinaatit, Commons-kategoriat). Neljä löydettyä virhettä (kohdat
A–D) ovat kaikki pieniä ja nopeasti korjattavia — yksikään ei vaadi
uutta faktahakua tai rakenteellista muutosta, vain tekstin
täsmennystä olemassa olevien lähteiden mukaiseksi. Suosittelen, että
Opus korjaa kohdat A–D ennen kirjoitusvaihetta (ja halutessaan myös
E–H), minkä jälkeen faktapohja on täysin kelvollinen pohjaksi.
