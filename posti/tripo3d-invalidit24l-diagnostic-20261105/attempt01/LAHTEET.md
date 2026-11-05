# Lähteet ja rajaus

- Tilaus: `context/TILAUS-24l-invalidit-tripo.md` (kopio intake-paketista; SHA-256 17cd2342662f864eb09692aa8ed993d2f2175893c173c993ffabfb95d38c8132).
- Syötekuvien manifesti: `context/source-preflight.json`; hyväksytyt Tripo-syötteet olivat viisto-lounas.png ja viisto-koillinen.png. Tämän otoksen diagnostinen paketti ei kopioi eikä muuta lähdekuvia.
- Rajauskuvien ja mallin numerolähde: `previews/attempt01-diagnostic-yaw0-*.png`, `model/attempt01-diagnostic-yaw0.glb` ja alkuperäinen `qa/attempt01-diagnostic-yaw0.json`.
- Riippumaton auditointi: `qa/independent-audit.json`; laskenta käytti tilauksen työkalua `tools/meshkit.py` ja `tools/numeric_qa.py`, ei mallimuutoksia eikä uusia renderöintejä.
- Pihojen vertailulähde on tilauksessa nimetty vain tarkistukseen sallittu ylhaalta.png. Kolmionäytteet todentavat pintaa pisteissä, eivät yksin kattoaukkojen erillisyyttä.
