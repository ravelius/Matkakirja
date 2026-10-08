# Pohjavahti 8: fonttikoot ja kulmat (Natiivi-UI 8.10.2026, juna 169/170)

Päätoimittajan erä 8.10.: fonttikoot ja kulmat samalla periaatteella kuin värit. Proto natiivi-ui/pohjavahti4-169 d5600f794
(6677e9501:n päällä). Testit: tarkista.sh 0, Linssit 953, Peli 419, Kartta 448; pohjavahti kirjattu.

## Fonttikoot (507 asteikon ulkopuolella; asteikko 12, 14, 16, 18, 21, 26, 34 px)

| Ero lähimpään | Määrä | Toimenpide |
|---|---|---|
| ≤ 0,5 px | 201 | asteikkoon suoraan (var(--tk-koko-…)) |
| 0,5–1,5 px | 251 | ennallaan, näytteet pinnoittain alla → Päätoimittajan päätös |
| > 1,5 px | 55 | ennallaan, `/* fonttipoikkeus: koko, lähin, ero */`; pohjavahti.py ohittaa |

Näytteet: kaappaukset/pohjavahti8-20261008/<pinta>.png (EB Garamond 1,6 ×, ENNEN | JÄLKEEN). Lista: pohjavahti8-fontit-20261008-liite.json.
Rivitysarvio säännön omista mitoista: pienenevä koko ei tuo uutta rivinvaihtoa (152). Kasvavasta merkitään KASVAA, jos säännössä on
kiinteä leveys tai nowrap (13: Kartta 2, Kohdekartta 1, Lehti 5, Linssit 3, Matkakirja 2). Muut kasvavat (86) ilman kiinteää leveyttä
säännössä; leveys voi tulla myös toisesta valitsimesta tai C#:sta, joten varma tarkistus olisi simulaattorissa.

| Pinta | 0,5–1,5 px | KASVAA (tarkista) | pienenee |
|---|---|---|---|
| Matkakirja | 62 | 2 | 39 |
| Lehti | 56 | 5 | 26 |
| Linssit | 56 | 3 | 43 |
| Kartta | 24 | 2 | 9 |
| Pulu | 19 | 0 | 12 |
| Kysymys | 17 | 0 | 13 |
| Kohdekartta | 7 | 1 | 3 |
| Sahketehtava | 6 | 0 | 5 |
| Sahke | 4 | 0 | 2 |

## Kulmat (197 px-arvoa; tokenit 2, 6, 8, 10, 12 px)

- 86 tokeneihin (ero ≤ 1 px).
- 111 listaksi (pohjavahti8-kulmat-20261008-liite.json): ero > 1 px 93 (yleisimmät 4 px 28, 14 px 18, 15 ja 16 px) ja ero ≤ 1 px
  mutta ympyrä tai kapseli (leveys tai korkeus = 2 × säde) 18, joiden muuttaminen tekisi niistä ovaaleja tai kulmikkaita.
