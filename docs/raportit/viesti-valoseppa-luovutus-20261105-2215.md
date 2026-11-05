# Valosepän luovutus 5.11.2026 klo 22.15

## LISÄYS 22.33: TÄMÄ KORVAA LISÄYKSEN 22.25 JA KOHDAT 1–4
Liike katsottu ajosta a48428884 (L2, noin 186 s, lokit/esikatselu-20261105-222704, LUKKO VAPAA ilmoitettu). Tulos KK:lla ja PT:llä. Pinnat pysyvät; ohuet osat nakuttavat 1376-kokoisessa ruudussa, kuten Notre-Damekin. Yksi selvä vika: musta pikseli Pont Alexandre III:n pään kannella ruuduissa 208–210 (kierto).
Koodi nyt 7da270ac5 (natiivi-backup): aluslaatta kannen ja pään sauman alle. Syy on PÄÄTELTY (T-liitos saumassa), ei todettu. Testit läpi: Mitat, Reunakivi, Ajoradan, Holvit. Ei nähty ajossa.
JU:lta pyydetty vuoro 22.33: 7da270ac5, `sk-liike.txt`. Tuloste "VIKA kuvia ei syntynyt" (exit 1) kuuluu asiaan, kun kuvia ei ole; ajo on onnistunut, jos tallenteet syntyivät.
Seuraavaksi:
1. Vuorolla: `PROTO_LINJA=<linja> ESIKATSELU_PISTEKERROIN=0.465 zsh /Users/Shared/Claude/wt/proto-linssiseppa2-k30/tyokalut/esikatselu.sh 7da270ac5 /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/sk-liike.txt`. Lopuksi JU:lle LUKKO VAPAA, linja, kesto, ruutumäärät, kansio.
2. Nauhat: kopioi `nauha`-tapa: kuusi peräkkäistä ruutua, rajaus ×3 NEAREST, ruudut pa3 kierrossa noin 205–216 ja (710, 533). `arkki-rajaa.py liike` tekee saman. Katso, näkyykö musta pikseli. Jos ei, kerro KK:lle "häviää" ja jos näkyy, kerro sekin: älä jää hiomaan yhtä pikseliä, koska osa A odottaa.
3. Tulos KK:lle ja rivi PT:lle. Sitten osa A (kohta 5 alla).
`kierra 20 2` ei liikuta kameraa, `kierra 40 1` liikuttaa. Ei selvitetty miksi; käytä 40 1.

## LISÄYS 22.25: TÄMÄ KORVAA KOHDAT "SEURAAVAKSI" 1–4
Ajo a48428884 tehty (L2, 305 s, lokit/esikatselu-20261105-221905, LUKKO VAPAA ilmoitettu). Paikallaan olevat kuvat on katsottu ja viety KK:lle ja riviksi PT:lle: kuvat/2213-a48428884/. Mustat katkot ja katkoviiva ovat poissa, joten koodia ei tarvitse muuttaa tämän takia. Pieniä vikoja on kerrottu KK:lle.
LIIKE YHÄ NÄKEMÄTTÄ: `kierra 20 2` ei liikuttanut kameraa lähietäisyydellä (kamera.txt yksi paikka, ruudut samat, vaikka komento näkyy lokissa). Syytä ei selvitetty; 0.012:ssa `kierra 40 1` liikutti (ajo f2c1e8017), joten mahdollisesti KameraEleet.Paata hylkää hitaan kierron. Skripti on nyt: `aja` noin 170 m, 1,6 s, sitten `kierra 40 1`. JU:lta on pyydetty vuoro 22.25, sha sama a48428884.
Seuraavaksi:
1. Vuorolla aja: sama komento kuin alla, sha a48428884, mutta skenaario `sk-liike.txt` (JU 22.2x: vain tallenteet; liike-pa3 ja liike-hdv-pn). LUKKO VAPAA heti.
2. Tarkista, että kamera.txt:n paikka muuttuu. Rajaa kohde peräkkäisistä ruuduista (`liike`) ja katso. Älä sano valmiiksi ilman nähtyä liikettä, ja kerro KK:lle ja PT:lle, jos taas epäonnistuu. Jos välkkyy, korjaa samalla tavalla kuin kansien raot.
3. Tulos KK:lle: välkkyykö. Sitten osa A (kohta 5 alla).

