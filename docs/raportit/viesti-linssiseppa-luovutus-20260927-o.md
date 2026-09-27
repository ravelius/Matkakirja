# Linssisepän luovutus 27.9.2026 (o) — Linssiseppä (Opus, max) = myös Mallinseppä

*Kirjoitettu klo 23.1x Fablen pyynnöstä (konteksti 72 % → nollaus). Edellinen -n.md. Session id:t ovat ennallaan (-n.md):
Fable local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, Natiiviseppä local_04e2850b-d63c-481d-be73-c7d784a7cbcb, Karttaseppä
local_4bd7c316-55bc-423a-9da1-821fdd123cab, Natiivi-UI local_e9fdc695-8421-4c14-a187-8881e73c835a, Laitetestaaja
local_3509b4ba-6000-4dea-869b-ecb22f4e3270. Edellisen session scratchpad S =
/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/f617e5f9-623e-415a-9ee3-df43a6bd4aed/scratchpad
(kehotteet/era5-yhteinen.txt, laatat.py, kontakti.py). Pysyvät työkalut ovat proto-3d/tyokalut/.*

**YÖTAUKO (Fable 27.9. klo 21.3x):** klo 23.30 jälkeen ei Unity-käännöksiä eikä simulaattoreita ennen kuin Karttasepän
poltto on valmis (arvio aamu). Harness-työ (dotnet ja Python) on sallittu.

## 1. JONO AAMULLA (Fable 23.1x)

1. **Erä 5 (omistaja hyväksyi 21.4x kaikki kolme ehdotuksen mukaan): Kronborg, Visby, Nidaros.**
   - Opus-agentit mallinsivat harnesseissa proto-3d/tyokalut/mallinseppa-esikatselu-n1 (Kronborg), -n2 (Visby) ja -n3
     (Nidaros). Agentit kirjoittivat myös speksit docs/raportit/erikoismallit/{kronborg,visby,nidaros}.md. Ne on
     commitoitu luovutuksen mukana (§11 toteutus), mutta Linssiseppä ei ole vielä lukenut niitä, joten tarkista ne.
   - **Nidaros valmis ja hyväksytty:** Runko 928 + osat 442 = LOD0 1 370, Lahi 2 648. Liikeaika 38,2 % (tauko 55–150 s),
     0 allokaatiota. Kirkkomaa on staattinen osa ilman ääriviivaa. Pyhiinvaeltajat kiertävät myötäpäivään; suunta on
     tyylittelyä ilman lähdettä, samoin kynttilät. Kuvat ovat n3/kuvat/, ja n3/nidaros-toteutus.md kertoo toteutuksen.
   - **Kronborg ja Visby:** katso kohta 5 (tila nollaushetkellä). Tarkista kuvat (*-kolme, *-pelikoko40, *-lahitaso),
     erityisesti vesi (kapea, ei tummaa kehystä) ja ohuet tehosteosat (ei ääriviivaryhmää), ennen kuin hyväksyt.
   - **Integrointi:** uusi haara junan päälle:
     `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree add -b mallinseppa/era5 /Users/Shared/Claude/wt/proto-linssiseppa-era5 juna/b13`.
     Kopioi harnessista malli/Erikoismallit/<Malli>.cs → Assets/Matkakirja/Kartta/Erikoismallit/ ja
     malli/Elava/ErikoisLiike<Malli>.cs → Assets/Matkakirja/Linssit/Ydin/Elava/. Luo .meta-tiedostot satunnaisella
     GUIDilla ja lisää Luo-rivi ErikoisLiike.cs:n kytkimeen. Aja `tyokalut/tarkista.sh` (0 virhettä) ja commitoi malli
     kerrallaan. Varmista ennen kopiointia `diff`illä, ettei agentti muuttanut jaettuja tiedostoja
     (ErikoismalliApurit.cs, ErikoisLiike2.cs).
   - **Käännös:** lähetä rivi Karttasepälle ennen ja jälkeen, sitten
     `S=<uusi S> proto-3d/tyokalut/linssiseppa-ajot/kaanna-jono.sh e5 mallinseppa/era5`.
   - **Laiteajo:** käynnissä saa olla alle 2 simulaattoria, eikä rajaa kierretä (luokitin esti sen). Jos vuoro puuttuu,
     JUMI → Fable.
     `MALLIT=$'kronborg DNK 56.039 12.623\nvisby SWE 57.6357 18.299\nnidaros NOR 63.4273 10.397' APPNIMI=e5 L=/Users/Shared/Claude/proto-3d/lokit/mallinseppa-laite-20260928-e5 VAIHEET=129 zsh proto-3d/tyokalut/linssiseppa-ajot/ajo-mallit.sh`.
     Kokoa sitten `python3 koosta_era2.py <L> proto-3d/lokit/mallinseppa-toimitus-20260927 "erä 5 <SHA>" "kronborg:Kronborg (Tanska)" "visby:Visbyn muuri (Ruotsi)" "nidaros:Nidarosin tuomiokirkko (Norja)"`
     ja nimeä tiedostot ilman välilyöntejä (<avain>-era5-laite.png ja -era5-video.mp4).
   - Kuvat ja videot Fablelle, merge-pyyntö Natiivisepälle 1.0.33/1.0.34-junaan. Lisää speksien §11:een haara ja
     käännös.
