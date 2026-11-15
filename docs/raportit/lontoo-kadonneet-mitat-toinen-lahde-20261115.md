# Lontoon neljän kadonneen kohteen mitat ja paikka toisella lähteellä (SK 15.11.2026)

Pohja: NSe:n SELVITYS.md + pohjat-lontoo.json (mitat en.wikipediasta). Tässä toinen, itsenäinen lähde jokaiselle. Robots tarkistettu ennen jokaista sivua;
estetyt jätetty (british-history.ac.uk 403, ADS:n PDF palautti vain virhesivun, Britannica/structurae säännön mukaan pois). Pelin nimet (`tahti`) = data/kohdekartat-sijainnit.json.

| Kohde | `tahti` | Mitat (en.wikipedia) | Toinen lähde | Tulos |
|---|---|---|---|---|
| Vanha London Bridge | `Vanha London Bridge` | 282 m, 19 kaarta, leveys 6–7 m | Maitland/Entick, *History and Antiquities of London* (1775, Tufts DL): 926 jalkaa (282 m), 19 kaarta, leveys 40 jalkaa (12 m, vanha arvio), n. 60 jalkaa vedenpinnan yläpuolella; guidelondon.org.uk: 926 jalkaa, n. 150 jalkaa (46 m) nykyisestä sillasta itään | Pituus ja kaaret VAHVISTETTU. Leveys EROAA: 6–7 m (WP, Pepys Diary -tietosanakirja, talot mukana) vs 12 m (1775) → käytä 6–7 m, 12 m jos halutaan leveä. Paikka: WP 30 m, guidelondon 46 m alavirtaan (itään) → 30–46 m |
| Newgate (Dancen vankila) | `Newgaten vankila` | n. 90 × 55 m ARVIO | Kolme eri lähdettä, ei yhtään rakennuksen mittaa: tontti 1 600 × 50 jalkaa (WP) on kaupungin maa-alue, ei rakennus; "85 × 50 jalkaa" (mapoflondon.uvic.ca) koskee Whittingtonin 1400-luvun vankilaa, EI Dancea | Mitat EI VAHVISTETTAVISSA saatavilla lähteillä: jää ARVIOKSI (rintama Old Baileylle). Paikka: Wikidata = WP-piste (Old Bailey / Newgate Street -kulma); kaikki lähteet: Central Criminal Court seisoo paikalla |
| Globe 1599 | `Shakespeare 1599` | 20-kulmio, ⌀ n. 30 m | Egan, *EMLS* 2004 (SHU, vertaisarvioitu): 20-kulmio, "very nearly 100 feet" (30,5 m) halkaisija kulmien yli, kaivaus Blatherwick & Gurr 1992; Britannica-haun tiivistelmä: kopio 99 jalkaa (30 m) | VAHVISTETTU (30–30,5 m; muoto oletus säännölliseksi, Egan huomauttaa epävarmuuden). Korkeus 3 krs: ei toista lähdettä, jätetty. Paikka: Egan: perustukset Anchor Terracen alla, Southwark Bridge Road; OSM-haku (Nominatim) Anchor Terrace 51,50675 −0,09486 vs pelin piste 51,50667 −0,09472 → 13 m, VAHVISTETTU |
| Euston Arch | `Euston Arch` | 21 m korkea, 13 m syvä | Grace's Guide: "72 ft high Doric propylaeum"; theunfinishedcity.co.uk: 72 jalkaa (22 m); victorianweb (Durant): pylväät lähes 13 m | Korkeus 21–22 m (WP 70 ft, kaksi muuta 72 ft) → käytä 22 m tai 21,5 m; syvyyttä (44 ft = 13 m) ei vahvista toinen lähde. Paikka EPÄVARMA: Wikidata 51,5286 −0,13375 on aseman sisällä; pelin piste 51,5272 −0,1335 on 157 m etelään siitä; OSM Euston Grove (kaaren sisäänajotie) 51,52705 −0,13230 on 85 m pelin pisteestä itään → tarvitaan 1830–70-luvun karttalähde (asemapiirros 1838 / OS) |

## Johtopäätös NSe:lle ja KK:lle
- **London Bridge** (ensin): pituus 282 m, 19 kaarta, leveys 6–7 m varmat. SIIRTO: pelin piste on käytännössä nykyisen sillan keskellä (Wikidata nimi+säde); vanha silta oli 30–46 m alavirtaan, eikä se ollut suora. Kehys vaatii siirron ja suunnan; paikka vedessä.
- **Globe**: mitat ja paikka kunnossa.
- **Newgate**: rintaman mitat jäävät arvioksi; pohja luonnos.
- **Euston Arch**: korkeus ±1 m; paikka on avoin, sama kuin "100,1 % aseman sisällä" -havainto. Älä rakenna ennen karttalähdettä.
