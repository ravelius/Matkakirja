# Tekoälykuvat + Wikimedia Commons -viitekuvat: johdannaisuusselvitys

Ei oikeudellista neuvoa — lähteisiin perustuva tausta-aineisto päätöksenteon tueksi.
Tapaus: gpt-image image-edit saa syötteeksi 2–4 Commons-valokuvaa (PD/CC0/CC BY/CC BY-SA)
"ankkuriksi", tuottaa uuden maalauksellisen kuvan samasta rakennuksesta/paikasta.

## 1. Milloin AI-kuva on CC 4.0:n tarkoittama "adaptaatio"

- CC BY 4.0 -lisenssin määritelmä (1 a): "Adapted Material" = aineisto, joka on
  johdettu/perustuu lisensoituun aineistoon ja jossa lisensoitua ainesta on
  "translated, altered, arranged, transformed, or otherwise modified in a manner
  requiring permission" tekijänoikeuden nojalla.
  https://creativecommons.org/licenses/by/4.0/legalcode.txt
- CC:n oma FAQ ("Artificial intelligence and CC licenses" -osio) ja koulutusaineisto-ohje
  eivät anna suoraa sääntöä sille, milloin *generointihetken* syötekuva (ei
  koulutusdata) tekee lopputuloksesta adaptaation — CC:n julkaisema aineisto
  (Using CC-licensed Works for AI Training, 5/2025; ks. myös blogikirjoitus
  8/2023) käsittelee lähes yksinomaan **mallin koulutusta**, ei sitä, että
  tietty kuva annetaan suoraan syötteeksi tiettyä kuvaa tuotettaessa.
  https://creativecommons.org/wp-content/uploads/2025/05/Using-CC-licensed-Works-for-AI-Training.pdf
  https://creativecommons.org/2023/08/18/understanding-cc-licenses-and-generative-ai/
  https://creativecommons.org/faq/
  EPÄVARMUUS: tämä on merkittävä aukko lähteissä — teidän tapauksenne
  (kuva suoraan image-edit-syötteenä) on tekijänoikeudellisesti lähempänä
  perinteistä "maalasin valokuvan pohjalta" -tilannetta kuin
  "koulutusaineisto"-kysymystä, ja CC:n julkinen kanta on kirjoitettu
  jälkimmäistä silmällä pitäen. Sovella varovaisuusperiaatteella.
- CC:n koulutusdata-ohje toteaa kuitenkin yleisesti: jos AI-malli tai sen
  tuotos katsotaan alkuperäisteoksen johdannaisteokseksi ja lähdeteos on
  BY-SA, "conservative approach" edellyttäisi tuotoksen julkaisemista samalla
  lisenssillä (ShareAlike periytyy adaptaatioon, ei koko sovellukseen).
- Periaatteellinen erottelu (ei AI-spesifinen, vaan yleinen teoskäsite):
  tekijänoikeus suojaa **ilmaisua** (sommittelu, rajaus, valaistus, kuvakulma,
  kehitys/jälkikäsittely — ks. Painer-tuomio alla), ei **kohdetta** (rakennus,
  maisema, "idea"). Jos AI-kuva toistaa viitekuvan tunnistettavan sommittelun,
  rajauksen ja valon, kyse on todennäköisemmin adaptaatiosta; jos AI-kuva vain
  kuvaa saman rakennuksen eri kuvakulmasta/valossa/tyylillä ilman, että
  viitekuvan omintakeiset valinnat ovat tunnistettavissa, kyse on
  todennäköisemmin uudesta itsenäisestä teoksesta.

## 2. EU/Suomen tekijänoikeus