2. **Symbolit erikoismallin alla** (speksi docs/raportit/symbolit-erikoismallin-alla-speksi-20260927.md; Natiivisepän
   haara natiiviseppa/symbolit-erikoismalli 39c380b5, 1.0.34):
   - Laitteella 22.0x Krumlov toimi (vltava→cesky-krumlov, reunapiste itään oikein).
   - Kinderdijk ei lauennut, koska Goudan jalkapiste jää laatikon ulkopuolelle; Gouda on 14,8 km pohjoiskoilliseen.
     Natiiviseppä vaihtaa aamulla laatikoiden leikkaukseen.
   - Aja sen jälkeen uusi A/B: `APPNIMI=<nimi> L=<kansio> VAIHEET=19 zsh proto-3d/tyokalut/linssiseppa-ajot/ajo-symbolit-alla.sh`
     (A/B `symbolit alla 0|1`, zoomauspyyhkäisy `aja lat lon kaari kesto`).
   - Kokoa `koosta_alla.py <L> proto-3d/lokit/mallinseppa-toimitus-20260927 "<SHA>"` ja lähetä tulos Natiivisepälle ja
     Fablelle.
3. **Meren kuvaparit omistajalle**, jos niitä ei ole viety: Fable päättää.
   - Kuvat: proto-3d/lokit/mallinseppa-toimitus-20260927/meri-laatu-<laji>-ennen-jalkeen.png (7 lajia, 21/21 ruutua).
   - Lähteet ja rajaukset: proto-3d/lokit/linssiseppa-meri-laatu-e/LUE.txt.
4. **Erä 6 -ehdotus** erä 5:n jälkeen samalla kaavalla, listan docs/raportit/arkkityypit-paletti-animaatio-20260926.md
   §3 mukaan (VAIN EUROOPPA): Olavinlinna (Suomi), Geysir (Islanti), Newgrange (Irlanti). Yksi suositus mallia kohden
   ja B vain, jos se on aidosti eri idea.

## 2. TEHTY TÄSSÄ SESSIOSSA (27.9. klo 16.4x–23.1x)

- **Meren laatutaso erä 2:**
  - abb862d2 laitteella (7 lajia, 2 673–2 871 kolmiota, CPU ≤ 0,036 ms, 0 poikkeusta).
  - Fablen korjaukset: UTGRUND pois ja merihirviön vesipallot ilman ääriviivaa → **01997eca**. Mukana masterissa
    BUILD 32.
  - Kuvaparit 7/7. Speksi §7: docs/raportit/meri-laatu-speksi-20260927.md.
- **Erä 4:** Krumlov, Malbork, Pannonhalma; omistaja valitsi A:n.
  - Opus-agentit harnesseissa m1–m3. Linssisepän korjaukset: Malborkin joki kapeaksi ilman kehystä, Krumlovin ulkoranta
    vaaleaksi, Pannonhalman äänirenkaat ilman ääriviivaa.
  - mallinseppa/era4 **fac195c0** on junassa (fd8941b8), 1.0.33. Laitteella 0 poikkeusta.
  - Kuvat: mallinseppa-toimitus-20260927/<avain>-era4-laite.png ja -era4-video.mp4.
  - Speksit §11: docs/raportit/erikoismallit/{cesky-krumlov,malbork,pannonhalma}.md.
- **Löydös ja speksi:** tason 1 kategoriasymbolit piirtyivät erikoismallin päälle (Vltavan Aallot Krumlovissa). Speksi on
  lähetetty Natiivisepälle, ja se on toteutettu ja testattu kohdan 1.2 mukaan.
- **Erä 5:** ehdotus (docs/raportit/erikoismallit/era5-ehdotus-20260927.md) hyväksytty, ja agentit ovat käynnistyneet.

## 3. TYÖKALUT JA OPIT

