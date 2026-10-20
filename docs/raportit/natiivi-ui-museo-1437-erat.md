# Natiivi-UI: omistajan museopyyntö 14.37 (20.10.2026) – kolme erää

Proto natiivi-ui/kertoja-napit-208-juna (/Users/Shared/Claude/wt/proto-natiivi-ui-museo-teoskortti-208), kärki 9aabbb409.
tarkista.sh puhdas (0 virhettä, vahdit ok, kameratesti 31/31), linssitestit 2165/2165.

1. 7904d8982 – Mona Lisa zoomautui kehyksen sisällä: syy datassa. teokset.json px 7479×11146, mutta ASTC-paketti on rajattu
   8192 px:iin (5497×8192, zmax 4). Peli rakensi ruutupyramidin datan px:stä (Zmax 5) → lähikuvan ruudut väärässä koossa ja
   paikassa. Korjaus: yli 8192 px:n teoksille mitat paketin teos.json:sta (levyvälimuistissa), varalla 8192:een skaalattu arvio.
   Koskee 19 Ranskan teosta (mm. inv-775, inv-611, inv-71, orsay-rf-2739). Testi YliPaketinLahdeSkaalautuuPaketinMittoihin.
2. 9692e6e2d – AUTO ZOOM rauhallisemmaksi: lähekkäiset kertojan kohdat yhteen (väli < 4 s → ei käyntiä koko kankaassa),
   lopussa (< 5 s jäljellä) lähikuva pysyy ja yksi ulosliuku vie pysähdykseen, Auto Zoom alkaa vain jos lähikuvaa jää ≥ 4 s
   (ennen 1 s). Nykäys ylös/alas: näkymä oli kehystä leveämpi, rajaus piti kohdistuksen keskellä ja se lähti äkisti; nyt
   kohdistus on osuus liikkumavarasta → nopeuden hyppy 0,57/0,81 → 0,14/0,15 huippuaskeleesta. Testi AutoZoomRauhallinen.
3. 9aabbb409 – kytkinnapin yhteinen päällä-tila: läpikuultava oranssi --tk-tila-live-kuulto (olemassa oleva token, kuten LIVE),
   kuvake paperi-muste; Ohjausnappi.Kytkin (🔈 ja T 9 linssissä + museo, museon suurennuslasi ja vapaa kulku) ja AUTO-pilleri
   (AUTO ZOOM, astronautin AUTO). Web-tyylikirja ravelius/Matkakirja#5041 (vain kuvausrivi + generoitu lähde-tunniste).
   Ei muutettu: ▷/⏸ (toisto, ei kytkin), oppaan mikki (oma pohja), nostoselaimen paperinen AUTO.
   Jos omistaja haluaa vielä himmeämmän: uusi token → PT:n päätös.

Ei simukuvia (omistaja 11.45: simu vain uudelle tekniikalle/pyydetyille kuville). Kohta 4 (valoläikkä) Valosepälle.