- **TekijäL (404/1961) 4 §**: erottaa epäitsenäisen muunnelman (lupaa
  vaativa) "vapaasta muuntelusta" (uusi itsenäinen teos, ei lupaa vaadita).
  Suomalaisessa oikeuskirjallisuudessa käytetty testi: jos teokset synnyttävät
  "samuuselämyksen", kyse on epäitsenäisestä muunnelmasta/johdannaisesta;
  jos syntyy erilainen elämys, kyse on vapaasta muuntelusta. Perustuu
  idea/ilmaisu-erotteluun.
  https://wiki.aalto.fi/display/copyright/4.2+Vapaa+muuntaminen
  https://tekijanoikeus.turre.com/remix-teos-vapaa-muunnelma-vai-jalkiperainen-teos/
  EPÄVARMUUS: tätä testiä ei ole sovellettu Suomessa julkaistussa
  oikeuskäytännössä nimenomaan tekoälykuvaan; analogia valokuva→maalaus
  -muunnoksiin (perinteinen "based on photo" -maalaus) on lähin tunnettu
  vertailukohta.
- **Infopaq C-5/08**: EU:n yhtenäinen originaliteettikynnys — teos on
  suojattu, jos se on "tekijänsä oma henkinen luomus" ("author's own
  intellectual creation"), ilmentää vapaita luovia valintoja. Koskee kaikkia
  teoslajeja, myös valokuvia.
- **Painer C-145/10** (1.12.2011): muotokuvavalokuva saa täyden
  tekijänoikeussuojan, jos siinä ilmenee valokuvaajan vapaat luovat valinnat —
  lavastus, asento, tausta, rajaus, kuvakulma, valaistus, kehitystapa/ohjelmisto.
  Tämä on keskeinen peruste sille, MITÄ osaa Commons-viitevalokuvasta laki
  suojaa (juuri nuo valinnat — ei rakennusta itseään).
  https://ipkitten.blogspot.com/2011/12/all-photos-are-created-equal-painer.html
- **Pelham (C-476/17, 2019; "Pelham II" C-590/23, 2026)**: alkuperäistapaus
  koski äänitteen valmistajan lähioikeutta (sample tunnistettavissa korvalla =
  luvanvarainen), ei sellaisenaan suoraan sovellu kuvaan, mutta
  Pelham II (2026) täsmensi InfoSoc-direktiivin 5(3)(k) "pastissi"-poikkeusta
  luovaan uudelleenkäyttöön yleisemmin. EPÄVARMUUS: Pelham-linjan soveltamista
  kuviin/tekoälykuviin ei löytynyt vahvistettuna — mainittu vain analogiana,
  ei suorana oikeuslähteenä kuville.
  https://www.jonesday.com/en/insights/2026/05/music-sampling-and-pastiche-cjeu-defines-the-scope-of-a-key-copyright-exception
- **Valokuvan lähioikeus (TekijäL 49 a §)**: suojaa KAIKKI valokuvat
  (myös ne, jotka eivät yllä teoskynnykseen) 50 vuodeksi kuvan valmistus-
  vuodesta. Yksinoikeus koskee sekä alkuperäistä että **muutettua**
  valokuvaa (kappaleen valmistus ja yleisön saataville saattaminen) — eli
  lähioikeus voi kattaa myös muunnelmia, ei vain identtisiä kopioita.
  https://tieteentermipankki.fi/wiki/Oikeustiede:valokuvan_suoja
  EPÄVARMUUS: kuinka pitkälle menevä "muutos" pysyy vielä lähioikeuden
  piirissä (esim. maalaustyylinen uudelleengenerointi) vs. muuttuu riittävän
  itsenäiseksi, ei ole yksiselitteisesti ratkaistu löydetyissä lähteissä.
- **EU AI Act, 50 artikla** (sovelletaan 2.8.2026 alkaen):
  - 50(2): tekoälyjärjestelmän **tarjoajan** on merkittävä synteettinen
    kuva/ääni/video/teksti koneluettavasti tunnistettavaksi tekoälyn
    tuottamaksi — tämä velvoite koskee ensisijaisesti mallin/palvelun
    TARJOAJAA (esim. OpenAI), ei suoraan peliä käyttävänä, ellei peli itse
    ole "provider" AI Act -määritelmässä (rajanveto epäselvä, riippuu miten
    tekoälyominaisuus tuodaan sovellukseen).
  - 50(4): "deepfake"-erityisvelvoite (harhaanjohtava, todelta näyttävä
    esitys oikeasta henkilöstä/paikasta/tapahtumasta) koskee ILMOITTAMISTA,
    kun sisältöä ei ole tarkoitettu taiteelliseksi/fiktiiviseksi — poikkeus:
    "evidently artistic, creative, fictional" -teoksille riittää maltillinen,
    teoksen nautintaa haittaamaton merkintä. Peli on fiktiivinen/opetuksellinen
    seikkailupeli, joten linjautunee tähän kevyempään poikkeukseen, mutta
    EPÄVARMUUS: onko historiallisen/todellisen rakennuksen kuvaus "esitys
    joka näyttäisi olevan aito" sovellettavassa mielessä — ei löytynyt
    suoraa ohjeistusta rakennuskuville.
  https://artificialintelligenceact.eu/transparency-rules-article-50/
  https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act

## 3. Käytännön kannat (Wikimedia Commons ym.)

- **Commons:AI-generated media**: keskittyy koulutusdatan tekijänoikeuteen ja
  tyylimatkimiseen ("prompting for a specific artist's style" = riski), sekä
  siihen, ettei valokuvaa saa AI:lla muokata ilman linkkiä alkuperäiseen.
  Sivu EI erikseen käsittele tapausta, jossa CC BY/BY-SA -kuva annetaan
  suorana syötteenä image-editille rakennuksen ulkonäön ankkuroimiseksi —
  merkittävä aukko. Yleisperiaate kuitenkin: AI-lopputulos, joka on
  "tunnistettavissa" tietystä lähdeteoksesta, käsitellään johdannaisena.
  https://commons.wikimedia.org/wiki/Commons:AI-generated_media
- **Commons:Derivative works**: johdannaisteos = pohjateokseen perustuva,
  jossa on riittävästi uutta luovaa sisältöä omaan suojaan; pelkkä
  jäljentäminen (esim. suora kopiointi) ei ole johdannainen vaan kopio.
  Valokuvaajan oma suoja ja kuvattavan kohteen mahdollinen erillinen suoja
  (esim. panoraamavapaus rakennuksille/julkisille veistoksille, maakohtainen)
  ovat erillisiä kysymyksiä.
  https://commons.wikimedia.org/wiki/Commons:Derivative_works
- Muiden julkaisijoiden "based on [tekijä], [lisenssi], [linkki]"
  -attribuutiokäytäntöä ei löytynyt tästä haussa vahvistettuna erillisenä
  yleisstandardina — tavanomainen CC-attribuutiokäytäntö (nimi, lisenssi,
  linkki, muutosmaininta "muokattu tekoälyllä lähteestä X") vastaa CC:n
  omaa attribuutio-ohjeistusta, mutta ei ole AI-tapauksia varten erikseen
  vakiintunut. EPÄVARMUUS.

## 4. Riskinarvio kolmelle vaihtoehdolle

**(a) Attribuutio kaikille BY/BY-SA-viitteille + BY-SA-tapauksissa lopputulos BY-SA:na**
- Matalin oikeudellinen riski. Attribuutio ("pohjana: tekijä, lisenssi,
  linkki") täyttää BY/BY-SA-vaatimuksen riippumatta siitä, katsotaanko
  lopputulos lopulta juridisesti adaptaatioksi vai ei — "conservative
  approach" jota CC itse suosittelee epävarmoissa AI-tapauksissa.
- BY-SA-periytyminen koskee CC:n oman lisenssitekstin mukaan vain kyseistä
  **adaptaatiota** (tätä yksittäistä kuvaa), ei koko sovellusta/peliä eikä
  muita saman pelin kuvia. Kuvan saa silti myydä/käyttää kaupallisesti — CC
  BY-SA ei estä kaupallista käyttöä, se vaatii vain: (1) attribuutio,
  (2) sama lisenssi (BY-SA) kyseiselle kuvalle, (3) linkki lisenssiin,
  (4) muutosmaininta. Käytännössä: jos peli myy pääsyn appiin, BY-SA-kuvan
  pitäisi silti olla saatavilla BY-SA-ehdoin (esim. joku voisi ladata ja
  käyttää sitä kuvaa uudelleen ilmaiseksi) — tämä on kaupallinen mutta
  kilpailullinen rajoite, ei kielto.
- EPÄVARMUUS: onko "conservative approach" ylimitoitettu, jos AI-kuva ei
  tosiasiassa toista viitekuvan suojattua ilmaisua (ks. kohta 1) — tällöin
  attribuutio on juridisesti tarpeeton mutta harmiton lisävaroitus.

**(b) Uudelleengenerointi vain PD/CC0-viitteillä tai ilman viitteitä**
- Poistaa BY-SA-periytymisriskin kokonaan ja yksinkertaistaa
  attribuutiokirjanpidon. Haittana: PD/CC0-kuvia ei välttämättä ole
  riittävästi/riittävän laadukkaita jokaisesta kohteesta, mikä voi heikentää
  kuvien historiallista/paikallista tarkkuutta ("ankkurointi").
- Matalin riski, mutta ei nolla: myös PD/CC0-merkintä Commonsissa voi olla
  virheellinen (väärä lisensointi uploaderin toimesta) — tarkistettava
  tapauskohtaisesti Commonsin lähdemerkinnät, ei vain lisenssitagi.

**(c) Juristin kanta**
- Kysyttävä nimenomaisesti: (i) katsotaanko *tämän* pelin konkreettinen
  workflow (2–4 kuvaa suorana image-edit-syötteenä, tavoite tyylillinen
  uudelleenmaalaus) TekijäL 4 §:n "vapaaksi muunteluksi" vai epäitsenäiseksi
  muunnelmaksi — erityisesti kun osa lähdekuvista on vain lähioikeuden
  (49 a §) piirissä eikä täytä teoskynnystä; (ii) BY-SA-periytymisen
  käytännön ulottuvuus kaupallisessa mobiilisovelluksessa (koskeeko vain
  kuvatiedostoa vai onko riski, että "sama lisenssi" -vaatimus tulkittaisiin
  laajemmin); (iii) EU AI Act 50(2)/(4) -merkintävelvoitteen soveltuminen
  pelin/kehittäjän rooliin (onko peli "provider").
- Sopiva asiantuntija: tekijänoikeuteen erikoistunut IPR-juristi (esim.
  toimisto joka on kirjoittanut IPRinfo-artikkeleita, ks. iprinfo.fi-lähteet
  yllä) tai maksuton/edullisempi kanava: **Tekijänoikeusneuvosto** (OKM:n
  alainen, antaa lausuntoja tulkintakysymyksiin — ei sitovaa oikeuskäytäntöä,
  mutta tunnustettu tulkintalähde Suomessa, ks. esim. Lausunto 2013:11 ja
  2019:6 valokuvista/luovista valinnoista). EPÄVARMUUS: ei löytynyt vielä
  julkaistua Tekijänoikeusneuvoston lausuntoa nimenomaan generatiivisesta
  tekoälykuvasta, joten kysymys olisi tältä osin ennakkotapaus.
  https://okm.fi/documents/1410845/3902147/Lausunto+2013-11...
  https://valtioneuvosto.fi/documents/1410845/12097139/Lausunto+2019-06...

## Yhteenveto suositukseksi

Turvallisin yhdistelmä nykytiedon valossa: (a) attribuutio + BY-SA-periytyminen
lopputulokselle aina kun viite on BY/BY-SA, koska se on halpa toimenpide eikä
estä kaupallista käyttöä; harkitse (b) siirtymistä PD/CC0-painotteisiin
viitteisiin niissä kohteissa missä laatu riittää; ja hanki (c) juristin/
Tekijänoikeusneuvoston kanta ennen laajaa tuotantoa, koska keskeinen
oikeuskysymys — riittääkö tyylillinen uudelleenmaalaus "vapaaksi
muunteluksi" TekijäL 4 §:ssä kun lähtökuva annetaan suoraan mallille
ankkuriksi — ei ole tässä selvityksessä löydettyjen lähteiden perusteella
julkisessa oikeuskäytännössä ratkaistu.
