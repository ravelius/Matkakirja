# Luurankokatot (koe7), Karttaseppä 10.11.2026

Kopio työkansiosta `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/` (aineistot ja palat siellä, ei repossa).
Koe Pariisin (Louvren pohjoispuoli) ja Lontoon (Westminster–Covent Garden) 1 km²:n koealueille; PT hyväksyi Macin parin 10.11. 04.4x.

- `katot.py`: katon muoto luurangosta (mansardi, auma, harja, tasakatto), yksinkertaistus (KATOT_YKSINK), T-liitosten korjaus.
  koe7 = koe6 + `KATOT_KIERRE_OHITA=1`: T-liitoskorjauksen kierteessä vain toistuva kolmio pois; koe3–6 palauttivat koko talon
  korjaamattomaksi (Pariisin koealueella 72 taloa), mikä teki pitkät saumat (way/54661742). `KATOT_KATKOLOKI` kirjaa palautukset.
- `tee-palat-luuranko.py` (Pariisi), `tee-palat-lontoo-luuranko.py` (Lontoo): vaiheet `KATOT_VAIHE=pohjat` → `luuranko_blender.py` → `rakenna`.
- `aja-koe7.zsh`: koe7:n vaihe 3 molempiin kaupunkeihin. `aja-katkoloki.zsh`: palautusten kirjaus. `saumat.py`: saumapikselit Mac-kuvista.

Polut ovat Mac Studion työkansion; skriptit eivät ole osa pelin käännöstä. Tulos viedään peliin palakansiona (JU), kun PT kuittaa junaan.
