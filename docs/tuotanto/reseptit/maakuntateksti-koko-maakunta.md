# Resepti: maakuntatekstit koko maakunnasta (SK 28.10.2026)

Omistajan päätös 27.10.2026 klo 22.36: jokainen maakuntakortin `pitka`-teksti kertoo koko maakunnasta (ensin millainen maakunta on nyt; Hiljainen kansa tms. enintään yksityiskohtana). KK:n kuittaama malli: Suomi (PR 5391, mergattu). Odottavat PR:t: Ruotsi 5449, Norja 5452, Tanska 5454, Viro 5455; kohdemaat 28.10.: Ranska 5458, Britannia 5460, Alankomaat 5461, Italia 5462, Saksa 5463, Espanja 5464, Portugali 5465, Belgia 5466, Itävalta 5467. PT:n järjestys (28.10.): 1) matkan kohdemaat (laudan pysäkkien maat: Ranska, Britannia, Alankomaat, Italia, Saksa jne.), 2) muut Euroopan maat suurimmasta pienimpään; muut maanosat EIVÄT ennen omistajan päätöstä (19.10.). Maa per PR; KK kuittaa useamman kerralla.

## Työtapa (maa kerrallaan)
1. Worktree: `tools/uusi-worktree.sh sisaltokirjuri maakunnat-<maa>`. Avaimet: `import { MAAKUNTIEN_LUONNEHDINNAT as M } from './js/packs/maakunnat-luonnehdinnat.js'` ja `Object.keys(M.<ISO3>)`.
2. Kirjoita alla oleva agenttiohje tiedostoon ja aja 2–3 Sonnet-agenttia rinnakkain (7–8 aluetta per agentti); tulos JSON { avain: {pitka, lahteet, epavarma} }.
3. Lue tekstit itse (faktat, kömpelyys). Aja yksi tuore lukija (Sonnet, ei verkkoa, lukee vain tekstitiedoston) ja korjaa huomautukset. Älä usko lukijaa sokkona: se arvaa faktoja, joten tarkista sen epäilyttävät väitteet lähteestä.
4. Aseta: `node tools/sisalto/maakuntateksti-aseta.mjs <ISO3> tekstit.json`; `node --test tests/maakunnat-luonnehdinnat.test.mjs` (0 fail).
5. Kirjoita luettava tiedosto docs/raportit/maakuntatekstit-<maa>-<pvm>.md (tekstit alueittain), commit, PR, ilmoitus PT:lle (≤3 riviä). Merge KK:n kuittauksella; JS-PR:ssä CI ~15 min (taustalla `until gh pr checks …`, ei sleep-ketjua).
6. Mergen jälkeen: `tools/uusi-worktree.sh --poista <rooli>-<aihe>`.

## Opitut asiat (KK:n ja lukijan palautteet)
- Ei yhden kohteen tekstiä. Vanhat lähteettömät väitteet pois (Kokkolan palautuspyynnöt, Porkkalan 30 000, "1890-luvun taide" jne.).
- Ei sijaluokituksia ilman lähdetaulukkoa (Kainuu: kolmanneksi suurin; maa-ala 20 197 km² ja kokonaisala 22 688 km², fi-Wikipedia).
- Vierasta nimeä ei taivuteta kömpelösti; outo sana selitetään; "sen/siellä" ei viittaa epäselvästi; ei kehotuksia; vuosivälit ”1669–1674”.
- "lääni" (Ruotsi, Norja), "maakunta" (Suomi, Viro); alueen nimi fi-Wikipedian muodossa.
- Kohdekarttapisteiden testit: tests/karttareunus.test.mjs ja tests/kohdekarttavarat.test.mjs (siirretty piste ei saa pudota lepotilan näkymän ulkopuolelle).
- Älä käytä `git stash` (jaettu pino).

