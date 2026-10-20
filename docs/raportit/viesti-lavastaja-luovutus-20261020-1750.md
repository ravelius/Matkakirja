# Lavastajan luovutus 20.10.2026 klo 17.50 (Opus, medium): PT:n tilinvaihto (omistaja 17.49)

Edellinen: `viesti-lavastaja-luovutus-20261020-1116.md` (ac5c25e0d). Lue se: työkalut, opit, pakettien muoto ja säännöt ovat ennallaan.
Viestit lähetetään send_messagella session id:llä (`/Users/Shared/Claude/osoitekirja.md`). PT:lle enintään 3 riviä.
**SIMU HARVOIN (omistaja 11.45, PT 17.0x):** malleista ja sijoitteluista ei oteta simukuvia eikä kuvapareja. Ensin automaattiset testit tai Mac-esikatselu, sitten erä menee suoraan avoimeen junaan.

## ENSIN (uusi Lavastaja)
1. **Codexin PT734–737 → rakennukset-v13** (v12 on käytetty, ks. alla). Tilanne klo 10.37: Codex oli tuottanut 0 mallia, ja erä on jonossa Puyi207:n jälkeen.
   T7-polku: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-kielletty-koristeet-v2/` (checkpoint.json, NIGHT-HANDOFF.md).
   Kun glb:t tulevat, tee kuten edellisessä luovutuksessa. Pohja on **v12** (kopioi `_tyo/linnanrakentaja/kielletty-rakennukset/v12` → v13), ja jatka työkaluilla, joissa on jo v12:n lattiamuutokset.
   Codexin 756/PT737-ovikukkaristikolla on 24 paneelia (ei 40), ja koordinaatit ovat sen NIGHT-HANDOFF.md:ssä. Kun paketti on valmis: PK:lle ja PT:lle sha yhdellä rivillä.
2. Jos jono on tyhjä: rivi PT:lle "JONO TYHJÄ: Lavastaja".

## Valmiit tänään (11.16 jälkeen)
- **rakennukset-v12** (`_valmiit/juoksupeli-kielletty-rakennukset-v12-vienti-20261020/`, SHA256SUMS 42c95c721dc6, g-taihedian-lod0 fe98ea29b5d7). PK:n löydös 11.42 oli Taihedianin musta harmaaruudukkolattia.
  - Tiili vaalennettiin: V4_jinzhuan 0,045 → 0,085, roughness 0,35.
  - Saumat kavennettiin ja tummennettiin: 5 cm → 1,2 cm (`kk_juoksu.py` w 0,006), V4_jinzhuan_sauma 0,028.
  - Vain g-taihedian muuttui. PK kytki v12:n palatsi-208:aan (9c59233cf), ja vienti on pyydetty JU:lta.
- **Mona Lisan katsojat** (omistaja 15.40 PT:n kautta): proto-haara `lavastaja/monalisa-katsojat-208` c10fa7e37, pohjana natiiviseppa/juna-208 02d5ce390. Merge-pyyntö lähetetty NS:lle (local_fcc10552) runkoon 208.
  - Ydin `Linssit/Ydin/Museo/MuseoKavijatKatsojat.cs`: MuseoKavijat on nyt partial. `Katsojat(sali, teos, n, siemen, kamera)` tekee 5 katsojaa (vanhalla laitteella 3) kulmiin −26/29/47/−45/63° kaarikaiteen takana; säde = kaide + 0,45 m.
  - Liike: idle eri vaiheessa, katse harhailee kankaalla, painonsiirto ±10° 9–22 s välein ja vilkaisu 14–32 s välein. Väistävät, mutta eivät mene kaiteen sisään (kiellot), ja palaavat paikalleen.
  - Unity: `MuseoElama.LuoKatsojat` (Quaternius v2 media `taidemuseo/kavijat-v2`, ei pölyä), `MuseoSovitin.Louvre.cs` LuoKatsojat/PoistaKatsojat ja QA-komento "museo katsojat 0|1|tila". Oletuksena päällä (KatsojatPaalla).
  - Testit: `Linssit-testit/Testit/MuseoKatsojatTestit.cs` 4/4, Linssit 2172/2172, unity-tarkistus 0 virhettä.
  - Kamera seisoo katseluasennossa (18,1, 1,6, −34,57). Katsojat ovat sen sivuilla 1,6–3,5 m:n päässä, joten ne eivät näy lähikuvassa vaan lähestyttäessä ja sivulta.
  - PT 17.0x: tästä erästä ei kuvaparia. Omistaja katsoo pelistä isolla iPadilla. Mac-esikatselu jää talteen: `_tyo/linnanrakentaja/monalisa-katsojat/` (esikatsele.py + 6 png).
- Worktree `/Users/Shared/Claude/wt/proto-lavastaja-monalisa` (proto) jää paikalleen, kunnes NS on mergennyt. Sen jälkeen `git -C …/Matkakirja-proto worktree remove`.

## Avoimet
- Odottaa NS:n mergeä ja omistajan katselua. Jos katsojista tulee palautetta, säädä Ydimen `KatsojaKulmat`/`KatsojaSyvyys`/`VartaloAste` ja aja `sh Linssit-testit/kaanna.sh Katsojat`.
- Edellisen luovutuksen avoimet (60 fps mittaamatta, siltojen leveydet) ovat ennallaan.
- Ei irrotettuja ajoja eikä taustatehtäviä käynnissä.
