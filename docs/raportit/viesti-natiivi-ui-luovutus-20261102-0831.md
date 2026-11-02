# Natiivi-UI: luovutus 2.11.2026 klo 08.31 (kyltit valmiit; jono 2–7 PT:ltä)

Edellinen: viesti-natiivi-ui-luovutus-20261102-0718.md. Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## Erä 1 VALMIS: kiinteät nähtävyyskyltit, proto natiivi-ui/piirros-kyltit-218 **b7b45fef0** (pohja natiiviseppa/juna-218 407fa2410)
Omistaja 08.14: "Pariisissa nähtävyyksien kyltit saisivat olla kiinteästi paikallaan sekä myös kiinteän kokoisia, eli näkyisivät
pienempänä kauemmilla zoom-tasoilla." Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-piirros-kyltit.
- NostotKartalla.cs: Merkki.Kyltti/KyltinMitta; piirroskartan kyltti saa kiinteän kyljen (PiirrosKyljet, muuten "ala"), ei väistöä,
  fs 22 pt (KyltinTaysiPt) ja scale-muunnos pisteen ympäri = KaupunkiPalloMitat.PiirrosMittakaava(korkeus, MinKorkeus, 0).
  Alle 6 pt (KyltinMinPt) kyltti häipyy. Sovita käsittelee kyltit ensin (muut väistävät niitä). `ui kohdenostot` näyttää "kyltti ala ×0,42 = 9,3 pt".
- Todistus: proto-3d/lokit/todistus-kyltit-b7b45fef0-20261102-0827/ (kk/1-kyltit-lahin-vs-2x.jpg, selitteet.txt), 0 poikkeusta.
  PT KUITTASI 08.3x ja lähetti b7b45fef0:n NS:lle junaan 218 (ei avointa työtä tässä erässä).

**SEURAAJAN JÄRJESTYS (PT 08.3x, OMISTAJAN PÄÄTÖS 08.31, loki 9f5ceb12d):**
1. piirros-eleet-218 (e093d2e68, ea25c610e) simutodistus + kohta 3 nipistys
2. a) kadonneen ihmeen nimikylttiin tähti (kyltti = NostotKartalla --kyltti, kohteet joiden nostolinkki hahmotelma-…)
3. kohta 5 Karikatyyrikartta-kytkin + b) suurennuslasin KARTTA-välilehdelle oma kytkin kadonneille ihmeille (mk-linssirivi-pohja,
   oletus päällä) + kohta 6 suoristus 0°:een
4. c) leikattujen kuvien kerros piirroksen päälle (KS toimittaa Codexin kuvat Temple-tornista ja Grand Châtelet'sta + sijainnit;
   kiinteä paikka/koko kuten piirros)
5. kohta 7 veneet
- Huomio: Palais d'Orsay ja Orsayn taidemuseo lähes samassa pisteessä → kyltit päällekkäin (korjaus PiirrosKyljet-kylki tai data).
  2× kauempaa kyltit ~9 pt (pieniä mutta luettavia); jos omistaja haluaa isommat, nosta KyltinTaysiPt tai mittakaavan viite.

## JONO (PT 08.17 + 08.22, järjestys): kohdat 2–4 yhtenä eränä, kuvapari/video PT:lle
Haara proto natiivi-ui/piirros-eleet-218 (pohja 407fa2410), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-piirros-eleet.
2. **Liuku yhtä pitkään** — TEHTY e093d2e68, ei simulla todistettu. PalloKierto: liu'un pysäytysraja oli kiinteä 0,01 °/s
   (maan näkymässä ~2 px/s, Pariisin lähimmällä satoja px/s → heitto katkesi heti). Nyt LiukuLoppuPx 2 px/s (AstettaPikselille),
   hiipunut liuku nollataan; myös Liikkeessa/KarkeaLiike/MacLiuku.
3. **Nipistys heti, kun piirros ilmestyy kauimmalla tasolla** (nyt vasta panoroinnin jälkeen) — SELVITTÄMÄTTÄ. Nipistyskoodi
   (PalloKierto ~1290–1330, Elelukko/KameraEleet.Paata) näyttää normaalilta; epäily: saapumisajo/EleetMuualla/UI-elementti ottaa
   kosketuksen saapumisen jälkeen. Toista simulla synteettisellä nipistyksellä heti saapumisen jälkeen (komento nipistys) ja lue loki.
4. **Temple-tornin kyltti → sama nosto kuin webissä** — TEHTY ea25c610e, ei simulla todistettu. Kohdenostot.Avaa: kohde, jonka
   nostolinkki on hahmotelma-… (web js/packs/maakartat.js:5319 ym., kadonneet ihmeet 31.10.: Grand Châtelet, Temple-torni,
   Palais d'Orsay, Palais de l'Industrie, Trocadéro, Galerie des Machines), avaa Nostokortti.Avaa(KaupunkiNostot.ValoLinkista(..))
   eikä Wikipediaa. TARKISTA simulla, että valo-id ratkeaa (loki "kohdenostot: avaa … → nosto kohde:hahmotelma-…") ja kortti aukeaa;
   jos ei, valo-id tarvitsee @FRA tai karttavalojen tunnuksen.
5. Suurennuslasin KARTTA-välilehdelle rivi "Karikatyyrikartta" päälle/pois (2.73 POIKKEUS, mk-linssirivi-pohja; oletus päällä; pois = striimi).
6. Karikatyyri päällä + zoom tarpeeksi lähelle → kartta kääntyy pehmeästi 0°:een (pohjoinen ylös) ja piirros näkyy.
7. Seinen veneet (OMISTAJAN PÄÄTÖS 08.17): venekerros piirroksen päälle (kiinteä paikka/koko kuten piirros; pohjana kuumailmapallon
   mekanismi UI/KaupunkiPallot.cs + KaupunkiPalloMitat), liike reittiä pitkin, iPadin sujuvuusmittaus; ennen/jälkeen-pari + video PT:lle.
   KS 08.3x: reitti /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/veneet-20261102/seine-reitti.json
   (201 pistettä ~40 m, lat/lon = KUVAN leveydet → PiirroksenLat, leveys_m, lännestä itään, Cité-saaren eteläinen haara; häivytys
   päissä; veneitä molempiin suuntiin, peilaus länteen). Codexin 4 venettä RGBA (keula itään, ~0,5 m/px) + vanavesi.png tilattu
   (postilaatikko 7ad1059b5); KS ilmoittaa, uudet laatat uuteen TasoVersioon. Ihmiset/autot EI.

## Todistusajon malli
Kopiot todistuskansiossa (todistus-kyltit-…/kaanna-a.zsh + kyltit-a.txt) (`komento aja lat lon leveys kesto`, `ui kohdenostot`, `kuva nimi selite`).
Ajo: `SIMU_ODOTA=3600 SIMU_MUISTIRAJA=16 nice -n 15 zsh proto-3d/tyokalut/simu-lukko.sh kaari natiivi-ui yhteinen-iPad13 -- zsh <skripti>`
taustalla (~8 min). Huom: `komento aja … 0.012` ei ole aivan lähin taso (kyltti ×0,84).