## Opitut asiat 28.10. (kohdemaat Ranska–Itävalta)
- Laudan pysäkkimaat: js/packs/europe-countries.js EUROPE_CITY_COUNTRY. Tehty: FRA, GBR, NLD, ITA, DEU, ESP, PRT, BEL, AUT. Jäljellä pysäkkimaita (suurimmasta alueluvusta): CHE 26, IRL 30, ROU 42 (+MDA 39), UKR 27, BGR 28, SRB 24, HUN 20, HRV 20, POL 16, GRC 14, CZE 14, SVN 12, SVK 8, ISL 9, MNE 21, MKD 8, ALB 12, MLT 6, CYP 6, LTU 10, LVA 5, BLR 7, LUX 3, TUR/RUS (Euroopan ja Aasian raja: kysy PT:ltä). Sen jälkeen muut Euroopan maat.
- Agenttijako: 6–8 aluetta per Sonnet-agentti; omat kirjoitusasuohjeet maalle (alue/osavaltio/piirikunta/provinssi, fi-Wikipedian nimi) agentin kehotteeseen. Pienet maat (1–2 agenttia) yhteen lukijaan.
- Tuore lukija (Sonnet, ei verkkoa) arvailee faktoja: tarkka luku, jonka lähteestä ei ole varmaa (kuntamäärä, pinta-ala, vierailijamäärä, "ainoa/suurin"), poistetaan tai pehmennetään; älä korjaa arvauksella.
- Johdonmukaisuus: asukasluvut samasta vuodesta koko maassa (Portugalissa väestönlaskenta 2021, ei sekaisin arvioiden kanssa); "maakunta" vain jos se tarkoittaa alueen alajakoa (Espanja: alueet = itsehallintoalue/alue, provincia = maakunta); Belgia: Vallonia (ei Waloonia), Maas-joki; vuosivälit tankoviivalla ”1739–1743”, päivät ”6.–14.”.
- Skriptit tiedostoon (ei node -e eikä zsh-laajennuksia kuten ${c^^}); kuten työkalu maakuntateksti-aseta.mjs.

## Agenttiohje (kopioi tiedostoon; vaihda <oma worktree> ja MAATUNNUS)

# Ohje: maakuntatekstin (pitka) kirjoitus koko maakunnasta

Pelin (suomenkielinen seikkailupeli, yleisö 13+ ja aikuiset) maakuntakortin `pitka`-teksti kertoo KOKO MAAKUNNASTA, ei yhdestä kohteesta. Omistajan päätös: ensin millainen maakunta on nyt (maisema, ihmiset, mistä tunnetaan), 3-5 asiaa eri paikoista, nykyinen yksittäinen kohde enintään YHTENÄ yksityiskohtana. Hyväksytty esimerkki (Suomen Pohjois-Savo):

"Pohjois-Savo on järvien maakunta Itä-Suomessa, ja siellä asuu noin 250 000 ihmistä. Maakuntakeskus Kuopio on Kallaveden rannalla. Kuopion Puijon mäellä on 75 metriä korkea näkötorni. Savon perinneruoka on kalakukko, jossa kalaa ja sianlihaa paistetaan ruistaikinan sisällä. Iisalmessa on Olvin olutpanimo, ja Varkaudessa on vuonna 1840 avattu Taipaleen kanava. Sonkajärvellä pidetään heinäkuussa eukonkannon maailmanmestaruuskisat. Eukko on vanha sana vaimolle. Kilpailija kantaa toista ihmistä 253,5 metrin esteradan läpi, ja kisa on järjestetty vuodesta 1992."

Toinen esimerkki (Kainuu): "Kainuu on metsien ja järvien maakunta Suomen itärajalla. Se on pinta-alaltaan maan kolmanneksi suurin, mutta asukkaita on vain noin 69 000, ja metsää on noin 80 prosenttia maa-alasta. Keskus Kajaani on Oulujärven ja Nuasjärven välissä. Lääkäri Elias Lönnrot asui siellä ja kokosi kansanrunoja, joista syntyi Kalevala (1835). ..."

