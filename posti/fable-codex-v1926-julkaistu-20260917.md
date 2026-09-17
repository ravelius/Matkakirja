## 2026-09-17 klo 03.15 UTC — Fable: v1926 julkaistu, WebApp-uusintatesti pyydetään

main = **86b28da6** (v1926, PR #2548). Mukana:

1. **iPhonen musta pallo** (Astronautin kamera): juurisyy iOS Safarin tyhjä
   kangas ilman virhettä (kaksi 4096×2048-kangasta); ladonta 2048×1024
   puhelimella, tyhjän kankaan tarkistus + puolitus, 8 s aikakatko.
2. **WebAppin tyhjä linssi**: todennäköisin juurisyy (n. 55 %) Globe.gl-
   kirjaston `<script src>`-lataus jäi WebKitissä kesken ilman virhettä eikä
   ketjussa ollut aikakatkoa. Nyt 12 s aikakatko + toinen yritys välimuistin
   ohi, avausvaiheet vartioitu (yksi kaatunut vaihe ei vie pisteitä eikä ääni
   estä pallon piirtoa), näkyvä ilmoitus tyhjän ruudun tilalle.
3. **Minipulun hover/active/focus-tausta pois** (css/satelliitti.css:
   `button.satelliitti-pulunappi:hover:not(:disabled)` ym. → transparent;
   focus-visible vihreä outline). Mitattu rgba(0,0,0,0).
4. Minipulun napautus avaa pulun normaalin chatin, selite avautuu
   pienennettynä (vinkkiavaus 1. kerralla), otsikkorivi vihreä.
5. Ihmisen matka: 5 s hitaampi zoom, Marokko zoomin jälkeen, koko Afrikka.

### Pyyntö: kohdistettu uusintatesti asennetussa Safari WebAppissa

Avaa sovellus osoitteella `?pallodiag=1` → vasempaan alakulmaan tulee musta
lokilaatikko → matkalaukku → Astronautin kamera → Aktivoi. Raportoi:

1. `kirjasto yritys=0 ok=?` — jos `ok=0 syy=kirjaston aikakatko`, juurisyy on
   vahvistettu; pelastiko `kirjasto-haku yritys=1 ohi=1`?
2. `avaruus-alku` — `kotelo`/`kangas` `0x0` → asetteluvika; `hukassa=1` →
   kuollut WebGL-konteksti; `itsenainen=1` vahvistaa standalone-tilan.
3. `vaihe nimi=… ok=0 syy=…` — kaatunut avausvaihe syineen.
4. `vartija puute=…` — `ei` = ehjä; muut: avaruusnakyma, webgl-konteksti,
   kangas, kotelo, pinta, pisteet.
5. Näkyykö ilmoitus viimeistään 12 s kuluttua? Kuvakaappaus laatikosta
   riittää juurisyyn naulaamiseen.

Lisäksi: toistuuko vika (jos ehdokas 1 oli oikea, linssi aukeaa nyt n. 12 s
viiveellä ensimmäisellä kerralla), ja taustalta paluu linssin ollessa auki
(jos pallo katoaa ja `puute=webgl-konteksti`, WebGL-kontekstin menetys on
todellinen ja saa oman korjauksensa). Mac Chromessa hover-tausta.

Ihmisen matka -äänitteen uusinta on yhä avoin pyyntö (simpukkavirke pois,
kappalejako valmis pelissä).
