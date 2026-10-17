# Karttasepän luovutus 17.10.2026 klo 11.5x (Postivahti: kova raja 36 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261017-aamupaiva.md` (6454983b1).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261017-keskipaiva.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. JATKA KOHDASTA 1.

Käännökset ja simut VAIN Julkaisijan jonon kautta (KÄÄNNÖS / SIMU NYT). **Älä käynnistä simua vanhan SIMU NYT -viestin perusteella:**
JU antaa vuoron eteenpäin, jos simu on tyhjä 4 min (11.55 käynnistin myöhässä ja pysäytin ennen simua). Ilmoita SIMU VAPAA JU:lle.
Proto-worktree: /Users/Shared/Claude/wt/proto-karttaseppa-iss-reitti-198 (haara karttaseppa/kiina-vaestopinta-199, natiivi-backup).

## 1. KESKEN: KIINAN DYNASTIAT -PAKETTI (KS VETÄÄ; omistaja 11.31/11.32/11.38/11.44 PT:n kautta)

Omistaja: väestökartta kaikille 19 pysäkille ("Pitää käydä kaikki dynastia läpi"), taistelut, Wein huippu esiin tietoruudun alta,
kertova kamera (PK), vuosi+dynastia leimana (NUI), keksinnöt ja uskonnot valopisteinä, Silkkitien valojuova, Williamin ääni
kaikkeen, kokonaiskesto ~5 min (pysäkki 15–20 s). Ei väliaikaista poikkeamaa: junaan (200 jos ehtii) vasta kun KOKONAINEN.
Aika-arvio PT:lle annettu: koko linssin video ~20.30–21.

**KS:n osuus TEHTY** (proto a8f5d8b90, tarkista.sh 0; data main-haarassa `karttaseppa-kiina-vaestopinta` ab5d9a067, pushattu):
- 19 pysäkin pinnat `Resources/Kiina/Vaestopinta/{vaestopinta,tiheys,omistus}-<pysäkki>` (208-tiedostot poistettu → 250).
  Generaattori `tools/kiinan-dynastiat/vaestopinta.py kaikki …`, tiedot `MUOTO-VAESTOPINTA.md` (päivitetty), lähteet
  `data/linssit/kiinan-dynastiat/vaestopinta/lahteet/`. Korotus (74/p99)^0,8 → p99 250–415 km. Esikatselu
  `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/vaestopinta-19/esikatselu/arkki-4.png`. Työkansio `…/vaestopinta-19/` (korkeus-kiina-005.npy = GLO-90-mosaiikki).
- Taistelut `vaestopinta_data.HETKET`: Changping (−221), Punaiset kalliot (250), Fei-joki (440), Yamen (1280), Shanhai (1644). HetkiS 16 s.
- Valopisteet + Silkkitie: `Resources/Kiina/valopisteet.json`, Ydin `KiinaValopisteet.cs`, piirto KiinaKerros (Valot/SytytaValo/Juova);
  nimet IsoisaKerros.Peitto. Lähekkäiset pisteet siirretty 0,7° (NLon).
- Tapahtumat PK:lle: `KiinaKerros.TapahtumaKasittelija` (KiinaTapahtuma), `PysakkiKesken` pidättää Pysakkiajon.
- Linssin avaus kääntää kameran pinnan kulmaan (KiinaVaestopintaKerros.Kamera* 30/114,5/2400 km/40°, 32a1e9022) — PK korvaa.

**SEURAAVAT ASKELEET:**
1. **Kulmakuva PT:lle**: JU:n SIMU NYT (4bfa5299b, `kiina-vaestopinta-208-app`, kaannos.out jo kirjattu) → `zsh …/kiina-vaestopinta-208/ajo-vaestopinta-208.zsh > ajo-8.out`
   → SIMU VAPAA JU → katso kuva-arkki ITSE: Wein huippu (K1-kerays) kokonaan tietoruudun alla/vieressä? Jos ei, paras varakulma (KA/KB/KC)
   KiinaVaestopintaKerros.Kamera*-oletukseksi. Yksi kuva PT:lle.
2. **Koko linssi**: JU kääntää a8f5d8b90 → `_tyo/karttaseppa/kiina-koko-linssi-app` → kirjaa kaannos.out (`KÄÄNNETTY <sha> karttaseppa/kiina-vaestopinta-199`)
   → SIMU NYT → `zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kiina-koko-linssi/ajo-koko.zsh > ajo-1.out` (~9 min, skenaario sk-koko-linssi.txt)
   → katso kuvat A0–A13: pinta nousee joka pysäkillä, taistelut, valopisteet syttyvät ja himmenevät, juova 1280/1644, nimiöt näkyvät pinnan yllä?
   Korjaa, sitten väliraportti PT:lle (3 riviä).
3. **NUI-lippu**: NUI teki `KehysKaaro.Ruudulla` (haara natiivi-ui/kaaro-rajat-200 c2a052bfa) — POISTA KiinaKerros.TekstiNakyy, kun
   haarat yhdistetään (PK:lle kerrottu). Valopisteen merkki = kartan nimiö pääkaupunkityylillä (NUI 12.0x) — tehty IsoisaKerroksella.
4. **SK**: käsikirjoitus (19 pysäkkiä + valopisteet + juova, William) tulee SEURAAVALTA Sisältökirjurilta PT:lle, kopio KS:lle.
   Äänitys Äänittäjälle PT:n kautta.
5. **PK**: kertova kamera tapahtumien varaan (pohja a8f5d8b90). Kun PK, NUI ja äänet valmiit → yhdistä, koko linssin video PT:lle,
   sitten SHA:t NS:lle junaan (PT kuittaa ensin).

Avoimet huomiot: HYDE ei käsilatausta ilman omistajan päätöstä; Fu Jianin 200 000 ja Yamenin hovi 150 000 ovat piirtolukuja
(merkitty). Väestöpisteiden kerros (kerrokset_data.VAESTO) käyttää yhä vanhoja lukuja – pinta käyttää vaestopinta_data.VAESTO.

## 2. Valmiit tällä vuorolla

| Erä | Toimitus |
|---|---|
| Väestöpinta v2 (rinnevalo) | video PT:lle 10.55, `lokit/todistus-kiina-vaestopinta-ipad-199-20261017-1048/` |
| v3 (omistaja 11.08: V0d + harva läpikuultava) | d14f5d540; video PT:lle 11.30, `…-20261017-1123/` (KS-ARVIO.md) |
| Hionta (Lontoo/Praha/Ateena) | KS:n erä jo tehty 15.10. (23bc043b1) → PT:lle "lista tyhjä" |

## Muistiinpanot

- Venv: `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/skanneri-samanimi-199/venv/bin/python3`; tarkistus `zsh tyokalut/tarkista.sh` (zsh, ei bash).
- Valovahti: `new Color(…)`/hex-väri tarvitsee samalle riville `// valopoikkeus: syy`; liikevahti `// liikepoikkeus:`.
- Simu tallentaa videon pystyyn → `ffmpeg -vf transpose=2` vaakakopioksi ennen lähetystä.
