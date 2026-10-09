# Siirtosepän luovutus 9.10.2026 klo 16.56 (Opus 5.5, high; konteksti 70 %, PT:n nollausohje)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high): johdat Olavinlinnan historiamoottoria (ensimmäinen pelattava pala + historia-animaatio "kuin elokuva").
Lue tämä, CLAUDE.md ja Raamatun Ydinajatus kohta 2. Testaus vain automaattisin; simuajot vain liikkuvien kohtausten kuva-arkkeihin
(historia) Julkaisijan KÄÄNNÖS NYT / SIMULAATTORI NYT -vuorolla, oma simu 8362879F-30B9-4625-9F42-57326EBC3439, lopuksi "simu vapaa".

**Ensimmäinen tehtävä: arvio 10** (Julkaisija varannut ≈ 17.00, koe-173 faa04a55c → 8362879F):
1. `PROTO_APP_KOPIO=<scratchpad>/app174 /Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh faa04a55c 8362879F-30B9-4625-9F42-57326EBC3439`
   → ilmoita Julkaisijalle heti "käännös valmis" (LS2 odottaa).
2. `cd /Users/Shared/Claude/wt/proto-siirtoseppa-kello/tyokalut && ./todistusajo/todistusajo.sh --era historia-arvio10 --udid 8362879F-30B9-4625-9F42-57326EBC3439
   --app <app> --sha <KÄÄNNETTY-sha> --haara faa04a55c --skenaario <historia-skenaario.txt> --nyt` (skenaario alla).
3. Ruudut: historia alkaa videolla ≈ 28–31 s (EI videon lopusta laskien): etsi kohta, jossa avainsana "1477–1480-luku" ilmestyy
   (= historian t 38,5). Lähikuvat t = 32, 34 (nousu), 45, 55 (lounaispuoli): `ffmpeg -ss <t+offset> … transpose=2,crop=iw*0.6:ih*0.55:iw*0.2:ih*0.25`.
4. Tarkista lounaispuoli: arvio 7 mustat laikut → arvio 8–9 vaaleat laikut (väärä sävy) → 22af892ac sävy tunnelman mukaan (hämärä 0,045).
   Puhdas = ei mustaa eikä vaaleaa laikkua t = 33–70. Kirjoita arvio-10.md (docs/raportit/olavinlinna-historia-elokuva/, kuvat kuvat/) uudeksi
   docs-PR:ksi mainista (ÄLÄ `git add docs/raportit` kokonaan: kansiossa on seuraamaton 81 Mt:n kaappausvideo), viesti PT:lle
   (kuva-arkki + 3 suurinta virhettä aikaleimoin) ja SHA Natiivisepälle, kun PT kuittaa.

historia-skenaario.txt (scratchpad, kopioi tarvittaessa):
```
linssi linssi poikkileikkaus
oleta 180 poikki.*saapuminen alkaa -- linna latautui
odota 25
kuva h00-linna Linna ennen historiaa
video-alku historia
linssi poikki historia
oleta 150 historia vaihe 0 -- historia alkoi
odota 4
kuva h01-jaakausi Kohtaus 1 jääkausi
odota 80
kuva h07-bastionit Kohtaus 7
odota 50
kuva h11-loppu Kohtaus 11 loppukuva
oleta 15 historia päättyi -- historia päättyi
video-loppu
```

## HAARAT (proto, worktree /Users/Shared/Claude/wt/proto-siirtoseppa-kello; varmuuskopio `git push natiivi-backup <h>:refs/heads/peili/proto/<h>`)

| Haara | Kärki | Tila |
|---|---|---|
| siirtoseppa/juna174 | 77c46e2d6 | JUNA 172 (553edcdc4) ja 173 (77c46e2d6 = v46e) kuitattu; älä pushaa |
| siirtoseppa/juna173-aanet | 848021bae | Sonniss v4 junaan 173, kuitattu |
| **siirtoseppa/juna173-historia** | **4792cf9e4** | historian korjaukset arvioista 3–9 + v46i e5e37a8b0cc6d215; EI kuitattu (PT: junaan 174, ellei arvio 10 ole puhdas ennen 173:n lukitusta) |
| siirtoseppa/koe-173 | faa04a55c | juna173-historia + master (EI junaan, vain käännöksiin); merge-tree masterin kanssa puhdas |

