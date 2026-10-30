# Valosepän luovutus 30.10.2026 klo 20.25

Luovutuksen syy: kontekstin pehmeä raja (KONTEKSTIVAHTI 30 %, Raamattu 7.37). Valotyö jatkuu nollauksen jälkeen.

Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (lue rivit 19.35 alkaen). Proto-repo on vain paikallinen, sillä ei ole origin-etärepoa.

## PYSYVÄ SÄÄNTÖ (PT 30.10. 16.2x, Raamattu 2.177)
Ennen kuin pari tai kortti lähtee, tee kaksi tarkistusta:
- Mittaa muutettujen materiaalien värit havainteeseen ja omistajan päätöksiin auringossa ja varjossa:
  `python3 /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/varimittaus.py kuva.png ulos.png nimi:x0,y0,x1,y1 …`
- Ota lähikuvat muutetuista kohdista.
- numpy löytyy vain `/opt/homebrew/bin/python3`:sta ilman `-I`-lippua (käyttäjän site-packages).

## VALOERÄN VALMIIN MÄÄRITELMÄ (PT 19.5x, omistajan kysymys "varjot olivat aiemmin sekaisin")
1. Yksi aurinko 30°/188° sekä leivontaan että pelin varjoon. tarkista.sh valvoo: "leivonta-aurinko ok".
2. tarkista_leivonta.py = 0 vikaa jokaisella uudelleen leivotulla alueella ennen paria. LAV ajaa sen itse ja liittää ilmoitukseen palat, alueet (x0 x1 z0 z1) ja `<pala>-varjostajat.json`:n. VS ajaa silti oman tarkistuksensa. Tarkista myös UV1: LAV korjasi pack_islandsin FRACTION → SCALED, koska UV1 meni yli 0–1:n ja leivonta jäi tyhjäksi.
3. Parit havainnetta vasten + lähikuvat varjojen reunoista ja kosketuskohdista (ei rakoa, sahalaitaa eikä läikkää), ja 2.177 ennen PT:tä.
4. Muurivarjot iPadilla kerran (reunat ja ruutuaika): LT.

## TÄRKEÄ OPPI: pelin oletus on VERTAILUVALO
`ValoKohteet.JuoksuVertailuValo = true` (omistaja 27.10. 10.56): leivonta, elävät varjot ja räystäsvarjo ovat oletuksena POIS.
- Jokainen valopari tarvitsee rivin `ui juoksupeli valo vertailu 0` ennen riviä `ui juoksupeli v4 7`, koska leivottu valo ladataan vain latauksessa.
- Varjopari 19.35 (esikatselu-20261030-193544) ja kaskadipari 20.17 (esikatselu-20261030-201303) ajettiin vertailuvalossa, joten ne ovat mitättömiä. PT:lle on lähetetty korjaus.

## Työn alla

