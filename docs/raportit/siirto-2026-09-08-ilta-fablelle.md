# Siirtoprompti Fablelle — 8.9.2026 ilta (Suomen aikaa)

Kopioi tämä uuden session ensimmäiseksi viestiksi. Edellinen sessio
(Fable, päätoimittaja, session_01MQjFtJfBFzXPt5QRVkmpS1) päättyi
omistajan pyynnöstä resetiin ("tehdään sinulle reset ja jatketaan sitten
näiden tekstien perkaamista").

---

Olet **Fable**, Matkakirja-pelin päätoimittaja (repo ravelius/Matkakirja,
omistaja Sami). Lue ensin CLAUDE.md (ensimmäinen rivi: agentit VAIN
Opus ja Sonnet, parvina saa), docs/roolitus.md ja
js/tyohuone-raamattu.js:n 8.9.2026-merkinnät (uusimmat ylimpänä:
KOKO EUROOPPA KULKEE FOKUSVIRTAPAKKIEN KAUTTA; PULULLA YKSI KUPLA PER
KAUPUNKI; TAUSTAMUSIIKKI HILJEMMALLE JA RATTAAN SAADIN; IHMISEN MATKA:
ETELA-AFRIKKA VAIN KERRAN … AVAUS MUSTASTA; PULUN KAUPUNKITEKSTIT
UUSIKSI; PALLON KAUPUNKIPISTEET VAALEAMMIKSI; PULUN AANI HILJAISEMMAKSI
JA KUPLAT TYHJIKSI; PULUN ALUSTUKSET POIS + MATKAKIRJAN OTSIKKO;
FOKUSKARTAN KOHDEKAUPUNKI; KUVAN SUURENNOS; TIEDELIITTEEN ULKOASU;
PULUN HUUDAHDUS EI KESKEYTA LUKIJAA + KUPLAPINO 8 RIVIIN; LINSSIEN
HAMPURILAINEN; PULU JA KERTOJA EIVAT PUHU PAALLEKKAIN; ISOISAA EI
TUNNISTA 1873-PYSAKILLA; KELAUS SYTYTTAA VALOT; KEKSINTOLINSSIN
YLAPALKKI; KARUSELLI ON AIKASELAIN). Työskentelet itsenäisesti
omistajan ohjeilla; kysymykset AskUserQuestion-kortteina; ajat Suomen
aikaa (UTC+3); promptit koodilohkoina; vastaukset lyhyitä. Luo heti
tunneittainen postikierros-rutiini (edellinen trig_01GxA1kDvhNt2RpyBasQ4UQM
kuuluu vanhaan sessioon — poista se ja luo uusi: fetch claude/postilaatikko,
lue posti/kuvatoimitus.md kärjestä, vastaa posti/fable-vanha.md:n kärkeen,
poimi valmiit agenttityöt ja julkaise, ei salaisuuksia eikä sähköpostia).

## 0. Päivitys 8.9.2026 klo 21.40 Suomen aikaa (kolmas sessio, session_01Qpkrpg8NhoBUGTFjQf42f5)

- **main = v1703.** v1702 (PR #2174): pallon kaupunkipisteet (lattia vain
  pelaajan kaupungille, parallaksi pois) + Sofia–Varsova + Raamattu-
  merkinnät (yläraja 400 ja kooste-erä; pisteiden lattia; parallaksi).
  v1703 (PR #2175): osion 4 toimeksianto TEHTY — 35 kaupungin matkakirjat
  ja kuplat uusiksi, 20 läntistä kaupunkia sai ensimmäisen kuplansa
  (maadoitus pois), Venetsia romanssi kuudella kuplalla EHDOTUKSENA,
  Tampereen ja Riian huudahdukset pois (jäljellä 6). Testit 2339/0.
- **Kooste toimitettu omistajalle** (SendUserFile,
  eurooppa-matkakirja-ja-pulu-v4.md; sama syntyy `node
  tools/dumppaa-eurooppa.mjs`). SEURAAVAKSI: omistajan korjaukset
  koosteesta kaupungin nimellä → pakkeihin → julkaisu. Äänet (pulu +
  luennat) generoimatta, odottaa lupaa.
- Postikierros-rutiini: trig_014arWFjZrfk92tXBNbpauNT (tunneittain :56 UTC).
- Havainto (Opus-agentti): js/liviapuhe.js livianKorostetutKaupungit
  katsoo vain avaimen olemassaoloa, ei tiivistettä → kaupungit, joiden
  kupla on muuttunut ja siksi hiljainen, näkyvät kartalla yhä "valmis
  kuunneltavaksi". Korjaantuu, kun äänet generoidaan; ei kosketa ennen.
- Vanhojen läntisten kaupunkien `pollo.teksti` (vaiheen huomio) jäi
  ennalleen; jos sama linjaus kuin Ateenassa (poistettiin), erillinen työ.

## 1. Tila (päivitetty 8.9.2026 klo 20.50 Suomen aikaa, toinen reset)

- **main = v1701** (PR #2173): musiikki hiljemmalle ja rattaan säädin
  ohjaa kaikkea musiikkia (js/musiikkivalitsin.js, kehittäjän oletus
  2 → 1); kuusi kevyttä fokusvirtapakkia (Kreeta, Sisilia, Islanti, Alpit,
  Lappi, Tromssa); Ateena uuteen kulkuun; europe-saapumiset arkistoon
  (docs/arkisto/europe-saapumiset-2026-09-08.js.txt); pululla yksi kupla
  per kaupunki (18 kaupunkia). Päivän aiemmat julkaisut v1686–v1700
  (keksintölinssin yläpalkki, karuselli, hampurilaisvalikko, Tiedeliite,
  kohdekaupunki suurempi lähikuvassa, pulun alustukset pois + matkakirjan
  otsikko "Paikka, aika" + tunnelmarivi, Ihmisen matkan uusi tarina ja
  yhtenäinen v3-luenta aikaleimoineen, avaus mustasta ruudusta).
- **Haara claude/matkakirja-paatoimitus-u3vejq** on mainin (v1701)
  päällä ja siinä on JULKAISEMATTA wip-committeja (pushattu): matkakirjan
  uudet tekstit Sofia, Bukarest, Budapest, Wien, Praha (huudahdus pois),
  Krakova, Varsova — kaikki omistajan hyväksymiä, ≤400 merkkiä, luenta
  merkitty VANHENTUNEEKSI; tools/dumppaa-eurooppa.mjs (`node
  tools/dumppaa-eurooppa.mjs [kaupunki-id …]` tulostaa paikkarivin,
  tekstin pituuden ja pulun kuplan). Julkaise v1702:na alla olevan
  agenttityön kanssa.
- **Opus-agentin työ VALMIS ja poimittu tähän haaraan** (cherry-pick
  418d3696, testit 2352/0): pallon kaupunkipisteet — (1) omistaja: *"tällä zoom tasolla kaupunki pallot
  jäävät liian isoiksi"* → lattia vain pelaajan kaupungin pisteelle,
  muut 7 px joka zoomilla (js/pallolauta/lauta.js kohdekaupunginMitat,
  pisteenSade, tahdistaPisteidenKoko); (2) omistaja: *"kaupunkien
  pisteet eivät myöskään pysy paikallaan, vaan liikkuvat panoroitaessa"*
  → parallaksi, pointAltitude 0.003 = 0,3 yksikköä; levy alemmas +
  mittaus Chromiumilla. Julkaise v1702:na heti (ei enää worktreetä). Kirjaa molemmat Raamattuun
  (omistajan sanat yllä sanatarkasti, 8.9.2026 ilta).
- Julkaisukaava: `git fetch origin main`; `node tools/uusi-versio.mjs
  "<≤60 merkkiä, ei loppupistettä, ei tähti-sanaa>"`; rules+sw-testit;
  `node tools/build-standalone.mjs`; commit; push; PR (mcp github);
  CI "testit" (curl check-runs, token `git config --get
  http.https://github.com/.extraheader`); squash-merge expectedHeadSha
  40 merkkiä; `git checkout -B claude/matkakirja-paatoimitus-u3vejq
  origin/main && git push --force-with-lease`. Testit:
  `NODE_USE_ENV_PROXY=1 node --test tests/*.test.mjs` taustalle lokiin,
  until-silmukka lukee EXIT-riviä.

## 2. Kesken / odottaa omistajaa

- **TEKSTIEN PERKAUS — ALOITA HETI RESETIN JÄLKEEN ILMAN ERI KOMENTOA**
  (omistaja 8.9. klo 21.00: *"kun tehdään reset niin osaat sitten heti
  lähteä kirjoittamaan kaikki loput uusiksi euroopassa ilman eri komentoa
  … ja toimitat sitten lopuksi koosteen teksteistä md tiedostona"*).
  Koko toimeksianto vaatimuksineen on osiossa 4 alla. Ennen tekstityötä
  poimi ja julkaise vain osion 1 agenttityö (v1702); tekstit julkaistaan
  omana versiona koosteen toimituksen yhteydessä.
- **Pulun äänet generoimatta** (omistaja: ei ennen lupaa): muuttuneet
  kuplat hiljaisia (LIVIAN_AANITETYT-tiiviste). Lupa tullessa: workflow
  generoi-pulu.yml (ääni yjJ45q8TVCrtMhEKurxY), tekstit ilman numeroita.
  Muutettujen kaupunkien matkakirjaluennat generoitava uudelleen
  (generoi-luennat; katso ÄÄNITE VANHENTUNUT -merkinnät packeissa).
- **Kuvatoimitus** (posti/kuvatoimitus.md kärki yhä 7.9. 13:58 UTC):
  odottaa 1873-pysäkin isoisäkuvia (tilaus 8.9. 08:30 UTC), 16 kaupungin
  nostoja, Nuuk/Anchorage, 20 Ihmisen matkan kuvituskuvaa, 6 kohtaamiskuvaa.
- Session 2 (lehdet-haara claude/lehdet-2026-09-07-ilta, kärki bae5c9bc)
  poimittu; jäljellä Puerto Montt+João Pessoa, São Luís+Ouro Preto,
  Kimberley+Managua; kuvitukset Dili, Alice Springs, Iqaluit, Santa Fe.
- Pieniä avoimia: Ihmisen matkan savuke `savuke-aikajana --linssi
  ihmisen-matka` vanhentunut; Ihmisen matkan nostoille ei lyhyitä
  kuvatekstejä; tasokartan (linssin alla) kohdekaupungin lattia tekemättä;
  vanha PR #1455 (julisteet v1031) roikkuu — ei kosketa.
- **Konteksti-ikkunasta (omistajan kysymys 8.9. ilta):** ikkuna kasvaa
  Fablen omista luvuista (isot pelitiedostot, kaappaukset, transkriptin
  haku), ei pelistä. Uudessa sessiossa: lue vain tämä tiedosto +
  Raamatun 8.9.-merkinnät, älä koko tiedostoja; delegoi koodin luku
  agenteille.
## 3. Liite: kuuden pakin ja Ateenan kaanonitekstit (Fable 8.9.2026)

kreeta — paikkarivi: "Kreeta, huhtikuussa 1873. Lämmintä; vuorilla vielä lunta." Teksti: "Hanian satamassa venetsialainen majakka vartioi turkkilaista kaupunkia, ja kummankin liput ovat haalistuneet samaan väriin. Ratsastin sisämaahan kukkulalle, jonka alla sanotaan olevan vanhan kuninkaan palatsi. Sanotaan, että täällä asui hirviö labyrintissa. Minä näin vain palatsin, jossa on liikaa käytäviä — sen verran kuin kiviä maasta pilkotti. Paimen sanoi, että koko kukkula on onttoa. Uskon häntä enemmän kuin tarua." Pulu: "Se palatsi kaivettiin esiin isoisän jälkeen. Ja vuorilla on yhä lunta keväällä."

sisilia — "Palermo, toukokuussa 1873. Kuumaa; Etna savuaa horisontissa." Teksti: "Torilla kala myydään laulaen, ja kauppias suuttui, kun en osannut laulaa vastaan. Tähän saareen ovat tulleet kreikkalaiset, roomalaiset, arabit, normannit ja espanjalaiset, ja jokainen on jättänyt jotain lautaselle. Sisilia on ollut kaikkien maa eikä kenenkään. Siksi sen keittiö on paras Välimerellä. Sitruunatarhat kasvavat mustassa laavamullassa, ja vuori savuaa niiden yllä kuin ei olisi vielä päättänyt." Pulu: "Etna savuaa yhä, ja sen rinteillä asutaan silti. Torilla lauletaan edelleen."

islanti — "Reykjavik, elokuussa 1873. Tuulista; ei yhtään puuta." Teksti: "Maasta nousee höyryä, vaikka mikään ei pala. Ratsastin päivän Thingvellirin rotkoon, jossa kansa on kokoontunut käräjille ennen kuin Euroopassa oli yhtäkään kuningasta nykyisistä suvuista. Mittasin kuuman lähteen, kunnes lämpömittarini suuttui. Saari, jossa on tulivuoria ja parlamentti. Parlamentti on niistä vanhempi. Kaupungissa on pari sataa taloa ja satama, jonka laivat tuovat puutavaran ja viemät kalan." Pulu: "Kaupunki kasvoi, ja puitakin on istutettu. Geysirin naapuri purkautuu yhä tasaisin välein."

alpit — "Grindelwald, heinäkuussa 1873. Kylmää keskellä kesää; ilmanpuntari korkealla." Teksti: "Vaunut kiipesivät laaksoa ylös niin jyrkästi, että laukkuni liukui lattialle, ja vastarinteeltä alppitorven ääni ylitti koko laakson. Hotellin portaille asti ulottuu jäätikkö, jonka reunalta lapset myyvät jääpaloja englantilaisille. Opas sanoo sen liikkuvan; en nähnyt. Toisella puolen vuoria porataan tunnelia suoraan vuoren läpi, ja miehet sanovat, että juna kulkee siitä ennen kuin heidän lapsensa ovat aikuisia." Pulu: "Jäätikkö on vetäytynyt kauas portailta. Tunneli valmistui, ja sen alla on nyt vielä pidempi."

lappi (Rovaniemi) — "Rovaniemi, syyskuussa 1873. Ensimmäinen ruska; yöllä revontulet." Teksti: "Ajoimme päivän jokea ylös, ja jossain kohtaa metsä madaltui tunturiksi. Kaupan ovella puhuttiin kolmea kieltä, ja kaikki puhuivat kullasta. Ivalojoen kultakaivannoilla yö on niin valoisa, ettei kukaan muista lopettaa — niin kertoi mies, joka oli tullut sieltä tyhjin käsin ja aikoi palata. Poroja kulki tien yli kuin tie ei kuuluisi kenellekään. Yöllä taivas syttyi vihreänä, eikä kukaan paikallinen edes katsonut ylös." Pulu: "Porot kulkevat yhä samoja reittejä. Revontulia tullaan nyt katsomaan kaukaa."

tromssa — "Tromssa, heinäkuussa 1873. Aurinko ei laske; satamassa hylkeenpyytäjiä." Teksti: "Nousin laiturille keskellä kirkasta yötä: kello oli yksi, ja aurinko roikkui vuorten yllä kuin joku olisi unohtanut sammuttaa sen. Satamassa purettiin hylkeennahkoja ja jääkarhuntaljoja laivoista, jotka olivat käyneet Huippuvuorilla. Puodissa kuulee norjaa, suomea ja venäjää samassa lauseessa. Tätä sanotaan Pohjolan Pariisiksi. Kysyin miksi, ja kauppias osoitti hattuaan." Pulu: "Aurinko ei laske vieläkään kesällä. Ja lempinimi Pohjolan Pariisi on yhä käytössä."

ateena (uusi kulku, hyväksytty 8.9. klo 19.10) — "Ateena, heinäkuussa 1873. Seesteistä; ilmanpuntari korkealla." Teksti: "Torilla ei tänään tingitty oliiveista. Siellä puhuttiin miehestä, joka oli löytänyt Troijan kullan. Puoli toria piti häntä valehtelijana, toinen puoli nerona, eikä kukaan ollut nähnyt kultaa omin silmin. Akropolis seisoi kaiken yllä niin kuin olisi kuullut saman jutun ennenkin. Kirjoitan tämän muistiin, koska molemmat puolet voivat olla oikeassa yhtä aikaa." Pulu: "Kulta oli aitoa, mutta ei Troijan kuninkaan. Löytäjän talo Ateenassa on nyt museo."

### Venetsia — Fablen ehdotus omistajalle (8.9.2026 ilta, EI vielä hyväksytty)

Matkakirja (396 merkkiä): Kaupunki, jossa kadut ovat vettä ja portaat päättyvät mereen. Markuksen torilla pulut ruokitaan kaupungin viljalla kello kahdelta, ja ne tietävät sen kelloa paremmin. Kirkon hevoset ovat ryöstösaalista Konstantinopolista; täällä sanotaan suoraan, että puoli kaupunkia on tuotu muualta, ja sanotaan se ylpeänä. Iltapäivällä vesi nousi torille, ja kauppiaat nostivat tavaransa penkeille kiroamatta.

Pulun kuplat (kuusi, poikkeus yhden kuplan sääntöön):
1. Niin, niin. Ja sinä sanoit, että laguunin yllä ilma kantaa paremmin. Sanoitko? Sanoit.
2. Minä en tavallisesti istu kenenkään kanssa lyijykatolla. Minulla on suku, tehtävä ja aikataulu.
3. Mutta se, miten sinä käännät päätä kun kellot lyövät…
4. …hetkinen. Fogg. Sinä olet siinä. Tämä on Venetsia. Minä olen töissä.
5. Selvennys: Markuksen torilla on tuhansia puluja, eikä niitä saa enää ruokkia.
6. Yksi niistä on aivan tavallinen. Aivan tavallinen. Mennään.

## 4. Toimeksianto: Euroopan matkakirja- ja pulutekstit uusiksi (omistajan vaatimukset 8.9.2026)

Tee tämä heti resetin jälkeen ilman eri komentoa. Omistaja on käynyt
seitsemän kaupunkia läpi kanssani yksi kerrallaan ja hyväksynyt ne;
loput kirjoitetaan nyt yhtenä eränä samoilla säännöillä, ja omistaja
katsoo ne koosteesta. Kysymyksiä ei tarvitse esittää kaupunki
kerrallaan.

### Mitä kirjoitetaan

Kaikki 45 Euroopan kaupunkia (js/packs/europe.js; pakit
js/packs/fokusvirta-<id>.js). VALMIIT, ÄLÄ KOSKE: sofia, bukarest,
budapest, wien, praha, krakova, varsova (omistaja hyväksyi 8.9.),
vilna (kupla omistajan valinta; teksti 401 → lyhennä yhdellä merkillä),
ateena (uusi kulku v1701). Venetsia: romanssi (osio 3:n loppu) odottaa
omistajan sanaa — jos sanaa ei ole tullut, vie ehdotus sellaisenaan
peliin ja merkitse koosteeseen "ehdotus". Kaikki muut 35 kaupunkia
kirjoitetaan uusiksi: matkakirjan teksti JA pulun kupla. Kaupungit,
joilla ei ole pulun kuplaa lainkaan (lontoo, istanbul-kommentti on,
dublin, edinburgh, pariisi, marseille, lissabon, madrid, barcelona,
granada, sevilla, amsterdam, berliini, venetsia, firenze, rooma,
dubrovnik, tukholma, oslo, bergen, kobenhavn), SAAVAT yhden kuplan —
omistajan periaate "yksi kupla per kaupunki" (Raamattu PULULLA YKSI
KUPLA PER KAUPUNKI); jos omistaja ei halua niitä, hän karsii
koosteesta. Nykytila: `node tools/dumppaa-eurooppa.mjs` (kaikki) tai
`node tools/dumppaa-eurooppa.mjs wien praha` (esimerkit hyväksytyistä).

### Matkakirjan teksti (isoisän päiväkirja 1873)

- **Yläraja 400 merkkiä** (omistaja 8.9.: *"mikä on yläraja
  matkakirjan tekstille? … näytä aina myös matkakirjan pituus
  merkkeinä"*). Hyväksytyt ovat 362–392 merkkiä; alle 300:n tekstit
  (lontoo 246, pariisi 216, madrid 199, berliini 212, rooma 234,
  dubrovnik 193, sarajevo 232, helsinki 215, tallinna 189, tukholma 212,
  kobenhavn 173, istanbul 250) LAAJENNETAAN samaan mittaan.
- Paikkarivi muodossa "Kaupunki, kuukaudessa 1873. Tunnelmalause."
  (otsikko = ensimmäinen virke, tunnelmarivi kursiivilla = toinen; js/ui.js
  matkakirjanOtsikko). Kuukausi reitin mukaan, säilytä nykyinen.
- Isoisä kirjoittaa itselleen, EI oleta lukijaa (Bukarest-korjaus:
  ei "sinä"-puhuttelua, ei selittelyä lukijalle).
- Konkreettista, nähtyä ja kuultua: hinnat, ihmiset, sää, ruoka, äänet,
  yksi historiallinen havainto jonka voi tarkistaa (1873-tilanne, ei
  anakronismeja). Ei "liian vaikeita tai hienoja lauseita" (omistaja);
  epäselvä kielikuva jätetään pois (Wien: *"yksi kuppi, sanomalehti ja
  koko ilta"* oli omistajasta epäselvä → pois).
- Lyhyitä päälauseita, kuiva huumori sallittu, ei paatosta. Ei
  aarrevihjeitä eikä lehden kohteiden nimeämistä. Ei numeroita, joita
  lukija ei tarvitse; vuosiluvut sanoina jos tarpeen.
- Kaanon: docs/tarina.md, docs/isoisan-raamattu.md (isoisä jää
  arvoitukseksi; vaalea pellavapuku, hattu, arkku; kirjekyyhky Livia
  mukana). Älä riko muiden pakkien mainintoja.

### Pulun (Livia) kupla — yksi per kaupunki

- `pollo.kommentti: ['<kupla>']`, **≤95 merkkiä**, testi
  tests/fokusvirta.test.mjs vartioi. Huudahdus (`pollo.huudahdus`)
  säilyy vain 8 kaupungissa (sofia, bukarest, budapest, krakova,
  pietari, tampere, tallinna, riika) — ei lisätä uusiin; omistaja:
  välikommentti *"ei kannata olla kuin osassa kaupungeista"*; pietari,
  tampere, tallinna, riika: pidä jos se tuo jotain, muuten poista kuten
  Praha (silloin LIVIAN_KAUPUNKILAHTEET-rivi [VARATTU, VARATTU,
  'kommentti'], generoi-pulu.mjs TAGIT ilman '-2', LIVIAN_AANITETYT-avain
  '<id>-2' pois, tests/fokusvirta.test.mjs huudahdusten määrä).
- Sapluuna (omistaja valitsi Vilnan: *"tämä tiivis kahden asian juttu
  oli paras: Vanhakaupunki on nyt maailmanperintöä. Ja se metsä joka
  suuntaan pitää yhä paikkansa."*): KAKSI virkettä, kaksi asiaa —
  mikä kaupungissa on NYT TOISIN kuin isoisän aikana ja mikä on YHÄ
  ENNALLAAN; avaa kaupungin nykytilaa. Yksinkertainen kieli, ei
  numeroita eikä vuosilukuja (ääni lukee ne väärin), ei vihjeitä
  lehden kohteisiin, ei "kääk"-täytettä, ei alustusta (alustus vain
  Ateenassa). Livian ääni: kuiva, kiireinen, rehellinen, ylpeä
  kirjekyyhkysuvustaan, isoisälle uskollinen.
- Muuttunut kupla on hiljainen kunnes ääni generoidaan
  (js/liviapuhe.js LIVIAN_AANITETYT-tiiviste) — ÄLÄ generoi ilman
  omistajan lupaa. Uuden kuplan kaupungille lisää LIVIAN_KAUPUNKILAHTEET-
  rivi ja TAGIT-rivi mallin mukaan (katso Wien/Praha), ja päivitä
  tests/livia-aani.test.mjs ja tests/pollo.test.mjs jos ne laskevat
  rivejä.

### Merkinnät koodiin ja työtapa

- Jokaiseen muutettuun pakkiin tekstin eteen `/* KAANON UUSIKSI (Fable,
  omistaja katsoo koosteesta 9.9.2026). N merkkiä (yläraja 400). */` ja
  luenta-kentän kohdalle `/* ÄÄNITE VANHENTUNUT (pvm): generoitava
  uudelleen tästä. */` (malli: js/packs/fokusvirta-wien.js).
- Kirjoita tekstit itse (Fable = tarina); tekninen liitos (liviapuhe,
  TAGIT, testit) voi mennä Opus-agentille yhtenä eränä. Testit:
  `NODE_USE_ENV_PROXY=1 node --test tests/fokusvirta.test.mjs
  tests/livia-aani.test.mjs tests/pollo.test.mjs` ja lopuksi kaikki.
- Commitit wip-tyyliin haaraan, julkaisu julkaisukaavalla omana
  versiona ("Euroopan matkakirjat ja pulun kuplat uusiksi").
- **Kooste omistajalle:** `node tools/dumppaa-eurooppa.mjs >
  <scratchpad>/eurooppa-matkakirja-ja-pulu-v4.md` — jokaisesta
  kaupungista paikkarivi, teksti pituuksineen, pulun kupla (ja
  huudahdus jos on); Venetsia merkitty ehdotukseksi. Toimita
  SendUserFile-työkalulla md-tiedostona (ei saapumistekstejä eikä
  nostoja — omistaja: *"voit jättää Saapumisteksti ja Nosto pois"*).
  Omistaja liittää loput itse ja antaa korjaukset koosteesta.
