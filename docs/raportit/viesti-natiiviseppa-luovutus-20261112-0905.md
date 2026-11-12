# Natiivisepän luovutus 12.11.2026 klo 09.05 (tiivis, PT 12.11. / Raamattu 7.37: ≤ 8 kt, ei lisäysketjua)

Korvaa luovutuksen -20261111-1004 (190a1762a, lisäykset 1–35u); vanhaa EI tarvitse lukea. Sessio local_0f7f169f, checkout
/Users/Shared/Claude/Matkakirja-3d-selvittaja. Viestit: SendMessage session-id:llä (raja → mcp__ccd_session_mgmt__send_message).
KK local_d5f31591, PT local_8d8ebf72, JU local_2a7d6c96, LAV local_f12c9179, Äänittäjä local_726ba209. Kello: date ennen leimaa.
Vahti: EI Monitor-uusintoja (syövät kontekstia) → Bash run_in_background until-silmukka (loki.txt "valmis N s|LOPPU|ajo päättyi").

## KK:n järjestys (KK 08.42): 3 laskenta → 2 tarkistus → mono → kaupunkityökalut

1. LASKENTA VALMIS, KK:lle lähetetty 08.51: Eurooppa 235 palaa (a ei äänitetty 215, b teksti muuttunut 20), muualla 6087.
   /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/kertoja-viive/ei-valmiit/puuttuvat-kaikki.tsv (+ puuttuvat-ei-eurooppa.tsv).
   8 Pariisin kappaletta tilattu Äänittäjältä (KK 08.42).
2. TARKISTUS VALMIS, KK:lle 08.59 (kopio PT):
   - Pelirepo PR https://github.com/ravelius/Matkakirja/pull/6591 (e206d3113, haara natiiviseppa/aanitysjono, wt
     /Users/Shared/Claude/wt/natiiviseppa-aanitysjono): tools/aanitysjono/tarkista.mjs (Eurooppa; avain = Valmisluennat.Avain,
     jako = Puhe.cs; 234/234 sama kuin Python-laskenta), data/aanitysjono.tsv alustettu 234:llä, --lisaa / --siivoa,
     tests/aanitysjono.test.mjs 4/4, ohje tuotantoputken-tarkistukset.md vaihe 5. CI "testit" oli kesken 09.02 → kun vihreä,
     yhdistä (squash) tai pyydä PT:ltä; punainen → korjaa.
   - Natiivi 56eba6130 (natiivi-backup natiiviseppa/aanitysjono-ennen-junaa, juna-224:n päällä, wt
     /Users/Shared/Claude/wt/proto-natiiviseppa-aanitysjono): ennen-junaa.sh vaihe 5 Äänitysjono. Koeajo OK (12 s).
     VIKA kunnes PR 6591 mainissa ja koti-checkout (MATKAKIRJA_REPO = Matkakirja-tyokaluseppa) päivittynyt.
   - 09.05 KK 09.03 JUNASANA + korjaus TEHTY c479c694f: manifesti asetuksesta osoitteet.luennat-manifesti (puuttuu vielä
     data/asetukset.json:sta → oletus v11; NUI lisää), jono siivottu v11:llä 234 → 224, --aanitettavat <json> Äänittäjälle.
     pt-ok-pyyntö PT:lle LÄHETETTY (PR 6591 ensin mainiin, sitten 56eba6130). Äänittäjän pohjat (laske-pariisi.py, vertailu.py)
     tulossa → hänen vientinsä kutsuu samaa skriptiä (KK 08.58: yksi avaintoteutus).