### A. Valotyö, YHDISTELMÄ (PT:n hyväksymä, 8–12 h)
Proto-worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-leivonta`:
- **linssiseppa2/leivonta-217**:
  - d420087dc: aurinko yhteen lähteeseen, `_LeivottuST` ja `_LeivottuKarki`.
  - 4b54413d7: instanssien elävä varjo. tarkista.sh: 0 virhettä, Linssit 46/46, Kartta 3/3.
  - METAL jonossa linjalla 2: `zsh /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/metal-tarkistus.zsh 4b54413d7`. Jos tausta-ajo kuoli nollauksessa, aja uudelleen.
- **PT 19.5x:** METAL ensin, sitten leivonta-217 NS:lle junaan PK:n v4:n jälkeen. Muurien lattiavarjot tarkistetaan LAV:n uusintaleivonnan parissa.
- **LAV:n uusintaleivonta käynnissä:** tausta-v82, muurikate-v30 (kk-muurikate-v26-pohja.glb leivottu) ja rakennukset-v86.
  - Loki: `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/leivonta-216/uusinta/`.
  - Kun paketti tulee: tarkista_leivonta, sitten parit 02/03/06 (`valo vertailu 0`!) + lähikuvat + 2.177 → PT.
- **Ruutuatlakset ja kärkivärit EIVÄT kuulu tähän erään** (VS → PT + LAV 19.4x). Ne tehdään vasta, jos LT:n mittaus tai pari sitä vaatii.

### B. Uusinnat ajamatta (vertailu 0)
1. Varjopari: `zsh /Users/Shared/Claude/wt/proto-linssiseppa2-p11/tyokalut/esikatselu.sh a855d9fb6 /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/varjo-v4-vv.txt ipad --batch`
   - Kuvat v06/v03 paalla/pois.
   - Huom: 06-kamerassa aurinko on kameran takana, joten varjot osuvat portin taakse. Valitse tarvittaessa sivukamera.
2. Kaskadipari: `… esikatselu.sh b751f8f79 …/tyokalut/kaskadit67-vv.txt ipad --batch`
   - Kuvat k03/k03l/k06: mobile 2×1024, koe 2×2048, ultra 2×4096.
   - Tilarivillä pitää näkyä "varjot 2 kaskadia, atlas …".
3. **LINJAVUORO (sovittu PK:n kanssa):**
   - PK ajaa v4-parinsa (~25 min, alkoi 20.23) ja ilmoittaa linjan vapaaksi (PK local_601d33fc-1c61-4ccd-8389-fa425417fafb).
   - Aja omasi vasta sen jälkeen ja ilmoita PK:lle, kun linja on taas vapaa.
   - PT 20.2x: lukko toimi; varoitus ajojen vuotamisesta PK:lle oli väärä hälytys.

### C. Unity 6.7 -grafiikkakokeet (PT 20.0x; omistajan kysymys; sovittu NS:n kanssa)
- **Haara linssiseppa2/grafiikka67-217 b751f8f79** (leivonta-217:n päällä). Oletukset ennallaan; QA-komennot:
  - `valo kaskadit <n> [atlas]|auto`: PeliValon kautta, talteen ja takaisin PeliValoPoisissa.
  - `valo stp 0|1`: MSAA pois kamerasta.
  - `valo kayra none|neutral|agx|auto`.
  - Tarkistukset: tarkista 0, 46/46, 3/3, valovahti ok.
- **Faktat:**
  - iPad Pro = Ultra.
  - Juoksu pakottaa 2 kaskadia / 200 m / jako 0,125: Ultra-atlas 4096 (2048² per kaskadi), Mobile-atlas 1024 (512² per kaskadi). Kaskadikoe koskee siis Mobile-tasoa (iPhone).
  - STP vaatii jälkikäsittelyn (juoksussa päällä), MSAA 1:n ja liikevektorit.
- **Tulokset (esikatselu-20261030-200837):**
  - STP = MSAA editorikaappauksessa, joten arvio vain laitteella (LT, NS:n L1-vuoro).
  - AgX hylätty sellaisenaan nykyisillä k17-säädöillä: ylikylläinen, taivas 97/134/200 → 0/143/255 ja muuri 229/120/102 → 254/102/64 (06-perus-agx.png). NS pudotti AgX:n ja GTAO:n.
  - GRD, APV ja Forward+ eivät kuulu valoerään.
- **Seuraavaksi:**
  - Kaskadipari (B2) → tulokset NS:lle ja PT:lle.
  - NS tekee LT-ajon samalla SHA:lla QA-komennoin (STP 0,8 vs MSAA 4 0,8: välkyntä-% + J; kaskadit Mobile-tasolla).

### D. LOD1/LOD2-raja (PT kuittasi 19.5x)
- Ei sävyhyppyä (mediaanit ±1), mutta kaukomuureja on kuvassa vähän. Ajettiin vertailuvalossa, mikä ei vaikuta sävyvertailuun.
- Kooste: `_tyo/linssiseppa2/varjo-lodraja-kooste-20261030.md`. Kooste sisältää varjo-osuuden väärän tulkinnan (vertailuvalo); korjaus on JONO.md:ssä.

## Osoitteet
PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, LAV local_beb68834-6c4f-4839-ac75-7876b45052c3, NS local_c7344e20-fba8-433d-ba8e-184a325037ef, PK local_601d33fc-1c61-4ccd-8389-fa425417fafb, LT local_ede7e965-02ff-40a0-a77d-44f3218ca146.

## Työkalut (/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/)
- ero.py, varimittaus.py, glbmat.py, glbtex.py, qa-lahi.py (kuten ennen).
- Skenaariot: varjo-v4(-vv).txt, lodraja-v4.txt, grafiikka67.txt, kaskadit67(-vv).txt.
