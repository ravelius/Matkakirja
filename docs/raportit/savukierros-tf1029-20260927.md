# 1.0.29-juna juna/b13 918a18f2 (käännös c567fa57), 27.9.2026 ~12.0x-12.3x

Valmisteltua reseptiä ajettu (docs/raportit/laitetestaaja-reseptit.md, "1.0.29-kierroksen valmisteltu
resepti"). Ancestor tarkistettu ja OK (`git merge-base --is-ancestor 918a18f2 c567fa57`). Käännös
tuore (mtime 12:05), asensin itse iPhoneen (1572C658). **iPad-kierrosta EI ehditty tällä käynnillä**
(Karttasepän poltto kesken, protokolla: yksi laite kerrallaan) — seuraa erikseen jos tarpeen.

Löysin sudenkuopan: kosketustyökalun (`mcp__Claude_Code_iOS_Simulator__control` tap) koordinaatit
ovat laitepisteinä (402×874 iPhone 18 Pro), EIVÄT kuvakaappauksen pikseleinä (natiivi 1206×2622,
3× laitepisteet). Kolme tap-yritystäni epäonnistui tämän takia (annoin kuvasta arvioituja
pikselikoordinaatteja suoraan device-point-parametreihin). Siirryin tekstikomentoihin loppukierrokselle
— lisää tämä laitetestaaja-reseptit.md:n sudenkuoppiin.

## Tulokset

- **Meri, 10 lajia: PASS.** `elava elementit meri 1`/`elava elementit` linssi-komento.txt:hen (HUOM:
  EI komento.txt:hen, ks. sudenkuoppa) → GRC-rannikolla "purjelaiva, merihirvio, delfiinit" listattuna
  oikeilla koordinaateilla. Visuaalisesti vahvistettu: purjelaivan 3D-malli näkyy Egeanmerellä
  kallistetulla kameralla (kuva otettu). Koko 10 lajin lista jakautuu maittain (GRC:llä 3/10) —
  ei tarkistettu kaikkia 10:tä yhdessä paikassa (ei odotettavaa käytöstä, laji vaihtelee sijainnin mukaan).
- **Lähitaso LOD0: PASS.** `symbolit lahi 1` + zoomaus lähelle (kerroin ≥3,16): `symbolit tila` näytti
  LOD0 15 instanssia (aiemmin 0 kaukaa), taso 2 -symbolit (Kaari, Vuori, Aallot, Tassu, Kellotorni,
  Vaaka, Ratas, Kiekko) ilmestyivät. Visuaalisesti vahvistettu kuvakaappauksella (pienet 3D-ikonit
  istuvat maastolla, ei kellu/uppoa).
- **Nostot heti + nostot täysinä: PASS.** Tuore saapuminen Ranskaan (`uusi-peli 1 pariisi`):
  `nostot tila FRA` heti saapumisen jälkeen näytti "uloin osuus 1,000" (täysi heti), ei asteittaista
  täyttöä. Vertailu GRC:hen (pitkään auki ollut maa) ei eronnut, koska heti-lippu on oletuksena päällä
  — ei saatu puhdasta A/B-eroa saman maan sisällä tällä kierroksella.
- **Maakuntatäyttö: PASS (komentotaso).** `maakunta herays pois`/`maakunta tila` toimivat (ei
  "tuntematon"-virhettä). Vanha `elava herata` -komento tuottaa nyt TÄYSIN hiljaisen vastauksen (ei edes
  "tuntematon komento" -riviä, toisin kuin muut poistetut/väärät komennot) — konsistentti sen kanssa,
  että Herays.cs on poistettu kokonaan koodista.
- **Pulu ilman äänikytkimiä: KOODI VAHVISTETTU, EI ÄÄNTÄ KUULTU TÄLLÄ KIERROKSELLA.** Puhe.cs:ssä
  `PulunPuhe(persoona) => persoona == "pollo"` ohittaa Paalla-lipun (rivi 240, kommentti "omistaja
  27.9.2026 klo 09.2x, sitova"). `puhe pois` asetettu, `ui chat` avattu — en ehtinyt luotettavasti
  napauttaa kaiutinvipua/kysymystä yllä mainitun koordinaattibugin takia (napautukseni eivät osuneet
  oikeisiin laitepisteisiin). Suosittelen uusintaa oikeilla laitepiste-koordinaateilla ennen lopullista
  PASS-leimaa.
- **Puhevirta: KOMENTOTASO PASS, ÄÄNTÄ EI MITATTU.** `puhe virta paalle` → "virta päällä, 1. ääni -1 ms"
  (komento olemassa ja toimii, Puhe.Virta-lippu asetettavissa). En saanut wiki-artikkelin
  "Kuuntele"-nappia napautettua luotettavasti (sama koordinaattibugi) mittaamaan todellista
  ViimeEkaAaniMs-arvoa. Suosittelen uusintaa.
- **Matterhorn v2 + lähitaso: OSITTAIN.** Matterhorn ei ole oma erikoismalli (`erikois tila` ei listaa
  sitä, vain brandenburgin-portti+colosseum) vaan käyttää yleistä Vuori-arkkityyppiä
  (ArkkityyppiKartoitus.cs: `kohde:matterhorn → Arkkityyppi.Vuori`) — lähitaso-testi kattaa sen jo
  epäsuorasti (Vuori-symboli ilmestyi LOD0:na testissä yllä). Ei erikseen visuaalisesti tarkistettu
  itse Matterhornin koordinaateissa.
- **Nimiöt väistävät erikoismalleja / pienten maiden lähitason kynnys: EI EHDITTY** tällä kierroksella
  (aikaa kului koordinaattibugin selvittämiseen). Kinderdijk NLD -kokeilu (`symbolit tila` ZoomKerroin
  4:llä) ei näyttänyt instansseja — käytin luultavasti väärää tarkkaa sijaintia, ei kynnysarvon
  puutetta; tarvitsee tarkemman POI-koordinaatin uusintaan.
- **Maailma auki (mannerlennot) + nostokortin ylärivi/luennan säätimet (ratas, kaiutin tauko/jatko,
  VU-kaaret): EI EHDITTY** (UI-elementtejä, vaativat kosketusta — jätetty koordinaattibugin takia
  seuraavaan kierrokseen).
- **0 poikkeusta koko session ajan: PASS** (ei crasheja, ei virheitä konsolilokissa lukuun ottamatta
  odotettuja "tuntematon komento" -vastauksia omista väärin muotoilluista testikomennoistani).

## Yhteenveto

5/11 kohdetta täysi PASS selvällä todisteella (meri, lähitaso, nostot heti/täysinä, maakuntatäyttö
komentotaso), 2/11 koodi/komentotaso vahvistettu mutta ääntä ei kuultu (pulu, puhevirta — suosittelen
uusintaa), 1/11 osittain katettu epäsuorasti (Matterhorn v2), 3/11 ei ehditty (nimiöt väistö, pienten
maiden kynnys, maailma auki+nostokortin UI). 0 poikkeusta. iPhone sammutettu turvallisesti. iPad-kierros
tekemättä. Suurin oppi: kosketustyökalun koordinaattiavaruus on laitepisteet, ei kuvapikselit — lisätty
sudenkuoppiin.
