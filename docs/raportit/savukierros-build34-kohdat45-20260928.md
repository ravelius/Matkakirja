# BUILD 34 kohdat 4-5: selvitys ja todennus (Laitetestaaja, 28.9.2026 klo 08.0x)

Jatkoa `savukierros-build34-puhetagit-20260928.md`:lle. iPhone 18 Pro (1572C658), sama asennus
(17c2928b, tag build34).

## Kohta 5 — Pulun "pollo"-persoonatagi: PASS (väärä testikomento aiemmin)

**Juurisyy löydetty koodista (Pulu.cs `Sano()`, UiKomennot.cs `case "pulu"`/`"sano"`):**
`ui pulu sano <teksti>` kutsuu `Pulu.Sano(teksti)`, joka näyttää VAIN puhekuplan + valinnaisen
ESIÄÄNITETYN mp3:n (`Aanet.Soita`) — se EI KOSKAAN kutsu `Puhe.Lue(...)`. Siksi komento aina
palautti "→ ok" muttei koskaan tuottanut TTS-lokiriviä: komento ei mene puhesynteesin läpi
lainkaan, ei bugi vaan väärä testikomento.

**Oikea polku (koodihaku `PuluChat.cs`):** persoona "pollo" menee `Puhe.Lue(vastaus, "pollo")`:hen
VAIN `PuluChat`:in kautta, kun kaiutinvipu (`AaniPaalla`) on päällä ja chat-vastaus renderöityy
(`VaihdaAani()`: uusi ON myös lukee jo näkyvissä olevan viimeisimmän vastauksen ilman uutta
kysymystä, jos `!kysyy`).

**Todennus (yksi minimaalinen `ui chat` -kysymys, xAI-kulutus ~1 kpl, kirjattu tähän avoimuuden
vuoksi):**
```
echo "ui chat aani" > ui-komento.txt        # → "päällä"
echo "ui chat Mika on Akropolis" > ui-komento.txt
echo "puhe palat" > peli-komento.txt
```
Tulos peli-lokissa: `palat soitettu 1, jatkettu kesken 0, uusittu 0, alkoi myöhässä 0` ja
`pala 1/3 196 mrk soi 11,8/12,0 s, verkko, worker generoitu 200` — todistettu verkkopyyntö ja
oikea soitto, ei pelkkä "ok". Koska tämä koodipolku on ainoa, joka kutsuu `Puhe.Lue(_, "pollo")`,
tulos vahvistaa persoonatagin toimivan. Kaiutin palautettu pois (`ui chat aani` → "pois") lopuksi.

**Jatkoa varten:** jos pollo-persoonaa pitää testata jatkossa ILMAN uutta xAI-kysymystä, käytä
`VastaaLinssinValmiilla`-polkua (PuluChat.cs): aktiivisen "linssi"-näkymän (esim. `linssi
radio|satelliitti|...`) valmiiksi kirjoitettu kysymys-chippi (`mk-chat__siru`) antaa säilötyn
vastauksen ILMAN xAI-kutsua ja lukee sen silti "pollo"-persoonalla, jos kaiutin on päällä —
en ehtinyt todentaa tätä erikseen tällä kierroksella.

## Kohta 4 — Väliotsikon [long-pause]: EI TODENNETTAVISSA nykysisällöllä (ei bugi)

**Koodi (`Lukijaaani.cs LuennanPalatJaTagit`):** `[long-pause]` syntyy, kun luettavien tekstien
LISTASSA (ei yhden merkkijonon sisällä) yksi alkio on "otsikko" (`OnOtsikko`: ≤120 merkkiä, ei
lopetusmerkkiä) ja SEURAAVA alkio on tavallinen kappale. Kolme kutsupaikkaa:
`KortinLukija`/Nostokortti (otsikko+ingressi+`Kappaleet(Teksti)`), `Nahtavyysarkki`, `Lehtinakyma`
(kaikki näkyvät `mk-lehti__luettava`-labelit DOM-järjestyksessä).

**Sisältöhaku (kattava, node-skripti `js/packs/*.js` yli, 2483 monikappaleista tekstiä
tarkistettu):** YHDESSÄKÄÄN pelin sisältöpaketin tekstissä ei ole väliin jäävää lyhyttä
otsikkorivi-kappaletta (`\n\n`-jaon jälkeen). Nähtävyysjutut ovat tarkoituksella lyhyitä
(2-3 kappaletta, ei väliotsikkoja, omistajan linjaus 8.8.2026). Nosto-otsikko+ingressi eivät
itse laukaise long-pausea (ne sulautuvat samaan ensimmäiseen palaan).

**Vinkkilistan ryhmäotsikko (Lehtinakyma.cs `Lista()`, "Ryhmäotsikko on väliotsikko" -kommentti)
EI OLE mukana luennassa:** ryhmäotsikkolabel (`mk-lehti__osasto`) luodaan `Rakenne.Teksti(...)`:llä
ilman `mk-lehti__luettava`-luokkaa — vain listakohteen oma teksti (`Kappale()`) on luettava.

**Johtopäätös:** `[long-pause]`-koodipolku on olemassa ja looginen (testattu ilmeisesti myös
LukijaaaniTestit.cs:n yksikkötesteillä), mutta MIKÄÄN nykyinen sisältö+UI-yhdistelmä pelissä ei
tällä hetkellä tuota siihen tarvittavaa rakennetta laitteella. Ei siis FAIL eikä PASS — sisällössä
ei ole testattavaa tapausta. Jos tämä pitää varmistaa ennen julkaisua, tarvitaan joko (a) uusi
sisältö jossa on aito väliotsikko keskellä tekstiä (Sisältökirjurin päätös), tai (b) debug-komento
joka syöttää synteettisen monikappaleisen listan suoraan `Lukijaaani.LuennanPalatJaTagit`:iin.

## Yhteenveto Fablelle

Kohta 5: **PASS**, aiempi epäonnistuminen oli väärä testikomento (`ui pulu sano` ei mene TTS:n
läpi lainkaan) — oikea polku `ui chat aani` + `ui chat <kysymys>`, todistettu palaloki-datalla.
Kohta 4: **ei todennettavissa nykysisällöllä** — koodi vaikuttaa oikealta, mutta yksikään
sisältöpaketti ei sisällä testattavaa väliotsikkorakennetta; ei julkaisua estävä löydös.
