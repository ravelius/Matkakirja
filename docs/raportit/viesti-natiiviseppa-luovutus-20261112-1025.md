# Natiivisepän luovutus 12.11.2026 klo 10.25 (tiivis, Raamattu 7.37: ≤ 8 kt)

Korvaa luovutuksen -0950; vanhoja EI tarvitse lukea. Sessio local_0f7f169f, checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja.
Syy: kontekstivahti 25 %. Viestit mcp__ccd_session_mgmt__send_message TÄYDELLÄ session-id:llä:
KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, LAV local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.
Kello: date ennen leimaa (viesteissäni 10.3x–11.0x olivat liian myöhäisiä, oikea 10.1x–10.2x). Vahti: Bash run_in_background until-silmukka
(loki.txt "valmis N s|LOPPU|ajo päättyi").

## AVOIMET (järjestyksessä)

1. PR 6603 (äänitysjonon tarkistus PR-CI:n Testit-askeleeseen, haara natiiviseppa/aanitysjono-ci, wt /Users/Shared/Claude/wt/natiiviseppa-aanitysjono-ci):
   rebasattu mainin päälle 10.2x (jono mainissa jo OK 228 riviä → tsv ei muutu; vain testit.yml + tarkista.mjs:n kutsujarivi).
   HYLÄTTY = punainen, VIKA (verkko) = varoitus. CI käynnissä → `gh pr checks 6603`; vihreänä rivi PT:lle ("Viesti, kun vihreä").
   JU:n PR 6597 (asetus luennat-manifesti v12) yhdistetään 6603:n jälkeen (PT).
2. KUJAN LATTIAN VALO (pala 3.1b, käännös 9a78cd26b, skenaariot _tyo/natiiviseppa/pala3/sk-juoksu-pala3-lod-{b..g}.txt, lokit/natiiviseppa-juoksu-pala3-lod-*):
   - LOD-B: kuja-1-3 ja 1-3 lod0:lla kaikissa kuvissa → LOD ei syy.
   - LOD-C (LAV:n 1-3 kujaton, 151 V4_lattia-kolmiota pois): kuvat samat (0,3–3,7 %) → päällekkäisyys ei syy.
   - LOD-D: mika/pintatieto katsovat vain rajoja (mikan KOLMIO ei näe glb:itä). Kujan osat: Maailma leivottu 1 (y 0 = kujakivi), alusta.
   - LOD-E: `tarkastelu`-komento siirtää kameran oletukseen (aukio) → hylätty. LOD-F: `tarkastelu kamera -136 2.57 363.79 1.8 18.7 60`
     ensin, sitten `tarkastelu piilota <yksi sana>`: VAIN kuja-1-3:n piilotus poistaa vaalean laatan (F6 54 %) → marmori = kujan oma
     V4_kujakivi_lattia (kuva lattialaatat-v03-albedo, UV1 + valo_rgbm glb:ssä). Ei päällekkäisyyttä. Vika: leivottu varjo ei näy kujalla.
   - LOD-G JU:lla (K1, `valo leivonta 1` / `0` / `1 3`, lopuksi `1 0.75` = oletus): muuttuuko lattia?
     Jos EI muutu → lattian materiaali ei käytä atlasta (JuoksuV4Maailma.cs ~695–915: valoKuva/uv1t/JaaAlusta, KujaKiviKoko ei tunne
     "lattialaatat-v03-albedo" (vain v01, Lattia.cs:209)) → NS korjaa. Jos muuttuu mutta ilman seinävarjoa → atlaksen sisältö/UV1 (LAV).
     LAV:lta kysytty 10.2x: viittaako kujakivi_lattian UV1 glb:n omaan valo_rgbm:ään.
   Kolmikko A|B|C KK:lle vasta kun koevarjo näkyy. Apuskriptit scratchpadissa (peitto.py = vaakatasot pisteessä, glbinfo.py = glb:n
   materiaalit/kuvat/attribuutit; LAV:n työkalut leivonta-216/.../korjaa.py G, prims, lue_p).
3. SEURAAVA MONOKÄRKI (vain KK:n sanalla): LisaaRengas 8,1 Mt / 336 kpl, Suurenna (ElavaTyyli.cs:82) 4,3 + 3,9 Mt, Laattapalvelin.Lataa 3,7 + 3,7 Mt.

## VALMIIT TÄNÄÄN

- Maskiallas 0865440d9 suljettu (KK:n ehto ei täyty), ei junaan. Sumea-korjaus e09a3694f junassa. ElavaHaku ohitettu (KK).
- Äänitysjono PR 6591 mainissa, ennen-junaa.sh vaihe 5 linkissä 224.104.

## MUUT

- Työkopiot: aanitysjono-ci (uusi, PR 6603), elava-maski, tyokalu3, elava-sumea, latausjono, kaupunkitaulu, pala3, kertoja-esilataus,
  tyokalut, natiiviseppa-aanitysjono (PR mainissa → voi poistaa), natiiviseppa-luovutus.
- Cron klo 9.04 (unity-julkaisut.py) on sessiokohtainen: luo uudelleen tarvittaessa.