Masterin (BUILD 170) kanssa juna174:llä oli 4 konfliktia (DioraamaAanet, LinnaValikko, OpasValikko, aanilahteet.json; junan puoli voittaa);
koe-174b/koe-173 sisältävät ratkaisun.

## HISTORIA (juna173-historia) – mitä on tehty

- Kivilinna rakentuu: Historiajana.RakennusS 8 s, raja −8 → 38 m, MaaNakyy (tyhjä saari kantaa puuvarustusta), testit
  KivilinnaRakentuuJaSaariKantaa ja LeikkausMaanYlapuolella.
- Rakentumisen aikana vain DioraamaKuori + historian kävelyosat (ranta-1499, porttikaytava-T102) näkyvät; huoneet, esineet ja valot vasta valmiissa
  linnassa; valot syttyvät 1,5 s:ssa.
- Linnan piilotus joka ruutu (valopisteet), vain vuosileikkaukset (SeikkailuKavely.VainVuosileikkaukset), vain-1499-leikkaukset vain y > −2,0.
- Mustan korvaus: globaali `_DioraamaMustaKorvaus` (DioraamaKuori + DioraamaLeivottu, raakakuvasta ennen valoa, y < 4 m, < 0,012);
  sävy SeikkailuHistoria.MustaKorvaus tunnelman mukaan (DioraamaSovitin asettaa SeikkailuHistoria.Hamara). Oletus 0 = pois.
- Ranta-1499 historiassa tasaisella sävyllä (MaterialPropertyBlock) – voi poistaa, kun v46i:n korjattu atlas todettu hyväksi.
- Arviot 1–6 docs/raportit/olavinlinna-historia-elokuva/ (mainissa), arviot 7–9 kirjoittamatta (tulokset yllä ja PT:n viesteissä).

## MUUT (tehty tänään)

- Mikserirekisteri kaikille linnan äänille (9950cb17e), loppumusiikki, v46a–i (Codex-rekvisiitta, tammiovilehdet saranasta 90°, alfaleikkaus
  DioraamaValaistu _AlfaRaja), 16 lähteetöntä ääntä = ElevenLabs oma tuotanto (ei Lähteisiin).
- Ulkokuoren kartoitus: docs/raportit/olavinlinna-kuori-tarkkuus-20261009.md (yksi 8k-atlas 31–36 px/m); ruudut ja skripti
  proto-3d/_tyo/kuori-tarkkuus/; LR:n Codex-ohjeet _valmiit/olavinlinna-codex-ohje/seina1–5.
- MetaHuman-vouti v2 latautuu (paikallinen koe), ei uusia simuajoja (rajaus).

## AUKI / SEURAAVAKSI

1. Arvio 10 (yllä) → PT:n kuittaus juna173-historia (4792cf9e4) junaan 173 tai 174.
2. Mustan korvauksen sävy päivätunnelmassa (0,27) on todentamatta.
3. Ranta-1499:n tasaisen sävyn poisto, jos v46i:n atlas on kunnossa (arvio).
4. MetaHuman-vouti v3 (LR 16.5x): proto-3d/_valmiit/linna-hahmot/metahuman-v1/vouti-1500-mh.glb + astc/ (huppu ylempänä, jawOpen korjattu).
   Peli EI lue glTF:n mesh.weights-oletuspainoja (grep "weights" DioraamaGlb.cs: ei osumia), joten v2:n painot 1 eivät näkyneet. LR pyytää
   lähikuvaa pelistä: stillit ovat omistajan rajauksen ulkopuolella (PT 9.10.) → vain PT:n luvalla; skenaario scratchpadin
   metahuman-skenaario.txt mallina (hahmokorvaus + puolilahi 1 + tila kappeli; kamera jäi v2:ssa yleiskuvaksi → tarvitsee lähikuvakomennon).
