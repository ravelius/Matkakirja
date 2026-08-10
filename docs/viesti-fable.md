# Sonnet 2 → Fable: erä 11 käynnistys (10.8.2026)

Varareitti käytössä pysyvästi tästä lähtien (ei create_trigger-työkalua
yön aikana, kuten pyysit).

**Erä 10 (Sofia/Bukarest/Sarajevo) valmis**: v495 mainissa, PR #723
squash-mergetty itse CI:n mentyä vihreäksi (Monitor-työkalulla, ei
jätetty kesken). Versiokollisio v494→v495 hoidettu itse rebasella.

**Aloitan erän 11**: Kiova, Pietari, Moskova, Odessa (v433-kartat, 24
kohdetta). Haara nollattu tuoreeseen mainiin (fetch juuri ennen: main
oli v497). Workflow (tutkimus + kuvakuraatio per kaupunki) käynnissä
taustalla. Sovellan uutta linjaa: ei sotasisältöä Venäjän/Ukrainan
kohteissa, kaikki neljä kaupunkia kirjoitetaan puhtaasti kulttuuri- ja
arkkitehtuurikohteina (rakennushistoria, tarinat, taide) — tämä on
kirjattu suoraan workflow-agenttien ohjeisiin jokaiselle neljälle
kaupungille, ei vain yhdelle.

Välicommitit joka kaupungin jälkeen tästä eteenpäin, kuten pyysit.
Raportoin tänne uudelleen kun erä 11 on valmis tai jos tulee este, ja
jatkan sitten suoraan eriin 12 (Tromssa/Dubrovnik/Riika) ja 13
(Vilna/Oslo/Kööpenhamina) ilman eri lupaa.

---

# Opus 1 → Fable: valokuvarajatapaukset, väliraportti (10.8.2026)

Varareitti käytössä: create_trigger jäi lupakyselyyn, joten raportti
tulee tätä kautta niin kuin sovimme.

## Mainissa nyt

- **v494** — kaksitoista valokuvakysymystä sai tunnistettavan kuvan (#722)
- **v496** — kahdeksan kuvaduplikaattia purettu (#724)

Testit mainissa: `# tests 571 / # pass 570 / # fail 0`.

## 1. Valokuvarajatapaukset

Valmista listaa ~50 rajatapauksesta ei ollut missään, joten kävin läpi
**kaikki 41 Euroopan nykykuvaa** katsomalla ne 480 pikselin kokoisina.
Valokuvakysymys näyttää nykykuvan ja kysyy "mikä paikka tämä on", joten
kriteeri on: näkyykö kuvassa jotain, mistä paikan voi tunnistaa.

Kaksitoista ei kelvannut, neljässä luokassa:

- **geneerinen näkymä** — Krakovan satunnaiset julkisivut, Tallinnan
  puistolampi, Lapin maantiesilta, Berliinin Potsdamer Platz,
  Marseillen venesatama
- **kuva otettu siitä kohteesta, jota kysytään** (kohde ei siis näy) —
  Edinburghin linna, Reykjavíkin Hallgrímskirkja
- **laaja panoraama, jossa kohde jää pisteeksi** — Istanbulin Kultainen
  sarvi, Alppien Rhône-jäätikkö, Sarajevon ilmakuva
- **muu** — Knossos ilman punaisia pylväitä ja härkäfreskoa, Rooman
  Colosseum mustavalkoisena (nykykuvan pitää olla värikuva)

Tilalle: Notre-Dame de la Garde, Sukiennice, Sebilj, Hallgrímskirkja,
Knossoksen pohjoinen sisäänkäynti, Edinburghin linna kalliolla,
televisiotorni, Matterhorn, Tallinnan vanhankaupungin talot,
Pallastunturit, Galatan torni ja Colosseum värikuvana.

Loput 29 Euroopan nykykuvaa kelpasivat sellaisenaan.

## 2. Kuvaduplikaatit

Tein tarkistimen, joka lukee **kaikki paketit tekstitasolla** — aiempi
luki vain kolme pakettia, ja siksi se ei nähnyt esimerkiksi
menovinkkilistojen kuvia. Tilanne:

- ennen erää **23** päällekkäisyyttä, nyt **15**
- listan 17:stä tehty kahdeksan: #1 Assekrem, #2 Benin, #4 Sossusvlei,
  #5 Big Hole, #6 Ilha de Moçambique, #7 kirahvi, #8 Khan el-Khalili,
  #9 Pyhän Katariinan luostari

**Jäljellä listasta yhdeksän**: #10 härkähyppy-fresko, #11 brunost,
#12 Rossion kivetys, #13 Széchényin shakki, #14 Arsenalnan liukuportaat,
#15 Eremitaasin kissa, #16 Muhammad Alin moskeija, #17 Brandenburgin
portti — sekä #3 Tšadjärven kalastaja, jolle Commonsissa on vain sama
kuva kahtena versiona (suoristettu ja alkuperäinen). Se tarvitsee
aidosti eri kuvan, ja ehdotan sitä omaksi pieneksi hauksi.

## Päätettävää sinulle

Listan ulkopuolelta löytyi **neljä päällekkäisyyttä**, jotka eivät ole
kuvaduplikaatit.md:ssä:

1. `Hagia Sophia Mars 2013.jpg` — kulttuuri-kategoriat / nähtävyysjutut
2. `Casa Batlló 01.jpg` — kulttuuri-kategoriat / nähtävyysjutut
3. `Rio Javaés.jpg` — maasto-tekstit / southamerica-valokuvat
4. `Jules Leclercq- Aux sources du Nil-1913-chutes Ripon.jpg` —
   africa-valokuvat / maasto-tekstit-malli

Kaksi ensimmäistä ovat täsmälleen samaa luokkaa kuin listan #16 ja #17
(kaupunkilehden kansi ↔ nähtävyysjuttu) ja syntyivät ilmeisesti listan
laatimisen jälkeen. Kaksi jälkimmäistä osuvat maastotekstipaketteihin,
joista sinulla on oma linjaus. En koskenut näihin, koska lista on sinun
päätöksesi — sano, otanko ne mukaan seuraavaan erään.

## Muuta

Kysyit menovinkkien 245/246:sta: se yksi rivi on **tietoinen valinta**.
Dubain Museum of the Future -rivi jäi ilman kuvaa, koska rakennuksen
julkisivusta ei ole Commonsissa vapaata valokuvaa (löytyneet olivat
GODL-India tai sisätiloista). Listamallissa kuva on vapaaehtoinen
nimenomaan siksi, ettei hyvä osoite putoa listalta kuvan puutteen takia.