- **Meren kuvaus:**
  - `ajo-meri-ennen-jalkeen.sh` on parametroitu (ENNEN, JALKEEN, EO, JO, RIVIT, L).
  - `ajo-meri-taydennys.sh` odottaa lajin näytöksen tavoitekohtaan: `nayta` ei aloita käynnissä olevaa näytöstä alusta,
    ja sukeltanut laji on tila-rivillä "ei näkyvissä". Sarjat peli35, peli0 ja lahi35.
  - `koosta_meri_laatu.py` valitsee täydennyssarjan (<sarja>b) ensin, ja ylhäältä- ja täydennyssarjoista parhaan kehyksen.
    `KORJAA="app:MAA:laji:sarja=kehys,x,y;…"` antaa keskipisteen käsin, kun kohde ei liiku tai kun viereinen animaatio
    (Tivoli) voittaa mediaanieron. `PUUTTUU` tuottaa merkityn tyhjän ruudun.
- **Erikoismallit:**
  - `ajo-mallit.sh`: VAIHEET 2 ja MALLIT-rivit.
  - `koosta_era2.py`: laitearkki ja rajattu video. Malborkin video jäi 3 s:iin, koska simctl tallentaa vain muuttuvat
    kehykset.
  - `ajo-symbolit-alla.sh` ja `koosta_alla.py`: symbolien piilotuksen A/B-ajo ja kokoaja.
- **Harnessit:**
  - Uusi harness tuotannon tiedostoista, kuten n1–n3: kopioi Stub.cs, Dump.cs, Symbolimallit.Rakentaja.cs,
    esikatselu.py, render.py, lahi.py, co.py, msm.py ja kaanna.sh (vaihda polku kaanna.sh:n W=-riville). Kopioi mallit
    ilman TigerMothia ja ErikoisLiike*.cs, ja aja `./kaanna.sh`.
  - Tyngässä Mathf/Vector3/Color.Lerp eivät rajaa t:tä, eikä Color.Lerp kuljeta alfaa.
- **Laitekaarien syy:** jos erikoismallin päällä näkyy laitteella outoja kaaria tai muotoja, tarkista ensin lähellä olevien
  tason 1 nostojen kategoriasymbolit (`symbolit tila`) ennen kuin epäilet verkkoa.
- **Zoomaus:** `nostot kerroin` ei zoomaa maanäkymässä; käytä `aja lat lon kaari kesto` (Natiiviseppä).

## 4. AVOINNA MUILLA

- Natiiviseppä: Kinderdijkin laatikkoleikkaus (kohta 1.2). Erä 4:ää ei ole vielä masterissa (junassa fd8941b8).
  Worktree /Users/Shared/Claude/wt/proto-linssiseppa-era4 poistetaan, kun erä 4 on masterissa.

## 5. ERÄ 5:N TILA NOLLAUSHETKELLÄ

- **Nidaros (n3): VALMIS ja hyväksytty** (kohta 1). Liikeaika 38,2 %.
- **Kronborg (n1): VALMIS**, Linssisepän silmäys kolmesta kulmasta OK: tähtilinnake, kuparikatot, salmi kapeana ja lautta.
  - Runko 982 + osat 342 = LOD0 1 324, Lahi 2 521. Tulli 9,9 % ohituksista ja haamu 10,2 % yölähdöistä. 0 allokaatiota,
    noin 1 µs/kehys.
  - Luo: `"kronborg" => new KronborgLiike(id)`. Tiedosto tarvitsee `using System;`.
  - **Kaksi avointa asiaa Fablelle:**
    1. Kuparinvihreää on noin 14 % mallista (katot 13 %). Agentti käsitteli sen materiaalivärinä kuten Pannonhalmassa,
       ei aksenttina; vertailukuva n1/kuvat/kronborg-katto-AB.png, ja muutos on yksi rivi (`KbKatto`).
    2. js/packs/nostoankkurit-dnk.js sijoittaa `nosto:kronborg` pituuteen 12.7125 E, joka on Helsingborgin puolella; linna on
       12.6219 E, ja karttavalojen kohde:kronborg on 12.623. Tarkista laitteella, kumpaa moottori käyttää, ennen kuin
       malli päätyy Ruotsiin (Sisältökirjurin tai Karttasepän data).
- **Visby (n2): VALMIS klo 23.18, kuvat tarkistamatta** (tarkista aamulla ennen integrointia: n2/kuvat/visby-*-kolme.png,
  -pelikoko40, -lahitaso ja visby-lautta-vaiheet.png). Runko 1 206 + osat 269 = LOD0 1 475 (raja 1 500, varaa vain 25), Lahi
  2 823. Tynnyrit 10,8 %, levossa 69 % kehyksistä, 0 allokaatiota, noin 1,3 µs/kehys.
  - Malli käännetty 116° vastapäivään: suoristettu merimuuri edessä, 16 tornin maamuurin kaari takana ja kapea satama edessä.
  - Luo: `"visby" => new VisbyLiike(id)`. Muistio: n2/visby-toteutus.md.