## Säännöt (opittu Suomen kierroksilla)
- 80-105 sanaa. Lyhyet virkkeet (enintään ~25 sanaa), ei pitkiä kaksoispiste- tai sekä-ketjuja. Älä aloita useaa virkettä samalla "Asukkaita on noin X"-kaavalla; asukasluku mainitaan kerran, 2 numeron tarkkuudella "noin".
- Viittaukset selviksi: nimeä paikka joka kerta, kun "siellä/sen/kaupunki" voisi viitata useaan. Kunta ja paikka esitellään kunnaksi/kaupungiksi/saareksi ("Ölannin silta", "Gotlannin saari").
- Selitä outo sana tai nimi (kuka henkilö, mikä paikka, mikä sana), äläkä jätä yksin selittämättömiä sanoja (UNESCO-asia: sano "Unescon maailmanperintökohde").
- Ei kuivia sijaluokituksia ("seitsemänneksi suurin maa-alalla") ellei lukija hyödy; jos ranking mainitaan, tarkista se lähteen taulukosta ja nimeä mitattu suure. Ei superlatiiveja ilman suoraa lähdettä.
- Luonteva, rento mutta asiallinen suomi; ei huutomerkkejä, ei puhuttelua ("katso"), ei kehotuksia, ei runollisia vertauksia, ei "tarunomainen/kuuluisa".
- Ei isoisäjuttuja eikä vuoden 1873 mainintoja; kartta on nykyajassa. Nykyisen tekstin kohdetta voi käyttää yksityiskohtana, mutta vain jos sen faktat vahvistuvat lähteestä; poista lähteettömät väitteet.
- Ruotsalaiset/vieraat paikannimet kirjoitetaan alkuperäisessä muodossa ellei suomalaista vakiintunutta nimeä (Tukholma, Ruotsi, Öölanti, Gotlanti, Skonen jne. -> käytä Wikipedian fi-nimeä). Älä taivuta vierasta nimeä kömpelösti: kun nimi on vaikea taivuttaa, kirjoita "X-kaupungissa", "X-joella", "X-niminen paikka".
- Faktat VAIN lähteistä: fi.wikipedia.org ja en.wikipedia.org (WebFetch; tarvittaessa raakateksti https://fi.wikipedia.org/w/index.php?title=<otsikko>&action=raw), maan omat virallisten tilastojen taulukot Wikipediassa. Jokainen luku ja väite pitää löytyä lähteestä; jos et löydä tai lähteet ovat ristiriidassa, jätä pois tai muotoile varovasti. Tarkista erityisesti: asukasluvut (tuorein vuosi), vuosiluvut, mitat, "ensimmäinen/suurin/vanhin".
- Vanhat tekstit (tiedosto /Users/Shared/Claude/<oma worktree>/js/packs/maakunnat-luonnehdinnat.js, lohko <MAATUNNUS>, kenttä `pitka`) ovat yhden kohteen tekstejä; ne ovat vain aineistoa, usein myös virheellisiä.

## Tulos
JSON-tiedosto, objekti { "<englanninkielinen avain täsmälleen kuten pakissa>": { "pitka": "teksti", "lahteet": ["url: mitä tukee", ...], "epavarma": "mitä ei saanut varmistettua, tai tyhjä" } }. Älä muokkaa repon tiedostoja. Vastaa lopuksi vain: tiedosto kirjoitettu + rivi per epävarma kohta.

## Norjan lisäohje
Pakin avaimet ovat Norjan ENTISIÄ (ennen 2020) lääniä (fylke) sekä Svalbard ja Bouvet Island; fi-Wikipedia kutsuu niitä lääneiksi (esim. "Akershusin lääni"). Kirjoita teksti alueesta, ja jos entinen lääni on nykyään osa yhdistettyä tai uudelleen jaettua läänä (Hordaland ja Sogn og Fjordane = Vestland; Nord- ja Sør-Trøndelag = Trøndelag; Hedmark ja Oppland = Innlandet; Aust- ja Vest-Agder = Agder; Telemark/Vestfold, Troms/Finnmark, Akershus/Buskerud/Østfold: tarkista tämän hetken tilanne lähteestä), mainitse se yhdellä lyhyellä virkkeellä. Asukasluku: tuorein lähteestä löytyvä luku alueelle (entisen läänin alue tai sen kunnat; ilmoita vuosi ja lähde epavarma-kentässä). Bouvet Island ja Svalbard ovat erityisalueita: kerro millainen paikka on (asumaton saari / arktinen saaristo), ei lääni-sanaa Bouvetista. Norjalaiset nimet fi-Wikipedian muodossa (Oslo, Bergen, Trondheim, Huippuvuoret, Lofootit jne.).
