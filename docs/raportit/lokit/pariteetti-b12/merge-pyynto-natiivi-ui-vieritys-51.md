# Merge-pyyntö: natiivi-ui/vieritys-51b ae631e2 (juna/b12 57852a0:n päällä), Natiivi-UI 25.9.2026 — LÖYDÖS 51

Testit: unity-tarkistus 0 virhettä, uss ok. Testikäännös 17a8787 (vieritys-51b + sisallys-8 + nostot-50b) → iPad 503000D1.

## Juurisyy (maalehden tahmea vieritys)
Kainalonoston taitto (LehtiKainalo.LeveaNosto) luettiin kuvakehyksen asettelusta. Lataamattoman kuvan kehys on 6 pt
korkea (suhde 0,02 → "taysi"), ja kuvan latauduttua sama kainalo palautti "kainalo" ennen ajastettua
uudelleenrakennusta. Kainalo rakennettiin uudelleen joka kehys (6 636 kertaa lokissa, myös levossa), sivun korkeus
heilui 1496 ↔ 1063 pt ja ScrollView.UpdateScrollers nollasi vierityksen kesken vedon.
Korjaus: suhde tulee kuvasta (Lehtinakyma.Kuva → kehys.userData = kuvan korkeus / leveys). Sivu rakentuu kerran
(Marseille 1: 4 rakennusta, joista Vesimalja vaihtuu täysleveäksi kerran kuten webissä).

## Kosketusvieritys (uusi UI/Kosketusvieritys.cs, .meta käännöspalvelusta)
Mitattu iPad, heitto 120 pt / 96 ms: oma 524–680 pt, Safari 653 pt, UITK:n ScrollView 234 pt (hidastuvuus ei vaikuta).
Hidas veto 120 pt: 110 pt (1:1 8 pt:n kynnyksen jälkeen). Vertailu: `ui lehti vieritys oma|unity`.
Diagnoosilokit, hidastuvuuskokeilu ja tehoton flex-shrink ovat poissa.