Korvaa luovutuksen -2203. OMISTAJAN PÄÄTÖS 21.49 ja KK:n tavoite ovat -2155:ssä (git show e8785dc8c:docs/raportit/viesti-valoseppa-luovutus-20261105-2155.md). Syy nollaukseen: konteksti 28 %, uusi iso työ alkamassa.

## TILA
Koodi a48428884, haara `linssiseppa2/ohjelmakohteet`, viety natiivi-backupiin (etä on `natiivi-backup`, ei origin; älä työnnä seurantahaaraan karttaseppa/nahtavyydet-219), worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan. Testit läpi: Mitat, Reunakivi, Ajoradan, Holvit (`sh .../ohjelmakohteet/aja-geometria.sh`, muut: `<dotnet> rak/G.dll <suodatin>`; aja `sh`:lla, ei zsh:lla). Korjausta EI ole nähty ajossa. KK ei ole saanut kuvia.

JU:lle on pyydetty vuoro 22.1x (a48428884, sk-korjaukset.txt). Odota riviä "ESIKATSELU NYT" ja linjaa.

## AJO f2c1e8017 (L2, 244 s; lokit/esikatselu-20261105-220459; LUKKO VAPAA ilmoitettu)
Näkyi: Hôtel de Villen ikkunoissa ei mustaa, kummastakin suunnasta kelvollinen. Notre-Dame, puut ja Louvre kunnossa; KS: pyramidit eivät ole mustia. Kaiteen läpi tulleet mustat viivat poissa (f2c1e8017 toimi).
Vikana, korjattu a48428884:ssä:
- Pont Alexandre III: mustat katkot kannella sen reunakiven kohdalla, joka on kameraan päin. Syy: ajoradan ja jalkakäytävän välissä 12 cm:n avoin rako, josta näkyy kannen alle. Lisätty pystypinta (`Reunakivi`).
- Pont Neuf: tumma katkoviiva kannen poikki päiden kohdalla. Syy: päätyseinä nousi 15 cm ajoradan yli. Nyt `PaatySeinat`.
- Pont Alexandre III:n teräs 0x3C4146 → 0x565E60, koska kaari näytti seepiakartalla lähes mustalta. Omaa harkintaa, EI pyydetty: kerro KK:lle, kun viet kuvat.
Ei arvioitu: liike. Kierto alkaa 0,7–1,1 s peliaikaa komennon jälkeen, joten 1,2 s:n tallenteessa kamera ei ehtinyt liikkua. Skripti on nyt: kolme tallennetta (liike-pa3, liike-hdv, liike-pn), `kierra 20 2`, `odota-peli 3.6`. Vanhassa sijainnissa 0.012 kumpikaan kohde ei näkynyt kuvassa, joten nyt kukin kohde lähietäisyydeltä.