3. MONO-3 JU:LLA: korjaus 63e742f1f (natiivi-backup natiiviseppa/mono-selvitys, wt /Users/Shared/Claude/wt/proto-natiiviseppa-tyokalu3,
   kaanna-editori 0 virhettä). Mono-2:n vika: analyysi itse oli suurin varaaja (Analysoi/Merkit/Kutsupaikka 215 000 kpl) ja venytti
   20 s:n mittauksen > 60 s:iin (valmis-rivi aikarajan jälkeen). Nyt avain luvuista, omat varaukset erikseen ("oma analyysi X Mt",
   "kesto s"). Skenaario sk-mono-pariisi.txt oleta 120 s. Ajopyyntö _tyo/natiiviseppa/mono/ajopyynto-mac-mono-3.md → lokit/ns-mono-3.
   LUE: grep 'MONO-' lokit/ns-mono-3/unity.log → kesto ≈ 20 s? oma analyysi pieni? 5 suurinta varaajaa ennen|valmis kutsupaikkoineen.
   → YKSI viesti KK:lle (kopio PT): kolme suurinta varaajaa kutsupaikkoineen + toistuuko ennen kaupunkia + mono-käyrä. Ei korjauksia peliin.
   Mono-2:n luvut (analyysi pois): ennen MiniJson Jasennin.Merkkijono 2,7 Mt, Nimikerros.Mittaa 2,3 Mt; valmis ElavaTyyli.Sumea 17,2 Mt
   (36 kpl, Thread Pool), ElavaTyyli.Suurenna 2,3 Mt; mono 571 → 582 Mt / 20 s (T3-kokeen 632 → 1584 ei toistunut). "ennen"-osassa vain
   6 kehystä 20 s:ssa (eräajon lataus).
3b. 09.10 MONO-3 LUETTU → KK (kopio PT): mittari kunnossa (kesto 20 s, oma 2–3 Mt). Valmiin jälkeen +4 Mt/s, 36 % ElavaTyyli.Sumea
   (:818, uudet double/float-taulukot ~0,5 Mt per ruutu), ElavaHaku 23 Mt; ennen kaupunkia ei toistu. Korjausehdotus (Sumean taulukot
   uudelleenkäyttöön) ODOTTAA KK:n sanaa; kysytty KK:lta seuraava (pari-b?). 63e742f1f ei junaan.
   Avainkorjaus 4f544a8ef (KK 09.05): uudet avaimet alkuperäisestä tekstistä, haku kuten Valmisluennat.Url; jono 224.
4. KAUPUNKITYÖKALUT: T1 kaupunkitaulu LINKISSÄ 224.95, T3-rivit 224.84. Mono = viimeinen auki oleva. Sen jälkeen kysy KK:lta seuraava.

## Muut auki

- PARI-B (9a78cd26b, lokit natiiviseppa-juoksu-pala3-pari-b, 27 kuvaa) EI LUETTU. LAV 03.3x: tarkista ENSIN unity.logista tai lyhyellä
  QA-ajolla kohdassa (−136, 336), kumpi osasarjan v15 taso piirtyy (lähi/atlas vai kauko0, karki.bin) ja latautuiko r_*.png → vika
  pelissä (NS korjaa: lähitason etäisyys / atlaksen lataus) vai leivonnassa (LAV). Sitten A|B|C samasta kamerasta täysikoossa KK:lle
  LAV:n selityksen kanssa (kopio LAV). HUOM PUUTE 2 = odota-maailma aikaraja (näkyvät 1409 → 1548): tarkista, ovatko kuvat valmiista
  maailmasta. Ei KK:n järjestyksessä → mono-3:n jälkeen tai kun KK sanoo.
- Junassa/linkissä: palkki-6 + palkki-7 224.101 (67092d8d5), kertojan esilataus 224.96, T1 224.95. Ei odottavia pt-ok-pyyntöjä.
- Muistin keventäminen: 0, V, 1, 2a junassa; jäljellä iPad-vahvistus + laattamuisti 1–3 KK:n iPad-erässä (työlista päivitetty 09.03).
- Kertojan esilataus: laitteen luku seuraavassa iPad-erässä (ei erillistä ajoa).
- Työkopiot: latausjono, tyokalu3 (mono), kaupunkitaulu, pala3, kertoja-esilataus, tyokalut, natiiviseppa-aanitysjono,
  proto-natiiviseppa-aanitysjono, natiiviseppa-luovutus. Valmiit pois, kun haara on mainissa/junassa.
- Cron klo 9.04 (unity-julkaisut.py, tyokalut/natiiviseppa-skriptit/) on sessiokohtainen: luo uudelleen tarvittaessa.
