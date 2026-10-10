# Linnanrakentajan luovutus 10.10.2026 myöhäisilta (20.1x, nollaus 57 %)

Edelliset: `viesti-linnanrakentaja-luovutus-20261010-ilta.md` (osio "JATKO 17.5x–18.5x") ja `-iltapaiva.md`. Haara `linnanrakentaja-tyo-20260929`.
Ei taustaajoja, ei worktreetä. Python-kuvatyökalut: `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`.

## Valmiit tällä jaksolla
- **NL-sali v2f** — LS1 kytkenyt (5f0cbd6a0). Ei avoimia.
- **ND v5d** (PT 18.5x: mustat säleet, vino + pystyviiva, tornien pyörteet) → LS2 paketoinut nd3/v6k16, kuvaa parin (oikea | v5b | v5d +
  portaalit) Pekingin jälkeen → PT → omistaja. Lähikuvat 467a84e65. Tiedostot: `notre-dame-v1/lahde/kuva_lansi_kohdista_v5c.py` (+ elementit.py,
  reunaportti_nd.py; VEN_MUU 2,4 → muurauslaatta), `kalibrointi_v5d.json`, `aja_tekseli_v5d.zsh`, `tekoaly-v5d/`, LAHTEET "v5c" + "v5d".
  **projisoi_tekseli.py (kaupunkipinnat-v1) korjattu yleisesti**: UV-kopion tahkojärjestys/näkyvyys (VASTAAVUUS), kärkivastaavuus,
  `--leivontamarginaali`, kalibroinnin `lapiprojektio`, `ao_lattia`, `ao_kuvaton`. Muut mallit (Louvre, prefektuuri…) hyötyvät seuraavassa ajossa.
  Ei korjattu: tornien kulmatukipilarien sivupintojen juovat (sivunäkymien tekoälykuvat); portaaleille tarkempi lähde (Commons 4315 px).
- **Peking v4** (kulta_katto × 0,77/0,82/0,82) → LS2 paketoinut peking4, mittaa katot o1-kohdasta. Pihat = Karttasepän maa (välitetty).

## SEURAAVAKSI (järjestys)
1) **Olavinlinna-vienti** (Siirtoseppä 20.0x, lupasin):
   a) Muuriportaiden alavarren matala kohta: Tott-kammion katto/kamana (y ~5,6–6,05) alimpien askelmien päällä, korkeutta ~1,5 m
      (reitti:pelaaja-43↔44, (−19,1, 5,6–6,05, −17,8)). Korjaus `olavinlinna-kavely-v1/lahde/kavely.py` kirkkotorni(): kammion katto auki
      portaan kohdalta (TK = (−15,25, −14,25), ovi:muuriporras MD (−17,63, −17,65); alavarsi (−18,49, 3,4, −18,88) → tasanne (−20,88, 6,5, −13,76)).
   b) Rantakivien hämäräkuva: ympäristön rantakivet.glb (Siirtosepän ympäristö) → mallit-riville hämäräkuva; kerro Siirtosepälle
      rakennus.jsonin kentän nimi (esim. `ymparisto.mallit[].hamara`), jolloin natiivi jättää 0,3-kertoimen pois.
   c) Vienti v45f-ketjusta (EI mainista; ks. iltapäivän luovutus "JATKO 15.5x–17.1x": haara linnanrakentaja-linna-v45h-pohja, vie-blender.sh,
      dispatch vie-dioraama.yml) → PALA-hashit Siirtosepälle + PT:lle.
2) LS2:n ND v5d -pari ja Peking-mittaus → säädöt tarvittaessa.
3) Tiedoksi: Karttasepän orto-albedo.jpg + albedo-luokat.json vertailukansioissa (perusvärit absoluuttisesti albedoon; raa'at ortot 1,6–2,1 ×
   albedoa kirkkaampia); puut-*.bytes dioraamoihin (kytkentä Siirtoseppä/LS2).

## LISÄYKSET 20.1x (ennen nollausta)
- PT 20.1x v5d: säleet/viivat/pyörre pois, hyvä. SEURAAVAAN KIERROKSEEN: (a) arkivolttien veistosyksityiskohta pehmeni (kaaret sileitä:
  kuvan renkaat puristuvat mallin kapeisiin renkaisiin + läpiprojektio/AO-lattia — kokeile terävämpää ylipäästöä renkaissa tai
  Commonsin 4315 px -alkuperäistä), (b) kulmatukipilarien sivujuovat (tekoälykuvat). (c) PT kysyy: ajetaanko Louvre ja prefektuuri uudelleen
  korjatulla projisoi_tekseli.py:llä (UV-vika koski kaikkia) — selvitä onko niissä samoja säleitä (lähikuva) ja vastaa PT:lle.
- Karttaseppä 20.1x: Peking-vertailuorto (vertailu/peking/orto.jpg) on näyttökuva, sRGB × 1,6 → EI albedoa. Pihat pelissä 135 = albedo 136
  → oikein (ei maamuutosta). SEURAUS: LS2:n kattovertailu (orto 161/130/101) on myös × 1,6 → todellinen kattoalbedo ~ /1,6 (S2:ssa sekoittuu
  varjoja) → Peking v4:n katot (arvio peli ~158/128/102) voivat yhä olla liian kirkkaat. Odota LS2:n mittaus ja vertaa albedoon
  (Karttasepän albedo-luokat.json, jos Pekingille tulee; nyt vain ND/prefektuuri/Eiffel/Louvre/KL/Olavinlinna).
- LS2 20.1x (Peking v4 mitattu d954970eb, 1 300 m klo 13): ×1,6 kumoutuu suhteessa pihoihin. Katto/piha R/G/B peli 1,19/1,03/0,75 vs S2
  1,05/0,88/0,73 → katot yhä ~13 % (R) ja 17 % (G) liian kirkkaat, B osuu. EHDOTUS Peking v5: kulta_katto R × 0,88, G × 0,85, B ennallaan
  (v4:n päälle; pinnat.py → aja_laatat.zsh → vertailuportti → LS2). Absoluuttista orto/1,6:tta EI käytetä (katot pihoja tummemmiksi = väärin).
