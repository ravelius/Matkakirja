# Lavastaja: luovutus 26.10.2026 klo 12.44 (Postivahdin kova raja 36 %)

Edellinen: `docs/raportit/viesti-lavastaja-luovutus-20261026b.md` (1343ad0de). Haara `linnanrakentaja-tyo-20260929`.
Proto: `wt/proto-lavastaja-muoto`, haara `lavastaja/muoto-210`, osoitin yhä **957cc6a4b** (v54/v46). Editorin käännös
natiiviseppa/juna-210 (985cbf182) lukee nimet tausta-v50, rakennukset-v43, muurikate-v15 → juuri-kansiot linkittävät ne.

## Valmiit tänään (tämän session aikana)

| Paketti (`proto-3d/_valmiit/…-vienti-20261026`) | SHA256SUMS-tiedoston sha256 | Sisältö |
|---|---|---|
| juoksupeli-kk-tausta-peking-v56 | 48084969e162… | v55 (galleriat 1,8 m, Zhaodemen 2,5 m) + kuja-40 havainteen leveyteen (pala 0-3 kaikki LOD:t, reunaporras lattiana laattoineen) + porttihallien jäänteet pois (1-1, 1-2) |
| juoksupeli-kielletty-rakennukset-v47 | 64a9bd73c063… | porttihallit: oikea taivas leivonnassa, 2048 px valo, marmori 0,88, koristekuvat mukana, seinät kannen tasoon, läpikulun sisäkatto V4_teal; p-kujaportti (−251,33, 400,03) |
| juoksupeli-kk-muurikate-v16 | 51b5562fa180… | ehdotus2:n kate ilman reunaporrasta (kk-muurikate-v16.glb) |

PT 12.1x: kujat ovat faktakorjaus (11.32 "havainnekuvien leveyteen"), EI omistajalle kysymystä. PT kuittaa paketit JU:lle,
kun SHA:t on ilmoitettu. **SHA:t EI vielä PT:lle** (lopputarkistus kesken, alla).

Aiemmin PT:lle lähetetty: kujakolmikot `havainne-kuja40/{02,05}-kolmikko-lattiaporras2.png` (editori 120029 vihreä) ja
tausta-v55 aukio 03 vihreä (114030; PT: ok, kuittaa yhdessä v47:n kanssa).

## Kesken

1. **Lopputarkistus paketeista**: `havainne-kuja40/aja-paketti56.zsh` käynnistettiin 12.44 (juuri-paketti56 = v56 + v47 + v16):
   editori-lr 02 05p 03 → loki `havainne-kuja40/ajo-paketti56.log`, sitten portti-lr p15 p15n p216 p216k → `ajo-portti-paketti56.log`
   (kuvat `lokit/havainne-editori-<aika>/{p15,p15n,p216,p216k}.png`). Tarkista: 02/05p/03 "OK lattia" ja ulkoasu kuten 120029/114030;
   porteissa PT 12.2x:n kolme kohtaa (PK `_tyo/pelikoodari/kolmikot-211/porttihalli-e77543fc7.jpg`): (a) ei punaista kiilaa kannella,
   (b) portaat ja kansi marmoria + tasainen valo (ei raitoja), (c) sisäkatto sinivihreä eikä tasainen punainen. Kuvapari ennen/jälkeen:
   ennen = `lokit/havainne-editori-20261026-120042` (juuri-v55 = v46), jälkeen = uusi ajo; kokoa kuten
   `kielletty-rakennukset/hallit-v55/kuvat/porttipari-v46-v47.png` (p15 ja p216 riveinä). p15k ei kelpaa (kamera massan sisällä).
2. Vihreänä **PT:lle ≤ 3 riviä**: paketit + SHA256SUMS-sha:t (yllä; laske uudelleen `shasum -a 256 …/SHA256SUMS`, jos pakkasit
   uudelleen), kuvaparin polku, kujakolmikot. PT:n kuittauksen jälkeen JU:lle ja osoitin muoto-210:een: tausta-v56, rakennukset-v47,
   muurikate-v16 (JuoksuSokkeloMaailma.Palatsi.cs: MuurikateTiedosto "kielletty-muurikate-v16/kk-muurikate-v16.glb").
3. Jos lopputarkistus näyttää jäänteitä: `tyokalut/hallit_jaanteet.py` (kansi- ja katto-rajaus, KATTO-pinnat −d yli ky + 2,5,
   PAATY m216:n itäpääty) → `pakkaa_v56_v47_v16.zsh` tekee kaiken uudelleen (v55 + 0-3 → jäänteet → paketit).
   Hallimallit: `aja_hallit_v55.zsh` (hallit_lapikulku.py → leivonta 2048 → valo_pakkaa) ennen pakkausta, jos malli muuttuu.
4. Sali (Valoseppä) ja 05:n takaseinän varjo kuten edellisessä luovutuksessa.

## Syyt ja korjaukset (oppi)

- Porttihallit v44–v46: aja_hallit_v5x.zsh ei antanut TAIVAS/TAIVAS_VARI/KIMPOAMISET → leivo_malli.py:n oletustaivas (sininen × 1,0);
  hallit_lapikulku.py pudotti baseColorTexturen (kortit tyhjiä); seinät ulottuivat kannen läpi −0,9 m:iin → kiilat.
- Kujan reunaporras: kolmiot kierretty alaspäin ja leivo_valo.py:n remove_doubles pehmensi normaalit → varjostin (lattia = nf.y > 0,6)
  piirsi kylkenä tasavärillä. Korjaus `kuja_porras_normaalit.py` (kierto + normaalit raa'asta palasta).
- hallit_lapikulku siirsi vain laatikon KOKONAAN sisällä olevat kolmiot; reunan ylittävät jäivät taustaan Codexin korkeudelle
  (huom: glb:ssä on viittaamattomia kärkiä – laske kolmioista, älä kärjistä).
- Editoriajot rinnakkain voivat tummentaa kuvan (ajo 115019); toista ajo ennen johtopäätöstä.

## Työkalut (uudet, `kielletty-rakennukset/tyokalut/`)

aja_hallit_v55.zsh, hallit_jaanteet.py, kuja_porras_normaalit.py, pakkaa_v56_v47_v16.zsh, hallit_lapikulku.py (.v54 = edellinen);
`havainne-kuja40/`: kolmikko.py, portti-lr.sh (p15, p15n, p15k, p216, p216k), aja-paketti56.zsh, juuri-v47, juuri-v4b, juuri-paketti56.
