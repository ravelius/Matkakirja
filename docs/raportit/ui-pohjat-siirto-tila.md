# UI-pohjien siirto: tila (Natiivi-UI johtaa; päivitetään erä kerrallaan)

Omistajan OK 1.10.2026 klo 11.17 kaikille 9 kohdalle (loki 258c8048b); tarkennus 11.37 (loki 4b60cee9f): ≤ 250 ms koskee vain
UI-siirtymiä. Suunnitelma ja säännöt: `ui-pohjat-kartoitus-20261001.md`. Sääntö: uusi pinta vain pohjilla, puute → Päätoimittajalle.

## Vaiheet

| Vaihe | Web (Pelikoodari / Natiivi-UI) | Natiivi (proto-git, Natiivi-UI) | Tila |
|---|---|---|---|
| 1 Tyylikirja + generaattori | #3780 `tyylikirja/tyylikirja.json`, `tools/tyylikirja.mjs`, `tests/tyylikirja.test.mjs` | `natiivi-ui/tyylikirja` c8cc5cb1: Tyylikirja.uss/.cs, tarkista.sh | junassa; laitteella 0,0–0,2 % ero muissa näkymissä |
| 2a KORTTI | #3782 (Pelikoodari) js/pohjat, css/pohjat.css, tyylikirja.html | `natiivi-ui/kortti-pohja` 3154330f: Kortti-USS tokeneista, apurahan otsikko | todennettu 9edb3854 |
| 2b NOSTOKORTTI | #3782 (+ kartan kohdenosto seuraavaksi) | `natiivi-ui/nostokortti-pohja` 486ea116: Pohja.cs, alareuna/sivukortti, vetokahva, hero 2:1, Esc | hero-korjaus odottaa käännöstä |
| 3 Pohjavahti | #3783 `tools/pohjavahti.mjs` + testi | `natiivi-ui/pohjavahti` d045f8d1: tyokalut/pohjavahti.py tarkista.sh:ssa | lähtötasot kirjattu |
| 2c maakuntakortti + kontrasti | – | `natiivi-ui/pohjat-2` 428eae09: Pohja.NostokortinPaikka + Vetokahva, keksintöpaneelin 2,2:1 | käännös ~12.50 |

## Pinnat pohjiin (natiivi)

| Pohja | Siirretty | Seuraavaksi | Myöhemmin |
|---|---|---|---|
| NOSTOKORTTI | nostokortti (kaikki lajit), maakuntakortti | ihmisen matkan nostokortti (2 kuvaa, juna 95 ensin masteriin), avauskortti | nähtävyysarkki, kartuscha, kaupunkiliuska |
| KORTTI | Kortti-pohjaiset dialogit (vahvistus, mitä uutta, palaute, tietoja, wiki, apuraha, periaatteet) | kysymys/visa (oma kortti), paljastus, huipennus | minipopup, sähketehtävä |
| PANEELI | – | pillerivalikko (jo 38 pt), äänentasot, laukku | linssin hampurilainen, selitteet |
| KUVANÄKYMÄ | – | kuvasuurennos, astronautin kuvanäkymä | julistegalleria, kohdekartan kokoruutu |
| LUKUARKKI | – | lehti (sulku-Esc on jo), wiki, tiedeliite | opas, vertailuarkki |
| LINSSIN OHJAIN | – | Esc kaikkiin linsseihin, kamera (Linssiseppä 2) | radio, vuosi, ISS-pöytä, kuunnelma, mikseri |
| PULU | – | chat-teema tokeneista, valinta- ja opetustaulu samaan rakenteeseen | – |

## Avoimet

- Webin `--kulta` on määrittelemätön (var(--kulta, #eab84e) / #d9a13b / ilman varaa): Pelikoodari yhtenäistää KORTTI-siirrossa.
- Kuollut koodi (taikalasit-nappi, Muut-paneeli, .mk-minipuluKortti*, USS-tuplat) poistetaan kunkin pinnan siirrossa.
- Pohjagalleria (`ui pohjat`) Akropolis-datalla (web js/pohjat/tyylikirja-sivu.js TKS_PERUS, TKS_KUVAT) savukkeen kuvaregressioon.
