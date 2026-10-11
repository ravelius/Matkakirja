# Pelikoodarin luovutus 11.10.2026 ilta 2 (uudelleenkäynnistys, PT ~19.3x)

Edellinen: viesti-pelikoodari-luovutus-20261011-ilta.md. Musiikki ja äänet siirtyivät ÄÄNITTÄJÄLLE (local_0275bc7a…);
Pelikoodarille jäävät pelin kytkennät (AaniTaulut, arvonta, worker) ja opas-/sisältödata.

## Valmista tänään (kaikki kuitattu tai mergetty)
- Juna 182: kukkaro 35025feed KUITATTU (simuajo v3: pilleri ei hyppää, summa keskellä) + soittosääntö.
- Juna 183, proto pelikoodari/musiikki-arvonta-183 **a3ab09f73** KUITATTU, Natiivisepän jonossa (korvaa a5995394f):
  47 kaupungin nopeat introt + Moskova (musa-kaupunki-moskova-nopea-2), hitaiden arvonta 10 kappaleesta (Euroopan kaupungit
  ilman omaa, ei samaa peräkkäin, oma HitaanArpa), Tukholman intron jälkeen arvottu hidas. Simulokit lokit/pelikoodari-musiikki-183*.
- Web: #4416 Stortorget (esittely-v3c, kuvat-v9, Sergels torg pois), #4419 Olavinlinnan visa (sisältöpaketti v683, NUI:lle
  kerrottu), #4428 Pariisin kipin aukiot (esittely-v1h, kuvat-v10). Kaikki viety + worker julkaistu.
- Levy: mergetyt ja orvot worktreet poistettu.

## KESKEN (jatkokohta)
- **Aarrelaskuri X/50** (PT:n erä 183): proto pelikoodari/aarrelaskuri-50-183 **b15558f5f** (worktree wt/proto-pelikoodari-aarrelaskuri).
  Syy 49:ään: Euroopan pakassa 50, mutta Istanbul on laudalla Lähi-idässä (CITY_MANNER viimeinen pakka voittaa). Korjaus vain
  laskurissa (Laattamaailma.LaskurinSaumakaupungit). Peli-testit 508/508, tarkista.sh ok.
  Käännös linjalla 2 käynnissä (loki proto-3d/lokit/pelikoodari-aarrelaskuri-kaannos.log, app lokit/pelikoodari-aarrelaskuri-app).
  SEURAAVAKSI: KÄÄNNETTY → Julkaisijalta SIMULAATTORI NYT → scratchpadin ajo-aarrelaskuri.zsh (L=…, APPPOLKU=…; uusi peli Pariisi,
  odottaa "ui aarrelaskuri" → näkyy, kuva aarrelaskuri.png) → kuva + SHA PT:lle kuittaukseen → SHA Natiivisepälle.
  Skripti kopioitu myös docs-polun viereen: proto-3d/lokit/pelikoodari-aarrelaskuri-ajo.zsh.
- Sen jälkeen (PT): Codexin pääkaupunkierät kytkentään sitä mukaa kuin tulevat (posti/codex-fable-paakaupungit.md + SK:n
  pistokoe ensin). Karttaseppä: e04–e14 laudan rivit #4423 (tools/paakaupungit/laudan-rivit-e04-e14.json); Afrikan 42 kaupungin
  KAUPUNKIKARTAT-rivi pitää KORVATA, ei lisätä (kohdekartat-mac.json Karttasepältä erän saapuessa).

## Opit
- vie-sisalto.yml: cancel-in-progress false, mutta odottava ajo korvautuu uudemmalla → "cancelled" ei tarkoita, ettei muutos
  päätyisi pakettiin; tarkista uusimman onnistuneen ajon commit (uusin.json) ja moduulin sisältö.
- Testien "kaupunki ilman jaksoa" vaihtuu, kun nopeita lisätään: nyt Kairo (oma raita) ja Bratislava/Zagreb (ei omaa).
- Lyria: kaupunkinimi voi estää kehotteen → "An Irish city …".
