# Natiivisepän luovutus 26.9.2026 (j), klo 22.3x

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti 71 % (Fablen pyyntö). Edellinen: -i.md.

## Tila

- **BUILD 24** = proto-master b69d4b82 = TF 1.0.24 (verho-96, fonttilämmitys, elävät elementit 3D, 167).
- **BUILD 25** = 31fd6d5f = TF 1.0.25 (160 arkkityypit + läikkäpiilotus, fonttilammitys-b, NousuEstaa-testi).
- **BUILD 26** = proto-master **2c91a5d2** (juna 83e2fb1e, käännös 282aa01c, puu 745f6a6f; Laitetestaaja PASS 8ce031ac7)
  → **TF 1.0.26 viennissä** (Julkaisija 22.21, ajo 36265749506). Odota Julkaisijan "vienti valmis" ennen junamergejä.
  Sisältö: 176 porttijako (4 porttia, 24 yhteyttä; iOS:n raja 6/isäntä+portti; kerman uusinta), 175 (tason 1–3 mallit vasta
  kerroin ≥ 2,5 ja kallistus ≥ 25°, koko 22 → 40 pt, pergamenttipaletti, kaiverrusreuna, maakontakti, ei himmennystä,
  instanssien kallistusehto f901f5cf), 171 (aloituslennon kohdemaa + VARTIJA 171), 168 (ei maakunnan värjäystä; oma
  MaaKartta + Linssisepän ElavaHerays), 172 (kone matalampi ja lähikuvassa vaakasuorassa), Pulun karttaväistö (Codex + Natiivi-UI),
  laattaesilataus erä 2 (kohdekaupungit, taustajono), Pariisin ilmapallo, ISS SGP4, 174b-kuvamerkit (huuto/eläin/hetki),
  S10 (liikkeen SSE 32 varjokameralla + katto 60 Hz, kehittäjälippu matkakirja-liike-120), lipun piilotus Euroopan mittakaavassa.
- Tagit build24-juna, build25-juna, build26-juna. Juna/b13 jatkuu 1.0.27:ksi. Varmuuskopio ajettu 22.0x.
- Mittaukset: verho iPad Pro 13 relaunch 2,4–2,5 s (portti); asennuksen jälkeinen ensikäynnistys 5,0 s = **S11**.
  Simulaattorin verhoajat hylätään polton aikana (Macin load ~350; Fablen sääntö).

## 1.0.27-JONO

1. **Rekisteröintihooki + LiikkuvatOsat** ennen Mallinsepän ensimmäistä merge-pyyntöä: proto-3d/lokit/mallinseppa-rajapinta.md
   (Erikoismalli-rekisteröinti `static partial void RekisteroiErikoismallit`, LiikkuvaOsaMaaritys, `Symbolimallit.LiikkuvatOsat`
   + `LiikkuvatVersio`). Linssiseppä ajaa animaation (Vaihtelu, ElavaKerros). Mallinseppä-sessio (Fable luo) tekee
   Mont-Saint-Michel, Stonehenge, Colosseum; käännökset sinun jonosi kautta, oma simulaattori Fablelta.
2. **Kategoriasymbolit reliefeinä** (omistaja 21.5x/22.0x; EI 16 rakennusarkkityyppiä, EI animaatiota nostoille): 14 symbolia
   Linssisepän esityksen mukaan (docs/raportit/arkkityypit-paletti-animaatio-20260926.md, 7af8a812b), kaari + vuori ensin,
   kuvasarja isona keskellä/puolivälissä/reunassa.
3. **Liioiteltu perspektiivi** (omistaja 21.4x): yhteinen käyrä Linssit/Ydin/Kamera/LiioiteltuPerspektiivi (linssiseppa/perspektiivi,
   .meta f8628ac2). Lipun versio haarassa natiiviseppa/lippu-176 (7837f09a) EI kelpaa: kangas litistyy keskellä, tanko makaa
   sivulla (kuvat proto-3d/lokit/lippu-perspektiivi/kolmikko.jpg) → poistettu junasta, korjaa (esim. kallista vain tankoa
   pystytasossa, kangas aina kameraa kohti; tai pienempi kulma lipulle).
4. **Ylhaalta-175-haara** (natiiviseppa/ylhaalta-175 f5900358): yleiset osat (vaaleampi valo, inverted hull -ääriviiva 1,2 pt
   Cull Off, maavarjo kaakkoon) valmiina; arkkityyppimuodot (A) pois; perspektiivipatch
   proto-3d/lokit/ylhaalta-175/perspektiivi-f5900358.patch. HUOM: agentin merge/patch estettiin automaattisella
   lupatarkistuksella (Modify Shared Resources / Auto-Mode Bypass) → worktree voi olla likainen; omistajan päätös, jatketaanko
   (kysytty käyttäjältä, ei vastausta vielä). Älä kierrä estoa.
5. **S11** varjostinesilämmitys/-välimuisti buildiin (asennuksen jälkeinen ensikäynnistys 5 s → tavoite ≤ 3,5 s).
6. Muilta rooleilta tulossa: **170** sisältö-vaihtui-kuuntelija, **173/169/170b** (Natiivi-UI); **177** (Pelikoodari);
   elävät elementit Linssisepältä (linssiseppa/hoyrylaiva). 174 (läikät → symbolit kaikilla zoomeilla) Natiivi-UI:lta,
   mittaa suorituskyky maatasolla (Ranska) kun tulee.
7. 176 lisäkorjaus 1.0.27: varakartta myös kartalle (Z3-atlas), kerma Z3–Z5 pakettiin (raportti proto-3d/lokit/loydos176/).

## Käytännöt (uutta tänään)

- **Oma simulaattori FBBD41D7** (natiiviseppa-iPhone). 1572C658 ja 3B4CDACB ovat Laitetestaajan kierroslaitteita (juna-ajo asentaa
  niihin). Ensimmäinen launch heti bootin jälkeen voi epäonnistua ("No such process") → uudelleenyritys, aikaraja odotuksiin.
- Laitekäännös pääprojektissa (laite.sh) jättää Unityn muutokset → `git checkout -- . && git checkout master` jälkeen (puhdas master
  Julkaisijalle). Laitemittaukset iPad Pro 13:lla (00008103-001819421413401E); iPhone ei ollut kytkettynä tänään.
- Testikäännös toiseen simulaattoriin sotki Laitetestaajan kierroksen → tarkista aina, että Laitetestaajan kierros koskee oikeaa
  käännöstä (asennusaika vs KÄÄNNETTY-rivi).
- MaterialPropertyBlockia ei luoda MonoBehaviourin kenttäalustuksessa (NRE joka kehys, löydös 175c).
- Scratchpad siivottu 8 Gt → 103 Mt; vanhojen sessioiden skriptit proto-3d/lokit/natiiviseppa-skriptit/vanhat-scratchpadit/.
- Tämän session skriptit (kopioi tarvittaessa): verho-ipad.sh, verho-ab.sh, ranska175.sh, lippu-pers.sh, pulu-laite.sh,
  ab160.sh → kopioitu kansioon proto-3d/lokit/natiiviseppa-skriptit/sessio-j/.
