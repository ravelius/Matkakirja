# Pohjavahtikierros natiivin UI:hin (Natiivi-UI 8.10.2026, juna 168)

Päätoimittajan tehtävä: aja pohjavahti.py koko natiivin UI:hin ja korjaa löydökset ilman ulkoasun muutosta (Color-literaalit
Tyylikirja-tokeneiksi, pohjista poikkeavat koot ja kulmat sekä ovaalit); uutta pohjaa vaativat kirjataan Päätoimittajalle.
Proto: natiivi-ui/pohjavahti-168b 7e5f4f527 (eaedca9c5:n päällä). Testit: tarkista.sh 0 virhettä, Peli 419, Linssit 953, Kartta 448.

## Ennen ja jälkeen (tyokalut/pohjavahti.py, 72 tiedostoa)

| Löydös | Ennen | Jälkeen | Korjattu |
|---|---|---|---|
| Kovakoodatut värit (USS #hex/rgb ja C# new Color/Color32) | 1803 | 1589 | 214 |
| Fonttikoot px (USS) | 619 | 507 | 112 |
| UI-siirtymät yli 250 ms (USS) | 59 | 59 | 0 (ulkoasun muutos, ks. alla) |
| Kulmat px (border-radius, ei vahdissa) | 284 | 196 | 88 |

Lähtötaso kirjattu (`--kirjaa`), joten määrät eivät voi enää kasvaa.

## Mitä muutettiin (ulkoasu ennallaan)

Vain deklaraatiot, joiden KOKO arvo on täsmälleen tyylikirjan arvo (ei shorthandeja kuten text-shadow, ei kommentteja):
- Värit 212 → var(--…): peruspaletti (--bg … --kerma), himmennykset ja paperi-, tumma- ja lasi-teemojen vakiot. Harmaa-, lcd- ja
  lasi-avaruus-vakioita EI käytetty (esim. #ffffff = --tk-harmaa-korostus sitoisi valkoiset tekstit harmaaseen teemaan).
- Fonttikoot 112 → var(--tk-koko-…): asteikko 12, 14, 16, 18, 21, 26, 34 px (ei LCD-kokoja).
- Kulmat 88 → var(--tk-kulma-…): 6, 10, 12, 999 px.
- C#: 2 Color32-literaalia → Tyylikirja.Kehys.AccentDark ja Tyylikirja.Kehys.Mark.

## Jäljelle (vaatisi ulkoasun muutoksen tai uuden tokenin → Päätoimittajalle)

1. Värit 1327 USS-deklaraatiota ilman tarkkaa tokenia. Yleisimmät: rgba(0,0,0,0) 125 (läpinäkyvä; ehdotus: token `--tk-ei-mitaan`
   tai USS-avainsana, kun testattu), map-ink-läpinäkyvyydet rgba(70,51,31, 0,3–0,85) noin 160 (ehdotus: himmennys-tyyppinen
   musteasteikko tyylikirjaan), paperi-korostuksen läpinäkyvyydet rgba(122,85,20, 0,35–0,45). C#:ssa noin 159 new Color(float…) ja
   34 Color32 ilman tokenia (eniten RadioNakyma, Noppa, MaaNumeroina, Saagraafi: datavärit, ei UI-pintoja).
2. Fonttikoot 507 asteikon ulkopuolella (13 px 64, 12,5 px 46, 15 px 42, 11 px 40, 11,5 px 36 …): lähimpään asteikon kokoon
   pyöristys muuttaisi ulkoasua (±0,5–2 px). Ehdotus: pinta kerrallaan omistajan katselmoinnilla.
3. Kulmat 196 (8 px 47, 3 px 29, 4 px 28, 2 px 18 …): 8 px on yleisin → ehdotus kulma-token `kulma.keski` 8 tai pyöristys 6/10.
4. Siirtymät 59 yli 250 ms: osa jatkuvia sisältöanimaatioita (sallittu), osa UI-siirtymiä; lyhentäminen muuttaa tuntumaa.
5. OVAALIT (EI OVAALEJA -linja): `.mk-nosto__kahva` (Kartta.uss, 36 × 5, r 3 = kapseli) ja `.mk-issohjaamo__ura` (iss-ohjaamo.uss,
   12 × 44, r 6 = kapseli). Pilleri `.mk-peli__merkki` (lautapeli.uss, kulma-pilleri). Muutos pyöristetyksi suorakulmioksi
   muuttaa ulkoasua → omistajan päätös. Ympyröitä (neliö, r = puolet) 52: ei ovaaleja, ennallaan.
