# Natiivin ✕-napit (inventaario 5.10.2026)

Omistajan linja 5.10.2026 klo 00.1x: "pyritään aina välttämään turhia x nappeja jos saman voi tehdä jollain toisella tavalla
esim. Klikkaamalla tyhjää kohtaa". Lähde: proto (natiivi-ui/iss-taulu-vaaka, master 9663df99 + junan 142 erät), Natiivi-UI.
Polut ovat suhteessa `Assets/Matkakirja/`. Suositus: **pois** = ✕ voidaan poistaa, koska muu sulkutapa on jo olemassa;
**jää** = ✕ on ainoa tai turvallisin tapa; **siivous** = nappi on jo piilossa tai koodi on kuollutta, joten sen voi poistaa ilman näkyvää muutosta.

| # | Näkymä | Tiedosto | Sulkee | Muu sulkutapa nyt | Suositus |
|---|---|---|---|---|---|
| 1 | Julistegalleria | UI/Galleriat.cs:53 | galleria + suurennos | himmennyksen napautus | **pois** |
| 2 | Maakuntalappu (kartan oikea yläkulma) | UI/Karttaselite.cs:119 | maakuntalappu | tyhjä napautus mereen / saman maakunnan uudelleen | **pois** |
| 3 | Minipopup (paperikortti: Tietäjän tie, reaktiot, traileri …) | UI/Minipopup.cs:46 | minipopup | himmennyksen napautus | **pois** |
| 4 | Pikkuseloste (i-laatikko) | UI/Minipopup.cs:123 | seloste | ohinapautus, i uudelleen | **pois** |
| 5 | Nähtävyysnäkymä | UI/Nahtavyysnakyma.cs:41 | lehtiarkki | taustapeitteen napautus | **pois** |
| 6 | Lehden Sisällys-levy | UI/Lehti/Lehtinakyma.cs:173 | sisällys | ohinapautus, ☰ uudelleen | **pois** |
| 7 | Sähketehtävä (pöllön kortti) | UI/Sahke/Sahketehtava.cs:141 | kortti | "Myöhemmin" / "Selvä" / "Anna Livian mennä" | **pois** (kortin omat napit riittävät) |
| 8 | Kohdekartan kokoruutu | UI/KohdekarttaNakyma.cs:845 | suurennettu kartta | pohja sulkee vain avauskortista avattuna | **jää** (pohja on panoroitava kartta; napautus ei voi olla sulku) |
| 9 | Tiedeliite (keksintölinssi) | UI/Linssit/Tiedeliitenakyma.cs:57 | tiedeliitekortti | ei muuta tapaa | **jää**, tai lisätään ohinapautus ja sitten pois |
| 10 | Sähke-liuska kartalla | UI/Sahke/SahkeNakyma.cs:66 | liuska | ei ohinapautusta (ei-modaalinen, kartta toimii alla) | **jää** |
| 11 | Mylly (peli) | UI/Pelit/MyllyNakyma.cs:116 | peli | Peruuta / Jatka matkaa / Luovuta | **jää** (vahinkonapautus ei saa keskeyttää peliä) |
| 12 | Linssin sulkupilleri "Sulje linssi" | UI/Linssit/LinssiUi.cs:109 | auki oleva linssi | valikon "Ota linssi pois", ☰ "Poistu" osassa linssejä | **jää** (ainoa yhtenäinen poistumistie kaikista linsseistä) |
| 13 | Astronautin kuvanäkymä | UI/Linssit/Kuvanakyma.cs:144 | kuva (linssi jää) | Pulun taulun rivi (Maapallo) | **jää** (koko ruutu, napautus zoomaa/selaa) |
| 14 | Ajattelijat-kohtaus | UI/Linssit/AjattelijaNakyma.cs:130 | kohtaus | veto alas, Esc | **jää** (näkyy vain napautuksen jälkeen ja häipyy 4 s:ssa) |
| 15 | ISS-kytkinpöytä "POISTU ×" | UI/Linssit/IssKytkinpoyta.cs:86 | poistuu kyydistä | Pulun taulun Poistu | **jää** (kytkin, ei sulkunappi; ×-merkin voi poistaa tekstistä) |
| 16 | ISS-kyyti vanha ✕ "Pois kyydistä" | UI/Linssit/IssKyytiNakyma.cs:382 | kyyti | kytkinpöytä ja Pulun taulu | **siivous** (piilossa kytkinpöydän kanssa) |
| 17 | Karttaselite, vanha NOSTOT/MAAKUNNAT | UI/Karttaselite.cs:93 | paneeli | – | **siivous** (piilossa) |
| 18 | Maakuntakortti | UI/Maakunnat.cs:767 | kortti | himmennys, veto alas | **siivous** (jo piilossa) |
| 19 | Avauskortti | UI/Avauskortti.cs:124 | kortti | ohinapautus, veto alas | **siivous** (jo piilossa) |
| 20 | Linssivalikko vanha `ylaSulje` | UI/Linssit/Linssivalitsin.cs:87 | valikko | ohinapautus | **siivous** (piilossa v2:ssa, joka on oletus) |
| 21 | Linssivalikon "Muut"-paneeli | UI/Linssit/Linssivalitsin.cs:112 | valikko | – | **siivous** (kuollutta koodia) |

Jo ilman ✕:ää: Pulun chat (Pulu, ohinapautus), Pulun "Minne katsotaan?" -taulu (✕ poistettu 5.10., haara iss-taulu-vaaka), nostokortti ja
Ihmisen nostokortti (veto alas), kaupunkikortti (ohinapautus), lehden kuvasuurennos (napautus, veto alas).
Ei ✕:ää mutta "Sulje"-tekstinappi: Wikipedia-ikkuna, Tietoja, Mitä uutta ja Nähtävyysarkki (kaikissa himmennys sulkee → teksti
"Sulje" voidaan samalla perusteella poistaa); Tähtitaivaan kortti (ei muuta tapaa → jää); Myllyn säännöt (valintaikkuna → jää).
Kehittäjän mikseripaneeli (UI/Linssit/MikseriPaneeli.cs:104) ei ole pelaajalle näkyvä.

**Yhteenveto:** 7 pois (1–7), 7 jää (8–14, joista 9 voi muuttua pois, jos lisätään ohinapautus), 1 kytkin (15) ja 6 siivousta (16–21,
ei näkyvää muutosta). Poistot ovat UI-pohjien sisäisiä (Ohjausnappi tai ×-teksti pois, sulkutapa ennallaan), eivät vaadi uutta tyyliä.
