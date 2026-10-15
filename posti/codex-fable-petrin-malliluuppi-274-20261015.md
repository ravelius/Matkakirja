# Codex → Fable/PT: Petřín #274 — M11–M15 valmiit, paras ja viimeisin M15 palautteelle

Jatkoin hyväksytyn M09-pohjan päältä lähteen `e8a797c5e3aaf2360c8bbd39db375a7a1fdf3fde` mukaiset **viisi lisäkierrosta M11–M15**. Raja on täynnä, joten mallinnus on pysäytetty palautteelle. **M16:ta ei ole valtuutettu eikä aloitettu.**

**Paras ja viimeisin ovat sama M15:** [viiden näkymän vertailu](petrin-malliluuppi-274/M15/qa/petrin-M15-comparison-sheet.png), [todellinen Blender-malli](petrin-malliluuppi-274/M15/petrin-M15.blend). Viisi natiivia renderiä, maskit, tarkat kamerat, koodi ja tallennetun mallin auditointi ovat samassa kansiossa. M11–M14-mallit ja luvut säilyvät `history/`-kansiossa; M01–M10-toimitus on ennallaan.

| Versio | K1, raja 85 | K2, raja 90 | K3, raja 90 | K4, raja 90 | K5, raja 90 | Keskiarvo |
|---|---:|---:|---:|---:|---:|---:|
| M09 pohja | 83.629 | 91.547 | 89.133 | 89.364 | 86.247 | 87.984 |
| M15 paras/viimeisin | 85.781 | 91.989 | 90.152 | 90.356 | 86.823 | 89.020 |

**K1–K4 läpäisevät. K5 on 86,823 % / 90 %; koko mallin läpäisyä tai lopullista hyväksyntää ei väitetä.** Paras valittiin samalla ennakolta kirjatulla heikoimman raja-arvoon suhteutetun natiivi-IoU:n kriteerillä. [Täysi raportti](petrin-malliluuppi-274/README-FI.md), [kierrosloki](petrin-malliluuppi-274/loop-journal.json), [tuore erillinen loppuarvio](petrin-malliluuppi-274/final-independent-review.json), [25 natiivinäkymän numeerinen varmennus](petrin-malliluuppi-274/final-numerical-verification.json), [tavutiedot](petrin-malliluuppi-274/delivery-packet.json).

Yläkopin leveyttä/olkakohtaa ja epävarmaa mastoa sovitettiin, alatasanteelle lisättiin todelliset vinotuet, uloketta tarkennettiin ja halliin tehtiin punaiset ikkunaluukut. **58,7 / 20 / 51 m säilyvät kaikissa viidessä tallennetussa mallissa.** Generoitujen tavoitteiden tasannevirheitä ei kopioitu lattiakorkeuksiin. Harmaa maa ja neutraali valkoinen päivänvalo poistavat aiemman vihertävän ympäristövalaistuksen; teräs on tumma sinertävänharmaa, halli vaalea kerma ja luukut punaiset. Sitova materiaali-ΔE pysyy `null`; pikselisävyero on diagnostiikkaa.

Yläkoppi/masto, hallin aukotuksen rytmi ja jalkojen/kaarien liitokset sekä alatasanteen detaljit jäävät osin kaavamaisiksi. K5:n ulkoraja jää vajaaksi. K5:n maapiste on arvio ja K4:n pohjoisdetaljit varmentamaton rekonstruktio. Kamera- ja geometriamuutokset on erotettu raporteissa; kaikki tavoitekuvat/maskit säilyvät tavutarkasti ennallaan.

Uusia AI-kuvia 0. Ei R2-vientiä, peli-integraatiota, main-yhdistämistä tai julkaisua. **Odotan PT:n palautetta tämän rajatun luupin jälkeen.**
