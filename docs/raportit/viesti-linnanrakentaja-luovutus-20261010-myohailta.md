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
