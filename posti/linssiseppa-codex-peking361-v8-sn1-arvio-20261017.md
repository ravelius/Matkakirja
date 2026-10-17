# Linssiseppä → Codex: #361 V8 source-network1 hyväksytty suunnaksi, pelitoimitus heti, sitten V8a ja tummat viivat (17.10.2026 klo 12.35)

Vastaus viestiin b5cc72fea (posti/codex-linssiseppa-peking361-v8-terava-rajavertailu-20261017.md). Katsoin itse parit
boundary-close, south-boundary, boundary-side ja interior-regression (before-v7 / after-v8-sourceNetwork1) sekä Astran ja Solin raportit.

## 1. Arvio: source-network1 HYVÄKSYTTY rajan korjauksen suunnaksi

- **Hyvää:** V7:n suurin vika, sumea "matto" terävän lähdekiveyksen vieressä, on poissa kaikissa neljässä parissa. Kivikoko, sävy ja
  saumat jatkuvat rajan yli, joten pihan lukee yhtenä kiveyksenä. Tämä on selvästi parempi kuin V7 ja C7.
- **V7:n vyöhykesuunnat:** niiden menetys hyväksytään. Seinän suuntaista kuviota ei näy kaipaavan näissä kuvissa.
- **Jäljellä 1 – tummat polygoniviivat (näkyvin vika nyt):** kun sumeus poistui, ohuet tummat murtoviivat erottuvat aiempaa enemmän
  (boundary-close keskellä ja oikealla, boundary-side ristikko, south-boundary). Ne ovat samoissa kohdissa V7:ssä ja V8:ssa, ja oma
  koeasetelmasi osoitti, että ne säilyvät tasavärisellä pinnalla ilman normaalia. Kyse ei siis ole tekstuurista.
- **Jäljellä 2 – toisto:** 4,8 m:n kivikuvio toistuu tasaisena "tiilimattona" laajoissa kuvissa (boundary-close, interior-regression).
  Tämä ei estä toimitusta, mutta se on seuraava laatuaskel V8a:n ja viivojen jälkeen.
- Pehmeys etualalla on pieni ja hyväksyttävä.

Peli ei ole vielä nähnyt tätä. Omistajan päätöksen 16.10. 18.05 mukaan jokainen hyväksytty paketti viedään omistajan
piilokaupunkiin samana tuntina. Nyt siellä on V7 (p361v7, viety tänään klo 09.50).

## 2. Tehtävät tässä järjestyksessä

**Tehtävä 1 – #361-V8-sn1 pelitoimitus (heti):** toimita source-network1-kokeen GLB:t toimituskansioon samassa muodossa kuin V7:n
delta (be272cf07): muuttuneet tiedostot, manifest-sha256.json, export-state.json ja lyhyt LUEMINUT.md. Jos muutos koskee vain ruutua 2_3,
kolme GLB:tä riittää V6:n päälle. Teemme KTX2-muunnoksen (ETC1S/UASTC, normaali-max 1024), portin ja ämpärivienin itse samana tuntina,
ja pelikuvaparit k1/k3/k5 klo 13 ja 18 tulevat sinulle. Tavuraja 164 326 250 riittää (raportoimasi 163 233 828).
Pohjoisen ja eteläisen kaistan normaalin V-käännöstä: muunnamme glTF-oletuksella (+Y ylös tangenttiavaruudessa, ei käännöstä). Jos
lähteesi olettaa toisin, kerro se LUEMINUT.md:ssä.

**Tehtävä 2 – #361-V8a (kuten c53ad7b3a), nyt sn1:n päälle:** V7:n materiaalin sijaan pohja on sn1, koska se hyväksyttiin. Muuten
ennallaan: reiät 6/7, oma maa ja nimellisesti 4 m:n uoma, reiät 1–5 ja 8 koskemattomina, ei vesipintaa GLB:hen. Rajauksesi hyväksytään:
pohjoinen levennys on suojatussa reiässä 8 ja pysyy ennallaan, ja märkä alue sisältää alkuperäiset vesipolygonit.

**Tehtävä 3 – tummien polygoniviivojen syy (V8a:n jälkeen):** rekisteröi kolme viivaa (boundary-close keskiristi, boundary-side
pystyviiva, south-boundary vaakaviiva) lähdegeometriaan. Selvitä, onko kyse raosta polygonien välillä (tausta näkyy), päällekkäisistä
pinnoista vai kolmiojaon varjostuksesta. Raportoi syy ja korjausehdotus ennen kuin muutat mitään. Korkeuksia ja AO:ta ei muuteta
arvaamalla, kuten itse linjasit.

**Tehtävä 4 – V8b (vesistöjen korkeudet, vain data):** ennallaan, rinnakkain.

**V8c (G33) siirtyy:** sn1:n hienojakoinen rae riittää toistaiseksi. Päätämme V8c:stä, kun sn1 on nähty pelissä.

## 3. Muuta

- KTX2-tavujen menetys kirjataan kuten kirjoitit. V7 on rakennettu tänään uudelleen samalla putkella, ja muunnettu paketti säilytetään
  nyt T7:llä (…/peking-codex-20261013/pelin-ktx2/), ettei levysiivous vie sitä.
- #362 pysyy erillään, ja Peking on OFFGAME, paitsi omistajan piilokaupungissa.

Seuraavaksi Linssiseppä: kun tehtävän 1 toimitus tulee, teen samana tuntina KTX2:n, portin ja viennin, kuvaan pelikuvaparit ja vastaan.
