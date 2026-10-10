# Siirtosepän luovutus 10.10.2026 päivä (Opus 5.5, high; PT:n nollaus 09.2x, konteksti 51 %)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high): johdat Olavinlinnan historiamoottoria (pelattava pala, esittely, historia, linnan äänet, LR:n pakettien
kytkentä). Lue tämä, CLAUDE.md ja Raamatun Ydinajatus kohta 2. Testaus vain automaattisin; simuajot vain kuva-arkkeihin ja PT:n pyytämiin
kaappauksiin Julkaisijan KÄÄNNÖS NYT / SIMULAATTORI NYT -vuorolla, oma simu 8362879F-30B9-4625-9F42-57326EBC3439 (T7-sarja:
`source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh`). Ilmoita Julkaisijalle "lukko vapaa" / "simu vapaa".
Proto-worktree /Users/Shared/Claude/wt/proto-siirtoseppa-kello (nyt haara siirtoseppa/esittely-vaiheet). Varmuuskopio natiivi-backup
peili/proto/siirtoseppa-<haara> (push -f estetty → uusi nimi). Skenaariot /Users/Shared/Claude/proto-3d/tyokalut/siirtoseppa-ajot/skenaariot/.
UNITY 6.7 ON PÄÄLINJA (omistaja 10.10.): runko natiiviseppa/juna-175 a4c6539e5; Linssit-testit/unity-tarkistus.sh valitsee editorin ja
kirjastot unity-polku.sh:lla. Ei uusia GetInstanceID-kutsuja (CS0619).

**Ensimmäinen tehtävä:** kun LR (uusi sessio) lähettää v46z-hashit (kappeli-kavelyn rajaus korjattu), kytke ne haaran
`siirtoseppa/v46y-kytkenta-kesken` 192e4a36d päälle (PelattavaPala.Hash/Versio + EsittelyHash/EsittelyVersio + kultaiset osat/merkit/rakennus
paketista blender/kavely/*.json ja rakennus.json), aja Linssit + unity-tarkistus, ja kun OlavinlinnaMOsaTestit.KiinniTarkistuspisteeseenJaLoppuun
on vihreä (PT: rajaa EI löysätä), yhdistä esittely-vaiheet 479702aac:n kanssa → SHA PT:lle.

## JUNA 175 — LÄHTI (BUILD 86ef3b3e6, Unity 6.7)

`siirtoseppa/esittely-1499` 6bd5a6f5d (Natiivisepän runko d85e703fc/a4c6539e5): esittely nykyasun paketista PelattavaPala.EsittelyHash
v46x-nyky 66cd02861b568a52 (kartiot), pala + historia 1499-paketista Hash v46w c6aac9f0680488a6; esittelystä palaan/☰-historiaan
ladataan 1499-paketti ensin. Esittelyn 1499-asu poistettu (19028f893, omistaja 07.1x). Nopea syke pysyy havainnon ajan + 3 s
(Vartija.Nakee, SykeSekoitus.Pito). PT hyväksyi arkin todistus-esittely-nyky-175-67-20261010-0848 (kartiot ok, kallio tumma).
Vaaleat rantakivet hämärässä = huomio LR:lle myöhemmin (näkyvät jo v46w:ssä).

## JUNA 176 — `siirtoseppa/esittely-vaiheet` 479702aac (a4c6539e5:n päällä; Linssit 1296/1296, unity 0 6.7:llä)

1. Esittelyn vaiheet: ensimmäisen saapumiskaaren jälkeen Historiajana.Esittely (~90 s) historian moottorilla, kamera jatkaa saapumisen
   loppuasennosta (Historiajana.AsentoSijainnista/AsetaAlku), linnan aika jäädytetty (DioraamaSovitin.vaiheT), kertojan kierros jatkuu perään;
   pala keskeyttää; kehityskomento `poikki vaiheet 0|1|nyt`.
2. Esihistoria (Sisältökirjurin faktapohja docs/raportit/olavinlinna-esihistoria-faktapohja-20261010.md, PR #4322): Saimaa → kivikausi +
   kalliomaalaukset → rautakausi → 1323 (ei rajaviivaa); avainsanat olavinlinna.historia.esi-*; ei Savonlinnaa koskevia väitteitä.
3. Kertoja v2 (Pelikoodari, omistajan lupa): Historiajana.KertojaJuuri = media…/seikkailu/olavinlinna/vaihe-esittely-v2/aani/, HistoriaVaihe.KertojaAvain
   esi-saimaa / esi-1323 (rautakaudesta) / vaihe-1475 / vaihe-nyky; kestot 16,64 / 15,12 / 11,62 / 6,14 s, testi valvoo päällekkäisyydet.
4. Historian jääkausiteksti PT:n kaanonilla "Jäätikkö sulaa ja maa kohoaa – Saimaa syntyy."
5. Vaihemallien savu: SeikkailuVaiheet lukee glb:n tyhjät (liekki:nuotio, savu:kaski-*) → DioraamaSavu.LisaaTila(vanhempi = vaihe).
AUKI 176: kartiot esittelyn linnan vaiheissa piiloon ennen 1790 vaatii v46y/v46z-nyky-paketin (n1790-*-vuosileikkaukset); vaihearkki
(`poikki vaiheet nyt`, 6.7-käännös) PT:lle kuittausta varten v46z:n kytkennän jälkeen.

## v46y — `siirtoseppa/v46y-kytkenta-kesken` 192e4a36d (EI junaan)

Pala d1a8ad15aeb7f0af v46y, esittely c60e46eb73969b9a v46y-nyky, LeikkauksiaMax 32 → 48 (SeikkailuKavely + DioraamaKuori.shader).
Kaatuu: kiinni 70 tarkistuspiste 4,9 m komerosta, koska v46y:n kappeli-kavely ulottuu muuriportaiden komeron (−20,7, 8,1, −11,1) kohdalle
(osa vaihtelee kirkkotorni-portaat ↔ kappeli-kavely). PT: LR korjaa v46z:aan.

## OPITTUA

- "ui seikkailutapit pala" auki olevassa linnassa SULKEE linnan (Valitse-vaihtokytkin) → palaskenaariot aina kartalta.
- Palassa `poikki kamera` ei ohjaa kameraa (pelaajan kamera) → palan kuvat pelaajan näkymästä.
- Sykekaappaus: botti jää kiinni samassa ruudussa → skenaario syke-kokki.txt (siirra reitti:pelaaja-11, kokki ei ota kiinni).
- Mustan korvauksen sävy tunnelman mukaan (SeikkailuHistoria.Hamara) — päiväsävy hämäräkuvalla = valkoinen kallio.
- LR:n paketin asu on rakennus.json:ssa (ulkokuori.asu), ei blender/ulkokuori/asu.json:ssa (v46y korjasi).
- Keskeytetyn todistusajon raportti: `python3 tyokalut/todistusajo/todistusraportti.py raportti <kansio> <erä> <sha> iphone <udid> <skenaario>`.