## SEURAAVAKSI (järjestyksessä)
1. Vuorolla aja taustalla: `PROTO_LINJA=<linja> ESIKATSELU_PISTEKERROIN=0.465 zsh /Users/Shared/Claude/wt/proto-linssiseppa2-k30/tyokalut/esikatselu.sh a48428884 /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/sk-korjaukset.txt`. Heti lopuksi JU:lle LUKKO VAPAA, linja, kesto, kuvamäärä. Ajokansio on tulosteen viimeisellä rivillä.
2. Katso: `python3 -I .../ohjelmakohteet/arkki-rajaa.py arkki <ajo> <kohde>`, `raja <ajo> <nimi> cx cy lev kork kerroin <kohde>`, `liike <kansio> cx cy lev kork kerroin askel sarakkeet <kohde>`, `ero <kansio>` (ruutujen ero). Rajaa kohde arkin mukaan; kohteet noin (1360, 940) täysikoossa, Pont Neuf pn-0:ssa (1354, 1065) ja pn-118:ssa (1466, 941). Pienet viat näkyvät vasta ×6–×8.
3. Liike: kamera.txt:n paikan on muututtava jokaisessa tallenteessa. Rajaa kohde peräkkäisistä ruuduista. `ero` Pont Alexandre III:n paikallaan olevassa kohdassa näytti 0,01–0,05, kun kamera ei liiku (pulut ym.); liikkeessä vertaa kuvia, ei lukuja. Älä sano valmiiksi ilman nähtyä liikettä.
4. Kelpo kuvat KK:lle (local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe), rivi PT:lle: mitä, sha, polku. Kerro näkyvät viat: Pont Neufin pään seinä on terävä kiila (rantamuuri, OSM-muoto), Pont Alexandre III:n nimi sillan päällä (KS tietää), kartan tyhjä kiila loitolla (KS tietää).
5. UUSI TYÖ, omistajan 22.09 kortti, PT:n välittämä, osa A: kolmen kohteen vikojen jälkeen erä ohjelmalla: keskustan sillat ensin, sitten Madeleine, Palais Bourbon, Pompidou-keskus, Tour Saint-Jacques, Saint-Eustache, Saint-Sulpice. Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261105-pariisi-rakennukset-ohjelmalla.md. Ennen kutakin oikean rakennuksen vapaat kuvat ja tarkistus, ettei liioiteltu nähtävyys peitä kohdetta. Kuvat erissä KK:lle. Yksi kysymys per ajo, nähtävyyssarja ei saa hidastua, ei junaan. Osat B–D eivät ole sinun, ellei PT jaa.

## Lähtökohdat osalle A (ei vielä aloitettu)
- Työkalut kansiossa /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/: hae.mjs (OSM PBF, /Volumes/T7 4TB/Matkakirja-karttaseppa/vesimaski/lahteet/ile-de-france-latest.osm.pbf; vaihda `alueet`), lahteet.py ja kuvat.py (Wikimedian rajapinta, peräkkäin, 429:llä odotus, Raamattu 2.183), sovita.py, esikatsele.py (OBJ offline-esikatselu).
- Kohteet lisätään: OhjelmaKohteet.cs `kohteet`-taulukko (Lat, Lon, Akseli, SiirtoX/Z, Tee) ja funktio OhjelmaKohdeGeometria.cs:ään. Yhteinen kansi: `Paakansi` + `PaatySeinat`, sillä ne sulkevat nyt raot.
- Peitto: liioitellut mallit ovat Nahtavyysalue.cs:n `Mallit`-riveillä (lat, lon, X, Y, Suunta, Skaala). Notre-Dame on hyvin korkea: Pont Neuf peittyi osin kuvassa pn-118 ja Hôtel de Ville hdv-270:ssa. Nämä kuvat ovat oikea peittotesti: mittaa etäisyys ja kohteen korkeus, ja kerro peittyvä kohde KK:lle ennen rakentamista.
- Malleissa on jalanjälki ja koko: tarkista muiden haarat ennen isoa erää (muistisääntö).
- Kolmioraja testissä 40 000 per kohde.

## MUUTA
- PT:lle kerrottu 22.1x: 9be47cc74 on KS:n haarassa poimintana df2c647bf, shader identtinen, ei toimia. Tämä rivi on viestijonossa, tarkista list_events, jos PT kysyy.
- KS:lle kerrottu tyhjä kiila ja nimi, ei vastausta odoteta.
- Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut.
- Työlistahookin rivit (Louvren pohja, Sainte-Chapelle, sisätilat) eivät ole Valosepän.
